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
  Briefcase, Globe, Mail, AlertCircle, Star, Check,
  FilePen, Upload, Download, Users, Share2, Eye,
  MousePointer, PenTool, ImageIcon, FileImage,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CANONICAL = "https://tools.pixocraft.in/tools/how-to-add-signature-in-google-docs";
const PARENT_URL = "https://tools.pixocraft.in/tools/signature-pad-tool";

const HOW_TO_STEPS = [
  {
    step: 1,
    title: "Create your signature",
    description: "Draw freehand on the canvas, type your name in a handwriting font, or upload a photo of your existing signature. Click Confirm Signature when satisfied.",
  },
  {
    step: 2,
    title: "Download transparent PNG",
    description: "Click Download PNG. The tool exports your signature as a transparent background PNG — no white box will appear when placed over any Google Docs page.",
  },
  {
    step: 3,
    title: "Open your Google Doc",
    description: "Open the Google Docs document where you need to add your signature. Place your cursor exactly where you want the signature to appear.",
  },
  {
    step: 4,
    title: "Insert → Image → Upload",
    description: "Click Insert in the top menu, select Image, then choose Upload from computer. Select your transparent PNG signature file and click Open.",
  },
  {
    step: 5,
    title: "Adjust position and size",
    description: "Click the inserted image to select it. Use the corner handles to resize. Click the image options (Wrap Text → Inline) to position it precisely on the signature line.",
  },
  {
    step: 6,
    title: "Share document",
    description: "Your signed Google Doc is ready. Share with collaborators, download as PDF, or email directly — the signature stays permanently embedded in the document.",
  },
];

