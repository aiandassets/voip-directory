'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUnlock } from '@/context/UnlockContext';
import { Loader2, Lock } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useUnlock();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate Network Request
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (email === 'admin@voip.com' && password === 'admin') {
            login('admin', email);
            router.push('/admin');
        } else if (password.length >= 6) {
            // Any other valid password = Member Login (Demo)
            login('member', email);
            router.push('/dashboard');
        } else {
            setError('Invalid credentials');
        }

        setIsLoading(false);
    };

    return (
        <div className="flex min-h-screen flex-col justify-center bg-background px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Lock className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-foreground">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-foreground">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full rounded-md border-0 bg-secondary/50 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-transparent placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-foreground">
                                Password
                            </label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-primary hover:text-primary/80">
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 bg-secondary/50 py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-transparent placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 px-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500 text-center">{error}</p>
                    )}

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-muted-foreground">
                    Not a member?{' '}
                    <a href="/" className="font-semibold leading-6 text-primary hover:text-primary/80">
                        Check rates & unlock access
                    </a>
                </p>
                <div className="mt-4 text-center text-xs text-muted-foreground/50 border-t pt-4">
                    <p>Demo Admin Login: admin@voip.com / admin</p>
                </div>
            </div>
        </div>
    );
}
