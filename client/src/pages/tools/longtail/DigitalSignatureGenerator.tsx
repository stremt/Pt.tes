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
  AlertCircle,
  Image as ImageIcon,
  Pencil,
  Palette,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/digital-signature-generator";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "Is this digital signature generator free?",
    answer: "Yes, 100% free forever. No subscription, no watermark, no hidden charges. Create and download as many signatures as you need — completely free.",
  },
  {
    question: "Is a digital signature created here legally valid in India?",
    answer: "Yes, for most everyday purposes. Under the Information Technology Act 2000 and IT (Amendment) Act 2008, electronic signatures are legally recognised for contracts, GST invoices, HR documents, and general business agreements. For specific government portals (MCA ROC, court filings, property registration), a certified DSC from a licensed CA is required.",
  },
  {
    question: "What is the difference between this tool and a DSC?",
    answer: "This tool creates a visual PNG image of your signature — called a Simple Electronic Signature (SES). A Digital Signature Certificate (DSC) is a cryptographically verified identity token issued by a licensed Certifying Authority (CA). DSCs are required for MCA filings, income tax portal, and certain government submissions. For contracts, GST invoices, and business documents, a PNG signature from this tool is fully sufficient.",
  },
  {
    question: "Can I use this digital signature for GST invoices?",
    answer: "Yes. GST invoices, e-way bills, and most commercial documents accept image-based digital signatures. Download your transparent PNG and insert it into your invoice template in Tally, Zoho Books, or any billing software.",
  },
  {
    question: "Is my signature data stored on your servers?",
    answer: "Never. This digital signature generator runs entirely in your browser using the HTML5 Canvas API. Nothing is uploaded, logged, or stored — your signature data never leaves your device.",
  },
  {
    question: "Can I use this on my mobile phone?",
    answer: "Yes. The Draw tab is fully touch-optimised for smartphones and tablets. The Type and Upload tabs also work seamlessly on all modern mobile browsers including Chrome and Safari.",
  },
  {
    question: "What file formats can I download?",
    answer: "Transparent PNG (ideal for documents, PDFs, and presentations) or white-background JPG (best for email footers). Both are exported at 3200×1040 px — high-resolution and print-ready.",
  },
  {
    question: "How do I add my digital signature to a PDF?",
    answer: "Download your transparent PNG, then open the PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place your signature directly over the signature field.",
  },
  {
    question: "Can I use the uploaded signature for Aadhaar or government documents?",
    answer: "Many government forms and HR portals accept image-based signatures in PNG format. However, certain Aadhaar-linked services and official government submissions may require an OTP-based e-signature or a certified DSC. Check the specific portal's requirements before submitting.",
  },
  {
    question: "How many fonts are available?",
    answer: "Over 50 handwritten Google Fonts across categories including ultra-thin elegant scripts, classic cursive, bold chunky styles, casual handwriting, marker textures, and formal calligraphy — all free.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Choose your method", description: "Select Draw to sketch freehand with mouse or finger, Type to pick from 50+ handwritten fonts, or Upload to digitise an existing signature." },
  { step: 2, title: "Customise it", description: "Adjust ink colour and stroke width for drawing, pick a font and colour for typing, or remove the white background for an upload." },
  { step: 3, title: "Preview", description: "Click Preview to see your digital signature on a document mockup and email footer before committing to a download." },
  { step: 4, title: "Download instantly", description: "Save as transparent PNG or JPG — no watermark, no account, no delay. High-resolution and ready to use immediately." },
];

