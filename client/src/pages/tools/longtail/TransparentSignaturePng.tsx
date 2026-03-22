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
  ImageIcon, Smartphone, Star, PenTool, Layers, Eye,
  Receipt, Mail, Upload, FileCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/transparent-signature-png";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-generator";

const FAQS = [
  {
    question: "How do I make my signature transparent PNG?",
    answer:
      "Use the Upload tab in the tool above — photograph your signature on white paper or upload an existing signature image. The tool automatically removes the white background and delivers a clean transparent PNG. Alternatively, use the Draw tab to create your signature directly on a transparent canvas — the downloaded PNG is transparent by default without any background removal step.",
  },
  {
    question: "Is a transparent signature PNG different from a regular PNG?",
    answer:
      "Yes. A regular PNG may have a white or coloured background. A transparent PNG uses the alpha channel to make the background invisible — so when you place it on any document, invoice, or email, only the signature strokes are visible, not a white rectangle surrounding them. Transparent PNGs are the professional standard for digital signatures.",
  },
  {
    question: "Is this transparent PNG signature tool completely free?",
    answer:
      "Yes — 100% free forever. No login, no subscription, no watermark on the downloaded transparent PNG. Create and download unlimited transparent signatures at no cost.",
  },
  {
    question: "What resolution is the transparent signature PNG?",
    answer:
      "Pixocraft exports signatures at 3200×1040 px — four times display resolution — giving you a crisp, sharp transparent PNG at print quality. This resolution is suitable for any document size, from small email footers to A4 legal documents and letterheads.",
  },
  {
    question: "Can I use a transparent signature PNG on a GST invoice?",
    answer:
      "Yes — and transparent PNG is the recommended format for GST invoices. Because most invoice templates have coloured headers, light backgrounds, or printed patterns, a transparent PNG signature overlays cleanly without a white box appearing around it. Download your transparent PNG from Pixocraft and insert it into Tally, Zoho Books, ClearTax, or any PDF invoice.",
  },
  {
    question: "Why does my signature have a white background when I use JPG?",
    answer:
      "JPG (JPEG) does not support transparency — it always has a background colour, usually white. When you place a JPG signature on any document with a non-white background, the white rectangle is clearly visible and looks unprofessional. Always use PNG format for signature images — it is the only common image format that supports full transparency.",
  },
  {
    question: "Can I remove the background from an existing signature image?",
    answer:
      "Yes. Use the Upload tab in the tool — click the upload area, select your existing signature JPG or PNG, and the tool's client-side algorithm automatically detects the signature strokes and removes the background. The result is a clean transparent PNG ready for use in any document.",
  },
  {
    question: "Does this tool work on mobile phones?",
    answer:
      "Yes, fully. The Draw tab supports touch input for finger drawing. The Upload tab lets you photograph your physical signature with your phone camera and upload it directly. All processing, background removal, and PNG download happen locally in your browser — works on Chrome, Safari, and Firefox for iOS and Android.",
  },
  {
    question: "Is my signature data private and secure?",
    answer:
      "Completely private. This tool runs 100% inside your browser using the HTML5 Canvas API. No drawing strokes, typed text, or uploaded images are ever sent to any server, logged, or stored. Your signature data never leaves your device.",
  },
  {
    question: "What is the difference between transparent PNG and JPG for email signatures?",
    answer:
      "A transparent PNG email signature overlays cleanly on any email background — white, grey, or branded colour — without a visible box. A JPG signature will always show a white rectangle around the signature strokes. For Gmail, Outlook, and Apple Mail, transparent PNG is the correct format. JPG should only be used when the email client explicitly does not support PNG transparency (very rare).",
  },
  {
    question: "Is a transparent PNG signature legally valid in India?",
    answer:
      "Yes. A transparent PNG signature embedded in a PDF or document constitutes a Simple Electronic Signature (SES) under the Information Technology Act 2000. The transparency of the image background does not affect its legal status. It is legally valid for commercial contracts, GST invoices, NDAs, employment letters, and most business documents.",
  },
  {
    question: "How do I test if my signature PNG is actually transparent?",
    answer:
      "After downloading from Pixocraft, open the PNG in any image viewer that supports transparency (Windows Photos, macOS Preview, or your phone gallery). A transparent background typically shows as a grey-and-white checkerboard pattern in most viewers — if you see this pattern behind your signature strokes, the background is successfully transparent.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Draw or upload your signature", description: "Use the Draw tab to create your signature with mouse or finger on a transparent canvas, or the Upload tab to import an existing signature image (JPG or PNG)." },
  { step: 2, title: "Background removed automatically", description: "For the Draw tab, the canvas is transparent by default — no removal needed. For uploaded images, the tool's algorithm detects signature strokes and removes the white or coloured background automatically." },
  { step: 3, title: "Preview your transparent PNG", description: "Review your signature against the canvas. The absence of a white background is confirmed by the canvas showing only your strokes. Try drawing on a darker tab background to verify transparency." },
  { step: 4, title: "Download the transparent PNG", description: "Click 'Download Signature' to save the transparent PNG to your device at 3200×1040 px resolution. Place it on any GST invoice, PDF, email signature, or document immediately." },
];

