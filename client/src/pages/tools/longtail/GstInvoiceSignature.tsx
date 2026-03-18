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
  Receipt, Smartphone, Star, Building2, FileCheck, Users,
  Banknote, Truck, PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/gst-invoice-signature";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const FAQS = [
  {
    question: "Is an image-based signature valid on a GST invoice?",
    answer:
      "Yes. CBIC guidelines for GST invoices require the authorised signatory's signature — they do not mandate a specific format or DSC for manually generated invoices. A transparent PNG signature embedded in your GST invoice PDF or template satisfies this requirement for B2B and B2C invoices, e-way bills, and delivery challans.",
  },
  {
    question: "Do I need a DSC (Digital Signature Certificate) for every GST invoice?",
    answer:
      "No. A Class 3 DSC is required only for filing returns on the GST portal (GSTR-1, GSTR-3B, etc.) and for certain e-invoicing gateway integrations. For signing physical or PDF copies of your GST invoices themselves, an image-based signature (transparent PNG) is fully accepted by buyers, CAs, and auditors.",
  },
  {
    question: "How do I add a signature to a GST invoice in TallyPrime?",
    answer:
      "Download your signature as a transparent PNG from Pixocraft. In TallyPrime, go to Company Features → Printing → Configure Invoice Printing → insert image → select your PNG. Position it over the 'Authorised Signatory' field. All future invoices from that company will include your signature automatically.",
  },
  {
    question: "How do I add my signature to a GST invoice in Zoho Books?",
    answer:
      "In Zoho Books, go to Settings → Templates → select your Invoice template → Edit → drag an Image block to the signature area → upload your PNG. Save the template. Every invoice sent from Zoho Books will carry your signature automatically.",
  },
  {
    question: "What format should a GST invoice signature be in?",
    answer:
      "A transparent PNG is the ideal format. It overlays cleanly on any invoice background without a white box. The recommended size is 800×300 px or similar landscape proportion. Avoid JPG for invoices — the white background of a JPG creates an ugly box when placed over coloured invoice templates.",
  },
  {
    question: "Is this GST signature tool completely free?",
    answer:
      "Yes — 100% free, forever. No login, no subscription, no watermark on the downloaded signature. Create and download unlimited GST invoice signatures at no cost.",
  },
  {
    question: "Can I use the same signature for all my GST invoices?",
    answer:
      "Yes — and you should. Download your PNG once and reuse it across all invoices, e-way bills, delivery challans, and credit notes. Consistency is legally and professionally important. Many CAs recommend using the exact same image signature across all documents.",
  },
  {
    question: "Is my signature data secure when using this tool?",
    answer:
      "Completely secure. This tool runs 100% inside your browser using the HTML5 Canvas API. No drawing, typed name, or uploaded image is ever sent to any server, logged, or stored. Your data never leaves your device.",
  },
  {
    question: "Can I draw my GST invoice signature on my phone?",
    answer:
      "Yes. The Draw tab is fully touch-optimised. Open this page on your phone, draw with your finger, customise, and download your PNG. Works on Chrome, Safari, and Firefox for iOS and Android. For a wider canvas, rotate your phone to landscape mode before drawing.",
  },
  {
    question: "What is the difference between a GST digital signature and a DSC?",
    answer:
      "A GST digital signature (or image signature) is a transparent PNG image of your handwritten signature — used to sign invoice PDFs and documents. A DSC (Digital Signature Certificate) is a cryptographic token issued by a licensed CA, required for portal authentication and GSTR filing. Most businesses need both: a PNG signature for invoice documents and a DSC for filing returns on the portal.",
  },
  {
    question: "How do I place the signature in the right position on a GST invoice?",
    answer:
      "Standard practice in India places the authorised signatory signature at the bottom-right of the invoice — below the 'For [Company Name]' line and above the 'Authorised Signatory' text. In PDF tools, position the transparent PNG precisely over this area. In Tally or Zoho, use the template editor to anchor it to the signature block.",
  },
  {
    question: "Can I use this signature in ClearTax or Busy accounting software?",
    answer:
      "Yes. ClearTax supports image upload in invoice templates via its PDF template editor. Busy Accounting Software allows signature image insertion in its bill printing configuration. Download your PNG from Pixocraft and follow the image insertion steps in your software's template settings.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Create your signature", description: "Use the Draw tab to sign with your mouse or finger, the Type tab to generate a signature from 50+ handwriting fonts, or Upload to digitise an existing physical signature." },
  { step: 2, title: "Customise for GST", description: "Set ink colour to black or dark navy — the standard for official Indian business documents. Adjust stroke width to 2–3 px for a professional, pen-like appearance." },
  { step: 3, title: "Download as PNG", description: "Click 'Download Signature' to save the transparent PNG to your device. The file is print-resolution (3200×1040 px) — sharp at any invoice size." },
  { step: 4, title: "Insert in your GST invoice", description: "Open your invoice in TallyPrime, Zoho Books, ClearTax, or any PDF editor. Insert the PNG image over the 'Authorised Signatory' area. Save and send." },
];

