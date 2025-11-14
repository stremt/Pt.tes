import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Image as ImageIcon, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function PNGtoJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [quality, setQuality] = useState(90);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free PNG to JPG Converter Online - Convert PNG to JPEG | Pixocraft Tools",
    description: "Convert PNG to JPG format online for free. Transform PNG images to JPEG with quality control. Fast, secure, works offline in your browser.",
    keywords: "png to jpg converter, png to jpeg, convert png to jpg free, image converter, png jpg converter online",
    canonicalUrl: "https://tools.pixocraft.in/tools/png-to-jpg",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.match(/image\/png/)) {
      toast({ title: "Invalid File", description: "Please select a PNG file", variant: "destructive" });
      return;
    }

    setFile(selectedFile);
    setConvertedBlob(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const convertToJPG = () => {
    if (!file || !preview) return;
    setConverting(true);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            setConvertedBlob(blob);
            toast({ title: "Success!", description: "PNG converted to JPG successfully" });
          }
          setConverting(false);
        }, 'image/jpeg', quality / 100);
      }
    };
    img.src = preview;
  };

  const downloadJPG = () => {
    if (convertedBlob) {
      const url = URL.createObjectURL(convertedBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.png$/i, '.jpg') || "converted.jpg";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Why convert PNG to JPG?",
      answer: "JPG files are typically much smaller than PNG files, making them better for web use, email attachments, and storage. JPG is ideal for photos and images without transparency."
    },
    {
      question: "What happens to PNG transparency?",
      answer: "Since JPG doesn't support transparency, transparent areas in your PNG will be converted to white background. The converter automatically fills transparent pixels with white before conversion."
    },
    {
      question: "Is my image data secure?",
      answer: "Yes! All conversion happens in your browser. Your images never leave your device, ensuring complete privacy."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/">Home</Link> / <Link href="/tools">Tools</Link> / PNG to JPG
          </div>
          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">PNG to JPG Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Convert PNG images to JPG format with quality control</p>
            <div className="flex gap-2 justify-center">
              <Badge>Free</Badge>
              <Badge>Offline</Badge>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            {!file ? (
              <Card>
                <CardHeader><CardTitle>Upload PNG File</CardTitle></CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p>Click to upload PNG file</p>
                    <input ref={fileInputRef} type="file" accept="image/png" onChange={handleFileSelect} className="hidden" />
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
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Quality</Label>
                      <span className="text-sm text-muted-foreground">{quality}%</span>
                    </div>
                    <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={50} max={100} step={5} />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={convertToJPG} disabled={converting} className="flex-1">
                      {converting ? "Converting..." : "Convert to JPG"}
                    </Button>
                    {convertedBlob && (
                      <Button onClick={downloadJPG} variant="outline" className="flex-1">
                        <Download className="mr-2 h-4 w-4" />Download JPG
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
