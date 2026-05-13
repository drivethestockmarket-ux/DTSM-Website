import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Analytics, track as trackVercelEvent } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
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
  Newspaper,
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
  starter: "https://drivethestockmarket.circle.so/checkout/starter-access?coupon_code=FIRST25",
  live: "https://drivethestockmarket.circle.so/checkout/trial?coupon_code=FIRST25",
  pro: "https://drivethestockmarket.circle.so/checkout/elite?coupon_code=FIRST25"
};

const chartsWatcherLink = "https://app.chartswatcher.com/register/?ref=DTSM";
const chartsWatcherScannerEmbed = "https://chartswatcher.com/pages/scanner/biggest-gainers-from-close?ref=DTSM";
const chartsWatcherHodMomentumEmbed = "https://chartswatcher.com/pages/scanner/hod-momentum?ref=DTSM";
const chartsWatcherHighOfDayEmbed = "https://chartswatcher.com/pages/scanner/high-of-the-day?ref=DTSM";
const chartsWatcherCode = "DTSM10";
const youtubeLink = "https://www.youtube.com/@JoinDTSM";
const discordLink = "https://discord.gg/dGpTPBcpnN";
const loginLink = "https://login.circle.so/sign_in?request_host=drivethestockmarket.circle.so#email";
const signupLink = "https://login.circle.so/sign_up?request_host=drivethestockmarket.circle.so&user%5Binvitation_token%5D";
const supportEmail = "drivethestockmarket@gmail.com";
const affiliateFormEndpoint = `https://formsubmit.co/ajax/${supportEmail}`;
const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
const clarityProjectId = import.meta.env.VITE_CLARITY_PROJECT_ID;
const defaultBlogAuthor = {
  name: "Brendan Hogan",
  title: "Drive the Stock Market",
  role: "Active small-cap trader",
  bio: "Expect scanner workflows, platform setups, trade review frameworks, and execution-focused lessons built to connect free education with the full DTSM environment.",
  image: "/assets/founder-photo.png"
};
const blogTopicLanes = ["Scanners", "Strategy", "Beginner trading", "Trade reviews", "Tools"];
const shouldUseVercelRuntime =
  typeof window !== "undefined" &&
  !["localhost", "127.0.0.1"].includes(window.location.hostname);

