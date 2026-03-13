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
