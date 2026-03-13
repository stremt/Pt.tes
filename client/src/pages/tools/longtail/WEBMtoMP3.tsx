import { VideoToMP3Page, FormatConfig } from "./VideoToMP3Page";

const config: FormatConfig = {
  format: "WEBM",
  formatLabel: "WEBM and other video formats",
  accept: "video/*,.webm",
  slug: "webm-to-mp3",
  title: "WEBM to MP3 Converter",
  metaTitle: "WEBM to MP3 Converter — Free Online & No Upload | Pixocraft Tools",
  metaDescription: "Convert WEBM to MP3 free online. Extract audio from WEBM videos instantly in your browser. No uploads, no limits, 100% private and secure.",
  keywords: "webm to mp3 converter, convert webm to mp3, webm to mp3 online free, extract audio from webm, webm audio extractor, webm to mp3 free",
  canonicalUrl: "https://tools.pixocraft.in/tools/webm-to-mp3",
  h1: "WEBM to MP3 Converter — Free Online Audio Extractor",
  subheading: "Convert WEBM videos to MP3 audio instantly in your browser.\nNo uploads. No registration needed. 100% private.",
  faqs: [
    {
      question: "How do I convert WEBM to MP3 online?",
      answer: "Upload your WEBM video file using the converter above, select your preferred bitrate between 128 and 320 kbps, click Convert, and download the MP3. Everything runs inside your browser — no server upload is required. The conversion is free, unlimited, and takes only a few seconds for most WEBM files.",
    },
    {
      question: "What is a WEBM file and why convert it to MP3?",
      answer: "WEBM is an open-source video format developed by Google, commonly used for web videos and screen recordings. Converting WEBM to MP3 extracts the audio track, giving you a smaller file that is easier to share, store, and play on any audio device or media player without needing video playback support.",
    },
    {
      question: "Is this WEBM to MP3 converter free?",
      answer: "Yes, completely free. There are no fees, no subscription plans, no watermarks on output files, and no registration required. You can convert as many WEBM videos as you like without any daily or monthly restrictions. Pixocraft's converter is built to be a permanently free resource for everyone.",
    },
    {
      question: "Is my WEBM file secure during conversion?",
      answer: "Yes. Your WEBM file never leaves your device. All conversion happens locally in your browser using WebAssembly-compiled FFmpeg. No file is ever uploaded to any server, and no one else can access your content. This browser-based approach provides maximum privacy and security by design.",
    },
    {
      question: "Which bitrate is best for WEBM to MP3 conversion?",
      answer: "Choose 320 kbps for the highest quality music audio, 256 kbps for high-fidelity listening, 192 kbps for a balanced mix of quality and file size, and 128 kbps for voice recordings and podcasts where file size is a priority. Note that output quality is bounded by the quality of the source WEBM audio track.",
    },
  ],
};

export default function WEBMtoMP3() {
  return <VideoToMP3Page config={config} />;
}
