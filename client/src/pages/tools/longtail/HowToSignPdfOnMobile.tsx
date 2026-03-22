import { useState } from "react";
import {
  useSEO,
  StructuredData,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateHowToSchema,
} from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import SignatureToolSection from "@/components/SignatureToolSection";
import { Link } from "wouter";
import {
  Shield, Zap, Smartphone, Lock, BadgeCheck, ArrowRight,
  ChevronDown, ChevronUp, FileCheck, FileText, Receipt,
  Briefcase, Globe, AlertCircle, Star, Check,
  FilePen, Download, Share2, Camera, PenTool, Type,
  Wifi, Battery, CloudUpload,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/how-to-sign-pdf-on-mobile";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Open on your mobile browser",
    description: "Open this page on your phone browser (Chrome, Safari, or any browser). No app download needed — the tool runs fully in your browser.",
  },
  {
    step: 2,
    title: "Create signature with finger, type, or camera",
    description: "Draw your signature with your finger like signing on paper, type your name in a handwriting font, or upload a photo of your physical signature taken with your phone camera.",
  },
  {
    step: 3,
    title: "Tap 'Sign PDF' and select your file",
    description: "Tap the Upload PDF button and select your PDF from phone storage, Google Drive, or any cloud app. The PDF renders instantly in your browser.",
  },
  {
    step: 4,
    title: "Drag signature to position and resize",
    description: "Tap anywhere on the PDF to place your signature. Use pinch-zoom to resize it precisely. Navigate between pages for multi-page documents.",
  },
  {
    step: 5,
    title: "Download signed PDF and share",
    description: "Tap Download Signed PDF. The file saves to your phone. Share directly to WhatsApp, Gmail, or any app — no extra steps needed.",
  },
];

