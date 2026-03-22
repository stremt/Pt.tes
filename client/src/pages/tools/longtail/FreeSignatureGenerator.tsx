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
  Download,
  Check,
  FileText,
  Mail,
  Globe,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  Image as ImageIcon,
  Palette,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/free-signature-generator";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-generator";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "Is this signature generator really free?",
    answer: "Yes — 100% free, always. There are no premium tiers, no trial periods, no watermarks, and no hidden charges. Pixocraft's free signature generator is free forever for personal and commercial use.",
  },
  {
    question: "Do I need to sign up or create an account?",
    answer: "No. There is no registration, no email required, and no login. Open the page, create your signature, and download it in seconds.",
  },
  {
    question: "Is my signature stored on your servers?",
    answer: "Never. The entire tool runs inside your browser using the HTML5 Canvas API. Your signature is processed locally — nothing is ever sent to, stored on, or logged by any server.",
  },
  {
    question: "Is a digital signature created with this tool legally valid in India?",
    answer: "Yes. Under the Information Technology Act 2000 and IT (Amendment) Act 2008, electronic signatures are legally recognised for contracts, GST invoices, HR documents, and most commercial agreements in India. For government portals requiring a Digital Signature Certificate (DSC), a licensed CA-issued DSC is needed.",
  },
  {
    question: "Is a free digital signature legally valid in other countries?",
    answer: "In most countries, yes. The US ESIGN Act and UETA, EU eIDAS Regulation (as a Simple Electronic Signature), and the UK Electronic Communications Act 2000 all recognise electronic signatures for most private and commercial agreements.",
  },
  {
    question: "Can I use this free signature generator on my phone?",
    answer: "Yes. The Draw tab is fully touch-optimised and works naturally on any smartphone or tablet. Type and Upload tabs also work seamlessly on mobile browsers.",
  },
  {
    question: "What file formats can I download?",
    answer: "You can download a transparent PNG (ideal for overlaying on any document background) or a white-background JPG. Both are exported at 3200×1040 px — high-resolution and print-ready.",
  },
  {
    question: "How do I add my free signature to a PDF?",
    answer: "Download the transparent PNG, then open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place the signature over the signature line and resize as needed.",
  },
  {
    question: "Can I remove the white background from an uploaded signature?",
    answer: "Yes. Switch to the Upload tab, upload your PNG or JPG, then click 'Remove White Background'. The tool uses pixel threshold analysis to make white and near-white areas fully transparent.",
  },
  {
    question: "How many fonts are available in the Type tab?",
    answer: "Over 50 handwritten Google Fonts spanning 7 style categories: ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker textures, airy light fonts, and formal calligraphy.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Choose your method", description: "Select Draw to sketch freehand with a mouse or finger, Type to pick from 50+ handwritten fonts, or Upload to digitise an existing pen-and-paper signature." },
  { step: 2, title: "Customise it", description: "Adjust ink colour and stroke width for drawing, choose a font style and ink colour for typing, or remove the white background for an uploaded image." },
  { step: 3, title: "Preview", description: "Click Preview to see your signature on a document mockup and email footer, so you know exactly how it will look before downloading." },
  { step: 4, title: "Download free", description: "Save as transparent PNG or white-background JPG — no watermark, no account, no waiting. Instant and free." },
];

