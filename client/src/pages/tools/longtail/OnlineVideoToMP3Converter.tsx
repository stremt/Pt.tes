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
  Globe,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Layers,
} from "lucide-react";

const PAGE_FAQS = [
  {
    question: "How do I convert video to MP3 online?",
    answer: "Upload your video file by clicking the upload area or dragging it onto the converter above. Select your preferred MP3 bitrate — from 128 kbps for compact speech files to 320 kbps for maximum quality music. Click Convert and WebAssembly FFmpeg processes your video entirely in your browser — no upload to any server. When conversion finishes, click Download to save your MP3 directly to your device. The entire process takes seconds and requires no account or software.",
  },
  {
    question: "Is this online video to MP3 converter free?",
    answer: "Yes, completely and permanently free. Pixocraft's online video to MP3 converter has no hidden fees, no subscription tiers, no watermarks on output files, no daily conversion limits, and no file size restrictions. All bitrate options — 128, 192, 256, and 320 kbps — are available to every user at no cost. No payment information is ever required. The tool runs entirely in your browser using WebAssembly FFmpeg and is free to use as many times as you need without any conditions.",
  },
  {
    question: "Can I convert multiple videos online?",
    answer: "Yes, batch conversion is fully supported. Upload multiple video files at once by dragging several files onto the upload area or selecting multiple files with the file picker. Each video is processed sequentially by WebAssembly FFmpeg inside your browser tab, receives its own download button with per-file quality selection, and all completed MP3 files can be downloaded together as a ZIP archive in one click. No limits apply to the number of files you can process online in a single session.",
  },
  {
    question: "Is my video secure during conversion?",
    answer: "Your video is completely secure throughout the entire online conversion process. Pixocraft's browser-based architecture means your video file never leaves your device at any point — it is read from local memory, processed by WebAssembly FFmpeg running inside your browser tab, and the resulting MP3 is saved back to local memory for download. No server receives your data, no file is transmitted over the internet, and no conversion activity is logged anywhere. Complete privacy is guaranteed by design.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "For music, concerts, and richly produced audio content, select 256 kbps or 320 kbps for the best online conversion quality. These bitrates deliver transparent, full-fidelity MP3 audio suitable for any playback system. For lectures, podcasts, interviews, and voice recordings where compact file size matters more, 128 kbps is clear and produces very small files. 192 kbps is the recommended default — an excellent balance between audio quality and file size for the broadest range of online video to MP3 conversion needs.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV. Multiple files can be uploaded at once for online batch conversion." },
  { step: "02", title: "Select MP3 audio quality", description: "Choose your preferred bitrate from 128 kbps (compact speech) to 320 kbps (maximum quality). All quality options are available online at no cost with no restrictions." },
  { step: "03", title: "Click Convert", description: "Hit Convert. WebAssembly FFmpeg processes your video entirely in your browser — no upload to any server, no internet connection required once the page has loaded." },
  { step: "04", title: "Download your MP3 audio file", description: "When conversion completes, click Download to save your MP3 directly to your device. Batch online conversions can be downloaded individually or all together as a ZIP archive." },
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
  { icon: Monitor, title: "Browser-Based Conversion", description: "The entire online conversion pipeline runs inside your browser using WebAssembly. No software to install, no plugin required — works on every device and operating system." },
  { icon: Shield, title: "Privacy Protection", description: "Your video files never leave your device during online conversion. All processing is local — no server receives your data, no file is stored remotely, and no activity is logged." },
  { icon: Repeat, title: "Batch Video Conversion", description: "Convert multiple video files to MP3 online in a single session. No daily limits, no file count restrictions, no watermarks — fully unlimited batch online processing." },
  { icon: Star, title: "High-Quality MP3 Output", description: "Choose from 128 kbps to 320 kbps. All bitrates are available online at no cost — high-quality 320 kbps output is never paywalled or restricted in any way." },
  { icon: Zap, title: "Instant Online Processing", description: "Conversion runs on your device hardware via WebAssembly FFmpeg — no upload latency, no server queue, no network bottleneck. Online results are ready in seconds." },
  { icon: Globe, title: "Accessible from Any Device", description: "Works in any modern browser on desktop, laptop, tablet, or smartphone. One URL gives you the same full-featured online converter on every device you own." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/video-to-mp3-converter", icon: Music },
  { label: "Free Video to MP3 Converter", href: "/tools/free-video-to-mp3-converter", icon: Music },
  { label: "Best Video to MP3 Converter", href: "/tools/best-video-to-mp3-converter", icon: Music },
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
    { "@type": "ListItem", position: 4, name: "Online Video to MP3 Converter", item: "https://tools.pixocraft.in/tools/online-video-to-mp3-converter" },
  ],
});

