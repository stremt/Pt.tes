import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, TableIcon, ImageIcon, Calculator, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `Plain Text File Example

This is a simple plain text document that demonstrates how the Pixocraft Text to PDF converter can transform a basic TXT file into a professional PDF document.

Key Points:
- Text files are simple and lightweight
- PDFs maintain consistent formatting
- Perfect for document sharing
- Works completely offline

Footer: Document created with Pixocraft Text to PDF Converter`;

const faqItems: FAQItem[] = [
  {
    question: "How do I convert a text file to PDF?",
    answer: "Simply open your TXT file, copy the content, and paste it into our editor. You can then customize fonts or use Markdown before downloading your professional PDF."
  },
  {
    question: "Can I convert TXT to PDF offline?",
    answer: "Yes! Once the page is loaded, you can disconnect from the internet and continue converting text to PDF. It's a 100% client-side tool."
  },
  {
    question: "Is this TXT to PDF converter safe?",
    answer: "Absolutely. Your privacy is our priority. All processing happens locally in your browser, meaning your text is never uploaded to any server or stored anywhere."
  },
  {
    question: "Can I customize the formatting of my TXT to PDF output?",
    answer: "Yes. You can choose font families, sizes, and enable Markdown formatting for more advanced styling options."
  },
  {
    question: "Does the TXT to PDF converter work on mobile?",
    answer: "Yes, Pixocraft Text to PDF is fully responsive and works perfectly on smartphones and tablets."
  }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft TXT to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free"
  }
};

export default function TxtToPdfConverter() {
  useSEO({
    title: "TXT to PDF Converter Online Free – Convert Text Files to PDF | Pixocraft",
    description: "Convert TXT files to PDF online with Pixocraft. Fast, private, and free text to PDF converter. No uploads required. Works on any device.",
    keywords: "txt to pdf, text file to pdf, convert txt to pdf, free txt to pdf converter, txt to pdf online",
    canonicalUrl: "https://tools.pixocraft.in/tools/txt-to-pdf",
    ogTitle: "TXT to PDF Converter Online Free – Convert Text Files to PDF | Pixocraft",
    ogDescription: "Convert TXT files to PDF online with Pixocraft. Fast, private, and free text to PDF converter. No uploads required. Works on any device.",
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
            <span className="text-foreground font-medium">TXT to PDF</span>
          </div>

          <div className="text-center space-y-6 mb-16">
            <div className="flex items-center justify-center mb-2">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center ring-8 ring-primary/5">
                <Type className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                Convert TXT to PDF Online Free
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Transform plain text files into professional PDFs instantly
                <span className="block mt-1 font-medium text-primary/80 text-lg">100% Private • Offline • Free</span>
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                No Uploads Required
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Works Offline
              </Badge>
              <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 hover-elevate py-1 px-3">
                Custom Formatting
              </Badge>
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="txt-to-pdf-content" />

          <div className="mt-24 space-y-20 max-w-5xl mx-auto border-t pt-20">
            <section className="space-y-6">
              <h2 className="text-3xl font-bold">What is TXT to PDF Conversion?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>TXT to PDF conversion transforms plain text files into Portable Document Format documents. TXT files are simple text-only documents without any formatting, while PDF files can preserve layout, formatting, and appearance across all devices.</p>
                <p>When you convert a TXT file to PDF, your plain text becomes a professional, shareable document that looks the same on Windows, macOS, Linux, Android, and iOS.</p>
                <p>Pixocraft provides a free, browser-based TXT to PDF converter that keeps your data completely private. The conversion happens entirely on your device with no server uploads.</p>
              </div>
            </section>

            <section className="bg-muted/30 p-10 rounded-3xl border">
              <h2 className="text-3xl font-bold mb-8">How to Convert TXT to PDF</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { step: "1", title: "Open your TXT file", desc: "Select your text file and copy the content." },
                  { step: "2", title: "Paste into editor", desc: "Paste your text into the Pixocraft editor window." },
                  { step: "3", title: "Customize formatting", desc: "Choose font, size, and other formatting options if desired." },
                  { step: "4", title: "Download PDF", desc: "Click Download PDF to save your file instantly." }
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
              <h2 className="text-3xl font-bold text-center">Why Convert TXT to PDF?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Professional appearance", desc: "PDFs look clean and official, perfect for business and academic use.", icon: ShieldCheck },
                  { title: "Universal compatibility", desc: "Open PDF files on any device without compatibility issues.", icon: Globe },
                  { title: "Easy sharing", desc: "Send PDFs with confidence that recipients see exactly what you intended.", icon: Download },
                  { title: "Better readability", desc: "PDFs preserve formatting and structure for improved readability.", icon: Type },
                  { title: "Reliable archiving", desc: "PDFs are ideal for long-term document storage and records management.", icon: Zap },
                  { title: "Secure format", desc: "PDFs are harder to edit accidentally compared to plain text files.", icon: ShieldCheck }
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
              <h2 className="text-3xl font-bold text-center">Use Cases for TXT to PDF Conversion</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  "Converting README files for distribution",
                  "Creating professional documents from notes",
                  "Archiving text files for long-term storage",
                  "Sharing code snippets as formatted documents",
                  "Converting exported data into PDF reports",
                  "Creating printable versions of text content"
                ].map((use, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-card rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{use}</p>
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
              <h2 className="text-3xl font-bold mb-6">Ready to Convert Your Text Files?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Use the Pixocraft Text to PDF converter above to transform your TXT files into professional PDF documents instantly, completely free.
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
