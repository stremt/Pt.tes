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
  Smartphone, Star, PenTool, Receipt, Scale, Users,
  FileImage, BookOpen, Monitor, Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/how-to-add-signature-in-word";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-generator";

const FAQS = [
  {
    question: "How do I add a signature in Word without printing?",
    answer:
      "Create a transparent PNG signature using Pixocraft's free tool — draw, type, or upload. Open your Word document, go to Insert → Pictures → This Device, select your PNG, and click Insert. Resize and drag to your signature block. No printing, no scanning, no pen required. Total time: under 45 seconds.",
  },
  {
    question: "Can I add a signature in Word for free?",
    answer:
      "Yes — completely free. Pixocraft's signature tool is 100% free forever with no watermark, no login, and no subscription. Create your transparent PNG signature and insert it into any Word document at zero cost.",
  },
  {
    question: "Does this method work in Word 365?",
    answer:
      "Yes. The transparent PNG method works in all versions of Microsoft Word — Word 365 (desktop), Word 2021, Word 2019, Word 2016, Word for Mac, and the Word mobile app on Android and iOS. Insert → Pictures works identically across all versions.",
  },
  {
    question: "How do I add a signature in Word on mobile?",
    answer:
      "On mobile: first create your signature on Pixocraft (this page works on phone browsers). Download the transparent PNG to your phone's gallery. Open your Word document in the Word mobile app. Tap Insert → Pictures → Photo Library (iOS) or Gallery (Android). Select your PNG, resize, and position. Works on both iOS and Android Word apps.",
  },
  {
    question: "Is a digital signature in Word legally valid in India?",
    answer:
      "Yes. Under the Information Technology Act 2000 (Section 3A), a PNG image-based electronic signature inserted into a Word document constitutes a Simple Electronic Signature (SES) — legally valid for commercial contracts, NDAs, employment letters, and most business documents. Word documents signed with a PNG signature are enforceable under the Indian Contract Act 1872.",
  },
  {
    question: "Why use PNG and not JPG for Word signatures?",
    answer:
      "PNG supports transparency — your signature overlays cleanly on any Word document background, coloured table, or letterhead without a white rectangle around it. JPG has no transparency support and creates a highly visible white box around the signature strokes, which looks unprofessional on any non-white document area.",
  },
  {
    question: "How big should a signature be in a Word document?",
    answer:
      "For A4 Word documents, size your signature to approximately 3–5 cm wide. In Word, right-click the inserted image, select 'Size and Position', and set the width to 3–5 cm with 'Lock aspect ratio' checked. This produces a professional signature size — large enough to be clearly readable but not so large it dominates the page.",
  },
  {
    question: "Can I save my signature in Word as a Quick Part for reuse?",
    answer:
      "Yes. After inserting and positioning your signature PNG in Word, select both the signature image and any accompanying text (name, title, date). Go to Insert → Quick Parts → Save Selection to Quick Part Gallery. Name it 'My Signature'. Next time you need to sign a Word document, go to Insert → Quick Parts and select it — instant insertion every time.",
  },
  {
    question: "How do I sign a Word document on a Mac?",
    answer:
      "On Word for Mac: Create your transparent PNG on Pixocraft. Open your Word document. Go to Insert → Pictures → Picture from File. Select your PNG and click Insert. Drag to position and resize using the corner handles. The process is identical to Windows — the menu path is the same across platforms.",
  },
  {
    question: "What is the difference between a Word signature line and a PNG signature?",
    answer:
      "Word's built-in signature line (Insert → Signature Line) creates a placeholder field that requires Microsoft Office's own signature process — it prompts the recipient to sign digitally using their Microsoft account. A PNG signature is a visual image of your actual handwritten signature inserted directly into the document — simpler, no Microsoft account required, and accepted by all parties for everyday commercial documents.",
  },
  {
    question: "How do I add a signature to a Word document on Google Docs after converting?",
    answer:
      "If you're working between Word and Google Docs: download your PNG from Pixocraft. In Google Docs, go to Insert → Image → Upload from computer. Select your PNG. Position and resize. Save as .docx if needed. The PNG embeds in the file and survives format conversion between Docs and Word.",
  },
  {
    question: "Can I add a handwritten signature to Word without a drawing pad?",
    answer:
      "Yes — two easy ways. Use Pixocraft's Draw tab with your mouse (slower strokes look more natural) or your finger on a touchscreen. Or use the Type tab to select a handwriting font — the result looks like a handwritten signature with zero drawing required. Both methods produce a transparent PNG ready for Word.",
  },
  {
    question: "How do I add a signature to a Word contract for GST or legal use?",
    answer:
      "Create your PNG using Pixocraft. Open the Word contract. Insert the PNG at the authorised signatory block at the bottom of the last page. Resize to 3–5 cm wide. Position above the printed name and title. Add the date beside or below the signature. Save as PDF for sharing — Word contracts converted to PDF with embedded signatures are legally valid under IT Act 2000.",
  },
  {
    question: "Why is my signature appearing with a white background in Word?",
    answer:
      "This happens when you insert a JPG instead of a transparent PNG. JPG always has a white background which shows up as a white rectangle in Word. Solution: go back to Pixocraft, click Download — the file is a .png with a transparent background. Delete the JPG from your Word document and insert the PNG instead.",
  },
  {
    question: "Can I wrap text around my signature in Word?",
    answer:
      "Yes. After inserting your PNG, right-click it and select 'Wrap Text'. Choose 'Behind Text' for a watermark-style placement, 'In Front of Text' to float over existing content, or 'Tight' to wrap text around the signature shape. For standard contract signatures, 'In Line with Text' at the signature block location is most professional.",
  },
];

