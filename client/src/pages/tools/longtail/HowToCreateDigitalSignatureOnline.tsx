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
  Smartphone, Star, PenTool, Upload, Type, Layers,
  Receipt, Mail, Scale, Users, MousePointer2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/how-to-create-digital-signature-online";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const FAQS = [
  {
    question: "How long does it take to create a digital signature online?",
    answer:
      "Most users finish in under 60 seconds. Open the tool, choose Draw (mouse or finger), Type (pick a handwriting font), or Upload (photo of your physical signature). Customise the colour and stroke, then click Download. The transparent PNG saves directly to your device — ready to use in any document immediately.",
  },
  {
    question: "Is creating a digital signature online free?",
    answer:
      "Yes — Pixocraft's digital signature tool is 100% free forever. No login, no subscription, no watermark on the downloaded PNG. Draw, type, or upload your signature and download unlimited times at no cost.",
  },
  {
    question: "Is a digital signature created online legally valid in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 (Section 3A), an online digital signature — including a PNG image-based signature — is legally valid for commercial contracts, NDAs, GST invoices, employment letters, and most business documents. The Indian Contract Act 1872 further supports electronically executed agreements between consenting parties.",
  },
  {
    question: "Do I need any software to create a digital signature online?",
    answer:
      "No software required. Pixocraft's digital signature tool runs entirely in your web browser — Chrome, Firefox, Safari, or any modern browser on desktop or mobile. No downloads, no plugins, no app installation. Open the page and start creating immediately.",
  },
  {
    question: "Can I create a digital signature on my mobile phone?",
    answer:
      "Yes. The Draw tab is fully touch-optimised for mobile. Open the page on your phone browser, draw your signature with your finger, customise it, and download the transparent PNG. Works on all iOS and Android devices. Use landscape mode for a wider canvas.",
  },
  {
    question: "What is the best format to download a digital signature?",
    answer:
      "Always download as a transparent PNG. Transparent PNG overlays cleanly on any document — GST invoices, PDF contracts, email templates, letterheads — without a visible white box around the signature. JPG does not support transparency and creates an ugly white rectangle on non-white backgrounds.",
  },
  {
    question: "What is the difference between a digital signature, an eSignature, and a DSC?",
    answer:
      "A digital signature (PNG) is a visual image of your handwritten signature — used to sign documents visually. An eSignature is a broader term covering any electronic signature method including PNG, typed name, or click-to-sign. A DSC (Digital Signature Certificate) is a cryptographic token from a licensed CA — required specifically for government portal authentication and regulated filings like MCA ROC, court e-filing, and income tax e-verification.",
  },
  {
    question: "How do I add a digital signature to a PDF?",
    answer:
      "Download your digital signature as a transparent PNG from Pixocraft. Open your PDF in any PDF editor (Adobe Acrobat, Smallpdf, or Pixocraft's Add Signature to PDF tool). Insert the PNG image and position it over the signature field. Resize to 3–5 cm wide and save. The signed PDF is ready to send.",
  },
  {
    question: "Can I use my digital signature for GST invoices?",
    answer:
      "Yes. CBIC guidelines for GST invoices require the authorised signatory's signature — a transparent PNG image signature satisfies this requirement for manually generated invoices in Tally, Zoho Books, ClearTax, and other billing software. Download your signature from Pixocraft and insert it into your invoice template.",
  },
  {
    question: "Which method is best — Draw, Type, or Upload?",
    answer:
      "Draw is most personal and unique — ideal for users who want an authentic handwritten look and are comfortable drawing on screen. Type is most consistent — the same result every time, across all devices and sessions, making it ideal for corporate use. Upload is best when you have an existing physical signature you want to digitise and reuse. All three methods produce a professional transparent PNG.",
  },
  {
    question: "Is my signature data private when creating it online?",
    answer:
      "Completely private. Pixocraft's tool runs 100% inside your browser using the HTML5 Canvas API. No drawing strokes, typed text, or uploaded images are ever sent to any server, logged, or stored. Your digital signature data never leaves your device — privacy by design.",
  },
  {
    question: "What resolution is the downloaded digital signature?",
    answer:
      "Pixocraft exports digital signatures at 3200×1040 px — four times display resolution — ensuring a sharp, crisp result at any document size. This resolution is suitable for everything from small email footers to A4 legal documents, letterheads, and print-quality contracts.",
  },
];

