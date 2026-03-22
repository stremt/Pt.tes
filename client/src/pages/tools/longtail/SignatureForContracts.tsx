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
  Scale, Smartphone, Star, Briefcase, Users, PenTool,
  FileCheck, Building2, Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-for-contracts";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-generator";

const FAQS = [
  {
    question: "Is a digital signature legally valid for contracts in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 (Section 3A) and the Indian Contract Act 1872, a digital signature — including an image-based PNG signature — is legally valid for most commercial contracts, NDAs, freelance agreements, service contracts, and employment letters. The IT Act 2000 specifically recognises electronic signatures for commercial transactions without requiring a physical wet ink signature.",
  },
  {
    question: "Do I need a DSC (Digital Signature Certificate) to sign a contract?",
    answer:
      "Not for most everyday contracts. A DSC (Class 3 Digital Signature Certificate) is required for specific regulated filings: MCA ROC submissions, court e-filings, income tax portal authentication, and certain government tender processes. For commercial contracts, NDAs, freelance agreements, service agreements, and employment letters, a PNG image signature is legally sufficient under the IT Act 2000.",
  },
  {
    question: "How do I add my signature to a contract PDF?",
    answer:
      "Download your contract signature as a transparent PNG from Pixocraft. Open your contract PDF in Adobe Acrobat, Smallpdf, or Pixocraft's Add Signature to PDF tool. Insert the PNG image and position it over the signature line. Resize to the appropriate size (3–5 cm wide) and save. The signed PDF is ready to send.",
  },
  {
    question: "Is this contract signature tool completely free?",
    answer:
      "Yes — 100% free forever. No login, no subscription, no watermark on the downloaded signature. Create and download unlimited contract signatures at no cost.",
  },
  {
    question: "How do I sign an NDA digitally in India?",
    answer:
      "Create your signature using Pixocraft's tool (Draw, Type, or Upload method). Download as a transparent PNG. Insert the PNG into the NDA PDF using any PDF editor or Pixocraft's Add Signature to PDF tool. Both parties sign their own copies and exchange the signed PDFs. This constitutes a valid electronic execution of the NDA under the IT Act 2000.",
  },
  {
    question: "What format should a contract signature be in?",
    answer:
      "Transparent PNG is the professional standard for contract signatures. A transparent background ensures the signature overlays cleanly on any contract template — white, off-white, or branded colour. Avoid JPG, which creates a visible white box around the signature strokes when placed on any non-white background.",
  },
  {
    question: "Can I use the same signature PNG across multiple contracts?",
    answer:
      "Yes — and this is recommended practice. Create your signature once, download the high-resolution PNG, and reuse it across all contracts, NDAs, proposals, and agreements. Consistency in your signature is both professionally important and legally sound. Save the PNG in a secure, permanent location.",
  },
  {
    question: "Is my signature data secure when using this tool?",
    answer:
      "Completely secure. This tool runs 100% inside your browser using the HTML5 Canvas API. No drawing strokes, typed name, or uploaded images are ever sent to any server, stored, or logged. Your signature data never leaves your device — privacy by design.",
  },
  {
    question: "What is the difference between a PNG signature, a DSC, and an eSign?",
    answer:
      "A PNG signature is an image of your handwritten signature — used to sign contract PDFs visually. A DSC (Digital Signature Certificate) is a cryptographic token from a licensed CA — required for government portal authentication. An eSign (Aadhaar-based) is a government-verified electronic signature service for regulated use cases. For commercial contracts and NDAs, a PNG signature is legally sufficient and is the simplest, fastest option.",
  },
  {
    question: "Can I create a contract signature on my phone?",
    answer:
      "Yes. The Draw tab is fully touch-optimised for mobile. Open this page on your phone browser (Chrome, Safari, or Firefox), draw with your finger, customise your signature, and download the transparent PNG. Works on all iOS and Android devices.",
  },
  {
    question: "Where should I place my signature on a contract?",
    answer:
      "Standard contract practice places the signature at the bottom of the last page (or at designated signature blocks throughout the document), below the signatory's name and title, above the date line. In multi-party contracts, each party has their own signature block. Position your PNG precisely over the signature line in your PDF editor.",
  },
  {
    question: "Is a handwritten-style typed signature valid for contracts?",
    answer:
      "Yes. Using the Type tab to generate a signature in a handwriting font is legally equivalent to a drawn signature under the IT Act 2000. The law does not prescribe how an electronic signature must be created — only that it represents the signatory's intention to authenticate the document. A typed handwriting-font signature satisfies this standard.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Create your contract signature", description: "Use the Draw tab to sign with your mouse or finger, the Type tab to choose from 50+ professional handwriting fonts, or Upload to digitise an existing physical signature." },
  { step: 2, title: "Customise for legal documents", description: "Set ink colour to black or dark navy — the standard for formal legal contracts. Adjust stroke weight to 2–3 px for a professional, authoritative appearance." },
  { step: 3, title: "Download as transparent PNG", description: "Click 'Download Signature' to save the print-resolution transparent PNG (3200×1040 px) to your device. This is the format accepted by all PDF editors and contract platforms." },
  { step: 4, title: "Insert into your contract", description: "Open your contract PDF in any PDF editor or Pixocraft's Add Signature to PDF tool. Insert the PNG at the signature block, resize, and save. Your signed contract is ready." },
];

