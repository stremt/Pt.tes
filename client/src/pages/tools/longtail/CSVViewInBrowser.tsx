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
  Monitor,
  Search,
  RefreshCw,
  Globe,
  EyeOff,
  HardDriveDownload,
  ChevronDown,
  MousePointerClick,
} from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StructuredData } from "@/lib/seo";

// Lazy-load heavy tool to keep LCP fast
const CSVViewerCore = lazy(() => import("@/components/tools/CSVViewerCore"));

// ── Constants ──────────────────────────────────────────────────────────────

const PUBLISHED = "2024-11-01";
const LAST_MODIFIED = "2025-04-11";
const CANONICAL = "https://tools.pixocraft.in/tools/csv-viewer/view-in-browser";

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://tools.pixocraft.in/" },
  { name: "Tools", url: "https://tools.pixocraft.in/tools" },
  { name: "Developer Tools", url: "https://tools.pixocraft.in/tools/developer" },
  { name: "CSV Viewer & Editor", url: "https://tools.pixocraft.in/tools/csv-viewer" },
  { name: "View CSV in Browser" },
];

const FAQ_ITEMS = [
  {
    q: "Can I view CSV files directly in my browser?",
    a: "Yes. This tool renders your CSV file entirely inside your browser — no software, no installation, no download required. Drag in your file and the data appears instantly in a clean spreadsheet grid.",
  },
  {
    q: "Do I need Excel to open a CSV file in my browser?",
    a: "No. Excel is not required. This browser-based CSV viewer opens any CSV file instantly without any desktop software. It works on Windows, Mac, Linux, iOS, and Android.",
  },
  {
    q: "Is it safe to view CSV files online in my browser?",
    a: "Completely safe. Your file is never uploaded to any server. All parsing and rendering happens locally in your browser using JavaScript. No one can access your data — not even the tool's creators.",
  },
  {
    q: "Can I use this CSV viewer on mobile?",
    a: "Yes. The viewer is fully responsive. It works on smartphones and tablets with touch-friendly controls. Large tables scroll horizontally so all columns remain accessible on small screens.",
  },
  {
    q: "Can I search inside a CSV file while viewing it in the browser?",
    a: "Yes. The built-in search bar finds any value across all rows instantly. Results highlight in real time without reloading the page — even across files with thousands of rows.",
  },
  {
    q: "What happens to my file after I close the browser tab?",
    a: "Nothing. Since nothing is uploaded and nothing is stored on a server, closing the tab simply removes the file from memory. Your original file is untouched.",
  },
  {
    q: "Can I edit the CSV after viewing it in the browser?",
    a: "Yes. Click any cell to switch into edit mode. You can modify values, add or remove rows and columns, rename headers, and download the updated file — all without leaving the browser.",
  },
  {
    q: "What CSV formats and encodings are supported?",
    a: "The viewer handles comma-separated and tab-separated files, UTF-8 and other common encodings, and CSVs with quoted fields or embedded commas. Files from Excel, Google Sheets, databases, or any other source all work correctly.",
  },
];

const HOW_TO_STEPS = [
  {
    name: "Upload your CSV file",
    text: "Drag and drop your CSV onto the viewer below, or click to browse. Nothing is sent to a server — the file is read locally.",
  },
  {
    name: "View instantly in your browser",
    text: "The data appears in a clean spreadsheet grid within seconds. Rows, columns, and headers are laid out clearly.",
  },
  {
    name: "Scroll, search, and explore",
    text: "Scroll through all rows, search for any value, and sort by any column. The layout stays responsive on all screen sizes.",
  },
];

// ── Schemas ────────────────────────────────────────────────────────────────

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CSV Viewer in Browser",
  operatingSystem: "Web",
  applicationCategory: "DeveloperApplication",
  description:
    "View CSV files directly in your browser without Excel. Fast, secure, and no upload required.",
  url: CANONICAL,
  featureList: [
    "View CSV instantly in browser",
    "No Excel required",
    "No upload needed",
    "Private and secure",
    "Works on any device",
    "Search and filter rows",
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
  name: "How to View CSV Files in Your Browser Without Excel",
  description:
    "Step-by-step guide to opening and viewing CSV files directly in your browser, without downloading Excel or any other software.",
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
    { "@type": "ListItem", position: 5, name: "View CSV in Browser", item: CANONICAL },
  ],
};

// ── Component ──────────────────────────────────────────────────────────────

