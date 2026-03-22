import { useState } from "react";
import { Link } from "wouter";
import { SignatureRelatedTools } from "@/components/SignatureInternalLinks";
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
  Sparkles,
  Receipt,
  Users,
  Briefcase,
  Image,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/online-signature-generator";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 21, 2026";

const FAQS = [
  {
    question: "Is this online signature generator completely free?",
    answer: "Yes, 100% free forever. No hidden fees, no premium tiers, no watermarks, and no trial periods. Pixocraft's online signature generator is free for personal and commercial use.",
  },
  {
    question: "Do I need to create an account to use this?",
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
    question: "Can I use this on my phone or tablet?",
    answer: "Absolutely. The Draw tab is fully optimised for touchscreens — single-touch strokes work naturally on any mobile device. The Type and Upload tabs also work seamlessly on mobile browsers including Chrome, Safari, and Firefox.",
  },
  {
    question: "What file formats can I download my signature in?",
    answer: "You can download your signature as a transparent PNG (ideal for overlaying on any document background) or a white-background JPG (best for email footers and platforms that do not support transparency). Both are exported at 3200×1040 px — print-quality resolution.",
  },
  {
    question: "How do I add my signature to a PDF?",
    answer: "Download your signature as a transparent PNG. Open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place the PNG directly over the signature line. Resize and position as needed.",
  },
  {
    question: "How do I insert my signature into Microsoft Word or Google Docs?",
    answer: "Download your signature as a PNG. In Word: Insert → Pictures → This Device. In Google Docs: Insert → Image → Upload from computer. Once inserted, set text wrap to 'In front of text' for precise positioning over signature lines.",
  },
  {
    question: "How do I add my signature to Gmail or Outlook?",
    answer: "In Gmail: Settings → See all settings → Signature → click Insert image and upload your PNG. In Outlook: File → Options → Mail → Signatures → create or edit a signature and paste or insert the image. Keep height at 60–80 px for a clean look.",
  },
  {
    question: "What is the difference between Draw, Type, Upload and AI?",
    answer: "Draw: freehand with mouse or touch — most personal and unique. Type: pick from 50+ handwritten fonts — consistent and reproducible. Upload: scan your existing signature and remove the background automatically. AI: instant beautiful styles generated for you — quick and polished.",
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
  { step: 1, title: "Choose Draw, Type, Upload or AI", description: "Select Draw to sketch freehand with a mouse or finger, Type to pick from 50+ handwritten fonts, Upload to digitise an existing signature, or AI for instant beautiful styles." },
  { step: 2, title: "Customise your signature style", description: "Adjust ink colour and stroke thickness for drawing, choose a font and colour for typing, or remove the white background for an uploaded photo." },
  { step: 3, title: "Preview your signature live", description: "See your signature on a document mockup and email footer — so you know exactly how it will look in context before downloading." },
  { step: 4, title: "Download as PNG or JPG instantly", description: "Save as transparent PNG or JPG — no watermark, no signup, no waiting. Done in under 60 seconds." },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{children}</p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-3">{children}</h2>
  );
}

function SectionSubtext({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground text-base leading-relaxed mb-7">{children}</p>
  );
}

