import { Head } from '@inertiajs/react';
import ChatPanel from './ChatPanel';
import Conversation from './ConversationPanel';

const avatarColors = ['bg-fuchsia-500', 'bg-pink-500', 'bg-rose-500', 'bg-purple-500', 'bg-violet-500', 'bg-indigo-500'];

function getInitials(name) {
    const parts = name.trim().split(/\s+/);
    const initials = parts.length === 1 ? parts[0][0] : `${parts[0][0]}${parts.at(-1)[0]}`;

    return initials.toLocaleUpperCase('vi-VN');
}

export default function Index({ users = [] }) {
    const conversationUsers = users.map((user) => ({
        ...user,
        initials: getInitials(user.name),
        color: avatarColors[user.id % avatarColors.length],
        online: false,
    }));
    const selectedUser = conversationUsers[0];

    return (
        <>
            <Head title="Tin nhắn" />
            <div className="flex h-[calc(100vh-69px)] min-h-[600px] flex-col bg-rose-50 text-rose-950 md:flex-row">
                <Conversation users={conversationUsers} />
                {selectedUser && <ChatPanel user={selectedUser} />}
            </div>
        </>
    );
}
