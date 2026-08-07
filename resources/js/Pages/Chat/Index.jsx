import { Head } from '@inertiajs/react';
import ChatPanel from './ChatPanel';
import Conversation from './ConversationPanel';

const users = [
    { name: 'Nguyễn Minh Anh', message: 'Hẹn bạn chiều nay nhé!', time: '10:42', color: 'bg-fuchsia-500', initials: 'MA', online: true },
    { name: 'Trần Hoàng Nam', message: 'Mình đã gửi tài liệu rồi.', time: '09:18', color: 'bg-pink-400', initials: 'TN', online: true },
    { name: 'Lê Thu Hà', message: 'Cảm ơn bạn nhiều nha.', time: 'Hôm qua', color: 'bg-rose-400', initials: 'TH', online: false },
    { name: 'Phạm Đức Long', message: 'Ok, để mình kiểm tra.', time: 'Hôm qua', color: 'bg-purple-400', initials: 'PL', online: true },
    { name: 'Vũ Ngọc Linh', message: 'Bạn có rảnh không?', time: 'Thứ 2', color: 'bg-violet-400', initials: 'NL', online: false },
    { name: 'Đỗ Quang Huy', message: 'Chúc bạn một ngày tốt lành!', time: 'Thứ 2', color: 'bg-pink-500', initials: 'QH', online: false },
];

export default function Index() {
    const selectedUser = users[0];

    return (
        <>
            <Head title="Tin nhắn" />
            <div className="flex h-[calc(100vh-69px)] min-h-[600px] flex-col bg-rose-50 text-rose-950 md:flex-row">
                <Conversation users={users} />
                <ChatPanel user={selectedUser} />
            </div>
        </>
    );
}
