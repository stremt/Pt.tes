import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# Markdown Formatting Guide

## Introduction
Markdown is a lightweight markup language that allows you to create formatted documents using simple syntax.

## Key Features

### Headings
You can create headings of different levels using # symbols.

### Text Formatting
- **Bold text** for emphasis
- *Italic text* for styling
- ~~Strikethrough~~ for deleted content

### Lists
1. Ordered items go here
2. Like numbered lists
3. Perfect for documentation

### Code Blocks
\`\`\`javascript
function helloWorld() {
  console.log("Hello, World!");
}
\`\`\`

### Tables

| Feature | Support | Status |
|---------|---------|--------|
| Markdown | Yes | Active |
| Images | Yes | Active |
| Tables | Yes | Active |

### Mathematical Equations
Inline math: $E = mc^2$

Display equation:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

### Blockquotes
> This is a blockquote. It's great for highlighting important information or citations.

---

## Conclusion
Markdown provides a simple yet powerful way to create formatted documents that convert beautifully to PDF.`;

const faqItems: FAQItem[] = [
  {
    question: "What is Markdown?",
    answer: "Markdown is a lightweight markup language that uses simple symbols and formatting to structure text. It's easy to write and can be converted to PDF, HTML, and other formats."
  },
  {
    question: "Can I convert Markdown to PDF for free?",
    answer: "Yes! Pixocraft provides a completely free Markdown to PDF converter that works in your browser with no file uploads required."
  },
  {
    question: "Does this tool support advanced Markdown features?",
    answer: "Yes. Our converter supports headings, lists, tables, code blocks, blockquotes, bold/italic text, strikethrough, and even mathematical equations."
  },
  {
    question: "Can I add images in Markdown?",
    answer: "Yes. You can embed images using Markdown syntax and they will be included in your PDF output."
  },
  {
    question: "Is my Markdown content secure when converting?",
    answer: "Absolutely. All conversion happens locally in your browser. Your content is never uploaded to any server."
  }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Markdown to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free"
  }
};

export default function MarkdownToPdfConverter() {
  useSEO({
    title: "Markdown to PDF Converter Online Free – Convert MD Files to PDF | Pixocraft",
    description: "Convert Markdown to PDF instantly with Pixocraft. Professional Markdown to PDF converter supporting tables, images, code blocks, and math equations. Free and private.",
    keywords: "markdown to pdf, convert markdown to pdf, md to pdf, markdown to pdf converter, markdown pdf generator, markdown to pdf online",
    canonicalUrl: "https://tools.pixocraft.in/tools/markdown-to-pdf",
    ogTitle: "Markdown to PDF Converter Online Free – Convert MD Files to PDF | Pixocraft",
    ogDescription: "Convert Markdown to PDF instantly with Pixocraft. Professional Markdown to PDF converter supporting tables, images, code blocks, and math equations.",
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
            <span className="text-foreground font-medium">Markdown to PDF</span>
          </div>

          <div className="text-center space-y-8 mb-16 relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/30 shadow-lg">
                <Type className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert Markdown to PDF Online Free
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Transform Markdown documents into professional PDFs with tables, images, and equations
                <span className="block mt-2 font-semibold text-primary text-base">100% Private • Offline • Free</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Tables & Lists
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Math Equations
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Code Blocks
              </Badge>
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="markdown-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-24 space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">What is Markdown and How to Convert to PDF?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>Markdown is a lightweight markup language that allows you to write formatted text using simple symbols. With Pixocraft's Markdown to PDF converter, you can instantly transform your Markdown files into professional PDF documents.</p>
                <p>Whether you're converting documentation, technical notes, or formatted content, our converter handles all Markdown features including headers, lists, tables, code blocks, images, and even mathematical equations.</p>
                <p>The conversion happens entirely in your browser, meaning your content stays completely private and the process is blazingly fast.</p>
              </div>
            </section>

            <section className="bg-muted/30 p-10 rounded-3xl border">
              <h2 className="text-3xl font-bold mb-8">How to Convert Markdown to PDF</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { step: "1", title: "Prepare your Markdown", desc: "Open your .md file or write Markdown directly in the editor." },
                  { step: "2", title: "Enable Markdown mode", desc: "Check the Markdown checkbox to enable formatting support." },
                  { step: "3", title: "Customize formatting", desc: "Choose font, size, and page orientation for your PDF." },
                  { step: "4", title: "Download PDF", desc: "Click Download PDF to create your professional document." }
                ].map((s) => (
                  <div key={s.step} className="flex gap-5">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg">{s.step}</div>
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-2">{s.title}</h3>
                      <p className="text-muted-foreground">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Markdown Features Supported</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  { title: "Headings", desc: "Multiple levels of headers (h1 through h6)" },
                  { title: "Text Styling", desc: "Bold, italic, strikethrough, and more" },
                  { title: "Lists", desc: "Ordered, unordered, and nested lists" },
                  { title: "Tables", desc: "Properly formatted markdown tables" },
                  { title: "Code Blocks", desc: "Syntax-highlighted code with language support" },
                  { title: "Images", desc: "Embed images directly in your document" },
                  { title: "Blockquotes", desc: "Highlighted quotes and callouts" },
                  { title: "Math Equations", desc: "LaTeX-formatted mathematical equations" }
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-card rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Why Convert Markdown to PDF?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Professional formatting", desc: "Transform plain Markdown into beautifully formatted documents.", icon: ShieldCheck },
                  { title: "Universal sharing", desc: "PDF files are readable on any device without Markdown viewers.", icon: Globe },
                  { title: "Preservation", desc: "PDFs preserve your formatting exactly as intended.", icon: Download },
                  { title: "Easy distribution", desc: "Share professional documents with anyone, anywhere.", icon: Type },
                  { title: "Documentation", desc: "Perfect for creating polished documentation from Markdown files.", icon: Zap },
                  { title: "Archive format", desc: "PDFs are ideal for long-term storage of formatted content.", icon: ShieldCheck }
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <benefit.icon className="w-12 h-12 text-primary mb-6" />
                    <h3 className="font-bold text-lg mb-3 leading-tight">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
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
              <h2 className="text-3xl font-bold mb-6">Convert Your Markdown to PDF Today</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Use the Pixocraft Markdown to PDF converter above to transform your markdown files into professional PDF documents instantly, completely free.
              </p>
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
