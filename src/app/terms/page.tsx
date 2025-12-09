import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
    title: 'Terms & Conditions - VOIP Directory',
    description: 'Terms of service and TCPA opt-in agreement.',
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="bg-slate-900 pb-16 pt-10 lg:pt-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-4">
                        <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" /> Back to Directory
                        </Link>
                    </nav>
                    <div className="mt-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Terms & Conditions</h1>
                        <p className="mt-4 text-lg text-slate-400 max-w-3xl">
                            Please read our terms regarding data collection and communications.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8 lg:px-10">
                <div className="prose prose-slate dark:prose-invert max-w-none">
                    <h2>TCPA Opt-In Agreement</h2>
                    <p className="mb-6">
                        By submitting your information on this website (VOIP Directory), you agree to the following terms:
                    </p>

                    <div className="p-6 bg-secondary/20 rounded-xl border border-border">
                        <p className="font-medium text-foreground">
                            "I hereby consent to receive marketing communications, including calls, text messages, and emails, from VOIP Directory and its affiliates/partners regarding VOIP rates, services, and related offers. I understand that these communications may be generated using automated technology (including autodialers and prerecorded messages) and that my consent is not a condition of purchase. I agree that this consent applies even if my number is listed on a Do Not Call registry. I understand that this consent is valid for a period of 90 days from the date of submission."
                        </p>
                    </div>

                    <h3 className="mt-8">Data Usage</h3>
                    <p>
                        We use the data you provide (Contact Rates, Provider Info) to benchmark VOIP performance.
                        Your personal contact details are used solely for the purpose of communicating with you regarding these benchmarks and related services.
                    </p>

                    <h3 className="mt-8">Privacy</h3>
                    <p>
                        We respect your privacy. We do not sell your personal data to public lists.
                        Data is shared only with verified partners for the purpose of providing relevant quotes or information requested.
                    </p>
                </div>
            </div>
        </div>
    );
}
