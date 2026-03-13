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
  Store,
  Package,
  CreditCard,
  Building2,
  Megaphone,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Users,
  Zap,
  MousePointerClick,
  Mail,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for lead generation?",
    answer: "Build your signup page, lead form, or landing page — using your website, Google Forms, Typeform, or a dedicated landing page builder — then copy the URL. Paste that URL into the QR code generator above, customize the design to match your brand, and download the code at high resolution. Place it on flyers, event materials, product packaging, business cards, or any marketing material where potential leads will see it alongside a prompt like 'Scan to sign up' or 'Scan to get started.'"
  },
  {
    question: "Can QR codes collect customer data?",
    answer: "Yes. A lead generation QR code links to any form you build — a newsletter signup, a free trial form, a quote request page, or a full lead capture form with name, email, phone, and any qualifying questions you need. When a user scans the code and submits the form, their details flow directly into your CRM, email platform, or spreadsheet. The QR code itself does not store any data — it simply delivers the user to your form, where the data collection happens."
  },
  {
    question: "Are lead capture QR codes free to create?",
    answer: "Yes, completely free. Our lead generation QR code tool requires no account, no subscription, and no payment. You can create and download as many lead capture QR codes as you need at no cost, with no watermarks on downloaded codes."
  },
  {
    question: "Do users need apps to scan QR codes?",
    answer: "No. All modern iPhones and Android smartphones can scan QR codes natively using the built-in camera app. Potential leads simply point their camera at the code and are taken directly to your signup page or lead form — no download, installation, or additional steps required."
  },
  {
    question: "Can QR codes link to signup forms?",
    answer: "Yes. A lead capture QR code can link to any signup page or lead form — your website's landing page, a Google Form, a Typeform, a HubSpot form, a Mailchimp signup page, a Calendly booking page, or any other URL. Simply paste the link into the generator above and the QR code will take anyone who scans it directly to that destination."
  },
  {
    question: "How do I make my lead capture landing page work for QR code traffic?",
    answer: "Since all QR code scans come from smartphones, your landing page must be fully mobile-optimized. Use a simple, single-column layout, large tap-friendly input fields, minimal required fields (name and email is often enough for top-of-funnel leads), and a prominent submit button visible without scrolling. Include a brief, compelling headline that confirms the visitor has arrived in the right place and reminds them of the value they will receive by signing up."
  },
  {
    question: "How can I track leads generated from QR codes?",
    answer: "Add UTM tracking parameters to your landing page URL before generating the QR code — for example, ?utm_source=event-flyer&utm_medium=qr&utm_campaign=spring-launch. This lets you see in Google Analytics exactly how many visits and form submissions originated from each QR code placement. You can compare performance across different materials, events, and locations to identify your best lead generation channels."
  },
  {
    question: "Can I use different QR codes for different marketing campaigns?",
    answer: "Yes, and it is strongly recommended. Create a separate lead capture QR code for each campaign, event, or material — each with unique UTM parameters — so you can measure the performance of each placement independently. This data tells you which campaigns are generating the most leads, allowing you to optimize your marketing budget and focus on the highest-performing channels."
  }
];

