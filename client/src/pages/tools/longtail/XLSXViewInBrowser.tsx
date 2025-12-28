import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Eye, Clock, Globe } from "lucide-react";

export default function XLSXViewInBrowser() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Helmet>
        <title>View Excel Files in Browser - No Download Required</title>
        <meta name="description" content="Open and view Excel (.xlsx, .xls) files directly in your browser without downloading. Instant preview, search, and edit. Free, fast, and completely secure." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">View Excel Files Directly in Your Browser</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Stop downloading Excel files just to preview them. Open and view spreadsheets instantly in your browser—no installation needed, no downloads required, completely secure.
          </p>
          <Link href="/tools/xlsx-viewer">
            <Button size="lg" className="gap-2">
              Open Excel Files Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Problem Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Why Browser Viewing Matters</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Annoying Downloads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every Excel file requires downloading first. Your downloads folder gets cluttered with files you only needed to peek at.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Downloaded files can contain malware. Opening unknown files on your computer is a security risk. Browser viewing keeps your device safer.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Storage Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Downloads waste disk space. Large spreadsheet files accumulate quickly, filling up your storage unnecessarily.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Limited Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Desktop software won't work on phones or tablets. Files emailed to you might not open on your mobile device.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-12 bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-6">View Excel Files in Your Browser Instantly</h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <Eye className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Instant Preview</h3>
                <p className="text-muted-foreground">Open Excel files instantly with no download step. See what's inside before making decisions.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">No Storage Impact</h3>
                <p className="text-muted-foreground">View files without taking up disk space. No cluttered downloads folder. No cleanup needed.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Globe className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Works Everywhere</h3>
                <p className="text-muted-foreground">Open files on any device—phones, tablets, laptops, smart TVs—as long as there's a browser.</p>
              </div>
            </div>
          </div>

          <Link href="/tools/xlsx-viewer">
            <Button size="lg" className="w-full md:w-auto">
              View Files in Browser Now
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">What You Can Do</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Instant Viewing</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Open Excel files instantly</li>
                <li>✓ No installation required</li>
                <li>✓ No download step needed</li>
                <li>✓ View multiple files quickly</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Search & Explore</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Search across all rows</li>
                <li>✓ Highlight matching data</li>
                <li>✓ Filter by values</li>
                <li>✓ Navigate easily</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Sharing & Collaboration</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Share links instead of files</li>
                <li>✓ Others view without Excel</li>
                <li>✓ No software needed by recipients</li>
                <li>✓ Preview before downloading</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Export Options</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Download when needed</li>
                <li>✓ Export filtered results</li>
                <li>✓ Share without downloads</li>
                <li>✓ Edit before exporting</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Real-World Use Cases</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Attachments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Received an Excel file in email? Open it instantly in your browser. Check its contents before downloading or saving.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Document Review</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Managers need to review spreadsheets from team members. Browser viewing is faster than opening Excel and safer for security.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Check spreadsheets on your phone while away from desk. No Excel app needed, no downloads, just open in browser.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Inspection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">QA testers and analysts need to inspect exported data. Browser viewing makes quick checks easy without file storage.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Secure Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Share spreadsheets with colleagues who don't have Excel. They can view everything without installation or downloads.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Temporary Files</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Many spreadsheets are temporary. View them in the browser once, then forget about them. No storage waste.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How do I open an Excel file in this viewer?</h3>
              <p className="text-muted-foreground">Simply go to the viewer, drag and drop your Excel file, and it opens instantly. No download, no installation.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Is it safe to open Excel files here?</h3>
              <p className="text-muted-foreground">Yes. All processing happens in your browser. Files never go to our servers. Your data stays on your device—completely safe.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I view Excel files on my phone?</h3>
              <p className="text-muted-foreground">Absolutely! The viewer works on all devices—phones, tablets, desktops. Fully responsive design adapts to any screen.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Do I need Excel installed?</h3>
              <p className="text-muted-foreground">No. Just a web browser. You don't need any software or subscription. Completely free.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I edit files in the browser?</h3>
              <p className="text-muted-foreground">Yes! Full editing support. Edit cells, add rows/columns, search, and download the modified file.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">What file formats are supported?</h3>
              <p className="text-muted-foreground">Excel (.xlsx), older Excel (.xls), and CSV files. All standard spreadsheet formats work perfectly.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Do downloads stay on my computer?</h3>
              <p className="text-muted-foreground">Only if you choose to download. Viewing in the browser doesn't require any files to be stored on your device.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Will my data be tracked?</h3>
              <p className="text-muted-foreground">No tracking whatsoever. Your privacy is completely protected. We only provide the viewing tool—nothing else.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stop Downloading. Start Viewing.</h2>
          <p className="text-lg mb-6 opacity-90">View Excel files directly in your browser. No downloads, no installations, no hassle.</p>
          <Link href="/tools/xlsx-viewer">
            <Button size="lg" variant="secondary" className="gap-2">
              Open Viewer Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
