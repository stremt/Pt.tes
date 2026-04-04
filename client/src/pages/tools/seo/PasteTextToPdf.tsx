import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `Quick Snippet - Project Notes

Team Meeting Summary
Date: March 7, 2026

Attendees: John, Sarah, Mike, Lisa

Discussion Points:
- Q2 roadmap planning complete
- Budget allocation approved
- Team expansion hiring underway
- New office space lease signed

Action Items:
- John: Prepare technical specifications
- Sarah: Schedule vendor meetings  
- Mike: Update project timeline
- Lisa: Coordinate team training

Next Meeting: March 14, 2026

Key Takeaway: All departments aligned on Q2 objectives. Budget approved. Ready to execute.`;

const faqItems: FAQItem[] = [
  { question: "How do I paste text to PDF?", answer: "Simply copy your text from any source, paste it into the editor, and click Download PDF." },
  { question: "Can I paste from different sources?", answer: "Yes! Paste from emails, chat, documents, web pages, or anywhere else. Our tool handles all text formats." },
  { question: "Is pasted content kept private?", answer: "Completely private. All pasting and conversion happens in your browser. No data is sent to any server." },
  { question: "What happens if I paste formatted text?", answer: "Enable Markdown mode to preserve formatting. Otherwise, basic text will be preserved as-is." },
  { question: "Can I edit before converting?", answer: "Yes! Edit your pasted content directly in the editor before downloading as PDF." }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Paste Text to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD", "description": "Free" }
};

export default function PasteTextToPdf() {
  useSEO({
    title: "Paste Text to PDF Online Free – Convert Copied Text to PDF Instantly | Pixocraft",
    description: "Paste text to PDF instantly with Pixocraft. Convert copied text, chat messages, notes, or emails into professional PDF documents online for free. Private, fast, and browser-based.",
    keywords: "paste text to pdf, convert copied text to pdf, text to pdf online, copy paste to pdf, free pdf converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/paste-text-to-pdf",
    ogTitle: "Paste Text to PDF Online Free – Convert Copied Text to PDF Instantly | Pixocraft",
    ogDescription: "Paste text to PDF instantly with Pixocraft. Convert copied text, chat messages, notes, or emails into professional PDF documents online for free.",
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
            <span className="text-foreground font-medium">Paste Text to PDF</span>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Zap className="h-3 w-3" />
              Free · No Signup · Instant Download
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              Paste Text to PDF Online Free
              <span className="block text-primary mt-1">(Instant, No Signup)</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-3">
              Convert copied text into a clean, professional PDF in seconds — no login, no uploads, no waiting.
            </p>
            <p className="text-base font-bold text-primary mb-4 tracking-wide">
              Copy → Paste → Download in seconds
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
                Copy &amp; Paste
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Any Source
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Takes 5 Seconds
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                100% Private
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

          <TextToPdfTool sampleText={sampleText} storageKey="paste-text-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-0">
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Paste & Convert Text to PDF Instantly</h2>
              <p className="text-muted-foreground leading-relaxed">Pixocraft's paste to PDF converter is the fastest way to convert copied content into professional documents. Whether you're pasting from emails, chat, web pages, or documents, we handle it instantly. This is the easiest way to <strong>convert copied text to PDF online free without signup</strong>.</p>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">What You Can Paste & Convert</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {["Copied snippets from web", "Email content and threads", "Chat conversations", "Document excerpts", "Meeting notes", "Code snippets"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-xl sm:rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Why Use Paste to PDF?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Instant conversion", desc: "Convert immediately after pasting.", icon: Download },
                  { title: "Completely free", desc: "No registration, no limits, no costs.", icon: Zap },
                  { title: "Browser-based", desc: "Works on any device without downloads.", icon: Globe },
                  { title: "Private & secure", desc: "No uploads or data collection.", icon: ShieldCheck },
                  { title: "Easy workflow", desc: "Copy, paste, download - three steps.", icon: Type },
                  { title: "Format control", desc: "Choose fonts, sizes, and styling.", icon: ShieldCheck }
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Start Pasting & Converting Today</h2>
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
