import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Globe, Smartphone, Eye } from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function YouTubeThumbnailDownloaderOnline() {
  useSEO({
    title: "Download YouTube Thumbnails Online | No Installation Required | Pixocraft",
    description: "Download YouTube video thumbnails directly online. No apps, no downloads, no plugins. Works instantly in your browser.",
    canonicalUrl: "https://tools.pixocraft.in/tools/youtube-thumbnail-downloader/online",
  });

  return (
    <>
      <Breadcrumb />
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Download YouTube Thumbnails Online - No Installation, Instant Results</h1>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Download YouTube thumbnails directly in your web browser without any software installation, plugins, or external applications. Our online YouTube thumbnail downloader gives you instant access to all thumbnail resolutions from any YouTube video, right from your browser.
          </p>

          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">100% Web-Based</h3>
                    <p className="text-sm text-muted-foreground">Works in any browser, any device</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Works on Mobile</h3>
                    <p className="text-sm text-muted-foreground">Download from phones and tablets</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">View Before Download</h3>
                    <p className="text-sm text-muted-foreground">Preview all resolutions instantly</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-3xl font-bold mb-4">Why Download YouTube Thumbnails Online?</h2>
          <p className="text-muted-foreground mb-6">
            Online tools eliminate complications. You don't need to download software, install applications, or manage files on your computer. Simply visit our site, paste your YouTube link, and download—seconds later you have your thumbnails. Perfect for creators, designers, and researchers who want quick results without technical setup.
          </p>

          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold">Works on Every Device</h3>
            <p className="text-muted-foreground">
              Desktop, tablet, or smartphone—our online downloader works the same way on all devices. Whether you're on Windows, Mac, Linux, iOS, or Android, you get the same fast, reliable experience. No need to install different apps for different devices.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-xl font-semibold">Real-Time Preview</h3>
            <p className="text-muted-foreground">
              See all available thumbnail versions before you download. Our online tool displays every resolution—HD versions, SD versions, mobile optimized versions—so you choose exactly what you need. No surprises, no hidden downloads.
            </p>
          </div>

          <h2 className="text-3xl font-bold mb-4 mt-12">How to Use Online</h2>
          <div className="space-y-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-bold text-primary">1</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Visit Our Online Tool</h4>
                <p className="text-muted-foreground">Open our website in any browser—Chrome, Firefox, Safari, Edge, all supported</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-bold text-primary">2</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Paste YouTube URL</h4>
                <p className="text-muted-foreground">Drop any YouTube link—works with full URLs, shortened links, mobile links</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="font-bold text-primary">3</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Select Quality & Download</h4>
                <p className="text-muted-foreground">Choose your preferred resolution and download instantly</p>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4 mt-12">Common Mistakes When Using Online Tools</h2>
          <div className="space-y-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Entering Incorrect URLs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Make sure you're copying the full YouTube link from the address bar, not just a share link.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Trusting Unreliable Online Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Many online tools inject ads, malware, or tracking. Use trusted, transparent services like ours.</p>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-3xl font-bold mb-4 mt-12">Privacy & Security for Online Downloading</h2>
          <p className="text-muted-foreground mb-6">
            Online tools should protect your privacy. Ours does—we don't track your downloads, don't store your YouTube links, and don't build profiles on you. Your thumbnail downloads remain completely private. Everything happens in your browser with zero server logging.
          </p>

          <h2 className="text-3xl font-bold mb-6 mt-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Do I need an account to use the online downloader?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No. Our online tool works instantly without any signup.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Which browsers are supported?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">All modern browsers—Chrome, Firefox, Safari, Edge, Opera. No plugins needed.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Can I download on my phone?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Yes, works perfectly on mobile browsers. Downloads go to your device's download folder.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">How long does downloading take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Instant—seconds. The tool extracts thumbnails fast and saves to your device immediately.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Is the online tool safe to use?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Completely safe. We don't install anything, don't collect data, and don't require personal info.</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">More Tools You Might Need</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/tools/youtube-thumbnail-downloader" className="block">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-2">YouTube Thumbnail Downloader</p>
                    <p className="text-sm text-muted-foreground mb-4">Main tool with advanced features</p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Use Tool <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/tools/url-encoder" className="block">
                <Card className="hover-elevate cursor-pointer h-full">
                  <CardContent className="pt-6">
                    <p className="font-semibold mb-2">URL Encoder/Decoder</p>
                    <p className="text-sm text-muted-foreground mb-4">Convert and encode URLs instantly</p>
                    <Button variant="ghost" size="sm" className="w-full">
                      Use Tool <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Online Tools That Respect Your Privacy - Pixocraft Tools
          </p>
        </div>
      </div>
    </>
  );
}
