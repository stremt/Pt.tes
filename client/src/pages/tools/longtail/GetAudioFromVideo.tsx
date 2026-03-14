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
    question: "How can I get audio from a video file?",
    answer: "Use Pixocraft's free video audio extractor above. Drop your video file onto the upload area, choose your preferred MP3 quality — from 128 kbps up to 320 kbps — then click Convert. FFmpeg WebAssembly processes your file entirely inside your browser with no uploads needed. Once complete, click Download to save the extracted MP3 audio file directly to your device. No account or software installation required.",
  },
  {
    question: "Is this video audio extractor free?",
    answer: "Yes, completely free with no restrictions. Pixocraft's video audio extractor has no hidden fees, no premium plans, no watermarks on output files, and no registration required. You can get audio from video as many times as you need — there are no daily conversion caps and no file size limits. Pixocraft is committed to keeping all tools free for everyone, permanently.",
  },
  {
    question: "Can I extract audio from multiple videos?",
    answer: "Yes. Pixocraft supports batch video processing, letting you upload and convert multiple video files in a single session. Drag and drop several files at once or use the file picker to select multiple videos. Each file is processed sequentially in your browser, gets its own download button, and can all be downloaded together as a ZIP archive with one click — ideal for bulk audio extraction.",
  },
  {
    question: "Is my video file secure during conversion?",
    answer: "Absolutely. Pixocraft never transmits your video to any server. All audio extraction happens locally inside your browser using WebAssembly-based FFmpeg. Your file never leaves your device — there is no third party involved, no remote storage, and no activity logging of any kind. This makes Pixocraft one of the most secure video audio extractors available online today.",
  },
  {
    question: "What MP3 quality should I choose?",
    answer: "For music, concerts, or any audio with rich instrumentation, select 256 kbps or 320 kbps for the best possible quality. For lectures, interviews, podcasts, and voice recordings where file size is more important, 128 kbps is clear and very compact. 192 kbps is the recommended default — it strikes an ideal balance between quality and file size for most video audio extraction use cases.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Upload your video file", description: "Click the upload area or drag and drop any supported video file — MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, or WMV." },
  { step: "02", title: "Select audio quality", description: "Choose your preferred bitrate — from 128 kbps for compact speech recordings up to 320 kbps for maximum-fidelity music extraction." },
  { step: "03", title: "Click Convert", description: "Hit the Convert button. FFmpeg WebAssembly processes your video entirely inside your browser — no upload or active internet connection required." },
  { step: "04", title: "Download the extracted MP3 file", description: "Once done, click Download to save your extracted MP3 audio file directly to your device in seconds." },
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
  { icon: Monitor, title: "Browser-Based Processing", description: "All audio extraction runs directly in your browser tab using WebAssembly technology. No software to install, no plugins, no app downloads required." },
  { icon: Shield, title: "Privacy Protection", description: "Your video files never leave your device. All processing is local — no server receives your data, no file is stored, and nothing is logged." },
  { icon: Zap, title: "Fast Audio Extraction", description: "Conversion runs on your own device's hardware with no upload wait times or server queues. Results arrive in seconds, not minutes." },
  { icon: Star, title: "Multiple Video Format Support", description: "MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP, and WMV are all supported — the full range of major video formats handled automatically." },
  { icon: Repeat, title: "Batch Conversion Support", description: "Extract audio from multiple videos in one session. No daily limits, no file count caps, no watermarks. Fully unlimited batch processing." },
  { icon: WifiOff, title: "Works Offline", description: "Once the page loads, you can disconnect from the internet entirely and still extract audio from any video. Perfect for low-connectivity environments." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/mp4-to-mp3", icon: Music },
  { label: "Extract Audio From Video", href: "/tools/extract-audio-from-video", icon: FileAudio },
  { label: "Convert Video to Audio", href: "/tools/convert-video-to-audio", icon: FileAudio },
  { label: "AVI to MP3 Converter", href: "/tools/avi-to-mp3", icon: FileAudio },
  { label: "MOV to MP3 Converter", href: "/tools/mov-to-mp3", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "Get Audio From Video", item: "https://tools.pixocraft.in/tools/get-audio-from-video" },
  ],
});

