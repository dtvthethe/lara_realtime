import { Link } from '@inertiajs/react';

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-rose-50 text-rose-950">
            <header className="border-b border-pink-200 bg-pink-200 shadow-sm shadow-pink-200">
                <div className="flex items-center justify-between px-5 py-4">
                    <Link href="/chat" className="font-semibold text-fuchsia-600">
                        Realtime messaging <span className="text-pink-400">♡</span>
                    </Link>

                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="rounded-lg border border-rose-200 px-4 py-2 text-sm text-rose-700 transition hover:border-fuchsia-400 hover:text-fuchsia-600"
                    >
                        Đăng xuất
                    </Link>
                </div>
            </header>

            <main>{children}</main>
        </div>
    );
}
