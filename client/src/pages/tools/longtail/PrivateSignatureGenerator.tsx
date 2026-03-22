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
  Shield,
  Zap,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Lock,
  BadgeCheck,
  Download,
  Smartphone,
  PenTool,
  FileText,
  Clock,
  EyeOff,
  Wifi,
  UserX,
  AlertTriangle,
  Server,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/private-signature-generator";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Open the tool",
    desc: "Scroll up — the private signature generator loads instantly in your browser. No login, no account, no data sent anywhere before you even start.",
  },
  {
    step: 2,
    title: "Draw or type your signature",
    desc: "Use the Draw tab to sketch freehand with a mouse or finger, or the Type tab to generate a handwriting-style signature from your name. All processing is fully client-side — nothing leaves your device.",
  },
  {
    step: 3,
    title: "Customise style (optional)",
    desc: "Adjust ink colour, stroke thickness, or font if needed. Defaults look professional — beginners can skip this entirely and still get a great result.",
  },
  {
    step: 4,
    title: "Preview your signature",
    desc: "Check how your signature looks before downloading. The live preview renders entirely in your browser — no server processing, no data sent anywhere to generate the preview.",
  },
  {
    step: 5,
    title: "Download instantly — no upload",
    desc: "One click saves a transparent PNG directly to your device. No file is uploaded, no data is stored on any server, and no account is required at any step.",
  },
];

const FAQS = [
  {
    question: "Is this private signature generator safe to use?",
    answer:
      "Yes — completely safe. The tool runs entirely inside your browser using the HTML5 Canvas API. Your signature data never reaches any server. There is nothing to intercept, no account to hack, and no database storing your information.",
  },
  {
    question: "Does this tool store my signature data anywhere?",
    answer:
      "No. Zero data is stored anywhere. Your signature exists only in your browser's temporary memory while you are on the page. When you close the tab, everything is cleared. No server, no database, no cloud storage is involved at any point.",
  },
  {
    question: "Can my signature be tracked or monitored?",
    answer:
      "No. Because the tool runs client-side in your browser with no server interaction, there is nothing to track. We do not log what you draw, what name you type, what colour you choose, or when you download. The entire session is private by design.",
  },
  {
    question: "Is a browser-based signature tool more secure than others?",
    answer:
      "Yes. Browser-based tools that require no upload are inherently safer than server-based tools. Server-based tools receive your signature data on their infrastructure — which can be breached, logged, or retained. Browser-based tools never receive the data at all.",
  },
  {
    question: "How do I create a signature privately online?",
    answer:
      "Open this tool, draw or type your signature, and click Download. The entire process happens inside your browser — no upload, no login, no data sent to any server. Your signature goes directly from your browser to your device as a PNG file.",
  },
  {
    question: "Does this tool upload my signature to a server?",
    answer:
      "No. There is no upload step at any point. The Canvas API generates your signature image entirely within your browser. When you click Download, the file is created locally and saved directly to your device — no network request is made.",
  },
  {
    question: "Is this tool GDPR compliant?",
    answer:
      "Yes. Because we collect no personal data whatsoever — no name, no email, no IP-linked signature data — there is nothing that falls under GDPR data processing requirements. The tool is fully privacy-compliant by architecture, not just policy.",
  },
  {
    question: "Can I use this private signature generator on my phone?",
    answer:
      "Yes. The tool is fully mobile-optimised. Draw with your finger on any Android or iOS device, or type your name and pick a font. The same zero-upload, zero-storage privacy guarantee applies on mobile.",
  },
  {
    question: "What format is best for a private signature download?",
    answer:
      "PNG with a transparent background is the best format. It is lossless, supports transparency so there is no white box around your signature, and is lightweight. Pixocraft always exports as transparent PNG at 3200×1040 px — no watermark included.",
  },
  {
    question: "Why do other signature tools require data upload?",
    answer:
      "Most tools use server-side processing because it is easier to build. This means your signature is sent to and processed on their servers — where it can be retained, analysed, or exposed in a breach. Browser-based processing avoids this risk entirely.",
  },
  {
    question: "Is the private signature generator free forever?",
    answer:
      "Yes — 100% free, with no subscription, no freemium tier, no watermark, and no usage cap. Create and download unlimited signatures at any time at zero cost.",
  },
  {
    question: "Can I reuse my downloaded signature across documents?",
    answer:
      "Yes. Download the transparent PNG once and save it to your device. Insert it into any Word document, PDF, Google Doc, or email footer as many times as you need — no need to return to the tool or log back in.",
  },
];

