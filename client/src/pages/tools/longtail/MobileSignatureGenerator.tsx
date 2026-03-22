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
  PenTool, Shield, Zap, Smartphone, Star, Check, FileText,
  ChevronDown, ChevronUp, ArrowRight, Lock, AlertCircle, BadgeCheck,
  Download, FileCheck, Wifi, Fingerprint, RotateCw, Users, Clock,
  Receipt, Briefcase, Truck, BriefcaseBusiness,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/mobile-signature-generator";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const FAQS = [
  {
    question: "How do I draw a signature on my phone?",
    answer: "Open this page on your phone browser (Chrome, Safari, or Firefox). The Draw tab is selected by default. Use your finger directly on the canvas to draw your signature. Tap 'Download Signature' when you are happy with it. The process takes about 20 seconds on any smartphone.",
  },
  {
    question: "Is the mobile signature generator free?",
    answer: "Yes — 100% free, with no login, no subscription, and no watermark on the downloaded signature. Create and download unlimited signatures at no cost.",
  },
  {
    question: "Do I need to download an app to create a signature on my phone?",
    answer: "No app is required. This tool works entirely in your phone's browser — Chrome, Safari, Firefox, or any modern mobile browser. Open the page, draw your signature with your finger, and download it immediately.",
  },
  {
    question: "What format does the signature download in on mobile?",
    answer: "The signature downloads as a transparent PNG — the best format for overlaying on documents, PDFs, and invoices without a white background box. A JPG option is also available for email footers and platforms that do not support transparency.",
  },
  {
    question: "Is a signature created on a phone legally valid in India?",
    answer: "Yes. Under the IT Act 2000, an electronic signature — including one drawn with a finger on a mobile phone — is legally valid for contracts, GST invoices, NDAs, employment letters, and most commercial agreements. The method of creation (phone vs. desktop) does not affect legal validity.",
  },
  {
    question: "Can I use this to sign a GST invoice on my phone?",
    answer: "Yes. Draw your signature on your phone, download the transparent PNG, then use Pixocraft's 'Signature for PDF' or 'Add Signature to PDF' tool (both mobile-optimised) to embed it into your GST invoice PDF. The signed PDF downloads directly to your phone.",
  },
  {
    question: "Does this mobile signature tool work offline?",
    answer: "Once the page has loaded, the core drawing functionality works without an internet connection. All signature processing happens locally in your browser. An internet connection is only needed for the initial page load.",
  },
  {
    question: "How do I get a clean signature on a phone screen?",
    answer: "Four tips for phone drawing: (1) Use your index fingertip, not your nail. (2) Draw slowly — touchscreens capture more detail at lower speeds. (3) Rotate your phone to landscape mode for a wider canvas. (4) Reduce the stroke width to 2–3px for a more natural look. Use the Undo button freely until you are satisfied.",
  },
  {
    question: "What is the difference between drawing a signature on mobile vs desktop?",
    answer: "On mobile, you draw with your fingertip on a touch screen — which feels natural but may be less precise than a mouse. On desktop, a mouse gives higher pixel-level accuracy. For consistency across documents, the Type tab lets you generate an identical signature every time on both mobile and desktop.",
  },
  {
    question: "Can I type my signature instead of drawing on mobile?",
    answer: "Yes. Tap the Type tab to type your name and choose from 50+ handwriting fonts. This is often the most consistent approach on mobile — the font renders perfectly every time regardless of how steady your hand is. Tap Download to get the typed signature as a PNG.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Open on your phone",    description: "Open this page in any mobile browser — Chrome, Safari, or Firefox. No app download, no account, no setup." },
  { step: 2, title: "Draw with your finger", description: "Use the Draw tab (selected by default). Write your signature directly on the canvas using your fingertip. Use Undo or Clear to adjust." },
  { step: 3, title: "Customise",             description: "Adjust ink colour, stroke width, and style. Switch to Type for a font-based signature or Upload to reuse an existing one." },
  { step: 4, title: "Download & use",        description: "Tap Download Signature to save the transparent PNG to your phone. Then use it in PDFs, documents, or email footers." },
];

