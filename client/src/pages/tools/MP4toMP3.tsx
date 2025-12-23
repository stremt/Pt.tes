import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { Music, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { convertMP4ToMP3, formatFileSize } from "@/lib/ffmpeg-client";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Media Tools", "item": "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", "position": 4, "name": "MP4 to MP3", "item": "https://tools.pixocraft.in/tools/mp4-to-mp3" }
  ]
});

export default function MP4toMP3() {
  const [file, setFile] = useState<File | null>(null);
  const [mp3Blob, setMp3Blob] = useState<Blob | null>(null);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free MP4 to MP3 Converter Online - Extract Audio from Video | Pixocraft Tools",
    description: "Convert MP4 to MP3 online for free. Extract audio from videos instantly. Fast, secure, works offline in your browser.",
    keywords: "mp4 to mp3 converter, video to audio, extract audio from video free, mp4 audio extractor, video to mp3",
    canonicalUrl: "https://tools.pixocraft.in/tools/mp4-to-mp3",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type.startsWith('video/')) {
      setFile(selectedFile);
      setMp3Blob(null);
    } else {
      toast({ title: "Invalid File", description: "Please select a video file", variant: "destructive" });
    }
  };

  const convert = async () => {
    if (!file) return;
    setConverting(true);
    try {
      const result = await convertMP4ToMP3(file);
      setMp3Blob(result);
      toast({ title: "Success!", description: "Audio extracted to MP3" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to extract audio", variant: "destructive" });
    } finally {
      setConverting(false);
    }
  };

  const download = () => {
    if (mp3Blob) {
      const url = URL.createObjectURL(mp3Blob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.[^.]+$/, '.mp3') || "audio.mp3";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <StructuredData data={generateFAQSchema([{question: "How do I extract audio from MP4?", answer: "Upload your MP4 video file, click Convert to MP3, and download the extracted audio. The tool extracts the audio track and converts it to high-quality MP3 format."}])} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Media Tools", url: "/tools/media" }, { label: "MP4 to MP3" }]} />
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / <Link href="/tools/media">Media Tools</Link> / MP4 to MP3
          </div>
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Music className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">MP4 to MP3 Converter</h1>
            <p className="text-xl text-muted-foreground">Extract audio from video files</p>
            <div className="flex gap-2 justify-center"><Badge>Free</Badge><Badge>Offline</Badge></div>
          </div>
          <div className="max-w-4xl mx-auto">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload Video</CardTitle></CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>Click to upload video</p>
                    <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{file.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setMp3Blob(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={convert} disabled={converting} className="flex-1">{converting ? "Extracting Audio..." : "Extract Audio to MP3"}</Button>
                    {mp3Blob && (
                      <Button onClick={download} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download MP3 ({formatFileSize(mp3Blob.size)})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/media" className="text-primary hover:text-primary/80 transition-colors">Media Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