const FEATURES = [
  { icon: <PenTool className="h-4 w-4 text-primary" />,  title: "Smooth freehand drawing",       desc: "Bezier curve smoothing gives every drawn stroke a natural, flowing look — on mouse or touchscreen." },
  { icon: <Pencil className="h-4 w-4 text-primary" />,   title: "50+ handwritten fonts",          desc: "Pick from a vast library of calligraphic and casual fonts — classic cursive, bold scripts, elegant thin styles, and more." },
  { icon: <ImageIcon className="h-4 w-4 text-primary" />, title: "Upload & background removal",   desc: "Upload a photo of your existing signature and strip the white background automatically with one click." },
  { icon: <Palette className="h-4 w-4 text-primary" />,  title: "Full colour & stroke control",  desc: "Choose any ink colour and adjust stroke thickness to create the exact look you want." },
  { icon: <Download className="h-4 w-4 text-primary" />, title: "High-res transparent PNG",       desc: "Downloads at 3200×1040 px — print-quality resolution, transparent background, zero watermark." },
  { icon: <Shield className="h-4 w-4 text-primary" />,   title: "100% private, zero uploads",     desc: "Everything happens locally in your browser. No file is ever sent to a server — complete privacy guaranteed." },
  { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile & touch friendly",     desc: "Touch-optimised canvas supports single-finger drawing on any phone or tablet in any modern browser." },
  { icon: <Zap className="h-4 w-4 text-primary" />,      title: "Works offline after load",       desc: "Once the page loads, the generator works without an internet connection — no server dependency." },
];

export default function FreeSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free Signature Generator – Instant PNG Download | Pixocraft",
    description:
      "100% free signature generator online. Draw, type or upload signature and download transparent PNG instantly. No signup, no watermark, private.",
    keywords:
      "free signature generator, free digital signature, free online signature, create signature free, free e-signature, free signature maker, free signature download PNG, free signature no signup, free signature India, handwritten signature free",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Free Signature Generator – Pixocraft",
    description:
      "100% free online signature generator. Draw, type, or upload your signature and download as a transparent PNG or JPG instantly. No signup required. Fully private — runs in your browser.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                      url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Free Signature Generator",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Free Signature Generator – Instant PNG Download | Pixocraft",
    description:
      "100% free signature generator online. Draw, type or upload and download transparent PNG instantly. No signup, no watermark, private.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Use This Free Signature Generator",
    description:
      "Create and download a free digital signature in under 60 seconds using Pixocraft's browser-based tool.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
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
          { label: "Home",                      url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Free Signature Generator" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Free Signature Generator – Create &amp; Download Instantly
              </h1>
              <p className="text-sm text-muted-foreground">Completely Free · No Signup · No Watermark · 100% Private</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create a professional digital signature for free — right here in your browser. <strong>Draw</strong> with
            your mouse or finger, <strong>type</strong> your name in one of 50+ handwritten fonts, or{" "}
            <strong>upload</strong> an existing signature and remove the background. Download as a crisp transparent PNG
            or JPG instantly — no account, no watermark, no strings attached. Your data never leaves your device.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Star className="h-3.5 w-3.5" />,       label: "Completely Free Forever" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Instant Download" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "100% Private (Nothing Stored)" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on Phone & Desktop" },
              { icon: <span className="text-[9px] font-bold leading-none">IN</span>, label: "Made in India" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>
        </div>

        {/* ── TOOL ───────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <SignaturePadWidget />
          <p className="text-xs text-muted-foreground text-center mt-3">
            Free forever · No watermark · No upload to server · Works offline after page load
          </p>
        </div>

        {/* ── SEO CONTENT ────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-5">Powerful Features of Our Free Signature Generator</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
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
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Use This Free Signature Generator</h2>
            <p className="text-muted-foreground mb-5">Four steps. Under 60 seconds. Completely free.</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Draw vs Type vs Upload – Which is Best?</h2>
            <p className="text-muted-foreground mb-5">
              This free signature generator gives you three ways to create your signature — each suited to a different need:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  method: "Draw",
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  tagline: "Most natural",
                  body: "Sketch freehand with your mouse or finger. The result is uniquely yours — no two drawn signatures look the same. Best for a truly personal touch on contracts and letters.",
                },
                {
                  method: "Type",
                  icon: <Pencil className="h-5 w-5 text-primary" />,
                  tagline: "Fastest & consistent",
                  body: "Type your name and instantly preview it across 50+ calligraphic fonts. Every download looks identical — great for email footers, invoices, and documents you sign repeatedly.",
                },
                {
                  method: "Upload",
                  icon: <ImageIcon className="h-5 w-5 text-primary" />,
                  tagline: "Reuse existing sig",
                  body: "Photograph or scan your pen-and-paper signature, upload it, and strip the white background in one click. Ideal when you already have a signature you love and want to go digital.",
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
            <p className="text-sm text-muted-foreground mt-4 px-1">
              <strong>Quick guide:</strong> First time? → <strong>Type</strong>. Already have a signature? → <strong>Upload</strong>. Want it completely personal? → <strong>Draw</strong>.
            </p>
          </section>

          {/* Signature Examples */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Signature Examples &amp; Styles</h2>
            <p className="text-muted-foreground mb-5">
              Not sure which style fits you? This free signature generator includes 50+ fonts spanning a range of personalities — from thin elegant scripts for formal documents to bold chunky styles for business confidence to casual everyday handwriting for personal notes. Below are six live-rendered examples. Switch to the Type tab, type your name, and browse them all instantly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Elegant Script",    font: "Great Vibes",    name: "Alexandra J.",   note: "Ultra-thin flowing script — ideal for formal documents and creative brands." },
                { label: "Classic Cursive",   font: "Pinyon Script",  name: "David Miller",   note: "Timeless traditional cursive — trusted for contracts and professional use." },
                { label: "Bold & Confident",  font: "Pacifico",       name: "Chris Park",     note: "Strong rounded script — great for executives and business agreements." },
                { label: "Minimal & Modern",  font: "Satisfy",        name: "Priya Sharma",   note: "Clean and contemporary — suits email footers and tech professionals." },
                { label: "Casual Everyday",   font: "Caveat",         name: "Sam Roberts",    note: "Natural handwriting feel — perfect for personal letters and notes." },
                { label: "Formal Calligraphy",font: "Norican",        name: "Dr. E. Watson",  note: "Authoritative and refined — suited for academic and official documents." },
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

          {/* Where to use */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Where to Use Your Free Signature</h2>
            <p className="text-muted-foreground mb-5">Your downloaded transparent PNG works anywhere a handwritten signature would:</p>
            <div className="space-y-4">
              {[
                {
                  icon: <FileText className="h-5 w-5 text-primary" />,
                  title: "PDF Documents",
                  body: (<>Download the transparent PNG, then open your PDF in{" "}<Link href="/tools/pdf-merger" className="text-primary hover:underline underline-offset-2 font-medium">Pixocraft PDF tools</Link>, Adobe Acrobat, or Smallpdf. Use Insert → Image to drop your signature over the signature line.</>),
                },
                {
                  icon: <FileText className="h-5 w-5 text-primary" />,
                  title: "Contracts, NDAs & Offer Letters",
                  body: (<>Insert your free signature PNG into Word or Google Docs, then{" "}<Link href="/tools/image-to-pdf" className="text-primary hover:underline underline-offset-2 font-medium">convert to PDF</Link>{" "}for a clean, professional final document.</>),
                },
                {
                  icon: <Mail className="h-5 w-5 text-primary" />,
                  title: "Email Footers (Gmail & Outlook)",
                  body: "In Gmail: Settings → Signature → Insert image → upload PNG. In Outlook: File → Options → Mail → Signatures → insert picture. Keep height 60–80 px for a professional email look.",
                },
                {
                  icon: <Globe className="h-5 w-5 text-primary" />,
                  title: "Online Forms, GST Invoices & HR Docs",
                  body: "Government portals, HR onboarding platforms, and billing software like Tally or Zoho Books all support image-based signatures. Drop in your free PNG and you're done.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Legal */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Is a Digital Signature Legal?</h2>
            <p className="text-muted-foreground mb-5">
              Yes — in most jurisdictions around the world, a digital or electronic signature carries the same legal weight as a handwritten one.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                { flag: "🇮🇳", country: "India",          law: "IT Act 2000 + Amendment 2008",        desc: "Electronic signatures are legally valid for contracts, GST invoices, business agreements, and most commercial documents. Specific government filings (MCA, court) require a DSC from a licensed CA." },
                { flag: "🇺🇸", country: "United States",  law: "ESIGN Act + UETA",                    desc: "Federal law gives electronic signatures the same legal standing as handwritten signatures for most commercial and personal agreements." },
                { flag: "🇪🇺", country: "European Union", law: "eIDAS Regulation",                    desc: "Image-based signatures qualify as Simple Electronic Signatures (SES) and are legally recognised across EU member states." },
                { flag: "🇬🇧", country: "United Kingdom", law: "Electronic Communications Act 2000", desc: "Legally binding for business contracts and most personal agreements under English law." },
              ].map(({ flag, country, law, desc }) => (
                <div key={country} className="rounded-xl border bg-card p-4 space-y-1.5">
                  <p className="font-semibold text-foreground flex items-center gap-2"><span>{flag}</span>{country}</p>
                  <p className="text-xs font-medium text-primary">{law}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong>Note:</strong> For everyday NDAs, freelance contracts, HR agreements, and GST invoices, this free signature generator is fully sufficient. For court filings, property registrations, or specific government portals in India, you'll need a certified Digital Signature Certificate (DSC). When in doubt, consult a legal professional.
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips for a Perfect Free Signature</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tip: "Use black or dark blue ink",          detail: "These shades are universally accepted in legal and corporate settings and remain legible at any size or resolution." },
                { tip: "Set stroke width to 3–4 px",         detail: "Thicker strokes stay visible when your signature is scaled down inside a PDF or email footer." },
                { tip: "Download as transparent PNG",         detail: "A transparent background lets your free signature sit cleanly on any document colour without an ugly white box." },
                { tip: "Match font to the document context",  detail: "Thin elegant scripts for formal documents; bold rounded fonts for business proposals; casual styles for personal notes." },
                { tip: "Save a master copy in a safe folder", detail: "Store your high-res 3200×1040 px PNG somewhere secure — you'll use it again and again across contracts and forms." },
                { tip: "Test at email size (60–80 px tall)",  detail: "Preview your signature at the typical email footer size to confirm it stays readable and looks polished." },
                { tip: "Use the Preview button first",        detail: "Check how your signature looks on a document and email mockup before downloading — saves time and extra edits." },
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Choose Pixocraft's Free Signature Generator?</h2>
            <p className="text-muted-foreground mb-5">
              There are dozens of signature tools online — here's what makes Pixocraft different:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "Genuinely free — forever",      body: "No hidden plans, no watermarks, no \"3 free downloads then pay\". Free means free." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "Zero data collection",          body: "Your signature never touches a server. 100% local processing — the most private option available." },
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "Instant, no friction",          body: "No account, no email confirmation, no waiting. Open the page and start creating in seconds." },
                { icon: <Download className="h-4 w-4 text-primary" />,   title: "Print-quality PNG export",      body: "3200×1040 px — four times screen resolution. Crisp on screen, in documents, and in print." },
                { icon: <Pencil className="h-4 w-4 text-primary" />,     title: "50+ premium fonts — free",      body: "A library of Google Fonts covering every style from ultra-formal calligraphy to casual everyday handwriting." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile-first experience",       body: "Touch-optimised drawing canvas — works just as well on a phone as on a desktop." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Signaturely</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">DocuSign</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Free Forever",            "Yes",  "Limited", "Limited"],
                    ["No Signup",               "Yes",  "Yes",     "Yes"],
                    ["100% Browser-Based",      "Yes",  "Partial", "No"],
                    ["Transparent PNG Export",  "Yes",  "No",      "No"],
                    ["50+ Fonts",               "Yes",  "Limited", "Limited"],
                    ["Made in India",           "Yes",  "US",      "US"],
                  ].map(([feat, pixo, sig, docu]) => (
                    <tr key={feat} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-5 py-3 text-primary font-semibold">{pixo}</td>
                      <td className="px-5 py-3 text-muted-foreground">{sig}</td>
                      <td className="px-5 py-3 text-muted-foreground">{docu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Related Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-generator",            title: "Signature Generator (Main Tool)",  desc: "The complete tool with AI styles, full undo/redo, and advanced options." },
                { href: "/tools/online-signature-generator",    title: "Online Signature Generator",      desc: "Create any signature online — fast and free, directly in your browser." },
                { href: "/tools/digital-signature-generator",   title: "Digital Signature Generator",     desc: "India IT Act 2000 ready — for GST, contracts, and business documents." },
                { href: "/tools/signature-maker",               title: "Signature Maker",                 desc: "Full creative control — custom colour, stroke, and 50+ fonts." },
                { href: "/tools/pdf-merger",                    title: "PDF Merger",                      desc: "Merge multiple PDFs after signing — essential for multi-page contracts." },
                { href: "/tools/background-remover",            title: "Background Remover",              desc: "Remove any background from images — useful for signature photo cleanup." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-foreground text-sm cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-free-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed" data-testid={`faq-free-answer-${i}`}>
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
            <p><strong className="text-foreground">Made in India</strong> — Privacy-first tools, built for everyone. Your data never leaves your browser.</p>
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
          <p className="font-semibold text-foreground">Download Your Signature Free</p>
          <p className="text-xs text-muted-foreground">Free forever · No signup · No watermark · Private</p>
        </div>
        <Button
          size="default"
          onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="button-free-sticky-cta"
        >
          <Download className="mr-2 h-4 w-4" />
          Create &amp; Download Free
        </Button>
      </div>
    </>
  );
}
