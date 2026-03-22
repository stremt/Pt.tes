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
  ArrowRight, Lock, BadgeCheck, Download,
  Smartphone, Star, PenTool, Receipt, Scale, Users,
  Building2, CreditCard, Globe, FileCheck, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-generator-india";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const FAQS = [
  {
    question: "Is an online signature generator valid in India?",
    answer:
      "Yes. An image-based electronic signature created with an online tool is a Simple Electronic Signature (SES) recognised under the Information Technology Act 2000. It is legally valid for GST invoices, commercial contracts, NDAs, employment letters, rental agreements, and most business documents in India. Courts and Indian businesses widely accept these signatures for everyday commercial transactions.",
  },
  {
    question: "Can I use this signature generator for GST invoices in India?",
    answer:
      "Yes. CBIC guidelines for GST invoices require the authorised signatory's signature but do not mandate a specific format. A transparent PNG signature created with Pixocraft can be inserted into your GST invoice template — in TallyPrime, Zoho Books, ClearTax, or any billing software — satisfying the CGST Act 2017 requirement for B2B and B2C invoices.",
  },
  {
    question: "What is a signature generator in India?",
    answer:
      "A signature generator in India is a free online tool that lets you create a digital signature for GST invoices, Aadhaar forms, banking documents, and contracts. You draw, type, or upload your signature, then download it as a transparent PNG — ready to insert into any Indian business document in seconds, with no login required.",
  },
  {
    question: "Is a digital signature required for GST filing in India?",
    answer:
      "For GST portal submissions (GSTR-1, GSTR-3B), the GST portal requires either a DSC (Digital Signature Certificate) or EVC (Electronic Verification Code) for verification. However, for manual GST invoices sent to customers, a PNG image signature inserted into the invoice is legally sufficient. Pixocraft's tool covers the invoice-signing use case.",
  },
  {
    question: "What is Aadhaar eSign and how is it different from a PNG signature?",
    answer:
      "Aadhaar eSign is a government service from UIDAI that uses your Aadhaar number and an OTP to attach a certified electronic signature to documents — required for regulated transactions like Aadhaar-based loan agreements and government scheme enrollments. A PNG image signature from Pixocraft is simpler, faster, free, and sufficient for most everyday commercial documents without Aadhaar verification.",
  },
  {
    question: "How do I create a free signature online in India?",
    answer:
      "Open Pixocraft's free signature generator on this page. Choose the Draw tab (sign with mouse or finger), Type tab (select from handwriting fonts), or Upload tab (digitise a physical signature). Customise the ink colour and stroke width. Click 'Download Signature' — your transparent PNG is saved instantly. Total time: under 60 seconds. No login, no payment, no software required.",
  },
  {
    question: "Can I use a signature generator for bank forms in India?",
    answer:
      "Yes. For most bank account opening forms, KYC declarations, loan applications, and investment instructions submitted as digital documents, a PNG image signature is accepted. Banks like SBI, HDFC, ICICI, and Axis Bank accept digital document submissions where a scanned or digital signature is used. Always verify with your specific bank's digital submission requirements.",
  },
  {
    question: "What is the best signature format for Indian documents?",
    answer:
      "Transparent PNG is the universally recommended format for Indian business and government documents. PNG supports transparency — your signature overlays cleanly on any GST invoice template, contract background, or bank form without a white box. Pixocraft exports your signature in high-resolution transparent PNG format by default, ensuring professional quality at any size.",
  },
  {
    question: "Is this signature generator private and secure for Indian users?",
    answer:
      "Completely private and secure. All processing runs 100% inside your browser using the HTML5 Canvas API. No signature data, no personal information, and no document content is ever uploaded to any server or stored anywhere. This is especially important for Indian businesses handling sensitive GST data, Aadhaar-linked forms, client contracts, and banking documents.",
  },
  {
    question: "Can I use a signature generator on mobile in India?",
    answer:
      "Yes. The Draw tab is fully touch-optimised for all Android and iOS devices. Many Indian business users — field sales agents, freelancers, CA assistants, and MSME owners — create and use signatures from their smartphones. Open Pixocraft in Chrome or Safari on your phone, draw with your finger, and download the PNG directly to your device.",
  },
  {
    question: "What is the difference between a digital signature and a DSC in India?",
    answer:
      "A digital signature (PNG image) is a visual representation of your handwritten or typed signature — free, instant, and used for everyday commercial documents like GST invoices and contracts. A DSC (Digital Signature Certificate) is a cryptographic token issued by a licensed Certifying Authority (CA) under the IT Act 2000 — required only for specific regulated government portal filings like MCA21, eCourts, and income tax e-verification (ITR). Both are legal. Choose based on the document requirement.",
  },
  {
    question: "Do I need to register or create an account to use this tool?",
    answer:
      "No. Pixocraft's signature generator requires absolutely no login, registration, email, or account creation. Open the page, create your signature, download the PNG — that's it. Your data is never collected, stored, or shared. This makes it the fastest and most private signature generator available for Indian users.",
  },
];

