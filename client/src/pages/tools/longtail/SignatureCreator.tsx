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
  Sparkles,
  Brush,
  User,
  GraduationCap,
  Briefcase,
  Camera,
  Receipt,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-creator";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "Is the Signature Creator completely free?",
    answer:
      "Yes — 100% free, forever. No subscription, no watermark, no premium tier hidden behind a paywall. Create and download unlimited signatures as high-resolution PNGs at no cost.",
  },
  {
    question: "Is a signature created with this tool legally valid in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 and its 2008 Amendment (Section 3A), electronic signatures — including image-based PNG signatures — are legally recognised for contracts, GST invoices, NDAs, HR documents, and the vast majority of business agreements. For MCA ROC filings, court submissions, and property registration, a certified Digital Signature Certificate (DSC) from a licensed CA is required.",
  },
  {
    question: "How do I use this signature creator?",
    answer:
      "Choose your method — Draw (freehand with mouse or touch), Type (50+ handwriting fonts), or Upload (digitise an existing signature). Customise colour, stroke, and style. Hit Preview to see it in context. Download as a transparent PNG or JPG. Done in under 60 seconds.",
  },
  {
    question: "How do I add my created signature to a PDF?",
    answer:
      "Download your signature as a transparent PNG. Open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place the PNG over the signature line. Resize, position, and save. Your PDF is signed.",
  },
  {
    question: "Does this tool work on mobile phones?",
    answer:
      "Yes. The Draw tab is fully touch-optimised for smartphones and tablets. All three tabs — Draw, Type, and Upload — work on all major mobile browsers including Chrome, Safari, and Firefox on iOS and Android.",
  },
  {
    question: "Is my signature data private?",
    answer:
      "Completely. This signature creator runs 100% inside your browser. No drawing strokes, no typed text, and no uploaded images are ever sent to any server, logged, or stored. Everything stays on your device.",
  },
  {
    question: "What is the difference between a Signature Creator and a Signature Generator?",
    answer:
      "A signature generator typically offers quick, limited output — often a single pre-styled result. A signature creator gives you full creative control: custom stroke weight, colour, style, font selection across 50+ options, and multiple creation methods. Think of it as the difference between a vending machine and a design studio.",
  },
  {
    question: "Can I use my signature for personal branding?",
    answer:
      "Absolutely. Many freelancers, creators, and entrepreneurs use their signature PNG as a personal brand mark — on proposals, creative work, social media profiles, artwork, and email footers. A unique, well-designed signature is a powerful identity statement.",
  },
  {
    question: "What resolution is the downloaded signature?",
    answer:
      "Exports are rendered at 3200×1040 px — 4× your display size — delivering a sharp, crisp signature that looks professional on screen, in documents, and in print.",
  },
  {
    question: "Can I use my created signature for GST invoices?",
    answer:
      "Yes. GST invoices and e-way bills accept image-based signatures. Download your transparent PNG and insert it into your invoice template in Tally, Zoho Books, or any billing software that supports image insertion.",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Choose your creative method",
    description:
      "Draw freehand with a mouse or finger for full originality. Type your name across 50+ handwriting fonts for instant creative results. Upload an existing signature for digital refinement.",
  },
  {
    step: 2,
    title: "Express and customise",
    description:
      "Adjust ink colour, stroke weight, and pen style. For typed signatures, select the font that best expresses your identity. For uploads, remove the background with a single click.",
  },
  {
    step: 3,
    title: "Preview in context",
    description:
      "See your signature placed on a document and email footer mockup — so you know exactly how it will look before you commit.",
  },
  {
    step: 4,
    title: "Download and own it",
    description:
      "Save as a transparent PNG or white-background JPG at 3200×1040 px. No watermark. No account. Your signature, yours to use anywhere.",
  },
];

