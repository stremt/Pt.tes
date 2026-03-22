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
import { SignatureTopPromo, SignatureRelatedTools } from "@/components/SignatureInternalLinks";
import SignatureToolSection from "@/components/SignatureToolSection";
import {
  Shield, Zap, Check, FileText, ChevronDown, ChevronUp,
  ArrowRight, Lock, AlertCircle, BadgeCheck, Download,
  Receipt, Smartphone, Star, Building2, Briefcase,
  Printer, Globe, IndianRupee, PenTool, Users, XCircle,
} from "lucide-react";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-for-tally";
const LAST_UPDATED = "March 2026";

const FAQS = [
  {
    question: "How do I add a signature in Tally Prime invoice?",
    answer:
      "Download your signature as a transparent PNG from Pixocraft. In TallyPrime, go to Gateway of Tally → F11 (Features) → Printing → Configure Invoice Printing → Insert Logo/Image → select your PNG file. Set the position to the 'Authorised Signatory' section. Save the configuration — all future invoices will automatically carry your signature.",
  },
  {
    question: "What is the ideal signature size for Tally?",
    answer:
      "The ideal signature size for Tally invoices is between 150px to 300px width with a transparent PNG format. Pixocraft exports at 3200×1040 px (4× scale), which remains crisp at any print size and scales down cleanly to Tally's signature area. Use transparent PNG — not JPEG — to avoid a white box around your signature.",
  },
  {
    question: "What format does Tally accept for invoice signatures?",
    answer:
      "TallyPrime accepts PNG and JPEG image formats for invoice signatures. Always use transparent PNG — it blends cleanly into any invoice background without a white border. JPEG files have a white background that looks unprofessional on coloured invoice templates.",
  },
  {
    question: "Is an image-based signature valid on a Tally GST invoice?",
    answer:
      "Yes. CBIC guidelines do not mandate a cryptographic DSC on the physical or PDF copy of a GST invoice. A transparent PNG signature embedded in your Tally invoice template is legally valid for B2B invoices, B2C invoices, delivery challans, credit notes, and debit notes as per the IT Act 2000.",
  },
  {
    question: "Do I need a DSC (Digital Signature Certificate) for Tally invoices?",
    answer:
      "No. A Class 3 DSC is only required for GST portal submissions (GSTR-1, GSTR-3B, e-filing, IRN generation for e-invoicing). For the physical or PDF copy of your Tally invoice — which you give to your buyer — an image-based transparent PNG signature is fully sufficient and legally valid.",
  },
  {
    question: "Can I use the same PNG signature for all my Tally invoices?",
    answer:
      "Yes — and this is the recommended approach. Set up your PNG signature once in TallyPrime's invoice printing configuration, and it will appear on every invoice automatically. No re-signing needed. Save the PNG file separately so you can reuse it if you reinstall Tally or switch computers.",
  },
  {
    question: "What if my signature looks blurry in Tally?",
    answer:
      "Blurry signatures are usually caused by a low-resolution image or a JPEG with compression artifacts. Pixocraft exports at 3200×1040 px (4× resolution), which ensures sharpness at any Tally print size. Always use PNG format, never JPEG, for the clearest result.",
  },
  {
    question: "How do I add a signature to a Tally PDF invoice?",
    answer:
      "Generate your PDF invoice from Tally as usual, then open it in Adobe Acrobat, Foxit PDF, or Pixocraft's Add Signature to PDF tool. Use 'Insert Image' or 'Add Stamp' to place your transparent PNG over the Authorised Signatory section and save the signed PDF. This is useful for email-ready invoice copies.",
  },
  {
    question: "Can I use this tool on mobile for Tally signatures?",
    answer:
      "Yes. Pixocraft's signature tool works on all mobile browsers — Chrome, Safari, and Firefox on iOS and Android. Create your signature on your phone, download the PNG, and then transfer it to your computer to set it up in Tally.",
  },
  {
    question: "Is Pixocraft's signature tool free for Tally users?",
    answer:
      "Yes — 100% free, forever. No login, no subscription, no watermark on the downloaded PNG. Shopkeepers, accountants, and freelancers can create and download unlimited Tally-ready signatures at no cost.",
  },
  {
    question: "Is my signature data stored on Pixocraft's servers?",
    answer:
      "No. Pixocraft's signature tool runs entirely inside your browser. The name you type, the strokes you draw, and the PNG you download are never sent to any server. Everything stays on your device — 100% private.",
  },
  {
    question: "What is the difference between image signature and DSC in Tally?",
    answer:
      "An image-based signature (PNG) is a visual representation of your handwritten signature embedded in the invoice image area — suitable for printed and PDF invoices. A DSC (Digital Signature Certificate) is a cryptographic token used for portal submissions and e-invoicing IRN generation on the GST portal. For everyday Tally invoices given to buyers, the PNG image is sufficient.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Create your signature",
    text: "Open the Pixocraft signature tool above. Draw your signature using the Draw tab, or type your name and pick a cursive font in the Type tab. Preview your signature live before downloading.",
  },
  {
    name: "Download as transparent PNG",
    text: "Click Download → PNG. You will get a 3200×1040 px transparent PNG — no white background, no watermark. Save this file to your computer (e.g., Desktop or Documents).",
  },
  {
    name: "Open TallyPrime configuration",
    text: "In TallyPrime: Gateway of Tally → press F11 (Company Features) → Printing → Enable 'Print Logo' or 'Configure Invoice Printing'. The exact menu may vary by Tally version.",
  },
  {
    name: "Insert your signature PNG",
    text: "In the invoice printing configuration, find the 'Image' or 'Logo' field. Browse and select your downloaded PNG file. Position it in the 'Authorised Signatory' section of the invoice layout.",
  },
  {
    name: "Save and test print",
    text: "Save the configuration and print a test invoice. Your signature should appear clearly above the 'Authorised Signatory' text. Once confirmed, all future invoices will carry your signature automatically.",
  },
];

