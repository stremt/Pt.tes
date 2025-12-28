import { Helmet } from "react-helmet-async";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, BarChart3, Eye } from "lucide-react";

export default function XLSXViewLargeFiles() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Helmet>
        <title>View Large Excel Files Online - Thousands of Rows Instantly</title>
        <meta name="description" content="View and edit massive Excel files with thousands of rows directly in your browser. Fast, responsive performance with zero lag. Free, secure, offline-first." />
      </Helmet>

      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">View Large Excel Files With Ease</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Struggling with spreadsheets that have thousands of rows? Our online Excel viewer handles large files instantly with smooth performance—no lag, no crashes, no waiting.
          </p>
          <Link href="/tools/xlsx-viewer">
            <Button size="lg" className="gap-2">
              View Large Files Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Problem Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">The Problem With Large Excel Files</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Desktop Software Crashes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Excel hangs and freezes when opening large files with thousands of rows. Your computer slows to a crawl trying to load everything at once.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Memory Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Large spreadsheets consume massive amounts of RAM, making your entire system sluggish and unresponsive.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Slow Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Scrolling through thousands of rows is painfully slow. Simple searches take minutes. Finding data becomes frustrating.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compatibility Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Not all devices can handle large files. Mobile devices especially struggle with massive spreadsheets.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Solution Section */}
        <div className="mb-12 bg-muted/30 rounded-lg p-8 border">
          <h2 className="text-3xl font-bold mb-6">Lightning-Fast Large File Viewer</h2>
          <div className="space-y-4 mb-8">
            <div className="flex gap-3">
              <Zap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Instant Performance</h3>
                <p className="text-muted-foreground">View files with 10,000+ rows instantly. No waiting, no freezing, no lag—even on slower devices.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <BarChart3 className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Lazy Loading Technology</h3>
                <p className="text-muted-foreground">Our optimized rendering loads only the visible rows. Scroll through massive datasets without performance degradation.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Eye className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Powerful Search</h3>
                <p className="text-muted-foreground">Search across thousands of rows instantly. Find exactly what you need in seconds, not minutes.</p>
              </div>
            </div>
          </div>

          <Link href="/tools/xlsx-viewer">
            <Button size="lg" className="w-full md:w-auto">
              Start Viewing Large Files
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Features for Large Files</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Viewing</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Open files with 10,000+ rows</li>
                <li>✓ Smooth scrolling without lag</li>
                <li>✓ View column headers always visible</li>
                <li>✓ Efficient memory usage</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Searching & Filtering</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Instant search across all rows</li>
                <li>✓ Highlight matching results</li>
                <li>✓ Filter by column values</li>
                <li>✓ Find specific data quickly</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Export Options</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Download the entire file</li>
                <li>✓ Export filtered results</li>
                <li>✓ Save as Excel format</li>
                <li>✓ Preserve formatting</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Device Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Works on all devices</li>
                <li>✓ Mobile-optimized interface</li>
                <li>✓ Responsive design</li>
                <li>✓ Full-screen mode available</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Data Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View large datasets, search for patterns, and analyze millions of data points without desktop software slowdowns.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Open detailed sales reports, financial data, and performance metrics instantly. No waiting for exports or downloads.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Exports</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View large database exports in Excel format. Search and analyze records without needing specialized database tools.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View massive spreadsheets on phones and tablets. Access data on the go without desktop limitations.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8">FAQs About Large File Viewing</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">How many rows can this handle?</h3>
              <p className="text-muted-foreground">The viewer can handle files with 10,000+ rows with excellent performance. Even massive exports work smoothly.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Why is it faster than Excel?</h3>
              <p className="text-muted-foreground">We use optimized lazy-loading technology that renders only visible rows. Excel loads everything into memory at once.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Will my computer slow down?</h3>
              <p className="text-muted-foreground">No. Our browser-based viewer is lightweight and efficient. Even older computers and phones handle large files easily.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Can I edit large files here?</h3>
              <p className="text-muted-foreground">Yes! View and edit large spreadsheets, add/remove rows and columns, and download the modified file.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Is there a file size limit?</h3>
              <p className="text-muted-foreground">No practical limit for typical use. Browser storage handles massive datasets. Your only limit is your device's storage.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Does this work offline?</h3>
              <p className="text-muted-foreground">Once loaded, yes. You can view and edit large files completely offline without internet connection.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stop Struggling With Large Excel Files</h2>
          <p className="text-lg mb-6 opacity-90">View thousands of rows instantly with zero lag. Works on any device.</p>
          <Link href="/tools/xlsx-viewer">
            <Button size="lg" variant="secondary" className="gap-2">
              Open File Viewer Now
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
