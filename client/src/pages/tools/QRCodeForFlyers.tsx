import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2,
  QrCode,
  Smartphone,
  TrendingUp,
  Target,
  Megaphone,
  Store,
  CalendarDays,
  Home,
  ShoppingBag,
  AlertCircle,
  ArrowRight,
  Printer,
  MousePointerClick,
  BarChart3,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I add a QR code to my flyer?",
    answer: "Generate your QR code using the tool above by pasting your landing page, promotion link, or website URL. Download the QR code image, then place it into your flyer design using any design software like Canva, Adobe Illustrator, or even Microsoft Word. Print the flyer with the QR code included."
  },
  {
    question: "Can QR codes increase flyer engagement?",
    answer: "Yes, significantly. QR codes bridge offline and online marketing by giving flyer recipients a direct, frictionless path to your website, offer, or social media. Studies show that flyers with QR codes see noticeably higher engagement rates compared to flyers with plain URLs because scanning is faster and easier than typing a web address."
  },
  {
    question: "Are flyer QR codes free to create?",
    answer: "Yes. Our QR code generator for flyers is completely free. There are no hidden charges, no watermarks, and no limit on how many QR codes you can generate. You can create as many flyer QR codes as you need without signing up."
  },
  {
    question: "How big should a QR code be on a flyer?",
    answer: "For a standard A5 or letter-size flyer, a QR code of at least 2.5 cm x 2.5 cm (about 1 inch x 1 inch) is recommended. For larger posters or banners, aim for 5 cm x 5 cm or more. The larger the QR code, the easier it is to scan from a distance."
  },
  {
    question: "Can QR codes on flyers link to promotions?",
    answer: "Absolutely. QR codes can link to any URL — a promotional landing page, a discount code redemption page, an event registration form, a product page, or a social media profile. This makes them perfect for marketing flyers that promote special offers, events, or limited-time deals."
  },
  {
    question: "What file format should I download the QR code in for printing?",
    answer: "Download the QR code as a PNG at the highest available resolution (2x or 4x if offered). PNG format preserves sharpness and supports transparent backgrounds, making it easy to overlay the QR code on any flyer design without a white box behind it."
  },
  {
    question: "Do I need to include a call-to-action with my flyer QR code?",
    answer: "Yes, always add a short call-to-action next to the QR code, such as 'Scan to claim your offer', 'Scan to register', or 'Scan to learn more'. Without a CTA, many people will not know why they should scan the code or what they will get. A clear CTA dramatically increases scan rates."
  },
  {
    question: "Will flyer QR codes work on all smartphones?",
    answer: "Yes. QR codes are natively supported by the camera apps on all modern iPhones and Android phones. No additional app is required. Simply point the camera at the QR code and a link appears on screen."
  }
];

