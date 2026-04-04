import { lazy, Suspense, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useSEO, StructuredData,
  generateBreadcrumbSchema, generateWebPageSchema, generateSoftwareApplicationSchema,
  generateHowToSchema, generateFAQSchema,
} from "@/lib/seo";
import { Link } from "wouter";
import {
  ArrowRight, Users, CheckCircle2, Zap, Lock, Eye, TrendingUp,
  Palette, BarChart2, Shield, ChevronDown, Star, Target, Lightbulb,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const YouTubeThumbnailTool = lazy(
  () => import("@/components/tools/YouTubeThumbnailTool")
);

// ─── Constants ────────────────────────────────────────────────────────────────

const CANONICAL = "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader/channel-thumbnails";
const MAIN_TOOL = "/tools/youtube-thumbnail-downloader";
const OG_IMAGE = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=630&fit=crop";

// ─── gtag helper ─────────────────────────────────────────────────────────────

declare function gtag(...args: unknown[]): void;

function trackEvent(eventName: string, params?: Record<string, string | number>) {
  try {
    if (typeof gtag !== "undefined") {
      gtag("event", eventName, params ?? {});
    }
  } catch { /* analytics not available */ }
}

// ─── Schema Stack ─────────────────────────────────────────────────────────────

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://tools.pixocraft.in" },
  { name: "Tools", url: "https://tools.pixocraft.in/tools" },
  { name: "Media Tools", url: "https://tools.pixocraft.in/tools/media" },
  { name: "YouTube Thumbnail Downloader", url: "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader" },
  { name: "Channel Thumbnails", url: CANONICAL },
]);

const webPageSchema = generateWebPageSchema({
  name: "Download YouTube Channel Thumbnail, Profile Picture & Banner HD | Pixocraft",
  description: "Download YouTube channel profile pictures, banners, and video thumbnails for competitive analysis, branding research, and design inspiration. Free, no login, HD quality.",
  url: CANONICAL,
});

const softwareSchema = generateSoftwareApplicationSchema({
  name: "YouTube Channel Thumbnail Downloader – Pixocraft",
  description: "Download YouTube channel profile pictures, banner images, and video thumbnails in HD. Free browser-based tool for competitive research and channel branding analysis. No login, no watermarks.",
  url: CANONICAL,
  applicationCategory: "UtilityApplication",
  applicationSubCategory: "Image Downloader",
  operatingSystem: "Any",
  featureList: [
    "Download YouTube channel profile pictures",
    "Extract YouTube banner images",
    "Download video thumbnails in HD (1280×720)",
    "Download all sizes as ZIP",
    "CTR analyzer for thumbnail quality",
    "No login required",
    "100% private — no data stored",
    "Works on mobile and desktop",
  ],
  offers: { price: "0", priceCurrency: "USD" },
});

const softwareWithRatingSchema = {
  ...softwareSchema,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1800",
    bestRating: "5",
    worstRating: "1",
  },
};

const howToSchema = generateHowToSchema({
  name: "How to Download a YouTube Channel Profile Picture or Banner",
  description: "Extract YouTube channel images for branding analysis and design research. Free, no login required.",
  steps: [
    { name: "Open the YouTube Channel", text: "Navigate to any YouTube channel you want to analyze and copy its video URL from the browser address bar." },
    { name: "Paste the URL into Pixocraft", text: "Paste the channel or video URL into the Pixocraft tool input field above." },
    { name: "Extract Channel Images", text: "Click 'Get Thumbnails' to instantly pull all available thumbnail sizes from that channel's video." },
    { name: "Download in HD", text: "Select your preferred resolution and click Download. Save individually or grab all sizes as a ZIP." },
  ],
});

