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
  Mic,
  BookOpen,
  Smartphone,
  Headphones,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from "lucide-react";

const PAGE_FAQS = [
  {
    question: "How do I extract audio from a video?",
    answer: "Upload your video file to Pixocraft's free video audio extractor using the drag-and-drop tool above. Select your preferred MP3 audio quality — from 128 kbps up to 320 kbps — then click Convert. The tool processes your file entirely inside your browser using FFmpeg WebAssembly. Once conversion is complete, click Download to save your extracted MP3 file to your device. No uploads, no registration required.",
  },
  {
    question: "Is this video audio extractor free?",
    answer: "Yes, completely free — always. Pixocraft's video audio extractor has no hidden fees, no premium tiers, no watermarks on output files, and no registration required. You can extract audio from video as many times as you need without any restrictions. There are no daily usage caps and no file size limits. Pixocraft is committed to keeping this tool free for everyone, indefinitely.",
  },
  {
    question: "Can I extract audio from multiple videos at once?",
    answer: "Yes. The batch processing feature lets you upload and convert multiple video files in a single session. Simply drag and drop several files at once or select multiple files with the file picker. Each file is processed sequentially in your browser and gets its own individual download button. You can also download all converted MP3 files as a single ZIP archive in one click — making bulk audio extraction fast and effortless.",
  },
  {
    question: "Is my video file secure?",
    answer: "Absolutely. When you extract audio from a video using Pixocraft, your video file is never transmitted to any server. All processing happens locally in your browser using WebAssembly-based FFmpeg. Your data never leaves your computer or phone. There is no third party involved, no file storage, and no logging of any kind. This makes Pixocraft one of the most private video audio extractors available online.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "For music or audio with rich instrumentation, choose 256 kbps or 320 kbps to get the best listening experience. For podcasts, interviews, lectures, or any voice recording where file size matters, 128 kbps is more than sufficient and keeps files compact. 192 kbps is the recommended default — it provides an excellent balance between audio quality and file size for the vast majority of video to audio extraction use cases.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video file — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV." },
  { step: "02", title: "Choose MP3 audio quality", description: "Select the bitrate that best suits your needs — from 128 kbps for podcasts up to 320 kbps for high-fidelity music." },
  { step: "03", title: "Click Convert", description: "Hit the Convert button. FFmpeg WebAssembly processes your file entirely inside your browser — no upload or internet connection needed." },
  { step: "04", title: "Download the extracted MP3 file", description: "Once done, click Download to save the extracted MP3 audio file directly to your device instantly." },
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
  { icon: Shield, title: "Privacy First", description: "Your files never leave your device. All audio extraction happens locally in your browser — no server, no storage, no risk." },
  { icon: Zap, title: "Lightning Fast Processing", description: "Conversion runs directly on your device using WebAssembly technology, eliminating upload wait times entirely." },
  { icon: WifiOff, title: "No File Uploads", description: "Everything runs locally on your machine. Once the page loads, you can even disconnect from the internet and still extract audio." },
  { icon: Star, title: "High Quality Audio", description: "Export MP3 at up to 320 kbps for crystal-clear, audiophile-grade audio quality from any video source." },
  { icon: Monitor, title: "All Devices Supported", description: "Fully responsive and compatible with desktop, mobile, and tablet browsers — no app or software installation needed." },
  { icon: Repeat, title: "Batch Processing", description: "Extract audio from multiple video files at once. No daily limits, no watermarks, no sign-up. Unlimited conversions." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/mp4-to-mp3", icon: Music },
  { label: "AVI to MP3 Converter", href: "/tools/avi-to-mp3", icon: FileAudio },
  { label: "MOV to MP3 Converter", href: "/tools/mov-to-mp3", icon: FileAudio },
  { label: "MKV to MP3 Converter", href: "/tools/mkv-to-mp3", icon: FileAudio },
  { label: "WEBM to MP3 Converter", href: "/tools/webm-to-mp3", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "MP4 to MP3 Converter", item: "https://tools.pixocraft.in/tools/mp4-to-mp3" },
    { "@type": "ListItem", position: 5, name: "Extract Audio From Video", item: "https://tools.pixocraft.in/tools/extract-audio-from-video" },
  ],
});

