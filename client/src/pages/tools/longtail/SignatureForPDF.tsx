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
import { PDFSignatureTool } from "@/components/PDFSignatureTool";
import {
  PenTool, Shield, Zap, Smartphone, Star, Check, FileText, Mail, Globe,
  ChevronDown, ChevronUp, ArrowRight, Lock, AlertCircle, BadgeCheck,
  FileCheck, Receipt, Briefcase, FilePen, Users, Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-for-pdf";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const FAQS = [
  { question: "What is a signature for PDF?", answer: "A signature for PDF is an electronic version of your handwritten signature that is created and then embedded directly into a PDF document. It can be drawn freehand using a mouse or touch screen, typed in a handwriting font, or uploaded as an existing image. Once embedded, it permanently becomes part of the PDF file." },
  { question: "How do I create a signature for PDF online free?", answer: "Use Pixocraft's Signature for PDF tool: (1) Draw or type your signature in Step 1. (2) Upload your PDF in Step 2. (3) Click the page where you want your signature placed. (4) Download the signed PDF. The entire process is free and takes under 30 seconds with no login or account required." },
  { question: "What format is best for a PDF signature?", answer: "PNG with a transparent background is the best format for a PDF signature. Unlike JPG, PNG transparency means your signature overlays cleanly on any PDF page — white sections, coloured backgrounds, and tables — without a visible white box around it. This tool automatically exports your signature as a transparent PNG." },
  { question: "Can I create a signature for PDF on mobile?", answer: "Yes. The Draw tab uses touch input, so you can draw your signature directly on a smartphone or tablet screen. PDF upload, preview, placement, and download all work on mobile browsers including Chrome, Safari, and Firefox for iOS and Android." },
  { question: "Is a PDF signature legally valid in India?", answer: "Yes — for most everyday commercial documents. Under the IT Act 2000, a handwritten-image signature embedded in a PDF constitutes a Simple Electronic Signature (SES) and is legally valid for contracts, GST invoices, NDAs, employment letters, and HR documents. For court filings, ROC submissions, and income tax e-verification, a certified DSC is required." },
  { question: "How is 'signature for PDF' different from 'eSignature'?", answer: "'Signature for PDF' refers specifically to creating and embedding a signature image into a PDF document. 'eSignature' is a broader term covering all electronic signing methods — including image embedding, cryptographic digital signatures, and SaaS platforms like DocuSign. When most people say 'eSignature' in everyday usage, they mean what this tool does: a signature image placed into a PDF." },
  { question: "Can I add signature to PDF without Adobe Acrobat?", answer: "Yes. This tool replaces Adobe Acrobat entirely for the purpose of signing PDFs. Create your signature, upload your PDF, click to place the signature, and download the signed PDF — all in your browser, free, with no software to install. You never need Adobe Acrobat for basic PDF signing." },
  { question: "How do I make my signature look professional in a PDF?", answer: "Three tips: (1) Use a handwriting font in the Type tab, or take your time drawing in the Draw tab — a clean, deliberate signature looks more professional than a rushed scribble. (2) Use the size slider to set the signature to 15–20% of page width — large enough to read, small enough to look proportionate. (3) Click precisely on the signature line, not above or below it." },
  { question: "Is my PDF file uploaded to your server?", answer: "Never. This tool runs 100% in your browser using PDF.js and pdf-lib — two open-source JavaScript libraries. Your PDF file, your signature, and the signed output are all processed locally. Nothing leaves your device, ever." },
  { question: "Can I sign a GST invoice PDF with this tool?", answer: "Yes. GST invoice PDFs require the supplier's or authorised representative's signature. Embedding your signature PNG into a GST invoice PDF satisfies this requirement for manually generated invoices in Tally, Zoho Books, or custom billing software. Download the signed PDF and share or archive normally." },
  { question: "What file size limits are there?", answer: "There are no strict file size limits for the PDF or signature — the tool runs in your browser and is constrained only by your device's available memory. In practice, PDFs up to 50MB process without any issues on modern devices. Very large PDFs (100MB+) may take a few seconds to render." },
  { question: "How do I sign multiple pages of a PDF?", answer: "After placing your signature on page 1, use the page navigator arrows in the tool to go to the next page. Click to place your signature on that page. Repeat for each page where needed. All placements are tracked independently, and the final download includes your signature on every page you signed." },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Create signature",       description: "Draw freehand with mouse or touch, or type your name and choose from 14 handwriting fonts. Click Confirm Signature when done." },
  { step: 2, title: "Upload PDF",             description: "Upload the PDF file you want to sign. It renders as a live preview in your browser — no server upload required." },
  { step: 3, title: "Click to place",         description: "Click anywhere on the PDF preview to position your signature. Use the size slider to scale it. Navigate between pages for multi-page documents." },
  { step: 4, title: "Insert & download",      description: "Click 'Insert Signature into PDF'. pdf-lib embeds your signature at the exact coordinates and downloads the complete signed PDF." },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,   title: "GST Invoices",            desc: "Create and insert your signature into GST invoice PDFs to satisfy the CBIC supplier signature requirement." },
  { icon: <FileText className="h-5 w-5 text-primary" />,  title: "Contracts & NDAs",        desc: "Sign client contracts, non-disclosure agreements, and service agreements — legally valid under the IT Act 2000." },
  { icon: <FilePen className="h-5 w-5 text-primary" />,   title: "Offer & Appointment Letters", desc: "HR teams sign offer letters and appointment letters as clean signed PDFs in seconds." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Freelancer Proposals",    desc: "Signed proposals and SOWs communicate seriousness and professionalism from the first touchpoint." },
  { icon: <Globe className="h-5 w-5 text-primary" />,     title: "Government Applications", desc: "Many government forms and applications accept PDF submissions with embedded signatures." },
  { icon: <Mail className="h-5 w-5 text-primary" />,      title: "Official Correspondence", desc: "Business letters and formal memos with an embedded signature project authority and credibility." },
];

