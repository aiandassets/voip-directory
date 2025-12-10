'use client';

import { providers } from '@/lib/data';
import { useUnlock } from '@/context/UnlockContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
    const { isUnlocked, role } = useUnlock();
    const router = useRouter();

    useEffect(() => {
        // Protect route
        if (!isUnlocked && role === 'guest') {
            router.push('/login');
        }
    }, [isUnlocked, role, router]);

    const maxRate = Math.max(...providers.map(p => p.contactRate));

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b bg-card px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="text-xl font-bold">VOIP Directory</Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">Welcome, Member</span>
                        <button
                            onClick={() => {
                                // Quick logout logic handled by context in nav usually, but direct here for now
                                localStorage.clear();
                                window.location.href = '/';
                            }}
                            className="text-sm font-medium hover:text-primary"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl p-6 lg:p-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Chart Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h2 className="mb-6 text-xl font-semibold">Live Contact Rate Benchmark</h2>
                            <div className="space-y-4">
                                {providers.map((provider) => (
                                    <div key={provider.id}>
                                        <div className="mb-1 flex justify-between text-sm">
                                            <span className="font-medium">{provider.name}</span>
                                            <span className="text-muted-foreground">{provider.contactRate}%</span>
                                        </div>
                                        <div className="h-4 w-full overflow-hidden rounded-full bg-secondary/50">
                                            <div
                                                className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                                                style={{ width: `${(provider.contactRate / maxRate) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h2 className="mb-4 text-xl font-semibold">Performance Index (Rate + Volume)</h2>
                            <p className="mb-6 text-sm text-muted-foreground">
                                Providers ranked by their combined contact rate and daily call capacity.
                            </p>
                            <div className="space-y-4">
                                {providers.sort((a, b) => b.score - a.score).slice(0, 5).map((provider) => (
                                    <div key={provider.id} className="flex items-center gap-4">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 font-bold text-blue-500">
                                            {provider.score}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium">{provider.name}</h3>
                                            <div className="flex gap-3 text-xs text-muted-foreground">
                                                <span>{provider.callVolume} Daily Calls</span>
                                                <span>•</span>
                                                <span className={`${provider.contactRate >= 30 ? 'text-green-600' : 'text-muted-foreground'}`}>{provider.contactRate}% Rate</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Newsletter */}
                    <div className="space-y-8">
                        <div className="rounded-xl border bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 shadow-sm">
                            <h2 className="mb-2 text-xl font-semibold text-primary">Monthly Newsletter</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Exclusive insights on VOIP regulatory changes, SHAKEN/STIR updates, and carrier filtering trends.
                            </p>
                            <div className="space-y-4">
                                <div className="rounded-lg bg-card p-4 text-sm border shadow-sm">
                                    <span className="text-xs font-semibold text-indigo-500 uppercase">Latest Issue</span>
                                    <h3 className="mt-1 font-bold">The Rise of AI Spam Filters</h3>
                                    <p className="mt-2 text-muted-foreground">How new carrier algorithms are affecting legitimate dialing patterns in Q4.</p>
                                    <button className="mt-3 text-primary hover:underline text-xs font-semibold">Read Full Article →</button>
                                </div>
                                <div className="rounded-lg bg-card p-4 text-sm border shadow-sm">
                                    <span className="text-xs font-semibold text-muted-foreground uppercase">Archive</span>
                                    <h3 className="mt-1 font-bold">10DLC Compliance Checklist</h3>
                                    <button className="mt-3 text-primary hover:underline text-xs font-semibold">Read Full Article →</button>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h3 className="font-semibold text-lg mb-4">Your Subscription</h3>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">Plan</span>
                                <span className="font-medium">Free Member</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-sm text-muted-foreground">Join Date</span>
                                <span className="font-medium">Dec 2024</span>
                            </div>
                            <div className="mt-6">
                                <Link href="/remediate" className="block w-full text-center rounded-lg bg-indigo-600 text-white py-2 text-sm font-medium hover:bg-indigo-700">
                                    Get a Clean Number
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