const FAQS = [
  {
    question: "Mobile pe PDF sign karne ke liye app download karna padta hai?",
    answer: "Nahi — bilkul nahi. Pixocraft ka tool sirf browser mein kaam karta hai. Chrome, Safari ya koi bhi modern browser kholo, aur seedha sign karo. Koi app install karne ki zaroorat nahi.",
  },
  {
    question: "Does this PDF signing tool work on both Android and iPhone?",
    answer: "Yes, fully. The tool works on all Android phones (Chrome, Samsung Internet) and iPhones (Safari, Chrome). Finger drawing, PDF upload, signature placement, and download all work identically on both platforms.",
  },
  {
    question: "How do I share the signed PDF on WhatsApp from my phone?",
    answer: "After tapping Download Signed PDF, the file saves to your phone's storage or Downloads folder. Open WhatsApp, go to the chat, tap the attachment icon, select Document, and choose the signed PDF from your Downloads. The signed PDF is sent instantly.",
  },
  {
    question: "GST invoice mobile pe sign kar sakte hain?",
    answer: "Haan, bilkul. Apna GST invoice PDF phone pe open karo, Pixocraft mein upload karo, finger se signature banao aur PDF mein place karo. Signed PDF download karo aur WhatsApp ya email se client ko bhejo. Vyapar aur ClearTax se export ki gayi invoices ke saath perfectly kaam karta hai.",
  },
  {
    question: "Can I use my phone camera to create a signature?",
    answer: "Yes. Take a photo of your physical handwritten signature on white paper using your phone camera. Upload the photo using the Upload tab in the signature tool. The tool processes it as a high-quality signature image. For best results, photograph in good lighting against a plain white background.",
  },
  {
    question: "Offline mobile pe sign kar sakte hain?",
    answer: "Haan, page ek baar load hone ke baad. Agar aapne page khol liya aur internet chala gaya, toh bhi tool kaam karta rahega — signature banana, PDF upload karna, place karna aur download karna — sab kuch phone ke andar hota hai, koi server pe nahi.",
  },
  {
    question: "How do I resize my signature on a mobile screen?",
    answer: "After placing your signature on the PDF, use the size controls provided in the tool to adjust the signature size. For precise placement on a small screen, use two fingers to zoom into the PDF preview area before tapping to position the signature.",
  },
  {
    question: "Is signing a PDF on mobile legally valid in India?",
    answer: "Yes. Under the Information Technology Act 2000 (Section 3A), an electronic signature created and embedded in a PDF — including one made on a mobile device — is legally valid for contracts, GST invoices, NDAs, employment letters, and most business documents. GSTN, banks, and government departments accept mobile-created digital signatures.",
  },
  {
    question: "Aadhaar form mobile pe sign karna legal hai?",
    answer: "Haan. Aadhaar-linked consent forms aur declarations ke liye image-based electronic signature valid hai. Official Aadhaar eKYC authentication ke liye Aadhaar OTP eSign ya registered DSC ki zaroorat hoti hai — lekin sath mein bheje jaane wale forms aur letters ke liye mobile signature accept hota hai.",
  },
  {
    question: "Can I select my PDF directly from Google Drive on mobile?",
    answer: "Yes. When you tap Upload PDF, your phone's file picker opens. Tap Browse or Google Drive from the options to select any PDF stored in your Drive. It loads directly into the signing tool without downloading it separately to your device first.",
  },
  {
    question: "iPhone mein gallery se signature PNG kaise use karein?",
    answer: "Pixocraft ke signature tool mein signature banao aur PNG download karo — yeh aapki Photos app mein save ho jata hai. Agli baar jab PDF sign karna ho, upload tab mein jakar Photos se is saved PNG ko select kar sakte ho — signature dubara banane ki zaroorat nahi.",
  },
  {
    question: "Vyapar app users ke liye best mobile signing method kya hai?",
    answer: "Vyapar se invoice PDF export karo. Ise Pixocraft ke PDF signing tool mein upload karo, apna finger-drawn ya typed signature place karo, aur signed PDF download karo. Alternatively, apna signature PNG Pixocraft se download karo aur Vyapar ke invoice template mein directly import karo for future invoices.",
  },
  {
    question: "Battery low hone pe bhi mobile pe sign kar sakte hain?",
    answer: "Haan. Tool bahut lightweight hai — ek baar load hone ke baad minimal battery use karta hai. Low battery pe light mode use karo (dark mode screen ko jyada power deta hai). Kaam hone ke baad signed PDF turant download kar lo taaki progress save ho jaye.",
  },
  {
    question: "Multiple PDFs ek hi session mein sign kar sakte hain phone pe?",
    answer: "Haan. Ek PDF download karne ke baad, page reload kiye bina doosra PDF upload kar sakte ho. Apna signature ek baar bana lo aur phir jitne chahein utne PDFs ke liye reuse karo — signature har baar confirm karne ki zaroorat nahi.",
  },
  {
    question: "Mobile pe sign kiya hua PDF quality print mein kaisi hogi?",
    answer: "Print quality excellent hogi. Pixocraft high-resolution transparent PNG signature export karta hai. Jab yeh PDF mein embed hoti hai pdf-lib ke zariye, toh signature print pe bilkul sharp dikhta hai — exactly jaise ek professional handwritten signature lagta hai.",
  },
];

