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
    question: "How do I convert video to audio online?",
    answer: "Upload your video file to Pixocraft's free video to audio converter using the drag-and-drop tool above. Choose your preferred MP3 audio quality — 128 kbps up to 320 kbps — then click Convert. FFmpeg WebAssembly processes your file entirely inside your browser with no uploads required. Once conversion is complete, click Download to save the MP3 audio file directly to your device. No registration or software needed.",
  },
  {
    question: "Is this video to audio converter free?",
    answer: "Yes, completely free — always. Pixocraft's video to audio converter has no hidden costs, no premium tiers, no watermarks on output files, and no account required. You can convert video to audio as many times as you want with no daily usage caps and no file size restrictions. Pixocraft is committed to keeping this tool free and unrestricted for everyone.",
  },
  {
    question: "Can I convert multiple videos at once?",
    answer: "Yes. Pixocraft's batch video to audio converter lets you upload and convert multiple video files in a single session. Drag and drop several files at once or select multiple files with the file picker. Each file is processed sequentially in your browser, gets its own individual download button, and can be downloaded as a ZIP archive in one click — making bulk conversion fast and effortless.",
  },
  {
    question: "Is my video file secure during conversion?",
    answer: "Absolutely. When you convert video to audio using Pixocraft, your video file is never transmitted to any server. All processing happens locally in your browser using WebAssembly-based FFmpeg. Your data never leaves your device — there is no third party involved, no file storage, and no logging of any kind. This makes Pixocraft one of the most private video to audio converters available online.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "For music or rich audio content, choose 256 kbps or 320 kbps for the best listening experience. For lectures, podcasts, or voice recordings where file size matters more, 128 kbps is clear and compact. 192 kbps is the recommended default — it provides an excellent balance between quality and file size for most video to audio conversion use cases.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video file — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV." },
  { step: "02", title: "Select audio quality", description: "Choose the bitrate that suits your needs — from 128 kbps for compact speech files up to 320 kbps for audiophile-grade music." },
  { step: "03", title: "Click Convert", description: "Hit the Convert button. FFmpeg WebAssembly processes your file entirely in your browser — no upload, no internet connection needed." },
  { step: "04", title: "Download your MP3 audio file", description: "Once conversion is complete, click Download to save the extracted MP3 audio file to your device instantly." },
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
  { icon: Monitor, title: "Browser-Based Conversion", description: "Everything runs directly in your browser using WebAssembly technology. No software to install, no app to download, no plugins required." },
  { icon: Shield, title: "Complete Privacy Protection", description: "Your video files never leave your device. All audio conversion is performed locally — no server, no storage, no data exposure of any kind." },
  { icon: Zap, title: "Fast Processing", description: "Conversion runs on your own hardware with no server queues or upload wait times. Large video files can be processed in seconds on modern devices." },
  { icon: WifiOff, title: "No Server Uploads", description: "Once the page loads, you can disconnect from the internet entirely and still convert video to audio. Works fully offline after initial load." },
  { icon: Star, title: "Multiple Formats Supported", description: "Convert MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, and WMV to MP3 — all major video formats handled automatically." },
  { icon: Repeat, title: "Batch Video Conversion", description: "Upload and convert multiple video files in a single session. No daily limits, no watermarks, no registration. Unlimited batch conversions." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/mp4-to-mp3", icon: Music },
  { label: "Extract Audio From Video", href: "/tools/extract-audio-from-video", icon: FileAudio },
  { label: "AVI to MP3 Converter", href: "/tools/avi-to-mp3", icon: FileAudio },
  { label: "MOV to MP3 Converter", href: "/tools/mov-to-mp3", icon: FileAudio },
  { label: "MKV to MP3 Converter", href: "/tools/mkv-to-mp3", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "MP4 to MP3 Converter", item: "https://tools.pixocraft.in/tools/mp4-to-mp3" },
    { "@type": "ListItem", position: 5, name: "Convert Video to Audio", item: "https://tools.pixocraft.in/tools/convert-video-to-audio" },
  ],
});

