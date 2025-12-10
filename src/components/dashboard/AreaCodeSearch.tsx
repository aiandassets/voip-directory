'use client';

import { useState } from 'react';
import { Search, Loader2, ShoppingCart, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export function AreaCodeSearch() {
    const [areaCode, setAreaCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<string[]>([]);
    const [purchasing, setPurchasing] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    const router = useRouter();
    const supabase = createClient();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (areaCode.length < 3) return;

        setLoading(true);
        setResults([]);
        setMessage(null);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        // Generate 3 mock numbers
        const mockNumbers = [
            `(${areaCode}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            `(${areaCode}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
            `(${areaCode}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        ];
        setResults(mockNumbers);
        setLoading(false);
    };

    const buyNumber = async (number: string) => {
        setPurchasing(number);

        // In a real app, this would redirect to Stripe Checkout
        // Here we simulate a "Successful Payment" callback

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { error } = await supabase.from('numbers').insert({
                user_id: user.id,
                phone_number: number,
                area_code: areaCode,
                status: 'active'
            });

            if (error) throw error;

            setMessage(`Successfully purchased ${number}!`);
            setResults([]);
            setAreaCode('');
            router.refresh(); // Refresh dashboard to show new number
        } catch (err: any) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setPurchasing(null);
        }
    };

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
                <h3 className="text-lg font-semibold leading-none tracking-tight">Get a Clean Number</h3>
                <p className="text-sm text-muted-foreground mt-2">
                    Search inventory for certified clean numbers.
                </p>

                <form onSubmit={handleSearch} className="mt-6 flex gap-2">
                    <input
                        type="text"
                        maxLength={3}
                        placeholder="Area Code (e.g. 512)"
                        value={areaCode}
                        onChange={(e) => setAreaCode(e.target.value.replace(/\D/g, ''))}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={loading || areaCode.length < 3}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                    </button>
                </form>

                {message && (
                    <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-md text-sm flex items-center gap-2">
                        <Check className="h-4 w-4" /> {message}
                    </div>
                )}

                <div className="mt-6 space-y-3">
                    {results.map((num) => (
                        <div key={num} className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 dark:bg-slate-900">
                            <span className="font-mono font-medium">{num}</span>
                            <button
                                onClick={() => buyNumber(num)}
                                disabled={!!purchasing}
                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-500 h-8 px-3"
                            >
                                {purchasing === num ? <Loader2 className="h-3 w-3 animate-spin" /> : <ShoppingCart className="h-3 w-3" />}
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
