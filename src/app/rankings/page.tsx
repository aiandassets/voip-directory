'use client';

import { providers } from '@/lib/data';
import { ProviderCard } from '@/components/ProviderCard';
import Link from 'next/link';
import { Search, Lock, Shield } from 'lucide-react';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

import { useState, useMemo } from 'react';
import { useUnlock } from '@/context/UnlockContext';

export default function Home() {
  const { role, isUnlocked, searchCount, incrementSearchCount } = useUnlock();
  const [searchTerm, setSearchTerm] = useState('');
  const [showGate, setShowGate] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const isPro = role === 'pro' || role === 'admin';

  // Handling search input changes
  const handleSearch = (term: string) => {
    // If user is locked (guest) and has used up 1 search
    if (!isUnlocked && searchCount >= 1) {
      setShowGate(true); // Trigger Lead Capture
      return;
    }

    // If typing a new search (and not just clearing it)
    if (term.length > 0 && term.length > searchTerm.length) {
      if (!isUnlocked) {
        incrementSearchCount();
      }
    }

    setSearchTerm(term);
  };

  const filteredProviders = useMemo(() => {
    // If no search term, show Top 20 providers (Top 3 Unlocked, rest Locked)
    if (!searchTerm) {
      return providers.slice(0, 20);
    }

    // If searching, search EVERYTHING
    const lower = searchTerm.toLowerCase();
    return providers.filter(p =>
      p.name.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  return (
    <main className="min-h-screen bg-slate-50">
      <LeadCaptureModal isOpen={showGate} onClose={() => setShowGate(false)} />
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">VOIP Provider Rankings</h1>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl">
            Compare provider connectivity rates based on user-submitted data.
          </p>
        </div>
      </div>

      {/* Transparency Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 text-center">
          <h3 className="text-lg font-bold text-indigo-600 mb-2 uppercase tracking-wide text-xs">Data Transparency</h3>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">How do we track millions of calls?</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. We track millions of calls to bring you the first transparency tool for dialing performance.
            <span className="text-slate-900 font-semibold"> See which providers actually connect.</span>
          </p>
        </div>
      </div>


      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">

        {/* Reporting Guide CTA included in hero text essentially, but kept small here if needed or removed. Remove for cleaner look. */}

        <div id="directory" className="mt-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 gap-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Most Popular Providers</h2>
              <span className="text-sm text-slate-500">Trusted by high-volume sales teams</span>
            </div>

            {/* In-list Search Bar (Hidden if hero search is active? No, keep sync) */}
            <div className="relative w-full md:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter list..."
                  className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="absolute -bottom-6 right-0 text-xs text-slate-500">
                {!isUnlocked && (
                  <>
                    {searchCount < 1 ? (
                      <span>{1 - searchCount} free search remaining</span>
                    ) : (
                      <span className="text-red-500 font-medium flex items-center gap-1">
                        <Lock className="h-3 w-3" /> Search limit reached
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="grid gap-6">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => {
                  // Calculate global rank based on original providers array
                  const globalRank = providers.findIndex(p => p.id === provider.id) + 1;
                  return (
                    <ProviderCard
                      key={provider.id}
                      provider={provider}
                      rank={globalRank}
                      locked={!isUnlocked && globalRank > 3}
                    />
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-500">
                  No providers found matching "{searchTerm}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <LeadCaptureModal
        isOpen={showGate}
        onClose={() => setShowGate(false)}
      />
    </main >
  );
}