export default function ConvertVideoToAudio() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Convert Video to Audio (Free Online Tool) | Pixocraft Tools",
    description: "Convert video to audio instantly using Pixocraft's free video to audio converter. Extract MP3 audio from any video securely in your browser with no uploads required.",
    keywords: "convert video to audio, video to audio converter, convert video to mp3, extract audio from video, video audio converter, video sound extractor",
    canonicalUrl: "https://tools.pixocraft.in/tools/convert-video-to-audio",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Convert Video to Audio — Free Video to Audio Converter",
        description: "Free browser-based video to audio converter. Convert MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV to MP3 audio instantly with no uploads, no registration, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/convert-video-to-audio",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Convert Video to Audio",
        description: "Convert any video file to MP3 audio in 4 simple steps using Pixocraft's free browser-based video to audio converter.",
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
            { label: "Convert Video to Audio" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Music className="h-8 w-8 text-primary" aria-label="convert video to audio" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Convert Video to Audio —<br className="hidden sm:block" /> Free Online Converter
          </h1>
          <p className="text-xs text-muted-foreground mb-4">Part of the Pixocraft MP4 to MP3 Converter Tool Suite</p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Convert any video file into audio instantly using Pixocraft's browser-based video to audio converter. Extract high-quality MP3 audio from video files with complete privacy.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-formats">
              <CheckCircle className="h-3 w-3 mr-1" />Works with all video formats
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No file uploads required
            </Badge>
            <Badge variant="secondary" data-testid="badge-batch">
              <Repeat className="h-3 w-3 mr-1" />Batch video conversion supported
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Star className="h-3 w-3 mr-1" />Unlimited conversions
            </Badge>
            <Badge variant="secondary" data-testid="badge-offline">
              <Zap className="h-3 w-3 mr-1" />Works offline in your browser
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            No software installation needed. Works on all devices.
          </p>
        </section>


{/* SECTION 2 — TOOL INTERFACE */}
        <section id="converter" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Video to Audio Converter" />
        </section>

        {/* SECTION 3 — WHAT DOES CONVERT VIDEO TO AUDIO MEAN */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Does It Mean to Convert Video to Audio?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Every video file you encounter — whether it is an MP4 from your phone, an AVI from a camera, or a WEBM from a web browser — is a container that holds two separate streams: a <strong className="text-foreground">video track</strong> and an <strong className="text-foreground">audio track</strong>. The video track stores the sequence of image frames you see on screen, while the audio track carries the corresponding sound — music, speech, narration, or ambient noise.
              </p>
              <p>
                When you <strong className="text-foreground">convert video to audio</strong>, you are performing an extraction operation: the audio track is separated from the video track, and the visual content is discarded entirely. The audio data is then encoded and saved as a standalone audio file — in this case, an MP3. The resulting file contains only the sound from your original video, ready to play on any device without carrying the weight of the video frames.
              </p>
              <p>
                Pixocraft performs this conversion using <strong className="text-foreground">FFmpeg WebAssembly</strong> — the browser-compiled version of FFmpeg, the world's most widely deployed open-source multimedia framework. The conversion command strips the video layer (<code>-vn</code>), configures a 44,100 Hz sample rate and stereo output, and encodes the audio at your chosen bitrate. Crucially, all of this runs locally on your device, inside your browser tab, with no network transfer at any point.
              </p>
              <p>
                The quality of the extracted audio depends on the bitrate you select and the quality of the audio in your source video. At 320 kbps — the highest available setting — the <strong className="text-foreground">video to audio conversion</strong> produces an MP3 file that preserves the full fidelity of the original audio track, making it ideal for music extraction and archiving. Lower bitrates like 128 kbps reduce file size significantly while keeping speech and voice recordings clear and intelligible.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY CONVERT VIDEO TO AUDIO */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why Convert Video Files to Audio?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                There are many compelling reasons to <strong className="text-foreground">convert video to audio</strong>. The most popular is <strong className="text-foreground">listening to music videos as audio</strong>. Concert recordings, official music videos, live performances, and DJ sets are often shared in video format — but many people prefer to listen on the go without the visual component. Converting these videos to MP3 puts the music directly into your audio library, available offline on any device.
              </p>
              <p>
                <strong className="text-foreground">Saving lecture audio</strong> is another high-value use case. Students attending online courses, webinars, or recorded university lectures can convert the video recordings to audio and listen while commuting, exercising, or cooking. This transforms video-only content into flexible, on-demand listening — without needing a screen or a data-heavy video stream.
              </p>
              <p>
                <strong className="text-foreground">Creating podcasts from video</strong> is increasingly common among content creators. Interviews, panel discussions, video podcasts, and recorded workshops can all be converted to audio and uploaded directly to podcast platforms like Spotify or Apple Podcasts. The extracted MP3 is immediately ready to publish — no re-recording, no studio setup required.
              </p>
              <p>
                Finally, <strong className="text-foreground">reducing storage usage</strong> is a practical motivation for many users. Video files are large — a one-hour recording can occupy two to five gigabytes depending on resolution. The equivalent audio at 192 kbps occupies under 90 MB. For archives of meetings, interviews, and events where the visual content is not needed, converting video to audio dramatically reduces storage requirements and makes files easier to share and back up.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW TO CONVERT VIDEO TO AUDIO */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Convert Video to Audio</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four simple steps to get MP3 audio from any video file — directly in your browser.
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
              Pixocraft uses <strong className="text-foreground">FFmpeg WebAssembly</strong> for all local conversion. The same multimedia engine trusted by professional broadcasters and video editors worldwide — now running directly inside your browser.
            </p>
          </div>
        </section>

        {/* SECTION 6 — PIXOCRAFT VIDEO TO AUDIO CONVERTER FEATURES */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Use Pixocraft Video to Audio Converter</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Powerful, private, and completely free — with no restrictions or hidden costs.
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
                Pixocraft's <strong className="text-foreground">video to audio converter</strong> was built to solve the core problem with every other online converter: privacy. When you upload a video to an external service, you are trusting that service's servers, operators, and security practices. Even if the service claims to delete files after conversion, the risk of exposure exists. With Pixocraft's <strong className="text-foreground">browser-based conversion</strong>, that risk is entirely eliminated — because your file never leaves your browser tab at any point during the conversion.
              </p>
              <p>
                Speed is another major differentiator. Upload-based converters require your file to travel to a server, wait in a processing queue, be converted remotely, and then be sent back to your device. For a large video, each of these steps introduces latency. Pixocraft's <strong className="text-foreground">fast processing</strong> approach runs the entire conversion pipeline locally — on your device's own CPU — delivering results that are typically faster than upload-based tools even for very large files. Combined with support for <strong className="text-foreground">batch video conversion</strong>, Pixocraft is the most efficient free <strong className="text-foreground">video audio converter</strong> available.
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
              All video formats are processed entirely in your browser using FFmpeg WebAssembly — no upload required. Drop your video file onto the converter above and it handles format detection automatically.
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
                MP3 is the most universally compatible audio format in existence. Every major operating system, media player, smartphone, smart speaker, car stereo, and streaming service supports MP3 natively — without requiring additional codecs, plugins, or software. When you <strong className="text-foreground">convert video to audio</strong> as MP3, the resulting file is guaranteed to work everywhere, on every device, immediately.
              </p>
              <p>
                <strong className="text-foreground">Small file size</strong> is one of MP3's most practical advantages. Compared to video files, MP3 audio is dramatically more compact. A one-hour video at 1080p can be several gigabytes, while the same content as an MP3 at 192 kbps is under 90 MB. This makes converted audio files ideal for mobile storage, sharing via messaging apps, email attachments, and cloud backup where storage quotas matter.
              </p>
              <p>
                <strong className="text-foreground">Easy sharing</strong> is another key benefit. MP3 files attach directly to emails, upload instantly to cloud storage services, and transfer over Bluetooth or USB without compatibility issues. Podcast hosting platforms, music streaming services, and audio editors all accept MP3 as a first-class input format — making it the natural choice for any <strong className="text-foreground">video sound extractor</strong> workflow.
              </p>
              <p>
                Finally, MP3 is <strong className="text-foreground">perfect for music and podcasts</strong>. At 256 kbps or 320 kbps, the audio quality is indistinguishable from lossless formats for the vast majority of listeners. For voice content like lectures, podcasts, and interviews, even 128 kbps delivers clear, intelligible audio at a fraction of the file size. Whatever your use case, MP3 provides the ideal combination of quality, compatibility, and efficiency.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about converting video to audio.</p>
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
