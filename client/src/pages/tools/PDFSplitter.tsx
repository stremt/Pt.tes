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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import { playCompletionSound, playErrorSound } from "@/lib/sound-effects";

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

type SplitMode = "range" | "pages";

export default function PDFSplitter() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [ranges, setRanges] = useState("");
  const [splitting, setSplitting] = useState(false);
  const [splitMode, setSplitMode] = useState<SplitMode>("range");
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [allowCompression, setAllowCompression] = useState(true);
  const [pagePreviews, setPagePreviews] = useState<Map<number, string>>(new Map());
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free PDF Splitter - Split PDF by Pages Online, 100% Offline & Secure",
    description: "Split PDFs instantly - extract specific pages for free. No upload needed, 100% offline, secure. Best PDF splitter for students, professionals & businesses in India.",
    keywords: "split pdf, pdf splitter, extract pdf pages, free pdf splitter online, split pdf by page range, pdf page extractor, how to split pdf, best pdf splitter, offline pdf splitter, split pdf without software",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-splitter",
  });

  const renderPageThumbnail = async (file: File, pageNum: number): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext("2d");
      if (!context) return "";
      await page.render({
        canvasContext: context,
        viewport: viewport,
      }).promise;
      return canvas.toDataURL();
    } catch (error) {
      console.error("Error rendering thumbnail:", error);
      return "";
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

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
    setSelectedPages(new Set());

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const count = pdf.getPageCount();
      setPageCount(count);
      setLoadingPreview(true);
      setLoadedPages(new Set());

      // Render thumbnails for all pages
      const previews = new Map<number, string>();
      const loaded = new Set<number>();
      for (let i = 1; i <= count; i++) {
        const thumbnail = await renderPageThumbnail(selectedFile, i);
        previews.set(i, thumbnail);
        loaded.add(i);
        setLoadedPages(new Set(loaded));
      }
      setPagePreviews(previews);
      setLoadingPreview(false);
    } catch (error) {
      console.error(error);
      setLoadingPreview(false);
      toast({
        title: "Error",
        description: "Failed to load PDF",
        variant: "destructive",
      });
      playErrorSound();
    }
  };

  const togglePageSelection = (page: number) => {
    const newSelected = new Set(selectedPages);
    if (newSelected.has(page)) {
      newSelected.delete(page);
    } else {
      newSelected.add(page);
    }
    setSelectedPages(newSelected);
  };

  const selectAllPages = () => {
    setSelectedPages(new Set(Array.from({ length: pageCount }, (_, i) => i + 1)));
  };

  const deselectAllPages = () => {
    setSelectedPages(new Set());
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

  const getPageIndicesToExtract = (): number[] => {
    if (splitMode === "range") {
      return parseRanges(ranges);
    } else if (splitMode === "pages") {
      return Array.from(selectedPages).sort((a, b) => a - b).map(p => p - 1);
    }
    return [];
  };


  const splitPDF = async () => {
    if (!file) return;

    const pagesToExtract = getPageIndicesToExtract();

    if (pagesToExtract.length === 0) {
      const msg = splitMode === "range" ? "Please enter valid page ranges (e.g., 1-3, 5, 7-9)" : "Please select pages";
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
      playErrorSound();
      return;
    }

    setSplitting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(srcPdf, pagesToExtract);
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
        description: `Extracted ${pagesToExtract.length} pages`,
      });
      playCompletionSound();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to split PDF",
        variant: "destructive",
      });
      playErrorSound();
    } finally {
      setSplitting(false);
    }
  };

  const faqItems = [
    {
      question: "How do I use this PDF splitter to extract pages?",
      answer: "It's simple: Upload your PDF, enter the pages you want (like 1-5, 8, 12-15), and click Extract. The pages are processed in your browser and downloaded instantly as a new PDF. No upload to servers, no waiting, no account needed."
    },
    {
      question: "Is my PDF upload really 100% safe and private?",
      answer: "Yes. Your PDF never leaves your device. All processing happens in your browser using your computer's power. We don't store, access, track, or copy your documents. Even if you lose internet connection after the page loads, the tool keeps working offline."
    },
    {
      question: "Can I split encrypted or password-protected PDFs?",
      answer: "If your PDF is password-protected, you'll need to remove the password first using our free PDF Password Remover tool. Once unlocked, you can split it without any issues."
    },
    {
      question: "Will extracted pages have the same quality as the original?",
      answer: "Absolutely. Pages are extracted without any quality loss, compression, or changes. Fonts, images, formatting, and resolution remain exactly the same. You get identical copies of your selected pages."
    },
    {
      question: "What's the maximum number of pages I can extract?",
      answer: "You can extract as many pages as your PDF contains. The tool handles large PDFs effectively. For files over 100MB, processing depends on your device's memory, but most modern devices handle it smoothly."
    },
    {
      question: "Can I extract multiple separate PDFs from one file?",
      answer: "The selected pages combine into a single PDF. To create multiple separate files, run the tool again with different page selections. For example, first extract pages 1-5, then run again for pages 10-15."
    },
    {
      question: "Does this tool work on my phone or tablet?",
      answer: "Yes. Works on any device with a modern browser - Android phones, iPhones, tablets, laptops, or desktop computers. No app needed, no installation required. Just open and start splitting."
    },
    {
      question: "Why is this better than using my PDF reader software?",
      answer: "Our splitter is specifically designed for fast, easy extraction. No software installation, no learning curve, no watermarks or page limits. Cloud-safe since processing happens offline on your device. Perfect for students, professionals, and anyone who regularly works with PDFs."
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
            <Link href="/tools/pdf" className="hover:text-foreground">PDF Tools</Link>
            {" / "}
            <span className="text-foreground">PDF Splitter</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Scissors className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Free PDF Splitter - Extract & Split Pages Instantly, Offline & Secure</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Extract specific pages from any PDF in seconds. No upload, no account, no software needed. 100% offline processing keeps your documents completely private and secure.
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
                  <div className="space-y-6">
                    <Card className="bg-muted/50">
                      <CardContent className="py-4">
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">Original file size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
                            <p className="text-sm text-muted-foreground">Total pages: {pageCount}</p>
                          </div>
                          <Button
                            onClick={() => {
                              setFile(null);
                              setPageCount(0);
                              setRanges("");
                              setSelectedPages(new Set());
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

                    <Tabs value={splitMode} onValueChange={(v) => setSplitMode(v as SplitMode)}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="range" data-testid="tab-range">Range</TabsTrigger>
                        <TabsTrigger value="pages" data-testid="tab-pages">Pages</TabsTrigger>
                      </TabsList>

                      <TabsContent value="range" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Page Range</Label>
                          <Input
                            value={ranges}
                            onChange={(e) => setRanges(e.target.value)}
                            placeholder="e.g., 1-3, 5, 7-9"
                            data-testid="input-ranges"
                          />
                          <p className="text-sm text-muted-foreground">
                            Enter page numbers or ranges (e.g., 1-3, 5, 7-9)
                          </p>
                        </div>
                      </TabsContent>

                      <TabsContent value="pages" className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={selectAllPages} data-testid="button-select-all">
                              Select All
                            </Button>
                            <Button size="sm" variant="outline" onClick={deselectAllPages} data-testid="button-deselect-all">
                              Deselect All
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {selectedPages.size} of {pageCount} pages selected
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto border rounded-lg p-4">
                          {Array.from({ length: pageCount }, (_, i) => i + 1).map((pageNum) => (
                            <button
                              key={pageNum}
                              onClick={() => togglePageSelection(pageNum)}
                              disabled={loadingPreview}
                              className={`p-2 border-2 rounded-lg transition-all overflow-hidden ${
                                selectedPages.has(pageNum)
                                  ? "border-green-500 bg-green-50 dark:bg-green-950/30"
                                  : "border-muted hover-elevate"
                              } ${loadingPreview ? "opacity-50 cursor-wait" : ""}`}
                              data-testid={`page-selector-${pageNum}`}
                            >
                              <div className="space-y-2">
                                {pagePreviews.get(pageNum) ? (
                                  <img
                                    src={pagePreviews.get(pageNum)}
                                    alt={`Page ${pageNum}`}
                                    className="w-full h-auto rounded"
                                  />
                                ) : (
                                  <div className="w-full aspect-[3/4] bg-muted rounded animate-pulse flex items-center justify-center">
                                    <div className="text-center">
                                      <div className="text-xs text-muted-foreground">Loading...</div>
                                    </div>
                                  </div>
                                )}
                                <div className="flex items-center justify-between px-1">
                                  <p className="text-xs font-medium">{pageNum}</p>
                                  {selectedPages.has(pageNum) && (
                                    <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                                      <span className="text-xs text-white">✓</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allowCompression}
                          onChange={(e) => setAllowCompression(e.target.checked)}
                          className="rounded border"
                          data-testid="checkbox-compression"
                        />
                        <span className="text-sm">Allow compression</span>
                      </label>
                    </div>

                    <Button
                      onClick={splitPDF}
                      disabled={
                        splitting ||
                        (splitMode === "range" && !ranges.trim()) ||
                        (splitMode === "pages" && selectedPages.size === 0)
                      }
                      className="w-full bg-red-600 hover:bg-red-700"
                      size="lg"
                      data-testid="button-split"
                    >
                      {splitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Split PDF
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Why Use a PDF Splitter?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
                <p>
                  Working with PDFs is a daily task for millions - whether you're a student reviewing textbooks, a professional handling reports, or a business managing documents. The problem? PDFs often contain more pages than you need. A 50-page contract when you only need pages 5-10. A 200-page manual when you want specific chapters. Sending entire documents wastes bandwidth, creates confusion, and risks sharing sensitive information unintentionally.
                </p>
                <p>
                  Most online PDF tools require uploading your files to their servers, which raises serious privacy concerns - especially when handling bank statements, Aadhaar documents, legal contracts, or medical records. Traditional desktop software requires installation, subscriptions, and technical knowledge. That's where this free PDF splitter changes everything.
                </p>
                <p>
                  Our tool processes PDFs entirely offline, right in your browser. Your documents never touch our servers or any external service. Whether you're extracting pages for a presentation, creating study materials, sharing specific sections with clients, or organizing document libraries, you can trust that your information stays completely private and secure.
                </p>
                <p>
                  The best part? It's completely free, requires no account, no software installation, and works on any device - desktop, tablet, or smartphone. Just upload, select your pages, and download. That's it.
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
