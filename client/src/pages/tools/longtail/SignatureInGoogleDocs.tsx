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
  Star, XCircle, PenTool, ImageIcon, Layers,
  FileCheck, Briefcase, GraduationCap, Users,
  AlertCircle, Globe, Share2, MousePointer,
} from "lucide-react";

const CANONICAL = "https://tools.pixocraft.in/tools/signature-for-google-docs";
const LAST_UPDATED = "March 2026";

const FAQS = [
  {
    question: "How do I insert a signature in Google Docs?",
    answer:
      "Create your signature as a transparent PNG using Pixocraft. In Google Docs, click Insert → Image → Upload from computer, select your PNG, and click Open. Click the image to select it, then drag it to your signature line and resize using the corner handles.",
  },
  {
    question: "Can I draw a signature directly in Google Docs?",
    answer:
      "Yes — via Insert → Drawing → New → Scribble tool. Draw your signature with the mouse, then click Save and Close. The drawing is embedded in the document. However, mouse-drawn signatures often look shaky. For a cleaner result, draw on Pixocraft's dedicated canvas and insert the PNG.",
  },
  {
    question: "What is the best format for a Google Docs signature?",
    answer:
      "PNG with a transparent background is ideal. It overlays cleanly on Google Docs' white background and on any coloured header or table without a white box around the strokes. JPEG forces a white rectangle that looks unprofessional over any non-white area.",
  },
  {
    question: "Is a signature in Google Docs legally valid in India?",
    answer:
      "Yes. Under the IT Act 2000, an image-based electronic signature embedded in a Google Docs document is legally valid for commercial agreements, freelance contracts, NDAs, and most business documents. A Class 3 DSC is only needed for regulated portal filings such as MCA, income tax, and court submissions.",
  },
  {
    question: "How do I make a transparent signature for Google Docs?",
    answer:
      "Draw or type your signature on Pixocraft's tool on this page, then click Download → PNG. The exported file has a fully transparent background — no white box — and inserts cleanly into Google Docs.",
  },
  {
    question: "Can I add a Google Docs signature without an extension or add-on?",
    answer:
      "Yes. The PNG image method requires no Chrome extension, add-on, or third-party plugin. Use Insert → Image → Upload from computer directly in Google Docs to place your signature instantly.",
  },
  {
    question: "How do I resize my signature image in Google Docs?",
    answer:
      "Click the inserted signature image to select it. Drag a corner handle (not a side handle) to resize while maintaining proportions. For precise control, right-click → Image options → Size & Rotation and enter exact width and height values.",
  },
  {
    question: "How to stop the signature from moving in Google Docs?",
    answer:
      "After inserting, click the image and select 'Inline' wrapping from the image toolbar that appears below the image. This anchors the signature to the text position and prevents it from floating around when you edit the document.",
  },
  {
    question: "Can I add a handwritten signature in Google Docs?",
    answer:
      "Yes. Draw your actual handwritten signature on Pixocraft using your mouse, stylus, or touchscreen finger. Download the transparent PNG and insert it into Google Docs via Insert → Image. This gives a genuine handwritten appearance without scanning or printing.",
  },
  {
    question: "Can I sign a shared Google Doc?",
    answer:
      "Yes. As long as you have edit access, you can insert your signature PNG into a shared Google Doc. The signature stays embedded for all collaborators who view or download the document.",
  },
  {
    question: "Does Pixocraft upload my signature to any server?",
    answer:
      "No. All signature creation happens locally inside your browser. Your name, drawing strokes, and the PNG you download are never sent to any server — 100% private and GDPR-safe.",
  },
  {
    question: "Can I reuse my Google Docs signature in other documents?",
    answer:
      "Yes. Save the downloaded PNG to a permanent folder on your device. Each time you need to sign a Google Doc, use Insert → Image → Upload from computer and select the same file. No re-drawing required.",
  },
];

