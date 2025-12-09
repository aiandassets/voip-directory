'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Lock, Star } from 'lucide-react';

interface Props {
    isOpen: boolean;
}

export function PaywallModal({ isOpen }: Props) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!isOpen || !mounted) return null;

    // Use portal to render at body level
    const content = (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <div className="relative w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl ring-1 ring-slate-900/10 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-8 h-8 text-indigo-600" />
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Premium Service</h2>
                <p className="text-slate-600 mb-8 text-lg">
                    Get instant access to Clean Numbers and Remediation tools.
                </p>

                <div className="space-y-4">
                    <a href="/remediate" className="block w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30">
                        Get a Clean Number ($29/mo)
                    </a>
                    <a href="/" className="block text-slate-500 hover:text-slate-800 font-medium">
                        Return to Directory
                    </a>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>Trusted by 500+ Sales Leaders</span>
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
}
