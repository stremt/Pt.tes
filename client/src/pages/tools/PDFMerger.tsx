import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileStack, Upload, Download, X, Zap, Lock } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { PDFDocument } from "pdf-lib";

export default function PDFMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "PDF Merger Online | Combine PDF Files Offline & Free | Pixocraft Tools",
    description: "Merge multiple PDFs into one document instantly. Fully offline — secure & private.",
    keywords: "merge pdf, pdf joiner, combine pdf online free, offline pdf merge, pdf combiner",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-merger",
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const pdfFiles = selectedFiles.filter(file => file.type === 'application/pdf');
    
    if (pdfFiles.length !== selectedFiles.length) {
      toast({
        title: "Warning",
        description: "Only PDF files are allowed",
        variant: "destructive",
      });
    }

    setFiles([...files, ...pdfFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast({
        title: "Error",
        description: "Please select at least 2 PDF files to merge",
        variant: "destructive",
      });
      return;
    }

    setMerging(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "PDFs merged successfully",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to merge PDFs",
        variant: "destructive",
      });
    } finally {
      setMerging(false);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do my PDFs upload to server?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Never. Merging is offline only."
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
            <span className="text-foreground">PDF Merger</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileStack className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">PDF Merger</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Merge multiple PDFs into one document. Fully offline & secure
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Secure</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Merge PDF Files</CardTitle>
                <CardDescription>
                  Upload 2 or more PDF files to merge them into one
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                  data-testid="dropzone-upload"
                >
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="font-medium mb-2">Click to upload PDF files</p>
                  <p className="text-sm text-muted-foreground">
                    Select multiple PDF files to merge
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    data-testid="input-file"
                  />
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected Files ({files.length})</p>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardContent className="flex justify-between items-center py-3">
                            <span className="text-sm truncate flex-1">{file.name}</span>
                            <Button
                              onClick={() => removeFile(index)}
                              variant="ghost"
                              size="icon"
                              className="ml-2"
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
                  onClick={mergePDFs}
                  disabled={files.length < 2 || merging}
                  className="w-full"
                  size="lg"
                  data-testid="button-merge"
                >
                  {merging ? (
                    <>Merging PDFs...</>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Merge & Download PDF
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Use PDF Merger?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Fast & Offline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      All processing happens in your browser. No uploads, no waiting.
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
                      Your PDFs never leave your device. Complete privacy guaranteed.
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
                    <CardTitle className="text-lg">Do my PDFs upload to a server?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Never! All PDF merging happens completely offline in your browser using pdf-lib. Your files never leave your device.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is there a file size limit?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The limit depends on your browser's available memory. Most modern browsers can handle PDFs up to several hundred MB.
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
