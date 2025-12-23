import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Eraser, Upload, Download, X, AlertTriangle, Shield, Users, Briefcase, GraduationCap, Building2, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { attemptWatermarkRemoval, formatFileSize } from "@/lib/pdf-utils";

export default function PDFWatermarkRemover() {
  const [file, setFile] = useState<File | null>(null);
  const [processedFile, setProcessedFile] = useState<Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Remove Watermark from PDF Online Free | PDF Cleaner Tool",
    description: "Remove watermarks from PDF files online for free. Clean PDFs securely in your browser. No upload to servers, completely private. Works on all devices.",
    keywords: "remove watermark from pdf, pdf watermark remover, delete watermark pdf, clean pdf watermark, pdf watermark cleaner, remove pdf watermark free, erase watermark pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-watermark-remover",
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid File",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }
      setFile(selectedFile);
      setProcessedFile(null);
    }
  };

  const processWatermark = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const result = await attemptWatermarkRemoval(file);
      setProcessedFile(result);
      toast({
        title: "Processed",
        description: "PDF processed. Note: Complete watermark removal may not be possible.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process PDF",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadProcessed = () => {
    if (processedFile) {
      const url = URL.createObjectURL(processedFile);
      const link = document.createElement("a");
      link.download = `processed-${file?.name || "document.pdf"}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Can this tool completely remove all watermarks from PDFs?",
      answer: "Browser-based watermark removal has inherent limitations. This tool processes the PDF and attempts to reduce or remove watermark visibility, but complete removal is not guaranteed for all watermark types. Watermarks deeply embedded in the PDF structure or rasterized into images may require professional desktop software for complete removal."
    },
    {
      question: "Is it legal to remove watermarks from PDF documents?",
      answer: "You should only remove watermarks from documents you own or have explicit permission to modify. Removing watermarks from copyrighted material, licensed documents, or files you don't have rights to is illegal and unethical. This tool is designed exclusively for legitimate use cases—such as removing your own watermarks or cleaning documents you have authorization to edit."
    },
    {
      question: "Why can't some watermarks be removed?",
      answer: "Watermarks can be embedded in PDFs through various methods—as transparent text layers, image overlays, or integrated directly into the document's visual structure. Some watermarks are flattened into page images, making them part of the content itself. Browser-based tools work best with layer-based watermarks that remain separate from the main content."
    },
    {
      question: "Is my PDF safe when I use this watermark remover?",
      answer: "Absolutely. All processing happens entirely within your web browser. Your PDF never gets uploaded to any server—it stays on your device throughout the entire process. We cannot see, access, store, or share your documents. This local processing approach ensures maximum privacy even for confidential files."
    },
    {
      question: "What should I do if the watermark isn't fully removed?",
      answer: "If this tool doesn't achieve the desired results, the watermark may be embedded in a way that requires professional PDF editing software. Before seeking alternatives, verify that you have the legal right to remove the watermark. If the document belongs to someone else, consider contacting the owner for an unmarked version."
    },
    {
      question: "Does this tool work on scanned PDFs with watermarks?",
      answer: "Scanned PDFs present additional challenges because the entire page—including the watermark—is typically a single image. This tool works best with digitally-created PDFs where watermarks exist as separate layers. For scanned documents, image editing software may be more effective."
    },
    {
      question: "Do I need to install any software to remove watermarks?",
      answer: "No installation required. This tool runs entirely in your web browser on any device—Windows, Mac, Linux, Android, or iOS. Simply visit this page, upload your PDF, and download the processed version. No plugins, extensions, or app downloads necessary."
    },
    {
      question: "Can I remove watermarks from multiple PDFs at once?",
      answer: "Currently, this tool processes one PDF at a time to ensure accuracy and maintain your privacy. For multiple documents, simply repeat the process for each file. Each processing operation takes just seconds, making it efficient to work through several files."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const relatedTools = [
    { name: "PDF Watermark Adder", href: "/tools/pdf-watermark-adder", description: "Add custom text or image watermarks to your PDFs" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor", description: "Reduce PDF file size while maintaining quality" },
    { name: "PDF Merger", href: "/tools/pdf-merger", description: "Combine multiple PDF files into one document" },
    { name: "PDF Password Remover", href: "/tools/pdf-password-remover", description: "Remove password protection from PDF files" },
    { name: "Image to PDF", href: "/tools/image-to-pdf", description: "Convert JPG, PNG, and other images to PDF format" }
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
            <span className="text-foreground">PDF Watermark Remover</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eraser className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-h1">Free PDF Watermark Remover - Clean PDFs Online</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Need to remove a watermark from your PDF? Whether it's a draft watermark you added yourself or outdated branding on documents you own, this free tool helps clean your PDFs right in your browser. No uploads, no software installation, complete privacy guaranteed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Private</Badge>
              <Badge variant="secondary">No Sign-up</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
              <div className="flex gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-800 dark:text-orange-200">
                  <p className="font-medium mb-1">Important Notice</p>
                  <p>This tool has limitations and may not remove all watermarks completely. Only use on documents you own or have permission to modify. Complete watermark removal may not be possible with browser-based tools.</p>
                </div>
              </div>
            </div>

            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload PDF</CardTitle>
                  <CardDescription>Select a PDF file with watermark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload a PDF</p>
                    <p className="text-sm text-muted-foreground">Attempt to process watermarks</p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileSelect}
                      className="hidden"
                      data-testid="input-file"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <CardTitle>Process Watermark</CardTitle>
                        <CardDescription>{file.name} ({formatFileSize(file.size)})</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setFile(null);
                          setProcessedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        data-testid="button-reset"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={processWatermark}
                        disabled={loading}
                        className="flex-1"
                        size="lg"
                        data-testid="button-process"
                      >
                        {loading ? "Processing..." : "Remove Watermark"}
                      </Button>
                      {processedFile && (
                        <Button
                          onClick={downloadProcessed}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                          data-testid="button-download"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download Clean PDF
                        </Button>
                      )}
                    </div>

                    {processedFile && (
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                        <p className="text-sm font-medium text-green-900 dark:text-green-100 mb-2">
                          PDF Processed Successfully
                        </p>
                        <p className="text-xs text-green-700 dark:text-green-300">
                          Review the processed PDF. Results vary depending on how the watermark was originally added to the document.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">The Problem: Unwanted Watermarks on Your Documents</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
              <p>
                Watermarks serve important purposes—protecting intellectual property, indicating document status, or branding materials. But sometimes watermarks become obstacles rather than assets.
              </p>
              <p>
                Perhaps you downloaded a PDF with a trial watermark that you've now purchased the rights to use. Maybe you have old company documents with outdated branding that needs updating. Or you created a document with a "DRAFT" watermark that's now final and ready for distribution.
              </p>
              <p>
                Whatever the reason, dealing with unwanted watermarks on documents you legitimately own can be frustrating. Professional PDF editing software is expensive, and uploading sensitive documents to random online services raises serious privacy concerns.
              </p>
              <p>
                This is where a secure, browser-based watermark remover becomes invaluable—processing your files locally without ever sending them across the internet.
              </p>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">How This Tool Works</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
              <p>
                Our PDF watermark remover analyzes your document's structure and attempts to identify and remove watermark elements. The tool works best with watermarks that exist as separate layers within the PDF—text overlays, semi-transparent images, or annotation-based marks.
              </p>
              <p>
                Simply upload your PDF, click the process button, and download the cleaned version. The entire operation happens within your browser, ensuring your document never leaves your device.
              </p>
              <p>
                It's important to understand that watermark removal success depends heavily on how the watermark was originally added. Layer-based watermarks that sit "on top" of content are easier to remove than watermarks that have been flattened into the page images.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Who Uses PDF Watermark Remover?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <CardTitle>Business Professionals</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Companies often need to update documents with old branding or remove "CONFIDENTIAL" watermarks from materials approved for public release. Marketing teams clean up presentations and reports for client distribution.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <CardTitle>Students & Academics</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Research papers and academic materials sometimes come with institutional watermarks. Students working with properly licensed materials may need clean copies for presentations or portfolios.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Content Creators</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Designers and content creators who have purchased licensed materials may need to remove sample watermarks after acquiring full rights. This tool helps prepare assets for final production use.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <CardTitle>Legal & Administrative</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Law offices and administrative departments frequently handle documents where draft watermarks need removal after final approval. Clean documents are essential for official records and filings.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <CardTitle>Small Business Owners</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Small businesses often need to update templates, remove outdated branding, or clean up documents for professional presentation. A quick, free tool saves time and money.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Document Archivists</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Organizations archiving historical documents may need to remove processing watermarks or stamps added during digitization. Clean archival copies preserve document integrity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Privacy: Your Documents Stay on Your Device</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      When you use this watermark remover, everything happens right in your web browser. Your PDF is processed locally on your device—it never gets uploaded to any server, never travels across the internet, and never leaves your control.
                    </p>
                    <p className="text-muted-foreground">
                      This matters tremendously for sensitive documents. Whether you're working with financial reports, legal contracts, medical records, or confidential business materials, you can trust that your files remain completely private.
                    </p>
                    <p className="text-muted-foreground">
                      We have zero access to your documents. There's no upload, no cloud processing, no storage, and no data collection. This browser-based approach gives you the convenience of an online tool with the security of offline software.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Works Offline After Page Loads</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Once this page loads in your browser, you can disconnect from the internet and continue using the tool. Your PDF processing happens entirely offline, adding an extra layer of security for highly sensitive documents.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqItems.map((faq, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Tools You May Find Useful</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full hover-elevate cursor-pointer">
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
          </section>

          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/pdf" className="text-primary hover:text-primary/80 transition-colors">PDF Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
