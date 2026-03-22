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
  Shield, Zap, Check, FileText, ChevronDown, ChevronUp,
  ArrowRight, Lock, AlertCircle, BadgeCheck, Download,
  Smartphone, Star, PenTool, Receipt, Scale, Users,
  Building2, CreditCard, Globe, FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/indian-digital-signature";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const FAQS = [
  {
    question: "Is digital signature legal in India?",
    answer:
      "Yes — completely legal. The Information Technology Act 2000 (Section 3A, amended 2008) provides the full legal framework for electronic and digital signatures in India. An image-based PNG digital signature is legally valid for commercial contracts, GST invoices, NDAs, employment letters, and most business documents. Courts across India have upheld electronically executed commercial agreements under the combined IT Act 2000 and Indian Contract Act 1872 framework.",
  },
  {
    question: "Do I need a DSC (Digital Signature Certificate) for everyday business in India?",
    answer:
      "Not for most everyday documents. A DSC (Class 3 Digital Signature Certificate) is required only for specific regulated filings: MCA ROC company registration and annual filings, court e-filing via eCourts, income tax portal e-verification (ITR filing), and specific government tender portals. For all other documents — GST invoices, commercial contracts, NDAs, freelance agreements, employment letters — a PNG image digital signature is legally sufficient under the IT Act 2000.",
  },
  {
    question: "Can I use this digital signature for GST invoices in India?",
    answer:
      "Yes. CBIC guidelines for GST invoices require the authorised signatory's signature. They do not specify a particular format. A transparent PNG signature inserted into your GST invoice template — in TallyPrime, Zoho Books, ClearTax, or any billing software — satisfies this requirement for manually generated B2B and B2C invoices under CGST Act 2017.",
  },
  {
    question: "What is an Aadhaar digital signature and how is it different from this tool?",
    answer:
      "Aadhaar-based eSign is a government service that uses your Aadhaar number and OTP to verify and attach a certified electronic signature to documents — primarily used for regulated transactions like Aadhaar-based loan agreements, government scheme enrollments, and enterprise eSign workflows. This Pixocraft tool creates a PNG image signature — simpler, faster, free, and sufficient for most commercial business documents without Aadhaar verification.",
  },
  {
    question: "How do I create a digital signature in India for free?",
    answer:
      "Open Pixocraft's free Indian digital signature tool on this page. Choose Draw (sign with mouse or finger), Type (pick from 50+ handwriting fonts), or Upload (digitise an existing physical signature). Customise the ink colour and stroke width. Click 'Download Signature' — your transparent PNG saves instantly to your device. Total time: under 60 seconds. No login, no payment, no software required.",
  },
  {
    question: "Is this Indian digital signature tool compliant with IT Act 2000?",
    answer:
      "Yes. The PNG image-based electronic signature created by this tool constitutes a Simple Electronic Signature (SES) under the IT Act 2000 framework — legally recognised for commercial contracts, GST documents, and most business transactions. The tool is built for Indian business users with specific support for GST invoice workflows and contract signing use cases.",
  },
  {
    question: "Can I use this digital signature on government documents in India?",
    answer:
      "For most commercial and semi-official documents — GST invoices, partnership deeds, service agreements, shop act registrations — yes. For documents submitted to government portals that require DSC authentication (like MCA21, TRACES, income tax e-filing portal), a Class 3 DSC is required and this PNG signature is not sufficient. Check the specific portal's requirements before submitting signed documents.",
  },
  {
    question: "Which Indian businesses use digital signatures most?",
    answer:
      "GST-registered businesses use digital signatures on every invoice. CAs and tax professionals use them on client letters and tax documents. Freelancers and consultants use them on project contracts and SOWs. HR teams use them on offer letters and employment contracts. Law firms use them on NDAs, agreements, and retainer contracts. Real estate agents use them on rental agreements and sale correspondence.",
  },
  {
    question: "What is the best format for an Indian digital signature?",
    answer:
      "Transparent PNG is the universally recommended format for Indian business use. PNG supports transparency — your signature overlays cleanly on any GST invoice template, contract background, or document format without a visible white box. JPG does not support transparency. Always download and save as PNG.",
  },
  {
    question: "Is this digital signature tool private and secure for Indian users?",
    answer:
      "Completely private and secure. All processing runs 100% inside your browser using the HTML5 Canvas API. No signature data, no document content, and no personal information is ever uploaded to any server or stored anywhere. This is especially important for Indian businesses handling sensitive GST data, client contracts, and financial documents.",
  },
  {
    question: "Can I use this on mobile in India?",
    answer:
      "Yes. The Draw tab is fully touch-optimised for all Android and iOS devices. Many Indian business users — field agents, freelancers, CA assistants — create and insert signatures from their smartphones. Open this page in Chrome or any browser on your phone, draw with your finger, and download the PNG directly to your device.",
  },
  {
    question: "How is a PNG digital signature different from a DSC in India?",
    answer:
      "A PNG digital signature is a high-resolution transparent image of your handwritten or typed signature — free, instant, and used for everyday commercial documents. A DSC (Digital Signature Certificate) is a cryptographic token issued by a licensed Certifying Authority (CA) under the IT Act 2000 — required for MCA portal, eCourts, and income tax e-verification. Both are legal. Choose based on the specific document requirement.",
  },
];

