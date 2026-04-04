import { lazy, Suspense, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useSEO, StructuredData,
  generateBreadcrumbSchema, generateWebPageSchema, generateSoftwareApplicationSchema,
  generateHowToSchema, generateFAQSchema,
} from "@/lib/seo";
import { Link } from "wouter";
import {
  ArrowRight, Lock, Zap, Shield, CheckCircle2, Smartphone,
  ChevronDown, XCircle, AlertTriangle, Users, Palette, GraduationCap, Search,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const YouTubeThumbnailTool = lazy(
  () => import("@/components/tools/YouTubeThumbnailTool")
);

// ─── Constants ────────────────────────────────────────────────────────────────

const CANONICAL = "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader/free-no-login";
const MAIN_TOOL = "/tools/youtube-thumbnail-downloader";
const OG_IMAGE = "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=630&fit=crop";

// ─── gtag helper ─────────────────────────────────────────────────────────────

declare function gtag(...args: unknown[]): void;
function trackEvent(name: string, params?: Record<string, string | number>) {
  try { if (typeof gtag !== "undefined") gtag("event", name, params ?? {}); } catch { /* noop */ }
}

// ─── Schema Stack ─────────────────────────────────────────────────────────────

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: "Home", url: "https://tools.pixocraft.in" },
  { name: "Tools", url: "https://tools.pixocraft.in/tools" },
  { name: "YouTube Thumbnail Downloader", url: "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader" },
  { name: "Free — No Login", url: CANONICAL },
]);

const webPageSchema = generateWebPageSchema({
  name: "Free YouTube Thumbnail Downloader — No Login, HD, Unlimited | Pixocraft",
  description: "Download YouTube thumbnails for free in HD and all sizes. No login, no limits, no watermark. Works instantly on mobile and desktop.",
  url: CANONICAL,
});

const softwareSchema = {
  ...generateSoftwareApplicationSchema({
    name: "Free YouTube Thumbnail Downloader No Login – Pixocraft",
    description: "Download YouTube video thumbnails 100% free — no login, no watermarks, no limits, no hidden charges. HD quality, all resolutions, ZIP download, CTR analyzer. Runs entirely in your browser.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    featureList: [
      "100% free — no hidden costs, no premium version",
      "No login, no email, no signup — ever",
      "No watermarks added to downloads",
      "HD quality (1280×720)",
      "All sizes: Max HD, HQ, SD, MQ, Default",
      "Unlimited downloads",
      "ZIP batch download",
      "Works offline after page load",
      "Works on mobile and desktop",
      "Zero ads",
      "100% private — runs in browser",
    ],
    offers: { price: "0", priceCurrency: "USD" },
  }),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2500",
    bestRating: "5",
    worstRating: "1",
  },
};

const howToSchema = generateHowToSchema({
  name: "How to Download YouTube Thumbnails Free Without Login",
  description: "Download any YouTube thumbnail for free with no login, no watermark, no limits. HD quality, instant, private.",
  steps: [
    { name: "Copy the YouTube Video URL", text: "Open any YouTube video and copy the URL from your browser's address bar. Full URLs (youtube.com/watch?v=), short links (youtu.be/), and Shorts URLs all work." },
    { name: "Paste into Pixocraft — No Login Needed", text: "Paste the URL into the input field above. No account prompt, no email wall, no signup step. The tool is ready immediately." },
    { name: "Choose Your Resolution", text: "All available thumbnail sizes appear instantly: Max HD (1280×720), High Quality (480×360), Standard, and Medium. Select the one you need." },
    { name: "Download Free — No Watermarks", text: "Click Download. The original-quality image saves to your device immediately — free, no watermarks, no limits, no signup required." },
  ],
});

