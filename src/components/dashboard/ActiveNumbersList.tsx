import { createClient } from '@/lib/supabase/server';
import { Phone, CheckCircle, AlertCircle } from 'lucide-react';

export async function ActiveNumbersList() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return null;

    const { data: numbers } = await supabase
        .from('numbers')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (!numbers || numbers.length === 0) {
        return (
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6 text-center text-muted-foreground">
                <Phone className="h-12 w-12 mx-auto mb-4 opacity-20" />
                No active numbers. Buy one to get started.
            </div>
        );
    }

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Your Numbers</h3>
            </div>
            <div className="divide-y">
                {numbers.map((num) => (
                    <div key={num.id} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-lg font-medium">{num.phone_number}</span>
                                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 capitalize">
                                    {num.status}
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                Purchased: {new Date(num.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="text-right">
                            <span className="block text-xs text-muted-foreground uppercase tracking-wider mb-1">OPT Code</span>
                            <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm font-bold tracking-widest">
                                {num.phone_number.slice(-4)} {/* Mock OPT */}
                            </code>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
