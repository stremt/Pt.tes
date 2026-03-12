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
  PlayCircle,
  Tv,
  Star,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for my YouTube channel?",
    answer:
      "Go to your YouTube channel page and copy the URL from the browser address bar. It will be in the format youtube.com/@yourchannel or youtube.com/channel/UCxxxxxxx. Paste it into the QR code generator above, customize the design, and download in 4K Ultra resolution for print or digital use.",
  },
  {
    question: "Can I generate a QR code for a specific YouTube video?",
    answer:
      "Yes! You can create a QR code for any YouTube URL — your channel homepage, a specific video, a playlist, or a YouTube Shorts video. Just paste the video URL into the generator and the QR code will take scanners directly to that content.",
  },
  {
    question: "Do users need the YouTube app to scan the QR code?",
    answer:
      "No app is needed to scan the QR code. Any smartphone camera will read it and open the YouTube link. If the user has the YouTube app installed, it will open directly in the app. If not, it will open in the browser. Either way, they reach your content instantly.",
  },
  {
    question: "Are YouTube QR codes free to create?",
    answer:
      "Yes, completely free. Our QR code generator has no subscription fee, no sign-up requirement, and no usage limits. Create as many YouTube QR codes as you need and download them in 4K Ultra resolution at no cost.",
  },
  {
    question: "How can QR codes increase my YouTube subscribers?",
    answer:
      "QR codes convert offline audiences into YouTube subscribers. When placed on merchandise, packaging, event slides, or store displays, they give people who encounter your brand in person a one-scan path to your channel. They arrive on your channel page where they can subscribe with a single tap — no searching, no typing.",
  },
  {
    question: "Can I link a QR code to a YouTube subscribe page?",
    answer:
      "Yes! Add ?sub_confirmation=1 to your YouTube channel URL (e.g., youtube.com/@yourchannel?sub_confirmation=1) and the QR code will open a page that prompts viewers to subscribe immediately. This is one of the most effective ways to use QR codes for subscriber growth.",
  },
  {
    question: "What size should QR codes be on conference slides?",
    answer:
      "For conference presentations projected on a screen, the QR code should be at least 10–15% of the slide area so people in the back of the room can scan. Always download in 4K Ultra resolution so the code remains sharp when projected at large scale.",
  },
];

