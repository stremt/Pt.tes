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
  Shield, Zap, Check, ChevronDown, ChevronUp,
  ArrowRight, Lock, AlertCircle, Download,
  Smartphone, PenTool, FileText, ImageIcon,
  Wifi, UserX, EyeOff, Clock, Palette, FileImage,
  Server, Database, Eye, Ban,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/online-signature-generator-without-upload";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Open the tool",
    desc: "Open Pixocraft's signature generator in your browser. The tool loads instantly — no file upload required at any step.",
  },
  {
    step: 2,
    title: "Draw or type your signature",
    desc: "Use the Draw tab to sketch freehand with a mouse or finger. Switch to the Type tab to generate a stylish signature from your name. No file needs to leave your device.",
  },
  {
    step: 3,
    title: "Customise your style",
    desc: "Pick your ink colour, adjust stroke thickness, and choose from multiple font styles. All rendering happens locally — nothing is sent to any server.",
  },
  {
    step: 4,
    title: "Download your signature instantly",
    desc: "Click Download. Your signature saves as a transparent PNG directly to your device. No upload, no waiting, no watermark.",
  },
  {
    step: 5,
    title: "Use your signature anywhere",
    desc: "Insert the downloaded transparent PNG into Word documents, Google Docs, PDF editors, or email clients. The file is yours permanently — no server access or re-login needed to reuse it.",
  },
];

