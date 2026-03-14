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
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BadgeCheck,
  Globe,
  Cpu,
  Lock,
  Layers,
  ListVideo,
} from "lucide-react";

const PAGE_FAQS = [
  {
    question: "Can I convert multiple videos to MP3 at once?",
    answer: "Yes. Pixocraft's batch video to MP3 converter lets you drag multiple video files onto the upload area or select several files at once using the file picker. The converter processes each file in sequence using the local WebAssembly FFmpeg engine. Every file gets its own progress bar and individual download button, and all completed MP3 files can be downloaded together as a ZIP archive. There are no batch limits — you can queue as many video files as your device's memory supports.",
  },
  {
    question: "Is Pixocraft batch converter free?",
    answer: "Yes, completely and permanently free. Pixocraft's batch video to MP3 converter has no per-file charges, no conversion caps, no subscription tiers, and no restrictions on the number of files you can process in a single session. All bitrate options from 128 kbps to 320 kbps are available for every file in the batch without cost. The tool is free because conversion runs on your own device — Pixocraft incurs no server processing costs per conversion, so there is nothing to recover through paid tiers.",
  },
  {
    question: "Are my videos uploaded anywhere?",
    answer: "No. None of your video files are uploaded anywhere at any point. Pixocraft's batch converter reads each file directly from your local device using the browser's File API, which operates without any network access. The WebAssembly FFmpeg engine processes every file in the batch entirely within your browser's memory. No file from the batch is transmitted to any server, no temporary cloud storage is used, and no upload traffic is generated — for any file in the queue, regardless of batch size.",
  },
  {
    question: "How many videos can I convert at once?",
    answer: "There is no fixed limit imposed by Pixocraft on the number of videos you can batch convert. The practical limit is determined by your device's available memory and processing capability. Modern desktop and laptop computers can comfortably handle large batches of standard video files. For very large batches or especially large individual files on mobile devices or older hardware, processing files in smaller groups frees up memory between conversions. All batch conversions run locally, so performance scales with your hardware rather than a server queue.",
  },
  {
    question: "What MP3 quality should I choose?",
    answer: "For batch converting music videos, concerts, or audio-rich produced content, choose 256 kbps or 320 kbps for the highest fidelity across the whole batch. For batches of spoken content such as lecture recordings, webinars, interviews, or podcast raw footage, 128 kbps delivers clear audio at minimal file size — ideal when processing large quantities of voice files. The 192 kbps default is an excellent all-purpose choice for mixed batches containing both music and speech, balancing quality and file size well for every file in the batch.",
  },
];

const HOW_TO_STEPS = [
  { step: "01", title: "Select multiple video files", description: "Drag several video files at once onto the upload area, or use the file picker to select multiple files from your device. All files are read locally — no upload, no server, no network transfer." },
  { step: "02", title: "Choose MP3 bitrate", description: "Select output quality once — it applies to every file in the batch. All options from 128 kbps to 320 kbps are available with no restrictions for any file in the queue." },
  { step: "03", title: "Convert the entire batch", description: "Click Convert. WebAssembly FFmpeg processes each video in sequence on your device. Each file gets its own progress bar so you can track the full batch in real time." },
  { step: "04", title: "Download all MP3 files", description: "Download each MP3 individually as it completes, or wait for the entire batch and download all files together as a single ZIP archive — all locally, with no server involved." },
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
  { icon: ListVideo, title: "Multiple File Support", description: "Drop an entire folder of videos at once or select multiple files via the picker. Mixed formats are fully supported — MP4, MKV, MOV, AVI, and others can all be in the same batch." },
  { icon: Repeat, title: "Unlimited Conversions", description: "No caps on batch size, no daily quotas, no per-file charges. Convert as many videos as you need in a single session, with no restrictions of any kind on usage." },
  { icon: Lock, title: "Private Local Processing", description: "Every file in the batch is processed locally inside your browser using WebAssembly FFmpeg. No file from any batch is uploaded to any server at any stage of conversion." },
  { icon: Music, title: "High-Quality MP3 Extraction", description: "Choose from four bitrate options up to 320 kbps, applied uniformly across the entire batch. All quality tiers are available for every file without restriction or cost." },
  { icon: Zap, title: "Fast Batch Processing", description: "No upload overhead means batch processing starts immediately. Each file is converted at your device's full CPU speed with no server queue and no network latency between files." },
  { icon: BadgeCheck, title: "ZIP Download for Batches", description: "When the batch completes, download all MP3 files together as a single ZIP archive with one click — or download each file individually as it finishes if preferred." },
];