const SIGNATURE_COMPARISON = [
  { feature: "Cost",             png: "Free",                          dsc: "₹1,000–₹3,000/year",     esign: "Per-signature fee" },
  { feature: "Legal use",       png: "Commercial contracts & NDAs",    dsc: "Govt filings & portals",  esign: "Verified enterprise use" },
  { feature: "Setup time",      png: "Under 60 seconds",               dsc: "1–3 working days",        esign: "Account & KYC needed" },
  { feature: "Hardware",        png: "None",                           dsc: "USB token (some cases)",  esign: "Aadhaar & OTP" },
  { feature: "Privacy",         png: "100% local",                     dsc: "CA-managed",              esign: "Govt-managed" },
  { feature: "Works on mobile", png: "Yes",                            dsc: "Limited",                 esign: "Yes (Aadhaar OTP)" },
  { feature: "Renewal",         png: "Never",                          dsc: "Annual/biennial",         esign: "Per use" },
  { feature: "Best for",        png: "Everyday contracts",             dsc: "Regulated filings",       esign: "High-stakes documents" },
];

const USE_CASES = [
  { icon: <FileText className="h-5 w-5 text-primary" />,     title: "NDAs (Non-Disclosure Agreements)", desc: "Sign NDAs for client projects, employment, partnerships, and vendor agreements instantly. Legally valid under IT Act 2000 for bilateral and multi-party NDAs." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />,    title: "Freelance Contracts",              desc: "Designers, writers, developers, and consultants: sign project agreements, SOWs, and retainer contracts with a professional digital signature." },
  { icon: <FileCheck className="h-5 w-5 text-primary" />,     title: "Service Agreements",              desc: "Service providers and clients can execute service agreements, SLAs, and maintenance contracts digitally — without printing, scanning, or postal delays." },
  { icon: <Users className="h-5 w-5 text-primary" />,        title: "Employment Letters",               desc: "HR teams and hiring managers sign offer letters, appointment letters, and employment contracts with a consistent digital signature." },
  { icon: <Building2 className="h-5 w-5 text-primary" />,    title: "Partnership Agreements",           desc: "Business partners executing LLP agreements, MoUs, JV agreements, and shareholder agreements can sign digitally for faster execution." },
  { icon: <Receipt className="h-5 w-5 text-primary" />,      title: "Vendor & Supplier Contracts",      desc: "Procurement teams and vendors sign purchase agreements, supply contracts, and vendor registration forms digitally for paperless procurement." },
];

const MISTAKES = [
  { title: "Inconsistent signature across documents", body: "Using a different signature style on each contract is unprofessional and can raise authentication questions during disputes. Create one high-quality PNG from Pixocraft and reuse it across all contracts, NDAs, and agreements — the same file every time." },
  { title: "Poor-quality or blurry signature", body: "A blurry, pixelated, or overly thin signature looks rushed and undermines the professional authority of a legal document. Pixocraft exports at 3200 px resolution — always download from this tool rather than using a phone screenshot or small-canvas export." },
  { title: "Wrong placement on contract", body: "Placing a signature in the wrong location — floating in the middle of text, outside the signature block, or overlapping key clauses — creates confusion and can invalidate execution in some jurisdictions. Always position the signature precisely within the designated signature block." },
  { title: "Using an illegible decorative font", body: "Highly stylised calligraphic fonts may look striking but can be difficult to authenticate if challenged. For formal legal contracts, use a recognisable, legible cursive style — either drawn or selected from the Type tab's more conservative options." },
  { title: "Not keeping a copy of the signed document", body: "After inserting and saving your signature in a contract PDF, always retain a copy of the fully signed document in a secure location. Both parties should retain signed copies — digital contract execution is valid only when both parties have executed and retained the agreement." },
];

