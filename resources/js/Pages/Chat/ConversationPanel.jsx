import Avatar from './Avatar';
import { useState } from 'react';

export default function ConversationPanel({ users }) {
    const [search, setSearch] = useState('');
    const filteredUsers = users.filter((user) => user.name.toLocaleLowerCase('vi-VN').includes(search.toLocaleLowerCase('vi-VN')));

    return (
        <aside className="flex h-72 w-full shrink-0 flex-col border-b border-rose-100 bg-white/80 md:h-full md:w-80 md:border-r md:border-b-0">
            <div className="flex h-[76px] items-center justify-between border-b border-rose-100 px-5 py-4">
                <input
                    type="search"
                    aria-label="Tìm kiếm danh bạ"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Tìm kiếm danh bạ..."
                    className="w-full rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm text-rose-950 outline-none placeholder:text-rose-300 focus:border-fuchsia-400"
                />
            </div>
            <div className="overflow-y-auto p-3">
                {filteredUsers.map((user, index) => (
                    <div key={user.id} className={`flex w-full items-center gap-3 rounded-xl p-3 text-left ${index === 0 ? 'bg-pink-100' : 'hover:bg-rose-50'}`}>
                        <Avatar user={user} />
                        <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                                <span className="flex min-w-0 items-center gap-1">
                                    <span className="truncate text-sm font-medium">{user.name}</span>
                                    <button
                                        type="button"
                                        aria-label={`Sao chép email ${user.email}`}
                                        title="Sao chép email"
                                        onClick={(event) => copyEmail(event, user.email)}
                                        className="shrink-0 rounded p-1 text-rose-400 hover:bg-rose-100 hover:text-fuchsia-600"
                                    >
                                        <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                            <rect width="13" height="13" x="9" y="9" rx="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                    </button>
                                </span>
                                <span className="shrink-0 text-[11px] text-rose-400">{formatTime(user.time)}</span>
                            </span>
                            <span className="mt-1 block truncate text-xs text-rose-500">{user.message || 'Chưa có tin nhắn'}</span>
                        </span>
                    </div>
                ))}
            </div>
        </aside>
    );
}

function copyEmail(event, email) {
    event.stopPropagation();
    navigator.clipboard?.writeText(email);
}

function formatTime(value) {
    if (!value) return '';

    return new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit' }).format(new Date(value.replace(' ', 'T')));
}
