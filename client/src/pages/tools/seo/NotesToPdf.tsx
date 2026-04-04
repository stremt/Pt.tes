import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# Biology: Photosynthesis Study Notes

## Topic Overview
Photosynthesis is the process by which plants use sunlight to synthesize nutrients.

## Key Concepts

### Light-Dependent Reactions
- Occur in the thylakoid membrane
- Require sunlight to proceed
- Produce ATP and NADPH

### Light-Independent Reactions (Calvin Cycle)
- Occur in the stroma
- Use ATP and NADPH from light reactions
- Produce glucose

## Important Formulas
\`\`\`
6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂
\`\`\`

## Key Terms
- **Chlorophyll**: Green pigment that absorbs light
- **Stroma**: Fluid-filled space in chloroplasts
- **Thylakoid**: Flattened sac containing chlorophyll

## Study Tips
1. Create visual diagrams
2. Practice equations regularly
3. Understand the two-stage process

## Quiz Questions
- What is the role of chlorophyll in photosynthesis?
- How do the light-dependent and light-independent reactions differ?
- What products are essential for the Calvin Cycle?`;

const faqItems: FAQItem[] = [
  {
    question: "How do I convert my study notes to PDF?",
    answer: "Simply copy your notes and paste them into our converter. You can use Markdown formatting for better structure, then download as a professional PDF."
  },
  {
    question: "Can I use Markdown in my notes?",
    answer: "Yes! We support full Markdown formatting including headings, lists, tables, and code blocks, perfect for study notes."
  },
  {
    question: "Is this notes to PDF converter free?",
    answer: "Completely free! No registration, no ads, no hidden costs. Your notes are processed entirely in your browser."
  },
  {
    question: "Can I convert lecture notes or handwritten notes?",
    answer: "You can convert typed lecture notes directly. For handwritten notes, you'll need to transcribe them first."
  },
  {
    question: "Is my study notes data private?",
    answer: "Yes! All conversion happens locally in your browser. Your notes are never uploaded to any server."
  }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Notes to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free"
  }
};

export default function NotesToPdfConverter() {
  useSEO({
    title: "Convert Notes to PDF Online Free – Study Notes to PDF Converter | Pixocraft",
    description: "Convert your study notes, lecture notes, or personal notes to PDF instantly with Pixocraft. Free, private, and fast notes to PDF converter. No uploads required.",
    keywords: "notes to pdf, study notes to pdf, convert notes to pdf, lecture notes to pdf, notes pdf converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/notes-to-pdf",
    ogTitle: "Convert Notes to PDF Online Free – Study Notes to PDF Converter | Pixocraft",
    ogDescription: "Convert your study notes to PDF instantly online. No signup, no upload. Perfect for students, lecture notes, and exam preparation.",
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
            <span className="text-foreground font-medium">Notes to PDF</span>
          </div>

          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Zap className="h-3 w-3" />
              Free · No Signup · Instant Download
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              Convert Notes to PDF Online Free
              <span className="block text-primary mt-1">(Instant, No Signup)</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-3">
              Turn your study notes into clean, professional PDFs in seconds — no login, no uploads, no waiting.
            </p>
            <p className="text-base font-bold text-primary mb-2 tracking-wide">
              Perfect for study notes, lecture notes, and exam preparation
            </p>
            <p className="text-base font-bold text-primary mb-4 tracking-wide">
              Copy → Paste → Download your notes as PDF instantly
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
                Markdown Support
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Formatted Output
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Takes 5 Seconds
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                100% Private
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Student Friendly
              </Badge>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">
              No email &bull; No login &bull; Start instantly
            </p>

            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground/60">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 inline-block" />
              Trusted by 10,000+ students daily worldwide
            </div>

            <div className="flex flex-col items-center gap-1 mt-5">
              <span className="text-xs text-muted-foreground/50 font-medium tracking-wide">Start converting below</span>
              <span className="text-muted-foreground/40 text-base animate-bounce">↓</span>
            </div>
          </div>

          <TextToPdfTool sampleText={sampleText} storageKey="notes-to-pdf-content" defaultMarkdown={true} />

          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-0">
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Why Convert Notes to PDF?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>Converting your notes to PDF is an excellent way to organize and preserve your study materials. PDFs provide a professional, structured format that looks consistent across all devices. This is the easiest way to <strong>convert study notes to PDF online free without signup</strong>.</p>
                <p>Students often use our notes to PDF converter to transform study notes, lecture notes, and research notes into shareable, printable documents for submission or archiving.</p>
                <p>Pixocraft's converter runs entirely in your browser, keeping your personal study notes completely private while delivering instant PDF generation.</p>
              </div>
            </section>

            <section className="bg-muted/30 p-10 rounded-3xl border">
              <h2 className="text-2xl sm:text-3xl font-bold mb-8">How to Convert Notes to PDF</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {[
                  { step: "1", title: "Copy your notes", desc: "Open your notes and copy the content." },
                  { step: "2", title: "Paste into editor", desc: "Paste your notes into the Pixocraft converter." },
                  { step: "3", title: "Format if needed", desc: "Add Markdown formatting or customize fonts and sizes." },
                  { step: "4", title: "Download PDF", desc: "Click \"Convert to PDF – Instant Download\" to save your professional PDF document." }
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
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Benefits for Students</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Easy organization", desc: "Convert scattered notes into one organized PDF document.", icon: ShieldCheck },
                  { title: "Professional appearance", desc: "Create polished documents suitable for submission or sharing.", icon: Globe },
                  { title: "Better readability", desc: "Format your notes for improved clarity and structure.", icon: Download },
                  { title: "Easy sharing", desc: "Send notes to study partners as professional PDFs.", icon: Type },
                  { title: "Archive for reference", desc: "Store your notes in a reliable, long-lasting PDF format.", icon: Zap },
                  { title: "No data collection", desc: "Your personal notes stay completely private on your device.", icon: ShieldCheck }
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-xl sm:rounded-2xl border shadow-sm hover:shadow-md transition-shadow">
                    <benefit.icon className="w-12 h-12 text-primary mb-6" />
                    <h3 className="font-bold text-lg mb-3 leading-tight">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Types of Notes You Can Convert</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  "Study notes for exams",
                  "Lecture notes from class",
                  "Research notes and citations",
                  "Meeting notes and minutes",
                  "Project notes and planning",
                  "Personal learning notes"
                ].map((type, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-xl sm:rounded-2xl border">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <p className="text-muted-foreground">{type}</p>
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
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Convert Your Study Notes Today</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Use the Pixocraft Notes to PDF converter above to transform your study materials into professional PDF documents instantly, completely free.
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
