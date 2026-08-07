import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Trang chủ" />
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
                <section className="max-w-xl text-center">
                    <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">
                        Inertia.js + React
                    </p>
                    <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                        Sẵn sàng cho realtime messaging
                    </h1>
                    <p className="mt-5 text-base leading-7 text-slate-300">
                        Frontend React đã được kết nối với Laravel thông qua Inertia.
                    </p>
                </section>
            </main>
        </>
    );
}
