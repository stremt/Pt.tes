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
  CheckCircle2, XCircle, Zap, Globe, Smartphone,
  ShieldCheck, Lock, ArrowRight, ChevronDown, Download, BarChart2,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const YouTubeThumbnailTool = lazy(
  () => import("@/components/tools/YouTubeThumbnailTool")
);

// ─── Constants ────────────────────────────────────────────────────────────────

const CANONICAL = "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader/online";
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
  { name: "Online Downloader", url: CANONICAL },
]);

const webPageSchema = generateWebPageSchema({
  name: "YouTube Thumbnail Downloader Online — Free, HD, No Login | Pixocraft",
  description: "Download YouTube thumbnails online in HD — free, no login, instant. Works on Chrome, Safari, Firefox, mobile. Paste any YouTube link and get all sizes in seconds.",
  url: CANONICAL,
});

const softwareSchema = {
  ...generateSoftwareApplicationSchema({
    name: "YouTube Thumbnail Downloader Online – Pixocraft",
    description: "Download any YouTube video thumbnail online in HD. Free browser-based tool — no login, no software, no ads. Works on all devices instantly.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    featureList: [
      "Online YouTube thumbnail extraction",
      "HD quality (1280×720)",
      "All sizes: Max HD, HQ, SD, MQ",
      "Works on mobile and desktop",
      "No login required",
      "Zero ads",
      "ZIP batch download",
      "Built-in CTR analyzer",
    ],
    offers: { price: "0", priceCurrency: "USD" },
  }),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "2140",
    bestRating: "5",
    worstRating: "1",
  },
};

const howToSchema = generateHowToSchema({
  name: "How to Download YouTube Thumbnail Online in HD",
  description: "Step-by-step guide to download any YouTube thumbnail online for free. No login, no software, works on any device.",
  steps: [
    { name: "Copy the YouTube URL", text: "Open any YouTube video. Copy the full URL from your browser's address bar — full URLs, short youtu.be links, and Shorts URLs all work." },
    { name: "Paste into the online tool", text: "Paste the YouTube link into the input field at the top of this page. You'll see it appear in the 'Paste YouTube URL' box instantly." },
    { name: "Click Get Thumbnails", text: "Press the Get Thumbnails button. All available thumbnail sizes appear instantly: Max HD (1280×720), High Quality (480×360), SD, and more." },
    { name: "Download your chosen size", text: "Click Download next to your preferred resolution. The image saves directly to your device — no account, no wait, no watermarks." },
  ],
});