const SECURITY_FEATURES = [
  {
    icon: <Server className="h-5 w-5 text-primary" />,
    title: "No server interaction",
    desc: "The tool makes zero network requests when creating your signature. No data travels beyond your own browser — not even to Pixocraft's servers.",
  },
  {
    icon: <EyeOff className="h-5 w-5 text-primary" />,
    title: "No tracking of any kind",
    desc: "We do not log what you draw, what name you type, or when you download. The session is entirely invisible to us.",
  },
  {
    icon: <UserX className="h-5 w-5 text-primary" />,
    title: "No account, no identity",
    desc: "No email, no login, no name required. We cannot connect your signature to your identity because we never ask for it.",
  },
  {
    icon: <Wifi className="h-5 w-5 text-primary" />,
    title: "Works fully offline",
    desc: "Once the page is loaded, creating and downloading your signature requires no internet connection. Completely local processing.",
  },
  {
    icon: <Lock className="h-5 w-5 text-primary" />,
    title: "No data stored anywhere",
    desc: "Your signature lives in browser memory only. Close the tab and it is gone — no database, no cloud, no file system on any server.",
  },
  {
    icon: <Shield className="h-5 w-5 text-primary" />,
    title: "Breach-proof by design",
    desc: "If there is no data on a server, there is nothing to breach. The safest data handling is no data handling at all.",
  },
];

const USE_CASES = [
  { icon: <FileText className="h-4 w-4 text-primary" />, title: "Personal documents", desc: "Sign sensitive personal documents — bank forms, legal letters, insurance claims — without exposing your signature to third-party servers." },
  { icon: <Layers className="h-4 w-4 text-primary" />, title: "Contracts", desc: "Add your signature to freelance contracts and vendor agreements privately, with no copy uploaded or stored elsewhere." },
  { icon: <BadgeCheck className="h-4 w-4 text-primary" />, title: "Business use", desc: "GST invoices, purchase orders, and NDA documents — sign them with a PNG that was created entirely on your own device." },
  { icon: <FileText className="h-4 w-4 text-primary" />, title: "Sensitive files", desc: "Medical consent forms, financial authority letters, and government applications where signature privacy matters most." },
  { icon: <RefreshCw className="h-4 w-4 text-primary" />, title: "Reuse privately", desc: "Download once and save to a secure local folder. Reuse across unlimited documents without ever reconnecting to any online tool." },
  { icon: <Smartphone className="h-4 w-4 text-primary" />, title: "On-device mobile signing", desc: "Create your private signature on your phone and use it immediately — no cloud sync, no app permissions, no account." },
];

const COMPARISON = [
  { feature: "Data uploaded to server", pixocraft: "Never", others: "Always or usually" },
  { feature: "Signature data stored", pixocraft: "Not stored", others: "Often retained" },
  { feature: "Login / account needed", pixocraft: "No", others: "Usually yes" },
  { feature: "Server-side processing", pixocraft: "None", others: "Common" },
  { feature: "Risk of data breach", pixocraft: "Zero (no data)", others: "Possible" },
  { feature: "Works offline", pixocraft: "Yes", others: "Rarely" },
  { feature: "Price", pixocraft: "Free forever", others: "Free tier with limits" },
];

const RELATED_TOOLS = [
  { href: "/tools/signature-pad-tool", label: "Signature Generator", desc: "The main signature tool with advanced controls and 50+ fonts." },
  { href: "/tools/online-signature-generator-without-upload", label: "Signature Generator Without Upload", desc: "Emphasises zero-upload — no data leaves your device in any form." },
  { href: "/tools/free-signature-generator-no-login", label: "Free Signature Generator No Login", desc: "Zero-signup, instant access — no email or password needed." },
  { href: "/tools/signature-for-pdf", label: "Signature for PDF", desc: "Insert your private PNG signature directly into any PDF document." },
];

