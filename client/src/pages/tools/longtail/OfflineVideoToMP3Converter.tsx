import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, generateHowToSchema } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/Breadcrumb";
import VideoToMP3Converter from "@/components/VideoToMP3Converter";
import { Link } from "wouter";
import {
  Shield,
  Zap,
  WifiOff,
  Star,
  Monitor,
  Repeat,
  FileAudio,
  Music,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  Globe,
  Cpu,
  Lock,
} from "lucide-react";

const PAGE_FAQS = [
  {
    question: "Can I convert video to MP3 offline?",
    answer: "Yes. Pixocraft's offline video to MP3 converter uses WebAssembly FFmpeg, which loads into your browser when the page first opens. After that initial load, no internet connection is needed at any point during conversion. Your video file is read from your local device, processed entirely inside your browser tab, and the MP3 is saved back to your device — all without any network activity. Once the page is loaded, you can disable Wi-Fi or mobile data and the converter continues to work perfectly.",
  },
  {
    question: "Does Pixocraft require internet for conversion?",
    answer: "No. Internet is only needed once — when you first load the page — to deliver the WebAssembly FFmpeg engine and the page assets to your browser. After that single load, the converter is fully self-contained on your device and operates independently of any network connection. You can disconnect completely and convert as many video files as you want. The actual MP3 conversion process itself generates zero network traffic at any stage — no upload, no API call, no telemetry.",
  },
  {
    question: "Is my video secure during conversion?",
    answer: "Your video is completely secure. Because conversion runs locally inside your browser using the WebAssembly FFmpeg engine, your video file never leaves your device. No data is transmitted to any server, no file is stored remotely, and no conversion activity is logged. This is a structural security guarantee — the tool's architecture makes it technically impossible for any external party to access your video, because it is never sent anywhere. Your file exists only in your browser's local memory during processing.",
  },
  {
    question: "Can I convert multiple videos offline?",
    answer: "Yes, batch conversion is fully supported offline. After the page loads, drag multiple video files onto the upload area or select several files via the file picker. The WebAssembly FFmpeg engine processes each file sequentially inside your browser without any internet connection. Every file gets its own progress bar and download button, and all completed MP3 files can be downloaded together as a ZIP archive. There are no batch limits, no file count caps, and no session restrictions — all processing happens locally.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "For music and richly produced audio, choose 256 kbps or 320 kbps for the highest fidelity. For spoken word content such as lectures, podcasts, interviews, and recorded meetings where file size matters more, 128 kbps delivers clear and intelligible audio very efficiently. The 192 kbps default is an excellent all-purpose choice that balances quality and file size well for most offline video to MP3 conversion use cases — suitable for both music and voice recordings regardless of the original video format.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Load the converter page", description: "Open this page in any modern browser. The WebAssembly FFmpeg engine loads into your browser on this first visit. After this, no internet connection is needed for any conversion." },
  { step: "02", title: "Select your video file", description: "Drag and drop any supported video file onto the upload area, or click to browse your local device. Your file is read locally — nothing is uploaded to any server." },
  { step: "03", title: "Choose MP3 bitrate", description: "Select output quality from 128 kbps to 320 kbps. All bitrate options are available offline with no restrictions — no tier is locked or requires a connection to unlock." },
  { step: "04", title: "Convert and download offline", description: "Click Convert. FFmpeg WebAssembly processes the video entirely on your device. Download the MP3 when done — the entire process requires zero internet after the page first loaded." },
];

const SUPPORTED_FORMATS = [
  { ext: "MP4", desc: "Most common video format" },
  { ext: "AVI", desc: "Audio Video Interleave" },
  { ext: "MOV", desc: "Apple QuickTime video" },
  { ext: "MKV", desc: "Matroska video container" },
  { ext: "WEBM", desc: "Web-optimised video" },
  { ext: "FLV", desc: "Flash video format" },
  { ext: "MPEG", desc: "MPEG video standard" },
  { ext: "M4V", desc: "iTunes video format" },
  { ext: "3GP", desc: "Mobile video format" },
  { ext: "WMV", desc: "Windows Media Video" },
];

const FEATURES = [
  { icon: Cpu, title: "Local Conversion Engine", description: "WebAssembly FFmpeg runs the full multimedia processing pipeline on your device's CPU. No cloud compute, no server infrastructure — all conversion happens inside your browser tab offline." },
  { icon: Repeat, title: "Unlimited Usage", description: "Convert as many video files as needed offline, with no daily caps, no session limits, and no file count restrictions. All conversions run locally with no usage metering of any kind." },
  { icon: Star, title: "Batch Video Processing", description: "Drop multiple video files at once and the offline converter processes each in sequence. Every file receives its own progress bar and download button — all handled locally." },
  { icon: Music, title: "High-Quality MP3 Output", description: "Choose from four bitrate options up to 320 kbps. All quality tiers are fully available offline — no bitrate option requires a server connection or subscription to use." },
  { icon: Lock, title: "Complete Privacy", description: "Files never leave your device. The offline architecture ensures your video content stays entirely under your control — no server access, no data logging, no third-party exposure." },
  { icon: WifiOff, title: "True Offline Operation", description: "After the page loads, disconnect entirely and keep converting. The WebAssembly engine is self-contained in your browser — no internet connection is needed at any point during offline conversion." },
];

const RELATED_TOOLS = [
  { label: "Browser Video to MP3 Converter", href: "/tools/browser-video-to-mp3-converter", icon: Globe },
  { label: "Convert Video to MP3 Without Upload", href: "/tools/convert-video-to-mp3-without-upload", icon: Lock },
  { label: "Video to MP3 Converter", href: "/tools/video-to-mp3-converter", icon: Music },
  { label: "Free Video to MP3 Converter", href: "/tools/free-video-to-mp3-converter", icon: Music },
  { label: "Extract Audio From Video", href: "/tools/extract-audio-from-video", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "MP4 to MP3 Converter", item: "https://tools.pixocraft.in/tools/mp4-to-mp3" },
    { "@type": "ListItem", position: 5, name: "Offline Video to MP3 Converter", item: "https://tools.pixocraft.in/tools/offline-video-to-mp3-converter" },
  ],
});

