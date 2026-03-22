import { useState } from "react";
import {
  useSEO,
  StructuredData,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateHowToSchema,
  generateSoftwareApplicationSchema,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import SignatureToolSection from "@/components/SignatureToolSection";
import { Link } from "wouter";
import {
  Shield, Zap, Smartphone, Lock, BadgeCheck, ArrowRight,
  ChevronDown, ChevronUp, FileCheck, FileText, Receipt,
  Briefcase, Globe, Mail, AlertCircle, Star, Check,
  FilePen, PenTool, Upload, Download, ScanLine, Cpu,
  ImageIcon, RefreshCw, KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/how-to-sign-pdf-online";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Create your signature",
    description: "Draw freehand on the canvas, type your name in a handwriting font, or upload a photo of your existing signature. Click Confirm Signature when you are happy with the result.",
  },
  {
    step: 2,
    title: "Download signature PNG",
    description: "Download your signature as a transparent PNG. This ensures no white box appears when placed over any PDF section or background colour.",
  },
  {
    step: 3,
    title: "Upload your PDF",
    description: "Click Upload PDF or drag and drop your file into the tool. The document renders instantly inside your browser — nothing is sent to any server.",
  },
  {
    step: 4,
    title: "Place signature on document",
    description: "Click anywhere on the PDF preview to position your signature precisely. Use the page navigator to sign multiple pages if needed.",
  },
  {
    step: 5,
    title: "Adjust and align",
    description: "Resize and reposition the signature to sit neatly on or just above the signature line. Preview the final placement in real-time.",
  },
  {
    step: 6,
    title: "Download signed PDF",
    description: "Click Download Signed PDF. pdf-lib embeds the signature at the exact coordinates and produces a clean, share-ready PDF file in seconds.",
  },
];