const HOW_TO_STEPS = [
  { n: 1, title: "Open the free India signature generator", desc: "Scroll to the tool on this page — no login, no registration, no software installation needed. Works in any browser on desktop, tablet, or mobile in India." },
  { n: 2, title: "Draw, type, or upload your signature", desc: "Draw with your mouse or finger (touch-optimised for Indian Android and iOS users), type your name and choose from professional handwriting fonts, or upload an existing physical signature to digitise it." },
  { n: 3, title: "Customise for Indian documents", desc: "Set your ink colour to black or dark navy — the standard accepted colour for GST invoices, government forms, Aadhaar declarations, banking documents, and contracts in India. Adjust stroke width for the right look." },
  { n: 4, title: "Download as transparent PNG", desc: "Click 'Download Signature' — your high-resolution transparent PNG saves instantly to your device. Ready to insert into any GST invoice in Tally or Zoho Books, any Aadhaar-linked form, bank KYC document, or business contract in India." },
  { n: 5, title: "Use in GST invoice or document", desc: "Open your GST invoice template in TallyPrime, Zoho Books, ClearTax, or any billing software. Insert the PNG at the authorised signatory field. The transparent background overlays cleanly on any Indian invoice format." },
];

const COMPARISON_ROWS = [
  { feature: "Cost",               pixocraft: "100% Free",              others: "Login / paid plan required" },
  { feature: "Account Required",   pixocraft: "No login, no signup",     others: "Email signup required" },
  { feature: "File Upload",        pixocraft: "No upload needed",        others: "Upload document to server" },
  { feature: "Privacy",            pixocraft: "100% local, no server",   others: "Data processed on servers" },
  { feature: "Speed",              pixocraft: "Ready in 60 seconds",     others: "Minutes of setup" },
  { feature: "GST ready",          pixocraft: "Yes",                     others: "Generic tools, not India-specific" },
  { feature: "Aadhaar context",    pixocraft: "Yes",                     others: "No India-specific guidance" },
  { feature: "Mobile optimised",   pixocraft: "Yes (touch drawing)",     others: "Often desktop-only" },
  { feature: "Format",             pixocraft: "Transparent PNG",         others: "Varies, often JPEG" },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,    title: "GST Invoices",              desc: "Sign GST tax invoices in TallyPrime, Zoho Books, ClearTax, and any Indian billing software. Transparent PNG overlays cleanly on any invoice format — B2B, B2C, export invoices." },
  { icon: <FileText className="h-5 w-5 text-primary" />,   title: "Aadhaar-Linked Forms",      desc: "Consent forms, KYC declarations, and Aadhaar-linked bank account opening forms that require a personal signature but not full Aadhaar eSign verification." },
  { icon: <Scale className="h-5 w-5 text-primary" />,      title: "Contracts & Agreements",    desc: "NDAs, service agreements, partnership deeds, freelance contracts, and commercial agreements. Legally valid under IT Act 2000 and Indian Contract Act 1872." },
  { icon: <Building2 className="h-5 w-5 text-primary" />,  title: "Government Documents",      desc: "Affidavits, declarations, application forms submitted to government departments, state government offices, municipal corporations, and gram panchayats as digital documents." },
  { icon: <CreditCard className="h-5 w-5 text-primary" />, title: "Bank & Finance Forms",      desc: "Loan applications, account opening forms, investment instructions, and financial declarations submitted to banks, NBFCs, and financial institutions as digital PDFs." },
  { icon: <Users className="h-5 w-5 text-primary" />,      title: "HR & Employment",           desc: "Offer letters, appointment letters, employment contracts, and policy acknowledgements for paperless HR workflows in Indian startups, MSMEs, and corporates." },
  { icon: <FileCheck className="h-5 w-5 text-primary" />,  title: "Tally & Billing Software",  desc: "Insert your transparent PNG signature directly into Tally invoice templates, quotation formats, purchase orders, and delivery challans to create professional signed documents." },
  { icon: <Globe className="h-5 w-5 text-primary" />,      title: "Export Documents",          desc: "Signed export invoices, certificates of origin, packing lists, and commercial documents for Indian exporters dealing with international buyers and freight forwarders." },
];

