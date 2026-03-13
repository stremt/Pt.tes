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
  Star,
  MessageSquare,
  Store,
  Package,
  CreditCard,
  Building2,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Users,
  ClipboardList,
  Lightbulb,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for a feedback form?",
    answer: "Create your feedback form using Google Forms, Typeform, JotForm, or a form on your own website, then copy the shareable URL of that form. Paste the URL into the QR code generator above, customize the design if needed, and download the code at high resolution for printing. Add it to receipts, table cards, packaging, or signage alongside a short prompt like 'Scan to share your feedback.'"
  },
  {
    question: "Can QR codes increase survey response rates?",
    answer: "Yes, significantly. Traditional feedback methods — paper forms, email surveys, or verbal requests — suffer from high drop-off because they require customers to take an extra step later. A feedback QR code removes that delay entirely: customers scan at the moment of experience and submit feedback immediately. Businesses using feedback QR codes consistently report higher response rates than any other feedback collection method."
  },
  {
    question: "Are feedback QR codes free to create?",
    answer: "Yes, completely free. Our feedback form QR code generator requires no account, no subscription, and no payment. You can create and download as many feedback QR codes as you need at no cost, with no watermarks on downloaded codes."
  },
  {
    question: "Do users need an app to scan QR codes?",
    answer: "No. All modern iPhones and Android smartphones can scan QR codes natively using the built-in camera app. Customers simply point their phone at the QR code and are taken directly to your feedback form — no additional download, setup, or technical knowledge required."
  },
  {
    question: "Can QR codes link to Google Forms?",
    answer: "Yes. QR codes can link to any URL, including Google Forms. Simply open your Google Form, click 'Send', copy the shareable link, and paste it into the generator above. The QR code will take anyone who scans it directly to your Google Form, where they can fill in and submit their feedback on their smartphone."
  },
  {
    question: "How long should a feedback form linked to a QR code be?",
    answer: "For QR code feedback forms, shorter is always better. Aim for 3–5 questions maximum. Customers who scan a QR code on a receipt or table card typically have 1–2 minutes of patience — a long form will cause abandonment before submission. A single rating question plus one optional open text field often yields the highest completion rates. You can always segment your audience and send longer surveys separately via email."
  },
  {
    question: "Where is the best place to put a feedback QR code in a restaurant?",
    answer: "The three highest-performing placements for restaurant feedback QR codes are: printed on the bill or receipt (customers have time to scan while the card machine processes), on a small table card or tent card placed on every table (visible throughout the meal), and on the back of takeaway packaging (reaches customers at home after the experience). All three placements catch customers at a moment of peak experience recall."
  },
  {
    question: "Can I use different feedback QR codes for different locations or products?",
    answer: "Yes. You can generate a separate feedback QR code for each location, product line, or service area — each pointing to a different form or the same form with a pre-filled hidden field identifying the source. This lets you segment feedback by location or product category and identify which specific areas need improvement."
  }
];

