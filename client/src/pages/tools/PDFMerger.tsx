import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileStack, Upload, Download, X, Zap, Lock, Shield, WifiOff, CheckCircle, Building2, CalendarDays, Briefcase, GraduationCap, Landmark, FileText, ImageDown, Key, ArrowRight } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { PDFDocument } from "pdf-lib";
import { getRelatedTools, getToolIcon } from "@/lib/tools";

export default function PDFMerger() {
  const [files, setFiles] = useState<File[]>([]);
  const [merging, setMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Free PDF Merger - Combine PDFs Offline | Pixocraft",
    description: "Merge PDF files free and offline. Combine multiple PDFs into one document instantly in your browser. No upload, no servers, 100% private.",
    keywords: "pdf merger, merge pdf online free, combine pdf files, offline pdf merger, pdf joiner, merge pdf without upload, secure pdf merger, private pdf combiner, join pdf files, pdf combine tool",
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
        description: "Failed to merge PDFs. The file may be password-protected or corrupted.",
        variant: "destructive",
      });
    } finally {
      setMerging(false);
    }
  };

  const relatedTools = getRelatedTools("pdf-merger");

  const faqItems: FAQItem[] = [
    {
      question: "How do I merge PDF files for free?",
      answer: "Simply click the upload area above, select your PDF files (minimum 2), and click 'Merge & Download PDF'. Your merged document downloads instantly. No signup, no email required—it's completely free with no limits or watermarks."
    },
    {
      question: "Is this PDF merger safe for confidential documents?",
      answer: "Absolutely! Pixocraft's PDF merger is 100% safe because all processing happens entirely in your browser. Your PDF files never leave your device—they are not uploaded to any server. This makes our tool ideal for contracts, financial statements, legal documents, and sensitive personal files."
    },
    {
      question: "Does the PDF merger work without internet?",
      answer: "Yes! Once the page loads, you can merge PDFs without any internet connection. This makes Pixocraft perfect for secure environments, travel, or areas with limited connectivity. Load the page once, then combine unlimited PDF files anytime—even without Wi-Fi."
    },
    {
      question: "Is there a file size or page limit?",
      answer: "There's no fixed file size or page limit imposed by our tool. The actual limit depends on your device's memory and browser capabilities. Most modern browsers handle PDFs up to several hundred megabytes without issues. For very large files, close unnecessary browser tabs to free up memory."
    },
    {
      question: "Can I merge PDFs with different page sizes?",
      answer: "Yes! PDFs with different page sizes, orientations (portrait/landscape), or formats merge together without any issues. Each page retains its original dimensions in the final merged document. This is perfect for combining scanned documents with digital files."
    },
    {
      question: "Will my merged PDF have a watermark?",
      answer: "No, never! Pixocraft's PDF merger is completely free and never adds watermarks or branding to your documents. The merged PDF is clean and professional, exactly as you'd expect. We believe in providing genuinely free tools without hidden limitations."
    },
    {
      question: "Can I merge password-protected PDFs?",
      answer: "Password-protected PDFs cannot be merged directly for security reasons. You'll need to remove the password protection first using the software that created it. This protects you from accidentally merging documents you don't have authorization to modify."
    },
    {
      question: "How many PDFs can I combine at once?",
      answer: "You can merge as many PDFs as your browser's memory allows—we've tested with dozens of files successfully. For optimal performance, we recommend merging 20-30 files at a time. For larger batches, merge in groups and then combine the resulting PDFs."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

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

          {/* Page Header */}
          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileStack className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Free PDF Merger - Combine PDFs Offline</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Merge multiple PDF files into one document—100% free, works offline, completely private. Your files never leave your device.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">100% Free Forever</Badge>
              <Badge variant="secondary">Works Offline</Badge>
              <Badge variant="secondary">No Upload Required</Badge>
              <Badge variant="secondary">No Watermark</Badge>
            </div>
            <h2 className="text-lg text-muted-foreground max-w-3xl mx-auto pt-2">
              Combine PDFs instantly without uploading to any server. Your files stay on your device—secure, private, and fast. Trusted by students, professionals, and businesses across India and worldwide for confidential document management.
            </h2>
          </div>

          {/* Main Tool Interface */}
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

                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground p-4 rounded-lg bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="font-medium">No Upload — Files stay on your device</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <WifiOff className="h-4 w-4 text-primary" />
                    <span className="font-medium">Offline Merging — Works without internet</span>
                  </div>
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

          {/* Why You Need PDF Merger */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why You Need a PDF Merger</h2>
            <div className="prose prose-lg max-w-4xl mx-auto">
              <p className="text-muted-foreground mb-4">
                Working with multiple PDF files is a daily reality for millions of people. Whether you're a student compiling research papers, a professional preparing client proposals, or someone organizing scanned documents—you've likely faced the frustration of juggling separate files when you need them as one.
              </p>
              <p className="text-muted-foreground mb-4">
                Most online PDF tools require you to upload your files to their servers. This creates privacy risks, especially for sensitive documents like contracts, financial statements, or personal records. Your files pass through unknown servers, potentially stored or accessed without your knowledge.
              </p>
              <p className="text-muted-foreground">
                Pixocraft's PDF Merger solves both problems. Combine unlimited PDFs into a single document—without ever uploading your files anywhere. Everything happens right in your browser, keeping your documents completely private while giving you fast, professional results.
              </p>
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-lg">Upload PDFs</h3>
                <p className="text-muted-foreground">
                  Click to select multiple PDF files from your device. Add as many as you need.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-lg">Merge Instantly</h3>
                <p className="text-muted-foreground">
                  Click the merge button. Files are combined instantly in your browser—no upload needed.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-lg">Download</h3>
                <p className="text-muted-foreground">
                  Your merged PDF downloads automatically. Clean, professional, no watermarks.
                </p>
              </div>
            </div>
          </section>

          {/* Why Use Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Use Pixocraft PDF Merger?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <WifiOff className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Fully Offline Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unlike server-based PDF tools, Pixocraft merges PDFs entirely in your browser. Once the page loads, you can work without internet. Perfect for confidential documents, travel, or secure corporate environments where uploading files isn't allowed.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>No Uploads, No Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your PDFs never leave your device. We don't upload, store, or access your files in any way. There's no tracking, no analytics on your documents, and no risk of data breaches. Complete privacy for sensitive business, legal, or personal documents.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Fast Browser-Based Merging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No waiting for uploads or server processing. PDFs merge instantly on your device using modern browser capabilities. Even large documents combine in seconds. The result downloads immediately—no email verification or signup required.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Unlimited Usage, No Watermark</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Merge as many PDFs as you want, as often as you need—completely free. Unlike other tools, we never add watermarks or branding to your merged documents. Professional results every time, without hidden limitations or premium upsells.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="prose prose-lg max-w-4xl mx-auto">
              <p className="text-muted-foreground">
                Pixocraft PDF Merger is built for professionals, students, and anyone who values privacy. Whether you're combining contracts, research papers, or scanned receipts, our tool delivers fast, secure results. For complete document workflows, pair with our <Link href="/tools/password-generator" className="text-primary hover:underline">Password Generator</Link> to create strong passwords for your protected PDFs.
              </p>
            </div>
          </section>

          {/* Popular Use Cases */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Who Uses PDF Merger? Real Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <GraduationCap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Students & Researchers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Combine research papers, thesis chapters, lab reports, and reference materials into single submission files. Perfect for university assignments, dissertation submissions, and academic portfolios across India and worldwide.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <Briefcase className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Business Professionals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Merge contracts, proposals, reports, and invoices into professional client-ready documents. Ideal for consultants, accountants, and business owners who handle sensitive financial or legal paperwork daily.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <Landmark className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Government & Banking Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Combine Aadhaar, PAN cards, bank statements, and supporting documents for loan applications, visa submissions, or government portals. Keep sensitive identity documents private with offline processing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <FileText className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Legal & HR Departments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Merge employment contracts, policy documents, compliance forms, and case files. Essential for law firms and HR teams handling confidential employee or client information securely.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <ImageDown className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Scanned Documents & Archives</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Combine scanned receipts, downloaded forms, medical records, and insurance papers into organized digital files. Perfect for personal record-keeping and expense management.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <Building2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-lg">Real Estate & Property Deals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Merge property documents, sale agreements, NOCs, and registration papers into complete transaction files. Secure offline processing protects sensitive property and financial details.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((faq, index) => (
                  <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Authority & Freshness Signals */}
          <section className="mb-16">
            <Card className="bg-muted/30">
              <CardContent className="py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-6 flex-wrap justify-center">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Trusted by 100,000+ users worldwide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <span>India's largest offline-first tool hub with 200+ browser-based tools</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Last updated: December 2025</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedTools.map((tool) => {
                const Icon = getToolIcon(tool.icon);
                return (
                  <Card key={tool.id} className="hover-elevate">
                    <CardHeader>
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>{tool.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="mb-4">{tool.description}</CardDescription>
                      <Link href={tool.path}>
                        <Button variant="outline" className="w-full" data-testid={`button-related-${tool.id}`}>
                          Use Tool
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