const SIX_STEPS = [
  { n: 1, title: "Open the signature tool",       desc: "Scroll down to the tool on this page — or click 'Start Creating' below. No login, no account setup required." },
  { n: 2, title: "Draw, type or upload",          desc: "Choose your creation method: Draw with mouse or finger, Type your name in a handwriting font, or Upload an existing signature image." },
  { n: 3, title: "Customise the style",           desc: "Set ink colour (black or dark navy for professional use), adjust stroke width, and select your preferred font if using the Type tab." },
  { n: 4, title: "Remove background",             desc: "The Draw and Type tabs create signatures on a transparent canvas by default. For uploaded images, background removal is automatic." },
  { n: 5, title: "Download the PNG",              desc: "Click 'Download Signature' — your transparent PNG saves to your device at 3200×1040 px, print-resolution, no watermark." },
  { n: 6, title: "Insert into your document",     desc: "Open your GST invoice, PDF contract, or email client. Insert the PNG at the signature block. Resize and position. Done." },
];

const HOW_TO_STEPS = SIX_STEPS;

const COMPARISON = [
  { feature: "Use case",        png: "Daily invoices & contracts",   esign: "Verified documents",          dsc: "Govt portals & filings" },
  { feature: "Cost",            png: "Free",                         esign: "Per-signature fee",            dsc: "₹1,000–₹3,000/year" },
  { feature: "Setup time",      png: "Under 60 seconds",             esign: "Account + KYC needed",         dsc: "1–3 working days" },
  { feature: "Legal validity",  png: "IT Act 2000 (SES)",            esign: "IT Act 2000 (varies)",         dsc: "IT Act 2000 (certified)" },
  { feature: "Hardware",        png: "None",                         esign: "Aadhaar OTP / browser",       dsc: "USB token (some cases)" },
  { feature: "Privacy",         png: "100% local browser",           esign: "Third-party managed",         dsc: "CA-managed" },
  { feature: "Best for",        png: "Freelancers, businesses, GST", esign: "Enterprise, regulated docs",  dsc: "MCA ROC, court e-filing" },
];

const METHODS = [
  {
    method: "Draw",
    icon: <MousePointer2 className="h-5 w-5 text-primary" />,
    when: "When you want a unique, personal, handwritten look",
    pros: ["Most authentic — your actual signature", "Unique every time", "Natural on mobile with touch"],
    cons: ["May take 2–3 tries to get right", "Less consistent across sessions"],
    tip: "Use landscape mode on mobile for a wider canvas. Draw slowly — touchscreens capture more detail at lower speed.",
  },
  {
    method: "Type",
    icon: <Type className="h-5 w-5 text-primary" />,
    when: "When you need an identical signature every single time",
    pros: ["Pixel-identical result every session", "No drawing skill required", "50+ professional handwriting fonts"],
    cons: ["Less 'personal' than freehand drawn", "Requires font selection"],
    tip: "Pick one font and stick with it — consistency is what makes a typed signature look professional.",
  },
  {
    method: "Upload",
    icon: <Upload className="h-5 w-5 text-primary" />,
    when: "When you have an existing physical signature you want to digitise",
    pros: ["Reuse your real physical signature", "Automatic background removal", "Works with phone camera photos"],
    cons: ["Quality depends on source image clarity", "May need good lighting to photograph well"],
    tip: "Photograph on white paper in bright natural light, holding the phone directly above. This gives the cleanest background removal.",
  },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />, title: "GST Invoices",         desc: "Sign GST tax invoices in TallyPrime, Zoho Books, ClearTax, and any billing software. Transparent PNG overlays cleanly on any invoice template." },
  { icon: <Scale className="h-5 w-5 text-primary" />,   title: "Contracts & NDAs",     desc: "Freelancers, lawyers, and businesses sign NDAs, service agreements, and commercial contracts. Legally valid under IT Act 2000." },
  { icon: <Mail className="h-5 w-5 text-primary" />,    title: "Email Signatures",      desc: "Add a personalised handwritten signature to your Gmail or Outlook email signature block for a professional, branded impression." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "PDF Documents",        desc: "Insert your digital signature into any PDF — contracts, offers, reports, or government forms — using any PDF editor or Pixocraft's PDF tools." },
  { icon: <Users className="h-5 w-5 text-primary" />,   title: "Employment Letters",    desc: "HR teams and managers sign offer letters, appointment letters, and employment contracts digitally for paperless onboarding." },
  { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "On-the-go Signing", desc: "Field agents, freelancers, and business owners sign documents from their phone — no laptop, no printer, no delay." },
];

