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
  MapPin,
  Users,
  Store,
  CreditCard,
  Package,
  AlertCircle,
  ArrowRight,
  BarChart3,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for Google reviews?",
    answer: "First, find your Google review link by searching for your business on Google Maps, clicking on it, and copying the link from the 'Write a review' button. Paste that link into the QR code generator above, customize the design if needed, and download the QR code. Print it on receipts, table cards, business cards, or any customer-facing material."
  },
  {
    question: "Where can I find my Google review link?",
    answer: "Open Google Maps and search for your business name. Click on your business listing, then scroll down to find the 'Write a review' button. Click it and copy the URL from your browser's address bar — this is your direct Google review link. You can also find it in your Google Business Profile dashboard under 'Get more reviews', where Google provides a direct shareable link."
  },
  {
    question: "Can QR codes increase review counts?",
    answer: "Yes, significantly. The primary barrier to leaving a Google review is the effort required to find the business listing and navigate to the review form. A Google review QR code eliminates every step except the review itself — customers scan once and are taken directly to the review form. Businesses that display Google review QR codes consistently report a meaningful increase in review volume compared to simply asking customers verbally."
  },
  {
    question: "Are Google review QR codes free to create?",
    answer: "Yes, completely free. Our Google review QR code generator requires no account, no subscription, and no payment. You can create and download as many Google review QR codes as you need at no cost, with no watermarks on the downloaded codes."
  },
  {
    question: "Do customers need apps to scan the QR code?",
    answer: "No. All modern iPhones and Android smartphones can scan QR codes natively using the built-in camera app. Customers simply point their phone at the QR code and are taken directly to your Google review form — no additional download, no setup, and no friction required."
  },
  {
    question: "Can I use a Google review QR code on printed materials?",
    answer: "Yes. Google review QR codes work on any printed surface — receipts, business cards, menus, table cards, flyers, posters, or packaging inserts. Download the QR code at high resolution (PNG format) to ensure it prints sharply at any size. Always test scan the printed code on both iPhone and Android before mass printing."
  },
  {
    question: "How many Google reviews do I need for good local SEO?",
    answer: "While Google does not publish a specific number, businesses with 50 or more reviews tend to rank more prominently in local search results and Google Maps. More importantly, a consistent flow of recent reviews signals to Google that your business is active and trusted. A Google review QR code helps you build review volume steadily by making it easy for every satisfied customer to leave feedback."
  },
  {
    question: "Should I ask all customers to scan the Google review QR code?",
    answer: "Yes — but focus on satisfied customers. After a positive interaction, hand over a receipt or table card with the QR code and a brief verbal prompt like 'If you enjoyed your visit, we'd really appreciate a quick review — just scan this code.' Authentic reviews from real customers are the most valuable for your local SEO and reputation. Avoid incentivizing reviews, as this is against Google's policies."
  }
];