const RELATED_TOOLS = [
  { label: "Video to MP3 Converter", href: "/tools/video-to-mp3-converter", icon: Music },
  { label: "Free Video to MP3 Converter", href: "/tools/free-video-to-mp3-converter", icon: Music },
  { label: "Browser Video to MP3 Converter", href: "/tools/browser-video-to-mp3-converter", icon: Globe },
  { label: "Offline Video to MP3 Converter", href: "/tools/offline-video-to-mp3-converter", icon: WifiOff },
  { label: "Extract Audio From Video", href: "/tools/extract-audio-from-video", icon: FileAudio },
];

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Media Tools", item: "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", position: 4, name: "Batch Video to MP3 Converter", item: "https://tools.pixocraft.in/tools/batch-video-to-mp3-converter" },
  ],
});

export default function BatchVideoToMP3Converter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Batch Video to MP3 Converter (Convert Multiple Videos) | Pixocraft Tools",
    description: "Convert multiple videos to MP3 instantly using Pixocraft's batch video converter. Extract audio from many video files at once with no uploads and complete privacy.",
    keywords: "batch video to mp3 converter, multiple video to mp3 converter, bulk video to mp3 converter, convert multiple videos to mp3, batch mp3 extractor, video to mp3 converter multiple files",
    canonicalUrl: "https://tools.pixocraft.in/tools/batch-video-to-mp3-converter",
    ogImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=630&fit=crop",
  });

  return (
    <>
      <StructuredData data={generateFAQSchema(PAGE_FAQS)} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Batch Video to MP3 Converter — Convert Multiple Videos Instantly",
        description: "Browser-based batch video to MP3 converter powered by WebAssembly FFmpeg. Convert multiple MP4, AVI, MOV, MKV, WEBM, FLV, MPEG, M4V, 3GP and WMV files to MP3 simultaneously with no uploads, complete privacy, and unlimited batch size. Supports bitrates up to 320 kbps.",
        url: "https://tools.pixocraft.in/tools/batch-video-to-mp3-converter",
        applicationCategory: "MultimediaApplication",
      })} />
      <StructuredData data={generateHowToSchema({
        name: "How to Batch Convert Multiple Videos to MP3",
        description: "Convert a batch of video files to MP3 in 4 steps using Pixocraft's browser-based batch converter — no uploads, no server, no limits on number of files.",
        steps: HOW_TO_STEPS.map(s => ({ name: s.title, text: s.description })),
      })} />

      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 max-w-6xl py-6">
          <Breadcrumb items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Media Tools", url: "/tools/media" },
            { label: "Batch Video to MP3 Converter" },
          ]} />
        </div>

        {/* SECTION 1 — HERO */}
        <section className="container mx-auto px-4 max-w-6xl pb-10 text-center">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <ListVideo className="h-8 w-8 text-primary" aria-label="batch video to mp3 converter" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Batch Video to MP3 Converter —<br className="hidden sm:block" /> Convert Multiple Videos Instantly
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Convert multiple video files to MP3 audio at once using Pixocraft's batch video to MP3 converter. Process several videos simultaneously directly in your browser without uploads.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            <Badge variant="secondary" data-testid="badge-batch">
              <ListVideo className="h-3 w-3 mr-1" />Convert multiple videos at once
            </Badge>
            <Badge variant="secondary" data-testid="badge-no-upload">
              <WifiOff className="h-3 w-3 mr-1" />No uploads required
            </Badge>
            <Badge variant="secondary" data-testid="badge-private">
              <Lock className="h-3 w-3 mr-1" />Private browser conversion
            </Badge>
            <Badge variant="secondary" data-testid="badge-formats">
              <Layers className="h-3 w-3 mr-1" />Supports many video formats
            </Badge>
            <Badge variant="secondary" data-testid="badge-unlimited">
              <Repeat className="h-3 w-3 mr-1" />Unlimited conversions
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            No registration. No software installation. No file size limits. ZIP download for entire batches.
          </p>
        </section>

        {/* SECTION 2 — TOOL INTERFACE */}
        <section id="converter" className="container mx-auto px-4 max-w-3xl pb-16">
          <VideoToMP3Converter title="Batch Video to MP3 Converter" />
        </section>

        {/* SECTION 3 — WHAT IS A BATCH VIDEO TO MP3 CONVERTER */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              What Is a Batch Video to MP3 Converter?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                A <strong className="text-foreground">batch video to MP3 converter</strong> is a tool that allows you to process multiple video files in a single operation — extracting the audio from each video and encoding it as an MP3 file — rather than converting one file at a time. Instead of repeating the same steps for every individual video in a collection, you select all the files you want to convert, configure the output quality once, and let the converter work through the entire queue automatically.
              </p>
              <p>
                <strong className="text-foreground">Batch conversion allows multiple videos to be processed together</strong>, which fundamentally changes the economics of working with large video libraries. Whether you have five files or fifty, the workflow is the same: select all, set bitrate, convert. The converter handles the sequencing, progress tracking, and output organisation for every file in the batch, presenting each completed MP3 with its own download option as conversions finish.
              </p>
              <p>
                <strong className="text-foreground">Saving time when extracting audio from many files</strong> is the core benefit for professionals and power users. Video editors extracting audio stems from footage archives, music producers pulling tracks from video recordings, students converting lecture series to portable MP3 files, and podcasters processing raw video interview footage all benefit from the ability to queue the entire collection and convert it in one operation rather than manually repeating the process file by file.
              </p>
              <p>
                The tool is <strong className="text-foreground">useful for creators, editors, and students</strong> who regularly work with video content and need the audio in a portable, universally playable format. Pixocraft's batch converter handles the entire queue locally inside your browser using WebAssembly FFmpeg — so the process is not just efficient but also completely private, with no files uploaded to any external server at any stage of the batch operation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4 — WHY BATCH VIDEO CONVERSION IS USEFUL */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Why Convert Multiple Videos to MP3 at Once?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Four steps — queue the batch, set quality, convert, download all.
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
                <strong className="text-foreground">Faster workflow</strong> is the most immediate benefit of batch conversion. When working with a collection of videos — a lecture series, a set of recorded interviews, a music video archive — processing them one at a time requires repeating the same selection, configuration, conversion, and download steps for every single file. A <strong className="text-foreground">bulk video to mp3 converter</strong> compresses all of that into a single workflow: select all files, click Convert once, and download all results when the batch completes.
              </p>
              <p>
                <strong className="text-foreground">Efficient processing</strong> is built into the queue-based architecture. Pixocraft's batch converter processes files in sequence using the local WebAssembly FFmpeg engine — each conversion starts immediately as the previous one completes, with no idle time between files. You do not need to monitor the process or manually trigger each conversion. The queue runs automatically from start to finish.
              </p>
              <p>
                Batch conversion is <strong className="text-foreground">ideal for large video libraries</strong>. A content creator with dozens of recorded sessions, a researcher with a catalogue of interview footage, or a student with a full semester of lecture recordings can convert their entire collection in a single browser session. The <strong className="text-foreground">convert multiple videos to mp3</strong> workflow removes the bottleneck that makes large-scale audio extraction impractical when using single-file tools.
              </p>
              <p>
                <strong className="text-foreground">Reducing repetitive work</strong> has direct productivity value. Every manual repetition of the same conversion workflow is time that could be spent on the actual work — editing, analysis, listening, publishing. Batch conversion eliminates this overhead entirely, making even large conversion jobs a one-time task rather than an ongoing chore.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5 — HOW PIXOCRAFT HANDLES MULTIPLE CONVERSIONS */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              How Pixocraft Converts Multiple Videos at Once
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                Pixocraft's <strong className="text-foreground">batch mp3 extractor</strong> uses a <strong className="text-foreground">queue-based processing</strong> model powered by WebAssembly FFmpeg. When you select multiple files and click Convert, the converter builds an internal queue of every file you have selected. It then processes each entry in the queue sequentially — reading the file locally, running the FFmpeg conversion pipeline, and making the output MP3 available for download — before automatically moving to the next file in the queue. This continues until every file in the batch has been processed.
              </p>
              <p>
                The <strong className="text-foreground">browser-based FFmpeg engine</strong> at the core of this system is WebAssembly FFmpeg — a complete build of the FFmpeg multimedia framework compiled to run natively inside your browser without any server infrastructure. FFmpeg is the industry-standard open-source multimedia processing library used by virtually every major video platform and application. The WebAssembly build delivers FFmpeg's full codec library and processing capabilities to your browser tab, enabling it to handle any of the ten supported video formats in the queue with complete codec compatibility.
              </p>
              <p>
                <strong className="text-foreground">Local device processing</strong> means the entire batch runs on your own hardware. No file from any position in the queue is transmitted to a server. No cloud compute is involved at any stage. Your device's CPU processes each conversion independently, at full speed, without competing with other users for resources. The result is a batch converter that is not only faster than server-based alternatives but also inherently private — your entire video library remains on your device throughout the batch operation.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6 — FEATURES */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Features of Pixocraft Batch Video to MP3 Converter</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Everything you need to process large video collections quickly, privately, and for free.
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
                All formats below are supported in batch — mix different formats in the same queue freely.
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
              Pixocraft's <strong className="text-foreground">video to mp3 converter multiple files</strong> tool supports all ten major video containers through FFmpeg's full codec library — and critically, you can mix formats freely within a single batch. An MP4 file, an MKV file, and a MOV file can all be in the same queue and will each be processed correctly. MP4 covers modern camera and streaming content. MOV and M4V handle Apple video. MKV and WEBM serve open-source distributions. AVI and WMV cover Windows-native content. FLV handles legacy web video, MPEG handles broadcast media, and 3GP covers mobile recordings.
            </p>
          </div>
        </section>

        {/* SECTION 8 — BENEFITS OF MP3 FORMAT */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Benefits of the MP3 Audio Format
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
              <p>
                <strong className="text-foreground">Universal compatibility</strong> makes MP3 the definitive output for any <strong className="text-foreground">batch video to mp3 converter</strong>. Every operating system, every media player, every smartphone, every car audio system, every smart speaker, and every major podcast and music platform supports MP3 natively — without additional codecs, plugins, or conversion steps. An entire batch of locally converted MP3 files plays everywhere, on any device, immediately after the batch completes.
              </p>
              <p>
                <strong className="text-foreground">Smaller file sizes</strong> are especially valuable when processing video batches. A collection of video files occupying tens or hundreds of gigabytes can be converted to MP3 at 192 kbps and reduce to a fraction of its original footprint — individual files shrinking by over 90% in most cases. A batch of twenty one-hour lecture recordings that occupied 40 GB as video files might produce an MP3 archive of under 1.5 GB, which fits easily on any portable storage device or cloud plan.
              </p>
              <p>
                MP3 is <strong className="text-foreground">perfect for music and podcasts</strong> and equally suited to the range of content that batch conversion users typically process. At 256 or 320 kbps, a batch of music videos yields transparent-quality audio files for any playback system. At 128 kbps, a batch of lecture recordings produces compact, clearly intelligible files ideal for mobile listening during commutes or exercise. For <strong className="text-foreground">easy sharing</strong>, MP3 is accepted natively by every podcast platform, music library, cloud storage service, and file sharing app — making the output of any batch conversion immediately usable everywhere.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 9 — FAQ */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about Pixocraft's batch video to MP3 converter.</p>
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
