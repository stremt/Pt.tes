import { useState } from "react";
import { Link } from "wouter";
import { useSEO, StructuredData, generateBreadcrumbSchema, generateWebPageSchema } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  PenTool, FileText, Mail, Smartphone, Shield, Star, Zap,
  Upload, Type, ArrowRight, Check, Globe, Receipt, BadgeCheck,
  ChevronDown, ChevronUp,
} from "lucide-react";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-tools";

const PRIMARY_HREFS = new Set([
  "/tools/signature-pad-tool",
  "/tools/signature-font-generator",
  "/tools/handwritten-signature-generator",
  "/tools/digital-signature-generator",
  "/tools/email-signature-generator",
  "/tools/signature-for-pdf",
  "/tools/gst-invoice-signature",
]);

const TOOLS = [
  {
    href: "/tools/signature-pad-tool",
    icon: PenTool,
    title: "Signature Generator",
    badge: "Main Tool",
    desc: "The full-featured signature maker. Draw, Type, or Upload your signature. 50+ fonts, advanced draw presets, history, preview, transparent PNG/JPG download.",
    tags: ["Draw", "Type", "Upload", "50+ Fonts"],
  },
  {
    href: "/tools/signature-font-generator",
    icon: Type,
    title: "Signature Font Generator",
    badge: "Popular",
    desc: "Type your name and preview it in 50+ cursive and handwriting fonts. Pick your favourite style and download a crisp transparent PNG instantly. No drawing needed.",
    tags: ["50+ Fonts", "Type-Only", "PNG"],
  },
  {
    href: "/tools/handwritten-signature-generator",
    icon: PenTool,
    title: "Handwritten Signature Generator",
    badge: "",
    desc: "Create a natural, realistic handwritten signature online. Choose from 50+ cursive and handwriting fonts or draw freehand. Download as transparent PNG.",
    tags: ["Cursive Fonts", "Stylish", "PNG"],
  },
  {
    href: "/tools/digital-signature-generator",
    icon: BadgeCheck,
    title: "Digital Signature Generator",
    badge: "",
    desc: "Create a legally recognised digital signature for India IT Act 2000 compliant contracts, NDAs, HR documents, and most business agreements.",
    tags: ["IT Act 2000", "Legal", "India"],
  },
  {
    href: "/tools/create-digital-signature",
    icon: PenTool,
    title: "Create Digital Signature",
    badge: "",
    desc: "Step-by-step guide and tool to create a digital signature online free. Works for contracts, invoices, and all commercial documents.",
    tags: ["Free", "Contracts", "Invoices"],
  },
  {
    href: "/tools/online-signature-generator",
    icon: Globe,
    title: "Online Signature Generator",
    badge: "",
    desc: "Create your signature online instantly. Draw, type, or upload — then download as a high-resolution transparent PNG in seconds.",
    tags: ["Instant", "No Signup", "PNG"],
  },
  {
    href: "/tools/free-signature-generator",
    icon: Star,
    title: "Free Signature Generator",
    badge: "",
    desc: "Unlimited signature creation, unlimited downloads — 100% free forever. No watermark, no account required, no hidden fees.",
    tags: ["Free Forever", "No Watermark"],
  },
  {
    href: "/tools/signature-maker",
    icon: PenTool,
    title: "Signature Maker",
    badge: "",
    desc: "Design your perfect signature online. Full customisation — ink colour, stroke width, font style, and more. Download PNG or JPG.",
    tags: ["Customise", "PNG", "JPG"],
  },
  {
    href: "/tools/signature-maker-free",
    icon: PenTool,
    title: "Signature Maker Free",
    badge: "",
    desc: "Free online signature maker with no restrictions. Create, save, and reuse your signature across unlimited documents.",
    tags: ["Free", "Unlimited"],
  },
  {
    href: "/tools/create-signature-online",
    icon: Zap,
    title: "Create Signature Online",
    badge: "",
    desc: "Create a professional signature online in under 60 seconds. Three methods — draw, type, or upload — all free, all private.",
    tags: ["Fast", "3 Methods"],
  },
  {
    href: "/tools/esignature-maker",
    icon: BadgeCheck,
    title: "eSignature Maker",
    badge: "",
    desc: "Create a legally valid electronic signature for documents, contracts, and agreements. Accepted under ESIGN, eIDAS, and IT Act 2000.",
    tags: ["eSignature", "Legal", "Global"],
  },
  {
    href: "/tools/signature-creator",
    icon: PenTool,
    title: "Signature Creator",
    badge: "",
    desc: "Create a unique, memorable signature from your name. Browse style categories, preview live, and download print-ready PNG.",
    tags: ["Name Signature", "Stylish"],
  },
  {
    href: "/tools/mobile-signature-generator",
    icon: Smartphone,
    title: "Mobile Signature Generator",
    badge: "",
    desc: "Optimised for touch screens. Draw your signature with your finger on any iOS or Android device. Download instantly.",
    tags: ["Touch", "iOS", "Android"],
  },
  {
    href: "/tools/email-signature-generator",
    icon: Mail,
    title: "Email Signature Generator",
    badge: "",
    desc: "Create a handwritten PNG signature for Gmail, Outlook, and all major email clients. Adds a personal professional touch to every email.",
    tags: ["Gmail", "Outlook", "Email"],
  },
  {
    href: "/tools/email-signature-maker",
    icon: Mail,
    title: "Email Signature Maker",
    badge: "",
    desc: "Design and download an email signature PNG in seconds. No HTML, no templates — just your handwritten signature, ready for any email client.",
    tags: ["PNG", "No HTML", "Instant"],
  },
  {
    href: "/tools/signature-for-pdf",
    icon: FileText,
    title: "Signature for PDF",
    badge: "",
    desc: "Create and download a transparent PNG signature ready to insert into any PDF. Works with Adobe Acrobat, Smallpdf, and Pixocraft PDF tools.",
    tags: ["PDF", "Transparent PNG"],
  },
  {
    href: "/tools/add-signature-to-pdf",
    icon: FileText,
    title: "Add Signature to PDF",
    badge: "",
    desc: "Draw or type your signature and place it directly on a PDF document in your browser. No upload to server, no software needed.",
    tags: ["PDF", "Sign In-Browser"],
  },
  {
    href: "/tools/transparent-signature-png",
    icon: Upload,
    title: "Transparent Signature PNG",
    badge: "",
    desc: "Upload a photo of your handwritten signature and get a clean transparent PNG with the white background removed automatically.",
    tags: ["Background Remove", "Upload"],
  },
  {
    href: "/tools/gst-invoice-signature",
    icon: Receipt,
    title: "GST Invoice Signature",
    badge: "India",
    desc: "Create a digital signature specifically formatted for GST invoices and e-way bills. Accepted by CBIC guidelines for manually generated invoices.",
    tags: ["GST", "India", "Tally"],
  },
  {
    href: "/tools/signature-for-gst-invoice",
    icon: Receipt,
    title: "Signature for GST Invoice",
    badge: "India",
    desc: "Comprehensive guide and tool for adding legally valid digital signatures to GST invoices. Covers TallyPrime, Zoho Books, and PDF workflows.",
    tags: ["GST", "CGST Rule 46", "India"],
  },
  {
    href: "/tools/signature-for-tally",
    icon: Receipt,
    title: "Signature for Tally",
    badge: "India",
    desc: "Create a transparent PNG signature and configure it in TallyPrime once — every future invoice prints signed automatically. No DSC needed.",
    tags: ["Tally", "GST", "Invoice"],
  },
  {
    href: "/tools/signature-for-contracts",
    icon: FileText,
    title: "Signature for Contracts",
    badge: "",
    desc: "Create a legally valid signature for NDAs, service agreements, freelance contracts, and employment letters. IT Act 2000 compliant.",
    tags: ["Contracts", "NDA", "Legal"],
  },
  {
    href: "/tools/indian-digital-signature",
    icon: BadgeCheck,
    title: "Indian Digital Signature",
    badge: "India",
    desc: "India-specific digital signature guide and tool. Covers IT Act 2000, GST rules, and which signature type is required for which document.",
    tags: ["India", "IT Act", "GST"],
  },
  {
    href: "/tools/how-to-create-digital-signature-online",
    icon: PenTool,
    title: "How to Create Digital Signature Online",
    badge: "Guide",
    desc: "Step-by-step guide to creating a digital signature online free. Covers all three methods with screenshots and best practices.",
    tags: ["Guide", "Step-by-Step"],
  },
  {
    href: "/tools/how-to-add-signature-in-word",
    icon: FileText,
    title: "How to Add Signature in Word",
    badge: "Guide",
    desc: "Complete guide to inserting a digital signature in Microsoft Word — both Windows and Mac. Covers the Insert Picture and Draw methods.",
    tags: ["Word", "Microsoft", "Guide"],
  },
  {
    href: "/tools/how-to-add-signature-in-google-docs",
    icon: FileText,
    title: "How to Add Signature in Google Docs",
    badge: "Guide",
    desc: "Step-by-step guide to adding your handwritten signature to Google Docs. Covers insert image, drawing tool, and add-on methods.",
    tags: ["Google Docs", "Guide"],
  },
  {
    href: "/tools/how-to-sign-pdf-online",
    icon: FileText,
    title: "How to Sign PDF Online",
    badge: "Guide",
    desc: "Complete guide to signing a PDF online — draw, type, or upload your signature and place it directly on the PDF in your browser. No software needed.",
    tags: ["PDF", "Guide", "Free"],
  },
  {
    href: "/how-to-sign-pdf-on-mobile",
    icon: Smartphone,
    title: "How to Sign PDF on Mobile",
    badge: "Guide",
    desc: "Step-by-step guide to signing a PDF on Android or iPhone. Covers touch drawing, font typing, and upload methods — all optimised for mobile.",
    tags: ["Mobile", "Android", "iPhone"],
  },
  {
    href: "/free-signature-for-documents",
    icon: FileText,
    title: "Free Signature for Documents",
    badge: "",
    desc: "Create a free digital signature for any document — contracts, forms, HR letters, and more. Transparent PNG download, no login, no watermark.",
    tags: ["Free", "All Documents", "PNG"],
  },
];