const PNG_VS_JPG = [
  { feature: "Transparency support",   png: "Full alpha channel",           jpg: "None — always has background" },
  { feature: "Background on documents", png: "Invisible — clean overlay",  jpg: "Visible white rectangle" },
  { feature: "Quality",               png: "Lossless — pixel-perfect",      jpg: "Lossy compression" },
  { feature: "File size",             png: "Slightly larger",               jpg: "Smaller" },
  { feature: "Use in GST invoices",   png: "Recommended",                   jpg: "Not recommended" },
  { feature: "Use in emails",         png: "Recommended",                   jpg: "Acceptable (white bg only)" },
  { feature: "Overlay on any colour", png: "Yes — works on any background", jpg: "No — white box appears" },
  { feature: "Professional standard", png: "Yes",                           jpg: "No" },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,   title: "GST Invoices",          desc: "Insert your transparent PNG signature directly over coloured or patterned GST invoice templates in Tally, Zoho, or ClearTax — no white box, no background clash." },
  { icon: <FileText className="h-5 w-5 text-primary" />,  title: "PDF Documents",         desc: "Add your transparent signature to any PDF contract, NDA, or agreement. The signature overlays cleanly on any page background — light, dark, or textured." },
  { icon: <Mail className="h-5 w-5 text-primary" />,      title: "Email Signatures",      desc: "A transparent PNG in your Gmail or Outlook signature settings looks professional on any device regardless of email background or display mode." },
  { icon: <FileCheck className="h-5 w-5 text-primary" />, title: "Contracts & Agreements", desc: "Legal documents and contracts look authoritative and clean when signed with a transparent PNG — no amateur white-box signature images." },
  { icon: <ImageIcon className="h-5 w-5 text-primary" />, title: "Letterheads & Templates", desc: "Branded letterheads, proposal templates, and certificates often have coloured or textured backgrounds. Only a transparent PNG signature works cleanly on these." },
  { icon: <Star className="h-5 w-5 text-primary" />,      title: "Artwork & Watermarks",   desc: "Photographers, designers, and creatives use transparent signature PNGs as watermarks on their work — the signature overlays without a background block." },
];

