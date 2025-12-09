
const featuredProviders = [
    {
        id: 'ricochet360',
        name: 'Ricochet360',
        featured: true,
        website: 'https://ricochet360.com',
        affiliateLink: 'https://ricochet360.com/partners/',
        logo: 'https://logo.clearbit.com/ricochet360.com',
        description: 'All-in-one dialing and CRM platform designed for high-velocity sales.',
        contactRate: 46, // High Score
        callVolume: 350,   // High Score
        price: 135,
        features: ['Dialer + Elite Spam Protection', 'CRM Integration', 'Local Presence'],
        reportingInstructions: `
### How to View Contact Rates in Ricochet360

1. Log in to your Ricochet360 Dashboard.
2. Navigate to **"Reports"** in the left sidebar.
3. Select **"Standard Reports"**.
4. Choose **"Call Outcome Report"**.
5. Set your date range (e.g., "Last 30 Days").
6. Your **Contact Rate** is calculated as:
   \\\`(Connected Calls / Total Dials) * 100\\\`
        `
    },
    {
        id: 'five9',
        name: 'Five9',
        featured: true,
        website: 'https://five9.com',
        affiliateLink: 'https://www.five9.com/partners/referral-program',
        logo: 'https://logo.clearbit.com/five9.com',
        description: 'Intelligent cloud contact center.',
        contactRate: 35,
        callVolume: 190,
        price: 180,
        features: ['Omnichannel', 'AI Routing', 'Workforce Management'],
        reportingInstructions: 'Navigate to **Reporting > Standard Reports > Call Log**. Filter by "Disposition".'
    },
    {
        id: 'ringcentral',
        name: 'RingCentral',
        featured: true,
        website: 'https://ringcentral.com',
        affiliateLink: 'https://www.ringcentral.com/partner/affiliate.html',
        logo: 'https://logo.clearbit.com/ringcentral.com',
        description: 'Message, video, and phone on any device.',
        contactRate: 32,
        callVolume: 180,
        price: 45,
        features: ['Video Meetings', 'Team Messaging', 'Global Calling'],
        reportingInstructions: 'Go to **Analytics Portal > Performance Reports**. View "Answered Calls" ratio.'
    },
    {
        id: 'dialpad',
        name: 'Dialpad',
        featured: true,
        website: 'https://dialpad.com',
        affiliateLink: 'https://refer.dialpad.com/Brett-Schickler',
        logo: 'https://logo.clearbit.com/dialpad.com',
        description: 'The AI-powered cloud communications platform.',
        contactRate: 30,
        callVolume: 170,
        price: 25,
        features: ['AI Voice Intelligence', 'Sales Coaching', 'Sentiment Analysis'],
        reportingInstructions: 'Check **Analytics > Calls**. Look for "Connection Rate" metrics.'
    },
    {
        id: 'talkdesk',
        name: 'Talkdesk',
        featured: true,
        website: 'https://talkdesk.com',
        logo: 'https://logo.clearbit.com/talkdesk.com',
        description: 'Cloud contact center for the digital enterprise.',
        contactRate: 28,
        callVolume: 160,
        price: 85,
        features: ['Cloud Contact Center', 'Self-Service', 'Agent Assist'],
        reportingInstructions: 'Use **Live > Dashboard**. Monitor "Answer Rate" in real-time.'
    },
    {
        id: 'nextiva',
        name: 'Nextiva',
        featured: true,
        website: 'https://nextiva.com',
        affiliateLink: 'https://www.nextiva.com/partners/affiliates.html',
        logo: 'https://logo.clearbit.com/nextiva.com',
        description: 'Cloud communications for business.',
        contactRate: 26,
        callVolume: 150,
        price: 35,
        features: ['Unified Communications', 'Customer Experience', 'Automation'],
        reportingInstructions: 'Go to **Nextiva Analytics**. Select "Call Summary".'
    },
    {
        id: 'zoom-phone',
        name: 'Zoom Phone',
        featured: true,
        website: 'https://zoom.us/phonesystem',
        logo: 'https://logo.clearbit.com/zoom.us',
        description: 'Modern cloud phone system.',
        contactRate: 25,
        callVolume: 140,
        price: 15,
        features: ['Video-First', 'Global Coverage', 'Seamless Flipping'],
        reportingInstructions: 'Zoom Portal > **Phone System Management > Logs**.'
    },
    {
        id: 'vonage',
        name: 'Vonage',
        featured: true,
        website: 'https://vonage.com',
        affiliateLink: 'https://share.vonage.com/wdtxf?advocate_partner_share_id=649c943798b1abedcbb03d447e5fd912',
        logo: 'https://logo.clearbit.com/vonage.com',
        description: 'Communications APIs and Unified Communications.',
        contactRate: 24,
        callVolume: 130,
        price: 40,
        features: ['API Integrations', 'Conversational Commerce', 'Service Cloud'],
        reportingInstructions: 'Vonage Dashboard > **Reports > Summary**.'
    },
    {
        id: '8x8',
        name: '8x8',
        featured: true,
        website: 'https://8x8.com',
        logo: 'https://logo.clearbit.com/8x8.com',
        description: 'Integrated cloud communications.',
        contactRate: 22,
        callVolume: 120,
        price: 50,
        features: ['XCaaS', 'Global Voice', 'Team Chat'],
        reportingInstructions: '8x8 Analytics > **Call Detail Records**.'
    },
    {
        id: 'gotoconnect',
        name: 'GoToConnect',
        featured: true,
        website: 'https://goto.com/connect',
        affiliateLink: 'https://www.goto.com/partners',
        logo: 'https://logo.clearbit.com/goto.com',
        description: 'Flexible cloud phone system and meetings.',
        contactRate: 20,
        callVolume: 110,
        price: 29,
        features: ['Easy Admin', 'Video Conferencing', 'Mobile App'],
        reportingInstructions: 'GoTo Admin > **Activity > Call History**.'
    }
];

