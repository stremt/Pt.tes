import { useState, useRef, useCallback } from "react";
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
  ArrowRight,
  Headphones,
  Video,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { convertMP4ToMP3, formatFileSize } from "@/lib/ffmpeg-client";

const OG_IMAGE = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop";

const BITRATE_OPTIONS = [
  { value: "128k", label: "128 kbps", description: "Small size, podcasts & speech" },
  { value: "192k", label: "192 kbps", description: "Balanced for most use cases" },
  { value: "256k", label: "256 kbps", description: "High quality music" },
  { value: "320k", label: "320 kbps", description: "Maximum audiophile quality" },
];

const FEATURES = [
  { icon: Shield, title: "100% Private", description: "Your files never leave your device. No data uploaded to any server." },
  { icon: Zap, title: "Lightning Fast", description: "Conversion runs instantly in your browser using WebAssembly FFmpeg." },
  { icon: WifiOff, title: "No Upload Needed", description: "Works entirely offline after the page loads." },
  { icon: Star, title: "High Quality Audio", description: "Export MP3 up to 320 kbps for the best audio fidelity." },
  { icon: Monitor, title: "All Devices", description: "Works on desktop, tablet, and mobile — any modern browser." },
  { icon: Repeat, title: "Unlimited Free Use", description: "No sign-up, no daily limits, no watermarks. Always free." },
];

export interface FormatConfig {
  format: string;
  formatLabel: string;
  accept: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  h1: string;
  subheading: string;
  canonicalUrl: string;
  faqs: { question: string; answer: string }[];
}

interface Props {
  config: FormatConfig;
}

const generateBreadcrumbSchema = (config: FormatConfig) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: config.title, item: config.canonicalUrl },
  ],
});

