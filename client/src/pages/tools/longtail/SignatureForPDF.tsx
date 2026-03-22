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
  PenTool, Shield, Zap, Smartphone, Star, Check, FileText, Mail, Globe,
  ChevronDown, ChevronUp, ArrowRight, Lock, AlertCircle, BadgeCheck,
  FileCheck, Receipt, Briefcase, FilePen, Users, Clock, Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-for-pdf";
const LAST_UPDATED = "March 21, 2026";

const FAQS = [
  { question: "How do I sign a PDF online free?", answer: "Use Pixocraft's Sign PDF tool: (1) Draw or type your signature. (2) Upload your PDF. (3) Click the page where you want to place your signature. (4) Click 'Insert Signature into PDF' and download. The whole process takes under 30 seconds — no login, no server upload, 100% free." },
  { question: "Can I add a signature to a PDF without uploading it?", answer: "Yes — and this is what makes Pixocraft unique. Your PDF is processed entirely inside your browser using PDF.js and pdf-lib, two open-source JavaScript libraries. Your file never leaves your device. No server receives it. This is fundamentally different from Smallpdf, Adobe Sign, and DocuSign, all of which upload your PDF to their cloud." },
  { question: "Is signing a PDF online legally valid in India?", answer: "Yes — for most everyday commercial documents. Under the IT Act 2000 (amended 2008, Section 3A), an electronic signature embedded in a PDF is a Simple Electronic Signature (SES) — legally valid for contracts, GST invoices, NDAs, offer letters, and HR documents. For court filings, ROC submissions, and income tax e-verification, a certified DSC is required." },
  { question: "What format is best for a PDF signature?", answer: "PNG with a transparent background is the best format. Unlike JPG, PNG transparency means your signature overlays cleanly on any PDF page — white sections, coloured backgrounds, and tables — without a visible white box. This tool automatically exports your signature as a transparent PNG before embedding it into the PDF." },
  { question: "Can I sign a PDF on mobile without an app?", answer: "Yes. Open this page on any smartphone — Chrome on Android or Safari on iOS. Draw your signature directly on the touch canvas, upload your PDF from phone storage, Google Drive, or iCloud, tap to place, and download the signed PDF. No app required, no account needed." },
  { question: "Can I add a signature to a PDF without Adobe Acrobat?", answer: "Yes — completely. This tool replaces Adobe Acrobat for PDF signing. Create your signature, upload your PDF, click to place, and download the signed PDF in under 30 seconds. No Adobe subscription, no software to install." },
  { question: "Can I sign a GST invoice PDF with this tool?", answer: "Yes. GST invoice PDFs require the supplier's or authorised representative's signature. Embedding your PNG signature into a GST invoice PDF satisfies this requirement for manually generated invoices in Tally, Zoho Books, or custom billing software. Download the signed PDF and share or archive normally." },
  { question: "Is my PDF file stored anywhere?", answer: "Never. This tool runs 100% in your browser. Your PDF file, your signature, and the signed output are all processed locally using PDF.js and pdf-lib. Nothing leaves your device, ever. No server-side storage, no cloud backup, no data retention." },
  { question: "How do I make my signature look professional in a PDF?", answer: "Three tips: (1) Use a handwriting font in the Type tab, or draw carefully in the Draw tab — a deliberate signature looks more professional. (2) Set the signature to 15–20% of page width — large enough to read, proportionate enough to look intentional. (3) Click precisely on the signature line, not above or below it." },
  { question: "Can I sign multiple pages of a PDF?", answer: "Yes. After placing your signature on page 1, use the page navigator arrows to go to the next page. Click to place your signature on that page. Repeat for each page. All placements are tracked independently, and the final download includes your signature on every page you signed." },
  { question: "What file size limit does this tool have?", answer: "There are no strict file size limits — the tool runs in your browser constrained only by your device's memory. In practice, PDFs up to 50MB process without issues on modern devices. Very large PDFs (100MB+) may take a few seconds to render." },
  { question: "How is this different from DocuSign or Smallpdf?", answer: "Three key differences: (1) Privacy — Pixocraft processes everything locally; DocuSign and Smallpdf upload your PDF to their servers. (2) Cost — Pixocraft is fully free with no watermark; free tiers of DocuSign and Smallpdf are limited. (3) Speed — Pixocraft requires no account, no email verification, no workflow approval — you sign in under 30 seconds." },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Create your signature",  description: "Draw freehand with your mouse or finger, or type your name and pick from 50+ handwriting fonts. Tap 'Confirm Signature' when satisfied." },
  { step: 2, title: "Upload your PDF",         description: "Upload the PDF you need to sign. It renders as a live, pixel-accurate preview in your browser — nothing is sent to any server." },
  { step: 3, title: "Click to place",          description: "Click anywhere on the PDF page to position your signature. Use the size slider to scale it. Navigate pages for multi-page documents." },
  { step: 4, title: "Download signed PDF",     description: "Click 'Insert Signature into PDF' — pdf-lib embeds your signature at the exact coordinates and your signed PDF downloads immediately." },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,   title: "GST Invoices",               desc: "Sign GST invoice PDFs to satisfy the CBIC supplier signature requirement for Tally, Zoho Books, and custom billing software." },
  { icon: <FileText className="h-5 w-5 text-primary" />,  title: "Contracts & NDAs",            desc: "Sign client contracts, non-disclosure agreements, and service agreements — legally valid under the IT Act 2000." },
  { icon: <FilePen className="h-5 w-5 text-primary" />,   title: "Offer & Appointment Letters", desc: "HR teams create clean signed PDFs for offer letters and appointment letters in seconds — no printing required." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Freelancer Proposals",        desc: "Signed proposals and SOWs communicate professionalism and commitment from the very first client touchpoint." },
  { icon: <Globe className="h-5 w-5 text-primary" />,     title: "Government Applications",     desc: "Many government forms and applications accept PDF submissions with embedded electronic signatures." },
  { icon: <Mail className="h-5 w-5 text-primary" />,      title: "Official Correspondence",     desc: "Business letters and formal memos with an embedded signature project authority and credibility." },
];

function FeatureCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border bg-card">
      <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
      <div>
        <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
        <p className="text-sm text-muted-foreground leading-snug">{body}</p>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{children}</p>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-3">{children}</h2>;
}

function SectionSubtext({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-base leading-relaxed mb-6">{children}</p>;
}

export default function SignatureForPDF() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Sign PDF Online Free – Add Signature to PDF (No Signup, No Upload) | Pixocraft",
    description: "Sign PDF online free using Pixocraft. Create signature, download PNG, add to PDF instantly. No login, no upload to server, 100% private. Works for GST invoices, contracts & official documents.",
    keywords: "sign pdf online free, add signature to pdf, pdf signature online, sign pdf without software, sign pdf no upload, pdf signature free india, sign gst invoice pdf",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Sign PDF Online Free – Pixocraft",
    description: "Sign PDF online free — create your signature, upload your PDF, click to place, and download the signed document instantly. No login, no server upload, 100% private. Works for GST, contracts, and official documents.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",               url: "https://tools.pixocraft.in/" },
    { name: "Tools",              url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "Sign PDF Online",    url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Sign PDF Online Free – Add Signature to PDF (No Signup, No Upload)",
    description: "Sign PDF online free using Pixocraft. Create signature, add to PDF instantly. No login, no server upload, 100% private.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Sign a PDF Online Free",
    description: "Use Pixocraft's free PDF signature tool to create your signature, upload your PDF, click to place the signature, and download the signed document — all in your browser in under 30 seconds.",
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
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Sign PDF Online" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-10 pt-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <FileCheck className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Free PDF Signing Tool · Made in India
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-3">
            Sign PDF Online Free
          </h1>
          <p className="text-lg sm:text-xl font-medium text-muted-foreground mb-5">
            Add Signature to PDF Instantly — No Signup, No Upload Required
          </p>

          <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-2xl">
            Sign any PDF document directly in your browser — no login, no server upload, completely private.{" "}
            <strong className="text-foreground">Draw</strong> your signature freehand,{" "}
            <strong className="text-foreground">type</strong> it in 50+ calligraphic fonts,{" "}
            or <strong className="text-foreground">upload</strong> your existing signature image.
            Place it anywhere on your PDF and download the signed file instantly. Ready for GST invoices,
            contracts, offer letters, and all official documents.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
            {[
              { icon: <Check className="h-3.5 w-3.5 text-primary" />,      label: "No Signup Required" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />,     label: "No Upload to Server" },
              { icon: <Lock className="h-3.5 w-3.5 text-primary" />,       label: "100% Private & Offline" },
              { icon: <Smartphone className="h-3.5 w-3.5 text-primary" />, label: "Mobile Friendly" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg bg-muted/50 border px-3 py-2.5">
                <span className="shrink-0">{icon}</span>
                <span className="text-xs font-medium text-foreground leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-4 mb-2 text-xs text-muted-foreground">
            {[
              { icon: <Clock className="h-3.5 w-3.5 text-primary" />,  label: "Most users finish in under 45 seconds" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />, label: "No data stored — ever" },
              { icon: <Users className="h-3.5 w-3.5 text-primary" />,  label: "Trusted by thousands of professionals" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 font-medium">{icon}{label}</div>
            ))}
          </div>
        </div>

        {/* ── FEATURED SNIPPET BLOCK ────────────────────────────────────────── */}
        <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-6 py-5 mb-10">
          <h2 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
            Sign PDF Online Free Without Upload or Software
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Pixocraft lets you sign any PDF document directly in your browser — no account, no server upload, no software.
            Create your signature by drawing or typing, upload your PDF, click to place your signature on any page, and
            download the signed PDF instantly. 100% private, works offline, free forever.
          </p>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <SignatureToolSection />

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16">

          {/* ── WHAT IS ── */}
          <section>
            <SectionLabel>Overview</SectionLabel>
            <SectionHeading>What Does "Sign PDF Online Free" Mean?</SectionHeading>

            <div className="rounded-xl border bg-muted/40 px-6 py-5 mb-6">
              <p className="text-foreground font-medium leading-relaxed">
                Signing a PDF online free means creating an electronic version of your handwritten signature and embedding it
                directly into a PDF document — all inside your browser, with no software, no account, and no server upload required.
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The process has two parts: creating the signature (by drawing freehand, typing in a handwriting font, or uploading
                an existing image) and then placing it precisely inside your PDF. Pixocraft combines both steps into one seamless,
                30-second workflow.
              </p>
              <p>
                Technically, this tool uses two open-source browser libraries: <strong className="text-foreground">PDF.js</strong> (from Mozilla)
                renders your PDF as a live interactive preview, and <strong className="text-foreground">pdf-lib</strong> embeds your signature
                at the exact pixel coordinates you select. Both libraries run 100% locally — your PDF never leaves your device.
              </p>
              <p>
                The result is a standard, self-contained PDF with your signature permanently embedded — indistinguishable from a document
                signed in Adobe Acrobat, but done entirely in your browser for free in under 30 seconds.
              </p>
            </div>
          </section>

          {/* ── HOW TO SIGN PDF ── */}
          <section>
            <SectionLabel>Step-by-Step Guide</SectionLabel>
            <SectionHeading>How to Sign a PDF Online Free — 4 Steps</SectionHeading>
            <SectionSubtext>
              From blank to signed PDF in under 30 seconds — no login, no software required.
            </SectionSubtext>

            <ol className="space-y-3 mb-7">
              {HOW_TO_STEPS.map(({ step, title, description }) => (
                <li key={step} className="flex gap-5 p-5 rounded-xl border bg-card">
                  <span className="shrink-0 h-9 w-9 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
                    {step}
                  </span>
                  <div className="space-y-1 pt-0.5">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
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
                <FileCheck className="h-4 w-4" />
                Sign PDF Free Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* ── THREE METHODS ── */}
          <section>
            <SectionLabel>Methods</SectionLabel>
            <SectionHeading>Three Ways to Add Signature to PDF</SectionHeading>
            <SectionSubtext>
              Choose the approach that best fits your workflow and device.
            </SectionSubtext>

            <div className="space-y-4">
              {[
                {
                  label: "Method 1 — Pixocraft Direct Workflow (Fastest · Recommended)",
                  highlight: true,
                  steps: [
                    "Draw or type your signature in Step 1 of the tool above",
                    "Upload your PDF — it previews instantly in your browser, nothing uploaded",
                    "Click the exact position on the PDF page where you want the signature",
                    "Click 'Insert Signature into PDF' — signed document downloads immediately",
                  ],
                  note: "Best for everyone. 30 seconds. No login, no server, no watermark. The most private method available.",
                },
                {
                  label: "Method 2 — PNG Download + Manual Insert (Adobe / Google Docs)",
                  highlight: false,
                  steps: [
                    "Use Pixocraft's Signature Generator to create and download a transparent PNG",
                    "Open your PDF in Adobe Acrobat or Google Docs",
                    "Insert the PNG as an image element and position it over the signature line",
                    "Export the document as a signed PDF from Acrobat or Google Docs",
                  ],
                  note: "Best for users who need pixel-perfect control over size and rotation using Acrobat's full layout tools.",
                },
                {
                  label: "Method 3 — Mobile Quick Sign (Phone or Tablet)",
                  highlight: false,
                  steps: [
                    "Open this page on your smartphone — no app download required",
                    "Draw your signature directly on the touch canvas",
                    "Upload your PDF from phone storage, Google Drive, or iCloud",
                    "Tap to place your signature and download the signed PDF to your phone",
                  ],
                  note: "Best for on-the-go signing. Works on any iOS or Android device with any modern browser.",
                },
              ].map(({ label, highlight, steps, note }) => (
                <div key={label} className={`rounded-xl border p-5 ${highlight ? "border-primary/30 bg-primary/5" : "bg-card"}`}>
                  <p className="font-semibold text-foreground mb-3">{label}</p>
                  <ol className="space-y-2 mb-3">
                    {steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                  <p className={`text-xs font-medium ${highlight ? "text-primary" : "text-muted-foreground"}`}>{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── ADD SIGNATURE TO PDF — FEATURES ── */}
          <section>
            <SectionLabel>Tool Features</SectionLabel>
            <SectionHeading>Add Signature to PDF — Full Feature Set</SectionHeading>
            <SectionSubtext>
              Everything built into this tool for professional, instant PDF signing.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard icon={<PenTool className="h-4 w-4 text-primary" />}    title="Draw + Type + Upload"         body="Freehand drawing with mouse or touch, 50+ handwriting fonts for typed signatures, or upload your existing signature image." />
              <FeatureCard icon={<Shield className="h-4 w-4 text-primary" />}     title="Transparent PNG signature"    body="Signature embedded as a transparent PNG — no white background box, clean overlay on any PDF section or background colour." />
              <FeatureCard icon={<FileText className="h-4 w-4 text-primary" />}   title="Live PDF preview"             body="Your PDF renders as a pixel-accurate interactive preview. See exactly where your signature will land before committing." />
              <FeatureCard icon={<FileCheck className="h-4 w-4 text-primary" />}  title="Click-to-place precision"     body="Click anywhere on the PDF to drop your signature. Reposition instantly by clicking again. Size slider included." />
              <FeatureCard icon={<Smartphone className="h-4 w-4 text-primary" />} title="Mobile-first design"          body="Touch-optimised drawing canvas, responsive PDF preview, and one-tap download. Sign on any phone or tablet." />
              <FeatureCard icon={<Zap className="h-4 w-4 text-primary" />}        title="Multi-page PDF support"       body="Navigate between pages with the page navigator. Place independent signatures on as many pages as needed." />
              <FeatureCard icon={<Lock className="h-4 w-4 text-primary" />}       title="Zero server upload"           body="PDF.js and pdf-lib run 100% locally in your browser. Your PDF is never transmitted to any server, ever." />
              <FeatureCard icon={<Star className="h-4 w-4 text-primary" />}       title="No watermark, no account"     body="Sign unlimited PDFs for free. No login, no premium tier. The downloaded PDF is clean — no Pixocraft branding." />
            </div>
          </section>

          {/* ── WHY USE ONLINE PDF SIGNATURE TOOL ── */}
          <section>
            <SectionLabel>Why It Helps</SectionLabel>
            <SectionHeading>Why Use an Online PDF Signature Tool?</SectionHeading>
            <SectionSubtext>
              Signing PDFs electronically saves hours every month — and protects your privacy better than any upload-based alternative.
            </SectionSubtext>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
              <p>
                Printing, signing by hand, scanning, and re-uploading a PDF takes 5–15 minutes and requires a printer, a pen, and
                a scanner. An <strong className="text-foreground">online PDF signature tool</strong> eliminates every step in that chain —
                the entire process takes under 30 seconds, requires no hardware, and works from any device anywhere.
              </p>
              <p>
                For businesses, this translates directly into faster deal cycles. A contract that used to take 2–3 days to
                sign-and-return can be returned in minutes. For freelancers, it means professional-looking signed proposals
                on short notice. For individuals, it means signing government forms and official correspondence without ever
                touching a printer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeatureCard icon={<Zap className="h-4 w-4 text-primary" />}    title="Under 30 seconds"     body="Faster than any competitor that requires login, upload approval, or email confirmation links." />
              <FeatureCard icon={<Shield className="h-4 w-4 text-primary" />} title="True privacy"         body="Every competitor uploads your PDF to their cloud. Pixocraft never does. Your documents stay on your device." />
              <FeatureCard icon={<Star className="h-4 w-4 text-primary" />}   title="No watermark ever"    body="Free tiers of DocuSign and Smallpdf add watermarks. Every PDF signed here is always clean and professional." />
            </div>
          </section>

          {/* ── SAVE & REUSE ── */}
          <section>
            <SectionLabel>Save & Reuse</SectionLabel>
            <SectionHeading>Save Your Signature — Reuse on Any PDF</SectionHeading>
            <SectionSubtext>
              Create your signature once and reuse it on every PDF you ever need to sign — no recreating from scratch each time.
            </SectionSubtext>

            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <ul className="space-y-3">
                {[
                  "Your last signature is automatically saved to your browser's localStorage",
                  "Return to the page anytime — your signature loads instantly, ready to use",
                  "No server storage, no cloud sync — completely private and device-local",
                  "Use the same signature across GST invoices, contracts, emails, and PDFs",
                  "Update your signature in seconds if your style or name changes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeatureCard icon={<Lock className="h-4 w-4 text-primary" />}    title="Saved in browser only"  body="Stored in localStorage — only accessible by you, on your device. No cloud, no server." />
              <FeatureCard icon={<Shield className="h-4 w-4 text-primary" />}  title="Zero data collection"   body="We collect no signature data. No analytics on what you type or draw. No tracking whatsoever." />
              <FeatureCard icon={<Download className="h-4 w-4 text-primary" />} title="Reuse across tools"     body="The same saved signature works in this PDF tool, the email signature tool, and the GST invoice tool." />
            </div>
          </section>

          {/* ── USE CASES ── */}
          <section>
            <SectionLabel>Use Cases</SectionLabel>
            <SectionHeading>Who Uses This PDF Signing Tool?</SectionHeading>
            <SectionSubtext>
              Every professional who handles documents electronically benefits from a fast, private PDF signing tool.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {USE_CASES.map(({ icon, title, desc }) => (
                <FeatureCard key={title} icon={icon} title={title} body={desc} />
              ))}
            </div>

            <div className="rounded-xl bg-muted/40 border px-5 py-4 text-sm text-muted-foreground leading-relaxed">
              The common thread: a PDF that needs signing and returning — to a client, employer, or government entity.
              This tool removes every unnecessary step and delivers the signed PDF in under 30 seconds.
            </div>
          </section>

          {/* ── LEGAL ── */}
          <section>
            <SectionLabel>Legal Guide</SectionLabel>
            <SectionHeading>Is a PDF Signature Legally Valid in India?</SectionHeading>
            <SectionSubtext>
              Understanding when your signed PDF is legally binding — and when it isn't — protects your business.
            </SectionSubtext>

            <div className="space-y-4 mb-5">
              {[
                {
                  title: "IT Act 2000 — The Legal Foundation",
                  body: "The IT Act 2000 (amended 2008, Section 3A) establishes that electronic signatures in India have the same legal standing as handwritten signatures for most civil and commercial transactions. A signature embedded in a PDF is a Simple Electronic Signature (SES) — legally valid, court-recognised, and enforceable.",
                },
                {
                  title: "GST Invoice Signing",
                  body: "CBIC permits manually-generated GST invoices to bear an electronic signature. If your billing software generates PDF invoices you sign manually, embedding your PNG signature satisfies the GST requirement. For IRN/QR-code-based e-invoices, the system-generated authentication is used instead.",
                },
                {
                  title: "Contracts, NDAs & Agreements",
                  body: "Indian contract law (Contract Act 1872) requires offer, acceptance, and intention to be bound — not a wet ink signature. Electronic contracts signed via image-based signatures are enforceable for freelance contracts, NDAs, employment letters, and vendor agreements.",
                },
                {
                  title: "When a DSC (Digital Signature Certificate) Is Required",
                  body: "For MCA ROC filings, income tax e-filing with ITD, court document submissions, and property registration — a Class 2 or Class 3 DSC from a licensed certifying authority is mandatory. An image-based signature is not sufficient for these specific use cases.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary shrink-0" />
                    {title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1">
                <AlertCircle className="h-4 w-4" />Legal Note:
              </strong>
              This information is provided for general guidance. For specific legal advice about your documents, consult a practising advocate or chartered accountant.
            </div>
          </section>

          {/* ── COMPARISON ── */}
          <section>
            <SectionLabel>Comparison</SectionLabel>
            <SectionHeading>Pixocraft vs Smallpdf, Adobe &amp; DocuSign</SectionHeading>
            <SectionSubtext>
              Here's how Pixocraft's free PDF signing tool stacks up against the most popular alternatives.
            </SectionSubtext>

            <div className="overflow-x-auto rounded-xl border mb-6">
              <table className="w-full text-sm min-w-[560px]">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Smallpdf</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Adobe Sign</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">DocuSign</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Free Forever",           "Yes",        "Limited",       "Paid plan",    "Limited free"],
                    ["No Login Required",      "Yes",        "No",            "No",           "No"],
                    ["No Upload to Server",    "Yes",        "No",            "No",           "No"],
                    ["Works Offline",          "Yes",        "No",            "No",           "No"],
                    ["No Watermark",           "Yes",        "Paid only",     "Paid only",    "Paid only"],
                    ["Mobile Friendly",        "Yes",        "Yes",           "Yes",          "Yes"],
                    ["Multi-page PDF",         "Yes",        "Yes",           "Yes",          "Yes"],
                    ["Freehand Draw Mode",     "Yes",        "Yes",           "Yes",          "Yes"],
                    ["50+ Signature Fonts",    "Yes",        "Limited",       "Limited",      "No"],
                    ["Zero Data Collection",   "Yes",        "No",            "No",           "No"],
                  ].map(([feat, pixo, small, adobe, docu]) => (
                    <tr key={feat} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-5 py-3 font-semibold text-primary">{pixo}</td>
                      <td className="px-5 py-3 text-muted-foreground">{small}</td>
                      <td className="px-5 py-3 text-muted-foreground">{adobe}</td>
                      <td className="px-5 py-3 text-muted-foreground">{docu}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard icon={<Lock className="h-4 w-4 text-primary" />}    title="True zero-server privacy"  body="Every competitor uploads your PDF to their servers. Pixocraft processes everything locally — zero data exposure." />
              <FeatureCard icon={<Star className="h-4 w-4 text-primary" />}    title="No watermark on output"    body="Free tiers of Smallpdf, DocuSign, and Adobe Sign add watermarks. Pixocraft's signed PDF is always clean." />
              <FeatureCard icon={<Zap className="h-4 w-4 text-primary" />}     title="Fastest workflow"          body="No account, no email verification, no approval workflow. Open the page, sign, download. Under 30 seconds." />
              <FeatureCard icon={<BadgeCheck className="h-4 w-4 text-primary" />} title="India & GST specific"   body="Built for Indian workflows — GST invoice signing, IT Act compliance, and DSC guidance all included." />
            </div>
          </section>

          {/* ── COMMON MISTAKES ── */}
          <section>
            <SectionLabel>Avoid These</SectionLabel>
            <SectionHeading>Common Mistakes When Signing a PDF</SectionHeading>
            <SectionSubtext>
              Small errors that undermine the professionalism of your signed documents.
            </SectionSubtext>

            <div className="space-y-3">
              {[
                { title: "Using a JPG signature image",              body: "JPG doesn't support transparency. Your signature gets a white box on any non-white PDF section. Always use PNG — this tool outputs transparent PNG automatically." },
                { title: "Placing signature outside the sign block", body: "Clicking outside the signature block area looks careless and can obscure important content. Position your signature precisely on or just below the signature line." },
                { title: "Wrong size — too large or too small",      body: "15–20% of page width looks professional. Too large dominates the page; too small looks like an afterthought. Use the size slider to fine-tune." },
                { title: "Blurry or pixelated signature",            body: "Low-resolution scanned photos look pixelated when embedded in PDFs. Draw or type your signature directly in this tool for a clean, high-resolution result." },
                { title: "Different signature on every document",    body: "Inconsistent signatures across documents undermine professional credibility. Create your ideal signature once and reuse it consistently." },
              ].map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center">
                    <AlertCircle className="h-3 w-3 text-destructive" />
                  </span>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── TRUST ── */}
          <section>
            <SectionLabel>Trust & Privacy</SectionLabel>
            <SectionHeading>Trusted PDF Signature Tool</SectionHeading>
            <SectionSubtext>
              Trusted by freelancers, businesses, and professionals for fast, private, and secure PDF signing.
            </SectionSubtext>

            <div className="rounded-xl border bg-primary/5 px-6 py-5 mb-5">
              <p className="text-foreground font-semibold leading-relaxed text-sm sm:text-base">
                No signup, no watermark, no server upload — your PDF is signed and processed entirely inside your browser.
                Nothing leaves your device. Ever.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard icon={<Shield className="h-4 w-4 text-primary" />}  title="No server-side processing"  body="PDF.js and pdf-lib run entirely in your browser. Your document is never transmitted to any server — not even temporarily." />
              <FeatureCard icon={<Lock className="h-4 w-4 text-primary" />}    title="No login, no account"        body="There is no user account system. You are completely anonymous. We have nothing to leak or breach." />
              <FeatureCard icon={<Zap className="h-4 w-4 text-primary" />}     title="Works offline"               body="After the page loads once, you can disconnect from the internet and the tool continues to work perfectly." />
              <FeatureCard icon={<Star className="h-4 w-4 text-primary" />}    title="No watermark, ever"          body="Your signed PDF is clean and unmarked. No Pixocraft branding added — the document belongs entirely to you." />
            </div>
          </section>

          {/* ── INTERNAL LINKS ── */}
          <section>
            <SectionLabel>Related Tools</SectionLabel>
            <SectionHeading>More Signature &amp; Document Tools</SectionHeading>
            <SectionSubtext>
              Also use our{" "}
              <Link href="/tools/signature-pad-tool" className="text-primary hover:underline underline-offset-2 font-medium">
                online signature generator
              </Link>{" "}
              to create reusable signatures,{" "}
              <Link href="/tools/email-signature-generator" className="text-primary hover:underline underline-offset-2 font-medium">
                email signature tool
              </Link>{" "}
              for Gmail and Outlook, or our{" "}
              <Link href="/tools/signature-for-gst-invoice" className="text-primary hover:underline underline-offset-2 font-medium">
                GST invoice signature tool
              </Link>{" "}
              for Indian businesses.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/add-signature-to-pdf",               title: "Add Signature to PDF",              desc: "Alternate PDF signing tool — direct upload-and-place signature workflow." },
                { href: "/tools/signature-pad-tool",                  title: "Signature Generator",               desc: "The full-featured tool — Draw, Type, Upload, AI with undo/redo and advanced options." },
                { href: "/tools/email-signature-generator",            title: "Email Signature Generator",         desc: "Create handwritten PNG signatures for Gmail and Outlook. No signup required." },
                { href: "/tools/signature-for-gst-invoice",            title: "GST Invoice Signature",             desc: "Add your signature to GST invoices for Tally, Zoho Books, and custom billing software." },
                { href: "/tools/digital-signature-generator",          title: "Digital Signature Generator",       desc: "India IT Act 2000 ready — for contracts, NDAs, and business documents." },
                { href: "/tools/background-remover",                   title: "Background Remover",                desc: "Remove any background from an uploaded signature image instantly." },
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
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t pt-4" data-testid={`faq-answer-${i}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── FINAL CTA ── */}
          <section className="rounded-xl border bg-primary/5 px-6 py-8 text-center">
            <FileCheck className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Sign Your PDF?</h2>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto text-sm">
              Create your signature, upload your PDF, click to place, download — done in under 30 seconds.
              No login. No watermark. No server upload. 100% free, forever.
            </p>
            <Button
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2"
              data-testid="button-final-cta"
            >
              <FileCheck className="h-4 w-4" />
              Sign PDF Free Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </section>

          {/* ── EEAT ── */}
          <section className="rounded-xl border bg-muted/30 px-6 py-5 text-sm text-muted-foreground space-y-1.5">
            <p><strong className="text-foreground">Author:</strong> Pixocraft Team</p>
            <p><strong className="text-foreground">Last Updated:</strong> {LAST_UPDATED}</p>
            <p>
              <strong className="text-foreground">Made in India</strong> — Built with privacy-first principles.
              Your PDF and signature data never leave your browser.
            </p>
            <p className="pt-1">
              Questions or feedback?{" "}
              <Link href="/contact" className="text-primary hover:underline underline-offset-2">Contact us</Link>
              {" "}or read our{" "}
              <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
