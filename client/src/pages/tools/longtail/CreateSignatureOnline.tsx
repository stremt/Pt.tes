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
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  Image as ImageIcon,
  Pencil,
  Sliders,
  Infinity,
  BadgeCheck,
  Globe,
  Timer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/create-signature-online";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "How long does it take to create a signature online?",
    answer: "Less than 60 seconds. Most users finish in under a minute — choose your method, customise if needed, and download. No steps skipped, no forms to fill.",
  },
  {
    question: "Is it really free to create a signature online?",
    answer: "Yes, completely free forever. No signup, no subscription, no trial limits, no watermarks. Create as many signatures as you need at zero cost.",
  },
  {
    question: "Is my signature saved when I create it online?",
    answer: "No. Everything runs entirely inside your browser. Nothing is uploaded, logged, or stored — your signature data never leaves your device.",
  },
  {
    question: "Is it legal to create a signature online in India?",
    answer: "Yes. Signatures created here are valid under the Information Technology Act 2000 for GST invoices, contracts, NDAs, and most business documents. For certified DSC requirements (MCA, court), consult a licensed CA.",
  },
  {
    question: "Can I create a signature online on my mobile phone?",
    answer: "Yes. The Draw tab is fully touch-optimised for smartphones and tablets. Type and Upload also work seamlessly on all modern mobile browsers.",
  },
  {
    question: "What format do I get after creating a signature online?",
    answer: "Transparent PNG — best for all documents, PDFs, and presentations. You can also download a white-background JPG. Both are exported at 3200×1040 px — high-resolution and print-ready.",
  },
  {
    question: "How do I add it to a PDF after creating it online?",
    answer: "Download the transparent PNG, then open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place the signature over the signature field and resize as needed.",
  },
  {
    question: "Can I fully customise when creating a signature online?",
    answer: "Yes — complete control. Adjust ink colour, stroke thickness, and drawing pressure in Draw mode. Choose from 50+ handwritten fonts and any ink colour in Type mode. Strip the white background from any uploaded image.",
  },
  {
    question: "Are there any limits on how many signatures I can create?",
    answer: "No limits at all. Create as many signatures as you need — different styles, colours, methods — all free and unlimited.",
  },
  {
    question: "Is the quality good enough for official documents?",
    answer: "Yes. The PNG is exported at 3200×1040 px — four times screen resolution. It looks sharp in print, PDFs, and digital documents at any size.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Open the tool",        description: "The tool loads immediately above — no signup, no installation, no waiting. Start creating your signature online right here." },
  { step: 2, title: "Choose your method",   description: "Draw freehand with your mouse or finger, type your name across 50+ handwritten fonts, or upload an existing signature and remove the background." },
  { step: 3, title: "Customise live",       description: "Adjust ink colour, stroke width, and font in real time. Preview on a document mockup to confirm it looks exactly right before downloading." },
  { step: 4, title: "Download instantly",   description: "Get your transparent PNG or JPG — no watermark, no account, no delay. 3200×1040 px and ready to use everywhere." },
];