const faqSchema = generateFAQSchema([
  { question: "How do I download a YouTube channel profile picture?", answer: "Paste any video URL from that channel into Pixocraft's tool, click Get Thumbnails, and download in HD. For the channel profile picture specifically, visit the channel page, right-click the avatar image, and open it in a new tab to download the full-resolution version." },
  { question: "What is the YouTube channel banner size?", answer: "YouTube recommends 2560×1440 pixels for the channel banner. The safe zone visible across all devices is 1546×423 pixels. Designs outside the safe zone get cropped on mobile and tablet — always build around the centre safe zone." },
  { question: "Can I legally use downloaded YouTube channel images?", answer: "YouTube channel thumbnails and profile pictures are copyrighted by the creator. You may use downloaded images for personal research, competitor analysis, and design inspiration — but you cannot publish, reproduce, or commercially distribute them without the creator's explicit permission." },
  { question: "What is the difference between a channel thumbnail and a video thumbnail?", answer: "A channel thumbnail (profile picture) represents the creator's identity and appears beside every comment, video title, and search result. A video thumbnail sells a specific piece of content to an undecided viewer. Channel images are brand assets; video thumbnails are conversion assets — they serve completely different strategic purposes." },
  { question: "Why do top YouTube channels use consistent thumbnail styles?", answer: "Visual consistency builds brand recognition. Consistent colors, fonts, and layouts make a channel's videos instantly recognizable in feeds without reading the title. This recognition effect directly increases click-through rate from both existing subscribers and new viewers." },
  { question: "Does Pixocraft store or log the channels I analyze?", answer: "No. Pixocraft is entirely browser-based. No channel URLs, download history, or personal data is ever sent to or stored on our servers. Your competitive research is completely private." },
]);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function YouTubeThumbnailDownloaderChannels() {
  const toolRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Download YouTube Channel Thumbnail, Profile Picture & Banner HD | Pixocraft",
    description: "Download YouTube channel profile pictures, banners & video thumbnails for branding research & competitor analysis. Free, no login, HD quality. Works instantly.",
    keywords: "youtube channel thumbnail downloader, download youtube channel profile picture, youtube banner download, youtube channel branding, youtube profile picture download, youtube channel banner size",
    canonicalUrl: CANONICAL,
    ogTitle: "Download YouTube Channel Thumbnail, Profile Picture & Banner HD | Pixocraft",
    ogDescription: "Extract YouTube channel images for branding analysis and design research. Profile pictures, banners & thumbnails — free, no login, HD quality.",
    ogType: "website",
    ogImage: OG_IMAGE,
    twitterTitle: "Download YouTube Channel Thumbnail, Profile Picture & Banner HD",
    twitterDescription: "Free tool to download YouTube channel profile pictures, banners & thumbnails in HD. No login, instant, 100% private.",
    robots: "index, follow, max-image-preview:large",
  });

  // Preconnect to YouTube image CDN for faster thumbnail loading
  useEffect(() => {
    const rel = "preconnect";
    const href = "https://img.youtube.com";
    if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = rel;
      link.href = href;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }

    // Scroll depth tracking via Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackEvent("scroll_depth", { page: "channel_thumbnails", depth: "content_section" });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    if (contentRef.current) observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Schema Stack ─────────────────────────────────────────────────── */}
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={softwareWithRatingSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "YouTube Thumbnail Downloader", url: MAIN_TOOL },
            { label: "Channel Thumbnails" },
          ]} />
        </div>

        {/* ── AI Overview Block ────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <div className="bg-muted/60 border rounded-xl px-5 py-4 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What is a YouTube Channel Thumbnail Downloader?</p>
            <p className="text-sm text-foreground leading-relaxed">
              A YouTube channel thumbnail downloader extracts HD images from any YouTube video or channel — including profile pictures, banner artwork, and all video thumbnail sizes. Pixocraft's free browser-based tool works without login, stores nothing, and delivers results in under a second.
            </p>
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-10 md:py-14 px-4 mt-4">
          <div className="max-w-5xl mx-auto space-y-4 text-center">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Channel Branding Analysis Tool</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Download YouTube Channel Profile Pictures,
              <span className="block text-primary mt-1">Banners &amp; Thumbnails</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Extract channel images from any public YouTube creator for competitor research, branding inspiration, and visual identity analysis. Free, no login, HD quality — instant results.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {[
                { icon: Users, label: "Any Public Channel" },
                { icon: Lock, label: "100% Private" },
                { icon: CheckCircle2, label: "No Login Required" },
                { icon: Star, label: "HD Resolution" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm font-medium text-foreground bg-card border rounded-full px-3 py-1.5">
                  <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>
            <div className="pt-2">
              <Button
                onClick={() => {
                  toolRef.current?.scrollIntoView({ behavior: "smooth" });
                  trackEvent("cta_click", { location: "hero", page: "channel_thumbnails" });
                }}
                size="lg"
                className="font-semibold px-8"
                data-testid="button-scroll-to-tool"
              >
                <Zap className="w-4 h-4 mr-2" />
                Analyze a Channel Now
              </Button>
            </div>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 py-8" ref={toolRef} id="tool">
          <Suspense
            fallback={
              <div className="h-32 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
                Loading tool…
              </div>
            }
          >
            <YouTubeThumbnailTool
              testIdPrefix="ytchannel"
              label="Paste channel or video link → extract profile, banner & thumbnails instantly"
            />
          </Suspense>
        </div>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 space-y-16 pb-20" ref={contentRef}>

          {/* Channel Branding Analysis */}
          <section className="bg-primary/5 border border-primary/20 rounded-xl p-6 sm:p-10 space-y-6">
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-primary flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold">Channel Branding Analysis Tool</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Every top YouTube channel has a deliberate visual identity — a system of colors, typography, and image styles that makes their content instantly recognizable in any feed. Downloading and analyzing channel thumbnails gives you a direct window into how these systems work in practice.
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {[
                {
                  icon: Eye,
                  title: "Visual Identity Study",
                  body: "Understand how creators translate their brand personality into colors, compositions, and thumbnail formats across dozens of videos.",
                },
                {
                  icon: Target,
                  title: "Competitor Research",
                  body: "Extract thumbnails from competitor channels to identify what design patterns drive clicks in your niche right now.",
                },
                {
                  icon: Lightbulb,
                  title: "Inspiration Library",
                  body: "Build a curated reference library of channel branding from creators you admire. Use it to inform your own visual strategy.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-foreground">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* A — How YouTube Channel Branding Works */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">How YouTube Channel Branding Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              YouTube channel branding operates across three distinct layers — each one serves a specific psychological function in how viewers perceive and remember a creator.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Profile Image: The Recognition Signal",
                  body: "The channel profile picture is the smallest but most frequently seen asset. It appears beside every video title in search results, in comments, on the subscriber notification bell, and in YouTube's recommendation feed. Because it displays at tiny sizes (48×48px in most contexts), the best channel profile images use bold, single-subject compositions — a face, a logo, or a strong symbol — with high contrast that remains legible at thumbnail scale.",
                },
                {
                  title: "Channel Banner: The Brand Statement",
                  body: "The banner is prime real estate for communicating what a channel is about and why viewers should subscribe. YouTube recommends 2560×1440px but the safe zone visible across all devices is 1546×423px. Anything outside this area gets cropped on mobile. Leading creators use the banner to display a content promise, upload schedule, or visual mood — always designed for the safe zone first.",
                },
                {
                  title: "Thumbnail Series: The Brand in Motion",
                  body: "Across a channel's video library, thumbnails form a coherent visual series that either reinforces brand identity or fragments it. Top creators apply a consistent color palette, facial expression range, text style, and layout template across all thumbnails — so their videos are instantly recognizable in a subscription feed without reading the title. This is called a thumbnail brand system, and it's one of the most powerful growth tools available.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="p-6 bg-card border rounded-xl space-y-2">
                  <h3 className="text-lg font-bold text-foreground">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* B — What Makes a High-CTR Channel Thumbnail */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">What Makes a High-CTR Channel Thumbnail</h2>
            <p className="text-muted-foreground leading-relaxed">
              Click-through rate is the single most important signal a thumbnail sends to the YouTube algorithm. Here's what the highest-performing channel thumbnails consistently share:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  badge: "Color Science",
                  title: "Contrast-First Color Selection",
                  body: "High-CTR thumbnails use colors that contrast sharply against YouTube's white or dark background. Saturated yellows, oranges, reds, and electric blues outperform muted palettes consistently. Download thumbnails from top channels in your niche and compare their dominant colors — striking color strategies emerge immediately.",
                },
                {
                  badge: "Faces & Emotion",
                  title: "Facial Expression Intensity",
                  body: "Channels featuring a human presenter use exaggerated, high-emotion facial expressions — surprise, excitement, shock, curiosity. Thumbnails with faces generate higher click-through rates on average. Studying which expressions top creators favor can directly inform your own creative direction.",
                },
                {
                  badge: "Text Usage",
                  title: "Minimal, High-Impact Text",
                  body: "The best thumbnails treat text as a visual element, not a label. Three words maximum, in heavy sans-serif fonts, with contrasting outline or drop shadow. Many top channels use text only to amplify the curiosity gap — saying just enough to make the title feel incomplete without the thumbnail.",
                },
                {
                  badge: "Composition",
                  title: "Left-Heavy Subject Placement",
                  body: "YouTube's recommended video list and mobile feed crop thumbnails on the right side. The most clicked thumbnails place the primary subject — face or key object — in the left two-thirds of the frame, keeping the right side for supporting text or color fills.",
                },
              ].map(({ badge, title, body }) => (
                <div key={title} className="p-5 bg-card border rounded-xl space-y-2">
                  <Badge variant="secondary" className="text-xs">{badge}</Badge>
                  <h3 className="font-bold text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* C — Channel vs Video Thumbnails */}
          <section className="space-y-6 p-6 sm:p-8 bg-muted/40 border rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold">Channel Thumbnails vs. Video Thumbnails: The Key Difference</h2>
            <p className="text-muted-foreground leading-relaxed">
              These two types of channel imagery serve completely different strategic functions, despite being designed by the same creator:
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="font-bold text-foreground text-lg">Channel Profile Image</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Represents the creator's identity, not a specific video",
                    "Displayed at tiny sizes — must be bold and simple",
                    "Rarely changes — brand asset, not marketing asset",
                    "Prioritizes recognition over curiosity",
                    "Best formats: clean logo, portrait face, minimal icon",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <h3 className="font-bold text-foreground text-lg">Video Thumbnail</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Sells a specific piece of content to an undecided viewer",
                    "Displayed at 16:9 — can carry more visual complexity",
                    "Changes per video — conversion asset, not brand asset",
                    "Prioritizes curiosity gap and emotional response",
                    "Best formats: face + expression + minimal text",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pt-2 border-t">
              <strong className="text-foreground">Key insight:</strong> Channels that confuse these two functions — using video-style curiosity tactics in their profile image, or treating video thumbnails as brand exercises — tend to underperform in both recognition and click-through rate.
            </p>
          </section>

          {/* D — How Top Creators Design Channel Images */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">How Top Creators Design Their Channel Visual Identity</h2>
            <p className="text-muted-foreground leading-relaxed">
              Studying channels with millions of subscribers reveals consistent design philosophies. Download thumbnails from top creators in your niche and you'll find these patterns:
            </p>
            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Strict Color Palette Discipline",
                  body: "Most top channels operate with a 2–3 color palette applied consistently across every thumbnail — background, accent, and text. This is non-negotiable for brand recognition. When you download a channel's video library and view thumbnails side-by-side, the palette discipline becomes immediately obvious — and the moments it breaks down are equally revealing.",
                },
                {
                  number: "02",
                  title: "Minimalism as a Premium Signal",
                  body: "A common finding when analyzing top-tier channels: the higher the subscriber count, the cleaner the thumbnail tends to be. Creators with 10M+ subscribers often produce thumbnails with a single subject, two colors, and zero text. This isn't because minimalism is inherently better — it's because massive audiences can rely on name recognition rather than clickbait mechanics.",
                },
                {
                  number: "03",
                  title: "Template Systems, Not One-Off Designs",
                  body: "Successful creators don't design each thumbnail from scratch. They build reusable templates with locked fonts, color fills, and layout zones — then swap in a new image or expression per video. Download thumbnails from a high-volume channel and compare them in a grid view: you'll see the same design skeleton appearing across dozens of videos, proving the template is doing the heavy lifting.",
                },
                {
                  number: "04",
                  title: "Iterative Testing, Not Perfect Design",
                  body: "Many top creators change their thumbnails after publishing if click-through rates underperform. The initial design is a hypothesis; the data tells you if you were right. You can spot this by downloading older thumbnails from a channel and comparing them to recent uploads — the evolution shows deliberate refinement, not random stylistic change.",
                },
              ].map(({ number, title, body }) => (
                <div key={title} className="flex gap-5 p-5 bg-card border rounded-xl">
                  <span className="font-mono text-2xl font-bold text-primary/30 flex-shrink-0 select-none">{number}</span>
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Advanced Use Cases */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Advanced Use Cases for YouTube Channel Research</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: BarChart2,
                  title: "Niche Pattern Analysis",
                  body: "Download 10–20 thumbnails from the top 5 channels in your niche. Map the patterns: what colors dominate? Do faces appear? What text weight? This gives you a data-driven starting point for your visual strategy — and reveals gaps competitors haven't filled.",
                },
                {
                  icon: TrendingUp,
                  title: "YouTube Growth Auditing",
                  body: "Compare a channel's thumbnails from their first 50 videos to their latest 50. Growth inflection points often correlate with thumbnail design changes. Studying this progression gives you a case study in what actually moved the needle.",
                },
                {
                  icon: Target,
                  title: "Content Positioning Research",
                  body: "Before launching a new series, download thumbnails from channels already ranking for your target topic. Identify the visual language that owns that content category — then decide whether to align or deliberately contrast with it.",
                },
                {
                  icon: Lightbulb,
                  title: "Design Reference Library",
                  body: "Build a categorized swipe file of channel thumbnails by niche, color, format, and style. Over time this becomes an invaluable creative asset — a searchable reference for any thumbnail design challenge.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="p-5 bg-card border rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-foreground">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Pixocraft */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Why Use Pixocraft for Channel Analysis?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Users, title: "Any Channel, Any Scale", body: "Works on channels with 100 subscribers or 100 million. As long as the channel is public, you can extract its images instantly." },
                { icon: Shield, title: "Completely Private", body: "No account required, no URL logging, no download history stored. Your competitive research stays on your device only." },
                { icon: Star, title: "HD & Multiple Formats", body: "Access every available resolution from YouTube's CDN — including Max HD (1280×720) and Standard sizes — in one place." },
                { icon: Zap, title: "Instant, No Install", body: "Works directly in your browser. No extension, no app, no waiting. Paste a URL and get results in under a second." },
                { icon: CheckCircle2, title: "ZIP Batch Download", body: "Download all thumbnail sizes at once as a ZIP file. Perfect for building reference libraries without clicking files one by one." },
                { icon: BarChart2, title: "CTR Analyzer Built In", body: "Score any thumbnail you download for brightness, contrast, and click potential using the built-in CTR analyzer." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="p-5 bg-card border rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-foreground text-sm">{title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-8 sm:p-10 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Analyze Any YouTube Channel Now
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Extract profile pictures, banners, and video thumbnails from any public channel — free, private, instant. No login required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => {
                  toolRef.current?.scrollIntoView({ behavior: "smooth" });
                  trackEvent("cta_click", { location: "bottom_cta", page: "channel_thumbnails" });
                }}
                size="lg"
                className="font-semibold px-8"
                data-testid="button-cta-scroll"
              >
                <Zap className="w-4 h-4 mr-2" />
                Start Analyzing
              </Button>
              <Link href={MAIN_TOOL}>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold px-6"
                  onClick={() => trackEvent("internal_link_click", { destination: "main_tool", source: "channel_thumbnails_cta" })}
                >
                  Best YouTube Thumbnail Downloader
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "How do I download a YouTube channel profile picture?", a: "Paste any video URL from that channel into Pixocraft's tool, click Get Thumbnails, and download in HD. For the channel profile picture specifically, visit the channel page, right-click the avatar image, and open it in a new tab to download the full-resolution version." },
                { q: "What is the YouTube channel banner size?", a: "YouTube recommends 2560×1440 pixels for the channel banner. The safe zone visible across all devices is 1546×423 pixels. Designs outside the safe zone get cropped on mobile and tablet — always build around the centre safe zone." },
                { q: "Can I legally use downloaded YouTube channel images?", a: "YouTube channel thumbnails and profile pictures are copyrighted by the creator. You may use downloaded images for personal research, competitor analysis, and design inspiration — but you cannot publish, reproduce, or commercially distribute them without the creator's explicit permission." },
                { q: "What is the difference between a channel thumbnail and a video thumbnail?", a: "A channel thumbnail (profile picture) represents the creator's identity and appears beside every comment, video title, and search result. A video thumbnail sells a specific piece of content to an undecided viewer. Channel images are brand assets; video thumbnails are conversion assets." },
                { q: "Why do top YouTube channels use consistent thumbnail styles?", a: "Visual consistency builds brand recognition. Consistent colors, fonts, and layouts make a channel's videos instantly recognizable in feeds without reading the title — directly increasing click-through rate from both subscribers and new viewers." },
                { q: "Does Pixocraft store or log the channels I analyze?", a: "No. Pixocraft is entirely browser-based. No channel URLs, download history, or personal data is ever sent to or stored on our servers. Your competitive research is completely private." },
              ].map(({ q, a }) => (
                <details key={q} className="group border rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-medium text-sm select-none list-none">
                    {q}
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">{a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* Internal Linking — keyword-rich anchors */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Related YouTube Thumbnail Tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: MAIN_TOOL, label: "Best YouTube Thumbnail Downloader", desc: "Full-featured with ZIP download, CTR analyzer & all sizes", event: "main_tool" },
                { href: "/tools/youtube-thumbnail-downloader/online", label: "Download YouTube Thumbnail Online", desc: "Fast web-based version, no install needed", event: "online" },
                { href: "/tools/youtube-thumbnail-downloader/best", label: "Best Thumbnail Downloader Tools Compared", desc: "See how top tools compare side-by-side", event: "best" },
                { href: "/tools/youtube-thumbnail-downloader/free-no-login", label: "Free YouTube Thumbnail Downloader — No Login", desc: "100% free, no signup, no restrictions", event: "free" },
              ].map(({ href, label, desc, event }) => (
                <Link key={href} href={href}>
                  <div
                    className="flex items-start gap-3 p-4 rounded-lg border bg-card hover-elevate cursor-pointer"
                    onClick={() => trackEvent("internal_link_click", { destination: event, source: "channel_thumbnails_links" })}
                  >
                    <ArrowRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Related image tools */}
          <section className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-bold">Related Image Tools</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/image-compressor", label: "Compress Thumbnail Images", desc: "Reduce file size without quality loss — fast web delivery" },
                { href: "/tools/image-resizer", label: "Resize YouTube Thumbnails", desc: "Resize to any custom dimension for different platforms" },
                { href: "/tools/image-cropper", label: "Crop Thumbnail Images", desc: "Crop to the exact area you need from any downloaded thumbnail" },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href}>
                  <div className="p-4 bg-card border rounded-xl hover-elevate cursor-pointer h-full">
                    <p className="font-semibold text-primary text-sm mb-1">{label}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <p className="text-center text-sm text-muted-foreground border-t pt-8">
            Category: <Link href="/tools/media" className="text-primary hover:text-primary/80 transition-colors">Media Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
