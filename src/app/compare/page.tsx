'use client';

import { useState, useEffect } from 'react';
import { providers, Provider } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, Plus, X, BarChart3, TrendingUp, DollarSign, Check, Shield } from 'lucide-react';
import { useUnlock } from '@/context/UnlockContext';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

export default function ComparePage() {
    const { isUnlocked } = useUnlock();
    const [showGate, setShowGate] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [selectedIds, setSelectedIds] = useState<string[]>([providers[0].id, providers[1].id]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    // Strict Paywall: If not Unlocked (Guest), Show Gate
    useEffect(() => {
        if (mounted && !isUnlocked) {
            setShowGate(true);
        }
    }, [mounted, isUnlocked]);

    const toggleProvider = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(prev => prev.filter(p => p !== id));
        } else {
            if (selectedIds.length >= 4) return;
            setSelectedIds(prev => [...prev, id]);
            setSearchTerm(''); // Clear search after adding
        }
    };

    const selectedProviders = selectedIds.map(id => providers.find(p => p.id === id)).filter(Boolean) as Provider[];

    // Filter for the "Add Provider" dropdown
    const availableProviders = providers.filter(p => !selectedIds.includes(p.id) && (
        searchTerm === '' ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    )).slice(0, 10); // Limit dropdown results

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-6 lg:px-8 relative">
            <LeadCaptureModal isOpen={showGate} />
            {mounted && !isUnlocked && (
                <div className="absolute inset-0 z-40 bg-white/50 backdrop-blur-sm pointer-events-none"></div>
            )}
            <div className="mx-auto max-w-7xl">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Directory
                </Link>

                <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Compare Providers</h1>
                        <p className="mt-2 text-slate-600">Select up to 4 providers to compare rates, volume, and pricing side-by-side.</p>
                    </div>

                    {/* Add Provider Widget */}
                    <div className="relative w-full md:w-80">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Add a provider..."
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                disabled={selectedIds.length >= 4}
                            />
                            <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        </div>
                        {searchTerm && (
                            <div className="absolute top-12 left-0 right-0 bg-white rounded-lg shadow-xl border border-slate-200 z-20 max-h-60 overflow-y-auto">
                                {availableProviders.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => toggleProvider(p.id)}
                                        className="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center justify-between group"
                                    >
                                        <span className="font-medium text-slate-700">{p.name}</span>
                                        <span className="text-xs text-slate-400 group-hover:text-blue-600">Add +</span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {selectedIds.length >= 4 && <p className="text-xs text-orange-600 mt-1">Max 4 providers selected.</p>}
                    </div>
                </div>
            </div>

            {/* Upsell Banner */}
            <div className="mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Shield className="w-6 h-6 text-indigo-600" />
                    <div>
                        <h3 className="font-bold text-indigo-900 text-sm">Comparison not convincing?</h3>
                        <p className="text-indigo-700 text-xs text-sm">Skip the search. Get a guaranteed clean number instantly.</p>
                    </div>
                </div>
                <Link href="/remediate" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors whitespace-nowrap">
                    Get Clean Number
                </Link>
            </div>

            {/* Comparison Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {selectedProviders.length === 0 ? (
                    <div className="p-12 text-center text-slate-500">
                        Select providers above to start comparing.
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <div className="min-w-[800px] grid" style={{ gridTemplateColumns: `200px repeat(${selectedProviders.length}, 1fr)` }}>

                            {/* Header Row */}
                            <div className="p-4 border-b border-r border-slate-100 bg-slate-50 font-bold text-slate-700 flex items-center">
                                Provider
                            </div>
                            {selectedProviders.map(p => (
                                <div key={p.id} className="p-4 border-b border-slate-100 flex flex-col items-center relative group">
                                    <button
                                        onClick={() => toggleProvider(p.id)}
                                        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                    <div className="h-12 w-32 flex items-center justify-center mb-2">
                                        {p.logo && p.logo !== '/logos/default.png' ? (
                                            <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
                                        ) : (
                                            <span className="font-bold text-lg">{p.name}</span>
                                        )}
                                    </div>
                                    <div className="text-sm font-semibold text-slate-600">#{providers.findIndex(x => x.id === p.id) + 1} Ranked</div>
                                </div>
                            ))}

                            {/* Contact Rate Row */}
                            <div className="p-4 border-b border-r border-slate-100 bg-slate-50 font-semibold text-slate-600 flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-blue-600" /> Contact Rate
                            </div>
                            {selectedProviders.map(p => (
                                <div key={p.id} className="p-4 border-b border-slate-100 text-center">
                                    <div className="text-2xl font-bold text-slate-900 mb-2">{p.contactRate}%</div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${(p.contactRate / 50) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}

                            {/* Call Volume Row */}
                            <div className="p-4 border-b border-r border-slate-100 bg-slate-50 font-semibold text-slate-600 flex items-center gap-2">
                                <BarChart3 className="w-4 h-4 text-green-600" /> Daily Calls
                            </div>
                            {selectedProviders.map(p => (
                                <div key={p.id} className="p-4 border-b border-slate-100 text-center">
                                    <div className="text-xl font-bold text-slate-900 mb-2">{p.callVolume}</div>
                                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                        <div className="bg-green-600 h-full rounded-full" style={{ width: `${(p.callVolume / 400) * 100}%` }}></div>
                                    </div>
                                </div>
                            ))}

                            {/* Price Row */}
                            <div className="p-4 border-b border-r border-slate-100 bg-slate-50 font-semibold text-slate-600 flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-slate-600" /> Price
                            </div>
                            {selectedProviders.map(p => (
                                <div key={p.id} className="p-4 border-b border-slate-100 text-center font-medium text-slate-900">
                                    {p.price === 0 ? 'Free' : `$${p.price}/mo`}
                                </div>
                            ))}

                            {/* Features Row */}
                            <div className="p-4 border-b border-r border-slate-100 bg-slate-50 font-semibold text-slate-600 flex items-start pt-6 gap-2">
                                <Check className="w-4 h-4 text-slate-600" /> Key Features
                            </div>
                            {selectedProviders.map(p => (
                                <div key={p.id} className="p-4 border-b border-slate-100 text-sm text-slate-600">
                                    <ul className="space-y-2">
                                        {p.features.slice(0, 4).map((f, i) => (
                                            <li key={i} className="flex items-start gap-1">
                                                <span className="text-green-500 mt-0.5">•</span> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* CTA Row */}
                            <div className="p-4 border-r border-slate-100 bg-slate-50"></div>
                            {selectedProviders.map(p => (
                                <div key={p.id} className="p-4 text-center">
                                    <a
                                        href={p.affiliateLink || p.website}
                                        target="_blank"
                                        className="inline-block w-full py-2 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-700 transition-colors"
                                    >
                                        Visit Website
                                    </a>
                                </div>
                            ))}

                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
