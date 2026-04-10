import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, AlertCircle, HelpCircle, Home, MapPin, TrendingUp, Eye } from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for a real estate listing?",
    answer: "Enter your property listing URL into the QR code generator above. This could be a link to your MLS listing, virtual tour, or property landing page. Customize the QR code with your agency branding and download it in high resolution for print."
  },
  {
    question: "Can I use QR codes on 'For Sale' signs?",
    answer: "Absolutely! QR codes on For Sale signs are one of the most effective uses in real estate. Buyers driving by can instantly scan the code to view property details, photos, pricing, and contact information without needing to write anything down."
  },
  {
    question: "What should the QR code link to for a property listing?",
    answer: "The QR code can link to your MLS listing page, a dedicated property website, a virtual tour, a PDF brochure, or a contact form. For best results, create a mobile-friendly landing page with high-quality photos, property details, and an inquiry form."
  },
  {
    question: "Do I need a different QR code for each property?",
    answer: "Yes, each property should have its own unique QR code that links to its specific listing page. This allows buyers to access property-specific information instantly without confusion."
  },
  {
    question: "How large should QR codes be on real estate signage?",
    answer: "For yard signs and For Sale boards, QR codes should be at least 5cm x 5cm for scanning from a car window. For flyers and brochures, 2.5cm x 2.5cm works well. Use the 4K Ultra download option for sharp, print-ready codes."
  },
  {
    question: "Can buyers scan the QR code to schedule a viewing?",
    answer: "Yes! You can link the QR code to an online booking page, Calendly link, or contact form that allows buyers to schedule viewings directly. This streamlines lead capture and reduces response time."
  },
  {
    question: "Are real estate QR codes free to create?",
    answer: "Yes! Our QR code generator is 100% free with no limits. You can create as many property QR codes as you need without any sign-up or payment required."
  }
];