const FEATURES = [
  { icon: <Timer className="h-4 w-4 text-primary" />,      title: "Create in under 60 seconds",     desc: "Draw, type or upload — all three methods get you a professional signature in under a minute." },
  { icon: <PenTool className="h-4 w-4 text-primary" />,    title: "Fast drawing with smooth lines",  desc: "Bezier curve smoothing and undo/redo let you create a natural handwritten signature in under 30 seconds." },
  { icon: <Pencil className="h-4 w-4 text-primary" />,     title: "50+ handwritten fonts",           desc: "Type your name and browse elegant, bold, or casual styles. Instant preview, instant download." },
  { icon: <ImageIcon className="h-4 w-4 text-primary" />,  title: "Upload & clean background",       desc: "Upload a photo or scan of your existing signature and remove the white background automatically." },
  { icon: <Sliders className="h-4 w-4 text-primary" />,    title: "Full real-time customisation",    desc: "Change colour, stroke thickness, and style live — see every adjustment immediately." },
  { icon: <Download className="h-4 w-4 text-primary" />,   title: "High-resolution transparent PNG", desc: "3200×1040 px export — four times screen resolution. Crisp at any size, zero watermark." },
  { icon: <Infinity className="h-4 w-4 text-primary" />,   title: "Unlimited, truly free",           desc: "No limits, no account, no watermark. Create as many signatures as you need — always free." },
  { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private — browser only",     desc: "Everything stays in your browser. Create your signature online without any data leaving your device." },
];

const STYLE_EXAMPLES = [
  { label: "GST Invoice Style",      font: "Pinyon Script",  name: "Rahul Sharma",  note: "Classic and authoritative — accepted on all GST invoices and tax documents." },
  { label: "Professional Executive", font: "Great Vibes",   name: "Anita Mehta",   note: "Flowing and refined — suits contracts, NDAs, and corporate correspondence." },
  { label: "Freelancer Modern",      font: "Satisfy",       name: "Alex Kumar",    note: "Clean, contemporary — popular with designers, developers, and consultants." },
  { label: "Minimal Clean",          font: "Caveat",        name: "Sam Iyer",      note: "Light, natural handwriting — great for quick approvals and personal notes." },
  { label: "Traditional Indian",     font: "Norican",       name: "Dr. V. Nair",   note: "Formal and distinguished — suited for academic and official documents." },
  { label: "Bold Creative",          font: "Pacifico",      name: "Chris Verma",   note: "Strong and confident — stands out on business proposals and pitch decks." },
];

export default function CreateSignatureOnline() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Create Signature Online Free – Instant PNG Download | Pixocraft",
    description:
      "Create signature online free in seconds. Draw, type in 50+ fonts or upload photo. Instant transparent PNG download. No signup, 100% private, mobile friendly. Perfect for GST, contracts & documents in India.",
    keywords:
      "create signature online, create signature online free, create digital signature online free, create signature online instantly, create handwritten signature online, create signature online India, online create signature, create e-signature online free, create signature free India, create signature online GST",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Create Signature Online – Pixocraft",
    description:
      "Create signature online free in seconds. Draw, type, or upload your signature and download a transparent PNG instantly. No signup, no watermark, 100% private.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                    url: "https://tools.pixocraft.in/" },
    { name: "Utilities",               url: "https://tools.pixocraft.in/category/utility" },
    { name: "Signature Generator",     url: PARENT_URL },
    { name: "Create Signature Online", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Create Signature Online Free – Instant PNG Download | Pixocraft",
    description:
      "Create signature online free in seconds. Draw, type in 50+ fonts or upload photo. Instant transparent PNG. No signup, 100% private. GST ready.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create Signature Online in 4 Simple Steps",
    description:
      "Use Pixocraft to create your signature online free — draw, type, or upload and download a transparent PNG in under 60 seconds.",
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
          { label: "Home",                    url: "https://tools.pixocraft.in/" },
          { label: "Utilities",               url: "/category/utility" },
          { label: "Signature Generator",     url: "/tools/signature-pad-tool" },
          { label: "Create Signature Online" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Timer className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Create Signature Online Free – Instant PNG in Seconds
              </h1>
              <p className="text-sm text-muted-foreground">Create in &lt;60 sec · No Signup · No Watermark · 100% Private · GST Ready</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            <strong>Create signature online</strong> instantly with our free tool — no software, no signup, and no wait.
            Draw with your mouse or finger, type your name in beautiful handwritten fonts, or upload your existing
            signature and clean the background automatically. Get a high-resolution transparent PNG ready to use
            immediately — no watermark, 100% private, and GST compliant.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Star className="h-3.5 w-3.5" />,       label: "Create Signature Online Free" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Instant Download" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "100% Private Browser Tool" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Mobile Friendly" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "Made in India · GST Ready" },
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
            Create unlimited signatures free · No watermark · Nothing sent to any server
          </p>
        </div>

        {/* ── SEO CONTENT ────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-5">Powerful Features to Create Signature Online</h2>
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

          {/* How to */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create Signature Online in 4 Simple Steps</h2>
            <p className="text-muted-foreground mb-5">The fastest way to create a professional signature — done in under 60 seconds.</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Draw, Type or Upload – Create Signature Online Your Way</h2>
            <p className="text-muted-foreground mb-5">
              Three methods to create your signature online — pick whichever fits your situation. Most Indian users finish in under 1 minute with any of them.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                {
                  method: "Draw",
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  tagline: "Personal touch",
                  body: "Create your signature online with a unique handwritten feel. Use your mouse or finger — adjust stroke width and colour. No two drawn signatures look the same. Under 30 seconds.",
                },
                {
                  method: "Type",
                  icon: <Pencil className="h-5 w-5 text-primary" />,
                  tagline: "Fastest method",
                  body: "The quickest way to create a signature online. Type your name and pick from 50+ calligraphic fonts for a clean, professional look. Consistent every time — great for GST invoices.",
                },
                {
                  method: "Upload",
                  icon: <ImageIcon className="h-5 w-5 text-primary" />,
                  tagline: "Reuse existing",
                  body: "Already have a signature? Upload a photo or scan and create your signature online by removing the background automatically. Your familiar mark — perfectly digitised, instantly free to use.",
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

          {/* Signature examples */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Signature Examples to Help You Create Online</h2>
            <p className="text-muted-foreground mb-5">
              Need quick ideas? Browse real examples of signatures created online — tailored for Indian professionals, freelancers, and business owners. From clean GST-ready styles to modern creative looks — pick any, load it in the Type tab, and customise instantly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {STYLE_EXAMPLES.map(({ label, font, name, note }) => (
                <div key={label} className="rounded-xl border bg-card p-5 space-y-2">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                  <p style={{ fontFamily: `'${font}', cursive`, fontSize: "2rem", lineHeight: 1.2 }} className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis">
                    {name}
                  </p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                  <button
                    onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-xs text-primary font-semibold hover:underline underline-offset-2 cursor-pointer"
                    data-testid={`button-create-style-${label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    Create this style now →
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Where to use */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Where You Can Use the Signature You Create Online</h2>
            <p className="text-muted-foreground mb-5">
              Create your signature online once and use it everywhere in your daily Indian business workflow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "GST Invoices & E-way Bills",           body: (<>Insert your PNG into Tally, Zoho Books, or any billing template. Accepted for GST documents across India. Pair with the{" "}<Link href="/tools/image-to-pdf" className="text-primary hover:underline underline-offset-2 font-medium">Image to PDF tool</Link>{" "}for a complete workflow.</>)},
                { title: "Contracts, NDAs & Offer Letters",      body: "Paste into Word or Google Docs and export as PDF. Legally valid under IT Act 2000 for most private and commercial agreements." },
                { title: "Professional Email Signatures",        body: "Gmail and Outlook both support embedded PNG signatures. Create once, use forever — 60–80 px height for a polished look on every email." },
                { title: "PDF Documents & Online Forms",         body: (<>Download your PNG and insert into any PDF with{" "}<Link href="/tools/pdf-merger" className="text-primary hover:underline underline-offset-2 font-medium">Pixocraft PDF tools</Link>, Adobe Acrobat, or Smallpdf.</>)},
                { title: "Google Docs, Word & Accounting Apps",  body: "Insert → Image in any app. Works with Tally, QuickBooks, FreshBooks, and all major billing software used by Indian businesses." },
                { title: "Aadhaar & Government E-filing",        body: "Many government portals accept image-based PNG signatures. Always check specific DSC requirements for high-stakes government submissions." },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Is It Safe &amp; Legal to Create Signature Online?</h2>
            <p className="text-muted-foreground mb-5">
              Yes — signatures you create online here are legally valid in India and internationally for most business and personal use cases.
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "India – IT Act 2000",
                  body: "Section 5 of the Information Technology Act 2000 grants electronic signatures the same legal validity as handwritten signatures for contracts, GST invoices, and general business agreements. Thousands of Indian users create their signature online daily for real work — completely legally.",
                },
                {
                  title: "Global Acceptance",
                  body: "US ESIGN Act, EU eIDAS (Simple Electronic Signature), and UK Electronic Communications Act 2000 all recognise image-based electronic signatures for most private and commercial agreements internationally.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
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
              <strong>For routine documents this is perfect.</strong> For very high-value cases needing a certified DSC (MCA ROC, court filings, property registration), consult a licensed CA.
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Pro Tips to Create Signature Online Perfectly</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tip: "Keep it short for easy reading",         detail: "A signature that's too long becomes illegible when scaled down inside PDFs. Aim for clarity at 60–80 px height." },
                { tip: "Use 2.5–4 px stroke thickness",          detail: "This range ensures strokes stay crisp whether your signature is 200 px or 2000 px wide." },
                { tip: "Choose dark blue or black ink",          detail: "The most universally accepted colours in Indian legal, corporate, and government contexts." },
                { tip: "Create 2–3 versions in one session",     detail: "Make a formal version for legal docs and a casual version for emails. Unlimited — all free." },
                { tip: "Preview in the document mockup first",   detail: "Always check the Preview before downloading to confirm size, colour, and positioning." },
                { tip: "Match colour with your brand logo",      detail: "For business proposals and client documents, a brand-colour signature builds instant recognition." },
                { tip: "Save your PNG in a dedicated folder",    detail: "Store your 3200×1040 px master PNG somewhere backed up — you'll reuse it across dozens of contracts and forms." },
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Create Signature Online with Pixocraft?</h2>
            <p className="text-muted-foreground mb-5">
              Other tools make you wait, add watermarks, or hide features behind a paywall. Pixocraft lets you create your signature online instantly with full freedom:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                { icon: <Infinity className="h-4 w-4 text-primary" />,   title: "100% free, unlimited creations",  body: "No subscription, no daily cap, no credits. Create as many signatures as you need — always free." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "Complete privacy, nothing stored", body: "Browser-only processing — your data never touches a server. The most private way to create a signature online." },
                { icon: <Globe className="h-4 w-4 text-primary" />,      title: "Built for Indian users & GST",    body: "Designed for Indian business workflows — GST invoices, IT Act 2000 compliance, and HR documents." },
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "Super fast & mobile ready",       body: "Create your signature online in under 60 seconds — on desktop or phone, no installation needed." },
                { icon: <Download className="h-4 w-4 text-primary" />,   title: "High-quality output every time",  body: "3200×1040 px transparent PNG — sharper than screen resolution, print-ready, zero watermark." },
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
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-5 py-4 text-sm text-foreground">
              Stop printing and scanning. <strong>Create your signature online right now</strong> in seconds — free and private.
            </div>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Related Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-pad-tool",            title: "Signature Generator (Main Tool)",  desc: "The complete tool with AI styles, undo/redo, and advanced options." },
                { href: "/tools/online-signature-generator",    title: "Online Signature Generator",        desc: "Create any signature online — fast, free, directly in your browser." },
                { href: "/tools/free-signature-generator",      title: "Free Signature Generator",          desc: "Emphasis on free — no cost, no watermark, unlimited downloads." },
                { href: "/tools/digital-signature-generator",   title: "Digital Signature Generator",       desc: "India IT Act 2000 ready — for GST, contracts, and business documents." },
                { href: "/tools/signature-maker",               title: "Signature Maker",                   desc: "Full creative control — custom colour, stroke width, and 50+ fonts." },
                { href: "/tools/signature-maker-free",          title: "Free Signature Maker",              desc: "All the maker features — completely free, no watermark, unlimited." },
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
                    data-testid={`faq-create-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed" data-testid={`faq-create-answer-${i}`}>
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
          <p className="font-semibold text-foreground">Ready to Create Your Signature Online?</p>
          <p className="text-xs text-muted-foreground">Free forever · Under 60 sec · No watermark · Private</p>
        </div>
        <Button
          size="default"
          onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="button-create-sticky-cta"
        >
          <Download className="mr-2 h-4 w-4" />
          Create &amp; Download Free
        </Button>
      </div>
    </>
  );
}
