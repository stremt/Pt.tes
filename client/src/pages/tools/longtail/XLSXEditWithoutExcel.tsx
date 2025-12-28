import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Lock, Zap } from "lucide-react";

export default function XLSXEditWithoutExcel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Helmet>
        <title>Edit Excel Files Without Excel - Free Online Editor</title>
        <meta name="description" content="Edit XLSX and Excel files online without Microsoft Office. View, edit, and download spreadsheets directly in your browser—completely free and secure." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Edit Excel Files Without Microsoft Excel</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Don't have Microsoft Excel? No problem. Our free online editor lets you view, edit, and download Excel files (.xlsx, .xls) directly from your browser—no software installation required.
          </p>
          <Link href="/tools/xlsx-viewer">
            <Button size="lg" className="gap-2">
              Start Editing Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Problem Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why You Need Excel Alternative</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expensive Software</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Microsoft Excel subscriptions cost money and require installation. Many users don't need the full complexity of Excel for simple spreadsheet editing.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compatibility Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Not all devices support Excel well. Working with spreadsheets across phones, tablets, and different operating systems is frustrating.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Learning Curve</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Excel has hundreds of features. For basic editing, viewing, and searching data, you don't need advanced functions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy Concerns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Uploading sensitive spreadsheets to cloud services raises privacy concerns. You want to keep your data safe locally.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-12 bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-6">The Solution: Free Online Excel Editor</h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">No Installation Required</h3>
                <p className="text-muted-foreground">Access the editor instantly from any web browser. No downloads, no setup, no subscriptions.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Fast & Lightweight</h3>
                <p className="text-muted-foreground">Edit spreadsheets instantly without the bloat of heavy desktop software. Works on all devices.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Lock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">100% Private & Secure</h3>
                <p className="text-muted-foreground">Your files never leave your browser. All processing happens locally—no uploads to servers, no tracking.</p>
              </div>
            </div>
          </div>

          <Link href="/tools/xlsx-viewer">
            <Button size="lg" className="w-full md:w-auto">
              Edit Your Excel Files Now
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">What You Can Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">View & Search</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Open Excel files instantly</li>
                <li>✓ Search data across entire spreadsheet</li>
                <li>✓ View thousands of rows efficiently</li>
                <li>✓ Sort and filter results</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Edit & Manage</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Edit any cell directly</li>
                <li>✓ Add and delete rows/columns</li>
                <li>✓ Rename column headers</li>
                <li>✓ Undo/redo changes instantly</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Save & Export</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Auto-save to browser storage</li>
                <li>✓ Download edited files as Excel</li>
                <li>✓ Keep changes between sessions</li>
                <li>✓ No data loss on page refresh</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Multi-Device</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Works on phones & tablets</li>
                <li>✓ Responsive mobile interface</li>
                <li>✓ Edit on the go</li>
                <li>✓ Full-screen editing mode</li>
              </ul>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Do I need to install anything?</h3>
              <p className="text-muted-foreground">No. Simply open the editor in your browser. It works on any device with an internet connection.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Is my data safe?</h3>
              <p className="text-muted-foreground">Completely. Your files are never sent to our servers. All processing happens in your browser with zero uploads.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I edit .xls and .xlsx files?</h3>
              <p className="text-muted-foreground">Yes. The editor supports both modern .xlsx files and legacy .xls files from older Excel versions.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What if Excel isn't installed on my computer?</h3>
              <p className="text-muted-foreground">That's exactly what this tool solves! You can edit Excel files in any browser without installing Excel.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Will my changes be saved?</h3>
              <p className="text-muted-foreground">Yes. Changes are automatically saved to your browser. You can download the updated file anytime.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I use this as a replacement for Excel?</h3>
              <p className="text-muted-foreground">For basic spreadsheet editing, viewing, and data management—absolutely yes. For advanced formulas and macros, Excel may be needed.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stop Paying for Excel. Start Using Our Free Editor.</h2>
          <p className="text-lg mb-6 opacity-90">Edit, view, and manage your Excel files online instantly—completely free.</p>
          <Link href="/tools/xlsx-viewer">
            <Button size="lg" variant="secondary" className="gap-2">
              Open Excel Editor Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
