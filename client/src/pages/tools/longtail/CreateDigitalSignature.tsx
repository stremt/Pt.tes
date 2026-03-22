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
  BadgeCheck,
  BookOpen,
  Bookmark,
  RefreshCw,
  Users,
  Briefcase,
  GraduationCap,
  Star,
  Building,
  Scale,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/create-digital-signature";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-generator";
const LAST_UPDATED = "March 21, 2026";

const FAQS = [
  {
    question: "How do I create a digital signature online for free?",
    answer:
      "Open Pixocraft's digital signature tool — no login needed. Choose Draw (sketch with mouse or finger), Type (pick from 50+ handwriting fonts), or Upload (digitise your existing signature). Customise the colour and size, then click Download to save a high-resolution transparent PNG instantly — completely free, with no watermark.",
  },
  {
    question: "What is the difference between a digital signature and an electronic signature?",
    answer:
      "An electronic signature (e-signature) is any digital representation of your intent to sign — including a PNG image of your handwriting. A digital signature (in its technical sense) refers to a cryptographically verified identity token issued by a licensed Certifying Authority (DSC). In everyday usage, both terms are used interchangeably. This tool creates a Simple Electronic Signature (SES) — an image of your signature — which is legally valid under the IT Act 2000 for most commercial and business documents.",
  },
  {
    question: "Is a digital signature created here legally valid in India?",
    answer:
      "Yes, for most everyday purposes. Under the Information Technology Act 2000 and IT (Amendment) Act 2008, electronic signatures are legally recognised for contracts, GST invoices, HR documents, and general business agreements. For specific government portals (MCA ROC, court filings, property registration), a certified DSC from a licensed CA is required.",
  },
  {
    question: "What is a DSC (Digital Signature Certificate) and when do I need one?",
    answer:
      "A Digital Signature Certificate (DSC) is a cryptographic credential issued by a government-licensed Certifying Authority (CA). It is required for: MCA ROC company filings, income tax portal submissions with DSC verification, court e-filings, property registration on government portals, and tenders requiring Class 3 DSC. For contracts, GST invoices, and business documents, a PNG signature from this free tool is fully sufficient.",
  },
  {
    question: "Can I save my digital signature and reuse it?",
    answer:
      "Yes. Download your signature as a transparent PNG and save it to your device, Google Drive, or Dropbox. Once saved, paste it into any document, PDF, invoice, or email footer anytime — no internet required. You never need to recreate it. Many users keep a master high-resolution copy (3200×1040 px) for repeated use across hundreds of documents.",
  },
  {
    question: "Does this tool work offline?",
    answer:
      "Yes. Once the page is loaded, the entire tool runs inside your browser using HTML5 Canvas — no server calls are made. You can disconnect from the internet and still draw, type, or upload a signature and download it. This makes it ideal for offline environments or slow connections.",
  },
  {
    question: "Is my signature data stored on Pixocraft's servers?",
    answer:
      "Never. All processing happens locally in your browser using the HTML5 Canvas API. Nothing is uploaded, logged, or stored anywhere. Your signature never leaves your device — not even temporarily. This is 100% private by design.",
  },
  {
    question: "Can I use this digital signature on GST invoices?",
    answer:
      "Yes. GST invoices, e-way bills, and most commercial documents accept image-based digital signatures. Download your transparent PNG and insert it into your invoice template in Tally, Zoho Books, QuickBooks, or any billing software. GSTN and most state tax portals accept PNG signatures as part of invoice templates.",
  },
  {
    question: "Is this tool free? Are there any hidden charges?",
    answer:
      "100% free forever. No subscription plan, no credit card, no watermark, no usage limit. Create and download as many signatures as you need — for personal, freelance, and business use — completely free.",
  },
  {
    question: "Can I use my digital signature for email footers in Gmail and Outlook?",
    answer:
      "Yes. Download a transparent PNG or white-background JPG version of your signature and insert it into Gmail Settings → Signature or Outlook's email signature editor. A handwritten signature in your email footer adds a professional, personal touch that builds trust with clients and partners.",
  },
  {
    question: "How is Pixocraft different from DocuSign or Adobe Sign?",
    answer:
      "DocuSign and Adobe Sign are workflow platforms for managing multi-party document signing — they require accounts, subscriptions, and are built for enterprise use. Pixocraft is a free, privacy-first tool for creating your signature image (PNG). No login, no cost, no data collection. Ideal for individuals, freelancers, and small businesses who need a quick, private signature for their own documents.",
  },
  {
    question: "Is a digital signature from this tool valid outside India?",
    answer:
      "Yes, for most international contexts. The US ESIGN Act and EU eIDAS Regulation recognise Simple Electronic Signatures (SES) — image-based signatures — as legally valid for most commercial contracts. For regulated industries (banking, healthcare, government contracts) in specific countries, advanced or qualified electronic signatures may be required. Consult a local legal professional for high-stakes international transactions.",
  },
];

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Open the tool — no signup",
    description: "The digital signature creator loads instantly in your browser. No account, no email, no registration required.",
  },
  {
    step: 2,
    title: "Choose your signature method",
    description: "Draw freehand with mouse or finger, Type your name in one of 50+ calligraphic fonts, or Upload a photo of your existing signature.",
  },
  {
    step: 3,
    title: "Customise colour and style",
    description: "Pick your ink colour (black, dark blue, or any custom hex), adjust stroke thickness for drawing, or select a font style for typing.",
  },
  {
    step: 4,
    title: "Download transparent PNG",
    description: "Click Download to save your high-resolution transparent PNG (3200×1040 px) instantly — no watermark, no delay.",
  },
  {
    step: 5,
    title: "Save and reuse anytime",
    description: "Store your PNG in Google Drive, Dropbox, or your desktop. Paste it into any document, PDF, invoice, or email footer whenever needed.",
  },
];

