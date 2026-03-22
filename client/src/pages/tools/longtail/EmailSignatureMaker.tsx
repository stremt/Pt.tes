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
  Mail, Smartphone, Star, Briefcase, Globe, PenTool,
  Users, Palette, Type, ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/email-signature-maker";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const FAQS = [
  {
    question: "How do I add a signature to Gmail?",
    answer:
      "Open Gmail → click the gear icon (Settings) → See all settings → General → Scroll to 'Signature' → click 'Create new'. Type your name and title. To add your handwritten signature image, click the image icon in the signature editor and upload your PNG from Pixocraft. Click 'Save Changes' at the bottom. Your signature will appear on all new emails automatically.",
  },
  {
    question: "How do I add a signature in Outlook?",
    answer:
      "In Outlook desktop: File → Options → Mail → Signatures → New. Type your details, then click the image icon to insert your PNG. In Outlook web (outlook.com): Settings → View all Outlook settings → Compose and reply → Email signature. Paste or type your details and insert your image using the image button.",
  },
  {
    question: "Is this email signature maker completely free?",
    answer:
      "Yes — 100% free forever. No subscription, no login, no watermark on the downloaded PNG. Create unlimited email signatures at no cost.",
  },
  {
    question: "What format should I download my email signature in?",
    answer:
      "Download as a transparent PNG for the cleanest result in Gmail, Outlook, and most email clients. The transparent background means no white box appears around your signature image. For email clients that don't support transparency, a JPG with white background is also available.",
  },
  {
    question: "Can I use this tool on my phone to create an email signature?",
    answer:
      "Yes. The tool is fully mobile-optimised. Open this page on Chrome, Safari, or any mobile browser, draw or type your signature, and download the PNG. You can then add it to your Gmail or Outlook app's signature settings from your phone.",
  },
  {
    question: "What should a professional email signature include?",
    answer:
      "A professional email signature should include: your full name, job title, company name, phone number, email address, and optionally your website URL or LinkedIn profile. Keep it concise — ideally 4–6 lines maximum. Adding your handwritten signature image above your contact details gives an immediate personal and professional impression.",
  },
  {
    question: "What is the difference between a PNG email signature and an HTML email signature?",
    answer:
      "A PNG email signature is an image of your signature — simple to add to any email client by uploading or inserting the file. An HTML email signature uses code to create a formatted block with live links, logos, and branding. PNG is faster to set up and works everywhere. HTML offers more interactivity (clickable links, logos) but requires template coding or a dedicated HTML signature builder.",
  },
  {
    question: "Will my email signature look the same on all devices?",
    answer:
      "A PNG image signature will display consistently across all devices and email clients — Gmail, Outlook, Apple Mail, Yahoo Mail, and mobile apps — because it's a fixed image. HTML signatures can render differently depending on the email client's CSS support. For cross-platform consistency, a PNG signature is the most reliable choice.",
  },
  {
    question: "Is my signature data private and secure?",
    answer:
      "Completely private. This tool runs 100% inside your browser. No drawing, typed name, or uploaded image is ever sent to any server or stored anywhere. Your email signature data never leaves your device.",
  },
  {
    question: "How do I make my email signature look professional?",
    answer:
      "Four key principles: (1) Keep it short — maximum 6 lines of contact info. (2) Use dark ink (black or navy) for your handwritten signature. (3) Match your signature style to your industry — formal cursive for legal/finance, casual for creative. (4) Use consistent fonts across name, title, and contact lines. Avoid multiple colours, excessive graphics, or motivational quotes.",
  },
  {
    question: "Can I use my email signature for business GST communication?",
    answer:
      "Yes. A PNG email signature works perfectly for GST invoice emails, proposal emails, and formal business communication. For actual GST invoice documents, use Pixocraft's GST Invoice Signature tool to insert your signature directly into the PDF.",
  },
  {
    question: "How large should my email signature image be?",
    answer:
      "For the signature image itself, a width of 200–300 px at 96 dpi works well in most email clients. Pixocraft exports at 3200×1040 px — you can resize it when inserting into your email client's settings. Keep the file size under 50 KB to avoid triggering spam filters in corporate email systems.",
  },
];

