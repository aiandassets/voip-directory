import Link from 'next/link';
import { ArrowRight, ShieldCheck, BarChart3, Phone, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* HERO SECTION */}
      <div className="relative isolate overflow-hidden bg-slate-900 pt-14 pb-24 sm:pb-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-slate-900 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">DialSignal</span>
            </h1>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-200 sm:text-4xl mb-8">
              Is Your Number Marked as Spam?
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              Enter your phone number below to instantly check its reputation, spam labeling, and connectivity score across major carriers.
            </p>

            {/* SPAM CHECKER INPUT HERO */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto">
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full min-w-0 flex-auto rounded-xl border-0 bg-white/5 px-4 py-3.5 text-white shadow-sm ring-1 ring-inset ring-white/20 focus:ring-2 focus:ring-inset focus:ring-emerald-500 sm:text-sm sm:leading-6 backdrop-blur-sm"
              />
              <Link
                href="/spam-checker" // For now, linking to full tool. Later can embed logic.
                className="w-full sm:w-auto flex-none rounded-xl bg-emerald-500 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 transition-all"
              >
                Check Reputation
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              100% Free & Anonymous. No name required.
            </p>
          </div>
        </div>
      </div>

      {/* FEATURE GRID */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-emerald-600">Complete Transparency</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Everything you need to master your contact rates.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-slate-900 dark:text-white">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <BarChart3 className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                VOIP Provider Rankings
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-400">
                See which providers have the highest answer rates. Real data submitted by users like you.
                <div className="mt-4">
                  <Link href="/rankings" className="text-emerald-600 font-semibold hover:text-emerald-500 inline-flex items-center gap-1">
                    View Rankings <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-slate-900 dark:text-white">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <Phone className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Get Clean Numbers
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-400">
                Need a fresh start? Get a certified "Clean" number instantly. Pre-warmed and ready for outreach.
                <div className="mt-4">
                  <Link href="/remediate" className="text-indigo-600 font-semibold hover:text-indigo-500 inline-flex items-center gap-1">
                    Buy A Number <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-slate-900 dark:text-white">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                  <ShieldCheck className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Full Remediation
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-400">
                Is your main business line flagged? We advocate on your behalf to remove "Spam Likely" labels.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-slate-900 dark:text-white">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-600">
                  <Lock className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                Secure Dashboard
              </dt>
              <dd className="mt-2 text-base leading-7 text-slate-600 dark:text-slate-400">
                Manage your numbers, invoices, and subscriptions in one place. No contracts. Cancel anytime.
              </dd>
            </div>

          </dl>
        </div>
      </div>
    </div>
  );
}
