import { useState } from "react";
import {
  useSEO,
  StructuredData,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PDFSignatureTool } from "@/components/PDFSignatureTool";
import { Link } from "wouter";
import {
  Shield, Zap, Smartphone, Lock, BadgeCheck, ArrowRight,
  ChevronDown, ChevronUp, FileCheck, FileText, Receipt,
  Briefcase, Globe, Mail, AlertCircle, Star, Check,
  FilePen, PenTool, Upload, Download, ScanLine, Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/how-to-sign-pdf-online";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-generator";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Create your signature",
    description: "Draw freehand on the canvas, type your name in a handwriting font, or upload a photo of your existing signature. Click Confirm Signature when you are happy with the result.",
  },
  {
    step: 2,
    title: "Upload your PDF",
    description: "Click Upload PDF or drag and drop your file into the tool. The document renders instantly inside your browser — nothing is sent to any server.",
  },
  {
    step: 3,
    title: "Make background transparent",
    description: "The tool automatically exports your signature as a transparent PNG so there is no white box when it is placed over any PDF section or colour.",
  },
  {
    step: 4,
    title: "Place signature on document",
    description: "Click anywhere on the PDF preview to position your signature precisely. Use the page navigator to sign multiple pages if needed.",
  },
  {
    step: 5,
    title: "Download signed PDF",
    description: "Click Download Signed PDF. pdf-lib embeds the signature at the exact coordinates and produces a clean, share-ready PDF file in seconds.",
  },
];

