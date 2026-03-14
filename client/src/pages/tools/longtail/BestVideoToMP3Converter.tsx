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
  CheckCircle,
  XCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Trophy,
  Lock,
} from "lucide-react";

const PAGE_FAQS = [
  {
    question: "What is the best video to MP3 converter online?",
    answer: "Pixocraft is the best video to MP3 converter online for users who value privacy, speed, and unrestricted access. It runs entirely in your browser using WebAssembly FFmpeg — meaning no upload, no server, no queue. It supports all major video formats, all bitrates up to 320 kbps, and unlimited batch conversion for free. Unlike most alternatives, there are no daily caps, no file size limits, no watermarks, and no registration requirement of any kind.",
  },
  {
    question: "Is Pixocraft better than other converters?",
    answer: "Pixocraft outperforms traditional online converters in the three areas that matter most: privacy, speed, and cost. Traditional converters upload your video to a remote server — exposing your files to third-party storage and processing risks. Pixocraft processes everything locally in your browser, so your file never leaves your device. There are no conversion queues, no bandwidth bottlenecks, and no server-side costs — making it both faster and genuinely free without any hidden restrictions.",
  },
  {
    question: "Can I convert multiple videos at once?",
    answer: "Yes, batch video to MP3 conversion is fully supported and completely free. Upload multiple video files at once by dragging several files onto the upload area or selecting multiple files through the file picker. Each video is processed sequentially by WebAssembly FFmpeg in your browser, receives its own download button, and all completed MP3 files can be downloaded together as a ZIP archive in one click. No limits apply to the number of files per session.",
  },
  {
    question: "Is my video secure during conversion?",
    answer: "Your video is completely secure. Pixocraft's browser-based architecture means your video file never leaves your device at any point — it is read from local memory, processed entirely by WebAssembly FFmpeg running inside your browser tab, and the resulting MP3 is written back to local memory for download. No server receives your data, no file is transmitted over a network, and no conversion activity is logged anywhere. This is the highest possible standard of conversion privacy.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "Select 256 kbps or 320 kbps for music, concert recordings, and any audio content where sound quality is the priority. These bitrates deliver transparent, full-fidelity MP3 audio for virtually all listeners on any playback system. For lectures, podcasts, interviews, and voice recordings, 128 kbps is clear and produces very compact files. 192 kbps is the recommended default — delivering an excellent balance between audio quality and file size for the broadest range of video to MP3 conversion use cases.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV. Multiple files can be uploaded at once for free batch conversion." },
  { step: "02", title: "Select MP3 quality", description: "Choose your preferred bitrate from 128 kbps (compact speech) to 320 kbps (maximum quality music). All quality options are available free with no restrictions." },
  { step: "03", title: "Click Convert", description: "Hit Convert. WebAssembly FFmpeg processes your video entirely inside your browser — no upload, no server involvement, no internet connection required during conversion." },
  { step: "04", title: "Download your MP3 file", description: "When conversion completes, click Download to save your MP3 directly to your device. Batch conversions can be downloaded individually or all together as a ZIP archive." },
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

const CRITERIA = [
  { icon: Zap, title: "Speed", description: "The best converter processes files as fast as your device allows — no upload latency, no server queues, and no bandwidth bottlenecks slowing down large video files." },
  { icon: Shield, title: "Privacy", description: "A converter that uploads your video to an external server creates unnecessary risk. The best solution processes everything locally so your files never leave your device." },
  { icon: Star, title: "Audio Quality", description: "All bitrates from 128 kbps to 320 kbps should be available free. High-quality audio output at 320 kbps should not be locked behind a paywall." },
  { icon: Monitor, title: "Format Support", description: "The best converter handles every major video format — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, WMV — without requiring format-specific workarounds." },
  { icon: Repeat, title: "Unlimited Usage", description: "Daily caps and file count limits cripple real workflows. The best video to MP3 converter imposes no restrictions on how many files you can convert in a single session." },
];

const COMPARISON_ROWS = [
  { feature: "Privacy", pixocraft: "Files never leave your device", traditional: "Files uploaded to remote servers" },
  { feature: "Upload requirement", pixocraft: "No upload — fully local", traditional: "Upload required for every file" },
  { feature: "Conversion speed", pixocraft: "Instant — runs on your hardware", traditional: "Depends on server load and queue" },
  { feature: "File limits", pixocraft: "No file size or count limits", traditional: "Caps at 50–500 MB typically" },
  { feature: "Security", pixocraft: "Zero exposure — local only", traditional: "Third-party data handling applies" },
  { feature: "Audio quality", pixocraft: "Up to 320 kbps, all free", traditional: "High bitrate often paywalled" },
];

const ADVANTAGES = [
  { icon: Monitor, title: "Browser-Based Conversion", description: "Runs entirely in your browser tab. No app to install, no plugin to download, no OS restriction. Works on Windows, macOS, Linux, Android, and iOS alike." },
  { icon: Shield, title: "No Server Uploads", description: "Your video files stay on your device throughout the entire process. No server receives your data at any point — eliminating privacy, security, and data retention risks entirely." },
  { icon: Zap, title: "FFmpeg Powered Engine", description: "WebAssembly FFmpeg is the same multimedia engine used by professional video editors and major streaming platforms — now running directly in your browser at full processing speed." },
  { icon: Repeat, title: "Unlimited Conversions", description: "No daily caps, no file count quotas, no file size restrictions. Convert as many videos to MP3 as you need, as many times as you need, with no conditions." },
  { icon: Star, title: "Batch Processing", description: "Upload multiple video files at once and convert them all to MP3 in a single session. Download individually or all together as a ZIP archive — fully free, fully unlimited." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/video-to-mp3-converter", icon: Music },
  { label: "Free Video to MP3 Converter", href: "/tools/free-video-to-mp3-converter", icon: Music },
  { label: "Extract Audio From Video", href: "/tools/extract-audio-from-video", icon: FileAudio },
  { label: "Convert Video to Audio", href: "/tools/convert-video-to-audio", icon: FileAudio },
  { label: "AVI to MP3 Converter", href: "/tools/avi-to-mp3", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "Best Video to MP3 Converter", item: "https://tools.pixocraft.in/tools/best-video-to-mp3-converter" },
  ],
});

export default function BestVideoToMP3Converter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Best Video to MP3 Converter (Fast & Free) | Pixocraft Tools",
    description: "Find the best video to MP3 converter online. Pixocraft lets you convert videos into MP3 instantly with no uploads, unlimited usage, and high-quality audio.",
    keywords: "best video to mp3 converter, top video to mp3 converter, video to mp3 converter online, free video to mp3 converter, convert video to mp3, video audio extractor",
    canonicalUrl: "https://tools.pixocraft.in/tools/best-video-to-mp3-converter",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Best Video to MP3 Converter — Fast & Free Online Tool",
        description: "The best free browser-based video to MP3 converter. Convert MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 instantly with no uploads, no registration, unlimited usage, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/best-video-to-mp3-converter",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Convert Video to MP3 Using the Best Converter",
        description: "Convert any video file to MP3 audio in 4 steps using Pixocraft — the best free browser-based video to MP3 converter available online.",
        steps: HOW_TO_STEPS.map(s => ({ name: s.title, text: s.description })),
      })} />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: "Best Video to MP3 Converter" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Trophy className="h-8 w-8 text-primary" aria-label="best video to mp3 converter" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Best Video to MP3 Converter —<br className="hidden sm:block" /> Fast &amp; Free Online Tool
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Looking for the best video to MP3 converter? Pixocraft provides a fast, secure, and browser-based tool that converts video files into high-quality MP3 audio instantly without uploads or registration.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No uploads required
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Repeat className="h-3 w-3 mr-1" />Unlimited conversions
            </Badge>
            <Badge variant="secondary" data-testid="badge-formats">
              <Star className="h-3 w-3 mr-1" />Supports all video formats
            </Badge>
            <Badge variant="secondary" data-testid="badge-browser">
              <Zap className="h-3 w-3 mr-1" />Works directly in your browser
            </Badge>
            <Badge variant="secondary" data-testid="badge-batch">
              <Monitor className="h-3 w-3 mr-1" />Batch conversion supported
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Ranked best for privacy, speed, and unlimited free access — no registration needed.
          </p>
        </section>

        {/* SECTION 2 — TOOL INTERFACE */}
        <section id="converter" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Best Video to MP3 Converter" />
        </section>

        {/* SECTION 3 — WHAT MAKES THE BEST VIDEO TO MP3 CONVERTER */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">What Makes the Best Video to MP3 Converter?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Not all converters are equal. Here are the criteria that separate the best from the rest.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {CRITERIA.map((c) => (
                <Card key={c.title} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <c.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{c.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{c.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                When evaluating any <strong className="text-foreground">top video to MP3 converter</strong>, the five criteria above consistently separate genuinely useful tools from those that appear capable on the surface but impose hidden restrictions. Speed is not just about raw processing throughput — it is about eliminating every source of latency between uploading a file and downloading the result. <strong className="text-foreground">Privacy</strong> is about where your file actually goes during processing, not just what the terms of service claim. Audio quality means offering the full range of bitrates to every user, not reserving 256 kbps and 320 kbps for paid subscribers.
              </p>
              <p>
                <strong className="text-foreground">Format support</strong> determines whether a converter is genuinely versatile or just functional for the most common formats. A converter that handles MP4 and MOV but fails on MKV, FLV, or WEBM forces users to seek alternative tools for formats they encounter regularly. <strong className="text-foreground">Unlimited usage</strong> is the defining characteristic that separates tools built to serve users from tools built to upsell users. The best <strong className="text-foreground">video to MP3 converter online</strong> has no caps, no quotas, no paywall blocking essential features — because restriction is a service failure, not a business model.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY PIXOCRAFT IS THE BEST */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Pixocraft Is the Best Video to MP3 Converter</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Five advantages that make Pixocraft the best choice for every user.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {ADVANTAGES.map((a) => (
                <Card key={a.title} className="p-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <a.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{a.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="max-w-4xl mx-auto space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                The combination of <strong className="text-foreground">browser-based conversion</strong>, <strong className="text-foreground">no server uploads</strong>, and an <strong className="text-foreground">FFmpeg powered engine</strong> creates a tool that simultaneously outperforms upload-based converters on speed, privacy, and reliability. Because Pixocraft's conversion pipeline runs entirely on your device's CPU via WebAssembly FFmpeg, results arrive faster than any upload-process-download workflow can deliver — regardless of how optimised the remote server is. And because no data ever leaves your browser tab, Pixocraft eliminates the entire category of privacy and security risk that upload-based converters create by design.
              </p>
              <p>
                For users who regularly work with large collections of videos — archiving concert recordings, downloading lecture series, preparing podcast episode audio from video interviews, or building personal music libraries — the <strong className="text-foreground">unlimited conversions</strong> and <strong className="text-foreground">batch processing</strong> capabilities mean Pixocraft scales to any workflow without cost, registration, or usage management. This is why Pixocraft is the best <strong className="text-foreground">free video to MP3 converter</strong> for both casual and power users.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — COMPARISON TABLE */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Video to MP3 Converter Comparison</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                See how Pixocraft compares to traditional upload-based online converters.
              </p>
            </div>
            <div className="overflow-x-auto rounded-md border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="text-left px-5 py-3 font-semibold">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3 font-semibold">Traditional Online Converters</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                      <td className="px-5 py-3 font-medium">{row.feature}</td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <CheckCircle className="h-4 w-4 shrink-0" />
                          {row.pixocraft}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <XCircle className="h-4 w-4 shrink-0 text-red-400" />
                          {row.traditional}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 6 — HOW TO CONVERT VIDEO TO MP3 */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Convert Video to MP3</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four steps to MP3 audio from any video — no upload, no account, no cost.
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
              All conversion is handled by <strong className="text-foreground">WebAssembly FFmpeg</strong> running locally in your browser — the same professional multimedia engine trusted by video editors and broadcasters worldwide.
            </p>
          </div>
        </section>

        {/* SECTION 7 — SUPPORTED VIDEO FORMATS */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Supported Video Formats</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Every major video format is fully supported. All can be converted into high-quality MP3 audio directly in your browser.
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
              This broad format compatibility means the best <strong className="text-foreground">video audio extractor</strong> works with every file you are likely to encounter — from phone recordings to broadcast downloads to archival formats. Drop any supported file onto the converter above and processing begins immediately.
            </p>
          </div>
        </section>

        {/* SECTION 8 — BENEFITS OF MP3 AUDIO */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Benefits of MP3 Audio for Converted Video
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> makes MP3 the default output format for the best video to MP3 converters. MP3 is supported natively by every operating system, media player, smartphone, car audio system, smart speaker, and music streaming service without requiring additional codecs, plugins, or drivers. A converted MP3 plays on every device, everywhere, immediately.
              </p>
              <p>
                <strong className="text-foreground">Smaller file size</strong> is MP3's most significant practical advantage over raw video files. A one-hour lecture video at 1080p can occupy multiple gigabytes of storage. The same content as an MP3 at 192 kbps is under 90 MB — a reduction of more than 95% in many cases. This makes converted MP3 files ideal for mobile storage, email attachment, messaging app sharing, and cloud storage where quotas apply.
              </p>
              <p>
                MP3 is <strong className="text-foreground">ideal for music and podcasts</strong>. At 320 kbps, the converted audio is virtually indistinguishable from the source for all practical listening purposes — transparent, full-fidelity, and ready for any high-quality playback system. For podcast production, MP3 is the accepted input format on every major platform — Spotify, Apple Podcasts, Amazon Music, and Google Podcasts all accept MP3 files directly. Converting video to MP3 makes any video content immediately publishable as a podcast or audio episode.
              </p>
              <p>
                <strong className="text-foreground">Easy sharing</strong> is another defining MP3 advantage. MP3 files attach directly to emails, transfer via Bluetooth or USB, sync to cloud storage services, and upload to music platforms without compatibility issues. For anyone distributing audio content — lecture recordings shared with classmates, music clips shared with friends, podcast episodes shared with listeners — MP3 is the format that works everywhere with zero friction.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about Pixocraft's best video to MP3 converter.</p>
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
