'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Loader2, FileText, Upload } from 'lucide-react';

export function RemediationForm({ userId }: { userId: string }) {
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [authorizedName, setAuthorizedName] = useState('');
    const [numbers, setNumbers] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Insert Order
        const { error } = await supabase.from('orders').insert({
            user_id: userId,
            type: 'remediation',
            status: 'submitted',
            details: {
                companyName,
                authorizedName,
                numbers: numbers.split('\n').filter(n => n.trim().length > 0),
            }
        });

        if (error) {
            alert('Error submitting: ' + error.message);
            setLoading(false);
        } else {
            router.push('/dashboard?success=remediation_started');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                    Company Legal Name
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/5"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                    Authorized Representative Name
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        required
                        value={authorizedName}
                        onChange={(e) => setAuthorizedName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/5"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                    Phone Numbers to Remediate (One per line)
                </label>
                <div className="mt-2">
                    <textarea
                        rows={4}
                        required
                        value={numbers}
                        onChange={(e) => setNumbers(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-white/5"
                        placeholder={'512-555-0100\n512-555-0101'}
                    />
                </div>
            </div>

            <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center">
                <Upload className="mx-auto h-8 w-8 text-slate-400" />
                <p className="mt-2 text-sm text-slate-500">Upload Letter of Authorization (Optional)</p>
                <button type="button" className="mt-2 text-sm font-semibold text-indigo-600 hover:text-indigo-500">Select file</button>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Submit Remediation Request'}
            </button>
        </form>
    );
}