const HOW_TO_STEPS = [
  { n: 1, title: "Open the Indian digital signature tool", desc: "Scroll to the tool below — no login, no account, no software needed. Works in any browser on desktop or mobile." },
  { n: 2, title: "Create your signature",                  desc: "Draw with mouse or finger, type your name in a professional handwriting font, or upload an existing physical signature image." },
  { n: 3, title: "Customise for Indian documents",         desc: "Set ink colour to black or dark navy — standard for GST invoices, contracts, and legal documents in India. Adjust stroke width to 2–3 px." },
  { n: 4, title: "Download as transparent PNG",            desc: "Click 'Download Signature' — your IT Act 2000 compliant transparent PNG saves instantly to your device at print resolution." },
];

const COMPARISON = [
  { feature: "Cost",            png: "Free",                            esign: "Per-signature fee",              dsc: "₹1,000–₹3,000/year" },
  { feature: "Use case",        png: "GST, contracts, daily business",  esign: "Verified / regulated docs",      dsc: "MCA ROC, eCourts, ITR" },
  { feature: "IT Act 2000",     png: "SES — valid",                    esign: "AES — verified",                  dsc: "QES — certified" },
  { feature: "Setup time",      png: "Under 60 seconds",               esign: "Aadhaar OTP + account",          dsc: "1–3 working days (CA)" },
  { feature: "Hardware",        png: "None",                           esign: "Aadhaar & phone OTP",            dsc: "USB token (some cases)" },
  { feature: "Privacy",         png: "100% local browser",             esign: "UIDAI-managed",                   dsc: "CA-managed" },
  { feature: "Works on mobile", png: "Yes",                            esign: "Yes (Aadhaar OTP)",              dsc: "Limited" },
  { feature: "Best for",        png: "All Indian businesses & MSMEs",  esign: "Enterprise, loan, KYC",          dsc: "Regulated govt filings" },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,    title: "GST Invoices",                 desc: "Sign GST tax invoices in TallyPrime, Zoho Books, ClearTax, and any billing software. Transparent PNG overlays on any invoice format — B2B, B2C, export." },
  { icon: <FileText className="h-5 w-5 text-primary" />,   title: "Aadhaar-Linked Forms",        desc: "Forms and declarations linked to Aadhaar that don't require Aadhaar-based eSign — consent forms, KYC declarations, bank account linking forms." },
  { icon: <Scale className="h-5 w-5 text-primary" />,      title: "Contracts & Agreements",       desc: "NDAs, service agreements, partnership deeds, and commercial contracts. Legally valid under IT Act 2000 and Indian Contract Act 1872." },
  { icon: <Building2 className="h-5 w-5 text-primary" />,  title: "Company & MCA Documents",     desc: "Internal company documents, board resolutions, shareholder agreements, and MoUs — excluding regulated MCA portal filings which require DSC." },
  { icon: <CreditCard className="h-5 w-5 text-primary" />, title: "Bank & Financial Documents",  desc: "Loan applications, account opening forms, investment instructions, and financial declarations where a self-attested digital signature is acceptable." },
  { icon: <Users className="h-5 w-5 text-primary" />,      title: "HR & Employment",             desc: "Offer letters, appointment letters, employment contracts, and policy acknowledgements for paperless Indian HR workflows." },
];

