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
  Shield, Zap, Check, FileText, ChevronDown, ChevronUp,
  ArrowRight, Lock, AlertCircle, BadgeCheck, Download,
  Smartphone, Star, PenTool, Mail, Monitor, Globe,
  Settings, RefreshCw, ImageIcon, Users, Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/how-to-add-signature-in-gmail";

const DESKTOP_STEPS = [
  { step: 1, title: "Open Gmail", desc: "Go to mail.google.com in your browser and sign in to your account." },
  { step: 2, title: "Click Settings (gear icon)", desc: "Find the gear icon (⚙) in the top-right corner of the Gmail interface and click it." },
  { step: 3, title: 'Click "See all settings"', desc: 'In the quick settings panel that appears, click "See all settings" to open the full settings page.' },
  { step: 4, title: "Scroll to Signature section", desc: 'In the "General" tab, scroll down until you find the "Signature" section.' },
  { step: 5, title: 'Click "Create new"', desc: 'Click the "+ Create new" button, give your signature a name (e.g., "Professional"), and click Create.' },
  { step: 6, title: "Add text or upload image", desc: "Type your name, title, and contact details in the signature editor. To add an image signature, click the Insert Image icon, upload your PNG file, and resize it." },
  { step: 7, title: "Save changes", desc: 'Scroll to the bottom of the settings page and click "Save Changes". Your signature will now appear automatically on new emails.' },
];

const MOBILE_STEPS_ANDROID = [
  { step: 1, title: "Open Gmail app", desc: "Launch the Gmail app on your Android device." },
  { step: 2, title: "Tap the menu (☰)", desc: "Tap the three-line menu icon in the top-left corner." },
  { step: 3, title: "Go to Settings", desc: "Scroll to the bottom and tap Settings." },
  { step: 4, title: "Select your account", desc: "Tap the Gmail account you want to configure." },
  { step: 5, title: 'Tap "Mobile Signature"', desc: 'Scroll down and tap "Mobile Signature" (or "Signature" depending on your app version).' },
  { step: 6, title: "Add signature text", desc: "Type your name, job title, phone number, or any text you want to appear below your emails." },
  { step: 7, title: "Tap OK to save", desc: "Tap OK or the back button to save. Your signature will now appear on emails sent from the Android app." },
];

const MOBILE_STEPS_IOS = [
  { step: 1, title: "Open Gmail app", desc: "Launch the Gmail app on your iPhone or iPad." },
  { step: 2, title: "Tap your profile picture", desc: "Tap your profile photo or initial in the top-right corner." },
  { step: 3, title: "Tap Manage your Google Account", desc: "This opens your account settings." },
  { step: 4, title: "Go to Gmail Settings", desc: "Return to Gmail, tap the menu icon (☰), scroll down and tap Settings." },
  { step: 5, title: "Select your account", desc: "Tap the account you want to update." },
  { step: 6, title: 'Tap "Signature Settings"', desc: 'Tap "Signature Settings" and enable the Mobile Signature toggle.' },
  { step: 7, title: "Type your signature and save", desc: "Enter your desired signature text and tap the back arrow to save automatically." },
];

const TOOL_STEPS = [
  { step: 1, title: "Open Pixocraft tool", desc: "Scroll up to use the free signature tool on this page — no account needed." },
  { step: 2, title: "Draw or type your signature", desc: "Use the Draw tab for a handwritten signature or the Type tab for a styled text signature." },
  { step: 3, title: "Customise style", desc: "Adjust colour, thickness, and font until your signature matches your brand." },
  { step: 4, title: "Download as PNG", desc: "Click Download to save a high-resolution transparent PNG of your signature to your device." },
  { step: 5, title: "Upload to Gmail", desc: "In Gmail Settings → Signature editor, click the Insert Image icon and upload the saved PNG file." },
];

