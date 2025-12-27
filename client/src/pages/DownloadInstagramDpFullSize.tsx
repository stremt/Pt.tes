import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Instagram, Download, Shield, ZoomIn } from "lucide-react";

export default function DownloadInstagramDpFullSize() {
  useSEO({
    title: "Download Instagram DP in Full Size - HD Profile Picture Viewer | Pixocraft",
    description: "View and download any Instagram profile picture in its original full size and HD quality. Our secure tool lets you see the details you've been missing.",
    keywords: "download instagram dp full size, instagram profile picture hd, view ig dp full size, instagram dp downloader hd, full size profile picture viewer"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "Instagram Tools", url: "/tools/instagram-downloader" },
            { name: "Download DP Full Size", url: "/tools/instagram-downloader/dp-full-size" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Download Instagram DP in Full Size - HD Quality
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Instagram profile pictures are notoriously small and unclickable. Whether you want to see a friend's new photo in detail or verify a professional contact, our tool lets you view and download any Instagram DP in its original, full-size HD resolution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <ZoomIn className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">HD Resolution</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We bypass the small thumbnails and fetch the highest resolution version of the profile picture available on Instagram's servers.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Private Viewing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  View and download profile pictures without notifying the user. Your searches are completely anonymous and secure.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why View Instagram DPs in Full Size?</h2>
            <p className="text-muted-foreground leading-relaxed">
              The circular crop and tiny dimensions of Instagram profile pictures often hide important details. Business owners might need to verify a partner's identity, or friends might want to see the full context of a group photo used as a DP. By accessing the full-size image, you get the complete visual information that the platform usually restricts.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Our Full Size Downloader Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft's technology interfaces with public data to locate the source file of the profile image. Unlike many apps that require login, our web-based tool works independently. You simply provide the username, and we retrieve the best quality image directly to your browser for viewing or saving.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes When Trying to See DPs</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Attempting to screenshot the small circle, which results in blurry, pixelated images.</li>
              <li>Using untrusted apps that ask for your Instagram password (never do this!).</li>
              <li>Assuming that private accounts' profile pictures cannot be seen (they are actually public).</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Safe & Anonymous Access</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your security is our priority. Our tool is entirely web-based and does not require you to link your Instagram account. We don't store your search history, and the person whose DP you are viewing will never be notified. It is the most discreet way to access high-quality profile imagery.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Instagram DP Downloader</h2>
            <div className="space-y-4">
              {[
                { q: "Can I download DPs from private accounts?", a: "Yes, Instagram profile pictures are public even if the account is set to private." },
                { q: "Is the download quality really HD?", a: "We retrieve the highest quality source file available, which is usually significantly clearer than the thumbnail." },
                { q: "Do I need to log in to my Instagram?", a: "No, our tool works completely without any login or account connection." },
                { q: "Will the user know I downloaded their DP?", a: "No, this is a completely anonymous process. There are no notifications sent." },
                { q: "Is this tool free to use?", a: "Yes, Pixocraft provides this tool for free with no hidden charges or subscriptions." }
              ].map((faq, i) => (
                <Card key={i} className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {faq.a}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-center py-8">
            <h2 className="text-3xl font-bold">View Full Size DP Now</h2>
            <p className="text-muted-foreground">Get the clarity you deserve with our HD profile picture downloader.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/instagram-profile-picture-downloader">
                <Button size="lg" className="gap-2">
                  Use DP Downloader
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/instagram-profile-picture-downloader" className="text-primary hover:underline">Main Instagram Downloader</Link>
              <Link href="/tools/image-upscaler" className="text-primary hover:underline">Image Upscaler</Link>
              <Link href="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
