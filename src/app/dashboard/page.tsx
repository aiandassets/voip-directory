import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-background">
            <nav className="border-b bg-card px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <Link href="/" className="text-xl font-bold">DialSignal</Link>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{user.email}</span>
                        <form action="/auth/signout" method="post">
                            <button className="text-sm font-medium text-red-500 hover:text-red-400">
                                Sign Out
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Welcome back</h1>
                    <p className="text-muted-foreground mt-2">Manage your clean numbers and subscriptions.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* STATS - Placeholder for now */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Active Numbers</h3>
                        <p className="mt-2 text-3xl font-bold">0</p>
                        <Link href="/remediate" className="mt-4 block text-sm text-primary hover:underline">
                            + Buy a Number
                        </Link>
                    </div>

                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Subscription</h3>
                        <p className="mt-2 text-3xl font-bold">Free</p>
                        <p className="text-sm text-muted-foreground">Pay-as-you-go.</p>
                    </div>

                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Remediation Status</h3>
                        <p className="mt-2 text-sm text-muted-foreground">No active cases.</p>
                    </div>
                </div>

                {/* AREA CODE SEARCH (Placeholder for Phase 3) */}
                <div className="mt-12 rounded-xl border border-dashed border-slate-300 p-12 text-center">
                    <h3 className="text-lg font-semibold text-slate-900">Get a Clean Number</h3>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">
                        Search for available numbers in your preferred area code with guaranteed Clean Reputation.
                    </p>
                    <div className="mt-6">
                        <Link href="/remediate" className="rounded-lg bg-indigo-600 px-4 py-2 text-white font-medium hover:bg-indigo-500">
                            Search Inventory
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