const HOW_TO_STEPS = [
  { step: 1, title: "Create your signature", description: "Use the Draw tab to sign with mouse or finger, the Type tab to pick from 50+ professional handwriting fonts, or Upload to digitise an existing signature." },
  { step: 2, title: "Customise for email", description: "Set ink colour to black or dark navy for maximum readability. Adjust stroke width for a pen-like appearance. Try the Type tab for a consistent result on every email." },
  { step: 3, title: "Download as PNG", description: "Click 'Download Signature' to save the transparent PNG. This high-resolution image is ready to use in Gmail, Outlook, Apple Mail, or any email client." },
  { step: 4, title: "Paste in Gmail or Outlook", description: "Open your email client's signature settings, insert the PNG image in the signature editor, and add your name, title, and contact details below it. Save — done." },
];

const PNG_VS_HTML = [
  { feature: "Setup time",          png: "Under 60 seconds",           html: "Minutes to hours" },
  { feature: "Email client support", png: "Universal",                 html: "Varies by client" },
  { feature: "Clickable links",     png: "No (image only)",            html: "Yes" },
  { feature: "Logo inclusion",      png: "Embedded in image",          html: "Separate element" },
  { feature: "Consistency",         png: "Pixel-identical everywhere", html: "Varies by client CSS" },
  { feature: "Technical skill",     png: "None required",              html: "Basic HTML knowledge" },
  { feature: "Mobile display",      png: "Always correct",            html: "May vary" },
  { feature: "Cost",                png: "Free",                       html: "Free to paid" },
];

const SIGNATURE_STYLES = [
  {
    name: "Minimal",
    desc: "Clean, simple letterforms with thin strokes. Works for any industry — particularly tech, consulting, and professional services. Use the Type tab with an ultra-thin elegant script for the most polished minimal look.",
    when: "Tech professionals, consultants, writers, developers",
  },
  {
    name: "Corporate",
    desc: "Confident, upright letterforms with medium weight. Projects authority and reliability. Classic cursive or structured script fonts in the Type tab. Draw with a 2–3 px stroke at a controlled pace.",
    when: "Finance, legal, banking, corporate leadership",
  },
  {
    name: "Creative",
    desc: "Flowing, expressive strokes with natural variation. Best drawn freehand using the Draw tab to capture genuine personality. Slightly bolder stroke weight (3–4 px) gives energy.",
    when: "Designers, marketers, photographers, creative agencies",
  },
  {
    name: "Personal",
    desc: "Relaxed, natural handwriting with a personal feel. The Draw tab with a medium stroke and deliberate pace gives the most authentic personal signature. Choose a casual handwriting font in the Type tab.",
    when: "Freelancers, personal brands, coaches, therapists",
  },
];

