import Avatar from './Avatar';
import { useEffect, useRef } from 'react';

export default function Message({ user, messages = [], isLoadingMore = false, loaderRef, hasMore = false }) {
    const containerRef = useRef(null);
    const newestIdRef = useRef(null);
    const prevLengthRef = useRef(0);
    const scrollAnchorRef = useRef(null);

    // Keep the chat pinned to the bottom on initial load / new message,
    // and keep the viewport stable when older messages are prepended.
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (scrollAnchorRef.current && messages.length > prevLengthRef.current) {
            const { scrollTop, scrollHeight } = scrollAnchorRef.current;
            container.scrollTop = scrollTop + (container.scrollHeight - scrollHeight);
            scrollAnchorRef.current = null;
            prevLengthRef.current = messages.length;
            return;
        }

        prevLengthRef.current = messages.length;

        const newestId = messages[0]?.id;
        if (newestIdRef.current !== newestId) {
            newestIdRef.current = newestId;
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]);

    // Capture the current scroll position before older messages are loaded
    useEffect(() => {
        if (isLoadingMore && containerRef.current) {
            scrollAnchorRef.current = {
                scrollTop: containerRef.current.scrollTop,
                scrollHeight: containerRef.current.scrollHeight,
            };
        }
    }, [isLoadingMore]);

    // Reverse messages to display oldest first
    const reversedMessages = [...messages].reverse();

    return (
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 md:px-10" ref={containerRef}>
            {(hasMore || isLoadingMore) && (
                <div ref={loaderRef} className="flex items-center justify-center py-2">
                    {isLoadingMore && <span className="text-xs text-rose-400">Đang tải thêm tin nhắn...</span>}
                </div>
            )}
            {messages.length === 0 && <p className="text-center text-xs text-rose-400">Chưa có tin nhắn</p>}
            {reversedMessages.map((message) => (
                <div key={message.id} className={`flex items-end gap-2 ${message.is_mine ? 'justify-end' : ''}`}>
                    {!message.is_mine && <Avatar user={user} />}
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.is_mine ? 'rounded-br-md bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white shadow-sm shadow-pink-200' : 'rounded-bl-md border border-pink-100 bg-white text-rose-900 shadow-sm'}`}>
                        {message.content}
                    </div>
                    <span className="text-[11px] text-rose-400">{formatTime(message.time)}</span>
                </div>
            ))}
        </div>
    );
}

function formatTime(value) {
    return new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(new Date(value));
}
