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
  Headphones,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Volume2,
} from "lucide-react";

const PAGE_FAQS = [
  {
    question: "How do I extract sound from a video?",
    answer: "Drop your video file onto the upload area above, or click to browse for a file. Select your preferred MP3 bitrate — from 128 kbps up to 320 kbps — then click Convert. Pixocraft's FFmpeg WebAssembly engine processes your video entirely inside your browser with no upload required. Once conversion is complete, click Download to save the extracted MP3 sound file to your device. No account, no software installation needed.",
  },
  {
    question: "Is this video sound extractor free?",
    answer: "Yes, completely free with no restrictions whatsoever. Pixocraft's video sound extractor has no hidden charges, no premium tiers, no watermarks on output files, and no registration required. You can extract sound from video as many times as you need — there are no daily conversion limits and no file size restrictions. Pixocraft is committed to keeping all tools permanently free for everyone.",
  },
  {
    question: "Can I extract sound from multiple videos?",
    answer: "Yes. Pixocraft supports batch sound extraction — upload multiple video files at once by dragging several files onto the upload area or selecting multiple files via the file picker. Each video is processed sequentially in your browser, gets its own download button, and can all be downloaded together as a ZIP archive in one click. Ideal for bulk extraction with no limits.",
  },
  {
    question: "Is my video file secure during conversion?",
    answer: "Absolutely. Pixocraft never transmits your video to any server. All sound extraction happens locally inside your browser using WebAssembly-based FFmpeg. Your file never leaves your device — there is no third party involved, no remote storage, and no logging of any kind. This makes Pixocraft one of the most secure video sound extractors available online.",
  },
  {
    question: "What audio quality should I choose?",
    answer: "For music, concerts, or rich audio content, select 256 kbps or 320 kbps for the best fidelity. For lectures, podcasts, interviews, and voice recordings where compact file size matters more, 128 kbps is clear and very small. 192 kbps is the recommended default — it strikes an excellent balance between audio quality and file size for most video sound extraction use cases.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV." },
  { step: "02", title: "Select audio quality", description: "Choose your preferred bitrate from 128 kbps (compact speech) to 320 kbps (maximum fidelity music). Higher bitrates produce better quality at larger file sizes." },
  { step: "03", title: "Click Convert", description: "Hit Convert. FFmpeg WebAssembly runs entirely inside your browser — no upload, no server, no active internet connection required during extraction." },
  { step: "04", title: "Download the extracted MP3 file", description: "When conversion finishes, click Download to save your extracted MP3 sound file instantly to your device." },
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
  { icon: Shield, title: "Privacy-First Conversion", description: "Your video files never leave your device. All sound extraction runs locally in your browser — no server receives your data, nothing is stored or logged at any point." },
  { icon: Repeat, title: "Batch Extraction", description: "Extract sound from multiple videos in one session. No daily limits, no file count caps, no watermarks — fully unlimited batch processing with per-file download buttons." },
  { icon: Star, title: "Multi-Format Compatibility", description: "MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, and WMV are all fully supported — every major video container handled automatically by the FFmpeg engine." },
  { icon: Music, title: "High-Quality MP3 Output", description: "Export extracted sound at up to 320 kbps for audiophile-grade quality. Per-file bitrate selection lets you choose the perfect quality level for each individual video." },
  { icon: Zap, title: "Instant Processing", description: "Conversion runs on your own device with no upload latency, no server queues, and no download round trips. Sound extraction completes in seconds on any modern device." },
  { icon: WifiOff, title: "Works Offline", description: "Once the page loads, you can disconnect from the internet entirely — sound extraction continues without interruption. Perfect for travel and low-connectivity environments." },
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
    { "@type": "ListItem", position: 5, name: "Extract Sound From Video", item: "https://tools.pixocraft.in/tools/extract-sound-from-video" },
  ],
});

