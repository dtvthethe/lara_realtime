import Message from './Message';
import MessageHeader from './MessageHeader';
import MessageInput from './MessageInput';
import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function ChatPanel({ user, messages, conversation_id, pagination }) {
    const [allMessages, setAllMessages] = useState(messages);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const loadMoreRef = useRef(null);
    const lastConversationRef = useRef(conversation_id);

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