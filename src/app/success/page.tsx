'use client';

import { useEffect, useState, Suspense } from 'react';
import { useUnlock } from '@/context/UnlockContext';
import { CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
    const { unlock } = useUnlock();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    useEffect(() => {
        if (sessionId) {
            unlock('pro-member@verified.com');
            localStorage.setItem('voip-directory-role', 'pro');
        }
    }, [sessionId]);

    return (
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center border border-slate-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-slate-900 mb-4">Payment Successful!</h1>
            <p className="text-slate-600 mb-8">
                Your account is verified. You now have unlimited access to all directory tools and reports.
            </p>

            <div className="space-y-4">
                <Link href="/roi" className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                    Go to ROI Calculator
                </Link>
                <Link href="/compare" className="block w-full py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-lg transition-colors">
                    Back to Comparison Tool
                </Link>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <Suspense fallback={<div className="flex items-center gap-2"><Loader2 className="animate-spin" /> Verifying Payment...</div>}>
                <SuccessContent />
            </Suspense>
        </main>
    );
}
