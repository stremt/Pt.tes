import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Image as ImageIcon, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function JPGtoPNG() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "JPG to PNG Converter - Convert JPEG to PNG Online Free",
    description: "Convert JPG to PNG instantly online for free. Add transparency, preserve quality. Works offline in your browser. No servers, no data uploads.",
    keywords: "jpg to png converter, jpeg to png, convert jpg to png free, image converter, jpg png converter online, image format converter, transparent png",
    canonicalUrl: "https://tools.pixocraft.in/tools/jpg-to-png",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.match(/image\/(jpeg|jpg)/)) {
      toast({ title: "Invalid File", description: "Please select a JPG file", variant: "destructive" });
      return;
    }

    setFile(selectedFile);
    setConvertedBlob(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const convertToPNG = () => {
    if (!file || !preview) return;
    setConverting(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setConvertedBlob(blob);
            toast({ title: "Success!", description: "JPG converted to PNG successfully" });
          }
          setConverting(false);
        }, 'image/png');
      }
    };
    img.src = preview;
  };

  const downloadPNG = () => {
    if (convertedBlob) {
      const url = URL.createObjectURL(convertedBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.(jpg|jpeg)$/i, '.png') || "converted.png";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "What's the difference between JPG and PNG?",
      answer: "JPG uses lossy compression (smaller files, quality loss). PNG uses lossless compression (larger files, no quality loss, supports transparency). PNG is better for graphics, logos, and when transparency is needed."
    },
    {
      question: "Will converting JPG to PNG improve quality?",
      answer: "No. JPG has already applied lossy compression, so converting to PNG won't restore lost details. However, PNG is useful when you need transparency or plan to edit the image further."
    },
    {
      question: "When should I convert JPG to PNG?",
      answer: "Convert to PNG when you need: transparency for backgrounds, graphics/logos with clean edges, lossless quality for editing, or professional design work. JPG is better for photos and web optimization."
    },
    {
      question: "Will the file size increase?",
      answer: "Yes, PNG files are typically 2-3x larger than JPG. This is because PNG uses lossless compression. Use JPG for photos, PNG for graphics with transparency."
    },
    {
      question: "Is my image data secure?",
      answer: "Yes. All conversion happens in your browser. Your images never leave your device, ensuring complete privacy."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / JPG to PNG
          </div>
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Convert JPG to PNG—Restore Quality with Transparency Support</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Convert JPG images to PNG format instantly</p>
            <div className="flex gap-2 justify-center">
              <Badge>Free</Badge>
              <Badge>Offline</Badge>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload JPG File</CardTitle></CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>Click to upload JPG file</p>
                    <input ref={fileInputRef} type="file" accept="image/jpeg,image/jpg" onChange={handleFileSelect} className="hidden" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{file.name}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => { setFile(null); setConvertedBlob(null); setPreview(""); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {preview && <img src={preview} alt="Preview" className="w-full rounded-lg" />}
                  <div className="flex gap-2">
                    <Button onClick={convertToPNG} disabled={converting} className="flex-1">
                      {converting ? "Converting..." : "Convert to PNG"}
                    </Button>
                    {convertedBlob && (
                      <Button onClick={downloadPNG} variant="outline" className="flex-1">
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
