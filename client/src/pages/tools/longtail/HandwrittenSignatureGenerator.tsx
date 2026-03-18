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
import SignaturePadWidget from "@/components/SignaturePadWidget";
import {
  PenTool,
  Shield,
  Zap,
  Smartphone,
  Star,
  Check,
  FileText,
  Mail,
  Globe,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  AlertCircle,
  BadgeCheck,
  Pencil,
  Upload,
  Type,
  Palette,
  Receipt,
  Briefcase,
  ImageIcon,
  Feather,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/handwritten-signature-generator";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "Is a handwritten signature generated online legally valid in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 and its 2008 Amendment (Section 3A), electronic signatures — including image-based handwritten signatures — are legally recognised for contracts, GST invoices, NDAs, HR documents, and most business agreements. For government-specific filings such as MCA ROC submissions, court filings, or property registration, a certified Digital Signature Certificate (DSC) from a licensed Certifying Authority (CA) is required.",
  },
  {
    question: "Is this handwritten signature generator completely free?",
    answer:
      "Yes — 100% free forever. No subscription, no watermark on the downloaded PNG, no hidden upgrade. Create unlimited handwritten signatures and download them at no cost.",
  },
  {
    question: "Can I use a handwritten signature for GST invoices?",
    answer:
      "Yes. GST invoices and e-way bills accept image-based handwritten signatures. Download your transparent PNG and insert it into your invoice template in Tally, Zoho Books, or any billing software that supports image insertion. CBIC guidelines permit image signatures on manually generated invoices.",
  },
  {
    question: "How do I add a handwritten signature to a PDF?",
    answer:
      "Download your handwritten signature as a transparent PNG. Open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image (or Fill & Sign → Add Signature → Image) to place the PNG over the signature line. Resize and position it, then save.",
  },
  {
    question: "Is my handwritten signature data secure?",
    answer:
      "Completely. This handwritten signature generator runs 100% inside your browser using the HTML5 Canvas API. No drawing strokes, no typed text, and no uploaded images are ever sent to any server, logged, or stored anywhere. Everything stays on your device.",
  },
  {
    question: "Does this tool work on mobile phones?",
    answer:
      "Yes. The Draw tab is fully touch-optimised — single-touch strokes work naturally on any smartphone or tablet. The Type and Upload tabs also work on all mobile browsers including Chrome, Safari, and Firefox for iOS and Android.",
  },
  {
    question: "How many handwriting fonts are available?",
    answer:
      "Over 50 handwritten Google Fonts across 7 style categories — ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker textures, airy light styles, and formal calligraphy — so you can find a font that feels authentically like your own handwriting.",
  },
  {
    question: "What resolution is the downloaded handwritten signature?",
    answer:
      "Exports are rendered at 3200×1040 px — 4× your display size — giving you a crisp, sharp handwritten signature that looks professional on screen, inside documents, and in print. No blurriness, no pixelation.",
  },
  {
    question: "What is the difference between a handwritten signature and a digital signature?",
    answer:
      "A handwritten signature (created with this tool) is a visual PNG image of your signature — called a Simple Electronic Signature (SES). It is used for contracts, invoices, and business documents. A Digital Signature Certificate (DSC) is a cryptographically verified identity token issued by a licensed Certifying Authority — required specifically for MCA ROC filings, income tax e-verification, and certain government portals. For everyday commercial and personal documents, a handwritten signature PNG is fully sufficient.",
  },
  {
    question: "Can I use the same handwritten signature PNG multiple times?",
    answer:
      "Absolutely. Download your handwritten signature once and reuse it across unlimited documents — contracts, invoices, proposals, email footers, forms, and more. There is no restriction on the number of uses.",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Choose your method",
    description:
      "Select Draw to sketch your signature freehand with a mouse or finger, Type to pick from 50+ real handwriting fonts, or Upload to digitise an existing signature.",
  },
  {
    step: 2,
    title: "Customise your handwritten style",
    description:
      "Adjust ink colour, stroke weight, and pen style for Draw. For Type, try different fonts until one feels naturally 'you'. For Upload, remove the white background with one click.",
  },
  {
    step: 3,
    title: "Preview in context",
    description:
      "Hit Preview to see how your handwritten signature looks on a document and email footer — so you know exactly how it will appear before you download.",
  },
  {
    step: 4,
    title: "Download instantly",
    description:
      "Save as a transparent PNG or white-background JPG. No watermark, no account, no waiting. Your handwritten signature is ready to use in under 60 seconds.",
  },
];