const PNG_VS_DSC = [
  { feature: "Use case",         png: "Daily GST invoices & PDFs",           dsc: "Portal filing & e-invoicing" },
  { feature: "Cost",             png: "Free — forever",                      dsc: "₹1,000–₹3,000/year" },
  { feature: "Requirement",      png: "Most businesses (invoice copies)",     dsc: "All GST portal filers" },
  { feature: "Setup time",       png: "Under 60 seconds",                    dsc: "1–3 working days" },
  { feature: "Hardware needed",  png: "None — browser only",                 dsc: "USB token (some cases)" },
  { feature: "Renewal",          png: "Not required",                        dsc: "Annual or biennial" },
  { feature: "Legal validity",   png: "IT Act 2000 compliant",               dsc: "IT Act 2000 certified" },
  { feature: "Works offline",    png: "Yes — once page loads",               dsc: "Requires internet" },
];

const SOFTWARE_LIST = [
  {
    name: "TallyPrime",
    desc: "Go to Company Features → Printing → Configure Invoice Printing. Insert your PNG in the signature area. All future invoices auto-include your signature.",
  },
  {
    name: "Zoho Books",
    desc: "Settings → Templates → select Invoice template → Edit → drag Image block to signature area → upload PNG. Save template to apply to all invoices.",
  },
  {
    name: "ClearTax",
    desc: "Use ClearTax's PDF template editor to add an image block in the authorised signatory section. Upload your transparent PNG from Pixocraft.",
  },
  {
    name: "Busy Accounting",
    desc: "In bill printing configuration, navigate to the signature section and insert your image file. Supports PNG with transparency for clean overlay.",
  },
  {
    name: "Vyapar",
    desc: "Vyapar's business invoice templates support image signature insertion via the template customisation settings. Upload your PNG in the signature field.",
  },
  {
    name: "Any PDF Editor",
    desc: "Download the PNG and insert it into any GST invoice PDF using Adobe Acrobat, Smallpdf, or Pixocraft's Add Signature to PDF tool — in seconds.",
  },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,   title: "B2B Tax Invoices",       desc: "Sign your GST tax invoices for registered buyers. The PNG signature satisfies CBIC's authorised signatory requirement for manually generated B2B invoices." },
  { icon: <Users className="h-5 w-5 text-primary" />,     title: "B2C Retail Invoices",    desc: "For retail and service businesses issuing B2C invoices to end consumers — a consistent authorised signature builds trust and ensures compliance." },
  { icon: <Truck className="h-5 w-5 text-primary" />,     title: "E-Way Bills",            desc: "Sign e-way bills and delivery challans for goods movement. The same PNG signature works across all transport and supply documents." },
  { icon: <FileText className="h-5 w-5 text-primary" />,  title: "Export Invoices",        desc: "Export invoices and shipping bills requiring authorised signatory signatures for customs and DGFT compliance." },
  { icon: <Banknote className="h-5 w-5 text-primary" />,  title: "Credit & Debit Notes",   desc: "Sign credit notes and debit notes issued for return adjustments, price corrections, and GST amendments." },
  { icon: <Building2 className="h-5 w-5 text-primary" />, title: "CA & Firm Signatures",   desc: "Chartered Accountants and accounting firms use PNG signatures on client correspondence, engagement letters, and report cover pages." },
];

