import { lazy, Suspense, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import {
  ArrowRight, Star, Zap, Shield, Lock, CheckCircle2, Smartphone, ChevronDown,
} from "lucide-react";

const MAIN_TOOL = "/tools/youtube-thumbnail-downloader";

const YouTubeThumbnailTool = lazy(
  () => import("@/components/tools/YouTubeThumbnailTool")
);

const TRUST_BADGES = [
  { icon: Star, label: "Top Rated" },
  { icon: CheckCircle2, label: "No Login" },
  { icon: Lock, label: "100% Private" },
  { icon: Smartphone, label: "All Devices" },
];

export default function YouTubeThumbnailDownloaderBest() {
  const toolRef = useRef<HTMLDivElement>(null);

  useSEO({
    title: "Best YouTube Thumbnail Downloader Online - Compare Tools | Pixocraft",
    description:
      "Find the best YouTube thumbnail downloader. Compare features, speed, privacy. Free, no signup, works in browser.",
    canonicalUrl:
      "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader/best",
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        {/* ── Hero ───────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 pt-10 pb-4 text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
            <Star className="w-3 h-3" /> #1 Rated — Fast, Private, Free
          </div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Best YouTube Thumbnail Downloader
            <span className="block text-primary">— Compare &amp; Find the Right Tool</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Not all thumbnail downloaders are equal. Pixocraft is the best — fastest speed, all resolutions,
            zero ads, 100% private. No signup, no download, works everywhere.
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
            <YouTubeThumbnailTool testIdPrefix="ytbest" />
          </Suspense>
        </div>

        {/* ── CONTENT ────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 space-y-12 pb-20">

          <section>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { icon: Star, title: "Fast Speed", body: "Instant downloads" },
                    { icon: Zap, title: "No Limits", body: "Unlimited use" },
                    { icon: Shield, title: "Safe & Secure", body: "No malware" },
                    { icon: Lock, title: "Private Always", body: "Zero tracking" },
                  ].map(({ icon: Icon, title, body }) => (
                    <div key={title} className="flex items-start gap-3">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{title}</h3>
                        <p className="text-xs text-muted-foreground">{body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">What Makes the Best YouTube Thumbnail Downloader?</h2>
            <div className="space-y-6">
              {[
                { n: "1", title: "Speed & Reliability", body: "The best downloader delivers thumbnails in seconds, not minutes. It works consistently regardless of video popularity or server load." },
                { n: "2", title: "All Resolution Options", body: "Quality matters. The best tools offer maximum quality (1280×720), standard definition, and mobile versions — not just low-res previews." },
                { n: "3", title: "No Signup Required", body: "Best tools work immediately. No email verification, no passwords, no complicated accounts to manage." },
                { n: "4", title: "Privacy Protection", body: "Your downloads shouldn't be tracked. The best tools don't collect data, don't store your history, don't build profiles." },
                { n: "5", title: "Works Offline", body: "After loading, the best tools function without internet. Perfect for secure environments or travel." },
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
            <h2 className="text-2xl font-bold mb-4">Common Problems with Popular Thumbnail Downloaders</h2>
            <div className="space-y-4">
              {[
                { title: "Ads & Pop-Ups", body: "Many free tools are loaded with advertisements, pop-ups, and sponsored links that clutter the interface and slow downloads." },
                { title: "Slow Performance", body: "Some tools use outdated technology or overloaded servers, making downloads slow and unreliable." },
                { title: "Data Collection", body: "Free tools often monetize by selling user data. The best tools respect privacy completely." },
                { title: "Limited Quality Options", body: "Many tools offer only low-resolution \"preview\" images, not the full-quality thumbnails you actually need." },
                { title: "Software Installation", body: "Worst tools require downloading and installing desktop apps — risky and unnecessary." },
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
            <h2 className="text-2xl font-bold mb-4">How to Choose the Best YouTube Thumbnail Downloader</h2>
            <div className="space-y-6">
              {[
                { n: "1", title: "Test Speed", body: "Try downloading a thumbnail from a popular video. It should work in seconds, not minutes." },
                { n: "2", title: "Check Quality Options", body: "Does it offer maximum resolution (1280×720)? Or just preview-quality images?" },
                { n: "3", title: "Verify No Signup", body: "Best tools work immediately without any registration or email requirement." },
                { n: "4", title: "Check Privacy Policy", body: "Does it log your activity? Sell data? Best tools have transparent, privacy-first policies." },
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
            <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                { q: "What makes one thumbnail downloader better than another?", a: "Speed, quality options, privacy protection, reliability, and ease of use. The best combines all five." },
                { q: "Should I install downloadable software?", a: "No. Best tools work in your browser. Desktop software is unnecessary and potentially risky." },
                { q: "Are paid YouTube thumbnail downloaders worth it?", a: "Usually no. Free tools that are fast, quality, and privacy-respecting work just as well." },
                { q: "How do I know if a tool respects my privacy?", a: "Check if it has a privacy policy, works offline, and doesn't require personal information." },
                { q: "Can I use thumbnail downloaders for commercial purposes?", a: "For analyzing your own videos — yes. For reproducing others' thumbnails — no, that's copyright infringement." },
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
                { href: "/tools/youtube-thumbnail-downloader/channel-thumbnails", label: "Channel Thumbnails", desc: "Download channel art and profile images" },
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
            <h2 className="text-2xl font-bold">Try the Best Thumbnail Downloader Now</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Paste any YouTube link and get all thumbnail sizes instantly — free, no login, zero ads.
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
            Best Tools, Best Privacy — Pixocraft Tools
          </p>
        </div>
      </div>
    </>
  );
}