const FAQS = [
  {
    question: "How do I sign a PDF online for free?",
    answer: "Use Pixocraft's free PDF signing tool: create your signature (draw, type, or upload), upload your PDF, click on the page to place the signature, and click Download Signed PDF. The entire process takes under 60 seconds and is 100% free with no login required.",
  },
  {
    question: "Is signing a PDF online legally valid in India?",
    answer: "Yes. Under the Information Technology Act 2000 (IT Act 2000) and its 2008 Amendment (Section 3A), electronic signatures — including image-based signatures embedded in PDFs — are legally recognised for commercial contracts, GST invoices, NDAs, employment letters, and most business documents. For MCA ROC filings, court submissions, and property registration a certified DSC is required.",
  },
  {
    question: "Can I sign a PDF online without printing?",
    answer: "Yes. With an online PDF signing tool like Pixocraft's, you never need to print, sign physically, scan, and re-upload. Create your digital signature, upload the PDF, place the signature, and download the signed file — entirely paperless in under 60 seconds.",
  },
  {
    question: "How do I sign a GST invoice PDF online?",
    answer: "Upload your GST invoice PDF to Pixocraft's signing tool. Create your signature, click to place it over the authorised signatory field on the invoice, and download the signed PDF. CBIC guidelines require an authorised signatory signature on manually generated GST invoices, and this approach satisfies that requirement.",
  },
  {
    question: "Does the PDF signing tool work on mobile in India?",
    answer: "Yes. The tool is fully touch-optimised. Open it on your Android or iOS browser, draw your signature with your finger, upload your PDF from your phone's storage or cloud, tap to place the signature, and download the signed file. No app installation needed.",
  },
  {
    question: "Is my PDF kept private when I sign it online?",
    answer: "Completely. Pixocraft's tool runs 100% inside your browser using PDF.js and pdf-lib. Your PDF file, your signature, and the signed output are never uploaded to any server, stored, or logged. All processing happens locally on your device.",
  },
  {
    question: "What is the difference between a digital signature and an electronic signature?",
    answer: "An electronic signature (eSignature) is a broad term for any electronic method of signing — including image-based signatures, typed names, and click-to-sign. A digital signature specifically refers to a cryptographic certificate (DSC) that is mathematically tied to a document. For everyday business documents in India, an image-based eSignature is sufficient and legally valid under the IT Act 2000.",
  },
  {
    question: "Can I sign multiple pages of a PDF online?",
    answer: "Yes. After uploading your PDF, use the page navigator in the tool to move between pages and click to place your signature on each page that requires it. All placements are tracked and embedded in the final downloaded PDF.",
  },
  {
    question: "Why should I use a transparent PNG signature instead of JPG?",
    answer: "JPG does not support transparency. If you use a JPG signature, a white rectangular box will appear around your signature on any coloured PDF section or background. Transparent PNG overlays cleanly on any PDF — Pixocraft automatically exports your signature as a transparent PNG.",
  },
  {
    question: "How do I sign an Aadhaar-linked document PDF online?",
    answer: "Upload your Aadhaar-linked form PDF to the tool, create your signature, and place it in the designated signature field. Download the signed PDF and submit. For official Aadhaar e-KYC authentication, a registered DSC or Aadhaar OTP eSign is required — the image-based signature is suitable for accompanying consent forms and declarations.",
  },
  {
    question: "Can I sign a PDF on my laptop without installing any software?",
    answer: "Yes. Pixocraft's PDF signing tool works entirely in your browser — no installation, no plugins, no app required. Open the page in Chrome, Firefox, Edge, or Safari, and sign your PDF directly. Works on Windows, Mac, and Linux.",
  },
  {
    question: "Is there a file size limit for signing PDFs online?",
    answer: "Since the tool processes everything in your browser, the limit depends on your device's available memory. Most PDFs up to 50 MB work without any issues on modern devices. Very large PDFs with many high-resolution images may take a few seconds longer to render.",
  },
  {
    question: "How do I create a signature for contracts?",
    answer: "Use the Draw tab to create a freehand signature that looks like your physical one, or the Type tab to generate a handwriting-style signature from your name. Download as a transparent PNG or use the PDF signing tool to embed it directly into your contract PDF.",
  },
  {
    question: "What does 'sign PDF without printing' mean?",
    answer: "Traditionally, signing a PDF meant printing the document, signing it with a pen, scanning it back, and sending the scan. Signing a PDF without printing means using an online tool to embed a digital signature directly into the PDF file — skipping all the print-scan steps entirely.",
  },
  {
    question: "Is Pixocraft's PDF signing tool really free?",
    answer: "Yes — 100% free, forever. No subscription, no watermark on the output PDF, no hidden upgrade prompts. You can sign unlimited PDFs with no cost at any time.",
  },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />, title: "GST Invoices", desc: "Embed your authorised signatory signature directly into GST invoice PDFs — satisfies CBIC requirements for manually generated invoices." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Contracts & NDAs", desc: "Sign freelance contracts, non-disclosure agreements, and service agreements legally under the IT Act 2000." },
  { icon: <FilePen className="h-5 w-5 text-primary" />, title: "Offer Letters & HR", desc: "HR teams sign and send offer letters as professionally signed PDFs — no printing, no scanning." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Freelancing", desc: "Sign project proposals, SOWs, and client agreements in seconds. Deliver professionally signed PDFs every time." },
  { icon: <Globe className="h-5 w-5 text-primary" />, title: "Government Forms", desc: "Many government form submissions accept image-embedded signatures in PDF. Download and submit directly from your browser." },
  { icon: <Mail className="h-5 w-5 text-primary" />, title: "Business Correspondence", desc: "Sign formal business letters, memos, and reports instantly — share as clean, signed PDF via email." },
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
  "headline": "How to Sign PDF Online Free in India – Step-by-Step Guide (2026)",
  "description": "Learn how to sign a PDF online free in India in under 60 seconds. Step-by-step guide with digital signature tool. No signup required, 100% private, GST ready.",
  "url": CANONICAL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-18",
  "author": { "@type": "Organization", "name": "Pixocraft" },
  "publisher": { "@type": "Organization", "name": "Pixocraft", "url": "https://tools.pixocraft.in" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": CANONICAL },
};

export default function HowToSignPdfOnline() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "How to Sign PDF Online Free in India – Step-by-Step Guide | Pixocraft",
    description: "Learn how to sign PDF online free in India in under 1 minute. Step-by-step guide with digital signature. No signup required, 100% private, GST ready.",
    keywords: "how to sign pdf online, sign pdf online free, digital signature pdf online, sign pdf online india, free pdf signing tool, how to sign pdf without printing, sign gst invoice pdf online, how to digitally sign pdf free, sign pdf on mobile india",
    canonicalUrl: CANONICAL,
    ogTitle: "How to Sign PDF Online Free in India – Step-by-Step Guide | Pixocraft",
    ogDescription: "Learn how to sign PDF online free in India in under 1 minute. Step-by-step guide with digital signature. No signup required, 100% private, GST ready.",
    ogType: "article",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "How to Sign PDF Online", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "How to Sign PDF Online Free in India – Step-by-Step Guide | Pixocraft",
    description: "Learn how to sign PDF online free in India in under 1 minute. Step-by-step guide with digital signature. No signup required, 100% private, GST ready.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Sign PDF Online Free",
    description: "Sign a PDF online for free in under 60 seconds using Pixocraft's browser-based tool. No signup, no software, 100% private.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={generateFAQSchema(FAQS)} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Breadcrumb items={[
          { label: "Home", url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "How to Sign PDF Online" },
        ]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                How to Sign PDF Online Free in India – Step-by-Step Guide (2026)
              </h1>
              <p className="text-sm text-muted-foreground">Free · No Signup · 100% Private · GST &amp; Aadhaar Ready</p>
            </div>
          </div>

          {/* Direct answer block for featured snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">Quick Answer</p>
            <p className="text-base text-foreground leading-relaxed">
              You can sign a PDF online by creating a signature, uploading your PDF, placing the signature and downloading the signed file in <strong>under 1 minute</strong>.
            </p>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Check className="h-3.5 w-3.5" />, label: "5-Step Process" },
              { icon: <Lock className="h-3.5 w-3.5" />, label: "No Signup Required" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on Mobile & Laptop" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "100% Private" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "GST & Aadhaar Ready" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Quick steps above fold */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-5">
            {HOW_TO_STEPS.map(({ step, title }) => (
              <div key={step} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{step}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{title}</p>
              </div>
            ))}
          </div>

          {/* UX psychology / CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-sign-pdf-hero-cta">
              <FileCheck className="h-4 w-4" />Sign PDF Now Free<ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" />Most users finish in under 60 seconds</span>
              <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-primary" />No app or software needed</span>
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-primary" />Works for GST, contracts &amp; Aadhaar</span>
            </div>
          </div>
        </div>

        {/* ── TOOL ──────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <PDFSignatureTool ctaLabel="Download Signed PDF" />
        </div>

        {/* ── SEO CONTENT ───────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Why online PDF signing */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Sign a PDF Online Instead of Printing and Scanning?</h2>
            <p className="text-muted-foreground mb-4">
              The traditional workflow — print, sign with a pen, scan, email — wastes time, paper, and money. An online PDF signing tool eliminates every step of that process.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { icon: <ScanLine className="h-5 w-5 text-primary" />, title: "No Print or Scan", desc: "Sign directly on screen. No printer, no scanner, no paper required." },
                { icon: <Zap className="h-5 w-5 text-primary" />, title: "Faster", desc: "The entire process — signature, upload, placement, download — takes under 60 seconds." },
                { icon: <Shield className="h-5 w-5 text-primary" />, title: "No Paid Tools", desc: "Pixocraft's PDF signing tool is completely free. No DocuSign subscription, no Adobe Acrobat Pro." },
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
            <p className="text-muted-foreground">
              For Indian professionals who frequently sign GST invoices, contracts, and government forms, switching to online PDF signing saves hours every month. The savings are especially significant for freelancers, small businesses, and HR teams who handle high volumes of documents.
            </p>
          </section>

          {/* Methods comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">PDF Signing Methods Comparison (2026)</h2>
            <p className="text-muted-foreground mb-5">There are three common methods to sign a PDF. Here is how they compare:</p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Method</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Speed</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Cost</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Use Case</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { method: "Print & Scan", icon: <ScanLine className="h-4 w-4 text-muted-foreground inline mr-1" />, speed: "Slow (5–15 min)", cost: "High (paper + printer)", use: "Old workflow — avoid if possible" },
                    { method: "Apps (DocuSign, Adobe)", icon: <Cpu className="h-4 w-4 text-muted-foreground inline mr-1" />, speed: "Medium (2–5 min)", cost: "Paid subscription", use: "Enterprise / high-volume certified signing" },
                    { method: "PNG Method (Pixocraft)", icon: <FileCheck className="h-4 w-4 text-primary inline mr-1" />, speed: "Fast (< 60 seconds)", cost: "Free", use: "Best — everyday docs, GST, contracts" },
                  ].map(({ method, icon, speed, cost, use }) => (
                    <tr key={method} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{icon}{method}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{speed}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{cost}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">
              For the vast majority of use cases — GST invoices, contracts, Aadhaar forms, HR documents — the free PNG-based method is the fastest, most private, and most practical option available in 2026.
            </p>
          </section>

          {/* Step-by-step guide */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Sign PDF Online Free – Step-by-Step Guide</h2>
            <p className="text-muted-foreground mb-5">Follow these five steps to sign any PDF in under 60 seconds:</p>
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
                <FileCheck className="h-4 w-4" />Sign PDF Now Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Batch PDF signing */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Batch PDF Signing (2026 Trend)</h2>
            <p className="text-muted-foreground mb-4">
              For professionals who sign multiple PDFs regularly — such as payroll managers, CA firms, freelancers sending multiple client proposals, or HR teams processing offer letters — batch signing is a significant time-saver.
            </p>
            <div className="rounded-xl border bg-card p-5 mb-4">
              <p className="font-semibold text-foreground mb-3">How to Sign Multiple PDFs Efficiently</p>
              <ol className="space-y-2">
                {[
                  "Create your signature once using Pixocraft's Signature Generator and download the transparent PNG.",
                  "Open the first PDF in Pixocraft's PDF signing tool and use the saved PNG to place your signature.",
                  "Download the signed PDF and move to the next document.",
                  "Reuse the same signature PNG across unlimited PDFs — no need to recreate it each time.",
                  "For consistent positioning, note the approximate coordinates (e.g., bottom-right of page) and apply the same placement to each document.",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
            <p className="text-muted-foreground">
              The ability to reuse a single signature PNG across multiple documents without recreating it each session is one of the biggest workflow advantages of the transparent PNG method versus enterprise eSignature platforms, which often require you to start a new signing workflow for each document.
            </p>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">When to Sign a PDF Online — Real Use Cases</h2>
            <p className="text-muted-foreground mb-5">The most common professional situations where online PDF signing is used in India:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </section>

          {/* Legal validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Is Signing a PDF Online Legally Valid in India?</h2>
            <div className="rounded-xl border bg-primary/5 border-primary/20 px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                Yes. An image-based electronic signature embedded in a PDF is legally valid under India's <strong>Information Technology Act 2000</strong> for the vast majority of commercial and professional documents.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The IT Act 2000 (as amended in 2008, Section 3A) recognises electronic signatures for contracts, agreements, and commercial transactions. The Indian Contract Act 1872 further validates electronically executed agreements between consenting parties. GST invoices signed with an authorised representative's image-based signature comply with CBIC guidelines for manually generated invoices.
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Document Type</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Image eSign Valid?</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { doc: "Contracts & Agreements", valid: "Yes", note: "IT Act 2000 — SES recognised" },
                    { doc: "GST Invoices", valid: "Yes", note: "CBIC guidelines for manually generated invoices" },
                    { doc: "NDAs", valid: "Yes", note: "Standard commercial document" },
                    { doc: "Employment / Offer Letters", valid: "Yes", note: "Common HR practice" },
                    { doc: "MCA ROC Filings", valid: "DSC Required", note: "Regulatory requirement for company filings" },
                    { doc: "Court Submissions", valid: "DSC Required", note: "Specific procedural rules apply" },
                    { doc: "Property Registration", valid: "DSC Required", note: "State registration office requirements" },
                  ].map(({ doc, valid, note }) => (
                    <tr key={doc} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{doc}</td>
                      <td className={`px-5 py-3.5 font-medium ${valid === "Yes" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>{valid}</td>
                      <td className="px-5 py-3.5 text-muted-foreground text-sm">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Common mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Signing PDFs Online</h2>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for Signing PDFs Like a Professional</h2>
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

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Pixocraft to Sign PDF Online?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% Private", desc: "Your PDF and signature never leave your browser. Processed entirely client-side using pdf-lib and PDF.js." },
                { icon: <Zap className="h-5 w-5 text-primary" />, title: "Under 60 Seconds", desc: "The fastest free PDF signing workflow available. No accounts, no verification emails, no waiting." },
                { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "India-Focused", desc: "Designed for GST invoices, Aadhaar documents, contracts, and HR workflows that Indian professionals use daily." },
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

          {/* Internal links */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Add Signature to PDF", href: "/tools/add-signature-to-pdf", desc: "Dedicated PDF signing tool — create, place, and download." },
                { label: "Transparent Signature PNG", href: "/tools/transparent-signature-png", desc: "Create a transparent background signature PNG to reuse anywhere." },
                { label: "Signature for Contracts", href: "/tools/signature-for-contracts", desc: "Create a professional signature specifically for contracts and NDAs." },
                { label: "Free Signature for Documents", href: "/tools/free-signature-for-documents", desc: "General-purpose digital signature for any document type." },
                { label: "Email Signature Maker", href: "/tools/email-signature-maker", desc: "Create an HTML email signature for your professional emails." },
                { label: "Signature Generator", href: "/tools/signature-generator", desc: "Full-featured signature pad — draw, type, or upload your signature." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
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
          <section className="rounded-xl border bg-primary/5 border-primary/20 px-6 py-8 text-center">
            <FileCheck className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Sign Your PDF?</h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              No login. No software. 100% private. Sign your PDF in under 60 seconds — free, forever.
            </p>
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-sign-pdf-final-cta">
              <FileCheck className="h-4 w-4" />Sign PDF Now Free<ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
