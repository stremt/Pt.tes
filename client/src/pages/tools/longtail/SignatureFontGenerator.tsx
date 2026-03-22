import { useState } from "react";
import { Link } from "wouter";
import { SignatureRelatedTools } from "@/components/SignatureInternalLinks";
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
  Type, Shield, Zap, Smartphone, Star, Check, FileText,
  Mail, ChevronDown, ChevronUp, ArrowRight, Lock,
  BadgeCheck, Receipt, Palette, Download, Globe,
} from "lucide-react";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-font-generator";
const LAST_UPDATED = "March 2026";

const FAQS = [
  {
    question: "What is a signature font generator?",
    answer:
      "A signature font generator allows you to create stylish handwritten signatures using cursive and calligraphy fonts. Type your name, choose a font from 50+ options, and download as a transparent PNG instantly.",
  },
  {
    question: "Which font is best for signature?",
    answer:
      "Cursive and calligraphy fonts are best for creating a natural handwritten signature. Great Vibes, Allura, and Dancing Script are top choices for formal documents, while Pacifico and Caveat work well for a casual, personal feel.",
  },
  {
    question: "Can I download signature as PNG?",
    answer:
      "Yes, you can download your signature as a high-quality transparent PNG. Every download is 3200×1040 px — four times display resolution — with no white background, no watermark, and no login required.",
  },
  {
    question: "Is this tool free?",
    answer:
      "Yes, Pixocraft signature font generator is completely free with no login required. No subscription, no hidden fees, no watermark. Create and download unlimited signatures forever.",
  },
  {
    question: "How do I generate a signature using fonts?",
    answer:
      "Type your name in the Type tab, browse 50+ handwriting fonts across 7 style categories (Signature, Elegant, Professional, Creative, Handwritten, Casual, Rare), click the font you like, and download as PNG. Done in under 60 seconds.",
  },
  {
    question: "Which fonts are available?",
    answer:
      "Over 50 Google Fonts curated for their handwriting authenticity, organised into 7 categories. Popular examples include Great Vibes, Allura, Dancing Script, Pacifico, Caveat, and Norican.",
  },
  {
    question: "Is a font-generated signature legally valid in India?",
    answer:
      "Yes. Under the IT Act 2000 (India), ESIGN Act (USA), and eIDAS Regulation (EU), image-based electronic signatures — including font-generated ones — are legally valid for contracts, GST invoices, HR documents, and most commercial agreements.",
  },
  {
    question: "Can I use a font signature for GST invoices?",
    answer:
      "Yes. Download your font signature as a transparent PNG and insert it into your GST invoice template in Tally, Zoho Books, or any billing software. CBIC guidelines permit image-based signatures on manually generated GST invoices.",
  },
  {
    question: "Does this tool work on mobile?",
    answer:
      "Yes. Works perfectly on all mobile browsers — Chrome, Safari, and Firefox on iOS and Android. Browse fonts, preview your signature, and download with a single tap.",
  },
  {
    question: "Is my name or data stored on any server?",
    answer:
      "No. The tool runs 100% inside your browser. The name you type and the signature you generate are never sent to any server. Everything stays on your device.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Enter your name",
    text: "Type your name into the signature generator Type tab. The preview updates live as you type.",
  },
  {
    name: "Choose font style",
    text: "Select a cursive or stylish signature font from 50+ options across 7 categories — Signature, Elegant, Professional, Creative, Handwritten, Casual, and Rare.",
  },
  {
    name: "Download signature",
    text: "Click Download → PNG for a transparent background signature. No watermark, no login — your high-resolution PNG is ready in seconds.",
  },
];

const FONT_EXAMPLES = [
  { font: "Great Vibes",    category: "Signature",    label: "Great Vibes",    desc: "Ultra-thin flowing script — ideal for formal documents and personal branding." },
  { font: "Allura",         category: "Elegant",      label: "Allura",         desc: "Classic cursive with graceful loops — timeless and professional." },
  { font: "Dancing Script", category: "Professional", label: "Dancing Script", desc: "Clean, consistent script — trusted across contracts and invoices." },
  { font: "Pacifico",       category: "Creative",     label: "Pacifico",       desc: "Strong, confident strokes — great for creative work and personal branding." },
  { font: "Caveat",         category: "Handwritten",  label: "Caveat",         desc: "Natural handwriting feel — approachable and personal." },
  { font: "Norican",        category: "Professional", label: "Norican",        desc: "Upright formal style — excellent for legal documents and NDAs." },
];

