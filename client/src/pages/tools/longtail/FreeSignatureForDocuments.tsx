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
  Shield, Zap, Check, FileText, ChevronDown, ChevronUp,
  ArrowRight, Lock, AlertCircle, BadgeCheck, Download,
  Smartphone, Star, PenTool, Layers, Receipt,
  Scale, Mail, Users, FileImage, BookOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/free-signature-for-documents";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-generator";

const FAQS = [
  {
    question: "Is free signature for documents really free?",
    answer:
      "Yes — 100% free forever for PDF, Word, Google Docs, Excel, and every other document type. No login, no subscription, no watermark on the downloaded PNG. Create and download unlimited signatures at no cost, for as many documents as you need.",
  },
  {
    question: "Does it work in Word and Google Docs?",
    answer:
      "Yes. Download your transparent PNG signature from Pixocraft. In Microsoft Word, go to Insert → Pictures → This Device and select the PNG. In Google Docs, go to Insert → Image → Upload from computer. Resize and position the signature at the bottom of the page or at the signature block. The transparent background means it overlays cleanly on any document background.",
  },
  {
    question: "Is my signature for documents private?",
    answer:
      "Yes — completely private. Everything runs entirely inside your browser using the HTML5 Canvas API. No drawing strokes, typed text, or uploaded images are ever sent to any server, logged, or stored. Your signature and the documents it will sign never leave your device.",
  },
  {
    question: "Is it legal for official documents in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 (Section 3A), a digital image signature added to any document — PDF, Word, Google Docs, or any file — is legally valid for commercial contracts, NDAs, GST invoices, employment letters, and most business documents. The Indian Contract Act 1872 further supports electronically executed agreements.",
  },
  {
    question: "Can I use it on mobile for documents?",
    answer:
      "Yes. The Draw tab is fully touch-optimised for mobile. Open this page on your phone's browser, draw your signature with your finger, and download the transparent PNG. The PNG can then be inserted into documents on your phone using Google Docs, Microsoft Word for mobile, or any mobile PDF editor.",
  },
  {
    question: "Which format is best for documents?",
    answer:
      "Transparent PNG is the universally best format for inserting signatures into documents. PNG supports transparency — your signature overlays cleanly on any background, whether white, off-white, or coloured. JPG does not support transparency and creates a visible white rectangle when inserted on any non-white surface.",
  },
  {
    question: "How do I insert a signature for documents?",
    answer:
      "Download your transparent PNG from Pixocraft. Then: for PDF — use Adobe Acrobat, Smallpdf, or Pixocraft's Add Signature to PDF tool. For Word — Insert → Pictures. For Google Docs — Insert → Image → Upload. For Excel — Insert → Pictures. Position the signature at the appropriate location and resize to 3–5 cm wide.",
  },
  {
    question: "Can I create one signature for all documents?",
    answer:
      "Yes — and this is the recommended approach. Create a single high-quality transparent PNG signature from Pixocraft, save it in a dedicated folder on your device, and reuse that exact same file across all documents. One signature for GST invoices, contracts, Word reports, and email signatures. Consistency is both professional and legally significant.",
  },
  {
    question: "Is the quality good for printed documents?",
    answer:
      "Yes. Pixocraft exports signatures at 3200×1040 px — four times display resolution — ensuring your signature is sharp and crisp at any size, whether viewed on screen at small sizes or printed on an A4 document at full size. This resolution is suitable for professional print documents, letterheads, and legal contracts.",
  },
  {
    question: "Do I need any software to create a signature for documents?",
    answer:
      "No software required. Pixocraft runs entirely in your web browser — Chrome, Firefox, Safari, or any modern browser on desktop or mobile. No downloads, no app installation, no plugins. Open the page and create your signature immediately.",
  },
];

const HOW_TO_STEPS = [
  { n: 1, title: "Create your signature",    desc: "Draw with mouse or finger, type your name in a handwriting font, or upload an existing signature image using the tool above." },
  { n: 2, title: "Customise once",           desc: "Set ink colour (black or dark navy for professional documents), adjust stroke width, and pick your preferred style. Save this as your permanent signature." },
  { n: 3, title: "Preview in real file",     desc: "Before downloading, check the live preview to confirm the signature looks professional at document scale." },
  { n: 4, title: "Insert and save",          desc: "Download the transparent PNG and insert it into any document — PDF, Word, Google Docs, Excel, or any file — using Insert Image. Position, resize, and save." },
];