const FAQS = [
  {
    question: "How do I add a signature in Gmail?",
    answer: "Go to Gmail → Settings (gear icon) → See all settings → General → Signature → Create new. Type your name, title, and contact details, then click Save Changes. Your signature will automatically appear on new emails and replies.",
  },
  {
    question: "Can I add an image signature in Gmail?",
    answer: "Yes. In the Gmail signature editor, click the Insert Image icon (looks like a picture frame). You can upload a PNG image from your device, paste a URL, or select from Google Drive. Transparent PNG images work best — they overlay cleanly on any email background without a white box.",
  },
  {
    question: "Why is my Gmail signature not showing?",
    answer: "The most common reasons: (1) You didn't click 'Save Changes' at the bottom of Settings. (2) The signature is set to only appear on new emails but not replies — check the 'For Replies/Forwards' dropdown. (3) The mobile app has a separate signature setting — go to Gmail app → Settings → Account → Mobile Signature.",
  },
  {
    question: "Can I use different signatures in Gmail?",
    answer: "Yes. Gmail allows multiple signatures. In Settings → Signature, click '+ Create new' to add as many signatures as you need. When composing an email, click the pen icon at the bottom of the compose window to switch between saved signatures.",
  },
  {
    question: "How do I add a signature in the Gmail app on my phone?",
    answer: "On Android: open Gmail → menu (☰) → Settings → your account → Mobile Signature → type your text → OK. On iPhone: open Gmail → menu → Settings → your account → Signature Settings → enable the toggle → type your signature. Note: the mobile app only supports text signatures, not image signatures.",
  },
  {
    question: "What is the best image format for a Gmail signature?",
    answer: "PNG with a transparent background is the best format. It overlays cleanly on any email background without showing a white rectangle. JPEG signatures show a white box around the signature on any non-white email background.",
  },
  {
    question: "Can I add my company logo to my Gmail signature?",
    answer: "Yes. In the Gmail signature editor, click the Insert Image icon and upload your company logo PNG file. Resize it by clicking the image and selecting Small, Medium, Large, or Original. Place it alongside your name and contact details for a professional branded signature.",
  },
  {
    question: "Does the Gmail mobile signature sync with the desktop?",
    answer: "No. The Gmail mobile signature and desktop signature are separate settings. Changes you make in the Gmail app only affect emails sent from the app. Changes made in Gmail's web settings only affect the browser version. You need to set signatures in both places if you use both.",
  },
  {
    question: "How do I add a clickable link in my Gmail signature?",
    answer: "In the Gmail signature editor, type the text you want to link (e.g., your website URL or 'Visit our site'), highlight it, then click the Link icon (chain link) in the editor toolbar. Paste your URL and click OK. The text becomes a clickable hyperlink in all emails you send.",
  },
  {
    question: "Why is my Gmail signature image not showing in received emails?",
    answer: "This happens when the recipient's email client blocks external images by default. To prevent this, use Gmail's built-in image uploader (not a URL) when inserting the image — Gmail hosts it on Google's servers so recipients see it. Avoid hosting the image on third-party servers.",
  },
  {
    question: "How do I remove or delete a Gmail signature?",
    answer: "Go to Gmail → Settings → See all settings → Signature section. Find the signature you want to delete, click the trash icon next to it, then click Save Changes at the bottom of the page. The signature will be permanently removed.",
  },
  {
    question: "Is Pixocraft's signature creator free to use for Gmail?",
    answer: "Yes — completely free, with no login, no watermark, and no usage limit. Create as many signatures as you need, download them as transparent PNG files, and upload to Gmail at zero cost.",
  },
];

