import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AreaCodeSearch } from '@/components/dashboard/AreaCodeSearch';
import { ActiveNumbersList } from '@/components/dashboard/ActiveNumbersList';

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
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-muted-foreground mt-2">Manage your clean numbers and remediation cases.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {/* Left Column: Active Numbers (Takes 2 cols) */}
                    <div className="md:col-span-2 space-y-6">
                        <ActiveNumbersList />

                        {/* Placeholder for future Remediation List */}
                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">Remediation Cases</h3>
                            <p className="text-sm text-muted-foreground">No active remediation requests.</p>
                            <Link href="/remediate" className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                Start a Remediation Case &rarr;
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Actions (Takes 1 col) */}
                    <div className="space-y-6">
                        <AreaCodeSearch />

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Subscription</h3>
                            <p className="mt-2 text-3xl font-bold">Free</p>
                            <p className="text-sm text-muted-foreground">Pay-as-you-go.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
