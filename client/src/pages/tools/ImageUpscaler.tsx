import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
import { Maximize2, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function ImageUpscaler() {
  const [file, setFile] = useState<File | null>(null);
  const [upscaledBlob, setUpscaledBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [scale, setScale] = useState(2);
  const [upscaling, setUpscaling] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Image Upscaler Online - Increase Image Resolution | Pixocraft Tools",
    description: "Upscale images online for free. Increase image resolution and size. Simple upscaling algorithm. Fast, secure, works offline in your browser.",
    keywords: "image upscaler, increase image resolution free, upscale image online, enlarge image, image enhancer",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-upscaler",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile?.type.startsWith('image/')) {
      setFile(selectedFile);
      setUpscaledBlob(null);
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(selectedFile);
    } else {
      toast({ title: "Invalid File", description: "Please select an image file", variant: "destructive" });
    }
  };

  const upscale = () => {
    if (!file || !preview) return;
    setUpscaling(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            setUpscaledBlob(blob);
            toast({ title: "Success!", description: `Image upscaled ${scale}x` });
          }
          setUpscaling(false);
        }, 'image/png');
      }
    };
    img.src = preview;
  };

  const download = () => {
    if (upscaledBlob) {
      const url = URL.createObjectURL(upscaledBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.[^.]+$/, `-${scale}x.png`) || "upscaled.png";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      <StructuredData data={generateFAQSchema([{question: "How does image upscaling work?", answer: "The tool increases image resolution by multiplying pixel dimensions using high-quality smoothing. While this simple method doesn't add real detail like AI upscalers, it's useful for enlarging images for print or display."}])} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Image Tools", url: "/tools/image" }, { label: "ImageUpscaler" }]} />
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Image Tools", url: "/tools/image" }, { label: "ImageUpscaler" }]} />
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / Image Upscaler
          </div>
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Maximize2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Image Upscaler</h1>
            <p className="text-xl text-muted-foreground">Increase image resolution</p>
            <div className="flex gap-2 justify-center"><Badge>Free</Badge><Badge>Offline</Badge></div>
          </div>
          <div className="max-w-4xl mx-auto">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload Image</CardTitle></CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>Click to upload image</p>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{file.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setUpscaledBlob(null); setPreview(""); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {preview && <img src={preview} alt="Preview" className="w-full rounded-lg" />}
                  <div><Label>Scale: {scale}x</Label><Slider value={[scale]} onValueChange={(v) => setScale(v[0])} min={2} max={4} step={1} /></div>
                  <div className="flex gap-2">
                    <Button onClick={upscale} disabled={upscaling} className="flex-1">{upscaling ? "Upscaling..." : `Upscale ${scale}x`}</Button>
                    {upscaledBlob && (
                      <Button onClick={download} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Category Footer */}
            <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
              Category: <Link href="/tools/image" className="text-primary hover:text-primary/80 transition-colors">Image Tools</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
