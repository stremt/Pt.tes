import { useState } from "react";
import { Link } from "wouter";
import {
  useSEO,
  StructuredData,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import SignatureToolSection from "@/components/SignatureToolSection";
import {
  Shield,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  BadgeCheck,
  Download,
  Smartphone,
  PenTool,
  FileText,
  Clock,
  Zap,
  Star,
  Trophy,
  Layers,
  ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/best-signature-generator-free";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Choose a tool based on your needs",
    desc: "Use this comparison guide to pick the right tool. For free everyday use with no login, choose a browser-based tool like Pixocraft. For legally certified e-signatures, choose DocuSign.",
  },
  {
    step: 2,
    title: "Open the tool and create your signature",
    desc: "Draw your signature freehand with a mouse or finger, type your name to generate a handwriting-style signature, or upload a photo of an existing signature.",
  },
  {
    step: 3,
    title: "Customise style to suit your use case",
    desc: "Adjust colour, font, or stroke thickness as needed. Most tools offer basic customisation on the free tier — check before committing to a paid plan.",
  },
  {
    step: 4,
    title: "Download and use your signature",
    desc: "Download as a transparent PNG and insert into any Word document, PDF, Google Doc, or email. Save it locally and reuse across unlimited documents.",
  },
];

const TOOLS = [
  {
    name: "Pixocraft",
    highlight: true,
    free: true,
    noLogin: true,
    private: true,
    speed: "Instant",
    quality: "High-res transparent PNG",
    pros: [
      "100% free, no limits",
      "No login or signup",
      "No data uploaded — fully browser-based",
      "Works on mobile and desktop",
      "Transparent PNG, no watermark",
    ],
    cons: [
      "No e-signature legal certificate",
    ],
    bestFor: "Anyone who needs a quick, private, high-quality signature for free",
  },
  {
    name: "Canva",
    highlight: false,
    free: false,
    noLogin: false,
    private: false,
    speed: "Moderate",
    quality: "Good (requires export)",
    pros: [
      "Wide design options",
      "Brand kit integration",
      "Good for styled email signatures",
    ],
    cons: [
      "Requires account signup",
      "Signature feature limited on free plan",
      "Signature data stored on servers",
      "Not designed specifically for signatures",
    ],
    bestFor: "Designers who need signatures as part of a broader branding kit",
  },
  {
    name: "DocuSign",
    highlight: false,
    free: false,
    noLogin: false,
    private: false,
    speed: "Slow (account setup)",
    quality: "Legally certified e-signature",
    pros: [
      "Legally binding e-signature",
      "Enterprise-grade audit trail",
      "Industry standard for contracts",
    ],
    cons: [
      "Expensive for individuals",
      "Overkill for basic signatures",
      "Requires signup and verification",
      "Not suitable for PNG downloads",
    ],
    bestFor: "Businesses needing legally certified e-signatures with audit trails",
  },
  {
    name: "Smallpdf",
    highlight: false,
    free: false,
    noLogin: false,
    private: false,
    speed: "Moderate",
    quality: "PDF-embedded only",
    pros: [
      "Good PDF workflow integration",
      "Easy to add signature to a PDF",
      "Mobile app available",
    ],
    cons: [
      "Free tier heavily limited (2 tasks/day)",
      "Requires account for full use",
      "Signature data processed on servers",
      "Cannot download standalone PNG",
    ],
    bestFor: "Users who specifically need to sign and return a PDF document",
  },
];

const FEATURES_TO_CHECK = [
  {
    icon: <Zap className="h-4 w-4 text-primary" />,
    title: "Ease of use",
    desc: "The best tool should have you creating and downloading a signature in under 30 seconds with no tutorials required.",
  },
  {
    icon: <Shield className="h-4 w-4 text-primary" />,
    title: "Privacy",
    desc: "Check whether the tool uploads your signature to a server. Browser-based tools are safest — your data stays on your device.",
  },
  {
    icon: <Clock className="h-4 w-4 text-primary" />,
    title: "Speed to download",
    desc: "Tools that require signup add 3–5 minutes before you even start creating. No-login tools let you download in under 60 seconds.",
  },
  {
    icon: <ImageIcon className="h-4 w-4 text-primary" />,
    title: "Output quality",
    desc: "Always choose a tool that exports a high-resolution transparent PNG — not a JPEG or low-DPI image that looks blurry in documents.",
  },
  {
    icon: <Smartphone className="h-4 w-4 text-primary" />,
    title: "Mobile compatibility",
    desc: "A good signature generator should work as well on a phone touchscreen as it does on a desktop with a mouse.",
  },
  {
    icon: <BadgeCheck className="h-4 w-4 text-primary" />,
    title: "No watermark",
    desc: "Many free tools add a watermark on the free tier. Check before committing — Pixocraft never adds a watermark on any download.",
  },
];