const MISTAKES = [
  { title: "Using JPG instead of PNG", body: "A JPG signature has a white background. When placed over a coloured or printed invoice, it creates an unsightly white rectangle around your signature. Always use the transparent PNG format for clean overlay on any invoice background." },
  { title: "Inconsistent signature across documents", body: "Re-drawing your signature every time produces small variations that auditors and CA firms sometimes flag. Download a single high-quality PNG from Pixocraft and reuse the exact same file across all invoices, e-way bills, and credit notes." },
  { title: "Signature placed in the wrong position", body: "Standard practice places the authorised signature at the bottom-right of the invoice, below 'For [Company Name]' and above 'Authorised Signatory'. Placing it elsewhere can confuse recipients and create audit queries." },
  { title: "Signature too small or pixelated", body: "Pixocraft exports at 3200×1040 px — print resolution. If you resize your PNG too small before insertion, it will appear pixelated. Insert it at a reasonable size (at least 3–4 cm wide) and let the PDF software scale it from the high-resolution source." },
  { title: "Not previewing before bulk printing", body: "Always preview how your signature looks in the invoice before printing or sending. A signature that looks good on screen can appear too large, too small, or misaligned when printed." },
];

const PRO_TIPS = [
  { title: "Use black or dark navy ink", body: "GST invoices are formal business documents. Standard business practice uses black ink. Dark navy (#1a1a2e or #00008b) is also professional and reproduces well in both digital and printed formats. Avoid coloured or light signatures." },
  { title: "Save your PNG permanently", body: "Download your GST signature PNG once and store it in a dedicated folder — for example, 'Company Documents → Signatures'. Share this file with your accounting team so the same signature is used across all software and by all users." },
  { title: "Bottom-right placement", body: "Position the signature at the bottom-right of the invoice, in the standard 'Authorised Signatory' block. This is the universally expected position in Indian GST invoice formats and avoids confusion during audits." },
  { title: "Use the Type tab for consistency", body: "If you need identical signatures across thousands of invoices, use the Type tab. Select a professional cursive font, type your name, and download. The result is pixel-identical every single time — no session-to-session variation." },
  { title: "Preview in your invoice template before finalising", body: "After downloading your PNG, test it in one invoice before configuring it across all your software. Check size, position, and clarity in both print preview and digital view." },
];

