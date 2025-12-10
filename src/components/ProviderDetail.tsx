'use client';

import { useState, useEffect } from 'react';
import { Provider } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Phone, BarChart, Lock, Star, Shield } from 'lucide-react';
import { useUnlock } from '@/context/UnlockContext';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';
import { Review } from '@/lib/data';

interface Props {
    provider: Provider;
    rank: number;
}

export function ProviderDetail({ provider, rank }: Props) {
    const isTopTier = rank <= 3;
    const { isUnlocked } = useUnlock();
    const [mounted, setMounted] = useState(false);
    const [showGate, setShowGate] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (mounted && !isUnlocked && !isTopTier) {
            setShowGate(true);
        }
    }, [mounted, isUnlocked, isTopTier]);
    // Lock if NOT top tier AND NOT unlocked
    const isLocked = !isTopTier && !isUnlocked;

    return (
        <div className="min-h-screen bg-background pb-20">
            <LeadCaptureModal isOpen={showGate} onClose={() => setShowGate(false)} />

            {/* Upsell Banner for Unlocked Users */}
            {isUnlocked && (
                <div className="bg-indigo-600 text-white px-4 py-3 text-center">
                    <p className="text-sm font-medium">
                        Using {provider.name}? <Link href="/remediate" className="underline font-bold hover:text-indigo-100">Get a clean number instantly</Link> to boost connection rates.
                    </p>
                </div>
            )}
            <div className="bg-slate-900 pb-24 pt-10 sm:pb-32 lg:pt-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-4">
                        <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Directory
                        </Link>
                    </nav>
                    <div className="mt-10">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{provider.name}</h1>
                        <p className="mt-2 text-lg text-slate-400 max-w-2xl">{provider.description}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-[-4rem] max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8 relative">

                        {isLocked && (
                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl border p-8 text-center">
                                <Lock className="w-12 h-12 text-slate-400 mb-4" />
                                <h3 className="text-xl font-bold mb-2">Detailed Report Locked</h3>
                                <p className="text-slate-500 mb-6 max-w-sm">
                                    Unlock the full directory to see contact rates, daily volume, and verified reviews for this provider.
                                </p>
                                <button
                                    onClick={() => setShowGate(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-colors"
                                >
                                    Unlock for Free
                                </button>
                            </div>
                        )}

                        <div className={`rounded-2xl bg-card p-8 shadow-sm ring-1 ring-gray-900/5 ${isLocked ? 'blur-sm select-none opacity-50 overflow-hidden h-[600px] pointer-events-none' : ''}`}>
                            <h2 className="text-2xl font-bold tracking-tight mb-6">Performance Report</h2>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
                                <div className="rounded-xl bg-muted/50 p-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                        <BarChart className="h-4 w-4" /> Contact Rate
                                    </div>
                                    <div className={`text-3xl font-bold ${provider.contactRate >= 40 ? 'text-green-500' : 'text-blue-500'
                                        }`}>
                                        {provider.contactRate}%
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">Average connection rate</div>
                                </div>
                                <div className="rounded-xl bg-muted/50 p-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                        <Phone className="h-4 w-4" /> Daily Calls
                                    </div>
                                    <div className="text-3xl font-bold text-foreground">
                                        {provider.callVolume}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">Calls per user / day</div>
                                </div>
                                <div className="rounded-xl bg-muted/50 p-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                        <CheckCircle2 className="h-4 w-4" /> Score
                                    </div>
                                    <div className="text-3xl font-bold text-primary">
                                        {provider.score}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">Performance Index</div>
                                </div>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                    {provider.reportingInstructions.split('\n').map((line, i) => {
                                        if (line.trim().startsWith('###')) {
                                            return <h3 key={i} className="text-lg font-bold mt-6 mb-2">{line.replace('###', '').trim()}</h3>;
                                        }
                                        if (line.trim().match(/^\d\./)) {
                                            return <div key={i} className="ml-4 mb-1 pl-2 border-l-2 border-slate-200 dark:border-slate-800">{line.trim()}</div>
                                        }
                                        return <p key={i} className="mb-2">{line}</p>
                                    })}
                                </div>
                            </div>

                            {/* Reviews Section */}
                            {provider.reviews && provider.reviews.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                        Verified Reviews
                                    </h3>
                                    <div className="space-y-6">
                                        {provider.reviews.map((review, idx) => (
                                            <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <span className="font-bold text-slate-900 dark:text-white mr-2">{review.user}</span>
                                                        <span className="text-xs text-slate-500 uppercase tracking-wide bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">{review.role}</span>
                                                    </div>
                                                    <div className="flex text-yellow-500">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-slate-300'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-slate-700 dark:text-slate-300 text-sm italic">"{review.comment}"</p>
                                                <div className="mt-2 text-xs text-slate-400 flex justify-between">
                                                    <span>Source: {review.source}</span>
                                                    <span>{review.date}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className={`rounded-2xl bg-card p-6 shadow-sm ring-1 ring-gray-900/5 ${isLocked ? 'blur-sm opacity-50' : ''}`}>
                            <h3 className="text-base font-semibold leading-7 text-foreground">Key Features</h3>
                            <ul className="mt-4 space-y-3">
                                {provider.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3 text-sm text-muted-foreground">
                                        <CheckCircle2 className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t">
                                <a href={provider.website} target="_blank" rel="noopener noreferrer"
                                    className="block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
