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
    canonicalUrl: "https://tools.pixocraft.in/tools/convert-text-to-pdf",
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

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Zap className="h-3 w-3" />
              Free · No Upload · Instant Download
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              Convert TXT to PDF Online Free
              <span className="block text-primary mt-1">(Instant, No Signup)</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-3">
              Convert your .txt files into clean, professional PDFs in seconds — no upload, no login, no waiting.
            </p>
            <p className="text-base font-bold text-primary mb-2 tracking-wide">
              Perfect for TXT files, logs, code snippets, and exported data
            </p>
            <div className="flex items-center justify-center gap-1.5 text-sm font-semibold text-primary mb-6">
              <Zap className="h-3.5 w-3.5" />
              Takes less than 5 seconds
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
              <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
                Instant PDF Generator
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                TXT File Support
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                No Uploads Required
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Works Offline
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Custom Formatting
              </Badge>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">
              No email &bull; No login &bull; Start instantly
            </p>

            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground/60">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
              Trusted by 10,000+ users daily worldwide
            </div>

            <div className="flex flex-col items-center gap-1 mt-5">
              <span className="text-xs text-muted-foreground/50 font-medium tracking-wide">Start converting below</span>
              <span className="text-muted-foreground/40 text-base animate-bounce">↓</span>
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="txt-to-pdf-content" />

          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-0">
            <section className="space-y-4 sm:space-y-7 bg-gradient-to-r from-primary/5 to-transparent rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-primary/10">
              <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold">What is TXT to PDF Conversion?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p>TXT to PDF conversion transforms plain text files into Portable Document Format documents. TXT files are simple text-only documents without any formatting, while PDF files can preserve layout, formatting, and appearance across all devices. This is the easiest way to <strong>convert TXT to PDF online free without upload or signup</strong>.</p>
                <p>When you convert a TXT file to PDF, your plain text becomes a professional, shareable document that looks the same on Windows, macOS, Linux, Android, and iOS.</p>
                <p>Pixocraft provides a free, browser-based TXT to PDF converter that keeps your data completely private. The conversion happens entirely on your device with no server uploads.</p>
              </div>
            </section>

            <section className="bg-gradient-to-br from-muted/50 via-background to-muted/30 p-4 sm:p-8 lg:p-12 rounded-xl sm:rounded-3xl border border-primary/10 shadow-sm">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10">How to Convert TXT to PDF</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { step: "1", title: "Open your TXT file", desc: "Select your text file and copy the content." },
                  { step: "2", title: "Paste into editor", desc: "Paste your text into the Pixocraft editor window." },
                  { step: "3", title: "Customize formatting", desc: "Choose font, size, and other formatting options if desired." },
                  { step: "4", title: "Download PDF", desc: "Click \"Convert to PDF – Instant Download\" to save your file instantly." }
                ].map((s) => (
                  <div key={s.step} className="flex gap-5 group">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all">{s.step}</div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{s.title}</h3>
                      <p className="text-muted-foreground text-sm">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-6 sm:space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Why Convert TXT to PDF?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
                {[
                  { title: "Professional appearance", desc: "PDFs look clean and official, perfect for business and academic use.", icon: ShieldCheck },
                  { title: "Universal compatibility", desc: "Open PDF files on any device without compatibility issues.", icon: Globe },
                  { title: "Easy sharing", desc: "Send PDFs with confidence that recipients see exactly what you intended.", icon: Download },
                  { title: "Better readability", desc: "PDFs preserve formatting and structure for improved readability.", icon: Type },
                  { title: "Reliable archiving", desc: "PDFs are ideal for long-term document storage and records management.", icon: Zap },
                  { title: "Secure format", desc: "PDFs are harder to edit accidentally compared to plain text files.", icon: ShieldCheck }
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-7 bg-gradient-to-br from-card to-card/50 rounded-2xl border border-primary/10 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <benefit.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-bold text-base mb-3 leading-tight">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-3xl font-bold text-center">Use Cases for TXT to PDF Conversion</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                {[
                  "Converting README files for distribution",
                  "Creating professional documents from notes",
                  "Archiving text files for long-term storage",
                  "Sharing code snippets as formatted documents",
                  "Converting exported data into PDF reports",
                  "Creating printable versions of text content"
                ].map((use, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-gradient-to-r from-green-500/5 to-transparent rounded-xl border border-green-500/20 hover:border-green-500/40 hover:bg-gradient-to-r hover:from-green-500/10 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <p className="text-muted-foreground text-sm">{use}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-2xl p-8 border border-primary/5">
              <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {faqItems.map((faq, i) => (
                  <Card key={i} className="border border-primary/10 bg-gradient-to-br from-background to-muted/30 shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                    <CardHeader><CardTitle className="text-base font-semibold">{faq.question}</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground leading-relaxed text-sm">{faq.answer}</p></CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12 border border-primary/20 text-center shadow-sm">
              <h2 className="text-3xl font-bold mb-6">Ready to Convert Your Text Files?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Use the Pixocraft Text to PDF converter above to transform your TXT files into professional PDF documents instantly, completely free.
              </p>
              <Link href="/tools/text-to-pdf" className="inline-block">
                <Badge className="cursor-pointer hover-elevate py-2 px-6 text-base font-semibold bg-primary hover:bg-primary/90 transition-colors">
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
