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
  FilePen,
  Receipt,
  Briefcase,
  Users,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/esignature-maker";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "Is an eSignature legal in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 and its 2008 Amendment (Section 3A), electronic signatures — including image-based eSignatures — are legally valid for contracts, GST invoices, NDAs, HR documents, and most business agreements. For specific government filings (MCA ROC, court submissions, property registration), a certified Digital Signature Certificate (DSC) from a licensed Certifying Authority (CA) is mandatory.",
  },
  {
    question: "What is the difference between an eSignature and a digital signature?",
    answer:
      "An eSignature (electronic signature) is a broad term for any electronic representation of a person's intent to sign — including drawn, typed, or uploaded signature images. A Digital Signature (DSC) is a specific, cryptographically verified token issued by a licensed Certifying Authority that proves the signer's identity through PKI (Public Key Infrastructure). For everyday business — contracts, GST invoices, HR documents — an eSignature PNG is fully sufficient. A DSC is required for MCA filings, income tax e-verification, and certain government portals.",
  },
  {
    question: "Is the eSignature Maker free?",
    answer:
      "Yes — 100% free forever. No subscription, no hidden fees, no watermark, and no premium tier. Create unlimited eSignatures and download them as high-resolution PNGs at no cost.",
  },
  {
    question: "How do I add my eSignature to a PDF?",
    answer:
      "Download your eSignature as a transparent PNG. Open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place the PNG over the signature line, resize and position as needed, then save.",
  },
  {
    question: "Is my eSignature data secure and private?",
    answer:
      "Completely. This eSignature maker runs 100% inside your browser using the HTML5 Canvas API. No data — drawing strokes, text, or uploaded images — is ever sent to any server, logged, or stored. Everything stays on your device.",
  },
  {
    question: "Can I use this eSignature maker on my phone?",
    answer:
      "Yes. The Draw tab is fully touch-optimised for smartphones and tablets. The Type and Upload tabs also work seamlessly on all mobile browsers including Chrome, Safari, and Firefox on iOS and Android.",
  },
  {
    question: "Does this eSignature tool work for GST invoices?",
    answer:
      "Yes. GST invoices, e-way bills, and commercial documents accept image-based eSignatures. Download your transparent PNG and insert it into your invoice template in Tally, Zoho Books, or any billing software that supports image insertion.",
  },
  {
    question: "What file format does the eSignature download in?",
    answer:
      "You can download as a transparent PNG (perfect for overlaying on any document) or a white-background JPG (ideal for email footers). Both are exported at 3200×1040 px — print-quality resolution — with no watermark.",
  },
  {
    question: "How is an eSignature different from scanning a handwritten signature?",
    answer:
      "A scanned signature is a photograph of ink on paper — it can look blurry, have shadows, or retain a white background that shows on coloured documents. An eSignature made with this tool is generated at high resolution, has a transparent background, and is optimised for digital use — cleaner, crisper, and immediately ready for insertion into any document.",
  },
  {
    question: "Can I use the same eSignature for multiple documents?",
    answer:
      "Absolutely. Download your eSignature PNG once and reuse it across unlimited documents — contracts, invoices, proposals, email footers, forms. There is no restriction on how many times or where you use your eSignature.",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Select your method",
    description:
      "Choose Draw to sketch freehand with a mouse or finger, Type to pick from 50+ handwritten fonts, or Upload to digitise an existing signature.",
  },
  {
    step: 2,
    title: "Customise your eSignature",
    description:
      "Adjust ink colour, stroke width, or font style. For uploaded signatures, remove the white background automatically with one click.",
  },
  {
    step: 3,
    title: "Preview",
    description:
      "Hit Preview to see how your eSignature looks on a document and email footer — so you know exactly how it will appear in context.",
  },
  {
    step: 4,
    title: "Download & use instantly",
    description:
      "Save as transparent PNG or JPG. No watermark, no account, no waiting. Your eSignature is ready to use in under 60 seconds.",
  },
];