const USE_CASES = [
  { icon: <FileText className="h-4 w-4 text-primary" />, title: "Documents & forms", desc: "Sign job applications, consent forms, admission documents, and government paperwork." },
  { icon: <Layers className="h-4 w-4 text-primary" />, title: "PDF signing", desc: "Download your PNG signature and embed it in any PDF using a free PDF editor." },
  { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Email footers", desc: "Add a handwritten-style signature image to Gmail, Outlook, or any email client." },
  { icon: <FileText className="h-4 w-4 text-primary" />, title: "Contracts & invoices", desc: "Sign freelance contracts, GST invoices, and vendor agreements without printing." },
];

const COMPARISON_TABLE = [
  { tool: "Pixocraft", free: true, noLogin: true, privacy: "Browser-only", speed: "Instant", quality: "High-res PNG", highlight: true },
  { tool: "Canva", free: false, noLogin: false, privacy: "Server-stored", speed: "Moderate", quality: "Requires export", highlight: false },
  { tool: "DocuSign", free: false, noLogin: false, privacy: "Server-stored", speed: "Slow", quality: "Legal e-sign only", highlight: false },
  { tool: "Smallpdf", free: false, noLogin: false, privacy: "Server-processed", speed: "Moderate", quality: "PDF only", highlight: false },
];

const FAQS = [
  {
    question: "Which is the best free signature generator?",
    answer:
      "For most users, Pixocraft is the best free signature generator — it is 100% free with no limits, requires no login, runs entirely in your browser with no data uploaded, and downloads a high-resolution transparent PNG instantly. For legally certified e-signatures, DocuSign is the industry standard but is paid.",
  },
  {
    question: "Is a free signature generator safe to use?",
    answer:
      "It depends on the tool. Browser-based tools like Pixocraft are the safest — your signature never leaves your device. Server-based free tools (including many popular ones) upload your signature to their servers, where it can be stored, processed, or exposed in a breach. Always check whether the tool is browser-based or server-based.",
  },
  {
    question: "Do I need to pay for a good signature generator?",
    answer:
      "No — for everyday use like signing documents, PDFs, emails, and contracts, a free browser-based tool is fully sufficient. Paid tools (DocuSign, Adobe Sign) are necessary only if you need legally certified e-signatures with audit trails, which most individuals and small businesses do not require.",
  },
  {
    question: "What makes Pixocraft the best free signature generator?",
    answer:
      "Pixocraft combines four things no other free tool offers together: no login required, no data uploaded to any server, instant high-resolution transparent PNG download, and no watermark on any tier. Most free tools compromise on at least one of these — Pixocraft does not.",
  },
  {
    question: "Which free signature tool is the fastest?",
    answer:
      "Pixocraft is the fastest — no signup flow, no email verification, no onboarding. Open the page and you are creating your signature immediately. Most users download their signature in under 30 seconds. Tools like Canva and Smallpdf add 3–5 minutes for account creation before you can start.",
  },
  {
    question: "Which free signature generator is the most private?",
    answer:
      "Pixocraft is the most private free signature generator. The tool uses browser-based processing via the HTML5 Canvas API — your signature data never reaches any server. Canva, Smallpdf, and DocuSign all process or store data on their servers.",
  },
  {
    question: "Can I create a signature for free without signing up?",
    answer:
      "Yes — with Pixocraft. Open the tool, draw or type your signature, and download instantly. No account, no email, no verification step. Most other free tools require at minimum a signup to access the download feature.",
  },
  {
    question: "What is the best format to download a signature?",
    answer:
      "PNG with a transparent background is the best format. It overlays cleanly on any document regardless of background colour, is high resolution, and is supported by Word, PDF editors, Google Docs, and email clients. Avoid JPEG — it does not support transparency and compresses lossy, making signatures look blurry.",
  },
  {
    question: "How do I choose between free signature generators?",
    answer:
      "Check five things: (1) Does it require login? (2) Is data uploaded to a server? (3) Does it add a watermark? (4) What resolution does it export? (5) Does it work on mobile? Pixocraft passes all five. Most free tools fail at least two.",
  },
  {
    question: "Is Canva good for creating a signature?",
    answer:
      "Canva can create email signature templates but is not designed specifically for handwritten signatures. It requires an account, uploads data to their servers, and limits features on the free plan. For a standalone transparent PNG signature, a dedicated tool like Pixocraft is faster and simpler.",
  },
  {
    question: "When do I need a paid signature tool like DocuSign?",
    answer:
      "DocuSign is worth paying for when you need legally binding e-signatures with an audit trail — for instance, signed contracts between businesses, real estate transactions, or regulated documents. For personal use, everyday documents, GST invoices, and forms, a free browser-based tool is fully sufficient.",
  },
  {
    question: "Can I use a free signature generator on my phone?",
    answer:
      "Yes — Pixocraft is fully mobile-optimised. Draw with your finger on a touchscreen or type your name and pick a font. The same no-login, no-upload experience applies on Android and iPhone. No app installation required.",
  },
];

const RELATED_TOOLS = [
  { href: "/tools/signature-pad-tool", label: "Signature Generator", desc: "The main Pixocraft tool — full controls, 50+ fonts, instant download." },
  { href: "/tools/free-signature-generator-no-login", label: "Free Signature Generator No Login", desc: "Zero-signup, privacy-first signature creation." },
  { href: "/tools/online-signature-generator-without-upload", label: "Signature Generator Without Upload", desc: "Fully client-side — no data leaves your device in any form." },
  { href: "/tools/high-quality-signature-png-generator", label: "High Quality Signature PNG Generator", desc: "Max-resolution transparent PNG for print-quality signatures." },
];

export default function BestSignatureGeneratorFree() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Best Signature Generator Free (Top Tools Compared) | Pixocraft",
    description:
      "Compare the best free signature generators online. Find the fastest, most private, and easy-to-use tool. No login required. Honest comparison of Pixocraft, Canva, DocuSign & Smallpdf.",
    keywords:
      "best signature generator free, top signature generator online, free signature maker online best, which is best signature generator, signature generator comparison, best free digital signature tool, fastest signature generator, signature generator no login best, free signature maker comparison",
    canonicalUrl: CANONICAL,
    ogImage: "https://tools.pixocraft.in/images/best-signature-generator-free.png",
    ogTitle: "Best Signature Generator Free – Top Tools Compared",
    ogDescription: "Compare the best free signature generators: Pixocraft, Canva, DocuSign, Smallpdf. Find the fastest, most private, no-login option.",
    twitterTitle: "Best Free Signature Generator – Honest Comparison",
    twitterDescription: "Which is the best free signature generator? Honest comparison of top tools — features, privacy, speed, and quality.",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Best Signature Generator Free – Pixocraft",
    description:
      "The best free signature generator online — no login, no upload, instant transparent PNG download. Compared against Canva, DocuSign, and Smallpdf.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    applicationSubCategory: "Signature Generator Comparison",
    operatingSystem: "Web, iOS, Android",
    featureList: [
      "100% free",
      "No login required",
      "No data upload",
      "Instant download",
      "Transparent PNG",
      "No watermark",
      "Works on mobile",
      "Browser-based processing",
    ],
    offers: { price: "0", priceCurrency: "INR" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Best Signature Generator Free", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Best Signature Generator Free (Top Tools Compared) | Pixocraft",
    description:
      "Compare the best free signature generators online. Find the fastest, most private, and easy-to-use tool. Honest comparison of Pixocraft, Canva, DocuSign and Smallpdf.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Choose and Use the Best Free Signature Generator",
    description: "A generic guide to choosing the right signature generator based on your needs, creating your signature, and downloading it for use in any document.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.desc })),
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-5 sm:py-8">

        <Breadcrumb items={[
          { label: "Home", url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Generator", url: "/tools/signature-pad-tool" },
          { label: "Best Signature Generator Free" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Best Signature Generator Free (Top Tools Compared)
              </h1>
              <p className="hidden md:block text-sm text-muted-foreground">
                Compare the fastest, most private, and easiest free signature generators — and choose the right one for you.
              </p>
            </div>
          </div>

          {/* Featured Snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">
              What is the best free signature generator?
            </p>
            <p className="text-base text-foreground leading-relaxed">
              The <strong>best free signature generator</strong> combines ease of use, speed, and privacy — no login, no watermark, and a high-resolution transparent PNG output. After comparing the top tools on features, privacy, and speed,{" "}
              <strong>Pixocraft ranks #1</strong> for everyday free use. DocuSign leads for legal e-signatures but is paid.
            </p>
          </div>

          <p className="hidden md:block text-base text-muted-foreground mb-5 leading-relaxed">
            Searching for the best free signature generator can be confusing — there are dozens of options, each
            claiming to be the best. This page gives you an <strong>honest comparison of tools</strong> — evaluated
            objectively <strong>based on features</strong>, privacy, speed, and output quality — so you can choose
            based on your <strong>user needs</strong>, not marketing claims. If you want a fast option right now,
            try our{" "}
            <Link href="/tools/free-signature-generator-no-login" className="text-primary underline underline-offset-2">
              no-login signature generator
            </Link>{" "}
            — zero signup, done in under 30 seconds.
          </p>

          <Button
            data-testid="button-hero-try-tool"
            onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
            className="gap-2"
          >
            <PenTool className="h-4 w-4" />
            Try the Best Free Tool Now
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* ── TOOL ───────────────────────────────────────────────── */}
        <div id="tool" className="mb-3 sm:mb-10">
          <SignatureToolSection
            caption="Ranked #1 for free use · No login · No upload · Transparent PNG · Instant download"
          />
        </div>

        {/* ── TOP TOOLS COMPARISON ────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Top Free Signature Generators Compared
          </h2>
          <p className="text-muted-foreground mb-6 text-sm">
            An honest look at each tool — pros, cons, and who it is actually best for.
          </p>
          <div className="space-y-3">
            {TOOLS.map((tool) => (
              <div
                key={tool.name}
                className={`rounded-xl border p-5 ${tool.highlight ? "bg-primary/5 border-primary/30" : "bg-card"}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {tool.highlight && <Trophy className="h-4 w-4 text-primary shrink-0" />}
                  <h3 className={`font-bold text-base ${tool.highlight ? "text-primary" : "text-foreground"}`}>
                    {tool.name}
                    {tool.highlight && <span className="ml-2 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">Our pick for free use</span>}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1.5">Pros</p>
                    <ul className="space-y-1">
                      {tool.pros.map((p) => (
                        <li key={p} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground mb-1.5">Cons</p>
                    <ul className="space-y-1">
                      {tool.cons.map((c) => (
                        <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <X className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground border-t pt-3">
                  <span><strong className="text-foreground">Best for:</strong> {tool.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARISON TABLE ─────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Signature Generator Comparison Table
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Quick reference — all tools on the same five criteria that matter most.
          </p>
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="grid grid-cols-6 border-b bg-muted/40 px-3 py-3 gap-1">
              <p className="text-xs font-semibold text-muted-foreground col-span-1">Tool</p>
              <p className="text-xs font-semibold text-muted-foreground text-center">Free</p>
              <p className="text-xs font-semibold text-muted-foreground text-center">No Login</p>
              <p className="text-xs font-semibold text-muted-foreground text-center">Privacy</p>
              <p className="text-xs font-semibold text-muted-foreground text-center">Speed</p>
              <p className="text-xs font-semibold text-muted-foreground text-center">Quality</p>
            </div>
            {COMPARISON_TABLE.map((row, i) => (
              <div
                key={row.tool}
                className={`grid grid-cols-6 px-3 py-3 gap-1 items-center ${i < COMPARISON_TABLE.length - 1 ? "border-b" : ""} ${row.highlight ? "bg-primary/5" : ""}`}
              >
                <p className={`text-sm font-semibold col-span-1 ${row.highlight ? "text-primary" : "text-foreground"}`}>
                  {row.tool}
                  {row.highlight && <Trophy className="h-3 w-3 text-primary inline ml-1" />}
                </p>
                <p className="text-center">
                  {row.free ? <Check className="h-4 w-4 text-primary mx-auto" /> : <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                </p>
                <p className="text-center">
                  {row.noLogin ? <Check className="h-4 w-4 text-primary mx-auto" /> : <X className="h-4 w-4 text-muted-foreground mx-auto" />}
                </p>
                <p className="text-xs text-muted-foreground text-center">{row.privacy}</p>
                <p className="text-xs text-muted-foreground text-center">{row.speed}</p>
                <p className="text-xs text-muted-foreground text-center">{row.quality}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARISON IMAGE ─────────────────────────────────────── */}
        <div className="mb-3 sm:mb-10">
          <img
            src="https://tools.pixocraft.in/images/best-signature-generator-comparison.png"
            alt="Best signature generator comparison table free tools — Pixocraft vs Canva vs DocuSign vs Smallpdf"
            loading="lazy"
            width={600}
            height={300}
            className="w-full rounded-xl border object-cover"
          />
        </div>

        {/* ── WHY PIXOCRAFT IS BEST ────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Why Pixocraft Is the Best Free Signature Generator
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Four reasons Pixocraft stands out from every other free option:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <Lock className="h-5 w-5 text-primary" />,
                title: "No login — ever",
                desc: "Open the page and start immediately. No email, no account, no verification. Most competitors add a 3–5 minute signup wall before you can even try the tool.",
              },
              {
                icon: <Shield className="h-5 w-5 text-primary" />,
                title: "No upload — fully private",
                desc: "Your signature is created entirely in your browser using the HTML5 Canvas API. No data is sent to any server at any point — not even to Pixocraft.",
              },
              {
                icon: <Zap className="h-5 w-5 text-primary" />,
                title: "Fastest time to download",
                desc: "From opening the page to having a PNG on your device: under 30 seconds. No tool we tested comes close when you include signup and onboarding time.",
              },
              {
                icon: <BadgeCheck className="h-5 w-5 text-primary" />,
                title: "No watermark, no limits",
                desc: "The free tier is the only tier. No watermark, no daily cap, no signature limit. Create and download as many signatures as you need — always free.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border bg-card p-4 flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW TO USE ──────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            How to Choose and Use the Best Free Signature Generator
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            A generic decision guide — works for any tool in this comparison.
          </p>
          <div className="space-y-3">
            {HOW_TO_STEPS.map((s) => (
              <div key={s.step} className="flex gap-4 rounded-xl border bg-card p-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{s.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES TO LOOK FOR ────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            What to Look for in a Signature Generator
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Use this checklist before choosing any signature tool — free or paid.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES_TO_CHECK.map((f) => (
              <div key={f.title} className="rounded-xl border bg-card p-4 flex gap-3">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{f.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FREE VS PAID ────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Free vs Paid Signature Tools — When Does It Matter?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-primary" />
                <p className="font-semibold text-foreground text-sm">Free tools — right for most people</p>
              </div>
              <ul className="space-y-1.5">
                {[
                  "Signing personal documents and forms",
                  "Email signature images",
                  "GST invoices and business documents",
                  "Contracts for freelancers",
                  "Any use where legal certification is not required",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                <p className="font-semibold text-foreground text-sm">Paid tools — for enterprise / legal needs</p>
              </div>
              <ul className="space-y-1.5">
                {[
                  "Legally binding contracts between businesses",
                  "Real estate and financial transactions",
                  "Regulated industry documents requiring audit trails",
                  "Multi-party signing workflows",
                  "Court-admissible e-signature certificates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── USE CASES ──────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            What Can You Use a Free Signature Generator For?
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            The vast majority of everyday signing needs are covered by a free browser-based tool.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {USE_CASES.map((u) => (
              <div key={u.title} className="flex gap-3 rounded-xl border bg-card p-4">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {u.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-0.5">{u.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BEST FORMAT ────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Best Format for a Downloaded Signature
          </h2>
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-4 py-4 sm:px-6 sm:py-5">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <p className="font-semibold text-foreground">PNG with transparent background — always</p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              Always download your signature as a transparent PNG. It overlays cleanly on any document background
              (white, dark, or coloured) without a white box, is lossless (no compression artefacts), and is
              universally supported in Word, PDF editors, Google Docs, and email clients. Pixocraft exports at
              3200×1040 px — high resolution, watermark-free, created entirely on your device.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { icon: <Check className="h-3.5 w-3.5" />, label: "No white box on any background" },
                { icon: <Check className="h-3.5 w-3.5" />, label: "High-res — print quality" },
                { icon: <Check className="h-3.5 w-3.5" />, label: "No watermark on free tier" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Common questions about choosing and using the best free signature generator.
          </p>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card overflow-hidden">
                <button
                  data-testid={`faq-toggle-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-foreground text-sm">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Explore More Signature Tools</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Every Pixocraft signature tool is free, browser-based, and requires no login — choose the one that fits your specific need. For the most privacy-focused option, try our{" "}
            <Link href="/tools/online-signature-generator-without-upload" className="text-primary underline underline-offset-2">
              signature generator without upload
            </Link>{" "}
            — designed specifically for users who want zero data sent anywhere, even in the background.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RELATED_TOOLS.map((t) => (
              <Link key={t.href} href={t.href}>
                <div
                  data-testid={`link-related-${t.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-start gap-3 rounded-xl border bg-card p-4 hover-elevate cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{t.label}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section className="rounded-xl border bg-card p-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">
            The Best Free Signature Generator — Try It Now
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            No login, no watermark, no upload, no wait. Create your signature in under 30 seconds and download it free.
          </p>
          <Button
            data-testid="button-cta-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Create My Signature Free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </section>

      </div>
    </>
  );
}
