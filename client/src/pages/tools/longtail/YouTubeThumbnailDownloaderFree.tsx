import { lazy, Suspense, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Lock, Zap, Shield, CheckCircle2, Smartphone, ChevronDown } from "lucide-react";

const MAIN_TOOL = "/tools/youtube-thumbnail-downloader";

const YouTubeThumbnailTool = lazy(
  () => import("@/components/tools/YouTubeThumbnailTool")
);

const TRUST_BADGES = [
  { icon: Lock, label: "100% Free" },
  { icon: CheckCircle2, label: "No Login" },
  { icon: Smartphone, label: "Mobile Ready" },
  { icon: Zap, label: "Instant" },
];

export default function YouTubeThumbnailDownloaderFree() {
  const toolRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Free YouTube Thumbnail Downloader - No Login Required | Pixocraft",
    description:
      "Download YouTube thumbnails for free without any signup. 100% offline, instant access, all resolutions available. Works in your browser.",
    canonicalUrl:
      "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader/free-no-login",
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-4 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            <Lock className="w-3 h-3" /> Zero Sign-Up — Completely Free Forever
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Free YouTube Thumbnail Downloader
            <span className="block text-primary">— No Login, No Limits</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get high-quality YouTube thumbnails instantly — no account, no email, no payment.
            Works directly in your browser on any device.
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
        <div className="max-w-4xl mx-auto px-4 pb-10 pt-4" ref={toolRef} id="tool">
          <Card className="border-2 border-primary/20 shadow-sm">
            <CardContent className="pt-5 pb-6">
              <p className="text-xs font-semibold text-muted-foreground mb-3">
                Paste YouTube link → Get thumbnails instantly
              </p>
              <Suspense
                fallback={
                  <div className="h-20 flex items-center justify-center text-sm text-muted-foreground animate-pulse">
                    Loading tool…
                  </div>
                }
              >
                <YouTubeThumbnailTool variant="compact" testIdPrefix="ytfree" />
              </Suspense>
            </CardContent>
          </Card>
          <p className="text-center text-xs text-muted-foreground mt-3">
            Want full features? {" "}
            <Link href={MAIN_TOOL} className="text-primary underline underline-offset-2 font-medium">
              Use the best YouTube thumbnail downloader
            </Link>
            {" "}— ZIP download, CTR analyzer &amp; more.
          </p>
        </div>

        {/* ── CONTENT ────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 space-y-12 pb-20">

          <section>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">100% Free Forever</h3>
                      <p className="text-sm text-muted-foreground">No hidden charges, watermarks, or paid upgrades</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Instant Downloads</h3>
                      <p className="text-sm text-muted-foreground">Get all quality versions in seconds</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">No Sign-Up Ever</h3>
                      <p className="text-sm text-muted-foreground">Start downloading immediately</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Why Choose Our Free YouTube Thumbnail Downloader?</h2>
            <p className="text-muted-foreground mb-6">
              Many online YouTube thumbnail tools come with strings attached — watermarks, slow speeds, hidden subscriptions, or intrusive ads.
              Our completely free solution removes all barriers. You need thumbnails? We get it directly for you, instantly.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Perfect for Content Creators</h3>
                <p className="text-muted-foreground">
                  Whether you're analyzing competitor thumbnails, creating backup copies of your own uploads, or researching thumbnail designs,
                  our free tool handles everything. Download every resolution — maximum quality (1280×720), standard definition, and mobile versions all in one go.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Works Offline After Loading</h3>
                <p className="text-muted-foreground">
                  Once the page loads, you can disconnect from the internet and continue downloading. Perfect for privacy-conscious users who want
                  zero tracking and complete control over their downloads. Your data never touches our servers.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How Our Free Downloader Works</h2>
            <div className="space-y-6">
              {[
                { n: "1", title: "Paste the YouTube Link", body: "Copy and paste any YouTube video URL into our downloader" },
                { n: "2", title: "View All Available Resolutions", body: "See every thumbnail quality available — HD, SD, mobile versions" },
                { n: "3", title: "Download Instantly", body: "Click download and save any resolution to your device" },
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
            <h2 className="text-2xl font-bold mb-4">Common Mistakes to Avoid</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Downloading Low Quality by Mistake</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Always choose the highest resolution (usually 1280×720) for professional use. Our tool clearly labels each quality level.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Using Incorrect Video URLs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Full YouTube video links work best. Shortened links (youtu.be) also work, but avoid playlist URLs.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Privacy You Can Trust</h2>
            <p className="text-muted-foreground">
              Our free downloader respects your privacy completely. We don't store your downloads, track what videos you view, or build profiles on you.
              Everything happens locally in your browser — nothing goes to our servers. Download with confidence knowing your activity remains private.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "Is it really completely free?", a: "Yes, 100% free. No hidden costs, no premium features, no ads. Use unlimited times." },
                { q: "Do I need an account to download?", a: "No account needed. No email, no password, no signup form. Start downloading immediately." },
                { q: "What video formats are supported?", a: "Standard YouTube videos work. Thumbnails are downloaded as JPG images in multiple resolutions." },
                { q: "Will it work offline?", a: "After loading, yes. The tool works offline once the page has fully loaded in your browser." },
                { q: "Is downloading thumbnails legal?", a: "YouTube thumbnails are publicly available. Downloading for personal use or analysis is standard practice." },
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
                { href: MAIN_TOOL, label: "Best YouTube Thumbnail Downloader", desc: "Full-featured tool with ZIP download & CTR analyzer" },
                { href: "/tools/youtube-thumbnail-downloader/online", label: "Download Thumbnail Online", desc: "Fast online version — no install needed" },
                { href: "/tools/youtube-thumbnail-downloader/best", label: "Best Thumbnail Downloaders Compared", desc: "Compare features & find the right tool" },
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

          {/* CTA */}
          <section className="rounded-2xl bg-primary/5 border border-primary/20 p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">Start Downloading — Free &amp; No Login</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Paste any YouTube link and download HD thumbnails instantly.
              100% free, no account needed, forever.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                onClick={() => toolRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="font-semibold px-6"
                data-testid="button-cta-scroll"
              >
                <Zap className="w-4 h-4 mr-2" />
                Try Free Tool Now
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
            Part of Pixocraft Tools — Free, Fast, and Privacy-First
          </p>
        </div>
      </div>
    </>
  );
}
