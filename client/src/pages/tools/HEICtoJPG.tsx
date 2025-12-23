import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Image as ImageIcon, Upload, Download, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import heic2any from "heic2any";

export default function HEICtoJPG() {
  const [file, setFile] = useState<File | null>(null);
  const [convertedBlob, setConvertedBlob] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free HEIC to JPG Converter Online - Convert HEIC to JPEG | Pixocraft Tools",
    description: "Convert HEIC images to JPG/JPEG format online for free. Transform iPhone photos to compatible JPEG instantly. No installation required, works offline in browser.",
    keywords: "heic to jpg converter, heic to jpeg, convert heic online free, iphone photo converter, heic converter, heic to jpg free",
    canonicalUrl: "https://tools.pixocraft.in/tools/heic-to-jpg",
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.match(/\.heic$/i) && !selectedFile.type.includes('heic')) {
      toast({
        title: "Invalid File",
        description: "Please select a HEIC file",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    setConvertedBlob(null);
    setPreview("");
  };

  const convertToJPG = async () => {
    if (!file) return;

    setConverting(true);
    try {
      const result = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.9,
      });

      const blob = Array.isArray(result) ? result[0] : result;
      setConvertedBlob(blob);

      const url = URL.createObjectURL(blob);
      setPreview(url);

      toast({
        title: "Success!",
        description: "HEIC converted to JPG successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to convert HEIC to JPG",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  const downloadJPG = () => {
    if (convertedBlob) {
      const url = URL.createObjectURL(convertedBlob);
      const link = document.createElement("a");
      link.download = file?.name.replace(/\.heic$/i, '.jpg') || "converted.jpg";
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is HEIC format?",
      answer: "HEIC (High Efficiency Image Container) is a modern image format used by Apple devices since iOS 11. It offers better compression than JPG while maintaining image quality, but isn't widely supported outside Apple's ecosystem."
    },
    {
      question: "Why convert HEIC to JPG?",
      answer: "JPG is universally supported across all devices, browsers, and platforms. Converting HEIC to JPG ensures your iPhone photos can be viewed and shared anywhere without compatibility issues."
    },
    {
      question: "Will converting reduce image quality?",
      answer: "Our converter maintains high quality during conversion (90% quality setting). While there may be a slight quality difference, it's generally imperceptible to the human eye. JPG is still excellent for photos and most use cases."
    },
    {
      question: "Is my photo data secure?",
      answer: "Yes! All conversion happens entirely in your browser. Your photos never leave your device, ensuring complete privacy. We don't upload, store, or have any access to your images."
    },
    {
      question: "Can I convert multiple HEIC files at once?",
      answer: "Currently, the tool processes one file at a time. For batch conversion, you can upload and convert files one after another. Each conversion is fast and processed locally in your browser."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link> / <Link href="/tools" className="hover:text-foreground">Tools</Link> / <span className="text-foreground">HEIC to JPG</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <ImageIcon className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">HEIC to JPG Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert iPhone HEIC photos to JPG format. Fast, free, and works offline in your browser.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">High Quality</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload HEIC File</CardTitle>
                  <CardDescription>Select a HEIC image from your iPhone</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate" onClick={() => fileInputRef.current?.click()} data-testid="dropzone-upload">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload HEIC file</p>
                    <p className="text-sm text-muted-foreground">Convert iPhone photos to JPG</p>
                    <input ref={fileInputRef} type="file" accept=".heic,image/heic" onChange={handleFileSelect} className="hidden" data-testid="input-file" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Convert to JPG</CardTitle>
                        <CardDescription>{file.name}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => { setFile(null); setConvertedBlob(null); setPreview(""); if (fileInputRef.current) fileInputRef.current.value = ""; }} data-testid="button-reset">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex gap-2">
                      <Button onClick={convertToJPG} disabled={converting} className="flex-1" size="lg" data-testid="button-convert">
                        {converting ? "Converting..." : "Convert to JPG"}
                      </Button>
                      {convertedBlob && (
                        <Button onClick={downloadJPG} variant="outline" className="flex-1" size="lg" data-testid="button-download">
                          <Download className="mr-2 h-4 w-4" />
                          Download JPG
                        </Button>
                      )}
                    </div>
                    {preview && (
                      <div className="rounded-lg overflow-hidden bg-muted">
                        <img src={preview} alt="Converted" className="w-full h-auto" data-testid="img-preview" />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
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

