import { VideoToMP3Page, FormatConfig } from "./VideoToMP3Page";

const config: FormatConfig = {
  format: "MOV",
  formatLabel: "MOV (QuickTime) and other video formats",
  accept: "video/*,.mov",
  slug: "mov-to-mp3",
  title: "MOV to MP3 Converter",
  metaTitle: "MOV to MP3 Converter — Free Online & No Upload | Pixocraft Tools",
  metaDescription: "Convert MOV to MP3 free online. Extract audio from QuickTime MOV videos instantly in your browser. No uploads, no sign-up, 100% private.",
  keywords: "mov to mp3 converter, convert mov to mp3, mov to mp3 online free, extract audio from mov, quicktime to mp3, mov audio extractor",
  canonicalUrl: "https://tools.pixocraft.in/tools/mov-to-mp3",
  h1: "MOV to MP3 Converter — Free Online Audio Extractor",
  subheading: "Convert QuickTime MOV videos to MP3 audio instantly in your browser.\nNo uploads. No account needed. Completely private.",
  whatIsFormat: {
    heading: "What is the MOV Format?",
    paragraphs: [
      "MOV is Apple's <strong class=\"text-foreground\">QuickTime Movie format</strong>, introduced in 1991 as the native video container for Apple's QuickTime multimedia framework. It is one of the foundational video formats of the digital video era and remains the default recording format for iPhones, iPads, and Mac computers.",
      "Like MP4, MOV is a <strong class=\"text-foreground\">container format</strong> — meaning it holds multiple tracks of video, audio, effects, and metadata within a single file. MOV files commonly use H.264 or H.265 (HEVC) video codecs and AAC audio, though they can also store ProRes, Apple Intermediate Codec, and other professional formats used in video production workflows.",
      "MOV files are widely used in <strong class=\"text-foreground\">professional video editing</strong>. Applications like Final Cut Pro, Adobe Premiere, and DaVinci Resolve all have excellent MOV support. The format also supports <strong class=\"text-foreground\">advanced metadata</strong>, chapter markers, timecodes, and multiple audio tracks — making it a powerful choice for production environments.",
      "While MOV is primarily an Apple format, it has excellent cross-platform support. Windows, Linux, and Android devices can all play MOV files using modern media players. The format is commonly encountered when receiving video files from iPhone users, Mac-based video editors, or professional camera operators.",
    ],
  },
  whyConvert: {
    heading: "Why Convert MOV to MP3?",
    paragraphs: [
      "MOV files recorded on iPhones and other Apple devices are often large and contain both video and audio data. If you only need the audio — for example, a voice memo recorded as a video, a FaceTime recording, or audio from a filmed event — <strong class=\"text-foreground\">converting MOV to MP3</strong> gives you a compact audio file that is far easier to manage.",
      "<strong class=\"text-foreground\">iPhone video recordings</strong> are a particularly common source of MOV files that people want to convert to MP3. A 10-minute iPhone video can be 500 MB or more, while the extracted MP3 audio at 128 kbps would be under 10 MB. For content that is purely audio — interviews, lectures, field recordings — the space savings are dramatic.",
      "<strong class=\"text-foreground\">Music and performance recordings</strong> captured on Apple devices are another common use case. MOV video of a concert, rehearsal, or live performance can be converted to MP3 and added to a music library for portable listening. This workflow is common among musicians and event documentarians.",
      "<strong class=\"text-foreground\">Podcast and podcast-adjacent content</strong> is frequently captured on iPhones as MOV video. Converting these recordings to MP3 is the standard first step before importing into a podcast editing application like GarageBand, Audacity, or Adobe Audition.",
    ],
  },
  faqs: [
    {
      question: "How do I convert a MOV file to MP3 online?",
      answer: "Upload your MOV video file to the converter above, choose your desired audio quality (128 to 320 kbps), click Convert, and download the resulting MP3 file. The conversion runs completely in your browser — no file is ever sent to a server. The process typically takes just a few seconds for most MOV files.",
    },
    {
      question: "Does this tool work with Apple QuickTime MOV files?",
      answer: "Yes. MOV is Apple's QuickTime video format and this converter fully supports it. Whether the MOV was recorded on an iPhone, iPad, or Mac, you can upload it directly and extract the audio as MP3. The conversion is handled by browser-based FFmpeg which has excellent support for QuickTime formats.",
    },
    {
      question: "Is my MOV file kept private?",
      answer: "Absolutely. Your MOV file is never uploaded to any server. All processing occurs locally within your browser using WebAssembly. No one else can access your file — not even Pixocraft. This makes our converter one of the safest ways to extract audio from MOV files online.",
    },
    {
      question: "What audio quality options are available?",
      answer: "You can choose from four bitrate options: 128 kbps for speech and podcasts, 192 kbps for balanced quality, 256 kbps for high-fidelity music, and 320 kbps for maximum audiophile-grade audio. The higher the bitrate, the better the audio quality and the larger the resulting file size.",
    },
    {
      question: "Is this MOV to MP3 converter free to use?",
      answer: "Yes, completely free. There are no paid tiers, no watermarks, no daily limits, and no registration required. You can convert as many MOV files as you need without any restrictions. Pixocraft's tool is designed to be an always-free resource for everyone who needs to extract audio from video.",
    },
  ],
};

export default function MOVtoMP3() {
  return <VideoToMP3Page config={config} />;
}
