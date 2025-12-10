'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Clock, Shield, ArrowRight, Phone, AlertTriangle, Star, MapPin, ArrowDown } from 'lucide-react';

export default function RemediatePage() {
    const [areaCode, setAreaCode] = useState('');
    const [forwardingNumber, setForwardingNumber] = useState('');

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Hero Section */}
            <div className="bg-slate-900 py-20 lg:py-28 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                    <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-sm font-semibold text-red-400 ring-1 ring-inset ring-red-500/20 mb-6">
                        <AlertTriangle className="h-4 w-4" /> Stop Losing Sales Today
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                        Is "Scam Likely" Killing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Your Contact Rate?</span>
                    </h1>
                    <p className="text-lg leading-8 text-slate-300 max-w-2xl mx-auto mb-10">
                        Top sales teams don't wait 14 days for carriers to maybe fix their reputation. <br />
                        <strong>Get a verified clean number instantly</strong> or let us handle the remediation bureaucracy for you.
                    </p>
                </div>
            </div>

            {/* Pricing / Options Section */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 -mt-16 pb-24 relative z-20">
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">

                    {/* Option 1: Clean Swap (Fast) */}
                    <div className="bg-white rounded-3xl shadow-xl ring-1 ring-slate-900/10 p-8 sm:p-10 transform transition-all hover:-translate-y-1 hover:shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                            Recommended
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                                <Phone className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">The "Clean Swap"</h3>
                                <p className="text-sm text-slate-500">Instant Relief</p>
                            </div>
                        </div>
                        <p className="text-slate-600 mb-6 min-h-[60px]">
                            Rent a pre-vetted, warmed-up number with a <strong>Clean Reputation</strong> score. Start dialing in 5 minutes.
                        </p>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-4xl font-bold tracking-tight text-slate-900">$29</span>
                            <span className="text-sm font-semibold leading-6 text-slate-400">/number/mo</span>
                        </div>
                        <ul className="space-y-3 mb-8 text-sm text-slate-600">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <span><strong>Instant Activation</strong> (No waiting)</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <span>Verified "Safe" Reputation Score</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <span>Area Code Selection Available</span>
                            </li>
                        </ul>
                        <div className="border-t border-slate-100 pt-6 mt-6">
                            <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-emerald-600" />
                                Customize Your Number
                            </h4>
                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Preferred Area Code (Optional)</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 512, 415, 212"
                                        className="w-full text-sm border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        value={areaCode}
                                        onChange={(e) => setAreaCode(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Forward Calls To (Optional)</label>
                                    <input
                                        type="tel"
                                        placeholder="Your cell or office line"
                                        className="w-full text-sm border-slate-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                                        value={forwardingNumber}
                                        onChange={(e) => setForwardingNumber(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                onClick={() => {
                                    // Save preferences
                                    localStorage.setItem('trustdial_order_prefs', JSON.stringify({ areaCode, forwardingNumber }));
                                    // Redirect to Stripe
                                    window.location.href = "https://buy.stripe.com/8x2cN5essh1m57D2T68EM05";
                                }}
                                className="w-full text-center rounded-xl bg-emerald-600 px-3.5 py-4 text-base font-bold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all flex items-center justify-center gap-2"
                            >
                                Get a Clean Number Now <ArrowRight className="w-4 h-4" />
                            </button>
                            <p className="text-xs text-center text-slate-400 mt-2">
                                You'll be redirected to Stripe for secure checkout.
                            </p>
                        </div>
                    </div>

                    {/* Option 2: Remediation (Slow) */}
                    <div className="bg-slate-50 rounded-3xl ring-1 ring-slate-900/5 p-8 sm:p-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                <Shield className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Full Remediation</h3>
                                <p className="text-sm text-slate-500">Fix Your Own Numbers</p>
                            </div>
                        </div>
                        <p className="text-slate-600 mb-6 min-h-[60px]">
                            We handle the paperwork with Hiya, First Orion, and TNS to restore your number's reputation.
                        </p>
                        <div className="flex items-baseline gap-2 mb-8">
                            <span className="text-4xl font-bold tracking-tight text-slate-900">$99</span>
                            <span className="text-sm font-semibold leading-6 text-slate-400">one-time fee</span>
                        </div>
                        <ul className="space-y-3 mb-8 text-sm text-slate-600">
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                <span>Submission to All 3 Major Registries</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
                                <span><strong>7-14 Day</strong> Turnaround Time</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                                <span>"Proof of Submission" Certificate</span>
                            </li>
                        </ul>
                        <a href="https://buy.stripe.com/9B6fZh3NO26s43z9hu8EM04" className="block w-full text-center rounded-xl bg-white border-2 border-slate-200 px-3.5 py-4 text-base font-bold text-slate-900 shadow-sm hover:border-indigo-600 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all">
                            Start Remediation Process
                        </a>
                    </div>

                </div>

                <div className="mt-12 text-center">
                    <p className="text-sm text-slate-500 max-w-2xl mx-auto">
                        * "Clean Swap" numbers are verified daily. Remediation success depends on carrier discretion and your calling patterns.
                        We guarantee submission, not carrier acceptance.
                        <Link href="/terms" className="underline ml-1">Terms apply</Link>.
                    </p>
                </div>

                {/* FAQ / How It Works */}
                <div className="mt-24 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">How It Works with Your Current VoIP</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 font-bold text-indigo-600">1</div>
                            <h4 className="font-bold text-slate-900 mb-2">Rent the Number</h4>
                            <p className="text-sm text-slate-600">Secure a pre-warmed number from our pool. You get ownership proof immediately.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 font-bold text-indigo-600">2</div>
                            <h4 className="font-bold text-slate-900 mb-2">Verify in Your System</h4>
                            <p className="text-sm text-slate-600">Login to RingCentral/Five9/Dialpad. Add the number as a "Verified Caller ID".</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 font-bold text-indigo-600">3</div>
                            <h4 className="font-bold text-slate-900 mb-2">Start Dialing</h4>
                            <p className="text-sm text-slate-600">We receive the verification call/code for you. Once verified, you can dial out instantly.</p>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/remediate/guides" className="text-indigo-600 font-semibold hover:text-indigo-500 flex items-center justify-center gap-1">
                            Read detailed setup guides for RingCentral, Five9 & more <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Testimonial / Trust */}
            <div className="bg-white py-16 border-t border-slate-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <div className="flex justify-center gap-1 text-yellow-500 mb-4">
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                        <Star className="fill-current w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">"Saved our Q4 sales goals."</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto italic">
                        "We were getting blocked daily. The Clean Swap numbers let us keep dialing while the remediation team fixed our main lines. Contact rate went from 3% back to 15% overnight."
                    </p>
                    <div className="mt-4 font-semibold text-slate-900">- Sarah Jenkins, VP of Sales</div>
                </div>
            </div>

        </main>
    );
}
