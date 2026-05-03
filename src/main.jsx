import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardCheck,
  Clock3,
  Heart,
  Layers3,
  Library,
  LineChart,
  MessageCircle,
  MessageSquareText,
  Mic,
  MonitorUp,
  PhoneOff,
  PlayCircle,
  Radio,
  Sparkles,
  Target,
  Trophy,
  TrendingUp,
  Users,
  Video,
  X,
  Menu
} from "lucide-react";
import "./styles.css";

const checkoutLinks = {
  starter: "https://www.joindtsm.com/checkout/starter-access?coupon_code=FIRST25",
  live: "https://www.joindtsm.com/checkout/trial?coupon_code=FIRST25",
  pro: "https://www.joindtsm.com/checkout/elite?coupon_code=FIRST25"
};

const chartsWatcherLink = "https://app.chartswatcher.com/register/?ref=DTSM";
const chartsWatcherScannerEmbed = "https://chartswatcher.com/pages/scanner/biggest-gainers-from-close?ref=DTSM";
const chartsWatcherHodMomentumEmbed = "https://chartswatcher.com/pages/scanner/hod-momentum?ref=DTSM";
const chartsWatcherHighOfDayEmbed = "https://chartswatcher.com/pages/scanner/high-of-the-day?ref=DTSM";
const chartsWatcherCode = "DTSM10";
const youtubeLink = "https://www.youtube.com/@JoinDTSM";
const discordLink = "https://discord.gg/dGpTPBcpnN";
const loginLink = "https://login.circle.so/sign_in?request_host=www.joindtsm.com#email";
const supportEmail = "drivethestockmarket@gmail.com";
const affiliateFormEndpoint = `https://formsubmit.co/ajax/${supportEmail}`;
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;

function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, params);
  window.clarity?.("event", name);
}