const FEATURES = [
  { icon: <PenTool className="h-4 w-4 text-primary" />,   title: "Smooth freehand drawing",       desc: "Bezier curve smoothing delivers natural, flowing strokes on both mouse and touchscreen." },
  { icon: <Pencil className="h-4 w-4 text-primary" />,    title: "50+ professional fonts",        desc: "Instantly preview your name across a curated library of calligraphic and handwritten Google Fonts." },
  { icon: <ImageIcon className="h-4 w-4 text-primary" />, title: "Upload & background removal",    desc: "Upload a photo of your existing signature and strip the white background automatically with one click." },
  { icon: <Palette className="h-4 w-4 text-primary" />,   title: "Custom ink colour & thickness", desc: "Choose any hex colour and fine-tune stroke width to create the exact professional look you need." },
  { icon: <Download className="h-4 w-4 text-primary" />,  title: "High-res transparent PNG",       desc: "Exported at 3200×1040 px — four times screen resolution. Crisp at any size, no watermark." },
  { icon: <Shield className="h-4 w-4 text-primary" />,    title: "100% private, no server upload", desc: "All processing happens locally in your browser. Your digital signature never touches any server." },
  { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile & touch optimised",      desc: "Single-touch drawing works naturally on any smartphone or tablet — iOS and Android." },
  { icon: <Zap className="h-4 w-4 text-primary" />,       title: "Instant offline operation",      desc: "Once loaded, the generator works without an internet connection — no server dependency at all." },
];

export default function DigitalSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Digital Signature Generator – Legal & Free Online | Pixocraft",
    description:
      "Free digital signature generator online. Create signature for GST, contracts & documents. Draw, type or upload – instant PNG download. Private.",
    keywords:
      "digital signature generator, digital signature online India, digital signature for GST, free digital signature tool, create digital signature online, digital signature maker, e-signature generator, digital signature PNG, online digital signature India, digital signature generator free",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Digital Signature Generator – Pixocraft",
    description:
      "Free digital signature generator online. Create signature for GST, contracts, and documents. Draw, type or upload — instant PNG download. 100% private, browser-only.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                         url: "https://tools.pixocraft.in/" },
    { name: "Utilities",                    url: "https://tools.pixocraft.in/category/utility" },
    { name: "Signature Generator",          url: PARENT_URL },
    { name: "Digital Signature Generator",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Digital Signature Generator – Legal & Free Online | Pixocraft",
    description:
      "Free digital signature generator online. Create signature for GST, contracts & documents. Draw, type or upload – instant PNG download. Private.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Digital Signature Online",
    description:
      "Use Pixocraft's free digital signature generator to draw, type, or upload a signature and download it as a transparent PNG in under 60 seconds.",
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
          { label: "Home",                         url: "https://tools.pixocraft.in/" },
          { label: "Utilities",                    url: "/category/utility" },
          { label: "Signature Generator",          url: "/tools/signature-pad-tool" },
          { label: "Digital Signature Generator" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Digital Signature Generator – Create Legal Signature Online
              </h1>
              <p className="text-sm text-muted-foreground">Free · IT Act 2000 Ready · No Signup · 100% Private</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create a professional <strong>digital signature online</strong> in seconds — no software, no signup, and no
            cost. <strong>Draw</strong> freehand with your mouse or finger, <strong>type</strong> your name in one of
            50+ calligraphic fonts, or <strong>upload</strong> an existing signature and remove the background
            automatically. Download as a high-resolution transparent PNG — valid under India's IT Act 2000 for GST
            invoices, contracts, and business documents. Your data never leaves your browser.
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Star className="h-3.5 w-3.5" />,       label: "Free Forever" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Instant PNG Download" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "100% Private (Browser Only)" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Mobile Friendly" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "IT Act 2000 Ready" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Clarification callout */}
          <div className="flex gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-sm text-amber-900 dark:text-amber-200">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold mb-0.5">About this tool</p>
              <p>
                This tool creates <strong>visual digital signatures</strong> (PNG image) for use in documents,
                PDFs, emails, and contracts. For legally certified{" "}
                <strong>Digital Signature Certificates (DSC)</strong> required for government portals (MCA, income
                tax, court), consult an authorised Certifying Authority (CA).
              </p>
            </div>
          </div>
        </div>

        {/* ── TOOL ───────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <SignaturePadWidget />
          <p className="text-xs text-muted-foreground text-center mt-3">
            No watermark · No upload to server · Works offline after page load
          </p>
        </div>

        {/* ── SEO CONTENT ────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-5">Powerful Features of Our Digital Signature Generator</h2>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a Digital Signature Online</h2>
            <p className="text-muted-foreground mb-5">Four simple steps. Done in under 60 seconds.</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Draw vs Type vs Upload for Digital Signatures</h2>
            <p className="text-muted-foreground mb-5">Each method suits a different use case — pick the one that fits your workflow:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  method: "Draw",
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  tagline: "Most personal",
                  body: "Sketch freehand with your mouse or touchscreen. The result is uniquely yours — ideal for contracts, NDAs, and documents where a personal, one-of-a-kind signature is important.",
                },
                {
                  method: "Type",
                  icon: <Pencil className="h-5 w-5 text-primary" />,
                  tagline: "Fastest & consistent",
                  body: "Type your name and instantly preview 50+ calligraphic fonts. Every download looks identical — perfect for GST invoices, email footers, and any document you sign repeatedly.",
                },
                {
                  method: "Upload",
                  icon: <ImageIcon className="h-5 w-5 text-primary" />,
                  tagline: "Digitise existing sig",
                  body: "Photograph or scan your existing pen-and-paper signature, upload it, and remove the background with one click. Best for preserving your established signature in digital form.",
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

          {/* Digital Signature vs DSC */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Digital Signature vs DSC – Important Difference</h2>
            <p className="text-muted-foreground mb-5">
              These two terms are often confused in India. Understanding the difference helps you use the right tool for the right situation:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Aspect</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">PNG Signature (This Tool)</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">DSC (Certified)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["What it is",       "A high-res image of your signature",        "A cryptographic identity token from a CA"],
                    ["Cost",             "Free forever",                              "Paid — from authorised CA"],
                    ["Setup time",       "Under 60 seconds",                         "Days (KYC process required)"],
                    ["Where it works",   "Contracts, GST, invoices, HR, email",       "MCA ROC, income tax portal, court"],
                    ["Legal basis",      "IT Act 2000 — Simple Electronic Signature", "IT Act 2000 — Qualified/Advanced Sig"],
                    ["Privacy",          "100% local — nothing stored anywhere",      "CA holds your certificate"],
                    ["Format",           "PNG / JPG image file",                      "Digital certificate (.pfx / USB token)"],
                  ].map(([aspect, png, dsc]) => (
                    <tr key={aspect} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{aspect}</td>
                      <td className="px-5 py-3.5 text-primary font-medium">{png}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{dsc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/20 px-5 py-4 text-sm text-foreground">
              <strong>Bottom line:</strong> For GST invoices, freelance contracts, NDAs, offer letters, and everyday business documents — this free <strong>digital signature generator</strong> is fully sufficient. For MCA ROC filings, income tax digital signature verification, or court submissions — you need a certified DSC from a licensed CA.
            </div>
          </section>

          {/* Signature Examples */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Professional Signature Examples</h2>
            <p className="text-muted-foreground mb-5">
              A professional digital signature should be clear, legible, and appropriate to its context. This digital signature generator includes 50+ fonts spanning formal calligraphy, elegant cursive, bold scripts, and casual everyday handwriting. Below are six live-rendered examples — all available free in the Type tab. Click any style to load it instantly in the tool above.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Formal / Legal",         font: "Great Vibes",    name: "Rajesh Kumar",     note: "Flowing thin script — trusted for contracts, NDAs, and legal correspondence." },
                { label: "Classic Professional",   font: "Pinyon Script",  name: "Anita Sharma",     note: "Traditional cursive — suits business agreements and corporate documents." },
                { label: "Bold / Executive",       font: "Pacifico",       name: "Vikram Patel",     note: "Strong rounded style — great for invoices and authority-conveying documents." },
                { label: "Clean / Modern",         font: "Satisfy",        name: "Priya Menon",      note: "Minimal and contemporary — ideal for tech professionals and email footers." },
                { label: "Casual / Personal",      font: "Caveat",         name: "Amit Singh",       note: "Natural handwriting feel — suited for personal notes and approvals." },
                { label: "Calligraphic / Formal",  font: "Norican",        name: "Dr. S. Krishnan",  note: "Authoritative and refined — suited for academic and official documents." },
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

          {/* Use cases India */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Where to Use a Digital Signature in India</h2>
            <p className="text-muted-foreground mb-5">
              A visual PNG signature from this <strong>digital signature generator</strong> is accepted across a wide range of Indian business and government contexts:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "GST Invoices & E-way Bills",              body: "Insert your PNG signature into Tally, Zoho Books, or any billing template. Accepted by most GST portals as a visual authorisation mark." },
                { title: "Business Contracts & Agreements",         body: "NDAs, service agreements, vendor contracts — a PNG signature satisfies IT Act 2000 requirements for most private commercial transactions." },
                { title: "HR & Employment Documents",               body: "Offer letters, appointment orders, appraisal letters, and onboarding forms — paste your digital signature for instant, professional sign-off." },
                { title: "Aadhaar & Government Forms",              body: "Many government forms and applications accept image-based signatures. Always check the specific portal's requirements for certified DSC needs." },
                { title: "Email Footers (Gmail & Outlook)",         body: "A transparent PNG signature adds a polished, personal touch to every business email you send — instantly recognisable and trustworthy." },
                { title: "Freelance Proposals & Invoices",          body: "Sign proposals, quotes, and invoices with your digital signature to convey professionalism and speed up client approvals." },
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

          {/* Legal in India */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Is a Digital Signature Legal in India?</h2>
            <p className="text-muted-foreground mb-5">
              Yes. India's legal framework for electronic signatures is well-established and business-friendly:
            </p>
            <div className="space-y-4 mb-6">
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                  Information Technology Act 2000
                </p>
                <p className="text-sm text-muted-foreground">
                  Section 5 of the IT Act 2000 grants electronic signatures the same legal validity as handwritten signatures for any law that requires a document to be signed. The IT (Amendment) Act 2008 further expanded and clarified this framework.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                  GST & Commercial Usage
                </p>
                <p className="text-sm text-muted-foreground">
                  GST invoices, e-way bills, and most commercial agreements are fully valid with an image-based digital signature. The GSTN portal and most billing software accept PNG signatures as part of invoice templates.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                  General Business Acceptance
                </p>
                <p className="text-sm text-muted-foreground">
                  Banks, corporates, law firms, and HR departments across India routinely accept image-based electronic signatures on contracts, appointment letters, NDAs, and vendor agreements. A PNG signature from this digital signature generator meets these requirements.
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong>When you need a DSC instead:</strong> MCA ROC filings, income tax digital signature verification, property registration, court submissions, and other government-mandated processes require a certified Digital Signature Certificate from a licensed CA. Consult a legal professional for high-stakes transactions.
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips for a Professional Digital Signature</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tip: "Use black or dark blue ink",           detail: "These are universally accepted in Indian legal and corporate contexts. They read cleanly on both colour and greyscale document prints." },
                { tip: "Set stroke width to 3–4 px",          detail: "Thicker strokes remain legible when your signature is scaled down inside PDFs, invoices, or email footers at 60–80 px height." },
                { tip: "Always download as transparent PNG",   detail: "A transparent background lets your digital signature sit cleanly over any document colour, invoice template, or letterhead." },
                { tip: "Match style to document formality",    detail: "Thin calligraphic fonts for legal documents and contracts; bold or modern styles for business proposals and marketing material." },
                { tip: "Keep a master high-res copy",         detail: "Save your 3200×1040 px PNG in a secure, backed-up location — you will reuse it across dozens of contracts and forms." },
                { tip: "Use Preview before downloading",      detail: "Always check the document mockup and email footer preview to confirm size and positioning before committing to a download." },
                { tip: "Test at real document size",          detail: "Most signature fields in PDFs and contracts are 60–100 px tall. Preview at that height to ensure yours stays readable and professional." },
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Choose Pixocraft's Digital Signature Generator?</h2>
            <p className="text-muted-foreground mb-5">
              Built specifically for Indian business users — here's what makes Pixocraft the right choice:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Star className="h-4 w-4 text-primary" />,        title: "Genuinely free, always",        body: "No subscriptions, no credit card, no watermarks. Free for individuals, freelancers, and businesses." },
                { icon: <Shield className="h-4 w-4 text-primary" />,      title: "Zero data collection",          body: "100% browser-based. Your signature is processed locally — never uploaded, logged, or retained." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />,  title: "India IT Act 2000 ready",       body: "Signatures created here are legally valid under Indian law for most commercial and business documents." },
                { icon: <Zap className="h-4 w-4 text-primary" />,         title: "No signup, instant use",        body: "Open the page and start creating in seconds. No registration, no email, no friction." },
                { icon: <Download className="h-4 w-4 text-primary" />,    title: "Print-quality PNG export",      body: "3200×1040 px — sharper than screen resolution and ready for print, PDF, and web use." },
                { icon: <Globe className="h-4 w-4 text-primary" />,       title: "Made in India, built for India", body: "Designed with Indian GST, contract, and HR workflows in mind. India-first, privacy-first." },
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
                    ["India IT Act Ready",      "Yes",  "Partial", "Partial"],
                    ["Transparent PNG Export",  "Yes",  "No",      "No"],
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

          {/* Related tools / cluster links */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Related Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-pad-tool",            title: "Signature Generator (Main Tool)",  desc: "The full-featured tool with all options, AI styles, and advanced controls." },
                { href: "/tools/online-signature-generator",    title: "Online Signature Generator",      desc: "Create any signature online — fast and free, directly in your browser." },
                { href: "/tools/free-signature-generator",      title: "Free Signature Generator",        desc: "Emphasis on free — no cost, no watermark, unlimited downloads." },
                { href: "/tools/signature-maker",               title: "Signature Maker",                 desc: "Full creative control — custom colour, stroke width, and 50+ fonts." },
                { href: "/tools/pdf-merger",                    title: "PDF Merger",                      desc: "Merge signed PDFs and other documents into one clean file." },
                { href: "/tools/background-remover",            title: "Background Remover",              desc: "Clean up signature images — remove any background with precision." },
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
                    data-testid={`faq-digital-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed" data-testid={`faq-digital-answer-${i}`}>
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
            <p><strong className="text-foreground">Made in India</strong> — Privacy-first tools built for Indian business users. Your data never leaves your browser.</p>
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
          <p className="font-semibold text-foreground">Create Your Digital Signature Now</p>
          <p className="text-xs text-muted-foreground">Free forever · No signup · IT Act 2000 ready · Private</p>
        </div>
        <Button
          size="default"
          onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="button-digital-sticky-cta"
        >
          <Download className="mr-2 h-4 w-4" />
          Create &amp; Download Free
        </Button>
      </div>
    </>
  );
}