const TALLY_STEPS_PDF = [
  {
    name: "Export invoice from Tally as PDF",
    text: "In TallyPrime, open the invoice → press Alt+P (Print) → select PDF as the output format. Save the PDF to your computer.",
  },
  {
    name: "Open the PDF in an editor",
    text: "Open the PDF in Adobe Acrobat, Foxit PDF, or Pixocraft's Add Signature to PDF tool (free, no upload required).",
  },
  {
    name: "Insert your signature PNG",
    text: "Use 'Insert Image' or 'Add Stamp' to place your Pixocraft transparent PNG over the Authorised Signatory area of the PDF invoice.",
  },
  {
    name: "Save the signed PDF",
    text: "Save the signed PDF and send it to your buyer via email or WhatsApp. The signature is permanently embedded in the PDF.",
  },
];

const COMMON_MISTAKES = [
  { icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />, title: "Using JPEG instead of PNG", desc: "JPEG has a white background that creates an ugly white box over your invoice. Always use transparent PNG." },
  { icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />, title: "Low-resolution image", desc: "A small or blurry signature looks unprofessional on printed invoices. Use Pixocraft's 3200×1040 px export for crisp results at any size." },
  { icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />, title: "Placing signature in the wrong section", desc: "The signature must be in the 'Authorised Signatory' area — not the header, logo area, or footer. Check your Tally invoice layout before saving." },
  { icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />, title: "Not saving the PNG file separately", desc: "If you reinstall Tally or switch computers, Tally may lose the image link. Keep a backup of your PNG in a safe folder or cloud drive." },
  { icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />, title: "Assuming DSC is required for invoices", desc: "DSC is only needed for GST portal filings (GSTR-1, GSTR-3B), not for the invoice given to your buyer. A PNG is perfectly valid." },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,     title: "Shopkeepers & Retailers",   desc: "Add your signature to Tally invoices once and print thousands of signed invoices automatically. No manual signing — saves hours every month." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />,   title: "CAs & Accountants",          desc: "Manage signatures for multiple client companies. Download separate PNGs for each and configure each Tally company independently." },
  { icon: <IndianRupee className="h-5 w-5 text-primary" />, title: "GST Registered Businesses",  desc: "Meet the CBIC signature requirement for GST invoices without purchasing a DSC. The transparent PNG is accepted by buyers and auditors." },
  { icon: <Users className="h-5 w-5 text-primary" />,       title: "Freelancers & Consultants",  desc: "Create a professional signature for your service invoices generated in Tally or any billing software. Reuse the same PNG indefinitely." },
];

const COMPARISON_ROWS = [
  { feature: "Cost",              pixocraft: "Free",              manual: "Free",        dsc: "₹1,500–₹3,000/year" },
  { feature: "Setup time",        pixocraft: "< 2 minutes",       manual: "Varies",      dsc: "2–5 working days" },
  { feature: "Required for GST invoice", pixocraft: "Yes (PNG)", manual: "Yes",         dsc: "No (only for portal)" },
  { feature: "Consistent look",   pixocraft: "Always identical",  manual: "Varies",      dsc: "N/A (invisible)" },
  { feature: "Works offline",     pixocraft: "Yes",               manual: "Yes",         dsc: "Requires internet" },
  { feature: "Transparent PNG",   pixocraft: "Yes",               manual: "Scan only",   dsc: "No" },
  { feature: "Tally compatible",  pixocraft: "Yes",               manual: "With scanner", dsc: "Separate plugin" },
];

