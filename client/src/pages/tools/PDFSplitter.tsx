import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scissors, Upload, Download, Zap, Lock, Users, FileText, Shield, Globe, GraduationCap, Briefcase, Scale, Calculator } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema } from "@/lib/seo";
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
    title: "Split PDF Online Free - Extract Pages Instantly | Pixocraft",
    description: "Split PDF files and extract specific pages for free. 100% offline, no uploads, no sign-up. Works on any device. Trusted by students and professionals in India.",
    keywords: "split pdf, pdf splitter, extract pdf pages, pdf page extractor, split pdf online free, pdf splitter free, extract pages from pdf, split pdf by page range, pdf cutter online",
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
            pages.add(i - 1);
          }
        }
      } else {
        const page = parseInt(range);
        if (!isNaN(page) && page >= 1 && page <= pageCount) {
          pages.add(page - 1);
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

  const faqItems = [
    {
      question: "How do I split a PDF into multiple files?",
      answer: "Upload your PDF, then enter the page ranges you want to extract (for example: 1-5, 8, 10-15). Click the extract button, and your new PDF containing only those pages will download instantly. If you need multiple separate files, repeat the process with different page ranges."
    },
    {
      question: "Can I extract just one page from a PDF?",
      answer: "Absolutely. Simply enter a single page number in the range field (like \"7\") to extract only that page. The tool creates a new PDF containing just your selected page."
    },
    {
      question: "Is this PDF splitter really free?",
      answer: "Yes, completely free with no hidden charges, watermarks, or page limits. Use it as many times as you need for personal or professional work."
    },
    {
      question: "Does my PDF get uploaded to your servers?",
      answer: "No. All processing happens directly in your browser. Your PDF files never leave your device, ensuring complete privacy and security for sensitive documents."
    },
    {
      question: "What's the maximum file size I can split?",
      answer: "The tool handles most standard PDF files efficiently. For extremely large files (100+ MB), processing time depends on your device's memory and browser capabilities."
    },
    {
      question: "Can I use this tool on mobile devices?",
      answer: "Yes. Our PDF splitter works on any modern browser—desktop, laptop, tablet, or smartphone. No app installation required."
    },
    {
      question: "Will the extracted pages maintain original quality?",
      answer: "Yes. The tool preserves the exact quality, formatting, images, and fonts from your original PDF. No compression or quality loss occurs during extraction."
    },
    {
      question: "What page range formats are supported?",
      answer: "You can use individual pages (5, 8, 12), continuous ranges (1-10), or any combination (1-3, 5, 7-10). The tool understands all standard notation."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const relatedTools = [
    { name: "PDF Merger", path: "/tools/pdf-merger", description: "Combine multiple PDF files into one document" },
    { name: "PDF Rotator", path: "/tools/pdf-rotator", description: "Rotate PDF pages to correct orientation" },
    { name: "PDF to Image", path: "/tools/pdf-to-image", description: "Convert PDF pages to JPG or PNG images" },
    { name: "Image to PDF", path: "/tools/image-to-pdf", description: "Create PDF documents from multiple images" },
    { name: "PDF Compressor", path: "/tools/pdf-compressor", description: "Reduce PDF file size without quality loss" }
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold">Free PDF Splitter - Extract & Split PDF Pages Online</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Extract specific pages or split any PDF by custom page ranges. No software to install, no account required, and your documents never leave your device.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">100% Free</Badge>
              <Badge variant="secondary">Works Offline</Badge>
              <Badge variant="secondary">No Sign-up</Badge>
              <Badge variant="secondary">Unlimited Use</Badge>
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

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">The Problem with Large PDF Files</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  PDFs are everywhere. From government forms and bank statements to academic papers and business contracts, this format dominates professional and personal document sharing. But PDFs come with a common challenge: they're often too large or contain more pages than you actually need.
                </p>
                <p>
                  Imagine you receive a 50-page annual report, but your client only needs pages 12 to 18. Or perhaps you're a student who wants to print just the relevant chapters from a textbook. Sending the entire document wastes bandwidth, confuses recipients, and can even breach confidentiality if other pages contain sensitive information.
                </p>
                <p>
                  Traditional solutions require expensive desktop software or online tools that upload your files to unknown servers—raising serious privacy concerns. For anyone handling financial statements, legal documents, or personal records, this is simply unacceptable. That's why we built this free, offline PDF splitter that keeps your documents exactly where they belong: on your device.
                </p>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">How to Split a PDF - Simple Steps</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <CardTitle className="text-lg">Upload Your PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click the upload area and select your PDF file. The tool instantly detects the total page count.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <CardTitle className="text-lg">Enter Page Ranges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Specify which pages to extract. Use formats like "1-5" for a range or "3, 7, 12" for individual pages.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <CardTitle className="text-lg">Download New PDF</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Click extract, and your new PDF with only the selected pages downloads immediately.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Who Benefits from PDF Splitting?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <GraduationCap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Students & Researchers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Extract specific chapters from textbooks for study groups, print only relevant sections, or submit particular pages as assignments without software installation.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Briefcase className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Working Professionals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Share specific sections of business reports with clients or auditors. A quick split ensures recipients see only what's relevant while maintaining confidentiality.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <FileText className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Exam Aspirants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Preparing for UPSC, SSC, or banking exams? Extract topic-wise sections from massive PDF study materials to create focused study notes.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Teachers & Educators</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Pull specific content from larger documents to prepare worksheets, question papers, or customized course materials for different classes.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Calculator className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Freelancers & Small Business</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Split invoices, contracts, and proposals to share relevant sections with clients while keeping other business information private.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Scale className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-lg">Legal & Finance Professionals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Handle sensitive documents with complete offline processing. Ensures client confidentiality and compliance with data protection standards.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t bg-muted/30">
            <div className="max-w-5xl mx-auto">
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold">Privacy & Offline Processing</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Security is not optional when handling documents. Unlike most online PDF tools, our splitter processes everything locally in your browser.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>No Server Uploads</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Your PDF never leaves your device. All splitting happens using your browser's built-in capabilities. Perfect for bank statements, Aadhaar documents, salary slips, and legal contracts.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Lock className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>No Data Storage</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      We don't store, copy, or access your documents. Once you close the page, your files exist only on your device. No tracking, no logging.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>No Account Required</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Use the tool immediately without registration, email verification, or personal information. Just open and start splitting.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Globe className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Works Offline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      After the page loads, you can disconnect from the internet and continue using the tool. Perfect for handling confidential documents in secure environments.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-10">
                <h2 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{item.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-12 border-t">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-8">
                <h2 className="text-2xl md:text-3xl font-bold">Related PDF & Document Tools</h2>
                <p className="text-muted-foreground">Explore more free tools to manage your PDF documents</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedTools.map((tool) => (
                  <Link key={tool.path} href={tool.path} data-testid={`link-related-${tool.path.split('/').pop()}`}>
                    <Card className="h-full hover-elevate cursor-pointer transition-all">
                      <CardHeader>
                        <CardTitle className="text-base">{tool.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