const MISTAKES = [
  { title: "Downloading as JPG instead of PNG", body: "JPG has no transparency support — it always adds a white background. When placed on any non-white document surface, the white rectangle is clearly visible. Always download as transparent PNG." },
  { title: "Low-resolution source image for Upload", body: "Uploading a blurry or poorly-lit photo gives a low-quality result. Pixocraft exports at 3200 px but can only work with the quality of the source. Use a clear, high-contrast photo of your signature on white paper." },
  { title: "Inconsistent signature across documents", body: "Using different signature styles or different files for each document looks unprofessional. Download one high-quality PNG from Pixocraft and save it permanently — reuse the exact same file on every document." },
  { title: "Wrong placement on the document", body: "A signature that floats outside the signature block, overlaps body text, or is placed on the wrong page creates confusion. Always position your signature precisely within the designated signature or authorised signatory block." },
  { title: "Using overly decorative fonts in Type mode", body: "Highly stylised fonts look striking but can be difficult to read and raise authenticity questions on formal documents. Choose a professional-looking cursive or script font — clean and recognisable." },
];

const PRO_TIPS = [
  { title: "Always save as PNG — never convert to JPG", body: "PNG preserves the transparent alpha channel. Converting to JPG destroys transparency permanently — you cannot recover it. Save your PNG in a dedicated folder and share it in PNG format always." },
  { title: "Use dark ink for professional documents", body: "Black (#000000) and dark navy (#1a1a2e) are the professional standards for business signatures. These reproduce clearly in digital and print formats on any background. Light or coloured ink can appear washed out." },
  { title: "Create your signature once and reuse it", body: "Download a high-quality PNG once, store it securely, and use the exact same file across all documents. Consistency creates a trustworthy, professional identity across all your business communication." },
  { title: "Test your signature in a real document first", body: "After downloading, insert your PNG into a test version of your invoice template or contract PDF before using it live. Check for size, position, and whether the transparent background overlays cleanly." },
  { title: "Use the Type tab for team or corporate signing", body: "When multiple people in your organisation sign documents on behalf of the company, the Type tab ensures the authorised signatory signature is pixel-identical every time — no variation from employee to employee." },
];

