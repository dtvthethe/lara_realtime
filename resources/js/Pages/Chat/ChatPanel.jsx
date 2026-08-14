import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';
import { router, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function ChatPanel({ user, messages, conversation_id, pagination }) {
    const [allMessages, setAllMessages] = useState(messages);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadMoreRef = useRef(null);
    const lastConversationRef = useRef(conversation_id);

    const currentUserId = usePage().props.auth.user.id;

    // Reset messages when switching conversation, otherwise merge older messages in
    useEffect(() => {
        if (lastConversationRef.current !== conversation_id) {
            lastConversationRef.current = conversation_id;
            setAllMessages(messages);
            return;
        }

        setAllMessages((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newOnes = messages.filter((m) => !existingIds.has(m.id));
            return newOnes.length ? [...prev, ...newOnes] : prev;
        });
    }, [messages, conversation_id]);

    // Observe the top sentinel to load older messages when scrolled into view
    useEffect(() => {
        if (!pagination?.next_cursor || isLoadingMore || !loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isLoadingMore && pagination.next_cursor) {
                    setIsLoadingMore(true);
                    router.get('/chat', { conversation_id, cursor: pagination.next_cursor }, {
                        preserveState: true,
                        replace: true,
                        only: ['conversation'],
                        onFinish: () => setIsLoadingMore(false),
                    });
                }
            },
            { rootMargin: '200px' }
        );

        observer.observe(loadMoreRef.current);
        return () => observer.disconnect();
    }, [isLoadingMore, pagination?.next_cursor, conversation_id]);

    useEffect(() => {
        if (!conversation_id && !window.Echo) return;

        const channel = window.Echo.private(`conversation.${conversation_id}`);
    
        channel.listen('MessageSent', ({ message }) => { // TODO: MessageSent co phai la event khong? co phai la MessageSentEvent khong?
            if (!message) return;

            setAllMessages((prev) => {
                if (prev.some((m) => m.id === message.id)) return prev; // Avoid duplicates
                return [
                    {
                        id: message.id,
                        content: message.content,
                        sender_id: message.sender_id,
                        time: message.created_at,
                        is_mine: message.sender_id === currentUserId,
                    },
                    ...prev,
                ];
            });
        });

        return () => window.Echo.leaveChannel(`conversation.${conversation_id}`); // TODO: tai sao lai phai leaveChannel? co phai la unlisten khong?
    }, [conversation_id, currentUserId]);

    return (
        <section className="flex min-h-0 flex-1 flex-col">
            <MessageHeader user={user} />
            <Message
                user={user}
                messages={allMessages}
                isLoadingMore={isLoadingMore}
                loaderRef={loadMoreRef}
                hasMore={Boolean(pagination?.next_cursor)}
            />
            <MessageInput conversation_id={conversation_id} />
        </section>
    );
}
