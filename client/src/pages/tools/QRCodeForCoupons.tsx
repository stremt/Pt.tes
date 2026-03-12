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
  Tag,
  ShoppingCart,
  Gift,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Zap,
  MousePointerClick,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for coupons?",
    answer: "Create a landing page or URL for your coupon or discount offer, then paste that link into the QR code generator above. Customize the design if needed, download the QR code at high resolution, and add it to your promotional materials — flyers, posters, packaging, or digital ads. Customers scan the code and land directly on your offer page."
  },
  {
    question: "Can QR codes increase coupon redemption rates?",
    answer: "Yes, significantly. Traditional coupons require customers to cut them out, remember to bring them, or manually type a promo code. A QR code coupon eliminates all of that friction — customers scan once and the discount is immediately accessible. Lower friction means higher redemption rates across all channels."
  },
  {
    question: "Are QR code coupons free to create?",
    answer: "Yes, completely free. Our coupon QR code generator requires no account, no subscription, and no payment. You can generate unlimited discount QR codes at no cost, with no watermarks on the downloaded codes."
  },
  {
    question: "Do customers need an app to scan coupon QR codes?",
    answer: "No app is needed. All modern iPhones and Android smartphones can scan QR codes directly using the built-in camera app. Customers simply point their phone camera at the QR code and are taken to the coupon or discount page instantly — no downloads, no setup required."
  },
  {
    question: "Can QR codes link directly to discount pages?",
    answer: "Yes. QR codes can link to any URL, including dedicated discount landing pages, coupon redemption pages, cart pages with a pre-applied promo code, or any page that delivers the offer to the customer. You can even use tracking parameters in the URL to measure how many people scan and redeem the coupon."
  },
  {
    question: "What should I put on my coupon landing page?",
    answer: "Your coupon landing page should clearly display the offer (e.g., '20% off your next order'), the discount code if applicable, an expiry date, and a prominent call-to-action button. The page must be mobile-optimized since most QR code scans happen on smartphones. A slow or confusing landing page will cause customers to abandon the offer before redeeming it."
  },
  {
    question: "How long do coupon QR codes stay active?",
    answer: "The QR code itself does not expire — it will always point to the URL you entered. The coupon's availability depends entirely on whether that URL is still live and the offer is still valid. If you need to update or expire an offer, update or redirect the destination page rather than reprinting the QR code."
  },
  {
    question: "Can I track how many people scan my coupon QR code?",
    answer: "Yes. Add UTM parameters to your coupon URL (e.g., ?utm_source=flyer&utm_medium=qr&utm_campaign=summer-sale) before generating the QR code. This lets you track scans and conversions from each QR code campaign in Google Analytics, giving you a clear picture of your coupon's performance."
  }
];