const FAQS = [
  {
    question: "How do I add a signature in Google Docs for free?",
    answer: "Create a transparent PNG signature using Pixocraft's free Signature Generator (no login needed). Then open your Google Doc, click Insert → Image → Upload from computer, select your PNG, and resize it over the signature line. The entire process takes under 35 seconds.",
  },
  {
    question: "Can I add a signature in Google Docs without an extension?",
    answer: "Yes. Using the transparent PNG method, you don't need any Chrome extension, add-on, or third-party plugin. Just insert your signature PNG directly through Google Docs' built-in Insert → Image menu. No extensions, no add-ons, no installs required.",
  },
  {
    question: "Is a Google Docs signature legally valid in India?",
    answer: "Yes. An image-based electronic signature embedded in a Google Doc is legally valid under the Information Technology Act 2000 for commercial contracts, service agreements, NDAs, GST reports, and most business documents. For regulated filings (MCA ROC, court submissions), a certified DSC is required.",
  },
  {
    question: "How do I add a signature in Google Docs on mobile?",
    answer: "Open Pixocraft's Signature Generator on your phone browser and draw your signature with your finger. Download the transparent PNG to your phone. Open your Google Doc in the Google Docs app, tap the '+' Insert button, select Image → From Photos, and choose your signature PNG. Resize and position it as needed.",
  },
  {
    question: "Can I sign a shared Google Doc?",
    answer: "Yes. If you have edit access to the shared document, you can insert your signature PNG the same way — Insert → Image → Upload from computer. All collaborators with view or edit access will see your embedded signature in real time.",
  },
  {
    question: "What is the best way to add a signature in Google Docs?",
    answer: "The most reliable, private, and professional method is inserting a transparent PNG signature. This approach requires no extension, no third-party service, works offline after the image is inserted, and the signature stays permanently embedded even when the document is downloaded as PDF or printed.",
  },
  {
    question: "Why should I use a transparent PNG instead of JPG for Google Docs signatures?",
    answer: "JPG has no transparency support. If you insert a JPG signature, a white rectangular box will surround your signature on any non-white background in the document. Transparent PNG overlays cleanly on any page background, table cell, or coloured section — Pixocraft automatically exports as transparent PNG.",
  },
  {
    question: "How do I position my signature exactly on the signature line in Google Docs?",
    answer: "After inserting the PNG, click it and set image positioning to 'Inline with text' for precise line-level placement, or 'Wrap text → Break text' for floating placement. Drag to align with the signature line. Use the blue resize handles to adjust size proportionally. 3–4 cm wide is standard for A4 documents.",
  },
  {
    question: "Can my team members see my signature in a shared Google Doc?",
    answer: "Yes. When you insert a signature PNG into a shared Google Doc, it becomes part of the document content that all collaborators can see immediately in real time — whether they have view, comment, or edit access.",
  },
  {
    question: "Does the signature stay when I export a signed Google Doc to PDF?",
    answer: "Yes. When you download the Google Doc as PDF (File → Download → PDF Document), your embedded signature PNG is included in the output PDF exactly as it appears in the document. The result is a professionally signed PDF ready to send.",
  },
  {
    question: "How do I use Google Docs Drawing to create a signature?",
    answer: "Click Insert → Drawing → New. In the Drawing panel, select the Scribble tool from the line options. Draw your signature freehand. Click Save and Close. The signature inserts as an image you can resize and position. Note: The Drawing method often produces a lower-quality signature than a dedicated tool like Pixocraft. The transparent PNG method is recommended for professional documents.",
  },
  {
    question: "Is my signature private when I use Pixocraft's tool?",
    answer: "Completely private. Pixocraft's Signature Generator runs 100% inside your browser using the HTML5 Canvas API. No drawing strokes, typed text, or uploaded images are ever sent to any server, stored, or logged. Your signature data never leaves your device.",
  },
  {
    question: "Can I sign a GST report or invoice in Google Docs?",
    answer: "Yes. Many businesses create GST reports, summaries, and correspondence in Google Docs. Insert your transparent PNG signature into the document, position it on the authorised signatory line, and download as PDF for submission. CBIC guidelines for manually generated invoices accept image-based signatures.",
  },
  {
    question: "How do I create a consistent signature for team documents in Google Docs?",
    answer: "Create your signature once using Pixocraft's Signature Generator and save the transparent PNG to your device or cloud storage. Each time you need to sign a Google Doc, insert this same PNG — the signature will look identical every time. Share the PNG with team members who represent your organisation for consistent branding.",
  },
  {
    question: "What is the difference between the Google Docs Drawing method and the PNG method?",
    answer: "The Drawing method uses Google Docs' built-in scribble tool — quick but limited in quality, and the result can look rough. The PNG method (recommended) uses a dedicated signature tool to create a high-resolution, properly styled signature with true transparency. The PNG method produces a more professional result and the same PNG can be reused across multiple documents.",
  },
];

const USE_CASES = [
  { icon: <FileText className="h-5 w-5 text-primary" />, title: "Contracts & Agreements", desc: "Sign freelance contracts, NDAs, and service agreements directly in Google Docs. Share the signed document instantly with all parties." },
  { icon: <Receipt className="h-5 w-5 text-primary" />, title: "GST Reports & Summaries", desc: "Add authorised signatory signatures to GST compliance reports and summaries created in Google Docs." },
  { icon: <Users className="h-5 w-5 text-primary" />, title: "Team Proposals", desc: "Agencies and startups can sign client proposals collaboratively in Google Docs — visible to the full team in real time." },
  { icon: <FilePen className="h-5 w-5 text-primary" />, title: "Offer Letters", desc: "HR teams draft and sign offer letters in Google Docs. Download as PDF and send — no printing or scanning needed." },
  { icon: <Briefcase className="h-5 w-5 text-primary" />, title: "Freelance Agreements", desc: "Freelancers sign SOWs, client agreements, and project proposals in Google Docs before sharing with clients." },
  { icon: <Globe className="h-5 w-5 text-primary" />, title: "Internal Approvals", desc: "Sign internal approval documents, policy updates, and acknowledgement letters — share directly with the team." },
];

