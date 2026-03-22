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
  PenTool, Shield, Zap, Smartphone, Star, Check, FileText,
  Mail, Globe, ChevronDown, ChevronUp, ArrowRight, Lock,
  AlertCircle, BadgeCheck, Pencil, Upload, Type, Palette,
  Receipt, Briefcase, Feather,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/handwritten-signature-generator";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 2026";

const FAQS = [
  {
    question: "How to create a handwritten signature online?",
    answer:
      "Use Pixocraft to type your name in 50+ cursive and handwriting fonts, or draw your signature freehand with a mouse or finger and download it as a transparent PNG instantly. No login, no signup, no watermark.",
  },
  {
    question: "What is the best signature style?",
    answer:
      "A good signature should be simple, unique, and easy to recognise while maintaining a personal style. For business use, a clean cursive or flowing script works best. For creative or personal use, a bolder, more stylised handwriting style adds character. Use Pixocraft's 7 font categories — Signature, Elegant, Professional, Handwritten, Creative, Casual, Rare — to find your perfect match.",
  },
  {
    question: "Can I download the signature as PNG?",
    answer:
      "Yes. Pixocraft allows you to download high-quality transparent PNG signatures at 3200×1040 px — four times your display resolution — ensuring sharpness in documents, PDFs, and print. No watermark, no login required.",
  },
  {
    question: "Is this handwritten signature generator completely free?",
    answer:
      "Yes — 100% free, forever. No subscription, no watermark, no hidden upgrade. Create and download unlimited handwritten signatures at no cost.",
  },
  {
    question: "What is a stylish signature maker?",
    answer:
      "A stylish signature maker is a tool that lets you design a visually appealing, personalised signature using cursive fonts, calligraphic scripts, or freehand drawing. Pixocraft offers 50+ handwriting fonts across 7 style categories so you can create everything from an elegant formal signature to a bold creative one — in seconds.",
  },
  {
    question: "How many cursive fonts are available?",
    answer:
      "Over 50 handwritten and cursive Google Fonts across 7 style categories: Signature, Elegant, Professional, Creative, Handwritten, Casual, and Rare. You can search by name, filter by category, and sort by popularity or A–Z.",
  },
  {
    question: "Is a handwritten signature generated online legally valid in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 and its 2008 Amendment (Section 3A), electronic signatures — including image-based handwritten signatures — are legally recognised for contracts, GST invoices, NDAs, HR documents, and most business agreements. A DSC is only required for government portal filings (MCA ROC, income tax e-verification).",
  },
  {
    question: "Can I use a handwritten signature for GST invoices?",
    answer:
      "Yes. GST invoices and e-way bills accept image-based handwritten signatures. Download your transparent PNG and insert it into your invoice template in Tally, Zoho Books, or any billing software that supports image insertion. CBIC guidelines permit image signatures on manually generated invoices.",
  },
  {
    question: "Does this tool work on mobile phones?",
    answer:
      "Yes. The Draw tab is fully touch-optimised — single-touch strokes work naturally on any smartphone or tablet. The Type and Upload tabs also work on all mobile browsers including Chrome, Safari, and Firefox for iOS and Android.",
  },
  {
    question: "Is my handwritten signature data secure?",
    answer:
      "Completely. This tool runs 100% inside your browser using the HTML5 Canvas API. No drawing strokes, typed text, or uploaded images are ever sent to any server. Everything stays on your device.",
  },
  {
    question: "What is the difference between a handwritten signature and a digital signature?",
    answer:
      "A handwritten signature (created with this tool) is a visual PNG image of your signature — called a Simple Electronic Signature (SES). It is used for contracts, invoices, and business documents. A DSC (Digital Signature Certificate) is a cryptographically verified identity token issued by a licensed Certifying Authority — required for MCA ROC filings and government portals. For everyday documents, a handwritten PNG is fully sufficient.",
  },
  {
    question: "Can I reuse the same signature PNG multiple times?",
    answer:
      "Absolutely. Download your handwritten signature once and reuse it across unlimited documents — contracts, invoices, proposals, email footers, forms, and more. Pixocraft also stores your last 12 saved signatures in your browser so you can re-download without recreating.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Enter your name or draw",
    text: "Type your name in the Type tab to browse 50+ cursive fonts, or switch to the Draw tab to sketch your signature freehand with your mouse or finger.",
  },
  {
    name: "Choose your style",
    text: "Select from 50+ handwritten fonts across 7 categories — Signature, Elegant, Professional, Handwritten, Creative, Casual, and Rare. Filter by category or search by name.",
  },
  {
    name: "Customise ink and size",
    text: "Pick black or dark blue ink, adjust stroke weight, and use draw presets (Default, Elegant, Bold, Quick) for the perfect look.",
  },
  {
    name: "Download as PNG",
    text: "Click Download → PNG for a transparent background (best for documents) or JPG for a white background. No watermark, no login.",
  },
];

