import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { Film, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { convertGIFToMP4, formatFileSize } from "@/lib/ffmpeg-client";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Media Tools", "item": "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", "position": 4, "name": "GIF to MP4", "item": "https://tools.pixocraft.in/tools/gif-to-mp4" }
  ]
});

export default function GIFtoMP4() {
  const [file, setFile] = useState<File | null>(null);
  const [mp4Blob, setMp4Blob] = useState<Blob | null>(null);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free GIF to MP4 Converter Online - Convert GIF to Video | Pixocraft Tools",
    description: "Convert GIF to MP4 video format online for free. Transform animated GIFs to MP4 videos instantly. Fast, secure, works offline in your browser.",
    keywords: "gif to mp4 converter, gif to video, convert gif to mp4 free, animated gif to video, gif converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/gif-to-mp4",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type === 'image/gif') {
      setFile(selectedFile);
      setMp4Blob(null);
    } else {
      toast({ title: "Invalid File", description: "Please select a GIF file", variant: "destructive" });
    }
  };

  const convert = async () => {
    if (!file) return;
    setConverting(true);
    try {
      const result = await convertGIFToMP4(file);
      setMp4Blob(result);
      toast({ title: "Success!", description: "GIF converted to MP4" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to convert GIF", variant: "destructive" });
    } finally {
      setConverting(false);
    }
  };

  const download = () => {
    if (mp4Blob) {
      const url = URL.createObjectURL(mp4Blob);
      const link = document.createElement("a");
      link.download = file?.name.replace('.gif', '.mp4') || "output.mp4";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <StructuredData data={generateFAQSchema([{question: "Why convert GIF to MP4?", answer: "MP4 videos are typically much smaller than GIFs while offering better quality and compatibility across devices and platforms. MP4 is also better supported for web use and social media."}])} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Media Tools", url: "/tools/media" }, { label: "GIF to MP4" }]} />
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / <Link href="/tools/media">Media Tools</Link> / GIF to MP4
          </div>
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Film className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">GIF to MP4 Converter</h1>
            <p className="text-xl text-muted-foreground">Convert animated GIFs to MP4 video</p>
            <div className="flex gap-2 justify-center"><Badge>Free</Badge><Badge>Offline</Badge></div>
          </div>
          <div className="max-w-4xl mx-auto">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload GIF</CardTitle></CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>Click to upload GIF</p>
                    <input ref={fileInputRef} type="file" accept="image/gif" onChange={handleFileSelect} className="hidden" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{file.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setMp4Blob(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={convert} disabled={converting} className="flex-1">{converting ? "Converting..." : "Convert to MP4"}</Button>
                    {mp4Blob && (
                      <Button onClick={download} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download MP4 ({formatFileSize(mp4Blob.size)})
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