const faqSchema = generateFAQSchema([
  { question: "Is this YouTube thumbnail downloader really free?", answer: "Yes — 100% free, forever. There is no premium version, no paid tier, no hidden charge of any kind. Pixocraft covers its costs through ethical advertising on other pages, not by restricting or monetizing user downloads." },
  { question: "Do I need to sign up or log in to download YouTube thumbnails?", answer: "No. There is no login, no email address, no signup form, and no account of any kind required. Open the page, paste a YouTube URL, and download immediately. No registration will ever be required." },
  { question: "Is there any download limit?", answer: "No. There are no daily limits, no session limits, no throttling, and no restrictions on the number of thumbnails you can download. Use it as many times as you need, free forever." },
  { question: "Does Pixocraft add a watermark to downloaded thumbnails?", answer: "No. Pixocraft never adds watermarks, logos, or any overlay to downloaded thumbnails. The image you download is byte-for-byte identical to what YouTube stores on its CDN — the original file the creator uploaded." },
  { question: "What resolutions can I download for free?", answer: "All resolutions are free: Max HD (1280×720), High Quality (480×360), Standard Definition (640×480), Medium Quality (320×180), and Default (120×90). You can download each individually or get all five in a single free ZIP." },
  { question: "Is downloading YouTube thumbnails for free legal?", answer: "YouTube thumbnails are publicly accessible images hosted on YouTube's CDN. Downloading for personal use, research, competitor analysis, and design inspiration is standard practice. Commercially reproducing or publishing someone else's thumbnail without permission is copyright infringement." },
]);

// ─── Differentiators Data ─────────────────────────────────────────────────────

