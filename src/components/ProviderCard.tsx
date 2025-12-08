import Link from 'next/link';
import { Provider } from '@/lib/data';
import { ArrowRight, BarChart3, Phone } from 'lucide-react';

interface Props {
    provider: Provider;
    rank: number;
}

export function ProviderCard({ provider, rank }: Props) {
    const isTopTier = rank <= 3;

    return (
        <div className={`relative group overflow-hidden rounded-xl border p-6 transition-all hover:shadow-lg dark:hover:shadow-primary/10 ${isTopTier
                ? 'bg-gradient-to-br from-card to-secondary/30 border-primary/20'
                : 'bg-card border-border'
            }`}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full text-xl font-bold ${isTopTier ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground'
                        }`}>
                        #{rank}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold">{provider.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">{provider.description}</p>
                    </div>
                </div>
                <div className="hidden sm:block">
                    {/* Placeholder for logo if we had images */}
                    <div className="h-10 w-24 rounded bg-muted/20 animate-pulse" title="Logo Placeholder" />
                </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t pt-4 sm:grid-cols-4">
                <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Contact Rate</p>
                    <div className="mt-1 flex items-baseline gap-1">
                        <span className={`text-2xl font-bold ${provider.contactRate >= 40 ? 'text-green-500' :
                                provider.contactRate >= 20 ? 'text-yellow-500' : 'text-red-500'
                            }`}>
                            {provider.contactRate}%
                        </span>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Daily Calls</p>
                    <div className="mt-1 flex items-baseline gap-1">
                        <Phone className="h-4 w-4 text-muted-foreground/70" />
                        <span className="text-xl font-semibold">{provider.callVolume}</span>
                    </div>
                </div>

                <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Score</p>
                    <div className="mt-1 flex items-baseline gap-1">
                        <BarChart3 className="h-4 w-4 text-muted-foreground/70" />
                        <span className="text-xl font-semibold text-primary">{provider.score}</span>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <Link href={`/providers/${provider.id}`} className="group/btn inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        View Report <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                </div>
            </div>

            {provider.features.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {provider.features.slice(0, 3).map(f => (
                        <span key={f} className="inline-flex items-center rounded-full border border-transparent bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                            {f}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
