import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CSVViewerCore from "@/components/tools/CSVViewerCore";

export default function CSVConvertAndEdit() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Convert and Edit CSV Data Online — No Software Needed | Pixocraft</title>
        <meta name="description" content="Convert and edit CSV data online in one tool. Paste JSON, Excel, or raw data — edit cells, headers, rows — then export as CSV. Free, private, instant." />
        <meta property="og:title" content="Convert and Edit CSV Data Online - Easy Data Management Tool" />
        <meta property="og:description" content="Convert and edit CSV data online without switching tools. Simple, fast, and secure." />
        <link rel="canonical" href="https://tools.pixocraft.in/tools/csv-viewer/convert-and-edit" />
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">

          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground">Convert and Edit CSV Data Online Without Software Installation</h1>
            <p className="text-lg text-muted-foreground">
              Paste data, convert it to CSV, edit any cell, add or delete rows and columns, then export — all in one place. No installs, no cost.
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
              {["Paste any data format", "Edit inline", "Export as CSV", "100% private"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Embedded tool */}
          <CSVViewerCore />

          {/* The problem with multiple tools */}
          <Card>
            <CardHeader>
              <CardTitle>The Problem With Multiple Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Many professionals and businesses struggle with CSV data management. You might receive data in one format and need to convert it to CSV for importing into a database. Or you have CSV files that need cleaning before they can be used. You might need to merge data from multiple sources, add or remove columns, rename headers to match your requirements, or fix formatting issues. Each of these tasks traditionally required different software, switching between applications, and learning multiple interfaces.
              </p>
              <p>
                Why do people search for "best way to convert and edit CSV data online"? Because they're drowning in file format problems and manual data work. Someone exports data from their CRM, but it's not in the right format for their accounting software. They receive a CSV with column headers that don't match their database schema. Instead of using five different tools, they want one solution that handles conversion and editing together.
              </p>
            </CardContent>
          </Card>

          {/* All-in-one solution */}
          <Card>
            <CardHeader>
              <CardTitle>All-in-One Conversion and Editing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                An integrated online tool for CSV conversion and editing eliminates the hassle of juggling multiple applications. You can paste data in various formats — CSV, JSON, or plain text. The tool parses it to CSV format instantly. From there, you have a full spreadsheet editor where you can adjust data, rename columns, add or remove rows, fix formatting, and prepare your data exactly as needed. Everything happens online, in your browser, without installing anything.
              </p>
              <p>
                The efficiency gains are significant. Instead of converting in one tool and editing in another, losing time switching between applications, you do everything in one place. This reduces errors that come from re-uploading files to different tools. It saves time by eliminating repetitive manual work. It gives you a clear view of your data before final export.
              </p>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Security When Converting & Editing Sensitive Data</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                The trustworthiness of an online conversion and editing tool depends on how it handles your data. This tool processes everything in your browser, never uploading your data to external servers. This is crucial when working with business or personal information. Your data stays private, secure, and under your control. There's no risk of information being intercepted, stored, or misused.
              </p>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { q: "What file formats can be converted to CSV online?", a: "You can paste JSON, TSV (tab-separated values), and plain comma-separated data directly into the paste field. The tool parses it to CSV format instantly, making it easy to consolidate different data sources." },
                { q: "Can I convert large CSV files and then edit them, or will that be too slow?", a: "Yes, this tool is optimized for this. You can convert large files and edit them smoothly without performance issues, thanks to virtual scrolling that handles 100k+ rows." },
                { q: "Does the conversion process change or corrupt my data?", a: "No. A proper conversion tool maintains data integrity throughout the process. Headers are preserved, values are protected, and special characters are handled correctly." },
                { q: "After converting and editing CSV data, what format can I export in?", a: "You can download the final result as a properly formatted CSV file, compatible with any spreadsheet software, database, or business application." },
                { q: "Is there a limit to how much data I can convert and edit online?", a: "This tool handles files up to 1GB with virtual rendering. Very large datasets might exceed browser memory limits but are uncommon for typical business use." },
                { q: "Can I undo changes while editing converted CSV data?", a: "Yes. The tool supports up to 50 steps of undo/redo history so you can experiment freely and revert any mistake." },
              ].map(({ q, a }) => (
                <div key={q} className="space-y-2">
                  <h3 className="font-semibold text-foreground">{q}</h3>
                  <p className="text-muted-foreground">{a}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Related tools */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Related CSV Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { href: "/tools/csv-viewer", title: "CSV Viewer & Editor", desc: "The full-featured main CSV tool" },
                { href: "/tools/json-csv-converter", title: "JSON to CSV Converter", desc: "Convert JSON data into CSV format" },
                { href: "/tools/xlsx-to-csv-converter", title: "Excel to CSV Converter", desc: "Convert .xlsx files to CSV instantly" },
                { href: "/tools/csv-viewer/edit-without-excel", title: "Edit CSV Without Excel", desc: "Full spreadsheet editing, no Excel needed" },
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

        </div>
      </main>
    </div>
  );
}