export default function GstInvoiceSignature() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "GST Invoice Signature Free – Legal Digital Signature Online | Pixocraft",
    description:
      "Create GST invoice signature online free. Use in Tally, Zoho, GST portal instantly. No login, 100% private, IT Act 2000 compliant.",
    keywords:
      "gst invoice signature, signature for gst invoice, gst digital signature free, sign gst invoice online, gst signature online, digital signature for gst, how to add signature in gst invoice",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "GST Invoice Signature – Pixocraft",
    description:
      "Create your GST invoice signature online free. Download as transparent PNG and use in Tally, Zoho Books, ClearTax, or any invoice software instantly. IT Act 2000 compliant. No login required.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "INR" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                    url: "https://tools.pixocraft.in/" },
    { name: "Tools",                   url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Generator",     url: PARENT_URL },
    { name: "GST Invoice Signature",   url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "GST Invoice Signature Free – Legal Digital Signature Online | Pixocraft",
    description:
      "Create GST invoice signature online free. Use in Tally, Zoho, GST portal instantly. No login, 100% private, IT Act 2000 compliant.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a GST Invoice Signature Online Free",
    description:
      "Use Pixocraft's free tool to create a GST invoice signature, download as transparent PNG, and insert it into TallyPrime, Zoho Books, ClearTax, or any invoice PDF in under 60 seconds.",
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
          { label: "GST Invoice Signature" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Receipt className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                GST Invoice Signature Free – Legal Digital Signature for GST
              </h1>
              <p className="text-sm text-muted-foreground">IT Act 2000 Compliant · No Login · 100% Private · Works with Tally, Zoho & More</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create your <strong>GST invoice signature</strong> instantly and use it in TallyPrime, Zoho Books, ClearTax, or any
            invoice software. Download as a transparent PNG — no login, 100% private, fully compliant with the <strong>IT Act 2000</strong>.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "GST & IT Act 2000 Compliant" },
              { icon: <Check className="h-3.5 w-3.5" />,      label: "Works with Tally, Zoho, ClearTax" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup Required" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <Users className="h-3.5 w-3.5" />,       label: "Used by Indian Businesses Daily" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground"
              >
                {icon}{label}
              </span>
            ))}
          </div>

          {/* UX psychology micro-trust */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { icon: <Users className="h-3.5 w-3.5 text-primary" />,    label: "Trusted by MSMEs & CAs" },
              { icon: <Check className="h-3.5 w-3.5 text-primary" />,    label: "Works with real GST software" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />,   label: "No data stored" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                {icon}{label}
              </div>
            ))}
          </div>

          {/* Action flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {[
              { n: 1, label: "Create Signature" },
              { n: 2, label: "Download PNG" },
              { n: 3, label: "Insert in Invoice" },
              { n: 4, label: "Done" },
            ].map(({ n, label }) => (
              <div key={n} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{n}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <SignaturePadWidget />
          <p className="text-xs text-muted-foreground text-center mt-3">
            No watermark · No upload to server · Transparent PNG · Print-resolution export
          </p>
        </div>

        {/* ── GST QUICK USE BLOCK ───────────────────────────────────────────── */}
        <div className="rounded-xl border bg-primary/5 px-6 py-5 mb-12">
          <p className="font-semibold text-foreground mb-3">Use your GST invoice signature for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "B2B and B2C tax invoices",
              "E-way bills and delivery challans",
              "Credit notes and debit notes",
              "Export invoices and shipping bills",
              "CA correspondence and reports",
              "Quotations and purchase orders",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* What is GST Invoice Signature */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What Is a GST Invoice Signature?</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                A <strong>GST invoice signature</strong> is the authorised signatory's signature that appears on every GST tax
                invoice, e-way bill, credit note, and delivery challan issued by a registered business. It authenticates the
                document and confirms that the invoice has been issued by the named authorised signatory of the business.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              Under Indian GST law, a valid tax invoice must contain the "signature or digital signature of the supplier or his
              authorised representative" (Rule 46 of CGST Rules, 2017). For manually generated invoices — printed from Tally,
              Zoho, Busy, Vyapar, or any billing software — this signature is typically an image (PNG or JPG) embedded in the
              invoice template.
            </p>
            <p className="text-muted-foreground mb-4">
              A <strong>digital signature for GST invoices</strong> in the common business sense means a handwritten signature
              that has been digitised — either by drawing it on screen, typing a name in a handwriting font, or photographing
              a physical signature and removing the background. This is distinct from a <em>Digital Signature Certificate (DSC)</em>,
              which is a cryptographic identity token required only for GST portal authentication and return filing.
            </p>
            <p className="text-muted-foreground mb-4">
              Pixocraft's free <strong>GST invoice signature</strong> tool lets you create a professional, print-resolution
              transparent PNG signature in under 60 seconds — with no login, no server upload, and no cost. The output is
              directly compatible with TallyPrime, Zoho Books, ClearTax, Busy, Vyapar, and any PDF editor.
            </p>
            <p className="text-muted-foreground">
              The tool supports three creation methods: Draw (mouse or touch), Type (50+ handwriting fonts), and Upload (digitise
              an existing physical signature). All three methods output a 3200×1040 px transparent PNG — the ideal format for
              invoice template integration across all major Indian accounting software.
            </p>
          </section>

          {/* How to Create */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a GST Invoice Signature — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Create and insert your GST signature in under 60 seconds:</p>
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
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-create-gst-signature"
              >
                <PenTool className="h-4 w-4" />Create GST Signature<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Features Built for GST Invoice Signing</h2>
            <p className="text-muted-foreground mb-5">Every feature is designed for Indian business and compliance workflows:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Download className="h-5 w-5 text-primary" />,   title: "Transparent PNG export",         desc: "Download a transparent-background PNG that overlays cleanly on any invoice colour — no white box, no background mismatch." },
                { icon: <FileCheck className="h-5 w-5 text-primary" />,  title: "Print-resolution quality",       desc: "Exported at 3200×1040 px — four times display resolution — so your signature is crisp and sharp on both printed and digital invoices." },
                { icon: <Building2 className="h-5 w-5 text-primary" />, title: "Works with all GST software",    desc: "Compatible with TallyPrime, Zoho Books, ClearTax, Busy, Vyapar, and any PDF editor that supports image insertion." },
                { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "Mobile-friendly",               desc: "Create and download your GST signature directly from your phone. Draw with your finger on mobile Chrome or Safari." },
                { icon: <Zap className="h-5 w-5 text-primary" />,        title: "Under 60 seconds",              desc: "No sign-up screen, no payment gate, no upload spinner. Open the tool, create your signature, download, done." },
                { icon: <Shield className="h-5 w-5 text-primary" />,     title: "Zero data storage",             desc: "Your signature is processed 100% locally in your browser. Nothing is sent to any server. Your business signature stays private." },
                { icon: <Star className="h-5 w-5 text-primary" />,       title: "50+ handwriting fonts",         desc: "For a consistent font-based signature, choose from 50+ Google handwriting fonts in the Type tab — identical on every invoice." },
                { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "IT Act 2000 compatible",        desc: "Image-based electronic signatures are recognised under the IT Act 2000 for commercial documents, contracts, and invoices." },
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

          {/* PNG Signature vs DSC Comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">GST Image Signature vs DSC — Which Do You Need?</h2>
            <p className="text-muted-foreground mb-5">
              Many businesses are confused about whether they need a DSC (Digital Signature Certificate) for every GST invoice.
              Here is a clear breakdown:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">PNG Signature (This Tool)</th>
                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground">DSC (Class 3)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {PNG_VS_DSC.map(({ feature, png, dsc }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 text-primary/80 font-medium">{png}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{dsc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 text-sm text-foreground">
              <strong className="flex items-center gap-1.5 mb-1"><BadgeCheck className="h-4 w-4 text-primary" />Bottom line for most businesses:</strong>
              <p className="text-muted-foreground leading-relaxed">
                You need a DSC to <em>file returns</em> on the GST portal. You need a PNG image signature to <em>sign invoice documents</em>.
                Most registered businesses need both — but they serve different purposes. For invoice signing, the Pixocraft PNG tool is
                all you need.
              </p>
            </div>
          </section>

          {/* Software Integration */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Use Your GST Signature in Popular Accounting Software</h2>
            <p className="text-muted-foreground mb-5">Step-by-step guidance for adding your PNG signature to India's most-used GST software:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SOFTWARE_LIST.map(({ name, desc }) => (
                <div key={name} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{name}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Who Uses GST Invoice Signatures — Real Business Use Cases</h2>
            <p className="text-muted-foreground mb-5">Every GST-registered business in India needs an authorised signatory signature on its documents:</p>
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
          </section>

          {/* Legal Validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Is a Digital Signature Valid for GST Invoices? — Legal Validity</h2>
            <p className="text-muted-foreground mb-5">
              Yes — with important nuance. Here is what Indian law says:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "CGST Rules, Rule 46 — Invoice Signature Requirement",
                  body: "Rule 46 of the CGST Rules 2017 requires that a GST tax invoice carry the 'signature or digital signature of the supplier or his authorised representative'. For manually generated invoices (Tally, Zoho, custom templates), an image-based PNG signature of the authorised signatory satisfies this requirement.",
                },
                {
                  title: "IT Act 2000 — Electronic Signature Recognition",
                  body: "The Information Technology Act 2000 and its 2008 Amendment recognise electronic signatures (Section 3A) for commercial transactions. An image signature embedded in a PDF invoice constitutes a Simple Electronic Signature (SES) — legally valid for B2B contracts, GST invoices, NDAs, and most commercial agreements.",
                },
                {
                  title: "E-Invoicing (IRN) — Different Rules Apply",
                  body: "Businesses with annual turnover above ₹5 crore are required to generate e-invoices through the Invoice Registration Portal (IRP). E-invoices authenticated with an IRN (Invoice Reference Number) have their own digital authentication mechanism and do not strictly require a physical PNG signature — though many businesses add it for printed copies and audit trails.",
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
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" />Important note:</strong>
              For GST portal return filing (GSTR-1, GSTR-3B), an OTP-based verification or DSC is required for authentication.
              For court submissions, MCA ROC filings, and certain government portals, a certified DSC is mandatory. Consult a CA
              for document-specific guidance.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Adding Signature to GST Invoices</h2>
            <p className="text-muted-foreground mb-5">These errors are the most frequent cause of unprofessional or non-compliant invoice signatures:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for a Professional GST Invoice Signature</h2>
            <p className="text-muted-foreground mb-5">Best practices used by CAs, accountants, and experienced GST filers:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Pixocraft for GST Invoice Signatures?</h2>
            <p className="text-muted-foreground mb-5">What makes this the best choice for Indian businesses and CAs:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Receipt className="h-4 w-4 text-primary" />,   title: "GST-focused design",        body: "Built for Indian businesses. Every default setting — ink colour, output format, resolution — is optimised for GST invoice use." },
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "60-second workflow",        body: "Open → create → download in under 60 seconds. No sign-up, no payment screen, no confirmation email slowing you down." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private",              body: "Your business signature never leaves your browser. No server storage, no upload, no account — nothing to breach." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Compliance-ready output",   body: "Transparent PNG at print resolution — the exact format required by TallyPrime, Zoho Books, ClearTax, and most CA workflows." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile signing in the field", body: "Sign GST invoices from your phone at client sites, warehouses, or during delivery. Full touch support, works on all phones." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "Completely free",           body: "No freemium, no watermark, no feature lock. The full tool — Draw, Type, Upload, and PNG export — is entirely free forever." },
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
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-why-pixocraft-cta"
              >
                <PenTool className="h-4 w-4" />Create GST Signature Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal linking */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Complete GST Signature Workflow — Related Tools</h2>
            <p className="text-muted-foreground mb-4">
              After creating your GST signature, use these Pixocraft tools to complete your document workflow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/add-signature-to-pdf",          label: "Add Signature to PDF",           desc: "Place your PNG signature directly onto any GST invoice PDF." },
                { href: "/tools/signature-for-pdf",             label: "Signature for PDF",              desc: "Optimised PDF signing workflow for contracts and invoices." },
                { href: "/tools/esignature-maker",              label: "E-Signature Maker",              desc: "Create professional e-signatures for digital document signing." },
                { href: "/tools/mobile-signature-generator",    label: "Mobile Signature Generator",     desc: "Optimised for phone drawing — sign GST invoices on the go." },
                { href: "/tools/signature-creator",             label: "Signature Creator",              desc: "Full-featured signature creator with advanced customisation." },
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
            <h2 className="text-2xl font-bold text-foreground mb-5">Frequently Asked Questions — GST Invoice Signature</h2>
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
