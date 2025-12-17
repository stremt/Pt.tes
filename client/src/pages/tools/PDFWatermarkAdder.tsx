import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Droplets, Upload, Download, X, Shield, Briefcase, GraduationCap, Building2, FileText, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { addWatermarkToPDF, formatFileSize } from "@/lib/pdf-utils";

export default function PDFWatermarkAdder() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkedFile, setWatermarkedFile] = useState<Blob | null>(null);
  const [watermarkText, setWatermarkText] = useState("CONFIDENTIAL");
  const [opacity, setOpacity] = useState(30);
  const [fontSize, setFontSize] = useState(50);
  const [position, setPosition] = useState<'center' | 'diagonal' | 'bottom' | 'top'>('diagonal');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useSEO({
    title: "Add Watermark to PDF Online Free | PDF Watermark Tool",
    description: "Add custom text watermarks to PDF files online for free. Protect documents, mark as confidential, add branding. Secure, offline processing in your browser.",
    keywords: "add watermark to pdf, pdf watermark online, watermark pdf free, protect pdf, pdf security, add text to pdf, pdf watermarking tool, stamp pdf, pdf branding",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf-watermark-adder",
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
      setWatermarkedFile(null);
    }
  };

  const addWatermark = async () => {
    if (!file || !watermarkText.trim()) {
      toast({
        title: "Error",
        description: "Please select a file and enter watermark text",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await addWatermarkToPDF(file, {
        text: watermarkText,
        opacity: opacity / 100,
        fontSize,
        position,
      });

      setWatermarkedFile(result);
      toast({
        title: "Success!",
        description: "Watermark added to PDF successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add watermark",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadWatermarked = () => {
    if (watermarkedFile) {
      const url = URL.createObjectURL(watermarkedFile);
      const link = document.createElement("a");
      link.download = `watermarked-${file?.name || "document.pdf"}`;
      link.href = url;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Why should I add watermarks to my PDF documents?",
      answer: "Watermarks serve multiple important purposes: they protect intellectual property by clearly marking ownership, indicate document status (like DRAFT or CONFIDENTIAL), deter unauthorized copying and distribution, add professional branding to business documents, and help track document versions. For legal documents, contracts, proposals, and sensitive materials, watermarks provide an essential layer of protection and identification."
    },
    {
      question: "Can watermarks be removed from PDFs after I add them?",
      answer: "While watermarks can potentially be removed with specialized software, adding them still provides significant protection. They clearly establish ownership and serve as a visual deterrent against unauthorized use. For maximum security, consider combining watermarks with password protection. The effort required to remove watermarks discourages most casual misuse."
    },
    {
      question: "Is my PDF secure when I add watermarks using this tool?",
      answer: "Absolutely. All processing happens entirely within your web browser—your PDF never gets uploaded to any server. We cannot see, access, or store your documents. This local processing approach is especially important for confidential contracts, financial documents, legal materials, and sensitive business files."
    },
    {
      question: "What watermark customization options are available?",
      answer: "You have full control over your watermark appearance. Customize the text content (any words or phrases you need), adjust the opacity from subtle to prominent, change the font size for the right visual impact, and select the position—diagonal across the page, centered, or at the top or bottom. This flexibility lets you create anything from discreet background marks to bold protective stamps."
    },
    {
      question: "Will adding a watermark reduce my PDF quality?",
      answer: "No, watermarks are added as a separate layer on top of your existing PDF content without degrading the original document quality. Your text remains crisp and readable, images stay clear and sharp, and the overall file structure is preserved. The watermark simply overlays the content without altering it."
    },
    {
      question: "What text should I use for my watermark?",
      answer: "Common watermark texts include: CONFIDENTIAL, DRAFT, INTERNAL USE ONLY, DO NOT COPY, SAMPLE, your company name, copyright notices (like © 2024 Company Name), or document identifiers. Choose text that clearly communicates the document's status or ownership based on your specific needs."
    },
    {
      question: "Can I add watermarks to multiple PDFs at once?",
      answer: "Currently, this tool processes one PDF at a time to ensure accuracy and give you full control over each watermark. For multiple documents, simply repeat the process—each watermarking operation takes just seconds. This approach lets you customize watermark settings for different documents as needed."
    },
    {
      question: "Does this tool work on mobile devices?",
      answer: "Yes, this PDF watermark tool works on smartphones and tablets. Whether you're using an iPhone, Android phone, or iPad, you can upload PDFs, customize your watermark settings, and download the watermarked version. No app installation required—everything works directly in your mobile browser."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  const relatedTools = [
    { name: "PDF Watermark Remover", href: "/tools/pdf-watermark-remover", description: "Remove or reduce watermarks from PDF files" },
    { name: "PDF Password Remover", href: "/tools/pdf-password-remover", description: "Remove password protection from PDF files" },
    { name: "PDF Compressor", href: "/tools/pdf-compressor", description: "Reduce PDF file size while maintaining quality" },
    { name: "PDF Merger", href: "/tools/pdf-merger", description: "Combine multiple PDF files into one document" },
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
            <span className="text-foreground">PDF Watermark Adder</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Droplets className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold" data-testid="heading-h1">Free PDF Watermark Tool - Add Text Watermarks Online</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Protect your documents, establish ownership, and add professional branding with custom text watermarks. This free tool lets you stamp any PDF with your own watermark text—all processing happens in your browser, keeping your files completely private.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Customizable</Badge>
              <Badge variant="secondary">Private</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            {!file ? (
              <Card>
                <CardHeader>
                  <CardTitle>Upload PDF</CardTitle>
                  <CardDescription>Select a PDF file to add watermark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover-elevate transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                    data-testid="dropzone-upload"
                  >
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="font-medium mb-2">Click to upload a PDF</p>
                    <p className="text-sm text-muted-foreground">Add watermark to protect your document</p>
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
                        <CardTitle>Watermark Settings</CardTitle>
                        <CardDescription>{file.name}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setFile(null);
                          setWatermarkedFile(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        data-testid="button-reset"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="watermark-text">Watermark Text</Label>
                      <Input
                        id="watermark-text"
                        value={watermarkText}
                        onChange={(e) => setWatermarkText(e.target.value)}
                        placeholder="Enter watermark text"
                        data-testid="input-watermark-text"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Select value={position} onValueChange={(v: any) => setPosition(v)}>
                        <SelectTrigger data-testid="select-position">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="diagonal">Diagonal (Center)</SelectItem>
                          <SelectItem value="center">Center</SelectItem>
                          <SelectItem value="top">Top</SelectItem>
                          <SelectItem value="bottom">Bottom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Opacity</Label>
                        <span className="text-sm text-muted-foreground">{opacity}%</span>
                      </div>
                      <Slider
                        value={[opacity]}
                        onValueChange={(v) => setOpacity(v[0])}
                        min={10}
                        max={100}
                        step={5}
                        data-testid="slider-opacity"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Font Size</Label>
                        <span className="text-sm text-muted-foreground">{fontSize}pt</span>
                      </div>
                      <Slider
                        value={[fontSize]}
                        onValueChange={(v) => setFontSize(v[0])}
                        min={20}
                        max={100}
                        step={5}
                        data-testid="slider-fontsize"
                      />
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={addWatermark}
                        disabled={loading || !watermarkText.trim()}
                        className="flex-1"
                        size="lg"
                        data-testid="button-add-watermark"
                      >
                        {loading ? "Adding Watermark..." : "Add Watermark"}
                      </Button>
                      {watermarkedFile && (
                        <Button
                          onClick={downloadWatermarked}
                          variant="outline"
                          className="flex-1"
                          size="lg"
                          data-testid="button-download"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Download PDF
                        </Button>
                      )}
                    </div>

                    {watermarkedFile && (
                      <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-900">
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">
                          Watermark added successfully! Your PDF is ready to download.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Why Add Watermarks to Your PDFs?</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground space-y-4">
              <p>
                In today's digital world, protecting your documents is more important than ever. Whether you're sharing contracts, proposals, creative work, or confidential reports, watermarks provide a simple yet effective layer of protection and identification.
              </p>
              <p>
                A watermark clearly establishes who owns the document and what its intended use is. When someone sees "CONFIDENTIAL" stamped across a page, they immediately understand the document's sensitive nature. When your company name appears as a subtle background mark, it reinforces your brand and discourages unauthorized redistribution.
              </p>
              <p>
                Unlike complex encryption or password protection, watermarks work visibly—they're a constant reminder of ownership that travels with the document no matter how many times it's shared, printed, or forwarded.
              </p>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Watermark Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Shield className="h-6 w-6 text-primary" />
                    <CardTitle>Confidential Documents</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mark sensitive business documents, contracts, financial reports, and internal communications as "CONFIDENTIAL" or "INTERNAL USE ONLY" to prevent unauthorized sharing and clearly communicate handling requirements.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Copyright Protection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Add your company name, logo text, or copyright notice to establish clear ownership. This discourages unauthorized use and makes it easy to identify the source if documents are shared without permission.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Draft & Preview Versions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Mark documents as "DRAFT", "PREVIEW", "SAMPLE", or "NOT FOR DISTRIBUTION" to clearly indicate document status. This prevents confusion and ensures recipients know they're viewing a work-in-progress.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <CardTitle>Legal Documents</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Law firms and legal departments watermark contracts, agreements, and court documents to indicate authenticity and prevent tampering. Watermarks help establish document provenance in legal proceedings.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <CardTitle>Business Proposals</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Add your company branding to proposals, quotes, and presentations. Professional watermarks reinforce your brand identity and add a polished touch to client-facing documents.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <CardTitle>Educational Materials</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Teachers and educators watermark course materials, worksheets, and study guides to indicate ownership and discourage unauthorized redistribution of their carefully created content.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Who Uses PDF Watermarks?</h2>
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
                    From HR departments protecting employee documents to sales teams branding proposals, business professionals use watermarks daily to secure and identify their documents across every industry.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Building2 className="h-6 w-6 text-primary" />
                    <CardTitle>Legal & Compliance Teams</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Legal professionals rely on watermarks to indicate document status, protect confidential case files, and ensure proper handling of sensitive materials throughout legal proceedings and reviews.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Users className="h-6 w-6 text-primary" />
                    <CardTitle>Creative Professionals</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Designers, photographers, and content creators watermark portfolios, proofs, and sample work to protect their intellectual property while still showcasing their work to potential clients.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <CardTitle>Educators & Trainers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Teachers, professors, and corporate trainers watermark educational materials to maintain ownership of their content and track distribution of course materials and training documents.
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
                    Entrepreneurs and small business owners add professional branding to invoices, contracts, and client documents. Watermarks elevate the professional appearance of business communications.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <FileText className="h-6 w-6 text-primary" />
                    <CardTitle>Publishers & Authors</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Publishers and authors protect manuscript drafts, review copies, and advance reader copies with watermarks. This helps track the source if unauthorized copies appear online.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Complete Privacy: Your Documents Never Leave Your Device</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      When you add watermarks using this tool, all processing happens entirely within your web browser. Your PDF is never uploaded to any server—it stays on your device throughout the entire process.
                    </p>
                    <p className="text-muted-foreground">
                      This is critically important for sensitive documents. Whether you're watermarking financial reports, legal contracts, medical records, or confidential business materials, you can trust that your files remain completely private.
                    </p>
                    <p className="text-muted-foreground">
                      We have zero access to your documents. There's no upload, no cloud processing, no storage, and no data collection. You get the convenience of an online tool with the security of offline software.
                    </p>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm font-medium">Works Offline After Page Loads</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Once this page loads in your browser, you can disconnect from the internet and continue using the tool. Your watermarking happens entirely offline, adding another layer of security for highly sensitive documents.
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
        </div>
      </div>
    </>
  );
}