const HOWTO_STEPS = [
  {
    name: "Create your signature on Pixocraft",
    text: "Use the tool above. Draw with your mouse or touchscreen in the Draw tab, or type your name and choose a cursive font in the Type tab for a clean, professional look.",
  },
  {
    name: "Adjust style and thickness",
    text: "Use the thickness slider to match your natural pen weight. Black ink is standard for most documents; adjust colour if your document uses a branded style.",
  },
  {
    name: "Download as transparent PNG",
    text: "Click Download → PNG. You receive a high-resolution transparent PNG — no watermark, no white background, no login required.",
  },
  {
    name: "Open your Google Doc",
    text: "Go to docs.google.com and open the document you need to sign. Place your cursor at the exact point where the signature should appear.",
  },
  {
    name: "Insert via Insert → Image → Upload from computer",
    text: "In the Google Docs menu bar, click Insert → Image → Upload from computer. Select your downloaded PNG file and click Open to insert it.",
  },
  {
    name: "Resize and position the signature",
    text: "Click the image to select it. Drag corner handles to resize to an appropriate width (about 3–5 cm for standard documents). Drag the image to align it precisely over the signature line.",
  },
  {
    name: "Set image to Inline and save",
    text: "Click the image, then select 'Inline' from the image toolbar below it — this anchors the signature to the text position. Google Docs saves automatically.",
  },
];

const METHODS = [
  {
    icon: <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Method A",
    title: "Insert PNG Image (Recommended)",
    desc: "Create a transparent PNG on Pixocraft and insert it via Insert → Image → Upload from computer. The fastest, cleanest method — consistent results on every device and browser.",
    pros: ["Works without any add-on", "Transparent background", "Reusable across documents", "Professional appearance"],
    best: true,
  },
  {
    icon: <PenTool className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Method B",
    title: "Drawing Tool (Insert → Drawing)",
    desc: "Google Docs has a built-in Drawing tool (Insert → Drawing → New → Scribble). Draw with your mouse directly in the document. Quick for casual use but mouse-drawn lines are often uneven.",
    pros: ["No external tool needed", "Works with stylus", "Directly embedded", "Free and built-in"],
    best: false,
  },
  {
    icon: <Layers className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />,
    label: "Method C",
    title: "Google Docs Add-ons",
    desc: "The Google Workspace Marketplace has add-ons like DocuSign and HelloSign that integrate e-signature workflows into Google Docs. Useful for formal contract workflows — requires installation and account setup.",
    pros: ["Full eSign workflow", "Audit trail", "Multi-party signing", "Legal compliance features"],
    best: false,
  },
];

const USE_CASES = [
  {
    icon: <Briefcase className="h-5 w-5 text-primary" />,
    title: "Freelance Contracts & Client Agreements",
    desc: "Sign project proposals, service agreements, and SOW documents in Google Docs before sharing. No printing or scanning — send the signed Doc directly to the client.",
  },
  {
    icon: <GraduationCap className="h-5 w-5 text-primary" />,
    title: "Student Assignments & Declarations",
    desc: "Many universities require a signed declaration on Google Docs submissions. Insert your PNG before submitting to avoid printing and re-uploading.",
  },
  {
    icon: <FileCheck className="h-5 w-5 text-primary" />,
    title: "Business Letters & Official Documents",
    desc: "Offer letters, reference letters, and HR documents drafted in Google Docs can be signed digitally and shared via Drive link — no PDF conversion needed.",
  },
  {
    icon: <Users className="h-5 w-5 text-primary" />,
    title: "Team Approvals & Internal Sign-offs",
    desc: "Shared Google Docs used for internal approvals, policy acknowledgements, and meeting minutes can carry signatures from multiple contributors.",
  },
  {
    icon: <Globe className="h-5 w-5 text-primary" />,
    title: "Remote Work & Distributed Teams",
    desc: "Remote employees and contractors sign employment agreements and NDAs in Google Docs without any physical paperwork — reducing delays across time zones.",
  },
  {
    icon: <Share2 className="h-5 w-5 text-primary" />,
    title: "Online Agreements & Consent Forms",
    desc: "Privacy consents, partnership agreements, and vendor onboarding forms drafted in Google Docs are signed and shared instantly via a Drive link.",
  },
];

