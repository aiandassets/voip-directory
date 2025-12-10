'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useUnlock } from '@/context/UnlockContext';
import { useMembers } from '@/context/MemberContext';
import { Lock, Loader2 } from 'lucide-react';

interface Props {
    triggerButton?: React.ReactElement;
    isOpen?: boolean;
    onClose?: () => void;
}

export function LeadCaptureModal({ triggerButton, isOpen: forceOpen, onClose }: Props) {
    const { unlock } = useUnlock();
    const { addMember } = useMembers();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [contactRate, setContactRate] = useState('');
    const [provider, setProvider] = useState('');
    const [optIn, setOptIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const show = forceOpen || isOpen;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const subject = "New TrustDial Lead & Data Submission";
        const body = `
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone}
Current Provider: ${provider}
Reported Contact Rate: ${contactRate}%
Opt-In: ${optIn ? 'Yes (90 Days)' : 'No'}
        `.trim();

        // Simulating Account Creation
        if (password) {
            localStorage.setItem('voip-directory-user-password', password);
        }

        // Add to Client DB
        addMember({
            name,
            email,
            company,
            phone,
            provider,
            contactRate,
            optIn,
        });

        // Optional: Keep mailto if they still want email backup, or remove if database is primary
        // window.location.href = mailtoLink;

        console.log('LEAD CAPTURED:', { name, email, company, phone, provider, contactRate, optIn });

        await new Promise(resolve => setTimeout(resolve, 800));

        unlock(email);
        setIsLoading(false);
        setIsOpen(false);
        if (onClose) onClose();
    };

    const modalContent = (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => {
                setIsOpen(false);
                if (onClose) onClose();
            }}
        >
            <div
                className="relative w-full max-w-2xl rounded-2xl bg-card p-6 shadow-2xl ring-1 ring-white/10 max-h-[95vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={() => {
                        setIsOpen(false);
                        if (onClose) onClose();
                    }}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <line x1="18" x2="6" y1="6" y2="18"></line>
                        <line x1="6" x2="18" y1="6" y2="18"></line>
                    </svg>
                    <span className="sr-only">Close</span>
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                    <h2 className="text-2xl font-bold">Unlock Full Access</h2>
                    <p className="mt-1 text-muted-foreground">
                        Create a free member account to access the tools forever.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="name" className="sr-only">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                required
                                placeholder="Full Name"
                                className="w-full rounded-lg bg-secondary/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">Work Email</label>
                            <input
                                type="email"
                                id="email"
                                required
                                placeholder="Work Email"
                                className="w-full rounded-lg bg-secondary/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">Create Password</label>
                            <input
                                type="password"
                                id="password"
                                required
                                placeholder="Create Password"
                                minLength={6}
                                className="w-full rounded-lg bg-secondary/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="company" className="sr-only">Company Name</label>
                            <input
                                type="text"
                                id="company"
                                required
                                placeholder="Company Name"
                                className="w-full rounded-lg bg-secondary/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="sr-only">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                placeholder="Phone Number"
                                className="w-full rounded-lg bg-secondary/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="provider" className="sr-only">Current Provider</label>
                            <select
                                id="provider"
                                required
                                className="w-full rounded-lg bg-secondary/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                            >
                                <option value="" disabled>Select Current Provider</option>
                                <option value="Ricochet360">Ricochet360</option>
                                <option value="Five9">Five9</option>
                                <option value="RingCentral">RingCentral</option>
                                <option value="Dialpad">Dialpad</option>
                                <option value="Talkdesk">Talkdesk</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="contactRate" className="sr-only">Est. Contact Rate %</label>
                            <select
                                id="contactRate"
                                required
                                className="w-full rounded-lg bg-secondary/50 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                                value={contactRate}
                                onChange={(e) => setContactRate(e.target.value)}
                            >
                                <option value="" disabled>Est. Contact Rate %</option>
                                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(rate => (
                                    <option key={rate} value={rate}>{rate}%</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-lg border border-border p-3">
                        <input
                            type="checkbox"
                            id="optIn"
                            checked={optIn}
                            onChange={(e) => setOptIn(e.target.checked)}
                            className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="optIn" className="text-sm text-muted-foreground">
                            I agree to receive communications and updates. <br />
                            <a href="/terms" target="_blank" className="underline hover:text-foreground">Click to view Terms & Conditions (TCPA)</a>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex w-full items-center justify-center rounded-lg bg-primary py-4 font-bold text-white text-lg transition-all hover:bg-primary/90 disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : null}
                        {isLoading ? 'Processing...' : 'Create Free Account & Unlock'}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            if (onClose) onClose();
                        }}
                        className="w-full rounded-lg py-3 font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
                    >
                        Cancel
                    </button>


                </form>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                    By leveraging open source data, we help everyone eliminate bad contact rates.
                </p>
            </div>
        </div>
    );

    return (
        <>
            {triggerButton ? (
                React.cloneElement(triggerButton, {
                    onClick: (e: React.MouseEvent) => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const props = triggerButton.props as any;
                        if (props.onClick) props.onClick(e);
                        setIsOpen(true);
                    }
                } as any)
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="rounded-lg bg-primary px-6 py-2 font-bold text-white transition-all hover:opacity-90"
                >
                    Unlock
                </button>
            )}

            {show && mounted ? createPortal(modalContent, document.body) : null}
        </>
    );
}