const FEATURES = [
  {
    icon: <Brush className="h-5 w-5 text-primary" />,
    title: "Drawing Studio",
    description:
      "A full pressure-simulated canvas drawing experience powered by the HTML5 Canvas API. Variable stroke weight (1–8 px), ink colour picker, undo/redo history — built to give you the feel of drawing with a real pen.",
  },
  {
    icon: <Type className="h-5 w-5 text-primary" />,
    title: "50+ Font Creative System",
    description:
      "50+ Google Fonts curated across 7 style categories: ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker textures, airy light scripts, and formal calligraphy. Filter by mood, not just alphabetically.",
  },
  {
    icon: <Palette className="h-5 w-5 text-primary" />,
    title: "Full Customisation Controls",
    description:
      "Control ink colour (black, navy, deep blue, custom hex), stroke thickness, pen style, and for typed signatures — font weight and size. Every parameter is yours to set.",
  },
  {
    icon: <Upload className="h-5 w-5 text-primary" />,
    title: "Upload & Refine",
    description:
      "Photograph an existing signature and upload it. Automatic background removal produces a clean transparent PNG — the ideal way to digitise a well-practiced pen-on-paper signature.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "4× High-Resolution Export",
    description:
      "All exports are rendered at 4× display resolution — 3200×1040 px — ensuring your signature looks sharp and professional on screen, in documents, and in print without any pixelation.",
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "100% Client-Side Privacy",
    description:
      "Every stroke, every character, every upload is processed entirely in your browser. No data is ever sent to any server. Your creative work stays exclusively on your device.",
  },
];

const DESIGN_STYLES = [
  {
    name: "Minimal",
    icon: "—",
    description:
      "Clean, uncluttered letterforms with generous negative space. A minimal signature communicates confidence through restraint. It works at any size — from a small email footer to a large document header.",
    best: "Tech founders, designers, consultants, and anyone whose brand values clarity and precision.",
    tip: "Use ultra-thin script fonts (1–2 px stroke if drawing). Avoid flourishes. Let your initials or a clean loop do the work.",
  },
  {
    name: "Elegant",
    icon: "~",
    description:
      "Flowing, slightly elaborate letterforms with fine strokes and graceful connections between letters. Elegant signatures suggest sophistication, heritage, and premium positioning.",
    best: "Lawyers, doctors, luxury brand founders, creative professionals, and anyone in a premium service industry.",
    tip: "Choose classic cursive fonts or thin calligraphic scripts. Maintain consistent slant (10–15° right lean).",
  },
  {
    name: "Bold",
    icon: "B",
    description:
      "Strong, confident strokes that command attention. A bold signature leaves a memorable impression and works well for anyone who wants their identity to project authority and decisiveness.",
    best: "Executives, artists, architects, and anyone whose personal brand is built on strength and presence.",
    tip: "Use Draw mode at 4–6 px stroke weight, or choose a bold marker-style font from the Type tab.",
  },
  {
    name: "Artistic",
    icon: "✦",
    description:
      "Unique, highly personal forms — often including unexpected flourishes, loops, or abstract elements. An artistic signature is unmistakably yours and impossible to confuse with anyone else's.",
    best: "Illustrators, photographers, musicians, authors, and anyone whose identity is their creative voice.",
    tip: "Use Draw mode on a touchscreen or stylus. Experiment freely. Lean into imperfection — asymmetry and variation are what make it authentic.",
  },
  {
    name: "Professional",
    icon: "P",
    description:
      "A balanced, legible, business-appropriate signature that reads well on formal documents, invoices, and contracts. Professional signatures strike the right tone — authoritative without being ostentatious.",
    best: "Accountants, engineers, HR professionals, small business owners, and anyone who signs a high volume of business documents.",
    tip: "Use clean, medium-weight cursive fonts with good letterform legibility. Avoid excessive decorative elements.",
  },
];

const USER_TYPES = [
  {
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    title: "Freelancers",
    description: "Sign client contracts, NDAs, and proposals with a professional signature that builds trust. Use on invoices to present a complete, polished brand identity to every client.",
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
    title: "Students",
    description: "Sign application forms, internship agreements, academic documents, and scholarship forms. A clean, professional signature reflects your seriousness and attention to detail.",
  },
  {
    icon: <User className="h-5 w-5 text-primary" />,
    title: "Entrepreneurs",
    description: "Your signature is part of your brand. Use it consistently across all business documents, funding agreements, partner contracts, and corporate correspondence.",
  },
  {
    icon: <Camera className="h-5 w-5 text-primary" />,
    title: "Creators & Artists",
    description: "Use your signature as a personal watermark on creative work, artwork, photographs, and designs. A distinctive artistic signature is an identity statement, not just a formality.",
  },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,   title: "GST & Business Documents",   desc: "Insert on GST invoices, e-way bills, and financial documents. Accepted under CBIC guidelines for image-based signatures." },
  { icon: <FileText className="h-5 w-5 text-primary" />,  title: "Contracts & NDAs",            desc: "Sign freelance contracts, employment agreements, NDAs, and service agreements — legally valid under IT Act 2000." },
  { icon: <Layers className="h-5 w-5 text-primary" />,    title: "Personal Branding",           desc: "Use as a personal watermark on creative portfolios, proposals, artwork, and social media content." },
  { icon: <Globe className="h-5 w-5 text-primary" />,     title: "Social Media Identity",       desc: "Create a signature mark that identifies your content across Instagram, LinkedIn, Twitter, and other platforms." },
  { icon: <Mail className="h-5 w-5 text-primary" />,      title: "Email Signatures",            desc: "Add a personal touch to every email in Gmail, Outlook, or any mail client. Insert the PNG into your signature settings." },
  { icon: <FileText className="h-5 w-5 text-primary" />,  title: "PDF Documents",               desc: "Place on any PDF in seconds using Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools — no printing required." },
];

