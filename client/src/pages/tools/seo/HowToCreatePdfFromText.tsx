import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { TextToPdfTool } from "@/components/tools/TextToPdfTool";
import { ShieldCheck, Globe, Type, Download, Zap, CheckCircle2, BookOpen, FileText, Mail, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sampleText = `# My Notes

Type or paste your text here and click "Convert to PDF – Instant Download" to get your PDF in seconds.

## Section 1
Your content goes here...

## Section 2
More content here...`;

const faqItems: FAQItem[] = [
  {
    question: "How to create PDF from text online free without signup?",
    answer: "Simply paste your text into the Pixocraft editor above and click \"Convert to PDF – Instant Download\". No signup, no email, no upload required — it's 100% free and works instantly in your browser."
  },
  {
    question: "Can I convert copied text to PDF instantly?",
    answer: "Yes! Copy any text from anywhere — emails, notes, websites, documents — paste it into the editor, and download your PDF in seconds. No account needed."
  },
  {
    question: "Is it safe to convert text to PDF online?",
    answer: "Completely safe. Pixocraft processes everything locally in your browser. Your text is never uploaded to any server or stored anywhere. 100% private."
  },
  {
    question: "Does this work on mobile and tablet?",
    answer: "Yes. The tool is fully responsive and works on any device — Android, iPhone, tablet, or desktop — without installing any software."
  },
  {
    question: "Can I format my text before converting to PDF?",
    answer: "Yes! You can use Markdown formatting — headings, bold, lists, tables, code blocks — and customize font size and family before downloading your PDF."
  }
];

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Pixocraft Text to PDF Converter",
  "operatingSystem": "Web",
  "applicationCategory": "UtilityApplication",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "description": "Free"
  }
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Create PDF from Text Online Free",
  "description": "Convert any text into a professional PDF in seconds using Pixocraft. No signup, no upload required.",
  "totalTime": "PT1M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Paste your text",
      "text": "Copy your text from any source and paste it into the Pixocraft editor."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Format (optional)",
      "text": "Add Markdown formatting or customize fonts and sizes if needed."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Convert to PDF",
      "text": "Click the \"Convert to PDF – Instant Download\" button."
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Download your PDF",
      "text": "Your PDF downloads instantly to your device. No signup required."
    }
  ]
};