function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", name, params);
  window.clarity?.("event", name);
  trackVercelEvent(name, params);
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
  "/blog": {
    title: "Trading Blog | DTSM",
    description: "Read DTSM blog posts on scanners, brokers, indicators, execution, and the routines traders use to improve with real market context."
  },
  "/live-room": {
    title: "Live Trading Room | DTSM",
    description: "See how the DTSM Live Trading Room helps traders follow real sessions, hear live context, and stay grounded during the market."
  },
  "/community-feed": {
    title: "Community Feed | DTSM",
    description: "Learn how The Tape and 24/7 DTSM chat keep traders connected, sharing posts, and improving together."
  },
  "/study-library": {
    title: "Study Library | DTSM",
    description: "Explore the DTSM recordings archive, Level 2 replays, trade reviews, and weekly meetings built for post-market study."
  },
  "/about": {
    title: "About DTSM | Trading Community Built Around Execution",
    description: "Learn what DTSM stands for, how the community works, and why traders join for accountability, consistency, live market context, and real review."
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

function getPageMeta(path) {
  if (blogPostMap[path]) {
    return {
      title: `${blogPostMap[path].title} | DTSM Blog`,
      description: blogPostMap[path].excerpt,
      keywords: blogPostMap[path].seoKeywords || "DTSM blog, day trading education, small-cap trading, trading community"
    };
  }

  return pageMeta[path] || pageMeta["/"];
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Scanner", href: "/scanner" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
  { label: "Affiliates", href: "/affiliates" },
  { label: "Pricing", id: "pricing" },
  { label: "About", href: "/about" }
];

const resourceGroups = [
  {
    title: "Beginner Trading Resources",
    eyebrow: "Start Here",
    description: "Get the language and routine down before you try to trade faster markets.",
    cards: [
      {
        title: "Small-Cap Trading Basics",
        body: "Understand the core language, catalysts, float, volume, and why small-cap stocks can move fast.",
        icon: <LineChart />,
        tag: "Beginner",
        time: "8 min",
        href: loginLink,
        cta: "Open Starter Course",
        event: "login_click"
      },
      {
        title: "Risk Management Basics",
        body: "Learn how to think about risk, sizing, invalidation, and protecting your account.",
        icon: <Target />,
        tag: "Foundation",
        time: "10 min",
        href: loginLink,
        cta: "Open Starter Course",
        event: "login_click"
      },
      {
        title: "Understanding Momentum",
        body: "A simple guide to volume, trend, relative strength, and when momentum is actually clean.",
        icon: <TrendingUp />,
        tag: "Market reads",
        time: "7 min",
        href: youtubeLink,
        cta: "Watch Lesson",
        event: "youtube_click"
      },
      {
        title: "Building a Trading Routine",
        body: "Create a repeatable pre-market, live session, and post-market review process.",
        icon: <Clock3 />,
        tag: "Routine",
        time: "12 min",
        href: loginLink,
        cta: "Start Free Course",
        event: "login_click"
      }
    ]
  },
  {
    title: "Execution Resources",
    eyebrow: "Execution",
    description: "Study the pieces that help traders slow down, wait for quality, and review decisions.",
    cards: [
      {
        title: "Level 2 Basics",
        body: "Learn what bids, asks, size, and market maker movement can tell you in real time.",
        icon: <Layers3 />,
        tag: "Order flow",
        time: "9 min",
        href: youtubeLink,
        cta: "Watch Breakdown",
        event: "youtube_click"
      },
      {
        title: "Time & Sales Basics",
        body: "Understand prints, speed, size, and how the tape confirms or rejects an idea.",
        icon: <BarChart3 />,
        tag: "Tape reading",
        time: "9 min",
        href: youtubeLink,
        cta: "Watch Breakdown",
        event: "youtube_click"
      },
      {
        title: "Entry and Exit Review",
        body: "Use a simple framework to review whether your entry, exit, and risk made sense.",
        icon: <ClipboardCheck />,
        tag: "Review",
        time: "11 min",
        href: "/#preview",
        cta: "Preview Reviews",
        event: "preview_click"
      },
      {
        title: "Common Beginner Mistakes",
        body: "Spot the patterns that usually lead to chasing, oversizing, and emotional trades.",
        icon: <X />,
        tag: "Mistakes",
        time: "6 min",
        href: discordLink,
        cta: "Join Free Discord",
        event: "discord_click"
      }
    ]
  },
  {
    title: "Community Samples",
    eyebrow: "Preview DTSM",
    description: "See the kinds of templates and breakdowns that become more powerful inside the community.",
    cards: [
      {
        title: "Sample Trade Review",
        body: "Preview how a trade can be broken down into plan, execution, mistake, and lesson.",
        icon: <MessageSquareText />,
        tag: "Template",
        time: "Preview",
        href: "/#preview",
        cta: "Preview DTSM",
        event: "preview_click"
      },
      {
        title: "Sample Watchlist",
        body: "See how names, levels, catalysts, and scenarios can be organized before the open.",
        icon: <Library />,
        tag: "Watchlist",
        time: "Preview",
        href: "/scanner",
        cta: "Open Scanner Workflow",
        event: "scanner_click"
      },
      {
        title: "Sample Weekly Recap",
        body: "A template for reviewing what worked, what failed, and what to focus on next.",
        icon: <CalendarDays />,
        tag: "Recap",
        time: "Preview",
        href: "/#preview",
        cta: "See The Preview",
        event: "preview_click"
      },
      {
        title: "Sample Recording Breakdown",
        body: "Preview the kind of notes and lessons tied to live room and Level 2 recordings inside DTSM.",
        icon: <PlayCircle />,
        tag: "Recording",
        time: "Preview",
        href: "/#pricing",
        cta: "Unlock The Library",
        event: "pricing_click"
      }
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

const resourceHeroStats = [
  ["Free starter course", "Core lessons + routine builder"],
  ["2 hour bonus replay", "See a full session with context"],
  ["Execution-first path", "Prep, execution, review, repeat"],
  ["Community upgrade ready", "Move into DTSM when you want more"]
];

const resourceTrustCards = [
  ["Start in one place", "Stop bouncing between random lessons and begin with a cleaner path.", <Library />],
  ["Learn what matters first", "Small-cap basics, risk, Level 2, Time & Sales, and review structure.", <Target />],
  ["Turn information into routine", "Build habits around what to watch, what to skip, and what to review.", <Clock3 />]
];

const resourceCollections = [
  {
    label: "Starter",
    title: "Foundation before speed",
    body: "Get the language, risk, and routine down before you try to trade every move.",
    items: ["Small-cap basics", "Risk management", "Momentum", "Trading routine"]
  },
  {
    label: "Execution",
    title: "Read cleaner setups",
    body: "Slow down, read order flow better, and make your entries and exits more intentional.",
    items: ["Level 2", "Time & Sales", "Entry review", "Mistake patterns"]
  },
  {
    label: "Preview",
    title: "See how DTSM thinks",
    body: "Preview the kind of watchlists, reviews, recaps, and breakdowns that get stronger inside the room.",
    items: ["Trade review", "Watchlist", "Weekly recap", "Recording notes"]
  }
];

const ethosPillars = [
  ["Show up consistently", "DTSM is built for traders who want a place to keep showing up, not disappear after one bad session.", <Clock3 />],
  ["Trade with real context", "Members learn from live market examples, commentary, Level 2, Time & Sales, and actual decisions in motion.", <Radio />],
  ["Review honestly", "Wins, losses, missed trades, and mistakes all become part of the review process instead of being ignored.", <ClipboardCheck />],
  ["Improve together", "The point is not to impress people. It is to get around serious traders who want structure, feedback, and better habits.", <Users />]
];

const publicAnnouncements = [
  ["Today", "Morning watchlist posted", "Premarket names, key levels, and scenarios are posted before the bell so members know what matters first.", <LineChart />],
  ["New replay", "Live room recording uploaded", "Fresh recordings and breakdowns give members a way to review execution after the close.", <PlayCircle />],
  ["This week", "Weekly meeting update", "The weekly group review and meeting schedule are posted inside Circle so members stay in rhythm.", <CalendarDays />]
];

const publicSchedule = [
  ["Morning live trading", "Monday - Friday", "6:45 AM - 9:45 AM ET"],
  ["Weekly community meeting", "Midweek", "Usually Wednesday or Thursday depending on the week"],
  ["Announcements + uploads", "Inside Circle", "Fresh posts, replays, and updates are published throughout the week"]
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

const blogPosts = [
  {
    slug: "how-dtsm-uses-chartswatcher",
    category: "Scanner Workflow",
    title: "How we use ChartsWatcher to catch stocks before the big move",
    excerpt: "A cleaner workflow for using scanners, volume, float, and news without turning the scanner into your entire strategy.",
    date: "May 2026",
    publishedAt: "May 13, 2026",
    updatedAt: "May 13, 2026",
    searchPhrase: "how to use ChartsWatcher for momentum trading",
    hero: "/assets/blog/chartswatcher-layout.png",
    videoId: "VdyBEMUfH3E",
    seoKeywords: "how to use ChartsWatcher for momentum trading, best scanner for small account day traders, day trading scanner, stock scanner, morning watchlist, DTSM, Drive the Stock Market",
    author: defaultBlogAuthor,
    icon: <BarChart3 />,
    cta: "Open The Scanner Page",
    ctaHref: "/scanner",
    partner: {
      name: "ChartsWatcher",
      logo: "/assets/blog/chartswatcher-logo.svg",
      body: "Use the DTSM affiliate link to sign up for ChartsWatcher, then apply code DTSM10 at checkout for 10% off.",
      code: chartsWatcherCode,
      href: chartsWatcherLink,
      cta: "Get ChartsWatcher With DTSM Link"
    },
    midCta: {
      kicker: "Want the exact tool?",
      title: "Try the same scanner platform I use in my workflow.",
      body: "If you want scanners, charts, news, watchlists, and stock info in one place, ChartsWatcher is the platform I currently use every day.",
      cta: "Sign Up Through The DTSM Link",
      href: chartsWatcherLink,
      note: `Use code ${chartsWatcherCode} for 10% off.`
    },
    comparison: [
      {
        title: "Why I switched",
        body: "I switched because ChartsWatcher felt faster, more customizable, and cheaper for the way I trade without losing the tools I actually need."
      },
      {
        title: "Who it is best for",
        body: "It is especially useful for small account day traders who want a scanner-centered workflow without paying for an overbuilt tool stack."
      },
      {
        title: "How I use it daily",
        body: "I use it to build the morning watchlist, monitor scanners, check news, flip through charts, and stay organized when momentum starts showing up."
      }
    ],
    bullets: ["Why scanners matter", "Why I switched", "Main setup", "Customization", "Momentum scanners", "Final takeaways"],
    sections: [
      {
        heading: "Why scanners matter for small account day traders",
        body: "One of the biggest challenges in day trading is finding the right stocks quickly before everyone else piles in. When you are trading with a small account, every second matters. You need to know what is moving, why it is moving, how much volume is coming in, what the float looks like, and whether the setup is even worth watching. That is where scanners and screeners come in. A good scanner helps you pull up stocks in real time based on the exact criteria you care about so you can build a system instead of randomly clicking through tickers.",
        links: [
          { label: "Use the DTSM scanner page", href: "/scanner" },
          { label: "Start with the free course", href: "/resources" }
        ]
      },
      {
        heading: "Why I switched to ChartsWatcher",
        body: "Before ChartsWatcher, I was using Day Trade Dash as my main scanner, charting, and news platform. It worked well, but after hearing enough traders in my Discord community talk about ChartsWatcher, I decided to test it. After using it, I fully switched over. The reasons were pretty simple: it felt faster, more reliable, easier to customize, and significantly cheaper for what I actually need. For a newer trader or a small account trader, those cost savings matter because software expenses stack up quickly.",
        links: [
          { label: "See how DTSM uses scanners and tools", href: "/about" }
        ]
      },
      {
        heading: "My main ChartsWatcher setup",
        body: "My layout is built around speed. I want scanners on the right, charts on the left, news close by, stock info nearby, and watchlists ready for fast ticker switching. I also like having multiple timeframes open, especially the 1-minute, 10-second, 3-minute, and 5-minute, because that helps me understand both the bigger picture and the short-term execution at the same time. The goal is to move from idea to chart to decision without losing momentum.",
        links: [
          { label: "Preview the live room workflow", href: "/live-room" }
        ]
      },
      {
        heading: "Why customization matters",
        body: "One of the best parts of ChartsWatcher is how customizable it is. You can build the entire platform around your own strategy by adding columns like symbol, price, float, volume, gap percentage, country, news, days since IPO, reverse split data, float rotation, and more. That matters because every trader is looking for something slightly different. For me, being able to filter out lower-quality names quickly saves time and helps me focus on the setups that actually fit how I trade.",
        links: [
          { label: "Explore the DTSM community feed", href: "/community-feed" }
        ]
      },
      {
        heading: "Building a fresh screen from scratch",
        body: "If you are new to ChartsWatcher, it can look intimidating at first, but the workflow is actually simple. You can start with a blank screen and add windows one by one: a chart, a high-of-day scanner, a running-up scanner, a top gainers list, a news feed, a watchlist, and a stock info window. Once the layout feels right, you can save it and keep refining it. The point is not to make it fancy. The point is to make it fast and useful.",
        links: [
          { label: "See the DTSM study library", href: "/study-library" }
        ]
      },
      {
        heading: "Using scanners to find momentum",
        body: "The real power of ChartsWatcher comes from the scanners. You can set up or import momentum scanners like high-of-day momentum, running-up, top gainers, and gap scanners. When a stock starts hitting the scanner, you can click it and the chart updates immediately. That speed matters because in small-cap trading, the difference between catching a clean setup early and chasing it late can be just a few seconds.",
        links: [
          { label: "Open the free scanner tools page", href: "/scanner" }
        ]
      },
      {
        heading: "Why the watchlist and news feed help so much",
        body: "The watchlist feature is extremely useful because it lets you keep names close and click through them without typing tickers over and over. The built-in news feed matters too, because not every percentage mover is a clean momentum play. You want to know whether the move is tied to real news, a catalyst, a reverse split, or something else that changes the quality of the setup. Having the news feed and stock info on the same platform helps you avoid wasting time on bad names.",
        links: [
          { label: "Learn how the morning session works", href: "/live-room" }
        ]
      },
      {
        heading: "Real example: finding BENF early",
        body: "One of the best examples from my own trading was BENF. It popped up on the scanner early, before a lot of volume came in. Because I already had the scanner running, I was able to pull the stock up quickly and watch the move develop from around the four-dollar area toward five and higher. The scanner helped me catch it early by surfacing the gap, the volume, the float context, and the momentum while it was still developing.",
        links: [
          { label: "See how trade ideas get shared in DTSM", href: "/community-feed" }
        ]
      },
      {
        heading: "Float rotation and external linking",
        body: "Another feature I like is float rotation, because it gives extra context around how active a low-float stock really is. ChartsWatcher is also working on external linking with platforms like DAS Trader, which could eventually make the workflow even faster by letting traders click a ticker inside the scanner and update their execution platform automatically. For fast-moving small caps, that kind of speed improvement matters.",
        links: [
          { label: "Read more platform setup content", href: "/blog/ocean-one-for-day-traders" }
        ]
      },
      {
        heading: "Is ChartsWatcher worth it",
        body: "For my trading style, yes. I use ChartsWatcher every day because it gives me scanners, charts, news, watchlists, stock info, custom layouts, and strong filtering in one place at a cost that still makes sense for smaller traders. The key thing to remember is that a scanner does not replace skill. It helps you find stocks faster. You still need to read the chart, understand the catalyst, manage risk, watch Level 2, and execute with discipline.",
        links: [
          { label: "Turn scanner ideas into real process inside DTSM", href: "/#pricing" }
        ]
      }
    ],
    takeaway: "The goal is simple: find the right stocks faster, build a better watchlist, and be prepared when momentum shows up.",
    bottomCta: {
      title: "Use the scanner, then step into the full environment.",
      body: "ChartsWatcher helps you find names. DTSM helps you turn those names into a repeatable morning routine with live room context, feed posts, chat, recordings, and review.",
      primary: { label: "Join DTSM", href: "/#pricing" },
      secondary: [
        { label: "Start The Free Course", href: "/resources" },
        { label: "Watch More On YouTube", href: youtubeLink, external: true },
        { label: "Join The Free Discord", href: discordLink, external: true },
        { label: "Get ChartsWatcher With DTSM Link", href: chartsWatcherLink, external: true }
      ]
    },
    related: [youtubeLink, "/scanner"]
  },
  {
    slug: "ocean-one-for-day-traders",
    category: "Platform Setup",
    title: "Ocean One for day traders: what to set up before the opening bell",
    excerpt: "A practical guide to setting up your platform so orders, watchlists, and execution tools feel cleaner when the market starts moving.",
    date: "May 2026",
    publishedAt: "May 13, 2026",
    updatedAt: "May 13, 2026",
    searchPhrase: "how to set up Ocean One for day trading",
    hero: "/assets/product-pages/live-room-schedule.png",
    author: defaultBlogAuthor,
    icon: <MonitorUp />,
    cta: "Preview The Live Room",
    ctaHref: "/live-room",
    bullets: ["Execution layout", "Morning prep setup", "What to simplify before market open"],
    sections: [
      {
        heading: "Keep the layout simple",
        body: "Your platform should help you move faster, not create more confusion. The most useful setup is the one that lets you see what matters quickly: watchlist, chart, execution, and any key notes.",
        links: [
          { label: "See the live room layout", href: "/live-room" }
        ]
      },
      {
        heading: "Build around the morning routine",
        body: "Ocean One should support the way you actually trade. That means getting levels marked, keeping order entry clean, and removing anything that distracts from the setup you are trying to follow.",
        links: [
          { label: "Start with the free course", href: "/resources" }
        ]
      },
      {
        heading: "Where DTSM fits in",
        body: "Inside DTSM, platform setup is only one part of the process. The room, the watchlist, the feed, and the recordings help traders turn a platform into a repeatable routine instead of just a layout.",
        links: [
          { label: "Explore the feed and chat", href: "/community-feed" },
          { label: "See the study library", href: "/study-library" }
        ]
      }
    ],
    takeaway: "A cleaner platform layout makes it easier to stay calm, follow the plan, and execute with less friction.",
    bottomCta: {
      title: "Use a cleaner platform, then build the routine around it.",
      body: "DTSM helps traders connect their tools to the actual workflow: prep, live room, chat, post-market review, and repetition.",
      primary: { label: "View Membership Plans", href: "/#pricing" },
      secondary: [
        { label: "Preview The Live Room", href: "/live-room" },
        { label: "Start The Free Course", href: "/resources" },
        { label: "Watch More On YouTube", href: youtubeLink, external: true }
      ]
    },
    related: [youtubeLink, "/resources"]
  },
  {
    slug: "which-indicators-actually-help",
    category: "Indicator Education",
    title: "Which indicators actually help in small-cap day trading",
    excerpt: "A straight answer on which indicators are useful, which ones traders overdo, and why context matters more than stacking signals.",
    date: "May 2026",
    publishedAt: "May 13, 2026",
    updatedAt: "May 13, 2026",
    searchPhrase: "best indicators for small cap day trading",
    hero: "/assets/product-pages/study-library-level2.png",
    author: defaultBlogAuthor,
    icon: <LineChart />,
    cta: "Start The Free Course",
    ctaHref: "/resources",
    bullets: ["What to keep", "What to avoid", "How indicators fit into execution"],
    sections: [
      {
        heading: "Use indicators to support the read, not replace it",
        body: "Indicators can be useful for structure, but they do not replace reading price action, volume, and the actual behavior of the stock. The cleaner the setup, the less you usually need.",
        links: [
          { label: "See how DTSM studies setups", href: "/study-library" }
        ]
      },
      {
        heading: "Keep the chart readable",
        body: "A chart packed with indicators usually creates more hesitation than clarity. In small-cap trading, simple tools are often more helpful than layering every signal on the screen.",
        links: [
          { label: "Learn the beginner path first", href: "/resources" }
        ]
      },
      {
        heading: "What DTSM focuses on instead",
        body: "DTSM is built more around context, repetition, Level 2, Time & Sales, and real trade reviews than around finding the perfect combination of indicators. That is what helps traders get better over time.",
        links: [
          { label: "Explore live room + feed workflow", href: "/live-room" },
          { label: "See trade discussion inside DTSM", href: "/community-feed" }
        ]
      }
    ],
    takeaway: "If the chart only makes sense when five indicators agree, the setup probably is not as clean as it needs to be.",
    bottomCta: {
      title: "Keep the chart simple. Make the process stronger.",
      body: "The real upgrade is not more indicators. It is seeing cleaner examples, reviewing them, and staying around traders who care about execution.",
      primary: { label: "Start The Free Course", href: "/resources" },
      secondary: [
        { label: "See The Study Library", href: "/study-library" },
        { label: "Join DTSM", href: "/#pricing" },
        { label: "Watch More On YouTube", href: youtubeLink, external: true }
      ]
    },
    related: [youtubeLink, "/study-library"]
  },
  {
    slug: "how-to-review-a-red-day",
    category: "Trade Review",
    title: "How to review a red day without spiraling",
    excerpt: "A simple review framework DTSM traders can use after a bad session to turn frustration into useful notes and better rules.",
    date: "May 2026",
    publishedAt: "May 13, 2026",
    updatedAt: "May 13, 2026",
    searchPhrase: "how to review a red day in day trading",
    hero: "/assets/product-pages/community-feed-tape.png",
    author: defaultBlogAuthor,
    icon: <ClipboardCheck />,
    cta: "See Trade Reviews",
    ctaHref: "/study-library",
    bullets: ["Post-market reset", "Mistake isolation", "One lesson to carry forward"],
    sections: [
      {
        heading: "Review the decision, not just the result",
        body: "A red day does not automatically mean every trade was bad. The real review starts by separating emotional pain from whether the setup, risk, and execution actually made sense.",
        links: [
          { label: "See the review side of DTSM", href: "/study-library" }
        ]
      },
      {
        heading: "Pull out one mistake that matters",
        body: "You do not need ten lessons after a bad day. Usually one repeated mistake explains most of the damage: chasing, oversizing, ignoring the setup, or forcing an entry after the move already happened.",
        links: [
          { label: "Join the free course path", href: "/resources" }
        ]
      },
      {
        heading: "Turn the loss into tomorrow's rule",
        body: "The review only helps if it changes something. That is why DTSM focuses on turning notes into a tighter process instead of just venting and moving on.",
        links: [
          { label: "See the community feed and chat", href: "/community-feed" },
          { label: "Step into DTSM membership", href: "/#pricing" }
        ]
      }
    ],
    takeaway: "A review should calm you down, make the mistake clearer, and give you one rule to trade better next time.",
    bottomCta: {
      title: "Turn bad days into cleaner notes and better rules.",
      body: "DTSM gives traders a room to review decisions, get feedback, and keep showing up after the tough sessions too.",
      primary: { label: "See Trade Reviews", href: "/study-library" },
      secondary: [
        { label: "Join DTSM", href: "/#pricing" },
        { label: "Join The Free Discord", href: discordLink, external: true },
        { label: "Watch More On YouTube", href: youtubeLink, external: true }
      ]
    },
    related: [youtubeLink, "/community-feed"]
  }
];

const blogPostMap = Object.fromEntries(blogPosts.map((post) => [`/blog/${post.slug}`, post]));

const blogExploreCards = [
  {
    title: "Preview the community",
    body: "See the room, the feed, and the study library before joining.",
    href: "/#preview",
    cta: "Explore DTSM"
  },
  {
    title: "Use the free scanner page",
    body: "Put the scanner workflow into practice with the DTSM scanner tools page.",
    href: "/scanner",
    cta: "Open Scanner"
  },
  {
    title: "Start the free course",
    body: "Learn the basics first, then move into the full environment when you are ready.",
    href: "/resources",
    cta: "Start Free Course"
  }
];

const painPoints = [
  ["You trade alone", "No one sees the rules you break, the trades you force, or the patterns you keep repeating."],
  ["You consume more than you review", "More videos do not fix inconsistent execution if your own decisions never get examined."],
  ["You lose rhythm after red days", "Without a room to return to, one bad session can turn into days of avoidance or revenge trading."],
  ["You lack a repeatable process", "Pre-market prep, live execution, post-trade review, and weekly reflection need to work together."]
];

const proofStrip = [
  {
    title: "400+ hours of live market data recordings",
    body: "Unlock a deep vault of live market recordings, Level 2 replays, and Time & Sales study sessions you can revisit anytime.",
    tag: "Special bonus",
    icon: <Layers3 />,
    featured: true
  },
  {
    title: "Live room access",
    body: "Watch real market sessions with live commentary, setups, and context instead of guessing alone.",
    tag: "Core room",
    icon: <Radio />
  },
  {
    title: "Trade review feedback",
    body: "Turn trades into notes, comments, and better rules so mistakes become part of your process.",
    tag: "Review loop",
    icon: <ClipboardCheck />
  },
  {
    title: "24/7 trader chat",
    body: "Stay connected before the open, during the session, and after the close inside the always-on room.",
    tag: "Always active",
    icon: <MessageCircle />
  }
];

const homeOfferGroups = [
  {
    label: "Live Trading Room",
    title: "Watch the market live",
    micro: "Show up for the morning session, hear commentary, and follow the watchlist in real time.",
    href: "/live-room",
    icon: <Radio />,
    items: ["Live session", "Watchlist", "Commentary"],
    cta: "Learn about the Live Room"
  },
  {
    label: "The Tape + Chat",
    title: "Post, chat, and ask questions",
    micro: "Stay connected with traders through feed posts, screenshots, comments, and the 24/7 room.",
    href: "/community-feed",
    icon: <MessageSquareText />,
    items: ["The Tape", "24/7 chat", "Comments + likes"],
    cta: "Learn about the Feed"
  },
  {
    label: "Recordings + Reviews",
    title: "Replay sessions and review trades",
    micro: "Study recordings, trade reviews, and weekly meetings after the market closes.",
    href: "/study-library",
    icon: <Layers3 />,
    items: ["Recording archive", "Trade reviews", "Weekly meetings"],
    cta: "Learn about the Library"
  },
  {
    label: "Starter Course",
    title: "Start free with the basics",
    micro: "Use the free starter course and bonus replay to learn the platform before going deeper.",
    href: "/resources",
    icon: <Library />,
    items: ["Free starter course", "2 hour bonus replay", "Beginner friendly"],
    cta: "Start the Free Course"
  }
];

const productDetailPages = {
  "/live-room": {
    kicker: "Live Room",
    title: "Watch the market live with traders in the room.",
    intro: "The live room is where members show up each morning, follow what is moving, and stay around real commentary instead of guessing alone.",
    icon: <Radio />,
    visualFirst: true,
    stats: [
      ["Session hours", "6:45 AM - 9:45 AM ET"],
      ["Access", "Live Access + Elite"],
      ["Best for", "Live execution + morning prep"]
    ],
    highlights: [
      {
        title: "Live commentary while setups form",
        body: "Hear what is worth watching, what is being avoided, and what actually changes the plan in real time."
      },
      {
        title: "A room to stay grounded",
        body: "Instead of trading in silence, members can follow the flow of the room and stay closer to the process."
      },
      {
        title: "Replay the same session later",
        body: "Live Access and Elite can come back to recordings and review the exact session they watched."
      }
    ],
    preview: {
      label: "Inside the live room",
      title: "A real morning session people can plug into every day.",
      body: "Open the room, see what is in play, and follow the market with commentary while setups are forming.",
      mainShot: {
        title: "Real market post inside the live environment",
        note: "Use a screenshot that feels active and in-motion so people instantly understand the room is tied to the market.",
        image: "/assets/product-pages/community-feed-tape.png",
        alt: "DTSM live market post inside Circle"
      },
      supportShots: [
        {
          title: "Daily live schedule",
          note: "Show the recurring session structure so visitors understand when the room is active.",
          image: "/assets/product-pages/live-room-schedule.png",
          alt: "DTSM live room schedule inside Circle"
        },
        {
          title: "Watchlist or commentary view",
          note: "Add one clean screen with names in play, notes, or a live market callout."
        }
      ]
    },
    modules: [
      {
        title: "Show up for the morning session",
        body: "Members know when to log in and what room they are stepping into each morning."
      },
      {
        title: "Follow commentary in real time",
        body: "The room stays focused on what matters while price, volume, and momentum are moving."
      },
      {
        title: "Study the same session later",
        body: "Sessions connect back into recordings and review, so the room is useful after the close too."
      }
    ],
    proof: [
      "Weekday live session",
      "Best for traders who need real-time context",
      "Connects directly to chat, feed, and recordings"
    ],
    workflow: [
      ["Show up before the bell", "Check the watchlist, levels, and market focus before the session opens."],
      ["Follow the live session", "Watch setups, commentary, and trade context as momentum builds or fades."],
      ["Replay and review later", "Use the recording to study what was clean, what was avoided, and what can be repeated."]
    ],
    features: [
      "Morning live trading session",
      "Watchlist + key levels",
      "Live trade context",
      "Session replay access",
      "Connected chat and feed"
    ],
    ctaTitle: "See the full daily environment.",
    ctaBody: "The Live Room works best as part of the full DTSM system: chat, feed, recordings, review, and weekly meetings all reinforce the session."
  },
  "/community-feed": {
    kicker: "Community Feed",
    title: "See trades, charts, and conversation in one place.",
    intro: "The Tape and the 24/7 chatroom give DTSM its daily pulse. This is where members post trades, ask questions, and stay connected around the process.",
    icon: <MessageSquareText />,
    visualFirst: true,
    stats: [
      ["Always active", "Before the open to after the close"],
      ["Access", "All memberships"],
      ["Best for", "Posts, screenshots, questions, and feedback"]
    ],
    highlights: [
      {
        title: "Trade screenshots and recap posts",
        body: "Members can share setups, mistakes, ideas, and trade reviews in a way that other traders can actually respond to."
      },
      {
        title: "Comments and likes that surface useful posts",
        body: "The best notes, chart screenshots, and observations get engagement instead of disappearing into random noise."
      },
      {
        title: "24/7 chatroom around the process",
        body: "Questions, market talk, recap notes, and live reactions all stay in one always-on room."
      }
    ],
    preview: {
      label: "Inside The Tape",
      title: "A feed built for screenshots, comments, and staying in the loop.",
      body: "This is where members post what they saw, react to each other, and keep the room alive before the open and after the close.",
      mainShot: {
        title: "Live room schedule and session page",
        note: "A clean session screenshot helps visitors understand this is part of a real working platform, not just a static feed.",
        image: "/assets/product-pages/live-room-schedule.png",
        alt: "DTSM live room schedule inside Circle"
      },
      supportShots: [
        {
          title: "The Tape post",
          note: "Use a real post with chart, caption, and engagement so people can see how the feed actually feels.",
          image: "/assets/product-pages/community-feed-tape.png",
          alt: "DTSM The Tape feed inside Circle"
        },
        {
          title: "Chat or review thread",
          note: "Add one clean screenshot that shows questions, comments, or post-session feedback."
        }
      ]
    },
    modules: [
      {
        title: "Post trades and screenshots",
        body: "Members can share charts, recap notes, and lessons in a format other traders can actually respond to."
      },
      {
        title: "Get comments and reactions",
        body: "Useful posts get feedback, which makes the feed more valuable than journaling alone."
      },
      {
        title: "Stay connected all day",
        body: "The chat and feed keep traders around the process before the open, during the session, and after the close."
      }
    ],
    proof: [
      "Best for staying connected",
      "Built for screenshots, comments, and feedback",
      "Works as the social layer of the whole community"
    ],
    workflow: [
      ["Post what you saw", "Drop screenshots, ideas, recap notes, and market observations into the feed."],
      ["Get feedback", "Other traders comment, react, and help sharpen what matters."],
      ["Stay connected", "Use chat and the feed to stay around the process even when the live session ends."]
    ],
    features: [
      "The Tape feed",
      "24/7 chatroom",
      "Comments + likes",
      "Trade screenshots",
      "Community feedback loop"
    ],
    ctaTitle: "Get inside the room with the other traders.",
    ctaBody: "DTSM is stronger because it does not stop at content. The feed and chat keep the room alive between sessions and give traders a reason to keep showing up."
  },
  "/study-library": {
    kicker: "Study Library",
    title: "A post-market library built to turn live sessions into repeatable lessons.",
    intro: "The Study Library gives members a deeper reason to stay around DTSM after the market closes. Recordings, replays, reviews, and weekly meetings make the environment useful long after the opening push is over.",
    icon: <Layers3 />,
    stats: [
      ["Library depth", "400+ hours of live market data recordings"],
      ["Access", "Full library in Live Access + Elite"],
      ["Best for", "Review, replay, and pattern recognition"]
    ],
    highlights: [
      {
        title: "Full live session recordings",
        body: "Replay the exact room, the exact context, and the exact setups instead of relying on memory."
      },
      {
        title: "Level 2 and Time & Sales replays",
        body: "Slow down order flow and momentum examples so the details are easier to study and repeat."
      },
      {
        title: "Trade reviews and weekly meetings",
        body: "Use deeper review and recurring meetings to turn wins and mistakes into better rules."
      }
    ],
    preview: {
      label: "Inside the study library",
      title: "A replay library built for traders who want to get sharper.",
      body: "This is where members come back after the session to replay examples, review trades, study Level 2, and keep building pattern recognition.",
      mainShot: {
        title: "Live recordings archive",
        note: "A real course-and-recordings screenshot makes the value of the library feel immediate.",
        image: "/assets/product-pages/study-library-recordings.png",
        alt: "DTSM live trading recordings library inside Circle"
      },
      supportShots: [
        {
          title: "Level 2 replay module",
          note: "Use the Level 2 clips area to show people that the study library goes deeper than just recordings.",
          image: "/assets/product-pages/study-library-level2.png",
          alt: "DTSM Level 2 trading clips inside Circle"
        },
        {
          title: "Trade review example",
          note: "Add one review with notes, chart, or lesson callouts."
        },
        {
          title: "Weekly meeting archive",
          note: "Show one saved review call or weekly meeting thumbnail."
        }
      ]
    },
    modules: [
      {
        title: "Full live session recordings",
        body: "Members can replay the room, the commentary, and the exact market context instead of relying on memory."
      },
      {
        title: "Level 2 and Time & Sales clips",
        body: "Shorter study clips help members slow down order flow and focus on the details that matter."
      },
      {
        title: "Trade review material",
        body: "The library supports better review by giving traders a place to revisit decisions, mistakes, and lessons."
      },
      {
        title: "Weekly meeting archive",
        body: "Saved meetings and recaps help traders revisit the bigger lessons beyond a single morning session."
      }
    ],
    proof: [
      "400+ hours of recordings",
      "Best for review and pattern recognition",
      "Built to turn screen time into study time"
    ],
    workflow: [
      ["Pick the session", "Open the replay, recording, or weekly meeting that matches what you want to study."],
      ["Review the details", "Focus on entries, tape speed, Level 2 behavior, mistakes, and what actually worked."],
      ["Bring it back to the room", "Use what you learned in the next live session, feed post, or trade review."]
    ],
    features: [
      "Recording archive",
      "Level 2 replays",
      "Time & Sales study",
      "Trade reviews",
      "Weekly meeting archive"
    ],
    ctaTitle: "Turn the market into a study system.",
    ctaBody: "The library is where members keep building pattern recognition, reviewing decisions, and getting more out of every session they show up for."
  }
};

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
  ["Best place to start", "Live Access", "The full daily room with chat, recordings, Level 2 study, and the clearest picture of DTSM."],
  ["Start with full access", "7 days free", "Elite opens the full environment for 7 days before renewing at $99.99/month unless cancelled."],
  ["No lock-in", "Cancel anytime", "All plans are monthly, and trial plans can be cancelled before the next billing date."]
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
  "Live Trading Room": {
    title: "Follow real-time market sessions with context.",
    eyebrow: "Live Trading Room",
    mode: "video",
    items: [
      ["Live", "Watching relative volume and tape speed before any entry.", "42", "16"],
      ["Setup", "Small-cap momentum forming near high-of-day.", "29", "9"],
      ["Review", "Risk defined below reclaim. No chase if it extends.", "36", "14"]
    ],
    side: ["Screen share", "Live commentary", "24/7 chat"]
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
    mode: "tape",
    items: [
      {
        meta: "9:42 AM",
        text: "Posted a VWAP reclaim screenshot. Entry was late, review attached.",
        likes: "24",
        comments: "8",
        attachment: "Chart screenshot",
        accent: "green"
      },
      {
        meta: "10:15 AM",
        text: "Good patience on this halt setup. Waiting for confirmation kept risk clean.",
        likes: "31",
        comments: "12",
        attachment: "Trade note image",
        accent: "blue"
      },
      {
        meta: "11:03 AM",
        text: "Lesson: no trade is still a decision. Skipped three low-quality moves.",
        likes: "18",
        comments: "5",
        attachment: "Recap attachment",
        accent: "gray"
      }
    ],
    side: ["Trade screenshots", "Comments", "Likes + saves"]
  },
  "24/7 Chatroom": {
    title: "Stay connected before, during, and after the market.",
    eyebrow: "24/7 Chatroom",
    mode: "chat",
    items: [
      ["8:14 AM", "Watching ORB names and waiting to see which one holds premarket volume.", "24", "11"],
      ["10:22 AM", "Tape slowed down after the first push. Better to wait than force the next entry.", "31", "13"],
      ["3:58 PM", "Posting my recap after the close. Best trade was the reclaim, worst trade was chasing extension.", "27", "9"]
    ],
    side: ["Open all day", "Fast questions", "Trade talk"]
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
  Education: {
    icon: <Library />,
    title: "Start free, learn the basics, and keep building from there.",
    status: "Free starter course",
    summary: "New members can start with the free DTSM Starter Course, then keep going with bonus education and live recordings inside the same environment.",
    mode: "education",
    posts: [
      ["Free course", "Small-cap basics, risk, momentum, Level 2, and Time & Sales foundations.", "48", "14"],
      ["Bonus replay", "2 hour live trading recording with context you can study anytime.", "37", "11"],
      ["Next step", "Move from the free path into the live room, feed, and review system when you are ready.", "41", "9"]
    ],
    stat: "Course + bonus replay"
  },
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
  "Elite Meetings": {
    icon: <CalendarDays />,
    title: "Weekly meetings to review, talk, connect, and improve.",
    status: "Elite weekly",
    summary: "Elite members join focused sessions around execution, psychology, consistency, and trade review.",
    mode: "call",
    posts: [
      ["Thursday", "Weekly trade review: what worked, what failed, and what to clean up.", "54", "23"],
      ["Group call", "Members bring screenshots and talk through decisions live.", "41", "20"],
      ["Action plan", "Leave with one execution rule to focus on next week.", "67", "29"]
    ],
    stat: "Elite accountability"
  },
  "The Tape": {
    icon: <MessageSquareText />,
    title: "A social feed for trades, lessons, and observations.",
    status: "128 posts today",
    summary: "Members share screenshots, notes, lessons, and market reads with comments and likes.",
    mode: "tape",
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
        <div className="mobile-nav-actions">
          <a
            className="header-login"
            href={loginLink}
            onClick={() => {
              setMenuOpen(false);
              trackEvent("login_click", { location: "mobile_nav" });
            }}
          >
            Log In
          </a>
        </div>
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
      <a
        className="mobile-header-cta"
        href="/#pricing"
        onClick={(event) => {
          trackEvent("pricing_click", { location: "mobile_header" });
          goToHomeSection(event, "pricing", isHome);
        }}
      >
        View Plans <ArrowRight size={17} />
      </a>
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
          <a href="/blog">
            Blog
          </a>
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

function AboutPage({ menuOpen, setMenuOpen }) {
  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero about-hero">
        <div>
          <span className="kicker">About DTSM</span>
          <h1>Trade, study, and improve together.</h1>
          <p>
            DTSM is built for traders who want more than random content. It gives you live market
            sessions, weekly meetings, recordings, and a real group of traders to stay connected with
            as you keep improving.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="/#pricing" onClick={() => trackEvent("pricing_click", { location: "about_hero" })}>
              View Membership Plans <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="/#preview">Preview The Community</a>
          </div>
        </div>
        <div className="about-hero-card">
          <span>What DTSM feels like</span>
          <strong>A live trading room built around connection, repetition, and real market study.</strong>
          <p>
            The goal is to give traders a place they actually want to log into: show up for the
            morning session, stay around other traders, study the replays, and keep getting sharper.
          </p>
          <div className="about-hero-points">
            <small><Check size={15} /> Connect with traders around the world</small>
            <small><Check size={15} /> Weekly meetings + live trading sessions</small>
            <small><Check size={15} /> Recordings, study, and review</small>
          </div>
        </div>
      </section>

      <FounderSection />

      <EthosSection
        kicker="What We Believe"
        title="Trading gets better when you stop doing it alone."
        description="DTSM is built around consistency, execution, and connection so members have a better place to learn from the market and from each other."
        ctaHref="/#pricing"
        ctaLabel="Choose A Membership Plan"
      />

      <section className="section about-fit-section">
        <div className="fit-card good">
          <span className="kicker">Good Fit</span>
          <h2>Who DTSM is for</h2>
          {[
            "Traders who want structure around the market",
            "People who learn better from live examples than random videos",
            "Members who want review, accountability, and repetition",
            "Small-cap traders who want more context around execution"
          ].map((item) => <p key={item}><Check size={17} /> {item}</p>)}
        </div>
        <div className="fit-card bad">
          <span className="kicker">Not A Fit</span>
          <h2>Who DTSM is not for</h2>
          {[
            "People looking for signals without understanding why",
            "Anyone expecting guaranteed profits",
            "Traders who do not want feedback or review",
            "Hype-driven shortcut seekers"
          ].map((item) => <p key={item}><X size={17} /> {item}</p>)}
        </div>
      </section>

      <CommunityRhythmSection
        kicker="Inside DTSM"
        title="A weekly rhythm traders can actually plug into."
        description="Morning sessions, weekly meetings, recordings, and updates all work together to keep members engaged and improving."
        ctaHref="/#pricing"
        ctaLabel="Join DTSM"
        ctaLocation="about_rhythm"
      />

      <section className="final-cta">
        <div>
          <span className="kicker">Join The Room</span>
          <h2>Step into a better trading environment.</h2>
          <p>Choose your plan, get inside Circle, and put yourself around traders working on the process every week.</p>
        </div>
        <a className="primary-button" href="/#pricing" onClick={() => trackEvent("pricing_click", { location: "about_final_cta" })}>
          View Membership Plans <ArrowRight size={19} />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}

function ProductDetailPage({ menuOpen, setMenuOpen, path }) {
  const product = productDetailPages[path];

  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero product-hero">
        <div>
          <span className="kicker">{product.kicker}</span>
          <h1>{product.title}</h1>
          <p>{product.intro}</p>
          <div className="hero-actions">
            <a
              className="primary-button"
              href="/#pricing"
              onClick={(event) => {
                trackEvent("pricing_click", { location: `${path}_hero` });
                goToHomeSection(event, "pricing", false);
              }}
            >
              View Membership Plans <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="/#preview">
              Preview The Community
            </a>
          </div>
        </div>
        <div className="product-hero-card">
          <div className="card-icon product-hero-icon">{product.icon}</div>
          <strong>{product.kicker} inside DTSM</strong>
          <div className="product-hero-stats">
            {product.stats.map(([label, value]) => (
              <article key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section product-highlights-section">
        <div className={`product-preview-shell${product.visualFirst ? " visual-first" : ""}`}>
          <div className="product-preview-copy">
            <span className="kicker">{product.preview.label}</span>
            <h2>{product.preview.title}</h2>
            <p>{product.preview.body}</p>
            <div className="product-feature-list">
              {product.features.map((feature) => (
                <small key={feature}><Check size={15} /> {feature}</small>
              ))}
            </div>
          </div>
          <div className="product-preview-stage">
            <div className="product-preview-bar">
              <span />
              <span />
              <span />
              <b>{product.kicker} on Circle</b>
            </div>
            <article className="product-shot main">
              {product.preview.mainShot.image ? (
                <img src={product.preview.mainShot.image} alt={product.preview.mainShot.alt} />
              ) : null}
              <small>{product.preview.mainShot.image ? "Real DTSM screenshot" : "Add screenshot here"}</small>
              <strong>{product.preview.mainShot.title}</strong>
              <p>{product.preview.mainShot.note}</p>
            </article>
            <div className="product-shot-grid">
              {product.preview.supportShots.map((shot) => (
                <article className="product-shot" key={shot.title}>
                  {shot.image ? (
                    <img src={shot.image} alt={shot.alt} />
                  ) : null}
                  <small>{shot.image ? "Real DTSM screenshot" : "Optional screenshot"}</small>
                  <strong>{shot.title}</strong>
                  <p>{shot.note}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className={`product-module-shell${product.visualFirst ? " visual-first" : ""}`}>
          <div className="product-module-lead">
            <span className="kicker">What You Actually Get</span>
            <h2>The parts of this product that make it useful day to day.</h2>
            <p>
              This is not just one page inside Circle. Each area opens a few different surfaces
              that help traders show up, study, and stay connected.
            </p>
            <div className="product-proof-list">
              {product.proof.map((item) => (
                <small key={item}><Check size={15} /> {item}</small>
              ))}
            </div>
          </div>
          <div className="product-module-grid">
            {product.modules.map((module) => (
              <article key={module.title}>
                <h3>{module.title}</h3>
                <p>{module.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="section-heading centered compact">
          <span className="kicker">What You Can Do Inside</span>
          <h2>What makes this part of DTSM actually worth using.</h2>
        </div>
        <div className="product-highlight-grid">
          {product.highlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section product-walkthrough-section">
        <div className="product-walkthrough-copy">
          <span className="kicker">How Members Use It</span>
          <h2>Simple enough to follow. Clear enough to build a repeatable routine.</h2>
          <p>
            The goal is not just to open another tab. Each part of DTSM is meant to fit into a real
            trading process so members know where to show up, what to study, and how to keep improving.
          </p>
        </div>
        <div className="product-walkthrough-steps">
          {product.workflow.map(([step, body], index) => (
            <article key={step}>
              <span>{`0${index + 1}`}</span>
              <div>
                <strong>{step}</strong>
                <p>{body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section product-conversion-section">
        <div>
          <span className="kicker">Why It Matters</span>
          <h2>{product.ctaTitle}</h2>
          <p>{product.ctaBody}</p>
        </div>
        <div className="product-conversion-actions">
          <a
            className="primary-button"
            href="/#pricing"
            onClick={(event) => {
              trackEvent("pricing_click", { location: `${path}_final_cta` });
              goToHomeSection(event, "pricing", false);
            }}
          >
            Choose Your Plan <ArrowRight size={19} />
          </a>
          <a className="secondary-button" href={loginLink} onClick={() => trackEvent("login_click", { location: `${path}_login` })}>
            Member Login <ArrowRight size={18} />
          </a>
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

function EthosSection({
  kicker = "Why DTSM Exists",
  title = "Built around real trading, honest review, and improving together.",
  description = "DTSM is meant to feel like a room traders can keep coming back to: a place to prepare, participate, review decisions, and stay connected to other people doing the work.",
  ctaHref = "/about",
  ctaLabel = "Read The About Page"
}) {
  return (
    <section className="section ethos-section">
      <div className="section-heading centered compact">
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="ethos-grid">
        {ethosPillars.map(([heading, body, icon]) => (
          <article className="ethos-card" key={heading}>
            <div className="card-icon">{icon}</div>
            <h3>{heading}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <div className="section-cta-center">
        <a className="secondary-button" href={ctaHref}>
          {ctaLabel} <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

function CommunityRhythmSection({
  kicker = "Latest From DTSM",
  title = "A public look at how the community stays active each week.",
  description = "The goal is to make it obvious that content, live sessions, and updates keep moving inside DTSM. Morning sessions, recordings, announcements, and weekly meetings all work together.",
  ctaHref = "/#pricing",
  ctaLabel = "Join The Community",
  ctaEvent = "pricing_click",
  ctaLocation = "community_rhythm"
}) {
  return (
    <section className="section rhythm-section">
      <div className="section-heading centered compact">
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="rhythm-layout">
        <div className="rhythm-feed">
          <div className="rhythm-block-head">
            <span>Inside Circle</span>
            <strong>Recent activity previews</strong>
          </div>
          <div className="rhythm-feed-grid">
            {publicAnnouncements.map(([label, heading, body, icon]) => (
              <article className="rhythm-card" key={heading}>
                <div className="card-icon">{icon}</div>
                <small>{label}</small>
                <strong>{heading}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
          <div className="rhythm-public-note">
            <Check size={16} />
            <span>Public preview only. Full posts, comments, recordings, and updates live inside Circle.</span>
          </div>
        </div>
        <aside className="rhythm-schedule">
          <div className="rhythm-block-head">
            <span>Live schedule</span>
            <strong>What the week looks like</strong>
          </div>
          <div className="schedule-list">
            {publicSchedule.map(([title, label, time]) => (
              <article key={title}>
                <strong>{title}</strong>
                <small>{label}</small>
                <span>{time}</span>
              </article>
            ))}
          </div>
          <a
            className="primary-button"
            href={ctaHref}
            onClick={() => trackEvent(ctaEvent, { location: ctaLocation })}
          >
            {ctaLabel} <ArrowRight size={18} />
          </a>
        </aside>
      </div>
    </section>
  );
}

function HeroLookInside() {
  const [activeTab, setActiveTab] = useState("Education");
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
          <b>DTSM on Circle</b>
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
              {activeTab === "Education" ? (
                <a href={signupLink}>Start Now</a>
              ) : (
                <a href="#pricing" onClick={(event) => scrollToSection(event, "pricing")}>Join</a>
              )}
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

                {active.mode === "call" && (
                  <div className="meeting-preview-card">
                    <div className="meeting-preview-stage">
                      <span className="live-dot">Live call</span>
                      <strong>Weekly execution review in progress</strong>
                      <small>Talking through what worked this week, what got forced, and what rule to carry into next week.</small>
                      <div className="meeting-preview-grid">
                        {[
                          ["BH", "Brendan", true],
                          ["ED", "Edward"],
                          ["CV", "CV-Pete"],
                          ["JL", "John"]
                        ].map(([initials, name, speaking]) => (
                          <article key={name} className={speaking ? "speaking" : ""}>
                            <div>{initials}</div>
                            <span>{name}</span>
                            {speaking ? <b><Radio size={12} /> Speaking</b> : null}
                          </article>
                        ))}
                      </div>
                    </div>
                    <div className="meeting-preview-chat">
                      <p><span>Brendan</span>Good trade idea, but the entry only counts if the reclaim holds.</p>
                      <p><span>Edward</span>That helped me slow down a lot this week.</p>
                    </div>
                  </div>
                )}

                {active.mode === "education" && (
                  <div className="education-preview-card">
                    <div className="education-course-panel">
                      <div className="education-course-top">
                        <span>Free Starter Course</span>
                        <b>Bonus education</b>
                      </div>
                      <strong>DTSM Starter Course</strong>
                      <p>
                        Learn the language first, build a cleaner routine, and step into the rest of
                        DTSM with better context.
                      </p>
                      <div className="education-course-list">
                        <small><Check size={15} /> Small-cap trading basics</small>
                        <small><Check size={15} /> Risk, momentum, Level 2</small>
                        <small><Check size={15} /> Time & Sales foundations</small>
                      </div>
                    </div>
                    <div className="education-bonus-panel">
                      <div className="education-bonus-head">
                        <span>Included bonus</span>
                        <strong>2 hour live trading replay</strong>
                      </div>
                      <p>
                        Watch a full session with commentary, setups, and context so the education
                        feels connected to the real room.
                      </p>
                      <div className="education-bonus-pill">
                        <PlayCircle size={16} /> Free course + bonus replay
                      </div>
                    </div>
                  </div>
                )}

                {active.mode === "tape" && (
                  <div className="tape-preview-grid">
                    {active.posts.map((item) => (
                      <article className="tape-card" key={`${activeTab}-${item.meta}`}>
                        <div className={`tape-attachment ${item.accent}`}>
                          <span>{item.attachment}</span>
                          <div className="tape-attachment-art" aria-hidden="true">
                            {Array.from({ length: 7 }).map((_, index) => (
                              <i key={index} style={{ height: `${26 + ((index * 17) % 44)}%` }} />
                            ))}
                          </div>
                        </div>
                        <small>{item.meta}</small>
                        <p>{item.text}</p>
                        <div className="feed-actions">
                          <span><Heart size={15} /> {item.likes}</span>
                          <span><MessageCircle size={15} /> {item.comments}</span>
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
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const active = previewTabs[activeTab];

  useEffect(() => {
    const media = window.matchMedia("(max-width: 640px), (hover: none), (pointer: coarse)");
    const syncPreviewMode = () => setIsMobilePreview(media.matches);

    syncPreviewMode();
    media.addEventListener("change", syncPreviewMode);

    return () => media.removeEventListener("change", syncPreviewMode);
  }, []);

  useEffect(() => {
    if (isPaused || isMobilePreview) return undefined;
    const timer = window.setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = previewTabNames.indexOf(current);
        return previewTabNames[(currentIndex + 1) % previewTabNames.length];
      });
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused, isMobilePreview]);

  return (
    <section className="section preview-section">
      <div className="section-heading centered">
        <span className="kicker">Community Preview</span>
        <h2>Peek Inside The Environment<br />Before You Join.</h2>
        <p>
          Click through the core spaces and see how DTSM turns market activity into a repeatable
          improvement loop.
        </p>
        <div className="section-cta-center">
          <a
            className="primary-button"
            href={signupLink}
            onClick={() => {
              trackEvent("checkout_click", { plan: "signup", location: "community_preview" });
            }}
          >
            See Inside DTSM <ArrowRight size={18} />
          </a>
        </div>
      </div>
      <div
        className="preview-shell"
        onMouseEnter={() => {
          if (!isMobilePreview) setIsPaused(true);
        }}
        onMouseLeave={() => {
          if (!isMobilePreview) setIsPaused(false);
        }}
      >
        <div className="preview-tabs" role="tablist" aria-label="Community preview tabs">
          {previewTabNames.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
              onMouseEnter={() => {
                if (!isMobilePreview) setActiveTab(tab);
              }}
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
            ) : active.mode === "video" ? (
              <div className="live-video-card">
                <div className="video-screen">
                  <div className="video-overlay">
                    <span className="live-dot">Live session active</span>
                    <strong>Small-cap momentum room</strong>
                    <small>
                      Watch the chart, hear the commentary, and follow how the setup is being
                      managed in real time.
                    </small>
                  </div>
                  <div className="video-chart" aria-hidden="true">
                    {Array.from({ length: 14 }).map((_, index) => (
                      <i key={index} style={{ height: `${24 + ((index * 19) % 52)}%` }} />
                    ))}
                  </div>
                  <div className="play-button" aria-hidden="true">
                    <PlayCircle size={34} />
                  </div>
                </div>
                <div className="video-controls" aria-label="Live room session controls">
                  <span><Radio size={15} /> 38 traders watching</span>
                  <div><i /></div>
                  <strong>12:14 left in recap</strong>
                </div>
                <div className="video-notes">
                  <span><MonitorUp size={15} /> Screen share</span>
                  <span><MessageCircle size={15} /> Live commentary</span>
                  <span><Layers3 size={15} /> Level 2 focus</span>
                </div>
              </div>
            ) : active.mode === "chat" ? (
              <div className="chatroom-preview">
                <div className="chatroom-top">
                  <span><MessageCircle size={15} /> DTSM live chat</span>
                  <strong>Open 24/7</strong>
                </div>
                <div className="chatroom-thread" aria-label="24/7 chatroom messages">
                  {[
                    ["BH", "Brendan", "Premarket volume is there. Let the first move settle before you do anything."],
                    ["CV", "CV-Pete", "Got it. Watching the reclaim instead of the first candle push."],
                    ["ED", "Edward", "Posting my chart in a second. Tape felt clean once bids started stacking."],
                    ["JL", "John", "Helpful. I am sitting on my hands until the level confirms."]
                  ].map(([initials, name, message]) => (
                    <article key={name + message}>
                      <div className="chatroom-avatar">{initials}</div>
                      <div className="chatroom-bubble">
                        <strong>{name}</strong>
                        <p>{message}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : active.mode === "tape" ? (
              <div className="tape-preview-grid">
                {active.items.map((item) => (
                  <article className="tape-card" key={`${item.meta}-${item.text}`}>
                    <div className={`tape-attachment ${item.accent}`}>
                      <span>{item.attachment}</span>
                      <div className="tape-attachment-art" aria-hidden="true">
                        {Array.from({ length: 7 }).map((_, index) => (
                          <i key={index} style={{ height: `${26 + ((index * 17) % 44)}%` }} />
                        ))}
                      </div>
                    </div>
                    <small>{item.meta}</small>
                    <p>{item.text}</p>
                    <div className="feed-actions" aria-label="Post engagement">
                      <span><Heart size={15} /> {item.likes}</span>
                      <span><MessageCircle size={15} /> {item.comments}</span>
                    </div>
                  </article>
                ))}
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
          <h1>
            Stock Market Community
            <span>Built for Better Execution.</span>
          </h1>
          <p>
            DTSM gives you daily live sessions, The Tape feed, 24/7 chat, and a deep recordings
            library so you can follow the market, review your trades, and keep improving in one place.
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
          <div className="hero-trial-note">
            <span>7 days free access</span>
            <strong>Everything opens on day one</strong>
          </div>
          <div className="hero-proof" aria-label="DTSM core access">
            <span><Radio size={15} /> Live room</span>
            <span><MessageSquareText size={15} /> Trader feed + chat</span>
            <span><Library size={15} /> 400+ hours of recordings</span>
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
        {proofStrip.map((item) => (
          <article className={item.featured ? "featured" : ""} key={item.title}>
            <div>{item.icon}</div>
            <small>{item.tag}</small>
            <strong>{item.title}</strong>
            <p>{item.body}</p>
          </article>
        ))}
      </section>

      <section className="section home-offer-section">
        <div className="section-heading centered compact">
          <span className="kicker">What's Inside DTSM</span>
          <h2>What opens when you join DTSM.</h2>
          <p>
            When you join, you get a live room, a trader feed, a study library, and a free course
            path so it is always clear where to start and what to use next.
          </p>
        </div>
        <div className="home-offer-quick-note">
          <strong>Everything lives inside one Circle community.</strong>
          <span>One login gives you the live room, feed, chat, recordings, reviews, and education.</span>
        </div>
        <div className="home-offer-grid-simple">
          {homeOfferGroups.map((group) => (
            <article className="home-offer-simple-card" key={group.label}>
              <div className="home-offer-simple-top">
                <div className="card-icon">{group.icon}</div>
                <span>{group.label}</span>
              </div>
              <h3>{group.title}</h3>
              <p>{group.micro}</p>
              <div className="home-offer-list">
                {group.items.map((item) => (
                  <small key={item}><Check size={15} /> {item}</small>
                ))}
              </div>
              <a
                className="home-offer-card-link"
                href={group.href}
                onClick={() => trackEvent("product_detail_click", { product: group.label, location: "home_offer" })}
              >
                {group.cta} <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <div id="preview">
        <CommunityPreview />
      </div>

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
        <div className="section-cta-center">
          <a
            className="secondary-button"
            href="#pricing"
            onClick={(event) => {
              trackEvent("pricing_click", { location: "reactions_section" });
              scrollToSection(event, "pricing");
            }}
          >
            View Membership Plans <ArrowRight size={18} />
          </a>
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
        <div className="pricing-launch-banner">
          <span>Founders launch pricing</span>
          <strong>Early members get the lowest pricing DTSM plans to offer.</strong>
          <p>Join during the founders launch window and lock in early-member pricing while the community is still in its first growth phase.</p>
        </div>
        <div className="plan-guide">
          {planGuides.map(([label, title, body], index) => (
            <article className={index === 1 ? "featured" : ""} key={title}>
              <span>{label}</span>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
        <div className="pricing-grid">
          {plans.map((plan) => (
            <article className={plan.popular ? `price-card ${plan.id} popular` : `price-card ${plan.id}`} key={plan.id}>
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

      <section className="discord-pricing-cta">
        <div>
          <span className="kicker">Not ready for paid access yet?</span>
          <h2>Join the free DTSM Discord preview.</h2>
          <p>
            See what traders are watching, stay around market conversation, and get a feel for the
            pace of DTSM before choosing a paid plan.
          </p>
        </div>
        <a className="primary-button" href={discordLink} onClick={() => trackEvent("discord_click", { location: "post_compare" })}>
          Join Free Discord <MessageCircle size={18} />
        </a>
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
        <div className="resource-hero-copy">
          <span className="kicker">Free Resource Hub</span>
          <h1>Build A Cleaner Trading Process Before You Risk More.</h1>
          <p>
            This is the free DTSM path for traders who want structure. Start with the course, learn
            the language, build a routine around execution, and get a better feel for how DTSM helps
            traders prepare, trade, and review.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={loginLink} onClick={() => trackEvent("login_click", { location: "resources_hero" })}>Start The Free Course <ArrowRight size={19} /></a>
            <a className="secondary-button" href="/#preview">Preview The Community</a>
          </div>
          <div className="resource-hero-stats">
            {resourceHeroStats.map(([title, body]) => (
              <article key={title}>
                <strong>{title}</strong>
                <span>{body}</span>
              </article>
            ))}
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
          <div className="resource-hero-note">
            <span>Free path</span>
            <strong>Start with the course, then move into YouTube, Discord, and the scanner workflow.</strong>
          </div>
        </div>
      </section>

      <section className="section resource-trust-section">
        <div className="resource-trust-grid">
          {resourceTrustCards.map(([title, body, icon]) => (
            <article key={title}>
              <div className="card-icon">{icon}</div>
              <strong>{title}</strong>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <EthosSection
        kicker="What DTSM Is Built Around"
        title="Resources teach the basics. DTSM gives you the room, rhythm, and review."
        description="The free path helps you learn. The paid community helps you keep showing up, stay connected to real market examples, and improve with other traders."
        ctaHref="/about"
        ctaLabel="Why DTSM Exists"
      />

      <section className="section featured-resources-section">
        <div className="section-heading centered compact">
          <span className="kicker">Starter Kit</span>
          <h2>Start with the free DTSM Starter Course.</h2>
          <p>
            This is the cleanest entry point on the page. Learn the basics, understand the language,
            and walk through a better routine before stepping deeper into the live environment.
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

      <section className="section resource-collections-section">
        <div className="section-heading centered compact">
          <span className="kicker">What You Can Study</span>
          <h2>Three resource lanes built around better execution.</h2>
          <p>
            The goal is to help visitors instantly understand what they can learn here and why each
            section matters before they ever join DTSM.
          </p>
        </div>
        <div className="resource-collections-grid">
          {resourceCollections.map((collection) => (
            <article key={collection.title}>
              <span>{collection.label}</span>
              <h3>{collection.title}</h3>
              <p>{collection.body}</p>
              <div>
                {collection.items.map((item) => (
                  <small key={item}><Check size={14} /> {item}</small>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <FreeChannelsSection />

      <CommunityRhythmSection
        kicker="Inside The Community"
        title="See how new content and live sessions keep moving inside DTSM."
        description="This public preview shows the kind of updates, replays, and recurring sessions that make the full community feel alive instead of static."
        ctaHref="/#pricing"
        ctaLabel="Unlock The Full Environment"
        ctaLocation="resources_rhythm"
      />

      {resourceGroups.map((group) => (
        <section className="section resources-section" key={group.title}>
          <div className="section-heading compact">
            <span className="kicker">{group.eyebrow}</span>
            <h2>{group.title}</h2>
            <p>{group.description}</p>
          </div>
          <div className="resource-grid">
            {group.cards.map((card) => (
              <article className="resource-card" key={card.title}>
                <div className="resource-card-top">
                  <div className="card-icon">{card.icon}</div>
                  <div className="resource-card-meta">
                    <span className="resource-status">{card.tag}</span>
                    <small>{card.time}</small>
                  </div>
                </div>
                <div className="resource-card-visual" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <a
                  href={card.href}
                  onClick={() => trackEvent(card.event, { location: "resource_card", resource: card.title })}
                >
                  {card.cta} <ArrowRight size={15} />
                </a>
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
          <h2>Ready for the full DTSM environment?</h2>
          <p>
            Free resources can teach the basics. DTSM adds the live room, 24/7 chat, trade
            reviews, 400+ hours of live market data recordings, and weekly accountability that help you keep improving after the lesson ends.
          </p>
        </div>
        <a className="primary-button" href="/#pricing" onClick={() => trackEvent("pricing_click", { location: "resources_final_cta" })}>Unlock The Full Environment <ArrowRight size={19} /></a>
      </section>

      <SiteFooter />
    </main>
  );
}

function BlogPage({ menuOpen, setMenuOpen }) {
  const featured = blogPosts[0];
  const remaining = blogPosts.slice(1);

  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero blog-hero">
        <div>
          <span className="kicker">DTSM Blog</span>
          <h1>Trading lessons that connect the videos, tools, and community.</h1>
          <p>
            Use the blog to go deeper on scanners, execution, platform setup, indicators, and trade
            review. It is built to make the YouTube content easier to apply inside a real trading routine.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href={youtubeLink} target="_blank" rel="noreferrer" onClick={() => trackEvent("youtube_click", { location: "blog_hero" })}>
              Visit The YouTube Channel <ArrowRight size={19} />
            </a>
            <a className="secondary-button" href="/#pricing" onClick={(event) => goToHomeSection(event, "pricing", false)}>
              View Membership Plans
            </a>
          </div>
        </div>
        <div className="blog-hero-card">
          <span>Built around the JoinDTSM channel</span>
          <strong>Turn free education into a cleaner routine.</strong>
          <p>
            The blog gives written breakdowns for scanners, platforms, indicators, and trade reviews
            so visitors can learn fast and then step into the full DTSM environment when they want more context.
          </p>
          <div className="about-hero-points">
            <small><Check size={15} /> Scanner workflows</small>
            <small><Check size={15} /> Platform setup ideas</small>
            <small><Check size={15} /> Indicator + execution education</small>
          </div>
        </div>
      </section>

      <section className="section blog-featured-section">
        <div className="section-heading centered compact">
          <span className="kicker">Featured Article</span>
          <h2>Start with the workflow most visitors need first.</h2>
        </div>
        <article className="blog-featured-card">
          <img src={featured.hero} alt={featured.title} />
          <div className="blog-featured-copy">
            <small>{featured.category}</small>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="blog-chip-row">
              <span>{featured.date}</span>
              <span>Based on DTSM education themes</span>
            </div>
            <a className="primary-button" href={`/blog/${featured.slug}`} onClick={() => trackEvent("blog_post_click", { slug: featured.slug, location: "blog_featured" })}>
              Read The Article <ArrowRight size={18} />
            </a>
          </div>
        </article>
      </section>

      <section className="section blog-grid-section">
        <div className="section-heading centered compact">
          <span className="kicker">What's To Come</span>
          <h2>The next DTSM posts are already mapped out.</h2>
          <p>
            This section is meant to show visitors where the blog is heading next. The topics,
            keyword targets, and content angles are planned now so the library can grow in a clean way.
          </p>
        </div>
        <div className="blog-upcoming-intro">
          <article>
            <small>Publishing roadmap</small>
            <strong>Built to expand across tools, execution, and review.</strong>
            <p>Visitors can see the direction of the content now, even before every article is live.</p>
          </article>
          <article>
            <small>What is ready</small>
            <strong>{remaining.length} posts outlined next.</strong>
            <p>Titles, search angles, and post structure are already in place so publishing can happen fast.</p>
          </article>
        </div>
        <div className="blog-grid blog-upcoming-grid">
          {remaining.map((post) => (
            <article className="blog-card blog-upcoming-card" key={post.slug}>
              <div className="blog-card-icon">{post.icon}</div>
              <small>{post.category}</small>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <div className="blog-chip-row">
                <span>Coming soon</span>
                <span>{post.searchPhrase}</span>
              </div>
              <div className="blog-upcoming-list">
                {post.bullets.slice(0, 3).map((bullet) => (
                  <small key={bullet}><Check size={14} /> {bullet}</small>
                ))}
              </div>
              <span className="home-offer-card-link disabled" aria-disabled="true">
                Publishing Soon <Clock3 size={16} />
              </span>
            </article>
          ))}
        </div>
        <div className="blog-upcoming-note">
          <span className="kicker">More To Come</span>
          <strong>These previews are here to show the blog is being built out with intention.</strong>
          <p>
            More written breakdowns, screenshots, video-led articles, and tool guides will keep filling this out over time.
          </p>
        </div>
      </section>

      <section className="section blog-lanes-section">
        <div className="section-heading centered compact">
          <span className="kicker">Built In Lanes</span>
          <h2>The blog is being built around the trading topics people search for most.</h2>
          <p>
            As the library grows, posts will naturally group into clean lanes so readers can go from one
            question to the next without getting lost.
          </p>
        </div>
        <div className="blog-topic-lanes">
          {blogTopicLanes.map((lane) => (
            <span key={lane}>{lane}</span>
          ))}
        </div>
      </section>

      <section className="section blog-channel-section">
        <div className="blog-channel-copy">
          <span className="kicker">From The Channel</span>
          <h2>The blog works best alongside the JoinDTSM videos.</h2>
          <p>
            Use the written posts to clarify the workflow, then watch the videos for the live examples,
            chart context, and real pacing that make the ideas easier to apply.
          </p>
        </div>
        <div className="blog-channel-panel">
          <article>
            <strong>YouTube breakdowns</strong>
            <p>Market breakdowns, scanner ideas, Level 2 lessons, and execution-focused education.</p>
          </article>
          <article>
            <strong>Free course path</strong>
            <p>Start with the free starter course, then move into the room, feed, and recordings when you want more.</p>
          </article>
          <a className="primary-button" href={youtubeLink} target="_blank" rel="noreferrer" onClick={() => trackEvent("youtube_click", { location: "blog_channel" })}>
            Watch JoinDTSM On YouTube <ArrowRight size={18} />
          </a>
        </div>
      </section>

      <section className="final-cta">
        <div>
          <span className="kicker">Step Into DTSM</span>
          <h2>Use the free content, then join the full environment.</h2>
          <p>The blog can teach the workflow. DTSM gives you the room, feed, recordings, and review loop to actually improve with it.</p>
        </div>
        <a className="primary-button" href="/#pricing" onClick={(event) => goToHomeSection(event, "pricing", false)}>
          View Membership Plans <ArrowRight size={19} />
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}

function BlogPostPage({ menuOpen, setMenuOpen, path }) {
  const post = blogPostMap[path];
  const author = post.author || defaultBlogAuthor;
  const headingId = (heading) =>
    heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  return (
    <main>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <section className="page-hero blog-post-hero">
        <div>
          <span className="kicker">{post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="blog-chip-row">
            <span>Published {post.publishedAt || post.date}</span>
            <span>Updated {post.updatedAt || post.date}</span>
            <span>{post.searchPhrase}</span>
          </div>
          <div className="blog-author-card">
            <img src={author.image} alt={author.name} />
            <div>
              <strong>{author.name}</strong>
              <span>{author.role} · {author.title}</span>
              <p>{author.bio}</p>
            </div>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href={post.ctaHref} onClick={(event) => {
              if (post.ctaHref.startsWith("/#")) {
                goToHomeSection(event, post.ctaHref.replace("/#", ""), false);
              }
              trackEvent("blog_cta_click", { slug: post.slug, location: "blog_post_hero" });
            }}>
              {post.cta} <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href={youtubeLink} target="_blank" rel="noreferrer" onClick={() => trackEvent("youtube_click", { location: "blog_post_hero" })}>
              Watch On YouTube
            </a>
          </div>
        </div>
        <div className="blog-post-hero-card">
          {post.partner ? (
            <div className="blog-post-hero-logo">
              <img src={post.partner.logo} alt={`${post.partner.name} logo`} />
            </div>
          ) : null}
          <img src={post.hero} alt={post.title} />
        </div>
      </section>

      {post.videoId ? (
        <section className="section blog-video-section">
          <div className="section-heading centered compact blog-video-heading">
            <span className="kicker">Watch The Breakdown</span>
            <h2>Press play and follow the full Drive the Stock Market breakdown.</h2>
            <p>
              Watch the lesson first, then scroll down to revisit the key ideas in written form.
            </p>
          </div>
          <div className="blog-video-shell centered">
            <div className="blog-video-frame">
              <iframe
                src={`https://www.youtube.com/embed/${post.videoId}`}
                title={post.title}
                loading="eager"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="section blog-post-section">
        <div className="blog-post-layout">
          <aside className="blog-post-nav">
            <div className="blog-post-side-card">
              <span className="kicker">On This Page</span>
              {post.sections.map((section) => (
                <a key={section.heading} href={`#${headingId(section.heading)}`}>
                  {section.heading}
                </a>
              ))}
            </div>
            <div className="blog-post-side-card">
              <span className="kicker">Search Intent</span>
              <strong>{post.searchPhrase}</strong>
              <p>This post is written to answer one clear question and connect that answer back into the DTSM workflow.</p>
            </div>
            <div className="blog-post-side-card branded">
              <span className="kicker">Drive the Stock Market</span>
              <strong>Free content first. Real environment next.</strong>
              <p>
                The blog and YouTube channel teach the workflow. DTSM gives you the room, the feed,
                the recordings, and the repetition to actually improve with it.
              </p>
              <a className="primary-button" href="/#pricing" onClick={(event) => goToHomeSection(event, "pricing", false)}>
                View Membership Plans <ArrowRight size={18} />
              </a>
            </div>
          </aside>
          <article className="blog-post-body">
            {post.sections.map((section, index) => (
              <React.Fragment key={section.heading}>
                <section id={headingId(section.heading)}>
                  <h2>{section.heading}</h2>
                  <p>{section.body}</p>
                  {section.links?.length ? (
                    <div className="blog-inline-links">
                      {section.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          onClick={(event) => {
                            if (link.href.startsWith("/#")) {
                              goToHomeSection(event, link.href.replace("/#", ""), false);
                            }
                            trackEvent("blog_internal_link_click", { slug: post.slug, target: link.href, label: link.label });
                          }}
                        >
                          {link.label} <ArrowRight size={15} />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </section>
                {post.midCta && index === 2 ? (
                  <div className="blog-mid-cta">
                    <span className="kicker">{post.midCta.kicker}</span>
                    <h2>{post.midCta.title}</h2>
                    <p>{post.midCta.body}</p>
                    <div className="blog-mid-cta-actions">
                      <a
                        className="primary-button"
                        href={post.midCta.href}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent("chartswatcher_click", { location: "blog_post_mid_cta", slug: post.slug })}
                      >
                        {post.midCta.cta} <ArrowRight size={18} />
                      </a>
                      <span>{post.midCta.note}</span>
                    </div>
                  </div>
                ) : null}
              </React.Fragment>
            ))}
            <div className="blog-post-takeaway">
              <span className="kicker">Takeaway</span>
              <p>{post.takeaway}</p>
            </div>
            {post.comparison ? (
              <div className="blog-post-comparison">
                {post.comparison.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                ))}
              </div>
            ) : null}
          </article>
          <aside className="blog-post-side">
            {post.partner ? (
              <div className="blog-post-side-card partner">
                <img src={post.partner.logo} alt={`${post.partner.name} logo`} />
                <span className="kicker">Partner Tool</span>
                <strong>{post.partner.name}</strong>
                <p>{post.partner.body}</p>
                <div className="blog-chip-row">
                  <span>Code: {post.partner.code}</span>
                  <span>DTSM link</span>
                </div>
                <a
                  className="primary-button"
                  href={post.partner.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent("chartswatcher_click", { location: "blog_post_partner", slug: post.slug })}
                >
                  {post.partner.cta} <ArrowRight size={18} />
                </a>
              </div>
            ) : null}
            <div className="blog-post-side-card">
              <span className="kicker">In This Post</span>
              {post.bullets.map((bullet) => (
                <small key={bullet}><Check size={15} /> {bullet}</small>
              ))}
            </div>
            <div className="blog-post-side-card">
              <span className="kicker">Next Step</span>
              <strong>Use the post, then step into the full environment.</strong>
              <p>The article teaches the idea. DTSM gives you live examples, recordings, and a community around the process.</p>
              <a className="primary-button" href={post.ctaHref} onClick={(event) => {
                if (post.ctaHref.startsWith("/#")) {
                  goToHomeSection(event, post.ctaHref.replace("/#", ""), false);
                }
                trackEvent("blog_cta_click", { slug: post.slug, location: "blog_post_sidebar" });
              }}>
                {post.cta} <ArrowRight size={18} />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {post.bottomCta ? (
        <section className="section blog-bottom-cta-section">
          <div className="blog-bottom-cta">
            <span className="kicker">Next Step</span>
            <h2>{post.bottomCta.title}</h2>
            <p>{post.bottomCta.body}</p>
            <div className="blog-bottom-cta-actions">
              <a
                className="primary-button"
                href={post.bottomCta.primary.href}
                onClick={(event) => {
                  if (post.bottomCta.primary.href.startsWith("/#")) {
                    goToHomeSection(event, post.bottomCta.primary.href.replace("/#", ""), false);
                  }
                  trackEvent("blog_cta_click", { slug: post.slug, location: "blog_bottom_primary" });
                }}
              >
                {post.bottomCta.primary.label} <ArrowRight size={18} />
              </a>
              <div className="blog-bottom-cta-links">
                {post.bottomCta.secondary.map((link) => (
                  <a
                    key={link.label}
                    className="secondary-button"
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    onClick={(event) => {
                      if (link.href.startsWith("/#")) {
                        goToHomeSection(event, link.href.replace("/#", ""), false);
                      }
                      trackEvent("blog_cta_click", { slug: post.slug, location: "blog_bottom_secondary", label: link.label });
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section blog-explore-section">
        <div className="section-heading centered compact">
          <span className="kicker">Explore DTSM</span>
          <h2>Go deeper than the article.</h2>
          <p>
            If the post helped, the next step is seeing how the same ideas connect to the scanner page,
            the free course, and the full DTSM environment.
          </p>
        </div>
        <div className="blog-grid">
          {blogExploreCards.map((card) => (
            <article className="blog-card" key={card.title}>
              <div className="blog-card-icon"><BookOpen size={22} /></div>
              <small>Explore</small>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <a
                className="home-offer-card-link"
                href={card.href}
                onClick={(event) => {
                  if (card.href.startsWith("/#")) {
                    goToHomeSection(event, card.href.replace("/#", ""), false);
                  }
                  trackEvent("blog_explore_click", { slug: post.slug, target: card.title });
                }}
              >
                {card.cta} <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section blog-related-section">
        <div className="section-heading centered compact">
          <span className="kicker">Keep Going</span>
          <h2>More ways to go deeper on the same idea.</h2>
        </div>
        <div className="blog-grid">
          {blogPosts.filter((entry) => entry.slug !== post.slug).slice(0, 3).map((entry) => (
            <article className="blog-card" key={entry.slug}>
              <div className="blog-card-icon">{entry.icon}</div>
              <small>{entry.category}</small>
              <h3>{entry.title}</h3>
              <p>{entry.excerpt}</p>
              <div className="blog-chip-row">
                <span>{entry.date}</span>
              </div>
              <a className="home-offer-card-link" href={`/blog/${entry.slug}`} onClick={() => trackEvent("blog_post_click", { slug: entry.slug, location: "blog_related" })}>
                Read More <ArrowRight size={16} />
              </a>
            </article>
          ))}
        </div>
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
  const meta = getPageMeta(path);

  useEffect(() => {
    initAnalytics();
    document.title = meta.title;
    const ensureMeta = (selector, attribute, value) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const [, attrValue] = selector.match(/\[(?:name|property)="([^"]+)"\]/) || [];
        if (selector.includes("property=")) {
          element.setAttribute("property", attrValue);
        } else {
          element.setAttribute("name", attrValue);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    ensureMeta('meta[name="description"]', "content", meta.description);
    ensureMeta('meta[name="keywords"]', "content", meta.keywords || "DTSM, trading community, live trading, small-cap trading");
    ensureMeta('meta[property="og:title"]', "content", meta.title);
    ensureMeta('meta[property="og:description"]', "content", meta.description);
    ensureMeta('meta[property="og:type"]', "content", blogPostMap[path] ? "article" : "website");
    ensureMeta('meta[name="twitter:title"]', "content", meta.title);
    ensureMeta('meta[name="twitter:description"]', "content", meta.description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://www.joindtsm.com${path}`);

    const oldSchema = document.head.querySelector("#dtsm-schema");
    if (oldSchema) oldSchema.remove();

    if (blogPostMap[path]) {
      const post = blogPostMap[path];
      const schema = document.createElement("script");
      schema.id = "dtsm-schema";
      schema.type = "application/ld+json";
      schema.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `https://www.joindtsm.com${post.hero}`,
        author: {
          "@type": "Person",
          name: post.author?.name || "Brendan Hogan"
        },
        publisher: {
          "@type": "Organization",
          name: "Drive the Stock Market",
          logo: {
            "@type": "ImageObject",
            url: "https://www.joindtsm.com/assets/dtsm-orb-logo.png"
          }
        },
        mainEntityOfPage: `https://www.joindtsm.com${path}`,
        datePublished: post.publishedAt || post.date,
        dateModified: post.updatedAt || post.publishedAt || post.date,
        articleSection: post.category,
        keywords: post.seoKeywords || "",
        about: post.searchPhrase || post.category
      });
      document.head.appendChild(schema);
    }
  }, [meta, path]);

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

  if (path === "/blog") {
    return <BlogPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
  }

  if (blogPostMap[path]) {
    return <BlogPostPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} path={path} />;
  }

  if (productDetailPages[path]) {
    return <ProductDetailPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} path={path} />;
  }

  if (path === "/about") {
    return <AboutPage menuOpen={menuOpen} setMenuOpen={setMenuOpen} />;
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
          ["Analytics and site activity", "DTSM may use tools such as Vercel Analytics, Vercel Speed Insights, Google Analytics, and Microsoft Clarity to understand page visits, clicks, performance, and general site behavior so the website can be improved over time."],
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

createRoot(document.getElementById("root")).render(
  <>
    <App />
    {shouldUseVercelRuntime ? <Analytics /> : null}
    {shouldUseVercelRuntime ? <SpeedInsights /> : null}
  </>
);