function initAnalytics() {
  if (typeof window === "undefined") return;

  if (gaMeasurementId && !window.__dtsmGaLoaded) {
    window.__dtsmGaLoaded = true;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", gaMeasurementId);
  }

  if (clarityProjectId && !window.__dtsmClarityLoaded) {
    window.__dtsmClarityLoaded = true;
    window.clarity = window.clarity || function clarity() {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${clarityProjectId}`;
    document.head.appendChild(script);
  }
}

const pageMeta = {
  "/": {
    title: "DTSM | Live Trading Community for Better Execution",
    description: "Join DTSM to watch live trading sessions, study Level 2 and Time & Sales, review trades, and build a more consistent small-cap trading process."
  },
  "/scanner": {
    title: "Free Trading Scanner | DTSM x ChartsWatcher",
    description: "Use DTSM's free scanner page to find stocks in play, filter momentum, and turn movement into a cleaner watchlist and trading plan."
  },
  "/resources": {
    title: "Free Trading Resources | DTSM Starter Course + Lessons",
    description: "Access the free DTSM Starter Course, trading basics, Level 2 lessons, Time and Sales resources, and tools to build a stronger execution routine."
  },
  "/affiliates": {
    title: "DTSM Affiliate Program | 30% Recurring Partner Program",
    description: "Apply to partner with DTSM and earn 30% recurring commission by referring traders to a live execution-focused trading environment."
  },
  "/inside": {
    title: "Inside DTSM | Trading Community Preview",
    description: "Preview the DTSM live trading environment with The Tape, Live Trading Room, trade reviews, recordings, watchlists, and weekly meetings."
  },
  "/privacy": {
    title: "Privacy Policy | DTSM",
    description: "Read the DTSM Privacy Policy covering analytics, contact information, third-party services, and how site data is used."
  },
  "/terms": {
    title: "Terms of Use | DTSM",
    description: "Read the DTSM Terms of Use, including educational-only positioning, subscription terms, cancellations, and risk disclosures."
  },
  "/contact": {
    title: "Contact DTSM | Support and Questions",
    description: "Contact DTSM for support, membership questions, partnership inquiries, or general help at drivethestockmarket@gmail.com."
  }
};

const navItems = [
  { label: "Home", href: "/" },
  { label: "Scanner", href: "/scanner" },
  { label: "Resources", href: "/resources" },
  { label: "Affiliates", href: "/affiliates" },
  { label: "Pricing", id: "pricing" },
  { label: "FAQ", id: "faq" }
];

const resourceGroups = [
  {
    title: "Beginner Trading Resources",
    eyebrow: "Start Here",
    description: "Get the language and routine down before you try to trade faster markets.",
    cards: [
      ["Small-Cap Trading Basics", "Understand the core language, catalysts, float, volume, and why small-cap stocks can move fast.", <LineChart />, "Beginner", "8 min"],
      ["Risk Management Basics", "Learn how to think about risk, sizing, invalidation, and protecting your account.", <Target />, "Foundation", "10 min"],
      ["Understanding Momentum", "A simple guide to volume, trend, relative strength, and when momentum is actually clean.", <TrendingUp />, "Market reads", "7 min"],
      ["Building a Trading Routine", "Create a repeatable pre-market, live session, and post-market review process.", <Clock3 />, "Routine", "12 min"]
    ]
  },
  {
    title: "Execution Resources",
    eyebrow: "Execution",
    description: "Study the pieces that help traders slow down, wait for quality, and review decisions.",
    cards: [
      ["Level 2 Basics", "Learn what bids, asks, size, and market maker movement can tell you in real time.", <Layers3 />, "Order flow", "9 min"],
      ["Time & Sales Basics", "Understand prints, speed, size, and how the tape confirms or rejects an idea.", <BarChart3 />, "Tape reading", "9 min"],
      ["Entry and Exit Review", "Use a simple framework to review whether your entry, exit, and risk made sense.", <ClipboardCheck />, "Review", "11 min"],
      ["Common Beginner Mistakes", "Spot the patterns that usually lead to chasing, oversizing, and emotional trades.", <X />, "Mistakes", "6 min"]
    ]
  },
  {
    title: "Community Samples",
    eyebrow: "Preview DTSM",
    description: "See the kinds of templates and breakdowns that become more powerful inside the community.",
    cards: [
      ["Sample Trade Review", "Preview how a trade can be broken down into plan, execution, mistake, and lesson.", <MessageSquareText />, "Template", "Preview"],
      ["Sample Watchlist", "See how names, levels, catalysts, and scenarios can be organized before the open.", <Library />, "Watchlist", "Preview"],
      ["Sample Weekly Recap", "A template for reviewing what worked, what failed, and what to focus on next.", <CalendarDays />, "Recap", "Preview"],
      ["Sample Recording Breakdown", "A placeholder for session notes tied to live room and Level 2 recordings.", <PlayCircle />, "Recording", "Preview"]
    ]
  }
];

const resourcePath = [
  ["01", "Learn the language", "Small-cap basics, momentum, risk, Level 2, and Time & Sales."],
  ["02", "Build your routine", "Prepare before the open, follow what is in play, and write down your scenarios."],
  ["03", "Review execution", "Use trade reviews to find the difference between a good idea and a bad decision."],
  ["04", "Join the room", "Bring that foundation into live sessions, chat, recordings, and accountability."]
];

const resourceOperatingSystem = [
  ["Pre-market", "Build your watchlist, mark key levels, and define what would make a trade valid."],
  ["Live session", "Watch price action with a plan instead of reacting to every candle."],
  ["Post-market", "Review entries, exits, emotions, and the one mistake to clean up next session."],
  ["Weekly reset", "Turn repeated mistakes into rules, routines, and better execution goals."]
];

const affiliateBenefits = [
  ["Live trading community", "A real product traders can log into daily, not a one-off download or hype funnel.", <Radio />],
  ["Execution-focused education", "Position DTSM around discipline, reviews, Level 2, Time & Sales, and better process.", <Target />],
  ["Accountability-based environment", "Promote a community built around showing up, sharing, reviewing, and improving.", <Users />],
  ["Simple subscription plans", "Clear monthly offers make it easier for your audience to understand what to choose.", <Check />],
  ["Creator-friendly positioning", "A strong fit for content built around trading process, education, and consistency.", <Sparkles />],
  ["Recurring commission structure", "Earn while referred members stay active and continue using the DTSM environment.", <Trophy />]
];

const affiliateFit = {
  good: ["Trading creators", "Finance YouTubers", "Discord/community owners", "Small-cap trading content creators", "People with an audience interested in trading education"],
  bad: ["Hype-driven promoters", "Fake profit claims", "Signal sellers", "Misleading marketing"]
};

const affiliateSteps = [
  ["01", "Apply", "Tell us about your audience, content style, and where DTSM would fit naturally."],
  ["02", "Get approved", "Qualified partners receive a referral link, clean talking points, and brand guidelines."],
  ["03", "Share honestly", "Introduce DTSM as a live trading community focused on accountability and execution."],
  ["04", "Earn recurring", "Receive 30% recurring commission for qualified members you refer while they remain active."]
];

const affiliateAssets = [
  ["Community angle", "DTSM is a daily environment for traders to show up, watch, review, and improve."],
  ["Offer clarity", "Starter, Live Access, and Elite give your audience a simple path based on involvement."],
  ["Brand-safe copy", "Educational positioning, no profit promises, no signals language, no misleading claims."],
  ["Launch support", "Use clean benefit points around The Tape, Live Room, recordings, weekly meetings, and reviews."]
];

const painPoints = [
  ["You trade alone", "No one sees the rules you break, the trades you force, or the patterns you keep repeating."],
  ["You consume more than you review", "More videos do not fix inconsistent execution if your own decisions never get examined."],
  ["You lose rhythm after red days", "Without a room to return to, one bad session can turn into days of avoidance or revenge trading."],
  ["You lack a repeatable process", "Pre-market prep, live execution, post-trade review, and weekly reflection need to work together."]
];

const proofStrip = [
  ["Live execution", "Watch real market sessions with context instead of guessing alone.", <Radio />],
  ["Review loops", "Turn trades into notes, feedback, and better rules for next time.", <ClipboardCheck />],
  ["Always-on room", "Stay connected with a 24/7 chatroom before, during, and after market hours.", <MessageCircle />],
  ["Order flow study", "Replay Level 2 and Time & Sales examples so momentum becomes easier to read.", <Layers3 />]
];

const homeOfferGroups = [
  {
    label: "Community",
    title: "Stay connected instead of trading in isolation.",
    body: "The Tape, comments, likes, 24/7 chat, and contributor visibility keep traders engaged around the process.",
    items: ["The Tape", "24/7 chatroom", "Comments + likes", "Leaderboard"]
  },
  {
    label: "Live",
    title: "Watch real sessions with context.",
    body: "Live room access, weekly recaps, and Elite meetings help you stay close to real market examples.",
    items: ["Live Trading Room", "Weekly recaps", "Elite meetings", "Market discussion"]
  },
  {
    label: "Study",
    title: "Review what happened after the move.",
    body: "Recordings, Level 2 and Time & Sales replays, and trade reviews help turn decisions into lessons.",
    items: ["Recordings archive", "Level 2 replays", "Trade reviews", "Worksheets"]
  }
];

const homeJoinSteps = [
  ["Create your account", "Choose your plan and enter the DTSM community through Circle."],
  ["Start with the room", "Check the watchlist, follow the live room, and stay connected in chat."],
  ["Study the examples", "Use recordings, Level 2 and Time & Sales replays, and weekly recaps."],
  ["Review your process", "Bring trades, mistakes, and questions back into the community loop."]
];

const transformationCards = [
  ["Instead of chasing", "Build a pre-market plan and wait for your setup.", "Plan first"],
  ["Instead of hiding losses", "Post reviews, talk through mistakes, and pull out one lesson.", "Review faster"],
  ["Instead of bouncing between videos", "Log into one environment built around repetition and accountability.", "Stay consistent"]
];

const planGuides = [
  ["Start here", "Starter", "You want the community feed, watchlist, and beginner resources so you can build a routine."],
  ["Best daily experience", "Live Access", "You want live sessions, chat, full recordings, Level 2 study, and the most complete room."],
  ["Most accountability", "Elite", "You want weekly meetings, trade review submissions, and deeper feedback around execution."]
];

const communityTestimonials = [
  [
    "John LeMay",
    "Momentum Day Trader",
    "I've learned more in a few months than I did in my first year of trading. Brendan breaks things down clearly, and the community has been an awesome place to grow with serious traders.",
    "Community + structure"
  ],
  [
    "Edward",
    "Momentum Dip Trader",
    "My trading has completely turned around. Hogan makes learning easier, genuinely cares about helping everyone grow, and the community is supportive, motivating, and full of good people.",
    "Supportive community"
  ],
  [
    "Aaron Fade",
    "Community Member",
    "Awesome website. Massive respect. The features and polish are exceptional.",
    "Strong product feel"
  ],
  [
    "David Perman",
    "Community Member",
    "All I can say is WOW. Very impressed with everything you've done. Happy to have found you and your offerings.",
    "Strong first impression"
  ],
  [
    "Kneel",
    "Community Member",
    "Trading has honestly felt so much better after joining this community.",
    "Better environment"
  ]
];

const insideCards = [
  {
    icon: <MessageSquareText />,
    title: "The Tape",
    body: "A social feed where members post trades, screenshots, lessons, and market observations with likes and comments."
  },
  {
    icon: <Radio />,
    title: "Live Trading Room",
    body: "Watch live market sessions and follow real-time execution, setups, and commentary."
  },
  {
    icon: <MessageCircle />,
    title: "24/7 Live Chatroom",
    body: "Stay connected before, during, and after market hours with a live community chat that never closes."
  },
  {
    icon: <Layers3 />,
    title: "Level 2 + Time & Sales",
    body: "Study real order flow examples and understand how momentum builds."
  },
  {
    icon: <ClipboardCheck />,
    title: "Trade Reviews",
    body: "Post your trades, review mistakes, and learn from other members’ decisions."
  },
  {
    icon: <PlayCircle />,
    title: "Recordings Archive",
    body: "Replay full live sessions, tagged setups, weekly recaps, and Level 2 + Time & Sales examples at your own pace."
  },
  {
    icon: <LineChart />,
    title: "Morning Watchlist",
    body: "See the stocks and setups being watched before the market opens."
  },
  {
    icon: <CalendarDays />,
    title: "Weekly Meetings",
    body: "Elite members join weekly sessions to review, talk, connect, and get better together."
  },
  {
    icon: <Trophy />,
    title: "Contributor Leaderboard",
    body: "Members who share posts, helpful information, and thoughtful reviews earn visibility inside the community."
  }
];

const previewTabs = {
  "Weekly Meetings": {
    title: "Connect with real traders and review the week together.",
    eyebrow: "Community Calls",
    mode: "call",
    items: [
      ["Weekly Review", "Members talk through what worked, what failed, and what needs to improve.", "54", "23"],
      ["Trade Talk", "Bring screenshots, questions, and execution mistakes into a live group setting.", "41", "20"],
      ["Action Plan", "Leave with one rule, routine, or focus area to bring into next week.", "67", "29"]
    ],
    side: ["Real trader calls", "Execution review", "Accountability"]
  },
  Recordings: {
    title: "Replay sessions and study examples after market hours.",
    eyebrow: "Archive",
    mode: "recordings",
    items: [
      ["34 min", "Morning momentum review: clean entries versus forced trades.", "22", "7"],
      ["52 min", "Level 2 replay: spotting seller absorption.", "44", "18"],
      ["18 min", "Weekly recap: what worked and what to avoid next week.", "27", "10"]
    ],
    side: ["Replay comments", "Tagged setups", "Study queue"]
  },
  "The Tape": {
    title: "A live feed for trades, notes, and lessons.",
    eyebrow: "Community Feed",
    items: [
      ["9:42 AM", "Posted a VWAP reclaim screenshot. Entry was late, review attached.", "24", "8"],
      ["10:15 AM", "Good patience on this halt setup. Waiting for confirmation kept risk clean.", "31", "12"],
      ["11:03 AM", "Lesson: no trade is still a decision. Skipped three low-quality moves.", "18", "5"]
    ],
    side: ["Trade screenshots", "Comments", "Likes + saves"]
  },
  "Live Trading Room": {
    title: "Follow real-time market sessions with context.",
    eyebrow: "Live Trading Room",
    items: [
      ["Live", "Watching relative volume and tape speed before any entry.", "42", "16"],
      ["Setup", "Small-cap momentum forming near high-of-day.", "29", "9"],
      ["Review", "Risk defined below reclaim. No chase if it extends.", "36", "14"]
    ],
    side: ["Screen share", "Live commentary", "24/7 chat"]
  },
  "Trade Reviews": {
    title: "Turn trades into feedback loops.",
    eyebrow: "Review Board",
    items: [
      ["Entry", "Was the trade planned before the candle moved?", "33", "15"],
      ["Risk", "Where was invalidation and was size appropriate?", "21", "11"],
      ["Lesson", "What should be repeated, changed, or removed?", "39", "19"]
    ],
    side: ["Peer comments", "Mistake log", "Feedback threads"]
  },
  Watchlist: {
    title: "Know what is in play before the bell.",
    eyebrow: "Morning Watchlist",
    items: [
      ["8:12 AM", "Top gappers organized by volume, float, and catalyst quality.", "28", "6"],
      ["8:36 AM", "Key levels marked before the open so entries are not emotional.", "35", "13"],
      ["9:18 AM", "Scenarios posted: breakout, reclaim, fail, or no trade.", "40", "17"]
    ],
    side: ["Gappers", "Key levels", "Shared notes"]
  }
};

const lookInsideTabs = {
  "Live Room": {
    icon: <Radio />,
    title: "Live execution, context, and market prep.",
    status: "Live now",
    summary: "Follow real-time small-cap sessions with commentary, setups, risk notes, and replays.",
    mode: "video",
    posts: [
      ["9:31 AM", "Opening drive is fast. Waiting for clean reclaim before touching it.", "38", "14"],
      ["9:47 AM", "Tape speed increased near high-of-day. Watching for bid support.", "52", "19"],
      ["10:08 AM", "No chase. If it pulls into VWAP with buyers, then we reassess.", "44", "17"]
    ],
    stat: "24 traders watching"
  },
  "The Tape": {
    icon: <MessageSquareText />,
    title: "A social feed for trades, lessons, and observations.",
    status: "128 posts today",
    summary: "Members share screenshots, notes, lessons, and market reads with comments and likes.",
    posts: previewTabs["The Tape"].items,
    stat: "842 likes this week"
  },
  "24/7 Chat": {
    icon: <MessageCircle />,
    title: "The live chatroom is always open.",
    status: "Open 24/7",
    summary: "Pre-market questions, live discussion, after-hours review, and accountability all in one room.",
    posts: [
      ["7:18 AM", "Anyone watching low-float gappers today? Volume scanner is heating up.", "21", "11"],
      ["12:44 PM", "Midday reminder: no setup, no trade. Protect mental capital.", "46", "16"],
      ["8:07 PM", "Posting my recap. I broke one rule and want feedback on the entry.", "33", "18"]
    ],
    stat: "Always-on room"
  },
  "Live Recordings": {
    icon: <PlayCircle />,
    title: "Replay the exact sessions you missed.",
    status: "Recording archive",
    summary: "Study full live sessions, tagged setups, entry discussions, and post-market recaps on your own schedule.",
    mode: "replay",
    posts: [
      ["52 min", "Small-cap momentum session: clean entry versus chase behavior.", "64", "21"],
      ["34 min", "Morning prep replay: watchlist, levels, and no-trade scenarios.", "47", "15"],
      ["18 min", "Weekly recap: what worked, what failed, what to repeat.", "39", "12"]
    ],
    stat: "86 replays"
  },
  "Level 2 Replays": {
    icon: <Layers3 />,
    title: "Study Level 2 and Time & Sales recordings.",
    status: "Order flow study",
    summary: "Replay bid stacking, seller absorption, tape speed, and momentum shifts with community notes attached.",
    mode: "orderflow",
    posts: [
      ["Tape replay", "Large bids stacked before the reclaim. Watch the speed change.", "58", "20"],
      ["Level 2", "Seller absorption at 3.92 before buyers stepped back in.", "46", "17"],
      ["Time & Sales", "Green prints accelerated after volume confirmation.", "51", "18"]
    ],
    stat: "Order flow library"
  },
  Leaderboard: {
    icon: <Trophy />,
    title: "The best contributors become visible.",
    status: "Top contributors",
    summary: "Members earn recognition by posting useful information, comments, reviews, and lessons.",
    posts: [
      ["#1 Edwin O.", "Shared 18 posts and multiple Level 2 screenshots this week.", "126", "34"],
      ["#2 CV-Pete", "Added 42 helpful comments across trade reviews.", "98", "27"],
      ["#3 Maya T.", "Submitted 11 detailed review breakdowns.", "86", "22"]
    ],
    stat: "Reputation, not hype"
  },
  "Trade Reviews": {
    icon: <ClipboardCheck />,
    title: "Break down wins and losses with the room.",
    status: "96 comments",
    summary: "Post entries, exits, mistakes, screenshots, and lessons so the community can help you improve.",
    posts: previewTabs["Trade Reviews"].items,
    stat: "Feedback loops"
  },
  "Elite Meetings": {
    icon: <CalendarDays />,
    title: "Weekly meetings to review, talk, connect, and improve.",
    status: "Elite weekly",
    summary: "Elite members join focused sessions around execution, psychology, consistency, and trade review.",
    posts: [
      ["Thursday", "Weekly trade review: what worked, what failed, and what to clean up.", "54", "23"],
      ["Group call", "Members bring screenshots and talk through decisions live.", "41", "20"],
      ["Action plan", "Leave with one execution rule to focus on next week.", "67", "29"]
    ],
    stat: "Elite accountability"
  }
};

const lookInsideTabNames = Object.keys(lookInsideTabs);
const previewTabNames = Object.keys(previewTabs);

const leaderboard = [
  ["Edwin O.", "Shared 18 posts", "1,240 pts"],
  ["CV-Pete", "42 helpful comments", "980 pts"],
  ["Maya T.", "11 trade reviews", "860 pts"]
];

const pillars = [
  {
    icon: <Clock3 />,
    title: "Show Up Daily",
    body: "Build the habit of checking in, preparing, and staying engaged instead of disappearing after a rough session."
  },
  {
    icon: <TrendingUp />,
    title: "Learn From Real Trades",
    body: "Study live sessions, Level 2, Time & Sales, screenshots, and recordings from actual market conditions."
  },
  {
    icon: <Users />,
    title: "Review And Improve Together",
    body: "Use community feedback and trade reviews to turn repeated mistakes into better process."
  }
];

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$19.99",
    note: "Build your foundation",
    bestFor: "For getting inside, learning the language, and building a trading routine.",
    outcome: "Community foundation",
    cta: "Get Started",
    features: ["Community access", "The Tape", "Morning watchlist", "Beginner resources", "Limited recordings"]
  },
  {
    id: "live",
    name: "Live Access",
    price: "$49.99",
    note: "Full live trading experience",
    trial: "1 month trial for $11.99",
    bestFor: "For traders who want the live room, 24/7 chat, recordings, and the full daily environment.",
    outcome: "Best daily experience",
    cta: "Join Live Community",
    popular: true,
    features: [
      "Everything in Starter",
      "Live Trading Room",
      "24/7 live chatroom",
      "Full recording archive",
      "Live session recordings",
      "Level 2 + Time & Sales recordings",
      "Level 2 + Time & Sales breakdowns",
      "Weekly recaps",
      "Likes, comments, and community threads"
    ]
  },
  {
    id: "pro",
    name: "Elite",
    price: "$99.99",
    note: "Accountability + deeper feedback",
    trial: "7 day free trial",
    bestFor: "For traders who want weekly meetings, trade review submissions, and deeper accountability.",
    outcome: "Highest accountability",
    cta: "Upgrade Access",
    features: [
      "Everything in Live Access",
      "Elite weekly meetings",
      "Trade review submissions",
      "Strategy worksheets",
      "Deeper breakdowns",
      "Leaderboard recognition"
    ]
  }
];

const comparisonRows = [
  ["Community access", true, true, true],
  ["The Tape", true, true, true],
  ["Morning watchlist", true, true, true],
  ["Beginner resources", true, true, true],
  ["Likes and comments", true, true, true],
  ["Contributor leaderboard", true, true, true],
  ["Live Trading Room", false, true, true],
  ["24/7 live chatroom", false, true, true],
  ["Full recording archive", false, true, true],
  ["Live session recordings", false, true, true],
  ["Level 2 + Time & Sales recordings", false, true, true],
  ["Level 2 + Time & Sales breakdowns", false, true, true],
  ["Weekly recaps", false, true, true],
  ["Elite weekly meetings", false, false, true],
  ["Trade review submissions", false, false, true],
  ["Strategy worksheets", false, false, true]
];

const steps = [
  ["01", "Join DTSM", "Choose the access level that matches how involved you want to be."],
  ["02", "Show up and follow along", "Use live rooms, The Tape, watchlists, and recordings to build rhythm."],
  ["03", "Review trades and improve execution", "Turn decisions into lessons through repetition, notes, and feedback."]
];

const workflowCards = [
  {
    icon: <BarChart3 />,
    title: "Find What Is Moving",
    body: "Use scanners and news to identify names worth watching before the room starts building a plan."
  },
  {
    icon: <Target />,
    title: "Build A Trade Plan",
    body: "Bring the ticker into DTSM for levels, scenarios, risk notes, and real-time community context."
  },
  {
    icon: <Library />,
    title: "Study The Replay",
    body: "Return after the move to review recordings, Level 2, Time & Sales, comments, and what actually happened."
  }
];

const scannerSteps = [
  ["01", "Scan", "Find names with unusual movement, volume, and attention."],
  ["02", "Filter", "Separate clean opportunities from random movers and low-quality noise."],
  ["03", "Plan", "Mark levels, scenarios, risk, and what would make it a no-trade."],
  ["04", "Review", "Study the move later with recordings, Level 2, Time & Sales, and notes."]
];

const faqs = [
  {
    q: "Who is DTSM actually for?",
    a: "DTSM is for traders who want a real environment to stay consistent, review decisions, and learn from live market examples. It is built for people who want structure and repetition, not hype."
  },
  {
    q: "Is this a signals group or a course?",
    a: "No. DTSM is a live trading community. You get the room, the watchlist, recordings, trade reviews, Level 2 and Time & Sales study, and a place to improve your process with other traders."
  },
  {
    q: "What do I get after I join?",
    a: "You log into Circle, get access based on your plan, and can immediately start using the community feed, watchlists, chat, recordings, and live room. Elite also adds the weekly accountability meetings and deeper review."
  },
  {
    q: "Is this beginner friendly?",
    a: "Yes, as long as you are willing to learn the basics and stay patient. Starter includes beginner resources, and the environment helps newer traders follow along with real examples instead of bouncing between random videos."
  },
  {
    q: "Are the live sessions and Level 2 breakdowns recorded?",
    a: "Yes. Live Access and Elite include session recordings, plus Level 2 and Time & Sales replays, so you can study execution after the market closes and revisit what you missed."
  },
  {
    q: "What is The Tape?",
    a: "The Tape is the member feed inside DTSM where traders post screenshots, trade thoughts, lessons, watchlist notes, and market observations. Useful posts can get comments and likes so the best information rises naturally."
  },
  {
    q: "Can I cancel anytime and what happens after the trial?",
    a: "Yes. You can cancel anytime. Live Access starts at $11.99 for the first month and then renews at $49.99 per month unless cancelled. Elite includes a 7-day free trial and then renews at $99.99 per month unless cancelled."
  },
  {
    q: "Do you guarantee profits or give financial advice?",
    a: "No. Trading involves risk. DTSM is educational and community-based only. The focus is on process, accountability, and improving decision-making over time."
  }
];

function scrollToSection(event, id) {
  event?.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", `#${id}`);
}

function goToHomeSection(event, id, isHome) {
  if (isHome) {
    scrollToSection(event, id);
    return;
  }

  event.preventDefault();
  window.location.assign(`/#${id}`);
}

function Header({ menuOpen, setMenuOpen }) {
  const isHome = window.location.pathname === "/";

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="DTSM home">
        <img className="brand-orb" src="/assets/dtsm-orb-logo.png" alt="" />
        <strong>DTSM</strong>
      </a>
      <nav className={menuOpen ? "nav open" : "nav"} aria-label="Main navigation">
        {navItems.map((item) => {
          const href = item.href || `/#${item.id}`;
          return (
            <a
              key={item.label}
              href={href}
              onClick={(event) => {
                setMenuOpen(false);
                if (item.id) {
                  goToHomeSection(event, item.id, isHome);
                }
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      <div className="header-actions">
        <a className="header-login" href={loginLink} onClick={() => trackEvent("login_click", { location: "header" })}>
          Log In
        </a>
        <a
          className="header-cta"
          href="/#pricing"
          onClick={(event) => {
            trackEvent("pricing_click", { location: "header" });
            goToHomeSection(event, "pricing", isHome);
          }}
        >
          View Plans <ArrowRight size={17} />
        </a>
      </div>
      <button className="icon-button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer>
      <div className="brand footer-brand">
        <img className="brand-orb" src="/assets/dtsm-orb-logo.png" alt="" />
        <strong>DTSM</strong>
      </div>
      <div className="footer-middle">
        <div className="footer-links">
          <a href="/privacy">
            Privacy
          </a>
          <a href="/terms">
            Terms
          </a>
          <a href="/contact">
            Contact
          </a>
          <a href={youtubeLink} onClick={() => trackEvent("youtube_click", { location: "footer" })}>
            <PlayCircle size={17} /> YouTube
          </a>
          <a href={discordLink} onClick={() => trackEvent("discord_click", { location: "footer" })}>
            <MessageCircle size={17} /> Discord
          </a>
        </div>
        <div className="footer-support-block">
          <strong>Support</strong>
          <p>Questions about membership, billing, affiliate applications, or access? Email us anytime.</p>
          <a className="footer-support" href={`mailto:${supportEmail}`}>drivethestockmarket@gmail.com</a>
        </div>
        <p>
          No financial advice. Educational content only. Trading involves risk. No guaranteed results.
        </p>
      </div>
    </footer>
  );
}

function LegalPage({ menuOpen, setMenuOpen, kicker, title, intro, sections }) {
  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero legal-hero">
        <div>
          <span className="kicker">{kicker}</span>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="legal-hero-card">
          <span>Support</span>
          <strong>Need help?</strong>
          <p>Email {supportEmail} for membership questions, access help, or brand and partnership inquiries.</p>
          <a className="primary-button" href={`mailto:${supportEmail}`}>
            Contact Support <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="section legal-section">
        <div className="legal-grid">
          {sections.map(([heading, body]) => (
            <article className="legal-card" key={heading}>
              <h2>{heading}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ContactPage({ menuOpen, setMenuOpen }) {
  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero legal-hero">
        <div>
          <span className="kicker">Contact</span>
          <h1>Questions, support, or membership help.</h1>
          <p>
            Reach out if you need help with access, billing, the affiliate program, or general
            questions about DTSM. The fastest path is email.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={`mailto:${supportEmail}`}>
              Email Support <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="/#pricing">
              View Membership Plans
            </a>
          </div>
        </div>
        <div className="contact-panel">
          <article>
            <span>Email</span>
            <strong>{supportEmail}</strong>
            <p>Best for support, billing, access, partnerships, and general questions.</p>
          </article>
          <article>
            <span>Member Access</span>
            <strong>Circle Login</strong>
            <p>Already joined? Log in to Circle first if you need to check your membership or content access.</p>
            <a className="secondary-button" href={loginLink} onClick={() => trackEvent("login_click", { location: "contact_page" })}>
              Log In <ArrowRight size={17} />
            </a>
          </article>
        </div>
      </section>

      <section className="section legal-section">
        <div className="legal-grid">
          {[
            ["Membership questions", "If you are unsure which plan to choose, email support and include what stage you are at, whether you want live sessions, and whether you want weekly accountability."],
            ["Billing and access help", "If you joined and cannot access Circle, recordings, or your plan content, email support with the email address used at checkout so access can be checked quickly."],
            ["Affiliate inquiries", "If you want to partner with DTSM but have questions before applying, email support with your audience details and where you plan to promote the brand."],
            ["General support", "For anything else related to the site, resources, scanner page, or product questions, email drivethestockmarket@gmail.com."]
          ].map(([heading, body]) => (
            <article className="legal-card" key={heading}>
              <h2>{heading}</h2>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function ScannerEmbedPanel({
  compact = false,
  title = "ChartsWatcher Biggest Gainers",
  label = "Embedded Scanner",
  badge = "Live tool preview",
  src = chartsWatcherScannerEmbed,
  iframeTitle = "ChartsWatcher biggest gainers from close scanner"
}) {
  return (
    <div className={compact ? "scanner-panel compact" : "scanner-panel"} aria-label="ChartsWatcher scanner preview">
      <div className="scanner-top">
        <div>
          <small>{label}</small>
          <strong>{title}</strong>
        </div>
        <span>{badge}</span>
      </div>
      <div className="scanner-embed">
        <iframe
          title={iframeTitle}
          src={src}
          loading="eager"
          referrerPolicy="no-referrer-when-downgrade"
          allow="fullscreen"
        />
      </div>
      <div className="scanner-footer-row">
        <a className="scanner-fallback" href={chartsWatcherLink} target="_blank" rel="noreferrer" onClick={() => trackEvent("chartswatcher_click", { location: "scanner_embed" })}>
          Join ChartsWatcher & Save 10% <ArrowRight size={16} />
        </a>
        <span>Use code <strong>{chartsWatcherCode}</strong> at checkout for 10% off.</span>
      </div>
    </div>
  );
}

function FreeChannelsSection({ variant = "resources" }) {
  const isScanner = variant === "scanner";
  const channels = isScanner
    ? [
        {
          type: "youtube",
          label: "YouTube Training",
          title: "Learn how to use scanners without chasing",
          body: "Watch breakdowns that turn scanner hits into cleaner levels, scenarios, and review habits.",
          href: youtubeLink,
          cta: "Watch On YouTube",
          icon: <PlayCircle />
        },
        {
          type: "discord",
          label: "Free Discord Preview",
          title: "Talk through what is moving with other traders",
          body: "Join the free DTSM Discord preview to stay connected around market ideas, prep, and community.",
          href: discordLink,
          cta: "Join Discord",
          icon: <MessageCircle />
        }
      ]
    : [
        {
          type: "youtube",
          label: "YouTube",
          title: "Watch market breakdowns, Level 2 lessons, and trade review videos",
          body: "Use free DTSM videos to build trust, learn the language, and see how execution is reviewed.",
          href: youtubeLink,
          cta: "Open YouTube",
          icon: <PlayCircle />
        },
        {
          type: "discord",
          label: "Discord",
          title: "Join the free DTSM community preview and stay connected",
          body: "Get closer to the community before becoming a member and see how traders stay plugged in.",
          href: discordLink,
          cta: "Join Free Discord",
          icon: <MessageCircle />
        }
      ];

  return (
    <section className={isScanner ? "section free-channels-section scanner-channels" : "section free-channels-section"}>
      <div className="section-heading centered compact">
        <span className="kicker">{isScanner ? "Keep Learning" : "Free Training + Community Preview"}</span>
        <h2>{isScanner ? "Turn scanner ideas into better decisions." : "Start free before joining the full DTSM environment."}</h2>
        <p>
          {isScanner
            ? "Use YouTube for scanner education and Discord to stay connected around what is moving."
            : "Watch free training, join the free community preview, then step into DTSM when you want the full live environment."}
        </p>
      </div>
      <div className="channel-card-grid">
        {channels.map((channel) => (
          <a
            className={`channel-card ${channel.type}`}
            href={channel.href}
            onClick={() => trackEvent(channel.type === "youtube" ? "youtube_click" : "discord_click", { location: variant })}
            aria-label={`${channel.cta}: ${channel.title}`}
            key={channel.label}
          >
            <div className="channel-orb">{channel.icon}</div>
            <div className="channel-click-cue">Open <ArrowRight size={16} /></div>
            <span>{channel.label}</span>
            <h3>{channel.title}</h3>
            <p>{channel.body}</p>
            <strong>{channel.cta} <ArrowRight size={18} /></strong>
          </a>
        ))}
      </div>
    </section>
  );
}

function FounderSection() {
  return (
    <section className="section founder-section">
      <div className="founder-image-card">
        <img src="/assets/founder-community-preview.png" alt="DTSM founder with community trading visuals" />
      </div>
      <div className="founder-copy">
        <span className="kicker">Founder</span>
        <h2>Built From Real Trading Experience</h2>
        <p>
          DTSM was built from the day-to-day reality of small-cap trading: preparing for the open,
          watching momentum form, managing execution, and reviewing what actually happened after
          the trade is over.
        </p>
        <p>
          The goal is not to create another guru-style course or a room full of random alerts. It
          is to give traders a live environment where they can stop trading alone, stay consistent,
          learn from real market examples, and improve execution through repetition.
        </p>
        <div className="founder-points">
          <span><Check size={17} /> Execution-first</span>
          <span><Check size={17} /> Small-cap focused</span>
          <span><Check size={17} /> Built for consistency</span>
        </div>
      </div>
    </section>
  );
}

function HeroLookInside() {
  const [activeTab, setActiveTab] = useState("Live Room");
  const [isPaused, setIsPaused] = useState(false);
  const active = lookInsideTabs[activeTab];

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = lookInsideTabNames.indexOf(current);
        return lookInsideTabNames[(currentIndex + 1) % lookInsideTabNames.length];
      });
    }, 4200);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="hero-visual"
      aria-label="Interactive DTSM community preview"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="look-window">
        <div className="look-topbar">
          <span />
          <span />
          <span />
          <img src="/assets/dtsm-orb-logo.png" alt="" />
          <b>DTSM Community</b>
        </div>
        <div className="look-layout">
          <aside className="look-tabs" aria-label="Look inside DTSM tabs">
            <strong>Look inside</strong>
            {lookInsideTabNames.map((name) => {
              const tab = lookInsideTabs[name];
              return (
              <button
                key={name}
                className={activeTab === name ? "active" : ""}
                onClick={() => setActiveTab(name)}
                onMouseEnter={() => setActiveTab(name)}
              >
                {tab.icon}
                <span>{name}</span>
              </button>
              );
            })}
          </aside>
          <section className="look-main" key={activeTab}>
            <div className="look-status">
              <div>
                <small>{active.status}</small>
                <strong>{active.title}</strong>
                <p>{active.summary}</p>
              </div>
              <a href="#pricing" onClick={(event) => scrollToSection(event, "pricing")}>Join Room</a>
            </div>

            <div className="look-content-grid">
              <div className={active.mode ? `look-feed ${active.mode}` : "look-feed"}>
                {active.mode === "video" && (
                  <div className="live-video-card">
                    <div className="video-screen">
                      <div className="video-chart">
                        {Array.from({ length: 20 }).map((_, index) => (
                          <i key={index} style={{ height: `${24 + ((index * 31) % 62)}%` }} />
                        ))}
                      </div>
                      <div className="video-overlay">
                        <span className="live-dot">Live</span>
                        <strong>Screen share: small-cap momentum session</strong>
                        <small>Chart, Level 2, Time & Sales, and execution commentary</small>
                      </div>
                      <button className="play-button" aria-label="Preview live room">
                        <PlayCircle size={38} />
                      </button>
                    </div>
                    <div className="video-controls">
                      <span>09:41</span>
                      <div><i /></div>
                      <strong>24 watching</strong>
                    </div>
                    <div className="video-notes">
                      <span><Check size={15} /> Real-time setup context</span>
                      <span><Check size={15} /> Execution notes</span>
                      <span><Check size={15} /> Replay saved after session</span>
                    </div>
                  </div>
                )}

                {active.mode === "replay" && (
                  <div className="recording-grid">
                    {active.posts.map(([meta, text, likes, comments]) => (
                      <article className="recording-card" key={`${activeTab}-${meta}`}>
                        <div className="recording-thumb">
                          <PlayCircle size={28} />
                          <span>{meta}</span>
                        </div>
                        <p>{text}</p>
                        <div className="feed-actions">
                          <span><Heart size={15} /> {likes}</span>
                          <span><MessageCircle size={15} /> {comments}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {active.mode === "orderflow" && (
                  <div className="orderflow-panel">
                    <div className="level-two-board">
                      <div className="board-head">
                        <strong>Level 2 Replay</strong>
                        <span>VOLX 3.92</span>
                      </div>
                      <div className="book-grid">
                        <b>MMID</b><b>BID</b><b>SIZE</b><b>ASK</b><b>SIZE</b>
                        <span>NSDQ</span><em>3.92</em><strong>300</strong><i>3.93</i><strong>200</strong>
                        <span>ARCA</span><em>3.92</em><strong>400</strong><i>3.93</i><strong>300</strong>
                        <span>BATS</span><em>3.91</em><strong>500</strong><i>3.94</i><strong>300</strong>
                        <span>MEMX</span><em>3.91</em><strong>400</strong><i>3.94</i><strong>200</strong>
                      </div>
                    </div>
                    <div className="sales-strip">
                      <span>10:14:03</span><b>3.92</b><em>1,200</em>
                      <span>10:14:05</span><b>3.93</b><em>900</em>
                      <span>10:14:08</span><b>3.94</b><em>1,800</em>
                    </div>
                    {active.posts.map(([meta, text, likes, comments]) => (
                      <article className="look-post compact" key={`${activeTab}-${meta}`}>
                        <div>
                          <small>{meta}</small>
                          <p>{text}</p>
                          <div className="feed-actions">
                            <span><Heart size={15} /> {likes}</span>
                            <span><MessageCircle size={15} /> {comments}</span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {!active.mode && active.posts.map(([meta, text, likes, comments]) => (
                  <article className="look-post" key={`${activeTab}-${meta}`}>
                    <div className="post-avatar">{String(meta).replace("#", "").slice(0, 1)}</div>
                    <div>
                      <small>{meta}</small>
                      <p>{text}</p>
                      <div className="feed-actions">
                        <span><Heart size={15} /> {likes}</span>
                        <span><MessageCircle size={15} /> {comments}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="look-side">
                <div className="look-chart">
                  {Array.from({ length: 16 }).map((_, index) => (
                    <i key={index} style={{ height: `${30 + ((index * 29) % 56)}%` }} />
                  ))}
                </div>
                <div className="look-stat">
                  <span>{active.stat}</span>
                  <strong>{activeTab}</strong>
                </div>
                <div className="look-leaderboard">
                  <div className="leaderboard-title">
                    <Trophy size={17} />
                    <strong>Leaderboard</strong>
                  </div>
                  {leaderboard.map(([name, activity, points], index) => (
                    <div className="leader-row" key={name}>
                      <span>{index + 1}</span>
                      <div>
                        <strong>{name}</strong>
                        <small>{activity}</small>
                      </div>
                      <b>{points}</b>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function CommunityPreview() {
  const [activeTab, setActiveTab] = useState("Weekly Meetings");
  const [isPaused, setIsPaused] = useState(false);
  const active = previewTabs[activeTab];

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = previewTabNames.indexOf(current);
        return previewTabNames[(currentIndex + 1) % previewTabNames.length];
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <section className="section preview-section">
      <div className="section-heading centered">
        <span className="kicker">Community Preview</span>
        <h2>Peek inside the environment before you join.</h2>
        <p>
          Click through the core spaces and see how DTSM turns market activity into a repeatable
          improvement loop.
        </p>
      </div>
      <div
        className="preview-shell"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="preview-tabs" role="tablist" aria-label="Community preview tabs">
          {previewTabNames.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
              onMouseEnter={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="platform-preview" key={activeTab}>
          <div className="platform-main">
            <span className="preview-eyebrow">{active.eyebrow}</span>
            <h3>{active.title}</h3>
            {active.mode === "call" ? (
              <div className="meeting-preview">
                <div className="meeting-top">
                  <span><Radio size={15} /> Elite Weekly Execution Review</span>
                  <strong>Live now - 18 members</strong>
                </div>
                <div className="meeting-call-stage">
                  <div className="meeting-room-window">
                    <div className="meeting-window-bar">
                      <span><Video size={15} /> Weekly meeting</span>
                      <b>Recording</b>
                    </div>
                    <div className="meeting-call-grid" aria-label="Weekly meeting members">
                      {[
                        ["BH", "Brendan", "Breaking down the week's best setup", true],
                        ["ED", "Edward", "Reviewing entries and exits"],
                        ["CV", "CV-Pete", "Asking about tape confirmation"],
                        ["JL", "John", "Taking notes for next week"]
                      ].map(([initials, name, status, activeSpeaker]) => (
                        <article className={activeSpeaker ? "active-speaker" : ""} key={name}>
                          <div className="meeting-avatar">{initials}</div>
                          <strong>{name}</strong>
                          <span>{status}</span>
                          {activeSpeaker ? <b><Radio size={13} /> Speaking</b> : null}
                        </article>
                      ))}
                    </div>
                    <div className="meeting-call-controls" aria-label="Call controls">
                      <span><Mic size={15} /> Mic on</span>
                      <span><Video size={15} /> Camera</span>
                      <span><MonitorUp size={15} /> Share</span>
                      <span className="end-call"><PhoneOff size={15} /> Leave</span>
                    </div>
                  </div>
                  <div className="meeting-chat">
                    <strong>Call chat</strong>
                    {[
                      ["Brendan", "This is a really good one to come back to after the close and study together."],
                      ["Edward", "My best trade this week came from waiting for confirmation here."],
                      ["CV-Pete", "That helps. I forced the first pop instead of letting it settle."],
                      ["John", "Writing down: no chase after extension, wait for the reclaim."]
                    ].map(([name, message]) => (
                      <p key={message}><span>{name}</span>{message}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : active.mode === "recordings" ? (
              <div className="preview-recording-grid">
                {active.items.map(([duration, title, likes, comments]) => (
                  <article className="preview-recording-card" key={`${duration}-${title}`}>
                    <div className="preview-recording-thumb">
                      <PlayCircle size={34} />
                      <span>{duration}</span>
                    </div>
                    <strong>{title}</strong>
                    <div className="feed-actions" aria-label="Recording engagement">
                      <span><Heart size={15} /> {likes}</span>
                      <span><MessageCircle size={15} /> {comments}</span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="feed-list">
                {active.items.map(([meta, text, likes, comments]) => (
                  <div className="feed-item" key={`${activeTab}-${meta}`}>
                    <small>{meta}</small>
                    <p>{text}</p>
                    <div className="feed-actions" aria-label="Post engagement">
                      <span><Heart size={15} /> {likes}</span>
                      <span><MessageCircle size={15} /> {comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <aside className="platform-side">
            <div className="side-chart">
              {Array.from({ length: 18 }).map((_, index) => (
                <i key={index} style={{ height: `${28 + ((index * 23) % 58)}%` }} />
              ))}
            </div>
            {active.side.map((item) => (
              <div className="side-pill" key={item}>
                <Check size={16} /> {item}
              </div>
            ))}
            <div className="leaderboard-mini">
              <div className="leaderboard-title">
                <Trophy size={17} />
                <strong>Top contributors</strong>
              </div>
              {leaderboard.map(([name, activity, points], index) => (
                <div className="leader-row" key={name}>
                  <span>{index + 1}</span>
                  <div>
                    <strong>{name}</strong>
                    <small>{activity}</small>
                  </div>
                  <b>{points}</b>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function HomePage({ menuOpen, setMenuOpen }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section id="top" className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={17} /> Accountability-based live trading community</div>
          <h1>
            Live Trading Community
            <span>Built for Execution.</span>
          </h1>
          <p>
            Log in daily to watch live setups, study Level 2 and Time & Sales, review trades, and
            build a more disciplined small-cap trading process.
          </p>
          <div className="hero-actions">
            <a
              className="primary-button"
              href="#pricing"
              onClick={(event) => {
                trackEvent("pricing_click", { location: "hero" });
                scrollToSection(event, "pricing");
              }}
            >
              View Membership Plans <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#preview" onClick={(event) => scrollToSection(event, "preview")}>
              Preview The Community
            </a>
          </div>
          <div className="hero-command-strip">
            <span><Radio size={15} /> Live room</span>
            <span><MessageCircle size={15} /> 24/7 chat</span>
            <span><PlayCircle size={15} /> Recordings</span>
            <span><Trophy size={15} /> Leaderboard</span>
          </div>
        </div>
        <div className="hero-product">
          <HeroLookInside />
          <div className="founder-badge">
            <img src="/assets/founder-photo.png" alt="DTSM founder" />
            <span>Built by an active small-cap trader</span>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="DTSM core benefits">
        {proofStrip.map(([title, body, icon]) => (
          <article key={title}>
            <div>{icon}</div>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="section pain-section">
        <div className="pain-copy">
          <span className="kicker">The Real Problem</span>
          <h2>More content will not fix inconsistent execution.</h2>
          <p>
            DTSM gives you what most traders are missing after they buy more content: a room to log
            into, a watchlist to follow, real trades to review, and a reason to keep showing up.
          </p>
          <div className="pain-hit-list">
            <span><X size={15} /> Stop chasing random lessons</span>
            <span><Check size={15} /> Start showing up with structure</span>
          </div>
        </div>
        <div className="pain-panel">
          {painPoints.map(([title, body], index) => (
            <article key={title}>
              <span>{`0${index + 1}`}</span>
              <div>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <FounderSection />

      <section id="inside" className="section inside-section refined-inside">
        <div className="inside-story">
          <div className="inside-copy">
            <span className="kicker">The DTSM System</span>
            <h2>A daily improvement loop for traders who want structure.</h2>
            <p>
              DTSM turns trading from a solo guessing game into a repeatable rhythm: prepare with
              the room, watch real execution, talk through what happened, and review the decisions
              that actually matter.
            </p>
            <a className="secondary-button" href="#preview" onClick={(event) => scrollToSection(event, "preview")}>
              Explore The Preview <ArrowRight size={18} />
            </a>
          </div>
          <div className="inside-os" aria-label="DTSM daily workflow preview">
            <div className="os-top">
              <span />
              <span />
              <span />
              <strong>DTSM Daily Loop</strong>
            </div>
            <div className="os-body">
              <div className="os-main-card">
                <small>Live Room</small>
                <strong>Watch execution with context.</strong>
                <div className="os-chart">
                  {Array.from({ length: 18 }).map((_, index) => (
                    <i key={index} style={{ height: `${24 + ((index * 33) % 62)}%` }} />
                  ))}
                </div>
              </div>
              <div className="os-side-stack">
                <div><MessageSquareText size={18} /><span>The Tape</span></div>
                <div><Layers3 size={18} /><span>Level 2 + T&S</span></div>
                <div><ClipboardCheck size={18} /><span>Trade Reviews</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="inside-flow">
          {[
            ["01", "Prepare", "Watchlist, key levels, and what is actually in play."],
            ["02", "Participate", "Live room, The Tape, and 24/7 chat keep you engaged."],
            ["03", "Study", "Recordings, Level 2 replays, and examples from real sessions."],
            ["04", "Review", "Trade reviews turn decisions into clear lessons."]
          ].map(([number, title, body]) => (
            <article key={title}>
              <span>{number}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <div id="preview">
        <CommunityPreview />
      </div>

      <section className="section home-offer-section">
        <div className="section-heading centered compact">
          <span className="kicker">What You Actually Get</span>
          <h2>Everything is grouped around one goal: better execution.</h2>
          <p>
            When you join, you are not dumped into a pile of content. You get the feed, live room,
            chat, recordings, and trade reviews in one place so the next step is always clear.
          </p>
        </div>
        <div className="home-offer-grid">
          {homeOfferGroups.map((group) => (
            <article key={group.label}>
              <span>{group.label}</span>
              <h3>{group.title}</h3>
              <p>{group.body}</p>
              <div>
                {group.items.map((item) => (
                  <small key={item}><Check size={15} /> {item}</small>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section reactions-section">
        <div className="section-heading centered compact">
          <span className="kicker">Member Feedback</span>
          <h2>Real traders are feeling the difference.</h2>
          <p>
            The win is not just more information. It is having a place to review decisions, stay
            steady after bad days, and build better execution habits over time.
          </p>
        </div>
        <div className="reaction-marquee" aria-label="Member testimonial cards">
          <div className="reaction-track">
            {[...communityTestimonials, ...communityTestimonials].map(([name, role, quote, tag], index) => (
              <article className="reaction-card" key={`${tag}-${index}`}>
                <div className="reaction-top">
                  <span>{name}</span>
                  <b>{role}</b>
                </div>
                <p>"{quote}"</p>
                <div className="reaction-bottom">
                  <strong>{tag}</strong>
                  <em>Member feedback</em>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section social-section">
        <div className="section-heading">
          <span className="kicker">Community System</span>
          <h2>Participation is built into the platform.</h2>
          <p>
            DTSM is designed so members do more than watch. They post, comment, like, ask questions,
            share useful information, and build reputation by helping the room get sharper.
          </p>
        </div>
        <div className="social-grid">
          <article className="social-card large">
            <div className="card-icon"><MessageSquareText /></div>
            <h3>The Tape works like a trading feed.</h3>
            <p>
              Members can post charts, screenshots, trade notes, watchlist ideas, and lessons. Other
              traders can like, comment, and add context so the best observations become easier to find.
            </p>
            <div className="sample-post">
              <div>
                <strong>Edwin O.</strong>
                <small>Posted in The Tape</small>
              </div>
              <p>Level 2 started stacking bids before the breakout. Screenshot and notes attached.</p>
              <div className="feed-actions"><span><Heart size={15} /> 48</span><span><MessageCircle size={15} /> 21</span></div>
            </div>
          </article>
          <article className="social-card">
            <div className="card-icon"><MessageCircle /></div>
            <h3>24/7 Live Trading Chatroom</h3>
            <p>Open around the clock for pre-market prep, live session discussion, after-hours review, and member questions.</p>
          </article>
          <article className="social-card">
            <div className="card-icon"><Trophy /></div>
            <h3>Contributor Leaderboard</h3>
            <p>Members who share posts, useful information, and thoughtful comments earn visibility for helping the community improve.</p>
          </article>
          <article className="social-card">
            <div className="card-icon"><CalendarDays /></div>
            <h3>Elite Weekly Meetings</h3>
            <p>Elite members meet weekly to review trades, talk through execution, connect with other traders, and get better together.</p>
          </article>
        </div>
      </section>

      <section className="section accountability-section">
        <div className="accountability-copy">
          <span className="kicker">Accountability</span>
          <h2>The Environment That Keeps You Consistent</h2>
          <p>
            Most traders fail from inconsistency, not from a lack of random information. DTSM solves
            that through environment, repetition, and a place to review real trading decisions.
          </p>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.title}>
              <div className="card-icon">{pillar.icon}</div>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section home-free-path-section">
        <div className="section-heading centered compact">
          <span className="kicker">Start Free</span>
          <h2>Not ready for membership yet? Start with the free path.</h2>
          <p>
            Start with free breakdowns, join the Discord preview, and use the scanner workflow so
            you can see how DTSM thinks before paying for full access.
          </p>
        </div>
        <div className="home-free-path-grid">
          <a href={youtubeLink} className="home-free-card youtube" onClick={() => trackEvent("youtube_click", { location: "home_free_path" })}>
            <PlayCircle size={24} />
            <span>YouTube</span>
            <strong>Watch free breakdowns</strong>
            <p>Market lessons, Level 2 concepts, scanner education, and execution review content.</p>
            <b>Open YouTube <ArrowRight size={16} /></b>
          </a>
          <a href={discordLink} className="home-free-card discord" onClick={() => trackEvent("discord_click", { location: "home_free_path" })}>
            <MessageCircle size={24} />
            <span>Discord</span>
            <strong>Join the free preview</strong>
            <p>Stay connected with DTSM before becoming a member and see what traders are watching.</p>
            <b>Join Discord <ArrowRight size={16} /></b>
          </a>
          <a href="/scanner" className="home-free-card scanner">
            <LineChart size={24} />
            <span>Scanner</span>
            <strong>Find what is moving</strong>
            <p>Use the ChartsWatcher scanner and DTSM workflow to turn movement into a cleaner plan.</p>
            <b>Open Scanner <ArrowRight size={16} /></b>
          </a>
        </div>
      </section>

      <section className="section join-flow-section">
        <div className="join-flow-copy">
          <span className="kicker">After You Join</span>
          <h2>You are not dropped into random content. You get a daily path.</h2>
          <p>
            The goal is to make the next action obvious: log in, see what is moving, follow the
            room, study the replay, and bring decisions back for review.
          </p>
          <a className="secondary-button" href={loginLink} onClick={() => trackEvent("login_click", { location: "join_flow" })}>Member Login <ArrowRight size={18} /></a>
        </div>
        <div className="join-flow-panel">
          {homeJoinSteps.map(([title, body], index) => (
            <article key={title}>
              <span>{`0${index + 1}`}</span>
              <div>
                <strong>{title}</strong>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="pricing" className="section pricing-section">
        <div className="section-heading centered">
          <span className="kicker">Membership</span>
          <h2>Choose your level of involvement.</h2>
          <p>
            Start with resources, step into the live room, or add weekly accountability when you
            want deeper feedback on your execution.
          </p>
        </div>
        <div className="pricing-focus-bar">
          <span>Best place to start: <strong>Live Access</strong></span>
          <span>Try Live Access for <strong>$11.99 first month</strong></span>
          <span>Elite includes a <strong>7 day free trial</strong></span>
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={plan.popular ? "price-card popular" : "price-card"} key={plan.id}>
              {plan.popular && <div className="popular-badge">Most Popular</div>}
              <div className="price-card-head">
                <span>{plan.outcome}</span>
                <h3>{plan.name}</h3>
                <p>{plan.note}</p>
              </div>
              {plan.trial && <div className="trial-badge">{plan.trial}</div>}
              <div className="price">
                <strong>{plan.price}</strong>
                <span>/mo</span>
              </div>
              <p className="plan-best-for">{plan.bestFor}</p>
              <div className="features-label">Included</div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}><Check size={18} /> {feature}</li>
                ))}
              </ul>
              <a
                className={plan.popular ? "primary-button" : "secondary-button"}
                href={checkoutLinks[plan.id]}
                onClick={() => trackEvent("checkout_click", { plan: plan.id, location: "pricing" })}
              >
                {plan.cta} <ArrowRight size={18} />
              </a>
            </article>
          ))}
        </div>
        <div className="pricing-footer-note">
          <Check size={18} />
          <span>No financial advice. Educational content only. Trading involves risk. No guaranteed results.</span>
        </div>
        <div className="trial-clarity-grid">
          <article>
            <span>Live Access trial</span>
            <strong>$11.99 for your first month</strong>
            <p>After the first month, Live Access continues at $49.99/month unless you cancel before renewal.</p>
          </article>
          <article>
            <span>Elite trial</span>
            <strong>7 days free</strong>
            <p>After the 7-day trial, Elite continues at $99.99/month unless you cancel before the trial ends.</p>
          </article>
          <article>
            <span>Cancel anytime</span>
            <strong>No long-term contract</strong>
            <p>Membership is monthly. You can cancel before your next billing date from your account.</p>
          </article>
        </div>
      </section>

      <section className="discord-pricing-cta">
        <div>
          <span className="kicker">Not ready for paid access yet?</span>
          <h2>Join the free DTSM Discord preview.</h2>
          <p>
            See what traders are watching, stay around market conversation, and get a feel for the
            pace of DTSM before choosing a paid plan.
          </p>
        </div>
        <a className="primary-button" href={discordLink} onClick={() => trackEvent("discord_click", { location: "post_pricing" })}>
          Join Free Discord <MessageCircle size={18} />
        </a>
      </section>

      <section className="section comparison-section">
        <div className="comparison-shell">
          <div className="section-heading centered compact">
            <span className="kicker">Compare</span>
            <h2>See exactly what each plan includes.</h2>
          </div>
          <div className="comparison-table">
            <div className="comparison-row table-head">
              <span>Feature</span>
              <b>Starter</b>
              <b>Live Access</b>
              <b>Elite</b>
            </div>
            {comparisonRows.map(([feature, starter, live, pro]) => (
              <div className="comparison-row" key={feature}>
                <span>{feature}</span>
                {[starter, live, pro].map((included, index) => (
                  <b className={included ? "included" : "not-included"} key={`${feature}-${index}`}>
                    {included ? <Check size={18} /> : "—"}
                  </b>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section steps-section">
        <div className="section-heading centered">
          <span className="kicker">How DTSM Works</span>
          <h2>Join, participate, review, repeat.</h2>
        </div>
        <div className="steps-grid">
          {steps.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="section faq-section">
        <div className="section-heading centered compact">
          <span className="kicker">FAQ</span>
          <h2>Everything people usually want to know before joining.</h2>
          <p>
            The goal is simple: make it obvious what DTSM is, who it helps, and what happens when
            you join.
          </p>
        </div>
        <div className="faq-intro-strip">
          <div className="faq-intro-pill">
            <Check size={16} />
            <span>Real community, not passive content</span>
          </div>
          <div className="faq-intro-pill">
            <Check size={16} />
            <span>Cancel anytime</span>
          </div>
          <div className="faq-intro-pill">
            <Check size={16} />
            <span>Live room + recordings + review</span>
          </div>
          <div className="faq-intro-pill">
            <Check size={16} />
            <span>No financial advice or guarantees</span>
          </div>
        </div>
        <div className="faq-layout">
          <div className="faq-list">
            {faqs.map((item, index) => (
              <button
                className={openFaq === index ? "faq-item active" : "faq-item"}
                key={item.q}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <span>
                  <strong>{item.q}</strong>
                  {openFaq === index && <em>{item.a}</em>}
                </span>
                <ChevronDown />
              </button>
            ))}
          </div>
          <aside className="faq-side-card">
            <span>Still deciding?</span>
            <strong>Start with the plan that matches how involved you want to be.</strong>
            <p>
              Starter gets you inside. Live Access is the full daily experience. Elite adds weekly
              accountability and deeper feedback.
            </p>
            <a className="primary-button" href="#pricing" onClick={(event) => scrollToSection(event, "pricing")}>
              View Membership Plans <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href={supportEmail ? `mailto:${supportEmail}` : "#"}>
              Email Support <ArrowRight size={18} />
            </a>
          </aside>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="kicker">Start Here</span>
          <h2>Start Showing Up. Start Improving.</h2>
          <p>Preview the environment, choose a plan, and put yourself around traders doing the work daily.</p>
        </div>
        <a
          className="primary-button"
          href="#pricing"
          onClick={(event) => {
            trackEvent("pricing_click", { location: "home_final_cta" });
            scrollToSection(event, "pricing");
          }}
        >
          View Membership Plans <ArrowRight size={19} />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}

function ResourcesPage({ menuOpen, setMenuOpen }) {
  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero resource-hero">
        <div>
          <span className="kicker">Free Resource Hub</span>
          <h1>Build Your Trading Process Before You Trade Bigger.</h1>
          <p>
            Learn small-cap basics, Level 2, Time and Sales, watchlists, and trade reviews through
            resources designed to help you prepare before the open, recognize cleaner setups, and
            review your trades with more structure.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/#pricing" onClick={() => trackEvent("pricing_click", { location: "resources_hero" })}>View Membership Plans <ArrowRight size={19} /></a>
            <a className="secondary-button" href="/#preview">Preview The Community</a>
          </div>
        </div>
        <div className="resource-hero-panel">
          <div className="resource-window">
            <div className="look-topbar">
              <span />
              <span />
              <span />
              <img src="/assets/dtsm-orb-logo.png" alt="" />
              <b>DTSM Resource OS</b>
            </div>
            <div className="resource-os-preview">
              <div className="resource-os-main">
                <span>Execution starter kit</span>
                <strong>Plan. Watch. Review. Repeat.</strong>
                <p>A simple resource path for traders who want structure before speed.</p>
              </div>
              <div className="resource-mini-list">
                {resourceOperatingSystem.map(([title, body]) => (
                  <article key={title}>
                    <Check size={16} />
                    <div>
                      <strong>{title}</strong>
                      <p>{body}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="resource-path-section">
        {resourcePath.map(([number, title, body]) => (
          <article key={title}>
            <span>{number}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section className="section featured-resources-section">
        <div className="section-heading centered compact">
          <span className="kicker">Starter Kit</span>
          <h2>Start with the DTSM Starter Course.</h2>
          <p>
            A clean place to learn the basics, understand the language, and get ready for the live
            community without bouncing between random trading content.
          </p>
        </div>
        <a
          className="starter-course-card"
          href={loginLink}
          onClick={() => trackEvent("login_click", { location: "resources_starter_course" })}
        >
          <div className="starter-course-copy">
            <div className="starter-course-topline">
              <span>Free inside Circle</span>
              <b>Beginner friendly</b>
            </div>
            <div className="starter-course-icon">
              <PlayCircle size={26} />
            </div>
            <h3>DTSM Starter Course</h3>
            <p>
              Learn small-cap basics, momentum, risk, Level 2, Time & Sales, and how to build a
              cleaner trading foundation before stepping deeper into the room.
            </p>
            <div className="starter-course-points">
              <span>Free starter course</span>
              <span>Trading basics</span>
              <span>2 hour bonus live recording</span>
              <span>Better daily routine</span>
            </div>
            <strong>Open the Free Starter Course <ArrowRight size={18} /></strong>
          </div>
          <div className="starter-course-visual" aria-hidden="true">
            <div className="starter-course-screen">
              <div className="starter-course-screen-bar">
                <span>Course dashboard</span>
                <b>Free + bonus replay</b>
              </div>
              <div className="starter-course-lesson active">
                <div>
                  <small>Lesson 01</small>
                  <strong>Small-Cap Foundations</strong>
                </div>
                <PlayCircle size={18} />
              </div>
              <div className="starter-course-lesson">
                <div>
                  <small>Lesson 02</small>
                  <strong>Risk + Position Sizing</strong>
                </div>
                <Check size={16} />
              </div>
              <div className="starter-course-lesson">
                <div>
                  <small>Lesson 03</small>
                  <strong>Level 2 + Time & Sales</strong>
                </div>
                <Check size={16} />
              </div>
              <div className="starter-course-lesson">
                <div>
                  <small>Lesson 04</small>
                  <strong>Routine + Review Loop</strong>
                </div>
                <Check size={16} />
              </div>
              <div className="starter-course-lesson bonus">
                <div>
                  <small>Bonus</small>
                  <strong>2 Hour Live Trading Recording</strong>
                </div>
                <PlayCircle size={18} />
              </div>
            </div>
          </div>
        </a>
      </section>

      <FreeChannelsSection />

      {resourceGroups.map((group) => (
        <section className="section resources-section" key={group.title}>
          <div className="section-heading">
            <span className="kicker">{group.eyebrow}</span>
            <h2>{group.title}</h2>
            <p>{group.description}</p>
          </div>
          <div className="resource-grid">
            {group.cards.map(([title, body, icon, tag, time]) => (
              <article className="resource-card" key={title}>
                <div className="card-icon">{icon}</div>
                <div className="resource-card-meta">
                  <span className="resource-status">{tag}</span>
                  <small>{time}</small>
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
                <a href={youtubeLink} onClick={() => trackEvent("youtube_click", { location: "resource_card" })}>View Resource <ArrowRight size={15} /></a>
              </article>
            ))}
          </div>
        </section>
      ))}

      <section className="section scanner-section resources-scanner featured-scanner">
        <div className="scanner-copy">
          <span className="kicker">Free Scanner Workflow</span>
          <h2>Use the scanner after you understand the process.</h2>
          <p>
            The scanner helps you find what is moving. These resources help you decide what is
            worth watching, what is too extended, and what needs to be reviewed later. Use code
            <strong> {chartsWatcherCode}</strong> to save 10% when you sign up through the DTSM link.
          </p>
          <div className="scanner-actions">
            <a className="primary-button" href={chartsWatcherLink} target="_blank" rel="noreferrer" onClick={() => trackEvent("chartswatcher_click", { location: "resources_scanner" })}>
              Get ChartsWatcher <ArrowRight size={18} />
            </a>
            <span>Code: {chartsWatcherCode} for 10% off.</span>
          </div>
        </div>
        <ScannerEmbedPanel compact />
      </section>

      <section className="final-cta">
        <div>
          <span className="kicker">Full Environment</span>
          <h2>Want the full environment?</h2>
          <p>
            Free resources can teach the basics. DTSM adds the live room, member feed, trade
            reviews, recordings, and weekly accountability that help you keep improving after the lesson ends.
          </p>
        </div>
        <a className="primary-button" href="/#pricing" onClick={() => trackEvent("pricing_click", { location: "resources_final_cta" })}>View Membership Plans <ArrowRight size={19} /></a>
      </section>

      <SiteFooter />
    </main>
  );
}

function ScannerPage({ menuOpen, setMenuOpen }) {
  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero scanner-page-hero">
        <div>
          <span className="kicker">Free Scanner</span>
          <h1>Find What Is Moving. Then Build A Real Trading Plan.</h1>
          <p>
            Use the ChartsWatcher biggest gainers scanner to spot momentum, then bring those names
            into your DTSM routine: filter the noise, build scenarios, and review the move with context.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#scanner-tools" onClick={(event) => scrollToSection(event, "scanner-tools")}>
              Open Scanner <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="/#pricing" onClick={() => trackEvent("pricing_click", { location: "scanner_hero" })}>View Membership Plans</a>
          </div>
          <div className="scanner-hero-stats">
            <span><strong>Free</strong> live scanner</span>
            <span><strong>{chartsWatcherCode}</strong> saves 10%</span>
            <span><strong>DTSM</strong> workflow ready</span>
          </div>
        </div>
        <div className="scanner-discount-card hero-discount-card">
          <span>Affiliate perk</span>
          <strong>10% off ChartsWatcher</strong>
          <p>
            Sign up through the DTSM link, then enter the code below at checkout for 10% off
            charting, scanners, and news tools.
          </p>
          <div className="scanner-code-card">
            <span>Discount code</span>
            <strong>{chartsWatcherCode}</strong>
          </div>
          <a className="primary-button" href={chartsWatcherLink} target="_blank" rel="noreferrer" onClick={() => trackEvent("chartswatcher_click", { location: "scanner_hero_card" })}>
            Get ChartsWatcher <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="scanner-process-section">
        {scannerSteps.map(([number, title, body]) => (
          <article key={title}>
            <span>{number}</span>
            <strong>{title}</strong>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <section id="scanner-tools" className="section scanner-section scanner-page-section">
        <div className="scanner-copy">
          <span className="kicker">Live Tool Preview</span>
          <h2>Use the scanner as your starting point, not your entire strategy.</h2>
          <p>
            The scanner can show you movement. DTSM helps with the harder part after that: choosing
            what is actually worth watching, building scenarios, waiting for confirmation, and
            reviewing what happened after the move.
          </p>
          <div className="scanner-actions">
            <a className="primary-button" href={chartsWatcherLink} target="_blank" rel="noreferrer" onClick={() => trackEvent("chartswatcher_click", { location: "scanner_tools_intro" })}>
              Get ChartsWatcher <ArrowRight size={18} />
            </a>
            <span>Use code {chartsWatcherCode} for 10% off. Scanner access and discounts are provided through ChartsWatcher.</span>
          </div>
        </div>
        <div className="scanner-tool-grid">
          <ScannerEmbedPanel />
          <ScannerEmbedPanel
            title="ChartsWatcher HOD Momentum"
            label="Momentum Scanner"
            badge="HOD momentum"
            src={chartsWatcherHodMomentumEmbed}
            iframeTitle="ChartsWatcher HOD momentum scanner"
          />
          <ScannerEmbedPanel
            title="ChartsWatcher High Of The Day"
            label="High Of Day Scanner"
            badge="HOD scan"
            src={chartsWatcherHighOfDayEmbed}
            iframeTitle="ChartsWatcher high of the day scanner"
          />
        </div>
      </section>

      <FreeChannelsSection variant="scanner" />

      <section className="final-cta">
        <div>
          <span className="kicker">Bring It Into DTSM</span>
          <h2>Find what is moving, then review how you execute.</h2>
          <p>
            A scanner can show you activity. DTSM gives you the watchlist context, live room,
            recordings, and review loop that help you trade it with more discipline.
          </p>
        </div>
        <a className="primary-button" href="/#pricing" onClick={() => trackEvent("pricing_click", { location: "scanner_final_cta" })}>View Membership Plans <ArrowRight size={19} /></a>
      </section>

      <SiteFooter />
    </main>
  );
}

function AffiliatesPage({ menuOpen, setMenuOpen }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    social: "",
    audience: "",
    promotion: "",
    why: ""
  });

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submitApplication(event) {
    event.preventDefault();
    setSubmitError("");
    const allFilled = Object.values(form).every((value) => value.trim().length > 0);
    if (!allFilled || !form.email.includes("@")) {
      event.currentTarget.classList.add("show-validation");
      return;
    }

    setSubmitting(true);
    const payload = new FormData();
    payload.append("_subject", "New DTSM affiliate application");
    payload.append("_template", "table");
    payload.append("Full Name", form.name);
    payload.append("Email Address", form.email);
    payload.append("Social Link", form.social);
    payload.append("Audience Size", form.audience);
    payload.append("Promotion Plan", form.promotion);
    payload.append("Why Partner With DTSM", form.why);

    try {
      const response = await fetch(affiliateFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: payload
      });
      if (!response.ok) {
        throw new Error("Affiliate application could not be sent.");
      }
      trackEvent("affiliate_form_submit", { status: "success" });
      setSubmitted(true);
    } catch {
      trackEvent("affiliate_form_submit", { status: "error" });
      setSubmitError("Something went wrong sending the application. Please email drivethestockmarket@gmail.com directly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero affiliate-hero">
        <div>
          <span className="kicker">Creator Partnership Program</span>
          <h1>Partner With DTSM</h1>
          <p>
            Earn recurring income by helping traders find a live trading product where they can log
            in daily, watch real sessions, review decisions, and improve execution over time.
          </p>
          <div className="hero-actions">
            <a
              className="primary-button"
              href="#affiliate-form"
              onClick={(event) => {
                trackEvent("affiliate_apply_click", { location: "affiliate_hero" });
                scrollToSection(event, "affiliate-form");
              }}
            >
              Apply To Become An Affiliate <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="#commission" onClick={(event) => scrollToSection(event, "commission")}>
              View Commission
            </a>
          </div>
        </div>
        <div className="affiliate-hero-card">
          <span>Lifetime recurring revenue</span>
          <strong>30%</strong>
          <p>
            Earn 30% lifetime recurring commission for qualified members you refer while they
            remain active inside DTSM.
          </p>
          <div className="affiliate-commission-pills">
            <span>Monthly plans</span>
            <span>Creator friendly</span>
            <span>Brand-safe promo</span>
          </div>
        </div>
      </section>

      <section className="affiliate-position-strip">
        {[
          ["Best for", "Trading creators with an education-first audience"],
          ["Promote", "Community, accountability, live room, reviews, recordings"],
          ["Avoid", "Profit promises, signal claims, fake screenshots"]
        ].map(([label, value]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </article>
        ))}
      </section>

      <section className="section steps-section affiliate-steps-section">
        <div className="section-heading centered">
          <span className="kicker">How It Works</span>
          <h2>A clean partner process from application to recurring revenue.</h2>
        </div>
        <div className="steps-grid">
          {affiliateSteps.map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section affiliate-section">
        <div className="section-heading">
          <span className="kicker">Why Promote DTSM</span>
          <h2>A serious community product your audience can understand fast.</h2>
          <p>
            DTSM is easy to explain because the offer is grounded: traders join to show up,
            watch real sessions, review decisions, and build consistency with other traders.
          </p>
        </div>
        <div className="affiliate-grid">
          {affiliateBenefits.map(([title, body, icon]) => (
            <article className="affiliate-card" key={title}>
              <div className="card-icon">{icon}</div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="commission" className="section commission-section">
        <div className="section-heading centered">
          <span className="kicker">Commission</span>
          <h2>30% Recurring Commission</h2>
          <p>Simple recurring economics with examples based on the Live Access plan.</p>
        </div>
        <div className="commission-grid">
          {[
            ["10", "Live Access members", "about $150/month"],
            ["25", "Live Access members", "about $375/month"],
            ["50", "Live Access members", "about $750/month"]
          ].map(([count, label, amount]) => (
            <article className="commission-card" key={count}>
              <span>{count}</span>
              <h3>{label}</h3>
              <strong>{amount}</strong>
            </article>
          ))}
        </div>
        <p className="commission-note">Earnings vary based on plan, retention, and qualified referrals.</p>
      </section>

      <section className="section affiliate-kit-section">
        <div className="affiliate-kit-copy">
          <span className="kicker">Partner Kit</span>
          <h2>Everything stays clean, clear, and brand-safe.</h2>
          <p>
            The goal is to help the right traders find DTSM without turning the brand into a
            guru funnel. Partners should speak to what members actually get: the live room,
            recordings, reviews, accountability, and a clearer daily process.
          </p>
          <a
            className="secondary-button"
            href="#affiliate-form"
            onClick={(event) => {
              trackEvent("affiliate_apply_click", { location: "affiliate_kit" });
              scrollToSection(event, "affiliate-form");
            }}
          >
            Apply For Access
          </a>
        </div>
        <div className="affiliate-asset-grid">
          {affiliateAssets.map(([title, body]) => (
            <article key={title}>
              <Check size={18} />
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section fit-section">
        <div className="fit-card good">
          <span className="kicker">Good Fit</span>
          <h2>Who this is for</h2>
          {affiliateFit.good.map((item) => <p key={item}><Check size={17} /> {item}</p>)}
        </div>
        <div className="fit-card bad">
          <span className="kicker">Not A Fit</span>
          <h2>Who this is not for</h2>
          {affiliateFit.bad.map((item) => <p key={item}><X size={17} /> {item}</p>)}
        </div>
      </section>

      <section id="affiliate-form" className="section affiliate-form-section">
        <div className="affiliate-form-layout">
          <div className="affiliate-form-copy">
            <span className="kicker">Apply</span>
            <h2>Tell us about your audience.</h2>
            <p>
              This is intentionally more selective than a random referral link. DTSM partners should
              care about honest education, clear expectations, and sending the right traders into a
              product they will actually use after joining.
            </p>
            <div className="form-promise">
              <Check size={18} />
              <span>Applications are sent to drivethestockmarket@gmail.com for review.</span>
            </div>
          </div>
          {submitted ? (
            <div className="success-message">
              <Check size={28} />
              <strong>Application submitted.</strong>
              <p>We’ll review your information and reach out if it’s a fit.</p>
            </div>
          ) : (
            <form className="affiliate-form" onSubmit={submitApplication} noValidate>
              <label>Full Name<input name="name" value={form.name} onChange={updateField} required /></label>
              <label>Email Address<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
              <label>TikTok / YouTube / Instagram link<input name="social" value={form.social} onChange={updateField} required /></label>
              <label>Audience size<input name="audience" value={form.audience} onChange={updateField} required /></label>
              <label>Where do you plan to promote DTSM?<textarea name="promotion" value={form.promotion} onChange={updateField} required /></label>
              <label>Why do you want to partner with DTSM?<textarea name="why" value={form.why} onChange={updateField} required /></label>
              <em>Please complete every field with a valid email address.</em>
              {submitError && <strong className="form-error">{submitError}</strong>}
              <button className="primary-button" type="submit" disabled={submitting}>
                {submitting ? "Sending Application..." : "Submit Affiliate Application"} <ArrowRight size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

      <section className="section rules-section">
        <div className="rules-card">
          <span className="kicker">Partner Rules</span>
          <p>
            Affiliates must promote DTSM honestly. No income claims, fake profit guarantees,
            misleading testimonials, or financial advice. DTSM reserves the right to remove
            affiliates who misrepresent the brand.
          </p>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="kicker">Partner With DTSM</span>
          <h2>Ready To Help Traders Find DTSM?</h2>
        </div>
        <a
          className="primary-button"
          href="#affiliate-form"
          onClick={(event) => {
            trackEvent("affiliate_apply_click", { location: "affiliate_final_cta" });
            scrollToSection(event, "affiliate-form");
          }}
        >
          Apply To Become An Affiliate <ArrowRight size={19} />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = window.location.pathname;
  const meta = pageMeta[path] || pageMeta["/"];

  useEffect(() => {
    initAnalytics();
    document.title = meta.title;
    let description = document.querySelector('meta[name="description"]');
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
    }
    description.setAttribute("content", meta.description);
  }, [meta]);

  useEffect(() => {
    if (path !== "/" || !window.location.hash) return undefined;

    const id = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "auto", block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [path]);

  if (path === "/resources") {
    return <ResourcesPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
  }

  if (path === "/scanner") {
    return <ScannerPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
  }

  if (path === "/affiliates") {
    return <AffiliatesPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
  }

  if (path === "/privacy") {
    return (
      <LegalPage
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        kicker="Privacy Policy"
        title="How DTSM handles site information."
        intro="This page explains what information may be collected through the DTSM website, how it is used, and how to contact support with questions."
        sections={[
          ["Information you provide", "If you contact DTSM by email or submit an affiliate application, the information you provide may be used to respond to you, review your request, and communicate about membership or partnership inquiries."],
          ["Analytics and site activity", "DTSM may use tools such as Google Analytics and Microsoft Clarity to understand page visits, clicks, and general site behavior so the website can be improved over time."],
          ["Third-party services", "Some pages link to or embed third-party platforms such as Circle, ChartsWatcher, YouTube, Discord, and payment or checkout tools. Those services operate under their own terms and privacy policies."],
          ["How information is used", "Site information may be used to improve the website, respond to support requests, review affiliate submissions, and understand which pages and actions are most useful to visitors."],
          ["Data sharing", "DTSM does not position the site as a data brokerage product. Information is only used in connection with site operations, support, analytics, and services directly related to DTSM."],
          ["Contact", `For privacy questions or support requests, email ${supportEmail}.`]
        ]}
      />
    );
  }

  if (path === "/terms") {
    return (
      <LegalPage
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        kicker="Terms of Use"
        title="The main rules and expectations for using DTSM."
        intro="These terms are meant to keep expectations clear around educational use, subscriptions, risk, and how the DTSM website and membership content should be understood."
        sections={[
          ["Educational use only", "DTSM provides educational and community content only. Nothing on the site, in the membership, in chat, or in recordings should be treated as financial advice or a guarantee of results."],
          ["Trading risk", "Trading involves substantial risk. You are responsible for your own decisions, capital, position sizing, and risk management. Past examples do not guarantee future performance."],
          ["Subscriptions and trials", "Membership plans may include monthly subscriptions and trial offers. Unless cancelled before renewal, paid plans continue at their listed rate after the trial or first-month offer ends."],
          ["Account access", "Access to member content is provided through third-party platforms such as Circle. DTSM may adjust or revoke access where necessary for account, billing, or policy reasons."],
          ["Acceptable use", "Do not misuse the site, copy paid materials without permission, impersonate others, or use DTSM branding or content in a misleading way."],
          ["Third-party links", "The site may link to third-party tools and services such as ChartsWatcher, Discord, YouTube, and Circle. DTSM is not responsible for how those third parties operate."],
          ["Contact", `For questions about terms, subscriptions, or support, email ${supportEmail}.`]
        ]}
      />
    );
  }

  if (path === "/contact") {
    return <ContactPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
  }

  return <HomePage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
}

createRoot(document.getElementById("root")).render(<App />);
