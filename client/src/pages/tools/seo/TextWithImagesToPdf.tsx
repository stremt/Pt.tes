import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# Product Showcase Document

## Introduction

This document demonstrates how to embed images within text content and convert everything to PDF format.

## Feature Overview

Our product offers comprehensive solutions for modern businesses:

- Complete integration suite
- Advanced analytics dashboard
- Real-time collaboration tools
- Enterprise-grade security

## Product Images

### Product Shot 1
![Product Screenshot](https://via.placeholder.com/600x400?text=Product+Screenshot+1)

### Product Shot 2
![Product Dashboard](https://via.placeholder.com/600x400?text=Product+Dashboard)

## Key Features with Visuals

### Feature 1: User Interface
Clean, intuitive design for maximum usability.

### Feature 2: Performance
Lightning-fast processing and real-time updates.

### Feature 3: Integration
Seamless connection with your existing tools.

## Specifications

| Feature | Details |
|---------|---------|
| Processing | Real-time |
| Users | Unlimited |
| Storage | 1TB+ |
| Support | 24/7 |

## Gallery

### Team Photos
![Team Working](https://via.placeholder.com/500x400?text=Team+Collaboration)

This demonstrates embedding images in text content.

## Conclusion

Convert text with embedded images to PDF for professional presentations and documentation.`;

const faqItems: FAQItem[] = [
  { question: "How do I add images to my text content?", answer: "Use Markdown image syntax: ![alt text](image-url). Our converter will embed the images in your PDF." },
  { question: "What image formats are supported?", answer: "We support JPG, PNG, GIF, and WebP formats. Images are embedded directly in the PDF." },
  { question: "Can I control image size in the PDF?", answer: "Yes. Images scale responsively and automatically fit within the PDF page width." },
  { question: "Do image URLs need to be public?", answer: "Yes. Images must be hosted on a publicly accessible server for embedding in PDFs." },
  { question: "Are images compressed in the PDF?", answer: "Images are optimized for PDF, maintaining quality while keeping file size reasonable." }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Text with Images to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
};

export default function TextWithImagesToPdf() {
  useSEO({
    title: "Convert Text with Images to PDF Online – Add Images to PDF Documents | Pixocraft",
    description: "Convert text with images to PDF instantly using Pixocraft. Create professional PDF documents with embedded images, tables, and formatting directly in your browser for free.",
    keywords: "text with images to pdf, convert text and images to pdf, add images to pdf, image and text pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-with-images-to-pdf",
    ogTitle: "Convert Text with Images to PDF Online – Add Images to PDF Documents | Pixocraft",
    ogDescription: "Convert text with images to PDF instantly using Pixocraft. Create professional PDF documents with embedded images, tables, and formatting directly in your browser for free.",
    ogType: "website",
  });

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm flex items-center gap-2 text-muted-foreground/80">
            <Link href="/" className="hover:text-primary transition-colors" data-testid="link-home">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools" className="hover:text-primary transition-colors" data-testid="link-tools">Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/pdf" className="hover:text-primary transition-colors">PDF Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/text-to-pdf" className="hover:text-primary transition-colors">Text to PDF</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground font-medium">Text with Images to PDF</span>
          </div>

          <div className="text-center space-y-8 mb-16 relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/30 shadow-lg">
                <Type className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert Text with Images to PDF
              </h1>
              <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed mt-3">
                Turn any text into a clean, professional PDF in seconds — no signup, no waiting.
              </p>
              <p className="text-base font-bold text-primary mt-1">100% Private • Offline • Free</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
                ⚡ Instant PDF Generator
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Image Embedding
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Rich Content
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Professional Output
              </Badge>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground/60 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
              Used by 10,000+ users daily
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="text-with-images-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-0">
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Create Rich PDFs with Text and Images</h2>
              <p className="text-muted-foreground leading-relaxed">Combine text content with images to create comprehensive, visually engaging PDF documents. Perfect for reports, product showcases, portfolios, and marketing materials.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Use Cases for Text + Images PDFs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["Product brochures", "Portfolio documents", "Marketing materials", "Product presentations", "Portfolio showcases", "Report documentation"].map((use, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-xl sm:rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{use}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Image Embedding Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Visual impact", desc: "Images make documents more engaging and professional.", icon: Download },
                  { title: "Better communication", desc: "Visuals convey information more effectively.", icon: Zap },
                  { title: "Rich formatting", desc: "Combine text, images, tables, and more.", icon: Globe },
                  { title: "Embedded permanently", desc: "Images are embedded in the PDF, not linked.", icon: ShieldCheck },
                  { title: "Responsive sizing", desc: "Images automatically fit page width.", icon: Type },
                  { title: "Professional appearance", desc: "Create polished, publication-quality documents.", icon: ShieldCheck }
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <benefit.icon className="w-12 h-12 text-primary mb-6" />
                    <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {faqItems.map((faq, i) => (
                  <Card key={i} className="border-none shadow-none bg-muted/20">
                    <CardHeader><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-primary/5 rounded-3xl p-12 border border-primary/10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Create Your Rich PDF Today</h2>
              <Link href="/tools/text-to-pdf" className="inline-block">
                <Badge className="cursor-pointer hover-elevate py-2 px-6 text-base">
                  Visit Main Text to PDF Tool
                </Badge>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