export default function GetAudioFromVideo() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Get Audio From Video (Free Online Tool) | Pixocraft Tools",
    description: "Get audio from any video instantly with Pixocraft's free video audio extractor. Convert video files to MP3 securely in your browser with no uploads required.",
    keywords: "get audio from video, extract audio from video, video audio extractor, convert video to audio, extract sound from video, video to mp3 converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/get-audio-from-video",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Get Audio From Video — Free Video Audio Extractor",
        description: "Free browser-based video audio extractor. Get audio from MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV as MP3 instantly with no uploads, no registration, and 100% privacy. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/get-audio-from-video",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Get Audio From a Video",
        description: "Extract MP3 audio from any video file in 4 simple steps using Pixocraft's free browser-based video audio extractor.",
        steps: HOW_TO_STEPS.map(s => ({ name: s.title, text: s.description })),
      })} />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: "Get Audio From Video" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Headphones className="h-8 w-8 text-primary" aria-label="get audio from video" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get Audio From Video —<br className="hidden sm:block" /> Free Online Tool
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Extract audio from any video instantly using Pixocraft's browser-based video audio extractor. Convert video files to high-quality MP3 audio in seconds with complete privacy.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-formats">
              <CheckCircle className="h-3 w-3 mr-1" />Supports all major video formats
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No uploads required
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Star className="h-3 w-3 mr-1" />Unlimited conversions
            </Badge>
            <Badge variant="secondary" data-testid="badge-batch">
              <Repeat className="h-3 w-3 mr-1" />Batch video processing
            </Badge>
            <Badge variant="secondary" data-testid="badge-offline">
              <Zap className="h-3 w-3 mr-1" />Works offline after loading
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

        {/* SECTION 3 — WHAT DOES GET AUDIO FROM VIDEO MEAN */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Does It Mean to Get Audio From a Video?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                A video file is a container format that holds two distinct streams of data simultaneously: a <strong className="text-foreground">visual stream</strong> and an <strong className="text-foreground">audio stream</strong>. The visual stream is made up of sequential image frames — the picture you see when the video plays. The audio stream carries all the sound: music, dialogue, narration, ambient noise, or any combination of these. Both streams are bundled together inside container formats such as MP4, AVI, MOV, MKV, WEBM, and others.
              </p>
              <p>
                When you <strong className="text-foreground">get audio from a video</strong>, you are performing a stream extraction: the audio track is isolated and removed from the container, while the visual frames are discarded. The extracted audio data is then encoded as a standalone audio file. Pixocraft exports this audio as MP3 — the most universally compatible audio format available — at the bitrate you select.
              </p>
              <p>
                Pixocraft uses <strong className="text-foreground">FFmpeg WebAssembly</strong> to carry out this extraction entirely within your browser. FFmpeg is the world's most widely adopted open-source multimedia framework, used by professional video editors, broadcasters, and major streaming platforms. The Pixocraft implementation compiles FFmpeg to WebAssembly, allowing it to run locally in your browser tab without any server involvement. The extraction command strips the video track, configures the output sample rate and channel layout, and encodes the audio at your chosen bitrate.
              </p>
              <p>
                The quality of the audio you get depends primarily on the audio quality present in your source video and the output bitrate you select. At <strong className="text-foreground">320 kbps</strong>, the extracted MP3 preserves the original audio fidelity as faithfully as the MP3 format allows — ideal for music and high-quality recordings. At lower bitrates like 128 kbps, the file size is smaller but the audio remains clear and intelligible for speech-based content. This makes Pixocraft's <strong className="text-foreground">video audio extractor</strong> suitable for every use case from music archiving to lecture recording.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY PEOPLE GET AUDIO FROM VIDEOS */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Why Extract Audio From Videos?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                One of the most popular reasons people want to <strong className="text-foreground">get audio from video</strong> is to <strong className="text-foreground">convert music videos into audio tracks</strong>. Concert recordings, official music videos, live performances, DJ sets, and acoustic sessions are frequently shared as video files. By extracting the audio, fans can add the music directly to their libraries and playlists — listening offline, on the go, without the data overhead of streaming a video.
              </p>
              <p>
                <strong className="text-foreground">Saving lecture recordings</strong> is another high-value use case. Online courses, university lectures, webinars, and conference presentations are typically delivered as video files. Extracting the audio makes this content accessible as a podcast-style recording — ideal for students who want to review material while commuting, exercising, or doing other activities where watching a screen is impractical.
              </p>
              <p>
                <strong className="text-foreground">Extracting podcast audio</strong> from video recordings is increasingly common among content creators. Video podcasts, interview recordings, roundtable discussions, and recorded panel sessions can all be converted to audio with a single click. The resulting MP3 is ready to upload directly to podcast platforms — no re-recording or additional editing required.
              </p>
              <p>
                <strong className="text-foreground">Reducing file size</strong> is a practical benefit for anyone managing large video archives. A single hour of video at 1080p can occupy several gigabytes. The equivalent MP3 audio at 192 kbps is under 90 MB. For collections of recorded meetings, events, or interviews where the visual component is not needed, extracting the audio frees up significant storage space and makes files far easier to share, back up, and archive.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW TO GET AUDIO FROM A VIDEO */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">How to Get Audio From a Video</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four simple steps to extract MP3 audio from any video file — no software needed.
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
              Pixocraft processes all videos locally using <strong className="text-foreground">FFmpeg WebAssembly</strong> — the same powerful multimedia engine trusted by professional broadcasters and developers worldwide. Your video never leaves your browser at any point.
            </p>
          </div>
        </section>

        {/* SECTION 6 — PIXOCRAFT VIDEO AUDIO EXTRACTOR FEATURES */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Use Pixocraft Video Audio Extractor</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Fast, private, and completely free — with no limits and no hidden costs.
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
                The defining advantage of Pixocraft's <strong className="text-foreground">video audio extractor</strong> over every upload-based alternative is complete <strong className="text-foreground">privacy protection</strong>. When you send a video to an external conversion server, you are placing your content in the hands of an unknown third party. Private recordings, business video calls, personal home videos, and copyright-protected content are all at risk the moment they leave your device. Pixocraft's <strong className="text-foreground">browser-based processing</strong> architecture eliminates this risk by design — nothing is ever transmitted.
              </p>
              <p>
                <strong className="text-foreground">Fast audio extraction</strong> is another core strength. Traditional upload converters introduce latency at every stage: uploading the file, waiting in a queue, processing on a shared server, and downloading the result. With Pixocraft, the entire pipeline runs on your own device at full speed. For users who need to process many files, the <strong className="text-foreground">batch conversion support</strong> handles entire collections in one session — with no daily limits, no file count restrictions, and no registration required at any point.
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
                All formats below are fully supported and can be converted to MP3 audio directly in your browser.
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
              All video formats are processed entirely in your browser using FFmpeg WebAssembly — no upload required. Drop any supported video file onto the extractor above and audio extraction begins automatically.
            </p>
          </div>
        </section>

        {/* SECTION 8 — BENEFITS OF MP3 FORMAT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Benefits of MP3 Format for Extracted Audio
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                MP3 offers <strong className="text-foreground">universal compatibility</strong> that no other audio format can match. It is supported natively by every operating system, media player, smartphone, smart speaker, car audio system, and streaming service without requiring any additional codecs, software, or configuration. When you get audio from a video as MP3, you get a file that plays everywhere, immediately, on any device.
              </p>
              <p>
                <strong className="text-foreground">Smaller file sizes</strong> are one of MP3's most practical advantages. A one-hour video recording at 1080p typically occupies two to five gigabytes of storage, while the same audio as an MP3 at 192 kbps is under 90 MB. This difference is significant for mobile storage, email attachments, messaging app sharing, and cloud storage where space and transfer limits apply.
              </p>
              <p>
                MP3 is <strong className="text-foreground">perfect for music and podcasts</strong>. At 256 kbps or 320 kbps, the audio quality is transparent for virtually all listeners in any playback environment. For voice content — lectures, podcasts, meetings, and interviews — 128 kbps provides clear, fully intelligible audio at minimal file size. Whatever you are extracting, MP3 delivers an appropriate quality tier.
              </p>
              <p>
                <strong className="text-foreground">Easy storage and sharing</strong> round out MP3's advantages. The format integrates directly into music libraries, podcast apps, audio editors, and file managers without any conversion step. Sharing via email, messaging apps, or cloud services is straightforward. MP3 is the natural, friction-free output format for any <strong className="text-foreground">video audio extractor</strong> workflow.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about getting audio from video files.</p>
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
              <p className="text-muted-foreground">More free tools from Pixocraft for working with video and audio.</p>
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
