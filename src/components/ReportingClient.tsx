'use client';

import { providers } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Shield } from 'lucide-react';
import { useUnlock } from '@/context/UnlockContext';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { useState, useEffect } from 'react';

export function ReportingClient() {
    const { isUnlocked } = useUnlock();
    const [showGate, setShowGate] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (mounted && !isUnlocked) {
            setShowGate(true);
        }
    }, [mounted, isUnlocked]);

    return (
        <div className="min-h-screen bg-background relative">
            <LeadCaptureModal isOpen={showGate} />

            {/* Blurred Overlay for Guests */}
            {mounted && !isUnlocked && (
                <div className="absolute inset-0 z-40 bg-white/50 backdrop-blur-sm pointer-events-none"></div>
            )}
            <div className="bg-slate-900 pb-16 pt-10 lg:pt-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-4">
                        <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Directory
                        </Link>
                    </nav>
                    <div className="mt-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Reporting Guide</h1>
                        <p className="mt-4 text-lg text-slate-400 max-w-3xl">
                            Step-by-step instructions on how to locate your Call Statistics and Contact Rates within each provider's dashboard.
                        </p>
                    </div>
                </div>
            </div>

            <div className={`mx-auto max-w-5xl px-6 py-12 sm:px-8 lg:px-10 ${!isUnlocked ? 'filter blur-sm pointer-events-none select-none h-screen overflow-hidden' : ''}`}>
                <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Shield className="w-6 h-6 text-indigo-600" />
                        <div>
                            <h3 className="font-bold text-indigo-900">Don't like what you see in the reports?</h3>
                            <p className="text-indigo-700 text-sm">If your contact rates are low, rent a pre-cleaned number instantly.</p>
                        </div>
                    </div>
                    <Link href="/remediate" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors whitespace-nowrap">
                        Get Clean Number
                    </Link>
                </div>

                <div className="space-y-12">
                    {providers.map((provider) => (
                        <div key={provider.id} id={provider.id} className="scroll-mt-24 rounded-2xl bg-card border shadow-sm p-8">
                            <div className="flex items-center justify-between mb-6 border-b pb-4">
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <BookOpen className="h-6 w-6" />
                                    </span>
                                    {provider.name}
                                </h2>
                                <Link href={`/providers/${provider.id}`} className="text-sm font-medium text-primary hover:underline">
                                    View Full Profile
                                </Link>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <div className="whitespace-pre-wrap font-sans leading-relaxed">
                                    {provider.reportingInstructions.split('\n').map((line, i) => {
                                        if (line.trim().startsWith('###')) {
                                            return <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-foreground">{line.replace('###', '').trim()}</h3>;
                                        }
                                        if (line.trim().match(/^\d\./)) {
                                            return <div key={i} className="ml-4 mb-2 pl-2 border-l-2 border-primary/20 flex gap-2">
                                                <span className="font-semibold text-primary">{line.trim().split('.')[0]}.</span>
                                                <span className="text-muted-foreground">{line.trim().split('.').slice(1).join('.').trim()}</span>
                                            </div>
                                        }
                                        return <p key={i} className="mb-2 text-muted-foreground">{line}</p>
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
