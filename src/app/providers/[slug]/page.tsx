import { providers } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ProviderDetail } from '@/components/ProviderDetail';

export function generateStaticParams() {
    return providers.map((provider) => ({
        slug: provider.id,
    }));
}

export default async function ProviderPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const provider = providers.find((p) => p.id === slug);
    const rank = providers.findIndex(p => p.id === slug) + 1;

    if (!provider) {
        return notFound();
    }

    return <ProviderDetail provider={provider} rank={rank} />;
}
