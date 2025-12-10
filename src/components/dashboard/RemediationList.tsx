import { createClient } from '@/lib/supabase/server';
import { FileText, Clock, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export async function RemediationList() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'remediation')
        .order('created_at', { ascending: false });

    if (!orders || orders.length === 0) {
        return (
            <div className="rounded-xl border bg-card p-6 shadow-sm">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide mb-4">Remediation Cases</h3>
                <p className="text-sm text-muted-foreground">No active remediation requests.</p>
                <Link href="/remediate/intake" className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Start a Remediation Case &rarr;
                </Link>
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Remediation Cases</h3>
                <Link href="/remediate/intake" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
                    + New Case
                </Link>
            </div>
            <div className="divide-y">
                {orders.map((order) => (
                    <div key={order.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900">
                        <div>
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-slate-400" />
                                <span className="font-medium text-sm">
                                    {(order.details as any)?.companyName || 'Case #' + order.id.slice(0, 8)}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 ml-6">
                                {(order.details as any)?.numbers?.length || 0} numbers submitted
                            </p>
                        </div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset capitalize
                            ${order.status === 'submitted' ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20' :
                                order.status === 'complete' ? 'bg-green-50 text-green-700 ring-green-600/20' :
                                    'bg-blue-50 text-blue-700 ring-blue-600/20'}`}>
                            {order.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