export default function OnlineSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free Online Signature Generator – Draw, Type & Download PNG (No Signup)",
    description:
      "Create your digital signature online for free. Draw, type (50+ fonts), upload or use AI styles and download transparent PNG instantly. 100% private, no signup, offline. Works for PDF, GST invoices, email & documents. Made in India.",
    keywords:
      "signature generator, online signature maker, digital signature online, free signature generator, create signature online, e signature maker, signature for pdf, email signature generator, online signature no signup, free e-signature India",
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
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
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
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Online Signature Generator" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-10 pt-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Free Tool · Made in India</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight mb-4">
            Free Online Signature Generator
            <span className="block text-xl sm:text-2xl font-medium text-muted-foreground mt-1">
              Draw, Type, Upload &amp; Download PNG — No Signup
            </span>
          </h1>

          <p className="text-base text-muted-foreground leading-relaxed mb-6 max-w-2xl">
            Create a digital signature online in seconds. <strong className="text-foreground">Draw</strong> with your mouse or finger,{" "}
            <strong className="text-foreground">type</strong> in 50+ handwritten fonts,{" "}
            <strong className="text-foreground">upload</strong> an existing signature, or use{" "}
            <strong className="text-foreground">AI styles</strong> for instant results.
            Download as a crisp transparent PNG — free forever, 100% private.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
            {[
              { icon: <Check className="h-3.5 w-3.5 text-primary" />, label: "No Signup · No Watermark" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />, label: "100% Private & Offline" },
              { icon: <Lock className="h-3.5 w-3.5 text-primary" />, label: "Save & Reuse Locally" },
              { icon: <Smartphone className="h-3.5 w-3.5 text-primary" />, label: "PDF, GST & Email Ready" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg bg-muted/60 border px-3 py-2">
                <span className="shrink-0">{icon}</span>
                <span className="text-xs font-medium text-foreground leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-14">
          <SignaturePadWidget />
          <p className="text-xs text-muted-foreground text-center mt-3">
            No watermark · No upload to server · Works offline after page load
          </p>
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-20">

          {/* ── WHAT IS ── */}
          <section>
            <SectionLabel>Overview</SectionLabel>
            <SectionHeading>What is an Online Signature Generator?</SectionHeading>

            <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-6 py-5 mb-6">
              <p className="text-foreground font-medium leading-relaxed">
                An <strong>online signature generator</strong> is a free tool that lets you create a digital signature by drawing,
                typing in 50+ handwritten fonts, uploading a signature image, or using AI-generated styles —
                then download it as a transparent PNG for PDF, Word, email, or anywhere else.
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                You can draw with a mouse or touchscreen for a natural handwritten feel, type your name in a calligraphic font,
                or upload a photo of your existing pen-and-paper signature and strip the background automatically. The result is
                a high-resolution transparent PNG ready to drop into any PDF, Word document, Google Doc, or email signature.
              </p>
              <p>
                Pixocraft's free <strong className="text-foreground">online signature generator</strong> is entirely client-side —
                every pixel is processed locally in your browser using the HTML5 Canvas API.
                Your data never leaves your device, making it one of the most privacy-respecting e-signature tools available online.
              </p>
              <p>
                Whether you need a signature for a freelance contract, an NDA, a GST invoice, or an email footer —
                this tool handles it all in under 60 seconds.
              </p>
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section>
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>How to Create a Digital Signature Online</SectionHeading>
            <SectionSubtext>Four simple steps — done in under a minute.</SectionSubtext>

            <ol className="space-y-4">
              {HOW_IT_WORKS_STEPS.map(({ step, title, description }) => (
                <li key={step} className="flex gap-5 p-5 rounded-xl border bg-card">
                  <span className="shrink-0 h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">
                    {step}
                  </span>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="text-sm text-muted-foreground mt-5">
              Want even more options?{" "}
              <Link href="/tools/signature-pad-tool" className="text-primary hover:underline underline-offset-2 font-medium">
                Visit the full Signature Generator
              </Link>
              .
            </p>
          </section>

          {/* ── SAVE & REUSE ── */}
          <section>
            <SectionLabel>Privacy-First</SectionLabel>
            <SectionHeading>Save &amp; Reuse Your Signature — 100% Private &amp; Offline</SectionHeading>
            <SectionSubtext>
              Unlike other tools, Pixocraft saves your signature locally in your browser using secure LocalStorage.
              Your data never leaves your device — no server, no login, no tracking.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Lock className="h-5 w-5 text-primary" />,
                  title: "Saved in your browser",
                  body: "Your signature lives only on your device. It never touches any server.",
                },
                {
                  icon: <Shield className="h-5 w-5 text-primary" />,
                  title: "No server upload",
                  body: "100% offline after page load. Works without internet for every reuse.",
                },
                {
                  icon: <Zap className="h-5 w-5 text-primary" />,
                  title: "Reuse instantly",
                  body: "Load it again for PDF, Word, Gmail, or Tally — ready in one click.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex flex-col gap-3 p-5 rounded-xl border bg-card">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── METHODS ── */}
          <section>
            <SectionLabel>Methods</SectionLabel>
            <SectionHeading>Draw vs Type vs Upload vs AI</SectionHeading>
            <SectionSubtext>
              Every workflow is different. Here's a quick comparison to help you pick the right method.
            </SectionSubtext>

            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Method</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Best For</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Pros</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Cons</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { method: "Draw",   best: "Personal feel",        pros: "Natural, unique, touch-optimised",    cons: "Takes a few tries to perfect" },
                    { method: "Type",   best: "Fast & clean output",  pros: "50+ fonts, consistent, reproducible", cons: "Less personal than hand-drawn" },
                    { method: "Upload", best: "Existing signature",   pros: "Reuse easily, auto bg removal",       cons: "Quality depends on photo" },
                    { method: "AI",     best: "Instant styles",       pros: "Beautiful, quick, no effort",         cons: "Not truly hand-drawn" },
                  ].map(({ method, best, pros, cons }) => (
                    <tr key={method} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-semibold text-foreground">{method}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{best}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{pros}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{cons}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl bg-muted/40 border px-5 py-4 text-sm text-foreground">
              <strong>Quick pick:</strong>{" "}
              <span className="text-muted-foreground">
                New user → <strong className="text-foreground">Type</strong>.
                Already have a signature → <strong className="text-foreground">Upload</strong>.
                Want it personal → <strong className="text-foreground">Draw</strong>.
                Want it fast → <strong className="text-foreground">AI</strong>.
              </span>
            </div>
          </section>

          {/* ── USE CASES ── */}
          <section>
            <SectionLabel>Use Cases</SectionLabel>
            <SectionHeading>Where Can You Use Your Signature?</SectionHeading>
            <SectionSubtext>
              Your downloaded PNG works anywhere a handwritten signature would — and more.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                { icon: <Receipt className="h-4 w-4 text-primary" />,   title: "GST Invoices & E-way Bills",       body: "Drop directly into Tally, Zoho Books, or any billing software that supports image insertion." },
                { icon: <FileText className="h-4 w-4 text-primary" />,  title: "PDF Documents & Contracts",        body: "Use Acrobat's 'Insert Image' or Smallpdf's signature tools to sign PDFs in seconds." },
                { icon: <FileImage className="h-4 w-4 text-primary" />, title: "Google Docs & Microsoft Word",     body: "Insert → Image → upload your PNG. Set text wrap to 'In front of text' for precise placement." },
                { icon: <Mail className="h-4 w-4 text-primary" />,      title: "Email Footers (Gmail & Outlook)",  body: "A transparent PNG signature adds a polished, personal touch to every email you send." },
                { icon: <Globe className="h-4 w-4 text-primary" />,     title: "Aadhaar & Government Portals",     body: "Many portals, HR platforms, and banking forms accept image-based signatures in PNG format." },
                { icon: <Users className="h-4 w-4 text-primary" />,     title: "HR Onboarding & Freelance Deals",  body: "Stamp your signature on offer letters or proposals to convey authority and close deals faster." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Platform instructions */}
            <div className="space-y-3">
              {[
                {
                  icon: <FileText className="h-4 w-4 text-primary" />,
                  title: "Adding to a PDF",
                  body: (<>Download your transparent PNG. Open your PDF in{" "}<Link href="/tools/pdf-merger" className="text-primary hover:underline underline-offset-2 font-medium">Pixocraft PDF tools</Link>, Adobe Acrobat, or Smallpdf. Use Insert → Image to place the PNG over the signature line.</>),
                },
                {
                  icon: <FileImage className="h-4 w-4 text-primary" />,
                  title: "Inserting into Word or Google Docs",
                  body: (<><strong className="text-foreground">Word:</strong> Insert → Pictures → This Device. <strong className="text-foreground">Google Docs:</strong> Insert → Image → Upload from computer. Then{" "}<Link href="/tools/image-to-pdf" className="text-primary hover:underline underline-offset-2 font-medium">convert to PDF</Link>{" "}when done.</>),
                },
                {
                  icon: <Mail className="h-4 w-4 text-primary" />,
                  title: "Email signature in Gmail or Outlook",
                  body: (<><strong className="text-foreground">Gmail:</strong> Settings → Signature → Insert image → upload PNG. <strong className="text-foreground">Outlook:</strong> File → Options → Mail → Signatures → insert picture. Keep height around 60–80 px.</>),
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4 px-5 py-4 rounded-xl border bg-muted/30">
                  <div className="shrink-0 mt-0.5 h-7 w-7 rounded-md bg-primary/10 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── LEGAL ── */}
          <section>
            <SectionLabel>Legal Validity</SectionLabel>
            <SectionHeading>Is Online Signature Legal in India?</SectionHeading>
            <SectionSubtext>
              Yes — under the IT Act 2000 and its 2008 amendment, electronic signatures are legally valid
              for most documents in India including GST invoices, contracts, and HR agreements.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {[
                { region: "India",          law: "IT Act 2000 + Amendment 2008",        desc: "Valid for contracts, GST invoices, Aadhaar documents, and company agreements." },
                { region: "United States",  law: "ESIGN Act + UETA",                    desc: "Same legal effect as handwritten for most contracts and commercial agreements." },
                { region: "European Union", law: "eIDAS Regulation (2016)",             desc: "Image signatures qualify as Simple Electronic Signatures (SES) under eIDAS." },
                { region: "United Kingdom", law: "Electronic Communications Act 2000",  desc: "Legally binding for most business and personal agreements." },
              ].map(({ region, law, desc }) => (
                <div key={region} className="rounded-xl border bg-card p-5 space-y-2">
                  <p className="font-semibold text-foreground text-sm">{region}</p>
                  <p className="text-xs font-medium text-primary">{law}</p>
                  <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-5 py-4 text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong>Note:</strong> For everyday contracts, NDAs, freelance agreements, GST invoices, and HR documents —
              this free tool is fully sufficient. For court filings, MCA ROC submissions, or property registration in India —
              a certified Digital Signature Certificate (DSC) from a licensed CA is required.
            </div>
          </section>

          {/* ── COMPARISON ── */}
          <section>
            <SectionLabel>Comparison</SectionLabel>
            <SectionHeading>Best Free Signature Generator vs Paid Tools</SectionHeading>
            <SectionSubtext>
              See how Pixocraft stacks up against the most popular alternatives.
            </SectionSubtext>

            <div className="overflow-x-auto rounded-xl border mb-6">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Signaturely</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Canva</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">DocuSign</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Free Forever",           "Yes",     "Limited",  "Pro needed", "Limited"],
                    ["No Signup Required",     "Yes",     "Yes",      "Yes",        "Yes"],
                    ["100% Browser-Based",     "Yes",     "Partial",  "Partial",    "No"],
                    ["50+ Signature Fonts",    "Yes",     "Limited",  "Limited",    "Limited"],
                    ["Transparent PNG Export", "Yes",     "No",       "Partial",    "No"],
                    ["AI Styles",              "Yes",     "No",       "No",         "No"],
                    ["Offline",                "Yes",     "No",       "No",         "No"],
                    ["Made in India",          "Yes",     "US",       "Global",     "US"],
                  ].map(([feat, pixo, sig, canva, docu]) => (
                    <tr key={feat} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-5 py-3 font-semibold text-primary">{pixo}</td>
                      <td className="px-5 py-3 text-muted-foreground">{sig}</td>
                      <td className="px-5 py-3 text-muted-foreground">{canva}</td>
                      <td className="px-5 py-3 text-muted-foreground">{docu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Lock className="h-4 w-4 text-primary" />,       title: "Zero data collection",   body: "Your signature is never transmitted, stored, or analysed. Pure local processing." },
                { icon: <Sparkles className="h-4 w-4 text-primary" />,   title: "50+ Google Fonts",       body: "A vast library of calligraphic and handwritten fonts for any style or context." },
                { icon: <Download className="h-4 w-4 text-primary" />,   title: "3200×1040 px exports",  body: "Print-quality resolution — four times the screen size, always crisp." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile-first design",    body: "Touch-optimised drawing canvas for a natural signature on any phone or tablet." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TIPS ── */}
          <section>
            <SectionLabel>Pro Tips</SectionLabel>
            <SectionHeading>Tips for a Professional Digital Signature</SectionHeading>
            <SectionSubtext>
              Small details make a big difference. Follow these to get the most out of your signature.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tip: "Use black or dark blue ink",    detail: "Universally accepted in legal contexts and stays legible at any size." },
                { tip: "Set stroke width to 3–4 px",   detail: "Thicker strokes remain visible when scaled down in PDFs or email footers." },
                { tip: "Match font style to context",   detail: "Thin elegant scripts for formal documents; bold fonts for casual use." },
                { tip: "Download as transparent PNG",   detail: "A transparent background lets your signature sit cleanly over any document." },
                { tip: "Keep a master copy",            detail: "Save your high-res PNG in a secure folder — you'll reuse it across many documents." },
                { tip: "Test at 60–80 px height",       detail: "Preview at typical email/document size to ensure it stays readable." },
              ].map(({ tip, detail }) => (
                <div key={tip} className="flex gap-3 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <Check className="h-3 w-3 text-primary" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{tip}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SIGNATURE EXAMPLES ── */}
          <section>
            <SectionLabel>Style Examples</SectionLabel>
            <SectionHeading>Signature Style Ideas</SectionHeading>
            <SectionSubtext>
              Not sure which style suits you? Browse these live-rendered examples — all available in the Type tab.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Stylish / Elegant",    font: "Great Vibes",   name: "Alexandra J.",  note: "Flowing thin script — ideal for formal documents and creative professionals." },
                { label: "Classic Cursive",       font: "Pinyon Script", name: "David Miller",  note: "Traditional cursive — a timeless, professional look trusted worldwide." },
                { label: "Bold & Confident",      font: "Pacifico",      name: "Chris Park",    note: "Bold rounded signature — stands out on contracts and business agreements." },
                { label: "Minimal / Modern",      font: "Satisfy",       name: "Priya Sharma",  note: "Clean and simple — perfect for email footers and tech professionals." },
                { label: "Casual Everyday",       font: "Caveat",        name: "Sam Roberts",   note: "Natural handwriting feel — approachable and personal." },
                { label: "Formal Calligraphy",    font: "Norican",       name: "Dr. E. Watson", note: "Authoritative and formal — suited for academic and official documents." },
              ].map(({ label, font, name, note }) => (
                <div key={label} className="rounded-xl border bg-card p-5 space-y-3">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                  <p
                    style={{ fontFamily: `'${font}', cursive`, fontSize: "2rem", lineHeight: 1.2 }}
                    className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {name}
                  </p>
                  <p className="text-xs text-muted-foreground leading-snug">{note}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mt-5">
              Switch to the <strong className="text-foreground">Type</strong> tab above, enter your name, and browse all 50+ fonts instantly — all free and high-resolution.
            </p>
          </section>

          {/* ── RELATED TOOLS ── */}
          <section>
            <SectionLabel>Related Tools</SectionLabel>
            <SectionHeading>More Signature &amp; Document Tools</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-pad-tool",          title: "Signature Generator (Main Tool)",  desc: "The complete tool with AI styles, undo/redo, and advanced options." },
                { href: "/tools/free-signature-generator",    title: "Free Signature Generator",         desc: "No cost, no watermark, unlimited downloads." },
                { href: "/tools/digital-signature-generator", title: "Digital Signature Generator",      desc: "India IT Act 2000 ready — for GST, contracts, and business documents." },
                { href: "/tools/signature-maker",             title: "Signature Maker",                  desc: "Full creative control — custom colour, stroke, and 50+ fonts." },
                { href: "/tools/pdf-merger",                  title: "PDF Merger",                       desc: "Combine multiple PDFs into one — useful after signing multiple documents." },
                { href: "/tools/background-remover",          title: "Background Remover",               desc: "Remove any background from images — great for signature cleanup." },
              ].map(({ href, title, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-card hover-elevate transition-all group"
                >
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section>
            <SectionLabel>FAQ</SectionLabel>
            <SectionHeading>Frequently Asked Questions</SectionHeading>

            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="leading-snug">{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div
                      className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t pt-4"
                      data-testid={`faq-answer-${i}`}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── TRUST / EEAT ── */}
          <section className="rounded-xl border bg-muted/30 px-6 py-5 text-sm text-muted-foreground space-y-1.5">
            <p><strong className="text-foreground">Author:</strong> Pixocraft Team</p>
            <p><strong className="text-foreground">Last Updated:</strong> {LAST_UPDATED}</p>
            <p><strong className="text-foreground">Made in India</strong> — Built with privacy-first principles. Your data never leaves your browser.</p>
            <p className="pt-1">
              Questions or suggestions?{" "}
              <Link href="/contact" className="text-primary hover:underline underline-offset-2">Contact us</Link>
              {" "}or visit our{" "}
              <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </section>

        </div>
      </div>

      {/* ── STICKY CTA ──────────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 z-[9999] w-full border-t bg-background/95 backdrop-blur-sm py-3 px-4 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-semibold text-foreground text-sm">Download Your Signature Now</p>
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
