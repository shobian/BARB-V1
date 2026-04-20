'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Loader2, LogOut, ShieldCheck, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checking, setChecking] = useState(true);
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session && pathname !== '/admin/login') {
                router.replace('/admin/login');
            } else if (session) {
                setUserEmail(session.user.email ?? '');
            }
            setChecking(false);
        });
    }, [pathname, router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/admin/login');
    };

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
        );
    }

    if (pathname === '/admin/login') return <>{children}</>;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top nav */}
            <header className="bg-[var(--color-primary)] text-white px-6 py-3 flex items-center justify-between shadow">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5" />
                    <span className="font-bold text-sm">BARB Admin Panel</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                    <Link href="/admin" className="flex items-center gap-1.5 opacity-80 hover:opacity-100">
                        <LayoutDashboard className="w-4 h-4" /> Applications
                    </Link>
                    <span className="opacity-50">|</span>
                    <span className="opacity-70">{userEmail}</span>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1.5 opacity-80 hover:opacity-100"
                    >
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>
        </div>
    );
}
