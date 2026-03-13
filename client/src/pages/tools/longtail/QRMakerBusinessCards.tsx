import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Briefcase, Contact, Printer } from "lucide-react";
import QRMaker from "../QRMaker";

export default function QRMakerBusinessCards() {
  useSEO({
    title: "QR Code Generator for Business Cards - Contact & Networking | Pixocraft",
    description: "Generate professional QR codes for your business cards. Link to contact info, portfolio, or website instantly.",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-maker/business-cards",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code Generator for Business Cards - Professional Networking Made Easy</h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Add professional QR codes to your business cards for instant contact sharing, portfolio access, or website links. Impress clients and colleagues with modern networking tools that bridge digital and physical connections.
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
                <Briefcase className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Professional Look</h3>
                  <p className="text-sm text-muted-foreground">Modern business cards stand out</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Contact className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Easy Contact Sharing</h3>
                  <p className="text-sm text-muted-foreground">One scan saves your info</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Printer className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Print Ready</h3>
                  <p className="text-sm text-muted-foreground">High-quality for printing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4">Why Add QR Codes to Business Cards?</h2>
        <p className="text-muted-foreground mb-6">
          Business cards with QR codes modernize your professional image and provide immediate contact access. Prospects can connect with you instantly—no manual data entry, no lost contact information. QR codes on business cards increase engagement and make networking more efficient.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Multiple Use Cases</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>vCard/Contact Info:</strong> Encode your full contact details for instant saving</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>LinkedIn Profile:</strong> Link directly to your professional profile</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Portfolio Website:</strong> Showcase your work immediately</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Contact Form:</strong> Direct to your inquiry page for immediate follow-up</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Stand Out from Competitors</h3>
            <p className="text-muted-foreground">
              Most business cards are static. Adding a QR code shows you're modern, tech-savvy, and serious about making connections. It's a small detail that makes a big impression, especially at networking events, conferences, and business meetings.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">How to Design Business Card QR Codes</h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Choose Your Link or Data</h4>
              <p className="text-muted-foreground">Decide what the QR code should link to—URL, vCard, phone number, or email</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customize Design</h4>
              <p className="text-muted-foreground">Match colors to your brand, adjust size to fit card layout, add logo if desired</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Download for Print</h4>
              <p className="text-muted-foreground">Get high-resolution file suitable for professional printing</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Best Practices for Business Card QR Codes</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Size Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Make QR codes at least 1cm x 1cm (about 0.4 inches) to ensure easy scanning. Larger is always better for readability.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Color Contrast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Use dark patterns on light backgrounds or vice versa. Avoid low-contrast color combinations that prevent scanning.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Strategic Placement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Place QR codes in corners or empty spaces. Never place them where they might get creased or damaged in wallets.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Test Before Printing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Always test the QR code with multiple devices before sending 1000s of cards to print.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Privacy & Security</h2>
        <p className="text-muted-foreground mb-6">
          Your business card information is processed entirely in your browser. We don't store your contact details, don't track printing, and don't collect any personal data. Your information remains completely private.
        </p>

        <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Should I use a vCard or link to my website?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">vCards store contact info directly; websites show your portfolio. Choose based on your primary networking goal.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What resolution should business card QR codes be?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Download at 300+ DPI for professional printing. Our tool provides high-resolution files suitable for any printer.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I redesign my QR code if I change my information?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes, generate new QR codes anytime. If you change your URL or contact info, create a fresh code.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">How small can a QR code be on a business card?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Minimum 1cm x 1cm (0.4 inches). Smaller than this makes scanning difficult. Standard cards usually have 1.5cm x 1.5cm space.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Will the QR code work forever?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes, as long as your destination URL/contact information remains valid and publicly accessible.</p>
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
          Professional Networking Tools - Pixocraft Tools
        </p>
      </div>
    </div>
  );
}
