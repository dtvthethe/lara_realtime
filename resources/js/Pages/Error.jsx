import { Head, Link } from '@inertiajs/react';

const messages = {
    403: {
        eyebrow: 'KHÔNG CÓ QUYỀN TRUY CẬP',
        title: 'Bạn không thể vào trang này',
        description: 'Tài khoản hiện tại không có quyền thực hiện yêu cầu này.',
    },
    404: {
        eyebrow: 'KHÔNG TÌM THẤY',
        title: 'Trang này đã đi lạc',
        description: 'Đường dẫn bạn truy cập không tồn tại hoặc đã được thay đổi.',
    },
    419: {
        eyebrow: 'PHIÊN ĐÃ HẾT HẠN',
        title: 'Hãy thử lại nhé',
        description: 'Phiên làm việc đã hết hạn. Tải lại trang để tiếp tục.',
    },
    429: {
        eyebrow: 'QUÁ NHIỀU YÊU CẦU',
        title: 'Chậm lại một chút',
        description: 'Hệ thống đang nhận quá nhiều yêu cầu. Vui lòng thử lại sau.',
    },
    503: {
        eyebrow: 'HỆ THỐNG ĐANG BẬN',
        title: 'Chúng tôi sẽ sớm quay lại',
        description: 'Realtime messaging đang tạm thời bảo trì. Vui lòng thử lại sau ít phút.',
    },
    500: {
        eyebrow: 'ĐÃ XẢY RA LỖI',
        title: 'Có gì đó không ổn',
        description: 'Hệ thống gặp sự cố khi xử lý yêu cầu. Vui lòng thử lại sau.',
    },
};

export default function Error({ status }) {
    const content = messages[status] ?? messages[500];

    return (
        <>
            <Head title={`${status} - ${content.title}`} />
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 px-6 py-12 text-rose-950">
                <section className="w-full max-w-lg rounded-3xl border border-white/80 bg-white/85 p-8 shadow-xl shadow-rose-200/60 backdrop-blur sm:p-10">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold tracking-[0.2em] text-fuchsia-500">REALTIME MESSAGING</span>
                        <span className="text-5xl font-semibold tracking-tight text-pink-200">{status}</span>
                    </div>

                    <div className="mt-12">
                        <p className="text-sm font-semibold tracking-[0.2em] text-rose-400">{content.eyebrow}</p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{content.title}</h1>
                        <p className="mt-4 max-w-md leading-7 text-rose-700">{content.description}</p>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:from-pink-600 hover:to-fuchsia-600"
                        >
                            Thử lại
                        </button>
                        <Link
                            href="/"
                            className="rounded-xl border border-rose-200 px-5 py-3 font-semibold text-rose-700 transition hover:border-fuchsia-400 hover:text-fuchsia-600"
                        >
                            Về trang chính
                        </Link>
                    </div>
                </section>
            </main>
        </>
    );
}
