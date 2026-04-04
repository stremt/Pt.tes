import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData } from "@/lib/seo";
import {
  Download, AlertCircle, Check, Zap, ShieldCheck, Globe, ImageIcon,
  Copy, CheckCheck, Package, BarChart2, Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";
import JSZip from "jszip";

// ─── Schemas ──────────────────────────────────────────────────────────────────

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Media Tools", "item": "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", "position": 4, "name": "YouTube Thumbnail Downloader", "item": "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader" }
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "YouTube Thumbnail Downloader – Pixocraft",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "description": "Download YouTube video thumbnails in HD, 4K, and all available sizes. Free, no login, works instantly in your browser.",
  "url": "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader"
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Download a YouTube Thumbnail",
  "description": "Download YouTube video thumbnails in HD for free without login.",
  "step": [
    { "@type": "HowToStep", "name": "Copy YouTube URL", "text": "Copy the YouTube video URL from your browser address bar or the Share button." },
    { "@type": "HowToStep", "name": "Paste the link", "text": "Paste the URL into the input box on Pixocraft YouTube Thumbnail Downloader." },
    { "@type": "HowToStep", "name": "Click Extract", "text": "Click 'Get Thumbnails' to instantly see all available sizes." },
    { "@type": "HowToStep", "name": "Download", "text": "Click Download on any thumbnail size to save it to your device." }
  ]
};

const faqItems = [
  { q: "Is downloading YouTube thumbnails legal?", a: "Yes, downloading publicly available thumbnails for personal, educational, or commercial purposes is legal. YouTube thumbnails are metadata designed to be shared and referenced." },
  { q: "Do I need a YouTube API key?", a: "No. This tool doesn't use any external APIs or require authentication. It works completely offline in your browser using the public YouTube image CDN." },
  { q: "What formats are the thumbnails in?", a: "All thumbnails are in JPG format, compatible with all devices and applications. You can open them in any image viewer or editor." },
  { q: "Will this tool work on mobile devices?", a: "Yes. The tool is fully responsive and works on smartphones, tablets, and desktop computers without any app install." },
  { q: "Can I download multiple thumbnails at once?", a: "Yes — use the 'Download All as ZIP' button to grab every size in one click, or download individually." },
  { q: "What if the max resolution thumbnail doesn't exist?", a: "If a higher resolution isn't available, you'll still see the best quality thumbnails YouTube has for that video. Lower resolutions always exist." },
  { q: "Is there a limit to how many thumbnails I can download?", a: "No limits. Download as many as you need. This tool is completely free with no restrictions or sign-up required." },
  { q: "What is the YouTube thumbnail URL format?", a: "YouTube thumbnails follow this pattern: https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg — our tool automates this for every video so you never need to do it manually." }
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

// ─── Types ─────────────────────────────────────────────────────────────────────

interface Thumbnail {
  name: string;
  quality: string;
  url: string;
  width: number;
  height: number;
  isHighestQuality?: boolean;
}

interface ThumbnailAnalysis {
  brightness: "High" | "Medium" | "Low";
  contrast: "Strong" | "Moderate" | "Weak";
  ctrPotential: "High" | "Medium" | "Low";
  dominantColor: string;
}

// ─── Demo video pre-loaded ──────────────────────────────────────────────────

const DEMO_VIDEO_ID = "dQw4w9WgXcQ";
const DEMO_URL = `https://www.youtube.com/watch?v=${DEMO_VIDEO_ID}`;

function buildThumbnails(videoId: string): Thumbnail[] {
  return [
    { name: "Max Resolution", quality: "1280×720 (HD)", url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, width: 1280, height: 720, isHighestQuality: true },
    { name: "Standard Definition", quality: "640×480", url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, width: 640, height: 480 },
    { name: "High Quality", quality: "480×360", url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, width: 480, height: 360 },
    { name: "Default", quality: "480×360", url: `https://img.youtube.com/vi/${videoId}/default.jpg`, width: 480, height: 360 },
    { name: "Medium Quality", quality: "320×180", url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, width: 320, height: 180 },
  ];
}

// ─── Thumbnail Analyzer ────────────────────────────────────────────────────────

async function analyzeThumbnail(imageUrl: string): Promise<ThumbnailAnalysis> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 80;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ brightness: "Medium", contrast: "Moderate", ctrPotential: "Medium", dominantColor: "#888888" });
        return;
      }
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      let totalBrightness = 0;
      let minBrightness = 255;
      let maxBrightness = 0;
      const colorBuckets: Record<string, number> = {};

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i], g = data[i + 1], b = data[i + 2];
        const lum = 0.299 * r + 0.587 * g + 0.114 * b;
        totalBrightness += lum;
        if (lum < minBrightness) minBrightness = lum;
        if (lum > maxBrightness) maxBrightness = lum;
        const bucket = `${Math.round(r / 32) * 32},${Math.round(g / 32) * 32},${Math.round(b / 32) * 32}`;
        colorBuckets[bucket] = (colorBuckets[bucket] || 0) + 1;
      }

      const pixelCount = (size * size);
      const avgBrightness = totalBrightness / pixelCount;
      const contrastRange = maxBrightness - minBrightness;

      const topBucket = Object.entries(colorBuckets).sort((a, b) => b[1] - a[1])[0][0];
      const [dr, dg, db] = topBucket.split(",").map(Number);
      const dominantColor = `#${dr.toString(16).padStart(2, "0")}${dg.toString(16).padStart(2, "0")}${db.toString(16).padStart(2, "0")}`;

      const brightness: ThumbnailAnalysis["brightness"] = avgBrightness > 160 ? "High" : avgBrightness > 80 ? "Medium" : "Low";
      const contrast: ThumbnailAnalysis["contrast"] = contrastRange > 180 ? "Strong" : contrastRange > 90 ? "Moderate" : "Weak";
      const ctrPotential: ThumbnailAnalysis["ctrPotential"] =
        contrast === "Strong" && brightness !== "Low" ? "High" :
        contrast === "Moderate" ? "Medium" : "Low";

      resolve({ brightness, contrast, ctrPotential, dominantColor });
    };
    img.onerror = () => resolve({ brightness: "Medium", contrast: "Moderate", ctrPotential: "Medium", dominantColor: "#888888" });
    img.src = imageUrl;
  });
}

