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
  PenTool,
  Shield,
  Zap,
  Smartphone,
  Star,
  Download,
  Check,
  FileText,
  Mail,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  Image as ImageIcon,
  Pencil,
  Palette,
  Sliders,
  BadgeCheck,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-maker";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";
const LAST_UPDATED = "March 18, 2026";

const FAQS = [
  {
    question: "Is this signature maker free?",
    answer: "Yes — completely free, always. No subscription, no watermark, no trial period. Create and download unlimited signatures at no cost.",
  },
  {
    question: "Is my signature stored or shared anywhere?",
    answer: "Never. This signature maker runs entirely inside your browser. Nothing is uploaded, logged, or stored — your design never reaches any server.",
  },
  {
    question: "Are signatures made here legally valid?",
    answer: "Yes, for most everyday purposes. Under India's IT Act 2000, electronic signatures are legally recognised for contracts, GST invoices, and business documents. For government portal submissions requiring a certified DSC, consult an authorised Certifying Authority.",
  },
  {
    question: "Can I use this signature maker on a mobile phone?",
    answer: "Yes. The Draw tab is fully touch-optimised for smartphones and tablets. Type and Upload also work perfectly on any modern mobile browser.",
  },
  {
    question: "What file formats can I download?",
    answer: "Transparent PNG (ideal for any document background) or white-background JPG. Both are exported at 3200×1040 px — high-resolution and print-ready.",
  },
  {
    question: "Can I fully customise my signature?",
    answer: "Yes. In Draw mode, adjust ink colour and stroke thickness. In Type mode, choose from 50+ handwritten fonts and customise ink colour. In Upload mode, strip the white background from any existing signature image.",
  },
  {
    question: "What's the difference between a signature maker and a signature generator?",
    answer: "A signature generator focuses on speed — type your name and download instantly. A signature maker implies deeper creative control — adjusting style, colour, thickness, and font. Pixocraft gives you both: quick generation and full customisation in one tool.",
  },
  {
    question: "How do I add my signature to a PDF?",
    answer: "Download the transparent PNG, then open your PDF in Adobe Acrobat, Smallpdf, or Pixocraft's PDF tools. Use Insert → Image to place your signature over the signature field and resize as needed.",
  },
  {
    question: "How many fonts does the Type tab include?",
    answer: "Over 50 handwritten Google Fonts across 7 style categories: ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker textures, airy light fonts, and formal calligraphy.",
  },
  {
    question: "Can I remove the background from my uploaded signature?",
    answer: "Yes. Switch to the Upload tab, upload your PNG or JPG, then click 'Remove White Background'. The tool uses pixel threshold analysis to make white and near-white areas fully transparent.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Choose your method", description: "Select Draw to sketch freehand, Type to browse 50+ calligraphic fonts, or Upload to digitise an existing signature and remove its background." },
  { step: 2, title: "Customise it", description: "Adjust ink colour and stroke width for drawing, pick a font and colour for typing, or refine an uploaded image. Full creative control — no limits." },
  { step: 3, title: "Preview", description: "Click Preview to see your signature on a realistic document mockup and email footer — so you know exactly how it will appear before you download." },
  { step: 4, title: "Download instantly", description: "Save as transparent PNG or JPG — no watermark, no login, no wait. High-resolution and ready to paste into any document or platform." },
];

