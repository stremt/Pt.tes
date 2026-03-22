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
    answer: "Yes, completely and permanently free. Pixocraft's video to MP3 converter free tool has no hidden charges, no trial periods, no conversion caps, no watermarks, and no subscription tiers. The tool is funded by Pixocraft's commitment to building open, accessible browser tools for everyone. You can convert video to MP3 free as many times as you want, forever, without entering any payment information or agreeing to any paid plan.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account creation is required — not now, not ever. Pixocraft's free video to MP3 converter online does not collect your email address, does not set up a user profile, and does not require sign-in with any third-party service. Visit the page, drop your video onto the converter, and your MP3 is ready to download within seconds. Your personal information is never requested, collected, or stored at any point during conversion.",
  },
  {
    question: "Can I convert multiple videos for free?",
    answer: "Yes, batch conversion is fully included at no cost — because there is only one tier. Drag multiple video files onto the upload area or select several files at once using the file picker. Each file is processed sequentially inside your browser, receives its own progress bar and download button, and all completed MP3 files can be downloaded together as a ZIP archive. There are no batch limits, no per-session caps, and no daily quotas on this free video to MP3 converter.",
  },
  {
    question: "Is there a file size limit?",
    answer: "No file size limit is enforced by Pixocraft. Because all conversion runs locally in your browser using WebAssembly FFmpeg, the only practical limit is your device's available memory. Modern desktop computers and laptops handle video files of several gigabytes without issue. For very large files on mobile devices, closing other browser tabs beforehand frees up memory for the WebAssembly engine to operate efficiently on your large video files.",
  },
  {
    question: "What MP3 quality should I choose?",
    answer: "For music and richly produced audio, choose 256 kbps or 320 kbps for the best listening experience. For spoken content such as lectures, podcasts, and interviews where compact file size matters, 128 kbps is clear and highly efficient. The recommended default is 192 kbps — it delivers an excellent balance between audio fidelity and file size for the vast majority of video to MP3 free conversion use cases, including both music and voice recordings.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV. Multiple files are supported for free batch video to MP3 conversion." },
  { step: "02", title: "Select MP3 audio quality", description: "Choose your preferred bitrate from 128 kbps (compact) to 320 kbps (maximum quality). All bitrate options are included free — no quality tier is locked behind a paywall on this converter." },
  { step: "03", title: "Click Convert", description: "Hit Convert. WebAssembly FFmpeg processes your video entirely in your browser — no upload to any server, no internet connection needed during conversion, completely free and private." },
  { step: "04", title: "Download your MP3 file", description: "Click Download to save the converted MP3 to your device instantly. Batch conversions can be downloaded individually or together as a free ZIP archive with a single click." },
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
  { icon: BadgeCheck, title: "Zero Cost Conversion", description: "Every feature — all bitrates, all formats, batch processing, ZIP download — is included at absolutely no cost. No credit card required, no trial expiry, no upgrade prompts ever." },
  { icon: Repeat, title: "Unlimited Usage", description: "Convert as many videos as you want, as many times as you need, with no daily caps, no monthly quotas, and no file count restrictions of any kind on this free converter." },
  { icon: Zap, title: "Fast Processing", description: "Conversion runs locally on your device via WebAssembly FFmpeg — no upload latency, no server queue to wait in, no delays. Your MP3 results are ready in seconds." },
  { icon: Shield, title: "Secure Local Conversion", description: "Your video files never leave your device. All processing is entirely local — no server receives your data, nothing is stored remotely, and no conversion activity is ever logged." },
  { icon: WifiOff, title: "Works Offline", description: "Once the page is loaded, you can disconnect from the internet and keep converting. No internet connection is needed during the actual free video to MP3 conversion — fully offline capable." },
  { icon: Monitor, title: "All Devices Supported", description: "Runs in any modern browser on desktop, laptop, tablet, or smartphone. No app to download, no plugin to install, no OS restrictions — this free converter works everywhere." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/video-to-mp3-converter", icon: Music },
  { label: "Free Video to MP3 Converter", href: "/tools/free-video-to-mp3-converter", icon: Music },
  { label: "Best Video to MP3 Converter", href: "/tools/best-video-to-mp3-converter", icon: Music },
  { label: "Online Video to MP3 Converter", href: "/tools/online-video-to-mp3-converter", icon: Music },
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
    { "@type": "ListItem", position: 5, name: "Video to MP3 Converter Free", item: "https://tools.pixocraft.in/tools/video-to-mp3-converter-free" },
  ],
});

