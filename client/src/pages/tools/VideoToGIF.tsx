import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Film, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { convertVideoToGIF, formatFileSize } from "@/lib/ffmpeg-client";

export default function VideoToGIF() {
  const [file, setFile] = useState<File | null>(null);
  const [gifBlob, setGifBlob] = useState<Blob | null>(null);
  const [progress, setProgress] = useState(0);
  const [fps, setFps] = useState(10);
  const [width, setWidth] = useState(480);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Video to GIF Converter Online - Convert MP4 to GIF | Pixocraft Tools",
    description: "Convert videos to GIF online for free. Transform MP4, MOV videos to animated GIFs instantly. Fast, secure, works offline in your browser.",
    keywords: "video to gif converter, mp4 to gif, convert video to gif free, video gif maker, animated gif converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/video-to-gif",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type.startsWith('video/')) {
      setFile(selectedFile);
      setGifBlob(null);
    } else {
      toast({ title: "Invalid File", description: "Please select a video file", variant: "destructive" });
    }
  };

  const convert = async () => {
    if (!file) return;
    setConverting(true);
    try {
      const result = await convertVideoToGIF(file, { fps, width }, (p) => setProgress(p.ratio));
      setGifBlob(result);
      toast({ title: "Success!", description: "Video converted to GIF" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to convert video", variant: "destructive" });
    } finally {
      setConverting(false);
      setProgress(0);
    }
  };

  const download = () => {
    if (gifBlob) {
      const url = URL.createObjectURL(gifBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.[^.]+$/, '.gif') || "output.gif";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {question: "How does video to GIF conversion work?", answer: "The tool extracts frames from your video and creates an animated GIF. You can control the frame rate (FPS) and size to balance between quality and file size. All processing happens in your browser using WebAssembly."},
    {question: "Is my video data secure?", answer: "Yes! All conversion happens entirely in your browser. Your videos never leave your device, ensuring complete privacy."}
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / Video to GIF
          </div>
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Film className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Video to GIF Converter</h1>
            <p className="text-xl text-muted-foreground">Convert videos to animated GIFs</p>
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
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setGifBlob(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>FPS: {fps}</Label>
                    <Slider value={[fps]} onValueChange={(v) => setFps(v[0])} min={5} max={30} step={5} />
                  </div>
                  <div className="space-y-2">
                    <Label>Width: {width}px</Label>
                    <Slider value={[width]} onValueChange={(v) => setWidth(v[0])} min={240} max={720} step={120} />
                  </div>
                  {converting && <p className="text-sm text-muted-foreground">Progress: {Math.round(progress * 100)}%</p>}
                  <div className="flex gap-2">
                    <Button onClick={convert} disabled={converting} className="flex-1">
                      {converting ? "Converting..." : "Convert to GIF"}
                    </Button>
                    {gifBlob && (
                      <Button onClick={download} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download GIF ({formatFileSize(gifBlob.size)})
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
        </p>
      </div>
    </div>
  );
}