const FEATURES = [
  { icon: <Layers className="h-5 w-5 text-primary" />,    title: "Universal format",         desc: "One signature works across PDF, Word, Google Docs, Excel and every document type — create once, use everywhere." },
  { icon: <FileImage className="h-5 w-5 text-primary" />, title: "Transparent PNG magic",    desc: "Clean overlay on any document background — no white box, no background mismatch on any file or template." },
  { icon: <BookOpen className="h-5 w-5 text-primary" />,  title: "50+ professional fonts",   desc: "Type your name and get a ready signature for documents instantly from 50+ Google handwriting fonts." },
  { icon: <PenTool className="h-5 w-5 text-primary" />,   title: "Full customisation",       desc: "Adjust colour, stroke thickness, and style to match the professional tone of every document you sign." },
  { icon: <Star className="h-5 w-5 text-primary" />,      title: "High-resolution quality",  desc: "3200+ px PNG stays sharp in print and digital files — suitable for A4 contracts, letterheads, and email footers." },
  { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "Mobile document signing", desc: "Create and insert your signature for documents directly from your phone — no laptop required." },
  { icon: <Zap className="h-5 w-5 text-primary" />,       title: "Unlimited free use",       desc: "Add your signature to as many documents as you want — forever free. No per-download limit." },
  { icon: <Shield className="h-5 w-5 text-primary" />,    title: "Browser privacy",          desc: "Nothing is uploaded or stored. All processing is local in your browser — maximum security for sensitive documents." },
];

const DOC_TYPES = [
  { icon: <FileText className="h-5 w-5 text-primary" />,   type: "PDF Documents",          how: "Download transparent PNG → Insert in any PDF editor (Adobe Acrobat, Smallpdf, or Pixocraft's Add Signature to PDF tool)." },
  { icon: <BookOpen className="h-5 w-5 text-primary" />,   type: "Word / Google Docs",    how: "Insert → Image → Upload PNG. Position at the signature block. Works on both desktop and mobile apps." },
  { icon: <Layers className="h-5 w-5 text-primary" />,     type: "Excel & Spreadsheets",  how: "Insert → Pictures → select your PNG. Resize and place in the designated signature cell or area." },
  { icon: <Receipt className="h-5 w-5 text-primary" />,    type: "GST Invoices",          how: "Insert PNG into your invoice template in Tally, Zoho Books, or ClearTax. Transparent background overlays on any invoice format." },
  { icon: <Scale className="h-5 w-5 text-primary" />,      type: "Contracts & NDAs",      how: "Open the contract PDF, insert the PNG at the signature block, resize to 3–5 cm wide. IT Act 2000 compliant for all parties." },
  { icon: <Mail className="h-5 w-5 text-primary" />,       type: "Email Signatures",      how: "Insert your PNG into the Gmail or Outlook signature editor. Adds a personalised handwritten signature to every outgoing email." },
];

const USE_CASES_LIST = [
  "GST invoices and e-way bills",
  "Contracts, NDAs and agreements",
  "Word reports and proposals",
  "Google Docs collaboration files",
  "Excel invoices and accounts",
  "Bank forms, loan applications and government documents",
];

const PRO_TIPS = [
  { title: "Always use transparent PNG for every document type",   body: "Transparent PNG overlays cleanly on any background. Never convert to JPG — it permanently destroys transparency and creates an ugly white box on non-white documents." },
  { title: "Keep one consistent signature across all files",        body: "Download your PNG once, save it permanently, and use the exact same file on every document. Consistency is both professionally important and legally significant for identity authentication." },
  { title: "Use dark blue or black for professional documents",     body: "Black (#000000) and dark navy (#1a1a2e) are the professional standards for formal business documents. These colours reproduce clearly in both digital and print formats." },
  { title: "Place signature at bottom right with date",             body: "Standard document execution practice places the signature at the bottom of the last page — typically to the right, with the date below or beside. This confirms the signatory has reviewed the full document." },
  { title: "Test in both PDF and Word before final use",            body: "After creating your PNG, insert it into a test version of both a PDF and a Word document. Verify the transparent background overlays cleanly and the size is appropriate before using on live documents." },
  { title: "Create backup versions on phone and laptop",            body: "Store your signature PNG in at least two locations — your laptop's documents folder and your phone's gallery or cloud storage (Google Drive, iCloud). This ensures you can sign documents from any device at any time." },
];