export default function VideoToMP3ConverterFree() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Video to MP3 Converter Free (Unlimited & Online) | Pixocraft Tools",
    description: "Convert video to MP3 for free using Pixocraft's powerful converter. Extract high-quality audio instantly in your browser with unlimited conversions and no uploads.",
    keywords: "video to mp3 converter free, free video to mp3 converter, convert video to mp3 free, video to mp3 converter online free, extract mp3 from video free, free mp3 converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/video-to-mp3-converter-free",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Video to MP3 Converter Free — Unlimited Online Tool",
        description: "Completely free browser-based video to MP3 converter. Convert MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 with no uploads, no registration, no limits, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/video-to-mp3-converter-free",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Convert Video to MP3 Free Online",
        description: "Convert any video file to MP3 audio in 4 simple steps using Pixocraft's completely free browser-based converter — no uploads, no registration, no limits, no cost.",
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
            { label: "Video to MP3 Converter Free" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Music className="h-8 w-8 text-primary" aria-label="video to mp3 converter free" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Video to MP3 Converter Free —<br className="hidden md:block" /> Unlimited Online Tool
          </h1>
          <p className="text-xs text-muted-foreground mb-4">Part of the Pixocraft MP4 to MP3 Converter Tool Suite</p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Convert video files to MP3 audio completely free using Pixocraft's browser-based converter. Extract high-quality audio instantly without uploads, registration, or limits.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-free">
              <BadgeCheck className="h-3 w-3 mr-1" />100% free conversion
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No file uploads required
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Repeat className="h-3 w-3 mr-1" />Unlimited video conversions
            </Badge>
            <Badge variant="secondary" data-testid="badge-batch">
              <Star className="h-3 w-3 mr-1" />Batch video support
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
          <VideoToMP3Converter title="Video to MP3 Converter Free" />
        </section>

        {/* SECTION 3 — WHY USE A FREE VIDEO TO MP3 CONVERTER */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why Use a Free Video to MP3 Converter?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                The landscape of online video converters is dominated by tools that market themselves as free while quietly enforcing restrictions that make the free tier all but unusable. Many popular <strong className="text-foreground">video to MP3 converter free</strong> alternatives cap conversions at three or five per day, lock audio output to 128 kbps on the free plan, limit file sizes to 50 or 100 MB, demand account creation after the first use, or interrupt the workflow with advertising overlays. These restrictions are designed to push users toward paid subscription tiers.
              </p>
              <p>
                Pixocraft's <strong className="text-foreground">free video to MP3 converter</strong> operates on an entirely different model. There are no conversion caps — you can <strong className="text-foreground">convert video to MP3 free</strong> as many times as you need in a single session and across multiple sessions without any restriction. All four bitrate options from 128 kbps to 320 kbps are available to every user with no upsell. There are no file size limits, no registration walls, and no advertising interruptions. The tool is fully featured and completely free — not a limited version of a paid product.
              </p>
              <p>
                This is made possible because Pixocraft's <strong className="text-foreground">video to MP3 converter online free</strong> runs entirely in your browser using WebAssembly technology. Because conversion happens on your device rather than on Pixocraft's servers, there are no server processing costs, no storage costs, and no bandwidth costs tied to each conversion. The business model does not depend on limiting free users to drive subscriptions. Every user gets the full tool, permanently, at zero cost.
              </p>
              <p>
                For users who regularly need a reliable <strong className="text-foreground">free mp3 converter</strong> — students archiving lecture recordings, podcasters repurposing video content, musicians preserving live performances, or anyone building an audio library from video files — Pixocraft delivers the unrestricted, registration-free experience that many tools promise but consistently fail to provide. No hidden limits, no surprise paywalls, no conversion queues.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — HOW PIXOCRAFT PROVIDES FREE VIDEO TO MP3 CONVERSION */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How Pixocraft Converts Videos to MP3 for Free</h2>
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
                The technology powering Pixocraft's <strong className="text-foreground">video to MP3 converter free</strong> tool is <strong className="text-foreground">FFmpeg WebAssembly</strong> — a browser-compiled version of FFmpeg, the world's most widely deployed open-source multimedia processing framework. When you initiate a conversion, the WebAssembly module reads your video file directly from your device's local memory, identifies the audio stream contained within it, discards the video track, and re-encodes the audio to MP3 at the bitrate you selected. The entire pipeline runs on your device's CPU, inside your browser tab, without any network activity.
              </p>
              <p>
                This <strong className="text-foreground">browser-based technology</strong> approach is precisely what makes the tool genuinely free without hidden limitations. Upload-based converters incur real operational costs with every single conversion — cloud storage, compute instances, and egress bandwidth costs that they recover through subscriptions, advertising revenue, or usage caps. Because Pixocraft's <strong className="text-foreground">FFmpeg WebAssembly engine</strong> runs on your hardware rather than Pixocraft's servers, those infrastructure costs simply do not exist. The result is a converter that protects your privacy — your files stay on your device and <strong className="text-foreground">no server uploads are required</strong> — while also being genuinely, permanently, and unconditionally free for every user regardless of how many conversions they need.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — ADVANTAGES OF FREE VIDEO TO MP3 CONVERSION */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Advantages of Free Video to MP3 Conversion</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Every advantage, no cost — here is what sets Pixocraft's free converter apart.
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
                All formats below are fully supported and can be converted to high-quality MP3 audio — completely free.
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
              Pixocraft's <strong className="text-foreground">free video to MP3 converter online</strong> accepts all major video container formats. MP4 is the most commonly used format for online videos and camera recordings. AVI, MOV, and WMV are standard formats on Windows and macOS systems. MKV and WEBM are popular for high-quality open-source video distribution. FLV remains common for legacy web video content, while MPEG, M4V, and 3GP cover broadcast-standard and mobile video respectively. All ten formats are processed with full FFmpeg compatibility — audio is extracted cleanly regardless of the video codec or container structure.
            </p>
          </div>
        </section>

        {/* SECTION 7 — BENEFITS OF MP3 AUDIO FORMAT */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Benefits of the MP3 Audio Format
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> makes MP3 the premier output choice for any <strong className="text-foreground">extract mp3 from video free</strong> workflow. MP3 is natively supported by every operating system, every media player, every smartphone, every car audio system, every smart speaker, and every major streaming and podcast platform — without requiring additional codecs, plugins, or conversion steps. A converted MP3 plays everywhere, immediately, on any device.
              </p>
              <p>
                <strong className="text-foreground">Efficient compression</strong> is MP3's defining advantage for converted video audio. Using psychoacoustic modelling, MP3 removes frequencies that human hearing cannot perceive at a given loudness level — dramatically reducing file size while maintaining near-identical perceived audio quality. A one-hour video occupying several gigabytes can become a 192 kbps MP3 under 90 MB, a size reduction exceeding 95% in most cases.
              </p>
              <p>
                MP3 is <strong className="text-foreground">perfect for music and podcasts</strong>. At 256 kbps or 320 kbps, converted music sounds transparent and full-bodied on any headphones or speakers — indistinguishable from lossless audio for most listeners. At 128 kbps, voice-dominant content such as lectures, podcast interviews, and webinar recordings is crisp, intelligible, and compact. For <strong className="text-foreground">easy sharing</strong>, MP3 is accepted as a first-class input format by every major podcast platform — Spotify, Apple Podcasts, Amazon Music — and integrates seamlessly into every digital audio workstation and music library application. Whatever your use case, MP3 delivers the compatibility, efficiency, and quality that no other audio format matches.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8 — FAQ */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about Pixocraft's video to MP3 converter free tool.</p>
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
