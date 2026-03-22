import { useState } from "react";
import { Link } from "wouter";
import {
  useSEO,
  StructuredData,
  generateFAQSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import SignatureToolSection from "@/components/SignatureToolSection";
import {
  Shield, Zap, Check, FileText, ChevronDown, ChevronUp,
  ArrowRight, Lock, BadgeCheck, Download, Smartphone,
  Star, XCircle, PenTool, Layers, Key, Fingerprint,
  Building2, Receipt, Scale, AlertCircle, Globe,
  FileCheck, Briefcase, Users, CreditCard,
} from "lucide-react";

const CANONICAL = "https://tools.pixocraft.in/tools/how-to-create-digital-signature";
const LAST_UPDATED = "March 2026";

const FAQS = [
  {
    question: "How to create a digital signature online for free?",
    answer:
      "Use the Pixocraft tool on this page. Draw with your mouse or touch, or type your name and pick a handwriting font. Click Download PNG — you get a transparent, watermark-free signature in under 60 seconds. No login, no payment, no software.",
  },
  {
    question: "What is the difference between an electronic signature and a digital signature?",
    answer:
      "An electronic signature is any symbol or image that represents your approval on a digital document — including a PNG image of your handwritten signature. A digital signature (DSC) is a cryptographic certificate issued by a licensed Certifying Authority — it verifies identity mathematically and is required for regulated government filings such as MCA ROC, court submissions, and income tax portal e-verification.",
  },
  {
    question: "Is a digital signature legally valid in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 (Section 3A), electronic signatures — including image-based PNG signatures — are legally valid for commercial contracts, GST invoices, NDAs, freelance agreements, and most business documents. A certified DSC is additionally required for specific government portal filings.",
  },
  {
    question: "What is a DSC (Digital Signature Certificate) and who needs one?",
    answer:
      "A DSC is a cryptographic token issued by a licensed Certifying Authority (CA) like eMudhra, NSDL, or Sify. It is mandatory for MCA company filings, income tax portal e-verification, court e-filing, and certain government tender portals. Regular professionals and freelancers doing commercial work do not need a DSC — a PNG image signature is fully sufficient.",
  },
  {
    question: "How do I get a DSC (Digital Signature Certificate) in India?",
    answer:
      "Purchase from a licensed Certifying Authority (CA) such as eMudhra, NSDL e-Governance, Sify, or Capricorn. Submit identity proof (PAN, Aadhaar), verify via video KYC, pay the fee (₹800–₹3,000 depending on class and validity), and receive a USB token pre-loaded with your DSC. Total time is 1–3 working days.",
  },
  {
    question: "What is Aadhaar eSign and when is it used?",
    answer:
      "Aadhaar eSign is a government service by UIDAI that lets you sign documents electronically using your Aadhaar number and OTP verification. It creates a legally binding certified signature without a physical USB token — used in loan applications, government scheme enrollments, insurance KYC, and enterprise eSign workflows. It is faster than a DSC but limited to Aadhaar-integrated portals.",
  },
  {
    question: "Can I create a digital signature on mobile?",
    answer:
      "Yes. The Pixocraft tool on this page works fully on any smartphone. Open it in your mobile browser and draw your signature using your finger on the touchscreen canvas. Download the transparent PNG directly to your device. Works on iOS and Android without any app download.",
  },
  {
    question: "What is the best image format for a digital signature?",
    answer:
      "Transparent PNG is the correct format for digital signatures used in documents. PNG supports transparency so your signature overlays cleanly on any coloured background without a white box. JPEG creates a white rectangle around the strokes and looks unprofessional on anything other than a white background.",
  },
  {
    question: "Do I need to install software to create a digital signature?",
    answer:
      "No — for an image-based signature. The Pixocraft tool runs entirely in your browser with no installation. For a DSC, you need to install your Certifying Authority's signing software and USB token drivers — these are provided by the CA when you purchase.",
  },
  {
    question: "Where can I use a digital signature created online?",
    answer:
      "You can use it in PDFs (via any PDF editor or Pixocraft's PDF tool), Microsoft Word documents (Insert → Pictures), Google Docs (Insert → Image), GST invoices in Tally or any billing software, email signatures, HTML letterheads, and any online form that accepts signature image uploads.",
  },
  {
    question: "Can I reuse my digital signature in multiple documents?",
    answer:
      "Yes. Download your signature once as a transparent PNG and save it permanently on your device or Google Drive. Reuse it across unlimited documents — simply insert the same file each time. No re-drawing required.",
  },
  {
    question: "Is a digital signature created on Pixocraft uploaded to any server?",
    answer:
      "No. All processing happens locally inside your browser. Your signature drawing strokes, name, and the PNG you download are never sent to any server. 100% private and GDPR-safe.",
  },
];

const EASY_STEPS = [
  {
    name: "Open the Pixocraft signature tool",
    text: "Use the tool on this page. No login, no account creation, no installation. The tool opens instantly in your browser on desktop or mobile.",
  },
  {
    name: "Draw, type, or upload your signature",
    text: "Draw tab: sign with mouse or finger. Type tab: enter your name, choose from 50+ handwriting fonts. Upload tab: photograph your physical signature and digitise it.",
  },
  {
    name: "Adjust thickness and colour",
    text: "Use the stroke thickness slider to match your natural pen weight. Black is standard for most documents. Use blue for legal filings where blue ink is traditional.",
  },
  {
    name: "Download as transparent PNG",
    text: "Click Download → PNG. The file saves to your device with a transparent background — no watermark, no white box, no login required.",
  },
  {
    name: "Insert into any document",
    text: "Use your PNG in PDFs, Word, Google Docs, GST invoice templates, or any form that accepts image uploads. Resize from a corner handle for proportional scaling.",
  },
];

const DSC_STEPS = [
  {
    name: "Choose a licensed Certifying Authority (CA)",
    text: "Select from government-approved CAs: eMudhra, NSDL e-Governance, Sify, Capricorn, or PantaSign. Compare prices and class (Class 2 for GST, Class 3 for MCA and courts).",
  },
  {
    name: "Submit identity and address proof",
    text: "Provide a scanned PAN card, Aadhaar, and passport-size photo. Fill the online application on the CA's website. Some CAs also accept video KYC for faster processing.",
  },
  {
    name: "Pay the DSC fee",
    text: "DSC fees range from ₹800 (1-year Class 2) to ₹3,000 (3-year Class 3). Pay online via UPI, net banking, or debit card. Processing time is typically 1–3 working days.",
  },
  {
    name: "Receive your USB token",
    text: "The CA ships a USB token (ePass, SafeNet, WD Pro) pre-loaded with your DSC. Install the CA's signing software and USB drivers on your computer.",
  },
  {
    name: "Register on the target portal",
    text: "Log in to the government portal (MCA21, TRACES, eCourts) and register your DSC. Plug in the USB token and sign documents directly from the portal's signing interface.",
  },
];

const SIG_TYPES = [
  {
    icon: <PenTool className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Type A",
    title: "Electronic Signature (Image-Based)",
    desc: "A PNG image of your handwritten signature — created on Pixocraft in under 60 seconds. Valid for all commercial and business documents under the IT Act 2000.",
    uses: ["Commercial contracts", "Freelance agreements", "GST invoices", "NDAs", "Offer letters", "Google Docs & PDFs"],
    badge: "Suitable for most use cases",
    color: "primary",
  },
  {
    icon: <Key className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Type B",
    title: "Digital Signature Certificate (DSC)",
    desc: "A cryptographic certificate on a USB token, issued by a licensed Certifying Authority. Required specifically for regulated government portal filings.",
    uses: ["MCA company filings", "Income tax e-verification", "Court e-filing", "Government tenders", "Customs and DGFT", "EPFO employer portal"],
    badge: "Required for government portals",
    color: "primary",
  },
  {
    icon: <Fingerprint className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Type C",
    title: "Aadhaar eSign",
    desc: "OTP-based signing via UIDAI's Aadhaar infrastructure. Creates a certified electronic signature without a USB token. Available in Aadhaar-integrated portals only.",
    uses: ["Loan applications", "Insurance KYC", "Government scheme enrolments", "Enterprise eSign platforms", "NBFC onboarding", "DigiLocker document signing"],
    badge: "Aadhaar-integrated portals",
    color: "primary",
  },
];

const USAGE_PLACES = [
  { icon: <FileText className="h-5 w-5 text-primary" />,    title: "PDF Documents",          desc: "Insert PNG via any PDF editor, or use Pixocraft's PDF signing tool. Works in Adobe, Foxit, and online PDF tools." },
  { icon: <FileCheck className="h-5 w-5 text-primary" />,   title: "Word Documents",         desc: "Insert → Pictures in Microsoft Word. Resize from corner handle and set text wrapping to 'Behind Text' for signature line placement." },
  { icon: <Globe className="h-5 w-5 text-primary" />,       title: "Google Docs",            desc: "Insert → Image → Upload from computer. Set to Inline alignment for stable positioning on the signature line." },
  { icon: <Receipt className="h-5 w-5 text-primary" />,     title: "GST Invoices (Tally)",   desc: "Embed the PNG in your Tally invoice template or billing software's signature field. Required for authorised signatory compliance." },
  { icon: <Building2 className="h-5 w-5 text-primary" />,   title: "MCA & Government Forms", desc: "These require a certified DSC on a USB token — an image signature is not accepted for regulated government portal submissions." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />,   title: "Contracts & Agreements", desc: "Freelance contracts, vendor agreements, and NDAs. PNG signature is legally valid under IT Act 2000 for all commercial agreements." },
];

const DS_VS_ESIGN = [
  { aspect: "What it is",        digital: "Cryptographic certificate on USB token",  esign: "Image or typed name on a document" },
  { aspect: "Issued by",         digital: "Licensed Certifying Authority (CA)",       esign: "Self-created or via online tool" },
  { aspect: "Security",          digital: "Cryptographic verification + audit trail", esign: "Visual only" },
  { aspect: "Cost",              digital: "₹800–₹3,000 per year",                    esign: "Free (Pixocraft)" },
  { aspect: "Required for",      digital: "MCA, courts, income tax portal",           esign: "Contracts, invoices, agreements" },
  { aspect: "Setup time",        digital: "1–3 working days",                         esign: "Under 60 seconds" },
  { aspect: "Works offline",     digital: "Yes (USB token)",                          esign: "Yes (PNG saved to device)" },
  { aspect: "Legally valid",     digital: "Yes — IT Act 2000 + Companies Act",        esign: "Yes — IT Act 2000 Section 3A" },
];

const COMPARISON_ROWS = [
  { feature: "Cost",               pixocraft: "Free forever",        others: "Paid / Freemium" },
  { feature: "Login required",     pixocraft: "No",                  others: "Yes" },
  { feature: "Data uploaded",      pixocraft: "None",                others: "Server upload" },
  { feature: "Works offline",      pixocraft: "Yes",                 others: "Mostly no" },
  { feature: "Transparent PNG",    pixocraft: "Yes",                 others: "Often watermarked" },
  { feature: "Mobile support",     pixocraft: "Full touchscreen",    others: "Partial" },
  { feature: "Time to signature",  pixocraft: "Under 60 seconds",   others: "3–10 minutes" },
];

const INTERNAL_LINKS = [
  { href: "/tools/signature-pad-tool",             label: "Signature Generator" },
  { href: "/tools/signature-for-pdf",               label: "Signature for PDF" },
  { href: "/tools/signature-for-word",              label: "Signature in Word Document" },
  { href: "/tools/signature-for-aadhaar",           label: "Signature for Aadhaar" },
  { href: "/tools/signature-for-google-docs",       label: "Signature in Google Docs" },
  { href: "/tools/digital-signature-generator",     label: "Digital Signature Generator" },
];

export default function HowToCreateDigitalSignature() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "How to Create Digital Signature Online Free (Easy Guide)",
    description:
      "Learn how to create digital signature online free. Create simple signature or understand DSC and Aadhaar eSign. No login tool.",
    canonicalUrl: CANONICAL,
    ogType: "website",
    ogImage: "https://tools.pixocraft.in/images/digital-signature-tool.png",
    keywords:
      "how to create digital signature, create digital signature online, digital signature how to make, esign online free, digital signature vs electronic signature",
  });

  const schemas = [
    generateFAQSchema(FAQS),
    generateHowToSchema({
      name: "How to Create Digital Signature Online",
      description:
        "Create a free digital signature (transparent PNG) in under 60 seconds using Pixocraft — no login, no software, works on desktop and mobile.",
      steps: EASY_STEPS,
    }),
    generateSoftwareApplicationSchema({
      name: "Digital Signature Generator Tool",
      description:
        "Free tool to create digital signature online. Supports handwritten, typed, and image signatures for documents.",
      url: CANONICAL,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { price: "0", priceCurrency: "INR" },
    }),
    generateBreadcrumbSchema([
      { name: "Home",                           url: "https://tools.pixocraft.in" },
      { name: "Tools",                          url: "https://tools.pixocraft.in/tools" },
      { name: "Signature Tools",               url: "https://tools.pixocraft.in/tools/signature-tools" },
      { name: "How to Create Digital Signature", url: CANONICAL },
    ]),
  ];

  return (
    <div className="min-h-screen bg-background">
      {schemas.map((schema, i) => (
        <StructuredData key={i} data={schema} />
      ))}

      <div className="max-w-4xl mx-auto px-4 py-5 sm:py-8 space-y-6 sm:space-y-10">

        {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
        <Breadcrumb
          items={[
            { label: "Home",                          url: "/" },
            { label: "Tools",                         url: "/tools" },
            { label: "Signature Tools",               url: "/tools/signature-tools" },
            { label: "Signature Generator", url: "/tools/signature-pad-tool" },
            { label: "How to Create Digital Signature" },
          ]}
        />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <BadgeCheck className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              How to Create Digital Signature Online –{" "}
              <span className="text-primary">Free & Easy</span>
            </h1>
          </div>
          <p className="hidden sm:block text-sm sm:text-base text-muted-foreground leading-relaxed">
            <strong>Create your digital signature instantly</strong> using the free tool below — or learn how official
            <strong> DSC and Aadhaar eSign</strong> work for government and legal filings. Both methods explained
            clearly. No login, fully private.
          </p>
          <p className="text-base font-semibold text-foreground">
            <strong>Create digital signature in under 60 seconds — no login, no software, 100% free.</strong>
          </p>
          <div className="hidden sm:flex flex-wrap gap-2">
            {[
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Login" },
              { icon: <Star className="h-3.5 w-3.5" />,       label: "Transparent PNG" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "IT Act 2000 Valid" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "100% Private" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Under 60 Seconds" },
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
        <div className="hidden sm:block rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-4 sm:px-6 sm:py-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quick Answer</p>
          <h2 className="text-base sm:text-lg font-bold text-foreground">How to create a digital signature?</h2>
          <div className="space-y-3 text-sm text-foreground leading-relaxed">
            <div className="flex gap-3 items-start">
              <span className="shrink-0 font-bold text-primary text-xs mt-0.5 uppercase tracking-wider">Simple method</span>
              <p>Use the free Pixocraft tool on this page. Draw or type your signature, download a transparent PNG, and insert it into any document — PDF, Word, or Google Docs. Takes under 60 seconds, no login.</p>
            </div>
            <div className="flex gap-3 items-start">
              <span className="shrink-0 font-bold text-primary text-xs mt-0.5 uppercase tracking-wider">Advanced DSC</span>
              <p>For government portals (MCA, income tax courts), purchase a Class 3 DSC from a licensed Certifying Authority like eMudhra or NSDL. Requires identity verification and a USB token. Takes 1–3 working days.</p>
            </div>
          </div>
          <div className="hidden sm:grid grid-cols-4 gap-3 pt-1">
            {[
              { label: "Image signature cost", value: "Free" },
              { label: "DSC cost",             value: "₹800–₹3,000/yr" },
              { label: "Simple method time",   value: "Under 60 sec" },
              { label: "DSC setup time",       value: "1–3 days" },
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
          caption="Draw or type your digital signature · Download transparent PNG · Free forever · No watermark"
        />

        {/* ── WHAT IS A DIGITAL SIGNATURE ───────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">What is a Digital Signature?</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <p className="text-foreground leading-relaxed">
              "Digital signature" means two completely different things depending on context — and confusing them leads to wrong choices:
            </p>
            <div className="space-y-3 mt-2">
              <div className="flex gap-3 p-4 rounded-lg border bg-background">
                <PenTool className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Meaning 1: Electronic Signature (Image)</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    A visual image of your handwritten signature — created on a tool like Pixocraft and saved as a transparent PNG. Legally valid under the IT Act 2000 for all commercial documents. Free, instant, no hardware required.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 p-4 rounded-lg border bg-background">
                <Key className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Meaning 2: Digital Signature Certificate (DSC)</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    A cryptographic certificate on a physical USB token, issued by a government-licensed Certifying Authority (CA). Required specifically for MCA filings, court submissions, and income tax portal e-verification. Costs ₹800–₹3,000 per year.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-2 rounded-lg bg-primary/5 border border-primary/20 px-4 py-3">
              <p className="text-sm font-medium text-foreground">
                <AlertCircle className="h-4 w-4 text-primary inline mr-1.5 -mt-0.5" />
                For most users: an image-based electronic signature covers 95% of real-world signing needs. A DSC is needed only for specific government portal submissions.
              </p>
            </div>
          </div>
        </section>

        {/* ── 3 TYPES ──────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">3 Types of Digital Signature in India</h2>
          <div className="space-y-3">
            {SIG_TYPES.map(({ icon, label, title, desc, uses, badge }) => (
              <div key={title} className="rounded-xl border bg-card p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
                      <span className="text-[10px] font-bold bg-muted border px-2 py-0.5 rounded-full text-muted-foreground uppercase tracking-wider">
                        {badge}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mt-0.5">{title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <div className="hidden sm:flex flex-wrap gap-2">
                  {uses.map((u) => (
                    <span key={u} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 border rounded-full px-2.5 py-1">
                      <Check className="h-3 w-3 text-primary" />{u}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW TO CREATE — EASY METHOD ───────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">How to Create Digital Signature — Easy Method (Image)</h2>
          <p className="text-muted-foreground leading-relaxed">
            For contracts, PDFs, Word, Google Docs, GST invoices, and all commercial documents. Takes under 60 seconds.
          </p>
          <ol className="space-y-3">
            {EASY_STEPS.map(({ name, text }, i) => (
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

        {/* ── HOW TO GET A DSC ──────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">How to Create a Real Digital Signature (DSC)</h2>
          <p className="text-muted-foreground leading-relaxed">
            Only needed for MCA filings, court e-filing, and government portal authentication. Here is the complete process:
          </p>
          <ol className="space-y-3">
            {DSC_STEPS.map(({ name, text }, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
                <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{i + 1}</span>
                <div>
                  <p className="font-semibold text-foreground">{name}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="rounded-xl border bg-muted/30 px-5 py-4">
            <p className="text-sm font-semibold text-foreground">Licensed Certifying Authorities in India</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {["eMudhra", "NSDL e-Governance", "Sify Technologies", "Capricorn CA", "PantaSign", "Vsign"].map((ca) => (
                <span key={ca} className="text-xs border rounded-full px-3 py-1 text-muted-foreground bg-background">{ca}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── AADHAAR ESIGN ────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Aadhaar eSign — India's Paperless Signature</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <div className="flex items-start gap-3">
              <Fingerprint className="h-6 w-6 text-primary shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-foreground font-medium">
                  Aadhaar eSign is a service by UIDAI that allows you to electronically sign documents using your <strong>Aadhaar number + OTP</strong> — without a physical USB token.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  It creates a cryptographically certified signature, legally valid under the IT Act 2000 and accepted by banks, NBFCs, insurance companies, and government schemes. It is faster than a DSC and does not require hardware — but only works within Aadhaar-integrated portals and platforms.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {[
                { label: "Identification method", value: "Aadhaar OTP" },
                { label: "Hardware required",     value: "None" },
                { label: "Where it works",        value: "Aadhaar-enabled portals only" },
              ].map(({ label, value }) => (
                <div key={label} className="rounded-lg border bg-background p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                  <p className="font-semibold text-foreground text-sm mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHERE IS DIGITAL SIGNATURE USED ──────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Where Digital Signature is Used</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {USAGE_PLACES.map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DS VS E-SIGN COMPARISON TABLE ────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Digital Signature vs Electronic Signature</h2>
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Aspect</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">Digital Signature (DSC)</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Electronic Signature (Image)</th>
                  </tr>
                </thead>
                <tbody>
                  {DS_VS_ESIGN.map(({ aspect, digital, esign }, i) => (
                    <tr key={aspect} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="px-4 py-3 text-muted-foreground font-medium">{aspect}</td>
                      <td className="px-4 py-3 text-foreground">{digital}</td>
                      <td className="px-4 py-3 text-foreground">{esign}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── BEST FORMAT ───────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Best Format for Digital Signature Image</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <ul className="space-y-3">
              {[
                { label: "PNG (not JPEG)", desc: "PNG supports a transparent background. JPEG creates a white box around your signature strokes — looks unprofessional on invoices, letterheads, or any coloured surface." },
                { label: "Transparent background", desc: "Your signature floats cleanly over text lines, coloured table cells, and stamps without any visible rectangle or border." },
                { label: "High resolution (4× display density)", desc: "Pixocraft exports at 4× resolution — your signature remains sharp when the document is printed or saved as a high-DPI PDF." },
                { label: "File size under 200 KB", desc: "Compact PNG files keep documents lightweight and load fast in Google Docs, email attachments, and online portals." },
              ].map(({ label, desc }) => (
                <li key={label} className="flex gap-3 text-sm items-start">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">{label}: </span>
                    <span className="text-muted-foreground">{desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── SAVE & REUSE ─────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Save & Reuse Your Digital Signature</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <p className="text-foreground font-medium">Create once, reuse forever across all documents:</p>
            <ul className="space-y-2">
              {[
                "Save PNG to a permanent folder — Google Drive, Desktop, or Documents",
                "Insert the same file in every PDF, Word, Google Doc you sign",
                "Add to your email signature as an image",
                "Embed in invoice templates in Tally, Zoho, or any billing software",
                "Upload to portals and forms that accept signature image files",
                "All data stays local — never uploaded, always available offline",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted-foreground items-start">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { icon: <Lock className="h-4 w-4" />,       label: "No Login" },
                { icon: <Shield className="h-4 w-4" />,     label: "100% Private" },
                { icon: <Zap className="h-4 w-4" />,        label: "Works Offline" },
                { icon: <Smartphone className="h-4 w-4" />, label: "Mobile Ready" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-lg border bg-background text-center">
                  <span className="text-primary">{icon}</span>
                  <p className="text-xs font-semibold text-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEGAL CLARITY ────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Legal Clarity — Image Signature vs DSC</h2>
          <div className="space-y-3">
            {[
              {
                icon: <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />,
                title: "Image signature is legally valid for most documents",
                desc: "Under IT Act 2000 Section 3A, an image-based electronic signature is legally valid for commercial contracts, NDAs, invoices, employment letters, freelance agreements, and vendor onboarding. No DSC required.",
              },
              {
                icon: <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />,
                title: "DSC is required specifically for government portal filings",
                desc: "MCA company registration and annual filing, income tax portal e-verification, court e-filing via eCourts, and certain customs and DGFT submissions require a Class 3 DSC. An image signature is not accepted for these use cases.",
              },
              {
                icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
                title: "Image signature ≠ DSC — they are not interchangeable",
                desc: "A PNG image signature does not have a cryptographic audit trail or CA verification. Trying to use it in place of a DSC on regulated portals will result in rejection. Use each for its appropriate context.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                {icon}
                <div>
                  <p className="font-semibold text-foreground text-sm">{title}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARISON ───────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Pixocraft vs Other Signature Tools</h2>
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/40">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Other Tools</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map(({ feature, pixocraft, others }, i) => (
                    <tr key={feature} className={i % 2 === 0 ? "" : "bg-muted/20"}>
                      <td className="px-4 py-3 text-muted-foreground font-medium">{feature}</td>
                      <td className="px-4 py-3 text-primary font-semibold">{pixocraft}</td>
                      <td className="px-4 py-3 text-muted-foreground">{others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
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

        {/* ── INTERNAL LINKS ───────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Related Signature Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {INTERNAL_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>
                <div
                  className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border bg-card hover-elevate transition-all"
                  data-testid={`link-related-${href.split("/").pop()}`}
                >
                  <span className="text-sm font-medium text-foreground">{label}</span>
                  <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link href="/tools/signature-tools">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-2" data-testid="link-all-signature-tools">
                View all Signature Tools <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </section>

        {/* ── BOTTOM BREADCRUMB ─────────────────────────────────────────────── */}
        <div className="pt-4 border-t">
          <Breadcrumb
            items={[
              { label: "Home",                          url: "/" },
              { label: "Tools",                         url: "/tools" },
              { label: "Signature Tools",               url: "/tools/signature-tools" },
              { label: "How to Create Digital Signature" },
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
