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
  Receipt, Smartphone, Star, Building2, FileCheck, Users,
  Banknote, Truck, PenTool, IndianRupee, Package, Briefcase,
  LayoutGrid, Printer, Mail, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-for-gst-invoice";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-generator";
const LAST_UPDATED = "March 2026";

const FAQS = [
  {
    question: "What signature is required for a GST invoice?",
    answer:
      "A GST invoice must carry the signature or digital signature of the authorised signatory as per Rule 46 of the CGST Rules, 2017. For manually generated invoices and PDF invoices, a transparent PNG image of your handwritten signature is fully accepted by buyers, Chartered Accountants, and auditors. A Class 3 DSC is only mandatory for filing returns on the GST portal (GSTR-1, GSTR-3B, etc.) — not for the printed or PDF invoice itself.",
  },
  {
    question: "Is an image-based signature valid on a GST invoice?",
    answer:
      "Yes. CBIC guidelines do not mandate a cryptographic DSC on the physical or PDF copy of a GST invoice. A transparent PNG signature embedded in your invoice template (in Tally, Zoho Books, QuickBooks, or a PDF editor) is legally valid for B2B invoices, B2C invoices, e-way bills, delivery challans, and credit notes.",
  },
  {
    question: "What is the ideal signature size for a GST invoice?",
    answer:
      "The recommended size is 800×300 px at 300 DPI as a transparent PNG. This ensures the signature is sharp when printed on A4 (which is the standard GST invoice paper size in India) and looks clean on-screen. Pixocraft exports at 3200×1040 px (4× scale) so it remains crisp at any print size.",
  },
  {
    question: "How do I add my signature to a GST invoice in TallyPrime?",
    answer:
      "Download your signature as a transparent PNG from Pixocraft. In TallyPrime, go to Company Features → Printing → Configure Invoice Printing → Insert Image → select your PNG. Position it over the 'Authorised Signatory' field and save. All future invoices from that company will carry your signature automatically.",
  },
  {
    question: "How do I add my signature to a GST invoice in Zoho Books?",
    answer:
      "In Zoho Books, go to Settings → Templates → select your Invoice template → Edit → drag an Image block to the signature area → upload your transparent PNG. Save the template. Every invoice sent will carry your signature automatically.",
  },
  {
    question: "Can I use the same PNG signature for all my GST invoices?",
    answer:
      "Yes — and you should. Download your PNG once, save it securely, and reuse it across all invoices, e-way bills, delivery challans, credit notes, and debit notes. Consistency in signature presentation is professionally and legally sound. Many CAs recommend using the exact same image across all documents.",
  },
  {
    question: "Do I need a DSC for every GST invoice?",
    answer:
      "No. A Class 3 DSC is only required for portal-based submissions: GSTR-1, GSTR-3B, GSTR-9 e-filing, and e-invoicing IRN generation. For the physical or PDF copy of the invoice itself — which is what you give to your buyer — an image-based signature is sufficient.",
  },
  {
    question: "Is Pixocraft's GST signature tool completely free?",
    answer:
      "Yes — 100% free, forever. No login, no subscription, no watermark on the downloaded file. Create and download unlimited high-resolution GST invoice signatures at no cost.",
  },
  {
    question: "Does the tool work with Tally, Marg, and other billing software?",
    answer:
      "Yes. Any software that supports inserting a PNG image into an invoice template works with Pixocraft's signature. This includes TallyPrime, Marg ERP, QuickBooks India, Zoho Books, Vyapar, Busy Accounting, FocusLyte, and any PDF editor.",
  },
  {
    question: "Can I sign a GST invoice PDF directly?",
    answer:
      "Yes. Download your transparent PNG from Pixocraft, then open your GST invoice PDF in Adobe Acrobat, Foxit, or Pixocraft's own Add Signature to PDF tool. Use 'Insert Image' or 'Stamp' to place your signature over the Authorised Signatory line and save the signed PDF.",
  },
  {
    question: "Is my signature data stored on Pixocraft's servers?",
    answer:
      "No. The entire tool runs inside your browser using HTML5 Canvas. Nothing is uploaded to any server. Your signature stays completely private on your own device.",
  },
  {
    question: "What is the difference between DSC and an image signature for GST?",
    answer:
      "An image signature (PNG) is a visual representation of your handwriting embedded in the invoice — it is sufficient for the printed/PDF copy you give your buyer. A DSC (Digital Signature Certificate) is a cryptographic certificate issued by a licensed CA, required for portal-based e-filings (GSTR-1, GSTR-3B). Most small businesses only need the image signature; DSC is needed only for portal submissions.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Open the Signature Tool",
    text: "Click any of the tool buttons on this page to open Pixocraft's free signature maker — no login or signup required.",
  },
  {
    name: "Choose Your Method",
    text: "Select Draw (sign with mouse or finger), Type (choose from 50+ handwritten fonts), or Upload (digitise your existing signature).",
  },
  {
    name: "Customise Ink & Size",
    text: "Pick black or dark blue ink — these are standard for GST invoices. Adjust stroke width for clarity when printed on A4.",
  },
  {
    name: "Download as Transparent PNG",
    text: "Click Download → PNG. The transparent background ensures your signature blends cleanly onto any invoice colour or background.",
  },
  {
    name: "Insert into Your Invoice Template",
    text: "In TallyPrime, Zoho Books, Vyapar, or any PDF editor, insert the PNG image over the 'Authorised Signatory' field. Save your template once — all future invoices carry it automatically.",
  },
];

