'use client';

import { useState, useEffect } from 'react';
import { providers } from '@/lib/data';
import Link from 'next/link';
import { ArrowLeft, Calculator, Shield } from 'lucide-react';
import { useUnlock } from '@/context/UnlockContext';
import { LeadCaptureModal } from '@/components/LeadCaptureModal';

export default function RoiCalculator() {
    const { isUnlocked } = useUnlock();
    const [showGate, setShowGate] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Explicit Paywall: If not Unlocked (Guest), Show Gate
    // REMOVED for Data Transparency - Tool is now Free
    // useEffect(() => {
    //     if (mounted && !isUnlocked) {
    //         setShowGate(true);
    //     }
    // }, [mounted, isUnlocked]);

    // State for user inputs
    const [inputs, setInputs] = useState({
        currentProvider: '',
        costPerMonth: 500,
        dailyLeads: 100,
        currentContactRate: 20, // %
        callsPerPerson: 50,
        talkTime: 5, // mins
        currentSales: 100000,
        goalSales: 200000,
    });

    const [selectedProviderId, setSelectedProviderId] = useState(providers[0].id);

    // Derived Calculations
    const leadsPerMonth = inputs.dailyLeads * 21;
    const currentContacts = leadsPerMonth * (inputs.currentContactRate / 100);
    const valuePerContact = inputs.currentSales / currentContacts;

    // Selected Provider Stats
    const selectedProvider = providers.find(p => p.id === selectedProviderId) || providers[0];
    const newContactRate = selectedProvider.contactRate;

    // Projected Stats
    const projectedContacts = leadsPerMonth * (newContactRate / 100);
    const projectedSales = projectedContacts * valuePerContact;
    const salesIncrease = projectedSales - inputs.currentSales;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInputChange = (field: string, value: any) => {
        setInputs(prev => ({ ...prev, [field]: value }));
    };

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-6 lg:px-8 relative">
            {/* <LeadCaptureModal isOpen={showGate} /> */}
            {/* {mounted && !isUnlocked && (
                <div className="absolute inset-0 z-40 bg-white/50 backdrop-blur-sm pointer-events-none"></div>
            )} */}
            <div className="mx-auto max-w-5xl">
                <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Directory
                </Link>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Input Column */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                                <Calculator className="w-8 h-8 text-blue-600" /> VOIP ROI Calc
                            </h1>
                            <p className="mt-2 text-slate-600">Simulate how a higher contact rate impacts your bottom line.</p>
                        </div>

                        {/* Upsell Banner */}
                        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Shield className="w-6 h-6 text-indigo-600" />
                                <div>
                                    <h3 className="font-bold text-indigo-900 text-sm">Need better rates?</h3>
                                    <p className="text-indigo-700 text-xs">Rent a pre-cleaned number instantly.</p>
                                </div>
                            </div>
                            <Link href="/remediate" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-lg text-xs transition-colors whitespace-nowrap">
                                Get Clean Number
                            </Link>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                            <h2 className="text-lg font-bold text-slate-800 border-b pb-2">1. Your Current Metrics</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Monthly Cost ($)</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-md"
                                        value={inputs.costPerMonth}
                                        onChange={(e) => handleInputChange('costPerMonth', Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Daily Leads (21 Days)</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-md"
                                        value={inputs.dailyLeads}
                                        onChange={(e) => handleInputChange('dailyLeads', Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Calls Per Person</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-md"
                                        value={inputs.callsPerPerson}
                                        onChange={(e) => handleInputChange('callsPerPerson', Number(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Total Sales ($)</label>
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded-md"
                                        value={inputs.currentSales}
                                        onChange={(e) => handleInputChange('currentSales', Number(e.target.value))}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Current Contact Rate (%)</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md bg-white"
                                    value={inputs.currentContactRate}
                                    onChange={(e) => handleInputChange('currentContactRate', Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                            <h2 className="text-lg font-bold text-slate-800 border-b pb-2">2. Simulate Provider</h2>
                            <div>
                                <label className="block text-xs font-semibold text-slate-500 mb-1">Select Provider to Compare</label>
                                <select
                                    className="w-full p-2 border rounded-md bg-white"
                                    value={selectedProviderId}
                                    onChange={(e) => setSelectedProviderId(e.target.value)}
                                >
                                    {providers.filter(p => p.featured).map(p => (
                                        <option key={p.id} value={p.id}>{p.name} ({p.contactRate}% Rate)</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Column */}
                    <div className="flex-1">
                        <div className="bg-white text-slate-900 rounded-2xl shadow-xl p-8 sticky top-8 border border-slate-200">
                            <h2 className="text-xl font-bold mb-6 text-slate-900">Projected Revenue Impact</h2>

                            {/* The Chart Container */}
                            <div className="relative h-64 w-full border-l border-b border-slate-200 mb-8 ml-4">
                                {/* Y-Axis Grid Lines */}
                                <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400">
                                    <div className="relative w-full border-t border-slate-100"><span className="absolute -left-12 -top-2">${(projectedSales * 1.2 / 1000).toFixed(0)}k</span></div>
                                    <div className="relative w-full border-t border-slate-100"><span className="absolute -left-12 -top-2">${(projectedSales * 0.8 / 1000).toFixed(0)}k</span></div>
                                    <div className="relative w-full border-t border-slate-100"><span className="absolute -left-12 -top-2">${(projectedSales * 0.4 / 1000).toFixed(0)}k</span></div>
                                    <div className="relative w-full"></div>
                                </div>

                                {/* Bars Area */}
                                <div className="absolute inset-0 flex items-end justify-around px-8">

                                    {/* Current Bar */}
                                    <div className="w-20 group relative flex flex-col justify-end h-full">
                                        <div
                                            className="w-full bg-slate-400 rounded-t-md transition-all duration-500 hover:bg-slate-500 relative"
                                            style={{ height: `${(inputs.currentSales / (projectedSales * 1.2)) * 100}%` }}
                                        >
                                            <div className="absolute -top-6 w-full text-center text-xs font-bold text-slate-600">
                                                ${(inputs.currentSales / 1000).toFixed(0)}k
                                            </div>
                                        </div>
                                        <div className="text-center mt-2 text-sm font-semibold text-slate-500">Current</div>
                                    </div>

                                    {/* Potential Bar */}
                                    <div className="w-20 group relative flex flex-col justify-end h-full">
                                        <div
                                            className="w-full bg-blue-600 rounded-t-md transition-all duration-500 hover:bg-blue-500 relative shadow-lg shadow-blue-200"
                                            style={{ height: `${(projectedSales / (projectedSales * 1.2)) * 100}%` }}
                                        >
                                            <div className="absolute -top-6 w-full text-center text-xs font-bold text-blue-600">
                                                ${(projectedSales / 1000).toFixed(0)}k
                                            </div>
                                        </div>
                                        <div className="text-center mt-2 text-sm font-bold text-blue-600">Potential</div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Stats */}
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 grid grid-cols-2 gap-8 text-center">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Additional Revenue</div>
                                    <div className="text-3xl font-extrabold text-green-600 mt-1">
                                        +${salesIncrease.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1">per month</div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Contact Rate Lift</div>
                                    <div className="text-3xl font-extrabold text-blue-600 mt-1">
                                        {(newContactRate - inputs.currentContactRate).toFixed(0)}%
                                    </div>
                                    <div className="text-xs text-slate-400 mt-1">more connections</div>
                                </div>
                            </div>

                            {/* CTA */}
                            <div className="mt-8">
                                <a
                                    href={selectedProvider.affiliateLink || selectedProvider.website}
                                    target="_blank"
                                    className="block w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                                >
                                    See {selectedProvider.name}'s Pricing
                                </a>
                                <p className="text-center text-xs text-slate-400 mt-4">
                                    Maximize your lead value with higher contact rates.
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
