import Avatar from './Avatar';

export default function MessageHeader({ user }) {
    return (
        <header className="flex items-center gap-3 border-b border-rose-100 bg-white/70 px-5 py-4">
            <Avatar user={user} large />
            <div>
                <h2 className="text-sm font-semibold">{user.name}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-pink-600"><span className="size-1.5 rounded-full bg-pink-500" />Đang hoạt động</p>
            </div>
        </header>
    );
}
