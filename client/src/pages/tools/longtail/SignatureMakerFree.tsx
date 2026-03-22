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
  Download,
  Check,
  FileText,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  Image as ImageIcon,
  Pencil,
  Palette,
  Sliders,
  Infinity,
  BadgeCheck,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-maker-free";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "Is this free signature maker really free?",
    answer: "Yes — 100% free forever. No subscription, no watermark, no trial limits, no hidden charges. Create and download as many signatures as you need at zero cost.",
  },
  {
    question: "Is my signature stored anywhere?",
    answer: "No. Everything runs entirely inside your browser using the HTML5 Canvas API. Nothing is uploaded, logged, or stored — your signature data never reaches any server.",
  },
  {
    question: "Is a signature from this free signature maker legal in India?",
    answer: "Yes. Under the Information Technology Act 2000 and IT (Amendment) Act 2008, electronic signatures are legally valid for GST invoices, contracts, NDAs, HR documents, and general business agreements. For certified Digital Signature Certificates (DSC) required by MCA or court portals, consult a licensed CA.",
  },
  {
    question: "Can I use this free signature maker on my phone?",
    answer: "Yes. The Draw tab is fully touch-optimised for smartphones and tablets. Type and Upload also work seamlessly on all modern mobile browsers.",
  },
  {
    question: "What format should I download?",
    answer: "Transparent PNG is best for almost all uses — it sits cleanly over any document or background without a white box. White-background JPG is useful for email clients that don't support transparent images. Both export at 3200×1040 px.",
  },
  {
    question: "Can I fully customise my signature?",
    answer: "Yes — full control. Adjust ink colour, stroke width, and drawing pressure in Draw mode. Choose from 50+ handwritten fonts and any ink colour in Type mode. Remove the white background from any uploaded signature in Upload mode.",
  },
  {
    question: "Are there any usage limits?",
    answer: "No limits whatsoever. Create unlimited signatures, download unlimited times, try every font — all free, always.",
  },
  {
    question: "What's the difference between a free signature maker and a paid tool like DocuSign?",
    answer: "Paid tools like DocuSign add workflow features — audit trails, multi-party signing, and enterprise integrations. This free signature maker focuses on what most users actually need: creating and downloading a high-quality signature image instantly, at no cost, with no data stored.",
  },
  {
    question: "How do I add the signature to a PDF?",
    answer: "Download the transparent PNG, then open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place your signature over the signature field and resize as needed.",
  },
  {
    question: "Is this free signature maker good for GST invoices?",
    answer: "Yes. Insert the transparent PNG into your Tally, Zoho Books, or billing template. Most GST portals and commercial invoice formats accept image-based signatures as a valid authorisation mark.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Choose Draw, Type or Upload",      description: "Draw freehand with mouse or finger for a personal look, Type your name across 50+ fonts for speed and consistency, or Upload an existing signature and remove the background." },
  { step: 2, title: "Customise colour, thickness & style", description: "Pick any ink colour, adjust stroke width, and fine-tune every detail. Full customisation — the same control you'd expect from a paid tool, completely free." },
  { step: 3, title: "Preview your signature",            description: "Click Preview to see your signature on a document mockup and email footer before downloading — so you know exactly how it will look in real use." },
  { step: 4, title: "Download high-quality PNG instantly", description: "Save as transparent PNG or JPG — 3200×1040 px, no watermark, no account, no wait. Ready to use in seconds." },
];