const FEATURES = [
  { icon: <Type className="h-5 w-5 text-primary" />,       title: "50+ Signature Fonts",        desc: "7 style categories. Search, filter by category, sort by popularity or A–Z. Recently used font remembered automatically." },
  { icon: <Palette className="h-5 w-5 text-primary" />,    title: "Live Preview",               desc: "Every font renders live with your actual name — what you see is exactly what you download." },
  { icon: <Download className="h-5 w-5 text-primary" />,   title: "4× High-Resolution Export",  desc: "Downloads at 3200×1040 px — crisp at any print or screen size. No pixelation, no blurring, no watermark." },
  { icon: <Shield className="h-5 w-5 text-primary" />,     title: "100% Browser-Based Privacy", desc: "Everything runs inside your browser. Your name and signature are never sent to any server — ever." },
  { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "Mobile Friendly",            desc: "Works on any device — phone, tablet, or desktop. Fully responsive UI with touch-friendly font browsing." },
  { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "Legally Valid Output",       desc: "Font-based signatures are accepted under IT Act 2000 (India), ESIGN (USA), and eIDAS (EU) for contracts, invoices, and agreements." },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,  title: "GST Invoices",        desc: "Insert your font signature PNG directly into Tally, Zoho Books, or any billing software. CBIC accepts image-based signatures on manually generated GST invoices." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Contracts & NDAs",     desc: "Create a consistent, professional font signature for NDAs, service agreements, and employment letters — legally valid under IT Act 2000." },
  { icon: <Mail className="h-5 w-5 text-primary" />,     title: "Email Footers",        desc: "Add a handwriting-style font signature to Gmail, Outlook, and all major email clients for a personal, professional touch." },
  { icon: <Globe className="h-5 w-5 text-primary" />,    title: "Online Forms & PDFs",  desc: "Insert the transparent PNG into any PDF using Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools — no printing or scanning required." },
];

const SIGNATURE_CATEGORY_LINKS = [
  { href: "/tools/handwritten-signature-generator", label: "Handwritten Signature Generator" },
  { href: "/tools/online-signature-generator",      label: "Online Signature Generator" },
  { href: "/tools/signature-maker",                 label: "Signature Maker" },
  { href: "/tools/digital-signature-generator",     label: "Digital Signature Generator" },
  { href: "/tools/free-signature-generator",        label: "Free Signature Generator" },
  { href: "/tools/esignature-maker",                label: "eSignature Maker" },
];

