import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { Film, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { compressVideo, formatFileSize } from "@/lib/ffmpeg-client";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Media Tools", "item": "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", "position": 4, "name": "Video Compressor", "item": "https://tools.pixocraft.in/tools/video-compressor" }
  ]
});

export default function VideoCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [quality, setQuality] = useState(23);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Video Compressor Online - Reduce Video File Size | Pixocraft Tools",
    description: "Compress videos online for free. Reduce MP4 file size while maintaining quality. Fast, secure, works offline in your browser.",
    keywords: "video compressor, compress video online free, reduce video size, video optimizer, shrink video file",
    canonicalUrl: "https://tools.pixocraft.in/tools/video-compressor",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type.startsWith('video/')) {
      setFile(selectedFile);
      setCompressedBlob(null);
    } else {
      toast({ title: "Invalid File", description: "Please select a video file", variant: "destructive" });
    }
  };

  const compress = async () => {
    if (!file) return;
    setCompressing(true);
    setCompressedBlob(null);
    try {
      const result = await compressVideo(file, quality, (progress) => {
        // You could add a progress bar here if needed
        console.log(`Compression progress: ${Math.round(progress.ratio * 100)}%`);
      });
      setCompressedBlob(result);
      toast({ title: "Success!", description: `Video compressed by ${Math.round((1 - result.size / file.size) * 100)}%` });
    } catch (error) {
      console.error("Compression error:", error);
      toast({ title: "Error", description: "Failed to compress video. Try a smaller file or different quality.", variant: "destructive" });
    } finally {
      setCompressing(false);
    }
  };

  const download = () => {
    if (compressedBlob) {
      const url = URL.createObjectURL(compressedBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace('.mp4', '-compressed.mp4') || "compressed.mp4";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <StructuredData data={generateFAQSchema([{question: "How does video compression work?", answer: "The tool reduces video file size by optimizing encoding settings while maintaining visual quality. Lower quality values mean smaller file sizes. All processing happens in your browser."}])} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Media Tools", url: "/tools/media" }, { label: "Video Compressor" }]} />
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Film className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Video Compressor</h1>
            <p className="text-xl text-muted-foreground">Reduce video file size</p>
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
                    <CardTitle>{file.name} ({formatFileSize(file.size)})</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setCompressedBlob(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div><Label>Quality (lower = smaller file): {quality}</Label><Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={18} max={35} step={1} /></div>
                  <div className="flex gap-2">
                    <Button onClick={compress} disabled={compressing} className="flex-1">{compressing ? "Compressing..." : "Compress Video"}</Button>
                    {compressedBlob && (
                      <Button onClick={download} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download ({formatFileSize(compressedBlob.size)})
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
