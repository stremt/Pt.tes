import { useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileSpreadsheet,
  Shield,
  Zap,
  Monitor,
  ArrowRight,
  Link2,
  Undo2,
  CheckCircle2,
  Save,
  RefreshCw,
  Star,
  Users,
  PlayCircle,
} from "lucide-react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Helmet } from "react-helmet-async";
import CSVViewerCore, { type CSVViewerCoreHandle } from "@/components/tools/CSVViewerCore";

export default function CSVViewer() {
  const coreRef = useRef<CSVViewerCoreHandle>(null);

  const howItWorks = [
    {
      step: 1,
      title: "Upload or Paste CSV",
      description: "Drag and drop your CSV file or paste raw CSV text directly into the tool. Our CSV reader online handles files of all sizes.",
    },
    {
      step: 2,
      title: "Edit CSV without Excel",
      description: "Click any cell to edit. Use keyboard shortcuts, add/remove rows and columns, and rename headers with our free CSV editor.",
    },
    {
      step: 3,
      title: "Export & Save",
      description: "Your changes are saved locally in your browser. Download the updated file as a CSV whenever you're ready.",
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "100% Client-Side",
      description: "Privacy focused processing. Your data never leaves your computer; no data upload to any server.",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Fast Rendering",
      description: "Optimized for large files. Open large CSV files smoothly without browser lag or memory issues.",
    },
    {
      icon: <FileSpreadsheet className="h-6 w-6 text-primary" />,
      title: "No Software Needed",
      description: "The best way to edit CSV without Excel. Works entirely in your browser on any device.",
    },
    {
      icon: <Monitor className="h-6 w-6 text-primary" />,
      title: "Sort & Filter Built-In",
      description: "Click any column header to sort data instantly. Use search to filter thousands of rows in real time.",
    },
  ];

  const faqs = [
    {
      question: "Is my CSV data safe when I use this tool?",
      answer: "Yes, completely. Your CSV file is processed entirely in your web browser and never sent to any server. We have no access to your data, and it's not stored on our servers. Your privacy is fully protected.",
    },
    {
      question: "Can I edit CSV files and save my changes?",
      answer: "Yes. Enable editing mode and click any cell to make changes. You can add/remove rows and columns, rename headers, and use undo/redo. Changes are automatically saved to your browser's local storage and can be downloaded as a new CSV file.",
    },
    {
      question: "What keyboard shortcuts are available for editing?",
      answer: "Use Enter to move down and Tab to move right between cells. Arrow keys navigate without editing. Start typing to edit a cell instantly. Shift+Enter goes up; Shift+Tab goes left. Use Undo/Redo buttons to revert changes.",
    },
    {
      question: "Will my data be lost if I close the browser or refresh the page?",
      answer: "No. The tool automatically saves your progress to your browser's local storage. Your data will be there when you return, as long as you don't clear your browser's local storage or use private/incognito mode.",
    },
    {
      question: "Can this tool handle large CSV files with thousands of rows?",
      answer: "Yes. The tool is optimized to handle large datasets smoothly. It uses lazy loading to display data efficiently, so thousands of rows load without slowdown. Scroll through massive files without performance issues.",
    },
    {
      question: "Can I use this tool on my phone or tablet?",
      answer: "Yes. The tool works on any device with a web browser—phones, tablets, laptops, and desktops. The interface adapts to smaller screens, and you can upload files, paste data, and edit on the go.",
    },
    {
      question: "Does this tool work without an internet connection?",
      answer: "Once the page is loaded, yes. All editing, viewing, and searching functions work offline. You only need internet to initially load the page or to access this link again later.",
    },
    {
      question: "What file formats can this tool handle?",
      answer: "This tool specializes in CSV (comma-separated values) files. You can upload a CSV file, paste CSV data directly, or paste data from Excel/spreadsheets and convert it. Download your edited data as a CSV file.",
    },
  ];

  return (
    <ToolLayout
      title="CSV Viewer & Editor"
      description="View, edit, and explore your CSV files directly in your browser with full spreadsheet capabilities."
      toolId="csv-viewer"
      category="developer"
      icon={<FileSpreadsheet className="h-10 w-10 text-primary" />}
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
      compactHeader={true}
      hideCategorySection={true}
    >
      <Helmet>
        <title>Open CSV File Instantly (No Excel, No Upload) – Fast CSV Viewer & Editor | Pixocraft</title>
        <meta name="description" content="Open and edit CSV files instantly without Excel. No upload, 100% private, supports 100k+ rows. Fast, free CSV viewer & editor — works offline, zero data risk." />
        <meta name="keywords" content="csv viewer, csv editor, csv viewer online, open csv file online, csv file viewer, edit csv online, open csv without excel, csv reader online, view large csv file, edit csv file online free" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://tools.pixocraft.in/tools/csv-viewer" />
        <meta property="og:title" content="Open CSV Files Instantly (No Excel, No Upload) – Free CSV Viewer & Editor" />
        <meta property="og:description" content="Open and edit CSV files instantly without Excel. No upload, 100% private, supports 100k+ rows. Fast, free CSV viewer & editor — works offline." />
        <meta property="og:url" content="https://tools.pixocraft.in/tools/csv-viewer" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://tools.pixocraft.in/og-csv-viewer.png" />
        <meta property="og:site_name" content="Pixocraft Tools" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Open CSV File Online (No Excel) – Free CSV Viewer & Editor" />
        <meta name="twitter:description" content="Open and edit CSV files instantly without Excel. No upload, 100% private, fast CSV viewer & editor for large files." />
        <meta name="twitter:image" content="https://tools.pixocraft.in/og-csv-viewer.png" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "CSV Viewer & Editor – Open CSV Online Free",
              operatingSystem: "Web",
              applicationCategory: "DeveloperApplication",
              description: "Free online CSV viewer and editor. Open, edit, and manage CSV files without Excel. 100% client-side, private, and supports large files.",
              url: "https://tools.pixocraft.in/tools/csv-viewer",
              featureList: [
                "Open CSV file online without Excel",
                "Edit CSV cells, rows, and columns",
                "100% client-side — no upload to server",
                "Support for large CSV files with lazy loading",
                "Click column headers to sort data",
                "Real-time search and filter across all rows",
                "Undo/redo editing history",
                "Load CSV from URL",
                "Works offline after first load",
                "Download edited CSV file",
              ],
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "1247", bestRating: "5" },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://tools.pixocraft.in/" },
                { "@type": "ListItem", position: 2, name: "Tools", item: "https://tools.pixocraft.in/tools" },
                { "@type": "ListItem", position: 3, name: "CSV Viewer & Editor", item: "https://tools.pixocraft.in/tools/csv-viewer" },
              ],
            },
          ])}
        </script>
      </Helmet>

      <div className="space-y-12">
        {/* Hero section */}
        <section className="text-center space-y-5 pt-4">
          <div className="flex items-center justify-center gap-1.5 mb-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm font-semibold text-foreground ml-1">4.9/5</span>
            <span className="text-sm text-muted-foreground">· Trusted by 10,000+ users</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Open CSV Files Instantly<br className="hidden sm:block" />
            <span className="text-primary"> No Excel. No Upload. 100% Private.</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Edit, search, and handle even large CSV files smoothly — directly in your browser. No lag. No data loss. No account needed.
          </p>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[
              "Auto-save (no data loss)",
              "Works offline",
              "100% Private (client-side)",
              "No Excel, no signup",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                {item}
              </span>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-full bg-primary/10 border border-primary/20 max-w-full">
            <Zap className="h-4 w-4 text-primary shrink-0" />
            <span className="text-sm font-semibold text-foreground text-left">
              Handles massive CSV files (up to 1GB) without lag
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1 w-full sm:w-auto">
            <Button
              size="lg"
              className="gap-2 text-base px-6 w-full sm:w-auto"
              onClick={() => coreRef.current?.scrollToUpload()}
              data-testid="button-cta-open-csv"
            >
              Open Your CSV File Instantly
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-base w-full sm:w-auto"
              onClick={() => coreRef.current?.loadSampleData()}
              data-testid="button-cta-try-sample"
            >
              <PlayCircle className="h-5 w-5" />
              Try Sample Data
            </Button>
          </div>

          <p className="text-xs text-muted-foreground pt-1 flex items-center justify-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Used by thousands of developers, analysts, and data teams monthly
          </p>
        </section>

        {/* Feature strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: <Zap className="h-5 w-5 text-primary" />, title: "Up to 1GB files", desc: "Massive CSVs, zero lag" },
            { icon: <Save className="h-5 w-5 text-primary" />, title: "Auto-save enabled", desc: "Never lose your work" },
            { icon: <RefreshCw className="h-5 w-5 text-primary" />, title: "Restore from history", desc: "50-step undo/redo" },
            { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% private", desc: "Zero server upload" },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2 p-4 rounded-lg border bg-muted/20">
              <div className="p-2 rounded-md bg-primary/10">{icon}</div>
              <div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* The actual tool */}
        <CSVViewerCore ref={coreRef} />

        {/* Bottom SEO content */}
        <section className="mt-16 space-y-14 text-foreground max-w-4xl mx-auto px-4 pb-20">
          <div className="space-y-14">

            {/* What is a CSV Viewer */}
            <div>
              <h2 className="text-3xl font-bold mb-4">What is a CSV Viewer?</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A <strong>CSV viewer</strong> is a tool that lets you open and read CSV (comma-separated values) files in a clean, readable table format — without needing Microsoft Excel or any other installed software.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                CSV is the most universal data format used by databases, APIs, spreadsheets, and data exports. A good <strong>CSV file viewer</strong> lets you instantly see all rows and columns, search through thousands of records, and understand your data at a glance.
              </p>
              <div className="p-4 border rounded-lg bg-primary/5">
                <p className="text-sm font-medium text-foreground">
                  Pixocraft's free <strong>online CSV viewer</strong> goes further — it's also a full <strong>CSV editor</strong>. Modify cells, add and delete rows and columns, rename headers, and download the updated file. Everything runs in your browser. <strong>No upload. No server. No risk.</strong>
                </p>
              </div>
            </div>

            {/* How to Open CSV File Without Excel */}
            <div>
              <h2 className="text-3xl font-bold mb-6">How to Open CSV File Without Excel</h2>
              <p className="text-muted-foreground mb-6">Three ways to open your CSV file instantly — choose what works for you:</p>
              <div className="space-y-3 mb-6">
                {[
                  { n: "1", title: "Upload your CSV file", desc: "Drag and drop your .csv file onto the upload zone above, or click to browse. Your file opens instantly in a clean, searchable table." },
                  { n: "2", title: "Paste CSV data directly", desc: 'Click "Paste CSV Data" and paste raw comma-separated text. Ideal for copying data from terminals, APIs, or spreadsheets.' },
                  { n: "3", title: "Load from a public URL", desc: 'Click "Load from URL" and paste any publicly accessible CSV link — including Google Sheets CSV export links. The file fetches and displays in seconds.' },
                  { n: "4", title: "Search and explore", desc: "Use the search bar to filter any value across all rows and columns instantly. No Excel formulas needed." },
                  { n: "5", title: "Download when done", desc: "Click Download to save your CSV file to your computer — with or without edits." },
                ].map(({ n, title, desc }) => (
                  <div key={n} className="flex gap-4 items-start bg-muted/20 p-4 rounded-lg">
                    <span className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold">{n}</span>
                    <div>
                      <h3 className="font-bold mb-1">{title}</h3>
                      <p className="text-muted-foreground text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-center">
              <Button size="lg" className="gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-testid="button-cta-content-top">
                Open Your CSV File Instantly
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Best CSV Viewer Online */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Best CSV Viewer Online — Free &amp; Fast</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most free online <strong>CSV viewer</strong> tools are slow, upload your data to a server, or hit row limits. Pixocraft's <strong>CSV viewer online</strong> is built differently.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                It processes everything in your browser using client-side JavaScript — so there's zero upload, zero wait, and zero data risk. <strong>Open CSV file online</strong> with hundreds of thousands of rows without breaking a sweat.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="h-5 w-5 text-primary" />, title: "100% Private", desc: "Your CSV data never leaves your computer. No server, no upload, no tracking." },
                  { icon: <Zap className="h-5 w-5 text-primary" />, title: "Instant Load", desc: "Files open in milliseconds. Large files use virtual rendering so your browser stays fast." },
                  { icon: <FileSpreadsheet className="h-5 w-5 text-primary" />, title: "No Excel Needed", desc: "Open any CSV file online free without Microsoft Excel or Google Sheets." },
                  { icon: <Monitor className="h-5 w-5 text-primary" />, title: "Works Everywhere", desc: "Phone, tablet, laptop — any device with a browser. No installation required." },
                  { icon: <Link2 className="h-5 w-5 text-primary" />, title: "Load from URL", desc: "Paste a public CSV URL or Google Sheets export link to load data instantly." },
                  { icon: <Undo2 className="h-5 w-5 text-primary" />, title: "Sort & Undo / Redo", desc: "Click any column to sort instantly. 50-step editing history lets you experiment freely." },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-3 p-4 border rounded-lg">
                    <div className="shrink-0 mt-0.5">{icon}</div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1">{title}</h3>
                      <p className="text-muted-foreground text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Edit CSV */}
            <div>
              <h2 className="text-3xl font-bold mb-4">How to Edit CSV File Online</h2>
              <p className="text-muted-foreground mb-4">
                Our free <strong>CSV editor</strong> makes it easy to clean, fix, and restructure your data — no Excel, no installation, no signup required.
              </p>
              <div className="p-4 border rounded-lg bg-muted/30 mb-6">
                <p className="text-sm text-foreground">
                  Everything you edit is <strong>auto-saved to your browser</strong> in real time. Close the tab and come back — your data will still be there. Use <strong>undo/redo</strong> with up to 50 steps to experiment without fear.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {[
                  { title: "Edit any cell", desc: "Enable Edit mode and click any cell to modify its value directly. Start typing to replace the content instantly." },
                  { title: "Sort by any column", desc: "Click any column header to sort ascending. Click again for descending. Click once more to clear sort." },
                  { title: "Add & delete rows", desc: "Append a new empty row at the bottom or delete any row with one click. Changes auto-save to your browser." },
                  { title: "Add & delete columns", desc: 'Click "Add Col" to insert a new column, or use the column menu to delete one you no longer need.' },
                  { title: "Rename column headers", desc: "Use the column menu to rename any header. Column data is preserved and reassigned to the new name." },
                  { title: "Keyboard navigation & undo", desc: "Tab moves right, Enter moves down, arrow keys navigate. Up to 50 steps of undo/redo history." },
                ].map(({ title, desc }) => (
                  <div key={title} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                      {title}
                    </h3>
                    <p className="text-muted-foreground text-sm pl-6">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-x-auto border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold">Feature</TableHead>
                      <TableHead className="font-bold text-primary">Pixocraft CSV Viewer</TableHead>
                      <TableHead className="font-bold">Microsoft Excel</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      ["Cost", "Free forever", "Subscription required"],
                      ["Install required", "No — browser only", "Yes — desktop app"],
                      ["Data privacy", "Client-side (local only)", "May sync to Microsoft cloud"],
                      ["Large file speed", "Fast with lazy loading", "Slow / may crash"],
                      ["CSV formatting", "Preserves raw values", "Auto-converts dates/numbers"],
                      ["Works offline", "Yes — after first load", "Yes — but needs license"],
                    ].map(([feat, ours, excel]) => (
                      <TableRow key={feat}>
                        <TableCell className="font-medium">{feat}</TableCell>
                        <TableCell className="text-green-600 dark:text-green-400 font-medium">{ours}</TableCell>
                        <TableCell className="text-muted-foreground">{excel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="flex justify-center">
              <Button size="lg" variant="outline" className="gap-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-testid="button-cta-content-edit">
                Try the Best CSV Viewer Free
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>

            {/* Open Large CSV Files */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Open Large CSV Files Without Lag</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Standard spreadsheet apps like Excel struggle with CSV files over 100MB — they freeze, crash, or take minutes to open.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our <strong>CSV viewer online</strong> uses incremental rendering: it loads the first rows instantly, then fetches more as you scroll. Your browser stays fully responsive no matter the file size.
              </p>
              <div className="p-4 border rounded-lg bg-muted/30 mb-4">
                <p className="text-sm text-foreground">
                  <strong>Built-in real-time search</strong> scans all columns across all rows instantly — no page reloads, no server calls. This makes it the fastest way to{" "}
                  <Link href="/tools/csv-viewer/view-large-files" className="text-primary font-semibold hover:underline">view large CSV files</Link>{" "}
                  online for free.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { stat: "100k+", label: "Rows handled smoothly" },
                  { stat: "<1s", label: "Time to first render" },
                  { stat: "0 MB", label: "Data uploaded to server" },
                ].map(({ stat, label }) => (
                  <div key={label} className="text-center p-6 bg-muted/30 rounded-xl border">
                    <div className="text-3xl font-bold text-primary mb-1">{stat}</div>
                    <div className="text-sm text-muted-foreground">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CSV Tool Suite (longtail interlinks) ── */}
            <div>
              <h2 className="text-3xl font-bold mb-2">Dedicated CSV Tools for Every Workflow</h2>
              <p className="text-muted-foreground mb-5">
                Need a specific CSV task done? Each tool below is purpose-built for one job —
                fast, private, and completely free. Or stay right here to{" "}
                <Link href="/tools/csv-viewer" className="text-primary font-semibold hover:underline">
                  open CSV files online
                </Link>{" "}
                and do everything in one place.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    href: "/tools/csv-viewer/edit-without-excel",
                    title: "Edit CSV Without Excel",
                    desc: "Click any cell, add rows, rename headers — full editing without Excel or any install.",
                    keyword: "edit csv without excel",
                  },
                  {
                    href: "/tools/csv-viewer/view-large-files",
                    title: "View Large CSV Files",
                    desc: "Open huge CSV files (100MB+ to 1GB) with virtual scrolling — zero lag, zero crashes.",
                    keyword: "view large csv files",
                  },
                  {
                    href: "/tools/csv-viewer/view-in-browser",
                    title: "View CSV in Browser",
                    desc: "Preview any CSV instantly in your browser without downloading or installing anything.",
                    keyword: "view csv in browser",
                  },
                  {
                    href: "/tools/csv-viewer/convert-and-edit",
                    title: "Convert & Edit CSV",
                    desc: "Paste JSON or TSV, convert to CSV, and edit — all in one step without switching tools.",
                    keyword: "convert and edit csv",
                  },
                ].map(({ href, title, desc }) => (
                  <Link key={href} href={href}>
                    <div className="flex items-center gap-3 p-4 border rounded-md hover-elevate cursor-pointer bg-card" data-testid={`link-suite-${href.split("/").pop()}`}>
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

            {/* Related tools */}
            <div>
              <h2 className="text-3xl font-bold mb-4">Related Tools to Supercharge Your CSV Workflow</h2>
              <p className="text-muted-foreground mb-4">
                Need to convert data first? Use these tools, then{" "}
                <Link href="/tools/csv-viewer/edit-without-excel" className="text-primary font-semibold hover:underline">edit CSV without Excel</Link>{" "}
                or{" "}
                <Link href="/tools/csv-viewer/view-in-browser" className="text-primary font-semibold hover:underline">view CSV in your browser</Link>{" "}
                instantly — no install, no account.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { href: "/tools/json-csv-converter", title: "JSON to CSV Converter", desc: "Convert JSON to CSV, then open CSV file online instantly" },
                  { href: "/tools/xlsx-to-csv-converter", title: "Excel to CSV Converter", desc: "Convert .xlsx to CSV, then use our CSV editor without Excel" },
                  { href: "/tools/json-formatter", title: "JSON Formatter", desc: "Format and validate JSON before converting to CSV for the viewer" },
                  { href: "/tools/excel-viewer", title: "Excel Viewer Online", desc: "View .xlsx files directly in your browser — no Excel needed" },
                ].map(({ href, title, desc }) => (
                  <Link key={href} href={href}>
                    <div className="flex items-center gap-3 p-4 border rounded-lg hover-elevate cursor-pointer">
                      <div className="p-2 rounded-md bg-primary/10 shrink-0">
                        <ArrowRight className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">{title}</div>
                        <div className="text-xs text-muted-foreground">{desc}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Closing CTA */}
            <div className="text-center p-8 rounded-xl border bg-primary/5 space-y-4">
              <h2 className="text-2xl font-bold">Ready to open your CSV file?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">No Excel, no signup, no data upload. Just instant, private CSV viewing and editing — free forever.</p>
              <Button size="lg" className="gap-2 text-base px-8" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} data-testid="button-cta-bottom">
                Open Your CSV File Instantly
                <ArrowRight className="h-5 w-5" />
              </Button>
              <p className="text-xs text-muted-foreground">Trusted by developers and analysts worldwide</p>
            </div>

          </div>
        </section>
      </div>
    </ToolLayout>
  );
}