export default function QRCodeForFlyers() {
  useSEO({
    title: "QR Code for Flyers – Free Marketing Flyer QR Code Generator | Pixocraft",
    description: "Create QR codes for flyers instantly. Generate marketing flyer QR codes that drive traffic, promote offers, and boost engagement. Free, no sign-up required.",
    keywords: "qr code for flyers, flyer qr code generator, marketing flyer qr code, qr code on flyers, create qr code for flyers",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-flyers",
    ogImage: OG_IMAGES.qrMaker,
  });


  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Flyers – Free Marketing Flyer QR Code Generator | Pixocraft","description":"Create QR codes for flyers instantly. Generate marketing flyer QR codes that drive traffic, promote offers, and boost engagement.","url":"https://tools.pixocraft.in/tools/qr-code-for-flyers","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for Flyers","description":"Follow these steps to generate a QR code to embed in your printed marketing flyers.","step":[{"@type":"HowToStep","name":"Choose Your Destination URL","text":"Decide what your flyer QR code should link to — a website, landing page, special offer, social media profile, or digital menu."},{"@type":"HowToStep","name":"Generate the QR Code","text":"Open the Pixocraft QR Code Generator, enter your URL, and click Generate to instantly create your QR code."},{"@type":"HowToStep","name":"Customize Colors and Style","text":"Match the QR code design to your flyer's color scheme and branding. Optionally add a logo to the center."},{"@type":"HowToStep","name":"Download and Add to Your Flyer","text":"Download the QR code in high resolution and insert it into your flyer design. Ensure it prints clearly for reliable scanning."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Flyers","item":"https://tools.pixocraft.in/tools/qr-code-for-flyers"}]})}
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
            <span className="text-foreground">QR Code for Flyers</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for Flyers – Create Marketing Flyer QR Codes Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate QR codes for flyers that direct people to your website, landing page, product offer, or social media instantly. Turn every printed flyer into an interactive marketing tool.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Drive traffic from offline marketing</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for promotional campaigns</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Easy to print on flyers</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <Link href="/tools/qr-maker#qr-generator"><Button size="lg" className="w-full md:w-auto">
              Create Flyer QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Flyer QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Paste your landing page, product page, or promotion link to generate a QR code for your marketing flyer.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use QR Codes on Flyers */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes on Flyers?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Flyers are one of the most cost-effective forms of offline marketing. But a printed flyer alone can only do so much — it shows a message and then sits idle. Adding a QR code to your marketing flyer transforms it from a passive piece of paper into an active digital gateway.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Offline to Online Marketing</h3>
                </div>
                <p className="text-muted-foreground">
                  QR codes bridge the gap between your physical flyer and your online presence. Someone who receives your flyer can be taken directly to your website, offer page, or social profile with a single scan — no need to type a URL.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MousePointerClick className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Instant Access to Websites</h3>
                </div>
                <p className="text-muted-foreground">
                  Instead of asking people to remember or manually type a long web address, a QR code on flyers lets them access your page in seconds. Instant access dramatically reduces the drop-off that happens when someone has to manually search for your website later.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Better Engagement</h3>
                </div>
                <p className="text-muted-foreground">
                  A flyer with a QR code invites action. It gives readers a clear next step — scan and discover more. This interactive element increases engagement compared to a standard flyer with only text and images.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Trackable Campaigns</h3>
                </div>
                <p className="text-muted-foreground">
                  Link your flyer QR code to a UTM-tagged URL so you can track exactly how many visits came from your flyer distribution in Google Analytics. This makes your offline marketing measurable for the first time.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Flyer QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Adding a QR code to your marketing flyers delivers a wide range of benefits for businesses of every size:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Increase Website Traffic</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Drive direct visits from people who receive your flyer. Every scan is a potential new visitor, lead, or customer sent straight to your site.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Promote Special Offers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Link the flyer QR code directly to a discount, coupon, or special promotion page. Make it easy for recipients to claim an offer instantly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <CalendarDays className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Drive Event Registrations</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Link to an event registration form so people can sign up on the spot when they see your flyer, while the event is still fresh in their mind.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Grow Social Media Followers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Point your flyer QR code to your social media profile and turn offline contacts into online followers, expanding your digital community from physical marketing.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Improve Campaign Engagement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    QR codes give flyers a measurable, interactive layer. Track scans, measure conversions, and understand which distribution areas drive the most results.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <QrCode className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">No App Required</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every modern smartphone can scan a QR code using the built-in camera app — no downloads needed. This makes flyer QR codes accessible to everyone.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Flyers with QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Flyers with QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Flyer QR codes are effective across a wide range of industries and marketing scenarios. Here are some of the most common and impactful use cases:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Retail Promotions</h3>
                </div>
                <p className="text-muted-foreground">
                  Retail stores distribute flyers in-store or on the street to promote seasonal sales, new collections, or exclusive deals. A QR code on the flyer takes shoppers directly to the sale page, reducing the steps between interest and purchase.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Restaurant Marketing</h3>
                </div>
                <p className="text-muted-foreground">
                  Restaurants hand out flyers with QR codes linking to their menu, special offers, or online ordering system. Customers can view the full menu, check daily specials, or place an order directly from the flyer.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarDays className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Event Promotions</h3>
                </div>
                <p className="text-muted-foreground">
                  Event flyers with QR codes allow recipients to register, buy tickets, or add the event to their calendar with one scan. This reduces the effort required to convert a flyer recipient into an attendee.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Home className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Real Estate Marketing</h3>
                </div>
                <p className="text-muted-foreground">
                  Property flyers include QR codes linking to virtual tours, full listing pages, agent contact forms, or mortgage calculators — turning a basic property handout into a comprehensive digital viewing experience.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <ShoppingBag className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Local Business Advertising</h3>
                </div>
                <p className="text-muted-foreground">
                  Local businesses like salons, gyms, tutors, and service providers distribute flyers with QR codes linking to booking pages, review pages, or contact forms — converting local foot traffic into online leads.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Launch Flyers</h3>
                </div>
                <p className="text-muted-foreground">
                  Brands distribute product launch flyers with QR codes linking to product demo videos, purchase pages, or early access sign-up forms — turning physical distribution into digital conversions.
                </p>
              </div>
            </div>
          </section>

          {/* How QR Codes for Flyers Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How QR Codes for Flyers Work</h2>
            <p className="text-lg text-muted-foreground">
              Creating and using a marketing flyer QR code is a straightforward four-step process:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Choose the Page You Want People to Visit</h3>
                  <p className="text-muted-foreground">
                    Decide where the flyer QR code should send people — your homepage, a promotional landing page, an event registration form, a product page, or a social media profile. Make sure the destination is mobile-friendly and loads quickly.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">2</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Generate a QR Code Using This Tool</h3>
                  <p className="text-muted-foreground">
                    Paste your URL into the QR code generator above. Customize the design if needed — adjust colors, add your logo, or select a pattern to match your brand. Then download the QR code in high resolution for printing.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add the QR Code to Your Flyer Design</h3>
                  <p className="text-muted-foreground">
                    Import the QR code image into your flyer design using Canva, Adobe Illustrator, Photoshop, or any design tool. Place it in a prominent, scannable location and add a short call-to-action like "Scan to claim your offer" next to the code.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Print and Distribute the Flyer</h3>
                  <p className="text-muted-foreground">
                    Print the flyer at high resolution and distribute it in locations where your target audience will see it. Test the QR code on both iPhone and Android before mass printing to confirm the link and scanning work correctly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Marketing Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Marketing Use Cases for Flyer QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                See how different businesses use QR codes on flyers to achieve specific marketing goals:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Discount Flyer</CardTitle>
                  <CardDescription>Food & beverage marketing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A restaurant distributes flyers near a busy street with a QR code linking to a "20% off your first order" landing page. Customers scan the code, land on the offer, and place an online order in under a minute. The QR code turns a passive flyer into a direct sales channel.
                  </p>
                  <Badge variant="secondary">Direct Sales</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Registration Flyer</CardTitle>
                  <CardDescription>Events & conferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    An event organizer hands out flyers at a trade show with a QR code linking to the event's registration page. Attendees scan on the spot and complete their registration before leaving the venue — dramatically increasing sign-up conversion rates.
                  </p>
                  <Badge variant="secondary">Event Registrations</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Launch Flyer</CardTitle>
                  <CardDescription>E-commerce & retail</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A brand distributes flyers at a local market featuring their new product. The QR code links to a product demo video and purchase page. Potential buyers get a full product experience without needing a salesperson to explain it in person.
                  </p>
                  <Badge variant="secondary">Product Discovery</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Real Estate Property Flyer</CardTitle>
                  <CardDescription>Property sales & rentals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A real estate agent posts flyers in the neighborhood with a QR code linking to a full virtual tour and detailed listing page. Interested buyers can explore the property in depth on their phone before scheduling a viewing, qualifying leads and saving everyone's time.
                  </p>
                  <Badge variant="secondary">Virtual Tours</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Flyer QR Code Design Best Practices</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these design guidelines to make sure your flyer QR code is effective, scannable, and on-brand:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use Large QR Codes</h3>
                  <p className="text-muted-foreground text-sm">
                    On a standard flyer, the QR code should be at least 2.5 cm x 2.5 cm — larger if space allows. A bigger code is easier to scan from arm's length and reduces the chance of scan failures in low-light conditions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Place QR Codes Clearly on the Flyer</h3>
                  <p className="text-muted-foreground text-sm">
                    Position the QR code in a clear, uncluttered area — ideally at the bottom of the flyer where the eye naturally settles. Avoid placing it in corners, behind other design elements, or on busy backgrounds that reduce contrast.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Add a Call-to-Action Text</h3>
                  <p className="text-muted-foreground text-sm">
                    Always include a short instruction near the QR code, such as "Scan to learn more", "Scan to claim your discount", or "Scan to register". A clear CTA tells people what to do and what they will get, significantly boosting scan rates.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast Colors</h3>
                  <p className="text-muted-foreground text-sm">
                    The QR code must have strong contrast between the dark modules and the background. A dark-colored code on a light background is ideal. Avoid light-colored codes, patterned backgrounds behind the code, or low-contrast color combinations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test Before Printing</h3>
                  <p className="text-muted-foreground text-sm">
                    Always scan the QR code on both an iPhone and an Android device before sending the flyer to print. Confirm the link opens correctly and the destination page is mobile-optimized. A broken link on thousands of printed flyers is a costly mistake.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <Printer className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Download at High Resolution</h3>
                  <p className="text-muted-foreground text-sm">
                    Download the QR code at the highest resolution available for print use. A low-resolution QR code may look pixelated when printed, reducing scannability. PNG format at 2x or 4x ensures crisp, print-ready output.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Mistakes to Avoid with Flyer QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These are the most frequent mistakes that make flyer QR codes fail — and how to avoid them:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">QR Code Too Small</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A QR code smaller than 2 cm x 2 cm on a printed flyer is very difficult to scan reliably. Small codes require the camera to be extremely close and steady, causing frustration. Always size up — a larger QR code improves scan success rate dramatically.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Low Resolution QR Code Image</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Using a low-resolution QR code image in your flyer design results in a pixelated, blurry code when printed. Scanners struggle to read pixelated codes. Always export or download the QR code at print-quality resolution before adding it to your flyer.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">No Call-to-Action Text</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A QR code sitting alone on a flyer without any instruction is often ignored. People don't know why they should scan it or what they will get. Add a short, benefit-driven CTA like "Scan to get 20% off" to motivate people to take action.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Broken Landing Page Links</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If the URL your QR code points to goes down, changes, or leads to a 404 error page, every printed flyer becomes useless. Always double-check that the destination URL is live and working before distributing flyers. Consider using a short link that you can update if the destination changes.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Real Examples */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Real Examples of QR Codes on Flyers</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Here's how scanning a flyer QR code leads to real user action:
            </p>

            <div className="space-y-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">QR Code Flyer for Restaurant Promotion</h3>
                <p className="text-muted-foreground">
                  A local Italian restaurant distributes flyers near a local market. The flyer shows a QR code with the CTA "Scan for today's special offer." A passer-by scans the code, lands on a page offering a free appetizer with any main course, taps the "Book a table" button, and makes a reservation on the spot. The restaurant acquires a new customer who would otherwise never have stopped in.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">QR Code Flyer for Event Tickets</h3>
                <p className="text-muted-foreground">
                  An event organizer posts flyers for a music festival around the city. Each flyer contains a QR code saying "Scan to buy tickets." People scan the code and are taken directly to the ticketing page where they can purchase in seconds. No need to search for the event online — the flyer becomes the direct path to purchase, increasing ticket sales from offline marketing.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">QR Code Flyer for Product Launch</h3>
                <p className="text-muted-foreground">
                  A skincare brand hands out flyers at a trade show introducing their new product line. The flyer QR code links to a product demo video and "Shop Now" button. Trade show visitors scan the code, watch the video, and purchase before leaving the event floor. The flyer turns a face-to-face interaction into an immediate online sale.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Internal Linking */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Related QR Code Tools</h2>
            <p className="text-muted-foreground mb-6">
              Explore more QR code generators for your other marketing materials:
            </p>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                — Create any type of QR code with full customization options
              </p>
              <p>
                <Link href="/tools/qr-code-for-product-packaging">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Product Marketing</span>
                </Link>{" "}
                — Add QR codes to packaging for product pages and promotions
              </p>
              <p>
                <Link href="/tools/qr-code-for-event-tickets">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Event Tickets</span>
                </Link>{" "}
                — Generate QR codes for event registration and ticket management
              </p>
              <p>
                <Link href="/tools/qr-code-for-restaurant-menu">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Restaurant Menus</span>
                </Link>{" "}
                — Create contactless digital menu QR codes for restaurants
              </p>
              <p>
                <Link href="/tools/qr-code-maker/with-logo">
                  <span className="text-primary hover:underline cursor-pointer">QR Code with Logo</span>
                </Link>{" "}
                — Add your brand logo to QR codes for flyers and marketing materials
              </p>
            </div>
          </section>


            {/* Same Bucket Cross-linking */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold mb-4">More Marketing QR Code Generators</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                <Link href="/tools/qr-code-for-posters">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Posters</span>
                </Link>{" "}
                — Turn posters into interactive digital experiences
              </p>
              <p>
                <Link href="/tools/qr-code-for-coupons">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Coupons</span>
                </Link>{" "}
                — Create scannable discount and coupon QR codes
              </p>
              <p>
                <Link href="/tools/qr-code-for-business-promotion">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Business Promotion</span>
                </Link>{" "}
                — Promote your business with QR code marketing
              </p>
              <p>
                <Link href="/tools/qr-code-for-product-marketing">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Product Marketing</span>
                </Link>{" "}
                — Market products with scannable QR codes
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
                { href: "/tools/qr-code-for-posters", title: "QR Code for Posters", desc: "Connect offline poster audiences to online content." },
                { href: "/tools/qr-code-for-coupons", title: "QR Code for Coupons", desc: "Distribute digital discount coupons via QR codes." },
                { href: "/tools/qr-code-for-business-promotion", title: "QR Code for Business Promotion", desc: "Promote your brand across all marketing materials." },
                { href: "/tools/qr-code-for-product-marketing", title: "QR Code for Product Marketing", desc: "Link QR codes to product landing pages." },
                { href: "/tools/qr-code-for-instagram", title: "QR Code for Instagram", desc: "Drive offline flyer viewers to your Instagram." },
                { href: "/tools/qr-code-for-event-tickets", title: "QR Code for Event Tickets", desc: "Add event registration QR codes to flyers." },
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


          {/* Final CTA */}
          <section className="border-t pt-12">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Create Your Flyer QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that turns your flyer into an interactive marketing tool. Free, instant, and no sign-up required.
              </p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">
                Create Flyer QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
