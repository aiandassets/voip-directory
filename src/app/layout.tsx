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
  title: "DialSignal v3 | Check Number Reputation",
  description: "Is your business number marked 'Scam Likely'? Check your reputation instantly with DialSignal.",
  metadataBase: new URL('https://dialsignal.io'),
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