const COMPARISON_ROWS = [
  { feature: "Cost",                  pixocraft: "Free",             others: "Paid / Freemium" },
  { feature: "Login required",        pixocraft: "No",               others: "Yes" },
  { feature: "Data upload",           pixocraft: "None",             others: "Server upload" },
  { feature: "Works offline",         pixocraft: "Yes",              others: "Mostly no" },
  { feature: "Transparent PNG",       pixocraft: "Yes",              others: "Often watermarked" },
  { feature: "Mobile support",        pixocraft: "Full",             others: "Partial" },
  { feature: "Time to signature",     pixocraft: "Under 60 seconds", others: "3–10 minutes" },
];

const COMMON_MISTAKES = [
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Uploading JPEG instead of PNG",
    desc: "JPEG creates a visible white box around the signature. Always export transparent PNG from Pixocraft — it blends seamlessly into any Google Docs background.",
  },
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Not setting image to Inline",
    desc: "Leaving the image as 'Wrap text' causes it to float and move unexpectedly when text is edited. Set it to Inline for a stable, predictable position.",
  },
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Resizing by dragging a side handle",
    desc: "Dragging a side handle stretches the signature and distorts its proportions. Always drag from a corner handle to resize proportionally.",
  },
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Making the signature oversized",
    desc: "A signature that's too large draws too much attention and looks amateur. Keep width at 3–5 cm for standard A4 documents — readable without dominating the page.",
  },
  {
    icon: <XCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />,
    title: "Not keeping a reusable PNG copy",
    desc: "Re-creating your signature for every document wastes time. Save the PNG permanently in your Drive or Downloads folder for instant reuse.",
  },
];

const INTERNAL_LINKS = [
  { href: "/tools/signature-pad-tool",             label: "Signature Generator" },
  { href: "/tools/signature-for-word",              label: "Signature in Word Document" },
  { href: "/tools/signature-for-pdf",               label: "Signature for PDF" },
  { href: "/tools/handwritten-signature-generator", label: "Handwritten Signature Generator" },
  { href: "/tools/signature-font-generator",        label: "Signature Font Generator" },
  { href: "/tools/digital-signature-generator",     label: "Digital Signature Generator" },
];