// ─── Component ─────────────────────────────────────────────────────────────────

export default function YouTubeThumbnailDownloader() {
  const [youtubeUrl, setYoutubeUrl] = useState(DEMO_URL);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>(() => buildThumbnails(DEMO_VIDEO_ID));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isDemo, setIsDemo] = useState(true);
  const [error, setError] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadingAll, setDownloadingAll] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [analyses, setAnalyses] = useState<Record<string, ThumbnailAnalysis>>({});
  const [analyzingUrl, setAnalyzingUrl] = useState<string | null>(null);
  const [isShorts, setIsShorts] = useState(false);
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useSEO({
    title: "Download YouTube Thumbnail (HD, 4K) – Free, No Login, Instant | Pixocraft",
    description: "Download YouTube thumbnails in HD, 4K & all sizes — free, no login, mobile-friendly. Paste video link → get thumbnail → download instantly. Copy URL, analyze CTR, download all as ZIP.",
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
      /youtube\.com\/shorts\/([^&\n?#]+)/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleExtractThumbnails = useCallback(() => {
    setError("");
    setThumbnails([]);
    setAnalyses({});
    setIsDemo(false);

    if (!youtubeUrl.trim()) { setError("Please enter a YouTube URL"); return; }
    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) { setError("Invalid YouTube URL. Please try again."); return; }

    const shorts = youtubeUrl.includes("/shorts/");
    setIsShorts(shorts);
    setLoading(true);

    setTimeout(() => {
      setThumbnails(buildThumbnails(videoId));
      setSelectedIndex(0);
      setLoading(false);
      toast({ title: "Thumbnails Ready", description: "Select a size and download instantly." });
    }, 500);
  }, [youtubeUrl, toast]);

  const handleDownload = async (thumbnail: Thumbnail) => {
    const id = thumbnail.name;
    setDownloadingId(id);
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
      toast({ title: "Downloaded!", description: `${thumbnail.name} saved to your device.` });
    } catch {
      toast({ title: "Download Failed", description: "Unable to download. Please try again.", variant: "destructive" });
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadAll = async () => {
    setDownloadingAll(true);
    try {
      const zip = new JSZip();
      await Promise.all(thumbnails.map(async (t) => {
        const res = await fetch(t.url);
        const blob = await res.blob();
        zip.file(`${t.name.toLowerCase().replace(/ /g, "_")}_${t.quality.replace("×", "x")}.jpg`, blob);
      }));
      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = "youtube_thumbnails_pixocraft.zip";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast({ title: "All Downloaded!", description: "All thumbnails saved as ZIP." });
    } catch {
      toast({ title: "ZIP Failed", description: "Could not create ZIP. Try individual downloads.", variant: "destructive" });
    } finally {
      setDownloadingAll(false);
    }
  };

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      toast({ title: "URL Copied!", description: "Thumbnail URL copied to clipboard." });
      setTimeout(() => setCopiedUrl(null), 2000);
    });
  };

  const handleAnalyze = async (thumbnail: Thumbnail) => {
    if (analyses[thumbnail.url]) return;
    setAnalyzingUrl(thumbnail.url);
    const result = await analyzeThumbnail(thumbnail.url);
    setAnalyses(prev => ({ ...prev, [thumbnail.url]: result }));
    setAnalyzingUrl(null);
  };

  const ctrColor = (val: string) =>
    val === "High" ? "text-green-600" : val === "Medium" ? "text-yellow-600" : "text-red-500";

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={softwareSchema} />
      <StructuredData data={howToSchema} />
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

        {/* Hero */}
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
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {[
                { icon: ShieldCheck, label: "No Login Required" },
                { icon: Globe, label: "100% Private & Offline" },
                { icon: ImageIcon, label: "All Sizes: HD, HQ, MQ, SD" },
                { icon: Package, label: "Download All as ZIP" },
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

        {/* Main */}
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">

          {/* Tool Card */}
          <Card className="border-2 shadow-lg">
            <CardHeader className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl">Extract YouTube Thumbnails</CardTitle>
                  <CardDescription className="mt-1">
                    {isDemo
                      ? "Live demo loaded below — or paste your own YouTube link"
                      : "Paste any YouTube video URL to get all thumbnail sizes in HD"}
                  </CardDescription>
                </div>
                {isDemo && (
                  <Badge className="bg-primary/10 text-primary border border-primary/20 font-medium">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Live Demo
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="youtube-url" className="text-base font-semibold">YouTube Video URL</Label>
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
                <p className="text-xs text-muted-foreground">
                  Supports: youtube.com/watch?v=... • youtu.be/... • youtube.com/shorts/...
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
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                    Extracting…
                  </span>
                ) : "Get Thumbnails – Instant Download"}
              </Button>
              <p className="text-xs text-center text-muted-foreground/60">No email • No login • Start instantly</p>
            </CardContent>
          </Card>

          {/* Shorts Notice */}
          {isShorts && (
            <div className="flex items-start gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <ImageIcon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">YouTube Shorts Detected</p>
                <p className="text-sm text-muted-foreground">Shorts use a vertical 1080×1920 format. The thumbnails below are extracted from the same CDN — the HD size is best for Shorts content.</p>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <Card className="border-2">
              <CardContent className="p-6 space-y-4">
                <div className="h-6 w-40 bg-muted animate-pulse rounded" />
                <div className="w-full aspect-video bg-muted animate-pulse rounded-lg" />
                <div className="flex gap-2 flex-wrap">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-9 w-28 bg-muted animate-pulse rounded-md" />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-10 bg-muted animate-pulse rounded-md" />
                  <div className="h-10 bg-muted animate-pulse rounded-md" />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Single Preview + Size Picker */}
          {!loading && thumbnails.length > 0 && (() => {
            const selected = thumbnails[selectedIndex];
            const analysis = analyses[selected.url];
            const isAnalyzing = analyzingUrl === selected.url;
            return (
              <Card className="border-2 shadow-lg" data-testid="card-thumbnail-result">
                <CardHeader className="pb-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-xl">
                        {isDemo ? "Demo Preview" : "Your Thumbnail"}
                      </CardTitle>
                      <CardDescription className="mt-0.5">
                        {isDemo
                          ? "Live demo — paste your YouTube link above to extract yours"
                          : "Select a size below, then download or copy the URL"}
                      </CardDescription>
                    </div>
                    <Button
                      onClick={handleDownloadAll}
                      disabled={downloadingAll}
                      variant="outline"
                      size="sm"
                      data-testid="button-download-all"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      {downloadingAll ? "Creating ZIP…" : "Download All as ZIP"}
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  {/* Preview Image */}
                  <div className="relative bg-muted rounded-lg overflow-hidden w-full">
                    <img
                      key={selected.url}
                      src={selected.url}
                      alt={`YouTube thumbnail ${selected.quality} – download youtube thumbnail hd`}
                      loading="eager"
                      className="w-full object-contain max-h-80"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    {selected.isHighestQuality && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-primary-foreground">Highest Quality</Badge>
                      </div>
                    )}
                  </div>

                  {/* Size Picker */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-foreground">Select Size</p>
                    <div className="flex flex-wrap gap-2">
                      {thumbnails.map((t, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedIndex(i)}
                          data-testid={`button-size-${t.name.toLowerCase().replace(/ /g, "-")}`}
                          className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors ${
                            i === selectedIndex
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-card text-foreground border-border hover-elevate"
                          }`}
                        >
                          {t.name}
                          <span className="ml-1.5 text-xs opacity-70">{t.quality}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected size info */}
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{selected.width} × {selected.height} px</Badge>
                    {selected.isHighestQuality && (
                      <Badge variant="secondary" className="text-primary">Best for YouTube</Badge>
                    )}
                  </div>

                  {/* Analyzer Result */}
                  {analysis && (
                    <div className="text-sm bg-muted/50 rounded-lg p-4 space-y-2 border">
                      <p className="font-semibold text-foreground flex items-center gap-1.5">
                        <BarChart2 className="w-4 h-4" /> Thumbnail Analysis
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Brightness</p>
                          <p className="font-semibold text-foreground">{analysis.brightness}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Contrast</p>
                          <p className="font-semibold text-foreground">{analysis.contrast}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">CTR Potential</p>
                          <p className={`font-bold ${ctrColor(analysis.ctrPotential)}`}>{analysis.ctrPotential}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Dominant Color</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="h-4 w-4 rounded-full border flex-shrink-0" style={{ backgroundColor: analysis.dominantColor }} />
                            <span className="font-mono text-xs text-foreground">{analysis.dominantColor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Button
                      onClick={() => handleDownload(selected)}
                      disabled={downloadingId === selected.name}
                      className="font-semibold"
                      data-testid="button-download-selected"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {downloadingId === selected.name ? "Saving…" : "Download"}
                    </Button>
                    <Button
                      onClick={() => handleCopyUrl(selected.url)}
                      variant="outline"
                      data-testid="button-copy-url-selected"
                    >
                      {copiedUrl === selected.url
                        ? <><CheckCheck className="w-4 h-4 mr-2 text-green-600" />Copied!</>
                        : <><Copy className="w-4 h-4 mr-2" />Copy URL</>}
                    </Button>
                    <Button
                      onClick={() => handleAnalyze(selected)}
                      variant="outline"
                      disabled={!!analysis || isAnalyzing}
                      data-testid="button-analyze-selected"
                    >
                      <BarChart2 className="w-4 h-4 mr-2" />
                      {isAnalyzing ? "Analyzing…" : analysis ? "Analyzed" : "Analyze CTR"}
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    No signup • No watermarks • Instant download
                  </p>
                </CardContent>
              </Card>
            );
          })()}

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
                  "Click Download next to any size, Copy URL, or Download All as ZIP"
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
                  { size: "1280×720", label: "Max Resolution (HD)", desc: "The highest quality YouTube thumbnail. Best for print, presentations, and professional design work. Recommended for most use cases.", badge: "Best Quality" },
                  { size: "640×480", label: "Standard Definition", desc: "Good quality for blog posts, email newsletters, and social media. Smaller file size while still sharp on most screens.", badge: "Good for Web" },
                  { size: "480×360", label: "High Quality (HQ)", desc: "Medium resolution suitable for previews and content management tools. Fast to load.", badge: "Fast Load" },
                  { size: "320×180", label: "Medium Quality (MQ)", desc: "Smallest size — great for placeholders or when file size matters most.", badge: "Lightest" },
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

            {/* Topical Authority */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Why YouTube Thumbnails Matter</h2>
              <div className="space-y-4">
                {[
                  { title: "Thumbnails Drive CTR on YouTube", body: "YouTube's algorithm uses Click-Through Rate (CTR) as a key ranking signal. A compelling thumbnail can increase CTR from 2% to 10%+ on the same video — meaning more views, more watch time, and faster growth. Studying competitor thumbnails helps you understand what's working in your niche right now." },
                  { title: "HD vs SD: Which Size Should You Use?", body: "For design work, always download the HD thumbnail (1280×720). It gives you the sharpest image with the most detail. SD and MQ versions are best for fast-loading use cases like emails or mobile previews. Our tool lets you download all sizes and choose the right one." },
                  { title: "Best Thumbnail Size for YouTube in 2025", body: "YouTube recommends 1280×720 pixels with a 16:9 aspect ratio. This is what appears in search, recommendations, and on mobile. Files should be under 2MB in JPG format. Our downloader extracts this exact size (maxresdefault.jpg) as the top option." },
                  { title: "How Creators Use Thumbnail Research for Growth", body: "Top YouTubers analyze high-performing thumbnails to spot patterns — bold text, contrasting colors, expressive faces, and minimal backgrounds. By downloading thumbnails from successful videos in your niche, you can build a reference library and design thumbnails that consistently attract more clicks." },
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-card border rounded-xl space-y-2">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Who Uses */}
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
                ].map((item, i) => (
                  <Card key={i} className="p-4 hover-elevate">
                    <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Privacy */}
            <section className="space-y-4 p-6 bg-muted/40 rounded-xl border">
              <h2 className="text-2xl sm:text-3xl font-bold">Your Privacy is Protected</h2>
              <p className="text-muted-foreground">This YouTube thumbnail extractor is 100% browser-based. Nothing you paste or download is sent to our servers. Your video URLs and images remain private and never leave your device.</p>
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

            {/* Hook CTA */}
            <section className="text-center py-8 border rounded-xl bg-primary/5 border-primary/20 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Try it now</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Paste any YouTube link and download the HD thumbnail instantly — free, no login, no waiting.
              </p>
              <Button
                onClick={() => { inputRef.current?.focus(); inputRef.current?.select(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                size="lg"
                className="font-semibold"
                data-testid="button-cta-scroll-top"
              >
                <Zap className="w-4 h-4 mr-2" />
                Download YouTube Thumbnail Now
              </Button>
            </section>

            {/* FAQ */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {faqItems.map((faq, i) => (
                  <Card key={i} className="p-4 hover-elevate">
                    <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Long-Tail Pages */}
            <LongTailPagesSection toolId="youtube-thumbnail-downloader" />

            {/* Internal Linking */}
            <section className="space-y-4 pt-8 border-t">
              <h2 className="text-2xl sm:text-3xl font-bold">Related Image Tools</h2>
              <p className="text-muted-foreground text-sm">After downloading your thumbnail, optimize it with these tools:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Compress Thumbnail Images", desc: "Reduce thumbnail file size without quality loss — perfect for web and email.", href: "/tools/image-compressor" },
                  { label: "Resize YouTube Thumbnails", desc: "Resize downloaded thumbnails to any custom dimension for different platforms.", href: "/tools/image-resizer" },
                  { label: "Crop Thumbnail Images", desc: "Crop to the exact area you need from any YouTube thumbnail.", href: "/tools/image-cropper" },
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
