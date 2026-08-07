import Avatar from './Avatar';

export default function Message({ user }) {
    return (
        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-6 md:px-10">
            <p className="text-center text-xs text-rose-400">Hôm nay</p>
            <div className="flex items-end gap-2">
                <Avatar user={user} />
                <div className="max-w-[75%] rounded-2xl rounded-bl-md border border-pink-100 bg-white px-4 py-3 text-sm leading-6 text-rose-900 shadow-sm">Chào bạn! Dạo này bạn thế nào rồi?</div>
                <span className="text-[11px] text-rose-400">10:39</span>
            </div>
            <div className="flex justify-end">
                <div className="max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-r from-pink-500 to-fuchsia-500 px-4 py-3 text-sm leading-6 text-white shadow-sm shadow-pink-200">Mình vẫn khỏe, cảm ơn bạn. Còn bạn thì sao?</div>
            </div>
            <div className="flex items-end gap-2">
                <Avatar user={user} />
                <div className="max-w-[75%] rounded-2xl rounded-bl-md border border-pink-100 bg-white px-4 py-3 text-sm leading-6 text-rose-900 shadow-sm">Mình cũng ổn. Hẹn bạn chiều nay nhé!</div>
                <span className="text-[11px] text-rose-400">10:42</span>
            </div>
        </div>
    );
}
