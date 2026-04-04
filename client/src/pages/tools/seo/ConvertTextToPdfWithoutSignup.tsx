import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2, BookOpen, FileText, Mail, Code, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# My Document

Paste your text here and click "Convert to PDF – Instant Download".
No signup. No upload. No waiting.

## Section 1
Your content goes here...

## Section 2
More content here...`;

const faqItems: FAQItem[] = [
  {
    question: "Can I convert text to PDF without signup?",
    answer: "Yes — completely. Pixocraft requires zero signup, zero login, and zero email. Just paste your text and click Convert. Your PDF downloads instantly."
  },
  {
    question: "Is it safe to convert text without upload?",
    answer: "100% safe. Unlike other tools, Pixocraft never uploads your text to any server. Everything runs locally in your browser, so your content stays completely private."
  },
  {
    question: "Does this tool require login?",
    answer: "No login required, ever. There are no accounts, no plans, no paywalls. The tool is fully free and open — use it as many times as you want."
  },
  {
    question: "How fast is the conversion?",
    answer: "Under 5 seconds. Paste your text, click the button, and your PDF downloads immediately. There's no processing queue or waiting time."
  },
  {
    question: "Does it work on mobile?",
    answer: "Yes. The tool is fully responsive and works on any device — Android, iPhone, tablet, or desktop — without any app or install."
  }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Text to PDF Converter – No Signup",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free"
  }
};

const faqSchema2 = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(f => ({
    "@type": "Question",
    "name": f.question,
    "acceptedAnswer": { "@type": "Answer", "text": f.answer }
  }))
};

export default function ConvertTextToPdfWithoutSignup() {
  useSEO({
    title: "Convert Text to PDF Without Signup (Free, Instant, No Upload) | Pixocraft",
    description: "Convert text to PDF without signup instantly. No login, no upload, no waiting. Paste your text and download PDF in seconds — 100% free and private.",
    keywords: "convert text to pdf without signup, text to pdf no login, free text to pdf online no upload, instant pdf generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/convert-text-to-pdf-without-signup",
    ogTitle: "Convert Text to PDF Without Signup (Free, Instant, No Upload) | Pixocraft",
    ogDescription: "Convert text to PDF without signup instantly. No login, no upload, no waiting. Paste your text and download PDF in seconds — 100% free and private.",
    ogType: "website",
  });

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={faqSchema2} />
      <div className="min-h-screen bg-muted/30 py-12">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Breadcrumb */}
          <div className="mb-8 text-sm flex items-center gap-2 text-muted-foreground/80">
            <Link href="/" className="hover:text-primary transition-colors" data-testid="link-home">Home</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools" className="hover:text-primary transition-colors" data-testid="link-tools">Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/pdf" className="hover:text-primary transition-colors">PDF Tools</Link>
            <span className="opacity-50">/</span>
            <Link href="/tools/text-to-pdf" className="hover:text-primary transition-colors">Text to PDF</Link>
            <span className="opacity-50">/</span>
            <span className="text-foreground font-medium">No Signup</span>
          </div>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Zap className="h-3 w-3" />
              No Signup · No Upload · Instant Download
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              Convert Text to PDF Without Signup
              <span className="block text-primary mt-1">(Instant &amp; Free)</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-3">
              Paste your text and download a clean, professional PDF instantly — no login, no email, no upload required.
            </p>
            <p className="text-base font-bold text-primary mb-2 tracking-wide">
              Copy → Paste → Download in seconds
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Works instantly in your browser — no installation needed
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
                Zero Signup
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                No Upload
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                100% Private
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Free Forever
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

          {/* Tool — immediately after hero */}
          <div className="mb-4 text-center">
            <span className="text-sm font-semibold text-primary">Start converting your text now</span>
          </div>
          <TextToPdfTool sampleText={sampleText} storageKey="no-signup-pdf-content" defaultMarkdown={true} />

          {/* SEO Content */}
          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-0">

            {/* Featured Snippet */}
            <section className="bg-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-6 sm:p-10 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Convert Text to PDF Without Signup (Quick Answer)</h2>
              <ol className="space-y-4">
                {[
                  "Paste your text into the editor above",
                  "Click \"Convert to PDF – Instant Download\"",
                  "Download your PDF instantly"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                    <p className="text-foreground font-medium leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-muted-foreground font-medium">No signup, no email, no upload — works instantly.</p>
            </section>

            {/* Problem → Solution */}
            <section className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Why Use a No-Signup Text to PDF Converter?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 p-6 bg-card border rounded-xl">
                  <div className="flex items-center gap-2 text-destructive font-semibold">
                    <AlertTriangle className="h-5 w-5" />
                    The problem with other tools
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Force you to create an account before converting",
                      "Require you to upload your file to their servers",
                      "Slow processing with queues and wait times",
                      "Show ads or watermark your output",
                      "Charge after a free trial runs out"
                    ].map((pain, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                        {pain}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 p-6 bg-card border border-primary/20 rounded-xl">
                  <div className="flex items-center gap-2 text-primary font-semibold">
                    <CheckCircle2 className="h-5 w-5" />
                    The Pixocraft solution
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Zero signup — open and convert instantly",
                      "No upload — everything runs in your browser",
                      "Instant results — PDF in under 5 seconds",
                      "Clean output — no watermarks, no ads",
                      "Free forever — no plans, no credits"
                    ].map((fix, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {fix}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Pixocraft solves this by providing instant, browser-based conversion with zero signup. This is the easiest way to <strong>convert text to PDF without signup, upload, or login</strong> — completely free. This is the fastest way to <strong>convert text to PDF without signup online free</strong>.
              </p>
            </section>

            {/* Benefits */}
            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Benefits of Converting Text to PDF Without Signup</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "No account required", desc: "Open the tool and start converting immediately. No forms, no verification, no waiting.", icon: ShieldCheck },
                  { title: "100% private", desc: "Your text never leaves your device. Zero uploads, zero data collection, zero risk.", icon: Globe },
                  { title: "Instant results", desc: "Click once and your PDF downloads immediately. No queue, no processing delay.", icon: Zap },
                  { title: "Works on any device", desc: "Mobile, tablet, desktop — any OS, any browser. No installs required.", icon: Type },
                  { title: "Free forever", desc: "No trial periods, no watermarks, no hidden fees. Completely free with no limits.", icon: Download },
                  { title: "Professional output", desc: "Clean, formatted PDFs with font control, Markdown support, and structured layout.", icon: CheckCircle2 }
                ].map((benefit, i) => (
                  <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-xl sm:rounded-2xl border shadow-sm">
                    <benefit.icon className="w-10 h-10 text-primary mb-5" />
                    <h3 className="font-bold text-base mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Use Cases */}
            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">When You Need This Tool</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  { label: "Quick document creation on the go", icon: Zap },
                  { label: "Copy-paste text from any source", icon: FileText },
                  { label: "Study and lecture notes to PDF", icon: BookOpen },
                  { label: "Emails and messages to PDF", icon: Mail },
                  { label: "Code snippets as formatted documents", icon: Code },
                  { label: "Exported data and log files", icon: Download }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-card rounded-xl sm:rounded-2xl border">
                    <item.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <p className="text-muted-foreground font-medium">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
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

            {/* Internal Linking */}
            <section className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">Related Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Text to PDF Converter", href: "/tools/text-to-pdf", desc: "Full-featured converter with live preview and formatting." },
                  { label: "Paste Text to PDF", href: "/tools/paste-text-to-pdf", desc: "Convert copied text to PDF instantly." },
                  { label: "Notes to PDF", href: "/tools/notes-to-pdf", desc: "Perfect for study notes and lecture content." }
                ].map((link, i) => (
                  <Link key={i} href={link.href}>
                    <div className="p-5 bg-card border rounded-xl hover-elevate cursor-pointer h-full">
                      <p className="font-semibold text-primary mb-1">{link.label}</p>
                      <p className="text-sm text-muted-foreground">{link.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
