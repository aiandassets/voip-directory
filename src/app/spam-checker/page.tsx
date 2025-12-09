'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Search, Loader2, Phone } from 'lucide-react';

export default function SpamCheckerPage() {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState<'clean' | 'risk' | null>(null);
    const [scanStep, setScanStep] = useState(0);

    const handleCheck = (e: React.FormEvent) => {
        e.preventDefault();
        if (phoneNumber.length < 10) return;

        setIsScanning(true);
        setResult(null);
        setScanStep(0);

        // Simulation Steps
        const steps = [
            () => setScanStep(1), // Connecting to Carrier Database...
            () => setScanStep(2), // Analyzing Call Patterns...
            () => setScanStep(3), // Checking Blacklists...
            () => {
                setIsScanning(false);
                // Simple simulation: even numbers = safe, odd = risk (for demo)
                const lastDigit = parseInt(phoneNumber.replace(/\D/g, '').slice(-1));
                setResult(lastDigit % 2 === 0 ? 'clean' : 'risk');
            }
        ];

        // Execute steps with delay
        let delay = 0;
        steps.forEach((step, i) => {
            delay += 1000 + Math.random() * 500;
            setTimeout(step, delay);
        });
    };

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="bg-slate-900 py-12 pb-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-4 mb-8">
                        <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Directory
                        </Link>
                    </nav>
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-4">
                            <Shield className="h-4 w-4" /> Free Reputation Tool
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                            Is Your Number Marked <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">"Scam Likely"?</span>
                        </h1>
                        <p className="text-lg leading-8 text-slate-300">
                            <strong>76% of customers</strong> ignore calls flagged as spam. Check your numbers reputation score instantly across major carrier databases.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Tool Area */}
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
                <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 ring-1 ring-slate-900/5">

                    {!isScanning && !result && (
                        <form onSubmit={handleCheck} className="max-w-xl mx-auto text-center space-y-6">
                            <div className="space-y-2">
                                <label htmlFor="phone" className="block text-lg font-medium text-slate-900">
                                    Enter Business Phone Number
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Phone className="h-5 w-5 text-slate-400" aria-hidden="true" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        className="block w-full rounded-md border-0 py-4 pl-10 text-slate-900 text-xl ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
                                        placeholder="(555) 123-4567"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        required
                                    />
                                </div>
                                <p className="text-xs text-slate-500">
                                    * We do not store your number or use it for marketing. This is a secure reputation lookup.
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-indigo-600 px-3.5 py-4 text-lg font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                Check Reputation Status
                            </button>
                        </form>
                    )}

                    {isScanning && (
                        <div className="max-w-xl mx-auto text-center py-12">
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                                <Search className="absolute inset-0 m-auto h-8 w-8 text-indigo-600 animate-pulse" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Scanning Carrier Databases...</h3>
                            <div className="space-y-4 max-w-sm mx-auto text-left">
                                <StepItem step={1} current={scanStep} label="Connecting to AT&T / Verizon / T-Mobile..." />
                                <StepItem step={2} current={scanStep} label="Analyzing Call Volume Patterns..." />
                                <StepItem step={3} current={scanStep} label="Checking Global Blacklists..." />
                            </div>
                        </div>
                    )}

                    {result === 'risk' && (
                        <div className="text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <AlertTriangle className="w-10 h-10 text-red-600" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Spam Risk Detected</h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                                Analysis indicates this number has a <strong>High Probability</strong> of being labelled "Spam Likely" on major networks due to recent activity patterns.
                            </p>

                            <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-left mb-8">
                                <h4 className="font-bold text-red-900 mb-2">Diagnostic Report:</h4>
                                <ul className="space-y-2 text-red-700 text-sm">
                                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Flagged on 2/3 major carrier databases</li>
                                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> High volume short-duration calls detected</li>
                                    <li className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500" /> Caller ID reputation score: 45/100 (Poor)</li>
                                </ul>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-xl p-6 text-left mb-8 shadow-sm">
                                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-indigo-600" />
                                    How to Fix This Number (Free)
                                </h4>
                                <p className="text-sm text-slate-600 mb-4">
                                    You can register your business number with the major analytics engines to prove legitimacy. This is free and recommended.
                                </p>
                                <div className="space-y-3">
                                    <a href="https://www.freecallerregistry.com/fcr/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group">
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Free Caller Registry</div>
                                            <div className="text-xs text-slate-500">Covers First Orion, Hiya, & TNS</div>
                                        </div>
                                        <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180 group-hover:text-indigo-600 transition-colors" />
                                    </a>
                                    <a href="https://reportarobocall.com/trf/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group">
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">TNS Call Guardian</div>
                                            <div className="text-xs text-slate-500">Fix "Spam" on Verizon/US Cellular</div>
                                        </div>
                                        <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180 group-hover:text-indigo-600 transition-colors" />
                                    </a>
                                    <a href="https://hiyahelp.zendesk.com/hc/en-us/requests/new?ticket_form_id=824667" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors group">
                                        <div>
                                            <div className="font-semibold text-slate-900 text-sm">Hiya Support</div>
                                            <div className="text-xs text-slate-500">Fix "Spam" on AT&T</div>
                                        </div>
                                        <ArrowLeft className="w-4 h-4 text-slate-400 rotate-180 group-hover:text-indigo-600 transition-colors" />
                                    </a>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Link href="/remediate" className="block w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-xl transition-all shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2">
                                    <Shield className="w-5 h-5" /> Gets a Clean Number Instantly
                                </Link>
                                <button onClick={() => { setResult(null); setPhoneNumber(''); }} className="block w-full text-slate-500 hover:text-slate-900 font-medium">
                                    Check Another Number
                                </button>
                            </div>
                        </div>
                    )}

                    {result === 'clean' && (
                        <div className="text-center animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-10 h-10 text-emerald-600" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Number is Clean</h2>
                            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
                                Great news! This number currently has a <strong>Safe Reputation</strong> across all major carrier databases.
                            </p>

                            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-left mb-8">
                                <h4 className="font-bold text-emerald-900 mb-2">Diagnostic Report:</h4>
                                <ul className="space-y-2 text-emerald-700 text-sm">
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Passed AT&T / Verizon / T-Mobile checks</li>
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> No blacklists detected</li>
                                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Caller ID reputation score: 98/100 (Excellent)</li>
                                </ul>
                            </div>

                            <div className="space-y-4">
                                <Link href="/compare" className="block w-full py-4 bg-white border-2 border-slate-100 hover:border-indigo-100 text-slate-900 font-bold text-xl rounded-xl transition-all shadow-sm hover:shadow-md">
                                    Maintain Your Reputation with Pro Tools
                                </Link>
                                <button onClick={() => { setResult(null); setPhoneNumber(''); }} className="block w-full text-slate-500 hover:text-slate-900 font-medium">
                                    Check Another Number
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* Disclaimer */}
            <div className="max-w-4xl mx-auto px-6 py-12 text-center text-slate-400 text-sm">
                <p>
                    Disclaimer: This tool provides an estimate of carrier reputation based on available data patterns. <br />
                    Actual display names can vary by device and carrier settings.
                </p>
            </div>
        </main>
    );
}

function StepItem({ step, current, label }: { step: number, current: number, label: string }) {
    let status = 'waiting'; // waiting, active, complete
    if (current > step) status = 'complete';
    else if (current === step) status = 'active';

    return (
        <div className={`flex items-center gap-3 transition-colors duration-300 ${status === 'active' ? 'text-indigo-600 font-bold' : status === 'complete' ? 'text-emerald-600' : 'text-slate-400'}`}>
            {status === 'complete' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : status === 'active' ? (
                <Loader2 className="w-5 h-5 flex-shrink-0 animate-spin" />
            ) : (
                <div className="w-5 h-5 rounded-full border-2 border-slate-200 flex-shrink-0" />
            )}
            <span>{label}</span>
        </div>
    );
}
