import Avatar from './Avatar';

export default function ConversationPanel({ users }) {
    return (
        <aside className="flex h-72 w-full shrink-0 flex-col border-b border-rose-100 bg-white/80 md:h-full md:w-80 md:border-r md:border-b-0">
            <div className="flex h-[76px] items-center justify-between border-b border-rose-100 px-5 py-4">
                <div>
                    <h1 className="text-lg font-semibold text-fuchsia-950">Danh bạ</h1>
                </div>
            </div>
            <div className="overflow-y-auto p-3">
                {users.map((user, index) => (
                    <button key={user.name} className={`flex w-full items-center gap-3 rounded-xl p-3 text-left ${index === 0 ? 'bg-pink-100' : 'hover:bg-rose-50'}`}>
                        <Avatar user={user} />
                        <span className="min-w-0 flex-1">
                            <span className="flex items-center justify-between gap-2">
                                <span className="truncate text-sm font-medium">{user.name}</span>
                                <span className="shrink-0 text-[11px] text-rose-400">{user.time}</span>
                            </span>
                            <span className="mt-1 block truncate text-xs text-rose-500">{user.message}</span>
                        </span>
                    </button>
                ))}
            </div>
        </aside>
    );
}
