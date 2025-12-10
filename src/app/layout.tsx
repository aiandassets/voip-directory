import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrustDial - The Credit Score for Your Phone Numbers",
  description: "Check your spam risk, compare contact rates, and get instant clean numbers. The first transparency tool for VOIP performance.",
};

import { UnlockProvider } from '@/context/UnlockContext';
import { MemberProvider } from '@/context/MemberContext';
import { Navbar } from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <UnlockProvider>
          <MemberProvider>
            <Navbar />
            {children}
          </MemberProvider>
        </UnlockProvider>
      </body>
    </html>
  );
}
