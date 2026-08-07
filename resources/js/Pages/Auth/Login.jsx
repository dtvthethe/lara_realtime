import { Head, useForm } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    function submit(event) {
        event.preventDefault();
        post('/login');
    }

    return (
        <>
            <Head title="Đăng nhập" />
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-fuchsia-100 px-6 text-rose-950">
                <section className="w-full max-w-md rounded-3xl border border-white/80 bg-white/85 p-8 shadow-xl shadow-rose-200/60 backdrop-blur">
                    <p className="text-sm font-semibold tracking-[0.2em] text-fuchsia-500">REALTIME MESSAGING</p>
                    <h1 className="mt-3 text-3xl font-semibold">Đăng nhập</h1>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-rose-900">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                autoComplete="email"
                                autoFocus
                                className="w-full rounded-xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-rose-950 outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
                            />
                            {errors.email && <p className="mt-2 text-sm text-rose-300">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-rose-900">Mật khẩu</label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                                autoComplete="current-password"
                                className="w-full rounded-xl border border-rose-200 bg-rose-50/70 px-4 py-3 text-rose-950 outline-none focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-100"
                            />
                            {errors.password && <p className="mt-2 text-sm text-rose-300">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="mt-3 w-full rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-500 px-5 py-3 font-semibold text-white shadow-lg shadow-pink-200 transition hover:from-pink-600 hover:to-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
