import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />
            <section>
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-300">Realtime messaging</p>
                <h1 className="mt-3 text-4xl font-semibold">Trang tạm</h1>
                <p className="mt-4 text-slate-400">Bạn đã đăng nhập thành công.</p>
            </section>
        </>
    );
}
