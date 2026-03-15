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
    question: "What is a video audio extractor?",
    answer: "A video audio extractor is a tool that separates the audio track from a video file and saves it as a standalone audio file — typically MP3. Video files contain both a visual stream and an audio stream bundled together. A video audio extractor removes the visual component and exports only the sound, making it available for offline listening, podcast publishing, music archiving, or any use case where the video track is unnecessary.",
  },
  {
    question: "How do I extract audio from a video file?",
    answer: "Upload your video using the drag-and-drop tool above, or click to browse for a file. Select your preferred MP3 bitrate — from 128 kbps up to 320 kbps — then click Convert. Pixocraft's FFmpeg WebAssembly engine processes your file entirely in your browser with no upload required. Once conversion finishes, click Download to save the extracted MP3 directly to your device. No account or software installation needed.",
  },
  {
    question: "Is Pixocraft video audio extractor free?",
    answer: "Yes, completely free with no restrictions. There are no hidden fees, no premium plans, no watermarks, and no registration required. You can extract audio from video as many times as you need with no daily conversion limits and no file size caps. Pixocraft is committed to keeping all tools permanently free and unrestricted for everyone, with no conditions attached.",
  },
  {
    question: "Can I extract audio from multiple videos at once?",
    answer: "Yes. Pixocraft supports batch video audio extraction — upload multiple video files at once by dragging several files onto the upload area or selecting multiple files via the file picker. Each video is processed sequentially in your browser and gets its own download button. You can also download all converted MP3 files together as a single ZIP archive in one click, making bulk extraction fast and efficient.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "For music, concerts, and richly produced audio content, select 256 kbps or 320 kbps for the best fidelity. For lectures, podcasts, interviews, and voice recordings where compact file size is a priority, 128 kbps is clear and very small. 192 kbps is the recommended default — it delivers an excellent balance of quality and file size for most video audio extraction use cases.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV." },
  { step: "02", title: "Select audio quality", description: "Choose your preferred bitrate from 128 kbps (compact) to 320 kbps (maximum quality). Higher bitrates produce larger files with better audio fidelity." },
  { step: "03", title: "Click Convert", description: "Hit Convert. FFmpeg WebAssembly runs entirely inside your browser — no upload, no server, no internet connection required during extraction." },
  { step: "04", title: "Download your MP3 file", description: "When conversion completes, click Download to save your extracted MP3 audio file instantly to your device." },
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
  { icon: Shield, title: "Privacy-First Conversion", description: "Your video files never leave your device. All extraction runs locally in your browser — no server receives your data, nothing is stored or logged." },
  { icon: Repeat, title: "Batch Video Extraction", description: "Upload and convert multiple video files in one session. No daily limits, no file count caps, no registration — fully unlimited batch processing." },
  { icon: Star, title: "Multi-Format Compatibility", description: "MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, and WMV are all fully supported — every major video container handled automatically by FFmpeg." },
  { icon: Music, title: "High Quality MP3 Output", description: "Export extracted audio at up to 320 kbps for audiophile-grade quality. Per-file bitrate selection lets you choose the perfect quality for each video." },
  { icon: Zap, title: "Instant Processing", description: "Conversion runs on your own device hardware with no upload latency, no server queues, and no download round trips. Results are ready in seconds." },
  { icon: WifiOff, title: "Works Completely Offline", description: "Once the page loads, disconnect from the internet entirely — audio extraction continues without interruption. Ideal for travel and low-connectivity use." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/mp4-to-mp3", icon: Music },
  { label: "Extract Audio From Video", href: "/tools/extract-audio-from-video", icon: FileAudio },
  { label: "Convert Video to Audio", href: "/tools/convert-video-to-audio", icon: FileAudio },
  { label: "Get Audio From Video", href: "/tools/get-audio-from-video", icon: FileAudio },
  { label: "AVI to MP3 Converter", href: "/tools/avi-to-mp3", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "MP4 to MP3 Converter", item: "https://tools.pixocraft.in/tools/mp4-to-mp3" },
    { "@type": "ListItem", position: 5, name: "Video Audio Extractor", item: "https://tools.pixocraft.in/tools/video-audio-extractor" },
  ],
});