const SIX_STEPS = [
  { n: 1, title: "Create your signature",          desc: "Use Pixocraft's tool below — Draw with mouse or finger, Type in a handwriting font, or Upload an existing signature image." },
  { n: 2, title: "Download transparent PNG",        desc: "Click 'Download Signature' — your transparent PNG saves to your device at 3200 px resolution, no watermark." },
  { n: 3, title: "Open your Word document",         desc: "Open the Word file you need to sign — on desktop (Windows or Mac) or in the Word mobile app." },
  { n: 4, title: "Insert → Pictures → select PNG", desc: "In Word: Insert tab → Pictures → This Device (desktop) or Gallery/Photo Library (mobile). Select your downloaded PNG." },
  { n: 5, title: "Adjust size and position",        desc: "Drag the image to the signature block. Resize using corner handles — aim for 3–5 cm wide. Right-click → Wrap Text if needed." },
  { n: 6, title: "Save your document",              desc: "Save as .docx or export to PDF. Your signature is permanently embedded — no additional signing step required." },
];

const METHODS_COMPARISON = [
  { method: "PNG Insert (This Method)", ease: "45 seconds", format: "Any Word version", result: "Professional transparent", cost: "Free" },
  { method: "Word Signature Line",      ease: "Requires MS account", format: "Word 365 only",  result: "Digital cert placeholder", cost: "Requires Office sub" },
  { method: "Print, sign, scan",        ease: "5–10 minutes",   format: "Any",            result: "Low quality, slow", cost: "Printer & scanner" },
  { method: "Third-party eSign app",    ease: "Account setup",  format: "Web-based",      result: "Per-document charge", cost: "Paid plans" },
];

const PLATFORM_COMPARISON = [
  { tool: "Microsoft Word",  ease: "Very easy",  useCase: "Contracts, reports, employment letters",     instruction: "Insert → Pictures → This Device" },
  { tool: "Google Docs",     ease: "Easy",        useCase: "Online collaboration, quick documents",      instruction: "Insert → Image → Upload from computer" },
  { tool: "PDF (Final docs)", ease: "Easiest",    useCase: "Contracts ready to send, GST invoices",      instruction: "Use Pixocraft's Add Signature to PDF tool" },
];

