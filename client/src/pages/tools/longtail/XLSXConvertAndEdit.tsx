import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, GitBranch, Edit2, Download } from "lucide-react";

export default function XLSXConvertAndEdit() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Helmet>
        <title>Convert Excel to CSV & Edit - Online Format Converter & Editor</title>
        <meta name="description" content="Convert Excel (.xlsx) to CSV, JSON, and edit spreadsheets online. No installation required. Free, fast, and completely private format conversion." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Convert Excel & CSV Files + Edit Online</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Convert between Excel, CSV, and JSON formats instantly. Edit spreadsheets in any format without leaving your browser. All processing is private and secure.
          </p>
          <Link href="/tools/xlsx-viewer">
            <Button size="lg" className="gap-2">
              Start Converting Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Problem Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Challenges With Format Conversion</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Multiple Tools Required</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Converting between Excel, CSV, and JSON usually requires different tools. Switching between applications is tedious and error-prone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Many online converters upload your files to their servers. Your sensitive data is exposed to privacy risks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formatting Loss</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Converting formats often causes data loss or corruption. Excel formulas, colors, and styles don't always transfer properly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limited Editing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Conversion tools don't let you edit data after conversion. You need additional software to make changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-12 bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-6">All-in-One Format Converter & Editor</h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <GitBranch className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Multiple Format Support</h3>
                <p className="text-muted-foreground">Convert between Excel (.xlsx, .xls), CSV, and JSON instantly without leaving the tool.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Edit2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Edit After Converting</h3>
                <p className="text-muted-foreground">Convert AND edit in the same place. No need to download, edit separately, and re-upload.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Download className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Export in Any Format</h3>
                <p className="text-muted-foreground">Work with your data in any format. Download as Excel, CSV, or JSON instantly.</p>
              </div>
            </div>
          </div>

          <Link href="/tools/xlsx-viewer">
            <Button size="lg" className="w-full md:w-auto">
              Start Converting & Editing
            </Button>
          </Link>
        </div>

        {/* What You Can Do Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Supported Conversions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4">Excel → Other Formats</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Excel (.xlsx) → CSV</li>
                <li>✓ Excel (.xls) → CSV</li>
                <li>✓ Excel → JSON</li>
                <li>✓ Excel → Edit directly</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-4">CSV → Other Formats</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ CSV → Excel (.xlsx)</li>
                <li>✓ CSV → Edit directly</li>
                <li>✓ CSV → JSON</li>
                <li>✓ CSV → View & validate</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Conversion</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Instant format conversion</li>
                <li>✓ Batch conversion support</li>
                <li>✓ Preserve data integrity</li>
                <li>✓ Handle special characters</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Editing</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Edit cells directly</li>
                <li>✓ Add/remove rows & columns</li>
                <li>✓ Rename headers</li>
                <li>✓ Search & filter data</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Validation</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Check data integrity</li>
                <li>✓ Validate formatting</li>
                <li>✓ Error detection</li>
                <li>✓ Data quality checks</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Export</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Download in any format</li>
                <li>✓ Preserve all data</li>
                <li>✓ Multiple encoding options</li>
                <li>✓ Bulk export available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Perfect For These Workflows</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Data Integration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Convert exported Excel data to CSV or JSON for importing into databases or APIs. Edit before conversion to clean data.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Report Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Receive reports in Excel, convert to CSV for analysis, edit to fix errors, and export in your preferred format.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Migration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Move data between systems by converting formats. Edit during migration to ensure compatibility.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Automation Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Automated tools generate Excel files. Convert to JSON for APIs, edit for modifications, and sync across platforms.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Common Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Can I edit during conversion?</h3>
              <p className="text-muted-foreground">Yes! Upload your file, view it in our editor, make changes, then download in any format you need.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Will my data be corrupted?</h3>
              <p className="text-muted-foreground">No. We use standard libraries that preserve all data during conversion. Your information stays intact.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">How fast is the conversion?</h3>
              <p className="text-muted-foreground">Instant. Conversion happens in your browser with no server upload delays.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Is my data private?</h3>
              <p className="text-muted-foreground">Completely. All conversion and editing happens in your browser. Your files never leave your device.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I convert Excel formulas?</h3>
              <p className="text-muted-foreground">CSV and JSON formats don't support formulas. We convert formula results as values instead.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What about large files?</h3>
              <p className="text-muted-foreground">Works great with large files. Optimized performance even for thousands of rows.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Convert & Edit Spreadsheets Instantly</h2>
          <p className="text-lg mb-6 opacity-90">No installation, no uploads, no hassle. Convert between Excel, CSV, and JSON all in one place.</p>
          <Link href="/tools/xlsx-viewer">
            <Button size="lg" variant="secondary" className="gap-2">
              Start Converting Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
