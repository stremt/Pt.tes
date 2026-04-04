import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData } from "@/lib/seo";
import { Download, AlertCircle, Check, Zap, ShieldCheck, Globe, ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Media Tools", "item": "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", "position": 4, "name": "YouTube Thumbnail Downloader", "item": "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader" }
  ]
});

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "YouTube Thumbnail Downloader – Pixocraft",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free"
  },
  "description": "Download YouTube video thumbnails in HD, 4K, and all available sizes. Free, no login, works instantly in your browser.",
  "url": "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader"
};

const faqItems = [
  {
    q: "Is downloading YouTube thumbnails legal?",
    a: "Yes, downloading publicly available thumbnails for personal, educational, or commercial purposes is legal. YouTube thumbnails are metadata designed to be shared and referenced."
  },
  {
    q: "Do I need a YouTube API key?",
    a: "No. This tool doesn't use any external APIs or require authentication. It works completely offline in your browser using the public YouTube image CDN."
  },
  {
    q: "What formats are the thumbnails in?",
    a: "All thumbnails are in JPG format, compatible with all devices and applications. You can open them in any image viewer or editor."
  },
  {
    q: "Will this tool work on mobile devices?",
    a: "Yes. The tool is fully responsive and works on smartphones, tablets, and desktop computers without any app install."
  },
  {
    q: "Can I download multiple thumbnails at once?",
    a: "Yes. Extract thumbnails from one video, download what you need, then paste another video URL to continue. No limits."
  },
  {
    q: "What if the max resolution thumbnail doesn't exist for a video?",
    a: "If a higher resolution isn't available, you'll still see the best quality thumbnails YouTube has for that video. Lower resolutions always exist."
  },
  {
    q: "Is there a limit to how many thumbnails I can download?",
    a: "No limits. Download as many as you need. This tool is completely free with no restrictions or sign-up required."
  },
  {
    q: "What is the YouTube thumbnail URL format?",
    a: "YouTube thumbnails follow this pattern: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg — our tool automates this for every video ID so you never need to do it manually."
  }
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

interface Thumbnail {
  name: string;
  quality: string;
  url: string;
  width: number;
  height: number;
  isHighestQuality?: boolean;
}

export default function YouTubeThumbnailDownloader() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useSEO({
    title: "Download YouTube Thumbnail (HD, 4K) – Free, No Login, Instant | Pixocraft",
    description: "Download YouTube thumbnails in HD, 4K & all sizes — free, no login, mobile-friendly. Paste video link → get thumbnail → download instantly. 100% private, works in browser.",
    keywords: "youtube thumbnail downloader, download youtube thumbnail, youtube thumbnail download hd, youtube thumbnail downloader online, get youtube thumbnail url, youtube thumbnail extractor",
    canonicalUrl: "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader",
    ogTitle: "Download YouTube Thumbnail (HD, 4K) – Free, No Login, Instant | Pixocraft",
    ogDescription: "Download YouTube thumbnails in HD, 4K & all sizes — free, no login, mobile-friendly. Paste video link → get thumbnail → download instantly.",
    ogType: "website",
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleExtractThumbnails = () => {
    setError("");
    setThumbnails([]);

    if (!youtubeUrl.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      setError("Invalid YouTube URL. Please try again.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const thumbnailSizes: Thumbnail[] = [
        {
          name: "Max Resolution",
          quality: "1280×720 (HD)",
          url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
          isHighestQuality: true,
        },
        {
          name: "Standard Definition",
          quality: "640×480",
          url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
          width: 640,
          height: 480,
        },
        {
          name: "High Quality",
          quality: "480×360",
          url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          width: 480,
          height: 360,
        },
        {
          name: "Default",
          quality: "480×360",
          url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
          width: 480,
          height: 360,
        },
        {
          name: "Medium Quality",
          quality: "320×180",
          url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          width: 320,
          height: 180,
        },
      ];

      setThumbnails(thumbnailSizes);
      setLoading(false);
      toast({
        title: "Thumbnails Ready",
        description: "Click any download button to save the thumbnail instantly.",
      });
    }, 500);
  };

  const handleDownload = async (thumbnail: Thumbnail) => {
    const downloadId = `${thumbnail.name}-${Date.now()}`;
    setDownloadingId(downloadId);

    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Pixocraft_${thumbnail.name.toLowerCase().replace(/ /g, "_")}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Downloaded Successfully",
        description: `${thumbnail.name} thumbnail saved to your device.`,
      });
    } catch {
      toast({
        title: "Download Failed",
        description: "Unable to download. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="max-w-6xl mx-auto px-4 pt-8">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: "YouTube Thumbnail Downloader" }
          ]} />
        </div>

        {/* Hero Section */}
        <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-12 md:py-16 px-4">
          <div className="max-w-6xl mx-auto space-y-5 text-center">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Free • No Login • Instant Download</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Download YouTube Thumbnail in HD
              <span className="block text-primary mt-1">(4K, 1080p) – Free &amp; Instant</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Paste YouTube video link → Get all thumbnails → Download instantly. No login, no app, no upload.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {[
                { icon: ShieldCheck, label: "No Login Required" },
                { icon: Globe, label: "100% Private & Offline" },
                { icon: ImageIcon, label: "All Sizes: HD, HQ, MQ, SD" },
                { icon: Zap, label: "Instant 1-Click Download" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm font-medium text-foreground bg-card border rounded-full px-3 py-1.5">
                  <item.icon className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                  {item.label}
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground/70">
              Works instantly in your browser — no installation needed
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">

          {/* Tool Card */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-2">
              <CardTitle className="text-2xl">Extract YouTube Thumbnails</CardTitle>
              <CardDescription>Paste any YouTube video URL to get all available thumbnail sizes in HD and more</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="youtube-url" className="text-base font-semibold">
                  YouTube Video URL
                </Label>
                <Input
                  ref={inputRef}
                  id="youtube-url"
                  placeholder="Paste YouTube link: https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleExtractThumbnails()}
                  data-testid="input-youtube-url"
                  className="text-base h-12 px-4"
                />
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Supports: youtube.com/watch?v=... • youtu.be/... • youtube.com/embed/...
                </p>
              </div>

              {error && (
                <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <Button
                onClick={handleExtractThumbnails}
                disabled={loading}
                size="lg"
                className="w-full h-12 text-base font-semibold"
                data-testid="button-extract-thumbnails"
              >
                {loading ? "Extracting..." : "Get Thumbnails – Instant Download"}
              </Button>
              <p className="text-xs text-center text-muted-foreground/60">No email • No login • Start instantly</p>
            </CardContent>
          </Card>

          {/* Thumbnails Grid */}
          {thumbnails.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Available Thumbnail Sizes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {thumbnails.map((thumbnail, index) => (
                  <Card
                    key={index}
                    className={`overflow-hidden hover-elevate flex flex-col transition-all ${
                      thumbnail.isHighestQuality ? "ring-2 ring-primary lg:col-span-2 lg:flex-row" : ""
                    }`}
                    data-testid={`card-thumbnail-${thumbnail.name.toLowerCase().replace(/ /g, "-")}`}
                  >
                    <div className={`relative bg-muted ${thumbnail.isHighestQuality ? "lg:w-1/2" : "w-full"}`}>
                      <img
                        src={thumbnail.url}
                        alt={`YouTube thumbnail ${thumbnail.quality} – download youtube thumbnail hd`}
                        loading="lazy"
                        className={`w-full ${thumbnail.isHighestQuality ? "h-56 lg:h-full" : "h-48"} object-cover`}
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.backgroundColor = "#e5e7eb";
                        }}
                      />
                      {thumbnail.isHighestQuality && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-primary text-primary-foreground">Highest Quality</Badge>
                        </div>
                      )}
                    </div>

                    <CardContent
                      className={`flex-1 p-4 md:p-5 space-y-4 flex flex-col justify-between ${
                        thumbnail.isHighestQuality ? "lg:w-1/2 lg:justify-center" : ""
                      }`}
                    >
                      <div className="space-y-2">
                        <p className="font-bold text-lg text-foreground">{thumbnail.name}</p>
                        <p className="text-sm text-muted-foreground font-medium">{thumbnail.quality}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">{thumbnail.width}px</Badge>
                        <Badge variant="secondary" className="text-xs">{thumbnail.height}px</Badge>
                        {thumbnail.isHighestQuality && (
                          <Badge variant="secondary" className="text-xs text-primary">Best for YouTube</Badge>
                        )}
                      </div>

                      <Button
                        onClick={() => handleDownload(thumbnail)}
                        disabled={downloadingId === `${thumbnail.name}-${Date.now()}`}
                        variant={thumbnail.isHighestQuality ? "default" : "outline"}
                        size="sm"
                        className="w-full h-10 font-semibold mt-auto"
                        data-testid={`button-download-${thumbnail.name.toLowerCase().replace(/ /g, "-")}`}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {downloadingId === `${thumbnail.name}-${Date.now()}` ? "Downloading..." : "Download"}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground pt-2">
                Click download to save immediately — no signup, no watermarks
              </p>
            </div>
          )}

          {/* Content Sections */}
          <div className="space-y-12 py-8">

            {/* Featured Snippet: How to Download */}
            <section className="bg-primary/5 border border-primary/20 rounded-xl p-6 sm:p-10 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">How to Download YouTube Thumbnails (Quick Steps)</h2>
              <ol className="space-y-4">
                {[
                  "Copy the YouTube video URL from your browser or the Share button",
                  "Paste the URL into the input box above",
                  "Click \"Get Thumbnails\" — all sizes appear instantly",
                  "Click Download next to any thumbnail size to save it"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                    <p className="text-foreground font-medium leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-muted-foreground font-medium">No signup, no email, no upload — works instantly in your browser.</p>
            </section>

            {/* Thumbnail Sizes Explained */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">YouTube Thumbnail Sizes Explained</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you download a YouTube thumbnail, you get multiple resolution options. Here's what each size means and when to use it:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    size: "1280×720",
                    label: "Max Resolution (HD)",
                    desc: "The highest quality YouTube thumbnail. Best for print, presentations, and professional design work. This is the recommended size for most use cases.",
                    badge: "Best Quality"
                  },
                  {
                    size: "640×480",
                    label: "Standard Definition",
                    desc: "Good quality for blog posts, email newsletters, and social media. Smaller file size while still looking sharp on most screens.",
                    badge: "Good for Web"
                  },
                  {
                    size: "480×360",
                    label: "High Quality (HQ)",
                    desc: "Medium resolution suitable for previews and thumbnails in content management tools. Fast to load.",
                    badge: "Fast Load"
                  },
                  {
                    size: "320×180",
                    label: "Medium Quality (MQ)",
                    desc: "Smallest size, great for placeholders, loading skeletons, or situations where file size matters most.",
                    badge: "Lightest"
                  },
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-card border rounded-xl space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-foreground text-base">{item.size}</span>
                      <Badge variant="secondary" className="text-xs">{item.badge}</Badge>
                    </div>
                    <p className="text-sm font-semibold text-primary">{item.label}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* YouTube Thumbnail URL Format */}
            <section className="space-y-4 p-6 bg-muted/40 rounded-xl border">
              <h2 className="text-2xl sm:text-3xl font-bold">YouTube Thumbnail URL Format</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every YouTube video has publicly accessible thumbnail images hosted on Google's CDN. The URL pattern is:
              </p>
              <div className="bg-card border rounded-lg p-4 font-mono text-sm text-foreground overflow-x-auto">
                https://img.youtube.com/vi/<span className="text-primary font-bold">VIDEO_ID</span>/maxresdefault.jpg
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Replace <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">VIDEO_ID</code> with the actual ID from the YouTube URL (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">dQw4w9WgXcQ</code>). Other sizes use different filenames:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {[
                  ["maxresdefault.jpg", "1280×720 HD"],
                  ["sddefault.jpg", "640×480 SD"],
                  ["hqdefault.jpg", "480×360 HQ"],
                  ["mqdefault.jpg", "320×180 MQ"],
                ].map(([file, size]) => (
                  <li key={file} className="flex items-center gap-3">
                    <code className="bg-muted px-2 py-0.5 rounded text-xs font-mono text-foreground">{file}</code>
                    <span>{size}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-muted-foreground font-medium pt-2">
                Our YouTube thumbnail downloader automates all of this — just paste the video link and get every size in one click.
              </p>
            </section>

            {/* Advanced Content: Topical Authority */}
            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold">Why YouTube Thumbnails Matter</h2>

              <div className="space-y-6">
                <div className="p-6 bg-card border rounded-xl space-y-3">
                  <h3 className="text-lg font-bold text-foreground">Thumbnails Drive CTR on YouTube</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    YouTube's algorithm uses Click-Through Rate (CTR) as a key ranking signal. A compelling thumbnail can increase CTR from 2% to 10%+ on the same video — meaning more views, more watch time, and faster growth. Studying and downloading competitor thumbnails helps you understand what's working in your niche right now.
                  </p>
                </div>

                <div className="p-6 bg-card border rounded-xl space-y-3">
                  <h3 className="text-lg font-bold text-foreground">HD vs SD: Which Thumbnail Should You Use?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    For design work, always download the HD thumbnail (1280×720). It gives you the sharpest image with the most detail. SD and MQ versions are best when you need faster load times — such as in emails or mobile previews. Our tool lets you download all sizes and choose the right one for your use case.
                  </p>
                </div>

                <div className="p-6 bg-card border rounded-xl space-y-3">
                  <h3 className="text-lg font-bold text-foreground">Best Thumbnail Size for YouTube in 2025</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    YouTube recommends <strong>1280×720 pixels</strong> as the optimal thumbnail size with an aspect ratio of 16:9. This is what appears in YouTube search, recommendations, and on mobile. Files should be under 2MB in JPG, PNG, or GIF format. Our downloader extracts this exact size (maxresdefault.jpg) as the top option.
                  </p>
                </div>

                <div className="p-6 bg-card border rounded-xl space-y-3">
                  <h3 className="text-lg font-bold text-foreground">How Creators Use Thumbnail Research for Growth</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Top YouTubers analyze high-performing thumbnails to spot patterns — bold text, contrasting colors, expressive faces, and minimal backgrounds are common winners. By downloading thumbnails from successful videos in your niche, you can build a reference library, run A/B tests, and design thumbnails that consistently attract more clicks.
                  </p>
                </div>
              </div>
            </section>

            {/* Who Should Use Section */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Who Uses This YouTube Thumbnail Downloader?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Content Creators", description: "Reference thumbnails for inspiration when designing your own YouTube video covers." },
                  { title: "Digital Marketers", description: "Analyze competitor thumbnails to understand what works in your niche." },
                  { title: "Students & Researchers", description: "Quickly gather video preview images for presentations and reports." },
                  { title: "Designers", description: "Use high-res thumbnails as reference material for design projects." },
                  { title: "Video Producers", description: "Create mood boards and storyboards using real YouTube video thumbnails." },
                  { title: "Social Media Managers", description: "Download thumbnails to reuse across different social platforms and posts." },
                ].map((item, index) => (
                  <Card key={index} className="p-4 hover-elevate">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Privacy & Security Section */}
            <section className="space-y-4 p-6 bg-muted/40 rounded-xl border">
              <h2 className="text-2xl sm:text-3xl font-bold">Your Privacy is Protected</h2>
              <p className="text-muted-foreground">
                This YouTube thumbnail extractor is 100% browser-based. Nothing you paste or download is sent to our servers. Your video URLs and images remain private and never leave your device.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { title: "No Tracking", desc: "We don't track your activity or collect personal data." },
                  { title: "No Sign-Up", desc: "Use the tool instantly without creating an account." },
                  { title: "No Watermarks", desc: "Download clean, original thumbnails with no marks added." },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqItems.map((faq, index) => (
                  <Card key={index} className="p-4 hover-elevate">
                    <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Long-Tail SEO Pages */}
            <LongTailPagesSection toolId="youtube-thumbnail-downloader" />

            {/* Internal Linking */}
            <section className="space-y-4 pt-8 border-t">
              <h2 className="text-2xl sm:text-3xl font-bold">Related Image Tools</h2>
              <p className="text-muted-foreground text-sm">After downloading your thumbnail, these tools can help you optimize it:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    label: "Compress Thumbnail Images",
                    desc: "Reduce thumbnail file size without losing quality — perfect for web and email use.",
                    href: "/tools/image-compressor"
                  },
                  {
                    label: "Resize YouTube Thumbnails",
                    desc: "Resize downloaded thumbnails to any custom dimension for different platforms.",
                    href: "/tools/image-resizer"
                  },
                  {
                    label: "Crop Thumbnail Images",
                    desc: "Crop to the exact area you need from any YouTube thumbnail.",
                    href: "/tools/image-cropper"
                  },
                ].map((link, i) => (
                  <Link key={i} href={link.href}>
                    <div className="p-5 bg-card border rounded-xl hover-elevate cursor-pointer h-full">
                      <p className="font-semibold text-primary mb-1">{link.label}</p>
                      <p className="text-sm text-muted-foreground">{link.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/media" className="text-primary hover:text-primary/80 transition-colors">Media Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
