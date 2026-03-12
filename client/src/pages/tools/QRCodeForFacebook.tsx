import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Users,
  Smartphone,
  TrendingUp,
  Store,
  Megaphone,
  LayoutGrid,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for my Facebook page?",
    answer:
      "Go to your Facebook page, copy the URL from the browser address bar (it will be in the format facebook.com/yourpagename or facebook.com/profile.php?id=...), then paste it into the QR code generator above. Customize the design, then download in 4K Ultra resolution for printing.",
  },
  {
    question: "Can people scan Facebook QR codes without an app?",
    answer:
      "No special app is needed to scan the QR code — any smartphone camera will read it instantly. Once scanned, the phone will open the Facebook page in the Facebook app (if installed) or in the browser. Most people who see a Facebook QR code will have the app installed already.",
  },
  {
    question: "Are Facebook QR codes free to create?",
    answer:
      "Yes, completely free. Our QR code generator has no subscription, no sign-up, and no limits. You can generate as many Facebook QR codes as you need and download them in 4K Ultra resolution at no cost.",
  },
  {
    question: "Can I print QR codes for Facebook marketing?",
    answer:
      "Absolutely. Download the QR code in 4K Ultra resolution for crisp, print-ready quality at any size. Print on business cards, posters, packaging, banners, menus, receipts, and any other marketing materials for offline Facebook follower acquisition.",
  },
  {
    question: "How do QR codes help grow Facebook followers?",
    answer:
      "QR codes eliminate the friction of manually searching for your Facebook page. Someone who encounters your QR code in a store, on packaging, or at an event simply scans it and lands directly on your page — ready to like and follow with one tap. This turns every physical touchpoint into a follower opportunity.",
  },
  {
    question: "What if my Facebook page URL is long or complex?",
    answer:
      "QR codes can encode any URL regardless of length or complexity. However, for best practice, claim a custom Facebook vanity URL (facebook.com/yourbusinessname) from your Page Settings. This also makes the URL easier to share verbally alongside the QR code.",
  },
  {
    question: "Can I link to a Facebook event instead of a page?",
    answer:
      "Yes! You can create a QR code for any Facebook URL — a Page, Profile, Group, or specific Event. Simply copy the URL of the Facebook event page and paste it into the generator. This is perfect for promoting events on physical materials like posters and flyers.",
  },
];