const SIGNATURE_STYLES = [
  { font: "Great Vibes",    category: "Signature",    label: "Stylish Flowing",      desc: "Ultra-thin flowing script — ideal for formal documents and personal branding." },
  { font: "Allura",         category: "Signature",    label: "Elegant Cursive",      desc: "Classic cursive with graceful loops — timeless and professional." },
  { font: "Pacifico",       category: "Creative",     label: "Bold & Modern",        desc: "Strong, confident strokes — great for creative work and announcements." },
  { font: "Caveat",         category: "Handwritten",  label: "Casual Everyday",      desc: "Natural handwriting feel — approachable and personal." },
  { font: "Norican",        category: "Professional", label: "Formal Calligraphy",   desc: "Upright formal style — excellent for legal documents and NDAs." },
  { font: "Dancing Script", category: "Professional", label: "Professional Script",  desc: "Clean, consistent script — trusted across contracts and invoices." },
];

const FEATURES = [
  { icon: <Pencil className="h-5 w-5 text-primary" />,  title: "Natural Drawing Engine",       desc: "Pressure-simulated stroke rendering with undo/redo, variable ink colour, and 4 draw presets (Default, Elegant, Bold, Quick). Feels like real pen on paper." },
  { icon: <Type className="h-5 w-5 text-primary" />,    title: "50+ Cursive & Handwriting Fonts", desc: "7 style categories. Search, filter by category, sort by popularity or A–Z. Recently used font remembered automatically." },
  { icon: <Upload className="h-5 w-5 text-primary" />,  title: "Upload & Background Removal",  desc: "Photograph an existing signature and upload it. One-click white background removal delivers a clean transparent PNG." },
  { icon: <Palette className="h-5 w-5 text-primary" />, title: "Full Customisation",            desc: "Ink colour (black, navy, custom hex), stroke thickness (1–30 px), advanced draw settings (thinning, smoothing, streamline, angle)." },
  { icon: <Zap className="h-5 w-5 text-primary" />,     title: "4× High-Resolution Export",    desc: "Exports at 3200×1040 px — crisp at any print or screen size. No pixelation, no blurring." },
  { icon: <Shield className="h-5 w-5 text-primary" />,  title: "100% Client-Side Privacy",     desc: "Every stroke, every character, every upload is processed entirely in your browser. Nothing leaves your device — ever." },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,  title: "GST Invoices & E-way Bills",    desc: "Insert your handwritten signature PNG directly into Tally, Zoho Books, or any billing template. Legally accepted for image-based signatures on manually generated GST invoices." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Contracts & Agreements",        desc: "Sign NDAs, service agreements, freelance contracts, and employment letters with a professional handwritten signature — legally valid under the IT Act 2000." },
  { icon: <Mail className="h-5 w-5 text-primary" />,     title: "Email Signatures",             desc: "Add a personal handwritten touch to every email. Works in Gmail, Outlook, and all major email clients — insert the PNG in your signature settings." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />,title: "Personal Branding",            desc: "Use your stylish signature as a watermark on creative work, photos, artwork, or designs — a personal mark that identifies your brand." },
  { icon: <Globe className="h-5 w-5 text-primary" />,    title: "Business Forms & HR",          desc: "HR onboarding forms, banking documents, and government portals commonly accept PNG signatures. Works directly with your download." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "PDF Documents",                desc: "Insert the transparent PNG into any PDF using Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools — in seconds, without printing or scanning." },
];

const TIPS = [
  { title: "Use 2–4 px stroke weight for drawing",      body: "Thin strokes look more authentic and natural. Avoid going above 5 px unless you specifically want a bold calligraphic style." },
  { title: "Always export as PNG for documents",         body: "Transparent PNG overlays cleanly on any document background. JPG is only useful for email clients that don't support transparency." },
  { title: "Try multiple fonts before choosing",         body: "Click through at least 8–10 fonts. Subtle differences in letterform and spacing can dramatically change the feel of your signature." },
  { title: "Save your master PNG securely",              body: "Download once, store in Google Drive or Dropbox, and reuse forever. Pixocraft also keeps your last 12 signatures in browser history." },
  { title: "Use dark blue or black ink only",            body: "These are universally accepted in legal and corporate contexts and read best on any printed or digital background." },
];

