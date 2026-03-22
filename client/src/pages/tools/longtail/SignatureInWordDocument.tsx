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
  Star, XCircle, PenTool, ImageIcon, MousePointer,
  Layers, FileCheck, Briefcase, GraduationCap, Users,
  AlertCircle, Monitor,
} from "lucide-react";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-for-word";
const LAST_UPDATED = "March 2026";

const FAQS = [
  {
    question: "How do I insert a signature in a Word document?",
    answer:
      "Create your signature as a transparent PNG using Pixocraft. In Microsoft Word, go to Insert → Pictures → This Device, select your PNG, and click Insert. Drag it to your signature block, then right-click → Wrap Text → In Front of Text so it floats freely over the document.",
  },
  {
    question: "Can I draw a signature directly in Word?",
    answer:
      "Yes — Word has a Draw tab (Home → Draw) with a Pen tool. However, drawing with a mouse often produces inconsistent, uneven strokes. For a clean, professional result, draw your signature on Pixocraft's dedicated canvas, download the PNG, and insert it into Word as an image.",
  },
  {
    question: "What is the best format for a signature in Word?",
    answer:
      "PNG with a transparent background is the best format. It overlays cleanly on any Word background — white, coloured, or patterned letterheads — without a white box around the signature strokes. JPEG forces a white rectangle around the signature, which looks unprofessional on any non-white area.",
  },
  {
    question: "Is a digital signature required in Word documents?",
    answer:
      "For most everyday documents — letters, applications, NDAs, contracts — a PNG image signature is sufficient and legally valid. A cryptographic Digital Signature Certificate (DSC) is only required for regulated filings, government portals, or documents that specifically mandate PKI-based authentication.",
  },
  {
    question: "How do I make a transparent signature for Word?",
    answer:
      "Use Pixocraft's signature tool on this page. Draw or type your signature on the canvas, then click Download → PNG. The downloaded file has a fully transparent background — no white box, ready to insert into any Word document.",
  },
  {
    question: "How big should my signature be in a Word document?",
    answer:
      "For standard A4 Word documents, a width of 3–5 cm works well. After inserting the PNG, right-click the image, choose 'Size and Position', set the width to 3–5 cm, and check 'Lock aspect ratio'. This keeps the signature readable without overwhelming the page.",
  },
  {
    question: "Does the PNG method work in all Word versions?",
    answer:
      "Yes. Insert → Pictures works identically in Word 2013, 2016, 2019, 2021, Word 365 on Windows and Mac, and the Word mobile app on iOS and Android. The transparent PNG renders correctly in all versions.",
  },
  {
    question: "How do I add a handwritten signature in Word?",
    answer:
      "Draw your actual handwritten signature on Pixocraft using a mouse, stylus, or your finger on a touchscreen. Download the transparent PNG. Insert it into Word via Insert → Pictures. This gives you a genuine handwritten appearance without scanning or printing.",
  },
  {
    question: "Can I sign a Word document without printing it?",
    answer:
      "Yes. Download your signature as a PNG from Pixocraft, insert it into your Word document digitally, and save. You have a fully signed document without printing, signing with a pen, or scanning. Email or share the file directly.",
  },
  {
    question: "Is an image-based signature in Word legally valid in India?",
    answer:
      "Yes. Under the IT Act 2000 (Section 3A), a PNG image signature inserted into a Word document qualifies as a Simple Electronic Signature — legally valid for commercial contracts, employment letters, NDAs, and most business documents under the Indian Contract Act 1872.",
  },
  {
    question: "How do I stop the signature image from moving in Word?",
    answer:
      "After inserting, right-click the image → Wrap Text → In Front of Text. Then drag it precisely to your signature block. To lock its position, right-click → Size and Position → Position tab → check 'Lock anchor'. The image will stay fixed even if you edit surrounding text.",
  },
  {
    question: "Can I reuse the same signature PNG in multiple Word files?",
    answer:
      "Yes — and this is the recommended approach. Save your signature PNG in a permanent folder. Each time you need to sign a Word document, simply Insert → Pictures and select the same file. No re-drawing, no rescanning.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Create your signature on Pixocraft",
    text: "Use the tool above. Draw with your mouse or touchscreen in the Draw tab, or type your name and choose a cursive style in the Type tab.",
  },
  {
    name: "Adjust thickness and colour",
    text: "Use the thickness slider to match your natural pen weight. Black is standard for formal documents; adjust if your letterhead uses colour.",
  },
  {
    name: "Preview and confirm",
    text: "Review the live preview to ensure the signature is clear, proportionate, and matches your handwriting style before downloading.",
  },
  {
    name: "Download as transparent PNG",
    text: "Click Download → PNG. You receive a high-resolution transparent PNG — no watermark, no white background, no login required.",
  },
  {
    name: "Open your Word document",
    text: "Launch Microsoft Word and open the document you want to sign. Navigate to the page and location where the signature is needed.",
  },
  {
    name: "Insert the PNG via Insert → Pictures",
    text: "Click Insert in the Word ribbon → Pictures → This Device (Windows) or Picture from File (Mac). Select your downloaded PNG and click Insert.",
  },
  {
    name: "Resize, position, and set wrap text",
    text: "Drag the image to your signature block. Right-click → Wrap Text → In Front of Text. Resize using corner handles while holding Shift to maintain proportions.",
  },
  {
    name: "Save your signed document",
    text: "Press Ctrl+S (Windows) or Cmd+S (Mac) to save. Your Word document is now signed and ready to share, print, or email.",
  },
];

