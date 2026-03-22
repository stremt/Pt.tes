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
  Check,
  Download,
  Mail,
  Smartphone,
  Lock,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Users,
  Briefcase,
  GraduationCap,
  Palette,
  Type,
  ImageIcon,
  Settings,
  Star,
} from "lucide-react";

const CANONICAL = "https://tools.pixocraft.in/tools/email-signature-generator";
const LAST_UPDATED = "March 21, 2026";

const FAQS = [
  {
    question: "How to create an email signature in Gmail?",
    answer:
      "Download your PNG from Pixocraft → open Gmail → click the gear icon → See all settings → General → scroll to Signature → Create new → click the image icon in the editor → Upload from computer → select your PNG → click Save Changes. Your handwritten signature will now appear automatically on every new email.",
  },
  {
    question: "How do I add a signature image to Outlook?",
    answer:
      "Outlook desktop: File → Options → Mail → Signatures → New. Type your details, then click the image icon to insert your Pixocraft PNG. Outlook Web (outlook.com): Settings → View all Outlook settings → Compose and reply → Email signature. Use the image insert button to upload your PNG. Both methods work with transparent PNG exports from Pixocraft.",
  },
  {
    question: "What size should my email signature image be?",
    answer:
      "Recommended height is 60–80 pixels for the best display in Gmail and Outlook. Pixocraft exports at 3200×1040px (print quality), so you can scale it down after inserting without any loss of sharpness. In Gmail, drag the corner of the inserted image to resize it to your preference.",
  },
  {
    question: "Can I use a PNG signature in Gmail?",
    answer:
      "Yes, Gmail fully supports transparent PNG images as signature attachments. PNG is the recommended format because it removes the white background box that appears with JPG images — making your signature look clean on any email background colour.",
  },
  {
    question: "Is this email signature generator completely free?",
    answer:
      "Yes — 100% free forever. No subscription, no login, no watermark on the downloaded PNG. You can create unlimited email signatures at zero cost. Pixocraft's tool is funded by display ads and stays free for all users indefinitely.",
  },
  {
    question: "Should I use PNG or JPG for my email signature?",
    answer:
      "Transparent PNG is strongly recommended for email signatures. It removes the white box that appears around JPG images in emails, making your signature look clean and professional regardless of the email's background colour. Use JPG only if your email client does not support image transparency.",
  },
  {
    question: "Will my email signature work on mobile email apps?",
    answer:
      "Yes. Gmail and Outlook mobile apps both support image-based signatures. Once you set your signature in the web settings, it syncs to the mobile app automatically. The PNG from Pixocraft renders sharply on all screen resolutions including Retina and high-DPI displays.",
  },
  {
    question: "Is my signature data private? Is anything stored on a server?",
    answer:
      "Nothing is stored on any server. All processing — drawing, typing, font rendering, and image upload — happens 100% inside your browser using JavaScript and HTML5 Canvas. Your signature never leaves your device. Pixocraft does not collect, log, or transmit any signature data.",
  },
  {
    question: "Can I save and reuse my email signature without recreating it?",
    answer:
      "Yes. Your last signature is automatically saved to your browser's localStorage. When you return to the page, it loads instantly. Since localStorage is local to your browser, your data remains completely private and is never sent anywhere.",
  },
  {
    question: "How many font styles are available for a typed email signature?",
    answer:
      "Over 50 handwritten and calligraphic Google Fonts are available across 7 categories: ultra-thin elegant scripts, classic cursive, bold chunky styles, casual everyday handwriting, marker textures, airy light styles, and formal calligraphy. You can preview each in real time.",
  },
  {
    question: "Can I use this on my phone to set up my email signature?",
    answer:
      "Absolutely. The tool is fully mobile-optimised. Open this page on Chrome or Safari on your phone, draw or type your signature, and download the PNG. You can then go directly to Gmail Settings or Outlook Settings on your mobile browser to insert the image into your email signature.",
  },
  {
    question: "Does Pixocraft add a watermark to the downloaded signature?",
    answer:
      "No. Your downloaded PNG is completely clean — no Pixocraft branding, no watermark, no hidden text. The signature image belongs entirely to you and is ready to use in Gmail, Outlook, or any document.",
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    step: 1,
    title: "Choose your signature method",
    description:
      "Pick Draw to sketch freehand with your mouse or finger, Type to select from 50+ calligraphic fonts, Upload to use your existing pen-and-paper signature, or AI to generate stylish options instantly.",
  },
  {
    step: 2,
    title: "Customise for email",
    description:
      "Choose dark blue or black ink for maximum email readability. Keep stroke width at 3–4px so your signature remains clear at 60–80px display height in Gmail and Outlook.",
  },
  {
    step: 3,
    title: "Preview your email signature",
    description:
      "See a live preview of how your signature will look in an email footer context — before downloading. Adjust until it looks exactly right.",
  },
  {
    step: 4,
    title: "Download as transparent PNG",
    description:
      "Hit Download PNG — no watermark, no login required. Then insert the file into Gmail or Outlook's signature settings. Done in under 60 seconds.",
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-2">{children}</p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-3">{children}</h2>
  );
}