export default function SignatureForGstInvoice() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature for GST Invoice – Create & Download PNG (Free, No Signup)",
    description:
      "Create signature for GST invoice online free. Download transparent PNG and use in Tally, Zoho Books, or PDF invoices. No login, 100% private, GST-compliant.",
    canonical: CANONICAL,
    ogTitle: "Signature for GST Invoice – Free PNG Download | Pixocraft",
    ogDescription:
      "Create a transparent PNG signature for your GST invoices in seconds. Works with TallyPrime, Zoho Books, Vyapar, Marg ERP, and any PDF editor. No login, no watermark.",
    keywords:
      "signature for gst invoice, gst invoice signature size, how to add signature in gst invoice, digital signature for gst invoice, authorised signatory signature gst",
  });

  const schemas = [
    generateFAQSchema(FAQS),
    generateHowToSchema({
      name: "How to Create a Signature for GST Invoice",
      description:
        "Step-by-step guide to creating and adding a signature to your GST invoice using Pixocraft's free online tool.",
      totalTime: "PT2M",
      steps: HOWTO_STEPS,
    }),
    generateSoftwareApplicationSchema({
      name: "Pixocraft Signature for GST Invoice",
      description:
        "Free online tool to create an authorised signatory signature for GST invoices. Exports as transparent PNG — no login, works with TallyPrime, Zoho Books, and all PDF editors.",
      url: CANONICAL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (browser-based)",
      price: "0",
      rating: { value: "4.9", count: "3100" },
    }),
    generateBreadcrumbSchema([
      { name: "Home", url: "https://tools.pixocraft.in/" },
      { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
      { name: "Signature for GST Invoice", url: CANONICAL },
    ]),
    generateWebPageSchema({
      name: "Signature for GST Invoice – Create & Download PNG (Free, No Signup)",
      description:
        "Create signature for GST invoice online free. Download transparent PNG and use in Tally, Zoho Books, or PDF invoices. No login, 100% private.",
      url: CANONICAL,
      lastModified: LAST_UPDATED,
    }),
  ];

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, i) => (
        <StructuredData key={i} schema={schema} />
      ))}

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Generator", url: "/tools/signature-generator" },
            { label: "Signature for GST Invoice" },
          ]}
        />

        {/* ── HERO ────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
            Signature for GST Invoice –{" "}
            <span className="text-primary">Create &amp; Download PNG</span>{" "}
            (Free, No Signup)
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Create your authorised signatory signature online and add it to GST invoices in
            TallyPrime, Zoho Books, Vyapar, Marg ERP, or any PDF — in under 2 minutes. 100%
            free, no login, no watermark.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <Lock className="h-3.5 w-3.5" />, label: "No Signup" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "GST Ready" },
              { icon: <Download className="h-3.5 w-3.5" />, label: "Transparent PNG" },
              { icon: <Receipt className="h-3.5 w-3.5" />, label: "Works with Tally &amp; Zoho" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "100% Private" },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Instant Download" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800"
              >
                {icon}
                <span dangerouslySetInnerHTML={{ __html: label }} />
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURED SNIPPET ────────────────────────────────────────────── */}
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 px-6 py-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quick Answer</p>
          <h2 className="text-lg font-bold text-foreground">What signature is required for a GST invoice?</h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            As per <strong>Rule 46 of the CGST Rules, 2017</strong>, a GST invoice must include the
            <strong> signature or digital signature of the authorised signatory</strong>. For printed
            and PDF invoices, a <strong>transparent PNG image of your handwritten signature</strong> is
            fully accepted. A <strong>Class 3 DSC</strong> is only required for portal-based
            submissions (GSTR-1, GSTR-3B filings on the GST portal) — not for the invoice document
            itself given to your buyer.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              { label: "Format",         value: "Transparent PNG" },
              { label: "Recommended Size", value: "800 × 300 px" },
              { label: "Colour",         value: "Black or Dark Blue" },
              { label: "Required On",    value: "Every GST invoice" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-background border p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                <p className="font-semibold text-foreground text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL ────────────────────────────────────────────────────────── */}
        <SignatureToolSection mode="draw" caption="No watermark · Transparent PNG · Works with Tally, Zoho & all PDF editors" />

        {/* ── IDEAL SIGNATURE SIZE ────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Signature Size for GST Invoice (Best Dimensions)
            </h2>
            <p className="text-muted-foreground">
              The right size ensures your signature is sharp when printed on A4 paper and clean in
              email-delivered PDF invoices.
            </p>
          </div>

          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 px-6 py-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              The ideal signature size for GST invoices is between <strong>150 px to 300 px width</strong> on-screen,
              with a <strong>transparent PNG format</strong>. This ensures clarity in printed invoices and
              digital documents. Pixocraft exports at <strong>3200 × 1040 px (4× scale)</strong> which
              remains perfectly crisp at any print or display size.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm min-w-[460px]">
              <thead>
                <tr className="bg-primary/5 border-b">
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Specification</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Recommended Value</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Canvas Dimensions",   "800 × 300 px",           "Landscape proportion matches signature lines on A4 invoices"],
                  ["Export Resolution",   "300 DPI equivalent",     "Sharp in print; avoids pixelation in PDF previews"],
                  ["File Format",         "Transparent PNG",        "Blends cleanly on any invoice background colour"],
                  ["Colour",             "Black or Dark Blue ink",  "Universally accepted in GST audit and legal contexts"],
                  ["Stroke Width",        "3–5 px",                 "Thick enough to remain visible when signature is scaled small"],
                  ["Pixocraft Export",    "3200 × 1040 px (4×)",    "4× scale ensures sharpness at every print and screen size"],
                ].map(([spec, val, why]) => (
                  <tr key={spec} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-foreground">{spec}</td>
                    <td className="px-5 py-3.5 text-primary font-semibold">{val}</td>
                    <td className="px-5 py-3.5 text-muted-foreground">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── GST REQUIREMENTS ────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">GST Invoice Signature Requirements</h2>
            <p className="text-muted-foreground">
              Here is everything the law and CBIC guidelines say about signatures on GST invoices.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <FileCheck className="h-5 w-5 text-primary" />,
                title: "Where to Place the Signature",
                body: "The authorised signatory's signature must appear at the bottom of the invoice — typically in a labelled 'Authorised Signatory' or 'Authorised Person' section. This applies to B2B tax invoices, B2C receipts, e-way bills, delivery challans, credit notes, and debit notes.",
              },
              {
                icon: <Receipt className="h-5 w-5 text-primary" />,
                title: "Who is the Authorised Signatory?",
                body: "The authorised signatory is the person registered on the GST portal to sign documents on behalf of the business — typically the proprietor, a partner, or a director. The same person's image signature should be used consistently across all documents.",
              },
              {
                icon: <BadgeCheck className="h-5 w-5 text-primary" />,
                title: "DSC vs Image Signature",
                body: "A Class 3 DSC is mandatory only for filing returns on the GST portal. For the invoice document itself — whether printed, PDF, or emailed — an image-based PNG signature fully satisfies Rule 46 requirements.",
              },
              {
                icon: <Printer className="h-5 w-5 text-primary" />,
                title: "E-Invoicing (IRN) Note",
                body: "If your turnover crosses the e-invoicing threshold (₹5 crore as of FY2023-24), your invoice must be registered on the IRP/NIC portal. The QR code and IRN replace the need for a physical signature on the registered copy — but the copy given to the buyer can still carry your image signature.",
              },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <div className="space-y-1.5">
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW TO ADD SIGNATURE TO GST INVOICE ─────────────────────────── */}
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              How to Add Signature in GST Invoice
            </h2>
            <p className="text-muted-foreground">
              Step-by-step instructions for the most popular Indian billing software and PDF tools.
            </p>
          </div>

          {/* TallyPrime */}
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b bg-muted/30">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <LayoutGrid className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">TallyPrime / Tally ERP 9</p>
                <p className="text-xs text-muted-foreground">Most popular billing software in India</p>
              </div>
            </div>
            <ol className="p-5 space-y-3">
              {[
                "Download your signature as a transparent PNG from Pixocraft.",
                "Open TallyPrime → Gateway of Tally → F11: Features → Printing.",
                "Enable 'Print Company Logo / Image' and set it to your PNG file path.",
                "Alternatively, go to Print Invoice Preview → Insert Image → position over the 'Authorised Signatory' field.",
                "Save the configuration. All future invoices from this company will include your signature automatically.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Zoho Books */}
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b bg-muted/30">
              <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Zoho Books / Zoho Invoice</p>
                <p className="text-xs text-muted-foreground">Cloud-based GST billing</p>
              </div>
            </div>
            <ol className="p-5 space-y-3">
              {[
                "Download your transparent PNG from Pixocraft.",
                "Go to Zoho Books → Settings → Templates → select your Invoice template.",
                "Click Edit → drag an Image block to the bottom of the template.",
                "Upload your PNG and label it 'Authorised Signatory'.",
                "Save the template. All invoices sent from Zoho Books will carry your signature.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 h-7 w-7 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* PDF Invoice */}
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b bg-muted/30">
              <div className="h-9 w-9 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="font-semibold text-foreground">PDF Invoice (Acrobat / Pixocraft PDF tool)</p>
                <p className="text-xs text-muted-foreground">For invoices sent as PDF attachments</p>
              </div>
            </div>
            <ol className="p-5 space-y-3">
              {[
                "Download your transparent PNG from Pixocraft.",
                "Open your PDF invoice in Adobe Acrobat, Foxit Reader, or Pixocraft's Add Signature to PDF tool.",
                "Use 'Edit PDF' → 'Add Image' (Acrobat) or 'Insert Stamp/Image' (Foxit) to place the PNG.",
                "Resize and position over the 'Authorised Signatory' line.",
                "Save as PDF. Send to your buyer — the signature appears on every copy.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 h-7 w-7 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
            <div className="px-5 pb-4">
              <Link href="/tools/add-signature-to-pdf">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowRight className="h-3.5 w-3.5" /> Try Pixocraft's PDF Signature Tool
                </Button>
              </Link>
            </div>
          </div>

          {/* Other software */}
          <div className="rounded-xl border bg-card p-5 space-y-3">
            <p className="font-semibold text-foreground">Works with all billing software</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["Vyapar App", "Marg ERP", "Busy Accounting", "FocusLyte", "QuickBooks India", "Munim / Finaccle", "JustBharat", "Recon", "Any PDF Editor"].map((sw) => (
                <div key={sw} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-3.5 w-3.5 text-primary shrink-0" />{sw}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY USE DIGITAL SIGNATURE FOR GST ───────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Use a Digital Signature for GST Invoices</h2>
            <p className="text-muted-foreground">Moving from a wet signature to a reusable PNG takes 2 minutes — and saves hours every month.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <Zap className="h-5 w-5 text-primary" />, title: "Create Once, Use Forever", body: "Sign your PNG once and embed it in your TallyPrime or Zoho template. Every invoice auto-signs from that point — zero extra effort per invoice." },
              { icon: <Shield className="h-5 w-5 text-primary" />, title: "Consistent & Audit-Ready", body: "Your buyer's CA and your own CA both prefer the same clean signature across all documents. A PNG ensures perfect consistency — unlike wet signatures which vary each time." },
              { icon: <Printer className="h-5 w-5 text-primary" />, title: "No Printing Required", body: "Print-sign-scan workflows are slow and expensive. A transparent PNG can be embedded in any digital invoice in seconds, no physical paper required." },
              { icon: <IndianRupee className="h-5 w-5 text-primary" />, title: "100% Free vs Paid DSC", body: "A Class 3 DSC costs ₹1,000–₹3,000 per year and requires KYC. Pixocraft's PNG signature is free forever — and sufficient for all invoice signing needs." },
              { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "Works on Mobile", body: "Draw your signature on a smartphone or tablet. Perfect for business owners who manage invoices on the go using Vyapar or Zoho mobile apps." },
              { icon: <FileCheck className="h-5 w-5 text-primary" />, title: "GST Compliant", body: "Satisfies the Rule 46 requirement for authorised signatory on all types of GST documents: B2B tax invoices, B2C receipts, e-way bills, credit & debit notes." },
            ].map(({ icon, title, body }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <div className="space-y-1"><p className="font-semibold text-foreground">{title}</p><p className="text-sm text-muted-foreground leading-relaxed">{body}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SAVE & REUSE ─────────────────────────────────────────────────── */}
        <section className="rounded-xl border bg-primary/5 p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="shrink-0 h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Save Once — Sign 1,000 Invoices</h2>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                Download your signature PNG and save it to a secure folder (Google Drive, Dropbox, or local disk). The file
                is a permanent asset — use it across all your invoices, credit notes, e-way bills, quotations, and purchase orders.
                Pixocraft also offers in-browser history so you can re-download your last 12 saved signatures anytime.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: "3200 × 1040 px export", desc: "4× resolution — sharp at any print or screen size" },
              { title: "Transparent background", desc: "Sits cleanly on any invoice colour or template" },
              { title: "Unlimited reuse",         desc: "One download, thousands of invoices" },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-lg border bg-background p-3.5 space-y-1">
                <p className="font-semibold text-foreground text-sm">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LEGAL SECTION ────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Legal Validity of Digital Signature on GST Invoice</h2>
            <p className="text-muted-foreground">
              Is a PNG image signature on a GST invoice legal? Yes — here is the full legal basis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                flag: "🇮🇳",
                title: "CGST Rules, Rule 46",
                body: "Requires the 'signature or digital signature of the supplier or his authorised representative' on every tax invoice. Does not mandate DSC or specific format for the physical/PDF copy.",
              },
              {
                flag: "🏛",
                title: "IT Act 2000 (Amended 2008)",
                body: "Recognises electronic signatures as legally valid for most commercial transactions. A PNG image embedded in a GST invoice qualifies as a Simple Electronic Signature (SES) under this Act.",
              },
              {
                flag: "📋",
                title: "When DSC Is Required",
                body: "A Class 3 DSC is mandatory for GST portal filings (GSTR-1, GSTR-3B, GSTR-9), e-invoicing IRN submission, and certain government tender portals. It is NOT required for the invoice PDF you give your buyer.",
              },
              {
                flag: "✅",
                title: "CA & Audit Acceptance",
                body: "Chartered Accountants and GST auditors accept consistent image-based signatures on invoices. The key is consistency — use the same PNG for every document.",
              },
            ].map(({ flag, title, body }) => (
              <div key={title} className="rounded-xl border bg-card p-5 space-y-2">
                <p className="font-semibold text-foreground flex items-start gap-2">
                  <span className="text-lg leading-none">{flag}</span>{title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-primary/5 border-b">
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                  <th className="text-left px-5 py-3 font-semibold text-primary">PNG Image (Pixocraft)</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Wet Signature (Stamp)</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Class 3 DSC</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Cost",                     "Free",              "Negligible",       "₹1,000–₹3,000/yr"],
                  ["Setup Time",               "2 minutes",         "Instant",          "2–5 days (KYC)"],
                  ["Works on PDF Invoice",     "Yes",               "Print only",       "Portal only"],
                  ["Works with Tally / Zoho",  "Yes (template)",    "Manual per page",  "Not applicable"],
                  ["GST Portal Filing",        "Not applicable",    "Not applicable",   "Required"],
                  ["Consistency",              "Perfect every time","Varies",           "Cryptographic"],
                  ["Valid on Invoice Copy",    "Yes",               "Yes",              "Yes (irn copy)"],
                ].map(([feat, pixo, wet, dsc]) => (
                  <tr key={feat} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                    <td className="px-5 py-3 font-semibold text-primary">{pixo}</td>
                    <td className="px-5 py-3 text-muted-foreground">{wet}</td>
                    <td className="px-5 py-3 text-muted-foreground">{dsc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200 flex gap-3">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span><strong>Bottom line:</strong> For all GST invoice signing needs — B2B, B2C, delivery challans, credit notes — Pixocraft's free PNG is sufficient. Get a DSC only if your CA specifically requires it for GST portal submissions or government tender filings.</span>
          </div>
        </section>

        {/* ── COMMON MISTAKES ─────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes to Avoid</h2>
            <p className="text-muted-foreground">These errors can create problems during GST audits or buyer verification.</p>
          </div>
          <div className="space-y-3">
            {[
              { mistake: "Using JPG with white background",  fix: "Always use transparent PNG. A JPG places an ugly white box over coloured invoice templates, which looks unprofessional and may cause confusion." },
              { mistake: "Different signatures per invoice", fix: "Use the exact same PNG file every time. Inconsistent signatures raise red flags during audits and CA reviews." },
              { mistake: "Signature too small to read",      fix: "Keep the image at least 150 px wide on-screen. Pixocraft exports at 3200 px wide so you can scale it without quality loss." },
              { mistake: "No 'Authorised Signatory' label",  fix: "Always label the signature section clearly. Rule 46 requires it to be identifiable as the authorised signatory." },
              { mistake: "Assuming DSC is needed per invoice", fix: "A DSC is for portal filings, not the invoice document itself. Save the DSC cost and time by using a PNG signature for invoices." },
            ].map(({ mistake, fix }, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
                <div className="shrink-0 flex flex-col items-center gap-1 pt-0.5">
                  <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="h-3.5 w-3.5 text-destructive" />
                  </div>
                  <div className="w-px h-full min-h-4 bg-border" />
                  <div className="h-6 w-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-sm font-semibold text-destructive/80">{mistake}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{fix}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── USE CASES ────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Who Needs a GST Invoice Signature?</h2>
            <p className="text-muted-foreground">Every GST-registered business issuing invoices needs an authorised signatory signature.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: <IndianRupee className="h-5 w-5 text-primary" />,
                title: "Shop Owners & Retailers",
                desc: "Kirana stores, electronics shops, medical stores — any GST-registered retailer issuing B2C or B2B invoices via Tally or Vyapar.",
              },
              {
                icon: <Briefcase className="h-5 w-5 text-primary" />,
                title: "Freelancers & Consultants",
                desc: "IT freelancers, designers, marketing consultants — issuing GST invoices for professional services. A transparent PNG in your invoice PDF takes 2 minutes to set up.",
              },
              {
                icon: <Truck className="h-5 w-5 text-primary" />,
                title: "Traders & Distributors",
                desc: "Wholesale traders and distributors issuing high-volume B2B invoices via Marg ERP, Busy, or TallyPrime. Embed once in the template, sign automatically.",
              },
              {
                icon: <Building2 className="h-5 w-5 text-primary" />,
                title: "SMEs & Startups",
                desc: "Growing businesses using Zoho Books, QuickBooks India, or custom invoice templates. Professional, consistent signatures improve buyer trust and CA compliance.",
              },
              {
                icon: <Package className="h-5 w-5 text-primary" />,
                title: "E-Commerce Sellers",
                desc: "Amazon, Flipkart, and Meesho sellers generating GST-compliant invoices. A digital PNG eliminates the need to hand-sign thousands of delivery invoices.",
              },
              {
                icon: <Users className="h-5 w-5 text-primary" />,
                title: "CAs & Tax Practitioners",
                desc: "Chartered Accountants managing GST compliance for multiple clients can create and store clean PNG signatures for each client company in under a minute.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TRUST / EEAT ─────────────────────────────────────────────────── */}
        <section className="rounded-xl border bg-muted/30 p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Star className="h-5 w-5 text-amber-500" />,  title: "4.9 / 5 Rating",        desc: "Based on 3,100+ user reviews from GST-registered businesses across India." },
              { icon: <Shield className="h-5 w-5 text-green-600" />, title: "100% Browser-Based",  desc: "No server upload. Your signature stays on your device — fully private." },
              { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "Made in India",      desc: "Built for Indian businesses, GST rules, Tally users, and the Indian tax system." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3 items-start">
                <div className="shrink-0 h-9 w-9 rounded-lg bg-background border flex items-center justify-center">{icon}</div>
                <div><p className="font-semibold text-foreground text-sm">{title}</p><p className="text-xs text-muted-foreground mt-0.5">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">GST signature questions answered clearly — no CA jargon.</p>
          </div>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left gap-4 hover-elevate"
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-semibold text-foreground text-sm leading-snug">{faq.question}</span>
                  {openFaq === i ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── RELATED TOOLS & EEAT FOOTER ──────────────────────────────────── */}
        <section className="rounded-xl border bg-muted/30 p-6 space-y-4">
          <p className="font-semibold text-foreground text-base">Related Tools</p>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/tools/signature-generator",       label: "Signature Generator" },
              { href: "/tools/add-signature-to-pdf",      label: "Add Signature to PDF" },
              { href: "/tools/signature-for-pdf",         label: "Signature for PDF" },
              { href: "/tools/create-digital-signature",  label: "Digital Signature" },
              { href: "/tools/email-signature-generator", label: "Email Signature" },
              { href: "/tools/pdf-merger",                label: "PDF Merger" },
              { href: "/tools/image-to-pdf",              label: "Image to PDF" },
              { href: "/tools/pdf-compressor",            label: "PDF Compressor" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-background text-sm font-medium hover-elevate transition-all text-foreground">
                  {label}
                </span>
              </Link>
            ))}
          </div>
          <p className="text-xs text-muted-foreground pt-2 border-t">
            Last Updated: {LAST_UPDATED} &nbsp;·&nbsp; Made in India &nbsp;·&nbsp; GST-focused &nbsp;·&nbsp; By the Pixocraft Team
          </p>
        </section>

      </div>
    </div>
  );
}
