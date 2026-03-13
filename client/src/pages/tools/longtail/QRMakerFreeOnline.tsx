import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Zap, Lock, Download } from "lucide-react";
import QRMaker from "../QRMaker";

export default function QRMakerFreeOnline() {
  useSEO({
    title: "Free QR Code Generator Online - No Login Required | Pixocraft",
    description: "Generate unlimited QR codes for free online. No signup, no watermarks, no limitations. Works in your browser instantly.",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-maker/free-online",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Free QR Code Generator Online - Create Unlimited Codes Instantly</h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Generate professional QR codes completely free with our online QR code generator. No signup required, no watermarks, no hidden fees. Create unlimited QR codes instantly in your browser—perfect for business, marketing, events, or personal use.
        </p>

          {/* Embedded QR Code Tool */}
          <section className="my-8 border rounded-lg bg-muted/30 p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Free Online QR Code Generator</h2>
            <QRMaker embedMode={true} />
          </section>
  

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Instant Generation</h3>
                  <p className="text-sm text-muted-foreground">QR codes created in seconds</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">100% Free Forever</h3>
                  <p className="text-sm text-muted-foreground">No limits, no premium tiers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Download className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">High Quality Output</h3>
                  <p className="text-sm text-muted-foreground">Professional-grade QR codes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4">Why Use a Free Online QR Code Generator?</h2>
        <p className="text-muted-foreground mb-6">
          QR codes have become essential for modern marketing, event management, and business operations. A reliable online generator eliminates software installations, compatibility issues, and cost barriers. Generate professional QR codes instantly without any technical setup.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Perfect for All Use Cases</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Marketing Campaigns:</strong> Link QR codes to landing pages, promotions, or videos</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Events & Ticketing:</strong> Create QR codes for event registration and access</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Business Cards:</strong> Add QR codes to contact information for easy sharing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>WiFi Sharing:</strong> Generate QR codes that connect guests to your network</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">No Signup, No Restrictions</h3>
            <p className="text-muted-foreground">
              Unlike many QR code services, ours doesn't require email registration, account creation, or payment information. Start generating codes immediately. Create as many QR codes as you need with no daily limits or expiration dates.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">How to Generate QR Codes Free Online</h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Enter Your Content</h4>
              <p className="text-muted-foreground">Paste your URL, text, or contact information into the input field</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customize (Optional)</h4>
              <p className="text-muted-foreground">Adjust colors, add logos, or change size to match your brand</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Download Instantly</h4>
              <p className="text-muted-foreground">Download your QR code as PNG or print directly</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Common Mistakes When Creating QR Codes</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Low Resolution Downloads</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Always download at the highest resolution for print materials. Our tool provides high-quality outputs suitable for any medium.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ignoring White Space</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">QR codes need white space around them. Avoid placing them against busy backgrounds or cramped spaces.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Not Testing Before Publishing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Always test your QR code with multiple devices before deploying it in marketing materials.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Privacy & Security</h2>
        <p className="text-muted-foreground mb-6">
          Your QR code data is processed entirely in your browser. We don't track what URLs you encode, don't store your data, and don't build profiles on you. Your QR code generation remains completely private.
        </p>

        <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Is it really completely free?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes. Unlimited QR code generation, no signup, no watermarks, no paid upgrades ever.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">How long do QR codes last?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">QR codes don't expire. As long as the URL/content they link to remains valid, they work indefinitely.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I track QR code scans?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Our basic generator doesn't track scans. For analytics, use your destination URL's analytics tools.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What happens if my URL changes?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">The QR code will still work, but it will direct to the old URL. QR codes are permanent once created.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I create a QR code for an image or file?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes. Upload files to a hosting service, then create a QR code linking to that file's URL.</p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-4">Back to Main Tool</h3>
          <Link href="/tools/qr-code-maker" className="block">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="pt-6">
                <p className="font-semibold mb-2">QR Code Maker</p>
                <p className="text-sm text-muted-foreground mb-4">Access the full-featured QR code generator tool</p>
                <Button variant="ghost" size="sm" className="w-full">
                  Go to Tool <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Free QR Code Tools - Pixocraft Tools
        </p>
      </div>
    </div>
  );
}
