import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Wifi, Share2, Lock } from "lucide-react";
import QRMaker from "../QRMaker";

export default function QRMakerWiFi() {
  useSEO({
    title: "WiFi QR Code Generator - Share Network Access Instantly | Pixocraft",
    description: "Generate WiFi QR codes to share your network password instantly. No typing required. Works for guests and networks.",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-maker/wifi-network",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">WiFi QR Code Generator - Share Network Access Instantly</h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Generate WiFi QR codes that automatically connect guests to your network without typing passwords. Perfect for homes, businesses, hotels, cafes, and events. Let visitors scan once and connect instantly.
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
                <Wifi className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Instant Connection</h3>
                  <p className="text-sm text-muted-foreground">One scan connects to WiFi</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Share2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Easy Sharing</h3>
                  <p className="text-sm text-muted-foreground">Display at entry points</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Lock className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Password Protected</h3>
                  <p className="text-sm text-muted-foreground">Encrypted in QR code</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4">Why WiFi QR Codes?</h2>
        <p className="text-muted-foreground mb-6">
          Typing WiFi passwords is frustrating for visitors. WiFi QR codes eliminate the need for password sharing, reduce support requests, and improve user experience. Guests simply scan the code and connect instantly—perfect for businesses trying to manage guest networks securely.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Perfect for Every Environment</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Restaurants & Cafes:</strong> Display QR codes at entry, no staff needed to share WiFi</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Hotels & Accommodations:</strong> Include QR code in room information sheets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Events & Conferences:</strong> Print on name badges or signage for seamless connectivity</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Home Guests:</strong> Share with visitors without saying your password aloud</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Secure by Default</h3>
            <p className="text-muted-foreground">
              WiFi QR codes encode your SSID and password securely. The password isn't visible to the naked eye—only devices that scan the code can access the network. Change your QR code anytime by updating your WiFi password.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">How to Create WiFi QR Codes</h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Enter WiFi Details</h4>
              <p className="text-muted-foreground">Input your network name (SSID) and password</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Select Security Type</h4>
              <p className="text-muted-foreground">Choose WPA, WEP, or Open network type</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Download & Print</h4>
              <p className="text-muted-foreground">Get high-res QR code for printing or digital display</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Common Mistakes with WiFi QR Codes</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Using Guest Network QR Code as Main Network</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Always generate separate QR codes for guest networks and main networks with different passwords.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Forgetting to Update QR Code After Password Change</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">If you change your WiFi password, create a new QR code. Old codes won't work with new passwords.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Placing QR Code Where It's Hard to See</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Display WiFi QR codes at eye level, well-lit areas near entry points for maximum visibility.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Privacy & Security</h2>
        <p className="text-muted-foreground mb-6">
          WiFi QR codes are processed entirely in your browser. Your WiFi credentials are never sent to any server. The QR code itself is just encoded data—it's completely safe to print or display.
        </p>

        <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Will the QR code expire?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No. The QR code remains valid as long as your WiFi network and password remain unchanged.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I update the WiFi password without a new QR code?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No. If you change your WiFi password, you'll need to generate a new QR code with the updated credentials.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Is it safe to display WiFi QR codes publicly?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes, if it's your guest network. For security, always use a separate guest network with its own password.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Which devices support WiFi QR codes?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Most modern phones (iOS 11+, Android 8+) support WiFi QR code scanning natively.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can WiFi QR codes be tracked?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No. WiFi QR codes are static data. No tracking or analytics are possible from the QR code itself.</p>
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
          WiFi & Network Tools - Pixocraft Tools
        </p>
      </div>
    </div>
  );
}