export default function CSVViewInBrowser() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>View CSV in Browser (Open CSV Without Excel Instantly) | Pixocraft</title>
        <meta
          name="description"
          content="View CSV files directly in your browser without Excel. Open CSV instantly with no upload, fast performance, and full privacy."
        />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:title" content="View CSV in Browser — No Excel Needed" />
        <meta
          property="og:description"
          content="Open CSV files directly in your browser instantly. No upload, fast and secure CSV viewer."
        />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Pixocraft Tools" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Open CSV in Browser (Fast & Free)" />
        <meta
          name="twitter:description"
          content="View CSV files instantly in your browser without Excel. No upload, 100% private."
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
              Free Online CSV Browser Viewer
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              View CSV in Browser{" "}
              <span className="text-primary">Without Excel</span>
            </h1>

            <p className="text-lg text-muted-foreground">
              Open any CSV file instantly in your browser. No Excel, no download, no signup.
              See your data in a clean spreadsheet grid — private, fast, and free.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
              {[
                "No Excel required",
                "Instant preview",
                "Nothing uploaded",
                "Works on mobile",
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

            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a href="#csv-browser-tool">
                <Button size="lg" data-testid="button-hero-cta">
                  View CSV in Browser
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
              <a href="#how-it-works">
                <Button size="lg" variant="outline" data-testid="button-hero-howto">
                  How it works
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* ── BENEFIT STRIP ─────────────────────────────────────────── */}
          <div className="rounded-md border bg-muted/40 px-6 py-5 flex flex-wrap items-center justify-center gap-6 text-center">
            {[
              { icon: Globe, text: "Works in any browser" },
              { icon: EyeOff, text: "Nothing stored on server" },
              { icon: HardDriveDownload, text: "No install needed" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5">
                <Icon className="h-6 w-6 text-primary" />
                <span className="font-semibold text-sm text-foreground">{text}</span>
              </div>
            ))}
          </div>

          {/* ── TOOL (lazy-loaded) ─────────────────────────────────────── */}
          <div id="csv-browser-tool" className="scroll-mt-6 space-y-2">
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <MousePointerClick className="h-4 w-4 shrink-0" />
              Drag your CSV below or click to browse — renders instantly in your browser
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
              How to View CSV Files in Your Browser Without Excel
            </h2>
            <p className="text-muted-foreground">
              Three steps. No software. No waiting.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {HOW_TO_STEPS.map((step, i) => (
                <div key={step.name} className="flex flex-col gap-3 p-4 rounded-md border bg-card">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
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
              If you need to do more than view — click any cell to switch into edit mode.
              You can also{" "}
              <Link
                href="/tools/csv-viewer/edit-without-excel"
                className="text-primary underline underline-offset-2 hover:no-underline"
                data-testid="link-edit-without-excel"
              >
                edit CSV files without Excel
              </Link>{" "}
              or{" "}
              <Link
                href="/tools/csv-viewer/view-large-files"
                className="text-primary underline underline-offset-2 hover:no-underline"
                data-testid="link-view-large-files"
              >
                view large CSV files
              </Link>{" "}
              with thousands of rows.
            </p>
          </section>

          {/* ── WHY VIEW IN BROWSER ───────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Why View CSV Files in Your Browser Instead of Downloading?
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Every time you download a file to view it, you create a small problem: the file
                ends up on your device, possibly in the wrong folder, possibly forgotten,
                eventually cluttering your hard drive. Multiply that by the dozens of CSV files
                a typical analyst, marketer, or developer receives each week and the problem
                grows quickly.
              </p>
              <p>
                Viewing CSV files directly in your browser eliminates that cycle. You open the
                file, check the contents, verify the data, and move on. If the file is what you
                need, you download it intentionally. If it is not, you close the tab and nothing
                is saved. Your device stays clean. Your downloads folder stays organized.
              </p>
              <p>
                There is also a meaningful security benefit. Files you download from external
                sources — email attachments, shared links, third-party exports — carry a small
                risk of containing unexpected scripts or macros when opened in desktop software.
                Viewing CSVs in a browser-based viewer removes that concern entirely. The file
                is parsed as plain text. No macros run. No scripts execute.
              </p>
            </div>
          </section>

          {/* ── WHAT IS A CSV ─────────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              What Is a CSV File and Why Open It in a Browser?
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                A CSV (Comma-Separated Values) file is a plain text format for storing tabular
                data. Each line represents a row. Each value within a row is separated by a
                comma. The first row typically contains the column headers. Because CSV is plain
                text, any software that can read text — including browsers — can open it.
              </p>
              <p>
                The challenge is that raw CSV in a text editor is hard to read. Values run
                together, headers are not visually separated from data rows, and wide files
                become impossible to navigate. A browser-based CSV viewer solves this by
                rendering the file as a proper spreadsheet grid — rows and columns clearly
                separated, headers frozen, horizontal scrolling enabled for wide files.
              </p>
              <p>
                The result looks similar to Excel, but without any of Excel's downsides —
                no installation, no subscription, no auto-conversion of dates or numbers, and
                no risk of saving the file in the wrong format. Just a clean, accurate
                representation of your raw CSV data.
              </p>
            </div>
          </section>

          {/* ── FEATURES ──────────────────────────────────────────────── */}
          <section className="space-y-5">
            <h2 className="text-2xl font-bold text-foreground">
              Features of This Browser CSV Viewer
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: Zap,
                  title: "Instant rendering",
                  desc: "Your CSV appears in under a second. No waiting, no progress bars for normal-sized files.",
                },
                {
                  icon: Search,
                  title: "Full-file search",
                  desc: "Search any value across all rows. Results highlight instantly as you type.",
                },
                {
                  icon: Shield,
                  title: "Zero upload privacy",
                  desc: "Your file never leaves your device. All processing is local.",
                },
                {
                  icon: Monitor,
                  title: "Works on any device",
                  desc: "Chrome, Firefox, Safari, Edge — desktop, tablet, or phone.",
                },
                {
                  icon: Globe,
                  title: "No install required",
                  desc: "Just open this page and drop your file. Nothing to download or configure.",
                },
                {
                  icon: ArrowRight,
                  title: "Switch to edit mode",
                  desc: "Click any cell to edit. Add rows, delete columns, rename headers, and export.",
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
              Complete Privacy When Viewing CSV Files in Your Browser
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Many online file tools require you to upload your file to their servers. This is
                how they process and display it. The problem is that once your file is on their
                server, you have no control over how it is stored, how long it is retained, or
                who can access it.
              </p>
              <p>
                This viewer works differently. Your CSV file is read directly by JavaScript
                running in your browser tab — the same way a web page reads a form you fill in.
                No data crosses the network. No server ever sees your file content. You can
                verify this with your browser's Network tab in Developer Tools: no file upload
                request is made at any point during the viewing process.
              </p>
              <p>
                This makes the tool safe for sensitive datasets — customer PII, financial
                records, employee data, healthcare exports, or proprietary research. The
                client-side-only architecture is not a promise — it is a technical constraint
                that makes data exposure structurally impossible.
              </p>
            </div>
          </section>

          {/* ── WHO IS IT FOR ─────────────────────────────────────────── */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Who Should Use a Browser-Based CSV Viewer?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: "Developers",
                  desc: "Quickly inspect data exports, API responses saved as CSV, or seed files without opening a heavy IDE or spreadsheet app.",
                },
                {
                  title: "Data analysts",
                  desc: "Preview and verify datasets before importing into a database, BI tool, or Python/R workflow. Catch schema issues before they cause errors downstream.",
                },
                {
                  title: "Marketers",
                  desc: "Check CRM exports, campaign reports, and subscriber lists from HubSpot, Mailchimp, or Klaviyo before deciding whether to download and process them.",
                },
                {
                  title: "Anyone receiving CSV attachments",
                  desc: "View the file contents instantly without cluttering your downloads folder. Verify the data, then decide whether to keep it.",
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
              Ready to view your CSV in the browser?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              No Excel. No upload. No confusion. Just instant, private CSV viewing.
            </p>
            <a href="#csv-browser-tool">
              <Button size="lg" data-testid="button-bottom-cta">
                Open CSV in Browser Now
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
                  desc: "Full spreadsheet editing in your browser — click any cell",
                },
                {
                  href: "/tools/csv-viewer/view-large-files",
                  title: "View Large CSV Files",
                  desc: "Open huge CSV files (100MB+) with virtual scrolling — zero lag",
                },
                {
                  href: "/tools/csv-viewer",
                  title: "CSV Viewer & Editor",
                  desc: "The full-featured main CSV tool with all options",
                },
                {
                  href: "/tools/csv-viewer/convert-and-edit",
                  title: "Convert & Edit CSV",
                  desc: "Convert your file format then edit it in one step",
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
