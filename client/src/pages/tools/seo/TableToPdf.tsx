import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# Sales Report - Q1 2026

## Executive Summary
Quarterly performance report showing sales data, regional breakdown, and product performance.

## Sales by Region

| Region | Q1 Sales | Growth | Target | Status |
|--------|----------|--------|--------|--------|
| North | $125,000 | 15% | $110,000 | ✓ Exceeded |
| South | $98,500 | 8% | $95,000 | ✓ Exceeded |
| East | $142,300 | 12% | $130,000 | ✓ Exceeded |
| West | $156,200 | 18% | $140,000 | ✓ Exceeded |
| **Total** | **$522,000** | **13%** | **$475,000** | **✓ Exceeded** |

## Product Performance

| Product | Units | Revenue | Margin | Growth |
|---------|-------|---------|--------|--------|
| Product A | 1,250 | $187,500 | 35% | 22% |
| Product B | 890 | $178,000 | 28% | 15% |
| Product C | 645 | $129,000 | 40% | 8% |
| Product D | 420 | $84,000 | 32% | 5% |
| Product E | 320 | $64,000 | 25% | 12% |

## Monthly Breakdown

| Month | January | February | March |
|-------|---------|----------|-------|
| Sales | $165,000 | $168,500 | $188,500 |
| Units | 1,850 | 1,920 | 2,125 |
| Avg Deal | $89 | $88 | $89 |

## Insights

- All regions exceeded targets
- Product A driving significant revenue
- Growth trends positive across all categories
- Market conditions favorable for Q2`;

const faqItems: FAQItem[] = [
  { question: "How do I convert Markdown tables to PDF?", answer: "Write your table in Markdown format, enable Markdown mode, and click Download PDF. Tables render cleanly with proper borders and formatting." },
  { question: "Can I format tables with colors?", answer: "Markdown tables render with standard borders. Enable Markdown mode for best table rendering in the PDF." },
  { question: "What if my table is very large?", answer: "Large tables automatically span across pages. The converter handles page breaks intelligently to preserve table readability." },
  { question: "Can I create complex tables?", answer: "Markdown supports standard table syntax with multiple columns and rows. Complex nested tables work perfectly." },
  { question: "Are table borders preserved in PDF?", answer: "Yes. Table borders, alignment, and formatting are preserved exactly as written in the Markdown syntax." }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Table to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
};

export default function TableToPdf() {
  useSEO({
    title: "Table to PDF Converter Online – Convert Markdown Tables to PDF | Pixocraft",
    description: "Convert tables to PDF instantly using Pixocraft. Transform Markdown tables or structured text tables into clean, professional PDF documents directly in your browser.",
    keywords: "table to pdf, convert table to pdf, markdown table to pdf, convert markdown tables to pdf, table pdf converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/table-to-pdf",
    ogTitle: "Table to PDF Converter Online – Convert Markdown Tables to PDF | Pixocraft",
    ogDescription: "Convert tables to PDF instantly using Pixocraft. Transform Markdown tables or structured text tables into clean, professional PDF documents directly in your browser.",
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
            <span className="text-foreground font-medium">Tables to PDF</span>
          </div>

          <div className="text-center space-y-8 mb-16 relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/30 shadow-lg">
                <Type className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert Tables to PDF Online
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Transform Markdown tables into clean, professional PDF documents
                <span className="block mt-2 font-semibold text-primary text-base">100% Private • Offline • Free</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Markdown Tables
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Clean Formatting
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Multi-Page Support
              </Badge>
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="table-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-0">
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Convert Tables to Professional PDFs</h2>
              <p className="text-muted-foreground leading-relaxed">Create professional PDF documents from Markdown tables. Perfect for reports, data summaries, financial statements, and any structured data that needs to be shared as a PDF.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Table Types We Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["Sales reports", "Budget tables", "Comparison matrices", "Product listings", "Pricing tables", "Data analysis"].map((type, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-xl sm:rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{type}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Table to PDF Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Clean formatting", desc: "Tables render with perfect borders and alignment.", icon: Download },
                  { title: "Easy sharing", desc: "Share professional documents with stakeholders.", icon: Zap },
                  { title: "Multi-page support", desc: "Large tables automatically span multiple pages.", icon: Globe },
                  { title: "Data integrity", desc: "Table structure and data are preserved perfectly.", icon: ShieldCheck },
                  { title: "Professional appearance", desc: "Create publication-quality table PDFs.", icon: Type },
                  { title: "No server uploads", desc: "All processing happens in your browser.", icon: ShieldCheck }
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Convert Your Tables Today</h2>
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