const USE_CASES = [
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Professional Emails", desc: "Add your name, title, phone, and website to every email automatically." },
  { icon: <Users className="h-5 w-5 text-primary" />, title: "Freelancers", desc: "Brand every client email with your logo and contact details — no extra effort." },
  { icon: <Mail className="h-5 w-5 text-primary" />, title: "Business Branding", desc: "Consistent logo and colour scheme across all team emails strengthens brand recognition." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Job Communication", desc: "A polished signature with your LinkedIn profile signals professionalism to recruiters." },
];

const COMMON_ISSUES = [
  {
    issue: "Signature image not showing in sent emails",
    fix: "When inserting the image, use Gmail's Upload option (not a URL). Gmail hosts uploaded images on Google's servers, so recipients' email clients display them reliably. URL-hosted images are often blocked.",
  },
  {
    issue: "Signature not saving",
    fix: 'After editing your signature, scroll all the way to the bottom of the Settings page and click "Save Changes". Gmail does not auto-save — the button is easy to miss.',
  },
  {
    issue: "Mobile signature not syncing with desktop",
    fix: "This is expected — Gmail treats desktop and mobile signatures as separate settings. Configure the signature independently in the Gmail web settings (for desktop) and in the Gmail app settings (for mobile).",
  },
  {
    issue: "Signature appearing on replies but showing extra line breaks",
    fix: 'In the Gmail signature editor, place your cursor at the very start of the signature text, select all (Ctrl+A), then re-type or re-paste to reset hidden formatting. Alternatively, use the "Remove formatting" button (Tx) to clear stray line breaks.',
  },
  {
    issue: "Image showing a white box around the signature",
    fix: "You used a JPEG signature. JPEG does not support transparency. Recreate your signature using Pixocraft (this page) and download as a transparent PNG instead.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Add Signature in Gmail (Step-by-Step Guide)",
  "description": "Learn how to add signature in Gmail easily. Create and insert text or image signature on desktop and mobile. Free tool, no login.",
  "url": CANONICAL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-22",
  "author": { "@type": "Organization", "name": "Pixocraft" },
  "publisher": { "@type": "Organization", "name": "Pixocraft", "url": "https://tools.pixocraft.in" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": CANONICAL },
};

export default function HowToAddSignatureInGmail() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileTab, setMobileTab] = useState<"android" | "ios">("android");

  useSEO({
    title: "How to Add Signature in Gmail (Easy Setup Guide) | Pixocraft",
    description: "Learn how to add signature in Gmail easily. Create and insert text or image signature on desktop and mobile. Free tool, no login.",
    keywords: "how to add signature in gmail, gmail signature setup, add signature in gmail app, gmail signature image, email signature gmail, gmail mobile signature, add image to gmail signature",
    canonicalUrl: CANONICAL,
    ogType: "website",
    ogImage: "https://tools.pixocraft.in/images/gmail-signature-setup.png",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "How to Add Signature in Gmail", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "How to Add Signature in Gmail (Easy Setup Guide) | Pixocraft",
    description: "Learn how to add signature in Gmail easily. Create and insert text or image signature on desktop and mobile. Free tool, no login.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Add Signature in Gmail",
    description: "Step-by-step guide to setting up a Gmail signature on desktop and mobile, including adding an image or logo.",
    steps: DESKTOP_STEPS.map((s) => ({ name: s.title, text: s.desc })),
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Gmail Signature Creator Tool",
    description: "Free online tool to create a professional signature image for Gmail. Draw, type, or upload — download as transparent PNG. No login required.",
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
          { label: "How to Add Signature in Gmail" },
        ]} />

        {/* ── HERO ────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                How to Add Signature in Gmail (Step-by-Step Guide)
              </h1>
              <p className="text-sm text-muted-foreground">Create and add a professional signature in Gmail easily. Covers desktop and mobile. Free tool, no login.</p>
            </div>
          </div>

          {/* Featured snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">Quick Answer — How to add a signature in Gmail?</p>
            <p className="text-base text-foreground leading-relaxed">
              Go to <strong>Gmail → Settings (⚙) → See all settings → General → Signature → Create new</strong>. Type your name and contact details, optionally upload an image, then <strong>save changes</strong>. Your signature will now appear automatically on all new emails.
            </p>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Monitor className="h-3.5 w-3.5" />, label: "Desktop Guide" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Android & iPhone" },
              { icon: <ImageIcon className="h-3.5 w-3.5" />, label: "Image Signature" },
              { icon: <Lock className="h-3.5 w-3.5" />, label: "No Login Required" },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Under 2 Minutes" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Quick nav */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {[
              { label: "Desktop Setup", icon: <Monitor className="h-3.5 w-3.5" />, anchor: "desktop" },
              { label: "Mobile (Android)", icon: <Smartphone className="h-3.5 w-3.5" />, anchor: "mobile" },
              { label: "Image Signature", icon: <ImageIcon className="h-3.5 w-3.5" />, anchor: "image" },
              { label: "Common Issues", icon: <AlertCircle className="h-3.5 w-3.5" />, anchor: "issues" },
            ].map(({ label, icon, anchor }) => (
              <button
                key={label}
                onClick={() => document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl border bg-card text-xs font-medium text-foreground hover-elevate"
                data-testid={`button-nav-${anchor}`}
              >
                {icon}{label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-create-signature-cta">
              <PenTool className="h-4 w-4" />Create Gmail Signature Free<ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-primary" />Draw, type, or upload</span>
              <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-primary" />100% private</span>
              <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5 text-primary" />Download as transparent PNG</span>
            </div>
          </div>
        </div>

        {/* ── TOOL ────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <SignatureToolSection
            title="Create Your Gmail Signature"
            description="Draw, type, or upload your signature — download as a transparent PNG ready to insert into Gmail."
          />
        </div>

        {/* ── SEO CONTENT ─────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Keyword-rich intro paragraph */}
          <p className="text-muted-foreground text-base leading-relaxed -mt-8">
            Setting up a <strong>Gmail signature</strong> takes under two minutes on desktop and under one minute on mobile. This guide covers <strong>how to add a signature in Gmail</strong> step by step — including the Gmail app on Android and iPhone, how to add an image or logo, and how to fix the most common signature issues. Use the free tool above to create your <strong>email signature for Gmail</strong> instantly.
          </p>

          {/* What is a Gmail signature */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What Is a Gmail Signature?</h2>
            <p className="text-muted-foreground mb-4">
              A Gmail signature is a block of text — and optionally an image — that is automatically appended to the bottom of every email you send. It acts as a digital business card, giving recipients all the information they need to identify and contact you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {[
                { icon: <Users className="h-5 w-5 text-primary" />, title: "Your Name & Title", desc: "Clearly identifies who you are and your role." },
                { icon: <Mail className="h-5 w-5 text-primary" />, title: "Contact Details", desc: "Phone, website, LinkedIn, or other ways to reach you." },
                { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Branding", desc: "Company logo, brand colours, and professional design." },
                { icon: <Globe className="h-5 w-5 text-primary" />, title: "Business Identity", desc: "Establishes credibility and trust with every email you send." },
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
            <p className="text-muted-foreground">
              A professional <strong>Gmail signature setup</strong> signals credibility to clients, partners, and recruiters. It also saves time — you never have to manually type your contact information again.
            </p>
          </section>

          {/* How to create with tool */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Create a Gmail Signature Image (Using Pixocraft)</h2>
            <p className="text-muted-foreground mb-5">
              Before adding a signature image to Gmail, you need to create one. Use the free tool above — it takes under 60 seconds:
            </p>
            <ol className="space-y-3 mb-5">
              {TOOL_STEPS.map(({ step, title, desc }) => (
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
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-tool-cta">
                <PenTool className="h-4 w-4" />Create Gmail Signature Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Desktop guide */}
          <section id="desktop">
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Add Signature in Gmail — Desktop (Step-by-Step)</h2>
            <p className="text-muted-foreground mb-5">
              Setting up a <strong>Gmail signature</strong> on desktop takes about 2 minutes. Follow these steps exactly:
            </p>
            <ol className="space-y-3 mb-5">
              {DESKTOP_STEPS.map(({ step, title, desc }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4">
              <p className="text-sm text-foreground font-medium">Pro tip:</p>
              <p className="text-sm text-muted-foreground mt-1">
                In the signature editor, set "Defaults for new emails" and "Defaults for replies/forwards" both to your new signature so it appears automatically everywhere.
              </p>
            </div>
          </section>

          {/* Mobile guide */}
          <section id="mobile">
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Add Signature in Gmail App (Mobile)</h2>
            <p className="text-muted-foreground mb-5">
              The Gmail mobile app has a separate signature setting from the desktop version. The steps differ slightly between Android and iPhone:
            </p>

            {/* Tab switcher */}
            <div className="flex gap-2 mb-5">
              {(["android", "ios"] as const).map((tab) => (
                <Button
                  key={tab}
                  variant={mobileTab === tab ? "default" : "outline"}
                  onClick={() => setMobileTab(tab)}
                  className="gap-2"
                  data-testid={`button-tab-${tab}`}
                >
                  <Smartphone className="h-4 w-4" />
                  {tab === "android" ? "Android" : "iPhone (iOS)"}
                </Button>
              ))}
            </div>

            <ol className="space-y-3 mb-5">
              {(mobileTab === "android" ? MOBILE_STEPS_ANDROID : MOBILE_STEPS_IOS).map(({ step, title, desc }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="rounded-xl border bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800 px-5 py-4">
              <p className="text-sm font-semibold text-amber-800 dark:text-amber-300 mb-1">Important note</p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                The Gmail mobile app only supports text signatures — image signatures are not supported on mobile. To use an image or logo signature, configure it in Gmail's web settings (desktop). The mobile signature is separate and independent.
              </p>
            </div>
          </section>

          {/* Image signature */}
          <section id="image">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Add an Image Signature in Gmail</h2>
            <p className="text-muted-foreground mb-5">
              Adding an image or logo to your <strong>Gmail signature</strong> makes it look polished and professional. Here is the exact process:
            </p>
            <div className="space-y-4 mb-5">
              {[
                { step: 1, icon: <PenTool className="h-4 w-4 text-primary" />, title: "Create your signature PNG", desc: "Use the Pixocraft tool above to draw or type your signature, then download it as a transparent PNG file." },
                { step: 2, icon: <Settings className="h-4 w-4 text-primary" />, title: "Open Gmail Signature editor", desc: "Go to Gmail → Settings (⚙) → See all settings → Signature. Open or create a signature." },
                { step: 3, icon: <ImageIcon className="h-4 w-4 text-primary" />, title: "Click Insert Image", desc: 'In the signature editor toolbar, click the Insert Image icon (looks like a mountain and sun). Select "Upload" and choose your PNG file.' },
                { step: 4, icon: <Zap className="h-4 w-4 text-primary" />, title: "Adjust size", desc: 'Click the inserted image, then click "Small", "Medium", or "Large" below it to resize. Medium usually works best for most signatures.' },
                { step: 5, icon: <Check className="h-4 w-4 text-primary" />, title: "Save changes", desc: 'Scroll to the bottom of Settings and click "Save Changes". Your image signature is now active.' },
              ].map(({ step, icon, title, desc }) => (
                <div key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      {icon}
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Best format */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Best Format for a Gmail Signature Image</h2>
            <p className="text-muted-foreground mb-5">Not all image formats work equally well in Gmail. Here is what to use:</p>
            <div className="space-y-4 mb-5">
              {[
                {
                  label: "PNG (Transparent)",
                  recommended: true,
                  points: [
                    "Transparent background — no white box around your signature",
                    "Overlays cleanly on any email background or theme",
                    "Pixocraft automatically exports as transparent PNG",
                    "Best for handwritten or logo-style signatures",
                  ],
                },
                {
                  label: "JPEG / JPG",
                  recommended: false,
                  points: [
                    "No transparency — white box appears around signature",
                    "Looks unprofessional on dark or coloured email backgrounds",
                    "Fine only if the email background is white and you don't need transparency",
                    "Not recommended for professional use",
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
                          : <AlertCircle className="h-3.5 w-3.5 text-destructive shrink-0 mt-0.5" />
                        }
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-card p-5">
              <p className="font-semibold text-foreground text-sm mb-3">Recommended specifications:</p>
              <ul className="space-y-2">
                {[
                  "Format: PNG with transparent background",
                  "Width: 300–600 px (Medium size in Gmail editor is ideal)",
                  "File size: Under 1 MB for fast loading in emails",
                  "Colour: Dark ink on transparent background for best legibility",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Who Should Add a Gmail Signature?</h2>
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

          {/* Save & Reuse */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Save &amp; Reuse Your Signature — No Login Needed</h2>
            <p className="text-muted-foreground mb-5">
              Once you create your signature PNG with Pixocraft, you can save it to your device and reuse it across Gmail, Outlook, Word, and any other platform — without recreating it each time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Lock className="h-5 w-5 text-primary" />, title: "No Login", desc: "Create and download your signature with zero account setup or email verification." },
                { icon: <RefreshCw className="h-5 w-5 text-primary" />, title: "Reuse Anytime", desc: "Save the PNG to your device and upload it wherever you need — Gmail, Outlook, Word, and more." },
                { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% Private", desc: "Your signature is created locally in your browser. Nothing is stored on our servers." },
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

          {/* Common issues */}
          <section id="issues">
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Gmail Signature Issues — and How to Fix Them</h2>
            <p className="text-muted-foreground mb-5">These are the most frequent problems users encounter when setting up a Gmail signature, with their exact fixes:</p>
            <div className="space-y-3">
              {COMMON_ISSUES.map(({ issue, fix }) => (
                <div key={issue} className="rounded-xl border bg-card overflow-hidden">
                  <div className="flex items-start gap-3 px-5 py-4">
                    <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                    <p className="font-semibold text-foreground text-sm">{issue}</p>
                  </div>
                  <div className="px-5 pb-4 pt-0 text-sm text-muted-foreground leading-relaxed border-t flex items-start gap-3">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Fix:</strong> {fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Pixocraft vs Other Signature Creation Tools</h2>
            <div className="overflow-x-auto rounded-xl border mb-4">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">HubSpot Sig</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Canva</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">WiseStamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { feature: "Login required", pixo: "No", hub: "Yes", canva: "Yes", wise: "Yes" },
                    { feature: "File upload to server", pixo: "No", hub: "Yes", canva: "Yes", wise: "Yes" },
                    { feature: "Transparent PNG export", pixo: "Yes", hub: "No", canva: "Yes (paid)", wise: "No" },
                    { feature: "Free plan", pixo: "Always free", hub: "Limited", canva: "Limited", wise: "Limited" },
                    { feature: "Handwritten style", pixo: "Yes", hub: "No", canva: "Partial", wise: "No" },
                    { feature: "100% private", pixo: "Yes", hub: "No", canva: "No", wise: "No" },
                  ].map(({ feature, pixo, hub, canva, wise }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 font-semibold text-primary">{pixo}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{hub}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{canva}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{wise}</td>
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
                { label: "Email Signature Generator", href: "/tools/email-signature-generator", desc: "Create a complete HTML email signature with logo and links." },
                { label: "Signature for Word", href: "/tools/signature-for-word", desc: "Add your signature to Word documents without printing." },
                { label: "Signature for PDF", href: "/tools/signature-for-pdf", desc: "Sign PDF documents online in seconds — no software needed." },
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
            <Mail className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-2">Create Your Gmail Signature Now</h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Draw, type, or upload your signature. Download as a transparent PNG. Add to Gmail in seconds — free, forever.
            </p>
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-final-cta">
              <PenTool className="h-4 w-4" />Create Gmail Signature Free<ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
