import { lazy, Suspense, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import {
  ArrowRight, Users, CheckCircle2, Zap, Lock, Smartphone, ChevronDown,
} from "lucide-react";

const MAIN_TOOL = "/tools/youtube-thumbnail-downloader";

const YouTubeThumbnailTool = lazy(
  () => import("@/components/tools/YouTubeThumbnailTool")
);

const TRUST_BADGES = [
  { icon: Users, label: "Any Channel" },
  { icon: CheckCircle2, label: "No Login" },
  { icon: Lock, label: "100% Private" },
  { icon: Smartphone, label: "Mobile Ready" },
];

export default function YouTubeThumbnailDownloaderChannels() {
  const toolRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Download YouTube Channel Thumbnails - Creator Profile Images | Pixocraft",
    description:
      "Download YouTube channel thumbnails, profile pictures, and banner images. Works for any YouTube channel instantly.",
    canonicalUrl:
      "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader/channel-thumbnails",
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-4 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            <Users className="w-3 h-3" /> Works for Any Public YouTube Channel
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Download YouTube Channel Thumbnails
            <span className="block text-primary">&amp; Profile Images</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Extract YouTube channel profile pictures, banner images, and video thumbnails instantly.
            Free, no login, works on any device. Perfect for research, analysis, and backup.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-1.5 text-xs font-medium bg-muted/60 px-3 py-1.5 rounded-full"
              >
                <Icon className="w-3.5 h-3.5 text-green-500" />
                {label}
              </div>
            ))}
          </div>

          {/* Scroll CTA */}
          <div className="pt-2">
            <Button
              onClick={() => toolRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="font-semibold px-6"
              data-testid="button-scroll-to-tool"
            >
              <Zap className="w-4 h-4 mr-2" />
              Try Tool Now
            </Button>
          </div>
        </div>

        {/* ── TOOL (above the fold) ──────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-4 pb-10 pt-4" ref={toolRef} id="tool">
          <Suspense
            fallback={
              <div className="h-20 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
                Loading tool…
              </div>
            }
          >
            <YouTubeThumbnailTool testIdPrefix="ytchannel" />
          </Suspense>
        </div>

        {/* ── CONTENT ────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 space-y-12 pb-20">

          <section>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Users, title: "Channel Specific", body: "Any YouTube channel supported" },
                    { icon: CheckCircle2, title: "Multiple Formats", body: "Profile, banner, and video thumbnails" },
                    { icon: Zap, title: "High Resolution", body: "Best quality available" },
                  ].map(({ icon: Icon, title, body }) => (
                    <div key={title} className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Download Channel Thumbnails for Research &amp; Analysis</h2>
            <p className="text-muted-foreground mb-6">
              YouTube channel thumbnails (profile pictures) are crucial branding assets. Successful creators invest heavily
              in professional channel images that stand out and communicate their content quality. Our channel thumbnail
              downloader lets you extract these images for competitive analysis, design inspiration, or archival purposes.
            </p>
            <div>
              <h3 className="text-lg font-semibold mb-3">Why Download Channel Thumbnails?</h3>
              <ul className="space-y-3 text-muted-foreground">
                {[
                  ["Competitive Analysis", "Study what successful channels look like and identify design patterns"],
                  ["Design Inspiration", "Collect reference images for your own channel branding"],
                  ["Backup Your Assets", "Download your own channel images for safekeeping"],
                  ["Research & Documentation", "Archive channel images for content analysis or reporting"],
                ].map(([title, body]) => (
                  <li key={String(title)} className="flex gap-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span><strong>{title}:</strong> {body}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How to Download Channel Thumbnails</h2>
            <div className="space-y-6">
              {[
                { n: "1", title: "Copy Channel URL", body: "Go to any YouTube channel and copy the URL from your browser's address bar" },
                { n: "2", title: "Paste Into Our Tool", body: "Enter the channel URL and our downloader extracts all available images" },
                { n: "3", title: "Download in HD", body: "Choose profile picture, banner, or video thumbnail and download instantly" },
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

          <section>
            <h2 className="text-2xl font-bold mb-4">Common Mistakes When Downloading Channel Images</h2>
            <div className="space-y-4">
              {[
                { title: "Using Channel Handles Instead of URLs", body: "Always use the full channel URL from the address bar, not the @ handle or channel name." },
                { title: "Ignoring Resolution Options", body: "Channel thumbnails come in different sizes. Download the highest resolution for best quality." },
                { title: "Not Checking Copyright", body: "Channel images belong to creators. Use downloads for analysis only, not reproduction." },
              ].map(({ title, body }) => (
                <Card key={title}>
                  <CardHeader>
                    <CardTitle className="text-base">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{body}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Privacy When Downloading Channel Images</h2>
            <p className="text-muted-foreground">
              When you download channel thumbnails using our tool, your activity is completely private.
              We don't log which channels you analyze, don't store your downloads, and don't track your research.
              Your competitive analysis stays between you and your device.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "Can I download any YouTube channel's images?", a: "Yes, any public YouTube channel. If the channel is public, its images are publicly available." },
                { q: "What image formats are available?", a: "Typically JPEG format in multiple resolutions. Profile pictures, banners, and video thumbnails." },
                { q: "Can I use downloaded channel images commercially?", a: "No — channel images are owned by the channel creator. Use only for research and analysis." },
                { q: "How large are channel thumbnail files?", a: "Small — usually 50KB to 500KB depending on resolution. Downloads are fast." },
                { q: "Do I need a YouTube account to download?", a: "No. Public channel images don't require any account or authentication." },
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

          {/* Internal links */}
          <section>
            <h2 className="text-xl font-bold mb-4">Explore More YouTube Thumbnail Tools</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: MAIN_TOOL, label: "YouTube Thumbnail Downloader (Main Tool)", desc: "Full-featured with ZIP download & CTR analyzer" },
                { href: "/tools/youtube-thumbnail-downloader/free-no-login", label: "Free — No Login", desc: "100% free, no signup required" },
                { href: "/tools/youtube-thumbnail-downloader/online", label: "Online Downloader", desc: "Fast web-based version, no install" },
                { href: "/tools/youtube-thumbnail-downloader/best", label: "Best Thumbnail Downloaders", desc: "Compare features & find the right tool" },
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

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Download YouTube Thumbnails Now</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Paste any YouTube video or channel link — get HD thumbnails instantly.
              Free, no login, works on every device.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => toolRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="font-semibold px-6"
                data-testid="button-cta-scroll"
              >
                <Zap className="w-4 h-4 mr-2" />
                Try Tool Now
              </Button>
              <Link href={MAIN_TOOL}>
                <Button variant="outline" className="font-semibold px-6">
                  Full Tool (ZIP + Analyzer)
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          <p className="text-center text-sm text-muted-foreground border-t pt-8">
            Creator Tools That Respect Your Privacy — Pixocraft Tools
          </p>
        </div>
      </div>
    </>
  );
}