export default function HowToCreateDigitalSignatureOnline() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "How to Create Digital Signature Online Free (Step-by-Step) | Pixocraft",
    description:
      "Learn how to create digital signature online free in 60 seconds. Step-by-step guide with draw, type and upload methods. No signup required, 100% private, GST ready.",
    keywords:
      "how to create digital signature online, how to create digital signature online free, digital signature step by step, create digital signature online free, digital signature tutorial, how to create digital signature for GST, digital signature for pdf free",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Digital Signature Creator – Pixocraft",
    description:
      "Create a digital signature online free in 60 seconds. Draw, type, or upload. Download as transparent PNG. No login, 100% private, GST and contract ready.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                                    url: "https://tools.pixocraft.in/" },
    { name: "Tools",                                   url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "How to Create Digital Signature Online",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "How to Create Digital Signature Online Free (Step-by-Step) | Pixocraft",
    description:
      "Learn how to create digital signature online free in 60 seconds. Step-by-step guide with draw, type and upload methods. No signup required, 100% private, GST ready.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create Digital Signature Online Free",
    description:
      "Create your digital signature online for free in 60 seconds using Pixocraft — draw, type or upload your signature and download as a transparent PNG ready for GST invoices, contracts, and PDFs.",
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
          { label: "Home",                               url: "https://tools.pixocraft.in/" },
          { label: "Tools",                             url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "How to Create Digital Signature Online" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-5 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                How to Create Digital Signature Online Free (Step-by-Step Guide)
              </h1>
              <p className="text-sm text-muted-foreground">60 Seconds · No Signup · Works on Mobile · GST &amp; Contract Ready</p>
            </div>
          </div>

          {/* Snippet-optimised answer */}
          <div className="rounded-xl border bg-primary/5 px-4 py-4 sm:px-6 sm:py-5 mb-5">
            <p className="text-foreground font-medium leading-relaxed">
              You can create a digital signature online in <strong>under 60 seconds</strong> by drawing, typing, or uploading
              your signature and downloading it as a <strong>transparent PNG</strong> — no login, no software, no cost. The
              PNG is immediately ready to use in GST invoices, PDF contracts, email signatures, and any document.
            </p>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "60-Second Process" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup Required" },
              { icon: <Smartphone className="h-3.5 w-3.5" />,  label: "Works on Mobile" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />,  label: "GST & Contract Ready" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground"
              >
                {icon}{label}
              </span>
            ))}
          </div>

          {/* 6-step snippet block */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">Quick steps to create your digital signature:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SIX_STEPS.map(({ n, title }) => (
                <div key={n} className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                  <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{n}</span>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* UX psychology micro-trust */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { icon: <Zap className="h-3.5 w-3.5 text-primary" />,    label: "Most users finish in under 60 seconds" },
              { icon: <Check className="h-3.5 w-3.5 text-primary" />,  label: "No technical skills required" },
              { icon: <Receipt className="h-3.5 w-3.5 text-primary" />, label: "Used daily for GST & contracts" },
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
              data-testid="button-start-creating"
            >
              <PenTool className="h-4 w-4" />Start Creating Your Signature Now<ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <SignatureToolSection />

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* What is Digital Signature */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What Is a Digital Signature?</h2>
            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 mb-5">
              <p className="text-foreground font-medium">
                A <strong>digital signature</strong> is an electronic representation of your handwritten signature — used
                to authenticate documents, confirm agreement to contracts, and verify that a document was signed by the
                named authorised party. In everyday business use, a digital signature is typically a transparent PNG image
                of your signature, inserted into PDFs, GST invoices, and contracts.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The term <strong>digital signature</strong> is used in two distinct senses. In common business usage, it
              refers to any electronic signature image used to sign documents — the kind you create with this tool. In a
              technical and legal sense, a digital signature can also refer to a cryptographically verified authentication
              mechanism — the kind provided by a DSC (Digital Signature Certificate) from a licensed Certifying Authority.
            </p>
            <p className="text-muted-foreground mb-4">
              For the vast majority of Indian businesses — freelancers, MSMEs, consultants, shop owners, and professionals
              — the image-based <strong>digital signature online</strong> is all they need. It satisfies the signature
              requirement for GST invoices, commercial contracts, NDAs, employment letters, and most day-to-day business
              documents under the IT Act 2000.
            </p>
            <p className="text-muted-foreground">
              A good digital signature has three key properties: it is <strong>personalised</strong> (unique to you),
              <strong> consistent</strong> (the same across all your documents), and <strong>professional</strong> (clear,
              dark ink, appropriate size, clean transparent background). Pixocraft's tool is designed to deliver all three
              in under 60 seconds.
            </p>
          </section>

          {/* Step-by-step guide */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Create a Digital Signature Online Free — Complete Step-by-Step Guide</h2>
            <p className="text-muted-foreground mb-5">
              Follow these six steps to create, customise, and download your digital signature. Total time: under 60 seconds.
            </p>
            <ol className="space-y-4 mb-6">
              {SIX_STEPS.map(({ n, title, desc }) => (
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
                data-testid="button-create-now"
              >
                <PenTool className="h-4 w-4" />Create Digital Signature Now<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Comparison: PNG vs eSign vs DSC */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Digital Signature vs eSignature vs DSC — What's the Difference?</h2>
            <p className="text-muted-foreground mb-5">
              Three types of electronic signatures are used in Indian business and legal contexts. Understanding the
              differences helps you choose the right approach for your documents:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">PNG Signature (This Tool)</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">eSignature</th>
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
              <strong className="flex items-center gap-1.5 mb-1 text-foreground"><BadgeCheck className="h-4 w-4 text-primary" />Which to use:</strong>
              <p className="text-muted-foreground leading-relaxed">
                For everyday business — GST invoices, NDAs, freelance contracts, employment letters — a <strong>PNG signature
                from Pixocraft</strong> is free, instant, and legally sufficient. DSC is needed only for government portal
                filing. eSign is for enterprise verified workflows. Start with the PNG signature: it covers 95% of real-world
                business document needs.
              </p>
            </div>
          </section>

          {/* Which method */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Draw vs Type vs Upload — Which Method Should You Choose?</h2>
            <p className="text-muted-foreground mb-5">Three methods for creating your digital signature online — each suited to different users and needs:</p>
            <div className="space-y-3">
              {METHODS.map(({ method, icon, when, pros, cons, tip }) => (
                <div key={method} className="rounded-xl border bg-card p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                    <div>
                      <p className="font-semibold text-foreground">{method}</p>
                      <p className="text-xs text-primary font-medium">{when}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1.5">Advantages</p>
                      <ul className="space-y-1">
                        {pros.map((p) => (
                          <li key={p} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <Check className="h-3 w-3 text-primary shrink-0 mt-0.5" />{p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-1.5">Limitations</p>
                      <ul className="space-y-1">
                        {cons.map((c) => (
                          <li key={c} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <AlertCircle className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />{c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="rounded-lg bg-primary/5 px-3 py-2 text-xs text-primary font-medium">
                    Tip: {tip}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Where to Use Your Digital Signature — Real-World Use Cases</h2>
            <p className="text-muted-foreground mb-5">A digital signature created with this tool works across every common professional document workflow:</p>
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Is a Digital Signature Created Online Legally Valid in India?</h2>
            <p className="text-muted-foreground mb-5">Yes — here is the complete legal framework:</p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "IT Act 2000 — Electronic Signature Recognition",
                  body: "The Information Technology Act 2000 (Section 3A, amended 2008) recognises electronic signatures for commercial transactions. An image-based PNG signature is a Simple Electronic Signature (SES) — legally valid for contracts, GST invoices, NDAs, employment letters, and most commercial documents.",
                },
                {
                  title: "Indian Contract Act 1872 — Digital Execution",
                  body: "The Indian Contract Act 1872 does not mandate that signatures be in physical ink form. Contracts executed digitally — where both parties sign a PDF with electronic signatures and retain copies — are valid and enforceable under Indian law, including in civil disputes.",
                },
                {
                  title: "GST — CBIC Acceptance of Image Signatures",
                  body: "CBIC guidelines for GST invoices require the authorised signatory's signature. They do not prescribe a specific format. A PNG signature embedded in a GST invoice template (Tally, Zoho, ClearTax) satisfies the signature requirement for manually generated B2B and B2C invoices.",
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
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" />Note:</strong>
              A DSC (Class 3) is required for MCA ROC filings, court e-filing via eCourts, and income tax portal
              e-verification. For these specific regulated use cases, a PNG signature alone is not sufficient. Consult a
              CA or legal professional for document-specific guidance.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Common Mistakes When Creating Digital Signatures Online</h2>
            <p className="text-muted-foreground mb-5">These are the most frequent errors that result in unprofessional or unusable digital signatures:</p>
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pro Tips for Creating the Perfect Digital Signature</h2>
            <p className="text-muted-foreground mb-5">Best practices from professionals who use digital signatures every day:</p>
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why Use Pixocraft to Create Your Digital Signature Online?</h2>
            <p className="text-muted-foreground mb-5">What makes this the best free digital signature tool for Indian users:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "60-second workflow",           body: "Open → create → download in 60 seconds. No account, no payment screen, no confirmation email." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private",                 body: "All processing is local in your browser. No server, no data upload, no account — nothing to breach." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "Beginner-friendly",            body: "Three clearly labelled methods (Draw, Type, Upload), large controls, and instant preview make it simple for first-time users." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "GST & contract ready",         body: "Transparent PNG at print resolution — the exact output format required by Indian GST invoice software and PDF editors." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Works on any device",          body: "Full touch support for mobile drawing. Upload from phone camera. Create your signature on phone, tablet, or desktop." },
                { icon: <Layers className="h-4 w-4 text-primary" />,     title: "Completely free",              body: "Draw, type, upload, remove background, download — all fully free forever. No freemium lock, no watermark." },
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
                data-testid="button-bottom-cta"
              >
                <PenTool className="h-4 w-4" />Create Digital Signature Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal linking */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Next Steps — Use Your Digital Signature</h2>
            <p className="text-muted-foreground mb-4">
              Once you have created your digital signature, use these tools to put it to work:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-creator",              label: "Signature Creator",              desc: "Full-featured signature creator with advanced customisation." },
                { href: "/tools/transparent-signature-png",      label: "Transparent Signature PNG",      desc: "Download your signature with a transparent background — no white box." },
                { href: "/tools/add-signature-to-pdf",           label: "Add Signature to PDF",           desc: "Insert your digital signature directly into any PDF document." },
                { href: "/tools/gst-invoice-signature",          label: "GST Invoice Signature",          desc: "Signature optimised for TallyPrime, Zoho Books, and GST invoices." },
                { href: "/tools/email-signature-maker",          label: "Email Signature Maker",          desc: "Add your signature to Gmail and Outlook for professional emails." },
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5">Frequently Asked Questions — How to Create Digital Signature Online</h2>
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
