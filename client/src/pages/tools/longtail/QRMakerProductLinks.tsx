import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, ShoppingCart, Package, Link as LinkIcon } from "lucide-react";

export default function QRMakerProductLinks() {
  useSEO({
    title: "QR Code Generator for Product Links - Drive Sales & Reviews | Pixocraft",
    description: "Generate QR codes for product pages, reviews, and store links. Increase purchases with trackable codes on packaging and marketing materials.",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-maker/product-links",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code Generator for Product Links - Drive Sales & Customer Reviews</h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Generate custom QR codes linking to product pages, online stores, purchase links, and review platforms. Perfect for product packaging, catalogs, retail displays, and marketing materials. Turn offline interactions into instant online purchases and customer feedback.
        </p>

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <ShoppingCart className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Direct to Purchase</h3>
                  <p className="text-sm text-muted-foreground">One scan leads to checkout</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Product Information</h3>
                  <p className="text-sm text-muted-foreground">Show specs, ingredients, manual</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <LinkIcon className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Multi-Channel Links</h3>
                  <p className="text-sm text-muted-foreground">Link to any store or platform</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Products?</h2>
        <p className="text-muted-foreground mb-6">
          Physical products have a bridge to digital commerce. QR codes on packaging, labels, and displays connect customers directly to product pages, reviews, and checkout. Customers get more information, you get more sales and valuable feedback—all from a single scan.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Multiple Link Destinations</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>E-commerce Store Link:</strong> Direct to your product page for immediate purchase</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Product Reviews:</strong> Link to customer reviews and ratings on any platform</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>User Manuals & Specs:</strong> Provide detailed product information and guides</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Warranty & Support:</strong> Connect customers to warranty info and customer service</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Reduce Returns & Support Tickets</h3>
            <p className="text-muted-foreground">
              Customers confused about product features or usage often return items or contact support. QR codes linking to detailed product information, video tutorials, and FAQs reduce confusion and returns while increasing satisfaction.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">How to Use Product QR Codes</h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Identify Link Destination</h4>
              <p className="text-muted-foreground">Choose where QR should direct customers—your store, Amazon, YouTube product video, or review page</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Generate & Customize</h4>
              <p className="text-muted-foreground">Create QR code with colors matching your product packaging and brand identity</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Apply to Packaging</h4>
              <p className="text-muted-foreground">Print on labels, boxes, or tags in prominent locations for easy scanning</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Common Product QR Code Mistakes</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Linking to Dead Product Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Always test QR codes before printing on packaging. Outdated or broken links frustrate customers. Update your URL if products discontinue or pages change.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Poor QR Code Placement on Packaging</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Place QR codes where they're visible and easy to scan—avoid tight corners or areas with glare. Ensure sufficient white space around the code for reliable scanning.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Not Testing Mobile Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Most customers scan and purchase on mobile. Ensure your linked product page is mobile-optimized, loads fast, and has clear checkout options.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Privacy & Security</h2>
        <p className="text-muted-foreground mb-6">
          Product QR codes don't collect personal data. They simply link to your website or product pages using standard URLs. Customers control what information they share when they interact with your links. Your QR codes are completely safe and privacy-respecting.
        </p>

        <h2 className="text-3xl font-bold mb-4 mt-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I track product QR code scans?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes! Use URL shorteners like Bitly or built-in store analytics to track clicks. This provides valuable data on customer engagement and purchasing behavior.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What's the best QR code size for product packaging?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">QR codes should be at least 1-2 inches (25-50mm) square for reliable scanning from 12 inches away. Larger is better for visibility on small packaging.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I use the same QR code across multiple product variants?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes! You can link to a category page or use parameters to show the relevant variant. Or create separate unique QR codes for each variant if you need specific tracking.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Will QR codes work on metallic or shiny packaging?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes, but be careful with gloss and reflective surfaces. Use matte ink if possible and ensure sufficient contrast between the code and background. Test scanning before mass production.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I link QR codes to multiple store platforms?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Use a landing page that detects the customer's location and redirects to the relevant store (Amazon, your site, local retailers). This provides flexibility and better user experience.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Related QR Code Tools</h2>
        <p className="text-muted-foreground mb-6">
          Explore other QR code solutions for your business needs:
        </p>
        <div className="space-y-3 text-muted-foreground">
          <p><Link href="/tools/qr-maker"><span className="text-primary hover:underline cursor-pointer">Free QR Code Maker</span></Link> - Create unlimited QR codes with full customization</p>
          <p><Link href="/tools/qr-code-maker/with-logo"><span className="text-primary hover:underline cursor-pointer">QR Codes with Logo</span></Link> - Brand your codes with company logo</p>
          <p><Link href="/tools/qr-code-maker/free-online"><span className="text-primary hover:underline cursor-pointer">Free Online QR Generator</span></Link> - No signup, instant generation</p>
          <p><Link href="/tools/qr-code-maker/event-ticketing"><span className="text-primary hover:underline cursor-pointer">Event QR Codes</span></Link> - Perfect for promotional events</p>
        </div>

        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Increase Product Sales with QR Codes</h3>
          <p className="text-muted-foreground mb-4">
            Start creating product QR codes today. Free, customizable, and ready to print.
          </p>
          <Link href="/tools/qr-maker">
            <Button className="w-full">
              Create Product QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
