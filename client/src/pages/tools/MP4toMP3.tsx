import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, generateHowToSchema } from "@/lib/seo";
import {
  Music,
  Upload,
  Download,
  X,
  Shield,
  Zap,
  WifiOff,
  Star,
  Monitor,
  Repeat,
  ChevronDown,
  ChevronUp,
  FileAudio,
  Video,
  Headphones,
  Mic,
  BookOpen,
  Smartphone,
  CheckCircle,
  XCircle,
  Volume2,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { convertMP4ToMP3, formatFileSize } from "@/lib/ffmpeg-client";

const BITRATE_OPTIONS = [
  { value: "128k", label: "128 kbps", description: "Small size, good for speech & podcasts" },
  { value: "192k", label: "192 kbps", description: "Balanced — great for most use cases" },
  { value: "256k", label: "256 kbps", description: "High quality, ideal for music" },
  { value: "320k", label: "320 kbps", description: "Maximum quality, audiophile grade" },
];

const FEATURES = [
  { icon: Shield, title: "100% Private Conversion", description: "Your files never leave your device. No data is ever uploaded to any server." },
  { icon: Zap, title: "Lightning Fast", description: "Conversion happens instantly in your browser using WebAssembly technology." },
  { icon: WifiOff, title: "No Upload Required", description: "Everything runs locally on your machine. Works completely offline." },
  { icon: Star, title: "High Quality Audio", description: "Export MP3 at up to 320 kbps for crystal-clear, lossless-quality audio." },
  { icon: Monitor, title: "Works on All Devices", description: "Fully responsive and compatible with desktop, mobile, and tablet browsers." },
  { icon: Repeat, title: "Unlimited Conversions", description: "No daily limits, no watermarks, no sign-up. Use it as many times as you want." },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video file — MP4, MOV, MKV, AVI, WEBM and more." },
  { step: "02", title: "Choose audio quality", description: "Select the bitrate that best suits your needs — from 128 kbps for podcasts up to 320 kbps for music." },
  { step: "03", title: "Click Convert", description: "Hit the Convert button. FFmpeg processes the file entirely inside your browser — no upload needed." },
  { step: "04", title: "Download your MP3", description: "Once done, click Download to save the extracted MP3 audio file to your device instantly." },
];

const QUALITY_GUIDE = [
  { bitrate: "128 kbps", use: "Podcasts & Speech", size: "~1 MB/min", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { bitrate: "192 kbps", use: "Balanced Music", size: "~1.4 MB/min", color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { bitrate: "256 kbps", use: "High Quality Music", size: "~1.9 MB/min", color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { bitrate: "320 kbps", use: "Audiophile Grade", size: "~2.4 MB/min", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
];

const USE_CASES = [
  { icon: Music, text: "Extract music from music videos" },
  { icon: Mic, text: "Create podcasts from video recordings" },
  { icon: BookOpen, text: "Save lecture audio from educational videos" },
  { icon: Smartphone, text: "Reduce file size for mobile listening" },
  { icon: Headphones, text: "Listen to video content as audio while traveling" },
];

const SUPPORTED_FORMATS = [
  { ext: "MP4", desc: "Most common video format" },
  { ext: "MOV", desc: "Apple QuickTime video" },
  { ext: "MKV", desc: "Matroska video container" },
  { ext: "AVI", desc: "Audio Video Interleave" },
  { ext: "WEBM", desc: "Web-optimised video" },
  { ext: "FLV", desc: "Flash video format" },
  { ext: "MPEG", desc: "MPEG video standard" },
  { ext: "M4V", desc: "iTunes video format" },
  { ext: "3GP", desc: "Mobile video format" },
  { ext: "WMV", desc: "Windows Media Video" },
];

const COMPARISON_ROWS = [
  { feature: "Privacy", pixocraft: "Files never leave your device", traditional: "Files uploaded to external servers" },
  { feature: "Speed", pixocraft: "Instant — no server wait time", traditional: "Depends on server load & bandwidth" },
  { feature: "Security", pixocraft: "100% secure — local processing", traditional: "Risk of data exposure or breaches" },
  { feature: "File Size Limits", pixocraft: "No limits — any file size works", traditional: "Usually capped at 100 MB or less" },
  { feature: "Internet Required", pixocraft: "Only for initial page load", traditional: "Constant connection required" },
];

const FAQS = [
  {
    question: "What is the best MP4 to MP3 converter?",
    answer: "Pixocraft's MP4 to MP3 Converter is one of the best available because it is completely free, runs entirely inside your browser without uploading your files to any server, and supports audio quality up to 320 kbps. It works offline after loading, has no file size limits, no daily usage caps, and no registration required — making it the ideal video to MP3 converter for everyone.",
  },
  {
    question: "How do I convert MP4 to MP3 online?",
    answer: "Converting is straightforward with this free mp4 to mp3 converter. Upload your MP4 or other video file using the uploader above, select your preferred bitrate (128 to 320 kbps), then click Convert. FFmpeg processes the file entirely inside your browser — no upload needed. Once done, click Download to save the extracted MP3 audio file directly to your device.",
  },
  {
    question: "Is this MP4 to MP3 converter free?",
    answer: "Yes, completely free — now and always. This video to MP3 converter has no hidden fees, no premium tiers, no watermarks on output files, and no registration required. You can use it to extract audio from video as many times as you need without any restrictions. Pixocraft is committed to keeping this tool free for everyone.",
  },
  {
    question: "Is my video file secure when converting?",
    answer: "Absolutely. When you use this mp4 to mp3 converter, your video file is never transmitted to any server. All processing happens locally in your browser using WebAssembly-based FFmpeg. Your data never leaves your computer or phone. There is no third party involved, no file storage, and no logging — making it one of the most private ways to convert video to MP3.",
  },
  {
    question: "Does the converter work offline?",
    answer: "Yes. After the page loads, this video to mp3 converter operates completely offline. No active internet connection is needed during the actual audio extraction. This makes it ideal for users with limited or metered connections, or anyone who wants to extract audio from video while traveling without relying on cloud services.",
  },
  {
    question: "What bitrate should I choose for MP3 conversion?",
    answer: "Choose 256 kbps or 320 kbps for music with rich instrumentation to get the best listening experience. For podcasts, interviews, or voice recordings where file size matters, 128 kbps is more than sufficient. 192 kbps is the recommended default — it offers an excellent balance between quality and file size for most video to MP3 conversion use cases.",
  },
  {
    question: "What video formats can I convert to MP3?",
    answer: "This tool supports MP4, MOV, MKV, AVI, WEBM, FLV, MPEG, M4V, 3GP, and WMV. The conversion engine is powered by FFmpeg, which provides broad format compatibility. Simply upload any supported video file and the tool will extract and encode the audio track to MP3 format directly in your browser.",
  },
];

const RELATED_TOOLS = [
  { label: "Video to MP3", href: "/tools/audio-to-mp3", icon: Music },
  { label: "AVI to MP3", href: "/tools/avi-to-mp3", icon: FileAudio },
  { label: "MOV to MP3", href: "/tools/mov-to-mp3", icon: FileAudio },
  { label: "MKV to MP3", href: "/tools/mkv-to-mp3", icon: FileAudio },
  { label: "WEBM to MP3", href: "/tools/webm-to-mp3", icon: FileAudio },
  { label: "Audio Converter", href: "/tools/audio-to-mp3", icon: Headphones },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "MP4 to MP3 Converter", item: "https://tools.pixocraft.in/tools/mp4-to-mp3" },
  ],
});

export default function MP4toMP3() {
  const [file, setFile] = useState<File | null>(null);
  const [mp3Blob, setMp3Blob] = useState<Blob | null>(null);
  const [converting, setConverting] = useState(false);
  const [bitrate, setBitrate] = useState("192k");
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [dots, setDots] = useState(1);
  const [elapsed, setElapsed] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!converting) { setDots(1); setElapsed(0); return; }
    const dotsInterval = setInterval(() => setDots(d => (d % 3) + 1), 500);
    const elapsedInterval = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => { clearInterval(dotsInterval); clearInterval(elapsedInterval); };
  }, [converting]);

  useSEO({
    title: "Video to MP3 Converter — Multi Format | Free & Private – Pixocraft Tools",
    description: "Convert MP4, MOV, MKV, AVI, WEBM, FLV and more to MP3 instantly in your browser. No uploads, no registration, 100% private. Supports bitrates up to 320 kbps.",
    keywords: "video to mp3 converter, mp4 to mp3, mov to mp3, mkv to mp3, avi to mp3, webm to mp3, flv to mp3, multi format video converter, extract audio from video, browser based mp3 converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/mp4-to-mp3",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  const ACCEPTED_EXTS = ["mp4", "mov", "mkv", "avi", "webm", "flv", "mpeg", "mpg", "m4v", "3gp"];

  const handleFiles = useCallback((files: FileList | null) => {
    const selectedFile = files?.[0];
    if (!selectedFile) return;
    const ext = selectedFile.name.split(".").pop()?.toLowerCase() || "";
    const isVideo = selectedFile.type.startsWith("video/") || ACCEPTED_EXTS.includes(ext);
    if (isVideo) {
      setFile(selectedFile);
      setMp3Blob(null);
      setVideoDuration(null);
      // Extract duration via HTML5 video element
      const url = URL.createObjectURL(selectedFile);
      const vid = document.createElement("video");
      vid.preload = "metadata";
      vid.onloadedmetadata = () => {
        if (isFinite(vid.duration) && vid.duration > 0) {
          setVideoDuration(vid.duration);
        }
        URL.revokeObjectURL(url);
      };
      vid.onerror = () => URL.revokeObjectURL(url);
      vid.src = url;
    } else {
      toast({ title: "Unsupported File Format", description: "Please select a video file (MP4, MOV, MKV, AVI, WEBM, FLV, MPEG, M4V, 3GP).", variant: "destructive" });
    }
  }, [toast]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => handleFiles(e.target.files);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const convert = async () => {
    if (!file) return;
    setConverting(true);
    setMp3Blob(null);
    setProgress(0);
    setStatusText("Loading");
    try {
      const result = await convertMP4ToMP3(file, bitrate, ({ ratio }) => {
        const pct = Math.min(Math.round(ratio * 100), 99);
        setProgress(pct);
        if (pct < 20) setStatusText("Analysing your file");
        else if (pct < 85) setStatusText("Converting");
        else setStatusText("Almost done");
      });
      setProgress(100);
      setStatusText("Complete!");
      setMp3Blob(result);
      toast({ title: "Conversion Complete!", description: "Your MP3 file is ready to download." });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "";
      if (msg.includes("memory") || msg.includes("OOM")) {
        toast({ title: "File Too Large", description: "The file is too large for browser memory. Try a shorter clip.", variant: "destructive" });
      } else {
        toast({ title: "Conversion Failed", description: "Could not extract audio. Make sure the file has an audio track.", variant: "destructive" });
      }
      setStatusText("");
    } finally {
      setConverting(false);
    }
  };

  const download = () => {
    if (!mp3Blob) return;
    const url = URL.createObjectURL(mp3Blob);
    const link = document.createElement("a");
    link.download = file?.name.replace(/\.[^.]+$/, ".mp3") || "audio.mp3";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => { setFile(null); setMp3Blob(null); setProgress(0); setStatusText(""); setVideoDuration(null); };

  return (
    <>
      <StructuredData data={generateFAQSchema(FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Video to MP3 Converter — MP4, MOV, MKV, AVI, WEBM & More",
        description: "Free browser-based video to MP3 converter. Convert MP4, MOV, MKV, AVI, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 audio instantly with no uploads, no registration, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/mp4-to-mp3",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Convert MP4 to MP3",
        description: "Convert any MP4 video to MP3 audio in 4 simple steps using Pixocraft's free browser-based converter.",
        steps: HOW_TO_STEPS.map(s => ({ name: s.title, text: s.description })),
      })} />

      <div className="min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Media Tools", url: "/tools/media" }, { label: "MP4 to MP3" }]} />
        </div>

        {/* ── HERO ── */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Music className="h-8 w-8 text-primary" aria-label="MP4 to MP3 converter icon" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Video to MP3 Converter —<br className="hidden sm:block" /> Free, Fast &amp; Private
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3">
            Convert any video to MP3 audio instantly in your browser.
            No uploads. No registration. 100% secure and private.
          </p>
          <p className="text-sm text-muted-foreground mb-6">Supports MP4, MOV, MKV, AVI, WEBM, FLV and more.</p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-private"><Shield className="h-3 w-3 mr-1" />100% Private</Badge>
            <Badge variant="secondary" data-testid="badge-no-upload"><WifiOff className="h-3 w-3 mr-1" />No Upload Required</Badge>
            <Badge variant="secondary" data-testid="badge-instant"><Zap className="h-3 w-3 mr-1" />Instant Conversion</Badge>
            <Badge variant="secondary" data-testid="badge-free"><Star className="h-3 w-3 mr-1" />Free Forever</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Works offline in your browser. No software installation needed.</p>
        </section>

        {/* ── TOOL ── */}
        <section id="converter" className="container mx-auto px-4 max-w-3xl pb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Video to MP3 Converter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!file ? (
                <div
                  data-testid="upload-area"
                  className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${isDragging ? "border-primary bg-primary/5" : "border-border hover-elevate"}`}
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-base font-medium mb-1">Drag and drop your video file here</p>
                  <p className="text-sm text-muted-foreground mb-4">or</p>
                  <Button data-testid="button-upload" type="button">Upload Video File</Button>
                  <p className="text-xs text-muted-foreground mt-4">MP4 · MOV · MKV · AVI · WEBM · FLV · MPEG · M4V · 3GP</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,.mp4,.mov,.mkv,.avi,.webm,.flv,.mpeg,.m4v,.3gp"
                    onChange={handleFileInput}
                    className="hidden"
                    data-testid="input-file"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  {/* File info */}
                  <div className="flex items-start justify-between gap-2 p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileAudio className="h-8 w-8 text-primary shrink-0" />
                      <div className="min-w-0 space-y-0.5">
                        <p className="font-medium text-sm truncate" data-testid="text-filename">{file.name}</p>
                        <p className="text-xs text-muted-foreground" data-testid="text-filesize">
                          Size: {formatFileSize(file.size)}
                          {videoDuration != null && (
                            <> · Duration: {Math.floor(videoDuration / 60)}:{String(Math.floor(videoDuration % 60)).padStart(2, "0")}</>
                          )}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={reset} data-testid="button-reset" className="shrink-0" disabled={converting}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Bitrate selector */}
                  <div>
                    <p className="text-sm font-medium mb-3">Audio Quality</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BITRATE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          data-testid={`button-bitrate-${opt.value}`}
                          onClick={() => !converting && setBitrate(opt.value)}
                          disabled={converting}
                          className={`rounded-md border p-3 text-left transition-colors toggle-elevate disabled:opacity-50 disabled:cursor-not-allowed ${bitrate === opt.value ? "border-primary bg-primary/10 toggle-elevated" : "border-border"}`}
                        >
                          <p className="font-semibold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{opt.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Convert / Download buttons */}
                  <div className="flex flex-wrap gap-3">
                    {!mp3Blob ? (
                      <Button onClick={convert} disabled={converting} className="flex-1" data-testid="button-convert">
                        {converting ? "Converting…" : "Convert to MP3"}
                      </Button>
                    ) : (
                      <>
                        <Button onClick={download} className="flex-1" data-testid="button-download">
                          <Download className="mr-2 h-4 w-4" />
                          Download MP3 ({formatFileSize(mp3Blob.size)})
                        </Button>
                        <Button onClick={reset} variant="outline" data-testid="button-convert-another">
                          Convert Another
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Progress / activity indicator */}
                  {converting && (
                    <div className="space-y-3 rounded-lg border bg-muted/30 p-4" data-testid="section-progress">
                      {/* Status row */}
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 text-primary animate-spin shrink-0" />
                        <span className="text-sm font-medium flex-1 min-w-0 truncate" data-testid="text-status">
                          {statusText || "Processing"}{statusText === "Complete!" ? "" : ".".repeat(dots)}
                        </span>
                        <span className="text-xs text-muted-foreground shrink-0 tabular-nums">
                          {elapsed}s
                        </span>
                      </div>

                      {/* Progress bar — indeterminate shimmer while at 0%, real fill after */}
                      <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                        {progress === 0 ? (
                          <div className="h-full w-full relative overflow-hidden rounded-full">
                            <div className="absolute inset-0 bg-primary/30 rounded-full" />
                            <div
                              className="absolute inset-y-0 w-1/3 bg-primary rounded-full"
                              style={{ animation: "shimmer-scan 1.4s ease-in-out infinite" }}
                            />
                          </div>
                        ) : (
                          <div
                            className="h-full rounded-full bg-primary transition-all duration-500"
                            style={{ width: `${progress}%` }}
                            data-testid="progress-bar"
                          />
                        )}
                      </div>

                      {/* Bottom row: percentage + hint for big files */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {progress === 0
                            ? "Please wait — large files may take a moment to start"
                            : "Actively processing your file, please keep this tab open"}
                        </span>
                        <span className="tabular-nums shrink-0 ml-2">{progress > 0 ? `${progress}%` : ""}</span>
                      </div>
                    </div>
                  )}

                  {/* Success state */}
                  {mp3Blob && !converting && (
                    <p className="text-sm text-center text-green-600 dark:text-green-400 font-medium" data-testid="text-success">
                      Converted successfully
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* ── FEATURES ── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Use Pixocraft MP4 to MP3 Converter?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Built for speed, privacy, and quality — with no compromises.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {FEATURES.map((f) => (
                <Card key={f.title} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <f.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW TO ── */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Convert MP4 to MP3</h2>
              <p className="text-muted-foreground">Four simple steps to extract audio from any video.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {HOW_TO_STEPS.map((s) => (
                <div key={s.step} className="text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">{s.step}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BEST MP4 TO MP3 CONVERTER ONLINE ── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Best MP4 to MP3 Converter Online</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                When it comes to finding the <strong className="text-foreground">best MP4 to MP3 converter online</strong>, the most important factors are privacy, speed, and reliability. Pixocraft's MP4 to MP3 Converter checks every box — and then some. Unlike many other online converters that require you to upload your video to a remote server, Pixocraft's tool is entirely browser-based. Your file is processed locally using WebAssembly-powered FFmpeg, which means the conversion happens directly on your device without any data ever being sent over the internet.
              </p>
              <p>
                This approach offers significant advantages. First, <strong className="text-foreground">privacy is guaranteed</strong>. Since your files never leave your computer, there is zero risk of your private video content being stored, accessed, or leaked by a third party. Second, the conversion is <strong className="text-foreground">dramatically faster</strong> than server-based tools. There is no upload time, no queue, and no server-side processing delay. The audio extraction begins the moment you click Convert.
              </p>
              <p>
                Pixocraft's converter also stands out for its <strong className="text-foreground">unlimited usage policy</strong>. Many competing tools impose daily limits, file size caps, or require you to create an account after a few free conversions. Here, there are no such restrictions. You can convert as many video files as you want, whenever you want, completely free.
              </p>
              <p>
                The tool supports multiple video formats beyond just MP4, including AVI, MOV, MKV, WEBM, FLV, and MPEG — making it a truly versatile <strong className="text-foreground">video to audio converter</strong>. Whether you need to extract a song from a concert recording, pull audio from a lecture video, or convert a movie clip to MP3 for offline listening, Pixocraft handles it all with ease and precision.
              </p>
            </div>
          </div>
        </section>

        {/* ── CONVERT MP4 TO MP3 ONLINE FOR FREE ── */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Convert MP4 to MP3 Online for Free</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Looking for a way to <strong className="text-foreground">convert MP4 to MP3 online for free</strong>? You've found the right tool. Pixocraft's MP3 converter is completely free to use — no subscription, no sign-up, no watermarks, and no hidden charges. Simply open the page, upload your video, and download your MP3 within seconds. It is as straightforward as it gets.
              </p>
              <p>
                One of the biggest frustrations with many free online converters is the requirement to create an account before you can use the full feature set. Pixocraft eliminates this entirely. There is <strong className="text-foreground">no registration required</strong>. You don't need to enter your email address, verify a phone number, or go through any onboarding process. Just open the converter and start extracting audio immediately.
              </p>
              <p>
                The tool works on <strong className="text-foreground">all devices and operating systems</strong>. Whether you're using a Windows PC, a Mac, a Linux machine, an Android smartphone, or an iPhone, the converter runs seamlessly in any modern web browser — Chrome, Firefox, Safari, or Edge. No software installation is needed.
              </p>
              <p>
                Output quality is not compromised either. You can choose from <strong className="text-foreground">four bitrate options</strong> — 128 kbps, 192 kbps, 256 kbps, and 320 kbps — giving you full control over the balance between file size and audio quality. Whether you want a small podcast file or a high-fidelity music track, this free MP4 to MP3 converter has you covered.
              </p>
              <p>
                With <strong className="text-foreground">unlimited conversions</strong> and no daily caps, Pixocraft is truly the most user-friendly and accessible MP4 audio extractor available online today. Bookmark this page and use it whenever you need to convert video to audio — it will always be free.
              </p>
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Browser Converter vs Online Upload Converter</h2>
              <p className="text-muted-foreground">See why a browser-based MP4 to MP3 converter is the smarter choice.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left p-4 font-semibold bg-muted rounded-tl-md">Feature</th>
                    <th className="text-center p-4 font-semibold bg-primary/10 text-primary">Pixocraft Converter</th>
                    <th className="text-center p-4 font-semibold bg-muted rounded-tr-md">Traditional Upload Converters</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="p-4 font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                          <span className="text-green-600 dark:text-green-400">{row.pixocraft}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <XCircle className="h-4 w-4 text-red-500 shrink-0" />
                          <span className="text-muted-foreground">{row.traditional}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── QUALITY GUIDE ── */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Choose the Best MP3 Quality</h2>
              <p className="text-muted-foreground">Select the bitrate that matches your use case.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {QUALITY_GUIDE.map((q) => (
                <Card key={q.bitrate} className="p-5 text-center">
                  <div className={`inline-flex px-3 py-1 rounded-md text-sm font-bold mb-3 ${q.color}`}>
                    {q.bitrate}
                  </div>
                  <p className="font-semibold text-sm mb-1">{q.use}</p>
                  <p className="text-xs text-muted-foreground">{q.size}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIPS FOR BEST QUALITY ── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Volume2 className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold">Tips for Best MP3 Audio Quality</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Getting the best audio quality from your MP4 to MP3 conversion depends on a few key factors. Understanding these will help you make the right choices every time.
              </p>
              <p>
                <strong className="text-foreground">Choose the correct bitrate for your content.</strong> Bitrate is the most critical setting. For music with rich instrumentation — orchestras, EDM, rock — always select 256 kbps or 320 kbps. These higher bitrates preserve the full dynamic range and subtle details of the audio. For speech-heavy content like interviews, lectures, or podcasts, 128 kbps is perfectly adequate and results in a file that is roughly half the size of a 320 kbps export.
              </p>
              <p>
                <strong className="text-foreground">Consider the quality of your source video.</strong> MP3 conversion cannot add quality that was not present in the original recording. If the MP4 file was recorded with a low-quality microphone or encoded at a low audio bitrate, selecting 320 kbps in the converter will not improve the sound — it will simply produce a larger file. Always start with the highest quality source available.
              </p>
              <p>
                <strong className="text-foreground">Balance file size against quality.</strong> A 320 kbps MP3 is approximately 2.4 MB per minute, while 128 kbps is around 1 MB per minute. For content you plan to store in large quantities or stream on mobile data, opting for 192 kbps is an excellent middle ground — it delivers noticeably better quality than 128 kbps while keeping file sizes manageable.
              </p>
              <p>
                <strong className="text-foreground">Use 192 kbps as your safe default.</strong> When in doubt, 192 kbps offers a balanced tradeoff that works well for virtually any type of audio content, making it the recommended starting point for most users.
              </p>
            </div>
          </div>
        </section>

        {/* ── MP4 vs MP3 ── */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">MP4 vs MP3 — What's the Difference?</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                    <Video className="h-5 w-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold">MP4</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>A video container format</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Contains both video and audio tracks</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Larger file sizes due to video data</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Used for movies, recordings, screen captures</li>
                </ul>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                    <Music className="h-5 w-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold">MP3</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>An audio-only format</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Contains only the audio track</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Much smaller file sizes</li>
                  <li className="flex items-start gap-2"><span className="text-primary mt-0.5">▸</span>Used for music, podcasts, audiobooks</li>
                </ul>
              </Card>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              When you convert MP4 to MP3, the video track is stripped away and only the audio stream is extracted and saved as a smaller, portable MP3 file.
            </p>
          </div>
        </section>

        {/* ── USE CASES ── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why People Convert MP4 to MP3</h2>
              <p className="text-muted-foreground">Common use cases for extracting audio from video.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
              {USE_CASES.map((u) => (
                <div key={u.text} className="flex items-center gap-2 bg-background border rounded-md px-4 py-3">
                  <u.icon className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">{u.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SUPPORTED FORMATS ── */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Supported Video Input Formats</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                This MP4 to MP3 converter accepts all major video formats. Upload any of the formats below to extract high-quality MP3 audio.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-4xl mx-auto">
              {SUPPORTED_FORMATS.map((fmt) => (
                <div key={fmt.ext} className="flex flex-col items-center gap-1 border rounded-md p-3 text-center">
                  <span className="font-bold text-primary text-sm">{fmt.ext}</span>
                  <span className="text-xs text-muted-foreground leading-snug">{fmt.desc}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              All formats are converted to MP3 audio entirely in your browser — no upload required.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about converting MP4 to MP3.</p>
            </div>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <Card key={i}>
                  <button
                    className="w-full text-left p-5 flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                  >
                    <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`faq-answer-${i}`}>{faq.answer}</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONVERT VIDEO TO MP3 INSTANTLY ── */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Convert Video to MP3 Instantly in Your Browser</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                This <strong className="text-foreground">free mp4 to mp3 converter</strong> runs entirely inside your browser using WebAssembly-compiled FFmpeg — the same powerful multimedia engine trusted by professional video editors and broadcasters worldwide. When you click Convert, your video is processed locally on your device. No file is ever uploaded to a remote server, and no internet connection is needed after the page loads.
              </p>
              <p>
                <strong className="text-foreground">Why browser-based conversion is faster.</strong> Traditional online tools require you to upload your entire video file to a server, wait in a processing queue behind other users, and then download the result back to your device. For a large video, this can take several minutes. With Pixocraft's browser-based approach, the complete conversion pipeline runs locally — which means a 500 MB file that might take five minutes on a remote server can be done in well under a minute on a modern laptop or phone.
              </p>
              <p>
                <strong className="text-foreground">Complete privacy, by design.</strong> When you upload a file to an external conversion service, you are trusting that server to handle your content responsibly. Private videos, business recordings, and personal audio are all at risk. With this <strong className="text-foreground">video to mp3 converter</strong>, that risk is eliminated entirely. Your file never leaves your browser — there is no server, no storage, and no logging of any kind.
              </p>
              <p>
                <strong className="text-foreground">Works offline after loading.</strong> Once the page and FFmpeg engine have loaded, you can disconnect from the internet entirely and continue converting videos to MP3 without interruption. This makes it ideal for users on limited or metered connections, travelers who need to <strong className="text-foreground">extract audio from video</strong> without Wi-Fi, and anyone working in low-connectivity environments.
              </p>
              <p>
                <strong className="text-foreground">No limits, ever.</strong> Many competing converters cap daily usage, restrict file sizes, or require account sign-up after a few free conversions. Pixocraft imposes none of these restrictions. Convert as many videos as you need, at any file size, with any supported format — completely free, without ever creating an account or providing an email address.
              </p>
            </div>
          </div>
        </section>

        {/* ── LONG-FORM SEO TEXT BLOCK ── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Free MP4 to MP3 Converter Online — Extract Audio from Any Video</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                The demand for a reliable <strong className="text-foreground">free MP4 to MP3 converter online</strong> has grown significantly as more people consume video content and want to extract audio for offline listening. Whether you're a student saving lecture recordings, a music fan extracting songs from concert videos, or a content creator repurposing video into podcast audio, having a fast and trustworthy <strong className="text-foreground">MP4 audio extractor</strong> is essential.
              </p>
              <p>
                Pixocraft's converter is built around one core principle: your data belongs to you. Every other online tool that requires you to upload your video file introduces a privacy risk. When you send a file to a server, you are trusting that server's operators to handle your content responsibly. With Pixocraft, that trust is never needed — because your file never leaves your browser. This is the gold standard for any <strong className="text-foreground">convert video audio to MP3</strong> tool.
              </p>
              <p>
                The underlying technology is WebAssembly-compiled FFmpeg, the industry-leading multimedia framework used by professional video editors, broadcasters, and developers worldwide. By bringing FFmpeg directly into your browser, Pixocraft delivers the same robust <strong className="text-foreground">extract audio from video</strong> capability that professionals rely on — packaged into a simple, no-install web tool that anyone can use.
              </p>
              <p>
                Speed is another key advantage. Traditional upload-based converters make you wait for your file to travel to a server, be queued behind other users, processed remotely, and then downloaded back to your device. That process can take minutes for a large video file. With browser-based conversion, the entire pipeline completes locally. A 500 MB video file that might take five minutes to process on a server can be done in under a minute on a modern laptop using this <strong className="text-foreground">best MP4 audio extractor</strong>.
              </p>
              <p>
                Accessibility and inclusivity are also priorities. Many people around the world have limited or expensive internet connections. Because Pixocraft's converter only requires an internet connection to load the page — not to perform the actual conversion — it is highly practical even in regions with slow or metered data. Once the page is loaded, you can disconnect entirely and still <strong className="text-foreground">convert video to MP3</strong> without issue.
              </p>
              <p>
                This tool is optimized for Core Web Vitals and delivers an excellent Lighthouse performance score. The page uses minimal JavaScript, renders with no layout shifts, and loads essential resources only when needed. This means a fast experience from the first byte to the final download — consistent with Pixocraft's commitment to building tools that respect both your time and your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* ── RELATED TOOLS ── */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Related Video &amp; Audio Tools</h2>
              <p className="text-muted-foreground">More free tools from Pixocraft to help you work with audio and video.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {RELATED_TOOLS.map((tool) => (
                <Link key={tool.label} href={tool.href}>
                  <Card className="p-4 text-center hover-elevate cursor-pointer h-full">
                    <tool.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                    <p className="text-xs font-medium leading-snug">{tool.label}</p>
                    <ArrowRight className="h-3 w-3 text-muted-foreground mx-auto mt-2" />
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER LINK ── */}
        <div className="border-t">
          <p className="text-center text-sm text-muted-foreground py-6">
            Category:{" "}
            <Link href="/tools/media" className="text-primary hover:underline transition-colors">
              Media Tools
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
