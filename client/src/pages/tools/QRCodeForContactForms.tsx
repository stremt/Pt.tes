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
  MessageSquare,
  Store,
  CreditCard,
  Package,
  Building2,
  Megaphone,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Users,
  MousePointerClick,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for a contact form?",
    answer: "Set up your contact form or inquiry page on your website, then copy the URL of that page. Paste the URL into the QR code generator above, customize the design if needed, and download the QR code at high resolution. Place it on your business cards, flyers, store displays, or any marketing material where customers might want to reach you."
  },
  {
    question: "Can QR codes capture business leads?",
    answer: "Yes, very effectively. A contact form QR code removes the friction of finding your website and navigating to the contact page. When a potential customer scans the code on a business card, flyer, or sign, they land directly on your inquiry form — at the exact moment of interest. This dramatically increases the number of inquiries that are actually submitted versus those that are intended but never followed through."
  },
  {
    question: "Do users need apps to scan QR codes?",
    answer: "No. All modern iPhones and Android smartphones can scan QR codes natively using the built-in camera app. Customers simply point their phone at the QR code on your material and are taken directly to your contact form — no additional download or setup required."
  },
  {
    question: "Are contact form QR codes free to create?",
    answer: "Yes, completely free. Our contact form QR code generator requires no account, no subscription, and no payment. You can create and download as many QR codes as you need at no cost, with no watermarks on the downloaded codes."
  },
  {
    question: "Can QR codes link to Google Forms?",
    answer: "Yes. QR codes can link to any URL, including Google Forms, Typeform, JotForm, or any other form platform. Simply copy the shareable URL of your Google Form and paste it into the generator above. The QR code will take anyone who scans it directly to your form, where they can fill it out and submit on their phone."
  },
  {
    question: "What should my contact form include for mobile users?",
    answer: "Keep mobile contact forms short and focused — name, email, phone number, and a brief message field are typically sufficient. Use large, easy-to-tap input fields, avoid dropdowns where possible, and ensure the submit button is prominent. A form that loads in under three seconds and takes under two minutes to complete will achieve the highest completion rates from QR code scans."
  },
  {
    question: "Can I track how many people scan my contact form QR code?",
    answer: "Yes. Add UTM tracking parameters to your contact form URL before generating the QR code — for example, ?utm_source=business-card&utm_medium=qr&utm_campaign=lead-capture. This lets you see in Google Analytics exactly how many visits and form submissions originated from your QR code campaign, making your offline marketing fully measurable."
  },
  {
    question: "What is the best size for a contact form QR code on a business card?",
    answer: "On a business card, aim for a QR code of at least 1.5–2 cm x 1.5–2 cm. This is the minimum size for reliable scanning from a comfortable distance. Download the QR code at high resolution (PNG format) to ensure it prints sharply at business card scale without pixelation."
  }
];

