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
  MousePointerClick,
  Download,
  Upload,
  Pencil,
  LayoutGrid,
  RotateCcw,
  FileText,
  Code2,
  BarChart2,
  Megaphone,
  GraduationCap,
} from "lucide-react";
import CSVViewerCore from "@/components/tools/CSVViewerCore";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StructuredData } from "@/lib/seo";

const BREADCRUMB_ITEMS = [
  { name: "Home", url: "https://tools.pixocraft.in/" },
  { name: "Tools", url: "https://tools.pixocraft.in/tools" },
  { name: "Developer Tools", url: "https://tools.pixocraft.in/tools/developer" },
  { name: "CSV Viewer & Editor", url: "https://tools.pixocraft.in/tools/csv-viewer" },
  { name: "Edit CSV Without Excel" },
];

const FAQ_ITEMS = [
  {
    q: "Is my data safe when editing CSV files without Excel?",
    a: "Completely. This editor runs 100% in your browser. Your CSV file is never uploaded to any server. All processing happens locally on your device, so your data stays private and secure at all times.",
  },
  {
    q: "Can I edit large CSV files without Excel using this tool?",
    a: "Yes. The editor is optimized for large datasets with thousands of rows. Unlike Excel, which can slow down or crash with very large files, this online editor handles them smoothly using efficient browser-based rendering.",
  },
  {
    q: "Do I need to install anything to edit CSV files without Excel?",
    a: "No. Nothing to install, download, or configure. Just open this page in any modern browser and start editing your CSV file immediately. It works on Chrome, Firefox, Safari, and Edge.",
  },
  {
    q: "Can I use this CSV editor on mobile?",
    a: "Yes. The editor is fully responsive and works on smartphones and tablets. You can upload, view, edit, and download CSV files from your mobile device without needing a desktop computer.",
  },
  {
    q: "Will editing online mess up my CSV file format?",
    a: "No. The editor strictly preserves the CSV format. Commas, quotes, and line breaks are all handled correctly. When you download the updated file, it is a properly formatted CSV ready to use anywhere.",
  },
  {
    q: "Do I need to create an account or sign up?",
    a: "No account, no signup, no email required. Just open the tool and start editing. Everything is free and available instantly without any registration.",
  },
  {
    q: "Can I edit CSVs exported from Salesforce, HubSpot, or Google Sheets?",
    a: "Absolutely. Any CSV file from any software or platform works. The CSV format is universal, so exports from CRMs, databases, e-commerce tools, or analytics platforms all open and edit perfectly.",
  },
  {
    q: "What happens to my changes if I close the browser?",
    a: "Your original file is unchanged since editing happens in-browser. Always download your updated CSV before closing the tab. The tool shows a download button once you have made edits.",
  },
];

const HOW_TO_STEPS = [
  {
    name: "Upload your CSV file",
    text: "Click the upload area or drag and drop your CSV file into the editor. The file is loaded directly in your browser — nothing is sent to a server.",
  },
  {
    name: "Click any cell to start editing",
    text: "The spreadsheet view appears instantly. Click any cell to select it and type your changes. Use Tab to move right and Enter to move down.",
  },
  {
    name: "Modify rows, columns, and data",
    text: "Add or delete rows and columns using the toolbar. Rename headers by clicking on them. Use Ctrl+Z to undo any mistake.",
  },
  {
    name: "Download your updated CSV file",
    text: "When you are done, click the Download button to save the updated CSV file to your device. The file is properly formatted and ready to use.",
  },
];

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
  name: "How to Edit CSV Files Without Excel",
  description:
    "A step-by-step guide to editing CSV files online without Excel, using a free browser-based editor.",
  step: HOW_TO_STEPS.map((s) => ({
    "@type": "HowToStep",
    name: s.name,
    text: s.text,
  })),
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CSV Editor Without Excel",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description:
    "A free, browser-based CSV editor. Edit CSV files without Excel — no install, no upload, no signup.",
  url: "https://tools.pixocraft.in/tools/csv-viewer/edit-without-excel",
};