const FEATURES = [
  {
    icon: <Pencil className="h-5 w-5 text-primary" />,
    title: "Natural Drawing Engine",
    description:
      "Built on the HTML5 Canvas API with pressure-simulated stroke rendering. Supports undo/redo, adjustable ink colour, and variable stroke weight — replicating the feel of pen on paper on both desktop and touch devices.",
  },
  {
    icon: <Type className="h-5 w-5 text-primary" />,
    title: "50+ Real Handwriting Fonts",
    description:
      "Choose from over 50 Google Fonts across 7 style categories: ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker textures, airy light styles, and formal calligraphy.",
  },
  {
    icon: <Upload className="h-5 w-5 text-primary" />,
    title: "Upload & Background Removal",
    description:
      "Photograph an existing handwritten signature and upload it. The tool's client-side algorithm automatically strips the white background, delivering a clean transparent PNG ready for any document.",
  },
  {
    icon: <Palette className="h-5 w-5 text-primary" />,
    title: "Full Customisation Controls",
    description:
      "Adjust ink colour (black, navy, dark blue, custom hex), stroke thickness (1–8 px), and pen style. For typed signatures, control font size, colour, and weight — matching your personal or corporate brand.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "4× High-Resolution Export",
    description:
      "Exports at 3200×1040 px — four times your display resolution — ensuring sharp, crisp output on screen, in PDFs, on letterheads, and in print. No pixelated signatures.",
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "100% Client-Side Privacy",
    description:
      "Every stroke, every character, every upload is processed entirely in your browser. Nothing is sent to any server. Your handwritten signature data never leaves your device.",
  },
];

const SIGNATURE_STYLES = [
  {
    name: "Formal",
    description: "Elegant, upright letterforms with consistent spacing. Best for legal documents, corporate contracts, and professional correspondence. Choose thin-to-medium serif cursive fonts in the Type tab.",
    when: "Legal documents, corporate contracts, board resolutions",
  },
  {
    name: "Casual",
    description: "Relaxed, flowing strokes with natural variation. Feels personal and approachable. Use the Draw tab with a medium stroke weight for the most authentic casual feel.",
    when: "Freelance proposals, informal agreements, personal letters",
  },
  {
    name: "Minimal",
    description: "A compact, slightly simplified version of your full signature — often used when space is limited. Choose ultra-thin scripts or draw with a finer stroke in the 1–2 px range.",
    when: "Email footers, form fields, small-format documents",
  },
  {
    name: "Bold",
    description: "Strong, confident strokes that command attention. Use the Draw tab with a 4–6 px stroke weight, or choose a bold chunky handwriting font in the Type tab.",
    when: "Artwork, creative branding, important announcements",
  },
];

const USE_CASES = [
  {
    icon: <Receipt className="h-5 w-5 text-primary" />,
    title: "GST Invoices & E-way Bills",
    description:
      "Insert your handwritten signature PNG directly into Tally, Zoho Books, or any billing template. Legally accepted for image-based signatures on manually generated GST invoices.",
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Contracts & Agreements",
    description:
      "Sign NDAs, service agreements, freelance contracts, and employment letters with a professional handwritten signature — legally valid under the IT Act 2000.",
  },
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    title: "Email Signatures",
    description:
      "Add a personal handwritten touch to every email. Works in Gmail, Outlook, and all major email clients — insert the PNG in your signature settings.",
  },
  {
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    title: "Personal Branding",
    description:
      "Use your handwritten signature as a watermark on creative work, photos, artwork, or designs — a personal mark that identifies your brand.",
  },
  {
    icon: <Globe className="h-5 w-5 text-primary" />,
    title: "Business Forms & HR",
    description:
      "HR onboarding forms, banking documents, and government portals commonly accept PNG signatures. Your handwritten signature from this tool works directly.",
  },
  {
    icon: <ImageIcon className="h-5 w-5 text-primary" />,
    title: "PDF Documents",
    description:
      "Insert the transparent PNG into any PDF using Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools — in seconds, without printing or scanning.",
  },
];

