import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, AlertCircle, HelpCircle, Package, ShieldCheck, BarChart3, RefreshCw } from "lucide-react";

const faqItems = [
  {
    question: "How do I add a QR code to my product packaging?",
    answer: "Generate your QR code using the tool above by entering your product URL, landing page, or any relevant link. Download in 4K Ultra resolution for print, then send the PNG file to your packaging designer or printer to include it on your packaging artwork."
  },
  {
    question: "What should the QR code on product packaging link to?",
    answer: "Product packaging QR codes can link to: user manuals, video tutorials, product registration pages, re-order links, warranty registration, customer reviews, brand social media, or authenticity verification pages. Choose based on what adds most value for your customers."
  },
  {
    question: "Can QR codes on packaging help verify product authenticity?",
    answer: "Yes! Unique QR codes on individual products can link to an authenticity verification page. When customers scan, they see confirmation that the product is genuine. This is especially effective for luxury goods, electronics, and health products."
  },
  {
    question: "What size should QR codes be on product packaging?",
    answer: "QR codes on packaging should be at least 1.5cm x 1.5cm for small product boxes. On larger packaging, 2.5cm x 2.5cm or larger is recommended. Always download in 4K Ultra resolution to ensure crisp, scannable codes at any size."
  },
  {
    question: "Do QR codes on packaging affect the design?",
    answer: "With proper planning, QR codes can be seamlessly integrated into your packaging design. You can customize the QR code colors to match your brand palette and add your logo in the center. Many brands make QR codes a design feature rather than an afterthought."
  },
  {
    question: "Can I use different QR codes for different product variants?",
    answer: "Yes! Each product SKU or variant should ideally have its own QR code linking to the specific product page for that variant. This ensures customers get accurate information for exactly what they purchased."
  },
  {
    question: "Are product packaging QR codes free to create?",
    answer: "Yes! Our QR code generator is completely free. You can create as many product QR codes as you need without any subscription or account required. The 4K resolution download is also free."
  }
];

