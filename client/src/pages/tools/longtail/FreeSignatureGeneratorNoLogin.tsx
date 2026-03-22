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
  ArrowRight, Lock, AlertCircle, BadgeCheck, Download,
  Smartphone, Star, PenTool, FileText, ImageIcon,
  Wifi, UserX, EyeOff, Clock, Palette, FileImage,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/free-signature-generator-no-login";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Open the tool",
    desc: "Scroll up and the signature tool loads instantly in your browser — no account, no email, no loading screen.",
  },
  {
    step: 2,
    title: "Draw or type your signature",
    desc: "Use the Draw tab to sketch freehand with a mouse or finger. Use the Type tab to generate a handwriting-style signature from your name. Or upload an existing signature photo.",
  },
  {
    step: 3,
    title: "Customise style",
    desc: "Adjust ink colour, stroke thickness, and font style. Preview how your signature will look on a document or email footer.",
  },
  {
    step: 4,
    title: "Download PNG instantly",
    desc: "Click Download. Your signature saves as a high-resolution transparent PNG to your device — no watermark, no login, no waiting.",
  },
];

const SIGNATURE_TYPES = [
  {
    icon: <PenTool className="h-5 w-5 text-primary" />,
    title: "Handwritten Signature",
    desc: "Draw freehand with a mouse, trackpad, or finger. Bezier smoothing gives every stroke a natural, flowing look.",
  },
  {
    icon: <FileText className="h-5 w-5 text-primary" />,
    title: "Typed Signature",
    desc: "Type your name and choose from 50+ handwritten fonts — cursive, calligraphic, bold, or elegant thin styles.",
  },
  {
    icon: <ImageIcon className="h-5 w-5 text-primary" />,
    title: "Uploaded Signature",
    desc: "Upload a photo of your physical signature and remove the white background automatically with one click.",
  },
  {
    icon: <Palette className="h-5 w-5 text-primary" />,
    title: "Stylish Font Signature",
    desc: "Generate a professional-looking styled signature from any name using curated script and calligraphy fonts.",
  },
];

const FEATURES = [
  { icon: <UserX className="h-5 w-5 text-primary" />, title: "No Login Required", desc: "Zero account creation. No email address, no password, no verification — open and use immediately." },
  { icon: <Lock className="h-5 w-5 text-primary" />, title: "No Signup", desc: "No forms to fill, no terms to accept, no onboarding flow. The tool is ready the moment the page loads." },
  { icon: <Wifi className="h-5 w-5 text-primary" />, title: "Works Offline", desc: "Once loaded, the signature generator works without any internet connection. 100% local processing." },
  { icon: <Shield className="h-5 w-5 text-primary" />, title: "Private — No Data Stored", desc: "Your signature is never uploaded to any server. All processing happens inside your browser, on your device." },
  { icon: <Download className="h-5 w-5 text-primary" />, title: "Instant Download", desc: "Click Download and your transparent PNG saves immediately. No waiting, no queue, no email delivery." },
  { icon: <Palette className="h-5 w-5 text-primary" />, title: "Multiple Styles", desc: "Draw, type, or upload. Choose any colour, adjust stroke width, or pick from 50+ handwriting fonts." },
];

