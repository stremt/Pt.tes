import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Star, Image, Sparkles } from "lucide-react";
import QRMaker from "../QRMaker";

export default function QRMakerLogo() {
  useSEO({
    title: "QR Code Generator with Logo - Branded QR Codes | Pixocraft",
    description: "Create branded QR codes with your logo. Professional QR codes with custom designs, colors, and company branding.",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-maker/with-logo",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code Generator with Logo - Create Branded QR Codes</h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Generate professional QR codes with your company logo embedded in the center. Maintain brand consistency across marketing materials, packaging, and digital platforms with customized, scannable QR codes that reflect your business identity.
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
                <Star className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Brand Recognition</h3>
                  <p className="text-sm text-muted-foreground">Logo increases brand visibility</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Image className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Custom Design</h3>
                  <p className="text-sm text-muted-foreground">Match your brand colors</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Sparkles className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Professional Quality</h3>
                  <p className="text-sm text-muted-foreground">Enterprise-grade branding</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4">Why Add Your Logo to QR Codes?</h2>
        <p className="text-muted-foreground mb-6">
          Branded QR codes with embedded logos increase scan rates and brand recognition. When customers see your logo in the QR code, they're more likely to scan it and engage with your content. It's a professional touch that sets your brand apart from generic QR codes.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Use Cases for Branded QR Codes</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Product Packaging:</strong> Link to product information or user guides directly</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Marketing Materials:</strong> Printed ads, flyers, and billboards with consistent branding</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Event Marketing:</strong> Tickets, badges, and promotional materials with your logo</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Email Signatures:</strong> Professional contact method in business communications</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Increased Engagement</h3>
            <p className="text-muted-foreground">
              Research shows that QR codes with logos receive 30-40% more scans than plain QR codes. Your branding signals trust and legitimacy, encouraging more people to engage with your content. Branded codes look more intentional and professional.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">How to Create QR Codes with Logos</h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Upload Your Logo</h4>
              <p className="text-muted-foreground">Select a square or circular logo image (PNG recommended for transparency)</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Enter Your Content</h4>
              <p className="text-muted-foreground">Paste your URL, text, or contact information</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customize Colors</h4>
              <p className="text-muted-foreground">Choose brand colors for QR code pattern and background</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">4</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Download & Deploy</h4>
              <p className="text-muted-foreground">Save high-resolution branded QR code for any use case</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Best Practices for Logo QR Codes</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Logo Size Matters</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Keep logos to 20-30% of QR code size. Too large and scanning becomes difficult. Too small and branding is lost.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Maintain Contrast</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Ensure your logo has high contrast against the QR code. White or light logos work on dark QR codes, and vice versa.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Use Simple Logos</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Complex logos with many colors can interfere with scanability. Simple, bold logos work best.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Test Scannability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Always test branded QR codes with multiple devices before large-scale printing or deployment.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Brand Consistency</h2>
        <p className="text-muted-foreground mb-6">
          Using branded QR codes ensures consistency across all your marketing touchpoints. Whether on packaging, advertisements, or digital platforms, your branded QR code reinforces brand identity and creates a cohesive customer experience. Professional appearance builds trust and encourages engagement.
        </p>

        <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What image format works best for logos?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">PNG with transparent background works best. JPG also works but may have white backgrounds that interfere.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I use a complex/detailed logo?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Simple logos work better. Complex designs can obscure the QR code pattern. Simplify logos for optimal scanning.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Will adding a logo affect scanability?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No, if the logo is sized properly (20-30% of QR code) and maintains good contrast. QR codes have error correction.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I change the logo after creating the QR code?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No. Once generated, create a new QR code if you want a different logo. The QR data itself doesn't change.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What size should I download for printing?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Download at 300 DPI or higher for professional printing. Minimum size is 2cm x 2cm (0.8 inches).</p>
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
          Professional QR Code Tools - Pixocraft Tools
        </p>
      </div>
    </div>
  );
}
