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
import { compressGIF, formatFileSize } from "@/lib/ffmpeg-client";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Media Tools", "item": "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", "position": 4, "name": "GIF Compressor", "item": "https://tools.pixocraft.in/tools/gif-compressor" }
  ]
});

export default function GIFCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [width, setWidth] = useState(480);
  const [fps, setFps] = useState(10);
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free GIF Compressor Online - Reduce GIF File Size | Pixocraft Tools",
    description: "Compress GIF files online for free. Reduce GIF size while maintaining quality. Fast, secure, works offline in your browser.",
    keywords: "gif compressor, compress gif online free, reduce gif size, gif optimizer, shrink gif file",
    canonicalUrl: "https://tools.pixocraft.in/tools/gif-compressor",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type === 'image/gif') {
      setFile(selectedFile);
      setCompressedBlob(null);
    } else {
      toast({ title: "Invalid File", description: "Please select a GIF file", variant: "destructive" });
    }
  };

  const compress = async () => {
    if (!file) return;
    setCompressing(true);
    try {
      const result = await compressGIF(file, { width, fps });
      setCompressedBlob(result);
      toast({ title: "Success!", description: `GIF compressed by ${Math.round((1 - result.size / file.size) * 100)}%` });
    } catch (error) {
      toast({ title: "Error", description: "Failed to compress GIF", variant: "destructive" });
    } finally {
      setCompressing(false);
    }
  };

  const download = () => {
    if (compressedBlob) {
      const url = URL.createObjectURL(compressedBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace('.gif', '-compressed.gif') || "compressed.gif";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <StructuredData data={generateFAQSchema([{question: "How does GIF compression work?", answer: "The tool reduces GIF file size by optimizing frame rate and dimensions while maintaining visual quality. All processing happens in your browser."}])} />
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Media Tools", url: "/tools/media" }, { label: "GIF Compressor" }]} />
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Film className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">GIF Compressor</h1>
            <p className="text-xl text-muted-foreground">Reduce GIF file size</p>
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
                    <CardTitle>{file.name} ({formatFileSize(file.size)})</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setCompressedBlob(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div><Label>Width: {width}px</Label><Slider value={[width]} onValueChange={(v) => setWidth(v[0])} min={240} max={720} step={120} /></div>
                  <div><Label>FPS: {fps}</Label><Slider value={[fps]} onValueChange={(v) => setFps(v[0])} min={5} max={20} step={5} /></div>
                  <div className="flex gap-2">
                    <Button onClick={compress} disabled={compressing} className="flex-1">{compressing ? "Compressing..." : "Compress GIF"}</Button>
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