const FAQS = [
  {
    question: "How can I sign a PDF online for free?",
    answer: "Use Pixocraft's free PDF signing tool: create your signature (draw, type, or upload), upload your PDF, click on the page to place the signature, and click Download Signed PDF. The entire process takes under 60 seconds and is 100% free with no login required.",
  },
  {
    question: "Is signing a PDF online safe?",
    answer: "Yes. Pixocraft's tool runs 100% inside your browser using PDF.js and pdf-lib. Your PDF file, your signature, and the signed output are never uploaded to any server, stored, or logged. All processing happens locally on your device.",
  },
  {
    question: "What format is best for a PDF signature?",
    answer: "PNG with a transparent background is the best format. JPG does not support transparency — it adds a white rectangular box around your signature. Pixocraft automatically exports your signature as a transparent PNG, so it overlays cleanly on any PDF.",
  },
  {
    question: "Can I sign a PDF without Adobe?",
    answer: "Absolutely. Pixocraft's free online tool lets you sign any PDF directly in your browser without Adobe Acrobat, DocuSign, or any other paid software. No installation, no subscription, no account required.",
  },
  {
    question: "Is a digital signature required for signing a PDF?",
    answer: "Not for most documents. An image-based electronic signature (eSignature) is legally valid under India's IT Act 2000 for contracts, GST invoices, NDAs, and HR documents. A certified Digital Signature Certificate (DSC) is only required for MCA ROC filings, court submissions, and property registration.",
  },
  {
    question: "Can I sign a PDF online without printing?",
    answer: "Yes. With Pixocraft's online PDF signing tool you never need to print, sign physically, scan, and re-upload. Create your digital signature, upload the PDF, place the signature, and download the signed file — entirely paperless in under 60 seconds.",
  },
  {
    question: "How do I sign a GST invoice PDF online?",
    answer: "Upload your GST invoice PDF to Pixocraft's signing tool. Create your signature, click to place it over the authorised signatory field on the invoice, and download the signed PDF. CBIC guidelines require an authorised signatory signature on manually generated GST invoices, and this approach satisfies that requirement.",
  },
  {
    question: "Does the PDF signing tool work on mobile?",
    answer: "Yes. The tool is fully touch-optimised. Open it on your Android or iOS browser, draw your signature with your finger, upload your PDF from your phone's storage or cloud, tap to place the signature, and download the signed file. No app installation needed.",
  },
  {
    question: "What is the difference between a digital signature and an electronic signature?",
    answer: "An electronic signature (eSignature) is a broad term for any electronic method of signing — including image-based signatures, typed names, and click-to-sign. A digital signature specifically refers to a cryptographic certificate (DSC) that is mathematically tied to a document. For everyday business documents, an image-based eSignature is sufficient and legally valid.",
  },
  {
    question: "Can I sign multiple pages of a PDF online?",
    answer: "Yes. After uploading your PDF, use the page navigator in the tool to move between pages and click to place your signature on each page that requires it. All placements are tracked and embedded in the final downloaded PDF.",
  },
  {
    question: "Is there a file size limit for signing PDFs online?",
    answer: "Since the tool processes everything in your browser, the limit depends on your device's available memory. Most PDFs up to 50 MB work without any issues on modern devices. Very large PDFs with many high-resolution images may take a few seconds longer to render.",
  },
  {
    question: "Is Pixocraft's PDF signing tool really free?",
    answer: "Yes — 100% free, forever. No subscription, no watermark on the output PDF, no hidden upgrade prompts. You can sign unlimited PDFs with no cost at any time.",
  },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />, title: "Job Application Forms", desc: "Sign employment application forms and attach your signature digitally. No printing required." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Contracts & NDAs", desc: "Sign freelance contracts, non-disclosure agreements, and service agreements legally." },
  { icon: <FilePen className="h-5 w-5 text-primary" />, title: "Freelance Agreements", desc: "Sign project proposals, SOWs, and client agreements in seconds. Deliver professionally signed PDFs every time." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Offer Letters & HR", desc: "HR teams sign and send offer letters as professionally signed PDFs — no printing, no scanning." },
  { icon: <Globe className="h-5 w-5 text-primary" />, title: "Government Forms", desc: "Many government form submissions accept image-embedded signatures in PDF. Download and submit directly." },
  { icon: <Mail className="h-5 w-5 text-primary" />, title: "Official Documents", desc: "Sign formal business letters, memos, and reports instantly — share as clean, signed PDF via email." },
];

const MISTAKES = [
  { title: "Using a JPG signature", body: "JPG does not support transparency. A white box appears over any non-white PDF background. Always use transparent PNG — Pixocraft handles this automatically." },
  { title: "Wrong placement", body: "Placing the signature over text, in a margin, or outside the designated field looks unprofessional. Click precisely on or just below the signature line." },
  { title: "Signature too large or too small", body: "An oversized signature dominates the page; too small looks illegible. 15–25% of the page width is the standard range for A4/Letter documents." },
  { title: "Using a third-party PDF that locks fields", body: "Some PDFs have locked form fields that prevent image-based signing. If you encounter this, print to PDF first to flatten the form, then sign the output." },
  { title: "Low-resolution signature", body: "A blurry or pixelated signature undermines professionalism. Use the tool's high-resolution export rather than a phone photo of your signature." },
];

const TIPS = [
  { title: "Use draw mode for the most natural result", body: "Drawing your signature with a mouse, trackpad, or finger produces the most authentic handwritten look — ideal for contracts and formal documents." },
  { title: "Position at the bottom-right of the signature line", body: "By convention, signatures sit just above or to the right of the dotted signature line. Click in that position for the most natural placement." },
  { title: "Keep consistent size across documents", body: "Save your signature PNG and reuse it. Consistent placement and sizing across multiple documents looks professional and deliberate." },
  { title: "Preview before downloading", body: "After placing the signature, check alignment in the preview pane. You can click again to reposition at any time before downloading." },
  { title: "Download the PNG separately for reuse", body: "Use Pixocraft's Signature Generator to download your signature as a standalone transparent PNG — paste it into any document template, email footer, or billing software." },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Sign PDF Online (Free & Instant) – Step-by-Step Guide",
  "description": "Learn how to sign PDF online free. Create signature, add to PDF, and download instantly. No login, private and secure tool.",
  "url": CANONICAL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-22",
  "author": { "@type": "Organization", "name": "Pixocraft" },
  "publisher": { "@type": "Organization", "name": "Pixocraft", "url": "https://tools.pixocraft.in" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": CANONICAL },
};

export default function HowToSignPdfOnline() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "How to Sign PDF Online Free (Add Signature Easily) | Pixocraft",
    description: "Learn how to sign PDF online free. Create signature, add to PDF, and download instantly. No login, private and secure tool.",
    keywords: "how to sign pdf online, sign pdf online free, add signature to pdf online, esign pdf online, sign document online free, digital signature pdf, sign pdf without printing",
    canonicalUrl: CANONICAL,
    ogType: "website",
    ogImage: "https://tools.pixocraft.in/images/pdf-signature-tool.png",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "How to Sign PDF Online", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "How to Sign PDF Online Free (Add Signature Easily) | Pixocraft",
    description: "Learn how to sign PDF online free. Create signature, add to PDF, and download instantly. No login, private and secure tool.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Sign PDF Online Free",
    description: "Sign a PDF online for free in under 60 seconds using Pixocraft's browser-based tool. No signup, no software, 100% private.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Sign PDF Online Tool",
    description: "Free online tool to sign PDF documents. Create signature, add to PDF, and download instantly without login.",
    url: CANONICAL,
    applicationCategory: "Utility",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "INR" },
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={generateFAQSchema(FAQS)} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-5 sm:py-8">
        <Breadcrumb items={[
          { label: "Home", url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Generator", url: "/tools/signature-pad-tool" },
          { label: "How to Sign PDF Online" },
        ]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                How to Sign PDF Online (Free &amp; Instant)
              </h1>
              <p className="hidden sm:block text-sm text-muted-foreground">Sign PDF documents online in seconds. No login, no upload, fully private and secure.</p>
            </div>
          </div>

          {/* Featured snippet block */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">Quick Answer — How to sign a PDF online?</p>
            <p className="text-base text-foreground leading-relaxed">
              To sign a PDF online: <strong>create your signature</strong> (draw, type, or upload), <strong>upload your PDF</strong> to the tool, <strong>place the signature</strong> by clicking on the document, then <strong>download</strong> the signed PDF. The entire process takes under 60 seconds — no login, no software, completely free.
            </p>
          </div>

          {/* Trust bar */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Check className="h-3.5 w-3.5" />, label: "6-Step Process" },
              { icon: <Lock className="h-3.5 w-3.5" />, label: "No Login Required" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on Mobile & Desktop" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "100% Private" },
              { icon: <Download className="h-3.5 w-3.5" />, label: "Instant Download" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Quick steps above fold */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
            {HOW_TO_STEPS.map(({ step, title }) => (
              <div key={step} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{step}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{title}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-sign-pdf-hero-cta">
              <FileCheck className="h-4 w-4" />Sign PDF Now — Free<ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" />Most users finish in under 60 seconds</span>
              <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-primary" />No app or software needed</span>
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-primary" />Works for contracts, GST &amp; forms</span>
            </div>
          </div>
        </div>

        {/* ── TOOL ──────────────────────────────────────────────────────── */}
        <SignatureToolSection />

        {/* ── SEO CONTENT ───────────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* Keyword-rich intro paragraph — targets all 4 primary keywords */}
          <p className="text-muted-foreground text-base leading-relaxed -mt-8">
            Learning <strong>how to sign PDF online</strong> has never been easier. With Pixocraft's free browser-based tool you can <strong>add signature to PDF</strong>, <strong>esign PDF</strong> documents, and <strong>sign PDF online free</strong> — all without uploading your file to any server or creating an account. The steps below walk you through the entire process from start to finish.
          </p>

          {/* What does it mean to sign a PDF */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What Does It Mean to Sign a PDF?</h2>
            <p className="text-muted-foreground mb-4">
              Signing a PDF means adding your signature — either as a handwritten-style image or a typed name — directly onto the document file. The signature is embedded as an image layer inside the PDF, making it look exactly like a physically signed document.
            </p>
            <p className="text-muted-foreground mb-5">
              When you <strong>sign PDF online free</strong>, you skip printing, signing with a pen, scanning, and re-uploading. The entire process happens in your browser and takes under 60 seconds. It is the modern, paperless way to authorise documents.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <FileText className="h-5 w-5 text-primary" />, title: "Contracts", desc: "Legally bind service agreements, employment contracts, and business deals." },
                { icon: <FilePen className="h-5 w-5 text-primary" />, title: "Forms", desc: "Complete and sign application forms, declarations, and consent documents." },
                { icon: <Receipt className="h-5 w-5 text-primary" />, title: "Agreements", desc: "Authorise NDAs, freelance proposals, and partnership agreements." },
                { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Official Documents", desc: "Sign government forms, GST invoices, and corporate correspondence." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Methods comparison */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Methods to Sign a PDF Online</h2>
            <p className="text-muted-foreground mb-5">There are three common methods to sign a PDF. Here is how they compare:</p>

            <div className="space-y-4 mb-5">
              {[
                {
                  label: "A",
                  title: "Using Online Tools (Fastest)",
                  icon: <Zap className="h-5 w-5 text-primary" />,
                  desc: "Browser-based tools like Pixocraft let you create a signature, upload a PDF, place the signature, and download the signed file in under 60 seconds. No installation, no subscription, no account required. Best for everyday use.",
                  badge: "Recommended",
                },
                {
                  label: "B",
                  title: "Using Software (Adobe, etc.)",
                  icon: <Cpu className="h-5 w-5 text-muted-foreground" />,
                  desc: "Adobe Acrobat Pro and DocuSign offer advanced signing workflows including certification, audit trails, and enterprise compliance. Suitable for large organisations requiring certified signing at scale. Requires a paid subscription.",
                  badge: "Paid",
                },
                {
                  label: "C",
                  title: "Using a Digital Signature Certificate (Advanced)",
                  icon: <KeyRound className="h-5 w-5 text-muted-foreground" />,
                  desc: "A cryptographic DSC (Digital Signature Certificate) issued by a licensed CA binds your identity to the document using encryption. Required for MCA ROC filings, income tax submissions, and certain legal proceedings.",
                  badge: "Advanced",
                },
              ].map(({ label, title, icon, desc, badge }) => (
                <div key={label} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">{label}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {icon}
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full border bg-muted text-muted-foreground">{badge}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Method</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Speed</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Cost</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Best For</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { method: "Online Tool (Pixocraft)", speed: "< 60 seconds", cost: "Free", use: "Everyday docs, GST, contracts" },
                    { method: "Software (Adobe, DocuSign)", speed: "2–5 minutes", cost: "Paid subscription", use: "Enterprise certified signing" },
                    { method: "Digital Signature Certificate", speed: "5–15 minutes", cost: "DSC fee", use: "Government & regulatory filings" },
                    { method: "Print & Scan", speed: "5–15 minutes", cost: "Paper + printer", use: "Avoid — legacy workflow" },
                  ].map(({ method, speed, cost, use }) => (
                    <tr key={method} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{method}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{speed}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{cost}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Step-by-step guide */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Sign PDF Online — Step-by-Step Guide</h2>
            <p className="text-muted-foreground mb-5">Follow these six steps to sign any PDF in under 60 seconds using Pixocraft:</p>
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
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-sign-pdf-steps-cta">
                <FileCheck className="h-4 w-4" />Sign PDF Now — Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Image SEO — 3 visuals with descriptive alt text */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Sign PDF Online — Visual Examples</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  src: "https://tools.pixocraft.in/images/sign-pdf-online-step1-create-signature.png",
                  alt: "Step 1 — Create your handwritten signature online using Pixocraft's draw tool",
                  caption: "Step 1 — Create Signature",
                },
                {
                  src: "https://tools.pixocraft.in/images/sign-pdf-online-step2-upload-pdf.png",
                  alt: "Step 2 — Upload your PDF document and place signature on the page",
                  caption: "Step 2 — Upload PDF & Place Signature",
                },
                {
                  src: "https://tools.pixocraft.in/images/sign-pdf-online-step3-download-signed.png",
                  alt: "Step 3 — Download the signed PDF file with embedded signature",
                  caption: "Step 3 — Download Signed PDF",
                },
              ].map(({ src, alt, caption }) => (
                <figure key={caption} className="rounded-xl border bg-card overflow-hidden">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    width={400}
                    height={260}
                    className="w-full object-cover"
                    onError={(e) => { (e.currentTarget.parentElement as HTMLElement).style.display = "none"; }}
                  />
                  <figcaption className="px-4 py-2 text-xs text-muted-foreground text-center border-t">{caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Why use online PDF sign tool */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Why Sign PDF Online Free — Instead of Printing?</h2>
            <p className="text-muted-foreground mb-4">
              The traditional workflow — print, sign with a pen, scan, email — wastes time, paper, and money. When you <strong>sign PDF online free</strong>, every one of those steps disappears.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {[
                { icon: <ScanLine className="h-5 w-5 text-primary" />, title: "No Install", desc: "Works entirely in your browser. No software, no plugins, no app downloads." },
                { icon: <Zap className="h-5 w-5 text-primary" />, title: "Fast", desc: "The entire process — signature, upload, placement, download — takes under 60 seconds." },
                { icon: <Globe className="h-5 w-5 text-primary" />, title: "Works Anywhere", desc: "Chrome, Firefox, Edge, Safari — Windows, Mac, Android, iOS. Sign from any device." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best format for PDF signature */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Best Format for a PDF Signature</h2>
            <p className="text-muted-foreground mb-5">
              The format of your signature image determines how professional the final signed PDF looks. Here is what you need to know:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  icon: <ImageIcon className="h-5 w-5 text-primary" />,
                  title: "PNG with Transparent Background",
                  desc: "The ideal format. Transparent PNG overlays cleanly on any PDF — no white box, no background colour clash. Pixocraft automatically exports your signature as a transparent PNG.",
                  recommended: true,
                },
                {
                  icon: <ImageIcon className="h-5 w-5 text-muted-foreground" />,
                  title: "JPG / JPEG",
                  desc: "Not recommended. JPG does not support transparency. A rectangular white box will appear around your signature when placed on any non-white section of a PDF.",
                  recommended: false,
                },
              ].map(({ icon, title, desc, recommended }) => (
                <div key={title} className={`flex gap-4 p-5 rounded-xl border ${recommended ? "bg-primary/5 border-primary/20" : "bg-card"}`}>
                  <div className={`shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${recommended ? "bg-primary/10" : "bg-muted"}`}>{icon}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      {recommended && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Recommended</span>}
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="font-semibold text-foreground text-sm mb-3">Recommended signature specifications:</p>
              <ul className="space-y-2">
                {[
                  "Format: PNG with transparent background",
                  "Size: 15–25% of the page width (approximately 400–600 px wide for A4)",
                  "Resolution: 150–300 DPI for clear, sharp rendering",
                  "Colour: Black or dark ink on transparent background",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Use Cases — When to Sign a PDF Online</h2>
            <p className="text-muted-foreground mb-5">The most common professional situations where online PDF signing is used:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {USE_CASES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Save & Reuse USP */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Save &amp; Reuse Your Signature — No Login Needed</h2>
            <p className="text-muted-foreground mb-5">
              One of Pixocraft's biggest advantages over enterprise signing tools is that you can create your signature once and reuse it across unlimited documents — without creating an account or logging in each time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { icon: <Lock className="h-5 w-5 text-primary" />, title: "No Login", desc: "Your signature is yours. No account creation, no email verification, no passwords to manage." },
                { icon: <RefreshCw className="h-5 w-5 text-primary" />, title: "Local Storage", desc: "Your signature can be saved as a PNG to your device and reused instantly on any future document." },
                { icon: <Shield className="h-5 w-5 text-primary" />, title: "Offline Ready", desc: "Once the page is loaded, signing works even without an active internet connection. All processing is local." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="font-semibold text-foreground mb-3 text-sm">How to reuse your signature across multiple PDFs:</p>
              <ol className="space-y-2">
                {[
                  "Create your signature once using Pixocraft's Signature Generator and download the transparent PNG.",
                  "Save the PNG to a folder on your device (e.g., 'My Signature').",
                  "For each new PDF, upload the saved PNG using the 'Upload' tab in the signature tool.",
                  "Place the signature on the PDF and download. Repeat for every document — no recreation needed.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Digital signature vs PDF signature */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Digital Signature vs PDF Signature — What's the Difference?</h2>
            <p className="text-muted-foreground mb-5">
              These two terms are often confused. Understanding the difference helps you choose the right approach for your document type.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {[
                {
                  icon: <FilePen className="h-5 w-5 text-primary" />,
                  title: "PDF Signature (Image-Based)",
                  points: [
                    "Your signature is an image embedded in the PDF",
                    "Created by drawing, typing, or uploading a photo",
                    "Visually identical to a handwritten signature",
                    "Legally valid for most commercial documents",
                    "No certificate or encryption required",
                    "Free — works with Pixocraft's tool",
                  ],
                },
                {
                  icon: <KeyRound className="h-5 w-5 text-primary" />,
                  title: "Digital Signature (Encrypted)",
                  points: [
                    "Uses a cryptographic certificate (DSC) issued by a CA",
                    "Mathematically tied to the document — tamper-evident",
                    "Required for government filings (MCA, income tax)",
                    "Issued by licensed certifying authorities",
                    "Has an expiry date and must be renewed",
                    "Paid — requires DSC purchase",
                  ],
                },
              ].map(({ icon, title, points }) => (
                <div key={title} className="p-5 rounded-xl border bg-card">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                  </div>
                  <ul className="space-y-2">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4">
              <p className="text-sm text-foreground">
                <strong>Bottom line:</strong> For contracts, freelance agreements, GST invoices, and most business documents, a PDF signature (image-based) is sufficient and legally valid. Use a digital signature certificate only when a regulatory authority specifically requires it.
              </p>
            </div>
          </section>

          {/* Pixocraft vs Others */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Pixocraft vs Other PDF Signing Tools</h2>
            <p className="text-muted-foreground mb-5">Here is how Pixocraft compares to popular alternatives:</p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">DocuSign</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Smallpdf</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Adobe</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { feature: "PDF upload to server", pixo: "No", docusign: "Yes", smallpdf: "Yes", adobe: "Yes" },
                    { feature: "Login required", pixo: "No", docusign: "Yes", smallpdf: "Yes", adobe: "Yes" },
                    { feature: "Free plan", pixo: "Always free", docusign: "Limited", smallpdf: "Limited", adobe: "Limited" },
                    { feature: "Processing speed", pixo: "< 60 sec", docusign: "2–5 min", smallpdf: "1–3 min", adobe: "1–3 min" },
                    { feature: "100% private", pixo: "Yes", docusign: "No", smallpdf: "No", adobe: "No" },
                  ].map(({ feature, pixo, docusign, smallpdf, adobe }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 font-semibold text-primary">{pixo}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{docusign}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{smallpdf}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{adobe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hidden sm:block text-sm text-muted-foreground">
              Unlike DocuSign, Smallpdf, and Adobe — which upload your documents to their servers — Pixocraft processes everything locally in your browser. Your PDF never leaves your device.
            </p>
          </section>

          {/* Common mistakes */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Common Mistakes When Signing PDFs Online</h2>
            <p className="text-muted-foreground mb-5">Avoid these mistakes for professional, legally presentable results:</p>
            <div className="space-y-3">
              {MISTAKES.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pro tips */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pro Tips for Signing PDFs Like a Professional</h2>
            <p className="text-muted-foreground mb-5">Small adjustments make a significant difference in how your signed documents look:</p>
            <div className="space-y-3">
              {TIPS.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <Star className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Related Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Signature Generator", href: "/tools/signature-pad-tool", desc: "Full-featured signature pad — draw, type, or upload your signature." },
                { label: "Signature for PDF", href: "/tools/signature-for-pdf", desc: "Create the perfect signature specifically designed for PDF documents." },
                { label: "Signature for Word", href: "/tools/signature-for-word", desc: "Add your signature to Word documents easily without printing." },
                { label: "How to Create a Digital Signature", href: "/tools/how-to-create-digital-signature", desc: "Step-by-step guide to creating a digital signature online." },
                { label: "Add Signature to PDF", href: "/tools/add-signature-to-pdf", desc: "Dedicated PDF signing tool — create, place, and download." },
                { label: "Transparent Signature PNG", href: "/tools/transparent-signature-png", desc: "Create a transparent background signature PNG to reuse anywhere." },
              ].map(({ label, href, desc }) => (
                <Link key={label} href={href} data-testid={`link-related-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border bg-card hover-elevate cursor-pointer">
                    <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {FAQS.map(({ question, answer }, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                  >
                    <span className="font-semibold text-foreground text-sm leading-snug">{question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed border-t">
                      {answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="rounded-xl border bg-primary/5 border-primary/20 px-4 py-6 sm:px-6 sm:py-8 text-center">
            <FileCheck className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Sign Your PDF?</h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              No login. No software. 100% private. Sign your PDF in under 60 seconds — free, forever.
            </p>
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-sign-pdf-final-cta">
              <FileCheck className="h-4 w-4" />Sign PDF Now — Free<ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
