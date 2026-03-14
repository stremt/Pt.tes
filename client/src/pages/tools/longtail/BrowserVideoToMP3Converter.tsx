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
  Layers,
} from "lucide-react";

const PAGE_FAQS = [
  {
    question: "What is a browser video to MP3 converter?",
    answer: "A browser video to MP3 converter is a tool that extracts and converts the audio track from a video file entirely inside your web browser — no software installation, no file uploads, and no server processing required. Pixocraft's browser-based converter uses WebAssembly FFmpeg, which runs the full FFmpeg multimedia engine directly within your browser tab. Your video file is read from your local storage, processed on your device, and the resulting MP3 is saved back to your device — all without leaving your browser.",
  },
  {
    question: "Do I need to upload my video?",
    answer: "No — your video file is never uploaded anywhere. Pixocraft's browser video to MP3 converter reads your video directly from your device's local file system. The WebAssembly FFmpeg engine processes the file entirely within your browser tab. No data is transmitted to any server at any point during the conversion. This means your video files remain completely private, and the conversion speed is not limited by your internet connection's upload bandwidth — it runs at your device's full processing speed.",
  },
  {
    question: "Can I convert videos offline in my browser?",
    answer: "Yes, once the page has loaded in your browser, you can disconnect from the internet and continue converting videos without interruption. The WebAssembly FFmpeg engine is delivered when the page first loads and then operates entirely locally. No network connection is needed during the actual conversion process. This makes Pixocraft's browser video to MP3 converter ideal for use on planes, in areas with limited connectivity, or any situation where you need to work offline without compromising your conversion workflow.",
  },
  {
    question: "Is my video file secure?",
    answer: "Your video files are completely secure. Because all conversion runs locally inside your browser using WebAssembly FFmpeg, your video never leaves your device. No file is transmitted to any external server, no data is logged, and no copy of your video is retained after conversion. This is a fundamental architectural advantage of browser-based conversion over upload-based alternatives. With Pixocraft's browser converter, you have full control over your files at all times — they exist only on your own device throughout the entire process.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "For music and produced audio content, select 256 kbps or 320 kbps for the highest listening quality. For speech-dominant content such as lectures, podcasts, and interviews where smaller file size is a priority, 128 kbps delivers clear and highly intelligible audio efficiently. The recommended default is 192 kbps — it strikes an excellent balance between audio fidelity and file size for most video to MP3 browser conversion use cases, whether the source is music, a recorded webinar, or a film soundtrack.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Open the browser converter", description: "Visit this page on any modern browser — Chrome, Firefox, Safari, or Edge. No installation, no plugin, no extension required. The converter loads and runs entirely in your browser tab." },
  { step: "02", title: "Upload your video file", description: "Drag and drop any supported video onto the upload area, or click to select files from your device. Multiple files are supported for batch browser-based conversion in one session." },
  { step: "03", title: "Choose audio bitrate", description: "Select your preferred MP3 bitrate: 128 kbps for compact voice files, 192 kbps as the all-round default, 256 kbps or 320 kbps for maximum music quality. All options run free in your browser." },
  { step: "04", title: "Convert and download", description: "Click Convert. FFmpeg WebAssembly processes the video locally in your browser — no server, no upload, no wait. Download the MP3 immediately once conversion completes." },
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
  { icon: Cpu, title: "Local Processing", description: "All conversion runs on your own device's CPU via WebAssembly FFmpeg. No server receives your data, no cloud compute is involved — processing happens entirely within your browser." },
  { icon: Repeat, title: "Unlimited Conversions", description: "Convert as many video files as you need with no daily caps, no session limits, and no file count restrictions. This browser converter is fully unlimited for every user." },
  { icon: Layers, title: "Multi-Format Compatibility", description: "Supports ten major video formats — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, and WMV — all processed with full FFmpeg codec compatibility directly in your browser." },
  { icon: Music, title: "High-Quality MP3 Output", description: "Choose from four bitrate options up to 320 kbps. All quality tiers are available without restriction — no bitrate is locked behind a paywall on this browser-based converter." },
  { icon: Star, title: "Batch Conversion", description: "Drop multiple video files at once and the browser converter processes each in sequence, giving each file its own progress indicator and individual download button." },
  { icon: WifiOff, title: "Works Offline", description: "Once the page loads, your internet connection is no longer needed. Convert videos offline in your browser — ideal for travel, remote work, or air-gapped environments." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/video-to-mp3-converter", icon: Music },
  { label: "Free Video to MP3 Converter", href: "/tools/free-video-to-mp3-converter", icon: Music },
  { label: "Online Video to MP3 Converter", href: "/tools/online-video-to-mp3-converter", icon: Music },
  { label: "Extract Audio From Video", href: "/tools/extract-audio-from-video", icon: FileAudio },
  { label: "Convert Video to Audio", href: "/tools/convert-video-to-audio", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "MP4 to MP3 Converter", item: "https://tools.pixocraft.in/tools/mp4-to-mp3" },
    { "@type": "ListItem", position: 5, name: "Browser Video to MP3 Converter", item: "https://tools.pixocraft.in/tools/browser-video-to-mp3-converter" },
  ],
});