export default function OfflineVideoToMP3Converter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Offline Video to MP3 Converter (Private & Fast) | Pixocraft Tools",
    description: "Convert video to MP3 offline using Pixocraft's browser-based converter. Extract audio locally without uploads, registration, or internet processing.",
    keywords: "offline video to mp3 converter, video to mp3 converter offline, offline mp3 extractor, convert video to mp3 offline, browser video to mp3 converter, private video to mp3 converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/offline-video-to-mp3-converter",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Offline Video to MP3 Converter — Convert Videos Without Internet",
        description: "Browser-based offline video to MP3 converter powered by WebAssembly FFmpeg. Convert MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 locally after page load with no internet required, no uploads, and complete privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/offline-video-to-mp3-converter",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Convert Video to MP3 Offline",
        description: "Convert any video file to MP3 offline in 4 steps using Pixocraft's browser-based converter — no uploads, no server, no internet connection needed after the initial page load.",
        steps: HOW_TO_STEPS.map(s => ({ name: s.title, text: s.description })),
      })} />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: "MP4 to MP3 Converter", url: "/tools/mp4-to-mp3" },
            { label: "Offline Video to MP3 Converter" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <WifiOff className="h-8 w-8 text-primary" aria-label="offline video to mp3 converter" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Offline Video to MP3 Converter —<br className="hidden md:block" /> Convert Videos Without Internet
          </h1>
          <p className="text-xs text-muted-foreground mb-4">Part of the Pixocraft MP4 to MP3 Converter Tool Suite</p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Convert video files to MP3 audio using Pixocraft's offline video to MP3 converter. After loading the tool, all video processing happens locally in your browser without requiring an internet connection.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-offline">
              <WifiOff className="h-3 w-3 mr-1" />Works offline after page load
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <Shield className="h-3 w-3 mr-1" />No uploads required
            </Badge>
            <Badge variant="secondary" data-testid="badge-private">
              <Lock className="h-3 w-3 mr-1" />Private local conversion
            </Badge>
            <Badge variant="secondary" data-testid="badge-formats">
              <Star className="h-3 w-3 mr-1" />Supports multiple video formats
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Repeat className="h-3 w-3 mr-1" />Unlimited video conversions
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            No registration. No software installation. No server uploads. Convert completely offline after first load.
          </p>
        </section>


{/* SECTION 2 — TOOL INTERFACE */}
        <section id="converter" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Offline Video to MP3 Converter" />
        </section>

        {/* SECTION 3 — WHAT IS AN OFFLINE VIDEO TO MP3 CONVERTER */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Is an Offline Video to MP3 Converter?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                An <strong className="text-foreground">offline video to MP3 converter</strong> is a tool that extracts and encodes the audio track from a video file entirely on your local device — without requiring an internet connection during the conversion process and without uploading the video file to any remote server. Unlike traditional upload-based online converters, an offline converter runs its processing engine locally, using your device's own computing resources to handle every stage of the conversion pipeline.
              </p>
              <p>
                Pixocraft's <strong className="text-foreground">video to MP3 converter offline</strong> tool achieves this through WebAssembly FFmpeg — a full-featured build of the FFmpeg multimedia framework that runs natively inside your web browser. When you first open the page, the WebAssembly module is delivered to your browser and loaded into memory. From that point forward, the converter is entirely self-contained. You can disconnect from the internet, and the tool continues to function exactly as it did when you were connected. The browser simply executes the WebAssembly code using your device's CPU, with no external dependencies required.
              </p>
              <p>
                The distinction between offline converters and standard online tools matters in several important ways. <strong className="text-foreground">Offline converters do not require file uploads</strong> — your video is read directly from your local file system, processed in your browser's memory, and the output MP3 is written back to your device. At no point does any data cross a network boundary. This makes the tool genuinely suitable for use in environments with no internet access — on aircraft, in remote locations, on corporate networks with restricted egress, or on any device where you prefer to keep local files entirely local.
              </p>
              <p>
                <strong className="text-foreground">Privacy protection</strong> follows directly from the offline architecture. When no file is uploaded and no network request is made during conversion, there is nothing for any external system to intercept, store, or analyse. Your video content remains entirely under your control throughout the process — from the moment you select the file to the moment the MP3 download completes.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY OFFLINE VIDEO CONVERSION MATTERS */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Offline Video Conversion Matters</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four steps — no internet, no server, no wait.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
            <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Better privacy</strong> is the most fundamental advantage of offline video conversion. Every time you upload a video to a server-based converter, you are trusting that operator with the contents of your file. For personal videos, confidential corporate presentations, proprietary recordings, or any content with privacy sensitivity, this trust relationship introduces real risk. An <strong className="text-foreground">offline mp3 extractor</strong> eliminates the upload entirely — your content never leaves your device, so there is nothing to trust a third party with.
              </p>
              <p>
                <strong className="text-foreground">Faster conversion</strong> is the second concrete advantage. Server-based tools require your entire video to be transmitted over your internet connection before conversion can begin. On a typical home broadband connection, uploading a large video file takes significant time. With an offline converter, there is no upload phase — conversion begins the instant you select your file, running at your device's full CPU speed from the first moment.
              </p>
              <p>
                <strong className="text-foreground">No internet upload delay</strong> also means no dependency on your connection quality. Server-based converters perform inconsistently on slow or unstable connections. An offline converter is unaffected by network conditions — whether you have gigabit fibre or no connection at all, the conversion speed is determined entirely by your local hardware.
              </p>
              <p>
                <strong className="text-foreground">Secure processing</strong> is guaranteed by the local architecture. No interceptable transmission occurs, no server logs are created, and no third-party infrastructure is involved. For converting sensitive video content, the offline approach is the only architecture that provides a genuine, verifiable security guarantee.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW PIXOCRAFT WORKS OFFLINE */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              How Pixocraft Converts Videos Offline
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Pixocraft's <strong className="text-foreground">offline video to MP3 converter</strong> is built on <strong className="text-foreground">WebAssembly FFmpeg</strong> — a complete build of the FFmpeg multimedia processing framework compiled to WebAssembly bytecode that executes inside your browser's JavaScript runtime. FFmpeg is the same open-source framework used by YouTube, VLC, Handbrake, and virtually every major video processing application. The WebAssembly compilation brings FFmpeg's full codec library into the browser environment without requiring any native executable to be installed on your device.
              </p>
              <p>
                The offline operation works as follows: when you first load the page, your browser downloads the WebAssembly FFmpeg module and the page's assets. This is the only network activity that occurs in the entire workflow. From this point, the <strong className="text-foreground">browser-based processing</strong> engine has everything it needs to function indefinitely. When you initiate a conversion, the module reads your video file through the browser's File API, which accesses your local file system without any network involvement. It demuxes the video container, extracts the audio stream, decodes the compressed audio, and re-encodes it to MP3 at your chosen bitrate using LAME — all entirely inside your browser tab.
              </p>
              <p>
                <strong className="text-foreground">Local file conversion</strong> means the output MP3 is also written locally. The completed file is made available through a browser download prompt that saves directly to your device. No server intermediary stores the output, no temporary cloud storage holds your file, and no network transfer is involved in delivering the result. The entire workflow — input, processing, and output — is confined to your own hardware, making Pixocraft a genuinely offline converter in every technical sense of the term.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — FEATURES */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Features of Pixocraft Offline Video to MP3 Converter</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need for fast, private, high-quality offline video conversion.
              </p>
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

        {/* SECTION 7 — SUPPORTED VIDEO FORMATS */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Supported Video Formats</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                All formats below convert to high-quality MP3 offline — no internet required for any of them.
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
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              Pixocraft's <strong className="text-foreground">convert video to mp3 offline</strong> tool handles all ten major video containers through FFmpeg's full codec library — all processed locally without any upload. MP4 covers the broadest range of modern video. MOV and M4V handle Apple-origin content. MKV and WEBM serve open-source high-quality distributions. AVI and WMV cover Windows-native video. FLV handles legacy web content. MPEG covers broadcast and optical media, and 3GP handles mobile recordings. Every format is demuxed and converted offline with full audio fidelity regardless of the embedded video or audio codec.
            </p>
          </div>
        </section>

        {/* SECTION 8 — BENEFITS OF MP3 FORMAT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Benefits of the MP3 Audio Format
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> makes MP3 the ideal output for any <strong className="text-foreground">offline mp3 extractor</strong>. MP3 is natively supported by every operating system, every media player, every smartphone, every car audio system, every smart speaker, and every major podcast and streaming platform — without additional codecs, plugins, or conversion steps. An MP3 converted locally on your device plays everywhere, on any hardware, without compatibility issues.
              </p>
              <p>
                <strong className="text-foreground">Small file sizes</strong> make offline-converted MP3 files practical for storage and sharing. A one-hour video occupying several gigabytes reduces to under 90 MB at 192 kbps — a compression ratio exceeding 95% — with no perceptible quality loss for most listeners. This compact size makes sharing via messaging apps, email, and cloud storage trivial, and enables large audio libraries to fit comfortably on modest storage devices.
              </p>
              <p>
                MP3 is <strong className="text-foreground">ideal for music and podcasts</strong> in both technical and practical terms. At 256 or 320 kbps, extracted music sounds transparent and full on any playback system. At 128 kbps, voice-dominant content such as lectures, podcasts, and recorded meetings is clear and compact. Every major podcast hosting platform — Spotify, Apple Podcasts, Amazon Music — accepts MP3 as a first-class input format. Every DAW and music library application integrates MP3 natively. Whatever your offline conversion use case, MP3 delivers compatibility, efficiency, and quality.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about Pixocraft's offline video to MP3 converter.</p>
            </div>
            <div className="space-y-3">
              {PAGE_FAQS.map((faq, i) => (
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

        {/* SECTION 10 — RELATED TOOLS */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Related Video to MP3 Tools</h2>
              <p className="text-muted-foreground">More free tools from Pixocraft that are part of the MP4 to MP3 Converter tool suite.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
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

                {/* MAIN TOOL BANNER */}
        <div className="container mx-auto px-4 max-w-3xl pb-6">
          <Card className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-0.5">Main Tool</p>
                <p className="font-semibold text-sm">MP4 to MP3 Converter</p>
                <p className="text-xs text-muted-foreground mt-0.5">This page is part of the Pixocraft MP4 to MP3 Converter ecosystem. Use the main converter tool below to extract MP3 audio from your videos instantly.</p>
              </div>
              <Button asChild size="sm">
                <Link href="/tools/mp4-to-mp3">Use Main MP4 to MP3 Converter</Link>
              </Button>
            </div>
          </Card>
        </div>

        
{/* Footer link */}
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