const FEATURES = [
  { icon: <PenTool className="h-4 w-4 text-primary" />,    title: "Real drawing freedom",          desc: "Bezier curve smoothing gives every freehand stroke a natural, flowing look — on mouse or touchscreen." },
  { icon: <Pencil className="h-4 w-4 text-primary" />,     title: "50+ handwritten fonts",          desc: "Instantly browse a curated library of calligraphic and casual Google Fonts across 7 style categories." },
  { icon: <ImageIcon className="h-4 w-4 text-primary" />,  title: "Upload & auto background removal", desc: "Upload a photo of your existing signature and strip the white background automatically with one click." },
  { icon: <Sliders className="h-4 w-4 text-primary" />,    title: "Full customisation panel",       desc: "Colour picker, stroke thickness, size control — the same depth of options you'd pay for elsewhere." },
  { icon: <Download className="h-4 w-4 text-primary" />,   title: "High-res transparent PNG",       desc: "3200×1040 px export — four times screen resolution. Crisp at any size, zero watermark, free to download." },
  { icon: <Infinity className="h-4 w-4 text-primary" />,   title: "Unlimited usage, free forever",  desc: "No caps, no credits, no daily limits. Create and download as many signatures as you need, always free." },
  { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private, browser only",     desc: "Every process runs locally. Your signature data never touches a server — complete privacy guaranteed." },
  { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile & tablet optimised",      desc: "Single-touch drawing works naturally on any smartphone or tablet in any modern browser." },
];

const STYLE_PRESETS = [
  { label: "Minimal",      font: "Satisfy",       desc: "Clean, understated — modern professionals." },
  { label: "Bold",         font: "Pacifico",      desc: "Strong, confident — business and executive use." },
  { label: "Elegant",      font: "Great Vibes",   desc: "Flowing, refined — formal and creative contexts." },
  { label: "Professional", font: "Pinyon Script", desc: "Classic, trustworthy — contracts and invoices." },
];

export default function SignatureMakerFree() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  useSEO({
    title: "Free Signature Maker Online – Draw, Type & Download | Pixocraft",
    description:
      "100% free signature maker online. Create, customize and download professional signatures instantly. No signup, no watermark, fully private PNG.",
    keywords:
      "free signature maker, free signature maker online, signature maker free, create signature free, free online signature maker, signature maker no watermark, free signature creator, free signature download PNG, free e-signature maker, signature maker India free",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Free Signature Maker – Pixocraft",
    description:
      "100% free signature maker online. Draw, type or upload your signature with full customisation. Download transparent PNG instantly — no signup, no watermark, fully private.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                  url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "Free Signature Maker",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Free Signature Maker Online – Draw, Type & Download | Pixocraft",
    description:
      "100% free signature maker online. Create, customize and download professional signatures instantly. No signup, no watermark, fully private PNG.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Use This Free Signature Maker",
    description:
      "Create and download a professional free signature in under 60 seconds using Pixocraft's browser-based tool.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
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
          { label: "Home",                 url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Free Signature Maker" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <div className="mb-5 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Free Signature Maker Online – Create &amp; Customize Instantly
              </h1>
              <p className="text-sm text-muted-foreground">100% Free · No Watermark · No Signup · Unlimited Downloads · GST Ready</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Build your professional signature completely free with our <strong>free signature maker</strong>. Draw with
            your mouse or finger, type in 50+ handwritten fonts, or upload your existing signature and remove the
            background automatically. Enjoy full customisation — ink colour, stroke width, style — with instant
            transparent PNG download. No signup, no watermark, and 100% private browser-based experience.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Star className="h-3.5 w-3.5" />,       label: "100% Free Forever" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Instant Download" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "Nothing Saved – Browser Only" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on Mobile" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "Made in India · GST Ready" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>
        </div>

        {/* ── TOOL ───────────────────────────────────────────────────────── */}
        <SignatureToolSection />

        {/* ── SEO CONTENT ────────────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* Try styles instantly */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Try Signature Styles Instantly</h2>
            <p className="text-muted-foreground mb-5">
              Not sure which style fits you best? Jump in with a preset — each one is tailored to a different context and personality. Click any style to scroll to the tool and try it. All fonts are free, available instantly, with no limits.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {STYLE_PRESETS.map(({ label, font, desc }) => (
                <button
                  key={label}
                  onClick={() => {
                    setActivePreset(activePreset === label ? null : label);
                    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-testid={`button-free-maker-preset-${label.toLowerCase()}`}
                  className={`rounded-xl border p-4 text-left space-y-2 transition-colors cursor-pointer ${activePreset === label ? "border-primary bg-primary/5" : "bg-card hover-elevate"}`}
                >
                  <p style={{ fontFamily: `'${font}', cursive`, fontSize: "1.5rem", lineHeight: 1.2 }} className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis">
                    {label}
                  </p>
                  <p className="text-xs font-semibold text-primary">{label} Signature</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">Switch to the Type tab above, type your name, and browse all 50+ fonts. Click any preset card to scroll straight to the tool.</p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5">Powerful Features of Our Free Signature Maker</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-3 sm:p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to use */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Use This Free Signature Maker</h2>
            <p className="text-muted-foreground mb-5">Four steps. Under 60 seconds. Completely free, every time.</p>
            <ol className="space-y-3">
              {HOW_TO_STEPS.map(({ step, title, description }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Draw vs Type vs Upload */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Draw vs Type vs Upload in Free Signature Maker</h2>
            <p className="text-muted-foreground mb-5">Each method is free — pick the one that fits your goal:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  method: "Draw",
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  tagline: "Best for unique, handwritten feel",
                  body: "Sketch freehand with your mouse or finger. Stroke width and colour fully adjustable. No two drawn signatures look alike — the most personal result of all three methods.",
                },
                {
                  method: "Type",
                  icon: <Pencil className="h-5 w-5 text-primary" />,
                  tagline: "Fast and consistent using fonts",
                  body: "Type your name and instantly browse 50+ calligraphic fonts. Every download looks identical — perfect for GST invoices and email footers where consistency matters.",
                },
                {
                  method: "Upload",
                  icon: <ImageIcon className="h-5 w-5 text-primary" />,
                  tagline: "Reuse and refine your old signature",
                  body: "Photograph or scan your pen-and-paper signature, upload it, and remove the background in one click. Keep your familiar mark — perfectly digitised and free to use anywhere.",
                },
              ].map(({ method, icon, tagline, body }) => (
                <div key={method} className="rounded-xl border bg-card p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
                    <div>
                      <p className="font-bold text-foreground">{method}</p>
                      <p className="text-xs text-primary font-medium">{tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Free Maker vs Generator */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Signature Maker vs Signature Generator</h2>
            <p className="text-muted-foreground mb-5">People use these terms interchangeably — here's the meaningful difference:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Signature Generator",
                  icon: <Zap className="h-5 w-5 text-primary" />,
                  tagline: "Speed first",
                  body: "Type your name, pick a font, download. Optimised for getting a usable signature as fast as possible with minimal decisions — great for one-off needs.",
                },
                {
                  title: "Signature Maker",
                  icon: <Sliders className="h-5 w-5 text-primary" />,
                  tagline: "Control first",
                  body: "Full creative ownership — adjust every parameter, preview on real documents, then download. Designed for users who want their signature to truly reflect them.",
                },
                {
                  title: "Pixocraft — Both",
                  icon: <Star className="h-5 w-5 text-primary" />,
                  tagline: "Best of both — free",
                  body: "Pixocraft is simultaneously the fastest free signature generator and the most fully-featured free signature maker. Quick when you want quick. Deep when you want control. All free.",
                },
              ].map(({ title, icon, tagline, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{title}</p>
                      <p className="text-xs text-primary font-medium">{tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Examples */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Signature Examples &amp; Inspiration</h2>
            <p className="text-muted-foreground mb-5">
              Explore different styles — minimal, bold, elegant, and professional. Every example below is rendered live from a real font in this free signature maker. Find your perfect style and customise it instantly in the Type tab above.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Minimal",      font: "Satisfy",        name: "Alex Sharma",   note: "Clean and contemporary — ideal for tech professionals and modern email footers." },
                { label: "Bold",         font: "Pacifico",       name: "Vikram Mehta",  note: "Confident and prominent — great for business owners, invoices, and agreements." },
                { label: "Elegant",      font: "Great Vibes",    name: "Priya Nair",    note: "Flowing and refined — perfect for contracts, formal letters, and creative brands." },
                { label: "Professional", font: "Pinyon Script",  name: "Rahul Kumar",   note: "Classic and trustworthy — NDAs, HR documents, and corporate correspondence." },
                { label: "Casual",       font: "Caveat",         name: "Sam Iyer",      note: "Natural handwriting — personal notes, informal approvals, and quick sign-offs." },
                { label: "Calligraphic", font: "Norican",        name: "Dr. A. Verma",  note: "Authoritative and distinguished — academic and official documents." },
              ].map(({ label, font, name, note }) => (
                <div key={label} className="rounded-xl border bg-card p-5 space-y-2">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                  <p style={{ fontFamily: `'${font}', cursive`, fontSize: "2rem", lineHeight: 1.2 }} className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis">
                    {name}
                  </p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Where to Use Your Free Signature</h2>
            <p className="text-muted-foreground mb-5">Your downloaded transparent PNG works anywhere a handwritten signature would be expected — all for free:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "GST Invoices & E-way Bills",        body: "Insert your PNG into Tally, Zoho Books, or any billing template. Accepted by most Indian GST portals as a valid authorisation mark." },
                { title: "Contracts, NDAs & Agreements",      body: (<>Paste into Word or Google Docs, then convert with{" "}<Link href="/tools/image-to-pdf" className="text-primary hover:underline underline-offset-2 font-medium">Image to PDF</Link>{" "}for a complete, professionally signed document.</>)  },
                { title: "Email Footers",                     body: "Gmail and Outlook both support embedded PNG signatures. Keep it 60–80 px tall for a polished, consistent look across every email you send." },
                { title: "PDF Documents & Forms",             body: (<>Download the PNG, open your PDF in{" "}<Link href="/tools/pdf-merger" className="text-primary hover:underline underline-offset-2 font-medium">Pixocraft PDF tools</Link>{" "}or Adobe Acrobat, and insert over the signature field.</>)  },
                { title: "Google Docs & Word Files",          body: "Insert → Image in either app. Resize to fit the signature line and export as PDF for a final, client-ready signed document." },
                { title: "Aadhaar & Government Services",     body: "Many government forms accept image-based signatures in PNG format. Always check the specific portal's requirements — some may need OTP-based or DSC signatures." },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-3 p-3 sm:p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Legal */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Is a Free Signature Maker Legal in India?</h2>
            <p className="text-muted-foreground mb-5">
              Yes. Signatures created using this free signature maker are legally valid in India for most business and personal use cases.
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "Information Technology Act 2000",
                  body: "Section 5 grants electronic signatures the same legal validity as handwritten signatures for contracts, GST invoices, and general commercial agreements. The IT (Amendment) Act 2008 further strengthened this framework.",
                },
                {
                  title: "GST & Business Use",
                  body: "GST invoices, e-way bills, and most commercial documents are fully valid with an image-based PNG signature. Widely accepted across Tally, Zoho Books, and most Indian billing platforms.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong>Note:</strong> For high-security government filings — MCA ROC, income tax DSC verification, court submissions, or property registration — a certified Digital Signature Certificate (DSC) from a licensed CA is required. Consult a legal professional for high-stakes transactions.
            </div>
          </section>

          {/* Why free is better than paid */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why This Free Signature Maker is Better Than Paid Tools</h2>
            <p className="text-muted-foreground mb-5">
              Most paid signature tools charge for features you'll never use. Here's what you get completely free with Pixocraft:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <Infinity className="h-4 w-4 text-primary" />,   title: "No subscription required",   body: "No monthly fee, no annual plan, no credit card. Free forever means free forever." },
                { icon: <Download className="h-4 w-4 text-primary" />,   title: "No watermark on downloads",  body: "Your PNG is clean, professional, and truly yours — no Pixocraft branding on any export." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "Unlimited usage",            body: "Create 1 or 1000 signatures — no daily caps, no usage credits, no throttling." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "Fully private, no data stored", body: "100% browser-based. Nothing is ever uploaded. The most private free signature maker available." },
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "Instant, no login",          body: "No registration, no email confirmation, no waiting. Open, create, download — in seconds." },
                { icon: <Globe className="h-4 w-4 text-primary" />,      title: "India-built, GST-ready",     body: "Designed with Indian business workflows in mind. Works for GST invoices, HR, and contracts." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-3 sm:p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Pro Tips to Make Perfect Free Signatures</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tip: "Keep it short and readable",              detail: "A signature that's too complex or long becomes illegible at small sizes. Aim for clarity at 60–80 px height." },
                { tip: "Use 2.5–4 px stroke thickness",           detail: "This range stays crisp when your signature is scaled down inside PDFs, invoices, and email footers." },
                { tip: "Choose black or dark blue ink",           detail: "These are universally accepted in Indian legal and corporate contexts and remain legible on colour prints." },
                { tip: "Create multiple versions",                detail: "Save a formal version for legal docs and a casual version for emails. Both are free — no limits." },
                { tip: "Preview before you download",             detail: "Always check the document mockup and email footer preview to confirm size, style, and positioning." },
                { tip: "Save your PNG in a safe folder",          detail: "Store your 3200×1040 px master PNG somewhere backed up — you'll reuse it across dozens of forms and contracts." },
              ].map(({ tip, detail }) => (
                <div key={tip} className="rounded-xl border bg-card p-4 space-y-1.5">
                  <p className="font-semibold text-foreground text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{tip}
                  </p>
                  <p className="text-sm text-muted-foreground pl-6">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why Choose Pixocraft Free Signature Maker?</h2>
            <p className="text-muted-foreground mb-5">
              Pixocraft is built around one principle: professional tools should be free for everyone. Here's what that means in practice:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Star className="h-4 w-4 text-primary" />,    title: "Truly free forever",          body: "No hidden plans, no credits, no expiry. Every feature — including the 50+ font library — is free." },
                { icon: <Sliders className="h-4 w-4 text-primary" />, title: "Deep customisation options",  body: "More creative control than most paid tools: full colour, stroke, font, and background options." },
                { icon: <Shield className="h-4 w-4 text-primary" />,  title: "100% private browser tool",   body: "Your signature never leaves your device. No server processing, no cloud storage, no tracking." },
                { icon: <Globe className="h-4 w-4 text-primary" />,   title: "Built for Indian users",      body: "GST ready, IT Act 2000 compliant, and optimised for Indian business and professional workflows." },
                { icon: <Download className="h-4 w-4 text-primary" />, title: "High-quality output",        body: "3200×1040 px transparent PNG — print-quality, no watermark, ready for any platform or document." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-3 sm:p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Related Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-pad-tool",            title: "Signature Generator (Main Tool)",  desc: "The complete tool with AI styles, undo/redo, and all advanced options." },
                { href: "/tools/online-signature-generator",    title: "Online Signature Generator",        desc: "Create any signature online — fast and free, directly in your browser." },
                { href: "/tools/free-signature-generator",      title: "Free Signature Generator",          desc: "Emphasis on free — no cost, no watermark, unlimited downloads." },
                { href: "/tools/digital-signature-generator",   title: "Digital Signature Generator",       desc: "India IT Act 2000 ready — for GST, contracts, and business documents." },
                { href: "/tools/signature-maker",               title: "Signature Maker",                   desc: "Full creative control — custom colour, stroke, and 50+ fonts." },
                { href: "/tools/pdf-merger",                    title: "PDF Merger",                        desc: "Merge signed PDFs into one clean professional file." },
              ].map(({ href, title, desc }) => (
                <Link key={href} href={href} className="flex items-center gap-3 p-4 rounded-xl border bg-card hover-elevate transition-all group">
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-foreground text-sm cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-free-maker-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed" data-testid={`faq-free-maker-answer-${i}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* EEAT */}
          <section className="rounded-xl border bg-muted/30 p-6 text-sm text-muted-foreground space-y-1">
            <p><strong className="text-foreground">Author:</strong> Pixocraft Team</p>
            <p><strong className="text-foreground">Last Updated:</strong> {LAST_UPDATED}</p>
            <p><strong className="text-foreground">Made in India</strong> — Privacy-first tools for everyone. Your data never leaves your browser.</p>
            <p className="pt-1">
              Questions?{" "}
              <Link href="/contact" className="text-primary hover:underline underline-offset-2">Contact us</Link>{" "}
              or read our{" "}
              <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </section>

        </div>
      </div>

      {/* ── STICKY CTA ─────────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur-sm py-3 px-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="text-sm">
          <p className="font-semibold text-foreground">Create Your Signature Now — Free</p>
          <p className="text-xs text-muted-foreground">No watermark · Free forever · Instant · Private</p>
        </div>
        <Button
          size="default"
          onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="button-free-maker-sticky-cta"
        >
          <Download className="mr-2 h-4 w-4" />
          Create &amp; Download Free
        </Button>
      </div>
    </>
  );
}