export default function HandwrittenSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Handwritten Signature Generator – Stylish Name Signature Maker (Free)",
    description:
      "Create stylish handwritten signature online free. Choose from 50+ cursive fonts or draw your own signature. Download PNG instantly. No login required.",
    canonical: CANONICAL,
    ogTitle: "Handwritten Signature Generator – Stylish Signature Maker | Pixocraft",
    ogDescription:
      "Create stylish handwritten signature with 50+ cursive fonts or draw your own. Download transparent PNG instantly. No login, no watermark.",
    keywords:
      "handwritten signature generator, stylish signature maker, cursive signature generator, name signature design, handwritten signature online free, stylish name signature",
  });

  const schemas = [
    generateFAQSchema(FAQS),
    generateHowToSchema({
      name: "Create Handwritten Signature Online",
      description:
        "Use Pixocraft's free handwritten signature generator to type your name in cursive fonts or draw your own signature and download as PNG.",
      steps: HOWTO_STEPS,
    }),
    generateSoftwareApplicationSchema({
      name: "Pixocraft Handwritten Signature Generator",
      description:
        "Create a stylish handwritten signature online for free. Draw naturally with mouse or touch, or choose from 50+ cursive and handwriting fonts. Download as transparent PNG.",
      url: CANONICAL,
      applicationCategory: "WebApplication",
      operatingSystem: "Any (browser-based)",
      price: "0",
      rating: { value: "4.9", count: "4200" },
    }),
    generateBreadcrumbSchema([
      { name: "Home",                             url: "https://tools.pixocraft.in/" },
      { name: "Tools",                            url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
      { name: "Handwritten Signature Generator",  url: CANONICAL },
    ]),
    generateWebPageSchema({
      name: "Handwritten Signature Generator – Stylish Name Signature Maker (Free)",
      description:
        "Create stylish handwritten signature online free. Choose from 50+ cursive fonts or draw your own. Download PNG instantly. No login required.",
      url: CANONICAL,
      lastModified: LAST_UPDATED,
    }),
  ];

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, i) => (
        <StructuredData key={i} schema={schema} />
      ))}

      <div className="max-w-4xl mx-auto px-4 py-5 sm:py-8 space-y-6 sm:space-y-10">

        {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Generator", url: "/tools/signature-pad-tool" },
            { label: "Handwritten Signature Generator" },
          ]}
        />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Feather className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Handwritten Signature Generator –{" "}
              <span className="text-primary">Stylish Name Signature Maker</span>{" "}
              (Free)
            </h1>
          </div>
          <p className="hidden md:block text-sm sm:text-base text-muted-foreground leading-relaxed">
            Create a <strong>stylish handwritten signature</strong> online in seconds. Choose from
            <strong> 50+ cursive and handwriting fonts</strong> or draw your own signature freehand.
            Download as a crisp transparent PNG — no login, no watermark, 100% private.
          </p>
          <div className="hidden md:flex flex-wrap gap-2">
            {[
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup" },
              { icon: <Star className="h-3.5 w-3.5" />,        label: "50+ Cursive Fonts" },
              { icon: <Zap className="h-3.5 w-3.5" />,         label: "Instant Download" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <Smartphone className="h-3.5 w-3.5" />,  label: "Mobile Ready" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />,  label: "GST & Doc Ready" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/20"
              >
                {icon}{label}
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURED SNIPPET ─────────────────────────────────────────────── */}
        <div className="hidden md:block rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-4 sm:px-6 sm:py-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quick Answer</p>
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            What is the best way to create a handwritten signature online?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The fastest way is to <strong>type your name</strong> in the Type tab and browse
            <strong> 50+ cursive and handwriting fonts</strong> — find your style in seconds. For a
            truly personal touch, use the <strong>Draw tab</strong> to sketch your own signature with
            your mouse or finger. Both methods export a{" "}
            <strong>high-resolution transparent PNG (3200×1040 px)</strong> — no login, no watermark,
            instant download.
          </p>
          <div className="hidden md:grid grid-cols-4 gap-3 pt-1">
            {[
              { label: "Fonts",          value: "50+ Cursive" },
              { label: "Export",         value: "Transparent PNG" },
              { label: "Resolution",     value: "3200 × 1040 px" },
              { label: "Price",          value: "Free Forever" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-background border p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                <p className="font-semibold text-foreground text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <SignatureToolSection
          mode="draw"
          caption="No watermark · Transparent PNG · 50+ cursive fonts · Works offline after page load"
        />

        {/* ── LIVE SIGNATURE STYLE EXAMPLES ────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Stylish Signature Styles — Live Preview
            </h2>
            <p className="text-muted-foreground">
              Browse 6 popular handwriting styles. Each is rendered live in the actual font — what you
              see is exactly what you'll get in your PNG.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SIGNATURE_STYLES.map(({ font, category, label, desc }) => (
              <div
                key={label}
                className="rounded-xl border bg-card p-5 space-y-3 hover-elevate transition-all"
                data-testid={`style-card-${label.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-primary/10 text-primary">{category}</span>
                </div>
                <p
                  style={{ fontFamily: `'${font}', cursive`, fontSize: "clamp(26px, 5vw, 40px)", lineHeight: 1.3, color: "#111" }}
                  className="overflow-hidden whitespace-nowrap text-ellipsis bg-white rounded-lg px-3 py-2"
                  alt="handwritten signature generator stylish cursive signature png"
                >
                  Your Name
                </p>
                <p className="hidden md:block text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          <p className="hidden md:block text-sm text-muted-foreground">
            Switch to the <strong>Type</strong> tab, type your name, and browse all 50+ fonts — each renders live so you see exactly your signature.
          </p>
        </section>

        {/* ── WHAT IS ──────────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">What is a Handwritten Signature Generator?</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5">
            <p className="text-foreground font-medium">
              A <strong>handwritten signature generator</strong> is a browser-based tool that lets you
              create a natural, realistic-looking signature online — one that closely replicates the look and
              feel of ink on paper — without any printing, scanning, or software installation.
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Pixocraft's free tool gives you three creation methods. The <strong>Draw tab</strong> uses a
            pressure-simulated canvas engine with 4 presets (Default, Elegant, Bold, Quick) optimised for
            authentic stroke rendering. The <strong>Type tab</strong> offers 50+ Google Fonts curated
            specifically for their handwriting authenticity — organised into 7 categories with search and
            sort. The <strong>Upload tab</strong> lets you digitise an existing pen-on-paper signature with
            automatic background removal.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The output is a high-resolution transparent PNG at <strong>3200×1040 px</strong> — print-quality,
            watermark-free, and ready to insert into any PDF, Word document, Google Doc, or email client immediately.
          </p>
        </section>

        {/* ── HOW TO ───────────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">How to Create a Handwritten Signature Online</h2>
          <p className="text-muted-foreground">Step by step — done in under 60 seconds.</p>
          <ol className="space-y-3">
            {HOWTO_STEPS.map(({ name, text }, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
                <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Features of the Handwritten Signature Generator</h2>
            <p className="text-muted-foreground">Built for professionals, creatives, and businesses who need an authentic-looking, high-quality handwritten signature.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CURSIVE FONT GUIDE ───────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Cursive Signature Generator — 7 Style Categories</h2>
            <p className="text-muted-foreground">
              Pixocraft's 50+ fonts are organised into 7 categories so you can find your style instantly.
            </p>
          </div>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm min-w-[500px]">
              <thead>
                <tr className="bg-primary/5 border-b">
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Category</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Best For</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Example Fonts</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Signature",    "Official documents, legal use",           "Great Vibes, Allura, Pinyon Script"],
                  ["Elegant",     "Formal, high-end branding",               "Ms Madi, Waterfall, Moon Dance"],
                  ["Professional","Contracts, invoices, business",           "Dancing Script, Satisfy, Merienda"],
                  ["Handwritten", "Natural personal feel",                   "Caveat, Indie Flower, Gochi Hand"],
                  ["Creative",    "Artistic, standout branding",             "Pacifico, Lobster, Berkshire Swash"],
                  ["Casual",      "Informal, friendly communication",        "Amatic SC, Permanent Marker, Rock Salt"],
                  ["Rare",        "Unique, memorable signatures",            "Euphoria Script, Stalemate, Bilbo"],
                ].map(([cat, best, examples]) => (
                  <tr key={cat} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">{cat}</td>
                    <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{best}</td>
                    <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground text-xs">{examples}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── USE CASES ────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Where to Use Your Handwritten Signature</h2>
            <p className="text-muted-foreground">Your downloaded transparent PNG works everywhere a physical signature would — and more.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {USE_CASES.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIPS ─────────────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Tips for a Professional Handwritten Signature</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIPS.map(({ title, body }) => (
              <div key={title} className="rounded-xl border bg-card p-4 space-y-1.5">
                <p className="font-semibold text-foreground text-sm">{title}</p>
                <p className="hidden md:block text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── NAME SIGNATURE DESIGN GUIDE ──────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Name Signature Design — What Makes a Great Signature?</h2>
            <p className="text-muted-foreground">Understanding these principles will help you create a signature that's both stylish and functional.</p>
          </div>
          <div className="space-y-3">
            {[
              { n: "1", t: "Readability vs. Style",      d: "A great name signature balances legibility with personal flair. For legal documents, keep the first letter of your name clear. For branding, stylisation can be stronger." },
              { n: "2", t: "Consistency is your identity", d: "The same signature on every document builds trust and professional credibility. Use the same PNG file every time — never redraw from scratch." },
              { n: "3", t: "Proportions matter",           d: "A signature that's too tall looks cramped; too wide looks lazy. Aim for a natural width-to-height ratio of roughly 3:1 to 4:1." },
              { n: "4", t: "Ink colour signals intent",    d: "Black = formal/legal. Dark blue = business standard. Navy = professional. Avoid bright colours for any document use." },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex gap-4 p-4 rounded-xl border bg-card">
                <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{n}</span>
                <div>
                  <p className="font-semibold text-foreground">{t}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── LEGAL VALIDITY ───────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Is a Handwritten Online Signature Legal?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { flag: "🇮🇳", country: "India",          law: "IT Act 2000 + Amendment 2008",       desc: "Valid for contracts, GST invoices, HR docs, and most commercial agreements." },
              { flag: "🇺🇸", country: "United States",  law: "ESIGN Act + UETA",                   desc: "Same legal effect as handwritten for most contracts and agreements." },
              { flag: "🇪🇺", country: "European Union", law: "eIDAS Regulation (2016)",            desc: "Qualifies as Simple Electronic Signature (SES) — valid for most documents." },
              { flag: "🇬🇧", country: "United Kingdom", law: "Electronic Communications Act 2000", desc: "Legally binding for most business agreements." },
            ].map(({ flag, country, law, desc }) => (
              <div key={country} className="rounded-xl border bg-card p-4 space-y-1.5">
                <p className="font-semibold text-foreground flex items-center gap-2"><span>{flag}</span>{country}</p>
                <p className="text-xs font-medium text-primary">{law}</p>
                <p className="hidden md:block text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200 flex gap-3">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span><strong>Note:</strong> For MCA ROC filings, court e-filings, property registration, or government tenders requiring a Class 3 DSC — consult a CA. For all other commercial documents, a PNG signature is fully sufficient.</span>
          </div>
        </section>

        {/* ── TRUST ────────────────────────────────────────────────────────── */}
        <section className="rounded-xl border bg-muted/30 p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Star className="h-5 w-5 text-amber-500" />,     title: "4.9 / 5 Rating",       desc: "Based on 4,200+ user reviews from professionals and businesses." },
              { icon: <Shield className="h-5 w-5 text-green-600" />,   title: "100% Browser-Based",  desc: "No server upload. Your signature stays on your device — fully private." },
              { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "Made in India",       desc: "Built for Indian professionals, GST rules, and global document standards." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3 items-start">
                <div className="shrink-0 h-9 w-9 rounded-lg bg-background border flex items-center justify-center">{icon}</div>
                <div><p className="font-semibold text-foreground text-sm">{title}</p><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything about handwritten signature generators — answered clearly.</p>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover-elevate"
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-semibold text-foreground text-sm leading-snug">{faq.question}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── RELATED TOOLS ─────────────────────────────────────────────────── */}
        <section className="rounded-xl border bg-muted/30 p-6 space-y-4">
          <p className="font-semibold text-foreground text-base">Related Tools</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/tools/signature-pad-tool",              label: "Signature Generator" },
              { href: "/tools/create-digital-signature",         label: "Digital Signature" },
              { href: "/tools/signature-for-gst-invoice",        label: "GST Invoice Signature" },
              { href: "/tools/signature-for-pdf",                label: "Signature for PDF" },
              { href: "/tools/email-signature-generator",        label: "Email Signature" },
              { href: "/tools/add-signature-to-pdf",             label: "Add Signature to PDF" },
              { href: "/tools/pdf-merger",                       label: "PDF Merger" },
              { href: "/tools/background-remover",               label: "Background Remover" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-background text-sm font-medium hover-elevate transition-all text-foreground">
                  {label}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t">
            Last Updated: {LAST_UPDATED} &nbsp;·&nbsp; Made in India &nbsp;·&nbsp; By the Pixocraft Team
          </p>
        </section>

      </div>
    </div>
  );
}