const USE_CASES = [
  {
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    group: "Freelancers & Consultants",
    cases: [
      "Client proposals and service agreements",
      "Freelance invoices and quotes",
      "NDAs and confidentiality agreements",
      "Project milestone sign-offs",
    ],
  },
  {
    icon: <Building className="h-5 w-5 text-primary" />,
    group: "Business Owners & SMEs",
    cases: [
      "GST invoices and e-way bills",
      "Vendor contracts and purchase orders",
      "HR offer letters and appointment orders",
      "Board resolutions and meeting minutes",
    ],
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
    group: "Students & Professionals",
    cases: [
      "College application forms",
      "Internship and placement documents",
      "Scholarship declarations",
      "Research papers and submissions",
    ],
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    group: "Individuals & Daily Use",
    cases: [
      "Email footers (Gmail, Outlook)",
      "Aadhaar and government form images",
      "Lease agreements and rent contracts",
      "Insurance and banking forms",
    ],
  },
];

export default function CreateDigitalSignature() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Create Digital Signature Online Free – eSign Generator (No Signup)",
    description:
      "Create digital signature online free using Pixocraft. Draw, type or upload signature and download PNG instantly. No login, 100% private, works offline.",
    keywords:
      "create digital signature online, digital signature generator free, e signature online, create digital signature free, online digital signature maker, electronic signature generator, digital signature PNG, create esignature online, free digital signature India, sign online free",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Create Digital Signature Online – Pixocraft",
    description:
      "Free online digital signature creator. Draw, type or upload your signature and download a transparent PNG instantly. No login, 100% browser-based, works offline.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Productivity", url: "https://tools.pixocraft.in/tools/productivity" },
    { name: "Signature Generator", url: PARENT_URL },
    { name: "Create Digital Signature", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Create Digital Signature Online Free – eSign Generator (No Signup)",
    description:
      "Create digital signature online free using Pixocraft. Draw, type or upload signature and download PNG instantly. No login, 100% private.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Digital Signature Online",
    description:
      "Create a digital signature online free in 5 easy steps using Pixocraft. No signup, no software, instant transparent PNG download.",
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

        {/* Breadcrumb */}
        <Breadcrumb items={[
          { label: "Home", url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Productivity", url: "/tools/productivity" },
          { label: "Signature Generator", url: "/tools/signature-generator" },
          { label: "Create Digital Signature" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Create Digital Signature Online Free (No Signup, Instant PNG)
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">Free · No Login · 100% Private · Works Offline</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create a <strong>digital signature online free</strong> in seconds — draw, type, or upload. Download a high-resolution
            transparent PNG instantly with no watermark and no account required. Works entirely in your browser, offline-capable,
            and fully valid under India's IT Act 2000 for GST invoices, contracts, and business documents.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "No Signup" },
              { icon: <Lock className="h-3.5 w-3.5" />, label: "100% Private" },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Works Offline" },
              { icon: <Download className="h-3.5 w-3.5" />, label: "Instant Download" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "No Upload to Server" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground"
              >
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Clarity callout */}
          <div className="flex gap-3 p-4 rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-sm text-amber-900 dark:text-amber-200 mb-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold mb-0.5">Important: What this tool creates</p>
              <p>
                This tool creates a <strong>Simple Electronic Signature</strong> — a transparent PNG image of your handwriting.
                This is different from a <strong>DSC (Digital Signature Certificate)</strong>, which is a cryptographic
                certificate issued by a licensed CA for government portals. Scroll down for a full comparison.
              </p>
            </div>
          </div>
        </div>

        {/* ── TOOL ───────────────────────────────────────────────────────── */}
        <SignatureToolSection
          mode="draw"
          caption="No watermark · No server upload · Works offline after first load · Transparent PNG export"
        />

        {/* ── FEATURED SNIPPET BLOCK ─────────────────────────────────────── */}
        <section className="mb-12 rounded-xl border-2 border-primary/20 bg-primary/5 p-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Quick Answer</span>
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">How to create a digital signature online?</h2>
          <ol className="space-y-2">
            {HOW_TO_STEPS.map(({ step, title, description }) => (
              <li key={step} className="flex gap-3 text-sm">
                <span className="shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center mt-0.5">
                  {step}
                </span>
                <div>
                  <span className="font-semibold text-foreground">{title}: </span>
                  <span className="text-muted-foreground">{description}</span>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-xs text-muted-foreground mt-4 pt-3 border-t border-primary/10">
            Total time: Under 60 seconds. No account required. Works on desktop and mobile.
          </p>
        </section>

        {/* ── SEO CONTENT ────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* What is a Digital Signature */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-3">What is a Digital Signature?</h2>
            <p className="text-muted-foreground mb-4">
              A <strong>digital signature</strong> is an electronic representation of your consent or approval on a document.
              In everyday use, it refers to a visual image of your handwritten signature that you can insert into PDFs, invoices,
              contracts, and emails — just as you would sign a paper document with a pen.
            </p>
            <p className="text-muted-foreground mb-4">
              Digitally signed documents are faster, neater, and traceable. A high-resolution transparent PNG signature from this
              tool can be used across thousands of documents without ever picking up a pen — saving you hours every month.
            </p>
            <div className="rounded-xl bg-muted/50 border p-5 text-sm text-muted-foreground">
              <p className="font-semibold text-foreground mb-1">Simple definition:</p>
              <p>
                A digital signature = a professional image of your handwriting that you attach to digital documents to show
                you've reviewed and approved them. It's the digital equivalent of signing your name on paper.
              </p>
            </div>
          </section>

          {/* Types of Signatures — CRITICAL TABLE */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Types of Digital Signatures Explained</h2>
            <p className="text-muted-foreground mb-5">
              This is the most important thing to understand. There are <strong>three types</strong> of signatures used in
              digital documents — they are very different and used in different situations:
            </p>

            <div className="overflow-x-auto rounded-xl border mb-6">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Type</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Electronic Signature (Image)</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">DSC (Certificate)</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">OTP e-Sign (Aadhaar)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["What it is", "PNG image of your handwriting", "Cryptographic identity token from CA", "OTP verified via Aadhaar"],
                    ["Cost", "Free forever", "Paid — from licensed CA", "Paid per use (₹20–₹50)"],
                    ["Speed", "60 seconds", "2–7 days (KYC)", "Instant (with Aadhaar)"],
                    ["Where used", "GST, contracts, email, HR, PDFs", "MCA, income tax, court filings", "Aadhaar-linked gov portals"],
                    ["Privacy", "100% local — no server", "CA holds your certificate", "UIDAI handles verification"],
                    ["Legal basis (India)", "IT Act 2000 — SES", "IT Act 2000 — Qualified Sig", "IT Act 2000 — e-KYC"],
                    ["Format", "PNG / JPG image file", ".pfx file / USB token / cloud", "OTP session (no file)"],
                    ["This tool", "Yes — create instantly", "No — get from a CA", "No — use UIDAI portal"],
                  ].map(([aspect, esig, dsc, otp]) => (
                    <tr key={aspect} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{aspect}</td>
                      <td className="px-5 py-3.5 text-primary font-medium">{esig}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{dsc}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{otp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl bg-primary/5 border border-primary/20 px-5 py-4 text-sm text-foreground">
              <strong>Bottom line:</strong> For 95% of people — freelancers, business owners, students, and professionals —
              a free electronic signature image (PNG) from this tool is all you need. Get a DSC only when a government
              portal explicitly requires one (e.g., MCA ROC filings, income tax DSC login).
            </div>
          </section>

          {/* How to Create Steps */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a Digital Signature Online — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Five steps. Done in under 60 seconds. No download, no software, no account.</p>
            <ol className="space-y-3">
              {HOW_TO_STEPS.map(({ step, title, description }) => (
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

            {/* Three methods */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  method: "Draw",
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  tagline: "Most personal",
                  body: "Sketch with mouse or finger. Bezier curve smoothing gives natural flowing strokes. Best for contracts and NDAs where a unique, personal signature matters.",
                },
                {
                  method: "Type",
                  icon: <Pencil className="h-5 w-5 text-primary" />,
                  tagline: "Fastest & reusable",
                  body: "Type your name, pick from 50+ calligraphic fonts. Every download looks identical — perfect for GST invoices, email footers, and repeated document signing.",
                },
                {
                  method: "Upload",
                  icon: <ImageIcon className="h-5 w-5 text-primary" />,
                  tagline: "Digitise existing sig",
                  body: "Photo or scan your pen signature, upload it, and remove the white background with one click. Preserves your real handwriting in digital form.",
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

          {/* Where to Use */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Where Can You Use a Digital Signature?</h2>
            <p className="text-muted-foreground mb-5">
              Once you've created your transparent PNG signature, you can instantly use it across all of these:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <FileText className="h-4 w-4 text-primary" />, title: "PDF Documents", body: "Open any PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tool. Insert your PNG signature over the signature field. Works with contracts, offer letters, agreements, and forms." },
                { icon: <Mail className="h-4 w-4 text-primary" />, title: "Email Footer (Gmail & Outlook)", body: "Add your handwritten signature PNG to Gmail or Outlook settings. Every email you send will include a personal, professional touch that builds trust with clients." },
                { icon: <FileText className="h-4 w-4 text-primary" />, title: "GST Invoices & E-way Bills", body: "Paste your PNG into Tally, Zoho Books, QuickBooks, or any billing template. Accepted across most GST portals as a valid authorisation mark on invoices." },
                { icon: <Scale className="h-4 w-4 text-primary" />, title: "Contracts & Legal Agreements", body: "NDAs, service agreements, vendor contracts — insert your digital signature to indicate acceptance. Valid under IT Act 2000 for most private commercial transactions." },
                { icon: <Users className="h-4 w-4 text-primary" />, title: "HR Documents", body: "Offer letters, appointment orders, experience certificates, appraisal letters — sign and send instantly. No printing, no scanning." },
                { icon: <Globe className="h-4 w-4 text-primary" />, title: "International Contracts", body: "Valid in the US (ESIGN Act), EU (eIDAS Simple Electronic Signature), and most countries for standard commercial agreements between private parties." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Save & Reuse — USP */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Save Your Signature Once — Reuse It Forever</h2>
            <p className="text-muted-foreground mb-5">
              One of the biggest advantages of a digital signature is that you create it once and use it thousands of times —
              no reprinting, no rescanning, no reuploading.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                {
                  icon: <Download className="h-5 w-5 text-primary" />,
                  title: "Download once, keep forever",
                  body: "Your 3200×1040 px transparent PNG is saved to your device. It's yours — no expiry, no account needed to access it later.",
                },
                {
                  icon: <Bookmark className="h-5 w-5 text-primary" />,
                  title: "Store in Google Drive or Dropbox",
                  body: "Save your PNG to cloud storage for instant access on any device. Open a contract on your phone, paste your signature from Drive — done in seconds.",
                },
                {
                  icon: <RefreshCw className="h-5 w-5 text-primary" />,
                  title: "Reuse across all document types",
                  body: "One PNG works for PDFs, Word documents, Google Docs, Excel, GST invoices, email footers, and any image field that accepts a PNG.",
                },
                {
                  icon: <Shield className="h-5 w-5 text-primary" />,
                  title: "Completely private — no re-upload needed",
                  body: "Since your signature lives on your device, you never need to upload it to any website again. Just copy-paste or drag-and-drop into any document.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-muted/50 border px-5 py-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Pro tip:</strong> Save two versions — a <strong>transparent PNG</strong> for documents
              and PDFs, and a <strong>white-background JPG</strong> for email footers. Name them clearly (e.g.,
              <code className="bg-muted px-1 rounded text-xs mx-1">your-name-signature-transparent.png</code>) so you always find them quickly.
            </div>
          </section>

          {/* Use Cases by User Type */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Who Uses This Digital Signature Tool?</h2>
            <p className="text-muted-foreground mb-5">
              Pixocraft's free digital signature creator is used by millions of people across India and globally:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USE_CASES.map(({ icon, group, cases }) => (
                <div key={group} className="rounded-xl border bg-card p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
                    <p className="font-bold text-foreground">{group}</p>
                  </div>
                  <ul className="space-y-1.5">
                    {cases.map((c) => (
                      <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Legal Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Legal Validity — India & Global</h2>
            <p className="text-muted-foreground mb-5">
              An electronic signature image (PNG) created with this tool is legally recognised in India and most countries worldwide:
            </p>
            <div className="space-y-4 mb-6">
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                  India — Information Technology Act 2000
                </p>
                <p className="text-sm text-muted-foreground">
                  Section 5 of the IT Act 2000 grants electronic signatures the same legal validity as handwritten signatures for any
                  law requiring a document to be signed. The IT (Amendment) Act 2008 further expanded this framework. A PNG signature
                  from this tool qualifies as a Simple Electronic Signature (SES) under this Act.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                  India — When DSC is Required (Exceptions)
                </p>
                <p className="text-sm text-muted-foreground">
                  A certified DSC (Class 2 or Class 3) is required for: MCA ROC company filings, income tax portal DSC-based
                  verification, property and land registration on government portals, court e-filings, and specific government
                  tenders. For all other commercial uses, a PNG signature is sufficient.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                  USA — ESIGN Act & UETA
                </p>
                <p className="text-sm text-muted-foreground">
                  The Electronic Signatures in Global and National Commerce (ESIGN) Act and Uniform Electronic Transactions Act (UETA)
                  recognise electronic signatures — including image-based signatures — as legally binding for most commercial contracts
                  across the United States.
                </p>
              </div>
              <div className="rounded-xl border bg-card p-5 space-y-2">
                <p className="font-semibold text-foreground flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
                  European Union — eIDAS Regulation
                </p>
                <p className="text-sm text-muted-foreground">
                  The EU's eIDAS Regulation recognises Simple Electronic Signatures (SES) as legally valid for most commercial
                  and business transactions across all EU member states. Higher-risk transactions may require Advanced or Qualified
                  Electronic Signatures (AES/QES).
                </p>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong>Disclaimer:</strong> This information is for general guidance only and does not constitute legal advice.
              For high-stakes transactions, regulated industries, or government-mandated processes, consult a qualified legal professional.
            </div>
          </section>

          {/* Why Pixocraft vs Competitors */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Pixocraft vs DocuSign, Adobe Sign & Others?</h2>
            <p className="text-muted-foreground mb-5">
              Most digital signature tools are built for enterprises — they require accounts, charge per document, and collect your data.
              Pixocraft is built differently:
            </p>

            <div className="overflow-x-auto rounded-xl border mb-6">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">DocuSign</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Adobe Sign</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Smallpdf</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Completely free", "Yes", "Limited trial", "Limited trial", "Limited free"],
                    ["No signup required", "Yes", "No", "No", "No"],
                    ["100% browser-based", "Yes", "No", "No", "Partial"],
                    ["Works offline", "Yes", "No", "No", "No"],
                    ["Transparent PNG export", "Yes", "No", "No", "No"],
                    ["Zero data collection", "Yes", "No", "No", "No"],
                    ["India IT Act 2000 ready", "Yes", "Partial", "Partial", "Partial"],
                    ["Price", "Free forever", "$15+/month", "$30+/month", "$12+/month"],
                  ].map(([feat, pixo, docu, adobe, small]) => (
                    <tr key={feat} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-5 py-3 text-primary font-semibold">{pixo}</td>
                      <td className="px-5 py-3 text-muted-foreground">{docu}</td>
                      <td className="px-5 py-3 text-muted-foreground">{adobe}</td>
                      <td className="px-5 py-3 text-muted-foreground">{small}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Note:</strong> DocuSign, Adobe Sign, and similar platforms are excellent for enterprise
              workflow management — multi-party signing, audit trails, and contract lifecycle management. Pixocraft is built for
              individuals, freelancers, and small businesses who need to create a professional signature image quickly, privately, and free.
            </p>
          </section>

          {/* Trust Section */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why You Can Trust Pixocraft</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Shield className="h-6 w-6 text-primary" />,
                  title: "Zero data collection",
                  body: "Your signature is processed entirely in your browser using HTML5 Canvas. Nothing is sent to any server — ever. We have no way to see your signature even if we wanted to.",
                },
                {
                  icon: <Star className="h-6 w-6 text-primary" />,
                  title: "Free without strings",
                  body: "No trial period, no credit card, no hidden upgrade prompts. Every feature — including high-resolution PNG export, all 50+ fonts, and the Upload background remover — is free.",
                },
                {
                  icon: <Globe className="h-6 w-6 text-primary" />,
                  title: "Made in India",
                  body: "Built for Indian users, Indian workflows (GST, HR, IT Act), and Indian privacy expectations. Your data is yours — no cloud sync, no account, no risk.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5 space-y-3 text-center">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">{icon}</div>
                  <p className="font-bold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Links */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">More Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-generator", title: "Signature Generator", desc: "The main tool — full features, all options, advanced controls." },
                { href: "/tools/signature-for-pdf", title: "Signature for PDF", desc: "Place and position your signature directly on a PDF document." },
                { href: "/tools/email-signature-generator", title: "Email Signature Generator", desc: "Create a branded HTML email signature for Gmail and Outlook." },
                { href: "/tools/digital-signature-generator", title: "Digital Signature Generator", desc: "Focused on India IT Act legal digital signatures with compliance info." },
                { href: "/tools/free-signature-generator", title: "Free Signature Generator", desc: "Emphasises zero-cost, unlimited signatures with no watermark." },
                { href: "/tools/transparent-signature-png", title: "Transparent Signature PNG", desc: "Background removal and transparent PNG export specialised tool." },
              ].map(({ href, title, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-3 p-4 rounded-xl border bg-card hover-elevate transition-all group"
                >
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

          {/* Extra SEO block */}
          <section className="rounded-xl border bg-card p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">Create Digital Signature Online Free Without Login</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Pixocraft lets you <strong>create a digital signature online free without login</strong> or software installation.
              Draw, type, or upload your signature and download a high-quality transparent PNG instantly. Your data stays in your
              browser — 100% private, works offline, and completely free. Used by freelancers, business owners, students, and
              professionals across India and globally to sign GST invoices, contracts, offer letters, and everyday documents.
            </p>
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
                    data-testid={`faq-create-sig-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div
                      className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed"
                      data-testid={`faq-create-sig-answer-${i}`}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* EEAT footer */}
          <section className="rounded-xl border bg-muted/30 p-6 text-sm text-muted-foreground space-y-1">
            <p><strong className="text-foreground">Author:</strong> Pixocraft Team</p>
            <p><strong className="text-foreground">Last Updated:</strong> {LAST_UPDATED}</p>
            <p>
              <strong className="text-foreground">Made in India</strong> — Privacy-first, browser-based tools built for
              Indian business users. Your data never leaves your browser.
            </p>
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
          <p className="font-semibold text-foreground">Ready to create your digital signature?</p>
          <p className="text-muted-foreground text-xs">Free · No login · Transparent PNG · Works offline</p>
        </div>
        <Button
          asChild
          data-testid="button-cta-create-signature"
        >
          <a href="#tool">
            <PenTool className="h-4 w-4 mr-2" />
            Create Signature Now
          </a>
        </Button>
      </div>
    </>
  );
}
