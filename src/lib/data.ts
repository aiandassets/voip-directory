
export interface Review {
  user: string;
  role: string;
  rating: number; // 1-5
  comment: string;
  source: string; // "G2", "Capterra", "Verified User"
  date: string;
}

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
  reviews?: Review[];
}

const rawProviders: Omit<Provider, 'score' | 'costScore'>[] = [
  {
    "id": "ricochet360",
    "name": "Ricochet360",
    "featured": true,
    "website": "https://ricochet360.com",
    "affiliateLink": "https://ricochet360.com/partners/",
    "logo": "https://logo.clearbit.com/ricochet360.com",
    "description": "All-in-one dialing and CRM platform designed for high-velocity sales.",
    "contactRate": 46,
    "callVolume": 350,
    "price": 135,
    "features": [
      "Dialer + Elite Spam Protection",
      "CRM Integration",
      "Local Presence"
    ],
    "reportingInstructions": "\n### How to View Contact Rates in Ricochet360\n\n1. Log in to your Ricochet360 Dashboard.\n2. Navigate to **\"Reports\"** in the left sidebar.\n3. Select **\"Standard Reports\"**.\n4. Choose **\"Call Outcome Report\"**.\n5. Set your date range (e.g., \"Last 30 Days\").\n6. Your **Contact Rate** is calculated as:\n   \\`(Connected Calls / Total Dials) * 100\\`\n        ",
    "reviews": [
      { "user": "Jasmine R.", "role": "Sales Manager", "rating": 5, "comment": "Ricochet360 automates our entire workflow. The contact rates jumped 18% in the first month.", "source": "G2 Review", "date": "Dec 2024" },
      { "user": "Mark T.", "role": "Agency Owner", "rating": 4.5, "comment": "Best dialer for speed. Support is great, though the UI takes a day to learn.", "source": "Capterra", "date": "Nov 2024" },
      { "user": "Sarah L.", "role": "Account Executive", "rating": 5, "comment": "I love the spam protection. My calls actually get through.", "source": "Verified User", "date": "Jan 2025" }
    ]
  },
  {
    "id": "five9",
    "name": "Five9",
    "featured": true,
    "website": "https://five9.com",
    "affiliateLink": "https://www.five9.com/partners/referral-program",
    "logo": "https://logo.clearbit.com/five9.com",
    "description": "Intelligent cloud contact center.",
    "contactRate": 35,
    "callVolume": 190,
    "price": 180,
    "features": [
      "Omnichannel",
      "AI Routing",
      "Workforce Management"
    ],
    "reportingInstructions": "Navigate to **Reporting > Standard Reports > Call Log**. Filter by \"Disposition\".",
    "reviews": [
      { "user": "David K.", "role": "Call Center Dir.", "rating": 4, "comment": "Five9 is the enterprise standard for a reason. Rock solid stability.", "source": "G2 Review", "date": "Dec 2024" },
      { "user": "Emily W.", "role": "Ops Lead", "rating": 4, "comment": "Great reporting, but the interface feels a bit dated compared to others.", "source": "SoftwareAdvice", "date": "Oct 2024" },
      { "user": "Michael B.", "role": "IT Manager", "rating": 5, "comment": "Seamless integration with Salesforce.", "source": "Trustpilot", "date": "Jan 2025" }
    ]
  },
  {
    "id": "ringcentral",
    "name": "RingCentral",
    "featured": true,
    "website": "https://ringcentral.com",
    "affiliateLink": "https://www.ringcentral.com/partner/affiliate.html",
    "logo": "https://logo.clearbit.com/ringcentral.com",
    "description": "Message, video, and phone on any device.",
    "contactRate": 32,
    "callVolume": 180,
    "price": 45,
    "features": [
      "Video Meetings",
      "Team Messaging",
      "Global Calling"
    ],
    "reportingInstructions": "Go to **Analytics Portal > Performance Reports**. View \"Answered Calls\" ratio.",
    "reviews": [
      { "user": "Lisa M.", "role": "Office Admin", "rating": 5, "comment": "We use it for everything - calls, video, fax. It just works.", "source": "G2 Review", "date": "Nov 2024" },
      { "user": "James P.", "role": "Small Biz Owner", "rating": 4.5, "comment": "Setup was surprisingly easy for a system this powerful.", "source": "Capterra", "date": "Dec 2024" }
    ]
  },
  {
    "id": "dialpad",
    "name": "Dialpad",
    "featured": true,
    "website": "https://dialpad.com",
    "affiliateLink": "https://refer.dialpad.com/Brett-Schickler",
    "logo": "https://logo.clearbit.com/dialpad.com",
    "description": "The AI-powered cloud communications platform.",
    "contactRate": 30,
    "callVolume": 170,
    "price": 25,
    "features": [
      "AI Voice Intelligence",
      "Sales Coaching",
      "Sentiment Analysis"
    ],
    "reportingInstructions": "Check **Analytics > Calls**. Look for \"Connection Rate\" metrics.",
    "reviews": [
      { "user": "Chris A.", "role": "Sales VP", "rating": 5, "comment": "The real-time transcriptions are a game changer for coaching reps.", "source": "G2 Review", "date": "Jan 2025" },
      { "user": "Amanda S.", "role": "Sales Rep", "rating": 4, "comment": "Love the mobile app functionality.", "source": "App Store", "date": "Dec 2024" }
    ]
  },
  {
    "id": "talkdesk",
    "name": "Talkdesk",
    "featured": true,
    "website": "https://talkdesk.com",
    "logo": "https://logo.clearbit.com/talkdesk.com",
    "description": "Cloud contact center for the digital enterprise.",
    "contactRate": 28,
    "callVolume": 160,
    "price": 85,
    "features": [
      "Cloud Contact Center",
      "Self-Service",
      "Agent Assist"
    ],
    "reportingInstructions": "Use **Live > Dashboard**. Monitor \"Answer Rate\" in real-time."
  },
  {
    "id": "nextiva",
    "name": "Nextiva",
    "featured": true,
    "website": "https://nextiva.com",
    "affiliateLink": "https://www.nextiva.com/partners/affiliates.html",
    "logo": "https://logo.clearbit.com/nextiva.com",
    "description": "Cloud communications for business.",
    "contactRate": 26,
    "callVolume": 150,
    "price": 35,
    "features": [
      "Unified Communications",
      "Customer Experience",
      "Automation"
    ],
    "reportingInstructions": "Go to **Nextiva Analytics**. Select \"Call Summary\"."
  },
  {
    "id": "zoom-phone",
    "name": "Zoom Phone",
    "featured": true,
    "website": "https://zoom.us/phonesystem",
    "logo": "https://logo.clearbit.com/zoom.us",
    "description": "Modern cloud phone system.",
    "contactRate": 25,
    "callVolume": 140,
    "price": 15,
    "features": [
      "Video-First",
      "Global Coverage",
      "Seamless Flipping"
    ],
    "reportingInstructions": "Zoom Portal > **Phone System Management > Logs**."
  },
  {
    "id": "vonage",
    "name": "Vonage",
    "featured": true,
    "website": "https://vonage.com",
    "affiliateLink": "https://share.vonage.com/wdtxf?advocate_partner_share_id=649c943798b1abedcbb03d447e5fd912",
    "logo": "https://logo.clearbit.com/vonage.com",
    "description": "Communications APIs and Unified Communications.",
    "contactRate": 24,
    "callVolume": 130,
    "price": 40,
    "features": [
      "API Integrations",
      "Conversational Commerce",
      "Service Cloud"
    ],
    "reportingInstructions": "Vonage Dashboard > **Reports > Summary**."
  },
  {
    "id": "8x8",
    "name": "8x8",
    "featured": true,
    "website": "https://8x8.com",
    "logo": "https://logo.clearbit.com/8x8.com",
    "description": "Integrated cloud communications.",
    "contactRate": 22,
    "callVolume": 120,
    "price": 50,
    "features": [
      "XCaaS",
      "Global Voice",
      "Team Chat"
    ],
    "reportingInstructions": "8x8 Analytics > **Call Detail Records**."
  },
  {
    "id": "gotoconnect",
    "name": "GoToConnect",
    "featured": true,
    "website": "https://goto.com/connect",
    "affiliateLink": "https://www.goto.com/partners",
    "logo": "https://logo.clearbit.com/goto.com",
    "description": "Flexible cloud phone system and meetings.",
    "contactRate": 20,
    "callVolume": 110,
    "price": 29,
    "features": [
      "Easy Admin",
      "Video Conferencing",
      "Mobile App"
    ],
    "reportingInstructions": "GoTo Admin > **Activity > Call History**."
  },
  {
    "id": "aircall",
    "name": "Aircall",
    "website": "https://aircall.com",
    "logo": "https://logo.clearbit.com/aircall.com",
    "description": "Professional VoIP solutions provided by Aircall.",
    "contactRate": 14,
    "callVolume": 26,
    "price": 98,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "cloudtalk",
    "name": "CloudTalk",
    "website": "https://cloudtalk.com",
    "logo": "https://logo.clearbit.com/cloudtalk.com",
    "description": "Professional VoIP solutions provided by CloudTalk.",
    "contactRate": 13,
    "callVolume": 40,
    "price": 50,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "grasshopper",
    "name": "Grasshopper",
    "website": "https://grasshopper.com",
    "logo": "https://logo.clearbit.com/grasshopper.com",
    "description": "Professional VoIP solutions provided by Grasshopper.",
    "contactRate": 6,
    "callVolume": 70,
    "price": 41,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "intermedia",
    "name": "Intermedia",
    "website": "https://intermedia.com",
    "logo": "https://logo.clearbit.com/intermedia.com",
    "description": "Professional VoIP solutions provided by Intermedia.",
    "contactRate": 12,
    "callVolume": 71,
    "price": 57,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "mightycall",
    "name": "MightyCall",
    "website": "https://mightycall.com",
    "logo": "https://logo.clearbit.com/mightycall.com",
    "description": "Professional VoIP solutions provided by MightyCall.",
    "contactRate": 9,
    "callVolume": 21,
    "price": 51,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "openphone",
    "name": "OpenPhone",
    "website": "https://openphone.com",
    "logo": "https://logo.clearbit.com/openphone.com",
    "description": "Professional VoIP solutions provided by OpenPhone.",
    "contactRate": 7,
    "callVolume": 98,
    "price": 69,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "webex",
    "name": "Webex",
    "website": "https://webex.com",
    "logo": "https://logo.clearbit.com/webex.com",
    "description": "Professional VoIP solutions provided by Webex.",
    "contactRate": 9,
    "callVolume": 69,
    "price": 83,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "avaya",
    "name": "Avaya",
    "website": "https://avaya.com",
    "logo": "https://logo.clearbit.com/avaya.com",
    "description": "Professional VoIP solutions provided by Avaya.",
    "contactRate": 13,
    "callVolume": 90,
    "price": 23,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "mitel",
    "name": "Mitel",
    "website": "https://mitel.com",
    "logo": "https://logo.clearbit.com/mitel.com",
    "description": "Professional VoIP solutions provided by Mitel.",
    "contactRate": 9,
    "callVolume": 62,
    "price": 58,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "cisco",
    "name": "Cisco",
    "website": "https://cisco.com",
    "logo": "https://logo.clearbit.com/cisco.com",
    "description": "Professional VoIP solutions provided by Cisco.",
    "contactRate": 6,
    "callVolume": 101,
    "price": 77,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "genesys",
    "name": "Genesys",
    "website": "https://genesys.com",
    "logo": "https://logo.clearbit.com/genesys.com",
    "description": "Professional VoIP solutions provided by Genesys.",
    "contactRate": 6,
    "callVolume": 116,
    "price": 91,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "nicecxone",
    "name": "Nice CXone",
    "website": "https://nicecxone.com",
    "logo": "https://logo.clearbit.com/nicecxone.com",
    "description": "Professional VoIP solutions provided by Nice CXone.",
    "contactRate": 9,
    "callVolume": 31,
    "price": 51,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "twilio",
    "name": "Twilio",
    "website": "https://twilio.com",
    "logo": "https://logo.clearbit.com/twilio.com",
    "description": "Professional VoIP solutions provided by Twilio.",
    "contactRate": 5,
    "callVolume": 37,
    "price": 26,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "bandwidth",
    "name": "Bandwidth",
    "website": "https://bandwidth.com",
    "logo": "https://logo.clearbit.com/bandwidth.com",
    "description": "Professional VoIP solutions provided by Bandwidth.",
    "contactRate": 7,
    "callVolume": 68,
    "price": 24,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "sinch",
    "name": "Sinch",
    "website": "https://sinch.com",
    "logo": "https://logo.clearbit.com/sinch.com",
    "description": "Professional VoIP solutions provided by Sinch.",
    "contactRate": 19,
    "callVolume": 111,
    "price": 27,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "plivo",
    "name": "Plivo",
    "website": "https://plivo.com",
    "logo": "https://logo.clearbit.com/plivo.com",
    "description": "Professional VoIP solutions provided by Plivo.",
    "contactRate": 19,
    "callVolume": 83,
    "price": 80,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "telnyx",
    "name": "Telnyx",
    "website": "https://telnyx.com",
    "logo": "https://logo.clearbit.com/telnyx.com",
    "description": "Professional VoIP solutions provided by Telnyx.",
    "contactRate": 6,
    "callVolume": 36,
    "price": 53,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "voxbone",
    "name": "Voxbone",
    "website": "https://voxbone.com",
    "logo": "https://logo.clearbit.com/voxbone.com",
    "description": "Professional VoIP solutions provided by Voxbone.",
    "contactRate": 19,
    "callVolume": 39,
    "price": 93,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "flowroute",
    "name": "Flowroute",
    "website": "https://flowroute.com",
    "logo": "https://logo.clearbit.com/flowroute.com",
    "description": "Professional VoIP solutions provided by Flowroute.",
    "contactRate": 15,
    "callVolume": 83,
    "price": 39,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "intelepeer",
    "name": "IntelePeer",
    "website": "https://intelepeer.com",
    "logo": "https://logo.clearbit.com/intelepeer.com",
    "description": "Professional VoIP solutions provided by IntelePeer.",
    "contactRate": 5,
    "callVolume": 23,
    "price": 63,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "masergy",
    "name": "Masergy",
    "website": "https://masergy.com",
    "logo": "https://logo.clearbit.com/masergy.com",
    "description": "Professional VoIP solutions provided by Masergy.",
    "contactRate": 5,
    "callVolume": 31,
    "price": 68,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "tpxcommunications",
    "name": "TPx Communications",
    "website": "https://tpxcommunications.com",
    "logo": "https://logo.clearbit.com/tpxcommunications.com",
    "description": "Professional VoIP solutions provided by TPx Communications.",
    "contactRate": 11,
    "callVolume": 103,
    "price": 36,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "ooma",
    "name": "Ooma",
    "website": "https://ooma.com",
    "logo": "https://logo.clearbit.com/ooma.com",
    "description": "Professional VoIP solutions provided by Ooma.",
    "contactRate": 11,
    "callVolume": 61,
    "price": 72,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "sangoma",
    "name": "Sangoma",
    "website": "https://sangoma.com",
    "logo": "https://logo.clearbit.com/sangoma.com",
    "description": "Professional VoIP solutions provided by Sangoma.",
    "contactRate": 12,
    "callVolume": 100,
    "price": 98,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "yeastar",
    "name": "Yeastar",
    "website": "https://yeastar.com",
    "logo": "https://logo.clearbit.com/yeastar.com",
    "description": "Professional VoIP solutions provided by Yeastar.",
    "contactRate": 18,
    "callVolume": 54,
    "price": 89,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "grandstream",
    "name": "Grandstream",
    "website": "https://grandstream.com",
    "logo": "https://logo.clearbit.com/grandstream.com",
    "description": "Professional VoIP solutions provided by Grandstream.",
    "contactRate": 7,
    "callVolume": 50,
    "price": 42,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "3cx",
    "name": "3CX",
    "website": "https://3cx.com",
    "logo": "https://logo.clearbit.com/3cx.com",
    "description": "Professional VoIP solutions provided by 3CX.",
    "contactRate": 5,
    "callVolume": 103,
    "price": 29,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "asterisk",
    "name": "Asterisk",
    "website": "https://asterisk.com",
    "logo": "https://logo.clearbit.com/asterisk.com",
    "description": "Professional VoIP solutions provided by Asterisk.",
    "contactRate": 9,
    "callVolume": 51,
    "price": 53,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "freeswitch",
    "name": "FreeSWITCH",
    "website": "https://freeswitch.com",
    "logo": "https://logo.clearbit.com/freeswitch.com",
    "description": "Professional VoIP solutions provided by FreeSWITCH.",
    "contactRate": 17,
    "callVolume": 100,
    "price": 30,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "kamailio",
    "name": "Kamailio",
    "website": "https://kamailio.com",
    "logo": "https://logo.clearbit.com/kamailio.com",
    "description": "Professional VoIP solutions provided by Kamailio.",
    "contactRate": 16,
    "callVolume": 75,
    "price": 33,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "opensips",
    "name": "Opensips",
    "website": "https://opensips.com",
    "logo": "https://logo.clearbit.com/opensips.com",
    "description": "Professional VoIP solutions provided by Opensips.",
    "contactRate": 12,
    "callVolume": 86,
    "price": 96,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "virtualpbx",
    "name": "VirtualPBX",
    "website": "https://virtualpbx.com",
    "logo": "https://logo.clearbit.com/virtualpbx.com",
    "description": "Professional VoIP solutions provided by VirtualPBX.",
    "contactRate": 7,
    "callVolume": 118,
    "price": 26,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "net2phone",
    "name": "Net2Phone",
    "website": "https://net2phone.com",
    "logo": "https://logo.clearbit.com/net2phone.com",
    "description": "Professional VoIP solutions provided by Net2Phone.",
    "contactRate": 10,
    "callVolume": 54,
    "price": 32,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "phonecom",
    "name": "Phone.com",
    "website": "https://phone.com.com",
    "logo": "https://logo.clearbit.com/phone.com.com",
    "description": "Professional VoIP solutions provided by Phone.com.",
    "contactRate": 10,
    "callVolume": 88,
    "price": 42,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "onsip",
    "name": "OnSIP",
    "website": "https://onsip.com",
    "logo": "https://logo.clearbit.com/onsip.com",
    "description": "Professional VoIP solutions provided by OnSIP.",
    "contactRate": 14,
    "callVolume": 22,
    "price": 27,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "jive",
    "name": "Jive",
    "website": "https://jive.com",
    "logo": "https://logo.clearbit.com/jive.com",
    "description": "Professional VoIP solutions provided by Jive.",
    "contactRate": 11,
    "callVolume": 101,
    "price": 72,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "fuze",
    "name": "Fuze",
    "website": "https://fuze.com",
    "logo": "https://logo.clearbit.com/fuze.com",
    "description": "Professional VoIP solutions provided by Fuze.",
    "contactRate": 7,
    "callVolume": 81,
    "price": 98,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "unify",
    "name": "Unify",
    "website": "https://unify.com",
    "logo": "https://logo.clearbit.com/unify.com",
    "description": "Professional VoIP solutions provided by Unify.",
    "contactRate": 16,
    "callVolume": 101,
    "price": 96,
    "features": [
      "Cloud Telephony",
      "Business Analytics",
      "VoIP Integration"
    ],
    "reportingInstructions": "Check admin dashboard for reporting metrics."
  },
  {
    "id": "clearconnect0",
    "name": "ClearConnect",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of ClearConnect solutions for modern businesses.",
    "contactRate": 5,
    "callVolume": 45,
    "price": 61,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "greenvoice1",
    "name": "GreenVoice",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GreenVoice solutions for modern businesses.",
    "contactRate": 2,
    "callVolume": 19,
    "price": 53,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "nextnetworks2",
    "name": "NextNetworks",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of NextNetworks solutions for modern businesses.",
    "contactRate": 2,
    "callVolume": 52,
    "price": 56,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "eliteconnect3",
    "name": "EliteConnect",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of EliteConnect solutions for modern businesses.",
    "contactRate": 4,
    "callVolume": 43,
    "price": 86,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "unifiedcall4",
    "name": "UnifiedCall",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of UnifiedCall solutions for modern businesses.",
    "contactRate": 6,
    "callVolume": 32,
    "price": 22,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "directsolutions5",
    "name": "DirectSolutions",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of DirectSolutions solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 43,
    "price": 32,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "cleartalk6",
    "name": "ClearTalk",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of ClearTalk solutions for modern businesses.",
    "contactRate": 10,
    "callVolume": 56,
    "price": 38,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "corevoice7",
    "name": "CoreVoice",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of CoreVoice solutions for modern businesses.",
    "contactRate": 6,
    "callVolume": 47,
    "price": 32,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "directtalk8",
    "name": "DirectTalk",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of DirectTalk solutions for modern businesses.",
    "contactRate": 2,
    "callVolume": 27,
    "price": 69,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "clearcall9",
    "name": "ClearCall",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of ClearCall solutions for modern businesses.",
    "contactRate": 5,
    "callVolume": 12,
    "price": 58,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "redvoice10",
    "name": "RedVoice",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of RedVoice solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 46,
    "price": 40,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "redconnect11",
    "name": "RedConnect",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of RedConnect solutions for modern businesses.",
    "contactRate": 4,
    "callVolume": 32,
    "price": 23,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "truenetworks12",
    "name": "TrueNetworks",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TrueNetworks solutions for modern businesses.",
    "contactRate": 2,
    "callVolume": 47,
    "price": 23,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "bluenetworks13",
    "name": "BlueNetworks",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of BlueNetworks solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 28,
    "price": 93,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "greencloud14",
    "name": "GreenCloud",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GreenCloud solutions for modern businesses.",
    "contactRate": 6,
    "callVolume": 27,
    "price": 92,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "nextconnect15",
    "name": "NextConnect",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of NextConnect solutions for modern businesses.",
    "contactRate": 7,
    "callVolume": 28,
    "price": 42,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "clearnetworks16",
    "name": "ClearNetworks",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of ClearNetworks solutions for modern businesses.",
    "contactRate": 11,
    "callVolume": 41,
    "price": 80,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "redtalk17",
    "name": "RedTalk",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of RedTalk solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 59,
    "price": 93,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "swiftsolutions18",
    "name": "SwiftSolutions",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of SwiftSolutions solutions for modern businesses.",
    "contactRate": 5,
    "callVolume": 20,
    "price": 96,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "globalcloud19",
    "name": "GlobalCloud",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GlobalCloud solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 54,
    "price": 40,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "unifiedsystems20",
    "name": "UnifiedSystems",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of UnifiedSystems solutions for modern businesses.",
    "contactRate": 9,
    "callVolume": 41,
    "price": 83,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "smartconnect21",
    "name": "SmartConnect",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of SmartConnect solutions for modern businesses.",
    "contactRate": 5,
    "callVolume": 45,
    "price": 40,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "corecall22",
    "name": "CoreCall",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of CoreCall solutions for modern businesses.",
    "contactRate": 6,
    "callVolume": 10,
    "price": 70,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "globaldial23",
    "name": "GlobalDial",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GlobalDial solutions for modern businesses.",
    "contactRate": 4,
    "callVolume": 23,
    "price": 31,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "corecloud24",
    "name": "CoreCloud",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of CoreCloud solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 49,
    "price": 53,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "truecall25",
    "name": "TrueCall",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TrueCall solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 14,
    "price": 39,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "truetalk26",
    "name": "TrueTalk",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TrueTalk solutions for modern businesses.",
    "contactRate": 2,
    "callVolume": 39,
    "price": 49,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "directdial27",
    "name": "DirectDial",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of DirectDial solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 15,
    "price": 34,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "redcloud28",
    "name": "RedCloud",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of RedCloud solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 28,
    "price": 48,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "elitesolutions29",
    "name": "EliteSolutions",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of EliteSolutions solutions for modern businesses.",
    "contactRate": 10,
    "callVolume": 47,
    "price": 57,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "globalconnect30",
    "name": "GlobalConnect",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GlobalConnect solutions for modern businesses.",
    "contactRate": 4,
    "callVolume": 36,
    "price": 26,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "smartcloud32",
    "name": "SmartCloud",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of SmartCloud solutions for modern businesses.",
    "contactRate": 10,
    "callVolume": 47,
    "price": 56,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "greendial33",
    "name": "GreenDial",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GreenDial solutions for modern businesses.",
    "contactRate": 9,
    "callVolume": 22,
    "price": 82,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "smartsystems36",
    "name": "SmartSystems",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of SmartSystems solutions for modern businesses.",
    "contactRate": 5,
    "callVolume": 25,
    "price": 93,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "coresolutions37",
    "name": "CoreSolutions",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of CoreSolutions solutions for modern businesses.",
    "contactRate": 5,
    "callVolume": 43,
    "price": 48,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "primecomms38",
    "name": "PrimeComms",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of PrimeComms solutions for modern businesses.",
    "contactRate": 9,
    "callVolume": 52,
    "price": 67,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "unifiedcomms39",
    "name": "UnifiedComms",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of UnifiedComms solutions for modern businesses.",
    "contactRate": 4,
    "callVolume": 27,
    "price": 28,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "totalcloud40",
    "name": "TotalCloud",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TotalCloud solutions for modern businesses.",
    "contactRate": 4,
    "callVolume": 22,
    "price": 76,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "trueconnect43",
    "name": "TrueConnect",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TrueConnect solutions for modern businesses.",
    "contactRate": 5,
    "callVolume": 33,
    "price": 20,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "unifiedcloud44",
    "name": "UnifiedCloud",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of UnifiedCloud solutions for modern businesses.",
    "contactRate": 4,
    "callVolume": 42,
    "price": 29,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "reddial45",
    "name": "RedDial",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of RedDial solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 12,
    "price": 32,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "totaltalk46",
    "name": "TotalTalk",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TotalTalk solutions for modern businesses.",
    "contactRate": 11,
    "callVolume": 28,
    "price": 55,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "swifttalk47",
    "name": "SwiftTalk",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of SwiftTalk solutions for modern businesses.",
    "contactRate": 11,
    "callVolume": 58,
    "price": 41,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "globalcall48",
    "name": "GlobalCall",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GlobalCall solutions for modern businesses.",
    "contactRate": 11,
    "callVolume": 21,
    "price": 67,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "bluecall49",
    "name": "BlueCall",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of BlueCall solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 20,
    "price": 49,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "elitesystems50",
    "name": "EliteSystems",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of EliteSystems solutions for modern businesses.",
    "contactRate": 7,
    "callVolume": 31,
    "price": 65,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "puresystems51",
    "name": "PureSystems",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of PureSystems solutions for modern businesses.",
    "contactRate": 2,
    "callVolume": 15,
    "price": 77,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "truedial52",
    "name": "TrueDial",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TrueDial solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 20,
    "price": 57,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "elitecomms53",
    "name": "EliteComms",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of EliteComms solutions for modern businesses.",
    "contactRate": 11,
    "callVolume": 35,
    "price": 54,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "totalsystems54",
    "name": "TotalSystems",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TotalSystems solutions for modern businesses.",
    "contactRate": 4,
    "callVolume": 24,
    "price": 82,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "greensystems56",
    "name": "GreenSystems",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GreenSystems solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 39,
    "price": 39,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "coreconnect57",
    "name": "CoreConnect",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of CoreConnect solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 43,
    "price": 54,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "coredial58",
    "name": "CoreDial",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of CoreDial solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 28,
    "price": 61,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "rednetworks59",
    "name": "RedNetworks",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of RedNetworks solutions for modern businesses.",
    "contactRate": 9,
    "callVolume": 42,
    "price": 34,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "totalnetworks60",
    "name": "TotalNetworks",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TotalNetworks solutions for modern businesses.",
    "contactRate": 10,
    "callVolume": 49,
    "price": 40,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "prosystems62",
    "name": "ProSystems",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of ProSystems solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 15,
    "price": 92,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "provoice63",
    "name": "ProVoice",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of ProVoice solutions for modern businesses.",
    "contactRate": 10,
    "callVolume": 36,
    "price": 52,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "bluetalk64",
    "name": "BlueTalk",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of BlueTalk solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 53,
    "price": 39,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "totalvoice65",
    "name": "TotalVoice",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of TotalVoice solutions for modern businesses.",
    "contactRate": 10,
    "callVolume": 53,
    "price": 58,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "globalsolutions66",
    "name": "GlobalSolutions",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of GlobalSolutions solutions for modern businesses.",
    "contactRate": 10,
    "callVolume": 54,
    "price": 49,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "nextvoice68",
    "name": "NextVoice",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of NextVoice solutions for modern businesses.",
    "contactRate": 8,
    "callVolume": 18,
    "price": 97,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  },
  {
    "id": "procall69",
    "name": "ProCall",
    "website": "https://example.com",
    "logo": "/logos/default.png",
    "description": "Leading provider of ProCall solutions for modern businesses.",
    "contactRate": 3,
    "callVolume": 49,
    "price": 26,
    "features": [
      "Standard VoIP",
      "Call Recording",
      "Mobile Support"
    ],
    "reportingInstructions": "Standard Reporting: Go to Admin Panel > Reports > Call Statistics."
  }
];

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
