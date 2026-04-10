import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import CSVViewerCore from "@/components/tools/CSVViewerCore";

export default function CSVEditWithoutExcel() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Edit CSV Files Without Excel - Free Online Editor | Pixocraft</title>
        <meta name="description" content="Edit CSV files online without Excel — free, instant, 100% private. Click any cell, add rows, rename headers. No install, no signup, no data upload." />
        <meta property="og:title" content="Edit CSV Files Without Excel - Free Online Editor" />
        <meta property="og:description" content="Edit CSV files online without expensive Excel. Free spreadsheet editor works in your browser. No installation, no subscriptions." />
        <link rel="canonical" href="https://tools.pixocraft.in/tools/csv-viewer/edit-without-excel" />
      </Helmet>

      <main className="max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">

          {/* Header */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-foreground">Edit CSV Files Online Without Excel or Paid Software</h1>
            <p className="text-lg text-muted-foreground">
              Click any cell, add rows, rename headers, and export — all free, all private, entirely in your browser. No Excel needed.
            </p>
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5">
              {["No install required", "100% private", "Auto-saves your work", "Free forever"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-sm text-foreground font-medium">
                  <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Embedded tool */}
          <CSVViewerCore />

          {/* Why edit without Excel */}
          <Card>
            <CardHeader>
              <CardTitle>Why Edit CSV Files Without Excel?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Many people assume they need Excel or specialized software to work with CSV files. The truth is, you don't. CSV files are plain-text files with comma-separated values, and you can edit them using basic tools. The challenge is that text editors don't give you a proper spreadsheet view, making it hard to see and edit data in columns and rows. That's where a dedicated online CSV editor makes all the difference.
              </p>
              <p>
                Why do people search for "how to edit CSV file without Excel"? The reasons are clear. Excel costs money — either through a one-time purchase or a monthly subscription to Microsoft 365. Not everyone has or needs Excel. Students working on assignments might not have access to it. Freelancers and small business owners want to avoid subscription costs. And sometimes, you just need to quickly edit a CSV file without launching heavy software that takes time to load.
              </p>
            </CardContent>
          </Card>

          {/* How a free CSV editor solves this */}
          <Card>
            <CardHeader>
              <CardTitle>How a Free Online CSV Editor Solves This</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                A free online CSV editor solves this problem entirely. You don't install anything. You don't pay subscription fees. Just upload your CSV file and immediately see your data in a proper spreadsheet format with rows and columns. Click any cell to edit it, add new rows, remove columns, and rename headers. The editor shows your data clearly and lets you navigate using keyboard shortcuts or your mouse.
              </p>
              <p>
                One major advantage is that your file stays on your computer. The editor processes your CSV file right in your web browser, so it never gets uploaded to a server. This means your data stays private, and you can confidently edit sensitive files without worrying about where they're stored. When you're done editing, you download the updated file and save it wherever you need.
              </p>
            </CardContent>
          </Card>

          {/* Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security You Can Trust</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                When you use a free online tool, you want assurance that your data isn't being saved, scanned, or shared. This CSV editor processes your file entirely in your browser, never uploading it to company servers. This means no one can access your data, no analytics track your file, and your information stays completely private — the foundation of a tool you can genuinely trust.
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
                { q: "Is it really free to edit CSV files online without Excel?", a: "Yes, completely free. There are no hidden costs, no premium features locked behind paywalls, and no requirement to upgrade. You get full editing capabilities at no cost, forever." },
                { q: "Can I edit large CSV files without Excel using this method?", a: "Yes, free online CSV editors are optimized to handle large files. You can edit files with thousands of rows smoothly, whereas Excel might slow down with very large datasets." },
                { q: "Will my CSV file format get corrupted when I edit it online?", a: "No, as long as you use a proper CSV editor. The tool maintains the CSV format perfectly. When you download your file, it's a properly formatted CSV ready to use." },
                { q: "Do I need to create an account to edit CSV files online?", a: "No. A good free CSV editor requires no account creation, no login, and no registration. Just upload and start editing immediately." },
                { q: "What happens to my file after I close the browser tab?", a: "Nothing. Since the editor works in your browser and doesn't upload files to servers, closing the tab has no effect on your original file. Your changes are auto-saved locally and can be downloaded." },
                { q: "Can I edit CSVs exported from other software like Salesforce or HubSpot?", a: "Absolutely. Any CSV file from any software can be edited. The format is universal, so CSVs from databases, CRM systems, email exports, or surveys all work the same way." },
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
                { href: "/tools/csv-viewer/view-in-browser", title: "View CSV in Browser", desc: "Preview CSV files without downloading" },
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
