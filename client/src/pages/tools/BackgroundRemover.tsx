import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Scissors, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function BackgroundRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free Background Remover Online - Remove Image Background | Pixocraft Tools",
    description: "Remove background from images online for free. Simple chroma key background removal tool. Works offline in your browser, completely private.",
    keywords: "remove background, background remover, remove image background free, transparent background, bg remover online",
    canonicalUrl: "https://tools.pixocraft.in/tools/background-remover",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith('image/')) {
      toast({ title: "Invalid File", description: "Please select an image file", variant: "destructive" });
      return;
    }

    setFile(selectedFile);
    setProcessedBlob(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const removeBackground = () => {
    if (!file || !preview) return;
    setProcessing(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Simple chroma key for white/light backgrounds (basic implementation)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // If pixel is close to white/light, make it transparent
          if (r > 200 && g > 200 && b > 200) {
            data[i + 3] = 0; // Set alpha to transparent
          }
        }

        ctx.putImageData(imageData, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setProcessedBlob(blob);
            const url = URL.createObjectURL(blob);
            setPreview(url);
            toast({ title: "Success!", description: "Background removed (simple chroma key applied)" });
          }
          setProcessing(false);
        }, 'image/png');
      }
    };
    img.src = preview;
  };

  const downloadProcessed = () => {
    if (processedBlob) {
      const url = URL.createObjectURL(processedBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.(jpg|jpeg|png)$/i, '-nobg.png') || "nobg.png";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "How does background removal work?",
      answer: "This tool uses a simple chroma key technique to remove light/white backgrounds from images. It works best on images with solid light backgrounds and clear subject separation. For complex backgrounds, professional tools with AI may be needed."
    },
    {
      question: "What types of backgrounds can be removed?",
      answer: "This tool works best with solid white or very light backgrounds. Images with complex, multi-colored backgrounds may not process correctly. For best results, use images with high contrast between subject and background."
    },
    {
      question: "Is my image data secure?",
      answer: "Yes! All processing happens entirely in your browser. Your images never leave your device, ensuring complete privacy."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / Background Remover
          </div>
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <Scissors className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Background Remover</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Remove backgrounds from images with light/white backgrounds</p>
            <div className="flex gap-2 justify-center">
              <Badge>Free</Badge>
              <Badge>Offline</Badge>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload Image</CardTitle><CardDescription>Best results with light backgrounds</CardDescription></CardHeader>
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
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setProcessedBlob(null); setPreview(""); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {preview && (
                    <div className="bg-[repeating-linear-gradient(45deg,#ccc_0,#ccc_10px,#fff_10px,#fff_20px)] rounded-lg p-4">
                      <img src={preview} alt="Preview" className="w-full rounded-lg" />
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button onClick={removeBackground} disabled={processing} className="flex-1">
                      {processing ? "Processing..." : "Remove Background"}
                    </Button>
                    {processedBlob && (
                      <Button onClick={downloadProcessed} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download PNG
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
}
