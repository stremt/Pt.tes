import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Download, AlertCircle, Check, Zap, ImageIcon,
  Copy, CheckCheck, Package, BarChart2, Sparkles,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import JSZip from "jszip";

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Constants ────────────────────────────────────────────────────────────────

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

function extractVideoId(url: string): string | null {
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
}

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

      const pixelCount = size * size;
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

// ─── Component ────────────────────────────────────────────────────────────────

interface YTThumbnailDownloaderToolProps {
  autoFocus?: boolean;
}

export default function YTThumbnailDownloaderTool({ autoFocus = true }: YTThumbnailDownloaderToolProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
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

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleExtractThumbnails = useCallback((overrideUrl?: string) => {
    setError("");
    setThumbnails([]);
    setAnalyses({});
    setIsDemo(false);

    const urlToUse = overrideUrl ?? youtubeUrl;
    if (!urlToUse.trim()) { setError("Please enter a YouTube URL"); return; }
    const videoId = extractVideoId(urlToUse);
    if (!videoId) { setError("Invalid YouTube URL. Please try again."); return; }

    const shorts = urlToUse.includes("/shorts/");
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

  const selected = thumbnails[selectedIndex];
  const analysis = selected ? analyses[selected.url] : undefined;
  const isAnalyzing = selected ? analyzingUrl === selected.url : false;

  return (
    <Card className="border-2 shadow-lg overflow-hidden">
      {/* Step 1 — URL Input */}
      <div className="p-6 border-b space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">1</span>
          <span className="font-semibold text-foreground">Paste your YouTube video link</span>
          {isDemo && (
            <Badge className="bg-primary/10 text-primary border border-primary/20 font-medium ml-auto">
              <Sparkles className="w-3 h-3 mr-1" />
              Live Demo
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="https://www.youtube.com/watch?v=..."
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleExtractThumbnails()}
            data-testid="input-youtube-url"
            className="text-base h-11 flex-1"
          />
          <Button
            onClick={() => handleExtractThumbnails()}
            disabled={loading}
            className="h-11 px-5 font-semibold flex-shrink-0"
            data-testid="button-extract-thumbnails"
          >
            {loading
              ? <span className="flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                  Getting…
                </span>
              : <><Zap className="w-4 h-4 mr-1.5" />Get Thumbnails</>}
          </Button>
        </div>
        {error && (
          <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}
        {isShorts && (
          <div className="flex items-center gap-2 text-sm text-primary bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
            <ImageIcon className="w-4 h-4 flex-shrink-0" />
            YouTube Shorts detected — thumbnails are extracted from the same CDN.
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-xs text-muted-foreground">Supports: youtube.com • youtu.be • youtube.com/shorts — No login required</p>
          <button
            onClick={() => { setYoutubeUrl(DEMO_URL); handleExtractThumbnails(DEMO_URL); }}
            className="text-xs text-primary font-medium underline underline-offset-2 hover-elevate"
            data-testid="button-paste-sample"
          >
            Try a sample link
          </button>
        </div>
      </div>

      {/* Step 2 & 3 — Preview + Size + Download */}
      {(loading || thumbnails.length > 0) && (
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">2</span>
              <span className="font-semibold text-foreground">Choose size</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center flex-shrink-0">3</span>
              <span className="font-semibold text-foreground">Download</span>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              <div className="w-full aspect-video bg-muted animate-pulse rounded-xl" />
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[...Array(5)].map((_, i) => <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />)}
              </div>
              <div className="h-12 bg-muted animate-pulse rounded-lg" />
            </div>
          ) : selected ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Left — Thumbnail Preview */}
              <div className="lg:col-span-3 space-y-3">
                <div className="relative bg-muted rounded-xl overflow-hidden border">
                  <img
                    key={selected.url}
                    src={selected.url}
                    alt={`YouTube thumbnail ${selected.quality} – download youtube thumbnail hd`}
                    loading="eager"
                    className="w-full object-contain"
                    style={{ maxHeight: "340px" }}
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                  />
                  {selected.isHighestQuality && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-primary-foreground shadow">
                        <Check className="w-3 h-3 mr-1" /> Highest Quality
                      </Badge>
                    </div>
                  )}
                </div>
                {/* CTR Analyzer panel */}
                {analysis && (
                  <div className="bg-muted/40 border rounded-xl p-4 space-y-3">
                    <p className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                      <BarChart2 className="w-4 h-4 text-primary" /> CTR Analysis
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: "Brightness", value: analysis.brightness },
                        { label: "Contrast", value: analysis.contrast },
                        { label: "CTR Potential", value: analysis.ctrPotential, colored: true },
                      ].map((stat) => (
                        <div key={stat.label} className="space-y-0.5">
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                          <p className={`text-sm font-bold ${stat.colored ? ctrColor(stat.value) : "text-foreground"}`}>{stat.value}</p>
                        </div>
                      ))}
                      <div className="space-y-0.5">
                        <p className="text-xs text-muted-foreground">Dominant Color</p>
                        <div className="flex items-center gap-1.5">
                          <span className="h-4 w-4 rounded-full border flex-shrink-0" style={{ backgroundColor: analysis.dominantColor }} />
                          <span className="font-mono text-xs text-foreground">{analysis.dominantColor}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right — Size Picker + Actions */}
              <div className="lg:col-span-2 space-y-4 flex flex-col">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Select Resolution</p>
                  <div className="space-y-2">
                    {thumbnails.map((t, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedIndex(i)}
                        data-testid={`button-size-${t.name.toLowerCase().replace(/ /g, "-")}`}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-colors ${
                          i === selectedIndex
                            ? "bg-primary/10 border-primary text-foreground"
                            : "bg-card border-border hover-elevate text-foreground"
                        }`}
                      >
                        <div>
                          <p className="text-sm font-semibold leading-tight">{t.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{t.quality}</p>
                        </div>
                        {i === selectedIndex
                          ? <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          : t.isHighestQuality && <Badge variant="secondary" className="text-xs flex-shrink-0">Best</Badge>
                        }
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handleDownload(selected)}
                  disabled={downloadingId === selected.name}
                  size="lg"
                  className="w-full font-bold text-base h-12"
                  data-testid="button-download-selected"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {downloadingId === selected.name ? "Saving…" : `Download ${selected.quality}`}
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => handleCopyUrl(selected.url)}
                    variant="outline"
                    size="sm"
                    data-testid="button-copy-url-selected"
                  >
                    {copiedUrl === selected.url
                      ? <><CheckCheck className="w-3.5 h-3.5 mr-1.5 text-green-600" />Copied!</>
                      : <><Copy className="w-3.5 h-3.5 mr-1.5" />Copy URL</>}
                  </Button>
                  <Button
                    onClick={handleDownloadAll}
                    disabled={downloadingAll}
                    variant="outline"
                    size="sm"
                    data-testid="button-download-all"
                  >
                    <Package className="w-3.5 h-3.5 mr-1.5" />
                    {downloadingAll ? "Zipping…" : "All as ZIP"}
                  </Button>
                </div>

                <Button
                  onClick={() => handleAnalyze(selected)}
                  variant="ghost"
                  size="sm"
                  disabled={!!analysis || isAnalyzing}
                  className="w-full text-xs"
                  data-testid="button-analyze-selected"
                >
                  <BarChart2 className="w-3.5 h-3.5 mr-1.5" />
                  {isAnalyzing ? "Analyzing…" : analysis ? "CTR Analysis Done" : "Analyze CTR Potential"}
                </Button>

                <p className="text-center text-xs text-muted-foreground/60 pt-1">
                  No signup • No watermarks • Free forever
                </p>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </Card>
  );
}
