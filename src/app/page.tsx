import { providers } from '@/lib/data';
import { ProviderCard } from '@/components/ProviderCard';

export const metadata = {
  title: 'VOIP Directory - Top Rated Providers',
  description: 'Find the best VOIP providers ranked by actual contact rates and call volume.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="relative isolate overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
        </div>

        <div className="mx-auto max-w-5xl px-6 pt-16 pb-20 sm:px-8 lg:px-10 lg:pt-24 lg:pb-28">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              VOIP Directory & <span className="text-primary">Contact Rates</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We rank VOIP providers based on real-world performance metrics. <br className="hidden sm:inline" />
              See who delivers the best contact rates at scale.
            </p>
          </div>

          <div className="mt-16 sm:mt-24 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <h2 className="text-2xl font-bold tracking-tight">Top Ranked Providers</h2>
              <span className="text-sm text-muted-foreground">Updated Today</span>
            </div>

            <div className="grid gap-6">
              {providers.map((provider, index) => (
                <ProviderCard key={provider.id} provider={provider} rank={index + 1} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