export function VideoToMP3Page({ config }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [mp3Blob, setMp3Blob] = useState<Blob | null>(null);
  const [converting, setConverting] = useState(false);
  const [bitrate, setBitrate] = useState("192k");
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: config.metaTitle,
    description: config.metaDescription,
    keywords: config.keywords,
    canonicalUrl: config.canonicalUrl,
    ogImage: OG_IMAGE,
  });

  const handleFiles = useCallback((files: FileList | null) => {
    const selectedFile = files?.[0];
    if (!selectedFile) return;
    if (selectedFile.type.startsWith("video/") || selectedFile.name.toLowerCase().endsWith(`.${config.format.toLowerCase()}`)) {
      setFile(selectedFile);
      setMp3Blob(null);
    } else {
      toast({ title: "Invalid File", description: `Please select a valid ${config.format} video file.`, variant: "destructive" });
    }
  }, [toast, config.format]);

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
    try {
      const result = await convertMP4ToMP3(file, bitrate);
      setMp3Blob(result);
      toast({ title: "Conversion Complete!", description: "Your MP3 file is ready to download." });
    } catch {
      toast({ title: "Conversion Failed", description: "Could not extract audio. Try a different file.", variant: "destructive" });
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

  const reset = () => { setFile(null); setMp3Blob(null); };

  const howToSteps = [
    { name: `Upload your ${config.format} file`, text: `Click the upload area or drag and drop your ${config.format} video file.` },
    { name: "Choose audio quality", text: "Select a bitrate from 128 kbps (podcasts) to 320 kbps (music)." },
    { name: "Click Convert", text: "Hit Convert. FFmpeg processes the file entirely in your browser." },
    { name: "Download your MP3", text: "Click Download to save the extracted MP3 audio file instantly." },
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema(config.faqs)} />
      <StructuredData data={generateBreadcrumbSchema(config)} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: config.title,
        description: config.metaDescription,
        url: config.canonicalUrl,
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: `How to Convert ${config.format} to MP3`,
        description: `Convert ${config.format} video to MP3 audio in 4 easy steps using this free browser-based tool.`,
        steps: howToSteps,
      })} />

      <div className="min-h-screen">
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: config.title },
          ]} />
        </div>

        {/* HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Music className="h-8 w-8 text-primary" aria-label={`${config.format} to MP3 converter`} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{config.h1}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">{config.subheading}</p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary"><Shield className="h-3 w-3 mr-1" />100% Private</Badge>
            <Badge variant="secondary"><WifiOff className="h-3 w-3 mr-1" />No Upload Required</Badge>
            <Badge variant="secondary"><Zap className="h-3 w-3 mr-1" />Instant Conversion</Badge>
            <Badge variant="secondary"><Star className="h-3 w-3 mr-1" />Free Forever</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Works offline in your browser. No software installation required.</p>
        </section>

        {/* TOOL */}
        <section className="container mx-auto px-4 max-w-3xl pb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{config.title}</CardTitle>
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
                  <p className="text-base font-medium mb-1">Drag and drop your {config.format} file here</p>
                  <p className="text-sm text-muted-foreground mb-4">or</p>
                  <Button data-testid="button-upload" type="button">Upload {config.format} File</Button>
                  <p className="text-xs text-muted-foreground mt-4">Supports {config.formatLabel}</p>
                  <input ref={fileInputRef} type="file" accept={config.accept} onChange={handleFileInput} className="hidden" data-testid="input-file" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-2 p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3 min-w-0">
                      <FileAudio className="h-8 w-8 text-primary shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate" data-testid="text-filename">{file.name}</p>
                        <p className="text-xs text-muted-foreground" data-testid="text-filesize">{formatFileSize(file.size)}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={reset} data-testid="button-reset" className="shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-3">Audio Quality</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BITRATE_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          data-testid={`button-bitrate-${opt.value}`}
                          onClick={() => setBitrate(opt.value)}
                          className={`rounded-md border p-3 text-left transition-colors toggle-elevate ${bitrate === opt.value ? "border-primary bg-primary/10 toggle-elevated" : "border-border"}`}
                        >
                          <p className="font-semibold text-sm">{opt.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{opt.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={convert} disabled={converting} className="flex-1" data-testid="button-convert">
                      {converting ? "Converting…" : `Convert ${config.format} to MP3`}
                    </Button>
                    {mp3Blob && (
                      <Button onClick={download} variant="outline" className="flex-1" data-testid="button-download">
                        <Download className="mr-2 h-4 w-4" />
                        Download MP3 ({formatFileSize(mp3Blob.size)})
                      </Button>
                    )}
                  </div>
                  {converting && (
                    <p className="text-sm text-muted-foreground text-center">Processing audio with FFmpeg in your browser…</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* FEATURES */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Use This {config.format} to MP3 Converter?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Free, private, and instant — no compromises.</p>
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

        {/* HOW TO */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Convert {config.format} to MP3</h2>
              <p className="text-muted-foreground">Four simple steps — done entirely in your browser.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {howToSteps.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-primary">0{i + 1}</span>
                  </div>
                  <h3 className="font-semibold mb-2">{s.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Common questions about converting {config.format} to MP3.</p>
            </div>
            <div className="space-y-3">
              {config.faqs.map((faq, i) => (
                <Card key={i}>
                  <button
                    className="w-full text-left p-5 flex items-center justify-between gap-4"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                  >
                    <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
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

        {/* RELATED TOOLS */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Related Video &amp; Audio Tools</h2>
              <p className="text-muted-foreground">More free tools from Pixocraft.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { label: "MP4 to MP3", href: "/tools/mp4-to-mp3", icon: Music },
                { label: "AVI to MP3", href: "/tools/avi-to-mp3", icon: FileAudio },
                { label: "MOV to MP3", href: "/tools/mov-to-mp3", icon: FileAudio },
                { label: "MKV to MP3", href: "/tools/mkv-to-mp3", icon: FileAudio },
                { label: "WEBM to MP3", href: "/tools/webm-to-mp3", icon: FileAudio },
                { label: "Video Compressor", href: "/tools/video-compressor", icon: Video },
              ].map((tool) => (
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

        <div className="border-t">
          <p className="text-center text-sm text-muted-foreground py-6">
            Category:{" "}
            <Link href="/tools/media" className="text-primary hover:underline transition-colors">Media Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