export default function CSVEditWithoutExcel() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Edit CSV Files Without Excel — Fast, Free & Online | Pixocraft</title>
        <meta
          name="description"
          content="Edit CSV files without Excel — free, instant, 100% private. Click any cell, add rows, rename headers, and download. No install, no signup, no data upload."
        />
        <meta property="og:title" content="Edit CSV Files Without Excel — Fast, Free & Online" />
        <meta
          property="og:description"
          content="Modify CSV files directly in your browser. No Excel, no upload, no signup. Full control over rows, columns, and data."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://tools.pixocraft.in/tools/csv-viewer/edit-without-excel"
        />
        <meta property="og:site_name" content="Pixocraft Tools" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Edit CSV Files Without Excel — Fast, Free & Online" />
        <meta
          name="twitter:description"
          content="Free browser-based CSV editor. No Excel needed, no install, no signup."
        />
        <link
          rel="canonical"
          href="https://tools.pixocraft.in/tools/csv-viewer/edit-without-excel"
        />
      </Helmet>

      <StructuredData data={faqSchema} />
      <StructuredData data={howToSchema} />
      <StructuredData data={softwareSchema} />

      <main className="max-w-5xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb items={BREADCRUMB_ITEMS} />

        <div className="space-y-14">

          {/* ── HERO ── */}
          <div className="space-y-5 text-center max-w-3xl mx-auto">
            <Badge variant="secondary" className="text-xs">
              Free Online CSV Editor
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
              Edit CSV Files Without Excel —{" "}
              <span className="text-primary">Fast, Free &amp; Online</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Modify CSV files directly in your browser. No Excel, no upload, no signup. Full
              control over rows, columns, and data.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 pt-1">
              {[
                { icon: Shield, label: "No Excel Required" },
                { icon: Zap, label: "100% Private (Client-side)" },
                { icon: Monitor, label: "Works on any device" },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {label}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a href="#csv-editor-tool">
                <Button size="lg" data-testid="button-hero-cta">
                  Edit Your CSV Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* ── BENEFIT HIGHLIGHT BOX ── */}
          <div className="rounded-md border bg-muted/40 px-6 py-5 flex flex-wrap items-center justify-center gap-6 text-center">
            {[
              { icon: FileText, text: "No Excel." },
              { icon: Upload, text: "No Upload." },
              { icon: Shield, text: "No Data Risk." },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1.5">
                <Icon className="h-6 w-6 text-primary" />
                <span className="font-semibold text-foreground">{text}</span>
              </div>
            ))}
          </div>

          {/* ── TOOL SECTION ── */}
          <div id="csv-editor-tool" className="space-y-3 scroll-mt-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                <MousePointerClick className="h-4 w-4 shrink-0" />
                Click any cell to start editing
              </p>
            </div>
            <CSVViewerCore />
          </div>

          {/* ── SEO CONTENT ── */}

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              What Does It Mean to Edit a CSV File Without Excel?
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                A CSV (Comma-Separated Values) file is one of the simplest and most universal data
                formats in existence. At its core, it is a plain text file where each line
                represents a row of data and each value within that row is separated by a comma.
                Open any CSV in a plain text editor and you will see exactly what is inside — raw
                data, no formulas, no macros, no proprietary encoding.
              </p>
              <p>
                Despite this simplicity, most people turn to Excel when they need to view or edit a
                CSV file. Excel does the job: it opens the file, displays data in a grid, and lets
                you make changes. But Excel comes with significant drawbacks. It is expensive
                software tied to a Microsoft subscription or a large one-time purchase. It is heavy
                — launching Excel takes time, especially on older computers. And perhaps most
                frustratingly, Excel regularly corrupts CSV data by auto-converting certain values,
                especially dates and long numeric strings like ZIP codes or product IDs.
              </p>
              <p>
                Editing a CSV file without Excel means using a lightweight, purpose-built tool that
                opens your file, gives you a clean spreadsheet view, lets you click any cell to
                edit it, and exports the result as a correctly formatted CSV. No extra software. No
                installation. No subscription. And most importantly, no data corruption.
              </p>
            </div>
          </section>

          {/* Section 2 — HowTo */}
          <section className="space-y-5">
            <h2 className="text-2xl font-bold text-foreground">
              How to Edit CSV Files Online Without Excel
            </h2>
            <p className="text-muted-foreground">
              The process takes under a minute. Here is exactly how it works:
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
              That is the entire workflow. No complex menus, no format confusion, no saving files in
              the wrong location. If you need to{" "}
              <Link
                href="/tools/csv-viewer/view-in-browser"
                className="text-primary underline underline-offset-2 hover:no-underline"
                data-testid="link-view-in-browser"
              >
                view a CSV file in your browser
              </Link>{" "}
              without editing it first, that option is also available.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Why Not Use Excel for CSV Editing?
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                Excel is a powerful tool for spreadsheet analysis, but it was not designed for
                clean CSV editing. When you open a CSV in Excel, several things can go wrong before
                you even make a single change.
              </p>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold text-foreground">Auto date conversion</p>
                  <p>
                    Excel aggressively converts values that look like dates. A product code like
                    "3-14" becomes "14-Mar". A value like "01/02/03" might become a date from 2003.
                    Once Excel converts these values, reverting them to their original form is
                    extremely difficult.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Numeric precision loss</p>
                  <p>
                    Long numeric strings — phone numbers, barcode IDs, postal codes starting with
                    zero — are often converted to scientific notation or stripped of leading zeros.
                    A ZIP code of "07030" silently becomes "7030".
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Format lock-in</p>
                  <p>
                    Excel wants to save files in .xlsx format. When you save a CSV, it warns you
                    about compatibility. If you accidentally click the wrong button, your CSV
                    becomes an Excel workbook — a completely different format that other tools may
                    not be able to open.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Requires installation</p>
                  <p>
                    Excel is not available on all devices. It is not installed by default on Linux,
                    and on Mac and Windows, a Microsoft 365 subscription is needed for the latest
                    version. A free online CSV editor needs only a web browser.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Slow startup and heavy resource usage</p>
                  <p>
                    Excel takes time to launch and consumes significant memory and CPU even for
                    simple CSV editing tasks. An online editor opens instantly and uses minimal
                    system resources.
                  </p>
                </div>
              </div>
              <p>
                If you regularly work with large datasets, you may also want to{" "}
                <Link
                  href="/tools/csv-viewer/view-large-files"
                  className="text-primary underline underline-offset-2 hover:no-underline"
                  data-testid="link-view-large-files"
                >
                  view large CSV files
                </Link>{" "}
                with a tool built to handle them — without the slowdowns that come with Excel.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Benefits of Using an Online CSV Editor
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Zap,
                  title: "No installation",
                  desc: "Open your browser and start editing immediately. No downloads, no setup, no system requirements beyond a modern browser.",
                },
                {
                  icon: Monitor,
                  title: "Works on any device",
                  desc: "Edit CSV files on Windows, Mac, Linux, iOS, or Android. The tool adapts to your screen size so you can work wherever you are.",
                },
                {
                  icon: Shield,
                  title: "100% private",
                  desc: "Your file never leaves your device. All processing is done in the browser, which means your data is never sent to any server.",
                },
                {
                  icon: LayoutGrid,
                  title: "Real-time editing",
                  desc: "Changes appear instantly as you type. The spreadsheet updates live, so you always see the current state of your data.",
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
            <p className="text-muted-foreground">
              Because the entire tool runs in your browser, there is also no concern about
              compatibility issues between operating systems. A CSV you edit on a Mac looks
              identical when opened on a Windows machine or a Linux server. The CSV format is
              universal and this editor keeps it that way.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Features of This CSV Editor
            </h2>
            <p className="text-muted-foreground">
              Every feature is designed around one goal: editing CSV files without friction.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Pencil, title: "Edit cells instantly", desc: "Click any cell and start typing. No double-click required." },
                { icon: ArrowRight, title: "Add or delete rows", desc: "Insert rows above or below, or remove rows you no longer need." },
                { icon: LayoutGrid, title: "Add or delete columns", desc: "Expand your dataset with new columns or remove irrelevant ones." },
                { icon: FileText, title: "Rename headers", desc: "Click on any column header to rename it directly in the grid." },
                { icon: RotateCcw, title: "Undo / Redo support", desc: "Made a mistake? Ctrl+Z undoes it. Ctrl+Y brings it back." },
                { icon: Download, title: "Export updated CSV", desc: "Download your edited file as a clean, properly formatted CSV." },
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

          {/* Section 6 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Who Should Use This Tool?
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  icon: Code2,
                  title: "Developers",
                  desc: "Quickly inspect and fix data files — seed data, test fixtures, API exports — without leaving the browser or touching the command line.",
                },
                {
                  icon: BarChart2,
                  title: "Data analysts",
                  desc: "Clean and correct datasets before importing them into databases, dashboards, or analysis tools. Fix column names, remove blank rows, and update values instantly.",
                },
                {
                  icon: Megaphone,
                  title: "Marketers",
                  desc: "Edit contact lists, campaign exports from HubSpot or Mailchimp, and e-commerce product feeds without needing a dedicated data tool.",
                },
                {
                  icon: GraduationCap,
                  title: "Students",
                  desc: "Work with CSV data for assignments, research projects, and data science coursework — no Excel licence required.",
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

          {/* ── FAQ ── */}
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

          {/* ── BOTTOM CTA ── */}
          <div className="rounded-md border bg-muted/30 px-6 py-8 text-center space-y-4">
            <h2 className="text-xl font-bold text-foreground">
              Ready to edit your CSV without Excel?
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Free. Private. Instant. No Excel, no upload, no data risk.
            </p>
            <a href="#csv-editor-tool">
              <Button size="lg" data-testid="button-bottom-cta">
                Edit CSV Without Excel Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          </div>

          {/* ── RELATED TOOLS ── */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Related CSV Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  href: "/tools/csv-viewer",
                  title: "CSV Viewer & Editor",
                  desc: "The full-featured main CSV tool",
                },
                {
                  href: "/tools/csv-viewer/view-in-browser",
                  title: "View CSV in Browser",
                  desc: "Preview CSV files without downloading or installing anything",
                },
                {
                  href: "/tools/csv-viewer/view-large-files",
                  title: "View Large CSV Files",
                  desc: "Open and explore CSV files with millions of rows",
                },
                {
                  href: "/tools/csv-viewer/convert-and-edit",
                  title: "Convert & Edit CSV",
                  desc: "Convert your file then edit it in one step",
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