export default function PrivateSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Private Signature Generator (Secure & No Data Storage) | Pixocraft",
    description:
      "Create signature privately with no data storage or upload. 100% secure, browser-based, and free signature generator. No login, no tracking, no server interaction.",
    keywords:
      "private signature generator, secure signature generator online, safe signature maker, signature generator without data storage, privacy signature tool online, no upload signature maker, browser-based signature generator, signature generator no tracking, private digital signature free, secure signature creator",
    canonicalUrl: CANONICAL,
    ogImage: "https://tools.pixocraft.in/images/private-signature-generator.png",
    ogTitle: "Private Signature Generator – Secure & No Data Storage",
    ogDescription: "Create your signature privately. No data stored, no upload, no login. 100% browser-based and free.",
    twitterTitle: "Private Signature Generator – Secure & Free",
    twitterDescription: "Create a signature privately online. No upload, no data stored, no login. 100% browser-based.",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Private Signature Generator – Pixocraft",
    description:
      "Private, secure online signature generator. Creates your signature entirely in-browser with no upload, no data storage, and no login. 100% free.",
    url: CANONICAL,
    applicationCategory: "UtilityApplication",
    applicationSubCategory: "Private Signature Generator",
    operatingSystem: "Web, iOS, Android",
    featureList: [
      "No data storage",
      "No upload",
      "No login required",
      "Browser-based processing",
      "Works offline",
      "No tracking",
      "No server interaction",
      "Instant download",
      "Transparent PNG output",
      "Free forever",
    ],
    offers: { price: "0", priceCurrency: "INR" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "Private Signature Generator", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Private Signature Generator (Secure & No Data Storage) | Pixocraft",
    description:
      "Create signature privately with no data storage or upload. 100% secure, browser-based, and free signature generator. No login, no tracking.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Signature Privately Online",
    description:
      "Create and download a signature privately in your browser — fully client-side, no server processing, no upload, no data stored, no login required.",
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
          { label: "Home", url: "https://tools.pixocraft.in/" },
          { label: "Tools", url: "/tools" },
          { label: "Signature Tools", url: "/tools/signature-tools" },
          { label: "Signature Generator", url: "/tools/signature-pad-tool" },
          { label: "Private Signature Generator" },
        ]} />

        {/* ── HERO ───────────────────────────────────────────────── */}
        <div className="mb-3 sm:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-8 w-8 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-foreground leading-tight">
                Private Signature Generator (100% Secure &amp; Safe)
              </h1>
              <p className="text-sm text-muted-foreground">
                Create your signature privately — no data stored, no upload, no login, runs entirely in your browser.
              </p>
            </div>
          </div>

          {/* Featured Snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">
              What is a private signature generator?
            </p>
            <p className="text-base text-foreground leading-relaxed">
              A <strong>private signature generator</strong> is a secure, browser-based tool that creates your
              signature with <strong>no data stored and no upload</strong> to any server. It uses{" "}
              <strong>fully client-side processing</strong> — your signature is generated locally, downloaded
              instantly, and never shared. Complete <strong>privacy</strong> and{" "}
              <strong>data protection</strong> by design.
            </p>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
            {[
              { icon: <Server className="h-4 w-4 text-primary" />, label: "No data storage", sub: "Nothing saved anywhere" },
              { icon: <Lock className="h-4 w-4 text-primary" />, label: "No upload", sub: "No file sent to servers" },
              { icon: <UserX className="h-4 w-4 text-primary" />, label: "No login", sub: "Zero account required" },
              { icon: <Wifi className="h-4 w-4 text-primary" />, label: "Runs in browser", sub: "100% local processing" },
            ].map(({ icon, label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-xl border bg-card text-center">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">{icon}</div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground leading-snug">{sub}</p>
              </div>
            ))}
          </div>

          <p className="hidden sm:block text-base text-muted-foreground mb-5 leading-relaxed">
            Most signature tools upload your data to a server — putting your signature at risk of storage,
            tracking, or breach. This <strong>private signature generator</strong> works differently.{" "}
            <strong>Your data never leaves your device.</strong> There is{" "}
            <strong>no server processing</strong> at any step — the tool is{" "}
            <strong>fully client-side</strong>, running entirely inside your browser with zero network
            interaction, zero tracking, and zero risk. Complete <strong>data protection</strong> by design.
          </p>

          <Button
            data-testid="button-hero-create-signature"
            onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })}
            className="gap-2"
          >
            <PenTool className="h-4 w-4" />
            Create My Private Signature
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* ── TOOL ───────────────────────────────────────────────── */}
        <div id="tool" className="mb-3 sm:mb-10">
          <SignatureToolSection
            caption="Private · No upload · No data stored · No login · Transparent PNG"
          />
        </div>

        {/* ── WHY PRIVACY MATTERS ─────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Why Privacy Matters When Creating a Signature</h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Your signature is one of the most sensitive pieces of personal data you have. Here's why you should
            never use a tool that uploads it to a server:
          </p>
          <div className="space-y-3">
            {[
              {
                icon: <AlertTriangle className="h-5 w-5 text-primary" />,
                title: "A signature is legally binding personal data",
                desc: "Unlike a password, a compromised signature cannot be changed. If your signature is stored on a server that is breached, that data can be misused on legal documents, contracts, and financial instruments permanently.",
              },
              {
                icon: <Server className="h-5 w-5 text-primary" />,
                title: "Most tools upload your signature without you realising",
                desc: "Many online signature tools process your image on their servers — meaning your signature is transmitted over the internet and stored on infrastructure you have no control over. Their privacy policy may permit retention for analytics or improvements.",
              },
              {
                icon: <EyeOff className="h-5 w-5 text-primary" />,
                title: "Tracking adds hidden risk even without storage",
                desc: "Even tools that don't permanently store your signature may log your session activity — IP address, device fingerprint, timestamp, and what you created. Browser-based tools eliminate this entirely.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 rounded-xl border bg-card p-4">
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            How This Private Signature Tool Works
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Understanding the technical reason this tool is private — no trust-me policy required:
          </p>
          <div className="rounded-xl border bg-card p-6 mb-5">
            <div className="space-y-3">
              {[
                {
                  icon: <Wifi className="h-5 w-5 text-primary" />,
                  title: "Runs entirely in your browser",
                  desc: "The signature generator uses the HTML5 Canvas API — a browser-native technology that draws graphics locally on your device. There is no external service call needed to create, render, or export your signature.",
                },
                {
                  icon: <Server className="h-5 w-5 text-primary" />,
                  title: "No server interaction at any step",
                  desc: "When you draw or type your signature, the data stays in your browser's memory (RAM). When you download, the browser converts the canvas to a PNG file and saves it to your device — entirely locally, with no network request made.",
                },
                {
                  icon: <Lock className="h-5 w-5 text-primary" />,
                  title: "No file upload — ever",
                  desc: "There is no upload button and no background upload. The tool does not send your signature image, your name, your chosen font, or any other data to Pixocraft's servers or any third party at any point during your session.",
                },
                {
                  icon: <EyeOff className="h-5 w-5 text-primary" />,
                  title: "No data saved after you close the tab",
                  desc: "When you close the browser tab, the Canvas API clears its memory automatically. Your signature exists only while the page is open. Nothing is cached, persisted to localStorage, or written to any server-side storage.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">{item.title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <img
            src="https://tools.pixocraft.in/images/private-signature-generator-browser-based.png"
            alt="Private signature generator browser-based no upload no data storage secure tool"
            loading="lazy"
            width={600}
            height={300}
            className="w-full rounded-xl border object-cover"
          />
        </section>

        {/* ── HOW TO ─────────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            How to Create a Signature Privately Online
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Five steps — <strong>your data never leaves your device</strong> at any point. Fully client-side, no server processing.
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

        {/* ── SECURITY FEATURES ───────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Security Features</h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Every feature of this tool is built around one principle: your data never leaves your device.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SECURITY_FEATURES.map((f) => (
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

        {/* ── WHY PIXOCRAFT IS SAFE ───────────────────────────────── */}
        <section className="mb-10 rounded-xl border bg-card p-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Why Pixocraft Is Safe</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Pixocraft's signature tools are browser-based by deliberate design — not as a marketing claim, but
                as a technical reality. The Canvas API renders your signature image in your browser's graphics
                context, which is isolated from the network layer. The download is triggered by a local{" "}
                <code className="text-xs bg-muted px-1 py-0.5 rounded">blob URL</code> — a temporary in-memory
                URL that points to your device's RAM, not to any internet address.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                This means even if you wanted to audit the tool, you could open your browser's network inspector
                and confirm: there are zero outbound requests containing your signature data. The{" "}
                <strong>privacy</strong> and <strong>data protection</strong> here are verifiable, not just
                promised — a standard no server-based tool can match.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                For added privacy, you can also use our{" "}
                <Link href="/tools/online-signature-generator-without-upload" className="text-primary underline underline-offset-2">
                  signature generator without upload
                </Link>{" "}
                — a version that explicitly emphasises zero data transfer and works fully offline once the page is
                loaded. Both tools share the same <strong>client-side processing</strong> architecture with no
                server interaction of any kind.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: <Check className="h-3.5 w-3.5" />, label: "No backend data storage" },
                  { icon: <Check className="h-3.5 w-3.5" />, label: "User-controlled at all times" },
                  { icon: <Check className="h-3.5 w-3.5" />, label: "Verifiable in browser devtools" },
                ].map((p) => (
                  <div key={p.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="text-primary">{p.icon}</span>
                    {p.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── USE CASES ──────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            When to Use a Private Signature Generator
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Situations where signature privacy is especially important:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {USE_CASES.map((u) => (
              <div key={u.title} className="flex gap-3 rounded-xl border bg-card p-4">
                <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  {u.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm mb-0.5">{u.title}</p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── BEST FORMAT ────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
            Best Format for a Private Signature
          </h2>
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-4 py-4 sm:px-6 sm:py-5 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <BadgeCheck className="h-5 w-5 text-primary" />
              <p className="font-semibold text-foreground">PNG with transparent background — recommended</p>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">
              PNG is the best format for a private signature because it is lossless (no compression artefacts),
              supports full transparency (no white box), and is universally supported in Word, PDF, Google Docs,
              and email clients. Pixocraft downloads at 3200×1040 px — high resolution, no watermark, entirely
              created on your device.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { icon: <Check className="h-3.5 w-3.5" />, label: "Transparent background" },
                { icon: <Check className="h-3.5 w-3.5" />, label: "No watermark" },
                { icon: <Check className="h-3.5 w-3.5" />, label: "Created locally — no upload" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-primary">{p.icon}</span>
                  {p.label}
                </div>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            For private signature use, always choose PNG over JPEG — JPEG does not support transparency and
            compresses lossy, which can make a signature look blurry or produce artefacts around strokes.
          </p>
        </section>

        {/* ── COMPARISON ─────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Pixocraft vs. Other Signature Tools — Privacy Comparison
          </h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Other tools require uploads, store data, and expose your signature to risk. Here's how Pixocraft compares:
          </p>
          <div className="rounded-xl border bg-card overflow-hidden">
            <div className="grid grid-cols-3 border-b bg-muted/40 px-4 py-3">
              <p className="text-xs font-semibold text-muted-foreground">Privacy factor</p>
              <p className="text-xs font-semibold text-primary text-center">Pixocraft</p>
              <p className="text-xs font-semibold text-muted-foreground text-center">Others</p>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 px-4 py-3 ${i < COMPARISON.length - 1 ? "border-b" : ""}`}
              >
                <p className="text-sm text-muted-foreground">{row.feature}</p>
                <p className="text-sm font-medium text-primary text-center">{row.pixocraft}</p>
                <p className="text-sm text-muted-foreground text-center">{row.others}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-5 text-sm">
            Privacy and security questions answered about this private signature generator.
          </p>
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
                  {openFaq === i ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
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

        {/* ── INTERNAL LINKS ────────────────────────────────────── */}
        <section className="mb-3 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Related Signature Tools</h2>
          <p className="text-muted-foreground mb-4 text-sm">
            Need a different angle? Explore other Pixocraft signature tools — each built with the same
            zero-upload, zero-storage architecture.
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

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section className="rounded-xl border bg-card p-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">
            Your Signature. Your Device. Zero Risk.
          </h2>
          <p className="text-muted-foreground text-sm mb-4">
            No data stored, no upload, no login. Create your signature privately in seconds and download it
            straight to your device.
          </p>
          <Button
            data-testid="button-cta-scroll-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Create My Private Signature <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </section>

      </div>
    </>
  );
}
