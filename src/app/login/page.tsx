'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Loader2, CheckCircle } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const router = useRouter()
    const supabase = createClient()

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        // 1. Sign up
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
            },
        })

        if (error) {
            setMessage(`Error: ${error.message}`)
            setLoading(false)
        } else {
            // Success
            setMessage('Check your email for the confirmation link.')
            setLoading(false)
        }
    }

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            setMessage(`Error: ${error.message}`)
            setLoading(false)
        } else {
            router.refresh()
            router.push('/dashboard')
        }
    }

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-slate-50 dark:bg-slate-950">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link href="/" className="flex justify-center flex-col items-center group">
                    <Shield className="h-10 w-10 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-slate-900 dark:text-white">
                        DialSignal
                    </h2>
                </Link>
                <h2 className="mt-2 text-center text-lg font-medium leading-9 tracking-tight text-slate-600 dark:text-slate-400">
                    {view === 'sign-in' ? 'Sign in to your dashboard' : 'Create a free account'}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="bg-white dark:bg-slate-900 px-6 py-8 shadow sm:rounded-xl border border-slate-200 dark:border-slate-800">
                    <form className="space-y-6" onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-slate-900 dark:text-white">
                                    Password
                                </label>
                                {view === 'sign-in' && (
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-emerald-600 hover:text-emerald-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                )}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6 dark:bg-slate-800 dark:ring-slate-700 dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full justify-center rounded-md bg-emerald-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (view === 'sign-in' ? 'Sign in' : 'Create Account')}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        {message && (
                            <div className={`p-3 rounded-lg text-sm flex items-start gap-2 ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                {message.includes('Error') ? null : <CheckCircle className="h-4 w-4 mt-0.5" />}
                                {message}
                            </div>
                        )}
                    </div>
                </div>

                <p className="mt-10 text-center text-sm text-slate-500">
                    {view === 'sign-in' ? 'Not a member? ' : 'Already have an account? '}
                    <button
                        onClick={() => {
                            setView(view === 'sign-in' ? 'sign-up' : 'sign-in');
                            setMessage(null);
                        }}
                        className="font-semibold leading-6 text-emerald-600 hover:text-emerald-500">
                        {view === 'sign-in' ? 'Create a free account' : 'Sign in'}
                    </button>
                </p>
            </div>
        </div>
    )
}