const METHODS = [
  {
    icon: <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Method A",
    title: "Insert Image Signature (Recommended)",
    desc: "Create a transparent PNG on Pixocraft and insert it into Word via Insert → Pictures. This is the fastest, cleanest, and most professional method — works on every Word version, every OS.",
    pros: ["Works on all Word versions", "Transparent background", "Reusable across documents", "Professional look"],
    best: true,
  },
  {
    icon: <PenTool className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Method B",
    title: "Draw in Word (Draw Tab)",
    desc: "Word's built-in Draw tab lets you sketch with a mouse or stylus directly on the document. Quick for casual use, but mouse drawings often look irregular. Best combined with a touchscreen or stylus.",
    pros: ["No external tool needed", "Works with stylus", "Embedded in document", "Quick for touch devices"],
    best: false,
  },
  {
    icon: <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Method C",
    title: "Digital Signature (Advanced)",
    desc: "Word supports cryptographic digital signatures via a trusted certificate authority. This adds an invisible PKI-based signature for high-security filings. Requires a paid DSC — not needed for most documents.",
    pros: ["Cryptographic proof", "Tamper-evident", "Required for regulated filings", "Legally binding"],
    best: false,
  },
];

const USE_CASES = [
  {
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    title: "Job Applications & Offer Letters",
    desc: "Sign acceptance letters, offer letters, and employment contracts in Word instantly. No printing or scanning — email the signed document directly.",
  },
  {
    icon: <FileCheck className="h-5 w-5 text-primary" />,
    title: "Business Contracts & NDAs",
    desc: "Add your signature to client contracts, vendor agreements, and NDAs. Your PNG signature is legally valid for most commercial agreements.",
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
    title: "College Assignments & Forms",
    desc: "Many institutions require a signed declaration on submission documents. Insert your signature PNG into the Word submission form before uploading.",
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Official Letters & Applications",
    desc: "Government applications, leave letters, bank requests, and official correspondence all need a signature. Use the same PNG across all documents.",
  },
  {
    icon: <Monitor className="h-5 w-5 text-primary" />,
    title: "Remote Work & Digital Workflows",
    desc: "Remote teams send Word documents for approval and signature. Your PNG enables fully digital sign-off without any physical paperwork.",
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Letterheads & Templates",
    desc: "Embed your signature in a Word template once. Every document generated from that template will carry your pre-placed signature automatically.",
  },
];

const COMMON_MISTAKES = [
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Using JPEG instead of PNG",
    desc: "JPEG creates a white box around your signature strokes. Always use transparent PNG — it blends into any Word document background without any border.",
  },
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Setting wrap text to 'In Line with Text'",
    desc: "The default 'In Line with Text' wrapping moves the signature like a letter character and breaks formatting. Always change to 'In Front of Text' for precise positioning.",
  },
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Making the signature too large",
    desc: "An oversized signature dominates the page. Keep width to 3–5 cm for A4 documents. Use 'Size and Position' (right-click) for precise control.",
  },
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Not saving the PNG for reuse",
    desc: "Re-creating your signature every time is unnecessary. Save the PNG permanently and reuse it across all future Word documents instantly.",
  },
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Stretching the signature incorrectly",
    desc: "Dragging only one side of the image distorts it. Always resize from a corner handle while holding Shift, or use 'Lock aspect ratio' in Size and Position.",
  },
];

