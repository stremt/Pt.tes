import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Upload, Download, Zap, Lock } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { PDFDocument } from "pdf-lib";

export default function PDFSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [ranges, setRanges] = useState("");
  const [splitting, setSplitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "PDF Splitter Online | Extract Pages & Split PDF Free | Pixocraft Tools",
    description: "Split PDF files by page range. Extract specific pages offline. Fully secure & private.",
    keywords: "split pdf, pdf page splitter, extract pdf pages, pdf page extractor, split pdf online free",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-splitter",
  });

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf') {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive",
      });
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
    }
  };

  const parseRanges = (rangesStr: string): number[] => {
    const pages: Set<number> = new Set();
    const parts = rangesStr.split(',');

    for (const part of parts) {
      const range = part.trim();
      if (range.includes('-')) {
        const [start, end] = range.split('-').map(n => parseInt(n.trim()));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end && i <= pageCount; i++) {
            pages.add(i - 1); // Convert to 0-indexed
          }
        }
      } else {
        const page = parseInt(range);
        if (!isNaN(page) && page >= 1 && page <= pageCount) {
          pages.add(page - 1); // Convert to 0-indexed
        }
      }
    }

    return Array.from(pages).sort((a, b) => a - b);
  };

  const splitPDF = async () => {
    if (!file) return;

    const pageIndices = parseRanges(ranges);

    if (pageIndices.length === 0) {
      toast({
        title: "Error",
        description: "Please enter valid page ranges (e.g., 1-3, 5, 7-9)",
        variant: "destructive",
      });
      return;
    }

    setSplitting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(srcPdf, pageIndices);
      copiedPages.forEach((page) => newPdf.addPage(page));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'split.pdf';
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: `Extracted ${pageIndices.length} pages`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to split PDF",
        variant: "destructive",
      });
    } finally {
      setSplitting(false);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I extract specific pages?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, specify page numbers or ranges."
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
            <span className="text-foreground">PDF Splitter</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scissors className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">PDF Splitter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Extract specific pages or split PDF by range. Fully offline & secure
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Page Range</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Split PDF</CardTitle>
                <CardDescription>
                  Upload a PDF and specify which pages to extract
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!file ? (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload PDF file</p>
                    <p className="text-sm text-muted-foreground">
                      Select a PDF file to split
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="input-file"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Card className="bg-muted/50">
                      <CardContent className="py-4">
                        <div className="space-y-2">
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Total pages: {pageCount}
                          </p>
                          <Button
                            onClick={() => {
                              setFile(null);
                              setPageCount(0);
                              setRanges("");
                            }}
                            variant="outline"
                            size="sm"
                            data-testid="button-change-file"
                          >
                            Change File
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="space-y-2">
                      <Label>Page Range</Label>
                      <Input
                        value={ranges}
                        onChange={(e) => setRanges(e.target.value)}
                        placeholder="e.g., 1-3, 5, 7-9"
                        data-testid="input-ranges"
                      />
                      <p className="text-sm text-muted-foreground">
                        Enter page numbers (e.g., 1-3, 5, 7-9) to extract
                      </p>
                    </div>

                    <Button
                      onClick={splitPDF}
                      disabled={!ranges.trim() || splitting}
                      className="w-full"
                      size="lg"
                      data-testid="button-split"
                    >
                      {splitting ? (
                        <>Extracting Pages...</>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Extract & Download Pages
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Why Use PDF Splitter?</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Fast & Offline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Extract pages instantly without uploading to any server
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
                      Your PDF never leaves your device. Complete privacy guaranteed
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
                    <CardTitle className="text-lg">Can I extract specific pages?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! Specify page numbers or ranges (e.g., 1-3, 5, 7-9) to extract exactly the pages you need.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is my PDF secure?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Absolutely! All processing happens offline in your browser. Your PDF never gets uploaded to any server.
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