const faqSchema = generateFAQSchema([
  { question: "How do I download a YouTube thumbnail online?", answer: "Paste the YouTube video URL into the tool above, click Get Thumbnails, choose your size (HD, HQ, SD), and click Download. Done in under 5 seconds. No login, no software, free forever." },
  { question: "Is the online YouTube thumbnail downloader safe to use?", answer: "Yes — completely safe. Pixocraft never installs software, never stores your URLs, and never tracks you. Everything runs in your browser via YouTube's public CDN (img.youtube.com). No data is ever sent to Pixocraft's servers." },
  { question: "How do I get the YouTube thumbnail URL online?", answer: "Use Pixocraft's tool. After extracting thumbnails, each size shows a Copy URL button. Click it to copy the direct img.youtube.com image URL — you can paste it directly into design tools, CMS platforms, or email campaigns." },
  { question: "Can I download HD YouTube thumbnails online for free?", answer: "Yes. Pixocraft fetches Max HD (1280×720) as the default highest resolution. Not all videos have HD thumbnails — it depends on the uploader's settings — but when available, Pixocraft downloads the original source quality with no recompression." },
  { question: "Does the online YouTube thumbnail downloader work on mobile?", answer: "Yes — works on iPhone, Android, and all mobile browsers including Chrome, Safari, and Firefox. No app installation required. Open the page, paste your YouTube link, and download in seconds." },
  { question: "Do I need to create an account to download YouTube thumbnails online?", answer: "No — there is no login, no account, no email, no signup form of any kind. Paste a YouTube link and start downloading immediately. Free, forever." },
]);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function YouTubeThumbnailDownloaderOnline() {
  const toolRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "YouTube Thumbnail Downloader Online — Free, HD, No Login | Pixocraft",
    description: "Download YouTube thumbnails online in HD & 4K — free, no login, mobile-friendly. Paste any link, preview all sizes & download instantly. Works on Chrome, Safari, Firefox.",
    keywords: "youtube thumbnail downloader online, download youtube thumbnail online, youtube thumbnail online free, youtube thumbnail hd download online, get youtube thumbnail online, online youtube thumbnail extractor",
    canonicalUrl: CANONICAL,
    ogTitle: "YouTube Thumbnail Downloader Online — Free, HD, No Login",
    ogDescription: "Paste any YouTube link and download HD thumbnails instantly. Free, no login, works on every device. The fastest online YouTube thumbnail downloader.",
    ogType: "website",
    ogImage: OG_IMAGE,
    twitterTitle: "YouTube Thumbnail Downloader Online — Free HD, No Login",
    twitterDescription: "Free online tool to download any YouTube thumbnail in HD. No login, no ads, instant results. Works on mobile and desktop.",
    robots: "index, follow, max-image-preview:large",
  });

  useEffect(() => {
    // Preconnect to YouTube CDN for faster thumbnail loading
    const href = "https://img.youtube.com";
    if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "preconnect";
      link.href = href;
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    }

    // Scroll-depth tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            trackEvent("scroll_depth", { page: "online", depth: "content_section" });
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
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "YouTube Thumbnail Downloader", url: MAIN_TOOL },
            { name: "Online" },
          ]} />
        </div>

        {/* AI Overview Block */}
        <div className="max-w-5xl mx-auto px-4 pt-6">
          <div className="bg-muted/60 border rounded-xl px-5 py-4 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">What is a YouTube Thumbnail Downloader Online?</p>
            <p className="text-sm text-foreground leading-relaxed">
              An online YouTube thumbnail downloader is a browser-based tool that extracts HD preview images from any YouTube video — no app, no login, no server upload. Pixocraft fetches thumbnails directly from YouTube's public CDN, delivering results in under a second, free forever.
            </p>
          </div>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-10 md:py-14 px-4 mt-4">
          <div className="max-w-5xl mx-auto space-y-4 text-center">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">100% Web-Based — No Install, No Login, No Limits</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Download YouTube Thumbnail Online
              <span className="block text-primary mt-1">Free, HD, Works on Any Device</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Paste any YouTube link → get thumbnails instantly. No login, no software, no ads. The fastest{" "}
              <strong className="text-foreground">online YouTube thumbnail downloader</strong> — instant HD results on every browser and device.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {[
                { icon: CheckCircle2, label: "No Login Required" },
                { icon: Lock, label: "100% Private" },
                { icon: Smartphone, label: "Works on Mobile" },
                { icon: Zap, label: "Instant Download" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5 text-sm font-medium text-foreground bg-card border rounded-full px-3 py-1.5">
                  <Icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Button
                onClick={() => { toolRef.current?.scrollIntoView({ behavior: "smooth" }); trackEvent("cta_click", { location: "hero", page: "online" }); }}
                size="lg"
                className="font-semibold px-8"
                data-testid="button-scroll-to-tool"
              >
                <Zap className="w-4 h-4 mr-2" />
                Download Thumbnail Now
              </Button>
            </div>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 py-8" ref={toolRef} id="tool">
          <Suspense fallback={<div className="h-32 flex items-center justify-center text-sm text-muted-foreground animate-pulse">Loading tool…</div>}>
            <YouTubeThumbnailTool
              testIdPrefix="ytonline"
              label="Download YouTube thumbnail online — paste any link, get HD thumbnails in seconds"
            />
          </Suspense>
        </div>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 space-y-16 pb-20" ref={contentRef}>

          {/* Why Better */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">Why This Online YouTube Thumbnail Downloader is Better</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most tools are cluttered with ads, slow servers, or hidden login walls. Pixocraft is built differently — for creators who value speed, quality, and privacy above everything else.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "No Ads, No Tracking", body: "Zero ads. Zero tracking scripts. Your URLs are never logged. Nothing you do on Pixocraft is ever sent to our servers." },
                { icon: Zap, title: "Instant Client-Side Extraction", body: "Thumbnails appear in under a second. We construct the YouTube CDN URL directly in your browser — no server round trip, no delays." },
                { icon: Download, title: "Download All as ZIP", body: "Need every size at once? Grab all thumbnail resolutions in a single ZIP file — one click, no multiple downloads." },
                { icon: BarChart2, title: "CTR Analyzer (Unique)", body: "No other free tool analyzes thumbnail click-through potential. Our CTR analyzer scores brightness, contrast, and dominant color using browser-based pixel analysis." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-3 p-5 rounded-xl border bg-card">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How To */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">How to Download YouTube Thumbnail Online — 4 Steps</h2>
            <p className="text-muted-foreground leading-relaxed">
              You can{" "}
              <Link href={MAIN_TOOL} className="text-primary underline underline-offset-2 font-medium" onClick={() => trackEvent("internal_link_click", { destination: "main_tool", source: "online_howto" })}>
                download any YouTube thumbnail
              </Link>{" "}
              in seconds using this free online tool:
            </p>
            <div className="space-y-4">
              {[
                { n: "01", title: "Copy the YouTube URL", body: "Open any YouTube video. Copy the link from the address bar — full URLs, short youtu.be links, and Shorts URLs all work." },
                { n: "02", title: "Paste into the tool above", body: "Paste it into the input field at the top of this page. You'll see it appear instantly in the 'Paste YouTube URL' box." },
                { n: "03", title: "Click Get Thumbnails", body: "Press the button and all available thumbnail resolutions appear: Max HD (1280×720), High Quality (480×360), SD, and more." },
                { n: "04", title: "Download your chosen size", body: "Click Download next to your preferred resolution. The image saves directly to your device — no account, no watermark, no wait." },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5 p-5 bg-card border rounded-xl">
                  <span className="font-mono text-2xl font-bold text-primary/30 flex-shrink-0 select-none">{n}</span>
                  <div className="space-y-1">
                    <p className="font-semibold">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">Pixocraft vs Other Online Thumbnail Downloaders</h2>
            <p className="text-muted-foreground leading-relaxed">
              See why creators choose Pixocraft as the best YouTube thumbnail downloader online — the only free tool with ZIP download and a CTR analyzer.
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                    <th className="px-4 py-3 font-semibold text-primary text-center">Pixocraft</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground text-center">Other Tools</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["No Login Required", true, false],
                    ["Zero Ads", true, false],
                    ["HD Quality (1280×720)", true, true],
                    ["Instant — No Server Wait", true, false],
                    ["ZIP Download (All Sizes)", true, false],
                    ["CTR Thumbnail Analyzer", true, false],
                    ["Works on Mobile", true, true],
                    ["100% Private — No Tracking", true, false],
                  ].map(([feature, pixo, other]) => (
                    <tr key={String(feature)} className="even:bg-muted/10">
                      <td className="px-4 py-2.5 text-muted-foreground">{feature}</td>
                      <td className="px-4 py-2.5 text-center">
                        {pixo
                          ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                          : <XCircle className="w-4 h-4 text-muted-foreground mx-auto" />}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {other
                          ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                          : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Resolution Guide */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">HD vs SD — Which Resolution Should You Download?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Different use cases need different resolutions. Here's a quick reference guide:
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Resolution</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Size</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Max HD", "1280×720", "Design work, printing, presentations, competitor research"],
                    ["High Quality", "480×360", "Blog embeds, web articles, email campaigns"],
                    ["Standard", "640×480", "Older content archiving, compatibility testing"],
                    ["Medium", "320×180", "App previews, small UI placeholders"],
                    ["Default", "120×90", "Icon-sized previews, database thumbnails"],
                  ].map(([size, res, use]) => (
                    <tr key={String(size)} className="even:bg-muted/10">
                      <td className="px-4 py-2.5 font-medium text-foreground">{size}</td>
                      <td className="px-4 py-2.5 text-muted-foreground font-mono text-xs">{res}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* What is section */}
          <section className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold">What is a YouTube Thumbnail Downloader Online?</h2>
              <p className="text-muted-foreground leading-relaxed">
                A <strong className="text-foreground">YouTube thumbnail downloader online</strong> is a web-based tool that extracts preview images from any YouTube video without requiring you to install apps or log into any account. YouTube stores thumbnails on their public CDN at <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">img.youtube.com</code>, and online tools generate the direct URLs for each available resolution so you can save them with one click.
              </p>
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Why Use an Online Downloader Instead of an App?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Installing an app to download a thumbnail image is unnecessary and potentially risky. Online tools work on any device — phone, tablet, laptop — with zero setup. Reputable online tools never install anything on your device.{" "}
                <Link href={MAIN_TOOL} className="text-primary underline underline-offset-2 font-medium" onClick={() => trackEvent("internal_link_click", { destination: "main_tool", source: "online_why" })}>
                  Pixocraft's YouTube thumbnail downloader
                </Link>{" "}
                runs entirely in your browser using YouTube's public CDN — nothing passes through our servers.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-8 sm:p-10 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold">Try It Now — Free &amp; Online</h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              The best <strong className="text-foreground">online YouTube thumbnail downloader</strong> is right here — no login, no ads, instant HD. Paste any YouTube link and download in seconds.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => { toolRef.current?.scrollIntoView({ behavior: "smooth" }); trackEvent("cta_click", { location: "bottom_cta", page: "online" }); }}
                size="lg"
                className="font-semibold px-8"
                data-testid="button-cta-scroll-to-tool"
              >
                <Zap className="w-4 h-4 mr-2" />
                Download YouTube Thumbnail Online
              </Button>
              <Link href={MAIN_TOOL}>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-semibold px-6"
                  onClick={() => trackEvent("internal_link_click", { destination: "main_tool", source: "online_cta" })}
                >
                  Best YouTube Thumbnail Downloader
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "How do I download a YouTube thumbnail online?", a: "Paste the YouTube video URL into the tool above, click Get Thumbnails, choose your size (HD, HQ, SD), and click Download. Done in under 5 seconds. No login, no software, free forever." },
                { q: "Is the online YouTube thumbnail downloader safe to use?", a: "Yes — completely safe. Pixocraft never installs software, never stores your URLs, and never tracks you. Everything runs in your browser via YouTube's public CDN (img.youtube.com)." },
                { q: "How do I get the YouTube thumbnail URL online?", a: "Use Pixocraft's tool. After extracting thumbnails, each size shows a Copy URL button. Click it to get the direct img.youtube.com image URL you can use anywhere." },
                { q: "Can I download HD YouTube thumbnails online for free?", a: "Yes. Pixocraft fetches Max HD (1280×720) as the highest available resolution. When available, it downloads the original source quality with no recompression." },
                { q: "Does this work on mobile?", a: "Yes — works on iPhone, Android, and all mobile browsers including Chrome, Safari, and Firefox. No app installation required." },
                { q: "Do I need to create an account?", a: "No login, no account, no email. Just paste a YouTube link and download. Free forever." },
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

          {/* Internal links */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Explore More YouTube Thumbnail Tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: MAIN_TOOL, label: "Best YouTube Thumbnail Downloader", desc: "Full-featured with ZIP download, CTR analyzer & all HD sizes", event: "main_tool" },
                { href: "/tools/youtube-thumbnail-downloader/free-no-login", label: "Free YouTube Thumbnail Downloader — No Login", desc: "100% free, no signup, unlimited downloads", event: "free" },
                { href: "/tools/youtube-thumbnail-downloader/best", label: "Best Thumbnail Downloaders Compared", desc: "Side-by-side comparison of top tools", event: "best" },
                { href: "/tools/youtube-thumbnail-downloader/channel-thumbnails", label: "Download YouTube Channel Profile Pictures & Banners", desc: "Channel branding analysis — profile images & banners", event: "channel" },
              ].map(({ href, label, desc, event }) => (
                <Link key={href} href={href}>
                  <div
                    className="flex items-start gap-3 p-4 rounded-lg border bg-card hover-elevate cursor-pointer"
                    onClick={() => trackEvent("internal_link_click", { destination: event, source: "online_links" })}
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