export default function QRCodeForGoogleReviews() {
  useSEO({
    title: "QR Code for Google Reviews – Free Google Review QR Code Generator | Pixocraft",
    description: "Create a Google review QR code instantly. Generate QR codes that take customers directly to your Google review page. Free, no sign-up required.",
    keywords: "google review qr code, qr code for google reviews, google review qr code generator, create qr code for google review, qr code to leave google review",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-google-reviews",
    ogImage: OG_IMAGES.qrMaker,
  });


  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Google Reviews – Free Google Review QR Code Generator | Pixocraft","description":"Create a Google review QR code instantly. Generate QR codes that take customers directly to your Google review page.","url":"https://tools.pixocraft.in/tools/qr-code-for-google-reviews","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for Google Reviews","description":"Follow these steps to generate a QR code that opens your Google review page when scanned.","step":[{"@type":"HowToStep","name":"Find Your Google Review Link","text":"Search for your business on Google Maps, click 'Write a review', and copy the URL from your browser."},{"@type":"HowToStep","name":"Paste the Link into the QR Generator","text":"Open the Pixocraft QR Code Generator and paste your Google review link into the input field."},{"@type":"HowToStep","name":"Customize the QR Code","text":"Style the QR code with your brand colors and optionally add your business logo or the Google logo to the center."},{"@type":"HowToStep","name":"Display Your QR Code","text":"Download the QR code and display it on your counter, receipts, menus, business cards, and packaging to collect more reviews."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Google Reviews","item":"https://tools.pixocraft.in/tools/qr-code-for-google-reviews"}]})}
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
            <span className="text-foreground">QR Code for Google Reviews</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for Google Reviews – Generate Google Review QR Codes Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Create QR codes that take customers directly to your Google review page. Increase positive reviews and build trust with potential customers — one scan at a time.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Get more Google reviews</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for local businesses</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Easy to print on receipts and tables</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <span className="hidden"><Link href="/tools/qr-maker#qr-generator"><Button size="lg" className="w-full md:w-auto">
              Create Google Review QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link></span>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Google Review QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Paste your Google review link to generate a QR code that customers can scan to leave a review instantly — no searching, no navigation required.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} defaultType="url" />
            </div>
          </section>

          {/* Why Google Reviews Matter */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Google Reviews Matter for Your Business</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Google reviews are one of the most powerful trust signals in modern business. For local businesses especially, a strong review profile is no longer optional — it directly influences where you appear in search results, how many customers choose you over competitors, and how much revenue you generate. A Google review QR code makes collecting those reviews effortless for every satisfied customer you serve.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Local SEO Rankings</h3>
                </div>
                <p className="text-muted-foreground">
                  Google uses the number, recency, and quality of your reviews as a ranking factor for local search results and Google Maps. Businesses with more reviews and higher ratings consistently appear higher in local search results — meaning more visibility, more clicks, and more customers. A Google review QR code helps you build the review volume needed to improve and maintain strong local rankings.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Customer Trust</h3>
                </div>
                <p className="text-muted-foreground">
                  Potential customers trust other customers far more than they trust advertising. A business with 200 Google reviews rated 4.7 stars is far more compelling than one with 10 reviews — even if the product or service is identical. A qr code to leave a Google review makes it simple for your satisfied customers to contribute to that trust signal on your behalf.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <ThumbsUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Social Proof</h3>
                </div>
                <p className="text-muted-foreground">
                  Google reviews serve as powerful social proof that influences purchasing decisions. When someone searches for a local service and sees your business with a strong review profile, they are significantly more likely to contact you or visit your store. The QR code for Google reviews gives every customer a frictionless way to contribute to this social proof after a positive experience.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Higher Conversion Rates</h3>
                </div>
                <p className="text-muted-foreground">
                  More positive Google reviews directly translate to higher conversion rates from your Google Business listing. When a potential customer is deciding between two similar businesses, reviews are frequently the deciding factor. A consistent flow of new reviews — made possible by a Google review QR code — keeps your business looking active, credible, and worth choosing.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Google Review QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A Google review QR code is one of the simplest, highest-impact tools a local business can deploy:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Increase Customer Reviews</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    By reducing the effort required to leave a review to a single scan, a Google review QR code dramatically increases the proportion of satisfied customers who actually follow through and leave feedback.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Improve Local Search Rankings</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    More reviews and a higher average rating improve your position in Google Maps and local search results — increasing your visibility to potential customers in your area who are actively searching for your type of business.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <ThumbsUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Build Brand Trust</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A growing collection of genuine customer reviews builds credibility and trust with potential new customers. Each new review is a public endorsement that increases confidence in your business and reduces hesitation at the point of purchase decision.
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
                    A qr code for Google reviews eliminates every barrier in the feedback process. Customers don't need to search for your business, find the review button, or navigate Google Maps. One scan takes them directly to the review form.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Encourage Repeat Customers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Asking a customer to leave a review is a form of engagement that reinforces the relationship. Customers who take the time to write a positive review are more likely to return, recommend the business to others, and develop loyalty over time.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Competitive Advantage</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Many local businesses still rely only on verbal prompts for reviews. A visible Google review QR code on your counter, receipts, and signage demonstrates professionalism and makes it systematically easier to accumulate reviews faster than competitors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where to Place Google Review QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where to Place Google Review QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Strategic placement of your Google review QR code at moments of peak customer satisfaction is the key to maximizing review submissions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Restaurant Receipts</h3>
                </div>
                <p className="text-muted-foreground">
                  Printing the Google review QR code on every receipt is one of the most effective placements for restaurants. The customer has just finished their meal — satisfaction is at its peak, and they have a moment to scan while waiting for their card payment to process. A brief note like "Enjoyed your meal? Scan to leave us a Google review" on the receipt converts the natural post-meal pause into a review opportunity.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Retail Counters</h3>
                </div>
                <p className="text-muted-foreground">
                  A table-stand or counter card displaying the Google review QR code near the checkout is highly visible at the moment of purchase completion. Customers who have just made a successful purchase are in a positive mindset and more likely to respond to a review prompt than at any other point in the customer journey.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Packaging</h3>
                </div>
                <p className="text-muted-foreground">
                  For product-based businesses, a Google review QR code on the packaging or a packaging insert extends the review request into the home. Customers who unbox and try a product they are happy with can scan the code and leave a review at their convenience — often resulting in more detailed, thoughtful reviews than those written immediately in-store.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Business Cards</h3>
                </div>
                <p className="text-muted-foreground">
                  Service providers — tradespeople, consultants, personal trainers, and freelancers — can include a Google review QR code on their business card. After delivering a successful service, handing over a card with the QR code and a brief mention of "a review would mean a lot" is a natural, low-pressure way to generate consistent review volume from client work.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <QrCode className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Store Windows</h3>
                </div>
                <p className="text-muted-foreground">
                  A Google review QR code displayed in a store window reaches customers who are leaving after a positive visit. A simple sign saying "Happy with your experience? Scan to leave a Google review" lets customers submit a review from the pavement while the visit is still fresh in their mind — with no need to remember to do it later.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Table Cards and Menus</h3>
                </div>
                <p className="text-muted-foreground">
                  For restaurants, cafes, and hospitality businesses, table cards with the Google review QR code keep the review request visible throughout the dining or service experience. Customers can scan at any point — after their food arrives, during dessert, or at the end of the meal — whenever they feel most satisfied.
                </p>
              </div>
            </div>
          </section>

          {/* How Google Review QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Google Review QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Setting up a Google review QR code for your business takes four simple steps:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Copy Your Google Review Link</h3>
                  <p className="text-muted-foreground">
                    Open Google Maps and search for your business name. Click your business listing, then find and click the "Write a review" button. Copy the URL from your browser's address bar — this is your direct Google review link. Alternatively, log in to your Google Business Profile dashboard and copy the "Get more reviews" short link provided there.
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
                    Paste your Google review link into the QR code generator above. Customize the design to match your brand — adjust the color, add your logo, or choose a pattern. Download the finished Google review QR code at high resolution for printing on your materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Print the QR Code on Receipts or Marketing Materials</h3>
                  <p className="text-muted-foreground">
                    Add the Google review QR code to your receipts, table cards, business cards, packaging inserts, or store signage. Place it in a visible location alongside a short prompt like "Scan to leave a Google review" or "Enjoyed your visit? A quick review helps us grow." Test scan the printed code on both iPhone and Android before distributing materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Customers Scan and Leave a Review Instantly</h3>
                  <p className="text-muted-foreground">
                    When a customer scans the Google review QR code with their phone camera, they are taken directly to your Google review form — ready to rate and write their experience. The entire journey from scan to submitted review takes under two minutes, making it realistic for even busy customers to follow through.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real Business Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Real Business Use Cases</h2>
              <p className="text-lg text-muted-foreground mb-6">
                See how different local businesses use Google review QR codes to build their reputation and attract new customers:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurants Collecting Customer Feedback</CardTitle>
                  <CardDescription>Food & beverage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A local bistro prints the Google review QR code on every receipt with the message "Loved your meal? Scan to tell Google." Review volume doubles within three months. The restaurant's Google Maps rating rises from 4.1 to 4.6 stars, and it begins appearing in the top three results for "restaurants near me" searches — driving a measurable increase in new table bookings.
                  </p>
                  <Badge variant="secondary">Local SEO Boost</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Salons Collecting Service Reviews</CardTitle>
                  <CardDescription>Beauty & wellness</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A hair salon places a Google review QR code on the reception desk and on appointment reminder cards. After each appointment, staff mention the QR code naturally when handing over the card. Happy clients scan the code while waiting for their car or on the way home — submitting reviews while the experience is still vivid. The salon accumulates reviews far faster than competitors who rely on verbal-only prompts.
                  </p>
                  <Badge variant="secondary">Review Volume</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retail Stores Collecting Product Feedback</CardTitle>
                  <CardDescription>Retail & consumer goods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A specialty food retailer includes a Google review QR code insert inside every order. Customers who enjoy their purchase scan the code at home and leave a detailed review mentioning specific products. These authentic, detailed reviews improve search rankings for the store's specific product keywords — attracting new customers who are searching for exactly those items.
                  </p>
                  <Badge variant="secondary">Product Discovery</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Local Service Providers Improving Ratings</CardTitle>
                  <CardDescription>Trades & professional services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A plumber includes a Google review QR code on every invoice and follows up with a text message linking to the same review page after completing each job. Within six months, the business goes from 8 reviews to over 60, and their Google rating improves to 4.9 stars. The improved review profile generates a consistent stream of inbound calls from local homeowners searching for a trusted plumber.
                  </p>
                  <Badge variant="secondary">Lead Generation</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Best Practices for Google Review QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to maximize the number of reviews your Google review QR code generates:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Add Call-to-Action Text</h3>
                  <p className="text-muted-foreground text-sm">
                    Always include a short, warm prompt next to the QR code — "Scan to leave a Google review", "Happy with your visit? A quick review means the world to us", or "Loved your experience? Share it on Google." A clear CTA with an emotional appeal significantly increases the number of customers who take the time to scan and review compared to a bare QR code with no context.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Place QR Codes Near Checkout Areas</h3>
                  <p className="text-muted-foreground text-sm">
                    The checkout or payment moment is the peak of a positive customer experience. A Google review QR code displayed at the point of sale — on a counter card, receipt, or payment terminal — reaches customers when their satisfaction is highest. This timing is the single biggest factor in whether a customer converts from "happy visitor" to "published reviewer."
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Ensure the QR Code Is Large Enough</h3>
                  <p className="text-muted-foreground text-sm">
                    On a printed receipt, a minimum of 2 cm x 2 cm is required for reliable scanning. On counter cards or table stands, aim for 3–5 cm to ensure customers can scan comfortably without having to hold their phone directly against the surface. Always download the QR code at high resolution to maintain sharpness at the intended print size.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast Design</h3>
                  <p className="text-muted-foreground text-sm">
                    The Google review QR code must have strong contrast between its dark modules and the light background for reliable scanning. A dark code on a white or very light background is the most reliable combination. Avoid placing the code on colored, patterned, or dark backgrounds that reduce contrast. Always test scan the final design before printing any materials.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Google Review QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These mistakes frequently prevent Google review QR codes from delivering results:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Using the Wrong Review Link</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Using a general Google Maps link to your business profile rather than the direct review link forces customers to find and click the "Write a review" button themselves — adding a step that significantly reduces completion rates. Always use the specific direct link that opens the review form immediately. Test the link in a browser before generating the QR code to confirm it opens the review form directly.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">QR Codes Too Small</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A Google review QR code printed too small — especially on receipts or small table cards — is difficult to scan without the customer having to hold their phone at an awkward angle very close to the surface. Size the QR code appropriately for the material: minimum 2 cm on receipts, 3–5 cm on counter cards and table stands.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Poor Contrast Design</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Styling the Google review QR code in colors that match your brand is fine — but if those colors reduce the contrast between the QR code modules and the background, the code will fail to scan reliably. Always prioritize scannability over aesthetics. Test with multiple devices in the actual lighting conditions where the code will be used before finalizing any printed materials.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Placing QR Codes Where Customers Cannot See Them</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A Google review QR code hidden at the bottom of a busy receipt design, tucked in a corner of the store, or positioned facing away from customer foot traffic generates virtually no scans. Place the code where customers are naturally looking — at checkout counters at eye level, prominently on receipts near the total, or on table cards placed face-up at dining tables. Visibility and prominence drive scan rates.
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
              Explore more QR code generators for your business:
            </p>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                — Create any type of QR code with full customization options
              </p>
              <p>
                <Link href="/tools/qr-code-for-business-promotion">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Business Promotion</span>
                </Link>{" "}
                — Create QR codes for business marketing and brand awareness campaigns
              </p>
              <p>
                <Link href="/tools/qr-code-for-flyers">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Flyers</span>
                </Link>{" "}
                — Generate QR codes for marketing flyers and printed handouts
              </p>
              <p>
                <Link href="/tools/qr-code-for-posters">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Posters</span>
                </Link>{" "}
                — Create QR codes for marketing posters and outdoor advertising
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
                { href: "/tools/qr-code-for-contact-forms", title: "QR Code for Contact Forms", desc: "Direct customers to your contact form instantly." },
                { href: "/tools/qr-code-for-feedback-forms", title: "QR Code for Feedback Forms", desc: "Collect customer feedback via QR code." },
                { href: "/tools/qr-code-for-surveys", title: "QR Code for Surveys", desc: "Increase survey response rates with QR codes." },
                { href: "/tools/qr-code-for-lead-capture", title: "QR Code for Lead Capture", desc: "Capture leads at events and in-store." },
                { href: "/tools/qr-code-for-business-promotion", title: "QR Code for Business Promotion", desc: "Promote your brand with branded QR codes." },
                { href: "/tools/qr-code-for-restaurant-menu", title: "QR Code for Restaurant Menu", desc: "Offer a contactless digital menu experience." },
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
              <h3 className="text-2xl font-bold mb-4">Create Your Google Review QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that lets customers leave a Google review in seconds. Free, instant, and no sign-up required.
              </p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">
                Create Google Review QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
