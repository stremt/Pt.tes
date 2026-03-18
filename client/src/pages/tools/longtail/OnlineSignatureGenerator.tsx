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
  PenTool,
  Shield,
  Zap,
  Smartphone,
  Star,
  Download,
  Check,
  FileText,
  Mail,
  FileImage,
  Globe,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/online-signature-generator";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "Is this online signature generator completely free?",
    answer: "Yes, 100% free forever. No hidden fees, no premium tiers, no watermarks, and no trial periods. Pixocraft's online signature generator is free for personal and commercial use.",
  },
  {
    question: "Do I need to create an account to use this online signature generator?",
    answer: "No account, no signup, no email — nothing. Open the page, create your signature, and download it instantly. It's designed to be frictionless.",
  },
  {
    question: "Is my signature stored on Pixocraft's servers?",
    answer: "Never. This tool is 100% client-side. All processing — drawing, typing, font rendering, image upload, and background removal — happens entirely inside your browser. Your signature data is never sent to any server, logged, or stored anywhere.",
  },
  {
    question: "Is an online digital signature legally valid in India?",
    answer: "Yes. Under the Information Technology Act 2000 and the IT (Amendment) Act 2008, electronic signatures are legally recognised for most contracts, agreements, GST invoices, and business documents in India. For specific government filings (MCA ROC, court submissions, property registration), a certified Digital Signature Certificate (DSC) from a licensed CA is required.",
  },
  {
    question: "Is a digital signature created with this tool legally valid worldwide?",
    answer: "In most jurisdictions, yes. The US ESIGN Act and UETA, EU eIDAS Regulation, UK Electronic Communications Act 2000, and India's IT Act 2000 all recognise electronic signatures as legally valid for most private contracts. Validity may vary for specific regulated documents — consult a legal professional for critical agreements.",
  },
  {
    question: "Can I use this online signature generator on my phone or tablet?",
    answer: "Absolutely. The Draw tab is fully optimised for touchscreens — single-touch strokes work naturally on any mobile device. The Type and Upload tabs also work seamlessly on mobile browsers including Chrome, Safari, and Firefox.",
  },
  {
    question: "What file formats can I download my signature in?",
    answer: "You can download your signature as a transparent PNG (ideal for overlaying on any document background) or a white-background JPG (best for email footers and platforms that do not support transparency). Both are exported at 3200×1040 px — print-quality resolution.",
  },
  {
    question: "How do I add my online signature to a PDF?",
    answer: "Download your signature as a transparent PNG. Open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place the PNG directly over the signature line. Resize and position as needed.",
  },
  {
    question: "How do I insert my signature into Microsoft Word or Google Docs?",
    answer: "Download your signature as a PNG. In Word: Insert → Pictures → This Device. In Google Docs: Insert → Image → Upload from computer. Once inserted, set text wrap to 'In front of text' for precise positioning over signature lines.",
  },
  {
    question: "How do I add my signature to my Gmail or Outlook email?",
    answer: "In Gmail: Settings → See all settings → Signature → click Insert image and upload your PNG. In Outlook: File → Options → Mail → Signatures → create or edit a signature and paste or insert the image. Keep height at 60–80 px for a clean look.",
  },
  {
    question: "What is the difference between Draw, Type, and Upload methods?",
    answer: "Draw: freehand with mouse or touch — most personal and unique. Type: pick from 50+ handwritten fonts — consistent and reproducible. Upload: scan or photograph your existing signature and remove the white background automatically — best for reusing an existing signature.",
  },
  {
    question: "How many fonts are available in the Type tab?",
    answer: "Over 50 handwritten Google Fonts across 7 categories: ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker textures, airy light styles, and formal calligraphy.",
  },
  {
    question: "What resolution is the downloaded signature?",
    answer: "Exports are rendered at 4× the display size — 3200×1040 pixels — giving you a crisp, high-resolution image that looks sharp on screen, in documents, and in print.",
  },
  {
    question: "Can I undo mistakes while drawing?",
    answer: "Yes. Use the Undo and Redo buttons while in the Draw tab to step back and forward through your stroke history. Up to 20 history states are saved per session.",
  },
  {
    question: "Can I use my downloaded signature commercially?",
    answer: "Yes. Because you create the signature yourself — it's your personal mark — you may use it freely in commercial documents, contracts, invoices, proposals, and professional correspondence.",
  },
];

