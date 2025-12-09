'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle, FileText, Phone } from 'lucide-react';

export default function SetupGuidesPage() {
    return (
        <main className="min-h-screen bg-slate-50 py-12 px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <Link href="/remediate" className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Services
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Adding Your Clean Number to Your VoIP</h1>
                    <p className="text-lg text-slate-600">
                        Most platforms allow you to use an external number as your Caller ID if you prove ownership. <br />
                        When you rent a Clean Number from us, we provide the <strong>Proof of Ownership</strong> document you need.
                    </p>
                </div>

                <div className="space-y-8">

                    {/* RingCentral */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">R</div>
                            <h2 className="text-xl font-bold text-slate-900">RingCentral Setup</h2>
                        </div>
                        <div className="p-6 sm:p-8 space-y-4">
                            <Step number={1} title="Download Proof">
                                Go to your <span className="font-mono text-indigo-600 bg-indigo-50 px-1 rounded">Dashboard</span> and download the "Ownership Certificate PDF" for your rented number.
                            </Step>
                            <Step number={2} title="Navigate to Admin Portal">
                                Log in to RingCentral Admin → <strong>Phone System</strong> → <strong>Phones & Devices</strong>.
                            </Step>
                            <Step number={3} title="Add Verified Caller ID">
                                Select "Company Numbers" or a specific user. Look for <strong>"Substitute Caller ID"</strong> or "Verified Caller ID".
                            </Step>
                            <Step number={4} title="Upload & Verify">
                                Upload the Ownership Certificate when prompted. RingCentral may also call the number to verify.
                            </Step>
                            <Step number={5} title="Get the Code">
                                If they call/text for verification, check your <span className="font-mono text-indigo-600 bg-indigo-50 px-1 rounded">Dashboard</span> for the incoming OTP code (we capture it automatically).
                            </Step>
                        </div>
                    </div>

                    {/* Five9 */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-cyan-50/50 px-6 py-4 border-b border-cyan-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-white font-bold">F</div>
                            <h2 className="text-xl font-bold text-slate-900">Five9 Setup</h2>
                        </div>
                        <div className="p-6 sm:p-8 space-y-4">
                            <Step number={1} title="Campaign Profile">
                                Open the VCC Admin application. Navigate to <strong>Campaign Profiles</strong>.
                            </Step>
                            <Step number={2} title="Set ANI (Caller ID)">
                                In the "General" tab, look for the <strong>"Default ANI"</strong> setting.
                            </Step>
                            <Step number={3} title="Add Number">
                                Enter your new Clean Number. Five9 requires you to verify ownership by receiving a call.
                            </Step>
                            <Step number={4} title="Receive Verification">
                                Trigger the verification call. Status will update on your <span className="font-mono text-indigo-600 bg-indigo-50 px-1 rounded">Dashboard</span> showing "Call Received - Verified".
                            </Step>
                        </div>
                    </div>

                    {/* Dialpad */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-purple-50/50 px-6 py-4 border-b border-purple-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold">D</div>
                            <h2 className="text-xl font-bold text-slate-900">Dialpad / Talkdesk / Twilio</h2>
                        </div>
                        <div className="p-6 sm:p-8 text-slate-600">
                            <p className="mb-4">
                                Most modern VoIP platforms follow a similar "Verify by Call" process:
                            </p>
                            <ul className="space-y-2 mb-6">
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>Find "Caller ID" or "External Numbers" in Settings.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>Enter the Clean Number.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>Generate a Verification Call.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                                    <span>Get the OTP Code from our Dashboard.</span>
                                </li>
                            </ul>
                            <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3 text-sm">
                                <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                <p>
                                    <strong>Note:</strong> Some enterprise plans may require manual support tickets. We provide a pre-written "Authorization Letter" PDF to attach to these tickets.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}

function Step({ number, title, children }: { number: number, title: string, children: React.ReactNode }) {
    return (
        <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
                {number}
            </div>
            <div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="text-slate-600 text-sm mt-1 leading-relaxed">{children}</p>
            </div>
        </div>
    );
}
