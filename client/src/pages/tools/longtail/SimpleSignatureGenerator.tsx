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
  ArrowRight, Lock, BadgeCheck, Download,
  Smartphone, Star, PenTool, FileText,
  MousePointer, Clock, Sparkles, Infinity,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/simple-signature-generator";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Open the tool — no setup needed",
    desc: "The signature tool loads instantly in your browser. No account creation, no app installation, no loading screen. It takes only a few seconds to get started.",
  },
  {
    step: 2,
    title: "Draw, type, or upload",
    desc: "Draw your signature with a mouse or finger, type your name to pick a handwriting font, or upload an existing signature photo. No complicated settings — one simple choice.",
  },
  {
    step: 3,
    title: "Adjust style (optional)",
    desc: "Change ink colour or stroke thickness if you want. Everything is pre-set to look great out of the box — beginners can skip this step entirely.",
  },
  {
    step: 4,
    title: "One-click download",
    desc: "Press Download. Your signature saves as a transparent PNG to your device in under a second. No watermark, no account required.",
  },
  {
    step: 5,
    title: "Use it anywhere instantly",
    desc: "Insert the PNG into Word, PDF, Google Docs, or email — it just works. Save it once and reuse across all your documents without coming back.",
  },
];

const FAQS = [
  {
    question: "Is this simple signature generator really free?",
    answer: "Yes — 100% free forever. No subscription, no trial, no watermark, no hidden charges. Create and download as many signatures as you like at zero cost.",
  },
  {
    question: "Do I need to create an account or log in?",
    answer: "No login required at all. Open the page and start creating immediately. We don't collect your email, name, or any personal information.",
  },
  {
    question: "Can I use this simple signature generator on my phone?",
    answer: "Yes. The tool is fully mobile-optimised — draw your signature with your finger on the touchscreen, or type your name and pick a font. Works perfectly on Android and iPhone.",
  },
  {
    question: "How fast can I create a signature?",
    answer: "Most users create and download their signature in under 30 seconds. Type your name, pick a font, and download — it really does take only a few seconds.",
  },
  {
    question: "Will my signature be saved, uploaded, or shared?",
    answer: "Never. Everything runs entirely inside your browser. Your signature data never reaches any server — it is never uploaded, logged, or stored.",
  },
  {
    question: "What file format will I get when I download?",
    answer: "You will get a transparent PNG at 3200×1040 px — high resolution, no white background, ready to place over any document, PDF, or email. No watermark included.",
  },
  {
    question: "Is it hard to use? I am not technical.",
    answer: "Not at all — it was designed for beginners. There are no complicated settings. Choose your method (draw, type, or upload), optionally adjust colour, and click Download. That is it.",
  },
  {
    question: "Can I draw my own signature by hand?",
    answer: "Yes. The Draw tab gives you a smooth canvas — use a mouse on desktop or your finger on mobile. Bezier smoothing makes even quick strokes look natural and professional.",
  },
  {
    question: "Can I just type my name and use it as a signature?",
    answer: "Yes. The Type tab lets you type your name and pick from handwriting-style fonts. You get a clean, consistent signature in seconds without drawing anything.",
  },
  {
    question: "Is a signature from this tool legally valid in India?",
    answer: "Yes, for everyday use. India's IT Act 2000 recognises electronic signatures for contracts, GST invoices, and business documents. For government portals requiring a certified Digital Signature Certificate (DSC), consult a licensed Certifying Authority.",
  },
  {
    question: "How do I add this signature to a PDF or Word document?",
    answer: "Download the transparent PNG, then insert it as an image in Word (Insert → Picture) or in any PDF editor (Adobe Acrobat, Smallpdf, or Pixocraft's Add Signature to PDF tool). Resize to fit and you are done.",
  },
  {
    question: "Can I create more than one signature?",
    answer: "Yes — no limits whatsoever. Create as many signatures as you need, download them all, try different styles, and use each one for different purposes. All free, always.",
  },
];

