import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  RefreshCw,
  Pencil,
  Download,
  LayoutGrid,
  FileJson,
  FileText,
  RotateCcw,
  MousePointerClick,
  ChevronDown,
  Code2,
  BarChart2,
  Megaphone,
  Database,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StructuredData } from "@/lib/seo";

// Lazy-load heavy tool to keep LCP fast
const CSVViewerCore = lazy(() => import("@/components/tools/CSVViewerCore"));

// ── Constants ──────────────────────────────────────────────────────────────

const PUBLISHED = "2024-11-01";
const LAST_MODIFIED = "2025-04-11";
const CANONICAL = "https://tools.pixocraft.in/tools/csv-viewer/convert-and-edit";

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://tools.pixocraft.in/" },
  { name: "Tools", url: "https://tools.pixocraft.in/tools" },
  { name: "Developer Tools", url: "https://tools.pixocraft.in/tools/developer" },
  { name: "CSV Viewer & Editor", url: "https://tools.pixocraft.in/tools/csv-viewer" },
  { name: "Convert & Edit CSV" },
];

const FAQ_ITEMS = [
  {
    q: "Can I convert and edit CSV files online without Excel?",
    a: "Yes. You can paste or upload data in multiple formats, have it converted to CSV instantly, and then edit every cell, row, and column — all in your browser without Excel or any desktop software.",
  },
  {
    q: "Do I need Excel to edit a CSV file after converting it?",
    a: "No. This tool handles both conversion and editing entirely in the browser. You convert the data and edit it in the same interface. Excel is never needed at any stage.",
  },
  {
    q: "What formats can I convert to CSV online?",
    a: "You can paste JSON, TSV (tab-separated values), and comma-separated data directly. The parser detects the format and converts it to a clean CSV grid instantly.",
  },
  {
    q: "Is my data safe when converting and editing CSV online?",
    a: "Completely safe. Nothing is uploaded to a server at any point. Your data is parsed and rendered entirely within your browser using local JavaScript. No one outside your device ever sees your file content.",
  },
  {
    q: "Can I edit large CSV files after converting them?",
    a: "Yes. The editor uses virtual scrolling, so even files with 100,000+ rows remain responsive after conversion. Editing, searching, and exporting all work smoothly regardless of file size.",
  },
  {
    q: "Does the conversion process change or corrupt my data?",
    a: "No. Values are preserved exactly as entered. Special characters, quoted fields, leading zeros, and long numeric strings are all maintained correctly through the conversion and export process.",
  },
  {
    q: "Can I undo changes I made while editing the converted CSV?",
    a: "Yes. The editor supports undo and redo (Ctrl+Z / Ctrl+Y) so you can experiment freely and revert any mistake without losing your work.",
  },
  {
    q: "What format is the file exported in after editing?",
    a: "The file downloads as a properly formatted CSV, compatible with Excel, Google Sheets, databases, CRM imports, and any other tool that accepts CSV input.",
  },
];

const HOW_TO_STEPS = [
  {
    name: "Upload or paste your file",
    text: "Drag in a CSV, TSV, or JSON file — or paste raw data directly into the tool. Nothing is sent to a server.",
  },
  {
    name: "Convert to CSV format",
    text: "The parser detects your format and converts it to a clean CSV grid instantly. Headers are preserved, values are displayed accurately.",
  },
  {
    name: "Edit data instantly",
    text: "Click any cell to modify it. Add or remove rows and columns, rename headers, and fix any data issues — all inline.",
  },
  {
    name: "Download the updated CSV file",
    text: "When done, click Download. Your file saves as a clean, properly formatted CSV ready for any tool or platform.",
  },
];