const TIPS = [
  { title: "Use 2–4 px stroke weight for Draw", body: "Thin strokes look more authentic and natural. Avoid going above 5 px unless you specifically want a bold calligraphic style." },
  { title: "Add a slight slant", body: "Most natural handwriting leans slightly to the right (5–15°). When drawing, angle your strokes slightly — it reads as more personal and human." },
  { title: "Always export as PNG for documents", body: "Transparent PNG overlays cleanly on any document background. JPG is only useful for email clients that do not support transparency." },
  { title: "Keep your signature consistent", body: "If you plan to use the same signature across many documents, save your PNG and reuse it rather than recreating it each time." },
  { title: "Try multiple fonts in Type mode", body: "Before settling on a font, click through at least 8–10 options. Subtle differences in letterform and spacing can dramatically change the feel." },
];

const MISTAKES = [
  { title: "Strokes too thick", body: "A stroke weight above 6 px makes a handwritten signature look cartoonish rather than natural. Stay in the 2–4 px range for best results." },
  { title: "Over-styled decorative fonts", body: "Fonts with excessive ornamentation can look illegible and unprofessional. Reserve decorative fonts for personal branding — use cleaner styles for business documents." },
  { title: "Low-resolution export", body: "Exporting at screen resolution and then enlarging causes blurring. Always download from this tool — the 4× resolution export ensures sharpness at any print size." },
  { title: "Inconsistent signatures across documents", body: "Re-drawing your signature each time creates inconsistency. Download a PNG once and reuse it across all documents for a consistent professional identity." },
  { title: "Saving as JPG for coloured documents", body: "JPG has no transparency support. On any document with a non-white background, a JPG signature will have a white box around it. Always use PNG." },
];