export default function FreeSignatureForDocuments() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free Signature for Documents – PDF, Word & More | Pixocraft",
    description:
      "Free signature for documents online. Create digital signature and insert into PDF, Word, Google Docs & any file. Instant transparent PNG. No signup, 100% private, perfect for GST, contracts & daily Indian business documents.",
    keywords:
      "free signature for documents, signature for documents free, digital signature for documents, signature for pdf word documents, signature for google docs, digital signature for pdf, signature for word documents online free",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Free Signature for Documents – Pixocraft",
    description:
      "Create a free digital signature for documents — PDF, Word, Google Docs, Excel and any file. Download as transparent PNG. No login, 100% private, GST and contract ready. IT Act 2000 compliant.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "INR" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                         url: "https://tools.pixocraft.in/" },
    { name: "Tools",                        url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Free Signature for Documents", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Free Signature for Documents – PDF, Word & More | Pixocraft",
    description:
      "Free signature for documents online. Create digital signature and insert into PDF, Word, Google Docs & any file. Instant transparent PNG. No signup, 100% private, perfect for GST, contracts & daily Indian business documents.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Add Free Signature for Documents",
    description:
      "Create a free digital signature for documents in 4 simple steps — draw, type or upload, customise, and download a transparent PNG ready for PDF, Word, Google Docs, and any file.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.desc })),
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
          { label: "Home",                         url: "https://tools.pixocraft.in/" },
          { label: "Tools",                        url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Free Signature for Documents" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Free Signature for Documents – PDF, Word &amp; More
              </h1>
              <p className="text-sm text-muted-foreground">PDF · Word · Google Docs · Excel · 100% Private · IT Act Compliant</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Get <strong>free signature for documents</strong> in seconds. Create a professional digital signature for documents
            and insert it into <strong>PDF, Word, Google Docs, Excel</strong> or any file instantly. Transparent PNG,
            no signup, no watermark, 100% private and legally valid for GST, contracts and daily business use in India.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Star className="h-3.5 w-3.5" />,        label: "Free Signature for Documents" },
              { icon: <Layers className="h-3.5 w-3.5" />,      label: "PDF, Word, Google Docs Ready" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "100% Private" },
              { icon: <Smartphone className="h-3.5 w-3.5" />,  label: "Mobile Friendly" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />,  label: "IT Act Compliant" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground"
              >
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Doc type quick links */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["PDF", "Word", "Google Docs", "Excel", "GST Invoice", "Contracts"].map((doc) => (
              <span key={doc} className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                <Check className="h-3 w-3" />{doc}
              </span>
            ))}
          </div>

          <div className="flex justify-center sm:justify-start">
            <Button
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2"
              data-testid="button-create-signature-documents"
            >
              <PenTool className="h-4 w-4" />Create Signature for Documents<ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <SignaturePadWidget />
          <p className="text-xs text-muted-foreground text-center mt-3">
            No watermark · No upload to server · Transparent PNG · Works in every document type
          </p>
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Powerful Features for Free Signature for Documents</h2>
            <p className="text-muted-foreground mb-5">Everything you need to create and use a professional digital signature for documents:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(({ icon, title, desc }) => (
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

          {/* How to */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Add Free Signature for Documents (4 Simple Steps)</h2>
            <p className="text-muted-foreground mb-5">From creating your signature to inserting it into any document — under 60 seconds total:</p>
            <ol className="space-y-3 mb-5">
              {HOW_TO_STEPS.map(({ n, title, desc }) => (
                <li key={n} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <span className="shrink-0 h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{n}</span>
                  <div>
                    <p className="font-semibold text-foreground">Step {n}: {title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="text-center">
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-howto-cta"
              >
                <PenTool className="h-4 w-4" />Create Signature for Documents<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Easy ways to use */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Easy Ways to Use Signature for Documents</h2>
            <p className="text-muted-foreground mb-5">
              Your transparent PNG signature works identically across every document format. Most Indian users create
              one <strong>free signature for documents</strong> and reuse it across all files for years:
            </p>
            <div className="space-y-3">
              {DOC_TYPES.map(({ icon, type, how }) => (
                <div key={type} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{type}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{how}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Where Indian users need */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Where Indian Users Need Free Signature for Documents</h2>
            <p className="text-muted-foreground mb-5">
              Every professional and business across India deals with documents that require a signature daily.
              Here are the most common real-world document signing use cases:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              {USE_CASES_LIST.map((item) => (
                <div key={item} className="flex items-center gap-3 p-4 rounded-xl border bg-card">
                  <Check className="h-4 w-4 text-primary shrink-0" />
                  <p className="text-sm text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 text-sm text-muted-foreground">
              Perfect for <strong className="text-foreground">freelancers, CAs, small businesses and students</strong> across India — the same transparent PNG signature works on every document type, every time.
            </div>
          </section>

          {/* Legal validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Is Free Signature for Documents Legal in India?</h2>
            <div className="rounded-xl border bg-card p-5 mb-4">
              <p className="font-medium text-foreground mb-2">Yes — completely legal.</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Under the <strong>Information Technology Act 2000</strong>, digital signatures added to any document —
                PDF, Word, Google Docs, or any file — are fully valid for GST, contracts, and most official business use.
                Your free signature for documents carries the same legal weight as a handwritten signature for routine
                commercial transactions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: <BadgeCheck className="h-4 w-4 text-primary" />, label: "IT Act 2000 Compliant" },
                  { icon: <Scale className="h-4 w-4 text-primary" />,       label: "Indian Contract Act Valid" },
                  { icon: <Receipt className="h-4 w-4 text-primary" />,     label: "GST Invoice Accepted" },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm font-medium text-foreground">
                    {icon}{label}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" />Important:</strong>
              A DSC (Class 3 Digital Signature Certificate) is required for MCA ROC filings, eCourt submissions, and
              income tax portal e-verification. For these specific regulated filings, a PNG image signature alone is not
              sufficient. For all everyday commercial documents, a PNG signature is legally valid.
            </div>
          </section>

          {/* Pro tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for Signature for Documents</h2>
            <p className="text-muted-foreground mb-5">Best practices used by professionals who sign documents daily:</p>
            <div className="space-y-3">
              {PRO_TIPS.map(({ title, body }, i) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{i + 1}</span>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Use Pixocraft for Free Signature for Documents?</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium mb-3">
                Other tools work only for PDF. Pixocraft gives one signature that works perfectly across <strong>PDF, Word,
                Google Docs</strong> and every document type — completely free.
              </p>
              <ul className="space-y-2">
                {[
                  "100% free for all document types — no per-download limit",
                  "Works everywhere — PDF, Word, Google Docs, Excel, email",
                  "IT Act 2000 compliant and GST invoice ready",
                  "Complete privacy for sensitive business documents",
                  "Fastest multi-document workflow — create once, use everywhere",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-muted-foreground mb-6 text-center">
              One signature. Every document. Create your <strong>free signature for documents</strong> right now.
            </p>
            <div className="text-center">
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-why-cta"
              >
                <PenTool className="h-4 w-4" />Create Free Signature for Documents<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Related Document Signing Tools</h2>
            <p className="text-muted-foreground mb-4">Complete your document signing workflow with these free tools:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/add-signature-to-pdf",                    label: "Add Signature to PDF",                desc: "Insert your signature directly into any PDF document." },
                { href: "/tools/transparent-signature-png",               label: "Transparent Signature PNG",           desc: "Download your signature with a perfectly transparent background." },
                { href: "/tools/gst-invoice-signature",                   label: "GST Invoice Signature",               desc: "Signature optimised for Tally, Zoho Books, and GST invoices." },
                { href: "/tools/signature-for-contracts",                 label: "Signature for Contracts",             desc: "Legally valid signature for NDAs and business contracts." },
                { href: "/tools/email-signature-maker",                   label: "Email Signature Maker",               desc: "Create a professional signature for Gmail and Outlook." },
                { href: "/tools/how-to-create-digital-signature-online",  label: "How to Create Digital Signature",     desc: "Step-by-step beginner guide to digital signatures." },
              ].map(({ href, label, desc }) => (
                <Link key={href} href={href}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border bg-card hover-elevate cursor-pointer" data-testid={`link-related-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                    <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-5">Frequently Asked Questions — Free Signature for Documents</h2>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                  >
                    <span className="font-medium text-foreground text-sm leading-snug">{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-10 text-center rounded-xl border bg-primary/5 px-6 py-8">
              <p className="text-lg font-bold text-foreground mb-2">Ready to Add Free Signature for Documents?</p>
              <p className="text-sm text-muted-foreground mb-5">
                Create your signature above and use it in PDF, Word, Google Docs &amp; every file instantly — completely free.
              </p>
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-final-cta"
              >
                <PenTool className="h-4 w-4" />Create Signature for Documents<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
