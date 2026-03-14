import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, generateHowToSchema } from "@/lib/seo";
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
  Headphones,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  BadgeCheck,
  Infinity,
} from "lucide-react";

const PAGE_FAQS = [
  {
    question: "Is this video to MP3 converter really free?",
    answer: "Yes, genuinely and permanently free. Pixocraft's video to MP3 converter has no hidden charges, no freemium limits that kick in after a few conversions, no watermarks on output files, and no subscription tiers. The tool is funded by Pixocraft's commitment to open, accessible browser tools. You can convert video to MP3 as many times as you want, forever, without spending a single cent or providing any payment information.",
  },
  {
    question: "Do I need to register to convert videos?",
    answer: "No registration is required — not now, not ever. Pixocraft's free video to MP3 converter does not ask for your email address, does not create an account, and does not require you to sign in with any third-party service. Open the page, drop your video onto the converter, and your MP3 is ready to download. The entire process takes seconds and your personal data is never collected or stored.",
  },
  {
    question: "Can I convert multiple videos for free?",
    answer: "Yes, batch conversion is fully included in the free tier — because there is only one tier. Upload multiple video files at once by dragging several files onto the upload area or selecting multiple files with the file picker. Each video is converted sequentially in your browser, receives its own download button, and all completed MP3 files can be downloaded together as a ZIP archive. No limits on the number of files you can process in a single session.",
  },
  {
    question: "Is there a file size limit?",
    answer: "No file size limit is imposed by Pixocraft. Because all conversion runs locally in your browser using WebAssembly FFmpeg, the only practical limit is your device's available memory. Modern laptops and desktop computers can comfortably handle video files of several gigabytes. For very large files on mobile devices with limited RAM, it may help to close other browser tabs before converting to free up memory for the WebAssembly engine.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "For music and richly produced audio content, select 256 kbps or 320 kbps for the best listening experience. For lectures, podcasts, interviews, and voice recordings where compact file size is the priority, 128 kbps is clear and very efficient. 192 kbps is the recommended default — it delivers an excellent balance between audio quality and file size for the vast majority of free video to MP3 conversion use cases.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV. Multiple files supported for free batch conversion." },
  { step: "02", title: "Select MP3 audio quality", description: "Choose your preferred bitrate from 128 kbps (compact) to 320 kbps (maximum quality). All quality options are included free — no bitrate is locked behind a paywall." },
  { step: "03", title: "Click Convert", description: "Hit Convert. WebAssembly FFmpeg processes your video entirely inside your browser for free — no upload, no server, no internet connection required during conversion." },
  { step: "04", title: "Download the MP3 file", description: "Click Download to save your converted MP3 to your device instantly. Batch conversions can be downloaded individually or all at once as a free ZIP archive." },
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

const BENEFITS = [
  { icon: BadgeCheck, title: "Zero Cost Conversion", description: "Every feature — all bitrates, all formats, batch processing, ZIP download — is included at no cost. No credit card, no trial period, no upgrade prompts." },
  { icon: Repeat, title: "Unlimited Usage", description: "Convert as many videos as you want, as many times as you want, with no daily caps, no monthly quotas, and no file count restrictions of any kind." },
  { icon: Zap, title: "Instant Processing", description: "Conversion runs locally on your device via WebAssembly FFmpeg — no upload latency, no server queue, no waiting. Results are ready in seconds." },
  { icon: Shield, title: "Secure Local Conversion", description: "Your video files never leave your device. All processing is local — no server receives your data, nothing is stored remotely, and no activity is logged." },
  { icon: WifiOff, title: "Works Offline", description: "Once the page loads, you can disconnect and keep converting. No internet connection is needed during the actual MP3 conversion — fully offline capable." },
  { icon: Monitor, title: "All Devices Supported", description: "Runs in any modern browser on desktop, laptop, tablet, or smartphone. No app download, no plugin, no OS restrictions — free everywhere." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/video-to-mp3-converter", icon: Music },
  { label: "Extract Audio From Video", href: "/tools/extract-audio-from-video", icon: FileAudio },
  { label: "Convert Video to Audio", href: "/tools/convert-video-to-audio", icon: FileAudio },
  { label: "Video Audio Extractor", href: "/tools/video-audio-extractor", icon: FileAudio },
  { label: "AVI to MP3 Converter", href: "/tools/avi-to-mp3", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "Free Video to MP3 Converter", item: "https://tools.pixocraft.in/tools/free-video-to-mp3-converter" },
  ],
});

export default function FreeVideoToMP3Converter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free Video to MP3 Converter (Unlimited & Online) | Pixocraft Tools",
    description: "Use Pixocraft's free video to MP3 converter to extract audio from videos instantly. Unlimited conversions, no uploads, and complete privacy.",
    keywords: "free video to mp3 converter, video to mp3 converter free, free online video to mp3 converter, convert video to mp3 free, free mp3 extractor, video audio converter free",
    canonicalUrl: "https://tools.pixocraft.in/tools/free-video-to-mp3-converter",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Free Video to MP3 Converter — Unlimited Online Tool",
        description: "Completely free browser-based video to MP3 converter. Convert MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 with no uploads, no registration, no limits, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/free-video-to-mp3-converter",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Convert Video to MP3 for Free",
        description: "Convert any video file to MP3 audio in 4 simple steps using Pixocraft's completely free browser-based converter — no uploads, no registration, no limits.",
        steps: HOW_TO_STEPS.map(s => ({ name: s.title, text: s.description })),
      })} />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: "Free Video to MP3 Converter" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Music className="h-8 w-8 text-primary" aria-label="free video to mp3 converter" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Free Video to MP3 Converter —<br className="hidden sm:block" /> Unlimited Online Tool
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Convert video to MP3 for free using Pixocraft's powerful browser-based video to MP3 converter. Extract high-quality audio from videos instantly without uploads, registration, or limits.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-free">
              <BadgeCheck className="h-3 w-3 mr-1" />Completely free forever
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No uploads required
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Repeat className="h-3 w-3 mr-1" />Unlimited conversions
            </Badge>
            <Badge variant="secondary" data-testid="badge-batch">
              <Star className="h-3 w-3 mr-1" />Batch video processing
            </Badge>
            <Badge variant="secondary" data-testid="badge-browser">
              <Zap className="h-3 w-3 mr-1" />Works directly in your browser
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            No registration. No software installation. No file size limits.
          </p>
        </section>

        {/* SECTION 2 — TOOL INTERFACE */}
        <section id="converter" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Free Video to MP3 Converter" />
        </section>

        {/* SECTION 3 — WHY USE A FREE VIDEO TO MP3 CONVERTER */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why Use a Free Video to MP3 Converter?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                The market for online video converters is crowded with tools that advertise themselves as free while quietly imposing restrictions that make the free tier nearly unusable. Many popular converters cap free conversions at three per day, restrict output bitrate to 128 kbps on the free plan, limit file sizes to 50 or 100 MB, require account creation after the first use, or display intrusive advertising between conversion steps. These restrictions push users toward paid subscriptions or force them to bounce between multiple services just to get basic work done.
              </p>
              <p>
                Pixocraft's <strong className="text-foreground">free video to MP3 converter</strong> operates on a different model entirely. There are no conversion caps — you can <strong className="text-foreground">convert video to MP3 free</strong> as many times as you want in a single session or across multiple sessions. There are no bitrate restrictions — all four quality options from 128 kbps to 320 kbps are available to every user. There are no file size limits. There is no registration. There is no advertising interrupt between steps. The entire tool is free, fully featured, and available to everyone without conditions.
              </p>
              <p>
                This approach is made possible by Pixocraft's <strong className="text-foreground">browser-based architecture</strong>. Because all conversion runs locally on your device using WebAssembly FFmpeg, Pixocraft does not incur server processing costs for each conversion. There is no cloud infrastructure to fund, no storage costs, and no bandwidth costs associated with file uploads and downloads. The result is a genuinely free tool that can afford to be unlimited — and one that delivers better privacy than any upload-based alternative as a direct consequence of how it works.
              </p>
              <p>
                For users who regularly need a <strong className="text-foreground">free online video to MP3 converter</strong> — students extracting lecture audio, musicians archiving concert recordings, podcasters repurposing video content, or anyone building a large audio library from video files — Pixocraft provides the unrestricted, registration-free experience that other tools promise but rarely deliver.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — HOW THIS FREE VIDEO TO MP3 CONVERTER WORKS */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How Pixocraft Converts Video to MP3 for Free</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four steps — no uploads, no servers, no cost.
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
                The technology behind Pixocraft's <strong className="text-foreground">free video to MP3 converter</strong> is <strong className="text-foreground">WebAssembly FFmpeg</strong> — a browser-compiled version of FFmpeg, the world's most widely deployed open-source multimedia framework. When you click Convert, the WebAssembly module reads your video file directly from your device's memory, identifies the audio stream, discards the video track, and encodes the audio to MP3 at your selected bitrate. The entire pipeline runs on your device's CPU inside your browser tab — no file ever leaves your machine.
              </p>
              <p>
                This <strong className="text-foreground">browser-based conversion</strong> architecture is what makes the tool genuinely free without limitations. Upload-based converters incur real server costs with every conversion — storage, compute, and bandwidth costs that they recover through subscriptions, advertising, or usage caps. Because Pixocraft's conversion runs on <em>your</em> hardware, those costs do not exist. The result is <strong className="text-foreground">local processing for privacy</strong> and economy simultaneously: your video data stays on your device, and Pixocraft can afford to offer the service without restrictions. Every quality tier, every supported format, and every batch conversion feature is available to every user, every time, at no cost.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — BENEFITS OF USING A FREE VIDEO TO MP3 CONVERTER */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Benefits of Using Pixocraft's Free Video to MP3 Converter</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Every advantage, no cost — here is what sets Pixocraft apart from every other converter.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {BENEFITS.map((f) => (
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

        {/* SECTION 6 — SUPPORTED VIDEO FORMATS */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Supported Video Formats</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                All formats below are fully supported and can be converted into high-quality MP3 audio — completely free.
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
              All formats are processed entirely in your browser using FFmpeg WebAssembly at no cost. Drop any supported video onto the converter above and free MP3 conversion begins automatically.
            </p>
          </div>
        </section>

        {/* SECTION 7 — WHY MP3 IS THE BEST AUDIO FORMAT */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why MP3 Is the Best Audio Format for Converted Video
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> makes MP3 the default output format for any <strong className="text-foreground">free video to MP3 converter</strong>. MP3 is supported natively by every operating system, media player, smartphone, car audio system, smart speaker, and streaming service without requiring any additional software. A converted MP3 file plays on every device, everywhere, immediately — no compatibility troubleshooting required.
              </p>
              <p>
                <strong className="text-foreground">Efficient compression</strong> is MP3's defining technical advantage. The format uses psychoacoustic models to remove audio information that human hearing cannot detect at a given loudness level, producing files that are dramatically smaller than uncompressed audio while maintaining near-identical perceived quality. A one-hour video that occupies several gigabytes can be converted to an MP3 at 192 kbps that is under 90 MB — a reduction of more than 95% in storage footprint.
              </p>
              <p>
                MP3 is <strong className="text-foreground">ideal for music, podcasts, and lectures</strong>. At 256 kbps or 320 kbps, converted music sounds transparent and full-fidelity on any headphones or speakers — indistinguishable from lossless audio for most listeners. For voice-dominant content like lectures and podcast interviews, 128 kbps delivers clear, highly intelligible audio at minimal file size. And for podcast publishing, MP3 is a first-class input format on every major hosting platform — Spotify, Apple Podcasts, and Amazon Music all accept MP3 files directly. Whatever you are converting with this <strong className="text-foreground">free mp3 extractor</strong>, MP3 delivers compatibility, efficiency, and quality in one format.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8 — FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about Pixocraft's free video to MP3 converter.</p>
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

        {/* SECTION 9 — RELATED TOOLS */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Related Video &amp; Audio Tools</h2>
              <p className="text-muted-foreground">More free tools from Pixocraft for video and audio conversion.</p>
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