// ── Schemas ────────────────────────────────────────────────────────────────

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CSV Converter and Editor",
  operatingSystem: "Web",
  applicationCategory: "DeveloperApplication",
  description:
    "Convert and edit CSV files online without Excel. Modify data after conversion with full control over rows, columns, and headers.",
  url: CANONICAL,
  featureList: [
    "Convert CSV instantly",
    "Edit CSV after conversion",
    "Modify rows and columns",
    "No Excel required",
    "No upload needed",
    "Private and secure",
  ],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  datePublished: PUBLISHED,
  dateModified: LAST_MODIFIED,
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Convert and Edit CSV Files Online Without Excel",
  description:
    "Step-by-step guide to converting data to CSV format and editing it in the browser — no Excel, no installation.",
  step: HOW_TO_STEPS.map((s) => ({
    "@type": "HowToStep",
    name: s.name,
    text: s.text,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in/" },
    { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", position: 3, name: "Developer Tools", item: "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", position: 4, name: "CSV Viewer & Editor", item: "https://tools.pixocraft.in/tools/csv-viewer" },
    { "@type": "ListItem", position: 5, name: "Convert & Edit CSV", item: CANONICAL },
  ],
};

// ── Component ──────────────────────────────────────────────────────────────

export default function CSVConvertAndEdit() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Convert & Edit CSV Files Online (Free CSV Converter + Editor) | Pixocraft</title>
        <meta
          name="description"
          content="Convert and edit CSV files instantly online. Modify data, columns, and rows after conversion without Excel. Fast, free, and 100% private."
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:title" content="Convert & Edit CSV Files Online — Fast & Free" />
        <meta
          property="og:description"
          content="Convert CSV files and edit them instantly without Excel. No upload, fast and secure."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pixocraft Tools" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CSV Converter + Editor (Free Online Tool)" />
        <meta
          name="twitter:description"
          content="Convert and edit CSV files online instantly. No Excel needed, fast and private."
        />

        {/* Freshness */}
        <meta name="article:published_time" content={PUBLISHED} />
        <meta name="article:modified_time" content={LAST_MODIFIED} />

        <link rel="canonical" href={CANONICAL} />
      </Helmet>

      {/* Structured data */}
      <StructuredData data={softwareSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={breadcrumbSchema} />

      <main className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={BREADCRUMB_ITEMS} />

        <div className="space-y-14">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <div className="space-y-5 text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="text-xs">
              Free Online CSV Converter + Editor
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Convert and Edit CSV Files Online{" "}
              <span className="text-primary">Without Excel</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground">
              Convert data to CSV format and edit it in the same tool — instantly, free, and
              100% private. No Excel, no install, no switching between apps.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
              {[
                "Convert + edit in one step",
                "No Excel needed",
                "Nothing uploaded",
                "Works on any device",
              ].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {t}
                </span>
              ))}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="#convert-edit-tool" className="w-full sm:w-auto">
                <Button size="lg" className="w-full" data-testid="button-hero-cta">
                  Convert & Edit CSV Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#how-it-works" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full" data-testid="button-hero-howto">
                  How it works
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* ── BENEFIT STRIP ─────────────────────────────────────────── */}
          <div className="rounded-md border bg-muted/40 px-6 py-5 flex flex-wrap items-center justify-center gap-6 text-center">
            {[
              { icon: FileJson, text: "Paste JSON, TSV, or CSV" },
              { icon: Pencil, text: "Edit any cell inline" },
              { icon: Download, text: "Export as clean CSV" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5">
                <Icon className="h-6 w-6 text-primary" />
                <span className="font-semibold text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>

          {/* ── TOOL (lazy-loaded) ─────────────────────────────────────── */}
          <div id="convert-edit-tool" className="scroll-mt-6 space-y-2">
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <MousePointerClick className="h-4 w-4 shrink-0" />
              Upload a file or paste data — convert and edit in one place
            </p>
            <Suspense
              fallback={
                <div className="flex items-center justify-center border rounded-md bg-muted/20 h-64 text-muted-foreground text-sm gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Loading CSV converter…
                </div>
              }
            >
              <CSVViewerCore />
            </Suspense>
          </div>

          {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
          <section id="how-it-works" className="space-y-5 scroll-mt-6">
            <h2 className="text-2xl font-bold text-foreground">
              How to Convert and Edit CSV Files Online Without Excel
            </h2>
            <p className="text-muted-foreground">
              The full workflow — from raw data to a clean, edited CSV — takes under a minute.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {HOW_TO_STEPS.map((step, i) => (
                <div key={step.name} className="flex gap-4 p-4 rounded-md border bg-card">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                    {i + 1}
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground text-sm">{step.name}</p>
                    <p className="text-sm text-muted-foreground">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground">
              If you only need editing without a conversion step, go directly to{" "}
              <Link
                href="/tools/csv-viewer/edit-without-excel"
                className="text-primary underline underline-offset-2 hover:no-underline"
                data-testid="link-edit-without-excel"
              >
                edit CSV files without Excel
              </Link>
              . For very large files,{" "}
              <Link
                href="/tools/csv-viewer/view-large-files"
                className="text-primary underline underline-offset-2 hover:no-underline"
                data-testid="link-view-large-files"
              >
                view large CSV files
              </Link>{" "}
              with the performance-optimised viewer.
            </p>
          </section>

          {/* ── WHY CONVERT + EDIT IN ONE TOOL ───────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Why Convert and Edit CSV in the Same Tool?
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                The traditional workflow for dealing with data in the wrong format involves at
                least two steps and two separate tools: a converter and a spreadsheet editor.
                You convert the file in one place, download the output, upload it to another
                tool, make your edits, and download again. Each handoff introduces a risk of
                data corruption or format shift, and the back-and-forth costs real time.
              </p>
              <p>
                An integrated convert-and-edit tool collapses this into a single session. You
                bring in your data — whether it is a CSV from a CRM, a JSON export from an API,
                or a tab-separated file from a database tool — convert it to the format you
                need, fix any issues you spot immediately, and export the final result in one
                download. No intermediate files. No re-uploading. No format drift between
                applications.
              </p>
              <p>
                For recurring data workflows — weekly reports, monthly exports, regular data
                migrations — this approach saves meaningful time. Each session is cleaner,
                faster, and less error-prone than using separate tools for each stage.
              </p>
            </div>
          </section>

          {/* ── PROBLEMS SOLVED ───────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Common CSV Problems This Tool Solves
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: FileJson,
                  title: "JSON or TSV to CSV",
                  desc: "Paste JSON data or a tab-separated export and the tool converts it to a clean CSV grid in one click.",
                },
                {
                  icon: FileText,
                  title: "Wrong column names",
                  desc: "Rename any header directly in the grid to match your target system's schema — no separate steps needed.",
                },
                {
                  icon: LayoutGrid,
                  title: "Extra or missing columns",
                  desc: "Add the columns you need, delete the ones you do not. Reorder your data to match the expected import format.",
                },
                {
                  icon: Pencil,
                  title: "Incorrect cell values",
                  desc: "Click any cell to correct values, fix formatting errors, or update stale data before exporting.",
                },
                {
                  icon: RotateCcw,
                  title: "Mistakes during editing",
                  desc: "Undo any change with Ctrl+Z. Up to 50 steps of undo history means you can work freely without fear of data loss.",
                },
                {
                  icon: Shield,
                  title: "Privacy concerns with online tools",
                  desc: "Everything runs locally in your browser. No upload, no server, no data exposure — even for sensitive business data.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-2 p-4 rounded-md border bg-card">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── FEATURES ──────────────────────────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl font-bold text-foreground">
              Features of the CSV Converter and Editor
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Zap,
                  title: "Instant conversion",
                  desc: "Paste JSON, TSV, or CSV data and the grid appears immediately. No waiting, no processing delay.",
                },
                {
                  icon: Pencil,
                  title: "Inline cell editing",
                  desc: "Click any cell to edit. Use Tab to move right, Enter to move down — familiar keyboard navigation.",
                },
                {
                  icon: LayoutGrid,
                  title: "Add / remove rows and columns",
                  desc: "Insert rows above or below, delete any column, and add new fields exactly where you need them.",
                },
                {
                  icon: FileText,
                  title: "Rename headers",
                  desc: "Click any column header to rename it in place. Instantly align your data to your target schema.",
                },
                {
                  icon: RotateCcw,
                  title: "Undo / Redo (50 steps)",
                  desc: "Ctrl+Z undoes the last action. Ctrl+Y redoes it. Work freely without worrying about mistakes.",
                },
                {
                  icon: Download,
                  title: "Export as clean CSV",
                  desc: "Download your finished file as a properly formatted CSV ready for any platform or tool.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col gap-2 p-4 rounded-md border bg-card">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary shrink-0" />
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── WHO IS IT FOR ─────────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Who Should Use This CSV Converter and Editor?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Code2,
                  title: "Developers",
                  desc: "Convert API JSON responses or database exports to CSV and clean them up before importing into another system — no extra tooling required.",
                },
                {
                  icon: Database,
                  title: "Data engineers",
                  desc: "Fix column names, remove unwanted fields, and correct values in pipeline outputs before they reach downstream consumers.",
                },
                {
                  icon: Megaphone,
                  title: "Marketers",
                  desc: "Convert CRM exports, ad platform data, or email list formats and clean them up for re-import — without asking a developer to help.",
                },
                {
                  icon: BarChart2,
                  title: "Analysts and operations teams",
                  desc: "Standardise data from multiple sources into a consistent CSV schema before merging into a master file or BI tool.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4 p-4 rounded-md border bg-card">
                  <Icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground text-sm">{title}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ───────────────────────────────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQ_ITEMS.map(({ q, a }) => (
                <Card key={q}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base font-semibold">{q}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
          <div className="rounded-md border bg-muted/30 px-6 py-8 text-center space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Ready to convert and edit your CSV?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              One tool. Convert, edit, and export. No Excel. No upload. No data risk.
            </p>
            <a href="#convert-edit-tool">
              <Button size="lg" data-testid="button-bottom-cta">
                Convert & Edit CSV Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <p className="text-xs text-muted-foreground pt-2">
              Last updated: April 2025
            </p>
          </div>

          {/* ── RELATED TOOLS ─────────────────────────────────────────── */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Related CSV Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  href: "/tools/csv-viewer/edit-without-excel",
                  title: "Edit CSV Without Excel",
                  desc: "Full spreadsheet editing — click any cell, no Excel needed",
                },
                {
                  href: "/tools/csv-viewer/view-large-files",
                  title: "View Large CSV Files",
                  desc: "Open huge CSV files (100MB+) with virtual scrolling",
                },
                {
                  href: "/tools/csv-viewer/view-in-browser",
                  title: "View CSV in Browser",
                  desc: "Preview any CSV instantly without downloading or installing",
                },
                {
                  href: "/tools/csv-viewer",
                  title: "CSV Viewer & Editor",
                  desc: "The full-featured main CSV tool with all options",
                },
              ].map(({ href, title, desc }) => (
                <Link key={href} href={href}>
                  <div
                    className="flex items-center gap-3 p-4 border rounded-md hover-elevate cursor-pointer bg-card"
                    data-testid={`link-related-${title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="p-2 rounded-md bg-primary/10 shrink-0">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-foreground">{title}</div>
                      <div className="text-xs text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