const MISTAKES = [
  { title: "Using JPG instead of PNG", body: "JPG creates a visible white box around your signature. Always use transparent PNG — Pixocraft exports it automatically." },
  { title: "Setting image position to 'Fixed'", body: "Fixed positioning can cause the signature to float unexpectedly when text is edited. Use 'Inline with text' for predictable placement." },
  { title: "Signature too large", body: "An oversized signature dominates the document. 3–4 cm wide (roughly 15–20% of page width) looks professional on standard A4 Google Docs." },
  { title: "Inserting into a table cell without padding", body: "A signature inserted into a tight table cell can look cramped. Add cell padding or increase the row height before inserting." },
  { title: "Using Google Docs Drawing for professional documents", body: "The Drawing/Scribble tool produces lower-quality signatures. For contracts, proposals, and client-facing documents, use the PNG method for a cleaner, more professional result." },
];

const TIPS = [
  { title: "Save your PNG to Google Drive for easy reuse", body: "Store your transparent PNG signature in Google Drive. The next time you need to sign, insert via Insert → Image → Drive — no re-downloading needed." },
  { title: "Set image to 'Inline with text' for predictable positioning", body: "Inline positioning keeps the signature anchored to the line of text. It won't shift position when other content in the document changes." },
  { title: "Download as PDF immediately after signing", body: "Once your signature is in place, download the document as PDF (File → Download → PDF). Share the PDF — it cannot be accidentally edited and the signature stays fixed." },
  { title: "Use suggesting mode for approval workflows", body: "If you need someone to review before the signature is finalised, switch to Suggesting Mode. Reviewers can approve or reject without altering the signature placement." },
  { title: "Create a signature template document", body: "Keep a Google Doc with your signature already inserted as a master template. Duplicate it (File → Make a copy) each time you start a new document that needs signing." },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Add Signature in Google Docs Free – Step-by-Step Guide (2026)",
  "description": "Learn how to add signature in Google Docs free in 35 seconds. Step-by-step guide with transparent PNG method. Works on shared docs, mobile and GST reports. No signup required.",
  "url": CANONICAL,
  "datePublished": "2026-01-01",
  "dateModified": "2026-03-18",
  "author": { "@type": "Organization", "name": "Pixocraft" },
  "publisher": { "@type": "Organization", "name": "Pixocraft", "url": "https://tools.pixocraft.in" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": CANONICAL },
};

export default function HowToAddSignatureInGoogleDocs() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useSEO({
    title: "How to Add Signature in Google Docs Free – Step-by-Step Guide | Pixocraft",
    description: "Learn how to add signature in Google Docs free in 35 seconds. Step-by-step guide with transparent PNG method. Works on shared docs, mobile and GST reports. No signup required.",
    keywords: "how to add signature in google docs, add signature in google docs free, insert signature in google docs, google docs signature, digital signature google docs, how to sign google docs online free, add signature in google docs mobile, google docs signature without extension, sign shared google doc",
    canonicalUrl: CANONICAL,
    ogTitle: "How to Add Signature in Google Docs Free – Step-by-Step Guide | Pixocraft",
    ogDescription: "Learn how to add signature in Google Docs free in 35 seconds. Step-by-step guide with transparent PNG method. Works on shared docs, mobile and GST reports. No signup required.",
    ogType: "article",
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://tools.pixocraft.in/" },
    { name: "Tools", url: "https://tools.pixocraft.in/tools" },
    { name: "Signature Tools", url: "https://tools.pixocraft.in/tools/signature-tools" },
    { name: "How to Add Signature in Google Docs", url: CANONICAL },
  ]);

  const webPageSchema = generateWebPageSchema({
    name: "How to Add Signature in Google Docs Free – Step-by-Step Guide | Pixocraft",
    description: "Learn how to add signature in Google Docs free in 35 seconds. Step-by-step guide with transparent PNG method. Works on shared docs, mobile and GST reports. No signup required.",
    url: CANONICAL,
  });

  const howToSchema = generateHowToSchema({
    name: "How to Add Signature in Google Docs Free",
    description: "Add a transparent PNG signature to any Google Doc in under 35 seconds. No extensions required — works on desktop and mobile.",
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
          { label: "How to Add Signature in Google Docs" },
        ]} />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <FileImage className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                How to Add Signature in Google Docs Free – Step-by-Step Guide (2026)
              </h1>
              <p className="text-sm text-muted-foreground">Free · No Extension · 100% Private · Team Collaboration Ready</p>
            </div>
          </div>

          {/* Direct answer block for featured snippet */}
          <div className="rounded-xl border bg-primary/5 border-primary/20 px-5 py-4 mb-5">
            <p className="text-sm font-semibold text-foreground mb-1">Quick Answer</p>
            <p className="text-base text-foreground leading-relaxed">
              You can add a signature in Google Docs by creating a transparent PNG signature and inserting it using <strong>Insert → Image → Upload → adjust position</strong> — in under 35 seconds.
            </p>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[
              { icon: <Check className="h-3.5 w-3.5" />, label: "35-Second Method" },
              { icon: <Lock className="h-3.5 w-3.5" />, label: "No Extension Required" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on Mobile & Desktop" },
              { icon: <Shield className="h-3.5 w-3.5" />, label: "100% Private" },
              { icon: <Users className="h-3.5 w-3.5" />, label: "Team Collaboration Ready" },
            ].map(({ icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border bg-muted text-muted-foreground">
                {icon}{label}
              </span>
            ))}
          </div>

          {/* Quick steps above fold */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-5">
            {HOW_TO_STEPS.map(({ step, title }) => (
              <div key={step} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border bg-card text-center">
                <span className="h-7 w-7 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{step}</span>
                <p className="text-xs font-medium text-foreground leading-snug">{title}</p>
              </div>
            ))}
          </div>

          {/* CTA + psychology */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-gdocs-sig-hero-cta">
              <PenTool className="h-4 w-4" />Create Signature for Google Docs<ArrowRight className="h-4 w-4" />
            </Button>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" />Real-time team visibility</span>
              <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-primary" />No extensions or add-ons needed</span>
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5 text-primary" />Works perfectly in shared docs</span>
            </div>
          </div>
        </div>

        {/* ── TOOL ──────────────────────────────────────────────────────── */}
        <SignatureToolSection />

        {/* ── SEO CONTENT ───────────────────────────────────────────────── */}
        <div className="space-y-16 text-base leading-relaxed">

          {/* Why Google Docs signature */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Add a Signature in Google Docs?</h2>
            <p className="text-muted-foreground mb-4">
              Google Docs is the go-to platform for team-drafted documents — contracts, proposals, reports, and letters. Adding a signature directly in Google Docs removes the print-sign-scan bottleneck and keeps the entire workflow digital and collaborative.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { icon: <Users className="h-5 w-5 text-primary" />, title: "Team Collaboration", desc: "All editors and viewers see the signature in real time. No version conflicts or 'unsigned copy' confusion." },
                { icon: <Share2 className="h-5 w-5 text-primary" />, title: "No Version Conflict", desc: "One document, one signature, one source of truth. Collaborators always view the latest signed version." },
                { icon: <Zap className="h-5 w-5 text-primary" />, title: "Instant Workflow", desc: "Sign and share in under 35 seconds. No printing, scanning, or switching between apps." },
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
            <p className="text-muted-foreground">
              For agencies, CA firms, startups, and freelancers who collaborate on documents daily, adding a signature directly in Google Docs removes friction from the approval-to-delivery cycle. It is faster, more professional, and entirely free.
            </p>
          </section>

          {/* Tool comparison */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Google Docs vs Word vs PDF — Which is Best for Signing?</h2>
            <p className="text-muted-foreground mb-5">Each platform has a different strength when it comes to signing documents:</p>
            <div className="overflow-x-auto rounded-xl border mb-5">
              <table className="w-full text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Tool</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Best For</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Signature Method</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Team Collaboration</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { tool: "Google Docs", best: "Team collaboration", method: "Insert → Image (PNG)", collab: "Real-time, shared link" },
                    { tool: "Microsoft Word", best: "Offline / corporate docs", method: "Insert Picture or signature field", collab: "Limited (email attachments)" },
                    { tool: "PDF", best: "Final, locked documents", method: "PDF signing tool (Pixocraft)", collab: "None (static file)" },
                  ].map(({ tool, best, method, collab }) => (
                    <tr key={tool} className="hover:bg-muted/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{tool}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{best}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{method}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{collab}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">
              Use Google Docs when the document is being collaboratively drafted and reviewed. Export to PDF when the document is finalised and needs to be locked and shared externally.
            </p>
          </section>

          {/* Step-by-step guide */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">How to Add Signature in Google Docs – Step-by-Step Guide</h2>
            <p className="text-muted-foreground mb-5">Follow these six steps to add your signature to any Google Doc in under 35 seconds:</p>
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
              <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-gdocs-sig-steps-cta">
                <PenTool className="h-4 w-4" />Create Signature Now<ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </section>

          {/* Two methods */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Two Methods to Add Signature in Google Docs</h2>
            <p className="text-muted-foreground mb-5">Choose the method that fits your situation:</p>
            <div className="space-y-4">
              {[
                {
                  label: "Method 1 — Transparent PNG (Recommended)",
                  color: "bg-primary/5 border-primary/20",
                  steps: [
                    "Create your signature using Pixocraft's Signature Generator (draw, type, or upload).",
                    "Download as transparent PNG.",
                    "In Google Docs, click Insert → Image → Upload from computer.",
                    "Select the PNG and click Open.",
                    "Resize and position on the signature line.",
                  ],
                  note: "Best for: all users. Produces the highest quality signature with true transparency — no white box on any background.",
                },
                {
                  label: "Method 2 — Google Docs Drawing (Built-in Scribble)",
                  color: "bg-muted/30",
                  steps: [
                    "Click Insert → Drawing → New.",
                    "Select the Scribble tool from the line dropdown.",
                    "Draw your signature freehand with mouse or trackpad.",
                    "Click Save and Close.",
                    "Resize and position the inserted drawing image.",
                  ],
                  note: "Best for: quick, informal signatures on internal documents. Lower quality than the PNG method — not recommended for contracts or client-facing docs.",
                },
              ].map(({ label, color, steps, note }) => (
                <div key={label} className={`rounded-xl border p-5 ${color}`}>
                  <p className="font-semibold text-foreground mb-3">{label}</p>
                  <ol className="space-y-1.5 mb-3">
                    {steps.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs text-primary font-medium">{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Team collaboration */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Team Collaboration — Signing Shared Google Docs</h2>
            <p className="text-muted-foreground mb-5">
              Google Docs is built for collaboration. When you add a signature to a shared document, every collaborator sees the updated, signed version in real time — no file attachments, no email chains, no "which version is signed?" confusion.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
              {[
                { icon: <Eye className="h-5 w-5 text-primary" />, title: "Suggesting Mode", desc: "Use Suggesting Mode to propose a signature insertion that reviewers can accept or reject — ideal for multi-party approval flows." },
                { icon: <Share2 className="h-5 w-5 text-primary" />, title: "Viewer Permissions", desc: "Share the signed document with view-only access to clients or external parties. They see the signature; they cannot edit it." },
                { icon: <Check className="h-5 w-5 text-primary" />, title: "Approval Flow", desc: "For multi-signatory documents, each party adds their PNG signature to the same Google Doc. All signatures are visible and timestamped in the edit history." },
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
            <div className="rounded-xl border bg-card px-5 py-4">
              <p className="font-semibold text-foreground text-sm mb-2">Multi-Signatory Workflow</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For documents requiring multiple signatures — client contracts, partnership agreements, internal approvals — share the Google Doc with edit access. Each party inserts their signature PNG at the designated field. When all signatures are in place, download as PDF and archive the final signed document. The document's revision history provides a built-in audit trail.
              </p>
            </div>
          </section>

          {/* Use cases */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">When to Add a Signature in Google Docs — Use Cases</h2>
            <p className="text-muted-foreground mb-5">Common professional situations where signing directly in Google Docs is the best workflow:</p>
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

          {/* Legal validity */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">Is a Google Docs Signature Legally Valid in India?</h2>
            <div className="rounded-xl border bg-primary/5 border-primary/20 px-6 py-5 mb-5">
              <p className="text-foreground font-medium">
                Yes. An image-based electronic signature inserted in a Google Doc is legally valid under India's <strong>Information Technology Act 2000</strong> for the vast majority of commercial and professional documents.
              </p>
            </div>
            <p className="text-muted-foreground mb-4">
              The IT Act 2000 (Section 3A as amended in 2008) recognises electronic signatures for contracts, service agreements, and commercial transactions. The Indian Contract Act 1872 further validates electronically executed agreements between consenting parties. GST-related documents signed with an authorised representative's image-based signature comply with CBIC guidelines for manually generated invoices.
            </p>
            <div className="overflow-x-auto rounded-xl border">
              <table className="w-full text-sm min-w-[440px]">
                <thead>
                  <tr className="bg-primary/5 border-b">
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Document Type</th>
                    <th className="text-left px-5 py-3 font-semibold text-foreground">Google Docs PNG Valid?</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[
                    { doc: "Contracts & Service Agreements", valid: "Yes" },
                    { doc: "NDAs", valid: "Yes" },
                    { doc: "GST Reports & Summaries", valid: "Yes" },
                    { doc: "Employment / Offer Letters", valid: "Yes" },
                    { doc: "Freelance Proposals & SOWs", valid: "Yes" },
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

          {/* Common mistakes */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-2">Common Mistakes When Adding Signatures in Google Docs</h2>
            <p className="text-muted-foreground mb-5">Avoid these to ensure a professional, clean result:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-2">Pro Tips for Google Docs Signatures</h2>
            <p className="text-muted-foreground mb-5">Small workflow improvements that save significant time over the long run:</p>
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Use Pixocraft for Your Google Docs Signature?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <Zap className="h-5 w-5 text-primary" />, title: "Fastest Free Method", desc: "Create a signature and download the transparent PNG in under 15 seconds. Faster than any extension or add-on setup." },
                { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% Private", desc: "Your signature is created entirely in your browser. Nothing is uploaded, stored, or shared with any server." },
                { icon: <Users className="h-5 w-5 text-primary" />, title: "Team-Friendly", desc: "Share the PNG with your team for consistent signatures across all shared documents — proposals, contracts, and reports." },
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
            <h2 className="text-2xl font-bold text-foreground mb-4">Related Tools & Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "How to Add Signature in Word", href: "/tools/how-to-add-signature-in-word", desc: "Step-by-step guide for inserting a signature into Microsoft Word documents." },
                { label: "How to Sign PDF Online", href: "/tools/how-to-sign-pdf-online", desc: "Complete guide for signing PDF documents online — free and private." },
                { label: "Free Signature for Documents", href: "/tools/free-signature-for-documents", desc: "General-purpose digital signature for any document type." },
                { label: "Transparent Signature PNG", href: "/tools/transparent-signature-png", desc: "Create a transparent background signature PNG to use anywhere." },
                { label: "Signature for Contracts", href: "/tools/signature-for-contracts", desc: "Professional signature specifically for contracts and NDAs." },
                { label: "Signature Generator", href: "/tools/signature-pad-tool", desc: "Full-featured signature pad — draw, type, or upload your signature." },
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
            <PenTool className="h-10 w-10 text-primary mx-auto mb-3" />
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to Create Your Google Docs Signature?</h2>
            <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
              No login. No extension. 100% private. Create your transparent PNG signature in under 15 seconds — free, forever.
            </p>
            <Button onClick={() => document.getElementById("tool")?.scrollIntoView({ behavior: "smooth" })} className="gap-2" data-testid="button-gdocs-sig-final-cta">
              <PenTool className="h-4 w-4" />Create Signature for Google Docs<ArrowRight className="h-4 w-4" />
            </Button>
          </section>

        </div>
      </div>
    </>
  );
}
