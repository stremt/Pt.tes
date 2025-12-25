import { useSEO } from "@/lib/seo";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";

export default function PDFCategory() {
  useSEO({
    title: "PDF Tools - Free Online PDF Editor & Converter | Pixocraft",
    description: "Merge, split, compress, convert, and edit PDF files instantly with Pixocraft's free online PDF tools. No uploads, 100% private, works offline.",
    keywords: "pdf tools, pdf editor, pdf converter, pdf merger, pdf splitter, pdf compressor, free pdf tools, online pdf tools, offline pdf converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/pdf",
  });

  const pdfTools = [
    { id: "pdf-merger", name: "PDF Merger", description: "Merge multiple PDF files into one document instantly. Secure, offline, no upload required.", path: "/tools/pdf-merger" },
    { id: "pdf-splitter", name: "PDF Splitter", description: "Split PDF pages or extract selected pages to create a new document. Works completely offline.", path: "/tools/pdf-splitter" },
    { id: "pdf-rotator", name: "PDF Rotator", description: "Rotate any PDF page left or right and save the corrected document instantly.", path: "/tools/pdf-rotator" },
    { id: "pdf-compressor", name: "PDF Compressor", description: "Compress PDF files to reduce size by up to 90% while maintaining quality.", path: "/tools/pdf-compressor" },
    { id: "pdf-password-remover", name: "PDF Password Remover", description: "Remove password protection from encrypted PDF files securely in your browser.", path: "/tools/pdf-password-remover" },
    { id: "pdf-watermark-adder", name: "PDF Watermark Adder", description: "Add text or image watermarks to PDF files to protect your documents.", path: "/tools/pdf-watermark-adder" },
    { id: "pdf-watermark-remover", name: "PDF Watermark Remover", description: "Remove watermarks and unwanted text or images from PDF files easily.", path: "/tools/pdf-watermark-remover" },
    { id: "image-to-pdf", name: "Image to PDF", description: "Convert images (JPG, PNG, WebP) into PDF documents in seconds.", path: "/tools/image-to-pdf" },
    { id: "pdf-to-image", name: "PDF to Image", description: "Extract and convert PDF pages to individual image files (PNG, JPG).", path: "/tools/pdf-to-image" },
    { id: "excel-to-pdf", name: "Excel to PDF", description: "Convert Excel spreadsheets (XLSX, XLS) to PDF format instantly.", path: "/tools/excel-to-pdf" },
    { id: "html-to-pdf", name: "HTML to PDF", description: "Convert HTML code and web pages to PDF documents completely offline.", path: "/tools/html-to-pdf" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "PDF Tools", url: "/tools/pdf" },
          ]}
        />

        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            <Badge variant="secondary" className="text-base px-6 py-2 font-semibold" data-testid="badge-pdf-category">
              PDF Tools
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Edit & Convert <span className="text-primary">PDF Files Instantly</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Free, offline PDF editing tools for merging, splitting, compression, conversion, and protection
          </p>
          <div className="pt-4">
            <Link href="/tools">
              <Button variant="outline" data-testid="button-browse-all-tools">
                Browse All Tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <article className="prose prose-invert max-w-none space-y-8 mb-16">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Process PDFs Without Any Software</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF tools help you manage, edit, and convert PDF documents instantly. Whether you need to combine multiple files, extract specific pages, compress for email sharing, or convert between formats, PDF tools eliminate the need for expensive desktop software. From merging PDFs to removing watermarks, all operations happen securely in your browser.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Modern PDF tools provide comprehensive functionality from basic operations like merging and splitting to advanced features like password removal and watermark management, all accessible through your web browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Who Benefits from PDF Tools?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Students combine research papers and assignment documents. Professionals merge contracts and reports for easy distribution. Business owners compress files for email attachments and cloud storage. Teachers organize exam papers by splitting large PDFs. Content creators convert images and HTML to PDF format. Accountants manage financial documents and remove sensitive watermarks. Anyone working with digital documents benefits from quick, private PDF processing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Privacy-conscious users appreciate local processing that keeps documents on their device. Busy professionals save time with one-click operations that eliminate software overhead and installation complexity.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Common PDF Management Tasks</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF merging combines multiple documents into one file for organized sharing and storage. Splitting extracts specific pages to create smaller, focused documents. Compression reduces file size for faster email transmission and storage without quality loss. Format conversion transforms images and HTML to PDF, or PDF pages to images.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Security operations include removing password protection for unlocked access and removing watermarks from unwanted branding. Rotation fixes page orientation issues in scanned documents. All these tasks happen instantly without external servers or third-party involvement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Private & Offline PDF Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              All PDF tools run entirely in your browser—no uploads to external servers. This offline-first approach ensures complete privacy for sensitive documents like contracts, financial records, and personal files. No tracking, no logging, no third-party analysis. Your documents stay on your device throughout the entire process.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Local PDF processing means instant results without network delays, offline functionality after initial load, and zero security risks. Whether processing confidential business documents, legal contracts, or personal records, browser-based processing guarantees genuine privacy and security.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Using PDF Tools Effectively</h2>
            <p className="text-muted-foreground leading-relaxed">
              Start with merging to combine related documents into organized files. Use splitting to extract specific pages you need. Compress before sharing via email to respect bandwidth limits. Convert images to PDF when you need to preserve a standardized format. Remove passwords from previously secured documents to enable easy access.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Leverage watermark tools to protect your PDFs or remove unwanted branding from others. Convert between PDF and images as needed for different workflows. Most importantly, use PDF tools as part of your regular document management routine—whether handling business documentation, academic papers, or personal records.
            </p>
          </section>
        </article>

        {/* All PDF Tools Section */}
        <section className="space-y-6 border-t pt-12">
          <h2 className="text-2xl font-bold">All PDF Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pdfTools.map((tool) => (
              <Card key={tool.id} className="hover-elevate flex flex-col">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <CardDescription className="mb-4 flex-1">{tool.description}</CardDescription>
                  <a href={tool.path}>
                    <Button variant="outline" className="w-full" data-testid={`button-pdf-tool-${tool.id}`}>
                      Use Tool
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