const FEATURES = [
  { icon: <MousePointer className="h-4 w-4 text-primary" />, title: "No complicated settings",        desc: "Everything is pre-set to look great. Beginners can create a professional signature in one step — just draw, type, or upload, then download." },
  { icon: <Clock className="h-4 w-4 text-primary" />,        title: "Takes only a few seconds",        desc: "Most users are done in under 30 seconds. Open the tool, choose your method, and download — it's that fast." },
  { icon: <Download className="h-4 w-4 text-primary" />,     title: "One-click download",              desc: "A single click saves your transparent PNG to your device — no forms, no email confirmation, no wait." },
  { icon: <Smartphone className="h-4 w-4 text-primary" />,   title: "Works perfectly on mobile",       desc: "Draw with your finger on any touchscreen. Fully responsive — the same simple experience on phone, tablet, or desktop." },
  { icon: <Lock className="h-4 w-4 text-primary" />,         title: "No login, no signup, no email",   desc: "Open the page and start immediately. We ask for nothing — no account, no email, no personal details." },
  { icon: <Shield className="h-4 w-4 text-primary" />,       title: "100% private, browser only",      desc: "Your signature is created and stored only on your device. Nothing is ever uploaded or saved on any server." },
  { icon: <Sparkles className="h-4 w-4 text-primary" />,     title: "Transparent PNG, no watermark",   desc: "Download at 3200×1040 px — high resolution, no background, no watermark. Ready to use in any document instantly." },
  { icon: <Infinity className="h-4 w-4 text-primary" />,     title: "Unlimited, free forever",         desc: "No daily limits, no credit system, no paid tier. Create and download as many signatures as you need, always free." },
];

const RELATED_TOOLS = [
  { href: "/tools/signature-maker",                          label: "Full Signature Maker",               desc: "Advanced controls — colour, stroke, 50+ fonts — for power users." },
  { href: "/tools/free-signature-generator-no-login",        label: "No-Login Signature Generator",       desc: "Emphasises zero-signup, privacy-first creation." },
  { href: "/tools/online-signature-generator-without-upload", label: "Signature Without Upload",          desc: "Fully client-side — no data leaves your device in any form." },
  { href: "/tools/transparent-signature-png",                label: "Transparent Signature PNG",          desc: "Download a clean PNG with no background for any document." },
  { href: "/tools/add-signature-to-pdf",                     label: "Add Signature to PDF",               desc: "Place your transparent PNG directly into any PDF." },
  { href: "/tools/email-signature-maker",                    label: "Email Signature Maker",              desc: "Professional email footer with your signature and contact details." },
];

