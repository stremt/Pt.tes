import { VideoToMP3Page, FormatConfig } from "./VideoToMP3Page";

const config: FormatConfig = {
  format: "MKV",
  formatLabel: "MKV (Matroska) and other video formats",
  accept: "video/*,.mkv",
  slug: "mkv-to-mp3",
  title: "MKV to MP3 Converter",
  metaTitle: "MKV to MP3 Converter — Free, Browser-Based & Private | Pixocraft Tools",
  metaDescription: "Convert MKV to MP3 free online. Extract audio from MKV Matroska video files instantly in your browser with no uploads and complete privacy.",
  keywords: "mkv to mp3 converter, convert mkv to mp3, mkv to mp3 online free, extract audio from mkv, mkv audio extractor, matroska to mp3",
  canonicalUrl: "https://tools.pixocraft.in/tools/mkv-to-mp3",
  h1: "MKV to MP3 Converter — Free & Browser-Based",
  subheading: "Extract audio from MKV Matroska videos directly in your browser.\nNo file uploads. No registration. 100% secure and private.",
  faqs: [
    {
      question: "How do I convert MKV to MP3 online for free?",
      answer: "Simply upload your MKV file using the converter above, select your preferred bitrate (128 to 320 kbps), click Convert, and then click Download to save your MP3. The conversion runs entirely in your browser — no server upload is needed. There are no fees, no account required, and no limits on the number of files you can convert.",
    },
    {
      question: "Can this tool handle large MKV files?",
      answer: "Yes. Because the conversion happens locally in your browser using WebAssembly, there are no server-side file size restrictions. The practical limit depends on your device's available memory. Most modern computers and smartphones can handle MKV files of several gigabytes without any issues.",
    },
    {
      question: "Is it safe to convert MKV files using this online tool?",
      answer: "Completely safe. Your MKV file is never transmitted to any external server. All processing happens locally inside your browser using FFmpeg compiled to WebAssembly. No third party — including Pixocraft — ever sees or stores your file content. Privacy is fully guaranteed by design.",
    },
    {
      question: "Does MKV to MP3 conversion reduce audio quality?",
      answer: "It depends on the bitrate you choose. Selecting 320 kbps preserves the highest possible audio quality from the source MKV. 256 kbps is excellent for music. 192 kbps is a good balanced choice. Note that the output quality also depends on the quality of the audio track in the original MKV file.",
    },
    {
      question: "Does this tool work without an internet connection?",
      answer: "After the page is fully loaded, the converter works completely offline. No internet connection is needed for the actual MKV to MP3 conversion process. This makes it ideal for users in areas with limited connectivity or for anyone who prefers to work entirely offline without relying on cloud services.",
    },
  ],
};

export default function MKVtoMP3() {
  return <VideoToMP3Page config={config} />;
}
