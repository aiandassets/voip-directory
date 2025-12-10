import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AreaCodeSearch } from '@/components/dashboard/AreaCodeSearch';
import { ActiveNumbersList } from '@/components/dashboard/ActiveNumbersList';
import { RemediationList } from '@/components/dashboard/RemediationList';

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
                    {/* Left Column: Active Numbers + Remediation (Takes 2 cols) */}
                    <div className="md:col-span-2 space-y-6">
                        <ActiveNumbersList />
                        <RemediationList />
                    </div>

                    {/* Right Column: Actions (Takes 1 col) */}
                    <div className="space-y-6">
                        <AreaCodeSearch />

                        <div className="rounded-xl border bg-card p-6 shadow-sm">
                            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Billing & Invoices</h3>
                            <p className="mt-2 text-3xl font-bold">Manage</p>
                            <a
                                href="https://billing.stripe.com/p/login/cNi7sL0BCaCY6bH8dq8EM00"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Open Customer Portal &rarr;
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
