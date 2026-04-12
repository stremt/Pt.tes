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
  Search,
  Download,
  ScrollText,
  RefreshCw,
  Database,
  ChevronDown,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StructuredData } from "@/lib/seo";

// Lazy-load heavy tool to keep LCP fast
const CSVViewerCore = lazy(() => import("@/components/tools/CSVViewerCore"));

// ── Constants ──────────────────────────────────────────────────────────────

const PUBLISHED = "2024-11-01";
const LAST_MODIFIED = "2025-04-11";
const CANONICAL = "https://tools.pixocraft.in/tools/csv-viewer/view-large-files";

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://tools.pixocraft.in/" },
  { name: "Tools", url: "https://tools.pixocraft.in/tools" },
  { name: "Developer Tools", url: "https://tools.pixocraft.in/tools/developer" },
  { name: "CSV Viewer & Editor", url: "https://tools.pixocraft.in/tools/csv-viewer" },
  { name: "View Large CSV Files" },
];

const FAQ_ITEMS = [
  {
    q: "Can I open large CSV files online without Excel?",
    a: "Yes. This viewer loads and renders large CSV files directly in your browser without Excel. Virtual scrolling means only the rows on screen are rendered, so even files with hundreds of thousands of rows open smoothly.",
  },
  {
    q: "Why does Excel crash on large CSV files?",
    a: "Excel loads the entire file into memory as a workbook. Large CSV files — especially those over 50MB or with 100k+ rows — exhaust available memory, causing crashes, freezing, or extremely slow performance. This browser-based viewer avoids that by only processing visible rows at any given moment.",
  },
  {
    q: "Is my data safe when viewing large CSV files online?",
    a: "Completely safe. Your file is never uploaded to any server. All parsing and rendering happens locally in your browser using JavaScript. No one can access your data — not even us.",
  },
  {
    q: "What file sizes are supported?",
    a: "The viewer supports files from kilobytes up to several hundred megabytes. Practical limits depend on the RAM in your device. Most business, research, and analytics CSV files — including 100MB+ exports — work without issue.",
  },
  {
    q: "Can I search inside a large CSV file online?",
    a: "Yes. The built-in search bar lets you find any value across all rows instantly. Results highlight in real time, even across very large datasets, without reloading the page.",
  },
  {
    q: "Can I edit a large CSV file after viewing it?",
    a: "Yes. Switch to Edit Mode to click into any cell and make changes. You can add rows, delete columns, rename headers, and download the updated CSV when done.",
  },
  {
    q: "Does this tool work on mobile for large files?",
    a: "Yes. The layout is responsive and the virtual scroll works on touch devices. Large tables are horizontally scrollable on small screens so all columns remain accessible.",
  },
  {
    q: "Do I need to install anything to view large CSV files?",
    a: "No installation, no plugin, no download. Open this page in any modern browser — Chrome, Firefox, Safari, Edge — and drag your file in. It works instantly.",
  },
];

const HOW_TO_STEPS = [
  {
    name: "Upload your large CSV file",
    text: "Drag and drop your CSV onto the tool or click to browse. The file is read directly by your browser — nothing is sent to a server.",
  },
  {
    name: "View the data instantly",
    text: "The spreadsheet renders immediately using virtual scrolling. Even files with 500,000 rows display without lag.",
  },
  {
    name: "Search, filter, or scroll",
    text: "Use the search bar to find any value instantly. Scroll horizontally to see all columns. Sort by any column header.",
  },
  {
    name: "Export or download if needed",
    text: "If you made edits or want to save a filtered view, click the download button to export a clean CSV file.",
  },
];

// ── Schemas ────────────────────────────────────────────────────────────────

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Large CSV Viewer Online",
  operatingSystem: "Web",
  applicationCategory: "DeveloperApplication",
  description:
    "View large CSV files online without Excel. Open huge datasets (up to 1GB) with fast rendering and zero lag directly in your browser.",
  url: CANONICAL,
  featureList: [
    "Handles large CSV files up to 1GB",
    "No upload required",
    "Fast virtual rendering",
    "Search large datasets instantly",
    "Smooth scrolling without lag",
    "Edit cells and export updated CSV",
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
  name: "How to View Large CSV Files Online Without Excel",
  description:
    "A step-by-step guide to opening and viewing large CSV files in your browser without installing Excel or any software.",
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
    { "@type": "ListItem", position: 5, name: "View Large CSV Files", item: CANONICAL },
  ],
};