export default function ExtractSoundFromVideo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Extract Sound From Video (Free Online Tool) | Pixocraft Tools",
    description: "Extract sound from video instantly using Pixocraft's free video sound extractor. Convert video files to MP3 securely in your browser with no uploads required.",
    keywords: "extract sound from video, extract audio from video, video sound extractor, get sound from video, convert video to audio, video to mp3 converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/extract-sound-from-video",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Extract Sound From Video — Free Video Sound Extractor",
        description: "Free browser-based video sound extractor. Extract sound from MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV as MP3 instantly with no uploads, no registration, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/extract-sound-from-video",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Extract Sound From a Video",
        description: "Extract MP3 sound from any video file in 4 simple steps using Pixocraft's free browser-based video sound extractor.",
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
            { label: "Extract Sound From Video" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Volume2 className="h-8 w-8 text-primary" aria-label="extract sound from video" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Extract Sound From Video —<br className="hidden sm:block" /> Free Online Tool
          </h1>
          <p className="text-xs text-muted-foreground mb-4">Part of the Pixocraft MP4 to MP3 Converter Tool Suite</p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Extract sound from any video instantly using Pixocraft's browser-based video sound extractor. Convert video files into high-quality MP3 audio without uploading anything.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-formats">
              <CheckCircle className="h-3 w-3 mr-1" />Extract sound from any video format
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
          <VideoToMP3Converter title="Video Sound Extractor" />
        </section>

        {/* SECTION 3 — WHAT DOES EXTRACT SOUND FROM VIDEO MEAN */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Does It Mean to Extract Sound From a Video?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Every video file is a container that bundles two entirely separate streams of data: a <strong className="text-foreground">visual stream</strong> and a <strong className="text-foreground">sound stream</strong>. The visual stream holds the sequence of image frames you see when the video plays. The sound stream carries all the audio — music, speech, narration, ambient noise, or any combination. These two streams are encoded independently and packaged together inside container formats such as MP4, AVI, MOV, MKV, WEBM, and others.
              </p>
              <p>
                When you <strong className="text-foreground">extract sound from a video</strong>, you are isolating the sound stream from the container and saving it as a standalone audio file, while discarding the visual frames entirely. The result is an MP3 file that contains only the sound from your original video — with no video track attached and no unnecessary data from the image frames.
              </p>
              <p>
                Pixocraft performs this sound extraction using <strong className="text-foreground">FFmpeg WebAssembly</strong> — a browser-compiled build of FFmpeg, the world's most trusted open-source multimedia framework. The extraction command reads your video container, locates the audio stream, strips the video track using the <code>-vn</code> flag, and encodes the audio as MP3 at your chosen bitrate. The entire process runs locally on your device, inside your browser tab, with no network transfer at any stage.
              </p>
              <p>
                The quality of the sound you extract depends on two factors: the audio quality present in your source video, and the MP3 bitrate you select. At <strong className="text-foreground">320 kbps</strong>, the extracted sound preserves the full fidelity of the original audio track as faithfully as the MP3 format allows — ideal for music extraction and high-quality archiving. At 128 kbps, the file is smaller but the sound remains clear and intelligible for speech-based content. This flexibility makes Pixocraft's <strong className="text-foreground">video sound extractor</strong> suitable for everything from music archiving to lecture recording.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY PEOPLE EXTRACT SOUND FROM VIDEOS */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why Extract Sound From Video Files?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Extracting music from video clips</strong> is the most common reason people use a video sound extractor. Concert recordings, music videos, live performances, acoustic sessions, and DJ sets are frequently shared as video files. By extracting the sound track as MP3, fans can add the music directly to their personal libraries and playlists — listening offline on any device without streaming or carrying large video files.
              </p>
              <p>
                <strong className="text-foreground">Saving lectures as audio</strong> is equally valuable for students and researchers. Online courses, university lecture recordings, webinars, and conference presentations are commonly delivered as video. Extracting the sound transforms this content into portable, podcast-style audio — perfect for revision while commuting, exercising, or in any situation where watching a screen is inconvenient.
              </p>
              <p>
                <strong className="text-foreground">Converting interviews to podcasts</strong> is a workflow that content creators rely on increasingly. Video podcasts, panel discussions, recorded interviews, and roundtable sessions can all be extracted to audio and published directly to podcast platforms. The resulting MP3 is immediately upload-ready — no re-recording, no studio, no extra steps.
              </p>
              <p>
                <strong className="text-foreground">Reducing storage space</strong> is a practical benefit for anyone managing a video archive. A one-hour 1080p video can occupy several gigabytes of storage, while the equivalent sound as an MP3 at 192 kbps is under 90 MB. For collections of recorded meetings, events, or interviews where the visual component is no longer needed, extracting the sound dramatically reduces storage requirements and makes files far easier to share, back up, and manage.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW THIS VIDEO SOUND EXTRACTOR WORKS */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How Pixocraft Extracts Sound From Video</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four simple steps — fully local, fully private, no uploads needed.
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
                The technical engine behind Pixocraft's <strong className="text-foreground">video sound extractor</strong> is <strong className="text-foreground">FFmpeg WebAssembly</strong> — a browser-compiled build of the FFmpeg multimedia framework. When you click Convert, the WebAssembly module reads your video file directly from your device's memory, identifies the sound stream, discards the video track, and encodes the audio to MP3 at your chosen bitrate. There is <strong className="text-foreground">no server upload</strong> at any point — the entire extraction pipeline runs on your device's own CPU inside your browser tab.
              </p>
              <p>
                This <strong className="text-foreground">browser-based processing</strong> approach eliminates the three biggest pain points of traditional online converters: upload time, server queue latency, and privacy risk. Because your file never leaves your device, there is no upload — a 500 MB video that might take several minutes to upload to a server processes locally in well under a minute on a modern device. Because there is no server, there is no queue. And because nothing is transmitted, there is no privacy exposure. The result is <strong className="text-foreground">fast local conversion</strong> that is faster, safer, and more reliable than any upload-based alternative.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — FEATURES OF PIXOCRAFT SOUND EXTRACTOR */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Features of Pixocraft Video Sound Extractor</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need to extract sound from video — privately, instantly, and completely free.
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
                Pixocraft's video sound extractor supports nearly all common video containers — no format checking required.
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
              All formats are processed entirely in your browser using FFmpeg WebAssembly — no upload required. Drop any supported video onto the extractor above and sound extraction begins automatically.
            </p>
          </div>
        </section>

        {/* SECTION 8 — WHY MP3 IS THE BEST AUDIO FORMAT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why MP3 Is the Best Format for Extracted Video Sound
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> makes MP3 the natural output format for any video sound extractor. It is supported natively by every operating system, media player, smartphone, car stereo, smart speaker, and streaming service — with no additional codecs, plugins, or software required. An MP3 file extracted from your video works on every device, everywhere, without any compatibility barriers.
              </p>
              <p>
                <strong className="text-foreground">Efficient compression</strong> is MP3's defining technical strength. The format uses psychoacoustic modelling to discard audio data that human hearing cannot perceive at a given volume, producing files that are dramatically smaller than uncompressed audio while maintaining near-identical perceived quality. At 192 kbps, one hour of extracted sound occupies under 90 MB — a fraction of the original video file.
              </p>
              <p>
                MP3 is <strong className="text-foreground">perfect for music and podcasts</strong>. At 256 kbps or 320 kbps, extracted music sounds transparent and full-fidelity on any headphones or speakers. For voice content — lectures, podcasts, and interviews — 128 kbps is clear and highly compact. Whatever you need from this <strong className="text-foreground">video sound extractor</strong>, MP3 delivers the right quality at the right file size.
              </p>
              <p>
                <strong className="text-foreground">Easy sharing</strong> completes the case for MP3 as the output format. MP3 files attach to emails without compatibility concerns, upload instantly to cloud storage services, sync to music libraries like iTunes or Spotify, and play in any browser-based audio player. Podcast platforms and audio editors accept MP3 as a first-class format — making it the friction-free choice for extracted video sound.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about extracting sound from video files.</p>
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