const MISTAKES = [
  { title: "Downloading as JPG instead of PNG", body: "JPG has no transparency support. A JPG signature will always carry a white background rectangle. When placed on any non-white surface — a coloured invoice, a PDF with a background, or a branded letterhead — the white box is impossible to miss and immediately looks unprofessional." },
  { title: "Using low-resolution source images", body: "Uploading a blurry phone photo of a signature gives a blurry transparent PNG output. Photograph your signature on white paper in bright, even lighting, holding the camera directly above. Pixocraft then exports the result at 3200 px regardless — starting with a clear source image ensures the best quality." },
  { title: "Not testing the overlay before use", body: "After downloading your transparent PNG, test it by placing it on a coloured background before inserting it into real documents. Open your invoice template or email client settings and verify the overlay looks clean — check for halos, grey edges, or semi-transparent artefacts." },
  { title: "Incorrect size for the document", body: "A signature image that is too large overwhelms the document; too small and it looks like an afterthought. Standard practice for GST invoices is a signature 3–5 cm wide. Most PDF and invoice editors let you resize the PNG after insertion — start at full resolution and scale down." },
  { title: "Saving the transparent PNG as JPG after downloading", body: "If you open a transparent PNG and re-save it as JPG using Windows Photos, macOS Preview, or WhatsApp, the transparency is permanently lost and replaced with a white background. Always share and store your signature in PNG format — never convert it to JPG." },
];

const PRO_TIPS = [
  { title: "Always download as PNG — never JPG", body: "This is the single most important rule for signature images used in professional documents. PNG preserves the transparent alpha channel. JPG destroys it permanently. Every professional document workflow uses PNG for signature overlays." },
  { title: "Test your transparent PNG on a dark background", body: "Open your downloaded PNG in any image viewer and temporarily place it against a dark grey or coloured rectangle. This quickly reveals any semi-transparent edges, halos, or remaining background artefacts that would be invisible on white but obvious on coloured invoices." },
  { title: "Keep your original high-resolution PNG", body: "Store your 3200 px transparent PNG permanently in a secure folder. When inserting into documents, scale down within the application — never re-export from a scaled-down version. You can always resize down from the original but cannot upscale without quality loss." },
  { title: "Photograph on white paper in good light", body: "For the Upload tab, the quality of your transparent PNG depends on the source image. Lay your signature on bright white paper, photograph directly above in natural light, and avoid shadows across the signature strokes. A clean source image produces a clean transparent result." },
  { title: "Use the Draw tab for the cleanest transparency", body: "The Draw tab creates your signature directly on a transparent HTML5 Canvas — there is no background to remove because there was never a background. For the most consistent transparent PNG with no edge artefacts, drawing directly is the most reliable method." },
];