const USE_CASES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />,  title: "GST Invoices (Word template)", desc: "Many businesses use Word templates for GST invoices. Insert your PNG at the authorised signatory block — transparent background overlays cleanly on any invoice design." },
  { icon: <Scale className="h-5 w-5 text-primary" />,    title: "Contracts & NDAs",             desc: "Execute Word-format contracts and NDAs digitally. Insert PNG at the signature block, save as PDF and share — legally valid under IT Act 2000." },
  { icon: <BookOpen className="h-5 w-5 text-primary" />, title: "Reports & Proposals",          desc: "Sign off Word reports, project proposals, and consulting documents with a professional handwritten-style digital signature." },
  { icon: <Users className="h-5 w-5 text-primary" />,    title: "Offer & Employment Letters",   desc: "HR teams sign Word-format offer letters, appointment letters, and employment contracts with a consistent digital signature — no printing required." },
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Legal Correspondence",         desc: "Law firms, CAs, and legal professionals sign Word-format letters, notices, and correspondences — exported to PDF after signing for final delivery." },
  { icon: <Monitor className="h-5 w-5 text-primary" />,  title: "Word 365 Online",              desc: "Insert PNG signatures in Word 365 for the web (office.com) — same Insert → Pictures process as the desktop app, works on any browser." },
];

const MISTAKES = [
  { title: "Using JPG instead of transparent PNG", body: "The most common mistake. JPG creates a white rectangle around the signature when inserted on any non-white Word document area — letterhead, coloured table cells, or branded templates. Always download as transparent PNG from Pixocraft." },
  { title: "Wrong signature size in the document", body: "A signature that is too large dominates the page and looks unprofessional. Too small and it appears hesitant or rushed. Aim for 3–5 cm wide in an A4 document. Use Word's 'Size and Position' dialog (right-click the image) for precise control." },
  { title: "Placing signature in the wrong location", body: "The signature block is always at the bottom of the last page — below all contractual terms, above the printed name, title, and date. Never place it mid-document, outside the designated block, or overlapping body text." },
  { title: "Using 'Inline with text' wrapping at the wrong position", body: "If you insert the PNG and it appears in the middle of a sentence, change the wrap setting. Right-click → Wrap Text → In Front of Text (to float it precisely) or add the signature to a table cell at the bottom for cleaner positioning." },
  { title: "Saving as .doc instead of .docx or PDF", body: "The old .doc format has limited image embedding support. Always save signed Word documents as .docx or export to PDF. PDF is the recommended final format for sharing signed documents — it locks the layout and prevents accidental editing." },
];

const PRO_TIPS = [
  { title: "Save your PNG signature permanently",          body: "Store your transparent PNG in a dedicated folder (or Google Drive) and reuse the exact same file across every Word document. Consistency is professionally and legally important — your signature should look identical on every document you sign." },
  { title: "Create a Word Quick Part for faster signing",  body: "After inserting your signature PNG: select it + your typed name and title → Insert → Quick Parts → Save Selection to Quick Part Gallery. Name it 'Signature Block'. For every future Word document, go to Insert → Quick Parts → your saved signature — instant insertion." },
  { title: "Export to PDF before sharing",                 body: "After inserting your signature in Word, export to PDF (File → Save As → PDF). PDF locks the document layout, prevents the signature from moving, and is the universally accepted format for signed contracts, GST invoices, and legal correspondence." },
  { title: "Use dark ink for professional documents",      body: "Black (#000000) and dark navy (#1a1a2e) are standard for formal Word documents — contracts, GST invoices, official letters. These colours reproduce clearly in both digital viewing and printing." },
  { title: "Test your signature in a real template first", body: "After downloading your PNG, insert it into a test copy of your Word template before using it on a live document. Verify the transparent background overlays cleanly and the size looks professional at the standard zoom level." },
];