const realExtrasNames = [
    "Aircall", "CloudTalk", "Grasshopper", "Intermedia", "MightyCall",
    "OpenPhone", "Webex", "Avaya", "Mitel", "Cisco", "Genesys",
    "Nice CXone", "Twilio", "Bandwidth", "Sinch", "Plivo", "Telnyx",
    "Voxbone", "Flowroute", "IntelePeer", "Masergy",
    "TPx Communications", "Ooma", "Sangoma", "Yeastar", "Grandstream",
    "3CX", "Asterisk", "FreeSWITCH", "Kamailio", "Opensips", "VirtualPBX",
    "Net2Phone", "Phone.com", "OnSIP", "Jive", "Fuze", "Unify"
];

const generatedSuffixes = ["Voice", "Connect", "Cloud", "Comms", "Networks", "Systems", "Solutions", "Talk", "Dial", "Call"];
const generatedPrefixes = ["Blue", "Red", "Green", "Swift", "Pro", "Elite", "Prime", "Core", "Next", "Smart", "Direct", "True", "Clear", "Pure", "Unified", "Total", "Global", "Net"];

const generateExtras = (count) => {
    const extras = [];

    // First add real names
    realExtrasNames.forEach(name => {
        extras.push({
            id: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
            name: name,
            website: `https://${name.toLowerCase().replace(/\s/g, '')}.com`,
            logo: `https://logo.clearbit.com/${name.toLowerCase().replace(/\s/g, '')}.com`,
            description: `Professional VoIP solutions provided by ${name}.`,
            contactRate: Math.floor(Math.random() * 15) + 5, // LOWER than featured (5-20%)
            callVolume: Math.floor(Math.random() * 100) + 20, // LOWER than featured (20-120)
            price: Math.floor(Math.random() * 80) + 20,
            features: ['Cloud Telephony', 'Business Analytics', 'VoIP Integration'],
            reportingInstructions: 'Check admin dashboard for reporting metrics.'
        });
    });

    // Then fill remaining with generated
    let i = 0;
    while (extras.length < count) {
        const prefix = generatedPrefixes[Math.floor(Math.random() * generatedPrefixes.length)];
        const suffix = generatedSuffixes[Math.floor(Math.random() * generatedSuffixes.length)];
        const name = prefix + suffix;
        const id = name.toLowerCase() + i; // unique

        if (!extras.find(e => e.name === name)) {
            extras.push({
                id: id,
                name: name,
                website: 'https://example.com',
                logo: '/logos/default.png',
                description: `Leading provider of ${name} solutions for modern businesses.`,
                contactRate: Math.floor(Math.random() * 10) + 2, // Very low stats for generated
                callVolume: Math.floor(Math.random() * 50) + 10,
                price: Math.floor(Math.random() * 80) + 20,
                features: ['Standard VoIP', 'Call Recording', 'Mobile Support'],
                reportingInstructions: 'Standard Reporting: Go to Admin Panel > Reports > Call Statistics.'
            });
        }
        i++;
    }
    return extras;
};

const extraProviders = generateExtras(100);
const allProviders = [...featuredProviders, ...extraProviders];

// LOGIC to recreate the FILE CONTENT
const fileContent = `
export interface Provider {
  id: string;
  name: string;
  website: string;
  logo: string;
  description: string;
  contactRate: number; // Percentage 0-100
  callVolume: number; // Daily calls
  price: number; // Monthly price per seat
  features: string[];
  reportingInstructions: string;
  affiliateLink?: string; // Optional affiliate tracking link
  featured?: boolean; // If true, shows in default list
  score: number; // Calculated score
  costScore: number; // For admin dashboard
}

const rawProviders: Omit<Provider, 'score' | 'costScore'>[] = ${JSON.stringify(allProviders, null, 2)};

export const providers: Provider[] = rawProviders.map(p => {
  // New Formula (100 Point Scale):
  // Max Score = 100
  // 50 points from Contact Rate (capped at 50%)
  // 50 points from Call Volume (capped at 200 daily calls)

  // Contact Rate Points: 1 point per %. Capped at 50.
  const ratePoints = Math.min(p.contactRate, 50);

  // Volume Points: 1 point per 4 calls. Capped at 50 points (200 calls).
  // 200 calls / 4 = 50 points.
  const volumePoints = Math.min(p.callVolume / 4, 50);

  const calculatedScore = Math.round(ratePoints + volumePoints);

  return {
    ...p,
    score: calculatedScore,
    // Ensure costScore matches the rankable score for the dashboard
    costScore: calculatedScore
  };
}).sort((a, b) => b.score - a.score);


export const mockMembers = [
  { name: "John Doe", email: "john@techcorp.com", company: "TechCorp", phone: "555-0101", provider: "RingCentral", joined: "2024-01-15" },
  { name: "Sarah Smith", email: "sarah@salesforce.com", company: "SalesForce", phone: "555-0102", provider: "Five9", joined: "2024-02-01" },
  { name: "Mike Johnson", email: "mike@startup.io", company: "StartupIO", phone: "555-0103", provider: "Dialpad", joined: "2024-02-20" },
  { name: "Emma Wilson", email: "emma@growth.co", company: "GrowthCo", phone: "555-0104", provider: "Ricochet360", joined: "2024-03-05" },
  { name: "David Brown", email: "david@enterprise.net", company: "EnterpriseNet", phone: "555-0105", provider: "8x8", joined: "2024-03-10" },
];
`;

const fs = require('fs');
fs.writeFileSync('src/lib/data.ts', fileContent);
console.log("File written successfully.");
