import { VideoToMP3Page, FormatConfig } from "./VideoToMP3Page";

const config: FormatConfig = {
  format: "AVI",
  formatLabel: "AVI and other video formats",
  accept: "video/*,.avi",
  slug: "avi-to-mp3",
  title: "AVI to MP3 Converter",
  metaTitle: "AVI to MP3 Converter — Free, Fast & Private | Pixocraft Tools",
  metaDescription: "Convert AVI to MP3 instantly in your browser. Free online AVI to MP3 converter — no uploads, no registration, 100% private. Extract audio from AVI videos in seconds.",
  keywords: "avi to mp3 converter, convert avi to mp3, avi to mp3 online free, extract audio from avi, avi audio extractor, avi to mp3 free",
  canonicalUrl: "https://tools.pixocraft.in/tools/avi-to-mp3",
  h1: "AVI to MP3 Converter — Free, Fast & Online",
  subheading: "Extract audio from AVI video files instantly in your browser.\nNo uploads. No registration. 100% private and secure.",
  faqs: [
    {
      question: "How do I convert AVI to MP3 for free?",
      answer: "Upload your AVI file using the converter above, select your preferred audio bitrate (128 to 320 kbps), click Convert, and download the MP3. The entire process runs inside your browser with no file uploads required. It is completely free with no account or registration needed and no limits on how many files you convert.",
    },
    {
      question: "Is this AVI to MP3 converter safe to use?",
      answer: "Yes, completely safe. Your AVI file is never uploaded to any external server. All audio extraction happens locally in your browser using WebAssembly-powered FFmpeg. This means no third party ever has access to your video files. Your data remains entirely on your device from start to finish.",
    },
    {
      question: "What bitrate should I choose when converting AVI to MP3?",
      answer: "For music or high-quality audio, choose 256 kbps or 320 kbps. For voice recordings, interviews, or podcasts, 128 kbps is sufficient and produces much smaller files. 192 kbps is a good all-around choice for mixed content. Higher bitrates sound better but create larger MP3 files.",
    },
    {
      question: "Does this AVI to MP3 converter work on mobile?",
      answer: "Yes. The converter is fully responsive and works on Android and iOS mobile browsers, as well as tablets and desktop computers. No app download is required. Simply open the page in your mobile browser, upload your AVI file, and download the converted MP3 directly to your device.",
    },
    {
      question: "Can I convert AVI files without installing any software?",
      answer: "Yes. This is a 100% browser-based AVI to MP3 converter. There is nothing to install or download. The conversion runs entirely within your web browser using modern WebAssembly technology. It works on Chrome, Firefox, Safari, and Edge without any plugins or extensions.",
    },
  ],
};

export default function AVItoMP3() {
  return <VideoToMP3Page config={config} />;
}