export default function OnlineVideoToMP3Converter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Online Video to MP3 Converter (Fast & Free) | Pixocraft Tools",
    description: "Convert video to MP3 online instantly with Pixocraft's powerful converter. Extract high-quality audio directly in your browser with no uploads or installation.",
    keywords: "online video to mp3 converter, video to mp3 converter online, convert video to mp3 online, online mp3 extractor, video audio converter online, free video to mp3 converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/online-video-to-mp3-converter",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Online Video to MP3 Converter — Fast & Secure Tool",
        description: "Free browser-based online video to MP3 converter. Convert MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 audio instantly with no uploads, no installation, unlimited usage, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/online-video-to-mp3-converter",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Convert Video to MP3 Online",
        description: "Convert any video file to MP3 audio online in 4 steps using Pixocraft's free browser-based online video to MP3 converter — no uploads, no registration, no software.",
        steps: HOW_TO_STEPS.map(s => ({ name: s.title, text: s.description })),
      })} />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: "Online Video to MP3 Converter" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Globe className="h-8 w-8 text-primary" aria-label="online video to mp3 converter" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Online Video to MP3 Converter —<br className="hidden sm:block" /> Fast &amp; Secure Tool
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Convert video files into MP3 audio instantly using Pixocraft's powerful online video to MP3 converter. No software installation, no uploads, and no registration required.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-online">
              <Globe className="h-3 w-3 mr-1" />Convert videos online instantly
            </Badge>
            <Badge variant="secondary" data-testid="badge-formats">
              <Star className="h-3 w-3 mr-1" />Supports multiple video formats
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-install">
              <CheckCircle className="h-3 w-3 mr-1" />No installation required
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Repeat className="h-3 w-3 mr-1" />Unlimited conversions
            </Badge>
            <Badge variant="secondary" data-testid="badge-browser">
              <Zap className="h-3 w-3 mr-1" />Works directly in your browser
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            No account needed. No file size limits. Works on every device and browser.
          </p>
        </section>

        {/* SECTION 2 — TOOL INTERFACE */}
        <section id="converter" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Online Video to MP3 Converter" />
        </section>

        {/* SECTION 3 — WHAT IS AN ONLINE VIDEO TO MP3 CONVERTER */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Is an Online Video to MP3 Converter?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                An <strong className="text-foreground">online video to MP3 converter</strong> is a tool that runs directly inside your web browser, extracting the audio stream from a video file and saving it as a standalone MP3 — without requiring any software to be downloaded or installed on your device. The defining characteristic of a genuine online converter is that the entire process happens within the browser itself, making it accessible from any device with a modern browser and an internet connection.
              </p>
              <p>
                Traditional desktop converters require a download, an installation process, OS compatibility checks, and often ongoing updates. An <strong className="text-foreground">online MP3 extractor</strong> eliminates all of these steps. Open the page, drop your video file, and your MP3 is ready — the same workflow works identically on a Windows laptop, a macOS desktop, a Chromebook, an Android phone, or an iPad, with no configuration required.
              </p>
              <p>
                Pixocraft's <strong className="text-foreground">online video to MP3 converter</strong> takes this architecture further by using <strong className="text-foreground">WebAssembly FFmpeg</strong> — a browser-native compilation of the world's most widely deployed open-source multimedia framework. When you convert a video online using Pixocraft, FFmpeg runs as a WebAssembly module inside your browser tab. It reads your video directly from your device's memory, identifies and extracts the audio stream, encodes it to MP3 at your chosen bitrate, and returns the finished file — all without any server involvement and without transmitting your video over the internet.
              </p>
              <p>
                This means Pixocraft's <strong className="text-foreground">video to MP3 converter online</strong> combines the zero-friction accessibility of an online tool with the privacy and speed of local desktop processing. <strong className="text-foreground">Audio extraction happens instantly</strong> because there is no upload round trip — the only latency is the time FFmpeg spends encoding on your device's CPU, which for most videos is a matter of seconds. The result is an online converter that is simultaneously faster, more private, and more capable than any upload-based alternative.
              </p>
              <p>
                All major video formats are fully supported: MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, and WMV. All bitrate options from 128 kbps to 320 kbps are available. All of this is accessible online, free, and without any account creation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY USE AN ONLINE VIDEO TO MP3 CONVERTER */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why Use an Online Video to MP3 Converter?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Easy access from any device</strong> is the most immediate advantage of an online converter over a desktop application. Whether you are on your work computer, a personal laptop, a library terminal, or a mobile phone, the same URL gives you immediate access to the full-featured <strong className="text-foreground">video audio converter online</strong> without any setup. You do not need administrator privileges to install software, you do not need to check OS compatibility, and you do not need to wait for a download to complete. Online access means the tool is always ready, on any device, immediately.
              </p>
              <p>
                <strong className="text-foreground">No downloads or installations</strong> also means no maintenance burden. Desktop converters require updates that introduce compatibility issues, new versions that change the interface, and occasionally licenses that expire. An online tool is always running the latest version automatically — you access it through a browser and it works, every time, without any upkeep on your part.
              </p>
              <p>
                <strong className="text-foreground">Instant conversion</strong> sets Pixocraft's online approach apart from every upload-based converter. Most online converters require you to upload your video to a remote server, wait for the server to process it, then download the result. This round trip introduces latency for every conversion — proportional to your video file size and the server's current load. Pixocraft's <strong className="text-foreground">convert video to MP3 online</strong> approach eliminates this entirely. Processing starts the moment you click Convert, runs locally at full hardware speed, and completes in a fraction of the time an upload-based approach would require. For large video files, this difference can be several minutes per conversion — and with batch processing, it compounds across every file in the batch.
              </p>
              <p>
                The combination of <strong className="text-foreground">free video to MP3 converter</strong> access, unlimited usage, and the privacy of local processing makes Pixocraft the most practical choice for regular online video to MP3 conversion needs across any device and any workflow.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW TO CONVERT VIDEO TO MP3 ONLINE */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Convert Video to MP3 Online</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four steps to extract MP3 audio from any video online — no software, no upload, no cost.
              </p>
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
            <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
              All online conversion is handled by <strong className="text-foreground">WebAssembly FFmpeg</strong> — a browser-native compilation of the professional-grade multimedia framework used by the world's leading streaming platforms and broadcast engineers.
            </p>
          </div>
        </section>

        {/* SECTION 6 — PIXOCRAFT ONLINE CONVERTER FEATURES */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Pixocraft Online Converter Features</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A professional-grade online converter with no restrictions and no cost.
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
            <div className="mt-10 max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                The most important feature of Pixocraft's <strong className="text-foreground">online video to MP3 converter</strong> is its <strong className="text-foreground">privacy protection</strong> by architecture. Most online converters describe privacy protections in their terms of service — policies about how long they retain your files, what they do with your data, and whether third parties have access. These policies only matter because the tool uploads your file to a server in the first place. Pixocraft's approach eliminates the need for any such policy: because your video never leaves your browser tab, there is no data to protect, retain, or disclose.
              </p>
              <p>
                <strong className="text-foreground">High-quality MP3 output</strong> at 320 kbps combined with <strong className="text-foreground">batch video conversion</strong> and unlimited sessions makes Pixocraft equally capable for casual single-file conversions and large-scale archiving workflows. Every feature — from the highest available bitrate to multi-file ZIP downloads — is included in the free online tool with no upgrade required and no registration needed.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7 — SUPPORTED VIDEO FORMATS */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Supported Video Formats</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                All formats below are fully supported for online conversion to high-quality MP3 audio — directly in your browser.
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
              All formats are processed entirely online in your browser using FFmpeg WebAssembly — no upload required. Drop any supported video onto the converter above and online MP3 conversion begins automatically.
            </p>
          </div>
        </section>

        {/* SECTION 8 — BENEFITS OF MP3 AUDIO */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Benefits of MP3 Audio for Online Converted Video
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> makes MP3 the natural output format for any <strong className="text-foreground">video audio converter online</strong>. MP3 is supported natively by every operating system, media player, smartphone, car audio system, smart speaker, and streaming service worldwide — no additional codecs, plugins, or software required. A file converted online to MP3 plays on every device, everywhere, with zero compatibility friction.
              </p>
              <p>
                <strong className="text-foreground">Small file size</strong> is MP3's defining practical advantage over video formats. Using psychoacoustic compression, MP3 discards audio information that human hearing cannot detect at a given loudness level — producing files that are dramatically smaller than video while maintaining near-identical perceived quality. A one-hour video that occupies multiple gigabytes can be converted online to an MP3 at 192 kbps that is under 90 MB — more than 95% smaller in most cases.
              </p>
              <p>
                MP3 is <strong className="text-foreground">perfect for music and podcasts</strong>. At 256 or 320 kbps, the converted MP3 is transparent and full-fidelity for virtually all listeners — suitable for music archiving, high-quality playback on studio monitors, and distribution on music platforms. For podcast production, every major hosting and distribution platform — including Spotify, Apple Podcasts, Amazon Music, and Google Podcasts — accepts MP3 as a first-class input format, making online-converted MP3 files immediately publishable without any additional processing step.
              </p>
              <p>
                <strong className="text-foreground">Easy sharing</strong> completes the case for MP3 as the output of choice for any <strong className="text-foreground">online MP3 extractor</strong>. MP3 files attach to emails, sync to cloud storage, transfer via Bluetooth, upload to music platforms, and play in every media player without any compatibility issues. Once you have converted online, sharing your audio is as straightforward as sharing any file — no format conversion, no re-encoding, no compatibility troubleshooting required.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about Pixocraft's online video to MP3 converter.</p>
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
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Related Video &amp; Audio Tools</h2>
              <p className="text-muted-foreground">More free online tools from Pixocraft for video and audio conversion.</p>
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