const COMPARISON_ROWS = [
  { feature: "Primary intent",    a: "Create + insert signature into PDF", b: "Insert existing signature into PDF", c: "Any electronic signing method" },
  { feature: "Who uses it",       a: "First-time signers / design-first",  b: "Users with existing signature",     c: "Legal/compliance-focused users" },
  { feature: "Output",            a: "Signed PDF with embedded signature", b: "Signed PDF with embedded signature", c: "Signed document (PDF, form, etc.)" },
  { feature: "Speed",             a: "Fast (30 seconds)",                  b: "Very fast (15 seconds if sig ready)", c: "Medium (depends on platform)" },
  { feature: "Tool needed",       a: "This tool (free, in-browser)",       b: "This tool (free, in-browser)",       c: "Varies — free to paid SaaS" },
  { feature: "Legal basis (IN)",  a: "IT Act 2000 — SES",                  b: "IT Act 2000 — SES",                  c: "IT Act 2000 — SES, AES, or QES" },
];

export default function SignatureForPDF() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature for PDF Free – Create & Insert Signature into PDF | Pixocraft",
    description: "Create signature for PDF online free and insert instantly into any document. No login required, 100% private, works for GST, contracts and official files.",
    keywords: "signature for pdf, free signature for pdf, create signature for pdf, sign pdf online, insert signature in pdf, pdf signing tool, add signature to pdf online, esign pdf free",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Signature for PDF – Pixocraft",
    description: "Create your signature and add it to any PDF in seconds. Free, no login, 100% private. Works for GST invoices, contracts, offer letters, and official documents.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",               url: "https://tools.pixocraft.in/" },
    { name: "Tools",              url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Generator", url: PARENT_URL },
    { name: "Signature for PDF",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Signature for PDF Free – Create & Insert Signature into PDF | Pixocraft",
    description: "Create signature for PDF online free and insert instantly into any document. No login required, 100% private, works for GST, contracts and official files.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create Signature for PDF Free Online",
    description: "Use Pixocraft's free Signature for PDF tool to create your signature, upload a PDF, click to place the signature, and download the signed document — all in your browser in under 30 seconds.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={generateFAQSchema(FAQS)} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Breadcrumb items={[
          { label: "Home",               url: "https://tools.pixocraft.in/" },
          { label: "Tools",              url: "/tools" },
          { label: "Signature Generator", url: "/tools/signature-pad-tool" },
          { label: "Signature for PDF" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Signature for PDF Free – Create, Insert &amp; Sign PDF Instantly
              </h1>
              <p className="text-sm text-muted-foreground">Free · No Login · 100% Private · GST &amp; Legal Ready</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create your signature and add it to any PDF in seconds. <strong>No login, no software, fully private</strong> — ready
            for GST invoices, contracts, offer letters, and official documents.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />,       label: "Add Signature in Under 30 Seconds" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Signup Required" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on Mobile & Desktop" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "100% Private (No Upload Storage)" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "GST & Legal Ready" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* UX psychology micro-elements */}
          <div className="flex flex-wrap gap-3 mb-6">
            {[
              { icon: <Clock className="h-3.5 w-3.5 text-primary" />,  label: "Most users finish in under 45 seconds" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />, label: "No data stored — ever" },
              { icon: <Users className="h-3.5 w-3.5 text-primary" />,  label: "Trusted by thousands of professionals" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                {icon}{label}
              </div>
            ))}
          </div>

          {/* Visual action flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {HOW_TO_STEPS.map(({ step, title }) => (
              <div key={step} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{step}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <PDFSignatureTool ctaLabel="Insert Signature into PDF" />
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* What is signature for PDF */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What Is a Signature for PDF?</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                A signature for PDF is an electronic version of your handwritten signature — created using a browser-based tool
                and embedded directly into a PDF document, making it permanently signed without printing, scanning, or external software.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              Creating a <strong>signature for PDF</strong> involves two distinct steps that this tool combines into one seamless
              workflow: designing your signature (by drawing, typing in a handwriting font, or uploading an existing image), and
              then embedding that signature into a specific location within your PDF document.
            </p>
            <p className="text-muted-foreground mb-4">
              The term "signature for PDF" captures both halves of this workflow — the creation of the signature asset and the
              act of inserting it into the document. This distinguishes it from simply "signing a PDF" (which implies you already
              have a signature) or "eSignature" (a broader legal term covering many types of electronic signing).
            </p>
            <p className="text-muted-foreground mb-4">
              The technical mechanism behind this tool uses two open-source browser libraries: <strong>PDF.js</strong> (from
              Mozilla) renders your PDF as a visual canvas so you can see and interact with it, and <strong>pdf-lib</strong>
              performs the actual embedding of your signature PNG into the PDF file at the precise coordinates you select. Both
              libraries run entirely in your browser — your file never leaves your device.
            </p>
            <p className="text-muted-foreground">
              The result is a standard, self-contained PDF file with your signature embedded as a permanent element of the page —
              indistinguishable from a document signed using desktop software like Adobe Acrobat, but achieved entirely in your
              browser in under 30 seconds, for free.
            </p>
          </section>

          {/* How to — featured snippet target */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create Signature for PDF Free — Step by Step</h2>
            <p className="text-muted-foreground mb-5">The complete workflow — from blank canvas to signed PDF — in four steps:</p>
            <ol className="space-y-3 mb-5">
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
            <div className="text-center">
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-create-sig-cta">
                <FileCheck className="h-4 w-4" />Create Signature for PDF Now<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Features of Pixocraft's PDF Signature Tool</h2>
            <p className="text-muted-foreground mb-5">Everything you need for professional PDF document signing:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <PenTool className="h-5 w-5 text-primary" />,     title: "Freehand draw + type modes",    desc: "Draw your signature freehand with mouse or touch, or type your name and choose from 14 handwriting fonts." },
                { icon: <Shield className="h-5 w-5 text-primary" />,      title: "Transparent PNG export",        desc: "Signature is exported as a transparent PNG — no white background box, clean overlay on any PDF section." },
                { icon: <FileText className="h-5 w-5 text-primary" />,    title: "Live PDF preview",              desc: "PDF renders as a pixel-accurate preview in your browser. See exactly where your signature will land." },
                { icon: <FileCheck className="h-5 w-5 text-primary" />,   title: "Click-to-place precision",      desc: "Click anywhere on the PDF to place your signature. Reposition instantly by clicking again." },
                { icon: <Smartphone className="h-5 w-5 text-primary" />,  title: "Mobile-first design",           desc: "Touch-optimised canvas drawing, responsive PDF preview, and one-tap download on any smartphone." },
                { icon: <Zap className="h-5 w-5 text-primary" />,         title: "Multi-page PDF support",        desc: "Navigate between PDF pages with the page navigator and place independent signatures on each page." },
                { icon: <Lock className="h-5 w-5 text-primary" />,        title: "Zero data storage",             desc: "100% browser-side processing. PDF.js and pdf-lib run locally — no server, no upload, no data retention." },
                { icon: <Star className="h-5 w-5 text-primary" />,        title: "No account, no watermark",      desc: "Create and sign unlimited PDFs for free. No login, no premium tier, no watermark on the output." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Methods */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Three Methods to Create Signature for PDF</h2>
            <p className="text-muted-foreground mb-5">Choose the approach that matches your workflow and skill level:</p>
            <div className="space-y-4">
              {[
                {
                  label: "Method 1 — Direct Workflow (Best UX, Recommended)",
                  color: "bg-primary/5 border-primary/20",
                  steps: [
                    "Create your signature in Step 1 using the Draw tab (mouse/touch) or Type tab (handwriting font)",
                    "Upload your PDF in Step 2 — preview loads instantly in your browser",
                    "Click the exact position on the PDF where you want the signature",
                    "Click Insert Signature into PDF — your signed document downloads immediately",
                  ],
                  note: "Best for: everyone. The fastest, most private, and most seamless experience — 30 seconds, no login, no upload.",
                },
                {
                  label: "Method 2 — PNG Download + Manual Insert",
                  color: "bg-muted/30",
                  steps: [
                    "Use Pixocraft's standalone Signature Generator to create and download a transparent PNG",
                    "Open your PDF in Adobe Acrobat, Smallpdf, or Google Docs",
                    "Insert the PNG as an image element and position it over the signature line",
                    "Export the PDF from Acrobat/Google Docs as a signed PDF",
                  ],
                  note: "Best for: users who need pixel-perfect control over size and rotation using Acrobat's full layout tools.",
                },
                {
                  label: "Method 3 — Mobile Quick Sign",
                  color: "bg-muted/30",
                  steps: [
                    "Open this page on your smartphone — no app download required",
                    "Switch to the Draw tab and sign directly on the touch canvas",
                    "Upload your PDF from phone storage, Google Drive, or iCloud",
                    "Tap to place and download — the signed PDF saves to your phone",
                  ],
                  note: "Best for: on-the-go signing. Works on any iOS or Android device with any modern browser.",
                },
              ].map(({ label, color, steps, note }) => (
                <div key={label} className={`rounded-xl border p-5 ${color}`}>
                  <p className="font-semibold text-foreground mb-3">{label}</p>
                  <ol className="space-y-1.5 mb-3">
                    {steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-primary font-medium">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison table — ranking gold */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Signature for PDF vs Add Signature vs eSignature — Full Comparison</h2>
            <p className="text-muted-foreground mb-5">
              These three terms describe related but distinct concepts. Understanding the differences helps you choose the right
              tool and communicate accurately in professional contexts:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Signature for PDF</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Add Signature to PDF</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">eSignature</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {COMPARISON_ROWS.map(({ feature, a, b, c }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 text-muted-foreground font-medium text-primary/80">{a}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{b}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              In practice, "signature for PDF," "add signature to PDF," and "sign PDF online" all describe the same real-world
              action: creating a signature and embedding it into a PDF document electronically. The differences exist mainly in
              how different users search for this task, not in what they're trying to do.
            </p>
            <p className="text-sm text-muted-foreground">
              "eSignature" carries more formal legal connotations and often implies an audit trail, timestamp, or cryptographic
              verification — which is relevant for high-stakes contracts but unnecessary for everyday business documents like
              GST invoices, freelance agreements, and HR letters.
            </p>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Who Uses Signature for PDF — Real Use Cases</h2>
            <p className="text-muted-foreground mb-5">
              Professionals across industries sign PDF documents electronically every day. Here are the most common use cases:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {USE_CASES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              The common thread: the user has a PDF that needs to be signed and returned — either to themselves, a client, an employer,
              or a government entity. This tool removes every step that isn't essential (no printing, no scanning, no desktop software,
              no server upload) and delivers the signed PDF in under 30 seconds.
            </p>
          </section>

          {/* Legal Validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Legal Validity of PDF Signature in India</h2>
            <p className="text-muted-foreground mb-5">
              Understanding when your signed PDF is legally binding — and when it isn't — protects you and your business:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "IT Act 2000 — The Legal Foundation",
                  body: "The Information Technology Act 2000, amended in 2008 (Section 3A), establishes that electronic signatures in India have the same legal standing as handwritten signatures for most civil and commercial transactions. A signature embedded in a PDF constitutes a Simple Electronic Signature (SES) under this framework — legally valid, court-recognised, and enforceable.",
                },
                {
                  title: "GST Invoice Signing",
                  body: "The Central Board of Indirect Taxes and Customs (CBIC) permits manually-generated GST invoices to bear an electronic signature. If your billing software (Tally, Zoho Books, or a custom system) generates PDF invoices that you sign manually, embedding your PNG signature into the PDF satisfies the GST requirement. For IRN/QR-code-based e-invoices, the system-generated authentication is used instead.",
                },
                {
                  title: "Contracts, NDAs, and Agreements",
                  body: "Indian contract law (Contract Act 1872) requires offer, acceptance, and intention to be bound — not a wet ink signature. Electronic contracts signed via image-based signatures are legally enforceable for most commercial agreements. This covers freelance contracts, client service agreements, non-disclosure agreements, employment letters, and vendor agreements.",
                },
                {
                  title: "Situations Requiring a DSC",
                  body: "For MCA ROC (company registration) filings, income tax e-filing with ITD, court document submissions, and property registration — a Class 2 or Class 3 Digital Signature Certificate (DSC) from a licensed certifying authority is mandatory. An image-based signature embedded via this tool is NOT sufficient for these specific use cases.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <p className="font-semibold text-foreground mb-2 flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-primary" />{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" />Legal Note:</strong>
              This information is provided for general guidance. For specific legal advice about your documents, consult a practising advocate or chartered accountant.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Creating Signature for PDF</h2>
            <p className="text-muted-foreground mb-5">Mistakes that undermine the professionalism and effectiveness of your signed PDF:</p>
            <div className="space-y-3">
              {[
                { title: "Using a JPG or JPEG signature image",          body: "JPG does not support transparency. Your signature will have a white or coloured box around it on any non-white PDF section. Always use PNG — this tool outputs transparent PNG automatically." },
                { title: "Signature placed over text or in margins",     body: "Clicking outside the signature block area looks careless and can obscure important document content. Position your signature precisely on or just below the signature line." },
                { title: "Wrong proportions — too large or too small",   body: "A signature at 15–25% of page width looks professional and proportionate. Too large dominates the page; too small reads as an afterthought. Use the size slider to fine-tune." },
                { title: "Blurry or pixelated signature",                body: "Scanned phone photos of handwritten signatures are often low-resolution and pixelated when embedded in PDF. Draw or type your signature directly in this tool for a clean, high-resolution result." },
                { title: "Inconsistent signatures across documents",     body: "Using different signature styles across different PDFs undermines professional credibility. Create your ideal signature once and use the same style consistently across all documents." },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center"><AlertCircle className="h-3 w-3 text-destructive" /></span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pro Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for a Perfect PDF Signature</h2>
            <p className="text-muted-foreground mb-5">Professional-grade practices for creating and using PDF signatures:</p>
            <div className="space-y-3">
              {[
                { title: "Always use PNG format",                       body: "PNG's transparency ensures your signature overlays cleanly on any PDF background. This tool outputs transparent PNG automatically — no extra steps needed." },
                { title: "Position bottom-right, on the signature line", body: "Standard convention places the signature in the bottom-right of the signature block, on or just below the dotted/solid line. This is where recipients expect to see it." },
                { title: "Aim for 15–20% of page width",               body: "This proportion looks balanced on A4 and US Letter documents — wide enough to be clearly visible, narrow enough to not overwhelm the page." },
                { title: "Use the Type tab for consistency",            body: "Handwritten drawings vary session to session. If you want an identical signature on every document, use the Type tab with a consistent font and use the same name each time." },
                { title: "Preview before downloading",                  body: "After placing your signature on the PDF preview, zoom in on your browser to check the alignment before clicking Download. Repositioning is instant — just click again." },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center"><Check className="h-3 w-3 text-primary" /></span>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Pixocraft for Signature for PDF?</h2>
            <p className="text-muted-foreground mb-5">What sets this tool apart from alternatives like Smallpdf, Adobe Sign, DocuSign, and ILovePDF:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Zap className="h-4 w-4 text-primary" />,         title: "Fastest workflow available",     body: "Create + sign + download in under 30 seconds — faster than any competitor that requires login, upload, or email confirmation." },
                { icon: <Lock className="h-4 w-4 text-primary" />,        title: "True zero-server privacy",       body: "Every competitor uploads your PDF to their servers. Pixocraft processes everything locally in your browser — zero data exposure." },
                { icon: <Star className="h-4 w-4 text-primary" />,        title: "No watermark on output",         body: "Free tiers of Smallpdf, DocuSign, and similar tools add watermarks. Pixocraft's signed PDF is always clean." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />,  title: "Designed for mobile",            body: "Most PDF signing tools have poor mobile UX. Pixocraft's touch canvas, responsive preview, and one-tap download work seamlessly on phones." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />,  title: "India & GST specific",          body: "Built with Indian business workflows in mind — GST invoice signing, IT Act references, and DSC guidance included." },
                { icon: <FileText className="h-4 w-4 text-primary" />,    title: "Sign multiple pages",            body: "Place your signature on every page of a multi-page contract or report with the built-in page navigator." },
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
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-why-pixocraft-cta">
                <FileCheck className="h-4 w-4" />Create Signature for PDF Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal Linking */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Complete Signature Tool Collection</h2>
            <p className="text-muted-foreground mb-5">Every signature tool you need — all free, all private, all in one place:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/add-signature-to-pdf",               title: "Add Signature to PDF",            desc: "Direct PDF signing tool — upload, place, download your signed document." },
                { href: "/tools/esignature-maker",                   title: "eSignature Maker",                desc: "The authority hub for electronic signatures — GST & legal compliance ready." },
                { href: "/tools/signature-creator",                  title: "Signature Creator",               desc: "Design a unique personal signature with full creative control." },
                { href: "/tools/handwritten-signature-generator",   title: "Handwritten Signature Generator", desc: "50+ authentic handwriting styles for a natural pen-on-paper look." },
                { href: "/tools/signature-maker",                    title: "Signature Maker",                 desc: "The flagship all-in-one signature creation and export tool." },
                { href: "/tools/signature-pad-tool",                 title: "Signature Pad Tool",              desc: "The core signature drawing pad — clean, fast, professional output." },
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions — Signature for PDF</h2>
            <p className="text-muted-foreground mb-5">Answers to every common question about creating and inserting signatures into PDFs:</p>
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
                    {openFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
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
            <FileCheck className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Sign Your PDF?</h2>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto text-sm">
              Create your signature, upload your PDF, click to place, download — done in under 30 seconds.
              No login. No watermark. No server upload. 100% free, forever.
            </p>
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-final-cta">
              <FileCheck className="h-4 w-4" />Create Signature for PDF Free<ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
