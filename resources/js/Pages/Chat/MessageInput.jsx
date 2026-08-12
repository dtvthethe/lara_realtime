import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function MessageInput({ conversation_id }) {
    const [input, setInput] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        if (!input.trim()) return;

        router.post('/chat/message', {
            conversation_id,
            content: input,
        });

        setInput('');
    }

    return (
        <form className="border-t border-rose-100 bg-white/70 p-4" onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 rounded-xl border border-pink-200 bg-white px-3 py-2 focus-within:border-fuchsia-400">
                <input
                    aria-label="Nhập tin nhắn"
                    placeholder="Nhập tin nhắn..."
                    className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-rose-950 outline-none placeholder:text-rose-300"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type="submit" aria-label="Gửi tin nhắn" className="rounded-lg bg-pink-500 p-2 text-white hover:bg-fuchsia-500">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                </button>
            </div>
        </form>
    );
}
