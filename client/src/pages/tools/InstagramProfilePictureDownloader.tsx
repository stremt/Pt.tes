import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSEO, StructuredData } from "@/lib/seo";
import { Download, AlertCircle, Check, Zap, Instagram, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Media Tools", "item": "https://tools.pixocraft.in/tools/media" },
    { "@type": "ListItem", "position": 4, "name": "Instagram Profile Picture Downloader", "item": "https://tools.pixocraft.in/tools/instagram-profile-picture-downloader" }
  ]
});

export default function InstagramProfilePictureDownloader() {
  const [username, setUsername] = useState("");
  const [manualUrl, setManualUrl] = useState("");
  const [displayMode, setDisplayMode] = useState<"input" | "manual">("input");
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Instagram Profile Picture Downloader | Pixocraft Tools",
    description: "Download Instagram profile pictures in high quality. Works for any public profile. Free, fast, and 100% browser-based.",
    canonicalUrl: "https://pixocraft.in/tools/instagram-profile-picture-downloader",
  });

  const extractUsernameFromUrl = (url: string): string | null => {
    try {
      const match = url.match(/instagram\.com\/([a-zA-Z0-9_.]+)/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const handleUrlInput = (url: string) => {
    const extractedUsername = extractUsernameFromUrl(url);
    if (extractedUsername) {
      setUsername(extractedUsername);
      setDisplayMode("input");
    }
  };

  const generateInstructions = () => {
    if (!username.trim()) {
      return null;
    }

    const cleanUsername = username.trim().replace("@", "");
    return `https://www.instagram.com/${cleanUsername}/`;
  };

  const handleCopyInstructions = () => {
    const instructions = `To download ${username}'s profile picture:

1. Visit: https://www.instagram.com/${username.replace("@", "")}/
2. Right-click on the profile picture
3. Select "Copy image link" or "Save image as"
4. The highest quality version will download

Or use this direct image URL:
https://www.instagram.com/${username.replace("@", "")}/media/?__a=1 (then inspect the profile_pic_url_hd field)`;

    navigator.clipboard.writeText(instructions);
    toast({
      title: "Instructions Copied",
      description: "Step-by-step guide copied to clipboard",
    });
  };

  const handleDownloadDirect = async () => {
    if (!manualUrl.trim()) {
      toast({
        title: "Error",
        description: "Please paste the image URL",
        variant: "destructive",
      });
      return;
    }

    setDownloading(true);
    try {
      const response = await fetch(manualUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Pixocraft_tools_xyz_instagram_profile.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Downloaded",
        description: "Profile picture saved successfully.",
      });
      setManualUrl("");
    } catch {
      toast({
        title: "Download Failed",
        description: "Could not download from this URL. Make sure it's a direct image link.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Media Tools", url: "/tools/media" }, { label: "Instagram Profile Picture Downloader" }]} />
      </div>
      {/* Hero Section */}
      <div className="w-full bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-4 text-center">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Fast • Free • No Signup</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Instagram Profile Picture Downloader
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Download any Instagram profile picture in seconds. Works with public profiles only. No watermarks, completely free.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        {/* Method 1: Username */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Instagram className="w-6 h-6" />
              Download Profile Picture
            </CardTitle>
            <CardDescription>Enter Instagram username or profile URL</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="ig-input" className="text-base font-semibold">
                Instagram Username or Profile URL
              </Label>
              <Input
                id="ig-input"
                placeholder="simranjit_15029 or https://www.instagram.com/simranjit_15029/"
                value={username}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.includes("instagram.com")) {
                    handleUrlInput(value);
                  } else {
                    setUsername(value);
                  }
                }}
                data-testid="input-instagram-username"
                className="text-base h-12 px-4"
              />
              <p className="text-xs sm:text-sm text-muted-foreground">
                Enter @username, username, or full Instagram profile link
              </p>
            </div>

            {username && (
              <div className="space-y-3 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">How to Download:</p>
                <ol className="text-sm space-y-2 text-blue-800 dark:text-blue-200">
                  <li>1. Click the button below to open their profile</li>
                  <li>2. Right-click on their profile picture</li>
                  <li>3. Select "Copy image link" (Chrome) or "Copy Image" (Safari)</li>
                  <li>4. Paste it in the URL field below</li>
                  <li>5. Click Download</li>
                </ol>
                <Button
                  onClick={() => {
                    window.open(`https://www.instagram.com/${username.replace("@", "")}/`, "_blank");
                    toast({
                      title: "Profile Opened",
                      description: "Right-click the profile picture and copy the image link",
                    });
                  }}
                  className="w-full mt-3"
                  size="sm"
                  data-testid="button-open-instagram"
                >
                  Open Profile on Instagram
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Method 2: Direct URL Download */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Paste Image URL & Download</CardTitle>
            <CardDescription>Paste the direct image link from Instagram</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="image-url" className="text-base font-semibold">
                Direct Image URL
              </Label>
              <Input
                id="image-url"
                placeholder="Paste the image URL here (copied from profile picture)"
                value={manualUrl}
                onChange={(e) => setManualUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleDownloadDirect()}
                data-testid="input-image-url"
                className="text-base h-12 px-4"
              />
              <p className="text-xs sm:text-sm text-muted-foreground">
                Paste any direct image URL (JPG, PNG, etc.)
              </p>
            </div>

            <Button
              onClick={handleDownloadDirect}
              disabled={downloading || !manualUrl.trim()}
              size="lg"
              className="w-full h-12 text-base font-semibold"
              data-testid="button-download-from-url"
            >
              <Download className="w-4 h-4 mr-2" />
              {downloading ? "Downloading..." : "Download Image"}
            </Button>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-sm text-amber-900 dark:text-amber-100">
                <strong>💡 Tip:</strong> Instagram profile pictures are stored on Instagram's CDN. Right-click the profile picture → "Copy image link" → Paste here to download.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Content Sections */}
        <div className="space-y-12 py-8">
          {/* About Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">What is Instagram Profile Picture Downloader?</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Instagram Profile Picture Downloader is a free online tool that lets you quickly download profile pictures from any public Instagram account. Whether you're a designer looking for inspiration, a marketer analyzing competitors, or someone wanting to save a high-quality profile image, this tool makes it effortless.
              </p>
              <p>
                This tool helps you extract the highest quality profile picture available from any public Instagram profile. You can download it immediately without any watermarks, compression, or quality loss. The entire process happens right in your browser—no sign-up required, no tracking, no data collection.
              </p>
              <p>
                Perfect for creating mood boards, analyzing visual branding, comparing profile aesthetics, or simply saving a favorite creator's profile picture. Works instantly with any public Instagram profile—your privacy is completely protected because everything runs locally on your device.
              </p>
            </div>
          </section>

          {/* Who Should Use Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Who Should Use This Tool?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Content Creators",
                  description: "Get inspiration from other creators' branding and visual identity choices.",
                },
                {
                  title: "Digital Marketers",
                  description: "Analyze competitor profiles and branding strategies for market research.",
                },
                {
                  title: "Graphic Designers",
                  description: "Download profile pictures for mood boards and design reference collections.",
                },
                {
                  title: "Brand Managers",
                  description: "Monitor and save competitor brand profile visuals and updates.",
                },
                {
                  title: "Social Media Managers",
                  description: "Create presentations and reports featuring profile pictures from target accounts.",
                },
                {
                  title: "Students & Researchers",
                  description: "Gather visual resources for projects involving social media analysis.",
                },
              ].map((item, index) => (
                <Card key={index} className="p-4 hover-elevate">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Real-World Usage Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Real-World Usage Examples</h2>
            <div className="space-y-3">
              {[
                {
                  title: "Brand Strategy Development",
                  desc: "Download profile pictures from top brands in your industry to analyze their visual identity and design trends.",
                },
                {
                  title: "Competitive Benchmarking",
                  desc: "Compare profile pictures across competitors to understand branding consistency and visual positioning.",
                },
                {
                  title: "Social Media Presentations",
                  desc: "Include high-quality profile pictures in client presentations and marketing reports without screenshots.",
                },
                {
                  title: "Design Mood Boards",
                  desc: "Create visual reference collections using profile pictures from accounts with aesthetics you admire.",
                },
                {
                  title: "Educational Projects",
                  desc: "Use real profile pictures for coursework analyzing social media branding and digital marketing strategies.",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-3 p-4 rounded-lg border bg-card/50 hover-elevate">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Privacy & Security Section */}
          <section className="space-y-4 p-6 bg-muted/40 rounded-xl border-2">
            <h2 className="text-3xl font-bold text-foreground">Your Privacy is Protected</h2>
            <p className="text-muted-foreground">
              This tool is 100% browser-based and requires no backend or server processing. Nothing you search or download is stored anywhere. Your Instagram usernames and downloaded images remain private and never leave your device.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="space-y-2">
                <p className="font-semibold text-foreground text-lg">No Tracking</p>
                <p className="text-sm text-muted-foreground">We don't collect usernames, track searches, or store data.</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground text-lg">No Sign-Up</p>
                <p className="text-sm text-muted-foreground">Use instantly without creating an account or logging in.</p>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground text-lg">No Watermarks</p>
                <p className="text-sm text-muted-foreground">Download clean, original profile pictures without marks.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                {
                  q: "Does this work with private accounts?",
                  a: "No, this tool only works with public Instagram profiles. Private accounts hide profile pictures from public access.",
                },
                {
                  q: "Is it legal to download profile pictures?",
                  a: "Yes. Profile pictures are public metadata displayed by Instagram. Downloading them for personal, educational, or commercial use is legal.",
                },
                {
                  q: "Do I need an Instagram account to use this?",
                  a: "No. This tool works completely in your browser without requiring login or an Instagram account.",
                },
                {
                  q: "What image quality will I get?",
                  a: "You'll get the highest quality profile picture available, typically at 1080×1080 pixels (HD resolution).",
                },
                {
                  q: "Does this tool track or store data?",
                  a: "No. This is 100% browser-based. No searches are logged, no data is stored, and your privacy is completely protected.",
                },
                {
                  q: "Why doesn't it download automatically?",
                  a: "Instagram blocks direct API access from browsers for security. Our method lets you download by copying the image link directly from Instagram.",
                },
                {
                  q: "Can I download multiple profile pictures at once?",
                  a: "Yes. Repeat the process for each profile - open the profile, copy the image link, and paste it to download.",
                },
                {
                  q: "What if the download fails?",
                  a: "Make sure you copied the direct image link (it should start with 'https://...' and end with an image file). Re-copy and try again.",
                },
              ].map((faq, index) => (
                <Card key={index} className="p-4 hover-elevate">
                  <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Related Tools Section */}
          <section className="space-y-4 pt-8 border-t">
            <h2 className="text-3xl font-bold text-foreground">More Pixocraft Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {[
                "YouTube Thumbnail Downloader",
                "QR Code Maker",
                "Image Compressor",
                "Image Resizer",
                "Color Picker",
              ].map((tool, index) => (
                <div
                  key={index}
                  className="p-3 sm:p-4 bg-muted/30 rounded-lg border text-center hover-elevate hover:bg-muted/50 transition-colors"
                >
                  <p className="text-xs sm:text-sm font-medium text-foreground">{tool}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
          Category: <Link href="/tools/media" className="text-primary hover:text-primary/80 transition-colors">Media Tools</Link>
        </p>
      </div>
      </div>
    </>
  );
}