const MOBILE_VS_DESKTOP = [
  { feature: "Speed",           mobile: "20 seconds",          desktop: "30 seconds" },
  { feature: "Convenience",     mobile: "Very high — anywhere", desktop: "Medium — at desk" },
  { feature: "Drawing accuracy", mobile: "Good (fingertip)",   desktop: "High (mouse)" },
  { feature: "Font type mode",  mobile: "Identical",            desktop: "Identical" },
  { feature: "Output quality",  mobile: "Print-resolution PNG", desktop: "Print-resolution PNG" },
  { feature: "Privacy",         mobile: "100% local",          desktop: "100% local" },
  { feature: "App required",    mobile: "No",                  desktop: "No" },
  { feature: "Cost",            mobile: "Free",                desktop: "Free" },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,         title: "GST Invoices in the Field", desc: "Sales reps and consultants: sign GST invoices on-site from your phone and email the signed PDF immediately." },
  { icon: <FileText className="h-5 w-5 text-primary" />,        title: "Quick Contract Signing",    desc: "Sign freelance contracts, service agreements, and NDAs from your phone without waiting to get to a laptop." },
  { icon: <Truck className="h-5 w-5 text-primary" />,           title: "Delivery & Field Service",  desc: "Field agents and delivery personnel can sign PODs, job sheets, and service records directly on their phones." },
  { icon: <BriefcaseBusiness className="h-5 w-5 text-primary" />, title: "Sales & Client Meetings", desc: "Close deals faster — present, sign, and send documents from your phone during the client meeting itself." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />,       title: "Freelancers on the Go",    desc: "Designers, writers, and consultants can sign proposals and invoices from anywhere — café, commute, or co-working space." },
  { icon: <FileCheck className="h-5 w-5 text-primary" />,       title: "HR & Offer Letters",       desc: "HR managers sign and dispatch offer letters as signed PDFs directly from their smartphones." },
];

const MISTAKES = [
  { title: "Drawing too fast",            body: "Mobile touchscreens sample input at a fixed rate. Drawing very fast misses detail and creates jagged lines. Draw at a deliberate, medium pace for the cleanest result." },
  { title: "Stroke width too thick",      body: "A 6–8px stroke looks heavy on a PDF page. Set stroke width to 2–3px on mobile for a signature that looks natural at normal document scale." },
  { title: "Portrait mode on narrow screens", body: "On smaller phones, the portrait canvas is often too narrow for a full signature. Rotate to landscape mode before drawing — you get a much wider workspace." },
  { title: "Pressing too hard",           body: "Touchscreens do not use pressure — pressing harder does not change the line. It often causes palm rejection errors. Draw with a light, confident touch using your index fingertip." },
  { title: "Not using Undo",             body: "Every stroke can be undone with the Undo button. Do not start over from scratch — fix the last stroke immediately with Undo and redraw it." },
];

const PRO_TIPS = [
  { title: "Use landscape mode",          body: "Rotate your phone to landscape (horizontal) orientation before drawing. The canvas becomes nearly 2× as wide, giving you much more room to create a natural, flowing signature." },
  { title: "Fingertip, not fingernail",   body: "Your index fingertip gives the most stable and accurate touch input. Your fingernail is too small a contact point and produces inconsistent strokes." },
  { title: "Use dark ink colour",         body: "Set ink colour to a dark navy or black (#1a1a2e). Light or coloured ink can look washed out when embedded in a PDF — dark ink is universally readable." },
  { title: "Test in a PDF before sending", body: "After downloading your PNG, use Pixocraft's Add Signature to PDF tool to place it on a test PDF and see how it looks at actual document scale before committing." },
  { title: "Type tab for consistency",    body: "If you need the exact same signature on every document, use the Type tab with a consistent font. The result is pixel-identical every time — no variation from session to session." },
];