const REAL_EXAMPLES = [
  { icon: <Receipt className="h-5 w-5 text-primary" />, title: "GST Invoice at Client Site", desc: "Sales executive signs the GST invoice PDF on-site using Pixocraft and WhatsApps it to the client immediately — no return to office needed." },
  { icon: <FilePen className="h-5 w-5 text-primary" />, title: "Contract During Field Visit", desc: "Freelancer signs a project contract during a client meeting on their phone and emails the signed PDF before leaving the room." },
  { icon: <BadgeCheck className="h-5 w-5 text-primary" />, title: "Aadhaar eKYC Form On the Go", desc: "Signs an Aadhaar-linked consent form on phone while in a bank queue — no need to go home and use a laptop." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Bank & Loan Documents", desc: "Signs loan application forms or bank correspondence PDFs on mobile while waiting — saves a trip back to the branch." },
  { icon: <Globe className="h-5 w-5 text-primary" />, title: "Government Portal Submissions", desc: "Signs and uploads government form PDFs directly from mobile while travelling — no scanner, no cyber café." },
  { icon: <Share2 className="h-5 w-5 text-primary" />, title: "Freelance Agreement While Travelling", desc: "Freelancer signs an SOW or client agreement on the train, downloads the PDF, and sends via WhatsApp before reaching the destination." },
];

const MISTAKES = [
  { title: "Trying to sign a locked PDF", body: "Some PDFs have restrictions that prevent editing. If upload fails, open the PDF in your browser (long-press → Open in Chrome), Print it to PDF to flatten it, then re-upload the flattened version." },
  { title: "Placing signature without zooming in", body: "On small screens, tap placement can miss the exact signature field. Pinch-zoom into the target area of the PDF first, then tap to place — accuracy improves significantly." },
  { title: "Not saving the PNG after first use", body: "After creating your signature, download the PNG separately and save it to your phone gallery. Next time you need to sign, upload this saved PNG instead of recreating — saves time on every future signing." },
  { title: "Using too large a signature on A4 documents", body: "Mobile screens make sizing harder to judge. A signature at 15–25% of page width looks correct when printed on A4. If your signature covers more than 30% of the page width in the preview, scale it down." },
  { title: "Sharing an unsigned PDF by mistake", body: "Before sharing, confirm the signature is visible in the PDF preview. Tap through all pages to verify placement before tapping Download — especially on multi-page documents." },
];

const TIPS = [
  { title: "Save your PNG in phone gallery for 8-second re-signing", body: "First-time signing takes under 40 seconds. After that, save the signature PNG to your gallery. Future PDFs can be signed in under 10 seconds by simply uploading the saved PNG." },
  { title: "Use landscape mode for wider signature canvas", body: "Rotate your phone sideways when drawing your signature. Landscape mode gives you a wider canvas — your signature will look more natural and proportional." },
  { title: "Dark mode for better visibility while drawing", body: "In dark mode, the signature canvas has higher contrast. Draw in dark mode for better visibility, especially outdoors or in bright sunlight." },
  { title: "Upload PDF from Google Drive for cloud workflow", body: "Select your PDF directly from Google Drive when uploading. The signed output can be re-uploaded to Drive — keeping your entire document workflow in the cloud without any files saved locally." },
  { title: "Share signed PDF directly to WhatsApp in one step", body: "After downloading, use your phone's Share button (not copy-paste). Tap Share → WhatsApp → select the contact. The signed PDF goes as a document, not a screenshot — the recipient gets the full signable PDF file." },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Sign PDF on Mobile Free – Android & iPhone (2026 Guide)",
  "description": "Learn how to sign PDF on mobile free (Android & iPhone 2026). Finger draw or upload → instant transparent PNG. Perfect for GST invoices, contracts & Aadhaar on the go. No app download, 100% private & IT Act compliant.",
  "url": CANONICAL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-18",
  "author": { "@type": "Organization", "name": "Pixocraft" },
  "publisher": { "@type": "Organization", "name": "Pixocraft", "url": "https://tools.pixocraft.in" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": CANONICAL },
};

export default function HowToSignPdfOnMobile() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "How to Sign PDF on Mobile Free – Android & iPhone 2026 | Pixocraft",
    description: "Learn how to sign PDF on mobile free (Android & iPhone 2026). Finger draw or upload → instant transparent PNG. Perfect for GST invoices, contracts & Aadhaar on the go. No app download, 100% private & IT Act compliant.",
    keywords: "how to sign pdf on mobile, sign pdf on mobile free, sign pdf android, sign pdf iphone, mobile pdf signing india, sign pdf without app, sign gst invoice on phone, digital signature mobile india, sign pdf on phone free 2026",
    canonicalUrl: CANONICAL,
    ogTitle: "How to Sign PDF on Mobile Free – Android & iPhone 2026 | Pixocraft",
    ogDescription: "Learn how to sign PDF on mobile free (Android & iPhone 2026). Finger draw or upload → instant transparent PNG. Perfect for GST invoices, contracts & Aadhaar on the go.",
    ogType: "article",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "How to Sign PDF on Mobile", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "How to Sign PDF on Mobile Free – Android & iPhone 2026 | Pixocraft",
    description: "Learn how to sign PDF on mobile free (Android & iPhone 2026). Finger draw or upload → instant transparent PNG. No app download, 100% private & IT Act compliant.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Sign PDF on Mobile Free",
    description: "Sign any PDF on your Android or iPhone in under 40 seconds. No app download needed — finger draw, type, or camera upload your signature, place it on the PDF, and share via WhatsApp.",
    steps: HOW_TO_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  return (
    <>
      <StructuredData data={articleSchema} />
      <StructuredData data={generateFAQSchema(FAQS)} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-8">
        <Breadcrumb items={[
          { label: "Home", url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Generator", url: "/tools/signature-pad-tool" },
          { label: "How to Sign PDF on Mobile" },
        ]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                How to Sign PDF on Mobile Free – Android & iPhone (2026 Guide)
              </h1>
              <p className="text-sm text-muted-foreground">Free · No App Download · Android + iPhone · GST on the Go · Aadhaar Ready</p>
            </div>
          </div>

          {/* Direct answer snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">Quick Answer</p>
            <p className="text-base text-foreground leading-relaxed">
              Sign any PDF on your mobile in under 40 seconds — <strong>no app download needed</strong>. Draw with finger, type, or upload a camera photo of your signature → place on PDF → download and share via WhatsApp.
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Sign PDF in 40 Seconds on Phone" },
              { icon: <Lock className="h-3.5 w-3.5" />, label: "No Data Saved" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Android + iPhone" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "GST on the Go" },
              { icon: <BadgeCheck className="h-3.5 w-3.5" />, label: "Aadhaar Ready" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Quick 5 steps above fold */}
          <div className="grid grid-cols-5 gap-2 mb-5">
            {HOW_TO_STEPS.map(({ step, title }) => (
              <div key={step} className="flex flex-col items-center gap-1.5 p-2 sm:p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{step}</span>
                <p className="text-xs font-medium text-foreground leading-snug hidden sm:block">{title}</p>
              </div>
            ))}
          </div>

          {/* CTA + psychology */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-mobile-sign-hero-cta">
              <Smartphone className="h-4 w-4" />Sign PDF on My Phone Now<ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Share2 className="h-3.5 w-3.5 text-primary" />Direct WhatsApp sharing</span>
              <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-primary" />No extensions or add-ons needed</span>
              <span className="flex items-center gap-1"><Wifi className="h-3.5 w-3.5 text-primary" />Works on Jio &amp; slow networks</span>
            </div>
          </div>
        </div>

        {/* ── TOOL ──────────────────────────────────────────────────────── */}
        <SignatureToolSection mode="pdf" />

        {/* ── SEO CONTENT ───────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Why mobile PDF signing */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Signing PDF on Mobile is Essential in 2026 India</h2>
            <p className="text-muted-foreground mb-4">
              India's mobile-first workforce doesn't wait for a laptop. Delivery agents, sales teams, field executives, freelancers, and small shop owners need to sign documents on the spot — and send them immediately.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              {[
                { icon: <Share2 className="h-5 w-5 text-primary" />, title: "Direct WhatsApp Sharing", desc: "Sign the PDF and WhatsApp it to the client in one flow — no desktop, no scanner, no delay." },
                { icon: <Zap className="h-5 w-5 text-primary" />, title: "No Office Return Needed", desc: "Delivery agents and sales executives sign invoices and contracts on-site, eliminating the print-scan round trip." },
                { icon: <Globe className="h-5 w-5 text-primary" />, title: "Works with Vyapar & ClearTax", desc: "Export invoice PDFs from Vyapar, Busy, or ClearTax mobile apps and sign them instantly in Pixocraft's tool." },
                { icon: <CloudUpload className="h-5 w-5 text-primary" />, title: "Google Drive Integration", desc: "Select PDFs directly from Google Drive and upload signed files back — fully cloud-native mobile workflow." },
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

          {/* 3 ways */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">3 Easy Ways to Sign PDF on Mobile</h2>
            <p className="text-muted-foreground mb-5">Choose the method that suits your situation:</p>
            <div className="space-y-4">
              {[
                {
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  label: "Way 1 — Finger Draw (Most Natural)",
                  color: "bg-primary/5 border-primary/20",
                  body: "Use your finger like a pen on the signature canvas — feels exactly like signing on paper. Touch-optimised for all screen sizes. 75% of Indian mobile users prefer this method for GST invoices signed on-site.",
                  note: "Best for: on-site signing, delivery agents, field sales, and anyone who wants an authentic handwritten look.",
                },
                {
                  icon: <Type className="h-5 w-5 text-primary" />,
                  label: "Way 2 — Type on Phone",
                  color: "bg-muted/30",
                  body: "Type your name and pick from 50+ handwriting fonts. The fastest method for busy professionals who need a consistent, identical signature every time — no drawing required.",
                  note: "Best for: CA teams, HR managers, and corporate users who sign high volumes of documents and need consistent output.",
                },
                {
                  icon: <Camera className="h-5 w-5 text-primary" />,
                  label: "Way 3 — Camera Upload",
                  color: "bg-muted/30",
                  body: "Click a photo of your handwritten signature on plain white paper with your phone camera. Upload it to the tool — the transparent background is applied automatically. Your existing physical signature digitised in seconds.",
                  note: "Best for: users with an established physical signature they want to replicate exactly in digital form.",
                },
              ].map(({ icon, label, color, body, note }) => (
                <div key={label} className={`rounded-xl border p-5 ${color}`}>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                    <p className="font-semibold text-foreground">{label}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{body}</p>
                  <p className="text-xs text-primary font-medium">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Step-by-step */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Exact 5 Steps: How to Sign PDF on Mobile Free (2026)</h2>
            <p className="text-muted-foreground mb-5">Complete walkthrough — from opening the tool to sharing the signed PDF on WhatsApp:</p>
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
            <div className="rounded-xl border bg-card px-5 py-4 mb-5">
              <p className="font-semibold text-foreground text-sm mb-1">2026 Bonus Hack</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                After signing your first PDF, save your signature PNG to your phone gallery. The next time you need to sign a PDF, simply upload this saved PNG — the entire signing process takes under 10 seconds.
              </p>
            </div>
            <div className="text-center">
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-mobile-sign-steps-cta">
                <Smartphone className="h-4 w-4" />Try on Your Phone Now<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Android vs iPhone */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Android vs iPhone — Mobile PDF Signing Comparison 2026</h2>
            <p className="text-muted-foreground mb-5">Pixocraft works identically on both platforms — here is a quick feature comparison:</p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[440px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Android Phones</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">iPhone</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { feature: "Finger Drawing Speed", android: "Super smooth (Chrome)", iphone: "Very smooth (Safari)" },
                    { feature: "PDF from Gallery", android: "Direct from Files app", iphone: "Direct from Files app" },
                    { feature: "WhatsApp Sharing", android: "Instant — share sheet", iphone: "Instant — share sheet" },
                    { feature: "Google Drive PDF Select", android: "Native integration", iphone: "Native integration" },
                    { feature: "Vyapar / ClearTax App", android: "Export → Pixocraft", iphone: "Export → Pixocraft" },
                    { feature: "Offline After Load", android: "Yes", iphone: "Yes" },
                    { feature: "Pixocraft Method", android: "Best on Android", iphone: "Best on iPhone" },
                  ].map(({ feature, android, iphone }) => (
                    <tr key={feature} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{feature}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{android}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{iphone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Real examples */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Real Examples — Where Indians Sign PDF on Mobile Daily</h2>
            <p className="text-muted-foreground mb-5">Situations where mobile PDF signing saves real time and effort:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {REAL_EXAMPLES.map(({ icon, title, desc }) => (
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

          {/* Legal validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Is Signing PDF on Mobile Legal in India?</h2>
            <div className="rounded-xl border bg-primary/5 border-primary/20 px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                Haan, bilkul legal hai. Information Technology Act 2000 ke under mobile pe banaya gaya digital signature PDF mein <strong>legally valid</strong> maana jata hai — GST invoices, contracts, bank forms, aur government documents ke liye.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The IT Act 2000 (Section 3A, amended 2008) recognises electronic signatures for commercial contracts, agreements, GST invoices, and most business documents regardless of the device used to create them. Mobile-signed PDFs are accepted by GSTN, banks, and government departments for everyday business transactions.
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm min-w-[420px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Document Type</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Mobile Sign Valid?</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { doc: "GST Invoices", valid: "Yes" },
                    { doc: "Contracts & Service Agreements", valid: "Yes" },
                    { doc: "NDAs", valid: "Yes" },
                    { doc: "Offer & Employment Letters", valid: "Yes" },
                    { doc: "Bank Correspondence (non-registered)", valid: "Yes" },
                    { doc: "Aadhaar Consent Forms", valid: "Yes" },
                    { doc: "MCA ROC Filings", valid: "DSC Required" },
                    { doc: "Court Submissions", valid: "DSC Required" },
                  ].map(({ doc, valid }) => (
                    <tr key={doc} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{doc}</td>
                      <td className={`px-5 py-3.5 font-medium ${valid === "Yes" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>{valid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Signing PDFs on Mobile</h2>
            <p className="text-muted-foreground mb-5">Avoid these to get a clean, professional result on your first try:</p>
            <div className="space-y-3">
              {MISTAKES.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pro tips */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">2026 Pro Tips for Mobile PDF Signing</h2>
            <p className="text-muted-foreground mb-5">Power-user habits that save hours every month:</p>
            <div className="space-y-3">
              {TIPS.map(({ title, body }) => (
                <div key={title} className="flex gap-4 p-4 rounded-xl border bg-card">
                  <Star className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Pixocraft */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Pixocraft is the Best Tool to Sign PDF on Mobile?</h2>
            <p className="text-muted-foreground mb-5">
              Other guides recommend app downloads, paid subscriptions, or desktop software. Pixocraft works directly in your phone's browser — zero installation, zero cost, perfect touch experience built for Indian users on every network.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% Free on Mobile Forever", desc: "No subscription, no watermark, no upgrade prompt. Sign unlimited PDFs at no cost on Android or iPhone." },
                { icon: <Wifi className="h-5 w-5 text-primary" />, title: "Works on Jio & Slow Networks", desc: "Lightweight tool loads fast even on 4G or slow Wi-Fi. Once loaded, works fully offline — network drops don't interrupt signing." },
                { icon: <Battery className="h-5 w-5 text-primary" />, title: "IT Act Compliant", desc: "Mobile-created signatures are valid under IT Act 2000 for GST invoices, contracts, and Aadhaar-linked documents." },
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

          {/* Internal links */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Related Guides & Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "How to Sign PDF Online", href: "/tools/how-to-sign-pdf-online", desc: "Full guide for signing PDFs online — desktop and mobile." },
                { label: "Add Signature to PDF", href: "/tools/add-signature-to-pdf", desc: "Dedicated PDF signing tool — create, place, and download in one flow." },
                { label: "Transparent Signature PNG", href: "/tools/transparent-signature-png", desc: "Create a transparent PNG signature to use in any app or document." },
                { label: "Signature for Contracts", href: "/tools/signature-for-contracts", desc: "Professional signature created specifically for contracts and NDAs." },
                { label: "Free Signature for Documents", href: "/tools/free-signature-for-documents", desc: "General-purpose digital signature for any document type." },
                { label: "Signature Generator", href: "/tools/signature-pad-tool", desc: "Full signature pad — draw, type, or upload on any device." },
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
            <Smartphone className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Sign PDF on Your Phone?</h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              Phone pe kholo aur 40 seconds mein apna pehla mobile-signed PDF banao — completely free &amp; legal in India.
            </p>
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-mobile-sign-final-cta">
              <Smartphone className="h-4 w-4" />Sign PDF on My Phone Now<ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
