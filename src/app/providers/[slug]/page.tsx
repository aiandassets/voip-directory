import { providers } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Phone, BarChart } from 'lucide-react';

interface Props {
    params: { slug: string };
}

export function generateStaticParams() {
    return providers.map((provider) => ({
        slug: provider.id,
    }));
}

export default function ProviderPage({ params }: Props) {
    const provider = providers.find((p) => p.id === params.slug);

    if (!provider) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-background pb-20">
            <div className="bg-slate-900 pb-24 pt-10 sm:pb-32 lg:pt-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-4">
                        <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Directory
                        </Link>
                    </nav>
                    <div className="mt-10">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{provider.name}</h1>
                        <p className="mt-2 text-lg text-slate-400 max-w-2xl">{provider.description}</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-[-4rem] max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-gray-900/5">
                            <h2 className="text-2xl font-bold tracking-tight mb-6">Performance Report</h2>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
                                <div className="rounded-xl bg-muted/50 p-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                        <BarChart className="h-4 w-4" /> Contact Rate
                                    </div>
                                    <div className={`text-3xl font-bold ${provider.contactRate >= 40 ? 'text-green-500' : 'text-blue-500'
                                        }`}>
                                        {provider.contactRate}%
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">Average connection rate</div>
                                </div>
                                <div className="rounded-xl bg-muted/50 p-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                        <Phone className="h-4 w-4" /> Call Volume
                                    </div>
                                    <div className="text-3xl font-bold text-foreground">
                                        {provider.callVolume}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">Calls per user / day</div>
                                </div>
                                <div className="rounded-xl bg-muted/50 p-4">
                                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
                                        <CheckCircle2 className="h-4 w-4" /> Score
                                    </div>
                                    <div className="text-3xl font-bold text-primary">
                                        {provider.score}
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">Performance Index</div>
                                </div>
                            </div>

                            <div className="prose prose-slate dark:prose-invert max-w-none">
                                {/* We would normally render markdown here safely. For now, simplistic rendering or just displaying text */}
                                <div className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                                    {provider.reportingInstructions.split('\n').map((line, i) => {
                                        if (line.trim().startsWith('###')) {
                                            return <h3 key={i} className="text-lg font-bold mt-6 mb-2">{line.replace('###', '').trim()}</h3>;
                                        }
                                        if (line.trim().match(/^\d\./)) {
                                            return <div key={i} className="ml-4 mb-1 pl-2 border-l-2 border-slate-200 dark:border-slate-800">{line.trim()}</div>
                                        }
                                        return <p key={i} className="mb-2">{line}</p>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-gray-900/5">
                            <h3 className="text-base font-semibold leading-7 text-foreground">Key Features</h3>
                            <ul className="mt-4 space-y-3">
                                {provider.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3 text-sm text-muted-foreground">
                                        <CheckCircle2 className="h-5 w-5 flex-none text-primary" aria-hidden="true" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 pt-6 border-t">
                                <a href={provider.website} target="_blank" rel="noopener noreferrer"
                                    className="block w-full rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                                    Visit Website
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