export default function QRCodeForFacebook() {
  useSEO({
    title: "QR Code for Facebook Page | Facebook QR Code Generator – Free",
    description:
      "Create a QR code for your Facebook page or profile instantly. Generate a Facebook QR code for business cards, posters, packaging, and store displays. Grow followers offline. Free Facebook QR code maker.",
    keywords:
      "facebook qr code generator, qr code for facebook page, facebook profile qr code, facebook page qr code generator, create qr code for facebook",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-facebook",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(generateFAQSchema(faqItems))}
      </script>

      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Social Media QR Codes
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for Facebook – Create Facebook Page QR Codes Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate a QR code that links directly to your Facebook page or
              profile. Perfect for businesses, creators, and brands that want to
              grow their Facebook audience through offline and print marketing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Grow Facebook followers faster
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Share your page instantly — no searching required
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Works on posters, packaging, and business cards
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  No app required to scan
                </span>
              </div>
            </div>
            <Button size="lg">Create Facebook QR Code</Button>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* Embedded Tool */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Generate Your Facebook Page QR Code
              </h2>
              <p className="text-lg text-muted-foreground">
                Paste your Facebook page or profile link below to generate a QR
                code people can scan to visit your page instantly — no manual
                search needed.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Example:{" "}
                <code className="bg-muted px-2 py-0.5 rounded text-xs">
                  https://facebook.com/yourpage
                </code>
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use Facebook QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Use QR Codes to Grow Your Facebook Audience
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Growing a Facebook following organically takes time. QR codes give
              you a shortcut by converting every in-person and print interaction
              into a direct visit to your Facebook page. Here's why thousands of
              businesses rely on Facebook QR codes for offline growth:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Offline Marketing</h3>
                <p className="text-muted-foreground">
                  Facebook is a digital channel, but the best follower
                  acquisition often happens offline — at your store, on your
                  packaging, or at an event. QR codes bridge that gap,
                  converting physical encounters into Facebook page visits and
                  follows without any friction.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Instant Page Access
                </h3>
                <p className="text-muted-foreground">
                  Scanning a Facebook QR code opens your page directly in the
                  Facebook app or browser within seconds. There's no need for
                  someone to open Facebook, use the search bar, scroll through
                  results, and find the right page. One scan, instant access,
                  one tap to like and follow.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Easy Profile Sharing
                </h3>
                <p className="text-muted-foreground">
                  Business names with common words are hard to find in Facebook
                  search — there may be hundreds of results. A QR code removes
                  the ambiguity entirely. Your customers and audience always
                  land on the exact right page, no confusion, no competitors in
                  the way.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Faster Follower Growth
                </h3>
                <p className="text-muted-foreground">
                  Every sign, flyer, receipt, packaging insert, and business
                  card is a missed follower opportunity without a QR code. With
                  one, each of those touchpoints actively works to grow your
                  Facebook audience around the clock, even when you're not
                  actively running ads or posting content.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Benefits of Facebook QR Codes for Businesses
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Increase Page Followers
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Convert customers, event attendees, and passersby into
                    Facebook followers with zero advertising spend. Every scan
                    is a warm lead already interested in your brand.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Drive Page Traffic
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Increase visits to your Facebook page without paid
                    promotion. More visitors means more organic reach,
                    engagement, and potential customers seeing your posts.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Megaphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Promote Events & Posts
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Link QR codes directly to a specific Facebook event, offer
                    post, or product announcement. Drive targeted traffic to
                    your most important content at the right moment.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Store className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Easy Offline Sharing
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Anywhere you have physical presence — your store, a market
                    stall, or a trade stand — a QR code turns that location
                    into an active Facebook follower acquisition point.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <LayoutGrid className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Professional Branding
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Customize QR codes with your brand colors and logo. Branded
                    QR codes look intentional and professional, reinforcing
                    trust and encouraging more scans than generic black-and-white
                    codes.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Works for Any Device
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    iPhone, Android, and all modern smartphones can scan QR
                    codes natively with the camera app. No additional scanning
                    app is required — maximum accessibility for your audience.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Used */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Where to Place Facebook QR Codes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Business Cards",
                  desc: "Adding a Facebook QR code to your business card means every handshake is a potential Facebook follow. Contacts can visit and like your page at their convenience without needing to remember or search your name.",
                },
                {
                  title: "Retail Store Displays",
                  desc: "Place QR codes at your store entrance, near checkout counters, and on product displays. Shoppers who are already engaged with your brand are highly motivated to follow your Facebook page for deals and updates.",
                },
                {
                  title: "Product Packaging",
                  desc: "Every product you sell is a marketing channel. Add a Facebook QR code to packaging with a simple call-to-action like 'Join our Facebook community' to convert buyers into long-term social media followers.",
                },
                {
                  title: "Event Banners & Posters",
                  desc: "At exhibitions, trade shows, and brand activations, large banners with your Facebook QR code capture the attention of attendees who may not catch your brand name. One scan connects them to everything your page offers.",
                },
                {
                  title: "Restaurant Tables & Menus",
                  desc: "Restaurants can include Facebook QR codes on table cards and menus. Diners who enjoy their meal and want to stay updated about specials, events, and new menu items follow directly from the table.",
                },
                {
                  title: "Flyers & Promotional Materials",
                  desc: "Leaflets, brochures, and direct mail pieces with Facebook QR codes convert passive print readers into active online followers, extending the lifespan and ROI of every print marketing campaign.",
                },
              ].map((item) => (
                <div key={item.title} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              How to Create a Facebook QR Code
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Copy Your Facebook Page or Profile URL",
                  desc: "Open your Facebook page and copy the URL from your browser's address bar. For a business page it will be facebook.com/yourpagename. If you haven't claimed a vanity URL, go to Page Settings and set one — it makes your URL clean and memorable.",
                },
                {
                  step: 2,
                  title: "Paste the URL into the QR Generator",
                  desc: "Paste your Facebook URL into the QR code generator above. Select URL as the QR type. Customize the QR code colors to match your brand or Facebook's recognizable blue palette. Optionally embed your logo or Facebook icon in the center.",
                },
                {
                  step: 3,
                  title: "Generate and Download Your QR Code",
                  desc: "Download the QR code in 4K Ultra resolution for print or standard resolution for digital use. The file downloads as a PNG, ready to place into any design, layout, or print template instantly.",
                },
                {
                  step: 4,
                  title: "Print or Share Anywhere",
                  desc: "Add the QR code to your business cards, store signage, packaging, event materials, and online graphics. When someone scans it, they are taken directly to your Facebook page — ready to like and follow with one tap.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Facebook QR Code Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Local Businesses</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    A local bakery adds its Facebook QR code to takeaway bags
                    and loyalty cards. Customers who love the food scan and
                    follow to see daily specials, new pastries, and seasonal
                    offerings. The bakery grows a loyal local following without
                    spending on ads.
                  </p>
                  <Badge variant="secondary">Community Growth</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Retail Brands</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    A clothing retailer places Facebook QR codes on changing
                    room mirrors and store windows. Shoppers who like the brand
                    follow while they browse, building a social media audience
                    of people already proven to visit the store.
                  </p>
                  <Badge variant="secondary">In-Store Marketing</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Event Organizers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    An event organizer prints the Facebook Event page QR code on
                    all promotional materials. Interested attendees scan to
                    RSVP, share the event, and follow the organizer's page —
                    increasing both event attendance and long-term page growth.
                  </p>
                  <Badge variant="secondary">Event Promotion</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Restaurants & Cafes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    A restaurant includes a Facebook QR code on its printed menu
                    with a note to "Follow us for special offers and live music
                    updates." Diners who scan and follow become a recurring
                    audience for promotions and events that drive repeat visits.
                  </p>
                  <Badge variant="secondary">Hospitality</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Facebook Marketing Strategies */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Offline Facebook Marketing Strategies with QR Codes
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              The most effective Facebook growth strategies combine online
              content with offline discovery channels. Here's how to use QR
              codes to build your Facebook audience in the physical world:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "QR Codes on Store Displays",
                  desc: "Position Facebook QR codes prominently in your store with clear messaging such as 'Like our Facebook page for exclusive deals.' Customers who are already in your store are the warmest possible audience — they've self-selected as interested in your brand.",
                },
                {
                  title: "QR Codes on Packaging",
                  desc: "A packaging insert card with a Facebook QR code and a message like 'Join 10,000+ fans in our Facebook community' converts product buyers into followers. People who just purchased your product are at peak engagement — the perfect moment to invite them to follow.",
                },
                {
                  title: "QR Codes on Receipts",
                  desc: "Print Facebook QR codes on paper or digital receipts. Customers checking their receipt after a purchase encounter your QR code at a moment of satisfaction. A short prompt like 'Follow us on Facebook for offers and new arrivals' increases scan rates significantly.",
                },
                {
                  title: "QR Codes on Promotional Materials",
                  desc: "Include Facebook QR codes on all branded promotional materials — pens, tote bags, stickers, and branded giveaways. Every time the item is used or seen, it provides another opportunity for someone to scan and follow your Facebook page.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 border rounded-lg p-5 bg-card"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Facebook QR Code Design Best Practices
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Use High Contrast Colors",
                  desc: "Always maintain strong contrast between the QR code modules and their background. High contrast ensures the code scans reliably across all devices and lighting conditions. Dark modules on a light background is the most universally reliable combination.",
                },
                {
                  title: "Add Facebook Branding",
                  desc: "Incorporating Facebook's signature blue color scheme or embedding the Facebook logo in the QR code center signals the scan destination immediately. Users who recognize the Facebook branding are more likely to scan because they know what they'll get.",
                },
                {
                  title: "Ensure Large Enough QR Size",
                  desc: "For print materials, use minimum 2.5cm x 2.5cm for close-up scanning on brochures and business cards. For store signage and posters, use 8cm x 8cm or larger. Always download in 4K Ultra resolution so the code remains sharp at any size.",
                },
                {
                  title: "Test Scanning Before Printing",
                  desc: "Always scan the QR code on at least one iPhone and one Android device before sending any materials to print. Confirm the code opens your Facebook page correctly. A broken QR code on thousands of printed items is an expensive mistake to correct.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 border rounded-lg p-4 bg-card"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Common Facebook QR Code Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Using the Wrong Profile Link",
                  desc: "Always verify the URL before generating your QR code. Copy the link from your Facebook page directly while logged out, or verify it in incognito mode. A URL error could send scanners to someone else's page or a broken link.",
                },
                {
                  title: "Linking to a Private Page",
                  desc: "If your Facebook page or profile privacy is set to 'Friends Only' or restricted, new visitors who scan your QR code will see a limited view or be denied access. Ensure your Facebook page is set to Public before promoting QR codes.",
                },
                {
                  title: "Using Low-Resolution QR Codes",
                  desc: "Downloading standard resolution QR codes and enlarging them for print causes pixelation that makes scanning unreliable. Always download the 4K Ultra resolution version for any print application — it's free and ensures quality at any size.",
                },
                {
                  title: "Placing QR Codes Too Small",
                  desc: "Small QR codes are difficult to scan and create a poor user experience that reduces scan rates. Use the sizing guidelines above and err on the side of making your QR codes larger rather than smaller, especially for outdoor and retail signage.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20"
                >
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">
                      {item.title}
                    </h3>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Real Examples */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Real Examples of Facebook QR Codes in Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Retail Store Window
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A clothing boutique places a large Facebook QR code in its
                    shop window with the text "Like us on Facebook for exclusive
                    member-only discounts." People passing by scan, visit the
                    page, and follow — the store grows a local Facebook audience
                    of potential customers 24 hours a day.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Product Packaging Insert
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A candle brand includes a card inside every order that
                    reads "Join our Facebook community for scent guides, home
                    décor tips, and early access to new collections." Customers
                    who love the product scan and follow, building an engaged
                    community of brand advocates.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Event Promotional Poster
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A music venue prints its Facebook Event page QR code on
                    every gig poster. Music fans who see the poster around town
                    scan to RSVP and get event updates. The venue's Facebook
                    Event attendance grows significantly through street-level
                    poster marketing.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Facebook QR Code FAQs
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold mb-3 flex gap-2 items-start">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground text-sm ml-7">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Linking */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              More Social Media QR Code Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/tools/qr-code-for-instagram">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">QR Code for Instagram</h3>
                  <p className="text-sm text-muted-foreground">
                    Grow Instagram followers with a profile QR code
                  </p>
                </div>
              </Link>
              <Link href="/tools/qr-maker">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">Main QR Code Generator</h3>
                  <p className="text-sm text-muted-foreground">
                    Full QR code maker with all customization options
                  </p>
                </div>
              </Link>
              <Link href="/tools/qr-code-for-product-packaging">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">QR Code for Product Packaging</h3>
                  <p className="text-sm text-muted-foreground">
                    Add QR codes to products for customer engagement
                  </p>
                </div>
              </Link>
              <Link href="/tools/qr-code-for-event-tickets">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">QR Code for Event Tickets</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate QR codes for events and attendee check-ins
                  </p>
                </div>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t pt-12">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Create Your Facebook QR Code Now
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Generate a QR code that connects people instantly to your
                Facebook page. Free, unlimited, and print-ready at 4K
                resolution.
              </p>
              <Button size="lg">Create Facebook QR Code</Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