const USE_CASES = [
  {
    icon: <Receipt className="h-5 w-5 text-primary" />,
    title: "GST Invoices & E-way Bills",
    description:
      "Drop your eSignature PNG directly into Tally, Zoho Books, or any billing template. Legally accepted under GST rules for image-based signatures.",
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Contracts & Agreements",
    description:
      "Sign NDAs, service agreements, freelance contracts, and employment letters with a professional eSignature — legally valid under IT Act 2000.",
  },
  {
    icon: <FilePen className="h-5 w-5 text-primary" />,
    title: "PDF Documents",
    description:
      "Insert your transparent PNG into any PDF using Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools — in seconds, without printing or scanning.",
  },
  {
    icon: <Mail className="h-5 w-5 text-primary" />,
    title: "Email Signatures",
    description:
      "Add a personal handwritten touch to every email. Works in Gmail, Outlook, and all major email clients — just insert the PNG into your signature settings.",
  },
  {
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    title: "Business Documents",
    description:
      "Proposals, quotes, offer letters, purchase orders, and business correspondence — use your eSignature everywhere you need to authorise documents.",
  },
  {
    icon: <Globe className="h-5 w-5 text-primary" />,
    title: "Online Forms & HR Onboarding",
    description:
      "Government portals, HR platforms, and banking forms commonly accept PNG signatures. Your eSignature from this tool works directly.",
  },
];

const FEATURES = [
  {
    icon: <Pencil className="h-5 w-5 text-primary" />,
    title: "Precision Drawing Engine",
    description:
      "Built on the HTML5 Canvas API with pressure-simulated stroke rendering. Undo/redo support, adjustable ink colour, and stroke weight — creating a natural handwritten feel on desktop and mobile.",
  },
  {
    icon: <Type className="h-5 w-5 text-primary" />,
    title: "50+ Handwritten Font System",
    description:
      "Choose from over 50 Google Fonts across 7 style categories: ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker textures, airy light styles, and formal calligraphy.",
  },
  {
    icon: <Upload className="h-5 w-5 text-primary" />,
    title: "Smart Upload & Background Removal",
    description:
      "Upload a photo of an existing signature and our client-side algorithm removes the white background automatically — producing a clean transparent PNG ready for any document.",
  },
  {
    icon: <Zap className="h-5 w-5 text-primary" />,
    title: "4× Export Quality",
    description:
      "Exports are rendered at 3200×1040 px — 4× your display size — ensuring crisp, sharp results on screen, in documents, and in print. No blurry, pixelated signatures.",
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "100% Client-Side Privacy",
    description:
      "Every stroke, every character, every upload is processed entirely in your browser. Nothing is sent to any server, logged, or stored. Your eSignature data never leaves your device.",
  },
  {
    icon: <Smartphone className="h-5 w-5 text-primary" />,
    title: "Touch-Optimised Mobile Experience",
    description:
      "Single-touch stroke input, responsive layout, and full compatibility with iOS Safari and Android Chrome — create your eSignature on any device.",
  },
];

const TIPS = [
  { title: "Use a stylus or touchscreen for Draw", body: "Even if you don't have a graphics tablet, a smartphone touchscreen gives a much more natural result than a mouse." },
  { title: "Choose thin fonts for a professional look", body: "Ultra-thin scripts like Dancing Script or Great Vibes create an elegant, business-ready eSignature in the Type tab." },
  { title: "Keep your upload well-lit", body: "When photographing an existing signature, use bright, even lighting and a clean white background for best background-removal results." },
  { title: "Export as PNG for documents", body: "Always use transparent PNG when inserting into PDFs or Word documents — it overlays cleanly on any background colour." },
  { title: "Scale down for email footers", body: "Keep your signature image 250–400 px wide at 60–80 px height in email clients for a clean, professional look." },
];

const MISTAKES = [
  { title: "Using a blurry scanned image", body: "Low-resolution scans look unprofessional in digital documents. Use this tool to create a crisp, high-resolution eSignature instead." },
  { title: "Choosing a font that looks too generic", body: "Overly common or simple fonts can look impersonal. Explore the 50+ font options to find one that feels authentically 'you'." },
  { title: "Saving as JPG for coloured documents", body: "JPG has no transparency. If your document has a non-white background, always use PNG to avoid a white box around your signature." },
  { title: "Making the signature too large", body: "An oversized signature looks unprofessional on formal documents. Keep proportions similar to what you'd sign by hand." },
  { title: "Reusing the same low-quality scan", body: "If your existing scanned signature has white edges or artefacts, use the Upload tab to generate a clean transparent version." },
];