const PRO_TIPS = [
  { title: "Use the same signature on every contract", body: "Consistency across all signed documents is both professionally important and legally significant. A consistent signature creates an identifiable personal mark. Download your PNG once and save it permanently — use the exact same file on every contract, NDA, and agreement." },
  { title: "Black or dark navy ink for legal documents", body: "Black (#000000) and dark navy (#1a1a2e) are the universal standards for formal legal document signatures. These colours reproduce clearly in both digital viewing and printing. Avoid coloured or light ink on legal contracts." },
  { title: "Place signature at the bottom of the page", body: "Contract signature blocks are always at the bottom of the execution page — typically after all terms and above the date and title lines. This position confirms that the signatory has read the entire document above their signature." },
  { title: "Always use transparent PNG format", body: "Contract PDFs often have backgrounds, watermarks, or coloured headers. A transparent PNG signature overlays cleanly on any background. A JPG signature creates a white box — immediately unprofessional on any non-white contract template." },
  { title: "Use the Type tab for corporate consistency", body: "For businesses where multiple employees or agents sign contracts on behalf of the organisation, the Type tab ensures an identical authorised signatory signature every time — regardless of who sends the document. Select a professional font and lock it as the company standard." },
];

export default function SignatureForContracts() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature for Contracts Free – Legal Digital Signature Online | Pixocraft",
    description:
      "Create signature for contracts online free. Legally valid for NDAs, agreements and business documents. No login required, 100% private, IT Act compliant.",
    keywords:
      "signature for contracts, free signature for contracts, digital signature for contracts, legal signature for agreements, contract signing online, digital contract signature, sign contract online free, NDA signature, signature for NDA agreement",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Signature for Contracts – Pixocraft",
    description:
      "Create a legally valid digital signature for contracts, NDAs, and agreements online free. Download as transparent PNG and insert into any contract PDF instantly. IT Act 2000 compliant. No login required.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "INR" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                      url: "https://tools.pixocraft.in/" },
    { name: "Tools",                     url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Signature for Contracts",   url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Signature for Contracts Free – Legal Digital Signature Online | Pixocraft",
    description:
      "Create signature for contracts online free. Legally valid for NDAs, agreements and business documents. No login required, 100% private, IT Act compliant.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Digital Signature for Contracts Online Free",
    description:
      "Use Pixocraft's free tool to create a legally valid contract signature, download as transparent PNG, and insert it into any contract PDF in under 60 seconds.",
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
          { label: "Home",                  url: "https://tools.pixocraft.in/" },
          { label: "Tools",                 url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature for Contracts" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Scale className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Signature for Contracts Free – Legal Digital Signature for Agreements
              </h1>
              <p className="text-sm text-muted-foreground">IT Act 2000 Compliant · Indian Contract Act Valid · No Signup · 100% Private</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create a <strong>legally valid signature for contracts</strong>, NDAs, and agreements in seconds. Fully compliant
            with <strong>Indian laws</strong> — accepted for business contracts, freelance agreements, employment letters,
            and commercial documents. No login. 100% private. Instant download.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "IT Act 2000 Compliant" },
              { icon: <Scale className="h-3.5 w-3.5" />,       label: "Indian Contract Act Valid" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup Required" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <Users className="h-3.5 w-3.5" />,       label: "Used by Professionals & Businesses" },
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
              { icon: <FileText className="h-3.5 w-3.5 text-primary" />, label: "Used in NDAs & business agreements" },
              { icon: <Users className="h-3.5 w-3.5 text-primary" />,   label: "Trusted by freelancers & lawyers" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />,  label: "No data stored" },
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
              { n: 3, label: "Insert into Contract" },
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
            No watermark · No upload to server · Transparent PNG · IT Act 2000 compliant
          </p>
        </div>

        {/* ── QUICK USE BLOCK ──────────────────────────────────────────────── */}
        <div className="rounded-xl border bg-primary/5 px-6 py-5 mb-12">
          <p className="font-semibold text-foreground mb-3">Use your contract signature for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "NDAs and confidentiality agreements",
              "Freelance project contracts",
              "Service agreements and SLAs",
              "Employment and offer letters",
              "Partnership and MoU agreements",
              "Vendor and supplier contracts",
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

          {/* What is */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What Is a Signature for Contracts?</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                A <strong>signature for contracts</strong> is the formal mark — handwritten or digital — that an authorised
                party places on a contract to indicate their intent to be bound by its terms. In digital contract execution,
                this signature is typically a high-resolution transparent PNG image of the signatory's handwritten or
                type-generated signature, inserted into the contract PDF at the designated signature block.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The function of a contract signature is legal authentication — it confirms that the person named in the agreement
              has read, understood, and agreed to the terms. In Indian law, this principle is codified in the Indian Contract
              Act 1872, which recognises written contracts executed by parties who have the capacity to contract, offer and
              accept terms, and intend to create legal obligations.
            </p>
            <p className="text-muted-foreground mb-4">
              The <strong>digital signature for contracts</strong> in everyday business use refers to an image-based electronic
              signature — a PNG of the signatory's name in handwritten form — inserted into a PDF contract. This is distinct
              from a Digital Signature Certificate (DSC), which is a cryptographic token used for government portal
              authentication, and from Aadhaar-based eSign, which is a government-verified service for regulated use cases.
            </p>
            <p className="text-muted-foreground mb-4">
              Pixocraft's free <strong>signature for contracts</strong> tool lets you create a print-resolution transparent
              PNG signature in under 60 seconds using three methods: Draw (freehand with mouse or finger), Type (50+ handwriting
              fonts for a consistent result), or Upload (digitise a physical signature). The output is immediately ready for
              insertion into any contract PDF via any PDF editor.
            </p>
            <p className="text-muted-foreground">
              All processing is browser-local — no data leaves your device. For professionals handling sensitive NDAs,
              employment contracts, and commercial agreements, this means complete privacy of the signature creation process.
            </p>
          </section>

          {/* How to */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a Signature for Contracts — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Create and insert your contract signature in under 60 seconds:</p>
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
                data-testid="button-create-contract-signature"
              >
                <PenTool className="h-4 w-4" />Create Contract Signature<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* PNG vs DSC vs eSign comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">PNG Signature vs DSC vs eSign — Which Do You Need?</h2>
            <p className="text-muted-foreground mb-5">
              Three types of digital signatures are used in Indian business — each with different legal applications, costs,
              and setup requirements. Here is the complete comparison:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">PNG Signature (This Tool)</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">DSC (Class 3)</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">eSign (Aadhaar)</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {SIGNATURE_COMPARISON.map(({ feature, png, dsc, esign }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-4 py-3.5 text-primary/80 font-medium">{png}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{dsc}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{esign}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 text-sm text-foreground">
              <strong className="flex items-center gap-1.5 mb-1"><BadgeCheck className="h-4 w-4 text-primary" />Bottom line for most businesses:</strong>
              <p className="text-muted-foreground leading-relaxed">
                For commercial contracts, NDAs, freelance agreements, and most day-to-day business documents, a PNG signature
                from Pixocraft is legally sufficient, completely free, and takes under 60 seconds. DSC is needed only for
                regulated government filings. eSign is used for high-value verified transactions. For everyday contracts —
                start and finish with the PNG signature.
              </p>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Features Built for Contract and Legal Document Signing</h2>
            <p className="text-muted-foreground mb-5">Every feature designed specifically for professional contract execution:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <FileCheck className="h-5 w-5 text-primary" />,  title: "Transparent PNG output",         desc: "Clean overlay on any contract background — no white box, no background mismatch on coloured templates." },
                { icon: <Download className="h-5 w-5 text-primary" />,  title: "Print-resolution export",        desc: "3200×1040 px — four times display resolution — crisp and sharp on both screen-viewed and printed contracts." },
                { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "IT Act 2000 compatible",        desc: "Image-based electronic signatures are recognised under the IT Act 2000 for commercial contracts and most business documents." },
                { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "Mobile signing",                desc: "Create and download your contract signature from any phone. Full touch support — sign NDAs in the field, at client sites, or during meetings." },
                { icon: <Zap className="h-5 w-5 text-primary" />,        title: "Under 60 seconds",              desc: "No sign-up, no payment gate, no processing wait. Open the tool, create, download, insert — entire workflow in 60 seconds." },
                { icon: <Shield className="h-5 w-5 text-primary" />,     title: "100% private",                  desc: "Your signature never leaves your browser. All processing is local — no server, no account, no data risk for sensitive documents." },
                { icon: <Star className="h-5 w-5 text-primary" />,       title: "50+ handwriting fonts",         desc: "Type tab: 50+ Google handwriting fonts for a consistent, professional result — identical on every contract." },
                { icon: <PenTool className="h-5 w-5 text-primary" />,    title: "Draw, Type, or Upload",        desc: "Three creation methods covering every use case — freehand drawing, font-based typing, or digitising a physical signature." },
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

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Who Uses Digital Signatures for Contracts — Real Use Cases</h2>
            <p className="text-muted-foreground mb-5">Every professional dealing with contracts needs a reliable digital signature solution:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Is a Digital Signature Legally Valid for Contracts in India?</h2>
            <p className="text-muted-foreground mb-5">
              Yes — with a clear legal framework. Here is what Indian law says about digital contract signatures:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "IT Act 2000 — Electronic Signature Recognition",
                  body: "The Information Technology Act 2000 (Section 3A, amended 2008) specifically recognises electronic signatures for commercial transactions. An image-based PNG signature embedded in a PDF contract constitutes a Simple Electronic Signature (SES) and is legally valid for bilateral agreements, service contracts, NDAs, and most commercial arrangements between consenting parties.",
                },
                {
                  title: "Indian Contract Act 1872 — Digital Execution",
                  body: "The Indian Contract Act 1872 requires that a valid contract have offer, acceptance, consideration, and parties with capacity to contract. It does not mandate that signatures be in any particular physical form. A digitally signed PDF contract — where both parties have signed using electronic signatures and retained copies — constitutes a valid, enforceable agreement under Indian law.",
                },
                {
                  title: "NDAs, Freelance Contracts, and Employment Letters",
                  body: "Non-disclosure agreements, freelance service contracts, consultancy agreements, and employment letters signed with a PNG electronic signature are legally valid and enforceable in Indian civil courts. Courts have consistently upheld electronically executed commercial agreements under the combined framework of the IT Act 2000 and Indian Contract Act 1872.",
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
              A DSC (Class 3) is required for specific government-regulated filings: MCA ROC submissions, court e-filings via
              eCourts, income tax portal authentication, and government tender portals. For these specific use cases, a PNG
              signature is not sufficient. Consult a legal professional for high-value or government-facing documents.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Signing Contracts Digitally</h2>
            <p className="text-muted-foreground mb-5">These errors create unprofessional documents and may raise issues during disputes or audits:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for a Professional Contract Signature</h2>
            <p className="text-muted-foreground mb-5">Best practices from legal professionals, freelancers, and business teams:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Pixocraft for Contract Signatures?</h2>
            <p className="text-muted-foreground mb-5">What makes this the best free tool for legal and business contract signing:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Scale className="h-4 w-4 text-primary" />,      title: "Legal-ready output",            body: "Transparent PNG at print resolution — the format accepted by lawyers, CA firms, and business teams for contract execution." },
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "60-second workflow",            body: "Open → create → download → insert. No sign-up, no payment screen, no confirmation email. Faster than any alternative." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private",                  body: "Your signature — and the sensitive contracts it will sign — never touch any server. All processing is browser-local." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "IT Act 2000 compliant",         body: "The PNG electronic signature output is compliant with India's IT Act 2000 framework for electronic signatures on commercial documents." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Sign contracts anywhere",      body: "Mobile-optimised — create and insert contract signatures from your phone during client meetings, at the client's office, or on the go." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "Completely free",               body: "No freemium, no watermark, no feature limit. The full tool — Draw, Type, Upload, and PNG export — is free forever." },
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
                <PenTool className="h-4 w-4" />Create Contract Signature Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal linking */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Complete Document Signing Workflow — Related Tools</h2>
            <p className="text-muted-foreground mb-4">
              After creating your contract signature, use these tools to complete your legal document workflow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/gst-invoice-signature",      label: "GST Invoice Signature",          desc: "Signature optimised for GST invoices and tax documents." },
                { href: "/tools/add-signature-to-pdf",       label: "Add Signature to PDF",           desc: "Insert your contract signature directly into any PDF." },
                { href: "/tools/signature-for-pdf",          label: "Signature for PDF",              desc: "Optimised PDF signing workflow for contracts and agreements." },
                { href: "/tools/email-signature-maker",      label: "Email Signature Maker",          desc: "Create a professional email signature for Gmail and Outlook." },
                { href: "/tools/transparent-signature-png",  label: "Transparent Signature PNG",      desc: "Download your signature with transparent background for any document." },
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
            <h2 className="text-2xl font-bold text-foreground mb-5">Frequently Asked Questions — Signature for Contracts</h2>
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
