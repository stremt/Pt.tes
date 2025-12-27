import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Share2, Users, Zap } from "lucide-react";

export default function QRMakerSocialMedia() {
  useSEO({
    title: "QR Code Generator for Social Media Links - Grow Your Following | Pixocraft",
    description: "Generate branded QR codes linking to Instagram, TikTok, YouTube, and LinkedIn. Drive traffic to your social profiles with one scan.",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-maker/social-media",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code Generator for Social Media Links - Boost Your Following Instantly</h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Create branded QR codes that link directly to your Instagram, TikTok, YouTube, LinkedIn, and other social profiles. Perfect for marketing materials, packaging, storefronts, and print ads. Drive instant traffic to your social channels without complicated links.
        </p>

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Share2 className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Instant Follow Button</h3>
                  <p className="text-sm text-muted-foreground">One scan, direct to your profile</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Grow Your Audience</h3>
                  <p className="text-sm text-muted-foreground">Easy way to attract followers</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Track Engagement</h3>
                  <p className="text-sm text-muted-foreground">Monitor follower growth</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Social Media?</h2>
        <p className="text-muted-foreground mb-6">
          Long social media usernames are hard to remember and easy to mistype. QR codes eliminate typing errors and make it effortless for customers, fans, and potential followers to find and connect with you. A single scan increases engagement without friction.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Perfect for Every Platform</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Instagram & TikTok:</strong> Drive followers from offline marketing and storefronts</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>YouTube Channel:</strong> Link from packaging, products, and promotional materials</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>LinkedIn Profile:</strong> Professional networking on business cards and resumes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Twitter/X & Facebook:</strong> Connect followers across all social platforms</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Boost Offline-to-Online Conversions</h3>
            <p className="text-muted-foreground">
              Bridge your physical and digital presence. Customers see your QR code on products, posters, or at events—scan once and instantly follow. No hunting for your profile, no typos, no confusion. Dramatically increase follower conversion rates from offline marketing.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Where to Place Social Media QR Codes</h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Product Packaging</h4>
              <p className="text-muted-foreground">Print QR codes on boxes, bottles, or labels to drive reviews and follows</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Point of Sale & Storefronts</h4>
              <p className="text-muted-foreground">Display at checkout counters or storefront windows for easy scanning</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Marketing Materials</h4>
              <p className="text-muted-foreground">Include on flyers, business cards, receipts, and printed ads</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">4</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Event Promotion</h4>
              <p className="text-muted-foreground">Place at venues, trade shows, or during live events for instant engagement</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Common Social Media QR Code Mistakes</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Linking to Wrong Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Always test your QR code before printing. Make sure it links to your current, active social media profile—not a old account or competitor's channel.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ignoring Mobile Page Load Speed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Slow-loading social profiles frustrate users. Keep social links lightweight and ensure they load instantly on 3G and 4G connections.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Using Tiny QR Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">QR codes need to be large enough to scan from a distance. Don't shrink them to fit designs—redesign your layout to accommodate properly-sized codes.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Privacy & Security</h2>
        <p className="text-muted-foreground mb-6">
          Social media QR codes don't collect personal data. They simply direct users to your public social profiles. Your QR codes are completely safe to share, print, and distribute—scanning leads to your public social presence with no privacy concerns.
        </p>

        <h2 className="text-3xl font-bold mb-4 mt-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I use one QR code for multiple social profiles?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes! Create a landing page with links to all your social profiles and generate a QR code pointing to that page. This gives followers easy access to your entire social ecosystem.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What if I change my social media username?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Static QR codes can't be updated after printing. If your username changes, you'll need to generate new QR codes. Consider using an intermediate landing page for flexibility.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I customize QR code colors to match my brand?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Absolutely! Our QR code maker lets you customize colors to match your brand identity. Just ensure sufficient contrast between foreground and background for reliable scanning.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">How do I track QR code scan data?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Direct QR codes to your social platform's analytics. You can also use URL shorteners with built-in analytics to track clicks before redirecting to your profile.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can QR codes help with Instagram follow rates?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Yes! QR codes dramatically reduce friction. Instead of searching your name and hoping they find the right profile, users scan and instantly reach you—increasing follow rates significantly.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Related QR Code Tools</h2>
        <p className="text-muted-foreground mb-6">
          Explore more QR code options for different use cases:
        </p>
        <div className="space-y-3 text-muted-foreground">
          <p><Link href="/tools/qr-maker"><span className="text-primary hover:underline cursor-pointer">Free QR Code Maker</span></Link> - Generate any QR code type with customization</p>
          <p><Link href="/tools/qr-code-maker/with-logo"><span className="text-primary hover:underline cursor-pointer">QR Codes with Logo</span></Link> - Brand your QR codes with company logo</p>
          <p><Link href="/tools/qr-code-maker/business-cards"><span className="text-primary hover:underline cursor-pointer">Business Card QR Codes</span></Link> - Professional networking made easy</p>
          <p><Link href="/tools/qr-code-maker/free-online"><span className="text-primary hover:underline cursor-pointer">Free Online QR Generator</span></Link> - No signup, unlimited codes</p>
        </div>

        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Start Growing Your Social Following Today</h3>
          <p className="text-muted-foreground mb-4">
            Create branded QR codes for your social profiles. Free, fast, no signup required.
          </p>
          <Link href="/tools/qr-maker">
            <Button className="w-full">
              Create Social QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