export default function ESignatureMaker() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free eSignature Maker – Create Electronic Signature Online in Seconds | Pixocraft",
    description:
      "Create eSignature online free. Draw, type or upload signature. Download high-quality PNG instantly. No login. 100% private. GST & legal ready.",
    keywords:
      "esignature maker, electronic signature maker, create esignature online, sign documents online, add signature to pdf, free electronic signature tool, eSignature India, GST invoice signature, digital signing online",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "eSignature Maker – Pixocraft",
    description:
      "Create your eSignature online for free. Draw, type, or upload your signature and download as a transparent PNG. 100% private — runs entirely in your browser. No login required.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                  url: "https://tools.pixocraft.in/" },
    { name: "Tools",                 url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "eSignature Maker",      url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Free eSignature Maker – Create Electronic Signature Online in Seconds | Pixocraft",
    description:
      "Create eSignature online free. Draw, type or upload signature. Download high-quality PNG instantly. No login. 100% private. GST & legal ready.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create an eSignature Online",
    description:
      "Use Pixocraft's free eSignature maker to draw, type, or upload an electronic signature and download it as a transparent PNG in under 60 seconds.",
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
          { label: "eSignature Maker" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                eSignature Maker Free – Create Electronic Signature Online
              </h1>
              <p className="text-sm text-muted-foreground">Free · No Login · 100% Private · GST &amp; Legal Ready</p>
            </div>
          </div>

          <p className="hidden sm:block text-base text-muted-foreground mb-5 leading-relaxed">
            Create your professional <strong>eSignature</strong> in seconds. <strong>Draw</strong> with your mouse or finger,
            <strong> type</strong> your name in 50+ handwritten fonts, or <strong>upload</strong> an existing signature and remove
            the background automatically. Download as a crisp transparent PNG — no login, no watermark, 100% private.
          </p>

          {/* Trust bar */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Star className="h-3.5 w-3.5" />,        label: "Free Forever" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />,  label: "GST & Legal Ready" },
              { icon: <Smartphone className="h-3.5 w-3.5" />,  label: "Works on Mobile" },
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

        {/* ── QUICK USE CASE BLOCK ─────────────────────────────────────────── */}
        <div className="rounded-xl border bg-primary/5 px-4 py-4 sm:px-6 sm:py-5 mb-12">
          <p className="font-semibold text-foreground mb-3">Use your eSignature instantly for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "GST invoices & e-way bills",
              "Contracts & agreements",
              "PDF documents",
              "Email signatures",
              "Business documents",
              "HR forms & onboarding",
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

          {/* What is eSignature */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What is an eSignature?</h2>
            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 mb-5">
              <p className="text-foreground font-medium">
                An <strong>eSignature</strong> (electronic signature) is any electronic symbol, process, or sound attached to or logically
                associated with a document that a person uses to indicate their intent to sign. Under the{" "}
                <strong>Information Technology Act 2000</strong>, eSignatures hold the same legal validity as a handwritten signature for
                most contracts, invoices, and business documents.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The term <strong>electronic signature</strong> encompasses a wide spectrum — from a simple image of your handwritten
              name drawn on a touchscreen, to a typed name in a calligraphic font, to a cryptographically verified identity token
              (the latter being more precisely called a Digital Signature Certificate or DSC).
            </p>
            <p className="text-muted-foreground mb-4">
              For the vast majority of everyday use cases — freelance contracts, GST invoices, NDAs, HR letters, business proposals —
              a high-quality PNG image of your signature created with an <strong>eSignature maker</strong> like this one is
              entirely sufficient. It is faster, more accessible, and more versatile than a DSC for routine signing tasks.
            </p>
            <p className="text-muted-foreground mb-4">
              Pixocraft's <strong>free eSignature maker</strong> operates entirely within your browser. Using the HTML5 Canvas API,
              every drawing stroke, font render, and uploaded image is processed locally — your signature data never leaves your device.
              This makes it one of the most privacy-respecting <strong>electronic signature maker</strong> tools available online.
            </p>
            <p className="text-muted-foreground">
              Whether you need to <strong>sign documents online</strong>, add a signature to a PDF, or create a professional email
              footer, this tool gives you everything you need — in under 60 seconds, without any account or installation.
            </p>
          </section>

          {/* How to Create eSignature */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Create an eSignature Online — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Create your electronic signature in four steps — done in under a minute:</p>
            <ol className="space-y-3 mb-6">
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
              Need the full tool with additional options?{" "}
              <Link href="/tools/signature-pad-tool" className="text-primary hover:underline underline-offset-2 font-medium">
                Visit the main Signature Generator
              </Link>.
            </p>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Features of Pixocraft's eSignature Maker</h2>
            <p className="text-muted-foreground mb-5">
              Built for professionals, freelancers, and businesses who need a reliable, fast, and private tool to{" "}
              <strong>create eSignatures online</strong>:
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Draw, Type, or Upload — Which eSignature Method Is Right for You?</h2>
            <p className="text-muted-foreground mb-5">Every workflow is different. Here is a quick comparison to help you choose the right method:</p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[540px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Method</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Best For</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Pros</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    {
                      method: "Draw",
                      best: "Unique personal feel",
                      pros: "Natural, one-of-a-kind, touch-optimised",
                      cons: "Takes a few attempts to perfect",
                    },
                    {
                      method: "Type",
                      best: "Consistent & fast output",
                      pros: "50+ fonts, always legible, reproducible",
                      cons: "Less personal than hand-drawn",
                    },
                    {
                      method: "Upload",
                      best: "Reusing an existing signature",
                      pros: "Auto background removal, high-res output",
                      cons: "Photo quality affects the result",
                    },
                  ].map(({ method, best, pros, cons }) => (
                    <tr key={method} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{method}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{best}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{pros}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{cons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground px-1">
              <strong>Quick pick:</strong> First time? → <strong>Type</strong>. Have an existing signature? → <strong>Upload</strong>. Want something uniquely yours? → <strong>Draw</strong>.
            </p>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Real-World Use Cases for Your eSignature</h2>
            <p className="text-muted-foreground mb-5">
              Once you have downloaded your eSignature PNG, you can use it across a wide range of professional and business contexts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {USE_CASES.map(({ icon, title, description }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5">
              <p className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Who Uses This eSignature Maker?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm text-muted-foreground">
                {[
                  "Freelancers signing client contracts",
                  "Small businesses creating GST invoices",
                  "HR teams handling onboarding documents",
                  "Lawyers and consultants approving agreements",
                  "Architects and engineers stamping drawings",
                  "Corporate executives authorising documents",
                  "Startups managing funding paperwork",
                  "Remote workers signing across borders",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Legal Validity in India */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Legal Validity of eSignatures in India</h2>
            <p className="text-muted-foreground mb-5">
              India was one of the first countries in Asia to formally recognise electronic signatures in law. Here is what you need to know:
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  Information Technology Act 2000
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The IT Act 2000 was the foundational legislation that granted legal recognition to electronic records and
                  electronic signatures in India. It established that a contract or document signed with an electronic
                  signature carries the same legal force as one signed with ink on paper — provided both parties consent
                  to using electronic means.
                </p>
              </div>

              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  Section 3A — Electronic Signature (Amendment 2008)
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The IT (Amendment) Act 2008 introduced Section 3A, which expanded the definition of a valid electronic
                  signature beyond Asymmetric Cryptosystem-based DSCs. Section 3A allows the Central Government to notify
                  other forms of electronic signatures as legally valid — including image-based signatures in many commercial
                  and business contexts. This provision is the statutory backbone for using eSignature PNGs on GST invoices,
                  contracts, and business documents.
                </p>
              </div>

              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  GST Acceptance
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Under GST regulations, a tax invoice must be signed or bear a digital signature of the supplier or their
                  authorised representative. CBIC has clarified that for invoices generated through accounting software
                  (Tally, Zoho, etc.), an image-based eSignature inserted into the invoice template satisfies the signature
                  requirement for most B2B and B2C transactions. For E-Invoice (IRN-based) submissions, the system-generated
                  QR code and IRN act as the authentication mechanism.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" /> Important Legal Note:</strong>
              For everyday contracts, NDAs, freelance agreements, GST invoices, and HR documents — this free eSignature maker
              is fully sufficient. For court filings, MCA ROC submissions, income tax e-verification, or property registration
              in India — a certified Digital Signature Certificate (DSC) from a licensed Certifying Authority (CA) is required.
              Always consult a qualified legal professional for documents of significant legal consequence.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {[
                { flag: "🇮🇳", country: "India",          law: "IT Act 2000 + Section 3A (2008)",       desc: "Valid for contracts, GST invoices, business agreements, and HR documents." },
                { flag: "🇺🇸", country: "United States",  law: "ESIGN Act + UETA",                     desc: "Same legal effect as handwritten for most contracts and commercial agreements." },
                { flag: "🇪🇺", country: "European Union", law: "eIDAS Regulation (2016)",              desc: "Qualifies as a Simple Electronic Signature (SES) — valid for general contracts." },
                { flag: "🇬🇧", country: "United Kingdom", law: "Electronic Communications Act 2000",  desc: "Legally binding for most business and personal agreements." },
              ].map(({ flag, country, law, desc }) => (
                <div key={country} className="rounded-xl border bg-card p-4 space-y-1.5">
                  <p className="font-semibold text-foreground flex items-center gap-2"><span>{flag}</span>{country}</p>
                  <p className="text-xs font-medium text-primary">{law}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* eSignature vs Digital Signature */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">eSignature vs Digital Signature — The Definitive Difference</h2>
            <p className="text-muted-foreground mb-5">
              These two terms are frequently confused — even by professionals. Here is a clear, precise breakdown:
            </p>

            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Aspect</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">eSignature (Electronic Signature)</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Digital Signature (DSC)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { aspect: "Definition",         esig: "Any electronic representation of signing intent — drawn, typed, or uploaded image", dsc: "A cryptographically verified identity token using PKI (Public Key Infrastructure)" },
                    { aspect: "Technology",         esig: "HTML5 Canvas, font rendering, image processing", dsc: "Asymmetric cryptography, X.509 certificates, hash functions" },
                    { aspect: "Issued by",          esig: "Created by yourself using a tool like this one", dsc: "Issued by a licensed Certifying Authority (CA) such as eMudhra, Sify, or NSDL" },
                    { aspect: "Identity proof",     esig: "Based on trust and agreed intent between parties", dsc: "Cryptographically verifies the signer's identity — tamper-evident" },
                    { aspect: "Use cases",          esig: "Contracts, GST invoices, NDAs, HR documents, email footers", dsc: "MCA ROC filings, court submissions, income tax e-verification, property registration" },
                    { aspect: "Cost",               esig: "Free (like this tool)", dsc: "Paid — typically ₹500–₹3,000 per year from a CA" },
                    { aspect: "Setup time",         esig: "Under 60 seconds", dsc: "1–3 business days for verification and issuance" },
                    { aspect: "Legal standard",     esig: "Simple Electronic Signature (SES) or Advanced Electronic Signature (AES)", dsc: "Qualified Electronic Signature (QES) — the highest legal standard" },
                  ].map(({ aspect, esig, dsc }) => (
                    <tr key={aspect} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{aspect}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{esig}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{dsc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5">
              <p className="font-semibold text-foreground mb-2">When Should You Use Each?</p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Use an eSignature (this tool)</strong> when you need to sign freelance contracts,
                  GST invoices, business agreements, employment letters, NDAs, purchase orders, and any day-to-day business document.
                  An eSignature is faster, free, and legally valid for the overwhelming majority of commercial transactions.
                </p>
                <p>
                  <strong className="text-foreground">Use a Digital Signature Certificate (DSC)</strong> when filing with the Ministry
                  of Corporate Affairs (MCA), submitting documents to courts, e-verifying income tax returns, or registering property —
                  situations where a government portal explicitly requires cryptographic identity verification.
                </p>
              </div>
            </div>
          </section>

          {/* How to Add eSignature to PDF */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Add an eSignature to a PDF</h2>
            <p className="text-muted-foreground mb-5">
              One of the most common needs is to <strong>add a signature to a PDF</strong> document. Here is the step-by-step process:
            </p>
            <ol className="space-y-3 mb-5">
              {[
                { step: 1, title: "Create your eSignature", body: "Use the tool above — draw, type, or upload. Download as a transparent PNG." },
                { step: 2, title: "Open your PDF", body: "Open your PDF in Adobe Acrobat Reader (free), Smallpdf, or Pixocraft's PDF tools." },
                { step: 3, title: "Insert the signature image", body: "In Acrobat: Tools → Fill & Sign → Sign → Add Signature → Image → select your PNG. In Smallpdf: use their eSign feature and upload the PNG." },
                { step: 4, title: "Position and resize", body: "Drag the signature image to the correct location on the signature line. Resize proportionally by holding Shift while dragging a corner." },
                { step: 5, title: "Save the signed PDF", body: "Save or export the document. Your PDF is now signed with your eSignature — ready to share, email, or archive." },
              ].map(({ step, title, body }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Tips for Creating a Professional eSignature</h2>
            <p className="text-muted-foreground mb-5">Follow these professional best practices to get the best results from your eSignature:</p>
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Common eSignature Mistakes to Avoid</h2>
            <p className="text-muted-foreground mb-5">Avoid these common errors that make eSignatures look unprofessional or unusable:</p>
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why Choose Pixocraft's eSignature Maker?</h2>
            <p className="text-muted-foreground mb-5">
              There are dozens of eSignature tools online. Here is what makes Pixocraft's <strong>free electronic signature maker</strong> stand out:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {[
                { icon: <Lock className="h-4 w-4 text-primary" />,        title: "Zero data collection",          body: "We collect nothing. No analytics on your signature, no behavioural tracking, no ads targeting." },
                { icon: <Zap className="h-4 w-4 text-primary" />,         title: "Instant, no friction",          body: "No registration wall, no email confirmation, no onboarding flow. Open the page and start." },
                { icon: <Star className="h-4 w-4 text-primary" />,        title: "Professional quality output",   body: "4× resolution export (3200×1040 px) means your eSignature looks sharp in any document or print." },
                { icon: <Globe className="h-4 w-4 text-primary" />,       title: "Works everywhere",              body: "Desktop, tablet, mobile — any browser, any platform, any operating system." },
                { icon: <Building2 className="h-4 w-4 text-primary" />,   title: "India-focused design",         body: "Built with Indian business users in mind — GST invoice compatibility, IT Act awareness, rupee invoicing context." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />,  title: "Free forever — genuinely",     body: "Not a freemium bait-and-switch. No watermarks, no usage limits, no hidden upsell for PNG export." },
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
                data-testid="button-create-esignature-cta"
              >
                <PenTool className="h-4 w-4" />
                Create Your eSignature Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal Linking */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Related Signature Tools</h2>
            <p className="text-muted-foreground mb-5">
              Explore all of Pixocraft's free signature tools — each optimised for a specific signing workflow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/online-signature-generator",  title: "Online Signature Generator",   desc: "Create a signature online with draw, type, or upload — optimised for web use." },
                { href: "/tools/free-signature-generator",    title: "Free Signature Generator",     desc: "100% free signature generation with no hidden costs or premium tiers." },
                { href: "/tools/signature-maker",             title: "Signature Maker",               desc: "The flagship signature maker tool — all features, maximum control." },
                { href: "/tools/signature-maker-free",        title: "Signature Maker Free",          desc: "Lightweight, fast-loading signature maker built for quick use." },
                { href: "/tools/digital-signature-generator", title: "Digital Signature Generator",  desc: "Focused on digital signing with detailed guidance on DSC vs eSignature." },
                { href: "/tools/signature-pad-tool",          title: "Signature Pad Tool",            desc: "The core signature pad — the foundation powering all Pixocraft signature tools." },
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Frequently Asked Questions — eSignature Maker</h2>
            <p className="text-muted-foreground mb-5">Everything you need to know about creating and using an eSignature online:</p>
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
            <PenTool className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Create Your eSignature?</h2>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto text-sm">
              Join thousands of professionals, freelancers, and businesses who use Pixocraft's free eSignature maker every day.
              No login. No watermark. No cost. Create your electronic signature in seconds.
            </p>
            <Button
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2"
              data-testid="button-create-esignature-final"
            >
              <PenTool className="h-4 w-4" />
              Create eSignature Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