function SectionSubtext({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-muted-foreground text-base leading-relaxed mb-6">{children}</p>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4 p-5 rounded-xl border bg-card">
      <div className="shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
        <p className="text-sm text-muted-foreground leading-snug">{body}</p>
      </div>
    </div>
  );
}

function FeatureCardStacked({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-3 p-5 rounded-xl border bg-card">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
        <p className="text-sm text-muted-foreground leading-snug">{body}</p>
      </div>
    </div>
  );
}

export default function EmailSignatureGenerator() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "Free Email Signature Generator – Handwritten PNG for Gmail & Outlook (No Signup)",
    description:
      "Create professional handwritten email signature online free. Draw, type (50+ fonts), upload or AI styles. Download transparent PNG instantly. Save locally, no login. Perfect for Gmail, Outlook & business emails. Made in India.",
    keywords:
      "email signature generator, free email signature generator, gmail signature generator, outlook email signature image, professional email signature, signature image for email, handwritten email signature",
    canonicalUrl: CANONICAL,
    ogImage: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&h=630&fit=crop",
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Pixocraft Email Signature Generator",
    description:
      "Create a professional handwritten email signature image online for free. Draw, type in 50+ fonts, or upload. Download transparent PNG for Gmail, Outlook, and any email client. 100% private, no login required.",
    url: CANONICAL,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: { price: "0", priceCurrency: "USD" },
  });

  const faqSchema = generateFAQSchema(FAQS);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home",                       url: "https://tools.pixocraft.in/" },
    { name: "Tools",                      url: "https://tools.pixocraft.in/tools" },
    { name: "Productivity", url: "https://tools.pixocraft.in/tools/productivity" },
    { name: "Signature Generator",        url: "https://tools.pixocraft.in/tools/signature-generator" },
    { name: "Email Signature Generator",  url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "Free Email Signature Generator – Handwritten PNG for Gmail & Outlook",
    description:
      "Create a professional handwritten email signature image online for free. Download transparent PNG for Gmail and Outlook. No login required.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Create a Professional Email Signature",
    description:
      "Use Pixocraft's free email signature generator to create a handwritten signature image and add it to Gmail or Outlook in under 60 seconds.",
    steps: HOW_IT_WORKS_STEPS.map((s) => ({ name: s.title, text: s.description })),
  });

  return (
    <>
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={webPageSchema} />
      <StructuredData data={howToSchema} />

      <div className="container mx-auto px-4 max-w-4xl py-8">

        <Breadcrumb items={[
          { label: "Home",                       url: "https://tools.pixocraft.in/" },
          { label: "Tools",                      url: "/tools" },
          { label: "Productivity", url: "/tools/productivity" },
          { label: "Signature Generator",        url: "/tools/signature-generator" },
          { label: "Email Signature Generator" },
        ]} />

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="mb-10 pt-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Free Email Tool · Made in India
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-3">
            Free Email Signature Generator
          </h1>
          <p className="text-lg sm:text-xl font-medium text-muted-foreground mb-5">
            Handwritten PNG for Gmail &amp; Outlook — No Signup Required
          </p>

          <p className="text-base text-muted-foreground leading-relaxed mb-7 max-w-2xl">
            Create a professional email signature using Pixocraft's free generator.{" "}
            <strong className="text-foreground">Draw</strong> with your mouse or finger,{" "}
            <strong className="text-foreground">type</strong> in 50+ calligraphic fonts,{" "}
            <strong className="text-foreground">upload</strong> your existing signature, or use{" "}
            <strong className="text-foreground">AI styles</strong> for an instant result.
            Download high-quality transparent PNG instantly — no signup, no watermark, 100% private.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: <Check className="h-3.5 w-3.5 text-primary" />,      label: "No Signup · No Watermark" },
              { icon: <Shield className="h-3.5 w-3.5 text-primary" />,     label: "100% Private & Offline" },
              { icon: <Mail className="h-3.5 w-3.5 text-primary" />,       label: "Works in Gmail & Outlook" },
              { icon: <Smartphone className="h-3.5 w-3.5 text-primary" />, label: "Mobile Friendly" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 rounded-lg bg-muted/50 border px-3 py-2.5">
                <span className="shrink-0">{icon}</span>
                <span className="text-xs font-medium text-foreground leading-tight">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURED SNIPPET BLOCK ────────────────────────────────────────── */}
        <div className="rounded-xl border-l-4 border-primary bg-primary/5 px-6 py-5 mb-10">
          <h2 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
            Free Email Signature Generator for Gmail &amp; Outlook
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Pixocraft is a free email signature generator that helps you create a professional handwritten
            signature for Gmail and Outlook. Draw, type (50+ fonts), upload or use AI styles and download
            a transparent PNG instantly. No signup required, 100% private and works offline in your browser.
          </p>
        </div>

        {/* ── TOOL ─────────────────────────────────────────────────────────── */}
        <SignatureToolSection
          mode="draw"
          caption="No watermark · No server upload · Download transparent PNG instantly"
        />

        {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
        <div className="space-y-16">

          {/* ── WHAT IS ── */}
          <section>
            <SectionLabel>Overview</SectionLabel>
            <SectionHeading>What is an Email Signature Generator?</SectionHeading>

            <div className="rounded-xl border bg-muted/40 px-6 py-5 mb-6">
              <p className="text-foreground font-medium leading-relaxed">
                An <strong>email signature generator</strong> is an online tool that creates a high-quality image of your
                handwritten or typed signature — specifically sized and formatted to be inserted into Gmail, Outlook,
                or any professional email client as a signature image.
              </p>
            </div>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Unlike generic signature tools, Pixocraft's <strong className="text-foreground">free email signature generator</strong> is
                purpose-built for email. It exports at 3200×1040px — crisp at any display size — and the transparent PNG
                background ensures your signature looks professional regardless of the email's background colour.
              </p>
              <p>
                Everything runs entirely inside your browser. No server, no account, no data collection. Your signature is
                processed locally using HTML5 Canvas and is never transmitted anywhere — making it one of the most
                privacy-respecting email signature tools available today.
              </p>
              <p>
                Whether you're a freelancer, business professional, or student, a handwritten email signature adds
                a personal, authoritative touch to every message you send — and takes less than 60 seconds to create here.
              </p>
            </div>
          </section>

          {/* ── WHY USE ── */}
          <section>
            <SectionLabel>Why It Helps</SectionLabel>
            <SectionHeading>Why Use an Email Signature Generator?</SectionHeading>
            <SectionSubtext>
              A consistent, professional signature in every email builds trust and reinforces your personal brand.
            </SectionSubtext>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
              <p>
                An <strong className="text-foreground">email signature generator</strong> helps you create a consistent and
                professional signature for every email you send. Instead of typing your name manually at the end of each
                message, you can use a high-quality signature image that looks clean across Gmail, Outlook, and mobile
                email apps — on any device, any screen size.
              </p>
              <p>
                For businesses, a unified email signature reinforces brand identity. For freelancers, it signals
                professionalism in client proposals. For students and job seekers, it adds a personal touch that
                distinguishes your application emails from the crowd.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeatureCard icon={<Check className="h-4 w-4 text-primary" />}   title="Consistent branding"    body="Same signature on every email — professional, repeatable, and instantly recognisable." />
              <FeatureCard icon={<Zap className="h-4 w-4 text-primary" />}     title="Ready in 60 seconds"    body="Faster than any alternative. No design software, no templates, no learning curve." />
              <FeatureCard icon={<Shield className="h-4 w-4 text-primary" />}  title="100% browser-private"   body="No account needed. Your signature data never leaves your device. Works offline." />
            </div>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section>
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>How to Create an Email Signature in 4 Steps</SectionHeading>
            <SectionSubtext>
              From blank canvas to Gmail or Outlook in under a minute.
            </SectionSubtext>

            <ol className="space-y-3">
              {HOW_IT_WORKS_STEPS.map(({ step, title, description }) => (
                <li key={step} className="flex gap-5 p-5 rounded-xl border bg-card">
                  <span className="shrink-0 h-9 w-9 rounded-full bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center">
                    {step}
                  </span>
                  <div className="space-y-1 pt-0.5">
                    <p className="font-semibold text-foreground">{title}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── WHY EMAIL SIGNATURE MATTERS ── */}
          <section>
            <SectionLabel>Why It Matters</SectionLabel>
            <SectionHeading>Why Your Email Signature Matters</SectionHeading>
            <SectionSubtext>
              A professional email signature is more than just your name — it's your personal brand in every inbox.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              <FeatureCardStacked icon={<Briefcase className="h-5 w-5 text-primary" />} title="First Impressions" body="Every email you send is an introduction. A clean, handwritten signature immediately signals professionalism and attention to detail." />
              <FeatureCardStacked icon={<Palette className="h-5 w-5 text-primary" />} title="Personal Branding" body="Your signature is an extension of your identity. A consistent handwritten mark reinforces your personal or business brand across every communication." />
              <FeatureCardStacked icon={<Users className="h-5 w-5 text-primary" />} title="Trust & Credibility" body="Emails with a handwritten signature are perceived as more personal, more trustworthy, and more human — especially in client-facing communications." />
            </div>

            <div className="rounded-xl bg-muted/40 border px-5 py-4 text-sm text-muted-foreground leading-relaxed">
              Studies show that emails with a personal signature have significantly higher response rates. A handwritten
              signature PNG is the quickest way to achieve that personal touch without coding an HTML email template.
            </div>
          </section>

          {/* ── BEST STYLE FOR EMAIL ── */}
          <section>
            <SectionLabel>Design Guide</SectionLabel>
            <SectionHeading>Best Signature Style for Email</SectionHeading>
            <SectionSubtext>
              Not all signature styles work equally well in an email context. Here's what actually looks great in an inbox.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <FeatureCard icon={<Type className="h-4 w-4 text-primary" />}      title="Ideal display height: 60–80px"      body="This is the standard email signature height. Your Pixocraft PNG is exported at 3200×1040px so it scales perfectly — sharp on all screens including Retina." />
              <FeatureCard icon={<Palette className="h-4 w-4 text-primary" />}   title="Use black or dark blue ink"         body="These colours read clearly on white and light backgrounds used by most email clients. Avoid light grey or coloured inks that can become invisible on certain displays." />
              <FeatureCard icon={<PenTool className="h-4 w-4 text-primary" />}   title="Stroke width: 3–4px"                body="Thicker strokes remain legible when the image is displayed at small sizes in Gmail or Outlook. Too thin and the signature disappears into the background." />
              <FeatureCard icon={<ImageIcon className="h-4 w-4 text-primary" />} title="Always download as transparent PNG" body="Transparent PNG removes the white box that appears around JPG images in many email clients. Your signature will sit cleanly on any email background." />
            </div>

            <div className="rounded-xl border bg-card p-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Recommended fonts for email signatures</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { label: "Elegant & Formal",  font: "Great Vibes",   name: "Sarah Mitchell",  note: "Best for executives, consultants, legal professionals." },
                  { label: "Clean & Modern",     font: "Satisfy",       name: "Priya Sharma",    note: "Best for tech, design, and startup professionals." },
                  { label: "Classic Cursive",    font: "Pinyon Script", name: "David Brown",     note: "Best for HR, finance, and traditional industries." },
                ].map(({ label, font, name, note }) => (
                  <div key={label} className="space-y-2">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{label}</p>
                    <p
                      style={{ fontFamily: `'${font}', cursive`, fontSize: "1.6rem", lineHeight: 1.3 }}
                      className="text-foreground overflow-hidden whitespace-nowrap text-ellipsis"
                      aria-label={`free email signature generator handwritten png gmail outlook — ${name}`}
                    >
                      {name}
                    </p>
                    <p className="text-xs text-muted-foreground leading-snug">{note}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SAVE & REUSE ── */}
          <section>
            <SectionLabel>Privacy-First</SectionLabel>
            <SectionHeading>Save &amp; Reuse Your Email Signature — Offline Forever</SectionHeading>
            <SectionSubtext>
              Pixocraft automatically saves your signature in your browser. Close the tab and come back anytime —
              your last signature loads instantly. No login, no server, 100% private. Works even offline after first load.
            </SectionSubtext>

            <div className="rounded-xl border bg-card px-6 py-5 mb-5">
              <ul className="space-y-3">
                {[
                  "Stored locally in your browser only — never uploaded to any server",
                  "No server upload, no tracking, no analytics on your signature content",
                  "Reuse instantly for Gmail, Outlook, documents, and PDF signatures",
                  "Update it in seconds when you change roles, companies, or style",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FeatureCardStacked icon={<Lock className="h-5 w-5 text-primary" />}   title="Saved in your browser only"  body="Your signature is stored in localStorage — only accessible by you, on your device. No cloud sync, no server storage." />
              <FeatureCardStacked icon={<Shield className="h-5 w-5 text-primary" />} title="Zero data collection"        body="We collect no signature data. No analytics on your signature content. No tracking of what you type or draw." />
              <FeatureCardStacked icon={<Zap className="h-5 w-5 text-primary" />}    title="Ready when you return"       body="Your last signature loads automatically next time. Update it instantly when you change roles or companies." />
            </div>
          </section>

          {/* ── HOW TO ADD TO GMAIL / OUTLOOK ── */}
          <section>
            <SectionLabel>Setup Guide</SectionLabel>
            <SectionHeading>How to Add Your Signature to Gmail &amp; Outlook</SectionHeading>
            <SectionSubtext>
              Once you've downloaded your transparent PNG, follow these steps to set it up in your email client.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Gmail */}
              <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">Adding to Gmail</p>
                </div>
                <ol className="space-y-2.5">
                  {[
                    "Open Gmail and click the gear icon (top right)",
                    "Click 'See all settings'",
                    "Go to the General tab → scroll to Signature",
                    "Click 'Create new' → name your signature",
                    "Click the image icon in the editor",
                    "Choose 'Upload from computer' → select your PNG",
                    "Click 'Save Changes' at the bottom",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Outlook */}
              <div className="rounded-xl border bg-card p-5">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Settings className="h-4 w-4 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">Adding to Outlook</p>
                </div>
                <ol className="space-y-2.5">
                  {[
                    "Open Outlook desktop → File → Options",
                    "Go to Mail → click Signatures",
                    "Click New → name your signature",
                    "Type your name and contact details",
                    "Click the image icon in the editor",
                    "Select your Pixocraft PNG file",
                    "Click OK and set as default for new emails",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-muted-foreground leading-snug">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="rounded-xl bg-muted/40 border px-5 py-4 text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Tip:</strong> After inserting your image in Gmail, right-click it and select
              'Size &amp; Position' to lock it to a specific height (60–80px recommended). This prevents the image from
              appearing too large on mobile email clients.
            </div>
          </section>

          {/* ── COMPARISON ── */}
          <section>
            <SectionLabel>Comparison</SectionLabel>
            <SectionHeading>Pixocraft vs Canva, HubSpot &amp; WiseStamp</SectionHeading>
            <SectionSubtext>
              Here's how Pixocraft's free email signature generator stacks up against the most popular alternatives.
            </SectionSubtext>

            <div className="overflow-x-auto rounded-xl border mb-6">
              <table className="w-full text-sm min-w-[520px]">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Feature</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-primary">Pixocraft</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">Canva</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">HubSpot</th>
                    <th className="text-left px-5 py-3.5 font-semibold text-foreground">WiseStamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    ["Free Forever",              "Yes",      "Pro needed",   "Yes",       "Limited"],
                    ["No Login Required",         "Yes",      "Yes",          "Yes",       "No"],
                    ["100% Browser / Offline",    "Yes",      "No",           "No",        "No"],
                    ["Handwritten Draw Mode",     "Yes",      "No",           "No",        "No"],
                    ["50+ Signature Fonts",       "Yes",      "Limited",      "No",        "Limited"],
                    ["Transparent PNG Export",    "Yes",      "Partial",      "No",        "No"],
                    ["AI Signature Styles",       "Yes",      "No",           "No",        "No"],
                    ["Zero Data Collection",      "Yes",      "No",           "No",        "No"],
                  ].map(([feat, pixo, canva, hub, wise]) => (
                    <tr key={feat} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-5 py-3 font-semibold text-primary">{pixo}</td>
                      <td className="px-5 py-3 text-muted-foreground">{canva}</td>
                      <td className="px-5 py-3 text-muted-foreground">{hub}</td>
                      <td className="px-5 py-3 text-muted-foreground">{wise}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard icon={<Lock className="h-4 w-4 text-primary" />}     title="Zero data collection"    body="Unlike HubSpot and WiseStamp, Pixocraft never stores or analyses your signature content." />
              <FeatureCard icon={<Sparkles className="h-4 w-4 text-primary" />} title="Draw + Type + AI"        body="Three creation methods in one free tool — no other free alternative offers all three." />
              <FeatureCard icon={<Download className="h-4 w-4 text-primary" />} title="Print-quality PNG"       body="3200×1040px export — sharper than Canva's standard export at the same display size." />
              <FeatureCard icon={<Zap className="h-4 w-4 text-primary" />}      title="No signup friction"      body="Open the page, create your signature, download. No account. No email verification." />
            </div>
          </section>

          {/* ── USE CASES ── */}
          <section>
            <SectionLabel>Use Cases</SectionLabel>
            <SectionHeading>Who Uses This Email Signature Generator?</SectionHeading>
            <SectionSubtext>
              Pixocraft's email signature generator is designed for professionals at every level.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  icon: <Briefcase className="h-5 w-5 text-primary" />,
                  title: "Business Owners & Consultants",
                  body: "Add a handwritten signature to every client email. Reinforce trust and authority with a personal mark that makes your outreach feel human — not templated.",
                },
                {
                  icon: <PenTool className="h-5 w-5 text-primary" />,
                  title: "Freelancers & Creators",
                  body: "Stand out in crowded inboxes. A unique handwritten signature in your proposals and invoices signals professionalism and creative attention to detail.",
                },
                {
                  icon: <GraduationCap className="h-5 w-5 text-primary" />,
                  title: "Students & Job Seekers",
                  body: "Make your application emails memorable. A handwritten signature on your cover letter email adds a professional touch that most applicants overlook.",
                },
              ].map(({ icon, title, body }) => (
                <FeatureCardStacked key={title} icon={icon} title={title} body={body} />
              ))}
            </div>
          </section>

          {/* ── KEYWORD H2 ── */}
          <section>
            <SectionLabel>Top Rated</SectionLabel>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-4">
              Best Free Email Signature Generator Online
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pixocraft is rated among the best free email signature generators online because it combines
                four creation modes — Draw, Type, Upload, and AI — into a single tool that works entirely
                in your browser. No other free alternative offers handwritten drawing, 50+ calligraphic fonts,
                and AI-generated styles together with zero data collection and no login requirement.
              </p>
              <p>
                Whether you need a <strong className="text-foreground">Gmail signature generator</strong>,
                an <strong className="text-foreground">Outlook email signature image</strong>, or a clean
                transparent PNG for business emails, Pixocraft delivers all three in one place —
                free, fast, and 100% private.
              </p>
            </div>
          </section>

          {/* ── TRUST ── */}
          <section>
            <SectionLabel>Trust & Privacy</SectionLabel>
            <SectionHeading>Trusted Email Signature Generator</SectionHeading>
            <SectionSubtext>
              Pixocraft is trusted by freelancers, professionals, and businesses to create secure and
              professional email signatures. Our tool runs entirely in your browser, ensuring complete
              privacy and zero data tracking.
            </SectionSubtext>

            <div className="rounded-xl border bg-primary/5 px-6 py-5 mb-5">
              <p className="text-foreground font-semibold leading-relaxed text-sm sm:text-base">
                No signup, no watermark, and no data tracking — your email signature is created and stored
                entirely in your browser.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard icon={<Shield className="h-4 w-4 text-primary" />}  title="No server-side processing" body="All drawing, typing, font rendering, and background removal happens inside your browser using HTML5 Canvas and JavaScript." />
              <FeatureCard icon={<Lock className="h-4 w-4 text-primary" />}    title="No login, no account"       body="There is no user account system. You are completely anonymous. We have nothing to leak or breach." />
              <FeatureCard icon={<Zap className="h-4 w-4 text-primary" />}     title="Works offline"              body="After the page loads once, you can disconnect from the internet and the tool continues to function perfectly." />
              <FeatureCard icon={<Star className="h-4 w-4 text-primary" />}    title="No watermark, ever"         body="Your downloaded PNG is clean and unmarked. No Pixocraft branding is added to your signature — it is yours entirely." />
            </div>
          </section>

          {/* ── INTERNAL LINKS ── */}
          <section>
            <SectionLabel>Related Tools</SectionLabel>
            <SectionHeading>More Signature &amp; Document Tools</SectionHeading>
            <SectionSubtext>
              You can also use our{" "}
              <Link href="/tools/signature-generator" className="text-primary hover:underline underline-offset-2 font-medium">
                online signature generator
              </Link>{" "}
              to create signatures for documents, sign files using our{" "}
              <Link href="/tools/signature-for-pdf" className="text-primary hover:underline underline-offset-2 font-medium">
                PDF signature tool
              </Link>
              , or add your mark to business invoices with our{" "}
              <Link href="/tools/signature-for-gst-invoice" className="text-primary hover:underline underline-offset-2 font-medium">
                GST invoice signature tool
              </Link>.
            </SectionSubtext>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { href: "/tools/signature-generator",         title: "Signature Generator (Main Tool)",  desc: "The full-featured tool — Draw, Type, Upload, AI with undo/redo and advanced options." },
                { href: "/tools/signature-for-pdf",           title: "Signature for PDF",                desc: "Sign PDF documents directly — place your signature over any PDF page." },
                { href: "/tools/signature-for-gst-invoice",   title: "GST Invoice Signature",            desc: "Add your signature to GST invoices for Tally, Zoho Books, and other Indian billing software." },
                { href: "/tools/email-signature-maker",       title: "Email Signature Maker",            desc: "Alternate email signature tool with HTML preview and contact block layout." },
                { href: "/tools/digital-signature-generator", title: "Digital Signature Generator",      desc: "India IT Act 2000 ready — for contracts, NDAs, and business documents." },
                { href: "/tools/background-remover",          title: "Background Remover",               desc: "Remove any background from an uploaded signature image instantly." },
              ].map(({ href, title, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-4 p-4 rounded-xl border bg-card hover-elevate transition-all group"
                >
                  <div className="shrink-0 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section>
            <SectionLabel>FAQ</SectionLabel>
            <SectionHeading>Frequently Asked Questions</SectionHeading>

            <div className="space-y-2">
              {FAQS.map((faq, i) => (
                <div key={i} className="rounded-xl border bg-card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    data-testid={`faq-question-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="leading-snug">{faq.question}</span>
                    {openFaq === i
                      ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                      : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div
                      className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t pt-4"
                      data-testid={`faq-answer-${i}`}
                    >
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── EEAT / TRUST ── */}
          <section className="rounded-xl border bg-muted/30 px-6 py-5 text-sm text-muted-foreground space-y-1.5">
            <p><strong className="text-foreground">Author:</strong> Pixocraft Team</p>
            <p><strong className="text-foreground">Last Updated:</strong> {LAST_UPDATED}</p>
            <p>
              <strong className="text-foreground">Made in India</strong> — Built with privacy-first principles.
              Your email signature data never leaves your browser.
            </p>
            <p className="pt-1">
              Questions or feedback?{" "}
              <Link href="/contact" className="text-primary hover:underline underline-offset-2">Contact us</Link>
              {" "}or read our{" "}
              <Link href="/privacy" className="text-primary hover:underline underline-offset-2">Privacy Policy</Link>.
            </p>
          </section>

        </div>
      </div>
    </>
  );
}