export default function QRCodeForPropertyListings() {
  useSEO({
    title: "QR Code for Real Estate Listings | Property Listing QR Code Generator",
    description: "Create QR codes for real estate property listings, For Sale signs, and virtual tours. Generate custom property QR codes to share listing details instantly. Free real estate QR code maker.",
    keywords: "qr code for real estate, property listing qr code, real estate qr code generator, for sale sign qr code, virtual tour qr code, property qr code, real estate marketing qr",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-property-listings",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Property Listings – Free Real Estate QR Code Generator | Pixocraft","description":"Create a QR code for property listings. Generate real estate QR codes for yard signs, flyers, and brochures that open property details instantly.","url":"https://tools.pixocraft.in/tools/qr-code-for-property-listings","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for a Property Listing","description":"Follow these steps to generate a QR code that links to your property listing page.","step":[{"@type":"HowToStep","name":"Copy Your Property Listing URL","text":"Copy the URL of your property listing from your real estate website, MLS platform, or listing page."},{"@type":"HowToStep","name":"Paste the URL into the QR Generator","text":"Open the Pixocraft QR Code Generator and paste the property listing URL into the input field."},{"@type":"HowToStep","name":"Customize the QR Code","text":"Style the QR code with professional colors and add your agency logo or property address label if desired."},{"@type":"HowToStep","name":"Add to Property Marketing Materials","text":"Download the QR code and add it to yard signs, brochures, flyers, and social media posts."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Property Listings","item":"https://tools.pixocraft.in/tools/qr-code-for-property-listings"}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(generateFAQSchema(faqItems))}
      </script>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground pt-4 pb-2 max-w-4xl mx-auto px-4 md:px-8 flex-wrap">
            <Link href="/"><span className="hover:text-foreground cursor-pointer">Home</span></Link>
            <span>›</span>
            <Link href="/tools/qr-maker"><span className="hover:text-foreground cursor-pointer">QR Code Generator</span></Link>
            <span>›</span>
            <span className="text-foreground">QR Code for Property Listings</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Real Estate QR Codes</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code for Real Estate Listings – Share Property Details Instantly</h1>
            <p className="text-xl text-muted-foreground mb-8">Generate custom QR codes for property listings, For Sale signs, and virtual tours. Buyers scan and instantly view all property details, photos, and contact information on their phone.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Instant property info access</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Works on all smartphones</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Print-ready for yard signs</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">No app required to scan</span></div>
            </div>
            <span className="hidden"><Link href="/tools/qr-maker#qr-generator"><Button size="lg">Create Property QR Code</Button></Link></span>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* Embedded Tool */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Property Listing QR Code</h2>
              <p className="text-lg text-muted-foreground">Paste your property listing URL, virtual tour link, or brochure URL to create a scannable QR code for any placement.</p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} defaultType="url" />
            <p className="mt-4 text-sm text-muted-foreground">
                Use our{" "}
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                to create custom QR codes for websites, social media, marketing campaigns, and business use cases.
              </p>
            </div>
          </section>

          {/* Why Real Estate Agents Use QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Why Real Estate Agents Use QR Codes on Listings</h2>
            <p className="text-lg text-muted-foreground mb-6">QR codes are transforming how buyers discover and interact with property listings. Here's why real estate professionals are adopting QR codes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">24/7 Property Information Access</h3>
                <p className="text-muted-foreground">Buyers can scan your QR code at any time — day or night — and instantly access full property details, high-resolution photos, and floor plans without calling you or visiting an office.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Capture Drive-By Buyers</h3>
                <p className="text-muted-foreground">Buyers driving through a neighborhood can scan your For Sale sign QR code from their car and immediately get all the information they need. No missed opportunities from people who didn't grab a flyer.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Virtual Tour Integration</h3>
                <p className="text-muted-foreground">Link QR codes directly to 3D virtual tours, video walkthroughs, and Matterport scans. Out-of-town buyers can fully explore a property before deciding to visit in person.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Instant Lead Generation</h3>
                <p className="text-muted-foreground">Link QR codes to a contact form or inquiry page. Every scan becomes a potential lead with the buyer's interest already confirmed — they scanned because they're interested.</p>
              </div>
            </div>
          </section>

          {/* Benefits for Real Estate */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of QR Codes for Real Estate Marketing</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1"><Home className="w-5 h-5 text-primary" /><CardTitle className="text-lg">More Showing Requests</CardTitle></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Buyers who can instantly access all details are more likely to schedule a viewing. QR codes remove the friction from lead conversion.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1"><Eye className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Virtual Tour Access</CardTitle></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Link to 360° virtual tours and video walkthroughs directly from your signage. Showcase the property without a scheduled appointment.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1"><TrendingUp className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Faster Closings</CardTitle></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Informed buyers who've already reviewed the listing are more decisive. QR codes accelerate the buying decision process significantly.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1"><MapPin className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Location & Map Access</CardTitle></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Link QR codes to Google Maps or a property location page so buyers can easily navigate to the property or explore the neighborhood.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1"><CheckCircle2 className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Professional Branding</CardTitle></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Customize QR codes with your agency colors and logo. Branded QR codes reinforce professional image and build buyer trust.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1"><CheckCircle2 className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Reduced Print Costs</CardTitle></div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Replace thick property brochures with a single QR code. Update listing details online without reprinting materials every time something changes.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">How Real Estate QR Codes Work</h2>
            <div className="space-y-6">
              {[
                { step: 1, title: "Create Your Property Listing Page", desc: "Build a dedicated property page on your website, MLS, or use a tool like Linktree to consolidate all property links — photos, virtual tour, floor plan, pricing, and contact form." },
                { step: 2, title: "Generate the Property QR Code", desc: "Paste your listing URL into the QR code generator above. Customize the code with your agency colors, add your logo, and download in ultra-high resolution for print." },
                { step: 3, title: "Place QR Codes on All Materials", desc: "Add the QR code to yard signs, For Sale boards, flyers, print ads, social media posts, and email campaigns. Use large sizes for outdoor signage." },
                { step: 4, title: "Buyers Scan & Get Instant Access", desc: "Interested buyers scan the QR code and immediately view full property details on their phone. They can browse photos, watch the virtual tour, check the floor plan, and contact you." }
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

          {/* Placement Locations */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Where to Place QR Codes for Real Estate</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "For Sale Signs & Yard Boards", desc: "The primary placement for real estate QR codes. Buyers driving by can scan without stopping. Use weather-resistant printing and large QR codes (minimum 5cm)." },
                { title: "Property Flyers & Brochures", desc: "Include QR codes on printed flyers for open houses and letterbox drops. One scan gives buyers access to far more content than any printed brochure can contain." },
                { title: "Newspaper & Magazine Ads", desc: "Add QR codes to print advertising to bridge the gap between print and digital. Readers scan to see virtual tours and high-quality photos not possible in print." },
                { title: "Open House Displays", desc: "Place QR codes at the entrance of open houses so visitors can access full property details and floor plans on their phones throughout the viewing." },
                { title: "Property Windows & Displays", desc: "Display QR codes in office windows and display boards so passersby can access listings outside business hours when agents aren't available." },
                { title: "Social Media & Email Campaigns", desc: "Include QR codes in social media graphics and email newsletters. Online users can scan their screen to quickly save the listing URL to their phone." }
              ].map(item => (
                <div key={item.title} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Real Estate Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Real Estate QR Code Examples</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Residential Listings</CardTitle><CardDescription>Houses & apartments</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Agents place QR codes on For Sale signs linking to the MLS listing with photos, pricing, and schedule a viewing links. Buyers get instant access to all details without contacting the agent first.</p>
                  <Badge variant="secondary">Most Common</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Commercial Properties</CardTitle><CardDescription>Offices & retail spaces</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Commercial agents use QR codes on property hoardings linking to detailed floor plans, rental rates, specifications, and developer contact info for serious investors and business tenants.</p>
                  <Badge variant="secondary">High Value</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>New Developments</CardTitle><CardDescription>Off-plan & new builds</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Developers place QR codes on construction site hoardings linking to architectural renders, floor plans, price lists, and reservation forms for off-plan buyers.</p>
                  <Badge variant="secondary">Developer Use</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Rental Properties</CardTitle><CardDescription>Landlord & lettings agents</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Lettings agents use QR codes on To Let boards linking to rental listings with application forms, virtual tours, and viewing scheduling for prospective tenants.</p>
                  <Badge variant="secondary">Rental Market</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Best Practices for Real Estate QR Codes</h2>
            <div className="space-y-4">
              {[
                { title: "Use Large QR Codes for Outdoor Signage", desc: "For yard signs and For Sale boards, QR codes should be minimum 5cm x 5cm and ideally 10cm x 10cm. Buyers often scan from their car window or at a distance." },
                { title: "Always Link to Mobile-Friendly Pages", desc: "Ensure property listing pages load fast and look great on smartphones. If your website isn't mobile-optimized, consider creating a dedicated mobile landing page for each listing." },
                { title: "Include Agent Contact Details on the Page", desc: "Make it easy for buyers to contact you directly from the listing page. Include phone number, email, and a call-to-action button for booking viewings." },
                { title: "Test Your QR Codes Before Printing", desc: "Always scan the QR code on multiple phones (iPhone and Android) before printing on signs or flyers. Confirm the page loads correctly and all links work." },
                { title: "Download in Ultra High Resolution", desc: "Always use the 4K Ultra download option for print. Low-resolution QR codes pixelate when enlarged for outdoor signage and become unscannable." },
                { title: "Brand Your QR Codes with Agency Colors", desc: "Customize QR codes with your agency brand colors and logo for consistent professional presentation and buyer trust." }
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
            <h2 className="text-3xl font-bold mb-4">Common Real Estate QR Code Mistakes</h2>
            <div className="space-y-4">
              {[
                { title: "Linking to Non-Mobile Listing Pages", desc: "If the property page isn't optimized for mobile, buyers will struggle to view it. Always test how your listing looks on a smartphone before printing QR codes." },
                { title: "Printing QR Codes Too Small on Signs", desc: "Small QR codes are frustrating to scan from a distance. Outdoor signs need large codes — what looks fine on a computer screen may be impossible to scan on a yard sign." },
                { title: "Not Testing QR Codes on Multiple Devices", desc: "Some QR codes scan fine on iPhone but fail on Android (or vice versa). Always test on both platforms before deploying to signs and flyers." },
                { title: "Letting Listing URLs Expire or Change", desc: "If you change the property URL, the QR code becomes broken. Maintain stable listing URLs or use redirect links that you can update without reprinting signs." }
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
            <h2 className="text-3xl font-bold mb-4">Real Estate QR Code FAQs</h2>
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
              <Link href="/tools/qr-code-for-restaurant-menu"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Restaurant Menu</h3><p className="text-sm text-muted-foreground">Create touchless digital menus for food businesses</p></div></Link>
              <Link href="/tools/qr-code-for-product-packaging"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Product Packaging</h3><p className="text-sm text-muted-foreground">Add QR codes to products for customer engagement</p></div></Link>
              <Link href="/tools/qr-code-for-event-tickets"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Event Tickets</h3><p className="text-sm text-muted-foreground">Generate QR codes for events and check-ins</p></div></Link>
              <Link href="/tools/qr-maker"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">Main QR Code Generator</h3><p className="text-sm text-muted-foreground">Full QR code maker with all customization options</p></div></Link>
            </div>
          </section>


            {/* Same Bucket Cross-linking */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold mb-4">More Related QR Code Generators</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                <Link href="/tools/qr-code-for-restaurant-menu">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Restaurant Menu</span>
                </Link>{" "}
                — Create digital menu QR codes for restaurants
              </p>
              <p>
                <Link href="/tools/qr-code-for-product-packaging">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Product Packaging</span>
                </Link>{" "}
                — Add QR codes to product packaging
              </p>
              <p>
                <Link href="/tools/qr-code-for-event-tickets">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Event Tickets</span>
                </Link>{" "}
                — Create scannable QR codes for event tickets
              </p>
              </div>
            </section>

          {/* Related QR Code Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-2xl font-bold mb-2">Related QR Code Use Cases</h2>
              <p className="text-muted-foreground mb-6">Explore more QR code guides for your specific needs.</p>
            </div>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
            >
              {[
                { href: "/tools/qr-code-for-restaurant-menu", title: "QR Code for Restaurant Menu", desc: "Offer contactless digital menus for restaurants." },
                { href: "/tools/qr-code-for-product-packaging", title: "QR Code for Product Packaging", desc: "Add QR codes to packaging for engagement." },
                { href: "/tools/qr-code-for-event-tickets", title: "QR Code for Event Tickets", desc: "Generate scannable QR codes for event entry." },
                { href: "/tools/qr-code-for-business-promotion", title: "QR Code for Business Promotion", desc: "Promote your real estate brand via QR codes." },
                { href: "/tools/qr-code-for-contact-forms", title: "QR Code for Contact Forms", desc: "Direct buyers to your contact form instantly." },
                { href: "/tools/qr-code-for-vcard-contacts", title: "QR Code for vCard Contacts", desc: "Share your agent contact details digitally." },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className="flex flex-col gap-2 p-5 rounded-lg border bg-card hover-elevate cursor-pointer h-full"
                    data-testid={`card-related-${item.href.split("/").pop()}`}
                  >
                    <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                    <span className="text-xs text-primary font-medium mt-1">Explore &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>


          {/* CTA */}
          <section className="border-t pt-12">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-4">
              <h2 className="text-3xl font-bold">Create Your Property QR Code Now</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Generate professional real estate QR codes instantly. Free, unlimited, and print-ready at 4K resolution.</p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">Generate Property QR Code</Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