export default function HowToCreatePdfFromText() {
  useSEO({
    title: "How to Create PDF from Text Online Free (No Signup, Instant) | Pixocraft",
    description: "Learn how to create a PDF from text online for free in seconds. No signup, no upload required. Follow simple steps and convert text to PDF instantly.",
    keywords: "how to create pdf from text, text to pdf online free, convert text to pdf without signup, create pdf from text online",
    canonicalUrl: "https://tools.pixocraft.in/tools/how-to-create-pdf-from-text",
    ogTitle: "How to Create PDF from Text Online Free (No Signup, Instant) | Pixocraft",
    ogDescription: "Learn how to create a PDF from text online for free in seconds. No signup, no upload required. Convert text to PDF instantly with Pixocraft.",
    ogType: "website",
  });

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={faqSchema} />
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
            <span className="text-foreground font-medium">How to Create PDF from Text</span>
          </div>

          {/* Hero */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Zap className="h-3 w-3" />
              Free · No Signup · Instant Download
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-4">
              How to Create PDF from Text Online Free
              <span className="block text-primary mt-1">(Step-by-Step Guide)</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed mb-3">
              Turn any text into a clean, professional PDF in seconds — no signup, no upload, no waiting.
            </p>
            <p className="text-base font-bold text-primary mb-4 tracking-wide">
              Copy → Paste → Download your PDF in seconds
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
                No Signup Required
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                No File Upload
              </Badge>
              <Badge variant="secondary" className="bg-primary/10 border-primary/30 hover-elevate font-medium">
                Markdown Support
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
              <span className="text-xs text-muted-foreground/50 font-medium tracking-wide">Try it now below</span>
              <span className="text-muted-foreground/40 text-base animate-bounce">↓</span>
            </div>
          </div>

          {/* Tool — placed immediately after hero */}
          <div className="mb-4 text-center">
            <span className="text-sm font-semibold text-primary">Try it now – create your PDF instantly</span>
          </div>
          <TextToPdfTool sampleText={sampleText} storageKey="how-to-create-pdf-from-text-content" defaultMarkdown={true} />

          {/* SEO Content */}
          <div className="mt-12 sm:mt-20 lg:mt-24 space-y-12 sm:space-y-16 lg:space-y-20 max-w-5xl mx-auto border-t pt-12 sm:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-0">

            {/* Featured Snippet Block */}
            <section className="bg-primary/5 border border-primary/20 rounded-xl sm:rounded-2xl p-6 sm:p-10 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold">How to Create PDF from Text Online (Quick Answer)</h2>
              <ol className="space-y-4">
                {[
                  "Paste your text into the editor above",
                  "Click \"Convert to PDF – Instant Download\"",
                  "Download your PDF instantly — no signup needed"
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm flex-shrink-0">{i + 1}</span>
                    <p className="text-foreground font-medium leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="text-sm text-muted-foreground">That's it. No account, no email, no file upload. Works in seconds on any device.</p>
              <p className="text-sm text-muted-foreground mt-3">
                Looking for the direct tool?{" "}
                <Link href="/tools/text-to-pdf" className="text-primary font-semibold hover:underline">
                  Use our Text to PDF converter instantly
                </Link>.
              </p>
            </section>

            {/* Detailed Guide */}
            <section className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Step-by-Step Guide to Convert Text to PDF</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                <p>Creating a PDF from text online has never been easier. This is the easiest way to <strong>create PDF from text online free without signup</strong>. Here's a detailed breakdown of each step:</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    step: "1",
                    title: "Paste your text",
                    desc: "Copy any text — from emails, notes, documents, websites, or code — and paste it into the editor above. The tool accepts plain text and Markdown."
                  },
                  {
                    step: "2",
                    title: "Format (optional)",
                    desc: "Use Markdown headings (#, ##), bold (**text**), lists, or tables to structure your content. You can also pick a font and size from the toolbar."
                  },
                  {
                    step: "3",
                    title: "Convert to PDF",
                    desc: "Click the \"Convert to PDF – Instant Download\" button. Your browser processes the conversion locally — nothing is ever sent to a server."
                  },
                  {
                    step: "4",
                    title: "Download instantly",
                    desc: "Your PDF file downloads immediately to your device. Open it, share it, print it — it works on any PDF reader, any device, any OS."
                  }
                ].map((s) => (
                  <div key={s.step} className="flex gap-5 p-6 bg-card rounded-xl border">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base flex-shrink-0">{s.step}</div>
                    <div>
                      <h3 className="font-bold text-base text-foreground mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits */}
            <section className="space-y-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-center">Why Create PDF from Text Online?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "No software required", desc: "Works entirely in your browser. No downloads, no installs, no plugins.", icon: Globe },
                  { title: "Works on any device", desc: "Mobile, tablet, desktop — Mac, Windows, Android, iPhone. All supported.", icon: Type },
                  { title: "100% private", desc: "Your text is never uploaded to any server. Conversion happens on your device.", icon: ShieldCheck },
                  { title: "Instant results", desc: "Click once and your PDF is ready. No waiting, no processing queue.", icon: Zap },
                  { title: "Professional output", desc: "Clean, formatted PDFs that look great on screen and when printed.", icon: Download },
                  { title: "Completely free", desc: "No plans, no credits, no watermarks. Free forever with no limits.", icon: CheckCircle2 }
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
              <h2 className="text-2xl sm:text-3xl font-bold text-center">When to Use This Tool</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {[
                  { label: "Study & lecture notes to PDF", icon: BookOpen },
                  { label: "Copy-paste text from any source", icon: FileText },
                  { label: "Emails and messages to PDF", icon: Mail },
                  { label: "Code snippets as formatted documents", icon: Code },
                  { label: "README and documentation files", icon: FileText },
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
                  { label: "Text to PDF Converter", href: "/tools/text-to-pdf", desc: "Full-featured text to PDF tool with live preview." },
                  { label: "Paste Text to PDF", href: "/tools/paste-text-to-pdf", desc: "Convert copied text to PDF instantly." },
                  { label: "Notes to PDF", href: "/tools/notes-to-pdf", desc: "Perfect for study and lecture notes." }
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