export default function QRCodeForCoupons() {
  useSEO({
    title: "QR Code for Coupons – Free Discount & Promo QR Code Generator | Pixocraft",
    description: "Create QR codes for coupons and discount offers instantly. Generate coupon QR codes for retail, restaurants, and online promotions. Free, no sign-up required.",
    keywords: "qr code for coupons, coupon qr code generator, discount qr code, promo code qr generator, qr code for discount offers",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-coupons",
    ogImage: OG_IMAGES.qrMaker,
  });

  const scrollToTool = () => {
    document.getElementById("qr-tool-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(generateFAQSchema(faqItems))}
      </script>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for Coupons – Create Discount &amp; Promo QR Codes Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate QR codes that unlock exclusive coupons, discounts, and promotional offers when scanned. Perfect for retail stores, restaurants, and online businesses.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Increase coupon redemption rates</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for retail promotions</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Easy to add on flyers and packaging</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto" onClick={scrollToTool}>
              Create Coupon QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Coupon QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Paste the link to your coupon page, promotional offer, or discount landing page to generate a scannable QR code instantly.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use QR Codes for Coupons */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Coupons?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Traditional coupon marketing has a well-known problem: friction. Paper coupons get lost, promo codes are forgotten, and customers rarely bother typing long discount URLs. QR codes eliminate every one of those barriers. A coupon QR code turns a simple scan into an instant discount — no clipping, no typing, no searching.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Faster Coupon Redemption</h3>
                </div>
                <p className="text-muted-foreground">
                  A QR code coupon is redeemed in seconds. Customers point their camera, scan, and land directly on the discount page or have the promo code applied automatically. Compared to manually entering coupon codes or presenting paper coupons, the reduction in friction dramatically increases the number of customers who actually complete a redemption.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Offline-to-Online Promotions</h3>
                </div>
                <p className="text-muted-foreground">
                  Coupon QR codes bridge physical marketing materials with online offers. A flyer, poster, or product package can carry a QR code that takes the customer directly to your e-commerce store, discount landing page, or checkout with the coupon pre-applied — turning offline advertising into online sales.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MousePointerClick className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Instant Discount Access</h3>
                </div>
                <p className="text-muted-foreground">
                  When a customer sees a "20% off" offer on a poster or flyer, the natural next step is to try to find it. A QR code makes that next step immediate. One scan delivers the discount instantly, while the customer is still standing in front of your advertising — at peak interest and intent.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Interactive Marketing Campaigns</h3>
                </div>
                <p className="text-muted-foreground">
                  A QR code transforms a passive coupon into an interactive campaign. You can personalize the landing page based on the source of the scan, run A/B tests on different offers, and use UTM tracking to measure which channels deliver the best coupon redemption rates — turning coupon marketing into a data-driven strategy.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Coupon QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Coupon QR codes give businesses a smarter, more measurable way to run discount and promotional campaigns:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Increase Redemption Rates</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Removing friction from the redemption process means more customers actually use the coupon. A scan is faster and easier than any alternative, resulting in higher redemption rates from the same distribution volume.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Tag className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Promote Limited-Time Offers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add urgency to flash sales and time-sensitive promotions. A QR coupon code on a poster or handout lets customers claim the deal immediately — before the offer expires and while their motivation is highest.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Track Campaign Performance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Use UTM-tagged coupon URLs to track exactly how many scans, visits, and conversions each QR code campaign generates. Turn offline coupon marketing into a fully measurable channel.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Drive Online Sales</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Link coupon QR codes directly to a product page or checkout with the discount pre-applied. Reduce the steps between seeing an offer and completing a purchase, increasing your online conversion rate.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Store className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Boost In-Store Engagement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Place coupon QR codes on in-store signage, shelf labels, and receipts. Shoppers can scan for instant discounts, loyalty rewards, or exclusive member offers while they are already in your store and ready to buy.
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
                    Customers scan discount QR codes using their phone's built-in camera — no additional app download needed. Maximum accessibility means maximum redemption potential across your entire customer base.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Coupon QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Coupon QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Discount QR codes fit naturally into a wide range of promotional materials and marketing channels:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Retail Store Promotions</h3>
                </div>
                <p className="text-muted-foreground">
                  Retail stores place coupon QR codes on window posters, shelf displays, receipts, and in-store signage. Shoppers scan to unlock member discounts, clearance offers, or loyalty points. The instant redemption experience keeps customers engaged and incentivizes repeat visits.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Restaurant Discount Flyers</h3>
                </div>
                <p className="text-muted-foreground">
                  Restaurants distribute flyers and table cards with coupon QR codes linking to a free appetizer, a percentage discount, or a meal deal page. Customers scan at the table or when they receive the flyer and can redeem the offer during their current visit or book a return visit.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Tag className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Packaging Promotions</h3>
                </div>
                <p className="text-muted-foreground">
                  Brands print coupon QR codes on product packaging to offer discounts on the customer's next purchase, link to a loyalty reward program, or promote companion products. Packaging QR coupons turn every sale into a repeat purchase opportunity.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <ShoppingCart className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Shopping Mall Advertisements</h3>
                </div>
                <p className="text-muted-foreground">
                  Mall advertising boards and banner stands display coupon QR codes for nearby stores or food court promotions. Shoppers scan while passing and redeem the offer immediately in-store — converting foot traffic into customers with minimal effort.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Seasonal Sale Posters</h3>
                </div>
                <p className="text-muted-foreground">
                  Holiday and seasonal sale campaigns use large-format posters with promo code QR codes. Black Friday, Christmas, or back-to-school promotions displayed in public spaces drive high scan volumes when combined with a compelling offer and a clear call-to-action.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Direct Mail and Inserts</h3>
                </div>
                <p className="text-muted-foreground">
                  Printed mail campaigns and product inserts include coupon QR codes that link to exclusive online-only offers. Recipients scan the code from home and are taken directly to the discount page, bridging direct mail with e-commerce in a seamless customer journey.
                </p>
              </div>
            </div>
          </section>

          {/* How Coupon QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Coupon QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Setting up a coupon QR code is a straightforward four-step process:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Create a Coupon Landing Page or Offer Link</h3>
                  <p className="text-muted-foreground">
                    Set up a dedicated landing page for your discount offer — this could be a page on your website, a checkout page with a discount pre-applied, or a promotional page on your e-commerce platform. Make sure the page is mobile-optimized, loads quickly, and clearly displays the offer along with a call-to-action button.
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
                    Paste your coupon page URL into the QR code generator above. Customize the design to match your brand — adjust colors, add your logo, or choose a pattern. Download the finished QR code at high resolution, ready for use in your promotional materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add the QR Code to Your Promotional Materials</h3>
                  <p className="text-muted-foreground">
                    Place the coupon QR code on flyers, posters, packaging, receipts, in-store signage, or direct mail pieces. Position it prominently near your offer headline and add a short CTA like "Scan to claim your discount" to guide customers to take action.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Customers Scan the Code to Access the Discount</h3>
                  <p className="text-muted-foreground">
                    When a customer scans the QR code with their phone camera, they are taken directly to your discount page. The coupon is immediately available for redemption — in-store, online, or both. No searching, no typing, no confusion. Just an instant connection between your offer and your customer.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Coupon Marketing Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Coupon Marketing Use Cases</h2>
              <p className="text-lg text-muted-foreground mb-6">
                See how businesses use discount QR codes across different marketing campaigns:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Discount Promotions</CardTitle>
                  <CardDescription>Food & beverage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A pizza restaurant prints a coupon QR code on takeaway bags linking to a "Buy one, get one free" offer valid on the next order. Customers scan the code at home after their meal, land on the offer page, and place another order the same week. A single QR code turns each delivery into a customer retention tool.
                  </p>
                  <Badge variant="secondary">Repeat Orders</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retail Clearance Sales</CardTitle>
                  <CardDescription>Retail & fashion</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A clothing retailer posts in-store signage with a QR code linking to their clearance sale page with a further 10% off for online purchases. Shoppers in-store scan the code, browse additional clearance items online, and complete their purchase — combining physical retail with e-commerce conversion.
                  </p>
                  <Badge variant="secondary">Clearance Sales</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Black Friday Promotions</CardTitle>
                  <CardDescription>Seasonal campaigns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    An electronics retailer distributes flyers with a Black Friday coupon QR code in the weeks before the sale. Customers scan the code, land on an early access offer page, and add items to their wishlist. On Black Friday, the QR code is updated to the live sale — keeping the same printed flyers active throughout the campaign.
                  </p>
                  <Badge variant="secondary">Seasonal Deals</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>E-Commerce Product Discounts</CardTitle>
                  <CardDescription>Online retail</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    An e-commerce brand adds a promo code QR code to product inserts in their packaging. Customers who receive an order scan the code, land on a "15% off your next order" page, and are far more likely to reorder than customers who receive no follow-up offer. The packaging becomes an active marketing channel.
                  </p>
                  <Badge variant="secondary">Reorder Incentive</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Coupon QR Code Design Best Practices</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to make your coupon QR codes as effective as possible:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use Bold Call-to-Action Text</h3>
                  <p className="text-muted-foreground text-sm">
                    Place a short, action-oriented CTA directly next to the QR code — "Scan to get 20% off", "Scan to claim your free drink", or "Scan to unlock your discount." The CTA tells customers exactly what they will get when they scan, which is the single biggest factor in driving scan rates on coupon materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Place QR Code Near Offer Details</h3>
                  <p className="text-muted-foreground text-sm">
                    Position the discount QR code adjacent to your offer headline and key details — not in a corner or separated from the main message. When the code sits next to the offer, customers make an immediate connection between the deal and the action required to claim it.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Ensure High Contrast Colors</h3>
                  <p className="text-muted-foreground text-sm">
                    The QR code needs strong contrast between the dark modules and the background to scan reliably. A dark QR code on a white or light-colored background is the safest choice. Always test scan your code before printing — low contrast codes look fine to the eye but may fail to scan under real conditions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use Large QR Codes on Posters</h3>
                  <p className="text-muted-foreground text-sm">
                    For in-store or outdoor coupon posters, make the QR code at least 3–5 cm x 3–5 cm. For smaller formats like flyers and packaging inserts, a minimum of 2.5 cm x 2.5 cm ensures the code is scannable. A larger code is always better — it scans faster and from a greater distance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Coupon QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These mistakes are the most common reasons coupon QR codes fail to deliver results:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Expired Coupon Links</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    One of the most damaging mistakes in QR coupon marketing is leaving printed materials in circulation after an offer has ended. If a customer scans a discount QR code and lands on a "this offer has expired" page, it creates frustration and damages trust. Always set an expiry date on the destination page and ensure the page is updated when the offer ends — or redirect to a new current offer to keep the QR code useful.
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
                    A discount QR code printed at too small a size — particularly on posters or shelf displays — cannot be reliably scanned from a normal distance. Customers won't crouch down or hold their phone inches from the surface to scan a tiny code. Size the QR code appropriately for the viewing distance of your promotional material.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">No Clear Discount Message</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A QR code without a clear explanation of what the customer will get when they scan it is routinely ignored. People are cautious about scanning unknown codes. Displaying the offer clearly — "Scan for 25% off your order" — removes hesitation and gives customers a compelling reason to act immediately.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Linking to Non-Mobile Pages</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Almost every coupon QR code is scanned on a smartphone. If the destination page is not fully mobile-optimized — with readable text, easy-to-tap buttons, and fast load times — customers will abandon it before redeeming the offer. Always test your coupon landing page on mobile before printing or publishing any QR code materials.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Real Examples */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Real Examples of Coupon QR Codes in Action</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Here's how coupon QR codes create real customer actions and measurable marketing results:
            </p>

            <div className="space-y-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">QR Code on Retail Poster for 20% Discount</h3>
                <p className="text-muted-foreground">
                  A sports retailer displays a window poster advertising a weekend sale with the headline "20% off all footwear" and a QR code with the CTA "Scan to shop the sale now." A shopper passing by scans the code with their phone camera, lands on the sale category page with the discount automatically applied, and adds items to their cart. They complete the purchase at home later that day — a conversion driven entirely by a window poster and a single scan.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">QR Code on Product Packaging for Loyalty Coupons</h3>
                <p className="text-muted-foreground">
                  A skincare brand includes a promo code QR code on their product packaging linking to a loyalty program sign-up page that rewards customers with points for each purchase. New customers scan the code after unboxing, join the loyalty program, and receive an immediate 10% off coupon for their next order. The packaging insert converts a first-time buyer into a returning customer with a single scan.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-2">QR Code on Restaurant Flyer for Free Drink Coupon</h3>
                <p className="text-muted-foreground">
                  A bar distributes flyers in the local area with a QR code saying "Scan for a free drink on your first visit." Recipients scan the code and are shown a digital coupon they can present at the bar. The offer creates urgency and a clear reason to visit. The bar can track how many flyers resulted in actual visits by counting coupon redemptions — making the campaign fully measurable.
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
              Explore more QR code generators for your marketing campaigns:
            </p>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                — Create any type of QR code with full customization options
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
                — Create QR codes for marketing posters and public advertising
              </p>
              <p>
                <Link href="/tools/qr-code-for-product-packaging">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Product Marketing</span>
                </Link>{" "}
                — Add QR codes to packaging for product pages and promotions
              </p>
              <p>
                <Link href="/tools/qr-code-maker/with-logo">
                  <span className="text-primary hover:underline cursor-pointer">QR Code with Logo</span>
                </Link>{" "}
                — Add your brand logo to coupon QR codes for professional marketing materials
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="border-t pt-12">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Create Your Coupon QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that lets customers instantly unlock discounts and promotional offers. Free, instant, and no sign-up required.
              </p>
              <Button size="lg" onClick={scrollToTool}>
                Create Coupon QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