const FEATURES = [
  { icon: <Lock className="h-5 w-5 text-primary" />,        title: "No Login Required",              desc: "Open the tool and start creating immediately. No email, no account, no subscription — ever." },
  { icon: <Shield className="h-5 w-5 text-primary" />,      title: "100% Private & Secure",          desc: "Your signature is processed entirely in your browser. Nothing is uploaded or stored on any server — safe for Indian business documents, GST data, and Aadhaar-linked forms." },
  { icon: <Download className="h-5 w-5 text-primary" />,    title: "Transparent PNG Download",       desc: "Downloads as a high-resolution transparent PNG — overlays cleanly on any GST invoice, Aadhaar form, bank document, or contract in India." },
  { icon: <Smartphone className="h-5 w-5 text-primary" />,  title: "Mobile Friendly for India",      desc: "Fully touch-optimised for Indian Android and iOS users. Draw your signature with your finger — sign from anywhere, even during client visits." },
  { icon: <Zap className="h-5 w-5 text-primary" />,         title: "Instant & Fast",                 desc: "Create, customise, and download your signature in under 60 seconds — no loading, no waiting, no redirects." },
  { icon: <Star className="h-5 w-5 text-primary" />,        title: "India-Specific Tool",            desc: "Built for Indian users — used for GST invoices, Aadhaar forms, banking KYC, Tally billing, government documents, and contracts." },
  { icon: <FileCheck className="h-5 w-5 text-primary" />,   title: "GST & Aadhaar Compatible",       desc: "Designed around the most common Indian signature needs — GST invoice authorisation, Aadhaar KYC declarations, and CGST Act 2017 document requirements." },
  { icon: <BadgeCheck className="h-5 w-5 text-primary" />,  title: "Secure for Indian Documents",    desc: "100% browser-based processing means your GST data, Aadhaar-linked information, banking details, and contract contents never leave your device." },
];