const FEATURES = [
  { icon: <PenTool className="h-4 w-4 text-primary" />,    title: "Smooth freehand drawing",        desc: "Bezier curve smoothing makes every drawn stroke look natural and fluid — on mouse or touchscreen." },
  { icon: <Pencil className="h-4 w-4 text-primary" />,     title: "50+ handwritten fonts",           desc: "Instantly preview your name in a curated library of calligraphic and casual fonts across 7 style categories." },
  { icon: <ImageIcon className="h-4 w-4 text-primary" />,  title: "Upload & background removal",     desc: "Upload a photo of your pen-and-paper signature and strip the white background automatically with one click." },
  { icon: <Sliders className="h-4 w-4 text-primary" />,    title: "Full customisation panel",        desc: "Control ink colour with a full colour picker, adjust stroke thickness, and fine-tune every detail of your signature." },
  { icon: <Download className="h-4 w-4 text-primary" />,   title: "High-res transparent PNG",        desc: "Exports at 3200×1040 px — four times screen resolution. Crisp at any size, zero watermark, fully print-ready." },
  { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private, zero uploads",      desc: "Everything runs locally in your browser. Your signature never touches a server — complete privacy." },
  { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile & touch optimised",        desc: "Single-finger drawing on any smartphone or tablet in any modern browser — iOS and Android." },
  { icon: <Palette className="h-4 w-4 text-primary" />,    title: "Style presets for quick starts",  desc: "Jump-start with Minimal, Bold, Elegant, or Business presets — then refine to make it uniquely yours." },
];

const STYLE_PRESETS = [
  { label: "Minimal",  font: "Satisfy",       desc: "Clean, understated — modern professionals and tech users." },
  { label: "Bold",     font: "Pacifico",      desc: "Strong, confident — business owners and executives." },
  { label: "Elegant",  font: "Great Vibes",   desc: "Flowing, refined — formal documents and creative brands." },
  { label: "Business", font: "Pinyon Script", desc: "Classic, trustworthy — contracts, invoices, and corporate use." },
];

export default function SignatureMaker() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  useSEO({
    title: "Signature Maker Online Free – Draw, Type & Customize | Pixocraft",
    description:
      "Best free signature maker online. Create and customize signatures with full control. Draw, type or upload. Instant PNG download. No signup.",
    keywords:
      "signature maker, signature maker online free, create signature online, signature maker with fonts, online signature maker, free signature maker, signature creator, custom signature maker, handwritten signature maker, signature maker India",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Signature Maker – Pixocraft",
    description:
      "Free signature maker online with full creative control. Draw, type, or upload your signature with custom colours, fonts, and stroke width. Download as transparent PNG instantly. No signup required.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",               url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "Signature Maker",    url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Signature Maker Online Free – Draw, Type & Customize | Pixocraft",
    description:
      "Best free signature maker online. Create and customize signatures with full control. Draw, type or upload. Instant PNG download. No signup.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Make Your Signature Online",
    description:
      "Use Pixocraft's free signature maker to draw, type, or upload a signature with full customisation and download it in under 60 seconds.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-5 sm:py-8">

        <Breadcrumb items={[
          { label: "Home",               url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Maker" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sliders className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Signature Maker Online – Full Creative Control
              </h1>
              <p className="text-sm text-muted-foreground">Free · 50+ Fonts · Custom Colours · No Signup · 100% Private</p>
            </div>
          </div>

          <p className="hidden sm:block text-base text-muted-foreground mb-5 leading-relaxed">
            The most customisable <strong>signature maker online</strong> — free, private, and built for anyone who
            wants more than just a quick download. <strong>Draw</strong> freehand with precise stroke control,{" "}
            <strong>type</strong> your name across 50+ premium calligraphic fonts, or <strong>upload</strong> an
            existing signature and remove the background with one click. Adjust every detail — colour, thickness,
            style — then download a crisp transparent PNG instantly. No account, no watermark, no cost.
          </p>

          <div className="hidden sm:flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Star className="h-3.5 w-3.5" />,       label: "Free Signature Maker" },
              { icon: <Sliders className="h-3.5 w-3.5" />,    label: "Full Customisation" },
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "100% Private" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Mobile Friendly" },
              { icon: <span className="text-[9px] font-bold leading-none">IN</span>, label: "Made in India" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            Start creating your signature instantly using the tool below. No signup required.
          </p>
        </div>

        {/* ── TOOL ───────────────────────────────────────────────────────── */}
        <SignatureToolSection />

        {/* ── SEO CONTENT ────────────────────────────────────────────────── */}
        <div className="space-y-8 sm:space-y-16 text-base leading-relaxed">

          {/* Features */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-5">Powerful Features of Pixocraft Signature Maker</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {FEATURES.map(({ icon, title, desc }) => (
                <div key={title} className="flex gap-3 p-3 sm:p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How to use */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Make Your Signature Online</h2>
            <p className="text-muted-foreground mb-5">Four steps. Under 60 seconds. Full creative control throughout.</p>
            <ol className="space-y-3">
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
          </section>

          {/* Draw vs Type vs Upload */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Draw vs Type vs Upload in Signature Maker</h2>
            <p className="text-muted-foreground mb-5">Each method gives you different levels of creative control — pick the one that fits your goal:</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  method: "Draw",
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  tagline: "Maximum personal control",
                  body: "Sketch freehand with adjustable stroke width and any colour. The result is uniquely yours — no two drawn signatures look the same. Best for a truly personal, one-of-a-kind mark.",
                },
                {
                  method: "Type",
                  icon: <Pencil className="h-5 w-5 text-primary" />,
                  tagline: "Font + colour control",
                  body: "Type your name and browse 50+ calligraphic fonts. Choose any ink colour and preview all styles instantly. Consistent across every download — great for GST invoices and email footers.",
                },
                {
                  method: "Upload",
                  icon: <ImageIcon className="h-5 w-5 text-primary" />,
                  tagline: "Refine existing signature",
                  body: "Upload a photo or scan of your existing signature and strip the white background in one click. You keep your familiar mark — perfectly digitised and ready to use anywhere.",
                },
              ].map(({ method, icon, tagline, body }) => (
                <div key={method} className="rounded-xl border bg-card p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
                    <div>
                      <p className="font-bold text-foreground">{method}</p>
                      <p className="text-xs text-primary font-medium">{tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Maker vs Generator */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Signature Maker vs Signature Generator</h2>
            <p className="text-muted-foreground mb-5">
              People use these terms interchangeably, but there's a meaningful difference in what each implies:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                {
                  title: "Signature Generator",
                  icon: <Zap className="h-5 w-5 text-primary" />,
                  tagline: "Speed-first",
                  body: "Type your name, pick a font, download. Optimised for getting a usable signature as fast as possible with minimal decisions. Great for one-off use.",
                },
                {
                  title: "Signature Maker",
                  icon: <Sliders className="h-5 w-5 text-primary" />,
                  tagline: "Control-first",
                  body: "Full creative ownership — choose your method, adjust every parameter, preview on real documents, then download. Designed for users who want their signature to truly represent them.",
                },
                {
                  title: "Pixocraft — Both",
                  icon: <Star className="h-5 w-5 text-primary" />,
                  tagline: "Best of both worlds",
                  body: "Pixocraft is simultaneously the fastest signature generator and the most fully-featured signature maker online. Quick if you want quick. Deep if you want control.",
                },
              ].map(({ title, icon, tagline, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{icon}</div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{title}</p>
                      <p className="text-xs text-primary font-medium">{tagline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Try Signature Styles */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Try Signature Styles Instantly</h2>
            <p className="text-muted-foreground mb-5">
              Not sure where to start? Jump in with one of four curated style presets — each optimised for a different context and personality. Switch to the Type tab above, type your name, then browse the font matching each style:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {STYLE_PRESETS.map(({ label, font, desc }) => (
                <button
                  key={label}
                  onClick={() => {
                    setActivePreset(activePreset === label ? null : label);
                    document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  data-testid={`button-preset-${label.toLowerCase()}`}
                  className={`rounded-xl border p-4 text-left space-y-2 transition-colors cursor-pointer ${activePreset === label ? "border-primary bg-primary/5" : "bg-card hover-elevate"}`}
                >
                  <p
                    style={{ fontFamily: `'${font}', cursive`, fontSize: "1.5rem", lineHeight: 1.2 }}
                    className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis"
                  >
                    {label}
                  </p>
                  <p className="text-xs font-semibold text-primary">{label} Style</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Click any style to scroll to the tool and try it. Switch fonts freely — all 50+ are available instantly at no cost.
            </p>
          </section>

          {/* Signature examples */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Signature Examples &amp; Creative Inspiration</h2>
            <p className="text-muted-foreground mb-5">
              Great signatures balance personality and legibility. This free <strong>signature maker</strong> gives you the fonts and tools to find that balance — whether you want an ultra-formal script for legal documents, a clean modern style for business emails, or a casual flow for personal notes. Here are six live-rendered examples across the style range:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Minimal & Modern",     font: "Satisfy",        name: "Alex Johnson",  note: "Effortlessly clean — suits tech professionals, freelancers, and modern brands." },
                { label: "Bold & Confident",     font: "Pacifico",       name: "Chris Kumar",   note: "Commanding presence — ideal for business owners, executives, and GST invoices." },
                { label: "Elegant Script",       font: "Great Vibes",    name: "Priya Sharma",  note: "Flowing and refined — perfect for formal contracts, legal docs, and creative brands." },
                { label: "Classic Business",     font: "Pinyon Script",  name: "Rahul Mehta",   note: "Traditional cursive — trusted for NDAs, agreements, and corporate correspondence." },
                { label: "Casual & Personal",    font: "Caveat",         name: "Sam Verma",     note: "Natural handwriting feel — great for personal letters and informal approvals." },
                { label: "Formal Calligraphy",   font: "Norican",        name: "Dr. A. Nair",   note: "Authoritative and distinguished — suited for academic and official use." },
              ].map(({ label, font, name, note }) => (
                <div key={label} className="rounded-xl border bg-card p-5 space-y-2">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                  <p style={{ fontFamily: `'${font}', cursive`, fontSize: "2rem", lineHeight: 1.2 }} className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis">
                    {name}
                  </p>
                  <p className="text-sm text-muted-foreground">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Where You Can Use Your Signature</h2>
            <p className="text-muted-foreground mb-5">Your downloaded transparent PNG works anywhere a handwritten signature would be expected:</p>
            <div className="space-y-3">
              {[
                {
                  icon: <FileText className="h-5 w-5 text-primary" />,
                  title: "GST Invoices & E-way Bills",
                  body: (<>Insert your signature PNG into Tally, Zoho Books, or any billing software. Accepted by most Indian GST portals as a visual authorisation mark. Pair with{" "}<Link href="/tools/image-to-pdf" className="text-primary hover:underline underline-offset-2 font-medium">Image to PDF</Link>{" "}for a complete signed document workflow.</>),
                },
                {
                  icon: <FileText className="h-5 w-5 text-primary" />,
                  title: "Contracts, NDAs & Offer Letters",
                  body: (<>Paste your PNG signature into Word or Google Docs, then{" "}<Link href="/tools/pdf-merger" className="text-primary hover:underline underline-offset-2 font-medium">merge or convert to PDF</Link>{" "}for a clean, professional final file ready for client delivery.</>),
                },
                {
                  icon: <Mail className="h-5 w-5 text-primary" />,
                  title: "Email Footers (Gmail & Outlook)",
                  body: "In Gmail: Settings → Signature → Insert image → upload PNG. In Outlook: File → Options → Mail → Signatures → insert picture. Keep height at 60–80 px for a polished, consistent professional look.",
                },
                {
                  icon: <FileText className="h-5 w-5 text-primary" />,
                  title: "Business Documents & Proposals",
                  body: "Proposals, quotes, purchase orders, and approval documents — a signature from this maker adds instant professionalism and speeds up client sign-off without requiring any additional software.",
                },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Legal */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Is This Signature Legal?</h2>
            <p className="text-muted-foreground mb-5">
              Yes — for the vast majority of everyday business use in India and internationally.
            </p>
            <div className="space-y-4 mb-5">
              {[
                {
                  flag: "🇮🇳", title: "India – IT Act 2000",
                  body: "Section 5 grants electronic signatures the same legal validity as handwritten signatures for contracts, GST invoices, and general commercial agreements. The IT (Amendment) Act 2008 further strengthened this framework.",
                },
                {
                  flag: "🌐", title: "Global Acceptance",
                  body: "US ESIGN Act, EU eIDAS (as a Simple Electronic Signature), and UK Electronic Communications Act 2000 all recognise image-based electronic signatures for most private and commercial agreements.",
                },
              ].map(({ flag, title, body }) => (
                <div key={title} className="flex gap-3 p-4 sm:p-5 rounded-xl border bg-card">
                  <div className="shrink-0 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">{flag} {title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong>Note:</strong> For MCA ROC filings, court submissions, income tax portal DSC verification, or property registration, a certified Digital Signature Certificate (DSC) from a licensed CA is required. Consult a legal professional for high-stakes transactions.
            </div>
          </section>

          {/* Pro tips */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Pro Tips for a Better Signature</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { tip: "Match ink colour to your document context",    detail: "Black or dark navy for legal and corporate docs; a brand colour for proposals and creative client work." },
                { tip: "Set Draw stroke to 3–4 px",                  detail: "Thin strokes vanish when scaled down. 3–4 px stays crisp whether the signature is 200 px or 2000 px wide." },
                { tip: "Always download as transparent PNG",           detail: "A transparent background ensures your signature sits cleanly on any document colour, letterhead, or invoice template." },
                { tip: "Preview at real document size first",          detail: "Most PDF signature fields are 60–100 px tall. Check the Preview mockup at that scale before finalising." },
                { tip: "Save a master high-res copy",                 detail: "Store your 3200×1040 px PNG securely. You'll reuse it across dozens of contracts, emails, and forms." },
                { tip: "Use style presets to find your baseline fast", detail: "Start with Minimal, Bold, Elegant, or Business presets, then fine-tune font and colour to make it truly yours." },
                { tip: "For email footers, keep it under 80 px tall",  detail: "Oversized email signatures look unprofessional. Download your PNG and resize to 60–80 px height in your email client." },
              ].map(({ tip, detail }) => (
                <div key={tip} className="rounded-xl border bg-card p-4 space-y-1.5">
                  <p className="font-semibold text-foreground text-sm flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />{tip}
                  </p>
                  <p className="text-sm text-muted-foreground pl-6">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why Pixocraft is the Best Signature Maker</h2>
            <p className="text-muted-foreground mb-5">
              Most signature tools online are either too basic or too locked behind paywalls. Pixocraft gives you everything — free, private, and without compromise:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Star className="h-4 w-4 text-primary" />,        title: "Free — no strings attached",    body: "Unlimited signatures, all fonts, transparent PNG, no watermark. Free for individuals, freelancers, and businesses." },
                { icon: <Shield className="h-4 w-4 text-primary" />,      title: "Zero data retention",           body: "100% browser-based. Your signature never touches a server — the most private signature maker available." },
                { icon: <Sliders className="h-4 w-4 text-primary" />,     title: "Full creative control",         body: "Colour picker, stroke width, 50+ fonts, background removal — more customisation options than paid tools." },
                { icon: <Download className="h-4 w-4 text-primary" />,    title: "Print-quality output",          body: "3200×1040 px transparent PNG — sharper than screen resolution, ready for print, PDF, and web." },
                { icon: <Zap className="h-4 w-4 text-primary" />,         title: "No signup, instant access",     body: "Open the page, create, download. No registration, no email, no waiting. The fastest path to a signature." },
                { icon: <Globe className="h-4 w-4 text-primary" />,       title: "India-first, built to last",    body: "Designed with Indian GST, contract, and HR workflows in mind. Privacy-first, made in India." },
              ].map(({ icon, title, body }) => (
                <div key={title} className="flex gap-3 p-3 sm:p-4 rounded-xl border bg-card">
                  <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related tools / cluster links */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Related Signature Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-pad-tool",      title: "Signature Generator (Main Tool)",      desc: "The full-featured tool with all options, undo/redo, and advanced controls." },
                { href: "/tools/online-signature-generator",    title: "Online Signature Generator",            desc: "Create any signature online — fast and free, directly in your browser." },
                { href: "/tools/free-signature-generator",      title: "Free Signature Generator",              desc: "Emphasis on free — no cost, no watermark, unlimited downloads." },
                { href: "/tools/digital-signature-generator",   title: "Digital Signature Generator",           desc: "India IT Act 2000 ready — for GST, contracts, and business documents." },
                { href: "/tools/pdf-merger",              title: "PDF Merger",                            desc: "Merge signed PDFs into one clean, professional file." },
                { href: "/tools/image-to-pdf",            title: "Image to PDF Converter",                desc: "Convert your signed document into a professional PDF instantly." },
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
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left font-semibold text-foreground text-sm cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-maker-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed" data-testid={`faq-maker-answer-${i}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* EEAT */}
          <section className="rounded-xl border bg-muted/30 p-6 text-sm text-muted-foreground space-y-1">
            <p><strong className="text-foreground">Author:</strong> Pixocraft Team</p>
            <p><strong className="text-foreground">Last Updated:</strong> {LAST_UPDATED}</p>
            <p><strong className="text-foreground">Made in India</strong> — Privacy-first tools for everyone. Your data never leaves your browser.</p>
            <p className="pt-1">
              Questions?{" "}
              <Link href="/contact" className="text-primary hover:underline underline-offset-2">Contact us</Link>{" "}
              or read our{" "}
              <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </section>

        </div>
      </div>

      {/* ── STICKY CTA ─────────────────────────────────────────────────────── */}
      <div className="sticky bottom-0 z-50 w-full border-t bg-background/95 backdrop-blur-sm py-3 px-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="text-sm">
          <p className="font-semibold text-foreground">Make Your Signature Now — Free</p>
          <p className="text-xs text-muted-foreground">Full customisation · No signup · No watermark · Private</p>
        </div>
        <Button
          size="default"
          onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
          data-testid="button-maker-sticky-cta"
        >
          <Download className="mr-2 h-4 w-4" />
          Create &amp; Download Free
        </Button>
      </div>
    </>
  );
}
