import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# README.md - Project Documentation

## Project Overview
This is a comprehensive project documentation file that has been saved as a text file and now converted to PDF format.

## Installation

1. Clone the repository
2. Install dependencies
3. Configure environment variables
4. Run the application

## Features

- **Fast Processing**: Optimized algorithms for quick results
- **Secure**: Enterprise-grade encryption
- **Scalable**: Handles millions of requests
- **User-Friendly**: Intuitive interface

## Usage

\`\`\`
npm install
npm start
\`\`\`

## Configuration

Set up your environment variables in the .env file:

\`\`\`
API_KEY=your_key_here
DATABASE_URL=your_database_url
\`\`\`

## File Structure

- src/
  - components/
  - utils/
  - pages/
- public/
- tests/

## Contributing

We welcome contributions! Please read our contributing guidelines.

## License

MIT License - See LICENSE file for details`;

const faqItems: FAQItem[] = [
  { question: "How do I convert a text file to PDF?", answer: "Open your .txt file, copy its content, paste it into our converter, and click Download PDF." },
  { question: "Can I convert multiple text files?", answer: "Yes! Combine multiple text files into one document by copying their contents and pasting them together." },
  { question: "Does the converter support special characters?", answer: "Yes. Our converter handles all text characters and encoding formats perfectly." },
  { question: "Can I preserve line breaks from my text file?", answer: "Yes! Line breaks are automatically preserved in the PDF output." },
  { question: "Is my text file content secure?", answer: "Completely secure. Processing happens in your browser with zero server uploads." }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Text File to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
};

export default function TextFileToPdf() {
  useSEO({
    title: "Convert Text File to PDF Online Free – TXT Document to PDF Converter | Pixocraft",
    description: "Convert text files to PDF instantly with Pixocraft. Turn .txt documents into professional PDF files online for free. Supports Markdown, tables, images, and math formulas.",
    keywords: "text file to pdf, convert text file to pdf, txt to pdf online, txt document to pdf, free text converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/text-file-to-pdf",
    ogTitle: "Convert Text File to PDF Online Free – TXT Document to PDF Converter | Pixocraft",
    ogDescription: "Convert text files to PDF instantly with Pixocraft. Turn .txt documents into professional PDF files online for free. Supports Markdown, tables, images, and math formulas.",
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
            <span className="text-foreground font-medium">Text File to PDF</span>
          </div>

          <div className="text-center space-y-8 mb-16 relative">
            <div className="flex items-center justify-center mb-4">
              <div className="h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center ring-1 ring-primary/30 shadow-lg">
                <Type className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert Text Files to PDF Online
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
                .TXT Support
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                No File Upload
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

          <TextToPdfTool sampleText={sampleText} storageKey="text-file-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-0">
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Professional Text File Conversion</h2>
              <p className="text-muted-foreground leading-relaxed">Convert any .txt file into a professional PDF document without uploading to external servers. Pixocraft's text file converter runs entirely in your browser for maximum privacy and speed.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Text File Types We Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["Documentation files", "README files", "Code comments", "Configuration files", "Log files", "Export files"].map((type, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-xl sm:rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{type}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Why Convert Text Files to PDF?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Professional appearance", desc: "Transform plain text into polished documents.", icon: ShieldCheck },
                  { title: "Universal compatibility", desc: "PDFs work on any device without special software.", icon: Globe },
                  { title: "Secure format", desc: "PDFs prevent accidental modifications.", icon: Download },
                  { title: "Easy archiving", desc: "Long-term storage and document management.", icon: Zap },
                  { title: "Better sharing", desc: "Send professional documents to stakeholders.", icon: Type },
                  { title: "Formatting control", desc: "Customize fonts, sizes, and layout.", icon: ShieldCheck }
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Convert Your Text Files Today</h2>
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