const MISTAKES = [
  { title: "Using JPG instead of transparent PNG", body: "JPG has no transparency support and creates a white box around the signature when placed on any non-white invoice or document background. Always use transparent PNG — Pixocraft exports this by default." },
  { title: "Using a different signature on each document", body: "Inconsistent signatures across GST invoices, contracts, and forms can raise authentication questions during audits or legal disputes. Create one PNG from Pixocraft and reuse the exact same file on every document." },
  { title: "Low-quality or blurry signature", body: "A pixelated or overly thin signature looks unprofessional — particularly on GST invoices sent to clients and on contracts scrutinised by legal teams. Pixocraft exports at 3200 px resolution to ensure professional quality at every size." },
  { title: "Assuming all documents accept PNG signatures", body: "MCA ROC filings, eCourt submissions, income tax portal e-verification, and some government tender portals require a Class 3 DSC — a PNG image signature is not accepted for these. Always verify the specific portal's requirements." },
];

const PRO_TIPS = [
  { title: "Use PNG format for every Indian business document", body: "Transparent PNG works on GST invoices, Word documents, PDF contracts, and Excel sheets. Create your PNG once from Pixocraft and this single file works across your entire document workflow." },
  { title: "Black or dark navy ink for official documents", body: "Black (#000000) and dark navy (#1a1a2e) are standard for Indian business and government documents. These reproduce clearly in both digital viewing and print — important for documents shared with GST authorities, banks, and legal counterparties." },
  { title: "Keep one consistent signature for all documents", body: "Your digital signature should look identical on every GST invoice, contract, and form. Create one high-quality PNG and save it permanently. Consistency is both professionally important and legally significant." },
  { title: "Test before using on live documents", body: "After creating your PNG, insert it into a test version of your GST invoice template or contract PDF before using it on live documents. Verify the transparent background overlays cleanly and the size is appropriate." },
  { title: "Backup to both phone and laptop", body: "Indian business users often need to sign documents from multiple devices — phone during client visits, laptop for formal documents. Store your PNG in Google Drive or any cloud storage accessible from all your devices." },
];