const COMPARISON_ROWS = [
  { feature: "Cost",              pixocraft: "Free",             others: "Paid / Freemium" },
  { feature: "Login required",   pixocraft: "No",               others: "Yes" },
  { feature: "Data upload",      pixocraft: "None",             others: "Server upload" },
  { feature: "Works offline",    pixocraft: "Yes",              others: "Mostly no" },
  { feature: "Transparent PNG",  pixocraft: "Yes",              others: "Often watermarked" },
  { feature: "Mobile support",   pixocraft: "Full",             others: "Partial" },
  { feature: "Time to sign",     pixocraft: "Under 60 seconds", others: "3–10 minutes" },
];

const INTERNAL_LINKS = [
  { href: "/tools/signature-pad-tool",              label: "Signature Generator" },
  { href: "/tools/signature-for-pdf",                label: "Signature for PDF" },
  { href: "/tools/handwritten-signature-generator",  label: "Handwritten Signature Generator" },
  { href: "/tools/signature-font-generator",         label: "Signature Font Generator" },
  { href: "/tools/digital-signature-generator",      label: "Digital Signature Generator" },
  { href: "/tools/how-to-add-signature-in-word",     label: "How to Add Signature in Word (Guide)" },
];

export default function SignatureInWordDocument() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature in Word Document – Add & Insert Signature Free",
    description:
      "Learn how to add signature in Word document easily. Create, download, and insert signature in Word using PNG. Free, no login tool.",
    canonicalUrl: CANONICAL,
    ogType: "website",
    ogImage: "https://tools.pixocraft.in/images/word-signature-tool.png",
    keywords:
      "signature in word document, how to add signature in word, insert signature in word, sign word document, add handwritten signature in word",
  });

  const schemas = [
    generateFAQSchema(FAQS),
    generateHowToSchema({
      name: "How to Add Signature in Word Document",
      description:
        "Create a transparent PNG signature with Pixocraft and insert it into Microsoft Word in under 60 seconds — free, no login.",
      steps: HOWTO_STEPS,
    }),
    generateSoftwareApplicationSchema({
      name: "Signature in Word Document Tool",
      description:
        "Free online tool to create and insert signature in Word document. Download transparent PNG, no login required.",
      url: CANONICAL,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { price: "0", priceCurrency: "INR" },
    }),
    generateBreadcrumbSchema([
      { name: "Home",                         url: "https://tools.pixocraft.in" },
      { name: "Tools",                         url: "https://tools.pixocraft.in/tools" },
      { name: "Signature Tools",               url: "https://tools.pixocraft.in/tools/signature-tools" },
      { name: "Signature in Word Document",    url: CANONICAL },
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
            { label: "Home",                       url: "/" },
            { label: "Tools",                      url: "/tools" },
            { label: "Signature Tools",            url: "/tools/signature-tools" },
            { label: "Signature Generator", url: "/tools/signature-pad-tool" },
            { label: "Signature in Word Document" },
          ]}
        />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Signature in Word Document –{" "}
              <span className="text-primary">Add & Insert Free</span>
            </h1>
          </div>
          <p className="hidden sm:block text-sm sm:text-base text-muted-foreground leading-relaxed">
            Create and insert your signature into <strong>Microsoft Word</strong> in under 60 seconds.
            Draw or type your signature, download a <strong>transparent PNG</strong>, and place it anywhere
            in your Word document — letters, contracts, forms, or applications. No login, no upload, no printing.
          </p>
          <p className="text-base font-semibold text-foreground">
            <strong>Sign any Word document digitally in under 60 seconds — no login, no upload, fully private.</strong>
          </p>
          <div className="hidden sm:flex flex-wrap gap-2">
            {[
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Login" },
              { icon: <Star className="h-3.5 w-3.5" />,       label: "Transparent PNG" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "Word Compatible" },
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
        <div className="hidden sm:block rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-4 sm:px-6 sm:py-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quick Answer</p>
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            How to add a signature in a Word document?
          </h2>
          <p className="text-sm text-foreground leading-relaxed">
            Create your signature as a transparent PNG on Pixocraft (draw or type). In Microsoft Word, click <strong>Insert → Pictures → This Device</strong>, select your PNG, and insert it. Drag to the signature field, right-click → <strong>Wrap Text → In Front of Text</strong>, then resize to 3–5 cm wide. Save the document — done.
          </p>
          <div className="hidden sm:grid grid-cols-4 gap-3 pt-1">
            {[
              { label: "Best format",    value: "Transparent PNG" },
              { label: "Ideal width",    value: "3–5 cm in Word" },
              { label: "Word versions",  value: "All (2013–365)" },
              { label: "Cost",           value: "Free Forever" },
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
          caption="Draw or type your signature · Download transparent PNG · Word-ready format · No watermark"
        />

        {/* ── WHAT IS SIGNATURE IN WORD ─────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">What is a Signature in Word Document?</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <p className="text-foreground leading-relaxed">
              Microsoft Word does not generate signatures on its own. It is a word processor —
              to add a signature, you need to either <strong>insert a signature image</strong>, <strong>draw one</strong> using
              Word's pen tools, or apply a <strong>cryptographic digital signature</strong> for high-security use cases.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              A signature in a Word document visually represents your approval or authorship. It appears in:
            </p>
            <ul className="space-y-2">
              {[
                "Business letters and official correspondence",
                "Employment contracts, NDAs, and client agreements",
                "Job applications and acceptance letters",
                "College submission forms and academic declarations",
                "Government and bank application forms saved in Word",
                "Letterhead templates used repeatedly across the organisation",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted-foreground items-start">
                  <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 3 METHODS ─────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">3 Ways to Add Signature in Word</h2>
          <div className="space-y-3">
            {METHODS.map(({ icon, label, title, desc, pros, best }) => (
              <div
                key={title}
                className={`rounded-xl border bg-card p-5 space-y-3 ${best ? "border-primary/40 ring-1 ring-primary/20" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
                      {best && (
                        <span className="text-[10px] font-bold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Recommended
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-foreground mt-0.5">{title}</h3>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                <div className="hidden sm:flex flex-wrap gap-2">
                  {pros.map((pro) => (
                    <span key={pro} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 border rounded-full px-2.5 py-1">
                      <Check className="h-3 w-3 text-primary" />{pro}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW TO CREATE SIGNATURE ───────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">How to Create Signature for Word (Step by Step)</h2>
          <p className="text-muted-foreground">Complete process — from creating your signature to inserting it in Word. Takes under 60 seconds.</p>
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

        {/* ── HOW TO INSERT IN WORD ─────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">How to Insert Signature in Word – Detailed Guide</h2>
          <p className="text-muted-foreground leading-relaxed">
            Once you have your transparent PNG from Pixocraft, follow these Word steps for a perfectly placed, professional signature.
          </p>
          <div className="space-y-3">
            {[
              {
                step: "1",
                heading: "Open your Word document",
                detail: "Launch Microsoft Word and open the .docx file you want to sign. Scroll to the page and location where the signature is needed — usually above 'Authorised Signatory' or your name.",
              },
              {
                step: "2",
                heading: "Go to Insert → Pictures",
                detail: "In the Word ribbon, click the Insert tab. Select Pictures → This Device (Windows) or Picture from File (Mac). A file picker dialog will appear.",
              },
              {
                step: "3",
                heading: "Select your PNG and click Insert",
                detail: "Navigate to your downloaded Pixocraft PNG file. Select it and click Insert. The image appears on the document — likely in a default position that needs adjustment.",
              },
              {
                step: "4",
                heading: "Set Wrap Text to 'In Front of Text'",
                detail: "Right-click the inserted image → Wrap Text → In Front of Text. This allows you to drag the signature freely over the document without disturbing the surrounding text layout.",
              },
              {
                step: "5",
                heading: "Resize to 3–5 cm wide",
                detail: "Drag a corner handle (hold Shift to maintain proportions) to scale the signature to an appropriate size — approximately 3–5 cm wide for A4 documents. Alternatively, right-click → Size and Position for precise values.",
              },
              {
                step: "6",
                heading: "Drag to signature position and save",
                detail: "Move the image to your signature block. Press Ctrl+S (Windows) or Cmd+S (Mac) to save. Your Word document is now signed and ready to share or print.",
              },
            ].map(({ step, heading, detail }) => (
              <div key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                <div>
                  <p className="font-semibold text-foreground">{heading}</p>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BEST FORMAT ───────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Best Format for Signature in Word</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <p className="text-foreground font-medium">
              Always use <strong>PNG with transparent background</strong> for Word signatures. Here is why each attribute matters:
            </p>
            <ul className="space-y-3">
              {[
                {
                  label: "PNG (not JPEG)",
                  desc: "PNG supports transparency. JPEG does not — it forces a white rectangle around your signature that is visible on any non-white area of the document.",
                },
                {
                  label: "Transparent background",
                  desc: "Transparency ensures the signature overlays cleanly on coloured letterheads, table cells, or any non-white area without a box or halo effect.",
                },
                {
                  label: "High resolution (Pixocraft exports 4× scale)",
                  desc: "A high-resolution PNG remains crisp when printed on A4 or A3. Low-res images blur on print even if they look fine on screen.",
                },
                {
                  label: "File size under 200 KB",
                  desc: "Word documents with embedded images grow in file size. Keeping the PNG under 200 KB prevents bloating the .docx file, which matters for email attachments.",
                },
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: "Recommended format",  value: "PNG (Transparent)" },
              { label: "Ideal width in Word", value: "3–5 cm" },
              { label: "Max file size",        value: "Under 200 KB" },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-lg border bg-card p-4 text-center">
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">{label}</p>
                <p className="font-semibold text-foreground text-sm mt-1">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── USE CASES ────────────────────────────────────────────────────── */}
        <section className="space-y-5">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Who Uses Signature in Word Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {USE_CASES.map(({ icon, title, desc }) => (
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

        {/* ── SAVE & REUSE ─────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Save & Reuse Your Signature</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <p className="text-foreground font-medium">
              Download your PNG once and keep it in a permanent folder. Reuse it across:
            </p>
            <ul className="space-y-2">
              {[
                "Every Word document you need to sign in future",
                "PDF documents via Insert Image or PDF editors",
                "Google Docs using Insert → Image",
                "Email footers and HTML letterheads",
                "PowerPoint presentations and Excel forms",
                "Scanned or printed submissions requiring image signature",
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

        {/* ── DIGITAL VS IMAGE ─────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Digital Signature vs Image Signature in Word</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-4">
            <div className="flex gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-foreground leading-relaxed">
                <strong>Important:</strong> Pixocraft creates an <strong>image-based signature</strong> — this is different from a cryptographic Digital Signature Certificate (DSC). Both are useful; choose based on your requirement.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Image Signature (PNG)",
                  items: [
                    "Accepted for letters, contracts, and applications",
                    "Visible, handwritten appearance in the document",
                    "No authority or certificate required",
                    "Free and instant — download in seconds",
                    "Valid under IT Act 2000 for most documents",
                  ],
                  highlight: true,
                },
                {
                  title: "Digital Signature (DSC / PKI)",
                  items: [
                    "Required for regulated e-filings and high-security submissions",
                    "Cryptographically signed — invisible, tamper-evident",
                    "Requires a certificate from a licensed CA",
                    "Costs ₹1,500–₹3,000 per year",
                    "Mandatory for GST portal, MCA, and ITR submissions",
                  ],
                  highlight: false,
                },
              ].map(({ title, items, highlight }) => (
                <div key={title} className="rounded-lg border bg-background p-4 space-y-2">
                  <p className="font-semibold text-foreground text-sm">{title}</p>
                  {items.map((item) => (
                    <div key={item} className="flex gap-2 items-start">
                      <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${highlight ? "text-green-600" : "text-primary"}`} />
                      <p className="text-xs text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COMMON MISTAKES ──────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Common Mistakes to Avoid</h2>
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
              { label: "Home",                       url: "/" },
              { label: "Tools",                      url: "/tools" },
              { label: "Signature Tools",            url: "/tools/signature-tools" },
              { label: "Signature in Word Document" },
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