export default function QRCodeForContactForms() {
  useSEO({
    title: "QR Code for Contact Forms – Free Contact Form QR Code Generator | Pixocraft",
    description: "Create QR codes for contact forms and inquiry pages. Generate contact form QR codes that capture leads instantly from business cards, flyers, and displays. Free, no sign-up required.",
    keywords: "qr code for contact form, contact form qr code generator, qr code for lead form, qr code for contact page, qr code for website contact form",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-contact-forms",
    ogImage: OG_IMAGES.qrMaker,
  });


  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Contact Forms – Free Contact Form QR Code Generator | Pixocraft","description":"Create a QR code for your contact form. Generate scannable contact form QR codes for business cards, flyers, and marketing materials.","url":"https://tools.pixocraft.in/tools/qr-code-for-contact-forms","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for a Contact Form","description":"Follow these steps to generate a QR code that links directly to your online contact form.","step":[{"@type":"HowToStep","name":"Copy Your Contact Form URL","text":"Copy the URL of your contact form from your website's contact page or form builder platform."},{"@type":"HowToStep","name":"Enter the URL into the QR Generator","text":"Open the Pixocraft QR Code Generator and paste your contact form URL into the input field."},{"@type":"HowToStep","name":"Customize the QR Code","text":"Adjust colors and add your business logo or icon to the center of the QR code to match your branding."},{"@type":"HowToStep","name":"Add to Marketing Materials","text":"Download the QR code and place it on business cards, brochures, event materials, and signage."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Contact Forms","item":"https://tools.pixocraft.in/tools/qr-code-for-contact-forms"}]})}
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
            <span className="text-foreground">QR Code for Contact Forms</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for Contact Forms – Generate QR Codes for Customer Inquiries
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create QR codes that instantly open your contact form when scanned. Collect inquiries, customer details, and business leads quickly from offline marketing materials.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Capture leads instantly</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for business inquiries</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Connect offline marketing to contact forms</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <span className="hidden"><Link href="/tools/qr-maker#qr-generator"><Button size="lg" className="w-full md:w-auto">
              Create Contact Form QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link></span>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Contact Form QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Paste the link to your contact form or inquiry page to generate a QR code customers can scan to reach you instantly.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} defaultType="url" />
            </div>
          </section>

          {/* Why Use QR Codes for Contact Forms */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Contact Forms?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Every business needs a reliable way to collect inquiries from potential customers. Traditional methods — printing a phone number or website URL on marketing materials — depend on customers remembering to act later. By the time they get home or back to their desk, the moment of interest has often passed. A contact form QR code captures that intent immediately, at the exact moment a potential customer decides they want to get in touch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MousePointerClick className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Instant Inquiry Access</h3>
                </div>
                <p className="text-muted-foreground">
                  A contact form QR code takes a customer from "I want to get in touch" to "form is open on my phone" in under three seconds. There is no need to remember a URL, search for your business online, or navigate through your website. The QR code delivers them directly to your inquiry page — eliminating every step that typically causes interested leads to give up before submitting.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Simplified Customer Communication</h3>
                </div>
                <p className="text-muted-foreground">
                  Many potential customers prefer submitting a form to making a phone call — especially for their first contact with a new business. A QR code for your contact page gives these customers a low-pressure, convenient way to reach you on their terms, increasing the total number of inquiries your business receives from the same volume of marketing exposure.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Offline-to-Online Lead Capture</h3>
                </div>
                <p className="text-muted-foreground">
                  Offline marketing — flyers, business cards, event materials, and signage — creates awareness but rarely captures the lead in that moment. A contact form QR code bridges that gap entirely. A person who picks up your flyer at a trade show can submit an inquiry before they leave the venue, rather than hoping they remember to email you next week.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Improved Conversion Rates</h3>
                </div>
                <p className="text-muted-foreground">
                  Reducing the steps between interest and action is the single most reliable way to increase conversion rates. A QR code for your lead form removes the navigation, the URL typing, and the searching — delivering the customer directly to the point of conversion. The result is a higher proportion of interested people who actually become inquiries compared to any other offline lead capture method.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Contact Form QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A QR code linked to your contact or inquiry page delivers measurable benefits across every channel where you market your business:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Capture Leads from Offline Marketing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Turn every business card, flyer, poster, and event display into a live lead capture tool. Anyone who sees your offline marketing can submit an inquiry on the spot, without any follow-up action required from them later.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Increase Inquiry Rates</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Making it easier to contact you directly increases the number of people who do. A QR code for your contact page removes every barrier between a potential customer's interest and their decision to reach out, resulting in more inquiries from the same marketing spend.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Simplify Customer Communication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A contact form QR code gives customers a clear, convenient channel to reach you — especially those who prefer written communication to phone calls. Meeting customers on their preferred channel increases the quality and volume of your incoming inquiries.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Improve Marketing Campaign ROI</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use UTM-tagged URLs with your contact form QR code to track exactly which marketing materials are generating inquiries. This data lets you identify your best-performing channels and optimize your marketing budget for maximum return.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Collect Customer Information Instantly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every scan that results in a form submission gives you structured customer data — name, contact details, and inquiry specifics — captured at the moment of peak interest. This information feeds directly into your CRM or email system for immediate follow-up.
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
                    Contact form QR codes are scannable on any modern smartphone using the built-in camera — no download needed. Universal compatibility ensures every potential customer can access your inquiry form regardless of their device type.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Contact Form QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Contact Form QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A QR code for your contact page or lead form can be placed on virtually any marketing material that reaches potential customers:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Business Cards</h3>
                </div>
                <p className="text-muted-foreground">
                  A business card with a contact form QR code transforms a networking exchange into an immediate lead capture opportunity. Instead of hoping someone remembers to email you later, they can scan the code during or after the conversation and submit an inquiry while the interaction is still fresh — dramatically increasing the conversion rate of business card handouts.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Store Displays</h3>
                </div>
                <p className="text-muted-foreground">
                  Retailers and service businesses place contact form QR codes on in-store displays, counter cards, or consultation area signage. Customers who have a question, want a quote, or need to arrange a service can scan the code and submit their inquiry on the spot — without needing to wait for staff availability or call a number later.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Packaging</h3>
                </div>
                <p className="text-muted-foreground">
                  Including a contact form QR code on product packaging gives customers who have questions, issues, or feedback a direct line to your support or sales team. Rather than searching for contact information, they scan and submit — reducing frustration and improving the post-purchase experience.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Event Booths</h3>
                </div>
                <p className="text-muted-foreground">
                  Trade shows, exhibitions, and industry events are prime environments for contact form QR codes. Visitors who stop at your booth can scan the code and submit their details to receive a follow-up — eliminating the need to collect paper forms or manually capture business card information during busy event periods.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Print Advertisements</h3>
                </div>
                <p className="text-muted-foreground">
                  Magazine, newspaper, and direct mail advertisements include contact form QR codes so readers can immediately submit an inquiry rather than noting down contact information to follow up later. The QR code converts a passive ad reader into an active lead at the moment of interest.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Outdoor Signage</h3>
                </div>
                <p className="text-muted-foreground">
                  Site boards, vehicle wraps, and A-boards for service businesses — plumbers, builders, landscapers, and similar trades — include contact form QR codes so passersby and potential customers can submit an inquiry instantly. Outdoor signage with a QR code works as a lead capture tool around the clock.
                </p>
              </div>
            </div>
          </section>

          {/* How Contact Form QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Contact Form QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Setting up a QR code for your contact form or lead page is a four-step process:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Create a Contact Form or Inquiry Page on Your Website</h3>
                  <p className="text-muted-foreground">
                    Set up a dedicated contact or inquiry page on your website, Google Forms, Typeform, JotForm, or any form platform. Keep the form short and mobile-friendly — name, email, phone, and a brief message field are typically sufficient. Ensure the page loads quickly on mobile since almost all QR code scans happen on smartphones.
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
                    Paste the URL of your contact form or inquiry page into the generator above. Customize the design to match your brand — adjust colors, add your logo, or choose a pattern style. Download the finished QR code at high resolution for use across your marketing materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add the QR Code to Your Marketing Materials</h3>
                  <p className="text-muted-foreground">
                    Place the contact form QR code on your business cards, flyers, posters, event materials, signage, or product packaging. Position it clearly alongside a short call-to-action like "Scan to Contact Us", "Scan to Request a Quote", or "Scan to Submit an Inquiry." Test scan the code on both iPhone and Android before printing.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Customers Scan and Submit Their Inquiry</h3>
                  <p className="text-muted-foreground">
                    When a customer scans the QR code with their phone camera, they are taken directly to your contact form — ready to fill in and submit. The entire process from scan to submitted inquiry takes under two minutes, making it realistic for potential customers to follow through immediately rather than deferring the action until later.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Business Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Business Use Cases for Contact Form QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                See how different businesses use contact form QR codes to convert offline interactions into qualified leads:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Real Estate Lead Capture</CardTitle>
                  <CardDescription>Property sales & lettings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    An estate agent places a contact form QR code on property for-sale signs and brochures linking to a "Request a viewing" inquiry form. Interested buyers scan the code on-site and submit their details immediately — while standing outside the property and at peak interest. The agent receives pre-qualified viewing requests without needing to be present at the property.
                  </p>
                  <Badge variant="secondary">Viewing Requests</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Consulting Inquiry Forms</CardTitle>
                  <CardDescription>Professional services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A business consultant includes a QR code on their business card linking to a "Book a free discovery call" form. Contacts from networking events scan the code on the spot and submit their details — converting a handshake into a scheduled consultation without any follow-up email or phone call needed to initiate the process.
                  </p>
                  <Badge variant="secondary">Consultation Bookings</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Business Contact Forms</CardTitle>
                  <CardDescription>Trades & home services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A roofing company places a contact form QR code on their vehicle signage and job site boards linking to a "Get a free quote" inquiry form. Homeowners who see the van or board scan the code, fill in their project details, and submit a quote request — generating leads passively throughout the working day without any active sales effort.
                  </p>
                  <Badge variant="secondary">Quote Requests</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Registration Forms</CardTitle>
                  <CardDescription>Events & conferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    An event organizer places a contact form QR code on event signage and conference materials linking to a "Register your interest" form for the next event. Attendees who enjoyed the current event scan the code immediately, submit their details, and are automatically added to the early notification list — converting event foot traffic into a warm lead database for future events.
                  </p>
                  <Badge variant="secondary">Interest Registration</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Design Best Practices for Contact Form QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to maximize the number of leads your contact form QR code generates:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Add Call-to-Action Text</h3>
                  <p className="text-muted-foreground text-sm">
                    Always place a clear instruction next to the contact form QR code — "Scan to Contact Us", "Scan to Request a Quote", or "Scan to Submit Your Inquiry." A benefit-driven CTA tells potential customers exactly what will happen when they scan and what they will get, which significantly increases the proportion of people who take action rather than passing by.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast QR Codes</h3>
                  <p className="text-muted-foreground text-sm">
                    The QR code must maintain strong contrast between its dark modules and the background for reliable scanning. A dark code on a white or light background is always the safest choice. Avoid placing the code on colored, patterned, or dark surfaces. Always test scan the final design on multiple devices before committing to print.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Ensure Mobile-Friendly Forms</h3>
                  <p className="text-muted-foreground text-sm">
                    Since every QR code scan happens on a smartphone, your contact form must be fully optimized for mobile. Use large input fields that are easy to tap, keep the form to the minimum number of required fields, ensure the page loads in under three seconds on mobile data, and place the submit button prominently. A poor mobile form experience will cause customers to abandon the inquiry even after successfully scanning the code.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test QR Codes Before Printing</h3>
                  <p className="text-muted-foreground text-sm">
                    Always scan the QR code on both an iPhone and an Android device before sending any materials to print. Confirm the contact form URL opens correctly, check that the form is fully functional on mobile, and verify there are no broken fields or submit errors. Discovering a problem after printing hundreds of business cards or flyers is a costly mistake to fix.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Contact Form QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These mistakes most commonly prevent contact form QR codes from generating leads effectively:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Linking to Non-Mobile Forms</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A contact form that is not optimized for mobile — with tiny input fields, desktop-scale layout, or slow load times — will cause the majority of people who scan your QR code to abandon the page before submitting. Every contact form QR code destination must be thoroughly tested and optimized for smartphone users, since that is where every scan will occur.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">QR Codes Printed Too Small</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A contact form QR code that is too small to scan reliably — particularly on business cards or small flyers — generates no leads because it cannot be read. On business cards, ensure the code is at least 1.5–2 cm x 1.5–2 cm. On larger materials such as posters or signs, scale up proportionally to the expected viewing distance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Broken Contact Form Links</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    If the URL your contact form QR code points to is broken, returns a 404 error, or leads to a page that has been moved or deleted, every scan results in a lost lead. Always verify that the destination URL is live and the form is functional before printing any materials. If your contact page URL changes in the future, update the QR code and reprint the affected materials promptly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Unclear Call-to-Action Text</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A QR code for a lead form placed on a marketing material without any surrounding context or instruction generates far fewer scans than one with a clear CTA. Potential customers will not scan an unidentified QR code unless they understand what they will get. Always pair the code with a direct instruction and the benefit of scanning — "Scan to get your free quote" or "Scan to contact our team now."
                  </p>
                </CardContent>
              </Card>
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
              Explore more QR code generators for lead generation and customer engagement:
            </p>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                — Create any type of QR code with full customization options
              </p>
              <p>
                <Link href="/tools/qr-code-for-google-reviews">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Google Reviews</span>
                </Link>{" "}
                — Generate QR codes that take customers directly to your Google review page
              </p>
              <p>
                <Link href="/tools/qr-code-for-business-promotion">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Business Promotion</span>
                </Link>{" "}
                — Create QR codes for business marketing and brand awareness
              </p>
              <p>
                <Link href="/tools/qr-code-for-flyers">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Flyers</span>
                </Link>{" "}
                — Generate QR codes for marketing flyers and printed handouts
              </p>
              <p>
                <Link href="/tools/qr-code-for-product-marketing">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Product Marketing</span>
                </Link>{" "}
                — Add QR codes to product packaging and marketing materials
              </p>
            </div>
          </section>


            {/* Same Bucket Cross-linking */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold mb-4">More Lead Generation QR Code Generators</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                <Link href="/tools/qr-code-for-google-reviews">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Google Reviews</span>
                </Link>{" "}
                — Collect more Google reviews with a single scan
              </p>
              <p>
                <Link href="/tools/qr-code-for-feedback-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Feedback Forms</span>
                </Link>{" "}
                — Collect customer feedback with a scannable QR code
              </p>
              <p>
                <Link href="/tools/qr-code-for-surveys">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Surveys</span>
                </Link>{" "}
                — Drive survey responses with QR codes
              </p>
              <p>
                <Link href="/tools/qr-code-for-lead-capture">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Lead Capture</span>
                </Link>{" "}
                — Capture leads instantly with a QR code
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
                { href: "/tools/qr-code-for-google-reviews", title: "QR Code for Google Reviews", desc: "Get more 5-star Google reviews via QR code." },
                { href: "/tools/qr-code-for-feedback-forms", title: "QR Code for Feedback Forms", desc: "Collect customer feedback via QR code." },
                { href: "/tools/qr-code-for-surveys", title: "QR Code for Surveys", desc: "Increase survey response rates with QR codes." },
                { href: "/tools/qr-code-for-lead-capture", title: "QR Code for Lead Capture", desc: "Capture leads at events and in-store." },
                { href: "/tools/qr-code-for-email", title: "QR Code for Email", desc: "Pre-fill an email to your address when scanned." },
                { href: "/tools/qr-code-for-vcard-contacts", title: "QR Code for vCard Contacts", desc: "Share your full contact details digitally." },
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
              <h3 className="text-2xl font-bold mb-4">Create Your Contact Form QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that lets customers contact your business instantly. Free, no sign-up required.
              </p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">
                Create Contact Form QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
