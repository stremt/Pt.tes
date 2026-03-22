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
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  BadgeCheck,
  Download,
  Smartphone,
  Star,
  PenTool,
  FileText,
  MousePointer,
  Clock,
  Sparkles,
  Infinity,
  ImageIcon,
  RefreshCw,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/simple-signature-maker-online-free";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Open the tool",
    desc: "Scroll up — the tool loads instantly in your browser. No app, no account, no wait. Ready in under 3 seconds.",
  },
  {
    step: 2,
    title: "Type or draw your signature",
    desc: "Type your name to get a handwriting-style signature, or draw freehand with a mouse or finger. Both work on mobile.",
  },
  {
    step: 3,
    title: "Adjust style (optional)",
    desc: "Change colour or font if you like. The defaults already look great — beginners can skip this step entirely.",
  },
  {
    step: 4,
    title: "Download PNG — one click",
    desc: "One tap saves a transparent PNG straight to your device. No watermark, no email, no waiting. Done in seconds.",
  },
];

const FAQS = [
  {
    question: "Is this simple signature maker online really free?",
    answer:
      "Yes — 100% free forever. No subscription, no credit system, no watermark, and no hidden charges. Create and download as many signatures as you need at zero cost.",
  },
  {
    question: "Do I need to log in or create an account?",
    answer:
      "No login is required at any step. Open the page and start making your signature immediately. We do not collect your email, name, or any personal information.",
  },
  {
    question: "How quickly can I create a basic signature?",
    answer:
      "Most users finish in under 30 seconds. Type your name, choose a style, and download — it is genuinely that fast. No tutorials, no complicated setup.",
  },
  {
    question: "Can I use this simple signature maker on my phone?",
    answer:
      "Yes. The tool is fully mobile-optimised. Draw with your finger on the touchscreen or type your name and pick a font. Works on Android and iPhone without installing any app.",
  },
  {
    question: "Is my signature private? Will it be uploaded to your servers?",
    answer:
      "Your signature never leaves your device. Everything runs inside your browser using the HTML5 Canvas API. No data is sent to any server, logged, or shared with anyone.",
  },
  {
    question: "What file format will I receive when I download?",
    answer:
      "You will receive a transparent PNG at 3200×1040 px — high resolution, no background, no watermark. It overlays cleanly on any document, PDF, or email regardless of background colour.",
  },
  {
    question: "I am not technical. Is this tool easy to use?",
    answer:
      "Absolutely. It was built specifically for beginners. There are no complicated menus. Just choose to draw or type, optionally adjust the colour, and click Download. That is the entire process.",
  },
  {
    question: "Can I draw my signature by hand using this tool?",
    answer:
      "Yes. The Draw tab provides a smooth canvas — use a mouse on desktop or your finger on a touchscreen. Bezier smoothing makes even quick strokes look natural and professional.",
  },
  {
    question: "Can I just type my name and use it as a signature?",
    answer:
      "Yes. The Type tab converts your name into a handwriting-style signature using script and calligraphy fonts. You get a clean, consistent signature in seconds without drawing anything.",
  },
  {
    question: "Is a signature created here legally valid in India?",
    answer:
      "Yes, for everyday use. India's IT Act 2000 recognises electronic signatures for contracts, GST invoices, and business documents. For government portals requiring a certified DSC, consult a licensed Certifying Authority.",
  },
  {
    question: "How do I add this signature to a PDF or Word document?",
    answer:
      "Download the transparent PNG, then insert it as an image in Word (Insert → Picture) or in any PDF editor. Resize it to fit the signature line and you are done.",
  },
  {
    question: "Can I create multiple signatures?",
    answer:
      "Yes — unlimited. Create as many signatures as you need, in different styles and colours, and download them all. There are no daily limits and no cap on usage.",
  },
];

const FEATURES = [
  {
    icon: <MousePointer className="h-4 w-4 text-primary" />,
    title: "No complicated settings",
    desc: "Everything is pre-set to look great. Beginners get a professional result in one step — just draw, type, or upload, then download.",
  },
  {
    icon: <Clock className="h-4 w-4 text-primary" />,
    title: "Done in seconds",
    desc: "Most users finish in under 30 seconds. Open, choose your method, and download — genuinely that fast.",
  },
  {
    icon: <Download className="h-4 w-4 text-primary" />,
    title: "One-click download",
    desc: "A single tap saves your transparent PNG to your device — no forms, no email confirmation, no wait time.",
  },
  {
    icon: <Smartphone className="h-4 w-4 text-primary" />,
    title: "Works on any device",
    desc: "Draw with your finger on mobile or use a mouse on desktop. Fully responsive — same simple experience everywhere.",
  },
  {
    icon: <Lock className="h-4 w-4 text-primary" />,
    title: "No login, no email",
    desc: "Start using the tool the moment the page opens. We ask for nothing — no account, no email, no personal details.",
  },
  {
    icon: <Shield className="h-4 w-4 text-primary" />,
    title: "100% private, browser only",
    desc: "Your signature is created only on your device. Nothing is ever uploaded or saved on any server — fully offline processing.",
  },
  {
    icon: <BadgeCheck className="h-4 w-4 text-primary" />,
    title: "Transparent PNG, no watermark",
    desc: "Download at 3200×1040 px — no white background, no branding. Ready to place directly into any document.",
  },
  {
    icon: <Infinity className="h-4 w-4 text-primary" />,
    title: "Unlimited, always free",
    desc: "No daily limit, no credit system, no paid upgrade required. Create and download as many signatures as you like.",
  },
];