export default function HowToAddSignatureInWord() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "How to Add Signature in Word Free – Step-by-Step Guide | Pixocraft",
    description:
      "Learn how to add signature in Word free in 45 seconds. Step-by-step guide with transparent PNG method. Works on Word 365, mobile and GST documents. No signup required.",
    keywords:
      "how to add signature in word, add signature in word free, insert signature in word document, microsoft word signature, word digital signature, how to insert signature in word 2026, add signature in word without printing, how to sign word document online, signature in word mobile",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Signature for Word – Pixocraft",
    description:
      "Create a free transparent PNG signature and insert it into any Microsoft Word document in 45 seconds. Works in Word 365, Word 2021, Word for Mac, and Word mobile. No login, 100% private.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web, iOS, Android",
    offers: { price: "0", priceCurrency: "INR" },
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                          url: "https://tools.pixocraft.in/" },
    { name: "Tools",                         url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { label: "Signature Generator", url: "/tools/signature-generator" },
    { name: "How to Add Signature in Word",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "How to Add Signature in Word Free – Step-by-Step Guide | Pixocraft",
    description:
      "Learn how to add signature in Word free in 45 seconds. Step-by-step guide with transparent PNG method. Works on Word 365, mobile and GST documents. No signup required.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Add Signature in Word Free",
    description:
      "Add a professional digital signature to any Microsoft Word document in 45 seconds using the transparent PNG method — no printing, no scanning, no paid software.",
    steps: SIX_STEPS.map((s) => ({ name: s.title, text: s.desc })),
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
          { label: "Home",                        url: "https://tools.pixocraft.in/" },
          { label: "Tools",                       url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "How to Add Signature in Word" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileImage className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                How to Add Signature in Word Free – Step-by-Step Guide (2026)
              </h1>
              <p className="text-sm text-muted-foreground">45 Seconds · No Signup · Word 365 &amp; Mobile · No Print or Scan</p>
            </div>
          </div>

          {/* Snippet-optimised direct answer */}
          <div className="rounded-xl border bg-primary/5 px-6 py-5 mb-5">
            <p className="text-foreground font-medium leading-relaxed">
              You can <strong>add a signature in Word</strong> by creating a transparent PNG signature and inserting it
              using <strong>Insert → Pictures → select file → adjust position</strong>. No printing, no scanning,
              no paid software. Total time: under 45 seconds.
            </p>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />,        label: "45-Second Method" },
              { icon: <Lock className="h-3.5 w-3.5" />,        label: "No Signup Required" },
              { icon: <Monitor className="h-3.5 w-3.5" />,    label: "Works in Word 365 & Mobile" },
              { icon: <Shield className="h-3.5 w-3.5" />,      label: "100% Private" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />,  label: "GST & Contract Ready" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground"
              >
                {icon}{label}
              </span>
            ))}
          </div>

          {/* 6-step snippet block */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">How to add signature in Word — quick steps:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SIX_STEPS.map(({ n, title }) => (
                <div key={n} className="flex items-center gap-3 p-3 rounded-xl border bg-card">
                  <span className="shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{n}</span>
                  <p className="text-sm font-medium text-foreground">{title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* UX psychology */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { icon: <Zap className="h-3.5 w-3.5 text-primary" />,        label: "Most users finish in under 45 seconds" },
              { icon: <Check className="h-3.5 w-3.5 text-primary" />,      label: "No print or scan needed" },
              { icon: <Smartphone className="h-3.5 w-3.5 text-primary" />, label: "Works on mobile Word app" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                {icon}{label}
              </div>
            ))}
          </div>

          <div className="flex justify-center sm:justify-start">
            <Button
              onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
              className="gap-2"
              data-testid="button-create-word-signature"
            >
              <PenTool className="h-4 w-4" />Create Signature for Word Now<ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <div id="tool" className="mb-12">
          <SignaturePadWidget />
          <p className="text-xs text-muted-foreground text-center mt-3">
            No watermark · No server upload · Transparent PNG · Ready for Word, Google Docs &amp; PDF
          </p>
        </div>

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Why this method */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why the PNG Method Is the Best Way to Add Signature in Word</h2>
            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                The old <strong>print → sign → scan</strong> method takes 5–10 minutes, requires a printer and scanner,
                and produces a low-quality result. Paid eSign tools charge per document. Word's own Signature Line feature
                requires a Microsoft account and is only available in Word 365. The <strong>transparent PNG method</strong>
                — create once with Pixocraft, insert into any Word document — is faster, free, and produces a professional result
                on every Word version and platform.
              </p>
            </div>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[500px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Method</th>
                    <th className="text-left px-4 py-3 font-semibold text-primary">Time</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Compatibility</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {METHODS_COMPARISON.map(({ method, ease, format, cost }) => (
                    <tr key={method} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-medium text-foreground text-sm">{method}</td>
                      <td className="px-4 py-3.5 text-primary/80 font-medium text-sm">{ease}</td>
                      <td className="px-4 py-3.5 text-muted-foreground text-sm">{format}</td>
                      <td className="px-4 py-3.5 text-muted-foreground text-sm">{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Step-by-step */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Add Signature in Word — Complete Step-by-Step Guide</h2>
            <p className="text-muted-foreground mb-5">
              Full walkthrough for adding a professional digital <strong>signature in Word</strong> — from creating the PNG
              to inserting and positioning it. Under 45 seconds total:
            </p>
            <ol className="space-y-4 mb-6">
              {SIX_STEPS.map(({ n, title, desc }) => (
                <li key={n} className="flex gap-4 p-5 rounded-xl border bg-card">
                  <span className="shrink-0 h-9 w-9 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">{n}</span>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Step {n}: {title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Platform-specific notes */}
            <div className="rounded-xl border bg-card p-5 mb-5">
              <p className="font-semibold text-foreground mb-3">Platform-specific paths for Step 4:</p>
              <div className="space-y-2 text-sm">
                {[
                  { platform: "Word (Windows)",    path: "Insert tab → Pictures → This Device → select PNG" },
                  { platform: "Word (Mac)",        path: "Insert → Pictures → Picture from File → select PNG" },
                  { platform: "Word 365 Online",   path: "Insert → Pictures → This Device → select PNG" },
                  { platform: "Word (Android)",    path: "Insert icon → Pictures → Gallery → select PNG" },
                  { platform: "Word (iOS)",        path: "Insert icon → Photos → select from Camera Roll" },
                ].map(({ platform, path }) => (
                  <div key={platform} className="flex items-start gap-2">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">{platform}:</strong> <span className="text-muted-foreground">{path}</span></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
                className="gap-2"
                data-testid="button-steps-cta"
              >
                <PenTool className="h-4 w-4" />Create Word Signature Now<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Word vs Google Docs vs PDF */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Word vs Google Docs vs PDF — Which Is Best for Signatures?</h2>
            <p className="text-muted-foreground mb-5">The transparent PNG signature works across all three — here is when to use each:</p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Tool</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Ease</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Use Case</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">Insert Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {PLATFORM_COMPARISON.map(({ tool, ease, useCase, instruction }) => (
                    <tr key={tool} className="hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-3.5 font-semibold text-foreground text-sm">{tool}</td>
                      <td className="px-4 py-3.5 text-muted-foreground text-sm">{ease}</td>
                      <td className="px-4 py-3.5 text-muted-foreground text-sm">{useCase}</td>
                      <td className="px-4 py-3.5 text-muted-foreground text-sm font-mono text-xs">{instruction}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 text-sm">
              <strong className="flex items-center gap-1.5 mb-1 text-foreground"><BadgeCheck className="h-4 w-4 text-primary" />Recommended workflow:</strong>
              <p className="text-muted-foreground leading-relaxed">
                Create your document in Word, insert your PNG signature, then <strong>export to PDF</strong> (File → Save As → PDF)
                before sharing. PDF locks the layout, prevents editing, and is the universally accepted format for signed
                contracts, GST invoices, and legal correspondence.
              </p>
            </div>
          </section>

          {/* Use Cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Real Use Cases — Adding Signature in Word for Indian Business</h2>
            <p className="text-muted-foreground mb-5">Common Word documents that require a professional digital signature:</p>
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

          {/* Legal Validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Is a Digital Signature in a Word Document Legally Valid?</h2>
            <p className="text-muted-foreground mb-5">Yes — here is the complete legal framework for Word document signatures in India:</p>
            <div className="space-y-4 mb-5">
              {[
                {
                  title: "IT Act 2000 — Electronic Signature on Word Documents",
                  body: "The Information Technology Act 2000 (Section 3A) recognises electronic signatures for commercial transactions. A PNG image signature inserted into a Word document — and exported to PDF — constitutes a Simple Electronic Signature (SES) legally valid for contracts, NDAs, employment letters, and most commercial documents.",
                },
                {
                  title: "Indian Contract Act 1872 — Word Contract Execution",
                  body: "The Indian Contract Act 1872 does not require signatures to be in physical ink form. Word documents with digital PNG signatures that have been agreed to by both parties constitute valid commercial contracts enforceable in Indian civil courts — provided all other elements of a valid contract are present (offer, acceptance, consideration, capacity).",
                },
              ].map(({ title, body }) => (
                <div key={title} className="rounded-xl border bg-card p-5">
                  <p className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <BadgeCheck className="h-5 w-5 text-primary shrink-0" />{title}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 px-5 py-4 text-sm text-amber-900 dark:text-amber-200">
              <strong className="flex items-center gap-1.5 mb-1"><AlertCircle className="h-4 w-4" />Note:</strong>
              For MCA ROC filings, court e-filing, and income tax portal authentication, a Class 3 DSC is required — a PNG
              image signature in Word is not sufficient for these specific regulated submissions.
            </div>
          </section>

          {/* Common Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Adding a Signature in Word</h2>
            <p className="text-muted-foreground mb-5">These are the most frequent errors — and how to fix each one:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for Adding Signatures in Word Like a Professional</h2>
            <p className="text-muted-foreground mb-5">Tips used by Indian professionals, CAs, and freelancers who sign Word documents daily:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Why Use Pixocraft to Create Your Word Signature?</h2>
            <p className="text-muted-foreground mb-5">The fastest free signature tool for Microsoft Word users in 2026:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {[
                { icon: <Zap className="h-4 w-4 text-primary" />,        title: "45-second workflow",            body: "Open → create → download → insert in Word. Under 45 seconds from start to signed document." },
                { icon: <Shield className="h-4 w-4 text-primary" />,     title: "100% private",                  body: "No data upload, no server processing. Everything runs locally in your browser — safe for sensitive contracts and GST documents." },
                { icon: <Star className="h-4 w-4 text-primary" />,       title: "Completely free",               body: "No subscription, no per-document charge, no watermark. Unlike paid Word signature plugins — free forever." },
                { icon: <Monitor className="h-4 w-4 text-primary" />,    title: "Works on all Word versions",   body: "PNG method works in Word 365, Word 2021, Word 2019, Word for Mac, and Word mobile — any version from the last decade." },
                { icon: <Download className="h-4 w-4 text-primary" />,   title: "Print-resolution PNG",         body: "3200 px export — sharp and professional at any Word document size, from email attachments to A3 print." },
                { icon: <Layers className="h-4 w-4 text-primary" />,     title: "One PNG, every document",     body: "Save your PNG once and use it in Word, Google Docs, PDF, Excel, and email — one signature for your entire workflow." },
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
                data-testid="button-bottom-cta"
              >
                <PenTool className="h-4 w-4" />Create Signature for Word Free<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Internal links */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Related Document Signature Tools</h2>
            <p className="text-muted-foreground mb-4">Complete your signing workflow with these free tools:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/free-signature-for-documents",    label: "Free Signature for Documents",   desc: "One PNG signature for PDF, Word, Google Docs, and Excel." },
                { href: "/tools/add-signature-to-pdf",      label: "Add Signature to PDF",           desc: "Insert your signature directly into any PDF document." },
                { href: "/tools/transparent-signature-png", label: "Transparent Signature PNG",      desc: "Download your signature with a perfectly transparent background." },
                { href: "/tools/signature-for-contracts",   label: "Signature for Contracts",        desc: "Legally valid signature for NDAs and business contracts." },
                { href: "/tools/email-signature-maker",     label: "Email Signature Maker",          desc: "Professional signature for Gmail and Outlook." },
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
            <h2 className="text-2xl font-bold text-foreground mb-5">Frequently Asked Questions — How to Add Signature in Word</h2>
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