export default function QRCodeForProductPackaging() {
  useSEO({
    title: "QR Code for Product Packaging | E-commerce QR Code Generator",
    description: "Create QR codes for product packaging, labels, and boxes. Add QR codes to your products to link customers to manuals, warranty registration, authenticity checks, and re-order pages. Free online QR maker.",
    keywords: "qr code for product packaging, product packaging qr code, qr code on product label, product authenticity qr code, ecommerce qr code, product qr code generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-product-packaging",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(generateFAQSchema(faqItems))}
      </script>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">E-commerce & Retail</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code for Product Packaging – Enhance Unboxing & Drive Engagement</h1>
            <p className="text-xl text-muted-foreground mb-8">Generate custom QR codes for product packaging, labels, and boxes. Link customers to user manuals, authenticity verification, warranty registration, and re-order pages instantly.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Verify product authenticity</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Share manuals & tutorials</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Drive repeat purchases</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Print-ready 4K resolution</span></div>
            </div>
            <Button size="lg">Create Packaging QR Code</Button>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* Embedded Tool */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Product Packaging QR Code</h2>
              <p className="text-lg text-muted-foreground">Enter your product page URL, user manual link, or warranty registration page to create a high-resolution QR code for your packaging.</p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Brands Add QR Codes to Packaging */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Why Brands Add QR Codes to Product Packaging</h2>
            <p className="text-lg text-muted-foreground mb-6">Modern brands are using product packaging as a digital marketing channel. Here's why QR codes on packaging are becoming a standard practice:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Extended Product Experience</h3>
                <p className="text-muted-foreground">Packaging has limited space. A QR code unlocks unlimited digital content — video tutorials, detailed instructions, recipes, style guides, and more. Give customers the full product experience that print can't provide.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Anti-Counterfeiting Protection</h3>
                <p className="text-muted-foreground">Unique QR codes on each product enable customers to verify authenticity instantly. When scanned, the code confirms the product is genuine and not a counterfeit — critical for luxury goods, supplements, and electronics.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Customer Retention & Re-ordering</h3>
                <p className="text-muted-foreground">Include re-order QR codes on packaging so customers can restock with a single scan. This dramatically reduces the friction in repeat purchases and increases customer lifetime value.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Post-Purchase Engagement</h3>
                <p className="text-muted-foreground">Use packaging QR codes to direct customers to loyalty programs, review platforms, referral programs, and social media. Convert satisfied buyers into brand advocates at the point of maximum satisfaction — unboxing.</p>
              </div>
            </div>
          </section>

          {/* What to Link Packaging QR Codes To */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">What to Link Your Product Packaging QR Codes To</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><Package className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Product Page</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Link to the product page with full specifications, compatible accessories, customer reviews, and related products for cross-selling.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><ShieldCheck className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Authenticity Check</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Link to a verification page that confirms product genuineness and serial number. Builds trust and protects against counterfeit concerns.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><BarChart3 className="w-5 h-5 text-primary" /><CardTitle className="text-lg">User Manual</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Replace or supplement printed manuals with a QR code linking to a digital version, video setup guides, or interactive FAQ.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><RefreshCw className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Re-order Link</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Link directly to the add-to-cart page for consumable products. Make reordering as simple as one scan and one tap.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><CheckCircle2 className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Warranty Registration</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Simplify warranty registration by linking to a pre-filled form. Improve registration rates and capture valuable customer data.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><CheckCircle2 className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Reviews & Feedback</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Link to your review platform to encourage customers to leave feedback at peak satisfaction — right after unboxing their new product.</p></CardContent>
              </Card>
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">How to Add QR Codes to Your Product Packaging</h2>
            <div className="space-y-6">
              {[
                { step: 1, title: "Decide What to Link To", desc: "Choose the most valuable content for your customers. For a tech product, link to a setup guide. For food/supplements, link to nutritional info or recipes. For luxury items, link to an authenticity verification page." },
                { step: 2, title: "Generate Your QR Code", desc: "Paste the URL into the generator above. Customize the QR code to match your brand palette. Download the QR code in 4K Ultra resolution as a PNG file for professional printing." },
                { step: 3, title: "Integrate into Packaging Design", desc: "Provide the high-resolution QR code PNG to your packaging designer. The QR code should be placed in a high-visibility location on the packaging with adequate white space around it." },
                { step: 4, title: "Test Before Mass Production", desc: "Always scan the QR code on printed samples before full production runs. Test on multiple devices and from varying distances to confirm reliable scanning." }
              ].map(item => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">{item.step}</div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Industry Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Product QR Code Examples by Industry</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Consumer Electronics</CardTitle><CardDescription>Tech products & gadgets</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Link to video setup guides, firmware download pages, compatibility information, and product registration forms. Reduces support calls by giving users instant access to setup resources.</p>
                  <Badge variant="secondary">Setup Guides</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Food & Supplements</CardTitle><CardDescription>FMCG & nutraceuticals</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Link to full nutritional information, recipes, batch testing certificates, and ingredient sourcing details. Cater to health-conscious consumers who want full transparency about what they're consuming.</p>
                  <Badge variant="secondary">Transparency</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Luxury & Fashion</CardTitle><CardDescription>Premium brands</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Link to authenticity certificates, brand heritage stories, care instructions, and exclusive member content. QR codes add a premium digital touch to luxury packaging.</p>
                  <Badge variant="secondary">Anti-counterfeit</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Skincare & Beauty</CardTitle><CardDescription>Cosmetics & personal care</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Link to full ingredient lists, application tutorials, dermatologist recommendations, and compatible product recommendations for a complete skincare regimen.</p>
                  <Badge variant="secondary">Tutorials</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Best Practices for Product Packaging QR Codes</h2>
            <div className="space-y-4">
              {[
                { title: "Place QR Codes in Prominent Locations", desc: "Avoid hiding QR codes in corners or on the bottom of packaging. Place them on the front or back where customers naturally look. Include a short call-to-action text like 'Scan for user guide'." },
                { title: "Maintain Adequate Quiet Zone", desc: "Always leave white space (quiet zone) of at least 4 modules around the QR code. Cluttered designs surrounding the code interfere with scanning." },
                { title: "Match Brand Colors Carefully", desc: "While you can customize QR code colors, always ensure high contrast between the dark modules and background. Test extensively if using non-black colors." },
                { title: "Use 4K Resolution for Print", desc: "Always download the 4K Ultra resolution version for printing. Standard resolution QR codes pixelate on packaging and become unscannable at print size." },
                { title: "Test on Print Samples", desc: "Before mass production, print a sample and test the QR code scanning on multiple devices. Confirm the linked page loads correctly and is mobile-friendly." },
                { title: "Keep the Linked Page Updated", desc: "If you update your website structure, ensure the QR code URL still works. Broken QR codes on printed packaging are expensive to correct after production." }
              ].map(item => (
                <div key={item.title} className="flex gap-4 border rounded-lg p-4 bg-card">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div><h3 className="font-bold mb-1">{item.title}</h3><p className="text-muted-foreground text-sm">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Mistakes to Avoid</h2>
            <div className="space-y-4">
              {[
                { title: "Using Low-Resolution QR Codes", desc: "Standard resolution QR codes look pixelated when printed and may fail to scan. Always use 4K Ultra resolution for any print application." },
                { title: "Linking to Desktop-Only Pages", desc: "If customers scan with their phone and the page isn't mobile-friendly, they'll have a poor experience. Always test how your linked page looks on smartphones." },
                { title: "Not Including a Call-to-Action", desc: "QR codes without any context or instruction have low scan rates. Always include text near the QR code explaining what customers will get when they scan." },
                { title: "Forgetting to Test After Printing", desc: "Print properties can affect QR code scannability. Always test on a production sample before committing to a full print run." }
              ].map(item => (
                <div key={item.title} className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">{item.title}</h3>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Product Packaging QR Code FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold mb-3 flex gap-2 items-start"><HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />{item.question}</h3>
                  <p className="text-muted-foreground text-sm ml-7">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Linking */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Explore More QR Code Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/tools/qr-code-for-restaurant-menu"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Restaurant Menu</h3><p className="text-sm text-muted-foreground">Create touchless digital menus for restaurants</p></div></Link>
              <Link href="/tools/qr-code-for-property-listings"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Real Estate</h3><p className="text-sm text-muted-foreground">Share property listings and virtual tours</p></div></Link>
              <Link href="/tools/qr-code-for-event-tickets"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Event Tickets</h3><p className="text-sm text-muted-foreground">Generate QR codes for events and check-ins</p></div></Link>
              <Link href="/tools/qr-maker"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">Main QR Code Generator</h3><p className="text-sm text-muted-foreground">Full QR code maker with all customization options</p></div></Link>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t pt-12">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-4">
              <h2 className="text-3xl font-bold">Add QR Codes to Your Products Now</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Generate professional product packaging QR codes instantly. Free, unlimited, and ready for professional printing at 4K resolution.</p>
              <Button size="lg">Generate Product QR Code</Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