export default function VideoAudioExtractor() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Video Audio Extractor (Free Online Tool) | Pixocraft Tools",
    description: "Extract audio from video instantly using Pixocraft's free video audio extractor. Convert video files to MP3 securely in your browser with no uploads required.",
    keywords: "video audio extractor, extract audio from video, video sound extractor, video to mp3 converter, convert video to audio, extract mp3 from video",
    canonicalUrl: "https://tools.pixocraft.in/tools/video-audio-extractor",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Video Audio Extractor — Free Online Tool",
        description: "Free browser-based video audio extractor. Extract audio from MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV as MP3 instantly with no uploads, no registration, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/video-audio-extractor",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Extract Audio From Video Using Pixocraft",
        description: "Use Pixocraft's free video audio extractor to get MP3 audio from any video file in 4 simple steps — entirely in your browser.",
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
            { label: "Video Audio Extractor" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <FileAudio className="h-8 w-8 text-primary" aria-label="video audio extractor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Video Audio Extractor —<br className="hidden sm:block" /> Free Online Tool
          </h1>
          <p className="text-xs text-muted-foreground mb-4">Part of the Pixocraft MP4 to MP3 Converter Tool Suite</p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Extract audio from any video instantly with Pixocraft's powerful browser-based video audio extractor. Convert video files into high-quality MP3 audio without uploading anything.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-formats">
              <CheckCircle className="h-3 w-3 mr-1" />Extract audio from any video format
            </Badge>
            <Badge variant="secondary" data-testid="badge-batch">
              <Repeat className="h-3 w-3 mr-1" />Convert multiple videos at once
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No uploads or registration required
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Star className="h-3 w-3 mr-1" />Unlimited usage
            </Badge>
            <Badge variant="secondary" data-testid="badge-browser">
              <Zap className="h-3 w-3 mr-1" />Works completely inside your browser
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            No software installation needed. Works on all devices and browsers.
          </p>
        </section>


{/* SECTION 2 — TOOL INTERFACE */}
        <section id="extractor" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Video Audio Extractor" />
        </section>

        {/* SECTION 3 — WHAT IS A VIDEO AUDIO EXTRACTOR */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Is a Video Audio Extractor?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                A <strong className="text-foreground">video audio extractor</strong> is a tool that reads a video file, isolates the audio track, and saves it as a standalone audio file — removing the visual component entirely. To understand why this is useful, it helps to know how video files are structured.
              </p>
              <p>
                Every video file you encounter is a container format that holds two separate streams of data simultaneously: a <strong className="text-foreground">video stream</strong> and an <strong className="text-foreground">audio stream</strong>. The video stream is a sequence of image frames — the moving picture you see on screen. The audio stream carries all the sound that accompanies those frames. These two streams are encoded independently and bundled together inside container formats such as MP4, AVI, MOV, MKV, and WEBM.
              </p>
              <p>
                When a <strong className="text-foreground">video audio extractor</strong> processes your file, it reads the container, locates the audio stream, and copies or re-encodes it as a standalone audio file. The video stream is discarded. The resulting file — in this case, an MP3 — contains only the sound from your original video, with no visual data attached and no bloat from the video frames.
              </p>
              <p>
                Pixocraft's video audio extractor uses <strong className="text-foreground">FFmpeg WebAssembly</strong> to perform this extraction entirely inside your browser. FFmpeg is the most widely trusted open-source multimedia framework in the world, used by professional video editors, major streaming platforms, and broadcasters. By compiling FFmpeg to WebAssembly, Pixocraft brings this professional-grade extraction capability directly to your browser tab — no installation, no upload, no server. The audio is extracted, encoded at your chosen bitrate, and made available for download in seconds.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY USE A VIDEO AUDIO EXTRACTOR */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why People Use Video Audio Extractors
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Extracting music from videos</strong> is the most common reason people reach for a video audio extractor. Concert recordings, music videos, live performances, DJ sets, and acoustic sessions are frequently distributed as video files. By extracting the audio track as MP3, fans can add the music to their personal libraries and playlists — listening offline on any device without carrying the data weight of a video file.
              </p>
              <p>
                <strong className="text-foreground">Converting lectures to audio</strong> is equally popular among students and researchers. Online course recordings, university lecture videos, webinars, and conference presentations can all be extracted to audio and listened to like a podcast — ideal for revision while commuting, exercising, or multitasking where a screen is impractical. Extracting the audio makes educational content far more flexible and accessible.
              </p>
              <p>
                <strong className="text-foreground">Creating podcasts from video recordings</strong> is a workflow many content creators rely on. Video podcasts, interview recordings, panel discussions, and roundtable sessions recorded on video can be extracted to audio and published directly to podcast platforms. The resulting MP3 is immediately upload-ready — no re-recording, no studio required.
              </p>
              <p>
                <strong className="text-foreground">Saving storage space</strong> is a practical advantage that drives a lot of audio extraction. A one-hour video at 1080p can occupy several gigabytes, while the equivalent MP3 audio at 192 kbps is under 90 MB. For archives of meetings, interviews, or events where the visual content is no longer needed, using a <strong className="text-foreground">video sound extractor</strong> dramatically reduces storage requirements and makes files easier to share and back up.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW THIS VIDEO AUDIO EXTRACTOR WORKS */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How the Pixocraft Video Audio Extractor Works</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four simple steps — everything runs locally in your browser.
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
                The technical foundation of Pixocraft's <strong className="text-foreground">video audio extractor</strong> is <strong className="text-foreground">FFmpeg WebAssembly</strong> — a browser-compiled build of the FFmpeg multimedia framework. When you click Convert, the WebAssembly module is already loaded and ready. It reads your video file directly from your device's memory, identifies the audio stream, strips the video track using the <code>-vn</code> flag, and encodes the audio to MP3 at your selected bitrate. The entire pipeline runs on your device's CPU with no <strong className="text-foreground">server upload</strong> at any point.
              </p>
              <p>
                This <strong className="text-foreground">browser-based processing</strong> approach delivers several concrete advantages. First, there is no upload wait — your file does not have to travel over the network to reach a server, which eliminates the single biggest source of latency in traditional online converters. Second, there is no queue — you are not waiting behind other users on a shared server. Third, because everything runs locally, the extraction works even after you disconnect from the internet. The result is <strong className="text-foreground">fast conversion</strong> that scales with your device's capability rather than being bottlenecked by server load or network speed.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — FEATURES OF PIXOCRAFT VIDEO AUDIO EXTRACTOR */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Features of Pixocraft Video Audio Extractor</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need to extract audio from video — privately, instantly, and for free.
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
                Pixocraft's video audio extractor supports nearly all common video containers — no format checking needed.
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
              All formats are processed entirely in your browser using FFmpeg WebAssembly. Drop any supported video onto the extractor above — format detection is automatic and no conversion step is needed before extraction.
            </p>
          </div>
        </section>

        {/* SECTION 8 — WHY MP3 IS THE BEST AUDIO FORMAT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why MP3 Is the Best Audio Format for Extracted Video Audio
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> makes MP3 the default choice for any video audio extractor. Every operating system, media player, smartphone, car stereo, smart speaker, and streaming service supports MP3 natively — with no additional codecs, plugins, or software required. An MP3 file works on every device, everywhere, without any compatibility issues.
              </p>
              <p>
                <strong className="text-foreground">Efficient compression</strong> is MP3's defining technical strength. The format uses psychoacoustic modelling to discard audio frequencies that human hearing cannot detect at a given loudness level, producing files that are dramatically smaller than uncompressed audio while preserving near-identical perceived quality. At 192 kbps, an hour of audio occupies under 90 MB — a fraction of the original video size.
              </p>
              <p>
                MP3 is <strong className="text-foreground">perfect for music and podcasts</strong>. At 256 or 320 kbps, extracted music retains full fidelity for all but the most critical listening environments. For speech content — lectures, podcasts, and interviews — 128 kbps is transparent and compact. Whatever you extract with this <strong className="text-foreground">video sound extractor</strong>, MP3 provides the right quality tier at the right file size.
              </p>
              <p>
                <strong className="text-foreground">Easy sharing</strong> completes the case for MP3. The format attaches directly to emails, uploads to cloud storage without compatibility barriers, and transfers to any device over Bluetooth, USB, or AirDrop without conversion. Podcast platforms, music libraries, and audio editors all accept MP3 as a first-class input — making it the natural output format for any extracted video audio.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about Pixocraft's video audio extractor.</p>
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
