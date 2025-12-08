import { LucideIcon } from 'lucide-react';

export interface Provider {
    id: string;
    name: string;
    website: string;
    logo: string;
    description: string;
    contactRate: number; // Percentage, e.g., 55 for 55%
    callVolume: number; // Calls per user per day
    score: number; // Calculated score
    reportingInstructions: string; // Markdown content for report findings
    features: string[];
}

export const calculateScore = (contactRate: number, callVolume: number): number => {
    // Score = ContactRate * log10(CallVolume). 
    // Base logic: High volume with high contact rate is better than low volume with high contact rate.
    // Example: 
    // Ricochet: 50% * log(500) = 50 * 2.7 = 135
    // Other: 20% * log(100) = 20 * 2 = 40
    // Other: 60% * log(50) = 60 * 1.7 = 102

    // Weights can be adjusted.
    if (callVolume <= 0) return 0;
    return Number((contactRate * Math.log10(callVolume)).toFixed(2));
};

export const providers: Provider[] = [
    {
        id: 'ricochet360',
        name: 'Ricochet360',
        website: 'https://ricochet360.com',
        logo: '/logos/ricochet.png', // Placeholder
        description: 'All-in-one dialing and CRM platform designed for high-velocity sales.',
        contactRate: 50,
        callVolume: 500,
        score: 0, // Calculated at runtime or pre-calc
        features: ['Predictive Dialer', 'CRM Integration', 'Web Lead Optimization'],
        reportingInstructions: `
### How to find your Contact Rate in Ricochet360

1. Log in to your Ricochet360 dashboard.
2. Navigate to **Reports** > **Standard Reports**.
3. Select the **Call Statistics** report.
4. Filter by **Date Range** (e.g., Last 30 Days).
5. Look for the **Contact Rate** column in the summary table.
    `
    },
    {
        id: 'ringcentral',
        name: 'RingCentral',
        website: 'https://ringcentral.com',
        logo: '/logos/ringcentral.png',
        description: 'Cloud-based communications and collaboration solutions for businesses.',
        contactRate: 18,
        callVolume: 150,
        score: 0,
        features: ['VoIP', 'Video Conferencing', 'Team Messaging'],
        reportingInstructions: `
### How to find your Contact Rate in RingCentral

1. Go to **Analytics Portal**.
2. Select **Performance Reports**.
3. Choose **Calls by Result**.
4. Calculate: (Answered Calls / Total Calls) * 100.
    `
    },
    {
        id: 'five9',
        name: 'Five9',
        website: 'https://five9.com',
        logo: '/logos/five9.png',
        description: 'Intelligent cloud contact center provider.',
        contactRate: 25,
        callVolume: 300,
        score: 0,
        features: ['Omnichannel', 'AI & Automation', 'Workforce Optimization'],
        reportingInstructions: `
### How to find your Contact Rate in Five9

1. Open **Dashboard & Reports**.
2. Run the **Agent Performance** report.
3. Review **Right Party Connects** vs **Total Dials**.
    `
    }
].map(p => ({ ...p, score: calculateScore(p.contactRate, p.callVolume) })).sort((a, b) => b.score - a.score);