const HOW_IT_WORKS_STEPS = [
  { step: 1, title: "Choose your method", description: "Select Draw to sketch freehand with a mouse or finger, Type to pick from 50+ handwritten fonts, or Upload to digitise an existing signature." },
  { step: 2, title: "Customise it", description: "Adjust ink colour and stroke thickness for drawing, choose a font and colour for typing, or remove the white background for an uploaded photo." },
  { step: 3, title: "Preview", description: "Hit Preview to see your signature on a document mockup and email footer — so you know exactly how it will look in context." },
  { step: 4, title: "Download instantly", description: "Save as transparent PNG or JPG — no watermark, no signup, no waiting. Done in under 60 seconds." },
];

export default function OnlineSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Online Signature Generator – Draw, Type, Upload PNG | Pixocraft",
    description:
      "Free online signature generator — draw, type, or upload your signature and download as transparent PNG. No signup, 100% private, instant. Works on mobile.",
    keywords:
      "online signature generator, free online signature, digital signature online, create signature online, e-signature maker, handwritten signature generator, draw signature online, signature PNG download, free e-signature India, online signature no signup",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Online Signature Generator – Pixocraft",
    description:
      "Create your digital signature online for free. Draw, type, or upload and download as transparent PNG or JPG. 100% private — runs entirely in your browser. No signup required.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                        url: "https://tools.pixocraft.in/" },
    { name: "Utilities",                   url: "https://tools.pixocraft.in/category/utility" },
    { name: "Signature Generator",         url: PARENT_URL },
    { name: "Online Signature Generator",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Online Signature Generator – Draw, Type, Upload PNG | Pixocraft",
    description:
      "Free online signature generator — draw, type, or upload your signature and download as transparent PNG. No signup, 100% private, instant.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create an Online Signature",
    description:
      "Use Pixocraft's free online signature generator to draw, type, or upload a signature and download it as a transparent PNG or JPG in under 60 seconds.",
    steps: HOW_IT_WORKS_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-8">

        <Breadcrumb items={[
          { label: "Home",                        url: "https://tools.pixocraft.in/" },
          { label: "Utilities",                   url: "/category/utility" },
          { label: "Signature Generator",         url: "/tools/signature-pad-tool" },
          { label: "Online Signature Generator" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Online Signature Generator
              </h1>
              <p className="text-sm text-muted-foreground">Free · No Signup · 100% Private · Instant PNG Download</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create a professional digital signature online in seconds. <strong>Draw</strong> with your mouse or finger,
            <strong> type</strong> your name in 50+ handwritten fonts, or <strong>upload</strong> an existing signature and
            remove the background. Download as a crisp transparent PNG or JPG — free forever, no account needed.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Star className="h-3.5 w-3.5" />, label: "Free & No Signup" },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Instant Download" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "100% Private" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on Mobile" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <SignaturePadWidget />
          <p className="text-xs text-muted-foreground text-center mt-3">
            No watermark · No upload to server · Works offline after page load
          </p>
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* What is */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What is an Online Signature Generator?</h2>
            <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-6 py-5 mb-4">
              <p className="text-foreground font-medium">
                An <strong>online signature generator</strong> is a browser-based tool that lets you create a personal
                digital signature in seconds — no printing, no scanning, and no software to install.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              You can draw with a mouse or touchscreen for a natural handwritten feel, type your name in a calligraphic font,
              or upload a photo of your existing pen-on-paper signature and strip the background automatically. The result is
              a high-resolution transparent PNG ready to drop into any PDF, Word document, Google Doc, or email signature.
            </p>
            <p className="text-muted-foreground mb-4">
              Pixocraft's free <strong>online signature generator</strong> is entirely client-side — every pixel of your
              signature is processed locally in your browser using the HTML5 Canvas API. Your data never leaves your device,
              making it one of the most privacy-respecting e-signature tools available online.
            </p>
            <p className="text-muted-foreground">
              Whether you need a quick signature for a freelance contract, an NDA, a GST invoice, or an email footer,
              this <strong>free online signature generator</strong> handles it all — in under 60 seconds.
            </p>
          </section>

          {/* How to use */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Use This Online Signature Generator</h2>
            <p className="text-muted-foreground mb-5">Follow these four steps — done in under a minute:</p>
            <ol className="space-y-3">
              {HOW_IT_WORKS_STEPS.map(({ step, title, description }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="text-sm text-muted-foreground mt-4">
              Need the main tool with even more options?{" "}
              <Link href="/tools/signature-pad-tool" className="text-primary hover:underline underline-offset-2 font-medium">
                Visit the full Signature Generator
              </Link>
              .
            </p>
          </section>

          {/* Draw vs Type vs Upload */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Draw vs Type vs Upload — Which Should You Choose?</h2>
            <p className="text-muted-foreground mb-5">Every workflow is different. Here's a quick comparison to help you pick:</p>
            <div className="overflow-x-auto rounded-xl border mb-4">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Method</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Best For</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Pros</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { method: "Draw",   best: "Unique personal feel",        pros: "Natural, one-of-a-kind, touch-optimised",      cons: "Takes a few tries to perfect" },
                    { method: "Type",   best: "Consistent & fast output",    pros: "50+ fonts, always legible, reproducible",     cons: "Less personal than hand-drawn" },
                    { method: "Upload", best: "Reusing an existing sig",     pros: "Auto background removal, high-res output",    cons: "Photo quality affects result" },
                  ].map(({ method, best, pros, cons }) => (
                    <tr key={method} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{method}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{best}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{pros}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{cons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground px-1">
              <strong>Quick pick:</strong> First time? → <strong>Type</strong>. Already have a signature? → <strong>Upload</strong>. Want it completely personal? → <strong>Draw</strong>.
            </p>
          </section>

          {/* Use signature for PDF, Documents & Email */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Create Signature for PDF, Documents &amp; Email</h2>
            <p className="text-muted-foreground mb-5">Once you've downloaded your signature PNG, here's how to use it across common platforms:</p>
            <div className="space-y-4">
              {[
                {
                  icon: <FileText className="h-5 w-5 text-primary" />,
                  title: "Add signature to PDF",
                  body: (<>Download your transparent PNG. Open your PDF in{" "}<Link href="/tools/pdf-merger" className="text-primary underline-offset-2 hover:underline font-medium">Pixocraft PDF tools</Link>, Adobe Acrobat, or Smallpdf. Use Insert → Image to place your signature over the signature line.</>),
                },
                {
                  icon: <FileImage className="h-5 w-5 text-primary" />,
                  title: "Insert into Word or Google Docs",
                  body: (<><strong>Word:</strong> Insert → Pictures → This Device. <strong>Google Docs:</strong> Insert → Image → Upload from computer. Then{" "}<Link href="/tools/image-to-pdf" className="text-primary underline-offset-2 hover:underline font-medium">convert to PDF</Link>{" "}when done.</>),
                },
                {
                  icon: <Mail className="h-5 w-5 text-primary" />,
                  title: "Email signature in Gmail or Outlook",
                  body: (<><strong>Gmail:</strong> Settings → Signature → Insert image → upload PNG. <strong>Outlook:</strong> File → Options → Mail → Signatures → insert picture. Keep height around 60–80 px for inbox-friendly display.</>),
                },
                {
                  icon: <Globe className="h-5 w-5 text-primary" />,
                  title: "Online forms, HR onboarding &amp; Aadhaar docs",
                  body: "Many government portals, HR platforms, and banking forms accept image-based signatures in PNG format. Your transparent PNG from this free online signature generator will work directly.",
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

          {/* Where to use */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Where to Use Your Online Signature</h2>
            <p className="text-muted-foreground mb-5">Your downloaded PNG works anywhere a handwritten signature would — and more:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "GST Invoices & E-way Bills",        body: "Drop directly into Tally, Zoho Books, or any billing software that supports image insertion." },
                { title: "NDAs, Offer Letters & Contracts",   body: "Insert into Word or Google Docs and convert to PDF for a clean, professional document." },
                { title: "PDF Documents",                     body: "Use Acrobat's 'Insert Image' or Smallpdf's signature tools to sign PDFs in seconds." },
                { title: "Email Footers (Gmail, Outlook)",    body: "A transparent PNG signature adds a polished, personal touch to every email you send." },
                { title: "Freelance Proposals & Quotes",      body: "Stamp your signature on proposals to convey authority and close deals faster." },
                { title: "Creative Branding & Watermarks",    body: "Use your signature PNG as a personal watermark on photos, artwork, or design work." },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Is it legal */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Is an Online Digital Signature Legal?</h2>
            <p className="text-muted-foreground mb-5">Yes — in most countries electronic signatures carry the same legal weight as a handwritten one.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { flag: "🇮🇳", country: "India",          law: "IT Act 2000 + Amendment 2008",         desc: "Valid for contracts, GST invoices, Aadhaar documents, and company agreements." },
                { flag: "🇺🇸", country: "United States",  law: "ESIGN Act + UETA",                     desc: "Same legal effect as handwritten for most contracts and commercial agreements." },
                { flag: "🇪🇺", country: "European Union", law: "eIDAS Regulation (2016)",              desc: "Image signatures qualify as Simple Electronic Signatures (SES) under eIDAS." },
                { flag: "🇬🇧", country: "United Kingdom", law: "Electronic Communications Act 2000",  desc: "Legally binding for most business and personal agreements." },
              ].map(({ flag, country, law, desc }) => (
                <div key={country} className="rounded-xl border bg-card p-4 space-y-1.5">
                  <p className="font-semibold text-foreground flex items-center gap-2"><span>{flag}</span>{country}</p>
                  <p className="text-xs font-medium text-primary">{law}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong>Important:</strong> For everyday contracts, NDAs, freelance agreements, GST invoices, and HR documents — this free online signature generator is fully sufficient. For court filings, MCA ROC submissions, or property registration in India — a certified Digital Signature Certificate (DSC) from a licensed CA is required. Consult a legal professional when in doubt.
            </div>
          </section>

          {/* Tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Tips for a Better Digital Signature</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tip: "Use black or dark blue ink",           detail: "These colours are universally accepted in legal contexts and stay legible at any size." },
                { tip: "Set stroke width to 3–4 px",          detail: "Thicker strokes remain visible when the signature is scaled down in PDFs or email footers." },
                { tip: "Match font style to context",          detail: "Thin elegant scripts for formal documents; bold chunky fonts for casual or creative use." },
                { tip: "Download as transparent PNG",          detail: "A transparent background lets your online signature sit cleanly over any document colour." },
                { tip: "Keep a master copy",                   detail: "Save your high-res 3200×1040 px PNG in a secure folder — you'll reuse it across many documents." },
                { tip: "Test at 60–80 px height",             detail: "Preview your signature at the typical document/email size to ensure it remains readable." },
              ].map(({ tip, detail }) => (
                <div key={tip} className="rounded-xl border bg-card p-4 space-y-1.5">
                  <p className="font-semibold text-foreground text-sm">{tip}</p>
                  <p className="text-sm text-muted-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Signature Examples */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Signature Examples &amp; Style Ideas</h2>
            <p className="text-muted-foreground mb-5">Not sure which style suits you? Browse these live-rendered examples — all available in the Type tab:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Stylish / Elegant",      font: "Great Vibes",    name: "Alexandra J.",   note: "Flowing thin script — ideal for formal documents and creative professionals." },
                { label: "Classic Cursive",         font: "Pinyon Script",  name: "David Miller",   note: "Traditional cursive — a timeless, professional look trusted worldwide." },
                { label: "Bold & Confident",        font: "Pacifico",       name: "Chris Park",     note: "Bold rounded signature — stands out on contracts and business agreements." },
                { label: "Minimal / Modern",        font: "Satisfy",        name: "Priya Sharma",   note: "Clean and simple — perfect for email footers and tech professionals." },
                { label: "Casual Everyday",         font: "Caveat",         name: "Sam Roberts",    note: "Natural handwriting feel — approachable and personal." },
                { label: "Formal Calligraphy",      font: "Norican",        name: "Dr. E. Watson",  note: "Authoritative and formal — suited for academic and official documents." },
              ].map(({ label, font, name, note }) => (
                <div key={label} className="rounded-xl border bg-card p-5 space-y-3">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                  <p style={{ fontFamily: `'${font}', cursive`, fontSize: "2rem", lineHeight: 1.2 }} className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis">
                    {name}
                  </p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-4 text-sm">
              Switch to the <strong>Type</strong> tab above, enter your name, and browse all 50+ fonts instantly — all free and high-resolution.
            </p>
          </section>

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Use Pixocraft's Online Signature Generator?</h2>
            <p className="text-muted-foreground mb-5">Here's how we compare to other popular tools:</p>
            <div className="overflow-x-auto rounded-xl border mb-6">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Signaturely</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">DocuSign</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Canva</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Free Forever",              "Yes",     "Limited",    "Limited",  "Pro needed"],
                    ["No Signup Required",        "Yes",     "Yes",        "Yes",      "Yes"],
                    ["100% Browser-Based",        "Yes",     "Partial",    "No",       "Partial"],
                    ["50+ Signature Fonts",       "Yes",     "Limited",    "Limited",  "Limited"],
                    ["Transparent PNG Export",    "Yes",     "No",         "No",       "Partial"],
                    ["Made in India",             "Yes",     "US",         "US",       "Global"],
                  ].map(([feat, pixo, sig, docu, canva]) => (
                    <tr key={feat} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-5 py-3 text-primary font-semibold">{pixo}</td>
                      <td className="px-5 py-3 text-muted-foreground">{sig}</td>
                      <td className="px-5 py-3 text-muted-foreground">{docu}</td>
                      <td className="px-5 py-3 text-muted-foreground">{canva}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <Lock className="h-4 w-4 text-primary" />,     title: "Zero data collection",    body: "Your signature is never transmitted, stored, or analysed. Pure local processing." },
                { icon: <Star className="h-4 w-4 text-primary" />,     title: "50+ Google Fonts",        body: "A vast library of calligraphic and handwritten fonts for any style or context." },
                { icon: <Download className="h-4 w-4 text-primary" />, title: "3200×1040 px exports",   body: "Print-quality resolution — four times the screen size, always crisp." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile-first design",   body: "Touch-optimised drawing canvas for a natural signature on any phone or tablet." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Related Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-pad-tool",            title: "Signature Generator (Main Tool)",  desc: "The complete tool with AI styles, undo/redo, and advanced options." },
                { href: "/tools/free-signature-generator",      title: "Free Signature Generator",         desc: "Emphasis on free — no cost, no watermark, unlimited downloads." },
                { href: "/tools/digital-signature-generator",   title: "Digital Signature Generator",      desc: "India IT Act 2000 ready — for GST, contracts, and business documents." },
                { href: "/tools/signature-maker",               title: "Signature Maker",                  desc: "Full creative control — custom colour, stroke, and 50+ fonts." },
                { href: "/tools/pdf-merger",                    title: "PDF Merger",                       desc: "Combine multiple PDFs into one — useful after signing multiple documents." },
                { href: "/tools/background-remover",            title: "Background Remover",               desc: "Remove any background from images — great for signature cleanup." },
              ].map(({ href, title, desc }) => (
                <Link key={href} href={href} className="flex items-center gap-3 p-4 rounded-xl border bg-card hover-elevate transition-all group">
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-foreground text-sm cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed" data-testid={`faq-answer-${i}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* EEAT / trust */}
          <section className="rounded-xl border bg-muted/30 p-6 text-sm text-muted-foreground space-y-1">
            <p><strong className="text-foreground">Author:</strong> Pixocraft Team</p>
            <p><strong className="text-foreground">Last Updated:</strong> {LAST_UPDATED}</p>
            <p><strong className="text-foreground">Made in India</strong> — Built with privacy-first principles. Your data never leaves your browser.</p>
            <p className="pt-1">
              Questions or suggestions?{" "}
              <Link href="/contact" className="text-primary hover:underline underline-offset-2">Contact us</Link>{" "}
              or visit our{" "}
              <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </section>

        </div>
      </div>

      {/* ── STICKY CTA ──────────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur-sm py-3 px-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="text-sm">
          <p className="font-semibold text-foreground">Download Your Signature Now</p>
          <p className="text-xs text-muted-foreground">Free forever · No signup · 100% private</p>
        </div>
        <Button
          size="default"
          onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="button-sticky-cta"
        >
          <Download className="mr-2 h-4 w-4" />
          Create &amp; Download Free
        </Button>
      </div>
    </>
  );
}