const USE_CASES = [
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Documents & Contracts", desc: "Add a transparent PNG signature to any Word, PDF, or Google Doc without printing or scanning." },
  { icon: <FileImage className="h-5 w-5 text-primary" />, title: "PDF Signing", desc: "Download your signature and embed it directly into PDF documents using our free PDF signing tool." },
  { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "Email Signatures", desc: "Add your handwritten signature image to Gmail, Outlook, or any email client for a professional look." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Forms & Applications", desc: "Sign digital job applications, government forms, and consent documents instantly." },
];

const FAQS = [
  {
    question: "Can I create a signature without login?",
    answer: "Yes — completely. Pixocraft's signature generator requires zero login, zero account creation, and zero email. Open the page, create your signature in any style, and download it instantly. No registration at any step.",
  },
  {
    question: "Is it safe to use a signature generator without login?",
    answer: "Absolutely. Because there is no login, there is also no account to hack, no password to steal, and no personal data stored. Your signature is generated entirely in your browser — nothing is ever sent to any server. It is the safest possible approach.",
  },
  {
    question: "Do I need to sign up to download my signature?",
    answer: "No. Click Download and your signature saves directly to your device as a transparent PNG. There is no email delivery, no account portal, and no paywall. The download happens the moment you click.",
  },
  {
    question: "Can I download my signature instantly?",
    answer: "Yes — instantly. The moment you click Download, the transparent PNG file is saved to your device. There is no processing queue, no waiting screen, and no follow-up step. It takes less than one second.",
  },
  {
    question: "What format is best for a downloaded signature?",
    answer: "PNG with a transparent background is the best format. It overlays cleanly on any document background — white, coloured, or textured — without a white rectangle around it. Pixocraft always exports as a transparent PNG. JPEG should be avoided for signatures because it does not support transparency.",
  },
  {
    question: "Why do other signature generators require login?",
    answer: "Most tools use login as a mechanism to collect your email for marketing, upsell you to a paid plan, or store your data on their servers. Pixocraft does none of these. All processing is local — no account means no data collection and no marketing emails.",
  },
  {
    question: "Can I use this signature generator on my phone without login?",
    answer: "Yes. The tool is fully mobile-optimised and touch-friendly. Open it in any mobile browser on Android or iOS, draw your signature with your finger, and tap Download — all without login. No app installation required.",
  },
  {
    question: "Is the signature generator free forever?",
    answer: "Yes — 100% free, permanently. No subscription tier, no freemium limit, no watermark on the output, and no usage cap. You can create and download unlimited signatures at any time, completely free.",
  },
  {
    question: "Can I reuse my downloaded signature on multiple documents?",
    answer: "Yes. Once you download the transparent PNG, you can insert it into unlimited documents, PDFs, emails, and forms. Save it to a folder on your device and reuse it whenever needed — no need to recreate it.",
  },
  {
    question: "What signature styles are available without login?",
    answer: "All styles are available without login: freehand drawing with smooth Bezier curves, typed name with 50+ handwriting fonts, photo upload with automatic background removal, and multi-colour ink options. Every feature is unlocked from the moment you open the page.",
  },
  {
    question: "Does the tool store my signature data?",
    answer: "No. Your signature is generated and displayed entirely within your browser's memory. When you download it, the file goes directly to your device. When you close the tab, everything is cleared. No data is stored on any server at any point.",
  },
  {
    question: "Can I create a transparent background signature without login?",
    answer: "Yes. All downloaded signatures are automatically exported as transparent PNG files — no background, no white rectangle, no extra steps. This works for drawn, typed, and uploaded signatures equally, with zero account required.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Free Signature Generator No Login – Create Signature Instantly",
  "description": "Create signature online free with no login required. Draw, type, or upload and download instantly. Private, secure, and fast tool.",
  "url": CANONICAL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-22",
  "author": { "@type": "Organization", "name": "Pixocraft" },
  "publisher": { "@type": "Organization", "name": "Pixocraft", "url": "https://tools.pixocraft.in" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": CANONICAL },
};

export default function FreeSignatureGeneratorNoLogin() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free Signature Generator No Login – Create Signature Instantly | Pixocraft",
    description: "Create signature online free with no login required. Draw, type, or upload and download instantly. Private, secure, and fast tool.",
    keywords: "free signature generator no login, signature generator without signup, create signature online no login, signature maker free no account, no login signature generator, free signature download no registration",
    canonicalUrl: CANONICAL,
    ogType: "website",
    ogImage: "https://tools.pixocraft.in/images/signature-generator-no-login.png",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Free Signature Generator No Login", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Free Signature Generator No Login – Create Signature Instantly | Pixocraft",
    description: "Create signature online free with no login required. Draw, type, or upload and download instantly. Private, secure, and fast tool.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Signature Online with No Login",
    description: "Create a free digital signature without any login, signup, or account in under 60 seconds.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.desc })),
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Free Signature Generator – No Login",
    description: "Free online signature generator with no login required. Create, customise, and download a transparent PNG signature instantly.",
    url: CANONICAL,
    applicationCategory: "Utility",
    operatingSystem: "Web",
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

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Breadcrumb items={[
          { label: "Home", url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Free Signature Generator No Login" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Free Signature Generator (No Login Required)
              </h1>
              <p className="text-sm text-muted-foreground">Create your signature instantly without login or signup. 100% free, private, and works offline.</p>
            </div>
          </div>

          {/* Featured snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">Quick Answer — What is a free signature generator with no login?</p>
            <p className="text-base text-foreground leading-relaxed">
              A <strong>free signature generator with no login</strong> lets you create a signature instantly without any account, email address, or signup. You draw, type, or upload your signature, then <strong>download the PNG</strong> immediately — no verification, no waiting, completely free.
            </p>
          </div>

          {/* Trust badges — the core USP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {[
              { icon: <UserX className="h-4 w-4 text-primary" />, label: "No Login", sub: "Zero account required" },
              { icon: <Lock className="h-4 w-4 text-primary" />, label: "No Signup", sub: "No email or password" },
              { icon: <Shield className="h-4 w-4 text-primary" />, label: "No Upload", sub: "Nothing sent to servers" },
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
              <PenTool className="h-4 w-4" />Create Signature — No Login<ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" />Ready in under 30 seconds</span>
              <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5 text-primary" />Transparent PNG, no watermark</span>
              <span className="flex items-center gap-1"><Smartphone className="h-3.5 w-3.5 text-primary" />Works on any device</span>
            </div>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <SignatureToolSection
            caption="No login · No signup · No watermark · Transparent PNG · Works offline"
          />
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Keyword-rich intro paragraph */}
          <p className="text-muted-foreground text-base leading-relaxed -mt-8">
            Most <strong>signature generators</strong> force you to create an account before you can do anything. Pixocraft is a <strong>free signature generator with no login</strong> — open it, create your signature, and download instantly. This guide explains why a <strong>signature generator without signup</strong> is the better choice, how to use it, and what you can do with your downloaded signature.
          </p>

          {/* Why no login */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose a Signature Generator with No Login?</h2>
            <p className="text-muted-foreground mb-5">
              The frustration of being forced to sign up for a tool you just want to use once is universal. Here is why a <strong>no-login signature generator</strong> is the smarter choice:
            </p>
            <div className="space-y-3 mb-5">
              {[
                {
                  icon: <Clock className="h-5 w-5 text-primary" />,
                  title: "Instant Access — No Waiting",
                  desc: "Signup flows waste time. Creating an account, waiting for a verification email, clicking a link — all of that can take 3–5 minutes. With no login, you start creating your signature the moment you open the page.",
                },
                {
                  icon: <EyeOff className="h-5 w-5 text-primary" />,
                  title: "No Privacy Risk",
                  desc: "Handing over your email address to a tool company means marketing emails, potential data breaches, and your email being sold to third parties. No login means no data shared — ever.",
                },
                {
                  icon: <Shield className="h-5 w-5 text-primary" />,
                  title: "No Account to Hack",
                  desc: "If there is no account, there is nothing to breach. Your signature data never touches any server — it exists only in your browser's memory and disappears when you close the tab.",
                },
                {
                  icon: <Zap className="h-5 w-5 text-primary" />,
                  title: "Zero Friction — Maximum Speed",
                  desc: "No forms to fill, no passwords to remember, no re-verification. The tool is ready in under 2 seconds. Most users complete their signature and download it in under 30 seconds.",
                },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-5 rounded-xl border bg-card">
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
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a Signature Online — No Login Needed</h2>
            <p className="text-muted-foreground mb-5">Four steps, under 30 seconds, zero accounts:</p>
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
                <PenTool className="h-4 w-4" />Create Signature Now — Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Features of This Free Signature Generator</h2>
            <p className="text-muted-foreground mb-5">
              Everything is unlocked from the first second — no upgrade required, no premium tier, no account needed to access any feature:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(({ icon, title, desc }) => (
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

          {/* Types of signature */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Types of Signature You Can Create</h2>
            <p className="text-muted-foreground mb-5">
              Every style is available without login — choose the one that fits your needs:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {SIGNATURE_TYPES.map(({ icon, title, desc }) => (
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

          {/* Best format */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Best Format to Download Your Signature</h2>
            <p className="text-muted-foreground mb-5">
              The format you choose determines how your signature looks when placed on any document, PDF, or email:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  label: "PNG — Transparent Background",
                  recommended: true,
                  points: [
                    "No white box — overlays cleanly on any background colour",
                    "High resolution — 3200×1040 px, print quality",
                    "Zero watermark — the downloaded file is entirely yours",
                    "Works on white, dark, and coloured document backgrounds",
                  ],
                },
                {
                  label: "JPEG — Solid Background",
                  recommended: false,
                  points: [
                    "White rectangle visible around signature on non-white backgrounds",
                    "Smaller file size — useful if the document is always white",
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
            <h2 className="text-2xl font-bold text-foreground mb-4">What Can You Do with Your Downloaded Signature?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {/* Privacy & security */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Privacy &amp; Security — How Your Data Is Protected</h2>
            <div className="rounded-xl border bg-primary/5 border-primary/20 px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                Your signature is created entirely inside your browser. No file, image, or personal data is ever sent to Pixocraft's servers — or any server.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { icon: <Shield className="h-5 w-5 text-primary" />, title: "No data stored", desc: "When you close the tab, your signature is gone. Nothing is saved, logged, or retained anywhere except on your own device (when you download it)." },
                { icon: <Wifi className="h-5 w-5 text-primary" />, title: "Runs entirely in your browser", desc: "The signature generation engine is JavaScript code that executes locally on your device. No network calls are made during creation or download." },
                { icon: <Lock className="h-5 w-5 text-primary" />, title: "Safe to use for any signature", desc: "Whether it is your personal signature, business logo, or legal handwriting, it never leaves your device unless you export it yourself." },
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Pixocraft vs Other Signature Generators</h2>
            <p className="text-muted-foreground mb-5">
              Most signature tools put login requirements and premium paywalls between you and a simple PNG download:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Typical Others</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { feature: "Login required", pixo: "No — never", others: "Yes — before access" },
                    { feature: "Email verification", pixo: "No", others: "Usually required" },
                    { feature: "Data stored on servers", pixo: "No — 100% local", others: "Yes — uploaded" },
                    { feature: "Watermark on download", pixo: "Never", others: "Often on free tier" },
                    { feature: "Download speed", pixo: "Instant (< 1 sec)", others: "Slow (upload + process)" },
                    { feature: "Free tier limit", pixo: "Unlimited", others: "Usually capped" },
                    { feature: "Works offline", pixo: "Yes", others: "No (server-dependent)" },
                    { feature: "Privacy", pixo: "100% private", others: "Data shared/stored" },
                  ].map(({ feature, pixo, others }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 font-semibold text-primary">{pixo}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{others}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Related Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Signature Generator", href: "/tools/signature-generator", desc: "Full-featured signature pad — draw, type, or upload your signature." },
                { label: "Signature Font Generator", href: "/tools/signature-font-generator", desc: "Generate a stylish typed signature using premium handwriting fonts." },
                { label: "Handwritten Signature Generator", href: "/tools/handwritten-signature-generator", desc: "Create a natural freehand signature that looks authentically handwritten." },
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
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
          <section className="rounded-xl border bg-primary/5 border-primary/20 px-6 py-8 text-center">
            <PenTool className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-2">Create Your Signature Now — No Login, No Signup</h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Draw, type, or upload. Download as transparent PNG. Zero account required — free forever.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-final-cta">
                <PenTool className="h-4 w-4" />Create Signature — Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