const FEATURES = [
  { icon: <Ban className="h-5 w-5 text-primary" />, title: "No Upload Required", desc: "Your files never leave your device. The entire signature is created, rendered, and downloaded inside your browser with zero server interaction." },
  { icon: <UserX className="h-5 w-5 text-primary" />, title: "No Login or Account", desc: "Zero account creation. No email, no password, no verification — open the page and start creating immediately." },
  { icon: <Download className="h-5 w-5 text-primary" />, title: "Instant Download", desc: "Click Download and your transparent PNG saves directly to your device in under one second. No queue, no email delivery." },
  { icon: <Wifi className="h-5 w-5 text-primary" />, title: "Works Fully Offline", desc: "Once loaded, the tool runs without any internet connection. 100% browser-based, no server dependency whatsoever." },
  { icon: <Palette className="h-5 w-5 text-primary" />, title: "Multiple Signature Styles", desc: "Draw freehand, type with 50+ handwriting fonts, or upload a photo locally. Every style works without sending data to any server." },
  { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% Private", desc: "No analytics on your signature data, no tracking of what you create, no data retention. Your signature exists only on your device." },
];

const SIGNATURE_TYPES = [
  {
    icon: <PenTool className="h-5 w-5 text-primary" />,
    title: "Handwritten Signature",
    desc: "Draw freehand with a mouse, trackpad, or finger. Bezier smoothing gives every stroke a natural, flowing look — processed entirely in your browser.",
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Typed Signature",
    desc: "Type your name and choose from 50+ handwriting-style fonts — cursive, calligraphic, bold, or elegant thin styles. No file upload at any stage.",
  },
  {
    icon: <ImageIcon className="h-5 w-5 text-primary" />,
    title: "Uploaded Photo (Local Only)",
    desc: "You can optionally upload a photo of your physical signature. It never leaves your browser — background removal runs locally on your device, not on a server.",
  },
  {
    icon: <Palette className="h-5 w-5 text-primary" />,
    title: "Stylish Font Signature",
    desc: "Generate a professional-looking signature from any name using curated script and calligraphy fonts — fully offline, fully private.",
  },
];

const USE_CASES = [
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Documents & Contracts", desc: "Add a transparent PNG signature to Word, PDF, or Google Docs without uploading any document to a third-party server." },
  { icon: <FileImage className="h-5 w-5 text-primary" />, title: "PDF Signing", desc: "Download your signature and embed it into PDF documents. Your original PDF is never touched by any external service." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Email Signatures", desc: "Add a handwritten signature image to Gmail, Outlook, or any email client for a professional look — no upload needed." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Forms & Applications", desc: "Sign digital job applications, government forms, and consent documents without submitting any files to an online service." },
];

const FAQS = [
  {
    question: "Can I create a signature without uploading any files?",
    answer: "Yes — completely. Pixocraft's signature generator is 100% browser-based. You draw or type your signature, and it is rendered locally inside your browser. No file is ever sent to any server at any point. The download goes directly from your browser to your device.",
  },
  {
    question: "What does 'no upload' mean for a signature generator?",
    answer: "A no-upload signature generator means the tool creates your signature entirely within your web browser, without sending any data — your name, your drawing strokes, or any image — to an external server. Everything happens locally, on your own device, which is far more private and secure than server-side tools.",
  },
  {
    question: "Is it safe to use an online signature generator?",
    answer: "It depends on the tool. Server-based tools require you to upload data, which creates a privacy risk. Pixocraft is browser-based — nothing is uploaded, nothing is stored, and nothing is shared. There is no server that could be breached, making it as safe as a local desktop app.",
  },
  {
    question: "Do online signature generators store my signature?",
    answer: "Many tools do — especially those requiring login or file upload. Pixocraft does not. Your signature is rendered in your browser's canvas memory. When you download it, the PNG goes to your device. When you close the tab, everything is cleared. Zero retention.",
  },
  {
    question: "Why should I avoid signature generators that require upload?",
    answer: "When you upload a file, you lose control of it. The server can store it, analyse it, share it, or expose it in a data breach. For something as personal and legally sensitive as a signature, no upload is the correct approach. Your signature should never touch any server except your own device.",
  },
  {
    question: "How does Pixocraft create a signature without uploading?",
    answer: "Pixocraft uses the HTML5 Canvas API and JavaScript running entirely inside your browser. When you draw, type, or adjust your signature, all rendering happens on your local device using your own CPU and GPU. The 'Download' button triggers a local file export — not a server request.",
  },
  {
    question: "Can I use this signature generator on my phone without uploading?",
    answer: "Yes. The tool is fully mobile-optimised and touch-friendly. Open it in any mobile browser on Android or iOS, draw your signature with your finger, and tap Download. Everything runs locally on your phone — no files are uploaded to any server.",
  },
  {
    question: "Is a browser-based signature generator as good as desktop software?",
    answer: "For everyday signature creation, yes — and in some ways better. There is nothing to install, it works on any device, and the privacy guarantee (no upload, no storage) is stronger than many desktop apps that phone home or sync to cloud accounts.",
  },
  {
    question: "What is the difference between a no-upload and a no-login signature generator?",
    answer: "No-login means you do not need an account to use the tool. No-upload means your data is never sent to any server. Pixocraft offers both. The privacy benefit of no-upload is even stronger than no-login — because even logged-in tools can still upload and store your data on their servers.",
  },
  {
    question: "Can I upload a photo of my handwritten signature without it being sent to a server?",
    answer: "Yes. If you choose the Upload option, the image you select is loaded into your browser's local memory using the browser's FileReader API. It is processed entirely on your device — background removal, cropping, and exporting all happen locally. The image never leaves your device.",
  },
  {
    question: "Will my signature be watermarked if I use the free no-upload tool?",
    answer: "No. Pixocraft never adds watermarks to downloaded signatures. The transparent PNG you receive is 100% yours — no brand logo, no hidden text, no degraded quality on the free tier. Unlimited downloads, zero watermarks, forever free.",
  },
  {
    question: "What format does the no-upload signature generator download?",
    answer: "The default download is a transparent PNG — high-resolution, no white background, suitable for overlaying on any document or email. PNG is the best format for signatures because it preserves transparency, making it invisible on any background colour.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Online Signature Generator Without Upload (100% Private)",
  "description": "Create signature online without uploading any files. 100% private, secure, and works in your browser. Free, no login required.",
  "url": CANONICAL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-22",
  "author": { "@type": "Organization", "name": "Pixocraft" },
  "publisher": { "@type": "Organization", "name": "Pixocraft", "url": "https://tools.pixocraft.in" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": CANONICAL },
};

export default function OnlineSignatureGeneratorWithoutUpload() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Online Signature Generator Without Upload (100% Private) | Pixocraft",
    description: "Create signature online without uploading any files. 100% private, secure, and works in your browser. Free, no login required.",
    keywords: "online signature generator without upload, signature generator without upload, create signature without uploading, signature maker no upload required, private signature generator online, browser based signature generator",
    canonicalUrl: CANONICAL,
    ogType: "website",
    ogImage: "https://tools.pixocraft.in/images/signature-no-upload.png",
    ogTitle: "Signature Generator Without Upload",
    ogDescription: "Create signature without uploading files. Private, secure, browser-based tool.",
    twitterTitle: "Signature Generator Without Upload",
    twitterDescription: "Create signature instantly without uploading files.",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Online Signature Generator Without Upload", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Online Signature Generator Without Upload (100% Private) | Pixocraft",
    description: "Create signature online without uploading any files. 100% private, secure, and works in your browser. Free, no login required.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Signature Online Without Uploading Any Files",
    description: "Create a private digital signature without uploading files, creating an account, or sending data to any server.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.desc })),
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Online Signature Generator Without Upload",
    description: "Browser-based signature generator that creates signatures without uploading any files. 100% private, runs locally.",
    url: CANONICAL,
    applicationCategory: "Utility",
    applicationSubCategory: "Signature Generator",
    operatingSystem: "Web",
    featureList: [
      "No upload required",
      "No login",
      "Works offline",
      "Instant download",
      "100% private",
      "Transparent PNG export",
      "Browser-based processing",
    ],
    offers: { price: "0", priceCurrency: "INR" },
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={generateFAQSchema(FAQS)} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-5 sm:py-8">
        <Breadcrumb items={[
          { label: "Home", url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Generator", url: "/tools/signature-pad-tool" },
          { label: "Online Signature Generator Without Upload" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Online Signature Generator Without Upload (100% Private)
              </h1>
              <p className="hidden md:block text-sm text-muted-foreground">Create your signature without uploading any files. Fully private, secure, and works directly in your browser.</p>
            </div>
          </div>

          {/* Featured snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">Quick Answer — What is an online signature generator without upload?</p>
            <p className="text-base text-foreground leading-relaxed">
              An <strong>online signature generator without upload</strong> creates your signature entirely inside your browser without sending any file or data to a server. You draw or type your signature, it is rendered locally on your device, and you download the PNG instantly — <strong>no file upload, no data storage, 100% private</strong>.
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {[
              { icon: <Ban className="h-4 w-4 text-primary" />, label: "No Upload", sub: "Nothing sent to servers" },
              { icon: <UserX className="h-4 w-4 text-primary" />, label: "No Login", sub: "Zero account required" },
              { icon: <Shield className="h-4 w-4 text-primary" />, label: "100% Private", sub: "Data stays on device" },
              { icon: <Wifi className="h-4 w-4 text-primary" />, label: "Works Offline", sub: "Local browser processing" },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-xl border bg-card text-center">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{sub}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-create-signature-hero-cta">
              <Shield className="h-4 w-4" />Create Signature — No Upload<ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" />Ready in under 30 seconds</span>
              <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5 text-primary" />Transparent PNG, no watermark</span>
              <span className="flex items-center gap-1"><Smartphone className="h-3.5 w-3.5 text-primary" />Works on any device</span>
            </div>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────── */}
        <div id="tool" className="mb-6 sm:mb-12">
          <SignatureToolSection
            caption="No upload · No login · No watermark · Transparent PNG · 100% private"
          />
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* Keyword-rich intro */}
          <p className="text-muted-foreground text-base leading-relaxed -mt-8">
            Most online signature tools require you to upload a file or photo to their servers before you can do anything — creating an unnecessary privacy risk. Pixocraft is a <strong>signature generator without upload</strong>: everything happens inside your browser, on your device, with zero data leaving your machine. This guide explains how it works, why it matters, and how to create your signature privately in under 30 seconds.
          </p>

          {/* Why no upload matters */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Why Choose a Signature Generator Without Upload?</h2>
            <p className="text-muted-foreground mb-5">
              Uploading your signature to any server — even a reputable one — creates privacy and security risks that simply do not need to exist. Here is why <strong>no-upload signature creation</strong> is the right choice:
            </p>
            <div className="space-y-3 mb-5">
              {[
                {
                  icon: <Eye className="h-5 w-5 text-primary" />,
                  title: "Your Signature Is Sensitive Data",
                  desc: "Your handwritten signature is legally significant. It can be used to authorise contracts, financial documents, and legal agreements. Uploading it to a third-party server means trusting that company not to retain, misuse, or expose it in a breach.",
                },
                {
                  icon: <Database className="h-5 w-5 text-primary" />,
                  title: "Server Tools Store Your Data",
                  desc: "When a tool requires upload, your signature is sent across the internet to a server where it is processed and — in most cases — temporarily or permanently stored in a database. That data can be subpoenaed, hacked, sold, or used for training AI models.",
                },
                {
                  icon: <Server className="h-5 w-5 text-primary" />,
                  title: "Browser-Based Is Safer by Design",
                  desc: "A browser-based, no-upload tool has no server to breach. The signature exists only in your browser's memory, and disappears the moment you close the tab (unless you downloaded it). There is no centralised point of failure.",
                },
                {
                  icon: <Clock className="h-5 w-5 text-primary" />,
                  title: "No Upload Also Means Faster",
                  desc: "Upload tools are slow — your file must travel to a server, be processed, and travel back. A no-upload tool renders your signature instantly on your local hardware, giving you a result in milliseconds rather than seconds.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-1 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to create */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Create a Signature Without Uploading Files</h2>
            <p className="text-muted-foreground mb-5">Four steps, under 30 seconds, zero server interaction:</p>
            <ol className="space-y-3 mb-6">
              {HOW_TO_STEPS.map(({ step, title, desc }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="text-center">
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-steps-cta">
                <PenTool className="h-4 w-4" />Create Signature Now — No Upload<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* How the tool works */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">How This Tool Works (No Server, No Upload)</h2>
            <p className="text-muted-foreground mb-5">
              Understanding how Pixocraft works explains why it is genuinely private — not just a marketing claim:
            </p>
            <div className="space-y-3">
              {[
                {
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  title: "HTML5 Canvas rendering — runs locally",
                  desc: "When you draw your signature, each stroke is captured by your browser's Canvas API and rendered into pixels on your local device. No stroke data, coordinates, or images are sent to any external system.",
                },
                {
                  icon: <Server className="h-5 w-5 text-primary" />,
                  title: "Zero network requests during creation",
                  desc: "From the moment you start drawing to the moment you click Download, no network request is made. Open your browser's Developer Tools and check the Network tab — you will see zero activity during signature creation.",
                },
                {
                  icon: <Download className="h-5 w-5 text-primary" />,
                  title: "Download is a local file export, not a server fetch",
                  desc: "When you click Download, the browser converts the canvas to a PNG using a data URL and triggers a local file-save. This is functionally identical to saving a file in a desktop app — no server is involved.",
                },
                {
                  icon: <Database className="h-5 w-5 text-primary" />,
                  title: "No database, no retention",
                  desc: "Pixocraft has no database that stores signatures. There is no 'your signatures' account section, no cloud backup, no analytics on signature content. When you close the tab, the signature is gone from our end — because it was never there.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Features of This No-Upload Signature Generator</h2>
            <p className="text-muted-foreground mb-5">
              Every feature works without uploading anything — no exceptions, no hidden requirements:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(({ icon, title, desc }) => (
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

          {/* Types of signature */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Types of Signature You Can Create Without Uploading</h2>
            <p className="text-muted-foreground mb-5">
              All styles are available without uploading any file to a server:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {SIGNATURE_TYPES.map(({ icon, title, desc }) => (
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

          {/* Best format */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Best Format to Download Your Signature</h2>
            <p className="text-muted-foreground mb-5">
              The format you choose affects how your signature looks when placed on documents, PDFs, or emails:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  label: "PNG — Transparent Background",
                  recommended: true,
                  points: [
                    "No white box — overlays cleanly on any background colour",
                    "High resolution — print quality, no pixelation",
                    "Zero watermark — the file is entirely yours",
                    "Works on white, dark, and coloured document backgrounds",
                  ],
                },
                {
                  label: "JPEG — Solid Background",
                  recommended: false,
                  points: [
                    "White rectangle visible around signature on non-white backgrounds",
                    "Smaller file size — only useful on always-white documents",
                    "Not recommended for PDFs, contracts, or branded documents",
                  ],
                },
              ].map(({ label, recommended, points }) => (
                <div key={label} className={`p-5 rounded-xl border ${recommended ? "bg-primary/5 border-primary/20" : "bg-card"}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className={`h-4 w-4 ${recommended ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold text-foreground text-sm">{label}</p>
                    {recommended && <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">Recommended</span>}
                  </div>
                  <ul className="space-y-1.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                        {recommended
                          ? <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          : <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        }
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Where Can You Use Your Downloaded Signature?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Privacy & security */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Privacy &amp; Security — How Your Data Is Protected</h2>
            <div className="rounded-xl border bg-primary/5 border-primary/20 px-4 py-4 sm:px-6 sm:py-5 mb-5">
              <p className="text-foreground font-medium">
                Your signature is created entirely inside your browser. No file, image, drawing stroke, or personal data is ever sent to Pixocraft's servers — or any server.
              </p>
            </div>
            <img
              src="https://tools.pixocraft.in/images/signature-no-upload-example.png"
              alt="Create signature online without upload — private browser-based tool example"
              loading="lazy"
              width={600}
              height={300}
              className="w-full rounded-xl border mb-5 object-cover"
            />
            <div className="space-y-3">
              {[
                { icon: <EyeOff className="h-5 w-5 text-primary" />, title: "Nothing is observed or tracked", desc: "Standard analytics tools do not capture canvas content. Pixocraft does not use any form of session recording or canvas monitoring. Your drawing strokes exist only on your screen." },
                { icon: <Database className="h-5 w-5 text-primary" />, title: "No database entry is ever created", desc: "There is no user record, no signature record, no creation event logged to any database. Your session is completely ephemeral." },
                { icon: <Lock className="h-5 w-5 text-primary" />, title: "Safe for legally sensitive signatures", desc: "Whether it is your personal signature, business authorisation, or legal handwriting, it never leaves your device unless you export it yourself to your own device." },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Pixocraft vs Upload-Based Signature Generators</h2>
            <p className="text-muted-foreground mb-5">
              Most signature tools send your data to a server for processing. Here is how Pixocraft's no-upload approach compares:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Pixocraft (No Upload)</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Upload-Based Tools</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { feature: "File upload required", pixo: "Never", others: "Yes — always" },
                    { feature: "Data sent to server", pixo: "No — stays in browser", others: "Yes — every action" },
                    { feature: "Signature stored in DB", pixo: "No — zero retention", others: "Often retained" },
                    { feature: "Privacy risk", pixo: "None", others: "Data breach possible" },
                    { feature: "Speed", pixo: "Instant (local)", others: "Slow (upload + process)" },
                    { feature: "Works offline", pixo: "Yes", others: "No — server dependent" },
                    { feature: "Login required", pixo: "Never", others: "Usually required" },
                    { feature: "Watermark on download", pixo: "Never", others: "Often on free tier" },
                  ].map(({ feature, pixo, others }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 font-semibold text-primary">{pixo}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Related Signature Tools</h2>
            <p className="text-muted-foreground mb-5">
              Need a no-login option instead? Try our{" "}
              <Link href="/tools/free-signature-generator-no-login" className="text-primary underline underline-offset-2">free signature generator with no login</Link>
              {" "}— same private, browser-based approach. Want a stylish typed style?{" "}
              <Link href="/tools/signature-font-generator" className="text-primary underline underline-offset-2">Signature Font Generator</Link>
              {" "}lets you pick from 50+ handwriting fonts instantly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Signature Generator", href: "/tools/signature-pad-tool", desc: "Full-featured signature pad — draw, type, or upload your signature." },
                { label: "Free Signature Generator No Login", href: "/tools/free-signature-generator-no-login", desc: "Create your signature with no account, no email, no signup required." },
                { label: "Signature Font Generator", href: "/tools/signature-font-generator", desc: "Generate a stylish typed signature using premium handwriting fonts." },
                { label: "Signature for PDF", href: "/tools/signature-for-pdf", desc: "Embed your signature directly into a PDF — no printing required." },
              ].map(({ label, href, desc }) => (
                <Link key={label} href={href} data-testid={`link-related-${label.toLowerCase().replace(/\s+/g, "-")}`}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border bg-card hover-elevate cursor-pointer">
                    <ArrowRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {FAQS.map(({ question, answer }, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                  >
                    <span className="font-semibold text-foreground text-sm leading-snug">{question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                    }
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed border-t">
                      {answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="rounded-xl border bg-primary/5 border-primary/20 px-4 py-6 sm:px-6 sm:py-8 text-center">
            <Shield className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-2">Create Your Signature Now — No Upload, No Server, 100% Private</h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Draw, type, or pick a font style. Download as transparent PNG. Nothing ever leaves your device.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-final-cta">
                <Shield className="h-4 w-4" />Create Private Signature — Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