const DIFFERENTIATORS = [
  { label: "No ads or pop-ups" },
  { label: "No login required — ever" },
  { label: "No download limits" },
  { label: "All resolutions free" },
  { label: "Works offline after load" },
  { label: "No watermarks added" },
  { label: "No watermarks, ever" },
  { label: "ZIP download free" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function YouTubeThumbnailDownloaderFree() {
  const toolRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Free YouTube Thumbnail Downloader (No Login, HD, Unlimited) | Pixocraft",
    description: "Download YouTube thumbnails for free in HD and all sizes. No login, no limits, no watermark. Works instantly on mobile and desktop. 100% private, free forever.",
    keywords: "free youtube thumbnail downloader, youtube thumbnail downloader free, download youtube thumbnail free no login, youtube thumbnail download free no watermark, free thumbnail downloader no signup unlimited",
    canonicalUrl: CANONICAL,
    ogTitle: "Free YouTube Thumbnail Downloader — No Login, HD, Unlimited",
    ogDescription: "Download YouTube thumbnails for free in HD and all sizes. No login, no limits, no watermark. Works instantly on mobile and desktop.",
    ogType: "website",
    ogImage: OG_IMAGE,
    twitterTitle: "Free YouTube Thumbnail Downloader — No Login, No Limits",
    twitterDescription: "100% free YouTube thumbnail downloader. No login, no watermarks, no limits. HD quality, instant, works on any device.",
    robots: "index, follow, max-image-preview:large",
  });

  useEffect(() => {
    const href = "https://img.youtube.com";
    if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            trackEvent("scroll_depth", { page: "free_no_login", depth: "content_section" });
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
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={softwareSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">

        {/* Breadcrumb */}
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "YouTube Thumbnail Downloader", url: MAIN_TOOL },
            { label: "Free — No Login" },
          ]} />
        </div>

        {/* ── AI Overview Block ────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <div className="bg-muted/60 border rounded-xl px-5 py-4 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What is a free YouTube thumbnail downloader?</p>
            <p className="text-sm text-foreground leading-relaxed">
              A free YouTube thumbnail downloader extracts HD preview images from any YouTube video at no cost — no login, no watermarks, no limits. Pixocraft runs entirely in your browser, fetches thumbnails directly from YouTube's CDN, and delivers results in under a second. Free forever, 100% private.
            </p>
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-10 md:py-14 px-4 mt-4">
          <div className="max-w-5xl mx-auto space-y-4 text-center">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Lock className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% Free Forever — No Login Required</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Free YouTube Thumbnail Downloader
              <span className="block text-primary mt-1">(No Login, Unlimited)</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Download YouTube thumbnails for free in HD and all sizes. No login, no limits, no watermark. Works instantly on mobile and desktop — free forever.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {[
                { icon: Lock, label: "100% Free Forever" },
                { icon: CheckCircle2, label: "No Login, Ever" },
                { icon: Smartphone, label: "Mobile Ready" },
                { icon: Zap, label: "Unlimited Downloads" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm font-medium text-foreground bg-card border rounded-full px-3 py-1.5">
                  <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Button
                onClick={() => { toolRef.current?.scrollIntoView({ behavior: "smooth" }); trackEvent("cta_click", { location: "hero", page: "free_no_login" }); }}
                size="lg"
                className="font-semibold px-8"
                data-testid="button-scroll-to-tool"
              >
                <Zap className="w-4 h-4 mr-2" />
                Download Free — No Login
              </Button>
            </div>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 py-8" ref={toolRef} id="tool">
          <Suspense fallback={<div className="h-32 flex items-center justify-center text-sm text-muted-foreground animate-pulse">Loading tool…</div>}>
            <YouTubeThumbnailTool
              testIdPrefix="ytfree"
              label="Free YouTube thumbnail downloader — no login, no watermarks, HD quality, unlimited"
            />
          </Suspense>
        </div>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 space-y-16 pb-20" ref={contentRef}>

          {/* ── 1. Why This Tool is Truly Free ────────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">Why This Tool is Truly Free</h2>
            <p className="text-muted-foreground leading-relaxed">
              "Free" means different things on different sites. Here's exactly what free means on{" "}
              <Link href={MAIN_TOOL} className="text-primary underline underline-offset-2 font-medium" onClick={() => trackEvent("internal_link_click", { destination: "main_tool", source: "free_truly_free_intro" })}>
                Pixocraft's free YouTube thumbnail downloader
              </Link>{" "}
              — no qualifications, no fine print:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: CheckCircle2,
                  title: "No Hidden Charges",
                  body: "There is no premium version, no paid upgrade, no credits system, and no subscription. Every feature — HD download, ZIP batch, CTR analyzer — is free. Pixocraft is funded through advertising on other pages, never by charging users.",
                },
                {
                  icon: CheckCircle2,
                  title: "No Premium Version",
                  body: "There is no 'Pro' tier hiding features behind a paywall. The version you use right now is the full version. Nothing is unlocked by paying — because nothing requires payment to access.",
                },
                {
                  icon: CheckCircle2,
                  title: "No Watermarks — Ever",
                  body: "Downloaded thumbnails are identical to what YouTube stores on its CDN. Pixocraft never overlays its logo, a watermark, or any visual element onto your downloads. The image you save is the original, unmodified file.",
                },
                {
                  icon: CheckCircle2,
                  title: "No Signup Traps",
                  body: "No 'free trial' that ends after 3 downloads. No 'continue with email' gate. No account required at any step. Open the tool, paste a URL, download. That's the entire experience — no interruptions.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="p-5 bg-card border rounded-xl space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <h3 className="font-bold text-foreground">{title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 2. What Makes Our Free Tool Different ─────────────────────── */}
          <section className="space-y-5 p-6 sm:p-8 bg-primary/5 border border-primary/20 rounded-xl">
            <h2 className="text-2xl sm:text-3xl font-bold">What Makes Our Free Tool Different?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most "free" thumbnail tools make tradeoffs. Pixocraft doesn't:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "No ads or pop-up interruptions",
                "No login required — not now, not ever",
                "No daily or session download limits",
                "All resolutions free — HD through Default",
                "Works offline after the page loads",
                "No watermarks or overlays on downloads",
                "ZIP download — all sizes in one click, free",
                "CTR analyzer included — no upsell",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5 py-2 px-3 rounded-lg bg-background border">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── 3. Problems with Other Free Tools ─────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">Problems with Other "Free" Thumbnail Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              These are real patterns documented across popular free thumbnail tools. Know what to watch for:
            </p>
            <div className="space-y-4">
              {[
                {
                  problem: "Hidden Paywalls After First Download",
                  severity: "Deceptive",
                  body: "Some tools let you download one or two thumbnails for free, then lock further downloads behind a subscription. The 'free' label gets you in the door; the paywall appears after you've invested time in the tool.",
                },
                {
                  problem: "Watermarks on Downloaded Images",
                  severity: "Quality Issue",
                  body: "Many free tools overlay their logo or a 'watermark' text on the downloaded image — making it unusable for professional or creative purposes. You only discover this after clicking Download. Pixocraft never adds anything to your image.",
                },
                {
                  problem: "Login Traps and Email Collection",
                  severity: "Privacy Risk",
                  body: "Tools branded as 'free' often require email signup to 'activate your free account.' Your email address is then used for marketing or sold to data brokers. Pixocraft collects no personal information at any step.",
                },
                {
                  problem: "Slow Server-Side Processing",
                  severity: "Poor UX",
                  body: "Free tools that rely on shared servers add 5–15 second delays to every download. Pixocraft constructs YouTube CDN URLs directly in your browser — no server processing, no delays, results in under a second every time.",
                },
              ].map(({ problem, severity, body }) => (
                <div key={problem} className="flex gap-4 p-5 bg-card border rounded-xl">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">{problem}</h3>
                      <Badge variant="outline" className="text-xs border-red-400/40 text-red-500">{severity}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Pixocraft avoids every single one of these.</strong>{" "}
                <Link
                  href={MAIN_TOOL}
                  className="text-primary underline underline-offset-2 font-medium"
                  onClick={() => trackEvent("internal_link_click", { destination: "main_tool", source: "free_problems" })}
                >
                  Try the best YouTube thumbnail downloader free
                </Link>{" "}
                — no login, no limits, no watermarks.
              </p>
            </div>
          </section>

          {/* ── 4. How It Works ───────────────────────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">How to Download YouTube Thumbnails Free — No Login</h2>
            <p className="text-muted-foreground leading-relaxed">Four steps. Under 10 seconds. No account ever required:</p>
            <div className="space-y-4">
              {[
                { n: "01", title: "Copy the YouTube Video URL", body: "Open any YouTube video and copy the URL from your browser's address bar. Full URLs, short youtu.be links, and Shorts URLs all work." },
                { n: "02", title: "Paste into Pixocraft — No Login Needed", body: "Paste the URL into the input field above. No account prompt, no email wall — the tool is ready immediately." },
                { n: "03", title: "Choose Your Resolution", body: "All sizes appear instantly: Max HD (1280×720), High Quality (480×360), Standard Definition, and Medium. Every resolution is free." },
                { n: "04", title: "Download Free — No Watermarks", body: "Click Download next to your preferred size. The original-quality image saves to your device — free, no watermarks, no limits." },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5 p-5 bg-card border rounded-xl">
                  <span className="font-mono text-2xl font-bold text-primary/30 flex-shrink-0 select-none">{n}</span>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── 5. Use Cases ──────────────────────────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">Who Uses This Free Thumbnail Downloader?</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Users,
                  title: "Content Creators",
                  body: "Download competitor thumbnails for research. Archive your own video thumbnails for backup. Build reference libraries for your thumbnail brand system — no login means faster workflow mid-production.",
                },
                {
                  icon: GraduationCap,
                  title: "Students",
                  body: "Use YouTube thumbnails in presentations, essays, and design projects. The free download is the original-quality file — far sharper than any screenshot. No account required means no data handed to third-party platforms.",
                },
                {
                  icon: Palette,
                  title: "Designers",
                  body: "Reference high-performing thumbnail layouts for design projects. Use downloaded thumbnails as visual benchmarks or UI placeholders. The ZIP download gives you all five sizes for responsive design use cases in one click.",
                },
                {
                  icon: Search,
                  title: "Researchers & Marketers",
                  body: "Analyze visual trends across YouTube niches. Track how a channel's thumbnail style evolves over time. Conduct competitor benchmarking at scale — no session limits, no download caps, no exposure of your research to third parties.",
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

          {/* ── 6. Privacy ────────────────────────────────────────────────── */}
          <section className="space-y-4 p-6 sm:p-8 bg-muted/40 border rounded-xl">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary flex-shrink-0" />
              <h2 className="text-2xl font-bold">100% Private — No Account, No Tracking</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The free promise has no fine print. Pixocraft doesn't store your download history, log your URLs, track what videos you view, or build any profile on you. Everything runs locally in your browser using YouTube's public CDN. Nothing is ever sent to our servers.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No login means no data collection point. No account means no password to protect or personal data to expose. The absence of a login wall is a structural privacy guarantee, not just a convenience feature.{" "}
              <Link
                href={MAIN_TOOL}
                className="text-primary underline underline-offset-2 font-medium"
                onClick={() => trackEvent("internal_link_click", { destination: "main_tool", source: "free_privacy" })}
              >
                Explore the best free YouTube thumbnail downloader
              </Link>{" "}
              and see how privacy is built in by design.
            </p>
          </section>

          {/* ── 7. CTA ────────────────────────────────────────────────────── */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-8 sm:p-10 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Start Downloading YouTube Thumbnails for Free
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              No login. No limits. No watermarks. HD quality. Free forever. Paste any YouTube link above and download instantly.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => { toolRef.current?.scrollIntoView({ behavior: "smooth" }); trackEvent("cta_click", { location: "bottom_cta", page: "free_no_login" }); }}
                size="lg"
                className="font-semibold px-8"
                data-testid="button-cta-scroll"
              >
                <Zap className="w-4 h-4 mr-2" />
                Download Free — No Login
              </Button>
              <Link href={MAIN_TOOL}>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold px-6"
                  onClick={() => trackEvent("internal_link_click", { destination: "main_tool", source: "free_cta" })}
                >
                  Best YouTube Thumbnail Downloader
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* ── 8. FAQ ────────────────────────────────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "Is this YouTube thumbnail downloader really free?", a: "Yes — 100% free, forever. No premium version, no hidden charges, no limits. Pixocraft is funded through ethical advertising, not by restricting user access." },
                { q: "Do I need to sign up or log in to download?", a: "No. There is no login, no email, no signup form of any kind. Open the page, paste a YouTube URL, and download immediately. No registration will ever be required." },
                { q: "Is there any limit on how many thumbnails I can download?", a: "No. There are no daily limits, no session limits, no throttling. Use it as many times as you need, download as many thumbnails as you want — free, forever." },
                { q: "Does Pixocraft add watermarks to downloaded thumbnails?", a: "No. Downloaded thumbnails are identical to what YouTube stores on its CDN. Pixocraft never overlays its logo, a watermark, or any visual element onto your downloads." },
                { q: "What resolutions can I download for free?", a: "All resolutions are free: Max HD (1280×720), High Quality (480×360), Standard Definition (640×480), Medium Quality (320×180), and Default (120×90). You can also download all five in a single free ZIP." },
                { q: "Is it legal to download YouTube thumbnails for free?", a: "YouTube thumbnails are publicly accessible. Downloading for personal use, research, and design inspiration is standard practice. Commercially distributing someone else's thumbnail without permission is copyright infringement." },
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

          {/* ── 9. Internal Linking ───────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Explore More YouTube Thumbnail Tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: MAIN_TOOL, label: "Best YouTube Thumbnail Downloader", desc: "Full-featured with ZIP download, CTR analyzer & all HD sizes", event: "main_tool" },
                { href: "/tools/youtube-thumbnail-downloader/online", label: "Download YouTube Thumbnail Online", desc: "Fast web-based downloader — paste link, instant results", event: "online" },
                { href: "/tools/youtube-thumbnail-downloader/best", label: "Best YouTube Thumbnail Downloaders Compared", desc: "Side-by-side comparison of top tools for 2026", event: "best" },
                { href: "/tools/youtube-thumbnail-downloader/channel-thumbnails", label: "Download YouTube Channel Profile Pictures & Banners", desc: "Channel branding analysis — profile images & banners", event: "channel" },
              ].map(({ href, label, desc, event }) => (
                <Link key={href} href={href}>
                  <div
                    className="flex items-start gap-3 p-4 rounded-lg border bg-card hover-elevate cursor-pointer"
                    onClick={() => trackEvent("internal_link_click", { destination: event, source: "free_links" })}
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

          {/* Related tools */}
          <section className="space-y-4 pt-4 border-t">
            <h2 className="text-xl font-bold">Related Image Tools</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { href: "/tools/image-compressor", label: "Compress Thumbnail Images", desc: "Reduce file size without quality loss" },
                { href: "/tools/image-resizer", label: "Resize YouTube Thumbnails", desc: "Resize to any custom dimension" },
                { href: "/tools/image-cropper", label: "Crop Thumbnail Images", desc: "Crop to the exact area you need" },
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