export default function SignatureFontGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature Font Generator – Stylish Cursive Fonts for Name (Free)",
    description:
      "Create stylish signature using cursive fonts. Choose from 50+ signature fonts, preview instantly and download PNG. No login required, 100% private.",
    canonical: CANONICAL,
    ogTitle: "Signature Font Generator – Stylish Name Signature Online",
    ogDescription:
      "Create stylish signature with 50+ fonts and download PNG instantly.",
    keywords:
      "signature font generator, cursive signature fonts, name signature font generator, stylish signature fonts",
  });

  const schemas = [
    generateFAQSchema(FAQS),
    generateHowToSchema({
      name: "Create Signature Using Fonts",
      description:
        "Use Pixocraft's free signature font generator to type your name, pick a cursive font, and download as transparent PNG.",
      steps: HOWTO_STEPS,
    }),
    generateSoftwareApplicationSchema({
      name: "Pixocraft Signature Font Generator",
      description:
        "Create stylish signature using cursive and calligraphy fonts. Choose from 50+ signature fonts, preview instantly and download PNG. Free, no login.",
      url: CANONICAL,
      applicationCategory: "WebApplication",
      operatingSystem: "All",
      price: "0",
      rating: { value: "4.9", count: "3800" },
    }),
    generateBreadcrumbSchema([
      { name: "Home",                     url: "https://tools.pixocraft.in" },
      { name: "Signature Tools",          url: "https://tools.pixocraft.in/tools/signature-tools" },
      { label: "Signature Generator", url: "/tools/signature-pad-tool" },
      { name: "Signature Font Generator", url: CANONICAL },
    ]),
    generateWebPageSchema({
      name: "Signature Font Generator – Stylish Cursive Fonts for Name (Free)",
      description:
        "Create stylish signature using cursive fonts. Choose from 50+ signature fonts, preview instantly and download PNG. No login required, 100% private.",
      url: CANONICAL,
      lastModified: LAST_UPDATED,
    }),
  ];

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, i) => (
        <StructuredData key={i} schema={schema} />
      ))}

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
        <Breadcrumb
          items={[
            { label: "Home",                     url: "/" },
            { label: "Tools",                    url: "/tools" },
            { label: "Signature Tools",          url: "/tools/signature-tools" },
            { label: "Signature Font Generator" },
          ]}
        />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Type className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Signature Font Generator –{" "}
              <span className="text-primary">Stylish Cursive Fonts</span>{" "}
              for Name (Free)
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Create a stylish signature using <strong>cursive and calligraphy fonts</strong>.
            Choose from <strong>50+ signature fonts</strong>, preview your name instantly, and download as a transparent PNG.
            No login required — 100% private and free.
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Signup" },
              { icon: <Star className="h-3.5 w-3.5" />,       label: "50+ Fonts" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Instant Download" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "100% Private" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Mobile Ready" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "GST & Doc Ready" },
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
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 px-6 py-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quick Answer</p>
          <h2 className="text-lg font-bold text-foreground">
            How do I create a stylish signature using fonts?
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Open the <strong>Type tab</strong>, type your name, and browse <strong>50+ cursive and calligraphy fonts</strong>
            — each previewed live with your actual name. Click the font you like, then click <strong>Download → PNG</strong> for
            a <strong>transparent high-resolution PNG (3200×1040 px)</strong>. Done in under 60 seconds. No login, no watermark.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              { label: "Fonts",      value: "50+ Cursive" },
              { label: "Export",     value: "Transparent PNG" },
              { label: "Resolution", value: "3200 × 1040 px" },
              { label: "Price",      value: "Free Forever" },
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
          caption="No watermark · Transparent PNG · 50+ signature fonts · Works offline after page load"
        />

        {/* ── FONT EXAMPLES ────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Popular Signature Font Styles — Live Preview
            </h2>
            <p className="text-muted-foreground">
              6 popular cursive and calligraphy fonts rendered live — what you see is exactly what you'll get in your PNG.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FONT_EXAMPLES.map(({ font, category, label, desc }) => (
              <div
                key={label}
                className="rounded-xl border bg-card p-5 space-y-3 hover-elevate transition-all"
                data-testid={`font-card-${label.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold bg-primary/10 text-primary">{category}</span>
                </div>
                <p
                  style={{ fontFamily: `'${font}', cursive`, fontSize: "clamp(26px, 5vw, 40px)", lineHeight: 1.3, color: "#111" }}
                  className="overflow-hidden whitespace-nowrap text-ellipsis bg-white rounded-lg px-3 py-2"
                  aria-label={`signature font generator stylish cursive name signature png - ${label} style`}
                >
                  Your Name
                </p>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Switch to the <strong>Type</strong> tab in the tool above, type your name, and browse all 50+ fonts — each renders live.
          </p>
        </section>

        {/* ── WHAT IS ──────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">What is a Signature Font Generator?</h2>
          <div className="rounded-xl border bg-card px-6 py-5">
            <p className="text-foreground font-medium">
              A <strong>signature font generator</strong> allows you to create stylish handwritten signatures using
              cursive and calligraphy fonts. Type your name, choose a font, and download your signature as a
              high-resolution transparent PNG — no drawing skill needed.
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Unlike drawing tools that require a steady hand, a font generator produces clean, consistent, professional-looking
            signatures in seconds. You type your name once, browse fonts, and download — done in under 60 seconds.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Pixocraft's signature font generator offers <strong>50+ Google Fonts</strong> curated specifically for their
            handwriting authenticity — organised into 7 style categories: Signature, Elegant, Professional, Creative,
            Handwritten, Casual, and Rare. Every font renders live with your actual name so you see exactly what you'll download.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            The output is a <strong>3200×1040 px transparent PNG</strong> — print-quality, watermark-free, and ready to
            insert into any PDF, Word document, Google Doc, GST invoice, or email client immediately.
          </p>
        </section>

        {/* ── WHICH FONT IS BEST (visible FAQ answer for Google) ───────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Which Font is Best for Signature?</h2>
          <div className="rounded-xl border bg-card px-6 py-5 space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              <strong>Cursive and calligraphy fonts are best</strong> because they look natural and professional —
              closely replicating the feel of ink on paper. For formal documents, contracts, and GST invoices,
              choose flowing scripts like <strong>Great Vibes</strong> or <strong>Allura</strong>.
              For a clean, business-ready look, <strong>Dancing Script</strong> or <strong>Norican</strong> are top choices.
              For a casual personal touch, <strong>Caveat</strong> or <strong>Pacifico</strong> work beautifully.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {[
                { use: "Formal / Legal",   fonts: "Great Vibes, Allura, Norican" },
                { use: "Business / Work",  fonts: "Dancing Script, Sacramento" },
                { use: "Casual / Personal", fonts: "Caveat, Pacifico, Satisfy" },
              ].map(({ use, fonts }) => (
                <div key={use} className="rounded-lg bg-background border p-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{use}</p>
                  <p className="text-sm font-medium text-foreground mt-1">{fonts}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW TO ───────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">How to Create Signature Using Fonts</h2>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Features</h2>
            <p className="text-muted-foreground">Everything you need to create a professional cursive signature — free.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── USE CASES ────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Where to Use Your Font Signature</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {USE_CASES.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card overflow-hidden"
                data-testid={`faq-item-${i}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-semibold text-foreground text-sm leading-snug">{faq.question}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  }
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

        {/* ── RELATED TOOLS ────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Related Signature Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SIGNATURE_CATEGORY_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>
                <div
                  className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border bg-card hover-elevate transition-all"
                  data-testid={`link-related-${href.split("/").pop()}`}
                >
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link href="/tools/signature-tools">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-2" data-testid="link-all-signature-tools">
                View all Signature Tools <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* ── BOTTOM BREADCRUMB ─────────────────────────────────────────────── */}
        <div className="pt-4 border-t">
          <Breadcrumb
            items={[
              { label: "Home",                     url: "/" },
              { label: "Tools",                    url: "/tools" },
              { label: "Signature Tools",          url: "/tools/signature-tools" },
              { label: "Signature Font Generator" },
            ]}
          />
          <p className="text-xs text-muted-foreground mt-3">
            Last Updated: {LAST_UPDATED} · Made in India · By the Pixocraft Team
          </p>
        </div>

      </div>
    </div>
  );
}