export default function ExtractAudioFromVideo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Extract Audio From Video (Free Online Tool) | Pixocraft Tools",
    description: "Extract audio from any video instantly using Pixocraft's free video audio extractor. Convert video files to MP3 securely in your browser with no uploads required.",
    keywords: "extract audio from video, video audio extractor, convert video to audio, get audio from video, extract mp3 from video, video to mp3 converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/extract-audio-from-video",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Extract Audio From Video — Free Video Audio Extractor",
        description: "Free browser-based video audio extractor. Extract audio from MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 instantly with no uploads, no registration, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/extract-audio-from-video",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Extract Audio From Video",
        description: "Extract audio from any video file as MP3 in 4 simple steps using Pixocraft's free browser-based video audio extractor.",
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
            { label: "Extract Audio From Video" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <FileAudio className="h-8 w-8 text-primary" aria-label="extract audio from video" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Extract Audio From Video —<br className="hidden sm:block" /> Free Online Tool
          </h1>
          <p className="text-xs text-muted-foreground mb-4">Part of the Pixocraft MP4 to MP3 Converter Tool Suite</p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Extract audio from any video instantly using Pixocraft's browser-based video audio extractor. Convert video files into high-quality MP3 audio with complete privacy.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-formats">
              <CheckCircle className="h-3 w-3 mr-1" />Works with all video formats
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No file uploads
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Repeat className="h-3 w-3 mr-1" />Unlimited conversions
            </Badge>
            <Badge variant="secondary" data-testid="badge-instant">
              <Zap className="h-3 w-3 mr-1" />Extract audio instantly
            </Badge>
            <Badge variant="secondary" data-testid="badge-batch">
              <Star className="h-3 w-3 mr-1" />Batch video processing supported
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Works offline in your browser. No software installation needed.
          </p>
        </section>


{/* SECTION 2 — TOOL INTERFACE */}
        <section id="extractor" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Video Audio Extractor" />
        </section>

        {/* SECTION 3 — WHAT DOES EXTRACT AUDIO FROM VIDEO MEAN */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Does It Mean to Extract Audio From a Video?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Every video file is a container that holds two separate streams of data: a <strong className="text-foreground">video stream</strong> and an <strong className="text-foreground">audio stream</strong>. The video stream contains the visual frames you see on screen, while the audio stream carries the sound — music, speech, narration, or ambient noise — that plays alongside those frames. These two streams are bundled together inside container formats such as MP4, AVI, MOV, MKV, and WEBM.
              </p>
              <p>
                When you <strong className="text-foreground">extract audio from a video</strong>, you are separating the audio stream from the video stream. The visual content is discarded entirely, and the audio data is saved as a standalone audio file — in this case, an MP3. The MP3 file contains only the sound from your original video, with no video track attached.
              </p>
              <p>
                Pixocraft uses <strong className="text-foreground">FFmpeg WebAssembly</strong> to perform this extraction directly inside your browser. FFmpeg is the world's most widely used open-source multimedia framework, trusted by professional video editors, broadcasters, and streaming platforms globally. The command it runs strips the video track (<code>-vn</code>), sets the audio sample rate to 44,100 Hz, outputs stereo audio, and encodes the result at your chosen bitrate — all without touching a remote server.
              </p>
              <p>
                The result is a high-quality <strong className="text-foreground">MP3 file</strong> that preserves the original audio fidelity of your video as faithfully as possible at your selected bitrate. Because no re-encoding of the audio stream is performed beyond the bitrate conversion, the extracted audio retains maximum quality from the source material. This makes Pixocraft's <strong className="text-foreground">video audio extractor</strong> ideal for music extraction, lecture recording, podcast production, and any use case where audio quality matters.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY PEOPLE EXTRACT AUDIO FROM VIDEO */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why Extract Audio From Video Files?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                There are many practical reasons why people regularly need to <strong className="text-foreground">extract audio from video</strong>. One of the most common is <strong className="text-foreground">music extraction</strong> — pulling a song or soundtrack from a concert recording, a movie clip, or a music video. By extracting the audio track as MP3, you can add the music to your personal collection, sync it to a playlist, or use it offline without carrying the full video file.
              </p>
              <p>
                <strong className="text-foreground">Saving lecture audio</strong> is another major use case. Students and researchers frequently record educational videos from online courses, webinars, or in-person lectures. Extracting the audio lets them listen back on a commute, at the gym, or anywhere a screen is inconvenient — turning video content into an on-demand podcast.
              </p>
              <p>
                <strong className="text-foreground">Podcast creation</strong> from video recordings is increasingly popular. Content creators who record video podcasts, interviews, or panel discussions can extract the audio track and publish it directly to podcast platforms — no re-recording required. The extracted MP3 is ready to upload to Spotify, Apple Podcasts, or any podcast hosting service.
              </p>
              <p>
                Finally, <strong className="text-foreground">reducing storage size</strong> is a practical motivation. A one-hour video file can easily occupy several gigabytes of storage, while the extracted MP3 audio might be under 100 MB at 192 kbps. For archives of recorded meetings, interviews, or events where the visual content is unnecessary, extracting the audio dramatically reduces storage requirements and makes files easier to share via email or messaging apps.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW TO EXTRACT AUDIO FROM VIDEO */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Extract Audio From Video</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four simple steps to get MP3 audio from any video file — no software needed.
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
              Pixocraft processes all files locally using <strong className="text-foreground">FFmpeg WebAssembly</strong> — the same powerful multimedia engine used by professional video editors. Your video never leaves your browser.
            </p>
          </div>
        </section>

        {/* SECTION 6 — PIXOCRAFT VIDEO AUDIO EXTRACTOR FEATURES */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Use Pixocraft Video Audio Extractor</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Built for speed, privacy, and quality — with no compromises or hidden costs.
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
                Pixocraft's <strong className="text-foreground">video audio extractor</strong> is built around a core principle: your data belongs to you. Every competing online tool that requires you to upload your video file introduces a privacy risk — your file is sent to a third-party server, processed remotely, and sometimes retained for analysis. With Pixocraft, that risk is eliminated entirely. The <strong className="text-foreground">browser-based conversion</strong> approach means your file is processed on your own device using WebAssembly-compiled FFmpeg, with no network transfer at any point during extraction.
              </p>
              <p>
                Speed is another decisive advantage. Upload-based converters make you wait for your file to travel to a server, be queued behind other users, processed remotely, and then downloaded back. For a large video, this can take minutes. Pixocraft's <strong className="text-foreground">fast processing</strong> approach completes the entire pipeline locally — a 500 MB video that might take five minutes on a remote server can be done in well under a minute on a modern device. And because <strong className="text-foreground">multiple formats</strong> are supported natively by FFmpeg, you never need to check whether your video type is compatible — MP4, AVI, MOV, MKV, WEBM, FLV, and more are all handled identically.
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
                All formats below are fully supported and can be converted into high-quality MP3 audio directly in your browser.
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
              All formats are processed entirely in your browser using FFmpeg WebAssembly — no upload required. Simply drop your video file onto the extractor above and it handles the rest automatically.
            </p>
          </div>
        </section>

        {/* SECTION 8 — BENEFITS OF MP3 AUDIO */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why MP3 Is the Best Format for Extracted Audio
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                MP3 remains the most universally compatible audio format available today. It is supported natively by every major operating system, media player, smartphone, smart speaker, car stereo, and streaming platform without requiring any additional codecs or software. When you <strong className="text-foreground">extract audio from video</strong> as MP3, you get a file that works everywhere — instantly, without compatibility concerns.
              </p>
              <p>
                <strong className="text-foreground">Smaller file size</strong> is one of MP3's defining advantages. A typical one-hour audio recording at 192 kbps produces an MP3 file of approximately 85 MB — a fraction of the size of the original video. This makes extracted MP3 files ideal for storage on mobile devices with limited capacity, sharing over messaging apps with file size restrictions, or archiving large collections of recordings without consuming excessive disk space.
              </p>
              <p>
                <strong className="text-foreground">Perfect for music and podcasts</strong>, MP3 at 256 kbps or 320 kbps delivers audio quality that is indistinguishable from lossless formats for most listeners in most environments. Whether you are extracting a concert recording, a studio session, or a podcast interview, the resulting MP3 provides a satisfying listening experience on any device or headphones. At lower bitrates like 128 kbps, speech and voice recordings remain clear and intelligible while keeping file sizes minimal.
              </p>
              <p>
                <strong className="text-foreground">Easy to store and share</strong>, MP3 files integrate seamlessly into any workflow. They can be imported directly into music libraries like iTunes or Spotify local files, uploaded to podcast hosting platforms, shared via email or cloud storage, and played in any browser-based audio player. The widespread adoption of MP3 means that extracted audio from your videos is immediately useful — no conversion, no compatibility troubleshooting, no barriers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about extracting audio from video.</p>
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
              <p className="text-muted-foreground">More free tools from Pixocraft for working with audio and video.</p>
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
