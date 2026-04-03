import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# Email: Project Status Update

**From**: team@company.com
**Subject**: Q1 Project Status Update
**Date**: March 7, 2026

Dear Team,

I hope this email finds you well. I wanted to provide a comprehensive update on our Q1 project status.

## Overview

Our current project has achieved significant milestones this quarter. The development team has completed the core feature set, and quality assurance is underway.

## Completed Tasks

- Feature set development (100% complete)
- Database optimization (95% complete)
- Security audit (85% complete)
- Documentation draft (75% complete)

## Next Steps

We are on track to launch by the end of Q1. The following items remain:
1. Complete final security review
2. Finish comprehensive documentation
3. Conduct user acceptance testing
4. Deploy to production environment

## Timeline

- March 15: Security review completion
- March 22: Documentation final review
- March 29: User acceptance testing
- April 5: Production deployment

Please let me know if you have any questions or concerns regarding this timeline.

Best regards,
Project Manager
Company Name`;

const faqItems: FAQItem[] = [
  { question: "How do I convert an email to PDF?", answer: "Copy your email content, paste it into our converter, and download as PDF. Perfect for preserving important emails and correspondence." },
  { question: "Can I convert multiple emails?", answer: "Yes! Copy multiple email threads and paste them together into the converter, then download as one PDF." },
  { question: "Is email content secure when converting?", answer: "Completely secure. All conversion happens in your browser. No emails are uploaded to any server." },
  { question: "Can I format emails with custom fonts?", answer: "Yes. Choose from multiple font families and sizes to create professional-looking email PDFs." },
  { question: "Why convert emails to PDF?", answer: "PDFs are great for archiving emails, creating permanent records, sharing without changes, and professional documentation." }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Email to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
};

export default function EmailToPdfConverter() {
  useSEO({
    title: "Email to PDF Converter Online Free – Convert Emails to PDF | Pixocraft",
    description: "Convert emails to PDF instantly with Pixocraft. Free, private, and fast email to PDF converter. Archive important emails as professional PDF documents. No uploads required.",
    keywords: "email to pdf, convert email to pdf, email to pdf converter, save email as pdf, email pdf",
    canonicalUrl: "https://tools.pixocraft.in/tools/email-to-pdf",
    ogTitle: "Email to PDF Converter Online Free – Convert Emails to PDF | Pixocraft",
    ogDescription: "Convert emails to PDF instantly. Free, private, and fast email to PDF converter. Archive important emails.",
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
            <span className="text-foreground font-medium">Email to PDF</span>
          </div>

          <div className="text-center space-y-8 mb-16 relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/30 shadow-lg">
                <Type className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert Email to PDF Online Free
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
                Archive Emails
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Preserve Records
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Easy Sharing
              </Badge>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground/60 pt-1">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
              Used by 10,000+ users daily
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="email-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Why Convert Emails to PDF?</h2>
              <p className="text-muted-foreground leading-relaxed">Converting emails to PDF creates permanent, tamper-proof records of important correspondence. Emails stored as PDFs cannot be accidentally modified and are compatible with any device.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Email Archiving Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { title: "Legal compliance", desc: "Create audit trails and maintain records for compliance requirements.", icon: ShieldCheck },
                  { title: "Easy sharing", desc: "Share emails without forwarding or revealing email addresses.", icon: Globe },
                  { title: "Permanent records", desc: "PDFs preserve emails unchanged for future reference.", icon: Download },
                  { title: "Professional appearance", desc: "Convert casual emails into formal archived documents.", icon: Type },
                  { title: "Protection", desc: "PDF archives protect content from accidental deletion.", icon: Zap },
                  { title: "Organization", desc: "Group related emails into single PDF documents.", icon: ShieldCheck }
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <benefit.icon className="w-12 h-12 text-primary mb-6" />
                    <h3 className="font-bold text-lg mb-3">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Email Types to Archive</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["Business correspondence", "Project updates", "Contract agreements", "Approval notifications", "Important receipts", "Confirmation emails"].map((type, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{type}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {faqItems.map((faq, i) => (
                  <Card key={i} className="border-none shadow-none bg-muted/20">
                    <CardHeader><CardTitle className="text-lg">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground leading-relaxed">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-primary/5 rounded-3xl p-12 border border-primary/10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Archive Your Emails Today</h2>
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
