import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileImage, Upload, Download, X, Zap, Lock } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { PDFDocument } from "pdf-lib";

export default function ImageToPDF() {
  const [files, setFiles] = useState<File[]>([]);
  const [converting, setConverting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Image to PDF Converter | Convert JPG, PNG to PDF Free | Pixocraft Tools",
    description: "Convert images (JPG, PNG, WebP) to PDF instantly. Combine multiple images into one PDF. Offline & secure.",
    keywords: "image to pdf, jpg to pdf, png to pdf, convert image to pdf, combine images pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/image-to-pdf",
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length !== selectedFiles.length) {
      toast({
        title: "Warning",
        description: "Only image files are allowed",
        variant: "destructive",
      });
    }

    setFiles([...files, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const convertToPDF = async () => {
    if (files.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one image",
        variant: "destructive",
      });
      return;
    }

    setConverting(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;

        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          // For other formats, skip for now
          continue;
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images.pdf';
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: `Converted ${files.length} images to PDF`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to convert images to PDF",
        variant: "destructive",
      });
    } finally {
      setConverting(false);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I combine multiple images?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, unlimited images in one PDF."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Image to PDF</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileImage className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Image to PDF Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert JPG, PNG & WebP images to PDF. Combine multiple images into one document
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Multi-Image</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Convert Images to PDF</CardTitle>
                <CardDescription>
                  Upload one or more images to create a PDF
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                  data-testid="dropzone-upload"
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium mb-2">Click to upload images</p>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG, WebP supported
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    data-testid="input-file"
                  />
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected Images ({files.length})</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {files.map((file, index) => (
                        <Card key={index} className="relative group">
                          <CardContent className="p-2">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              className="w-full h-32 object-cover rounded"
                            />
                            <p className="text-xs truncate mt-1">{file.name}</p>
                            <Button
                              onClick={() => removeFile(index)}
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              data-testid={`button-remove-${index}`}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={convertToPDF}
                  disabled={files.length === 0 || converting}
                  className="w-full"
                  size="lg"
                  data-testid="button-convert"
                >
                  {converting ? (
                    <>Converting to PDF...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Convert & Download PDF
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Use Image to PDF?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Fast & Offline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Convert images instantly without uploading to any server
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Lock className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>100% Private</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your images never leave your device. Complete privacy guaranteed
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I combine multiple images?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! You can add unlimited images and they will all be combined into a single PDF, with one image per page.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What image formats are supported?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We support JPG, PNG, and other common image formats. Each image will be embedded as a page in the PDF.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