export default function HandwrittenSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Handwritten Signature Generator Free – Create Real Signature Online | Pixocraft",
    description:
      "Create handwritten signature online free. Choose from 50+ real handwriting styles or draw naturally. Download transparent PNG instantly. No login, 100% private.",
    keywords:
      "handwritten signature generator, free handwritten signature, create handwritten signature online, natural signature maker, real signature generator, signature for PDF, sign documents online, handwritten digital signature",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Handwritten Signature Generator – Pixocraft",
    description:
      "Create a real handwritten signature online for free. Draw naturally with mouse or touch, or choose from 50+ handwriting fonts. Download as transparent PNG. 100% private — runs entirely in your browser.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                              url: "https://tools.pixocraft.in/" },
    { name: "Tools",                             url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Generator",               url: PARENT_URL },
    { name: "Handwritten Signature Generator",   url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Handwritten Signature Generator Free – Create Real Signature Online | Pixocraft",
    description:
      "Create handwritten signature online free. Choose from 50+ real handwriting styles or draw naturally. Download transparent PNG instantly. No login, 100% private.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Handwritten Signature Online",
    description:
      "Use Pixocraft's free handwritten signature generator to draw, type, or upload a natural-looking signature and download it as a transparent PNG in under 60 seconds.",
    steps: HOW_IT_WORKS_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-8">

        <Breadcrumb items={[
          { label: "Home",                            url: "https://tools.pixocraft.in/" },
          { label: "Tools",                           url: "/tools" },
          { label: "Signature Generator",             url: "/tools/signature-pad-tool" },
          { label: "Handwritten Signature Generator" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Feather className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Handwritten Signature Generator Free – Real Signature in Seconds
              </h1>
              <p className="text-sm text-muted-foreground">Free · No Signup · 100% Private · 50+ Handwriting Styles</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create a <strong>real handwritten signature online</strong> that looks exactly like pen on paper. <strong>Draw</strong> naturally with your mouse or finger,
            <strong> type</strong> your name in 50+ real handwriting fonts, or <strong>upload</strong> an existing signature and remove the background automatically.
            Download as a crisp transparent PNG — no login, no watermark, 100% private.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Create Signature in 5 Seconds" },
              { icon: <Star className="h-3.5 w-3.5" />,        label: "50+ Real Handwriting Styles" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup Required" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <Smartphone className="h-3.5 w-3.5" />,  label: "Mobile Friendly" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground"
              >
                {icon}{label}
              </span>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-10">
          <SignaturePadWidget />
          <p className="text-xs text-muted-foreground text-center mt-3">
            No watermark · No upload to server · Works offline after page load
          </p>
        </div>

        {/* ── QUICK USE BLOCK ──────────────────────────────────────────────── */}
        <div className="rounded-xl border bg-primary/5 px-6 py-5 mb-12">
          <p className="font-semibold text-foreground mb-3">Use your handwritten signature for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "GST invoices & e-way bills",
              "Contracts & agreements",
              "PDF documents",
              "Email signatures",
              "Business forms",
              "Personal branding & watermarks",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* What is */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What is a Handwritten Signature Generator?</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                A <strong>handwritten signature generator</strong> is a browser-based tool that lets you create a natural,
                realistic-looking signature online — one that closely replicates the look and feel of ink on paper — without
                any printing, scanning, or software installation.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The key distinction between a <strong>handwritten signature generator</strong> and a generic signature maker is intent:
              the goal is to produce a signature that looks authentically handwritten — with the natural irregularity, flow, and
              character of a pen-on-paper signature — rather than a clean, digital typeface or a robotic rendering.
            </p>
            <p className="text-muted-foreground mb-4">
              Pixocraft's free <strong>handwritten signature generator</strong> achieves this through three complementary methods.
              The Draw tab uses a pressure-simulated HTML5 Canvas engine optimised for natural stroke rendering — on both mouse
              and touchscreen. The Type tab offers 50+ Google Fonts curated specifically for their handwriting authenticity, not
              just their aesthetic appearance. The Upload tab lets you digitise an existing pen-on-paper signature with automatic
              background removal.
            </p>
            <p className="text-muted-foreground mb-4">
              Whether you need to <strong>create a handwritten signature online</strong> for a freelance contract, a GST invoice,
              an email footer, or a personal brand watermark, this tool gives you a professional result in seconds — entirely
              within your browser, with no data leaving your device.
            </p>
            <p className="text-muted-foreground">
              The output is a high-resolution transparent PNG at 3200×1040 px — print-quality, watermark-free, and ready to
              insert into any PDF, Word document, Google Doc, or email client immediately after creation.
            </p>
          </section>

          {/* How to create */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a Handwritten Signature Online — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Follow these four steps — done in under 60 seconds:</p>
            <ol className="space-y-3 mb-5">
              {HOW_IT_WORKS_STEPS.map(({ step, title, description }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground">
              Need the full tool with even more options?{" "}
              <Link href="/tools/signature-pad-tool" className="text-primary hover:underline underline-offset-2 font-medium">
                Visit the main Signature Generator
              </Link>.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Features of Pixocraft's Handwritten Signature Generator</h2>
            <p className="text-muted-foreground mb-5">
              Built for professionals, creatives, and businesses who need an authentic-looking, high-quality handwritten signature:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(({ icon, title, description }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Draw vs Type vs Upload */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Draw, Type, or Upload — Which Method Creates the Best Handwritten Signature?</h2>
            <p className="text-muted-foreground mb-5">
              Each method has its own strengths. Here is a detailed comparison to help you choose the right approach:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[540px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Method</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Handwritten Feel</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Best For</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Tip</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    {
                      method: "Draw",
                      feel: "Highest — truly personal",
                      best: "Anyone who wants a completely unique, one-of-a-kind signature",
                      tip: "Use a touchscreen or stylus for the most natural result",
                    },
                    {
                      method: "Type",
                      feel: "High — 50+ authentic handwriting fonts",
                      best: "Users who want consistency and reproducibility",
                      tip: "Try thin-weight scripts for the most realistic handwritten appearance",
                    },
                    {
                      method: "Upload",
                      feel: "Exact — your real handwritten signature",
                      best: "Reusing an existing pen-on-paper signature",
                      tip: "Photograph on white paper in bright, even lighting for best cleanup",
                    },
                  ].map(({ method, feel, best, tip }) => (
                    <tr key={method} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{method}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{feel}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{best}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{tip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground px-1">
              <strong>Quick pick:</strong> Most personal? → <strong>Draw</strong>. Most consistent? → <strong>Type</strong>. Already have a signature? → <strong>Upload</strong>.
            </p>
          </section>

          {/* Best Signature Styles */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Best Handwritten Signature Styles — Which One Suits You?</h2>
            <p className="text-muted-foreground mb-5">
              A good handwritten signature matches both your personality and the context in which you use it. Here are the four main signature style categories:
            </p>
            <div className="space-y-4">
              {SIGNATURE_STYLES.map(({ name, description, when }) => (
                <div key={name} className="p-5 rounded-xl border bg-card">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="shrink-0 h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                      {name[0]}
                    </span>
                    <p className="font-semibold text-foreground">{name}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 leading-relaxed">{description}</p>
                  <p className="text-xs text-primary font-medium">Best when: {when}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Handwritten Signature Use Cases — Where to Use It</h2>
            <p className="text-muted-foreground mb-5">
              A high-quality handwritten signature PNG from this tool works across a broad range of professional and personal contexts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USE_CASES.map(({ icon, title, description }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Legal Validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Is a Handwritten Signature Created Online Legally Valid in India?</h2>
            <p className="text-muted-foreground mb-5">
              Yes — for the vast majority of everyday business and personal documents. Here is the legal context:
            </p>
            <div className="space-y-4 mb-6">
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  Information Technology Act 2000
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  India's IT Act 2000 formally recognised electronic signatures as legally equivalent to handwritten signatures
                  for most civil and commercial transactions. A contract signed with an electronic signature — including a
                  handwritten-style PNG image — carries the same legal force as an ink-on-paper signature, provided both
                  parties intend to be bound by the document.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  GST Acceptance
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Under GST rules, a tax invoice must bear the signature or digital signature of the supplier or their
                  authorised representative. CBIC guidelines permit image-based handwritten signatures on manually generated
                  invoices in Tally, Zoho Books, and similar billing software. For E-Invoice (IRN-based) submissions, the
                  system-generated QR code and IRN serve as authentication — a separate signature is not required.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  Real-World Usage
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Thousands of freelancers, small businesses, consultants, and corporate professionals across India use
                  image-based handwritten signatures daily for contracts, invoices, proposals, and HR documents — without
                  any legal complications. The key is that the signature represents the genuine intent of the signatory.
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" /> Legal Note:</strong>
              For MCA ROC filings, court submissions, income tax e-verification, or property registration, a certified Digital
              Signature Certificate (DSC) from a licensed Certifying Authority (CA) is mandatory. Consult a qualified legal
              professional for documents with significant legal or financial consequences.
            </div>
          </section>

          {/* Handwritten vs Digital Signature */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Handwritten Signature vs Digital Signature — The Key Differences</h2>
            <p className="text-muted-foreground mb-5">
              Understanding when to use a handwritten signature and when a cryptographic digital signature (DSC) is required
              is essential for Indian professionals:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Aspect</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Handwritten Signature (PNG)</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Digital Signature (DSC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { aspect: "Nature",         hand: "A visual image of your signature", dsc: "A cryptographic identity token (PKI)" },
                    { aspect: "Created by",     hand: "You — using a tool like this one", dsc: "Issued by a licensed Certifying Authority (CA)" },
                    { aspect: "Verification",   hand: "Based on trust and intent",         dsc: "Cryptographically verifiable — tamper-evident" },
                    { aspect: "Use cases",      hand: "Contracts, GST invoices, NDAs, HR documents, email footers", dsc: "MCA filings, court submissions, income tax e-verification" },
                    { aspect: "Cost",           hand: "Free (this tool)",                 dsc: "₹500–₹3,000 per year from a CA" },
                    { aspect: "Setup time",     hand: "Under 60 seconds",                 dsc: "1–3 business days" },
                    { aspect: "Privacy",        hand: "100% local — no server processing", dsc: "Requires identity verification with CA" },
                  ].map(({ aspect, hand, dsc }) => (
                    <tr key={aspect} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{aspect}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{hand}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{dsc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl border bg-card px-6 py-5">
              <p className="font-semibold text-foreground mb-3">When to Use Each</p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Use a handwritten signature (this tool)</strong> for freelance contracts,
                  GST invoices, NDAs, employment letters, business proposals, email footers, and all day-to-day commercial
                  documents. It is faster, free, and legally valid for the overwhelming majority of transactions.
                </p>
                <p>
                  <strong className="text-foreground">Use a Digital Signature Certificate (DSC)</strong> when a government
                  portal specifically requires cryptographic identity verification — MCA ROC, income tax e-verification,
                  e-tendering portals, or property registration offices.
                </p>
              </div>
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for the Perfect Handwritten Signature</h2>
            <p className="text-muted-foreground mb-5">Follow these best practices to get a professional, authentic-looking result:</p>
            <div className="space-y-3">
              {TIPS.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Handwritten Signature Mistakes to Avoid</h2>
            <p className="text-muted-foreground mb-5">These are the most common errors that make handwritten signatures look amateur or unusable:</p>
            <div className="space-y-3">
              {MISTAKES.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="h-3 w-3 text-destructive" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Choose Pixocraft's Handwritten Signature Generator?</h2>
            <p className="text-muted-foreground mb-5">
              Many tools claim to create handwritten signatures. Here is what makes Pixocraft's <strong>free handwritten signature generator</strong> different:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Lock className="h-4 w-4 text-primary" />,       title: "Zero data collection",         body: "No analytics on your signature, no behavioural tracking, no server-side processing." },
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "Instant, no friction",         body: "No registration, no email confirmation, no onboarding. Open the page and start." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "4× resolution export",         body: "3200×1040 px output — your signature looks sharp in any document or print." },
                { icon: <Globe className="h-4 w-4 text-primary" />,      title: "Works on any device",          body: "Desktop, tablet, mobile — any browser, any operating system." },
                { icon: <Feather className="h-4 w-4 text-primary" />,    title: "50+ curated handwriting fonts", body: "Selected specifically for authenticity — fonts that genuinely look handwritten, not just decorative." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Free forever — genuinely",    body: "No watermarks, no usage limits, no upsell for PNG download. Free means free." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-create-handwritten-cta"
              >
                <Feather className="h-4 w-4" />
                Create Handwritten Signature Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal Linking */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Related Signature Tools</h2>
            <p className="text-muted-foreground mb-5">
              Explore Pixocraft's full suite of free signature tools — each built for a specific signing need:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/esignature-maker",            title: "eSignature Maker",             desc: "The main authority page for electronic signatures — GST & legal ready." },
                { href: "/tools/free-signature-generator",    title: "Free Signature Generator",     desc: "100% free signature creation with no hidden costs or premium tiers." },
                { href: "/tools/signature-maker",             title: "Signature Maker",              desc: "The flagship signature maker tool — all features, maximum control." },
                { href: "/tools/signature-maker-free",        title: "Signature Maker Free",         desc: "Lightweight, fast-loading signature maker for quick use." },
                { href: "/tools/digital-signature-generator", title: "Digital Signature Generator",  desc: "Detailed guidance on digital signing and DSC vs eSignature." },
                { href: "/tools/signature-pad-tool",          title: "Signature Pad Tool",           desc: "The core signature pad powering all Pixocraft signature tools." },
              ].map(({ href, title, desc }) => (
                <Link key={href} href={href}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border bg-card hover-elevate cursor-pointer">
                    <PenTool className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 ml-auto mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions — Handwritten Signature Generator</h2>
            <p className="text-muted-foreground mb-5">Answers to the most common questions about creating and using handwritten signatures online:</p>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-foreground text-sm pr-4">{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="rounded-xl border bg-primary/5 px-6 py-8 text-center">
            <Feather className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Create Your Handwritten Signature Now</h2>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto text-sm">
              Join thousands of professionals across India who use Pixocraft's free handwritten signature generator every day.
              No login. No watermark. 50+ real handwriting styles. Create your signature in seconds.
            </p>
            <Button
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2"
              data-testid="button-create-handwritten-final"
            >
              <Feather className="h-4 w-4" />
              Create Handwritten Signature Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