const BENEFITS = [
  { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% Browser-Based",    desc: "All tools run entirely in your browser. Nothing is uploaded to any server." },
  { icon: <Zap className="h-5 w-5 text-primary" />,    title: "Instant Download",       desc: "High-resolution 4× PNG ready in seconds — no watermark, no login." },
  { icon: <Star className="h-5 w-5 text-primary" />,   title: "50+ Handwriting Fonts", desc: "7 style categories from elegant scripts to casual handwriting." },
  { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "Legally Valid",     desc: "Compliant with IT Act 2000 (India), ESIGN (US), eIDAS (EU)." },
];

export default function SignatureToolsCategory() {
  const [showMoreTools, setShowMoreTools] = useState(false);

  const primaryTools = TOOLS.filter((t) => PRIMARY_HREFS.has(t.href));
  const moreTools    = TOOLS.filter((t) => !PRIMARY_HREFS.has(t.href));

  useSEO({
    title: "Signature Tools – Free Digital Signature Generator, Maker & Creator | Pixocraft",
    description:
      "All free online signature tools in one place. Create, draw, type, or upload signatures. Download transparent PNG for PDF, GST invoices, contracts, and email. No login.",
    canonical: CANONICAL,
    keywords:
      "signature tools, digital signature generator, online signature maker, free signature creator, handwritten signature, e-signature, GST invoice signature, signature for PDF",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",            url: "https://tools.pixocraft.in/" },
    { name: "Tools",           url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Signature Tools – Free Digital Signature Generator & Maker",
    description:
      "All free online signature tools in one place. Create digital signatures for PDF, GST invoices, contracts, and email. No login, no watermark.",
    url: CANONICAL,
  });

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Pixocraft Signature Tools",
    description: "A complete collection of free online digital signature tools — draw, type, or upload and download transparent PNG. For PDF, GST invoices, contracts, and email.",
    url: CANONICAL,
    publisher: { "@type": "Organization", name: "Pixocraft", url: "https://tools.pixocraft.in" },
    hasPart: TOOLS.map(t => ({
      "@type": "SoftwareApplication",
      name: t.title,
      url: `https://tools.pixocraft.in${t.href}`,
      applicationCategory: "WebApplication",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    })),
  };

  return (
    <div className="min-h-screen bg-background">
      <StructuredData schema={breadcrumbSchema} />
      <StructuredData schema={webPageSchema} />
      <StructuredData schema={collectionSchema} />

      <div className="max-w-5xl mx-auto px-4 py-4 sm:py-8 space-y-8 sm:space-y-12">

        {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
        <Breadcrumb items={[
          { label: "Home",  url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools" },
        ]} />

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <div className="space-y-4 pt-2 sm:pt-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <PenTool className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                Signature Tools
              </h1>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {TOOLS.length} free tools · No login · 100% browser-based · Made in India
              </p>
            </div>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Everything you need to create, style, and use a digital signature online — completely free.
            Draw your own signature, type your name in <strong>50+ cursive and handwriting fonts</strong>, or upload an existing signature.
            Download as a <strong>transparent PNG</strong> and use it on PDFs, GST invoices, contracts, email footers, and anywhere else you need a professional signature.
          </p>

          <div className="flex flex-wrap gap-2">
            {["100% Free", "No Login", "Transparent PNG", "GST Ready", "Legal India", "Mobile Friendly", "50+ Fonts", "No Watermark"].map(tag => (
              <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/20">
                <Check className="h-3 w-3" />{tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── START HERE ────────────────────────────────────────────────────── */}
        <div className="rounded-xl border-2 border-primary/30 bg-primary/5 p-4 sm:p-6 space-y-4">
          <p className="font-bold text-foreground text-base sm:text-lg">Start here — most popular tool</p>
          <div className="flex flex-col gap-4">
            <div className="flex-1 space-y-1">
              <p className="font-semibold text-foreground">Signature Generator (Full Tool)</p>
              <p className="text-sm text-muted-foreground">Draw, Type, or Upload · 50+ fonts · History · Preview · PNG + JPG download</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {["Draw Tab", "Type Tab", "Upload Tab", "Preview", "History"].map(f => (
                  <span key={f} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background border">{f}</span>
                ))}
              </div>
            </div>
            <Link href="/tools/signature-pad-tool" className="block">
              <span className="flex items-center justify-center gap-2 w-full sm:w-auto sm:inline-flex px-5 py-3 sm:py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover-elevate min-h-[44px]" data-testid="button-start-signature-tool">
                Use Free Tool <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        {/* ── BENEFITS ──────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map(({ icon, title, desc }) => (
            <div key={title} className="rounded-xl border bg-card p-4 space-y-2">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
              <p className="font-semibold text-foreground text-sm">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* ── POPULAR TOOLS GRID ────────────────────────────────────────────── */}
        <section className="space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Popular Tools</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              The most-used signature tools — click any to open instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {primaryTools.map(({ href, icon: Icon, title, badge, desc, tags }) => (
              <Link key={href} href={href}>
                <div
                  className="group rounded-xl border bg-card p-5 space-y-3 hover-elevate transition-all h-full"
                  data-testid={`card-tool-${href.split("/").pop()}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground text-sm leading-tight group-hover:text-primary transition-colors">{title}</p>
                    </div>
                    {badge && (
                      <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  <div className="flex flex-wrap gap-1">
                    {tags.map(tag => (
                      <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                    Open tool <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── MORE SIGNATURE TOOLS (collapsible) ────────────────────────────── */}
        <section className="space-y-4">
          <button
            onClick={() => setShowMoreTools((v) => !v)}
            className="w-full flex items-center justify-between gap-3 px-5 py-4 rounded-xl border bg-muted/40 hover-elevate transition-all text-left"
            data-testid="button-toggle-more-tools"
            aria-expanded={showMoreTools}
          >
            <div>
              <p className="font-semibold text-foreground text-sm">More Signature Tools &amp; Guides</p>
              <p className="text-xs text-muted-foreground mt-0.5">{moreTools.length} additional tools, makers, and step-by-step guides</p>
            </div>
            {showMoreTools
              ? <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
              : <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
            }
          </button>

          {showMoreTools && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {moreTools.map(({ href, icon: Icon, title, badge, desc, tags }) => (
                <Link key={href} href={href}>
                  <div
                    className="group rounded-xl border bg-card p-4 space-y-2.5 hover-elevate transition-all h-full"
                    data-testid={`card-tool-${href.split("/").pop()}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Icon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="font-medium text-foreground text-sm leading-tight group-hover:text-primary transition-colors">{title}</p>
                      </div>
                      {badge && (
                        <span className="shrink-0 text-[9px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border whitespace-nowrap">
                          {badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{desc}</p>
                    <div className="flex flex-wrap gap-1">
                      {tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* ── USE CASE QUICK LINKS ──────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Find the Right Signature Tool</h2>
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm min-w-[480px]">
              <thead>
                <tr className="bg-primary/5 border-b">
                  <th className="text-left px-5 py-3 font-semibold text-foreground">I need to…</th>
                  <th className="text-left px-5 py-3 font-semibold text-foreground">Use this tool</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  ["Generate signature from fonts online",         "/tools/signature-font-generator",            "Signature Font Generator"],
                  ["Create a stylish handwritten signature",     "/tools/handwritten-signature-generator",     "Handwritten Signature Generator"],
                  ["Sign a PDF document in my browser",          "/tools/signature-for-pdf",                   "Signature for PDF"],
                  ["Sign a PDF online (step-by-step guide)",     "/tools/how-to-sign-pdf-online",              "How to Sign PDF Online"],
                  ["Sign a PDF on mobile / phone",               "/how-to-sign-pdf-on-mobile",                 "How to Sign PDF on Mobile"],
                  ["Add signature to a GST invoice",             "/tools/signature-for-gst-invoice",           "Signature for GST Invoice"],
                  ["Add signature in Tally Prime invoice",       "/tools/signature-for-tally",                 "Signature for Tally"],
                  ["Create a signature for email footer",        "/tools/email-signature-generator",           "Email Signature Generator"],
                  ["Sign a contract or NDA",                     "/tools/signature-for-contracts",             "Signature for Contracts"],
                  ["Remove white background from my signature",  "/tools/transparent-signature-png",           "Transparent Signature PNG"],
                  ["Use signature on my phone",                  "/tools/mobile-signature-generator",          "Mobile Signature Generator"],
                  ["Add signature in Google Docs",               "/tools/how-to-add-signature-in-google-docs", "How to Add in Google Docs"],
                  ["Add signature in Word",                      "/tools/how-to-add-signature-in-word",        "How to Add in Word"],
                  ["Create legal e-signature for India",         "/tools/indian-digital-signature",            "Indian Digital Signature"],
                  ["Free signature for any document type",       "/free-signature-for-documents",              "Free Signature for Documents"],
                ].map(([need, href, label]) => (
                  <tr key={href} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-3 text-muted-foreground">{need}</td>
                    <td className="px-5 py-3">
                      <Link href={href}>
                        <span className="text-primary font-medium hover:underline underline-offset-2 inline-flex items-center gap-1">
                          {label} <ArrowRight className="h-3 w-3" />
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── WHAT IS ───────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">What Are Pixocraft Signature Tools?</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pixocraft Signature Tools is a free collection of <strong>{TOOLS.length}+ browser-based tools</strong> for creating,
            styling, and using digital signatures online. Every tool runs 100% in your browser — nothing is sent to any server.
            Your signature data stays on your device.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            All tools share the same core engine: a high-resolution signature canvas (3200×1040 px, 4× display resolution)
            with three creation modes — <strong>Draw</strong> (freehand with mouse or touch),
            <strong> Type</strong> (50+ handwriting and cursive Google Fonts across 7 categories), and
            <strong> Upload</strong> (digitise an existing signature with automatic background removal).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Signatures created here are legally valid under the <strong>IT Act 2000</strong> (India), <strong>ESIGN Act</strong> (USA),
            and <strong>eIDAS Regulation</strong> (EU) for contracts, GST invoices, HR documents, and commercial agreements.
            A government-issued DSC is only required for specific portal filings (MCA ROC, income tax e-verification).
          </p>
        </section>

        {/* ── BOTTOM BREADCRUMB ─────────────────────────────────────────────── */}
        <div className="pt-4 border-t">
          <Breadcrumb items={[
            { label: "Home",  url: "https://tools.pixocraft.in/" },
            { label: "Tools", url: "/tools" },
            { label: "Signature Tools" },
          ]} />
          <p className="text-xs text-muted-foreground mt-3">
            Last Updated: March 2026 · Made in India · By the Pixocraft Team
          </p>
        </div>

      </div>
    </div>
  );
}