const MISTAKES = [
  { title: "Over-complex design", body: "A signature with too many loops, flourishes, and strokes becomes unreadable — and ironically, less memorable. Complexity should serve character, not replace it." },
  { title: "Hard to read letterforms", body: "If no one can identify which letters form your name, the signature loses its core function. Keep at least the first letter of your first and last name legible." },
  { title: "Too many stylistic effects", body: "Excessive drop shadows, gradient effects, or mixed styles create visual noise. A clean, single-style signature always looks more professional." },
  { title: "Inconsistent style across uses", body: "Re-creating your signature each time produces inconsistency. Download your PNG once and reuse it. Consistency is the foundation of a strong signature identity." },
  { title: "Wrong stroke weight for context", body: "A hairline stroke disappears when printed small; an extremely bold stroke looks aggressive on a formal document. Match stroke weight to your primary use case." },
];

const TIPS = [
  { title: "Keep balance between elements", body: "Whether drawing or choosing a font, look for visual balance — not too top-heavy, not too wide, not too tall. A balanced signature reads naturally at any size." },
  { title: "Match your signature to your brand", body: "If your personal brand is modern and minimal, choose a thin clean script. If it is bold and creative, lean into expressive forms. Consistency between your signature and brand personality builds recognition." },
  { title: "Maintain consistent slant", body: "A signature that shifts between upright and leaning looks unintentional. Decide on a slant angle (0° upright, 10–15° for natural handwriting feel) and keep it consistent." },
  { title: "Use 2–4 px stroke for Draw mode", body: "This range produces the most natural, authentic handwriting appearance. Below 2 px can look too thin in print; above 5 px starts to feel heavy and less refined." },
  { title: "Test at multiple sizes", body: "Check your signature at thumbnail size (email footer) and large size (document header). A good signature design works cleanly across the full range." },
];