export default function QRCodeForFeedbackForms() {
  useSEO({
    title: "QR Code for Feedback Forms – Free Feedback Form QR Code Generator | Pixocraft",
    description: "Generate QR codes for feedback forms and customer surveys. Collect customer feedback instantly from receipts, tables, and packaging. Free feedback QR code generator, no sign-up required.",
    keywords: "qr code for feedback form, feedback form qr code generator, qr code customer feedback, qr code for feedback survey, create qr code for feedback",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-feedback-forms",
    ogImage: OG_IMAGES.qrMaker,
  });


  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Feedback Forms – Free Feedback QR Code Generator | Pixocraft","description":"Create a QR code for your feedback form. Generate scannable feedback QR codes to collect customer opinions and improve your products or services.","url":"https://tools.pixocraft.in/tools/qr-code-for-feedback-forms","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for a Feedback Form","description":"Follow these steps to generate a QR code that links directly to your feedback or survey form.","step":[{"@type":"HowToStep","name":"Get Your Feedback Form URL","text":"Copy the URL of your feedback form from Google Forms, Typeform, SurveyMonkey, or your website."},{"@type":"HowToStep","name":"Paste the URL into the QR Generator","text":"Open the Pixocraft QR Code Generator, paste your feedback form URL, and click Generate."},{"@type":"HowToStep","name":"Customize and Brand Your QR Code","text":"Add brand colors and optionally include your logo or a smiley icon to signal the purpose of the QR code."},{"@type":"HowToStep","name":"Place Where Customers Will See It","text":"Download the QR code and display it on tables, product packaging, receipts, and checkout counters."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Feedback Forms","item":"https://tools.pixocraft.in/tools/qr-code-for-feedback-forms"}]})}
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
            <span className="text-foreground">QR Code for Feedback Forms</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for Feedback Forms – Collect Customer Feedback Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate QR codes that link directly to feedback forms so customers can easily share their opinions, suggestions, and experiences — without any friction or delay.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Collect customer feedback quickly</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Improve products and services</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for restaurants and retail stores</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <Link href="/tools/qr-maker#qr-generator"><Button size="lg" className="w-full md:w-auto">
              Create Feedback QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Feedback Form QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Paste the link to your feedback form or survey page to generate a QR code customers can scan instantly to share their experience.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Customer Feedback Matters */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Customer Feedback Matters for Your Business</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Customer feedback is one of the most valuable assets a business can collect — yet most businesses fail to gather enough of it consistently. Satisfied customers rarely share their experience unprompted, and dissatisfied customers often simply leave without saying anything, taking their business elsewhere. A feedback form QR code changes this dynamic entirely, making it effortless for customers to share their experience at the exact moment it matters most.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Star className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Improving Customer Experience</h3>
                </div>
                <p className="text-muted-foreground">
                  Feedback reveals what customers actually experience — not what you assume they experience. A qr code for feedback forms makes it practical to collect this data at scale, giving you a genuine picture of your customer experience across different times, staff, and locations. Businesses that systematically collect and act on feedback improve their customer experience faster than those relying on intuition or occasional complaints.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Identifying Service Problems</h3>
                </div>
                <p className="text-muted-foreground">
                  Problems that are invisible to management are visible to customers. Feedback QR codes surface issues — slow service at specific times, inconsistent product quality, confusing processes — before they escalate into negative public reviews. A customer who submits a complaint through a feedback form gives you the opportunity to resolve their issue and retain their loyalty, rather than losing them silently and permanently.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Building Customer Loyalty</h3>
                </div>
                <p className="text-muted-foreground">
                  Asking customers for their opinion demonstrates that you value their experience and are committed to improving. Customers who feel heard are more likely to return and more likely to recommend your business. A visible feedback QR code communicates openness and accountability — qualities that build trust and long-term loyalty, particularly in competitive local markets.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Making Better Business Decisions</h3>
                </div>
                <p className="text-muted-foreground">
                  Data-driven decisions consistently outperform gut-feel decisions. A steady stream of customer feedback collected through a feedback form QR code gives you real data on what is working and what is not — which products are loved, which services need work, and which aspects of the experience matter most to your customers. This intelligence directly improves the quality of your business decisions.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Feedback Form QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A QR code for your feedback form or customer survey transforms your ability to collect actionable insights:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Collect Feedback Instantly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A qr code customer feedback system captures responses at the moment of experience — when customers are most engaged, most willing to share, and their impressions are most accurate. No waiting for email surveys to be opened or paper forms to be processed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Increase Response Rates</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Feedback form QR codes eliminate the effort required to find and complete a feedback form. The simpler the process, the more customers complete it. QR-based feedback collection consistently outperforms email surveys and paper forms in response rates across all business types.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Simplify Feedback Collection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Managing paper feedback forms is time-consuming and error-prone. A feedback QR code automatically routes responses to a digital form — Google Forms, Typeform, or your own system — where they are instantly organized, searchable, and ready for analysis without any manual data entry.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Improve Customer Satisfaction</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Acting on feedback is the fastest route to improved customer satisfaction scores. Businesses that systematically collect and respond to feedback through a qr code for feedback survey consistently improve their service quality and satisfaction metrics over time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Gather Valuable Business Insights</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A consistent flow of feedback reveals trends over time — seasonal shifts in satisfaction, the impact of staff changes, the reception of new products or menu items. This ongoing intelligence gives you a competitive advantage in understanding and responding to your customers' evolving needs.
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
                    Customers scan with their built-in phone camera — no download, no account, no friction. Universal compatibility across iPhone and Android ensures the widest possible participation in your feedback program regardless of what device your customers use.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Feedback QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Feedback QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Strategic placement of your feedback QR code at natural pause points in the customer journey maximizes the number of responses you collect:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Restaurant Tables</h3>
                </div>
                <p className="text-muted-foreground">
                  A small table card or tent card with a feedback QR code is one of the most effective feedback collection tools for restaurants and cafes. Positioned face-up at every table, it gives diners the opportunity to share their experience at any point during the meal — after the food arrives, during coffee, or at the end of the visit. The table card format is unobtrusive and feels like a natural part of the dining experience rather than a formal survey request.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Packaging</h3>
                </div>
                <p className="text-muted-foreground">
                  A feedback QR code on product packaging or included as a packaging insert reaches customers at home — after they have had the chance to fully use and evaluate the product. This timing produces more detailed, considered feedback than in-store surveys. It is particularly valuable for food, beauty, and consumer goods businesses that want insight into the full product experience beyond the point of purchase.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Store Counters</h3>
                </div>
                <p className="text-muted-foreground">
                  A counter display or tabletop stand featuring a feedback QR code at the service or checkout counter reaches customers at the conclusion of their visit — when they can reflect on their entire experience. The counter format is ideal for retail stores, service businesses, and reception areas where customers naturally pause at the end of an interaction.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Receipts</h3>
                </div>
                <p className="text-muted-foreground">
                  Printing a feedback QR code on receipts is one of the most cost-effective placements available — no additional materials or printing required. Customers naturally hold and review their receipt, making the QR code highly visible. A brief note like "How was your experience? Scan to tell us" on the receipt converts the natural receipt-checking moment into a feedback collection opportunity.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Event Booths</h3>
                </div>
                <p className="text-muted-foreground">
                  Trade shows, conferences, and exhibitions produce concentrated feedback opportunities. Attendees who visit your booth can scan the feedback QR code before leaving — sharing their impression of your presentation, products, or team while the experience is immediate. This real-time feedback is invaluable for improving future event performances and identifying which elements of your pitch resonate most.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Service Completion Materials</h3>
                </div>
                <p className="text-muted-foreground">
                  For service businesses — trades, cleaning companies, beauty salons, or repair services — a feedback QR code on the invoice or job completion card captures the customer's immediate reaction to the service. A prompt like "Happy with our work? Scan to share your experience" at the moment of handover is the most effective timing for service feedback collection.
                </p>
              </div>
            </div>
          </section>

          {/* How Feedback QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Feedback QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Getting your feedback form QR code set up and collecting responses takes four steps:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Create a Feedback Form Using Google Forms or Your Website</h3>
                  <p className="text-muted-foreground">
                    Build your feedback form using Google Forms, Typeform, JotForm, SurveyMonkey, or a form embedded on your website. Keep the form short and mobile-optimized — 3–5 questions is ideal for QR code feedback. Include a rating scale question and one open text field for comments. Ensure the form loads quickly on mobile data and that the submit button is clearly visible without scrolling on a smartphone screen.
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
                    Copy the shareable URL of your feedback form and paste it into the QR code generator above. Customize the design to match your brand — adjust colors, add your logo, or choose a dot pattern. Download the finished feedback QR code at high resolution for use across all your materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add the QR Code to Marketing Materials or Receipts</h3>
                  <p className="text-muted-foreground">
                    Place the feedback QR code on your receipts, table cards, packaging, counter displays, or event materials. Position it clearly alongside a short, warm prompt — "Scan to share your feedback", "How was your experience? Scan here", or "Your opinion matters — scan to tell us." Test scan the printed code on both iPhone and Android before distributing materials to confirm it scans reliably.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Customers Scan and Submit Feedback Instantly</h3>
                  <p className="text-muted-foreground">
                    When a customer scans the feedback QR code with their phone camera, they are taken directly to your feedback form — ready to rate and comment. A well-designed, short feedback form can be completed in under two minutes, making it realistic for busy customers to participate. Responses flow automatically into your form system, organized and ready for review.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Business Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Business Use Cases for Feedback QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                See how different businesses use feedback form QR codes to improve their service and products:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Customer Satisfaction Surveys</CardTitle>
                  <CardDescription>Food & beverage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A restaurant places a feedback QR code on every table card and receipt. Diners scan after their meal and rate their food quality, service speed, and overall experience. After three months of data, the restaurant identifies that satisfaction scores drop on Friday evenings — correlating with a specific staff rota. Adjusting the schedule improves Friday evening ratings and reduces negative online reviews.
                  </p>
                  <Badge variant="secondary">Experience Optimization</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retail Store Feedback Forms</CardTitle>
                  <CardDescription>Retail & consumer goods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A retail clothing store adds a feedback QR code to its fitting room mirrors and checkout counter. Customers share feedback on product range, sizing, and staff helpfulness. The store discovers that customers consistently request a wider size range for a particular product category — and uses this data to inform the next buying season, resulting in a measurable increase in conversion for that category.
                  </p>
                  <Badge variant="secondary">Product Development</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Attendee Feedback Forms</CardTitle>
                  <CardDescription>Events & conferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A conference organizer places a feedback QR code on the back of name badges and on signs near the exit. Attendees scan and rate each session, the venue, catering, and overall organization. The high response rate — far above what email follow-up surveys typically achieve — gives the organizer specific, actionable data to improve the next event's format, speaker lineup, and logistics.
                  </p>
                  <Badge variant="secondary">Event Improvement</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Improvement Surveys</CardTitle>
                  <CardDescription>Manufacturing & e-commerce</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    An e-commerce brand includes a feedback QR code insert inside every shipment linking to a product satisfaction survey. Customers who have had time to use the product scan the code and share detailed feedback on quality, durability, and whether the product met expectations. This post-use feedback is the most valuable data point in the product development cycle — and the QR code makes it scalable to collect at volume.
                  </p>
                  <Badge variant="secondary">Product Insights</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Design Best Practices for Feedback QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to maximize the feedback response rate your QR code generates:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use Clear Call-to-Action Text</h3>
                  <p className="text-muted-foreground text-sm">
                    Always include a warm, specific prompt next to your feedback QR code — "Scan to share your feedback", "How was your experience? Scan here", or "Your opinion helps us improve — scan to tell us." A direct, benefit-focused CTA tells customers exactly what will happen when they scan and why it matters, significantly increasing participation rates over a bare QR code with no context.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Ensure the QR Code Is Large Enough</h3>
                  <p className="text-muted-foreground text-sm">
                    On a receipt, 2 cm x 2 cm is the minimum. On table cards and counter displays, aim for 3–5 cm to ensure customers can scan from a comfortable distance without needing to hold their phone directly against the surface. Download the QR code at high resolution (PNG) to maintain sharpness at the intended print size — a blurry or pixelated code will not scan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast Design</h3>
                  <p className="text-muted-foreground text-sm">
                    The feedback QR code must have strong contrast between its dark modules and the background for reliable scanning across different lighting conditions. A dark code on a white or very light background is always the safest combination. Avoid patterned backgrounds or any design choice that reduces the visual contrast of the QR code pattern itself.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test QR Codes Before Printing</h3>
                  <p className="text-muted-foreground text-sm">
                    Before printing any materials, scan the feedback QR code on both an iPhone and an Android device. Verify that the feedback form URL loads correctly, the form is fully functional on mobile, and there are no broken fields, submission errors, or page loading issues. Testing at this stage prevents the costly mistake of distributing materials with a non-functional QR code.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Feedback QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These mistakes frequently undermine feedback QR code response rates:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Linking to Complicated Feedback Forms</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A feedback form with 15 questions, complex rating scales, or multiple required fields will cause the vast majority of customers who scan the QR code to abandon the form before submitting. Customers who scan a feedback QR code on a receipt or table card have limited time and patience. Keep forms to 3–5 focused questions, make all but the most important fields optional, and design for completion in under two minutes.
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
                    A feedback QR code that is too small to scan reliably generates frustration rather than responses. Customers who try and fail to scan a code once will not try again. Size the code appropriately for the material it appears on — minimum 2 cm on receipts, 3–5 cm on counter cards and table stands, and proportionally larger for signage viewed from greater distances.
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
                    A QR code without context will not be scanned by most customers. They will not know what the code links to, why they should scan it, or what they will get. A vague label like "QR Code" or no label at all generates a fraction of the scans that a specific, benefit-driven CTA produces. Always explain clearly what happens when the code is scanned and why the customer's feedback matters.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Forms That Are Not Mobile Friendly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every single person who scans a feedback QR code is on a smartphone. A form that is designed for desktop — with small input fields, horizontal layouts that require zooming, or a submit button that is off-screen on mobile — will result in near-zero completions despite high scan rates. Always design and test your feedback form on mobile first, and confirm it is fully functional on both iPhone and Android before using it with a QR code.
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
              Explore more QR code generators for customer engagement and lead generation:
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
                <Link href="/tools/qr-code-for-business-promotion">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Business Promotion</span>
                </Link>{" "}
                — Create QR codes for business marketing and brand awareness
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
                <Link href="/tools/qr-code-for-contact-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Contact Forms</span>
                </Link>{" "}
                — Link directly to your contact form via QR code
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
                { href: "/tools/qr-code-for-contact-forms", title: "QR Code for Contact Forms", desc: "Direct customers to your contact form instantly." },
                { href: "/tools/qr-code-for-surveys", title: "QR Code for Surveys", desc: "Increase survey response rates with QR codes." },
                { href: "/tools/qr-code-for-lead-capture", title: "QR Code for Lead Capture", desc: "Capture leads at events and in-store." },
                { href: "/tools/qr-code-for-email", title: "QR Code for Email", desc: "Pre-fill an email to your address when scanned." },
                { href: "/tools/qr-code-for-sms", title: "QR Code for SMS", desc: "Pre-fill an SMS message for instant contact." },
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
              <h3 className="text-2xl font-bold mb-4">Create Your Feedback QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that lets customers share their feedback instantly. Free, no sign-up required.
              </p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">
                Create Feedback QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