export default function TransparentSignaturePng() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Transparent Signature PNG Free – Remove Background Instantly | Pixocraft",
    description:
      "Create transparent signature PNG online free. Remove background and download high-quality PNG instantly. No signup required, 100% private, perfect for GST, PDFs and email.",
    keywords:
      "transparent signature png, free transparent signature png, transparent png signature, png signature transparent background, signature png download, remove background signature, transparent signature for pdf, signature without background",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Transparent Signature PNG – Pixocraft",
    description:
      "Create or upload a signature and download it as a transparent PNG — no white background, print-resolution, instantly. Free, no login, 100% private browser-based tool.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                      url: "https://tools.pixocraft.in/" },
    { name: "Tools",                     url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Transparent Signature PNG", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Transparent Signature PNG Free – Remove Background Instantly | Pixocraft",
    description:
      "Create transparent signature PNG online free. Remove background and download high-quality PNG instantly. No signup required, 100% private, perfect for GST, PDFs and email.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Transparent Signature PNG Free",
    description:
      "Use Pixocraft's free tool to draw or upload a signature and download it as a transparent PNG with the background removed — in under 30 seconds.",
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
          { label: "Transparent Signature PNG" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Transparent Signature PNG Free – Remove Background &amp; Download Instantly
              </h1>
              <p className="text-sm text-muted-foreground">Auto Background Removal · No Signup · High-Resolution PNG · 100% Private</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Remove the white background from your signature and get a clean <strong>transparent PNG</strong> in seconds.
            Perfect for <strong>GST invoices, PDFs, and email signatures</strong> — draw, upload, or type your signature
            and download a print-resolution transparent PNG instantly. No Photoshop. No signup. 100% private.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Auto Background Removal in 2 Seconds" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup Required" },
              { icon: <ImageIcon className="h-3.5 w-3.5" />,   label: "High-Resolution PNG (3200px+)" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <Smartphone className="h-3.5 w-3.5" />,  label: "Works on Mobile & Desktop" },
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
              { icon: <Zap className="h-3.5 w-3.5 text-primary" />,    label: "No Photoshop needed" },
              { icon: <Check className="h-3.5 w-3.5 text-primary" />,  label: "Instant clean result" },
              { icon: <Receipt className="h-3.5 w-3.5 text-primary" />, label: "Used for GST & PDFs daily" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                {icon}{label}
              </div>
            ))}
          </div>

          {/* Action flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {[
              { n: 1, label: "Upload or Draw" },
              { n: 2, label: "Auto Remove Background" },
              { n: 3, label: "Preview" },
              { n: 4, label: "Download PNG" },
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
            Draw or upload your signature · Background removed automatically · Transparent PNG download
          </p>
        </div>

        {/* ── QUICK USE BLOCK ──────────────────────────────────────────────── */}
        <div className="rounded-xl border bg-primary/5 px-6 py-5 mb-12">
          <p className="font-semibold text-foreground mb-3">Use your transparent PNG signature for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "GST invoices and tax documents",
              "PDF contracts and agreements",
              "Email signatures in Gmail & Outlook",
              "Branded letterheads and templates",
              "Legal documents and NDAs",
              "Artwork watermarks and personal branding",
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

          {/* What is Transparent Signature PNG */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What Is a Transparent Signature PNG?</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                A <strong>transparent signature PNG</strong> is a digital signature image with no background — only the
                signature strokes are visible, while the area around them is fully transparent. When placed on any document,
                invoice, or email, the signature appears to float naturally on the surface without a white or coloured box
                surrounding it.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The key technical element is the <strong>alpha channel</strong> — an additional data layer in PNG images that
              stores opacity information for every pixel. Pixels inside the signature strokes have full opacity (visible).
              Pixels in the background have zero opacity (completely transparent). This is fundamentally impossible in JPG
              format, which is why PNG is the professional standard for all signature images used in documents.
            </p>
            <p className="text-muted-foreground mb-4">
              A <strong>transparent PNG signature</strong> is essential for professional use because real-world documents
              are rarely plain white. GST invoice templates often have coloured headers and shaded table rows. Email clients
              display in light or dark mode. PDF letterheads have backgrounds, watermarks, and branded colours. A JPG
              signature on any of these surfaces shows an ugly white rectangle — immediately marking it as amateurish and
              unprofessional.
            </p>
            <p className="text-muted-foreground mb-4">
              Pixocraft's tool creates transparent signature PNGs through two paths: the Draw tab creates signatures directly
              on a transparent HTML5 Canvas — there is no background from the start. The Upload tab takes an existing
              signature image (even a JPG with white background) and uses a client-side algorithm to detect the signature
              strokes and remove the surrounding background, producing a clean transparent PNG.
            </p>
            <p className="text-muted-foreground">
              The output is a 3200×1040 px transparent PNG — print-resolution, watermark-free, and immediately ready for
              insertion into any document, invoice, or email template. No Photoshop, no background eraser tool, no manual
              selection — all automated, all instant, all free.
            </p>
          </section>

          {/* Why transparent PNG matters */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Transparent PNG Is Essential for Professional Signatures</h2>
            <p className="text-muted-foreground mb-5">
              The white background problem is more serious than it appears. Here is why using a non-transparent signature
              image creates real problems in professional contexts:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "White box on coloured invoices",
                  body: "GST invoice templates in Tally, Zoho Books, and ClearTax use coloured header bands, shaded rows, and branded backgrounds. A JPG signature placed on these templates creates a clearly visible white rectangle — making the invoice look like a rushed, unprofessional job rather than an official business document.",
                },
                {
                  title: "Mismatch on printed documents",
                  body: "When coloured or background-printed invoices are printed, a white-background JPG signature creates an obvious box even on off-white or cream paper stocks. A transparent PNG signature prints only the ink strokes — matching perfectly with any paper or print background.",
                },
                {
                  title: "Email dark mode problems",
                  body: "Email clients including Gmail, Outlook, and Apple Mail now default to dark mode for many users. A JPG email signature with a white background becomes blindingly bright in dark mode — a jarring visual mismatch. A transparent PNG adapts naturally to both light and dark backgrounds.",
                },
                {
                  title: "Unprofessional audit impression",
                  body: "When CA firms, GST auditors, or business partners scrutinise signed documents, a white-box signature signals that basic digital document practices were not followed. A transparent PNG signature, by contrast, looks identical to a wet ink signature overlaid on the document.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-destructive" />{title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How to Create */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a Transparent Signature PNG — Step by Step</h2>
            <p className="text-muted-foreground mb-5">From creation to transparent PNG download in under 30 seconds:</p>
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
                data-testid="button-make-transparent-png"
              >
                <Layers className="h-4 w-4" />Make Transparent PNG<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Features of Pixocraft's Transparent Signature PNG Tool</h2>
            <p className="text-muted-foreground mb-5">Everything built specifically for creating professional transparent signature images:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Layers className="h-5 w-5 text-primary" />,    title: "Transparent canvas by default",      desc: "The Draw tab creates signatures on a transparent HTML5 Canvas. No background removal step needed — the PNG is transparent from the first stroke." },
                { icon: <Upload className="h-5 w-5 text-primary" />,    title: "Upload & auto remove background",    desc: "Upload any existing signature JPG or PNG. The tool's client-side algorithm detects signature strokes and removes the white or coloured background automatically." },
                { icon: <ImageIcon className="h-5 w-5 text-primary" />, title: "3200×1040 px resolution",            desc: "Print-resolution export — four times display resolution — ensuring crisp, sharp strokes at any document size from email footer to A3 poster." },
                { icon: <Eye className="h-5 w-5 text-primary" />,       title: "Preview before download",           desc: "Review your transparent signature against the canvas before downloading. The transparent area shows no background, confirming clean removal." },
                { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "Mobile-optimised upload and draw", desc: "Photograph your signature with your phone camera and upload directly. Or draw with your finger on the touch canvas for instant transparent creation." },
                { icon: <Zap className="h-5 w-5 text-primary" />,       title: "Instant — no server wait",          desc: "All processing — drawing, background removal, and PNG export — happens locally in your browser. Zero upload time, zero server latency." },
                { icon: <Shield className="h-5 w-5 text-primary" />,    title: "Zero data storage",                 desc: "Your signature image never leaves your device. No server upload, no account, no data retention — complete privacy by design." },
                { icon: <PenTool className="h-5 w-5 text-primary" />,   title: "50+ handwriting fonts for Type tab", desc: "For a consistent, font-based transparent signature, choose from 50+ Google handwriting fonts — identical result every time." },
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

          {/* PNG vs JPG comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Transparent PNG vs JPG for Signatures — Full Comparison</h2>
            <p className="text-muted-foreground mb-5">
              PNG and JPG are both common image formats but they are fundamentally different for signature use. Here is
              the complete breakdown:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[440px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">PNG (Recommended)</th>
                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground">JPG</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {PNG_VS_JPG.map(({ feature, png, jpg }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 text-primary/80 font-medium">{png}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{jpg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 text-sm text-foreground">
              <strong className="flex items-center gap-1.5 mb-1"><BadgeCheck className="h-4 w-4 text-primary" />The verdict:</strong>
              <p className="text-muted-foreground leading-relaxed">
                For any professional document use — GST invoices, PDF contracts, email signatures, letterheads — always use
                transparent PNG. JPG has no use case for professional signature images. The only situation where JPG might be
                acceptable is if an email client or platform explicitly rejects PNG files, which is extremely rare.
              </p>
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Where to Use Your Transparent Signature PNG</h2>
            <p className="text-muted-foreground mb-5">Every professional document workflow benefits from a transparent PNG signature:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Is a Transparent PNG Signature Legally Valid in India?</h2>
            <p className="text-muted-foreground mb-5">
              Yes — the transparency of the image background has no bearing on the legal status of the signature it contains:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "IT Act 2000 — Image Format Neutral",
                  body: "The Information Technology Act 2000 and its 2008 Amendment define electronic signatures by their intent and content — not by the image format in which they are stored. A transparent PNG signature and a JPG signature carry identical legal weight. Both are Simple Electronic Signatures (SES) valid for commercial contracts, invoices, and business documents.",
                },
                {
                  title: "GST Invoices — Transparent PNG Accepted",
                  body: "CBIC guidelines for GST invoices require the authorised signatory's signature on the document. The format of the signature image — PNG or JPG — is not specified. In practice, transparent PNG is preferred by CA firms and GST auditors because it embeds cleanly in invoice templates without background artefacts, creating a more professional and authentic appearance.",
                },
                {
                  title: "Contracts and Commercial Agreements",
                  body: "Under the Indian Contract Act 1872 and IT Act 2000, a transparent PNG signature embedded in a PDF contract is legally enforceable for NDAs, freelance agreements, service contracts, employment letters, and vendor agreements. The transparency of the image is purely aesthetic — it has no legal significance.",
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
              For GST portal return filing, MCA ROC submissions, court documents, and income tax e-verification, a certified
              Digital Signature Certificate (DSC) from a licensed Certifying Authority is required. Consult a CA for
              document-specific guidance.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Creating Transparent Signature PNGs</h2>
            <p className="text-muted-foreground mb-5">Avoid these errors to ensure your transparent PNG signature looks professional in every document:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for a Perfect Transparent Signature PNG</h2>
            <p className="text-muted-foreground mb-5">Best practices from professionals who use transparent PNG signatures daily:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Pixocraft for Transparent Signature PNG?</h2>
            <p className="text-muted-foreground mb-5">The fastest, most private, and most reliable way to create transparent PNG signatures online:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "2-second background removal",    body: "No server round-trip, no upload wait. Background removal runs instantly in your browser — result is immediate." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private",                  body: "Your signature image never leaves your device. All processing is local — nothing on any server." },
                { icon: <ImageIcon className="h-4 w-4 text-primary" />,  title: "Print-resolution output",       body: "3200×1040 px transparent PNG — sharp at any scale, from email footer to A4 document." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Works on mobile",               body: "Full touch support for drawing. Upload from your phone camera directly. Create transparent PNGs on any device." },
                { icon: <PenTool className="h-4 w-4 text-primary" />,    title: "No tools or apps needed",       body: "No Photoshop, no background eraser, no app to download. Open the browser, create, download — done." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Completely free",               body: "Draw, upload, remove background, download — all fully free with no watermark and no hidden upgrade." },
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
                <Download className="h-4 w-4" />Download Transparent PNG Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal linking */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Complete Document Signature Workflow — Related Tools</h2>
            <p className="text-muted-foreground mb-4">
              After creating your transparent PNG signature, use these tools to complete your document workflow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/add-signature-to-pdf",       label: "Add Signature to PDF",           desc: "Insert your transparent PNG directly into any PDF document." },
                { href: "/tools/email-signature-maker",      label: "Email Signature Maker",          desc: "Create a professional email signature for Gmail and Outlook." },
                { href: "/tools/gst-invoice-signature",      label: "GST Invoice Signature",          desc: "Signature optimised for GST invoices — works in Tally and Zoho." },
                { href: "/tools/signature-creator",          label: "Signature Creator",              desc: "Full-featured signature creator with advanced customisation." },
                { href: "/tools/mobile-signature-generator", label: "Mobile Signature Generator",     desc: "Draw your signature on phone — optimised for touch screens." },
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
            <h2 className="text-2xl font-bold text-foreground mb-5">Frequently Asked Questions — Transparent Signature PNG</h2>
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