const USE_CASES = [
  { icon: <Mail className="h-5 w-5 text-primary" />,      title: "Client Emails",        desc: "A consistent handwritten signature in every client email projects professionalism and builds a memorable personal brand over repeated interactions." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Business Proposals",   desc: "Proposals and quotations with your personalised signature convey commitment and authenticity — increasing the chance of conversion." },
  { icon: <FileText className="h-5 w-5 text-primary" />,  title: "GST Communication",    desc: "GST invoice emails, payment follow-ups, and accounts correspondence look more formal and trustworthy with a consistent business signature." },
  { icon: <Globe className="h-5 w-5 text-primary" />,     title: "Job Applications",     desc: "An email with a clean, professional signature makes a strong first impression in job applications and LinkedIn outreach — before the recruiter even reads the body." },
  { icon: <Users className="h-5 w-5 text-primary" />,     title: "Agency Communication", desc: "Agencies and teams can use consistent signature images across all client-facing emails to build a unified brand identity." },
  { icon: <Star className="h-5 w-5 text-primary" />,      title: "Personal Branding",    desc: "Creatives, coaches, and influencers use personalised signatures to reinforce their identity and make every email feel premium." },
];

const MISTAKES = [
  { title: "Signature that is too long", body: "A signature longer than 6–8 lines adds noise to every email. Stick to the essentials: name, title, company, phone, and one or two links. Anything more distracts from your message." },
  { title: "Too many colours", body: "Multiple bright colours in a signature look unprofessional and are visually fatiguing. Use a maximum of two colours — typically your brand colour for your name/title and black for contact details." },
  { title: "Unreadable handwriting fonts", body: "Highly decorative script fonts can be difficult to read, especially at small sizes on mobile. Test your chosen font at the size it will appear in your email before finalising." },
  { title: "Inconsistent signature across emails and platforms", body: "Using different signatures in Gmail, Outlook, and different devices creates an inconsistent brand image. Set the same PNG in all email clients and on all devices — save the file and reuse it everywhere." },
  { title: "Not optimising for mobile", body: "Over 60% of emails are opened on mobile. A signature image that is too wide or a contact block with too many lines takes up the entire screen on a phone. Keep signature images under 400 px wide." },
];

const PRO_TIPS = [
  { title: "Keep it short and scannable", body: "The most effective email signatures are concise: name, title, company, one phone number, one link. Readers scan signatures in under 2 seconds — every unnecessary element reduces the chance of the key information being noticed." },
  { title: "Add your logo alongside your signature", body: "In your email client's signature editor, place your company logo beside or above your handwritten signature image. Together they create a complete branded identity — personal (signature) plus corporate (logo)." },
  { title: "Use dark ink for the signature image", body: "Black or dark navy (#1a1a2e) is universally professional and readable on any email background. Light or coloured ink can appear washed out on some email clients or when printed." },
  { title: "Test on mobile before deploying", body: "Send a test email to yourself and open it on your phone. Check that the signature image is not too wide, text is readable, and the overall layout looks balanced on a small screen." },
  { title: "Use the Type tab for cross-device consistency", body: "If you need an identical signature on every device and email client — especially useful for shared team accounts — use the Type tab and select a consistent font. The result is pixel-identical every time, regardless of who sends the email." },
];

export default function EmailSignatureMaker() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Email Signature Maker Free – Professional Signature for Gmail & Outlook | Pixocraft",
    description:
      "Create professional email signature online free. Works for Gmail, Outlook and business emails. No signup required, 100% private, instant PNG download.",
    keywords:
      "email signature maker, free email signature, professional email signature, gmail signature, outlook signature, email footer signature, business email signature, email signature png",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Email Signature Maker – Pixocraft",
    description:
      "Create a professional email signature online free. Draw, type, or upload your signature and download as transparent PNG. Works with Gmail, Outlook, and all email clients. No login required.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                  url: "https://tools.pixocraft.in/" },
    { name: "Tools",                 url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-pad-tool" },
    { name: "Email Signature Maker", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Email Signature Maker Free – Professional Signature for Gmail & Outlook | Pixocraft",
    description:
      "Create professional email signature online free. Works for Gmail, Outlook and business emails. No signup required, 100% private, instant PNG download.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Professional Email Signature Free",
    description:
      "Use Pixocraft's free email signature maker to draw or type your signature and add it to Gmail, Outlook, or any email client in under 30 seconds.",
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
          { label: "Home",                url: "https://tools.pixocraft.in/" },
          { label: "Tools",              url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Email Signature Maker" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Email Signature Maker Free – Professional Signature for Gmail &amp; Outlook
              </h1>
              <p className="text-sm text-muted-foreground">Works with Gmail &amp; Outlook · No Signup · 100% Private · Instant PNG</p>
            </div>
          </div>

          <p className="text-base text-muted-foreground mb-5 leading-relaxed">
            Create a <strong>premium email signature</strong> that makes every email look professional. Perfect for
            <strong> Gmail, Outlook</strong>, and all business email communication. Draw, type, or upload your signature —
            download as a transparent PNG and paste it directly into your email client in seconds.
          </p>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Mail className="h-3.5 w-3.5" />,      label: "Works with Gmail & Outlook" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "Create in Under 30 Seconds" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup Required" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />,  label: "Trusted by Professionals" },
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
              { icon: <Zap className="h-3.5 w-3.5 text-primary" />,    label: "Used in daily business emails" },
              { icon: <Star className="h-3.5 w-3.5 text-primary" />,   label: "Improves professional image instantly" },
              { icon: <Smartphone className="h-3.5 w-3.5 text-primary" />, label: "Works on mobile & desktop" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                {icon}{label}
              </div>
            ))}
          </div>

          {/* Action flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
            {[
              { n: 1, label: "Create Signature" },
              { n: 2, label: "Customise" },
              { n: 3, label: "Download PNG" },
              { n: 4, label: "Paste in Gmail / Outlook" },
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

        {/* ── QUICK USE BLOCK ──────────────────────────────────────────────── */}
        <div className="rounded-xl border bg-primary/5 px-6 py-5 mb-12">
          <p className="font-semibold text-foreground mb-3">Use your email signature for:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {[
              "Gmail and Google Workspace",
              "Outlook and Microsoft 365",
              "Apple Mail and Yahoo Mail",
              "Business proposals and quotations",
              "Job applications and HR emails",
              "GST invoices and client communication",
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

          {/* What is Email Signature */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">What Is an Email Signature?</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                An <strong>email signature</strong> is the block of text, images, and contact information that appears
                automatically at the bottom of every email you send. It serves as your digital business card — providing
                recipients with your name, title, company, and contact details without requiring you to type them every time.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              A professional <strong>email signature</strong> typically includes your handwritten signature image, full name,
              job title, company name, phone number, and optionally your website and LinkedIn URL. When done well, it acts as
              a subtle but powerful piece of personal branding that reinforces your identity with every email you send.
            </p>
            <p className="text-muted-foreground mb-4">
              For businesses, a consistent email signature across all team members is a critical part of brand identity. When
              every employee's email carries the same visual style — same fonts, same colour, same signature format — the
              company projects a unified, professional image to every client, partner, and vendor it communicates with.
            </p>
            <p className="text-muted-foreground mb-4">
              There are two main types of email signatures: image-based (PNG) and HTML. A <strong>PNG email signature</strong>
              is a handwritten signature saved as an image — simple, universal, and instantly recognisable as personal. An HTML
              email signature is a formatted block with live links, logos, and design elements — more versatile but more complex
              to set up and often rendered inconsistently across email clients.
            </p>
            <p className="text-muted-foreground">
              Pixocraft's free <strong>email signature maker</strong> helps you create the handwritten signature image component
              of your email signature — the personalised, authentic element that makes your emails stand out from template-generated
              correspondence. Download as a transparent PNG and combine it with your text contact details directly in Gmail,
              Outlook, or any email client's signature editor.
            </p>
          </section>

          {/* Why email signature is important */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Why a Professional Email Signature Matters</h2>
            <p className="text-muted-foreground mb-5">
              In business communication, first impressions happen through email before they happen in person. Here is why a
              professional email signature is worth investing 30 seconds in:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Star className="h-5 w-5 text-primary" />,       title: "Instant credibility",          desc: "A clean, professional signature instantly signals that you take your work seriously. Recipients notice — especially in first contact emails, proposals, and job applications." },
                { icon: <Users className="h-5 w-5 text-primary" />,      title: "Trust building",               desc: "A handwritten signature in your email creates a personal, human connection. It tells the recipient there is a real person behind the email — not a mass-sent template." },
                { icon: <Globe className="h-5 w-5 text-primary" />,      title: "Brand consistency",           desc: "Every email you send is a touchpoint with your brand. A consistent signature reinforces your identity — name, company, and visual style — across thousands of interactions over time." },
                { icon: <Mail className="h-5 w-5 text-primary" />,       title: "Easy contact access",          desc: "Recipients can reach you instantly — your phone number, website, and LinkedIn are right there, without having to search. This reduces friction and increases response rates." },
                { icon: <Briefcase className="h-5 w-5 text-primary" />,  title: "Professionalism by default",  desc: "Even a simple, well-designed signature elevates the tone of casual emails. It signals respect for the recipient and attention to the details of professional communication." },
                { icon: <Zap className="h-5 w-5 text-primary" />,        title: "Set once, use forever",       desc: "Configure your email signature once in Gmail or Outlook and it appears on every email automatically — zero additional effort for maximum ongoing benefit." },
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

          {/* How to Create */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Create a Professional Email Signature — Step by Step</h2>
            <p className="text-muted-foreground mb-5">From creation to live in Gmail or Outlook in under 2 minutes:</p>
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
                data-testid="button-create-email-signature"
              >
                <PenTool className="h-4 w-4" />Create Email Signature<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Gmail Setup */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Add a Signature in Gmail — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Once you have downloaded your PNG from Pixocraft, adding it to Gmail takes about 60 seconds:</p>
            <ol className="space-y-3 mb-5">
              {[
                { step: 1, title: "Open Gmail Settings",         desc: "Click the gear icon in the top-right of Gmail → 'See all settings'." },
                { step: 2, title: "Navigate to Signature",       desc: "Under the General tab, scroll down to the 'Signature' section. Click 'Create new' and name your signature." },
                { step: 3, title: "Insert your signature image", desc: "In the signature editor, click the image icon. Upload your transparent PNG from Pixocraft. Resize it to about 200–250 px wide." },
                { step: 4, title: "Add your contact details",    desc: "Below the image, type your name, title, company, and phone number using the text editor." },
                { step: 5, title: "Set as default and save",     desc: "Under 'Signature defaults', select your new signature for 'New emails' and 'Replies/forwards'. Scroll to the bottom and click 'Save Changes'." },
              ].map(({ step, title, desc }) => (
                <li key={step} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <span className="shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{step}</span>
                  <div>
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Outlook Setup */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Add a Signature in Outlook — Step by Step</h2>
            <p className="text-muted-foreground mb-5">Adding your PNG email signature to Outlook desktop or Outlook web:</p>
            <div className="space-y-4 mb-5">
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-3">Outlook Desktop (Windows / Mac)</p>
                <ol className="space-y-2">
                  {[
                    "File → Options → Mail → Signatures → New",
                    "Name your signature and build it in the editor",
                    "Click the image icon to insert your Pixocraft PNG",
                    "Add name, title, company, and contact details below",
                    "Set as default for new messages and replies → OK",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-xl border bg-card p-5">
                <p className="font-semibold text-foreground mb-3">Outlook Web (outlook.com / Microsoft 365)</p>
                <ol className="space-y-2">
                  {[
                    "Settings (gear icon) → View all Outlook settings",
                    "Mail → Compose and reply → Email signature",
                    "Click 'New signature', name it, and build it in the editor",
                    "Use the image icon to upload your Pixocraft PNG",
                    "Add contact details, set as default, and Save",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
                      <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Features of Pixocraft's Email Signature Maker</h2>
            <p className="text-muted-foreground mb-5">Everything you need to create a professional email signature in seconds:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <PenTool className="h-5 w-5 text-primary" />,   title: "Draw with mouse or finger",   desc: "Natural freehand drawing on HTML5 Canvas. Stroke smoothing for a pen-like feel on both desktop mouse and mobile touch." },
                { icon: <Type className="h-5 w-5 text-primary" />,      title: "50+ handwriting fonts",       desc: "Type your name and select from 50+ Google handwriting fonts. Pixel-identical result every time — perfect for shared team signatures." },
                { icon: <ImageIcon className="h-5 w-5 text-primary" />, title: "Upload existing signature",   desc: "Photograph your physical signature, upload it, and remove the background automatically. Reuse your real signature digitally." },
                { icon: <Palette className="h-5 w-5 text-primary" />,   title: "Full customisation",          desc: "Adjust ink colour, stroke weight, and style. Black and dark navy presets are optimised for professional email use." },
                { icon: <Download className="h-5 w-5 text-primary" />,  title: "Transparent PNG export",      desc: "Download a transparent-background PNG that overlays cleanly on any email background — no white box, no border." },
                { icon: <Smartphone className="h-5 w-5 text-primary" />, title: "Mobile-optimised",           desc: "Create your email signature from your phone. Draw with your finger and download directly to your mobile — then configure Gmail or Outlook app." },
                { icon: <Zap className="h-5 w-5 text-primary" />,       title: "Instant — no waiting",        desc: "No server processing, no upload spinner. Create and download your signature entirely in your browser in under 30 seconds." },
                { icon: <Shield className="h-5 w-5 text-primary" />,    title: "Zero data storage",           desc: "Your signature never leaves your device. 100% browser-based — no account, no server upload, no privacy risk." },
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

          {/* PNG vs HTML comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Email Signature PNG vs HTML — Which Should You Use?</h2>
            <p className="text-muted-foreground mb-5">
              Two approaches to email signatures, each with distinct advantages. Here is a direct comparison to help you decide:
            </p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[440px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-primary">PNG Signature</th>
                    <th className="text-left px-5 py-3 font-semibold text-muted-foreground">HTML Signature</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {PNG_VS_HTML.map(({ feature, png, html }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 text-primary/80 font-medium">{png}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{html}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 text-sm text-foreground">
              <strong className="flex items-center gap-1.5 mb-1"><BadgeCheck className="h-4 w-4 text-primary" />Recommendation:</strong>
              <p className="text-muted-foreground leading-relaxed">
                For most professionals and businesses, a PNG signature image combined with a simple text block (name, title, phone,
                website) in your email client's signature editor is the fastest, most compatible, and most professional solution.
                HTML is worth the extra effort only if you need clickable social links or a fully branded layout.
              </p>
            </div>
          </section>

          {/* Signature Styles */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Email Signature Styles — Which One Fits You?</h2>
            <p className="text-muted-foreground mb-5">Different industries and roles call for different signature aesthetics:</p>
            <div className="space-y-4">
              {SIGNATURE_STYLES.map(({ name, desc, when }) => (
                <div key={name} className="rounded-xl border bg-card p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-primary/10 text-primary">{name}</span>
                    <span className="text-xs text-muted-foreground">{when}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Who Uses Email Signatures — Real Use Cases</h2>
            <p className="text-muted-foreground mb-5">An email signature serves professionals across every industry and role:</p>
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

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Email Signature Mistakes to Avoid</h2>
            <p className="text-muted-foreground mb-5">These errors undermine professionalism and reduce the effectiveness of your email signature:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for a Perfect Professional Email Signature</h2>
            <p className="text-muted-foreground mb-5">Best practices used by professionals and business email experts:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Pixocraft for Your Email Signature?</h2>
            <p className="text-muted-foreground mb-5">What makes this the best free email signature maker for professionals:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "30-second workflow",         body: "Open → create → download in under 30 seconds. No sign-up screen, no upgrade prompt, no waiting." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private",               body: "Your signature never leaves your device. All processing is local in your browser — nothing on any server." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "Professional results",       body: "50+ handwriting fonts and a natural drawing engine ensure your signature looks polished and authentic — not like a digital afterthought." },
                { icon: <Mail className="h-4 w-4 text-primary" />,       title: "Gmail & Outlook ready",      body: "Transparent PNG output that inserts cleanly into any email client's signature settings — no additional editing needed." },
                { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "Works on any device",        body: "Create your email signature from a phone, tablet, or desktop. Full touch support for mobile drawing." },
                { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Completely free",            body: "No freemium, no watermark, no hidden upgrade. Draw, type, upload, and download — all fully free forever." },
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
                <PenTool className="h-4 w-4" />Create Email Signature Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal linking */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Complete Signature Workflow — Related Tools</h2>
            <p className="text-muted-foreground mb-4">
              After creating your email signature, use these tools to complete your professional signature workflow:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-creator",              label: "Signature Creator",              desc: "Full-featured signature creator with advanced customisation options." },
                { href: "/tools/handwritten-signature-generator", label: "Handwritten Signature Generator", desc: "Create authentic handwritten signatures with 50+ natural font styles." },
                { href: "/tools/add-signature-to-pdf",           label: "Add Signature to PDF",           desc: "Insert your PNG signature directly into any PDF document." },
                { href: "/tools/gst-invoice-signature",          label: "GST Invoice Signature",          desc: "Signature optimised for GST invoices and Indian business documents." },
                { href: "/tools/mobile-signature-generator",     label: "Mobile Signature Generator",     desc: "Optimised for phone drawing — create signatures on the go." },
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
            <h2 className="text-2xl font-bold text-foreground mb-5">Frequently Asked Questions — Email Signature Maker</h2>
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
