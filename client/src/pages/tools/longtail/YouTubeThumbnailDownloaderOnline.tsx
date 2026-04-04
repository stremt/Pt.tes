import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import {
  CheckCircle2, XCircle, Download, Zap, Globe, Smartphone,
  ShieldCheck, Lock, ArrowRight, ChevronDown
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import YouTubeThumbnailTool from "@/components/tools/YouTubeThumbnailTool";

// ─── Constants ───────────────────────────────────────────────────────────────

const CANONICAL = "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader/online";
const MAIN_TOOL = "/tools/youtube-thumbnail-downloader";

// ─── Schema ──────────────────────────────────────────────────────────────────

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How to download YouTube thumbnail online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Copy the YouTube video URL, paste it into the input field on this page, click 'Get Thumbnails', choose your preferred resolution (HD, 4K, SD), and click Download. No login or software required.",
      },
    },
    {
      "@type": "Question",
      name: "Is the YouTube thumbnail downloader online safe to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — completely safe. We never store your YouTube links, never install software, and never collect personal data. Everything runs in your browser.",
      },
    },
    {
      "@type": "Question",
      name: "How to get YouTube thumbnail URL online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Use Pixocraft's online tool. Paste any YouTube video link, click Extract, and you'll see a 'Copy URL' button next to each thumbnail size. Click it to copy the direct image URL instantly.",
      },
    },
    {
      "@type": "Question",
      name: "Does this online YouTube thumbnail downloader work on mobile?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — the tool works perfectly on iPhone, Android, and all mobile browsers. No app installation needed.",
      },
    },
    {
      "@type": "Question",
      name: "Can I download HD or 4K YouTube thumbnails online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can download in Max HD (1280×720), High Quality (480×360), and other sizes available for each video. The highest available resolution is fetched automatically.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No account, no email, no login — nothing. Just paste the link and download.",
      },
    },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Download YouTube Thumbnail Online",
  description: "Download any YouTube video thumbnail online in HD/4K for free using Pixocraft. No login required.",
  totalTime: "PT30S",
  step: [
    {
      "@type": "HowToStep",
      name: "Copy YouTube URL",
      text: "Go to YouTube, open any video, and copy the URL from the address bar (or use the Share button).",
      position: 1,
    },
    {
      "@type": "HowToStep",
      name: "Paste into the tool",
      text: "Paste the YouTube link into the input field at the top of this page.",
      position: 2,
    },
    {
      "@type": "HowToStep",
      name: "Click Get Thumbnails",
      text: "Press the 'Get Thumbnails' button and thumbnails in all resolutions appear instantly.",
      position: 3,
    },
    {
      "@type": "HowToStep",
      name: "Download your thumbnail",
      text: "Select the resolution you want and click Download. The image saves to your device immediately.",
      position: 4,
    },
  ],
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "YouTube Thumbnail Downloader Online (Free, HD, No Login)",
  url: CANONICAL,
  description:
    "Download YouTube thumbnails online in HD & 4K, free, no login. Paste any YouTube link — get all thumbnail sizes instantly. Mobile friendly.",
  inLanguage: "en",
  isPartOf: { "@type": "WebSite", url: "https://tools.pixocraft.in" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function YouTubeThumbnailDownloaderOnline() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "YouTube Thumbnail Downloader Online (Free, HD, No Login) | Pixocraft",
    description:
      "Download YouTube thumbnail online in HD & 4K — free, no login, mobile friendly. Paste any link, preview all sizes & download instantly. Works on Chrome, Safari, Firefox.",
    keywords:
      "youtube thumbnail downloader online, download youtube thumbnail online, youtube thumbnail online free, youtube thumbnail hd download online, get youtube thumbnail online",
    canonicalUrl: CANONICAL,
    ogTitle: "YouTube Thumbnail Downloader Online (Free, HD, No Login)",
    ogDescription:
      "Download YouTube thumbnail online in HD & 4K — free, no login, mobile friendly. Paste any link, preview all sizes & download instantly.",
    ogType: "website",
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={webPageSchema} />

      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <Breadcrumb items={[
            { name: "Home", url: "/" },
            { name: "YouTube Thumbnail Downloader", url: MAIN_TOOL },
            { name: "Online" },
          ]} />
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 pt-6 pb-4 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            <Globe className="w-3 h-3" /> 100% Web-Based — No Install Needed
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Download YouTube Thumbnail Online
            <span className="block text-primary">(HD, 4K, Free)</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Paste any YouTube link → get thumbnails instantly. Free, no login, works on every device.
            The fastest <strong>online YouTube thumbnail downloader</strong> — no software, no fuss.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {[
              { icon: CheckCircle2, label: "No Login" },
              { icon: Lock, label: "100% Private" },
              { icon: Smartphone, label: "Works on Mobile" },
              { icon: Zap, label: "Instant Download" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs font-medium bg-muted/60 px-3 py-1.5 rounded-full">
                <Icon className="w-3.5 h-3.5 text-green-500" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL (above the fold) ────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 pb-10" ref={ctaRef} id="tool">
          <Card className="border-2 border-primary/20 shadow-sm">
            <CardContent className="pt-5 pb-6 space-y-1">
              <p className="text-sm font-semibold text-muted-foreground mb-3">
                Step 1 — Paste YouTube link &amp; download your thumbnail online:
              </p>
              <YouTubeThumbnailTool variant="compact" autoFocus={false} />
            </CardContent>
          </Card>
        </div>

        {/* ── CONTENT ──────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 space-y-16 pb-20">

          {/* Why Better */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Why This Online YouTube Thumbnail Downloader is Better
            </h2>
            <p className="text-muted-foreground mb-6">
              Most tools are cluttered with ads, slow servers, or hidden email walls.
              Pixocraft is different — built for creators who want speed and privacy.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, title: "No Ads, No Tracking", body: "Zero ads. Zero tracking scripts. Your downloads stay private — nothing is ever logged on our end." },
                { icon: Zap, title: "Instant Extraction", body: "Thumbnails appear in under a second. No server processing, no waiting — YouTube CDN is queried directly." },
                { icon: Download, title: "Download All as ZIP", body: "Need every size at once? Use our full tool to download all thumbnail resolutions in one click as a ZIP file." },
                { icon: Globe, title: "CTR Analysis (Unique)", body: "Our exclusive CTR Analyzer scores your thumbnail on contrast, text clarity, and face visibility — no other free tool does this." },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-lg border bg-card">
                  <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How To */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              How to Download YouTube Thumbnail Online — 4 Steps
            </h2>
            <p className="text-muted-foreground mb-6">
              You can <Link href={MAIN_TOOL} className="text-primary underline underline-offset-2 font-medium">download any YouTube thumbnail</Link> in seconds using our online tool:
            </p>
            <div className="space-y-4">
              {[
                { n: "1", title: "Copy the YouTube URL", body: "Open any YouTube video. Copy the link from the address bar — full URL, short link, or Shorts URL all work." },
                { n: "2", title: "Paste into the tool above", body: 'Paste it into the input field at the top of this page. You\'ll see it appear instantly in the "Paste YouTube URL" box.' },
                { n: "3", title: "Click \"Get Thumbnails\"", body: "Hit the button and all available thumbnail resolutions will appear: Max HD (1280×720), High (480×360), SD and more." },
                { n: "4", title: "Download your chosen size", body: "Select the resolution you need and click Download. The image saves directly to your device — no account needed." },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-4">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {n}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pixocraft vs Others Comparison */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Pixocraft vs Other Online Thumbnail Downloaders
            </h2>
            <p className="text-muted-foreground mb-6">
              See why creators choose Pixocraft as the best YouTube thumbnail downloader online.
            </p>
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold">Feature</th>
                    <th className="px-4 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="px-4 py-3 font-semibold text-muted-foreground">Other Tools</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["No Login Required", true, false],
                    ["Zero Ads", true, false],
                    ["HD / 4K Download", true, true],
                    ["Instant (No Server Wait)", true, false],
                    ["ZIP Download (All Sizes)", true, false],
                    ["CTR Thumbnail Analyzer", true, false],
                    ["Works on Mobile", true, true],
                    ["100% Private (No Tracking)", true, false],
                  ].map(([feature, pixo, other]) => (
                    <tr key={String(feature)} className="hover-elevate">
                      <td className="px-4 py-2.5 text-muted-foreground">{feature}</td>
                      <td className="px-4 py-2.5 text-center">
                        {pixo ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-muted-foreground mx-auto" />}
                      </td>
                      <td className="px-4 py-2.5 text-center">
                        {other ? <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" /> : <XCircle className="w-4 h-4 text-red-400 mx-auto" />}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* What is + Why Online */}
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-3">What is a YouTube Thumbnail Downloader Online?</h2>
              <p className="text-muted-foreground leading-relaxed">
                A <strong>YouTube thumbnail downloader online</strong> is a web-based tool that extracts the preview images
                from any YouTube video without requiring you to install apps or log into any account. YouTube stores
                thumbnails on their public CDN (img.youtube.com), and online tools like ours generate the direct URLs
                for each available resolution and let you save them with one click.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Why Use an Online Downloader Instead of an App?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Installing an app to download a thumbnail image is overkill. Online tools work on any device
                — phone, tablet, laptop — with no setup. They're also safer: reputable online tools never
                install anything on your device.{" "}
                <Link href={MAIN_TOOL} className="text-primary underline underline-offset-2 font-medium">
                  Our main YouTube thumbnail downloader
                </Link>{" "}
                runs entirely in your browser using the YouTube CDN — nothing goes through our servers.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">HD vs SD Thumbnail — Which Should You Download?</h2>
              <div className="overflow-x-auto rounded-lg border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/40">
                      <th className="text-left px-4 py-3 font-semibold">Size</th>
                      <th className="text-left px-4 py-3 font-semibold">Resolution</th>
                      <th className="text-left px-4 py-3 font-semibold">Best For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      ["Max HD", "1280×720", "Design work, printing, presentations"],
                      ["High Quality", "480×360", "Embedding in articles, blogs"],
                      ["Medium", "320×180", "App previews, small thumbnails"],
                      ["SD", "640×480", "Older content archiving"],
                      ["Default", "120×90", "Icon-sized previews"],
                    ].map(([size, res, use]) => (
                      <tr key={String(size)}>
                        <td className="px-4 py-2.5 font-medium">{size}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{res}</td>
                        <td className="px-4 py-2.5 text-muted-foreground">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Explore More Tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: MAIN_TOOL, label: "Best YouTube Thumbnail Downloader", desc: "Full-featured tool with ZIP download & CTR analyzer" },
                { href: "/tools/youtube-thumbnail-downloader/free-no-login", label: "Download YouTube Thumbnail HD — No Login", desc: "HD & 4K thumbnails with zero signup" },
                { href: "/tools/youtube-thumbnail-downloader/best", label: "Best YouTube Thumbnail Downloader", desc: "Compare features & pick the right tool" },
                { href: "/tools/youtube-thumbnail-downloader/channel-thumbnails", label: "YouTube Channel Thumbnails", desc: "Download channel art and profile images" },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href}>
                  <div className="flex items-start gap-3 p-4 rounded-lg border bg-card hover-elevate cursor-pointer">
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

          {/* FAQ */}
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                {
                  q: "How to download YouTube thumbnail online?",
                  a: "Paste the YouTube video URL into the tool above, click 'Get Thumbnails', choose your size (HD, 4K, SD), and click Download. Done in under 5 seconds.",
                },
                {
                  q: "Is the YouTube thumbnail downloader online safe?",
                  a: "Yes — completely safe. We don't install software, don't store your URLs, and don't track you. Everything happens in your browser via YouTube's public CDN.",
                },
                {
                  q: "How to get YouTube thumbnail URL online?",
                  a: "Use our tool. After extracting thumbnails, each size has a 'Copy URL' button. Click it to get the direct image URL you can use anywhere.",
                },
                {
                  q: "Can I download HD or 4K thumbnails online?",
                  a: "Yes. We fetch Max HD (1280×720) as the highest available resolution. Note: not all videos have 4K thumbnails — it depends on the uploader's settings.",
                },
                {
                  q: "Does this work on mobile?",
                  a: "Yes, works on iPhone, Android, and all mobile browsers. No app required — just open this page and paste your YouTube link.",
                },
                {
                  q: "Do I need to log in or create an account?",
                  a: "No. There's no login, no account, no email. Just paste a YouTube link and download. Forever free.",
                },
              ].map(({ q, a }) => (
                <details key={q} className="group border rounded-lg overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer font-medium text-sm select-none list-none">
                    {q}
                    <ChevronDown className="w-4 h-4 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0 ml-2" />
                  </summary>
                  <div className="px-4 pb-4 text-sm text-muted-foreground">{a}</div>
                </details>
              ))}
            </div>
          </section>

          {/* CTA block */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Try It Now — Free &amp; Online</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Paste any YouTube link and download HD thumbnail instantly — no login, no ads, no limits.
              The best <strong>online YouTube thumbnail downloader</strong> is right here.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => ctaRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="font-semibold px-6"
                data-testid="button-cta-scroll-to-tool"
              >
                <Zap className="w-4 h-4 mr-2" />
                Download Thumbnail Online
              </Button>
              <Link href={MAIN_TOOL}>
                <Button variant="outline" className="font-semibold px-6">
                  Full Tool (ZIP + Analyzer)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