export default function QRCodeForLeadCapture() {
  useSEO({
    title: "QR Code for Lead Capture – Free Lead Generation QR Code Generator | Pixocraft",
    description: "Create QR codes for lead capture forms, signup pages, and landing pages. Generate lead generation QR codes that collect customer data instantly from offline marketing campaigns. Free, no sign-up required.",
    keywords: "qr code for lead capture, lead generation qr code, qr code lead form, qr code for collecting leads, qr code marketing leads",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-lead-capture",
    ogImage: OG_IMAGES.qrMaker,
  });


  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Lead Capture – Free Lead Generation QR Code Generator | Pixocraft","description":"Create a QR code for lead capture forms and landing pages. Generate scannable lead generation QR codes for events, ads, and marketing campaigns.","url":"https://tools.pixocraft.in/tools/qr-code-for-lead-capture","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for Lead Capture","description":"Follow these steps to generate a QR code that links to your lead capture form or landing page.","step":[{"@type":"HowToStep","name":"Enter Your Lead Capture Page URL","text":"Copy the URL of your lead capture form or landing page from your CRM, marketing platform, or website."},{"@type":"HowToStep","name":"Generate the QR Code","text":"Paste the URL into the Pixocraft QR Code Generator and click Generate to create your lead capture QR code instantly."},{"@type":"HowToStep","name":"Customize for Your Campaign","text":"Match the QR code design to your campaign's visual identity and add a call-to-action logo if needed."},{"@type":"HowToStep","name":"Deploy Across Your Marketing Channels","text":"Download the QR code and add it to trade show displays, business cards, ads, product packaging, and event materials."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Lead Capture","item":"https://tools.pixocraft.in/tools/qr-code-for-lead-capture"}]})}
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
            <span className="text-foreground">QR Code for Lead Capture</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for Lead Capture – Generate QR Codes for Lead Generation
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create QR codes that connect users directly to lead forms, signup pages, and contact forms. Collect valuable customer information instantly from offline marketing campaigns.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Capture leads instantly</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for marketing campaigns</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Connect offline ads to digital forms</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <span className="hidden"><Link href="/tools/qr-maker#qr-generator"><Button size="lg" className="w-full md:w-auto">
              Create Lead Capture QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link></span>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Lead Capture QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Paste the link to your signup page, lead form, or landing page to generate a QR code users can scan to submit their details instantly.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use QR Codes for Lead Generation */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Lead Generation?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Every marketing campaign has the same fundamental goal — capturing the interest of potential customers and converting that interest into a lead. Traditional offline marketing creates awareness but rarely captures the lead in the moment. A person who sees a flyer, picks up a brochure, or passes your event booth has made an implicit expression of interest — but without a frictionless way to act on that interest immediately, the majority will never follow up. A lead generation QR code bridges that gap, turning the moment of interest into a submitted lead before the potential customer moves on.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MousePointerClick className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Offline-to-Online Lead Capture</h3>
                </div>
                <p className="text-muted-foreground">
                  A qr code for lead capture transforms any physical marketing touchpoint into a live lead collection channel. Flyers, posters, business cards, packaging, event signage, and product displays become active lead generation assets — not just passive awareness tools. Anyone who scans the code is taken directly to your signup page or lead form, where they can submit their details on the spot rather than intending to follow up later and forgetting.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Simplified Signup Process</h3>
                </div>
                <p className="text-muted-foreground">
                  The fewer steps between a potential lead and the form submission, the higher your conversion rate. A qr code lead form eliminates every navigation step — no URL to type, no search to perform, no website to navigate. One scan opens the form. This simplicity is the single most effective way to increase the proportion of interested prospects who become actual leads from your offline campaigns.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Higher Conversion Rates</h3>
                </div>
                <p className="text-muted-foreground">
                  Lead capture QR codes consistently outperform URL-based offline lead generation because they remove the barriers that cause interested prospects to abandon the process. Typing a URL is effortful and error-prone. Searching for a business after seeing an ad requires memory and motivation. Scanning a QR code takes under five seconds and requires neither. The result is a measurably higher proportion of marketing impressions that convert into submitted leads.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Interactive Marketing Campaigns</h3>
                </div>
                <p className="text-muted-foreground">
                  A lead generation QR code makes every offline marketing material interactive. Potential leads engage with your brand by scanning, not just observing. This active participation increases psychological commitment and makes the subsequent form submission feel like a natural continuation of an interaction — rather than a cold, uninvited signup request.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Lead Capture QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A QR code for collecting leads delivers measurable advantages across every offline marketing channel:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Collect Leads Quickly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A qr code marketing leads strategy delivers potential customers directly to your form at the moment of peak interest — when they are physically present, engaged with your marketing, and most likely to convert. There is no follow-up required; the lead is captured in the moment.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Improve Marketing ROI</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every piece of offline marketing — a flyer, a business card, an event stand — represents a cost. Adding a lead capture QR code converts that cost from a pure awareness spend into a measurable lead generation investment. With UTM tracking on your landing page URL, you can see exactly how many leads each piece of marketing generated.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Increase Conversion Rates</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Reducing friction at every stage of the conversion journey consistently increases the proportion of prospects who complete it. A lead generation QR code eliminates the largest source of friction in offline lead capture — the gap between seeing the marketing and submitting the form — producing conversion rates that are typically several times higher than URL-directed campaigns.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Simplify Signup Processes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A QR code for lead capture eliminates every step between interest and form submission. Scan, complete, submit — the entire process takes under two minutes for a well-designed lead form. This simplicity removes the procrastination that causes most offline marketing leads to never materialize into actual enquiries.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Capture Customer Data Instantly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every scan that converts to a form submission delivers structured customer data — name, email, phone number, and any qualifying information — directly into your CRM or email system, ready for immediate follow-up while the lead's interest is still fresh.
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
                    Universal smartphone camera scanning means any potential lead can participate, regardless of their device or technical ability. Zero download friction ensures your lead capture QR code is accessible to the widest possible audience from day one.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Lead Capture QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Lead Capture QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A lead generation QR code can be placed on virtually any marketing material — converting passive impressions into active lead submissions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Event Booths</h3>
                </div>
                <p className="text-muted-foreground">
                  Trade shows, exhibitions, and industry events are among the highest-value environments for lead capture QR codes. Visitors who stop at your booth have self-selected as interested prospects. A prominent QR code linked to a lead form or newsletter signup — displayed on a banner, tablet stand, or handout — lets them submit their details immediately, without requiring staff to manually collect business cards or fill in paper forms during busy periods.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Marketing Flyers</h3>
                </div>
                <p className="text-muted-foreground">
                  A marketing flyer with a lead capture QR code becomes a self-contained lead generation tool. Recipients who are interested in your offer scan the code immediately and submit their details — while they are holding the flyer and their interest is at its peak. This converts flyer distribution from a pure awareness activity into a measurable lead generation campaign with trackable results.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Packaging</h3>
                </div>
                <p className="text-muted-foreground">
                  A lead capture QR code on product packaging — linking to a loyalty program signup, a product registration form, or an exclusive community signup — converts a completed purchase into the beginning of a direct customer relationship. Packaging inserts with a QR code and a clear value proposition ("Scan to register your product and get exclusive offers") capture leads from customers who are already satisfied enough to have made a purchase.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Business Cards</h3>
                </div>
                <p className="text-muted-foreground">
                  A business card with a lead capture QR code linking to a "Book a free consultation" form or a newsletter signup page turns every networking exchange into a qualified lead opportunity. The person has already expressed interest by accepting the card — a QR code gives them an immediate, frictionless way to take the next step before the conversation is forgotten.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Store Displays</h3>
                </div>
                <p className="text-muted-foreground">
                  In-store displays, window signage, and counter cards with a lead generation QR code capture interested customers who may not be ready to purchase today but want to stay connected. A "Scan to join our mailing list" or "Scan to get notified when new stock arrives" prompt converts foot traffic into a warm lead database for future marketing.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Print Advertisements</h3>
                </div>
                <p className="text-muted-foreground">
                  Magazine, newspaper, and direct mail advertisements traditionally generate awareness without capturing leads directly. Adding a lead capture QR code to a print ad transforms it into an active lead generation tool — interested readers scan immediately and submit their details, converting a passive media impression into a trackable, actionable lead.
                </p>
              </div>
            </div>
          </section>

          {/* How Lead Capture QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Lead Capture QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Setting up a lead generation QR code for your campaign takes four steps:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Create a Signup Page or Lead Form</h3>
                  <p className="text-muted-foreground">
                    Build a mobile-optimized landing page or lead form using your website, Google Forms, Typeform, HubSpot, Mailchimp, or any form platform. Keep the form focused — ask only for the information you genuinely need at this stage of the funnel. For top-of-funnel lead capture, name and email address is usually sufficient. Ensure the page loads in under three seconds on mobile data and the submit button is clearly visible without scrolling on a smartphone screen.
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
                    Copy the URL of your signup page or lead form and paste it into the generator above. Add UTM tracking parameters to the URL before generating — for example, https://yoursite.com/signup?utm_source=event&utm_medium=qr&utm_campaign=spring-launch — so you can track exactly how many leads each QR code placement generates. Customize the design to match your brand and download at high resolution.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add the QR Code to Marketing Materials</h3>
                  <p className="text-muted-foreground">
                    Place the lead capture QR code on your chosen marketing materials — event signage, flyers, packaging, business cards, or print ads. Position it prominently alongside a clear CTA that states the benefit of scanning: "Scan to claim your free trial", "Scan to join our mailing list", or "Scan to request a quote." Test scan on both iPhone and Android before printing any final materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Users Scan and Submit Their Details Instantly</h3>
                  <p className="text-muted-foreground">
                    When a potential lead scans the QR code with their phone camera, they land directly on your signup page or lead form — pre-loaded and ready to complete. A well-designed mobile lead form can be completed and submitted in under two minutes. Details flow directly into your CRM or email platform for immediate follow-up — while the lead's interest is still at its peak.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Marketing Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Marketing Use Cases for Lead Capture QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                See how businesses use lead generation QR codes to grow their customer base:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter Signup Campaigns</CardTitle>
                  <CardDescription>Email marketing & content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A media brand places a lead generation QR code on posters at coffee shops, gyms, and bookshops, linking to a "Join our weekly newsletter" signup page with a lead magnet offer — a free ebook or exclusive content. Interested readers scan the code and sign up immediately. The campaign builds a high-quality email list from an engaged, self-selected audience — with no digital advertising spend required.
                  </p>
                  <Badge variant="secondary">Email List Growth</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Lead Capture Forms</CardTitle>
                  <CardDescription>Events & exhibitions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A software company exhibits at an industry conference and places a lead capture QR code on their booth banner, linking to a "Book a demo" form. Visitors who are interested scan the code and schedule a product demonstration on the spot — submitting their name, company, and email without any paper forms or manual data entry. The company exits the event with a list of pre-qualified demo bookings rather than a stack of business cards to process.
                  </p>
                  <Badge variant="secondary">Demo Bookings</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Interest Forms</CardTitle>
                  <CardDescription>E-commerce & retail</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A fashion brand launching a new collection places a lead capture QR code on in-store window displays, linking to a "Be the first to know" waitlist form. Passersby who see the launch preview scan the code and add themselves to the interest list — enabling the brand to notify interested customers the moment the collection goes live, driving a surge of purchases at launch that would be impossible without the pre-built lead list.
                  </p>
                  <Badge variant="secondary">Launch Waitlist</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales Inquiry Forms</CardTitle>
                  <CardDescription>B2B & professional services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A commercial cleaning company distributes flyers to office parks and business districts with a qr code for lead capture linking to a "Request a free quote" form. Business owners who need cleaning services scan the code during their morning commute or lunch break and submit an inquiry form — with their company name, contact details, and the size of the premises. The company receives pre-qualified sales inquiries without any cold calling required.
                  </p>
                  <Badge variant="secondary">Sales Inquiries</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Design Best Practices for Lead Capture QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to maximize the number of leads your QR code campaign generates:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Add Call-to-Action Text That States the Benefit</h3>
                  <p className="text-muted-foreground text-sm">
                    Always pair your lead capture QR code with a clear, benefit-driven CTA — "Scan to claim your free trial", "Scan to join our mailing list", or "Scan to request a free quote." Generic instructions like "Scan here" or "QR Code" generate far fewer scans. Potential leads need to know what they will get by scanning before they will take the action. The more specific and compelling the benefit, the higher your scan-to-submission rate.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast Colors</h3>
                  <p className="text-muted-foreground text-sm">
                    The QR code must maintain strong contrast between its dark modules and the background across the full range of lighting conditions where it will be displayed — outdoor events, retail stores, dimly lit venues, or bright print environments. A dark code on a white or very light background is always the most reliable choice. Avoid placing the code on colored, patterned, or photographic backgrounds that reduce contrast.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Ensure QR Codes Are Large Enough</h3>
                  <p className="text-muted-foreground text-sm">
                    Scale the QR code to the expected viewing and scanning distance: minimum 2 cm on business cards and receipts, 3–5 cm on counter cards and flyers, 6–10 cm on A4 posters, and proportionally larger on banners, event signage, or materials viewed from more than one metre. Download at high resolution (PNG) to ensure sharpness at the intended print size. A code that is too small or blurry to scan reliably generates zero leads regardless of how compelling the surrounding marketing is.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test QR Codes Before Printing</h3>
                  <p className="text-muted-foreground text-sm">
                    Before committing to print, scan the lead capture QR code on both an iPhone and an Android device. Verify that the landing page loads correctly on mobile, the form fields are functional, all required fields are present, and the submission completes without errors. Also confirm the UTM parameters are tracking correctly in your analytics platform. Testing at this stage prevents the costly mistake of distributing materials with a broken or non-converting lead capture experience.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Lead Capture QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These mistakes are the most common reasons lead generation QR code campaigns underperform:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Linking to Slow Landing Pages</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A landing page that takes more than three seconds to load on mobile data will cause the majority of QR code scanners to abandon before the form appears. Every additional second of load time reduces conversion rate significantly. Optimize your landing page for speed — compress images, minimize scripts, and use a fast hosting provider. Test page load speed on a mobile device using mobile data, not just a fast office Wi-Fi connection.
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
                    A lead generation QR code that cannot be reliably scanned generates no leads — regardless of how strong the surrounding marketing is. Size the code proportionally to the material it appears on and the distance from which it will be scanned. One failed scan attempt is enough to cause most potential leads to give up. When in doubt, make the QR code larger, not smaller.
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
                    A QR code without context generates almost no scans. Potential leads will not scan an unknown code on a flyer or poster unless they understand clearly what they will receive and why it is worth their time. A vague CTA like "Scan me" performs a fraction as well as a specific benefit statement like "Scan to get 20% off your first order" or "Scan to book your free consultation." The specificity of the benefit drives the scan rate.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Forms That Are Not Mobile Optimized</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every person who scans a lead capture QR code is on a smartphone. A lead form or landing page that is not optimized for mobile — with small input fields, horizontal layouts that require pinching to zoom, slow load times, or a submit button below the fold — will convert poorly even with a high scan rate. Test the entire conversion journey on a real smartphone on mobile data before deploying any lead capture QR code campaign.
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
              Explore more QR code generators for customer engagement and data collection:
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
                <Link href="/tools/qr-code-for-contact-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Contact Forms</span>
                </Link>{" "}
                — Create QR codes linking to contact and inquiry forms
              </p>
              <p>
                <Link href="/tools/qr-code-for-feedback-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Feedback Forms</span>
                </Link>{" "}
                — Generate QR codes for customer feedback and satisfaction forms
              </p>
              <p>
                <Link href="/tools/qr-code-for-surveys">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Surveys</span>
                </Link>{" "}
                — Create QR codes for surveys and market research forms
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
                <Link href="/tools/qr-code-for-contact-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Contact Forms</span>
                </Link>{" "}
                — Link directly to your contact form via QR code
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
                { href: "/tools/qr-code-for-contact-forms", title: "QR Code for Contact Forms", desc: "Direct customers to your contact form instantly." },
                { href: "/tools/qr-code-for-feedback-forms", title: "QR Code for Feedback Forms", desc: "Collect customer feedback via QR code." },
                { href: "/tools/qr-code-for-surveys", title: "QR Code for Surveys", desc: "Increase survey response rates with QR codes." },
                { href: "/tools/qr-code-for-email", title: "QR Code for Email", desc: "Pre-fill an email to your address when scanned." },
                { href: "/tools/qr-code-for-payments", title: "QR Code for Payments", desc: "Accept payments via QR code links seamlessly." },
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
              <h3 className="text-2xl font-bold mb-4">Create Your Lead Capture QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that helps you collect leads and grow your business instantly. Free, no sign-up required.
              </p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">
                Create Lead Capture QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
