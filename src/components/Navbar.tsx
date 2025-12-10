'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUnlock } from '@/context/UnlockContext';
import { LogIn, LayoutDashboard, Shield } from 'lucide-react';

export function Navbar() {
    const pathname = usePathname();
    const { isUnlocked, role } = useUnlock();

    // Don't show public navbar on valid app routes (they have their own)
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
        return null;
    }

    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                            <span className="text-primary">Trust</span>Dial
                        </Link>
                        <div className="hidden md:flex gap-6 text-sm font-medium">
                            <Link href="/" className="hover:text-primary transition-colors">Directory</Link>
                            <Link href="/reporting" className="hover:text-primary transition-colors">Reporting</Link>
                            <Link href="/roi" className="hover:text-primary transition-colors">VOIP ROI Calc</Link>
                            <Link href="/compare" className="hover:text-primary transition-colors">Compare Providers</Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {role === 'admin' ? (
                            <Link href="/admin" className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400">
                                <Shield className="h-4 w-4" /> Admin
                            </Link>
                        ) : role === 'member' ? (
                            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80">
                                <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </Link>
                        ) : (
                            <Link href="/login" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
                                <LogIn className="h-4 w-4" />
                                Member Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
