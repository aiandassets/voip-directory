'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UpgradePage() {
    const router = useRouter();

    useEffect(() => {
        router.push('/remediate');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <p className="text-slate-500">Redirecting to our Services...</p>
        </div>
    );
}