export default function MobileSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Mobile Signature Generator Free – Draw Signature on Phone | Pixocraft",
    description: "Draw signature on phone free using mobile signature generator. Create, customize and download instantly. No app, no login, 100% private, GST ready.",
    keywords: "mobile signature generator, draw signature on phone, signature on phone free, create signature on mobile, sign documents on mobile, mobile signature tool, signature on phone",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Mobile Signature Generator – Pixocraft",
    description: "Draw your signature on your phone using your finger. Free mobile signature generator — no app, no login, 100% private. Download as transparent PNG instantly.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                       url: "https://tools.pixocraft.in/" },
    { name: "Tools",                      url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "Mobile Signature Generator", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Mobile Signature Generator Free – Draw Signature on Phone | Pixocraft",
    description: "Draw signature on phone free using mobile signature generator. Create, customize and download instantly. No app, no login, 100% private, GST ready.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create Signature on Mobile Phone Free",
    description: "Use Pixocraft's mobile signature generator to draw your signature with your finger, customise it, and download as a transparent PNG — all in your phone browser in 20 seconds.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
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
          { label: "Home",                 url: "https://tools.pixocraft.in/" },
          { label: "Tools",                url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Mobile Signature Generator" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Mobile Signature Generator Free – Draw Signature on Phone Instantly
              </h1>
              <p className="hidden sm:block text-sm text-muted-foreground">No App · No Login · Works on All Phones · 100% Private</p>
            </div>
          </div>

          <p className="hidden sm:block text-base text-muted-foreground mb-5 leading-relaxed">
            Create your signature directly on your phone using your finger. <strong>No app, no login, instant download.</strong> Works
            on any smartphone in any browser — ready for GST invoices, contracts, and official documents on the go.
          </p>

          {/* Trust bar */}
          <div className="hidden sm:flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />,       label: "Draw Signature in 20 Seconds" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "No App Required" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "Works on All Phones" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "100% Private" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "GST Ready on the Go" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* UX psychology micro-trust */}
          <div className="hidden sm:flex flex-wrap gap-4 mb-6">
            {[
              { icon: <Zap className="h-3.5 w-3.5 text-primary" />,    label: "Works best on mobile" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />, label: "No data stored" },
              { icon: <Users className="h-3.5 w-3.5 text-primary" />,  label: "Used by thousands on phone daily" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                {icon}{label}
              </div>
            ))}
          </div>

          {/* Action flow */}
          <div className="hidden sm:grid grid-cols-4 gap-2 mb-6">
            {[
              { n: 1, label: "Draw on Phone" },
              { n: 2, label: "Customise" },
              { n: 3, label: "Download" },
              { n: 4, label: "Use in PDF" },
            ].map(({ n, label }) => (
              <div key={n} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{n}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <SignatureToolSection />

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* What is Mobile Signature Generator */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What Is a Mobile Signature Generator?</h2>
            <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 mb-5">
              <p className="text-foreground font-medium">
                A mobile signature generator is a browser-based tool that lets you <strong>draw your signature on your phone</strong> using
                your finger — without downloading any app, without creating an account, and without connecting to any server.
                The signature downloads instantly as a transparent PNG, ready to use in PDFs, invoices, and documents.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The phrase <strong>mobile signature generator</strong> describes a tool specifically optimised for smartphone and tablet
              use. Unlike desktop signature makers that require a mouse, mobile signature tools are designed for touch input —
              finger drawing on a capacitive screen, responsive layouts that work on small screens, and touch-friendly controls
              that don't require precise clicking.
            </p>
            <p className="text-muted-foreground mb-4">
              India is a mobile-first country: over 70% of internet users access the web primarily through smartphones. For these
              users, a desktop-oriented signature tool creates unnecessary friction — small canvases, tiny buttons, poor touch
              response, and layouts that require zooming to navigate. Pixocraft's mobile signature generator is built from the
              ground up to feel native on a phone screen.
            </p>
            <p className="text-muted-foreground mb-4">
              The tool supports three input methods: <strong>Draw</strong> (finger or stylus on the touch canvas), <strong>Type</strong>
              (type your name and select from 50+ handwriting fonts — perfect when you need a consistent result), and <strong>Upload</strong>
              (photograph or scan an existing signature and remove the background automatically). All three methods work identically
              on mobile and desktop.
            </p>
            <p className="text-muted-foreground">
              The underlying technology is 100% browser-based — no native app, no server upload, no data stored. Your signature
              is generated and downloaded entirely within your phone's browser using the HTML5 Canvas API. This also means the
              tool works on any modern smartphone regardless of operating system: iOS, Android, HarmonyOS, or any other.
            </p>
          </section>

          {/* How to — featured snippet target */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Create Signature on Mobile — Step by Step</h2>
            <p className="text-muted-foreground mb-5">The complete workflow from opening the tool to downloading your signed signature on your phone:</p>
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
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-draw-cta">
                <Fingerprint className="h-4 w-4" />Draw Signature on Phone<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Core Features */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Mobile-Optimised Features</h2>
            <p className="text-muted-foreground mb-5">Everything in this tool is built specifically for phone and tablet use:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Fingerprint className="h-5 w-5 text-primary" />,  title: "Finger drawing canvas",        desc: "The draw canvas is optimised for touch input — smooth, responsive, and precisely tuned for fingertip strokes on any phone screen size." },
                { icon: <Smartphone className="h-5 w-5 text-primary" />,   title: "Mobile-first layout",          desc: "Large buttons, thumb-friendly controls, and a layout that works perfectly on screens from 4.7 to 6.7 inches without zooming." },
                { icon: <Zap className="h-5 w-5 text-primary" />,          title: "Instant response",             desc: "No server round-trips. Every stroke, colour change, and undo operation happens instantly within your browser — no lag, no waiting." },
                { icon: <Wifi className="h-5 w-5 text-primary" />,         title: "Works offline after load",     desc: "Once the page loads, drawing, font rendering, and PNG export all work without an internet connection. Essential for field use." },
                { icon: <RotateCw className="h-5 w-5 text-primary" />,     title: "Landscape mode support",       desc: "Rotate your phone to landscape for a wider canvas — the tool adapts instantly, giving you more room for your signature." },
                { icon: <Download className="h-5 w-5 text-primary" />,     title: "Direct phone download",       desc: "Tap Download Signature — the PNG saves directly to your phone's Downloads or Photos app, ready to use immediately." },
                { icon: <Shield className="h-5 w-5 text-primary" />,       title: "Zero data storage",           desc: "Your signature is never uploaded to any server. All processing uses HTML5 Canvas API locally in your browser." },
                { icon: <Star className="h-5 w-5 text-primary" />,         title: "50+ handwriting fonts",       desc: "The Type tab lets you generate a perfect, consistent signature from over 50 cursive and script handwriting fonts." },
              ].map(({ icon, title, desc }) => (
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

          {/* Draw vs Type vs Upload on Mobile */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Draw vs Type vs Upload — Which Method for Mobile?</h2>
            <p className="text-muted-foreground mb-5">Each input method has different advantages depending on your situation and phone use case:</p>
            <div className="space-y-3">
              {[
                {
                  tab: "Draw (Recommended for mobile)",
                  color: "bg-primary/5 border-primary/20",
                  when: "When you want a personalised, hand-crafted signature",
                  pros: ["Most natural on touch screen — your finger replaces a pen", "Unique and personal — no two draws are exactly alike", "Fast for users comfortable with touch screen drawing"],
                  cons: ["Requires a steady hand — may take 2–3 attempts for new users", "Less consistent across sessions than the Type method"],
                  tip: "Use landscape mode and draw slowly. Undo individual strokes freely — you don't need to start over.",
                },
                {
                  tab: "Type (Best for consistency)",
                  color: "bg-muted/30",
                  when: "When you need an identical signature every single time",
                  pros: ["Pixel-perfect identical result on every device and session", "No drawing required — ideal if your handwriting is unclear", "50+ handwriting fonts give a professional, authentic look"],
                  cons: ["Less 'personal' than hand-drawn", "Font selection requires scrolling through options"],
                  tip: "Pick a font once and remember it. This gives you the most consistent signature for all your documents.",
                },
                {
                  tab: "Upload (Best for existing signatures)",
                  color: "bg-muted/30",
                  when: "When you already have a signature image you want to use",
                  pros: ["Reuse your existing physical signature digitally", "Automatic background removal — outputs as transparent PNG", "Works with photos taken directly from your phone camera"],
                  cons: ["Quality depends on the source image clarity", "Shaky phone photos may produce blurry output"],
                  tip: "For best quality, photograph your signature on white paper in good lighting. Hold the phone steady directly above the paper.",
                },
              ].map(({ tab, color, when, pros, cons, tip }) => (
                <div key={tab} className={`rounded-xl border p-5 ${color}`}>
                  <p className="font-semibold text-foreground mb-1">{tab}</p>
                  <p className="text-xs text-primary font-medium mb-3">{when}</p>
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

          {/* Mobile vs Desktop comparison */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Mobile Signature Generator vs Desktop Signature Generator</h2>
            <p className="text-muted-foreground mb-5">
              The same tool, optimised for different contexts. Here is a direct comparison to help you decide when to use which:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[440px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Mobile</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Desktop</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {MOBILE_VS_DESKTOP.map(({ feature, mobile, desktop }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 text-primary/80 font-medium">{mobile}</td>
                      <td className="px-3 py-2.5 sm:px-5 sm:py-3.5 text-muted-foreground">{desktop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hidden sm:block text-sm text-muted-foreground">
              In practice, there is no meaningful quality difference between a signature created on mobile vs desktop when using
              the Type tab. For the Draw tab, a mouse on desktop gives marginally higher precision — but most users achieve
              perfectly professional results with finger drawing on mobile after 2–3 attempts. The Type tab eliminates this
              difference entirely.
            </p>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Who Uses Mobile Signature Generator — Real-World Use Cases</h2>
            <p className="text-muted-foreground mb-5">Mobile signature generation is especially valuable for professionals who work away from a desk:</p>
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
            <p className="hidden sm:block text-sm text-muted-foreground">
              The common thread: these users need to sign a document <em>right now</em>, from wherever they are, without returning
              to their desk or waiting for a desktop computer. A mobile signature generator eliminates that dependency entirely.
            </p>
          </section>

          {/* Legal Validity */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Is a Mobile Signature Legally Valid in India?</h2>
            <p className="text-muted-foreground mb-5">
              Yes — the method of creating the signature (phone vs. desktop vs. pen on paper) does not affect its legal validity:
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "IT Act 2000 — Device Neutral",
                  body: "The Information Technology Act 2000 and its 2008 Amendment define electronic signatures by their intent and content — not by the device used to create them. A signature drawn with a finger on a phone and embedded in a PDF has the same legal standing as one drawn with a mouse on a desktop. Both constitute a Simple Electronic Signature (SES) under the Act.",
                },
                {
                  title: "GST Invoice Signing on Mobile",
                  body: "CBIC guidelines for GST invoices require the supplier's signature — they do not specify how the signature must be created or on which device. Drawing your signature on your phone, downloading it, and embedding it into your GST invoice PDF using Pixocraft's Add Signature to PDF tool satisfies the GST signature requirement for manually generated invoices.",
                },
                {
                  title: "Contracts and Agreements",
                  body: "Under the Indian Contract Act 1872, a valid contract requires offer, acceptance, consideration, and intention — not a specific type of signature. A mobile-created electronic signature on a contract PDF is legally enforceable for freelance agreements, client contracts, NDAs, employment letters, and vendor agreements.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <p className="font-semibold text-foreground mb-2 flex items-center gap-2"><BadgeCheck className="h-5 w-5 text-primary" />{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" />Note:</strong>
              For MCA ROC filings, court document submissions, and income tax e-verification, a certified Digital Signature Certificate (DSC) is required regardless of device. Consult a legal professional for high-stakes documents.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Common Mistakes When Drawing Signature on Phone</h2>
            <p className="text-muted-foreground mb-5">These mistakes are the most frequent causes of poor-looking mobile signatures:</p>
            <div className="space-y-3">
              {MISTAKES.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-destructive/10 flex items-center justify-center"><AlertCircle className="h-3 w-3 text-destructive" /></span>
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Pro Tips for Drawing a Perfect Signature on Phone</h2>
            <p className="text-muted-foreground mb-5">Techniques that produce professional-quality results on a smartphone screen:</p>
            <div className="space-y-3">
              {PRO_TIPS.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center"><Check className="h-3 w-3 text-primary" /></span>
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why Pixocraft for Mobile Signature Generation?</h2>
            <p className="text-muted-foreground mb-5">What makes this tool the best choice for phone-based signature creation:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Smartphone className="h-4 w-4 text-primary" />,  title: "Designed for mobile first",    body: "Most signature tools are designed for desktop and adapted for mobile. Pixocraft's tool was built with phone users as the primary audience." },
                { icon: <Zap className="h-4 w-4 text-primary" />,         title: "20-second workflow",           body: "Open → draw → download in under 20 seconds on mobile. No login screen, no upload spinner, no confirmation email." },
                { icon: <Lock className="h-4 w-4 text-primary" />,        title: "Zero data exposure",          body: "No server, no upload, no account. Your signature and all its data stays entirely inside your phone's browser." },
                { icon: <Star className="h-4 w-4 text-primary" />,        title: "No app to install",           body: "No Play Store or App Store download needed. Open the browser, go to the URL, create your signature — done." },
                { icon: <Wifi className="h-4 w-4 text-primary" />,        title: "Works in low connectivity",   body: "After the initial page load, drawing and downloading work without an internet connection — ideal for field use with patchy signal." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />,  title: "India & GST specific",        body: "Built with Indian mobile users in mind. GST invoice workflow, IT Act context, and DSC guidance are all included." },
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
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-why-cta">
                <Fingerprint className="h-4 w-4" />Draw Signature on Phone Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal linking */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Complete Mobile Signature Workflow — Related Tools</h2>
            <p className="text-muted-foreground mb-5">
              Create your signature here, then use these tools to add it to documents — all mobile-optimised, all free:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-for-pdf",                 title: "Signature for PDF",               desc: "Create your signature and insert it into any PDF — complete mobile workflow." },
                { href: "/tools/add-signature-to-pdf",              title: "Add Signature to PDF",            desc: "Upload a PDF and click to place your signature — works on mobile." },
                { href: "/tools/handwritten-signature-generator",   title: "Handwritten Signature Generator", desc: "50+ authentic handwriting fonts — consistent and professional." },
                { href: "/tools/signature-creator",                 title: "Signature Creator",               desc: "Full creative control over your signature design and style." },
                { href: "/tools/esignature-maker",                  title: "eSignature Maker",                desc: "Authority hub for electronic signatures — GST & legal ready." },
                { href: "/tools/digital-signature-generator",       title: "Digital Signature Generator",     desc: "Generate digital signatures for secure document authentication." },
              ].map(({ href, title, desc }) => (
                <Link key={href} href={href}>
                  <div className="flex items-start gap-3 p-4 rounded-xl border bg-card hover-elevate cursor-pointer">
                    <PenTool className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{desc}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 ml-auto mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Frequently Asked Questions — Mobile Signature Generator</h2>
            <p className="text-muted-foreground mb-5">Every question about drawing and using a signature on your phone:</p>
            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-toggle-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="font-semibold text-foreground text-sm pr-4">{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Final CTA */}
          <section className="rounded-xl border bg-primary/5 px-4 py-6 sm:px-6 sm:py-8 text-center">
            <Smartphone className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Draw Your Signature on Your Phone?</h2>
            <p className="text-muted-foreground mb-5 max-w-lg mx-auto text-sm">
              Use your finger, download in 20 seconds, use anywhere. No app, no login, no upload.
              Free forever — on every phone, every browser.
            </p>
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-final-cta">
              <Fingerprint className="h-4 w-4" />Draw Signature on Phone Free<ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