// ── Component ──────────────────────────────────────────────────────────────

export default function CSVViewLargeFiles() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>View Large CSV Files Online (Open Big CSV Without Excel Instantly) | Pixocraft</title>
        <meta
          name="description"
          content="Open and view large CSV files instantly without Excel. Supports huge files (100MB+ to 1GB) with fast performance and no lag. 100% private, no upload required."
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:title" content="View Large CSV Files Online — No Excel, No Lag" />
        <meta
          property="og:description"
          content="Open huge CSV files instantly without crashes. Works with large datasets directly in your browser."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pixocraft Tools" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Open Large CSV Files (Fast & Free)" />
        <meta
          name="twitter:description"
          content="View big CSV files online without Excel. No upload, no lag, smooth performance."
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
              Free Online Large CSV Viewer
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
              View Large CSV Files Online{" "}
              <span className="text-primary">Without Excel</span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground">
              Open big CSV files — 100MB+, 1M rows — instantly in your browser. Virtual scrolling
              keeps performance smooth. No Excel, no install, no upload.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
              {[
                "Virtual scroll — zero lag",
                "100k+ rows supported",
                "0 bytes uploaded",
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
              <a href="#large-csv-tool" className="w-full sm:w-auto">
                <Button size="lg" className="w-full" data-testid="button-hero-cta">
                  Open Large CSV Now
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

          {/* ── STATS ─────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { stat: "100k+", label: "Rows rendered smoothly" },
              { stat: "<1s", label: "Time to first render" },
              { stat: "0 MB", label: "Data uploaded to server" },
            ].map(({ stat, label }) => (
              <div key={label} className="text-center p-5 bg-muted/30 rounded-md border">
                <div className="text-3xl font-bold text-primary mb-1">{stat}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          {/* ── TOOL (lazy-loaded) ─────────────────────────────────────── */}
          <div id="large-csv-tool" className="scroll-mt-6 space-y-2">
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <ScrollText className="h-4 w-4 shrink-0" />
              Drag your CSV file below or click to browse — renders instantly with virtual scrolling
            </p>
            <Suspense
              fallback={
                <div className="flex items-center justify-center border rounded-md bg-muted/20 h-64 text-muted-foreground text-sm gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Loading CSV viewer…
                </div>
              }
            >
              <CSVViewerCore />
            </Suspense>
          </div>

          {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
          <section id="how-it-works" className="space-y-5 scroll-mt-6">
            <h2 className="text-2xl font-bold text-foreground">
              How to View Large CSV Files Online Without Excel
            </h2>
            <p className="text-muted-foreground">
              The entire workflow takes under 30 seconds, even for files with millions of rows.
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
              Need to do more than view? You can also{" "}
              <Link
                href="/tools/csv-viewer/edit-without-excel"
                className="text-primary underline underline-offset-2 hover:no-underline"
                data-testid="link-edit-without-excel"
              >
                edit CSV files online without Excel
              </Link>{" "}
              — clicking any cell switches the viewer into full edit mode.
            </p>
          </section>

          {/* ── WHY EXCEL FAILS ───────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Why Excel Crashes on Large CSV Files (And How to Fix It)
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Excel was designed for spreadsheet analysis, not large-file streaming. When you
                open a big CSV in Excel, it loads the entire file into memory as a workbook. A
                50,000-row file might consume 200MB of RAM. A 500,000-row file can exhaust all
                available memory, causing Excel to freeze, crash, or simply refuse to open the
                file at all.
              </p>
              <p>
                Beyond memory, Excel auto-converts certain cell values on import. Phone numbers
                that start with a zero get stripped. Dates in formats like "2024-03-01" get
                reformatted into your locale's date style. Long numeric IDs shift to scientific
                notation. By the time your file opens, your data may already be corrupted — even
                before you made a single change.
              </p>
              <p>
                This viewer solves both problems. Virtual scrolling means only the rows currently
                visible on your screen are in memory. A file with 1 million rows consumes almost
                the same RAM as a file with 1,000 rows. And because CSV values are displayed
                verbatim — not interpreted — no data corruption ever occurs.
              </p>
            </div>
          </section>

          {/* ── HOW VIRTUAL SCROLLING WORKS ───────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              How Virtual Scrolling Handles Any CSV File Size
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Virtual scrolling is the core technology behind this viewer's performance with
                large files. Instead of rendering every row in the DOM, the engine calculates
                which rows are currently visible in the viewport and renders only those — plus a
                small buffer above and below for smooth scrolling. As you scroll, rows outside
                the viewport are removed from the DOM and new ones are added.
              </p>
              <p>
                The result is that scrolling through a 500,000-row CSV file feels identical to
                scrolling through a 500-row one. The browser is never asked to hold more than a
                few hundred DOM nodes at once, regardless of how many rows the file contains.
                This approach is the same technique used by high-performance list rendering in
                tools like Google Sheets and large-data dashboards.
              </p>
              <p>
                Search is equally fast. When you type in the search bar, the tool scans all rows
                in memory (not the DOM) and highlights matches instantly. No page reload, no
                server round-trip, no delay.
              </p>
            </div>
          </section>

          {/* ── FEATURES ──────────────────────────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl font-bold text-foreground">
              Features Built for Large CSV Files
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Zap,
                  title: "Virtual rendering",
                  desc: "Only visible rows are in the DOM. Files with 1M rows open as fast as files with 1k rows.",
                },
                {
                  icon: Search,
                  title: "Instant full-file search",
                  desc: "Search across every row simultaneously. Results appear as you type, no matter the file size.",
                },
                {
                  icon: Shield,
                  title: "Zero upload — 100% private",
                  desc: "Files never leave your device. All processing is local, so sensitive datasets stay safe.",
                },
                {
                  icon: ScrollText,
                  title: "Horizontal scrolling",
                  desc: "Wide CSVs with dozens of columns remain accessible. Scroll left and right with headers fixed.",
                },
                {
                  icon: Database,
                  title: "No localStorage writes",
                  desc: "Large files are not written to localStorage, preventing browser storage limits from causing errors.",
                },
                {
                  icon: Download,
                  title: "Export after editing",
                  desc: "Edit any cell, add or remove rows, then download a clean, correctly formatted CSV.",
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

          {/* ── PRIVACY ───────────────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Your Large CSV Data Stays Completely Private
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Privacy is especially important when working with large files — they often contain
                customer records, financial data, employee information, or healthcare exports.
                This tool is built with a strict client-side-only architecture. Your file is
                parsed in the browser by JavaScript running on your machine. No bytes of your
                file content are transmitted over the network.
              </p>
              <p>
                There are no analytics trackers reading your file content, no server logs capturing
                row counts or column names, and no session data that persists your file after you
                close the tab. When you close this page, the data is gone. Nothing is retained.
              </p>
              <p>
                If you frequently{" "}
                <Link
                  href="/tools/csv-viewer/view-in-browser"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                  data-testid="link-view-in-browser"
                >
                  view CSV files directly in your browser
                </Link>{" "}
                without downloading them, this tool extends that workflow to files of any size —
                with no performance penalty.
              </p>
            </div>
          </section>

          {/* ── WHO USES THIS ─────────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Who Needs a Large CSV File Viewer?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Data engineers & analysts",
                  desc: "Quickly inspect pipeline outputs, verify schema correctness, and check row counts without importing into a database.",
                },
                {
                  title: "E-commerce teams",
                  desc: "Open large product catalogs, order exports, or inventory feeds from Shopify, WooCommerce, or ERPs that easily exceed Excel's comfortable range.",
                },
                {
                  title: "Marketers",
                  desc: "View full CRM exports or campaign reports from HubSpot, Salesforce, or Klaviyo — often hundreds of thousands of contacts — without software installs.",
                },
                {
                  title: "Researchers & academics",
                  desc: "Work with census data, scientific datasets, and survey exports that regularly contain millions of rows.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex gap-3 p-4 rounded-md border bg-card">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
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
              Ready to open your large CSV file?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              No Excel. No upload. No lag. Just fast, private CSV viewing for files of any size.
            </p>
            <a href="#large-csv-tool">
              <Button size="lg" data-testid="button-bottom-cta">
                View Large CSV Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            {/* Content freshness signal */}
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
                  desc: "Full spreadsheet editing in your browser — no Excel needed",
                },
                {
                  href: "/tools/csv-viewer/view-in-browser",
                  title: "View CSV in Browser",
                  desc: "Preview CSV files instantly without downloading or installing anything",
                },
                {
                  href: "/tools/csv-viewer",
                  title: "CSV Viewer & Editor",
                  desc: "The full-featured main CSV tool with all options",
                },
                {
                  href: "/tools/csv-viewer/convert-and-edit",
                  title: "Convert & Edit CSV",
                  desc: "Convert then edit in one step — no separate tools needed",
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