const INTERNAL_LINKS = [
  { href: "/tools/signature-for-gst-invoice",          label: "Signature for GST Invoice" },
  { href: "/tools/signature-for-pdf",                  label: "Signature for PDF" },
  { href: "/tools/signature-for-contracts",            label: "Signature for Contracts" },
  { href: "/tools/online-signature-generator",         label: "Online Signature Generator" },
  { href: "/tools/digital-signature-generator",        label: "Digital Signature Generator" },
  { href: "/tools/handwritten-signature-generator",    label: "Handwritten Signature Generator" },
];

export default function SignatureForTally() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature for Tally – Add Signature in Tally Prime Invoice (Free)",
    description:
      "Create signature for Tally invoice online free. Download transparent PNG and add to Tally Prime instantly. No login, 100% private, GST compatible.",
    canonicalUrl: CANONICAL,
    ogType: "website",
    keywords:
      "signature for tally prime, add signature in tally invoice, tally signature size, tally digital signature, add digital signature in tally, signature for tally",
  });

  const schemas = [
    generateFAQSchema(FAQS),
    generateHowToSchema({
      name: "How to Add Signature in Tally Prime Invoice",
      description:
        "Create a transparent PNG signature using Pixocraft and configure it in TallyPrime for automatic invoice signing.",
      steps: HOWTO_STEPS,
    }),
    generateSoftwareApplicationSchema({
      name: "Pixocraft Tally Signature Generator",
      description:
        "Create a transparent PNG signature and add it to your Tally Prime invoice. Free, no login, 100% private.",
      url: CANONICAL,
      applicationCategory: "WebApplication",
      operatingSystem: "All",
      offers: { price: "0", priceCurrency: "INR" },
    }),
    generateBreadcrumbSchema([
      { name: "Home",                 url: "https://tools.pixocraft.in" },
      { name: "Signature Tools",      url: "https://tools.pixocraft.in/tools/signature-tools" },
      { label: "Signature Generator", url: "/tools/signature-generator" },
      { name: "Signature for Tally",  url: CANONICAL },
    ]),
    generateWebPageSchema({
      name: "Signature for Tally – Add Signature in Tally Prime Invoice (Free)",
      description:
        "Create signature for Tally invoice online free. Download transparent PNG and add to Tally Prime instantly. No login, 100% private, GST compatible.",
      url: CANONICAL,
    }),
  ];

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, i) => (
        <StructuredData key={i} data={schema} />
      ))}

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">

        {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
        <Breadcrumb
          items={[
            { label: "Home",                url: "/" },
            { label: "Tools",               url: "/tools" },
            { label: "Signature Tools",     url: "/tools/signature-tools" },
            { label: "Signature for Tally" },
          ]}
        />

        {/* ── PRIMARY TOOL LINK ─────────────────────────────────────────────── */}
        <SignatureTopPromo />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Printer className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Signature for Tally –{" "}
              <span className="text-primary">Create & Add Signature in Tally Prime</span>{" "}
              (Free)
            </h1>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Create a professional signature and add it to your <strong>Tally Prime invoices</strong> in minutes.
            Download a crisp <strong>transparent PNG</strong> — the exact format Tally requires — and configure it once
            so every future invoice is automatically signed. No DSC needed. No login. 100% private.
          </p>
          <p className="text-base font-semibold text-foreground">
            <strong>Add your Tally signature in under 60 seconds — no login, no upload, fully private.</strong>
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Signup" },
              { icon: <Star className="h-3.5 w-3.5" />,       label: "Tally Ready PNG" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "GST Compatible" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "100% Private" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Works Offline" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Mobile Ready" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/20"
              >
                {icon}{label}
              </span>
            ))}
          </div>
        </div>

        {/* ── FEATURED SNIPPET ─────────────────────────────────────────────── */}
        <div className="rounded-xl border-2 border-primary/20 bg-primary/5 px-6 py-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quick Answer</p>
          <h2 className="text-lg font-bold text-foreground">
            How to add signature in Tally invoice?
          </h2>
          <ol className="space-y-1.5">
            {[
              "Create your signature on Pixocraft (draw or type your name).",
              "Download it as a transparent PNG (3200×1040 px, no watermark).",
              "In TallyPrime: F11 → Printing → Configure Invoice Printing → Insert Image.",
              "Select your PNG and position it in the Authorised Signatory area.",
              "Save — every future invoice prints with your signature automatically.",
            ].map((step, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground">
                <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {[
              { label: "Format",     value: "Transparent PNG" },
              { label: "Size",       value: "150–300px width" },
              { label: "Cost",       value: "Free Forever" },
              { label: "DSC needed", value: "No" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg bg-background border p-3 text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                <p className="font-semibold text-foreground text-sm mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <SignatureToolSection
          mode="draw"
          caption="Draw or type your signature · Download as transparent PNG · Tally-ready format · No watermark"
        />

        {/* ── TALLY SIGNATURE REQUIREMENTS ─────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Signature Requirements for Tally Invoices</h2>
          <p className="text-muted-foreground leading-relaxed">
            TallyPrime is specific about the image format and quality of signatures embedded in invoice templates.
            Using the wrong format is the most common reason signatures look blurry or show a white box on printed invoices.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: <FileText className="h-5 w-5 text-primary" />,
                title: "Format: PNG (Transparent)",
                desc: "Always use PNG with a transparent background. JPEG files have a white background that creates an ugly box over your invoice colour.",
              },
              {
                icon: <Download className="h-5 w-5 text-primary" />,
                title: "Resolution: High (4× Export)",
                desc: "Pixocraft exports at 3200×1040 px — 4× display resolution — so your signature stays crisp at any Tally print size, including A4.",
              },
              {
                icon: <Check className="h-5 w-5 text-primary" />,
                title: "Placement: Authorised Signatory",
                desc: "Position your PNG in the Authorised Signatory section of Tally's invoice layout. Do not place it in the header or logo area.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col gap-3 p-5 rounded-xl border bg-card">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <p className="font-semibold text-foreground">{title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TALLY SIGNATURE SIZE ─────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Tally Signature Size (Best Dimensions)</h2>
          <div className="rounded-xl border bg-card px-6 py-5 space-y-3">
            <p className="text-foreground font-medium">
              The ideal signature size for Tally invoices is between <strong>150px to 300px width</strong> with a
              <strong> transparent PNG format</strong>. This ensures clear printing and proper alignment in invoices
              — on both A4 and thermal paper prints.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pixocraft exports your signature at <strong>3200×1040 px (4× scale)</strong>. When you insert this into
              Tally's invoice layout, Tally scales it down to fit the designated area — maintaining full sharpness at
              any final print size. You do not need to manually resize the PNG before importing.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Recommended display width", value: "150 – 300 px" },
              { label: "Pixocraft export size",      value: "3200 × 1040 px" },
              { label: "Best format",                value: "PNG (transparent)" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border bg-card p-4 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                <p className="font-semibold text-foreground text-sm mt-1">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW TO ADD IN TALLY PRIME ────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">How to Add Signature in Tally Prime – Step by Step</h2>
          <p className="text-muted-foreground">Configure once — every future invoice prints with your signature automatically.</p>
          <ol className="space-y-3">
            {HOWTO_STEPS.map(({ name, text }, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
                <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── PDF ALTERNATIVE ──────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Alternative: Add Signature to Tally PDF Invoice</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you prefer to sign each invoice individually — or if your Tally version does not support image insertion —
            export the invoice as a PDF and sign it digitally:
          </p>
          <ol className="space-y-3">
            {TALLY_STEPS_PDF.map(({ name, text }, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
                <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex">
            <Link href="/tools/signature-for-pdf">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-2" data-testid="link-signature-for-pdf">
                Open the PDF Signature Tool <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* ── WHY DIGITAL SIGNATURE IN TALLY ──────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Why Use a Digital Signature in Tally?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "GST Compliance",      desc: "CBIC requires an authorised signatory on every GST invoice. A PNG signature satisfies this for printed and PDF invoices." },
              { icon: <Zap className="h-5 w-5 text-primary" />,        title: "Saves Time",           desc: "Configure once in Tally — every future invoice is automatically signed. No manual signing of hundreds of invoices." },
              { icon: <Check className="h-5 w-5 text-primary" />,      title: "Professional Look",    desc: "A consistent, clean signature builds trust with buyers, clients, and auditors. Much more professional than a stamped or scanned image." },
              { icon: <Globe className="h-5 w-5 text-primary" />,      title: "Email & Print Ready",  desc: "The transparent PNG looks great on both emailed PDF invoices and printed paper invoices — same file, both purposes." },
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

        {/* ── SAVE & REUSE ─────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Save & Reuse Your Signature (Important)</h2>
          <div className="rounded-xl border bg-card px-6 py-5 space-y-3">
            <p className="text-foreground font-medium">
              Download your PNG once and save it in a permanent location — your Desktop, Documents folder, or Google Drive.
              This single file can be reused forever across:
            </p>
            <ul className="space-y-2 mt-1">
              {[
                "All Tally companies on the same computer",
                "Tally reinstalled on a new or formatted computer",
                "Zoho Books, Vyapar, Marg ERP, QuickBooks India templates",
                "PDF invoices signed using Adobe Acrobat or Pixocraft's PDF tool",
                "Email footers, letterheads, and Word/Google Doc contracts",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted-foreground items-start">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground pt-1">
              You only need to create and download your signature once. After that, it's a permanent reusable asset.
            </p>
          </div>
        </section>

        {/* ── LEGAL SECTION ────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Legal Validity in India – Tally Signatures</h2>
          <div className="rounded-xl border bg-card px-6 py-5 space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              Under the <strong>IT Act 2000</strong> (Section 5), an electronic signature that is attached to or associated
              with an electronic record and adopted by a person intending to sign that record is legally valid. A transparent
              PNG signature embedded in a Tally invoice PDF qualifies as an electronic signature.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong>CBIC (GST)</strong> does not mandate a Class 3 DSC on the physical or emailed copy of a GST invoice.
              The DSC requirement applies only to portal submissions: GSTR-1, GSTR-3B, GSTR-9, and e-invoicing IRN generation.
              For the invoice you give your buyer — whether printed or PDF — a PNG-based image signature is fully accepted.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "IT Act 2000 (India)", value: "Image signatures valid" },
              { label: "CBIC / GST Rules",    value: "PNG accepted on invoices" },
              { label: "DSC required for",    value: "Portal filing only" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border bg-card p-4 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                <p className="font-semibold text-foreground text-sm mt-1">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMMON MISTAKES ──────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Common Mistakes to Avoid</h2>
          <div className="space-y-3">
            {COMMON_MISTAKES.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                {icon}
                <div>
                  <p className="font-semibold text-foreground text-sm">{title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARISON ───────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Pixocraft vs Manual vs DSC – Tally Signature Comparison</h2>
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">Pixocraft PNG</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Manual Signing</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">DSC</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map(({ feature, pixocraft, manual, dsc }, i) => (
                    <tr key={feature} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="px-4 py-3 text-muted-foreground font-medium">{feature}</td>
                      <td className="px-4 py-3 text-primary font-semibold">{pixocraft}</td>
                      <td className="px-4 py-3 text-muted-foreground">{manual}</td>
                      <td className="px-4 py-3 text-muted-foreground">{dsc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── USE CASES ────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-2xl font-bold text-foreground">Who Uses This Tool</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {USE_CASES.map(({ icon, title, desc }) => (
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

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border bg-card overflow-hidden"
                data-testid={`faq-item-${i}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  data-testid={`faq-toggle-${i}`}
                >
                  <span className="font-semibold text-foreground text-sm leading-snug">{faq.question}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  }
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

        {/* ── MORE SIGNATURE TOOLS ─────────────────────────────────────── */}
        <SignatureRelatedTools links={[
          { href: "/tools/signature-generator",          label: "Signature Generator",          desc: "The main tool — draw, type, or upload and download a transparent PNG in seconds." },
          { href: "/tools/signature-for-gst-invoice",    label: "Signature for GST Invoice",    desc: "Sign GST invoices for TallyPrime, Zoho Books, and ClearTax with a transparent PNG." },
          { href: "/tools/signature-for-aadhaar",        label: "Signature for Aadhaar",        desc: "Create and use signatures specifically for Aadhaar KYC forms and UIDAI processes." },
          { href: "/tools/signature-for-contracts",      label: "Signature for Contracts",      desc: "Sign NDAs, employment letters, and business agreements digitally." },
          { href: "/tools/signature-for-pdf",            label: "Signature for PDF",            desc: "Optimised PDF signing workflow — place your signature on any PDF document." },
        ]} />

        {/* ── BOTTOM BREADCRUMB ─────────────────────────────────────────────── */}
        <div className="pt-4 border-t">
          <Breadcrumb
            items={[
              { label: "Home",                url: "/" },
              { label: "Tools",               url: "/tools" },
              { label: "Signature Tools",     url: "/tools/signature-tools" },
              { label: "Signature for Tally" },
            ]}
          />
          <p className="text-xs text-muted-foreground mt-3">
            Last Updated: {LAST_UPDATED} · Made in India · By the Pixocraft Team
          </p>
        </div>

      </div>
    </div>
  );
}