export default function SignatureGeneratorIndia() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature Generator India Free (GST, Aadhaar & Banking) | Pixocraft",
    description:
      "Create signature online in India for GST, Aadhaar, banking, and documents. Free, secure, and no login required. Transparent PNG download in seconds.",
    keywords:
      "signature generator india, create signature online india, digital signature india free, esign india online, signature for gst india, online signature maker india, free signature creator india, signature for aadhaar india, signature for banking india",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Signature Generator India – Pixocraft",
    description:
      "Create signature online in India for GST, Aadhaar, banking, and documents. Free, secure, no login required. Transparent PNG download in seconds.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    applicationSubCategory: "Signature Generator India",
    operatingSystem: "Web, iOS, Android",
    featureList: [
      "Free signature generator India",
      "No login required",
      "No upload needed",
      "Works for GST and Aadhaar in India",
      "Fast and private — 100% browser-based",
      "Transparent PNG download",
      "Mobile-friendly touch drawing",
      "Secure for Indian business documents",
    ],
    areaServed: { "@type": "Country", "name": "India" },
    offers: { price: "0", priceCurrency: "INR" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                       url: "https://tools.pixocraft.in/" },
    { name: "Tools",                      url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools",            url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Signature Generator India",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Signature Generator India Free (GST, Aadhaar & Banking) | Pixocraft",
    description:
      "Create signature online in India for GST, Aadhaar, banking, and documents. Free, secure, and no login required.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create Signature Online in India Free",
    description:
      "Create a free online signature in India for GST invoices, Aadhaar forms, banking documents, and contracts in under 60 seconds.",
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
          { label: "Home",                      url: "https://tools.pixocraft.in/" },
          { label: "Tools",                     url: "/tools" },
          { label: "Signature Tools",           url: "/tools/signature-tools" },
          { label: "Signature Generator", url: "/tools/signature-pad-tool" },
          { label: "Signature Generator India" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Signature Generator India (Free &amp; Easy Online Tool)
              </h1>
              <p className="hidden md:block text-sm text-muted-foreground">India Ready · GST Compatible · Aadhaar Use · No Login · 100% Free</p>
            </div>
          </div>

          <p className="hidden md:block text-base text-muted-foreground mb-5 leading-relaxed">
            Create signature online for <strong>GST, Aadhaar, banking, and documents in India</strong>.
            No login, no upload, fully secure — all processing happens in your browser.
            Download your transparent PNG signature in under 60 seconds and use it on any Indian business document.
          </p>

          {/* Trust badges */}
          <div className="hidden md:flex flex-wrap gap-2 mb-5">
            {[
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "India Ready" },
              { icon: <Receipt className="h-3.5 w-3.5" />,    label: "GST Compatible" },
              { icon: <FileText className="h-3.5 w-3.5" />,   label: "Aadhaar Use" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Login" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "100% Free" },
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
              { n: 1, label: "Open Tool" },
              { n: 2, label: "Draw / Type" },
              { n: 3, label: "Customise" },
              { n: 4, label: "Download PNG" },
            ].map(({ n, label }) => (
              <div key={n} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{n}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* E-E-A-T micro-trust */}
          <div className="hidden md:flex flex-wrap gap-4 mb-6">
            {[
              { icon: <Users className="h-3.5 w-3.5 text-primary" />,   label: "Trusted by Indian businesses, CAs & MSMEs" },
              { icon: <Receipt className="h-3.5 w-3.5 text-primary" />, label: "Works for GST invoices, Tally & government forms" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />,  label: "Zero data stored — 100% browser-based" },
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
              data-testid="button-create-signature-india"
            >
              <PenTool className="h-4 w-4" />Create Signature Free<ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <SignatureToolSection />
        <div className="mb-12 rounded-xl overflow-hidden border">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=300&fit=crop"
            alt="Signature generator India GST Aadhaar example — free online tool by Pixocraft"
            width={600}
            height={300}
            loading="lazy"
            className="w-full object-cover"
          />
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* ── FEATURED SNIPPET ─────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What Is a Signature Generator in India?</h2>
            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 mb-5">
              <p className="text-foreground font-medium">
                A <strong>signature generator in India</strong> is a free online tool that allows Indian users to create a
                digital signature for GST invoices, Aadhaar forms, banking documents, and contracts — instantly, without
                any login or upload. You draw, type, or upload your signature and download a transparent PNG that works
                on any Indian business document.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              Indian businesses, freelancers, MSMEs, CAs, and professionals use online signature generators
              to sign documents digitally — eliminating the need to print, sign, scan, and re-upload.
              With increasing digitisation across <strong>GST filing, Aadhaar KYC, banking, and government portals</strong>,
              a reusable digital signature has become an essential tool for every Indian working professional.
            </p>
            <p className="text-muted-foreground">
              Pixocraft's <strong>free signature generator India</strong> is built specifically for Indian workflows —
              supporting GST invoice templates, Tally billing software, Aadhaar-linked forms, bank KYC documents,
              and all contract types used daily by Indian businesses.
            </p>
          </section>

          {/* ── WHY SIGNATURE IS IMPORTANT IN INDIA ──────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Why Is a Signature Important in India?</h2>
            <p className="text-muted-foreground mb-5">
              In India, a signature is not just a formality — it is a legal requirement across dozens of government,
              financial, and commercial transactions. Here is why Indian businesses and individuals need a digital
              signature readily available:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "GST Invoices",
                  body: "Under the CGST Act 2017, GST invoices issued by registered businesses must bear the signature of the authorised signatory. Every GST-registered business in India — from sole proprietors to large corporates — needs a consistent signature on every invoice they raise.",
                },
                {
                  title: "Aadhaar KYC",
                  body: "Aadhaar-linked KYC processes for bank accounts, SIM card verification, insurance, and government scheme enrollment often require a signed declaration form. A digital signature eliminates the need to sign physical paperwork for these processes.",
                },
                {
                  title: "Bank Forms",
                  body: "Account opening forms, loan applications, mandate forms, and investment instructions submitted to Indian banks — SBI, HDFC, ICICI, Axis, and others — require a signature. Digital submission of signed PDFs is now accepted by most Indian banks.",
                },
                {
                  title: "Government Documents",
                  body: "Affidavits, applications, declarations, and forms submitted to central and state government departments, revenue offices, RTOs, municipal corporations, and gram panchayats increasingly accept digitally signed PDFs.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border bg-card px-5 py-4">
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="hidden md:block text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHERE USED IN INDIA ───────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Where Is a Signature Used in India?</h2>
            <p className="text-muted-foreground mb-5">
              A digital signature created with this free tool can be used across a wide range of Indian business,
              government, and financial contexts:
            </p>
            <ul className="space-y-3">
              {[
                { label: "GST Filing",                  desc: "Sign GST invoices, debit notes, credit notes, and documents submitted to GST-registered customers and buyers." },
                { label: "Tally Invoices",              desc: "Insert transparent PNG signature into TallyPrime invoice templates, purchase orders, delivery challans, and quotations." },
                { label: "Aadhaar Updates",             desc: "Sign declaration forms, address proof submissions, and consent documents related to Aadhaar updates and corrections." },
                { label: "Bank KYC",                    desc: "Sign KYC forms, account opening applications, FATCA declarations, and SIP mandate forms submitted digitally to Indian banks and AMCs." },
                { label: "Contracts",                   desc: "Execute NDAs, service agreements, freelance contracts, partnership deeds, and lease agreements as signed digital documents." },
                { label: "Company Documents",           desc: "Internal board resolutions, shareholder agreements, MoUs, and company correspondence where a director or authorised signatory's signature is required." },
                { label: "HR & Employment",             desc: "Offer letters, appointment letters, training acknowledgements, and policy sign-off documents in paperless HR workflows." },
                { label: "Export Documents",            desc: "Commercial invoices, packing lists, and export declarations for Indian exporters and traders dealing with international clients." },
              ].map(({ label, desc }) => (
                <li key={label} className="flex gap-3">
                  <Check className="h-4 w-4 text-primary mt-1 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">{label}:</span>{" "}
                    <span className="text-muted-foreground">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── HOW TO CREATE ─────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">How to Create Signature Online in India (Step by Step)</h2>
            <p className="text-muted-foreground mb-5">
              Creating your signature with Pixocraft's free India signature generator takes less than 60 seconds.
              No software, no account, no payment — just open, create, and download:
            </p>
            <div className="space-y-3">
              {HOW_TO_STEPS.map(({ n, title, desc }) => (
                <div key={n} className="flex gap-4 rounded-xl border bg-card px-5 py-4">
                  <span className="h-8 w-8 rounded-full bg-primary/10 text-primary text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">{n}</span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                    <p className="hidden md:block text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── DIGITAL VS NORMAL ─────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Digital Signature vs Normal Signature in India</h2>
            <p className="text-muted-foreground mb-5">
              Understanding the difference between a digital signature, a DSC, and a normal handwritten signature
              is important for Indian businesses to choose the right method for each document type:
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-5">
              {[
                {
                  title: "Normal Handwritten",
                  items: ["Physical pen on paper", "For physical documents", "Cannot reuse digitally", "Needs scan/photocopy"],
                },
                {
                  title: "PNG Digital Signature",
                  highlight: true,
                  items: ["Transparent PNG image", "For GST, contracts, forms", "Reusable across all documents", "Instant free download"],
                },
                {
                  title: "DSC (Class 3)",
                  items: ["Cryptographic USB token", "For MCA, eCourts, ITR", "₹1,000–₹3,000/year", "1–3 days from CA"],
                },
              ].map(({ title, items, highlight }) => (
                <div key={title} className={`rounded-xl border px-5 py-4 ${highlight ? "bg-primary/5 border-primary/30" : "bg-card"}`}>
                  <h3 className={`font-semibold mb-3 ${highlight ? "text-primary" : "text-foreground"}`}>{title}</h3>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <Check className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${highlight ? "text-primary" : "text-muted-foreground"}`} />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-card px-5 py-4">
              <p className="hidden md:block text-sm text-muted-foreground">
                <strong className="text-foreground">India context:</strong> For everyday business — GST invoices, commercial contracts, bank forms, Aadhaar-linked declarations —
                a <strong>PNG digital signature</strong> is legally valid under the IT Act 2000 and practically sufficient. A DSC is only
                required for specific regulated government portal filings (MCA21, eCourts, income tax e-verification via portal).
              </p>
            </div>
          </section>

          {/* ── AADHAAR ESIGN ─────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Aadhaar eSign in India – What You Need to Know</h2>
            <p className="text-muted-foreground mb-4">
              <strong>Aadhaar eSign</strong> is a government-backed electronic signature service from UIDAI (Unique
              Identification Authority of India) that uses your 12-digit Aadhaar number and a one-time password (OTP)
              sent to your Aadhaar-linked mobile number to authenticate and digitally sign documents.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-5">
              {[
                {
                  title: "How Aadhaar eSign Works",
                  body: "The document is uploaded to an authorised eSign service provider (like eMudhra, Sify, CDAC). You enter your Aadhaar number, receive an OTP, and the signature is attached using UIDAI's API. The signed document carries a digital certificate linked to your Aadhaar identity.",
                },
                {
                  title: "When Is Aadhaar eSign Required?",
                  body: "Aadhaar eSign is primarily used for regulated transactions — Aadhaar-based loan agreements (NBFC/bank), government scheme enrollments, enterprise HR onboarding requiring identity-verified signatures, and documents requiring audit trail with Aadhaar authentication.",
                },
                {
                  title: "Pixocraft Signature vs Aadhaar eSign",
                  body: "Pixocraft's PNG signature tool is free, instant, and private — sufficient for GST invoices, contracts, and most commercial documents. Aadhaar eSign is for regulated, identity-verified transactions. Choose based on your specific document requirement.",
                },
                {
                  title: "Can I Use PNG Signature on Aadhaar Forms?",
                  body: "Yes — for Aadhaar KYC declaration forms, consent forms, and address-update supporting documents that do not require Aadhaar-authenticated eSign, a PNG digital signature is accepted. Always check the specific form's instructions.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border bg-card px-5 py-4">
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="hidden md:block text-sm text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FEATURES ─────────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Features of This Free Signature Generator India</h2>
            <p className="text-muted-foreground mb-5">
              Pixocraft's signature generator is built with Indian users in mind — fast, private,
              and ready for every Indian document workflow:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 rounded-xl border bg-card px-5 py-4">
                  <div className="shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                    <p className="hidden md:block text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── BEST FORMAT ──────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Best Signature Format for Indian Documents</h2>
            <p className="text-muted-foreground mb-5">
              Choosing the right format for your digital signature matters — especially when inserting into
              GST invoices, Tally templates, and professional contracts:
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Transparent PNG",
                  badge: "Recommended",
                  points: [
                    "No white background box",
                    "Overlays on any document colour",
                    "Professional look on GST invoices",
                    "Pixocraft exports this by default",
                  ],
                },
                {
                  title: "JPEG / JPG",
                  badge: "Not Recommended",
                  warn: true,
                  points: [
                    "White background visible",
                    "Looks unprofessional on coloured templates",
                    "Cannot overlay on documents",
                    "Avoid for GST and contracts",
                  ],
                },
                {
                  title: "Print Resolution",
                  badge: "High Quality",
                  points: [
                    "3200px wide output",
                    "Crisp at any document size",
                    "Scales without quality loss",
                    "Professional print-ready quality",
                  ],
                },
              ].map(({ title, badge, warn, points }) => (
                <div key={title} className="rounded-xl border bg-card px-5 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold text-foreground">{title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${warn ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}>{badge}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm">
                        {warn
                          ? <X className="h-3.5 w-3.5 mt-0.5 text-destructive shrink-0" />
                          : <Check className="h-3.5 w-3.5 mt-0.5 text-primary shrink-0" />}
                        <span className="text-muted-foreground">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── USE CASES ────────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">India-Specific Use Cases for This Signature Generator</h2>
            <p className="text-muted-foreground mb-5">
              This tool is purpose-built for the Indian business ecosystem — covering the most common signature
              requirements across Indian industries and professions:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {USE_CASES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 rounded-xl border bg-card px-5 py-4">
                  <div className="shrink-0 mt-0.5">{icon}</div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                    <p className="hidden md:block text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── COMPARISON ───────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Pixocraft vs Other Signature Tools in India</h2>
            <p className="text-muted-foreground mb-5">
              Most online signature tools are built for global markets — they require logins, charge fees, or upload
              your documents to foreign servers. Pixocraft is different:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">Pixocraft (This Tool)</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Other Tools</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {COMPARISON_ROWS.map(({ feature, pixocraft, others }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-4 py-3.5 text-primary/80 font-medium">{pixocraft}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── FAQ ──────────────────────────────────────────────────────────── */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
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
                    <div className="px-5 pb-4">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
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