export default function SignatureCreator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature Creator Online Free – Design Your Own Signature | Pixocraft",
    description:
      "Create your signature online free with full creative control. Draw, type or upload signature and download high-quality PNG instantly. No login, 100% private.",
    keywords:
      "signature creator, create signature online, signature design online, free signature creator, signature for branding, add signature to PDF, sign documents online, design signature online, online signature creator",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Signature Creator – Pixocraft",
    description:
      "Design your unique signature online for free with full creative control. Draw, type, or upload and download as a transparent PNG. 100% private — runs entirely in your browser. No login required.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                url: "https://tools.pixocraft.in/" },
    { name: "Tools",               url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "Signature Creator",   url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Signature Creator Online Free – Design Your Own Signature | Pixocraft",
    description:
      "Create your signature online free with full creative control. Draw, type or upload signature and download high-quality PNG instantly. No login, 100% private.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Signature Online",
    description:
      "Use Pixocraft's free signature creator to design, customise, and download your unique signature as a transparent PNG in under 60 seconds.",
    steps: HOW_IT_WORKS_STEPS.map((s) => ({ name: s.title, text: s.description })),
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
          { label: "Home",                url: "https://tools.pixocraft.in/" },
          { label: "Tools",               url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Creator" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Signature Creator Online Free – Design Your Unique Signature
              </h1>
              <p className="hidden md:block text-sm text-muted-foreground">Free · No Login · 100% Private · Full Creative Control</p>
            </div>
          </div>

          <p className="hidden md:block text-base text-muted-foreground mb-5 leading-relaxed">
            Design a signature that reflects your identity. <strong>Full creative control</strong>, instant results, no login required.
            <strong> Draw</strong> freehand with a mouse or finger, <strong>type</strong> your name across 50+ curated handwriting fonts,
            or <strong>upload</strong> an existing signature for digital refinement. Download as a crisp transparent PNG — free, private, instantly.
          </p>

          {/* Trust bar */}
          <div className="hidden md:flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />,       label: "Design Signature in 5 Seconds" },
              { icon: <Star className="h-3.5 w-3.5" />,       label: "50+ Creative Styles" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Signup Required" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "100% Private" },
              { icon: <Sparkles className="h-3.5 w-3.5" />,   label: "Perfect for Personal Branding" },
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
        <SignatureToolSection />

        {/* ── QUICK USE BLOCK ──────────────────────────────────────────────── */}
        <div className="rounded-xl border bg-primary/5 px-4 py-4 sm:px-6 sm:py-5 mb-12">
          <p className="font-semibold text-foreground mb-3">Create signature for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Personal branding",
              "Freelancing & clients",
              "GST & business documents",
              "PDF files",
              "Social media identity",
              "Email signatures",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* What is */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What is a Signature Creator?</h2>
            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 mb-5">
              <p className="text-foreground font-medium">
                A <strong>signature creator</strong> is a digital tool that gives you full creative control over designing your own unique
                signature — not just generating a quick output, but allowing you to express your personal identity through the art of signing.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The distinction matters. A <strong>signature generator</strong> typically produces a fast result from limited inputs — a name
              typed in a font, with little control over the outcome. A <strong>signature creator</strong> is more like a design studio: you
              choose the method (drawing, typing, uploading), control the aesthetics (colour, weight, style), preview in real context, and
              download a result that genuinely feels like <em>you</em>.
            </p>
            <p className="text-muted-foreground mb-4">
              Pixocraft's free <strong>online signature creator</strong> is built on this philosophy. The Draw tab provides a full canvas
              drawing experience with pressure-simulated strokes. The Type tab gives you access to 50+ carefully curated handwriting fonts
              across 7 style categories. The Upload tab lets you refine an existing pen-on-paper signature by removing its background and
              upscaling for digital use. Every output is exported at print-quality resolution — 3200×1040 px — with a transparent background
              and zero watermarking.
            </p>
            <p className="text-muted-foreground mb-4">
              Whether you need to <strong>create a signature online</strong> for a freelance contract, design your signature for
              personal branding, or generate a consistent identity mark for business documents, this <strong>free signature creator</strong>{" "}
              gives you the control and quality to do it right — in under 60 seconds, entirely within your browser.
            </p>
            <p className="text-muted-foreground">
              All processing happens locally using the HTML5 Canvas API. Your signature data never leaves your device, making this one of
              the most private and secure <strong>signature design online</strong> tools available.
            </p>
          </section>

          {/* Why signature matters */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Why Your Signature Matters — Identity, Memory & Brand</h2>
            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 mb-5">
              <p className="text-foreground font-medium">
                A signature is not just a way to authorise a document — it is one of the most ancient and persistent forms of personal identity.
                Psychologists and brand experts alike recognise that a distinctive signature communicates authority, individuality, and intentionality
                in ways that a typed name simply cannot.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              <strong>Identity:</strong> Your signature is a direct expression of who you are — compressed into a few strokes or letterforms.
              The way you form your letters, the weight of your strokes, the angle of your slant — all of these communicate character.
              A carefully designed signature says you take your identity seriously.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Memory:</strong> A distinctive signature is memorable in a way that a printed name is not. Clients who receive a
              proposal signed with a clean, well-designed signature remember it differently — it signals intention and presence. In a world
              of templated documents and digital transactions, a personal signature stands out.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Personal Branding:</strong> For freelancers, entrepreneurs, and creators, your signature is part of your visual identity
              ecosystem — alongside your logo, colour palette, and typography. Using a consistent, well-designed signature across all client
              communications and documents builds brand recognition and trust over time.
            </p>
            <p className="text-muted-foreground">
              This is why the difference between a <strong>signature creator</strong> and a basic generator matters. When your signature
              represents your identity and brand, the tool you use to create it should give you the control to get it right.
            </p>
          </section>

          {/* How to create */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Create Your Signature — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Design your signature in four steps — done in under 60 seconds:</p>
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
            <p className="hidden md:block text-sm text-muted-foreground">
              Want the full tool with additional options?{" "}
              <Link href="/tools/signature-pad-tool" className="text-primary hover:underline underline-offset-2 font-medium">
                Visit the main Signature Generator
              </Link>.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Core Features of Pixocraft's Signature Creator</h2>
            <p className="text-muted-foreground mb-5">
              Built for creative professionals, entrepreneurs, and anyone who wants a signature that genuinely represents them:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(({ icon, title, description }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Draw, Type, or Upload — Three Creative Approaches</h2>
            <p className="text-muted-foreground mb-5">
              Each method unlocks a different dimension of creative expression. Here is how to think about them:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  method: "Draw",
                  label: "Originality",
                  color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                  text: "text-blue-900 dark:text-blue-200",
                  description: "Drawing is the most authentic expression of your signature. Using a mouse on desktop or your finger on a touchscreen, you create a genuinely unique mark — no two drawn signatures are exactly the same. This is the method to choose when your signature needs to feel personal, one-of-a-kind, and unmistakably human. The pressure-simulated canvas engine ensures natural stroke variation.",
                },
                {
                  method: "Type",
                  label: "Speed & Consistency",
                  color: "bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800",
                  text: "text-violet-900 dark:text-violet-200",
                  description: "Typing gives you speed and reproducibility. With 50+ handwriting fonts across 7 style categories, the Type tab lets you find a font that feels authentically like your own handwriting — or the handwriting you wish you had. Every output is consistent and clean, making it ideal for professionals who sign high volumes of documents and need a dependable, always-identical result.",
                },
                {
                  method: "Upload",
                  label: "Refinement",
                  color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                  text: "text-green-900 dark:text-green-200",
                  description: "Uploading is for those who already have a signature they love — on paper — and want to bring it into the digital world cleanly. Photograph your existing signature on white paper, upload it, and the background removal algorithm strips the white automatically, leaving a clean transparent PNG ready for any document. Refinement, not reinvention.",
                },
              ].map(({ method, label, color, text, description }) => (
                <div key={method} className={`rounded-xl border px-5 py-4 ${color}`}>
                  <p className={`font-semibold ${text} mb-2`}>
                    {method} — <span className="font-normal">{label}</span>
                  </p>
                  <p className={`text-sm ${text} leading-relaxed opacity-90`}>{description}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground px-1">
              <strong>Quick pick:</strong> Want something uniquely personal? → <strong>Draw</strong>. Need consistency at volume? → <strong>Type</strong>. Already have a signature? → <strong>Upload</strong>.
            </p>
          </section>

          {/* Signature Creator vs Generator */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Signature Creator vs Signature Generator — What's the Difference?</h2>
            <p className="text-muted-foreground mb-5">
              The terminology matters. Understanding the difference helps you choose the right tool for your needs:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Signature Creator</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Signature Generator</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { feature: "Creative control",   creator: "High — full customisation",         generator: "Medium — limited options" },
                    { feature: "Creativity",          creator: "High — express your identity",      generator: "Low — predefined outputs" },
                    { feature: "Methods available",   creator: "Draw + Type + Upload",             generator: "Usually Type only" },
                    { feature: "Font selection",      creator: "50+ curated handwriting fonts",    generator: "5–10 basic fonts" },
                    { feature: "Export quality",      creator: "3200×1040 px (4× resolution)",     generator: "Screen resolution only" },
                    { feature: "Use case",            creator: "Branding, identity, all documents", generator: "Quick, one-off signing tasks" },
                    { feature: "Privacy",             creator: "100% client-side",                 generator: "Often server-processed" },
                  ].map(({ feature, creator, generator }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{creator}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{generator}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hidden md:block text-sm text-muted-foreground">
              If your signature represents your identity and brand, use a <strong>creator</strong>. If you just need a quick one-time signature
              for a single document, a generator may suffice — but the quality difference will be visible.
            </p>
          </section>

          {/* Design Styles */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Signature Design Styles — Find Your Expression</h2>
            <p className="text-muted-foreground mb-5">
              A great signature design matches both your personality and the professional context in which you use it. Here are five distinct style directions:
            </p>
            <div className="space-y-3">
              {DESIGN_STYLES.map(({ name, description, best, tip }) => (
                <div key={name} className="p-5 rounded-xl border bg-card">
                  <p className="font-semibold text-foreground mb-2">{name}</p>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{description}</p>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-primary">Best for: {best}</p>
                    <p className="text-xs text-muted-foreground">Pro tip: {tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Signature for Different Users */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Who Uses This Signature Creator — and How</h2>
            <p className="text-muted-foreground mb-5">
              Pixocraft's free online signature creator serves a wide range of users, each with different needs and signing contexts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USER_TYPES.map(({ icon, title, description }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Real Use Cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Real Use Cases — Where to Use Your Created Signature</h2>
            <p className="text-muted-foreground mb-5">
              Your downloaded PNG works across every major professional and personal context:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USE_CASES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Legal validity */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Legal Validity of Created Signatures in India</h2>
            <p className="text-muted-foreground mb-5">
              Signatures created with this tool are legally recognised for a wide range of uses in India:
            </p>
            <div className="space-y-4 mb-5">
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  IT Act 2000 — Legal Foundation
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Information Technology Act 2000 formally recognises electronic signatures as legally equivalent to handwritten
                  signatures for most civil and commercial transactions. A signature created and downloaded as a PNG image carries
                  the same legal force as an ink signature — provided both parties intend to be bound by the document and consent to
                  electronic means.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  Business Usage
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Contracts, service agreements, NDAs, employment letters, purchase orders, GST invoices, and most commercial
                  documents legally accept image-based electronic signatures. Thousands of businesses across India use PNG-based
                  signatures in Tally, Zoho Books, and custom invoice templates every day — without legal complications.
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" /> Important:</strong>
              For MCA ROC filings, court submissions, income tax e-verification, or property registration, a certified Digital
              Signature Certificate (DSC) from a licensed Certifying Authority (CA) is mandatory. Consult a legal professional
              for documents with significant legal or financial consequences.
            </div>
          </section>

          {/* Design Mistakes */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Common Signature Design Mistakes to Avoid</h2>
            <p className="text-muted-foreground mb-5">These are the most common errors that undermine an otherwise well-intentioned signature:</p>
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

          {/* Pro Design Tips */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pro Signature Design Tips</h2>
            <p className="text-muted-foreground mb-5">Follow these best practices to create a signature that is both professional and authentically yours:</p>
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

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why Choose Pixocraft's Signature Creator?</h2>
            <p className="text-muted-foreground mb-5">
              Many tools claim to help you <strong>create a signature online free</strong>. Here is what sets Pixocraft apart:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Lock className="h-4 w-4 text-primary" />,       title: "Zero data collection",        body: "No server processing, no analytics on your signature, no behavioural tracking. Your creative work stays yours." },
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "No friction, no walls",       body: "No registration, no email confirmation, no onboarding flow. Open the page, create your signature, done." },
                { icon: <Sparkles className="h-4 w-4 text-primary" />,   title: "Genuinely creative",          body: "Three methods, 50+ fonts, full colour and stroke control. This is a creator, not just a generator." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "4× resolution export",        body: "3200×1040 px output. Your signature looks sharp in any document, presentation, or print material." },
                { icon: <Globe className="h-4 w-4 text-primary" />,      title: "Any device, any browser",     body: "Desktop, tablet, or smartphone — Chrome, Safari, Firefox — no installation required." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Free forever — no catch",    body: "No watermark, no usage limits, no upgrade prompt for PNG export. Free means genuinely free." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-3 sm:p-4 rounded-xl border bg-card">
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
                data-testid="button-create-signature-cta"
              >
                <Sparkles className="h-4 w-4" />
                Create Your Signature Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal Linking */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Related Signature Tools</h2>
            <p className="text-muted-foreground mb-5">
              Explore the full Pixocraft signature ecosystem — each tool built for a specific signing need or keyword intent:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/esignature-maker",                  title: "eSignature Maker",               desc: "The main authority page for electronic signatures — GST & legal ready." },
                { href: "/tools/handwritten-signature-generator",   title: "Handwritten Signature Generator", desc: "50+ real handwriting styles for an authentic pen-on-paper feel." },
                { href: "/tools/free-signature-generator",          title: "Free Signature Generator",        desc: "100% free signature creation with no hidden costs or premium tiers." },
                { href: "/tools/signature-maker",                   title: "Signature Maker",                 desc: "The flagship maker tool — all features, maximum control." },
                { href: "/tools/digital-signature-generator",       title: "Digital Signature Generator",     desc: "Detailed DSC vs eSignature guidance for compliance-focused users." },
                { href: "/tools/signature-pad-tool",                title: "Signature Pad Tool",              desc: "The core signature pad powering all Pixocraft signature tools." },
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Frequently Asked Questions — Signature Creator</h2>
            <p className="text-muted-foreground mb-5">Answers to the most common questions about creating and using signatures online:</p>
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
          <section className="rounded-xl border bg-primary/5 px-4 py-6 sm:px-6 sm:py-8 text-center">
            <Sparkles className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Design Your Signature — It Starts Here</h2>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto text-sm">
              Your signature is your identity mark. Take 60 seconds to create one that genuinely represents you — free, private,
              and with the creative control you deserve.
            </p>
            <Button
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2"
              data-testid="button-create-signature-final"
            >
              <Sparkles className="h-4 w-4" />
              Create Your Signature Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
