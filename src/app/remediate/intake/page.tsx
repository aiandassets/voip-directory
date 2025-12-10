import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { RemediationForm } from '@/components/dashboard/RemediationForm';

export default async function IntakePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login?next=/remediate/intake');
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-6">
            <div className="mx-auto max-w-2xl">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Start Remediation</h1>
                    <p className="mt-2 text-slate-600 dark:text-slate-400">
                        We will advocate on your behalf to remove "Spam Likely" labels.
                        Please provide the details below to authorize us.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 shadow-xl rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
                    <RemediationForm userId={user.id} />
                </div>
            </div>
        </div>
    );
}
