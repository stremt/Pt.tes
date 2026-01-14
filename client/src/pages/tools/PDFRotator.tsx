import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RotateCw, Upload, Download, Zap, Lock, Shield, FileText, X } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { PDFDocument, degrees } from "pdf-lib";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

export default function PDFRotator() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [rotating, setRotating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "PDF Rotator Online | Rotate PDF Pages 90°, 180°, 270° Free | Pixocraft Tools",
    description: "Rotate all PDF pages in any direction instantly. Offline, secure & fast.",
    keywords: "rotate pdf pages, pdf rotator online, rotate pdf 90 degrees, pdf page rotation, flip pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-rotator",
  });

  const handleFileSelect = useCallback(async (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
      playErrorSound();
      return;
    }

    setFile(selectedFile);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setPageCount(pdf.getPageCount());
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to load PDF",
        variant: "destructive",
      });
      playErrorSound();
    }
  }, [toast]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const selectedFile = e.dataTransfer.files?.[0];
    if (selectedFile) handleFileSelect(selectedFile);
  }, [handleFileSelect]);

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const selectedFile = e.clipboardData?.files?.[0];
      if (selectedFile && selectedFile.type === "application/pdf") {
        handleFileSelect(selectedFile);
        toast({
          title: "File Pasted",
          description: `Pasted ${selectedFile.name}`,
        });
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFileSelect, toast]);

  const rotatePDF = async (angle: number) => {
    if (!file) return;

    setRotating(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();

      pages.forEach((page) => {
        page.setRotation(degrees(angle));
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'rotated.pdf';
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: `PDF rotated ${angle}° clockwise`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to rotate PDF",
        variant: "destructive",
      });
    } finally {
      setRotating(false);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I rotate specific pages only?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Currently rotates all pages together."
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
            <Link href="/tools/pdf" className="hover:text-foreground">PDF Tools</Link>
            {" / "}
            <span className="text-foreground">PDF Rotator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <RotateCw className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">PDF Rotator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Rotate PDF pages 90°, 180°, or 270° instantly. Fully offline & secure
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Any Angle</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Rotate PDF</CardTitle>
                <CardDescription>
                  Upload a PDF and choose rotation angle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!file ? (
                  <div
                    className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
                      isDragging 
                        ? "border-primary bg-primary/5 scale-[1.01] shadow-lg" 
                        : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/30"
                    }`}
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    data-testid="dropzone-upload"
                  >
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <Upload className={`h-10 w-10 transition-transform duration-200 ${isDragging ? "scale-110 text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Drop PDF here</h3>
                    <p className="text-muted-foreground mb-6">or click to browse from your device</p>
                    <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Shield className="h-4 w-4" />
                        <span>Private & Offline</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium text-primary/80">
                        <span className="px-1.5 py-0.5 rounded border border-primary/20 bg-primary/5 text-[10px] uppercase tracking-wider">Tip</span>
                        <span>Paste with Ctrl+V</span>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={onFileChange}
                      className="hidden"
                      data-testid="input-file"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-10 w-10 rounded bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="h-6 w-6 text-destructive" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {pageCount} page{pageCount !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={() => {
                          setFile(null);
                          setPageCount(0);
                        }}
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        data-testid="button-reset"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-3">
                      <p className="text-sm font-medium">Select Rotation</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button
                          onClick={() => rotatePDF(90)}
                          disabled={rotating}
                          variant="outline"
                          className="h-24"
                          data-testid="button-rotate-90"
                        >
                          <div className="text-center">
                            <RotateCw className="h-6 w-6 mx-auto mb-2" />
                            <div className="text-sm">90° Clockwise</div>
                          </div>
                        </Button>

                        <Button
                          onClick={() => rotatePDF(270)}
                          disabled={rotating}
                          variant="outline"
                          className="h-24"
                          data-testid="button-rotate-270"
                        >
                          <div className="text-center">
                            <RotateCw className="h-6 w-6 mx-auto mb-2 transform -scale-x-100" />
                            <div className="text-sm">90° Counter</div>
                          </div>
                        </Button>

                        <Button
                          onClick={() => rotatePDF(180)}
                          disabled={rotating}
                          variant="outline"
                          className="h-24 col-span-2"
                          data-testid="button-rotate-180"
                        >
                          <div className="text-center">
                            <RotateCw className="h-6 w-6 mx-auto mb-2" />
                            <div className="text-sm">180° Flip</div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Use PDF Rotator?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Instant Rotation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Rotate PDFs in seconds without any uploads or delays
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
                      All processing happens offline in your browser
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
                    <CardTitle className="text-lg">Can I rotate specific pages only?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Currently, the tool rotates all pages together. You can use our PDF Splitter to extract specific pages first, then rotate them.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does rotation reduce quality?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      No! Rotation is a lossless operation. The quality of your PDF remains exactly the same.
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