export default function SignatureInGoogleDocs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Signature in Google Docs – Add & Insert Signature Free",
    description:
      "Learn how to add signature in Google Docs easily. Create, download, and insert signature using PNG. Free tool, no login required.",
    canonicalUrl: CANONICAL,
    ogType: "website",
    ogImage: "https://tools.pixocraft.in/images/google-docs-signature.png",
    keywords:
      "signature in google docs, how to add signature in google docs, insert signature in google docs, sign google docs online, add handwritten signature google docs",
  });

  const schemas = [
    generateFAQSchema(FAQS),
    generateHowToSchema({
      name: "How to Add Signature in Google Docs",
      description:
        "Create a transparent PNG signature with Pixocraft and insert it into Google Docs in under 60 seconds — free, no login, no add-ons needed.",
      steps: HOWTO_STEPS,
    }),
    generateSoftwareApplicationSchema({
      name: "Signature for Google Docs Tool",
      description:
        "Free online tool to create and insert signature in Google Docs. Download PNG signature and use instantly.",
      url: CANONICAL,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      offers: { price: "0", priceCurrency: "INR" },
    }),
    generateBreadcrumbSchema([
      { name: "Home",                        url: "https://tools.pixocraft.in" },
      { name: "Tools",                        url: "https://tools.pixocraft.in/tools" },
      { name: "Signature Tools",              url: "https://tools.pixocraft.in/tools/signature-tools" },
      { name: "Signature in Google Docs",     url: CANONICAL },
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
            { label: "Home",                     url: "/" },
            { label: "Tools",                    url: "/tools" },
            { label: "Signature Tools",          url: "/tools/signature-tools" },
            { label: "Signature Generator", url: "/tools/signature-pad-tool" },
            { label: "Signature in Google Docs" },
          ]}
        />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="h-9 w-9 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight">
              Signature in Google Docs –{" "}
              <span className="text-primary">Add & Insert Signature Free</span>
            </h1>
          </div>
          <p className="hidden md:block text-sm sm:text-base text-muted-foreground leading-relaxed">
            Create your signature and insert it into <strong>Google Docs</strong> in under 60 seconds.
            Download a <strong>transparent PNG</strong> — the cleanest format for Google Docs — and place it
            precisely on any signature line. No add-ons, no login, no upload to any server.
          </p>
          <p className="text-base font-semibold text-foreground">
            <strong>Add your Google Docs signature in under 60 seconds — no add-on, no login, fully private.</strong>
          </p>
          <div className="hidden md:flex flex-wrap gap-2">
            {[
              { icon: <Lock className="h-3.5 w-3.5" />,       label: "No Login" },
              { icon: <Star className="h-3.5 w-3.5" />,       label: "Transparent PNG" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "Docs Compatible" },
              { icon: <Shield className="h-3.5 w-3.5" />,     label: "100% Private" },
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "No Add-on Needed" },
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
        <div className="hidden md:block rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-4 sm:px-6 sm:py-5 space-y-3">
          <p className="text-xs font-bold uppercase tracking-widest text-primary">Quick Answer</p>
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            How to add a signature in Google Docs?
          </h2>
          <p className="text-sm text-foreground leading-relaxed">
            Create your signature as a transparent PNG on Pixocraft (draw or type — no login). In Google Docs, click <strong>Insert → Image → Upload from computer</strong>, select your PNG, and insert it. Drag to your signature line, resize from a corner handle, set to <strong>Inline</strong> alignment, and you're done.
          </p>
          <div className="hidden md:grid grid-cols-4 gap-3 pt-1">
            {[
              { label: "Best format",     value: "Transparent PNG" },
              { label: "Ideal width",     value: "3–5 cm in Docs" },
              { label: "Add-on needed",   value: "No" },
              { label: "Cost",            value: "Free Forever" },
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
          caption="Draw or type your signature · Download transparent PNG · Google Docs ready · No watermark"
        />

        {/* ── WHAT IS SIGNATURE IN GOOGLE DOCS ─────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">What is a Signature in Google Docs?</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <p className="text-foreground leading-relaxed">
              Google Docs does not generate signatures on its own. To sign a Google Docs document, you must either
              <strong> insert a signature image</strong>, use the <strong>built-in Drawing tool</strong>, or connect a
              third-party e-signature add-on. A signature in Google Docs visually represents your approval or identity,
              and appears in documents such as:
            </p>
            <ul className="space-y-2">
              {[
                "Freelance contracts, project proposals, and service agreements",
                "Student assignment declarations and university forms",
                "Employment offer letters and HR policy acknowledgements",
                "Client approval documents and vendor onboarding forms",
                "Partnership agreements and joint venture MOUs",
                "Internal approval workflows shared across teams via Drive",
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
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">3 Ways to Add Signature in Google Docs</h2>
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
                <div className="hidden md:flex flex-wrap gap-2">
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

        {/* ── HOW TO CREATE ─────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">How to Create Signature for Google Docs</h2>
          <p className="text-muted-foreground">Complete end-to-end process — from creating your signature to inserting it in Google Docs. Takes under 60 seconds.</p>
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

        {/* ── INSERT IN GOOGLE DOCS DETAILED ────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">How to Insert Signature in Google Docs – Detailed Guide</h2>
          <p className="text-muted-foreground leading-relaxed">
            Once you have your transparent PNG from Pixocraft, follow these Google Docs steps for a precise, professional placement.
          </p>
          <div className="space-y-3">
            {[
              {
                step: "1",
                heading: "Open your Google Doc and place cursor",
                detail: "Navigate to the page where your signature is needed. Click to position your cursor exactly on the signature line or in the signature block — this is where the image will be inserted.",
              },
              {
                step: "2",
                heading: "Insert → Image → Upload from computer",
                detail: "In the Google Docs menu bar, click Insert → Image → Upload from computer. A file picker opens — navigate to your downloaded Pixocraft PNG and click Open.",
              },
              {
                step: "3",
                heading: "Image appears in document",
                detail: "Your signature PNG is inserted at the cursor position. It may appear large initially — this is normal. Use the next steps to resize and position it correctly.",
              },
              {
                step: "4",
                heading: "Resize from corner handles",
                detail: "Click the image to select it. Drag a corner handle (blue square at the corner) to scale the signature down proportionally. Aim for approximately 3–5 cm width for standard documents.",
              },
              {
                step: "5",
                heading: "Set alignment to Inline",
                detail: "A small toolbar appears below the selected image. Click the Inline icon (image between text lines). This anchors the signature at its text position and prevents it from floating.",
              },
              {
                step: "6",
                heading: "Drag to signature position and confirm",
                detail: "Drag the image precisely onto your signature line. Google Docs saves automatically — your document is now signed and ready to share via link, download as PDF, or email.",
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
          <div className="rounded-xl border bg-muted/30 px-5 py-4 space-y-2">
            <p className="text-sm font-semibold text-foreground">Alternative: Use the Drawing Tool</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              In Google Docs: <strong>Insert → Drawing → New</strong>. In the Drawing dialog, select the <strong>Scribble</strong> line tool from the toolbar. Draw your signature with the mouse, then click <strong>Save and Close</strong>. The drawing embeds directly. Best for quick, informal signatures on touch devices.
            </p>
          </div>
        </section>

        {/* ── BEST FORMAT ───────────────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Best Format for Google Docs Signature</h2>
          <div className="rounded-xl border bg-card px-4 py-4 sm:px-6 sm:py-5 space-y-3">
            <p className="text-foreground font-medium">
              Always use <strong>transparent PNG</strong> when inserting a signature into Google Docs. Here is why each attribute matters:
            </p>
            <ul className="space-y-3">
              {[
                {
                  label: "PNG (not JPEG)",
                  desc: "PNG supports transparency. JPEG does not — a JPEG signature creates a white rectangle over any table, header, or coloured area in your document.",
                },
                {
                  label: "Transparent background",
                  desc: "Transparency lets the signature float cleanly over text lines, footer sections, and coloured table cells without any visible box or border.",
                },
                {
                  label: "High resolution",
                  desc: "Pixocraft exports at 4× display resolution — your signature remains crisp when the Google Doc is printed or exported to PDF.",
                },
                {
                  label: "Compact file size (under 200 KB)",
                  desc: "Large images slow document loading in Google Docs, especially on mobile. A compact PNG keeps the document light and responsive.",
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
              { label: "Best format",         value: "PNG (Transparent)" },
              { label: "Ideal width in Docs", value: "3–5 cm" },
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
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Who Uses Signature in Google Docs</h2>
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
              Download your PNG once and keep it permanently. Reuse across:
            </p>
            <ul className="space-y-2">
              {[
                "Every Google Docs document you need to sign",
                "Microsoft Word documents via Insert → Pictures",
                "PDF documents via any PDF editor or Pixocraft's PDF tool",
                "Google Slides presentations and Google Forms",
                "Email signatures and HTML letterheads",
                "Any portal or form that accepts image signature upload",
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

        {/* ── DRAWING TOOL VS IMAGE ─────────────────────────────────────────── */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">Drawing Tool vs Image Signature in Google Docs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Drawing Tool (Insert → Drawing)",
                items: [
                  "Built into Google Docs — no external tool needed",
                  "Scribble lines often look uneven with a mouse",
                  "Better with a stylus or touchscreen",
                  "Cannot be easily reused in other documents",
                  "Good for quick, informal sign-offs",
                ],
                warn: true,
              },
              {
                title: "PNG Image Signature (Pixocraft)",
                items: [
                  "Drawn on a dedicated canvas with smooth strokes",
                  "Consistent look every time — identical across all documents",
                  "One PNG reused across Docs, Word, PDF, and more",
                  "Transparent background — clean on any page colour",
                  "Professional result in under 60 seconds",
                ],
                warn: false,
              },
            ].map(({ title, items, warn }) => (
              <div
                key={title}
                className={`rounded-xl border p-5 space-y-3 ${warn ? "bg-card" : "bg-primary/5 border-primary/30"}`}
              >
                <p className="font-semibold text-foreground text-sm">{title}</p>
                {items.map((item, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <Check className={`h-3.5 w-3.5 shrink-0 mt-0.5 ${warn ? "text-muted-foreground" : "text-primary"}`} />
                    <p className="text-xs text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            ))}
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
              { label: "Home",                     url: "/" },
              { label: "Tools",                    url: "/tools" },
              { label: "Signature Tools",          url: "/tools/signature-tools" },
              { label: "Signature in Google Docs" },
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
