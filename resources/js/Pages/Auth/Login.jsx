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
            <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
                <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
                    <h1 className="mt-3 text-3xl font-semibold">Đăng nhập</h1>

                    <form onSubmit={submit} className="mt-8 space-y-5">
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-200">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(event) => setData('email', event.target.value)}
                                autoComplete="email"
                                autoFocus
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />
                            {errors.email && <p className="mt-2 text-sm text-rose-300">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-200">Mật khẩu</label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(event) => setData('password', event.target.value)}
                                autoComplete="current-password"
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                            />
                            {errors.password && <p className="mt-2 text-sm text-rose-300">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-cyan-400 px-5 py-3 mt-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>
                </section>
            </main>
        </>
    );
}