export default function QRCodeForYouTube() {
  useSEO({
    title: "QR Code for YouTube Channel | YouTube QR Code Generator – Free",
    description:
      "Create a QR code for your YouTube channel or video instantly. Generate a YouTube subscribe QR code for merchandise, packaging, slides, and events. Grow subscribers offline. Free YouTube QR code maker.",
    keywords:
      "youtube qr code generator, qr code for youtube channel, youtube channel qr code, create qr code for youtube, youtube subscribe qr code",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-youtube",
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
              QR Code for YouTube – Create YouTube Channel QR Codes Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate a QR code that links directly to your YouTube channel or
              video. Perfect for creators, brands, and businesses that want to
              grow their YouTube audience through offline and print marketing.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Increase YouTube subscribers faster
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Share your channel instantly — no searching
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Perfect for merchandise, slides, and print
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Works on all smartphones — no app required to scan
                </span>
              </div>
            </div>
            <Button size="lg">Create YouTube QR Code</Button>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* Embedded Tool */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Generate Your YouTube Channel QR Code
              </h2>
              <p className="text-lg text-muted-foreground">
                Paste your YouTube channel or video link below to generate a
                scannable QR code that drives viewers and subscribers directly
                to your content.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Example:{" "}
                <code className="bg-muted px-2 py-0.5 rounded text-xs">
                  https://youtube.com/@yourchannel
                </code>
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use QR Codes for YouTube */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Use QR Codes to Grow Your YouTube Channel
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              YouTube growth relies on discoverability — but that doesn't have
              to mean only the algorithm. QR codes open a powerful offline
              channel for subscriber growth that most creators completely
              overlook. Here's why YouTube QR codes are one of the most
              underused creator marketing tools:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Offline Promotion</h3>
                <p className="text-muted-foreground">
                  YouTube is a digital platform, but the physical world is full
                  of opportunities to promote your channel — events, products,
                  packaging, and retail. QR codes let you capture that offline
                  audience and convert them into subscribers without any ad
                  spend or algorithm dependency.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Instant Channel Access
                </h3>
                <p className="text-muted-foreground">
                  When someone scans your YouTube QR code, they land directly on
                  your channel or video — no need to open YouTube, search your
                  name, and browse results hoping to find the right channel. One
                  scan delivers instant access. The lower the friction, the
                  higher the conversion to a subscriber.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Faster Subscriber Growth
                </h3>
                <p className="text-muted-foreground">
                  Every physical touchpoint with your audience is a missed
                  subscriber opportunity without a QR code. Add one to your
                  packaging, merchandise, event materials, and presentation
                  slides and you turn passive brand encounters into active
                  subscriber moments — constantly working in the background
                  even when you're not creating content.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Easy Sharing at Events and on Products
                </h3>
                <p className="text-muted-foreground">
                  At live events, speaking engagements, and trade shows,
                  audiences are already engaged and receptive. A QR code on
                  your final conference slide or event banner converts that
                  in-person attention into YouTube subscribers — capturing
                  interest at its peak before the moment passes.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Benefits of YouTube Channel QR Codes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Grow Subscribers Faster
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Turn every offline audience member into a subscriber.
                    People who encounter your brand in person scan, land on your
                    channel, and subscribe in seconds — no algorithm needed.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <PlayCircle className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Promote Videos Offline
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Link QR codes to a specific video, playlist, or YouTube
                    Shorts. Drive targeted views to your best or most recent
                    content through print and physical marketing channels.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Tv className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Easy Sharing on Products
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add YouTube QR codes to product packaging to link buyers to
                    tutorial videos, assembly guides, and review content. This
                    improves the customer experience and grows your subscriber
                    base simultaneously.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Increase Audience Engagement
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Offline audiences who discover your channel through a QR
                    code are higher-intent viewers. They actively chose to scan,
                    so they're more likely to watch, engage, and subscribe than
                    casual algorithmic discovers.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Professional Creator Branding
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Branded QR codes with YouTube's red palette and your channel
                    logo make your materials look polished and intentional.
                    Professional presentation builds credibility and increases
                    scan and subscribe rates.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Cross-Platform Growth
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Add YouTube QR codes to your Instagram posts, Facebook
                    content, and email newsletters. Convert audiences on other
                    platforms into YouTube subscribers and build a diversified
                    multi-channel presence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Used */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Where YouTube QR Codes Are Used
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Product Packaging",
                  desc: "Brands add YouTube QR codes to product boxes linking to tutorial or unboxing videos. Buyers who scan get instant value through setup guides and product tips, while the brand gains a highly engaged new subscriber who already owns the product.",
                },
                {
                  title: "Event Posters & Conference Slides",
                  desc: "Speakers and educators place YouTube QR codes on their final presentation slide. Audience members who enjoyed the talk scan to access the full YouTube channel for more content — capturing subscriber interest at its highest possible point.",
                },
                {
                  title: "Merchandise",
                  desc: "Creators print YouTube QR codes on branded t-shirts, phone cases, and stickers. Anyone who sees the merchandise can scan and subscribe instantly, turning fans into active promoters who spread the channel link in the physical world.",
                },
                {
                  title: "Retail Stores",
                  desc: "Consumer brands with YouTube channels place QR codes in stores linking to product review videos and brand content. Shoppers who scan while browsing get social proof from the video before purchasing — improving both conversions and subscriber counts.",
                },
                {
                  title: "Business Cards",
                  desc: "Professionals who create industry content on YouTube add QR codes to business cards. New connections can scan and subscribe immediately rather than trying to remember a channel name to search later.",
                },
                {
                  title: "Print Advertising",
                  desc: "Magazines, newspapers, and printed brochures can include YouTube QR codes linking to video content that expands on what print can show. Readers who scan get a richer multimedia experience while the creator gains subscribers.",
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
              How to Create a YouTube QR Code
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Copy Your YouTube Channel or Video Link",
                  desc: "Navigate to your YouTube channel page or the specific video you want to promote. Copy the full URL from your browser address bar. For channels, use your handle URL (youtube.com/@yourchannel). For subscribe prompts, append ?sub_confirmation=1 to trigger the subscribe dialog automatically when someone scans.",
                },
                {
                  step: 2,
                  title: "Paste the Link into the QR Code Generator",
                  desc: "Paste your YouTube URL into the generator above. Select URL as the QR type. Customize the QR code colors — YouTube's signature red works well, or use your channel brand colors. Optionally embed your channel logo or YouTube's play button icon in the center of the code.",
                },
                {
                  step: 3,
                  title: "Generate and Download Your QR Code",
                  desc: "Download the QR code in 4K Ultra resolution for print materials or standard resolution for digital use. The code downloads as a PNG file, ready to drop into any design tool, print template, or presentation slide immediately.",
                },
                {
                  step: 4,
                  title: "Print or Share the QR Code Anywhere",
                  desc: "Add the QR code to merchandise, packaging, event slides, store signage, and business cards. When someone scans it with their phone camera, YouTube opens directly on your channel or video — one tap away from subscribing.",
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
              YouTube QR Code Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>YouTube Creators</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Content creators add YouTube QR codes to merch drops, fan
                    mail inserts, and event appearances. Fans who receive
                    merchandise or meet the creator in person scan and subscribe,
                    converting passionate offline fans into counted subscribers
                    that improve channel rankings.
                  </p>
                  <Badge variant="secondary">Creator Growth</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Brands Sharing Product Tutorials</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Consumer brands link YouTube QR codes on product packaging
                    directly to setup videos and how-to tutorials. Buyers who
                    scan get instant help while the brand captures a subscriber
                    — turning every product sold into a new audience member on
                    YouTube.
                  </p>
                  <Badge variant="secondary">Product Marketing</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Event Speakers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Conference speakers and workshop facilitators display a
                    YouTube QR code on their final presentation slide. Attendees
                    who found value in the session scan to access the full
                    channel for more content — often becoming long-term
                    subscribers from a single speaking opportunity.
                  </p>
                  <Badge variant="secondary">Speaking Circuit</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Educators</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Teachers and trainers add YouTube QR codes to printed course
                    materials and handouts linking to lecture recordings and
                    supplementary video content. Students scan to access a
                    growing library of educational videos and subscribe for
                    future lessons.
                  </p>
                  <Badge variant="secondary">Education</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* YouTube Marketing with QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Offline YouTube Marketing Strategies with QR Codes
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              The most successful YouTube channels build their subscriber base
              through multiple channels simultaneously. Here's how to use QR
              codes to grow your YouTube audience beyond the algorithm:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "QR Codes on Product Packaging",
                  desc: "Add a YouTube QR code to your packaging insert with a message like 'Watch our full tutorial on YouTube.' Buyers who want to get the most from their purchase are highly motivated to scan — and they arrive on your channel already primed to subscribe.",
                },
                {
                  title: "QR Codes on Posters and Flyers",
                  desc: "Include your YouTube QR code on all print promotional materials. Anyone who sees your flyer or poster can scan to visit your channel immediately rather than searching for it later (and potentially forgetting). The QR code makes your print marketing interactive.",
                },
                {
                  title: "QR Codes in Presentations",
                  desc: "Add a YouTube QR code to your introduction slide (so attendees can find you during breaks) and your closing slide (when interest is highest). Conference and webinar audiences are receptive and qualified — capture them as subscribers before the session ends.",
                },
                {
                  title: "QR Codes on Merchandise",
                  desc: "Creator merchandise with a YouTube QR code turns buyers into walking billboards. Friends and strangers who notice the QR code on a t-shirt or tote bag can scan and discover your channel — passive subscriber growth with every item worn or used in public.",
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
              YouTube QR Code Design Best Practices
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Use High Contrast Colors",
                  desc: "Reliable scanning requires strong contrast between QR code modules and background. Dark modules on a light background work best across all device types and lighting conditions. If using YouTube's red, ensure it contrasts clearly against the module fill color.",
                },
                {
                  title: "Add the YouTube Logo in the Center",
                  desc: "Embedding YouTube's play button icon or your channel thumbnail in the QR code center instantly signals what the code links to. Viewers who recognize the YouTube play icon are more likely to scan — they know exactly what they'll get.",
                },
                {
                  title: "Ensure the QR Code Is Large Enough",
                  desc: "For business cards: 2cm x 2cm minimum. For print flyers and brochures: 4cm x 4cm. For event banners and conference slides: 10cm x 10cm or larger. Always download in 4K Ultra resolution to keep edges crisp at any size.",
                },
                {
                  title: "Test Before Printing",
                  desc: "Always scan your QR code on both an iPhone and an Android device before committing to any print run. Confirm the YouTube channel or video opens correctly. Also test from the typical scanning distance — a poster QR code should scan from at least 60cm away.",
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
              Common YouTube QR Code Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Using the Wrong Channel Link",
                  desc: "Always verify the URL opens the correct channel before generating your QR code. Test it in incognito mode or while logged out of YouTube to confirm it displays your public channel correctly and doesn't redirect or show an error.",
                },
                {
                  title: "Using Low-Resolution QR Codes for Print",
                  desc: "Standard resolution QR codes pixelate when enlarged for print and become unscannable. Always use the 4K Ultra resolution download for any printed materials — it's free and ensures quality at all sizes from business card to billboard.",
                },
                {
                  title: "Placing QR Codes Too Small",
                  desc: "Tiny QR codes on printed materials frustrate users and significantly reduce scan rates. Match the QR code size to the expected scanning distance. Outdoor and large-format materials need substantially larger codes than close-up print pieces.",
                },
                {
                  title: "Linking to Private or Unlisted Videos",
                  desc: "Private YouTube videos are only accessible to selected viewers and will show an error to anyone who scans the QR code. Unlisted videos work but won't be indexed. Always confirm the linked content is publicly accessible before printing QR codes.",
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
              Real Examples of YouTube QR Codes in Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Conference Presentation Slides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A marketing strategist ends every speaking session with a
                    slide showing their YouTube QR code and the text "Watch 50+
                    free strategy videos." Audience members who found value in
                    the talk scan during applause and subscribe immediately —
                    the speaker gains 20–50 new subscribers per event with zero
                    additional ad spend.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Product Packaging Tutorial Link
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A fitness equipment brand prints a YouTube QR code on every
                    product box linking to a full workout tutorial video. New
                    buyers scan, watch the tutorial, and discover the full
                    channel of free workout content. Thousands of product buyers
                    become engaged YouTube subscribers who return for new
                    training videos weekly.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Creator Merchandise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A tech YouTuber includes their channel QR code on the inside
                    tag of branded hoodies. When fans wear the hoodie and
                    friends ask about it, they can scan the tag and immediately
                    find the channel. The QR code turns merchandise buyers into
                    a distributed subscriber acquisition network in the real
                    world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">YouTube QR Code FAQs</h2>
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
              <Link href="/tools/qr-code-for-facebook">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">QR Code for Facebook</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a QR code for your Facebook page or profile
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
              <Link href="/tools/qr-maker">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">Main QR Code Generator</h3>
                  <p className="text-sm text-muted-foreground">
                    Full QR code maker with all customization options
                  </p>
                </div>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="border-t pt-12">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-4">
              <h2 className="text-3xl font-bold">
                Create Your YouTube QR Code Now
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Generate a QR code that connects people instantly to your
                YouTube channel or video. Free, unlimited, and print-ready at
                4K resolution.
              </p>
              <Button size="lg">Create YouTube QR Code</Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