export default function SimpleSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Simple Signature Generator Online Free – Easy, Fast | Pixocraft",
    description:
      "Simple signature generator online — free, no login, no complicated settings. Create your signature in seconds. One-click download, works on mobile. 100% private.",
    keywords:
      "simple signature generator, simple signature maker online, simple online signature generator, easy signature generator, simple signature creator, signature generator easy, quick signature maker, signature in seconds, beginner signature generator, simple digital signature maker",
    canonicalUrl: CANONICAL,
    ogImage: "https://tools.pixocraft.in/images/simple-signature-generator.png",
    ogTitle: "Simple Signature Generator – Free & Easy",
    ogDescription: "Create a signature in seconds — no login, no complicated settings, one-click download. Works on mobile.",
    twitterTitle: "Simple Signature Generator Free",
    twitterDescription: "Create your signature online in seconds. No login. No complicated settings. One-click download.",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Simple Signature Generator – Pixocraft",
    description:
      "Simple online signature generator — create a professional signature in seconds. No login, no complicated settings. Draw, type or upload, one-click download. Free forever.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    applicationSubCategory: "Simple Signature Generator",
    operatingSystem: "Web, iOS, Android",
    featureList: [
      "Easy to use",
      "No login required",
      "Instant download",
      "Beginner friendly",
      "Works on mobile",
      "One-click download",
      "No complicated settings",
      "Transparent PNG output",
      "100% private",
    ],
    offers: { price: "0", priceCurrency: "INR" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                       url: "https://tools.pixocraft.in/" },
    { name: "Tools",                      url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools",            url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "Simple Signature Generator", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Simple Signature Generator Online Free – Easy, Fast | Pixocraft",
    description:
      "Simple signature generator online — free, no login, no complicated settings. Create your signature in seconds. One-click download, works on mobile. 100% private.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Signature in Seconds – Simple Guide",
    description:
      "Create and download a signature online in under 30 seconds with no login, no complicated settings, and one-click download.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.desc })),
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
          { label: "Home",                 url: "https://tools.pixocraft.in/" },
          { label: "Tools",                url: "/tools" },
          { label: "Signature Tools",      url: "/tools/signature-tools" },
          { label: "Simple Signature Generator" },
        ]} />

        {/* HERO */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Simple Signature Generator Online – Create in Seconds
              </h1>
              <p className="text-sm text-muted-foreground">100% Free · No Login · No Complicated Settings · One-Click Download · Works on Mobile</p>
            </div>
          </div>

          <p className="hidden sm:block text-base text-muted-foreground mb-5 leading-relaxed">
            The simplest way to create a signature online — <strong>no complicated settings</strong>, no account, and no
            waiting. Draw with your finger or mouse, type your name, or upload an existing signature. It{" "}
            <strong>takes only a few seconds</strong>, and <strong>one-click download</strong> saves it straight to your
            device as a high-resolution transparent PNG. Beginner friendly, mobile ready, and 100% private.
          </p>

          <div className="hidden sm:flex flex-wrap gap-2 mb-6">
            {[
              { icon: <Star className="h-3.5 w-3.5" />,        label: "100% Free" },
              { icon: <Clock className="h-3.5 w-3.5" />,       label: "Done in Seconds" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Login" },
              { icon: <Smartphone className="h-3.5 w-3.5" />,  label: "Mobile Friendly" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />,  label: "No Watermark" },
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-1.5 text-xs font-medium bg-primary/8 text-primary px-3 py-1.5 rounded-full">
                {b.icon}{b.label}
              </div>
            ))}
          </div>
        </div>

        {/* TOOL */}
        <div className="mb-3 sm:mb-10">
          <SignatureToolSection />
        </div>

        {/* HOW TO */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">How to Create Your Signature in Seconds</h2>
          <p className="text-muted-foreground mb-5 text-sm">
            No tutorials needed. This is genuinely simple — most beginners are done in under 30 seconds.
          </p>
          <div className="space-y-3">
            {HOW_TO_STEPS.map((s) => (
              <div key={s.step} className="flex gap-4 rounded-xl border bg-card p-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary font-bold text-sm flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{s.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why This Is the Simplest Signature Generator</h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Built for people who just need a signature — fast. No complications, no learning curve.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border bg-card p-4 flex gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{f.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT IS */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">What Is a Simple Signature Generator?</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 mb-5">
            <p className="text-foreground font-medium">
              A <strong>simple signature generator</strong> is an online tool that lets you create a professional
              signature with the minimum possible steps — no complicated settings, no design skills, and no prior
              experience needed. You open the page, make a few choices, and download. That's it.
            </p>
          </div>
          <img
            src="https://tools.pixocraft.in/images/simple-signature-generator-example.png"
            alt="Simple signature maker online free easy example for beginners"
            loading="lazy"
            width={600}
            height={300}
            className="w-full rounded-xl border mb-5 object-cover"
          />
          <p className="text-muted-foreground mb-4">
            Unlike full-featured signature software with dozens of options, a simple generator strips everything down
            to what matters: <strong>draw</strong> (or type, or upload), and <strong>download</strong>. The result is
            a high-resolution transparent PNG that works in any document, email, or PDF — no Photoshop, no learning
            curve, no account.
          </p>
          <p className="text-muted-foreground mb-4">
            This tool is particularly popular with students, freelancers, and small business owners in India who need
            a quick signature for GST invoices, contracts, or forms — and want it done in a few seconds without any
            fuss. The entire experience is browser-based, so nothing is saved or uploaded anywhere.
          </p>
          <p className="text-muted-foreground">
            If you want a more advanced version with 50+ fonts, stroke controls, and style presets, try our{" "}
            <Link href="/tools/signature-maker" className="text-primary underline underline-offset-2">
              full signature maker
            </Link>
            . For a zero-login quick version, see the{" "}
            <Link href="/tools/free-signature-generator-no-login" className="text-primary underline underline-offset-2">
              no-login signature generator
            </Link>
            .
          </p>
        </section>

        {/* SIMPLE UX SIGNALS SECTION */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Designed to Be as Simple as Possible</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <MousePointer className="h-5 w-5 text-primary" />, title: "No complicated settings", desc: "Everything works out of the box. No configuration, no preferences to set, no tutorials to read." },
              { icon: <Clock className="h-5 w-5 text-primary" />,        title: "Takes only a few seconds", desc: "Type your name, pick a style, click Download. Most users are done in 15–30 seconds." },
              { icon: <Download className="h-5 w-5 text-primary" />,     title: "One-click download",       desc: "No forms, no email, no confirmation step. One button — and your signature is on your device." },
            ].map((c) => (
              <div key={c.title} className="rounded-xl border bg-card p-5 text-center">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  {c.icon}
                </div>
                <p className="font-semibold text-foreground text-sm mb-2">{c.title}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WHO IS THIS FOR */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">Who Is This For?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: <PenTool className="h-4 w-4 text-primary" />,   title: "Beginners",            desc: "First time creating a digital signature? This is the best starting point — no learning curve." },
              { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Mobile users",         desc: "Create directly on your phone with your finger. No desktop needed, no app to install." },
              { icon: <FileText className="h-4 w-4 text-primary" />,   title: "Students",             desc: "Sign assignment submissions, admission forms, and bonafide letters in seconds." },
              { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Small businesses",     desc: "Add a signature to GST invoices, purchase orders, and vendor agreements quickly." },
              { icon: <Zap className="h-4 w-4 text-primary" />,        title: "Freelancers",          desc: "Sign client contracts and invoices without a subscription to expensive e-sign software." },
              { icon: <Shield className="h-4 w-4 text-primary" />,     title: "Privacy-conscious",    desc: "Nothing is uploaded or stored. Your signature is created and stays entirely on your device." },
            ].map((u) => (
              <div key={u.title} className="flex gap-3 rounded-xl border bg-card p-4">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">{u.icon}</div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-0.5">{u.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRIVACY */}
        <section className="mb-10 rounded-xl border bg-card p-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Your Signature Stays on Your Device</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Everything runs inside your browser using the HTML5 Canvas API. When you draw, type, or upload your
                signature, that data never leaves your device — it is never sent to a server, never stored in a
                database, and never shared with anyone. Even our own team cannot see what you create.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: <Check className="h-3.5 w-3.5" />, label: "No server upload" },
                  { icon: <Check className="h-3.5 w-3.5" />, label: "No data storage" },
                  { icon: <Check className="h-3.5 w-3.5" />, label: "No account needed" },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">{p.icon}</span>{p.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-5 text-sm">Quick answers to beginner questions about this simple signature generator.</p>
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border bg-card overflow-hidden">
                <button
                  data-testid={`faq-toggle-${i}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span className="font-medium text-foreground text-sm">{faq.question}</span>
                  {openFaq === i
                    ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* INTERNAL LINKS */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Related Signature Tools</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Looking for more options? If you want a more advanced version with full customisation controls, try our{" "}
            <Link href="/tools/signature-maker" className="text-primary underline underline-offset-2">main signature maker</Link>
            . For maximum privacy with zero data leaving your device, use the{" "}
            <Link href="/tools/online-signature-generator-without-upload" className="text-primary underline underline-offset-2">signature generator without upload</Link>
            .
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RELATED_TOOLS.map((t) => (
              <Link key={t.href} href={t.href}>
                <div
                  data-testid={`link-related-${t.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="flex items-start gap-3 rounded-xl border bg-card p-4 hover-elevate cursor-pointer"
                >
                  <ArrowRight className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-foreground text-sm">{t.label}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-xl border bg-card p-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Ready? It Only Takes a Few Seconds</h2>
          <p className="text-muted-foreground text-sm mb-4">
            No login, no complicated settings, one-click download. Scroll up and create your signature now.
          </p>
          <Button
            data-testid="button-scroll-to-tool"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Create My Signature <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </section>

      </div>
    </>
  );
}