export default function IndianDigitalSignature() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Indian Digital Signature Free – IT Act Compliant Online | Pixocraft",
    description:
      "Create Indian digital signature online free. IT Act 2000 compliant, works for GST, Aadhaar and contracts. No signup required, 100% private, instant PNG download.",
    keywords:
      "indian digital signature, free indian digital signature, digital signature india, india it act digital signature, gst digital signature india, digital signature for aadhaar, how to create digital signature in india free, is digital signature legal in india",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Indian Digital Signature – Pixocraft",
    description:
      "Create a free Indian digital signature online. IT Act 2000 compliant — works for GST invoices, Aadhaar forms, contracts, and business documents. No login, 100% private, instant transparent PNG download.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "INR" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                      url: "https://tools.pixocraft.in/" },
    { name: "Tools",                     url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "Indian Digital Signature",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Indian Digital Signature Free – IT Act Compliant Online | Pixocraft",
    description:
      "Create Indian digital signature online free. IT Act 2000 compliant, works for GST, Aadhaar and contracts. No signup required, 100% private, instant PNG download.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create Indian Digital Signature Online Free",
    description:
      "Create a legally valid Indian digital signature compliant with IT Act 2000 in under 60 seconds. Transparent PNG ready for GST invoices, contracts, and all Indian business documents.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.desc })),
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={generateFAQSchema(FAQS)} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-5 sm:py-8">
        <Breadcrumb items={[
          { label: "Home",                     url: "https://tools.pixocraft.in/" },
          { label: "Tools",                    url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Indian Digital Signature" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Indian Digital Signature Free – IT Act 2000 Compliant
              </h1>
              <p className="text-sm text-muted-foreground">IT Act 2000 · GST &amp; Aadhaar Ready · Made in India · No Signup · 100% Private</p>
            </div>
          </div>

          <p className="hidden sm:block text-base text-muted-foreground mb-5 leading-relaxed">
            Create a <strong>legally valid Indian digital signature</strong> in seconds. Fully compliant with
            <strong> IT Act 2000</strong> and accepted for GST invoices, Aadhaar-linked forms, business contracts,
            and government documents across India. No login. 100% private. Instant transparent PNG download.
          </p>

          {/* Trust bar */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-5">
            {[
              { icon: <BadgeCheck className="h-3.5 w-3.5" />,  label: "IT Act 2000 Compliant" },
              { icon: <Receipt className="h-3.5 w-3.5" />,     label: "GST & Aadhaar Ready" },
              { icon: <Star className="h-3.5 w-3.5" />,        label: "Made in India Tool" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup Required" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground"
              >
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Action flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {[
              { n: 1, label: "Create Signature" },
              { n: 2, label: "Download PNG" },
              { n: 3, label: "Use in GST / Contracts" },
              { n: 4, label: "Done" },
            ].map(({ n, label }) => (
              <div key={n} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{n}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* E-E-A-T micro-trust */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { icon: <Users className="h-3.5 w-3.5 text-primary" />,   label: "Used by Indian businesses & CAs" },
              { icon: <Receipt className="h-3.5 w-3.5 text-primary" />, label: "Works with GST, Tally & government portals" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />,  label: "No data stored in servers" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                {icon}{label}
              </div>
            ))}
          </div>

          <div className="flex justify-center sm:justify-start">
            <Button
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2"
              data-testid="button-create-indian-signature"
            >
              <PenTool className="h-4 w-4" />Create Indian Digital Signature<ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <SignatureToolSection />

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* What is */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What Is an Indian Digital Signature?</h2>
            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 mb-5">
              <p className="text-foreground font-medium">
                An <strong>Indian digital signature</strong> is an electronic authentication mark used by Indian businesses,
                professionals, and government entities to verify the identity of the signatory and confirm their intent to
                be bound by a document. In everyday Indian business use, it refers to a transparent PNG image of the
                signatory's handwritten or typed signature — compliant with the IT Act 2000 and accepted for GST invoices,
                commercial contracts, and most business documents.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The <strong>digital authentication</strong> framework in India is established by the Information Technology
              Act 2000 — the primary legislation governing electronic commerce, digital signatures, and electronic records
              in India. The IT Act 2000, amended in 2008, introduced provisions for <strong>electronic verification</strong>
              of documents and contracts, making digitally signed business documents legally equivalent to paper-signed ones
              for most commercial transactions.
            </p>
            <p className="text-muted-foreground mb-4">
              <strong>Indian compliance</strong> requirements for digital signatures vary by document type. For routine
              business documents — GST invoices, commercial contracts, service agreements, employment letters — an
              image-based Simple Electronic Signature (SES) is legally sufficient. For regulated government portal
              submissions — MCA ROC, eCourts, income tax e-verification — a Class 3 DSC from a licensed CA is required.
            </p>
            <p className="text-muted-foreground">
              Pixocraft's free <strong>Indian digital signature</strong> tool is built specifically for Indian business
              workflows — with support for GST invoice signing, contract execution, and all document types used daily
              by Indian businesses, MSMEs, CAs, freelancers, and professionals.
            </p>
          </section>

          {/* Comparison */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Digital Signature vs DSC vs eSign in India</h2>
            <p className="text-muted-foreground mb-5">
              Three types of digital signature solutions are used across Indian business and government workflows —
              each with distinct legal standing, cost, and use cases:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">PNG Signature (This Tool)</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">eSign (Aadhaar OTP)</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">DSC (Class 3)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {COMPARISON.map(({ feature, png, esign, dsc }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-4 py-3.5 text-primary/80 font-medium">{png}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{esign}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{dsc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 text-sm">
              <strong className="flex items-center gap-1.5 mb-1 text-foreground"><BadgeCheck className="h-4 w-4 text-primary" />For most Indian businesses:</strong>
              <p className="text-muted-foreground leading-relaxed">
                A PNG signature from Pixocraft covers 95% of everyday Indian business document needs — GST invoices,
                contracts, NDAs, employment letters, and forms. It is free, instant, and IT Act 2000 compliant.
                DSC and eSign are needed only for specific regulated workflows.
              </p>
            </div>
          </section>

          {/* How to create */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Create Indian Digital Signature Online Free</h2>
            <p className="text-muted-foreground mb-5">Four steps — under 60 seconds — to your IT Act 2000 compliant Indian digital signature:</p>
            <ol className="space-y-3 mb-5">
              {HOW_TO_STEPS.map(({ n, title, desc }) => (
                <li key={n} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <span className="shrink-0 h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{n}</span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Step {n}: {title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
                <PenTool className="h-4 w-4" />Create Indian Digital Signature<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Features Built for Indian Digital Signature Needs</h2>
            <p className="text-muted-foreground mb-5">Every feature designed for Indian business document workflows:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "IT Act 2000 compliant",    desc: "PNG image signatures are recognised under IT Act 2000 as Simple Electronic Signatures (SES) for commercial contracts and GST documents." },
                { icon: <Download className="h-5 w-5 text-primary" />,  title: "Transparent PNG export",   desc: "Clean overlay on any GST invoice, contract, or form background — no white box on coloured or watermarked templates." },
                { icon: <Star className="h-5 w-5 text-primary" />,      title: "50+ handwriting fonts",    desc: "Type your name in one of 50+ Google handwriting fonts for a consistent, professional result — identical across all documents." },
                { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "Mobile-first for India",  desc: "Fully touch-optimised for Android and iOS. Indian field workers, CAs, and freelancers create and insert signatures from their phones." },
                { icon: <Zap className="h-5 w-5 text-primary" />,       title: "Under 60 seconds",         desc: "No account, no payment, no wait. Faster than any other Indian digital signature solution — no DSC tokens, no Aadhaar OTP." },
                { icon: <Shield className="h-5 w-5 text-primary" />,    title: "100% browser-local",       desc: "Your signature and document data never leave your device. Critical for Indian businesses handling GST data and sensitive contracts." },
                { icon: <FileCheck className="h-5 w-5 text-primary" />, title: "GST invoice ready",        desc: "Designed specifically for Indian invoice workflows — works in TallyPrime, Zoho Books, ClearTax, and all major GST billing tools." },
                { icon: <Lock className="h-5 w-5 text-primary" />,      title: "No signup, ever",          desc: "Unlike many Indian signature services, Pixocraft requires zero account creation, zero OTP verification, and zero personal data." },
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

          {/* Use Cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Indian Digital Signature Use Cases — Who Uses It</h2>
            <p className="text-muted-foreground mb-5">Every Indian business professional needs a reliable digital signature solution:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
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

          {/* Legal Validity */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Is Indian Digital Signature Legally Valid? — IT Act 2000 Framework</h2>
            <p className="text-muted-foreground mb-5">Complete legal framework for digital signatures in India:</p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "IT Act 2000 — Section 3A (Electronic Signature)",
                  body: "The Information Technology Act 2000 (Section 3A, inserted by the IT Amendment Act 2008) specifically recognises electronic signatures for commercial transactions. A PNG image signature constitutes a Simple Electronic Signature (SES) — legally valid for contracts, GST invoices, NDAs, employment letters, and most commercial documents where the parties are consenting adults with legal capacity.",
                },
                {
                  title: "IT Act 2000 — 2008 Amendment",
                  body: "The 2008 amendment to the IT Act expanded the recognition of electronic signatures beyond DSC to cover a wider range of electronic authentication methods — enabling the current framework where image-based signatures are legally valid for most commercial purposes. It also introduced Section 43A (data protection) and reinforced data privacy obligations — which Pixocraft satisfies by processing all data locally.",
                },
                {
                  title: "GST Acceptance — CBIC Guidelines",
                  body: "Under the CGST Act 2017 and CBIC guidelines for GST invoice generation, the authorised signatory must sign each invoice. These guidelines do not specify a physical ink-only requirement — a digital PNG signature embedded in the invoice satisfies the signature requirement for manually generated GST invoices in Tally, Zoho Books, ClearTax, and similar platforms.",
                },
                {
                  title: "MCA and Government Portals — DSC Required",
                  body: "For MCA21 (company registration and ROC filings), eCourts (judicial e-filing), income tax portal (ITR e-verification with DSC), and specific government tender portals, a Class 3 DSC from a licensed Certifying Authority is mandatory. A PNG image signature is not accepted for these specific regulated use cases.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary" />{title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" />Consult a professional:</strong>
              For documents with significant legal or financial consequences — company registration, court filings, large-value contracts — consult a CA or legal professional about the appropriate signature method. This tool is best suited for everyday commercial Indian business documents.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Common Mistakes Indian Users Make with Digital Signatures</h2>
            <p className="text-muted-foreground mb-5">Avoid these errors to ensure your Indian digital signature is professional and legally sound:</p>
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

          {/* Pro Tips */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pro Tips for Indian Digital Signature Users</h2>
            <p className="text-muted-foreground mb-5">Best practices from Indian CAs, freelancers, and business professionals:</p>
            <div className="space-y-3">
              {PRO_TIPS.map(({ title, body }) => (
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

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why Pixocraft for Indian Digital Signature?</h2>
            <p className="text-muted-foreground mb-5">India-first design for Indian business needs:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Globe className="h-4 w-4 text-primary" />,      title: "India-first tool",             body: "Built specifically for Indian GST workflows, IT Act compliance, and the document types used daily by Indian businesses and professionals." },
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "60-second workflow",           body: "Faster than DSC procurement (days) and eSign account setup (hours). Open, create, download — under 60 seconds from start to finish." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private",                 body: "No UIDAI data, no CA server, no third party. All processing is browser-local — critical for Indian businesses handling sensitive GST and contract data." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "IT Act 2000 compliant",        body: "Output is a Simple Electronic Signature (SES) under IT Act 2000 — legally valid for commercial documents across India." },
                { icon: <Receipt className="h-4 w-4 text-primary" />,    title: "GST ready",                    body: "Transparent PNG works seamlessly in TallyPrime, Zoho Books, ClearTax, Vyapar, and every major Indian GST billing tool." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "100% free forever",            body: "No subscription, no per-document charge, no watermark. Unlike paid DSC or per-use eSign services — completely free for every Indian user." },
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
                data-testid="button-why-cta"
              >
                <PenTool className="h-4 w-4" />Create Indian Digital Signature Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Complete Indian Document Signing Workflow — Related Tools</h2>
            <p className="text-muted-foreground mb-4">After creating your Indian digital signature, use these tools to complete your document workflow:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/gst-invoice-signature",                   label: "GST Invoice Signature",         desc: "Signature for TallyPrime, Zoho Books, ClearTax, and GST invoices." },
                { href: "/tools/signature-for-contracts",                  label: "Signature for Contracts",       desc: "Legally valid signature for NDAs and Indian business contracts." },
                { href: "/tools/add-signature-to-pdf",                    label: "Add Signature to PDF",          desc: "Insert your digital signature directly into any PDF document." },
                { href: "/tools/email-signature-maker",                   label: "Email Signature Maker",         desc: "Professional email signature for Gmail and Outlook." },
                { href: "/tools/transparent-signature-png",               label: "Transparent Signature PNG",     desc: "Perfect transparent background for any Indian document format." },
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5">Frequently Asked Questions — Indian Digital Signature</h2>
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
          </section>

        </div>
      </div>
    </>
  );
}
