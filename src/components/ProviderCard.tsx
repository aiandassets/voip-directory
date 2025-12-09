'use client';

import Link from 'next/link';
import { useUnlock } from '@/context/UnlockContext';
import { Provider } from '@/lib/data';
import { Lock, ShieldCheck, Star } from 'lucide-react';
import { LeadCaptureModal } from './LeadCaptureModal';
import { useState } from 'react';

interface Props {
    provider: Provider;
    rank: number;
    locked?: boolean;
}

export function ProviderCard({ provider, rank, locked }: Props) {
    const { isUnlocked, searchCount } = useUnlock();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Lock if parent says so, OR if internal logic applies (fallback)
    const isLocked = locked !== undefined ? locked : (!isUnlocked && rank > 3);

    // Format Price
    const priceDisplay = provider.price === 0 ? 'Free' : `$${provider.price}/mo`;

    // Color coding for score
    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 bg-green-50 border-green-200';
        if (score >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
        return 'text-slate-600 bg-slate-50 border-slate-200';
    };

    return (
        <div className="group relative flex flex-col md:flex-row bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">

            {/* Rank Badge (Top Left) */}
            <div className="absolute top-0 left-0 bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-br-lg z-10">
                #{rank}
            </div>

            {provider.featured && (
                <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-bl-lg border-l border-b border-yellow-200 z-10 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-600 text-yellow-600" /> RECOMMENDED
                </div>
            )}

            {/* Warning/Gate Overlay */}
            {isLocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px]">
                    <Lock className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm font-medium text-slate-600 mb-3">Login to view details</p>
                    <LeadCaptureModal />
                </div>
            )}

            {/* Left: Logo & Basic Info */}
            <div className="p-6 md:w-2/5 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-slate-100">
                <div className="flex items-start justify-between">
                    <div className="h-12 w-32 relative bg-slate-50 rounded-md flex items-center justify-center p-2 border border-slate-100">
                        {/* Fallback text if logo fails, but ideally real logos */}
                        {provider.logo && provider.logo !== '/logos/default.png' ? (
                            <img src={provider.logo} alt={provider.name} className="max-h-full max-w-full object-contain" />
                        ) : (
                            <span className="text-sm font-bold text-slate-400">{provider.name}</span>
                        )}
                    </div>
                </div>

                <div>
                    <Link href={`/providers/${provider.id}`} className="flex items-center gap-1 text-xl font-bold text-slate-900 hover:text-primary transition-colors">
                        {provider.name}
                        <ShieldCheck className="w-5 h-5 text-blue-500" aria-label="Verified Provider" />
                    </Link>
                    <p className="mt-1 text-sm text-slate-500 line-clamp-2">{provider.description}</p>
                </div>

                <div className="mt-auto flex flex-wrap gap-2">
                    {provider.features.slice(0, 3).map((feat, i) => (
                        <span key={i} className="px-2 py-1 text-[10px] uppercase font-bold text-slate-500 bg-slate-100 rounded-md">
                            {feat}
                        </span>
                    ))}
                </div>
            </div>

            {/* Right: Metrics & Actions */}
            <div className="p-6 md:w-3/5 flex flex-col sm:flex-row gap-6 items-center justify-between">

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 w-full sm:w-auto flex-1">
                    <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Score</div>
                        <div className={`text-2xl font-bold ${Number(provider.score) > 80 ? 'text-green-600' : 'text-slate-700'}`}>
                            {provider.score}
                        </div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Contact Rate</div>
                        <div className="text-2xl font-bold text-slate-900">{provider.contactRate}%</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-slate-50 border border-slate-100">
                        <div className="text-xs text-slate-500 font-semibold uppercase mb-1">Price</div>
                        <div className="text-xl font-bold text-slate-900">{priceDisplay}</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 w-full sm:w-40 shrink-0">
                    <a
                        href={provider.affiliateLink || provider.website}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="w-full py-2.5 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg text-center shadow-sm transition-all hover:shadow-md"
                    >
                        Visit Website
                    </a>
                    <Link
                        href={`/providers/${provider.id}`}
                        className="w-full py-2.5 px-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-lg text-center transition-colors"
                    >
                        View Details
                    </Link>
                </div>
            </div>

        </div>
    );
}