const SIGNATURE_TYPES = [
  {
    icon: <PenTool className="h-5 w-5 text-primary" />,
    title: "Typed signature",
    desc: "Type your name and pick a handwriting font. The fastest method — a clean, consistent signature in seconds.",
  },
  {
    icon: <MousePointer className="h-5 w-5 text-primary" />,
    title: "Hand-drawn signature",
    desc: "Sketch freehand with a mouse or finger. Bezier smoothing gives strokes a natural, flowing look.",
  },
  {
    icon: <ImageIcon className="h-5 w-5 text-primary" />,
    title: "Basic upload",
    desc: "Upload a photo of your existing signature and remove the white background automatically — one click.",
  },
];

const USE_CASES = [
  { icon: <FileText className="h-4 w-4 text-primary" />, title: "Forms & applications", desc: "Sign digital job applications, consent forms, and admission documents instantly." },
  { icon: <Layers className="h-4 w-4 text-primary" />, title: "PDF documents", desc: "Insert your PNG signature into PDFs using our free Add Signature to PDF tool." },
  { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Email footers", desc: "Add a handwritten-style signature image to Gmail, Outlook, or any email client." },
  { icon: <FileText className="h-4 w-4 text-primary" />, title: "Contracts & invoices", desc: "Sign GST invoices, vendor agreements, and freelance contracts without printing." },
  { icon: <RefreshCw className="h-4 w-4 text-primary" />, title: "Quick reuse", desc: "Download once and reuse the PNG across unlimited documents — no need to recreate it." },
  { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "On-the-go signing", desc: "Sign documents from your phone in seconds — anywhere, anytime, no app needed." },
];

const COMPARISON = [
  { feature: "Login required", pixocraft: "No", others: "Usually yes" },
  { feature: "Speed to first download", pixocraft: "Under 30 seconds", others: "3–5 minutes (signup flow)" },
  { feature: "Watermark on download", pixocraft: "None", others: "Often yes (paid to remove)" },
  { feature: "Mobile friendly", pixocraft: "Fully optimised", others: "Varies" },
  { feature: "Data sent to servers", pixocraft: "Nothing", others: "Often uploaded" },
  { feature: "Price", pixocraft: "Free forever", others: "Free tier with limits" },
];

const RELATED_TOOLS = [
  { href: "/tools/signature-pad-tool", label: "Signature Generator", desc: "The main signature tool with advanced controls and 50+ fonts." },
  { href: "/tools/free-signature-generator-no-login", label: "Free Signature Generator No Login", desc: "Zero-signup, privacy-first signature creation." },
  { href: "/tools/signature-font-generator", label: "Signature Font Generator", desc: "Generate stylish signatures from curated script fonts." },
  { href: "/tools/add-signature-to-pdf", label: "Add Signature to PDF", desc: "Place your transparent PNG directly into any PDF." },
];

export default function SimpleSignatureMakerOnlineFree() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Simple Signature Maker Online Free (Fast & Easy Tool) | Pixocraft",
    description:
      "Create simple signature online free. Easy, fast, and beginner-friendly signature maker. No login, instant download. Done in under 30 seconds.",
    keywords:
      "simple signature maker online free, easy signature generator, create simple signature online, basic signature maker free, quick signature generator, simple online signature maker, free simple signature, signature maker easy, beginner signature maker, simple digital signature free",
    canonicalUrl: CANONICAL,
    ogImage: "https://tools.pixocraft.in/images/simple-signature-maker-online-free.png",
    ogTitle: "Simple Signature Maker Online Free – Fast & Easy",
    ogDescription: "Create a simple signature online for free in seconds. No login, no complications, instant download.",
    twitterTitle: "Simple Signature Maker Online Free",
    twitterDescription: "Create your signature in seconds. No login. No complicated settings. Instant free download.",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Simple Signature Maker Online Free – Pixocraft",
    description:
      "Simple online signature maker — create a professional signature in seconds for free. No login, no complicated settings. Type or draw, one-click download. Beginner friendly.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    applicationSubCategory: "Simple Signature Maker",
    operatingSystem: "Web, iOS, Android",
    featureList: [
      "Simple to use",
      "No login required",
      "Instant download",
      "Beginner friendly",
      "Works on mobile",
      "One-click download",
      "No complicated settings",
      "Transparent PNG output",
      "100% private",
      "Free forever",
    ],
    offers: { price: "0", priceCurrency: "INR" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Simple Signature Maker Online Free", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Simple Signature Maker Online Free (Fast & Easy Tool) | Pixocraft",
    description:
      "Create simple signature online free. Easy, fast, and beginner-friendly signature maker. No login, instant download. Done in under 30 seconds.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Simple Signature Online Free",
    description:
      "Create and download a free signature online in under 30 seconds. No login, no complicated settings, beginner friendly.",
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
          { label: "Simple Signature Maker Online Free" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Simple Signature Maker Online Free (Fast &amp; Easy)
              </h1>
              <p className="hidden md:block text-sm text-muted-foreground">
                Create your signature in seconds. No login, no complexity, instant download.
              </p>
            </div>
          </div>

          {/* Featured Snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">
              What is a simple signature maker online?
            </p>
            <p className="text-base text-foreground leading-relaxed">
              A <strong>simple signature maker online</strong> is a free, easy tool that lets you create and{" "}
              <strong>download a signature instantly</strong> — no login, no complicated settings. Just type your name
              or draw, then download your PNG in seconds. Completely free.
            </p>
          </div>

          {/* Trust badges */}
          <div className="hidden md:flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Star className="h-3.5 w-3.5" />, label: "Simple to use" },
              { icon: <Lock className="h-3.5 w-3.5" />, label: "No login" },
              { icon: <Download className="h-3.5 w-3.5" />, label: "Instant download" },
              { icon: <Sparkles className="h-3.5 w-3.5" />, label: "Beginner friendly" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Mobile ready" },
            ].map((b) => (
              <div
                key={b.label}
                className="flex items-center gap-1.5 text-xs font-medium bg-primary/8 text-primary px-3 py-1.5 rounded-full"
              >
                {b.icon}
                {b.label}
              </div>
            ))}
          </div>

          <p className="hidden md:block text-base text-muted-foreground mb-5 leading-relaxed">
            The fastest way to <strong>create a simple signature online free</strong>.{" "}
            <strong>No complicated settings.</strong> No account. Just open the tool, draw or type your name, and{" "}
            <strong>one-click download</strong> saves a high-resolution transparent PNG to your device.{" "}
            <strong>Takes only a few seconds</strong> — works on any phone, tablet, or desktop.
          </p>

          <Button
            data-testid="button-hero-create-signature"
            onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
            className="gap-2"
          >
            <PenTool className="h-4 w-4" />
            Create My Signature Free
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* ── TOOL ───────────────────────────────────────────────── */}
        <div id="tool" className="mb-3 sm:mb-10">
          <SignatureToolSection
            caption="Simple · Free · No login · Transparent PNG · Instant download"
          />
        </div>

        {/* ── WHY USE THIS TOOL ───────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Why Use a Simple Signature Maker?
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Most people just need a signature — fast. They don't have time to learn complex software or fill out
            signup forms. Here's why a simple tool is the right choice:
          </p>
          <div className="space-y-3">
            {[
              {
                icon: <Clock className="h-5 w-5 text-primary" />,
                title: "You need it in seconds, not minutes",
                desc: "Complex tools have steep learning curves and forced signups. A simple signature maker loads instantly and gets you to your download in under 30 seconds — no tutorials, no waiting.",
              },
              {
                icon: <MousePointer className="h-5 w-5 text-primary" />,
                title: "No time for complicated interfaces",
                desc: "Most people signing a form or contract aren't designers. They want one simple option — draw or type — without being overwhelmed by dozens of settings and panels.",
              },
              {
                icon: <Zap className="h-5 w-5 text-primary" />,
                title: "Fast conversion means you actually get it done",
                desc: "When a tool is simple, you complete the task instead of giving up halfway. A beginner-friendly interface means you get your signature on your document the same day you decide you need one.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border bg-card p-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHAT IS ────────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            What Is a Simple Signature Maker Online?
          </h2>
          <p className="text-foreground text-base leading-relaxed mb-4">
            A <strong>simple signature maker online</strong> is a free, easy tool that lets you create a professional
            signature with <strong>no complicated settings</strong> and no account. Open the tool, type your name or
            draw with your finger, and <strong>download instantly</strong> as a transparent PNG — all in a few seconds.
          </p>
          <img
            src="https://tools.pixocraft.in/images/simple-signature-maker-online-free-example.png"
            alt="Simple signature maker online free easy example for beginners — create and download in seconds"
            loading="lazy"
            width={600}
            height={300}
            className="w-full rounded-xl border mb-5 object-cover"
          />
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            Unlike full-featured design software with dozens of menus, this tool strips everything down to what
            matters: draw or type, then download. The result is a high-resolution transparent PNG that works in any
            Word document, PDF, Google Doc, or email footer. No Photoshop, no learning curve, no account.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            If you want a more advanced version with 50+ fonts, stroke controls, and style presets, try our{" "}
            <Link href="/tools/signature-pad-tool" className="text-primary underline underline-offset-2">
              main signature generator
            </Link>
            . For a strictly zero-login version emphasising privacy, see the{" "}
            <Link href="/tools/free-signature-generator-no-login" className="text-primary underline underline-offset-2">
              free signature generator no login
            </Link>
            .
          </p>
        </section>

        {/* ── HOW TO ─────────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            How to Create a Simple Signature Online Free
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Four steps — <strong>no tutorials needed</strong>. Most beginners finish in under 30 seconds.
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

        {/* ── FEATURES ───────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Features of This Simple Signature Maker
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Built for people who just need a signature — fast. Every feature is unlocked from the first second.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border bg-card p-4 flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
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

        {/* ── TYPES OF SIGNATURES ─────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Types of Simple Signatures You Can Create
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Choose the approach that feels most natural — all are simple and beginner friendly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {SIGNATURE_TYPES.map((t) => (
              <div key={t.title} className="rounded-xl border bg-card p-5 text-center">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  {t.icon}
                </div>
                <p className="font-semibold text-foreground text-sm mb-2">{t.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── BEST FORMAT ────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Best Format for a Simple Signature
          </h2>
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-4 py-4 sm:px-6 sm:py-5 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <p className="font-semibold text-foreground">PNG with transparent background — recommended</p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              A transparent PNG is the best format for any signature. It overlays cleanly on documents, PDFs, and emails
              regardless of background colour — no white box around the signature, no compression artefacts.
              Pixocraft always downloads as transparent PNG at 3200×1040 px — high resolution and watermark-free.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { icon: <Check className="h-3.5 w-3.5" />, label: "Clear on any background" },
                { icon: <Check className="h-3.5 w-3.5" />, label: "Lightweight file size" },
                { icon: <Check className="h-3.5 w-3.5" />, label: "No watermark" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            JPEG should be avoided for signatures because it does not support transparency — you will get a white box
            around your signature on any non-white background. Always choose PNG for the cleanest result.
          </p>
        </section>

        {/* ── USE CASES ──────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Where Can You Use a Simple Signature?
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Your downloaded PNG works anywhere you need a signature — forms, documents, emails, and more.
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

        {/* ── SAVE & REUSE ─────────────────────────────────────────── */}
        <section className="mb-10 rounded-xl border bg-card p-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <RefreshCw className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Save Once, Reuse Anywhere</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Once you download your signature PNG, save it to a folder on your device and reuse it across unlimited
                documents without creating it again. Insert it into Word, PDF, Google Docs, or any email client.
                Your signature is yours permanently — no account to log back into, no expiry, no lock-in.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: <Check className="h-3.5 w-3.5" />, label: "Instant reuse from your device" },
                  { icon: <Check className="h-3.5 w-3.5" />, label: "Works offline once saved" },
                  { icon: <Check className="h-3.5 w-3.5" />, label: "No need to log in again" },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">{p.icon}</span>
                    {p.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPARISON ─────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Pixocraft vs. Other Signature Makers
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Other tools are often confusing, slow, and locked behind signups. Here's how Pixocraft compares:
          </p>
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="grid grid-cols-3 border-b bg-muted/40 px-4 py-3">
              <p className="text-xs font-semibold text-muted-foreground">Feature</p>
              <p className="text-xs font-semibold text-primary text-center">Pixocraft</p>
              <p className="text-xs font-semibold text-muted-foreground text-center">Others</p>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 px-4 py-3 ${i < COMPARISON.length - 1 ? "border-b" : ""}`}
              >
                <p className="hidden md:block text-sm text-muted-foreground">{row.feature}</p>
                <p className="text-sm font-medium text-primary text-center">{row.pixocraft}</p>
                <p className="text-sm text-muted-foreground text-center">{row.others}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Beginner questions about this simple signature maker online free.
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
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Related Signature Tools</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Looking for more? Explore other free signature tools from Pixocraft — each one specialised for a
            different use case or preference.
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
            Ready to Create Your Signature?
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            No login, no complicated settings, done in under 30 seconds. Scroll up and create your free signature now.
          </p>
          <Button
            data-testid="button-scroll-to-tool-cta"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Create My Signature Free <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </section>

      </div>
    </>
  );
}