export default function BrowserVideoToMP3Converter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Browser Video to MP3 Converter (Private & Fast) | Pixocraft Tools",
    description: "Convert video to MP3 directly in your browser using Pixocraft's browser-based converter. No uploads, unlimited conversions, and complete privacy.",
    keywords: "browser video to mp3 converter, video to mp3 converter browser, convert video to mp3 in browser, browser mp3 extractor, video audio converter browser, online video to mp3 converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/browser-video-to-mp3-converter",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Browser Video to MP3 Converter — Convert Videos Directly in Your Browser",
        description: "Browser-based video to MP3 converter powered by WebAssembly FFmpeg. Convert MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 locally in your browser with no uploads, no registration, and complete privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/browser-video-to-mp3-converter",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Convert Video to MP3 in Your Browser",
        description: "Convert any video file to MP3 in 4 steps using Pixocraft's browser-based converter — no uploads, no installations, no server processing, complete privacy.",
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
            { label: "Browser Video to MP3 Converter" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Globe className="h-8 w-8 text-primary" aria-label="browser video to mp3 converter" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Browser Video to MP3 Converter —<br className="hidden sm:block" /> Convert Videos Directly in Your Browser
          </h1>
          <p className="text-xs text-muted-foreground mb-4">Part of the Pixocraft MP4 to MP3 Converter Tool Suite</p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Convert video files to MP3 directly in your browser using Pixocraft's powerful browser-based video to MP3 converter. No uploads, no installations, and complete privacy.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-browser">
              <Globe className="h-3 w-3 mr-1" />Works entirely in your browser
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No file uploads required
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Repeat className="h-3 w-3 mr-1" />Unlimited conversions
            </Badge>
            <Badge variant="secondary" data-testid="badge-formats">
              <Layers className="h-3 w-3 mr-1" />Supports multiple video formats
            </Badge>
            <Badge variant="secondary" data-testid="badge-batch">
              <Star className="h-3 w-3 mr-1" />Batch video conversion supported
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            No registration. No software installation. No server uploads. Full privacy.
          </p>
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

        {/* SECTION 2 — TOOL INTERFACE */}
        <section id="converter" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Browser Video to MP3 Converter" />
        </section>

        {/* SECTION 3 — WHAT IS A BROWSER VIDEO TO MP3 CONVERTER */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Is a Browser Video to MP3 Converter?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                A <strong className="text-foreground">browser video to MP3 converter</strong> is a tool that processes your video file and extracts its audio as an MP3 entirely within your web browser — without uploading the file to any external server, without installing any software, and without relying on any cloud computing infrastructure. The conversion runs locally on your own device, using computing resources that your browser already has access to.
              </p>
              <p>
                Traditional online converters require you to upload your video to a remote server, wait for the server to process it, and then download the resulting MP3. This approach introduces upload latency, exposes your files to third-party servers, and creates bottlenecks whenever server load is high. A <strong className="text-foreground">browser-based converter</strong> eliminates all of these issues by moving the entire conversion pipeline to your local machine.
              </p>
              <p>
                Pixocraft's <strong className="text-foreground">video to MP3 converter browser</strong> tool is powered by WebAssembly FFmpeg — a version of the world's most widely used multimedia processing framework compiled specifically to run inside modern browsers. When you drop a video onto the converter, FFmpeg reads the file directly from your device's memory, isolates the audio stream, discards the video track, and encodes the output as MP3 at your chosen bitrate. <strong className="text-foreground">No software installation is needed</strong> because WebAssembly provides a near-native execution environment inside the browser itself.
              </p>
              <p>
                The result is a <strong className="text-foreground">conversion that happens instantly on your device</strong> — no waiting for uploads, no queuing behind other users, no dependency on server availability. As long as your browser is open, the converter is ready. And because no network activity occurs during conversion, the tool works equally well whether you are connected to a fast fibre connection or completely offline after the initial page load.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY BROWSER CONVERTERS ARE BETTER */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Browser-Based Video Converters Are Better</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four steps — no uploads, no servers, no waiting.
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
                The advantages of <strong className="text-foreground">browser-based video conversion</strong> over server-based alternatives are significant and concrete. The most immediately noticeable is speed: because <strong className="text-foreground">no uploads are required</strong>, conversion can begin the instant you select your file. A server-based tool requires you to wait for your entire video to upload before processing can even start — for a large video on a slow connection, this alone can take minutes. With a browser converter, processing begins immediately.
              </p>
              <p>
                <strong className="text-foreground">Privacy protection</strong> is the second major advantage. When you upload a video to a third-party server, you lose control of that file the moment it leaves your device. The server operator can theoretically store, analyse, or use your content. A <strong className="text-foreground">browser video to MP3 converter</strong> removes this risk entirely — your file never leaves your device, so there is nothing for any third party to access or retain.
              </p>
              <p>
                Browser converters also eliminate <strong className="text-foreground">server processing wait times</strong>. Upload-based tools share server capacity among many simultaneous users. During peak hours, your job may sit in a processing queue before conversion begins. A browser converter uses only your own device's CPU — you are never competing with other users for processing time, and there is no queue to join. Conversion runs at whatever speed your hardware supports, immediately, every time.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW THE PIXOCRAFT BROWSER CONVERTER WORKS */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              How Pixocraft Converts Videos Directly in Your Browser
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Pixocraft's <strong className="text-foreground">browser video to MP3 converter</strong> is built on <strong className="text-foreground">FFmpeg WebAssembly</strong> — the gold standard of multimedia processing, delivered as a WebAssembly module that executes within your browser's JavaScript runtime. FFmpeg is the open-source framework used by virtually every major video platform and editing application in the world. The WebAssembly build brings the full power of FFmpeg's codec library to the browser environment without requiring any native installation.
              </p>
              <p>
                When you drop a video file onto the converter, the WebAssembly module is invoked with your local file as input. It inspects the container format, identifies the embedded audio codec, reads the compressed audio data, decodes it to uncompressed PCM audio, and then re-encodes it to MP3 using LAME — the industry-standard MP3 encoder — at your selected bitrate. This entire pipeline runs on your device's CPU. <strong className="text-foreground">Local video processing</strong> means there is zero latency from network transfers and zero risk of your data being intercepted in transit.
              </p>
              <p>
                The <strong className="text-foreground">secure offline conversion</strong> capability follows naturally from this architecture. Once the WebAssembly module and the page assets are loaded into your browser, the tool has everything it needs to function indefinitely without a network connection. You can convert video to MP3 in your browser on a plane, in a café with no Wi-Fi, or on a device with mobile data turned off — the converter operates identically in all scenarios.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — FEATURES */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Features of Pixocraft Browser Video to MP3 Converter</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need for fast, private, high-quality video to MP3 conversion — all in your browser.
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
                All formats below are fully supported and convert to high-quality MP3 directly in your browser.
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
              Pixocraft's <strong className="text-foreground">video audio converter browser</strong> tool accepts all ten major video container formats through the full FFmpeg codec library. MP4 covers the broadest range of modern video content from cameras, screen recorders, and streaming downloads. MOV and M4V handle Apple ecosystem video. MKV and WEBM are standard for high-quality open-source distributions. AVI and WMV serve Windows-origin content. FLV covers legacy web video. MPEG handles broadcast and optical disc content, and 3GP covers mobile-origin recordings. Every format is processed locally with no upload required.
            </p>
          </div>
        </section>

        {/* SECTION 8 — BENEFITS OF MP3 AUDIO FORMAT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Benefits of the MP3 Audio Format
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> is the defining reason MP3 is the output format of choice for any <strong className="text-foreground">browser mp3 extractor</strong>. MP3 is natively supported by every operating system, every media player, every smartphone, every car audio system, every smart speaker, and every major podcast and music platform without requiring any additional software, codec, or conversion. An MP3 extracted from any video plays everywhere, on any device, without compatibility issues.
              </p>
              <p>
                <strong className="text-foreground">Small file sizes</strong> make MP3 ideal for sharing and storage. A one-hour video occupying several gigabytes reduces to under 90 MB at 192 kbps — a compression ratio exceeding 95% — with no perceptible quality difference for most listeners. This dramatic size reduction makes MP3 files practical to store, share via email or messaging apps, and upload to streaming platforms.
              </p>
              <p>
                MP3 is <strong className="text-foreground">ideal for music and podcasts</strong>. At 256 or 320 kbps, extracted music sounds transparent and full on any playback system. At 128 kbps, voice-centric content such as lectures, interviews, and podcast recordings is clear and compact. For <strong className="text-foreground">easy sharing</strong>, MP3 integrates directly with every DAW, podcast hosting platform, music library app, and cloud storage service — making it the universally accepted audio format for all use cases that follow a browser video to MP3 conversion.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about Pixocraft's browser video to MP3 converter.</p>
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
