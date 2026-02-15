import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";

export default function Privacy() {
  useSEO({
    title: "Privacy Commitment - Your Data Stays Yours | Pixocraft Tools",
    description: "At Pixocraft Tools, your privacy is our priority. We operate entirely in your browser—meaning your data never leaves your device. Learn about our transparent analytics and zero-data-collection policy.",
    keywords: "privacy policy, data security, local processing, zero tracking, pixocraft privacy, GDPR compliance",
    canonicalUrl: "https://tools.pixocraft.in/privacy",
  });

  return (
    <div className="min-h-screen py-8 sm:py-12 md:py-16">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-4xl">
        {/* Page Header */}
        <div className="text-center space-y-3 sm:space-y-4 mb-8 sm:mb-12 md:mb-16">
          <Badge variant="secondary" className="mb-2 sm:mb-4 text-xs sm:text-sm px-3 sm:px-4 py-1.5">Privacy Policy</Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Privacy Policy</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Last updated: February 15, 2026
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-8 sm:mb-10 md:mb-12">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6 space-y-4 text-center">
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                At Pixocraft Tools, we are committed to providing a transparent and secure experience. This policy details how we prioritize your privacy while using analytics to improve our services.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="p-4 rounded-lg bg-background shadow-sm border">
                  <p className="text-sm font-semibold text-primary">Anonymous Analytics</p>
                  <p className="text-xs text-muted-foreground mt-1">We use anonymous data to improve our tools.</p>
                </div>
                <div className="p-4 rounded-lg bg-background shadow-sm border">
                  <p className="text-sm font-semibold text-primary">No Input Tracking</p>
                  <p className="text-xs text-muted-foreground mt-1">We do not track personal data or tool inputs.</p>
                </div>
                <div className="p-4 rounded-lg bg-background shadow-sm border">
                  <p className="text-sm font-semibold text-primary">Local Processing</p>
                  <p className="text-xs text-muted-foreground mt-1">All files are processed locally in your browser.</p>
                </div>
              </div>
              <p className="text-sm sm:text-base md:text-lg font-bold text-primary">
                Privacy-First Guarantee: We do not store, sell, or compromise your personal data.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Main Content */}
        <div className="space-y-6 sm:space-y-8">
          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                We only collect information that helps us understand how our website is used and how we can improve it:
              </p>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                <li>Anonymous usage patterns and interaction data</li>
                <li>Device information (browser type, operating system, screen resolution)</li>
                <li>General geographic location (country/city level, never precise coordinates)</li>
                <li>Referral sources and page visit history</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">Information We Do Not Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                In alignment with our privacy-first philosophy, we explicitly do NOT collect:
              </p>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                <li>Personally Identifiable Information (PII) like names, phone numbers, or addresses</li>
                <li><strong>Tool Input Data:</strong> The text, files, or data you process using our tools</li>
                <li><strong>Sensitive Records:</strong> We do not record screens when tools are being used</li>
                <li><strong>User Files:</strong> No images, PDFs, or documents are ever uploaded or stored</li>
              </ul>
            </CardContent>
          </Card>

          <Card id="analytics">
            <CardHeader className="p-4 sm:p-6 border-b bg-muted/30">
              <CardTitle className="text-base sm:text-lg md:text-xl flex items-center gap-2">
                Analytics & Usage Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground p-4 sm:p-6">
              <p>
                To provide a world-class experience, we use <strong>Microsoft Clarity</strong> and <strong>Google Analytics</strong>. These tools help us understand user behavior to optimize tool performance and interface design.
              </p>
              <div className="space-y-3">
                <p className="font-semibold text-foreground">What they collect:</p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>Page visit frequency and duration</li>
                  <li>Click maps and scroll depth (anonymous)</li>
                  <li>Session behavior (to identify UI friction points)</li>
                  <li>Device/Browser specifications</li>
                </ul>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                <p className="text-xs font-medium text-primary uppercase tracking-wider mb-2">Our Strict Implementation:</p>
                <ul className="list-disc list-inside space-y-1.5 text-xs">
                  <li>We do not collect personal identification data intentionally.</li>
                  <li><strong>No tool input data is tracked or recorded.</strong></li>
                  <li><strong>No files processed in our tools (images, PDFs, etc.) are recorded by analytics.</strong></li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">How Our Tools Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                Our core commitment is <strong>Client-Side Processing</strong>. This means your data never leaves your device:
              </p>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                <li><strong>Local Execution:</strong> Password generation, QR code creation, and image compression happen entirely in your browser using JavaScript.</li>
                <li><strong>No Uploads:</strong> When you "upload" a file to a tool, it stays in your browser's memory and is never transmitted to our servers.</li>
                <li><strong>Privacy by Default:</strong> Even if our servers go offline, your browser can still process your data.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                We use limited third-party services to provide specific features:
              </p>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                <li><strong>Mail.tm:</strong> Provides the backend for our Temp Mail tool. Email data is handled according to their privacy standards.</li>
                <li><strong>HuggingFace:</strong> Powering our AI text summarization (data is sent anonymously for processing and not stored).</li>
                <li><strong>Analytics:</strong> Microsoft Clarity and Google Analytics (as detailed above).</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">Data Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                We do not maintain user databases. Any persistent data is stored only on <strong>your device</strong>:
              </p>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                <li><strong>Local Storage:</strong> Used for Temp Mail sessions and tool preferences.</li>
                <li><strong>No Server Database:</strong> We don't have a "User Table" or login system, ensuring no data breach can expose your activity.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">User Rights & Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                You have full control over your privacy on Pixocraft Tools:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li><strong>Block Cookies:</strong> You can set your browser to refuse all cookies or indicate when a cookie is being sent.</li>
                <li><strong>Opt-Out:</strong> You can use browser extensions like "Google Analytics Opt-out Browser Add-on" to prevent your data from being used.</li>
                <li><strong>Clear Data:</strong> You can clear your browser's cache and local storage at any time to remove all data stored by our tools.</li>
              </ul>
              <p className="text-xs italic">
                Note: Compliance with GDPR and the Indian IT Act is integrated into our "Zero-Storage" and "Right-to-be-Forgotten" (by not remembering in the first place) approach.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                Security is woven into our architecture:
              </p>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 ml-2 sm:ml-4">
                <li>End-to-end HTTPS encryption for all traffic.</li>
                <li>Zero-data-persistence on our servers minimizes the attack surface.</li>
                <li>Regular updates to client-side libraries to prevent vulnerabilities.</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">Policy Updates</CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                We may update this policy to reflect new features or compliance requirements. The "Last updated" date at the top of the page will always reflect the current version.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-sm sm:text-base text-muted-foreground p-4 sm:p-6 pt-0">
              <p>
                For any privacy concerns or compliance inquiries, please reach out:
              </p>
              <p className="mt-4">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@pixocraft.in"
                  className="text-primary hover:underline"
                >
                  support@pixocraft.in
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
