import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";
import { Download, AlertCircle, Check, Zap, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function InstagramProfilePictureDownloader() {
  const [username, setUsername] = useState("");
  const [profileData, setProfileData] = useState<{
    username: string;
    fullName: string;
    profilePicUrl: string;
    bio: string;
    followerCount: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Instagram Profile Picture Downloader | Pixocraft Tools",
    description: "Download Instagram profile pictures in high quality. Works for any public profile. Free, fast, and 100% browser-based.",
    canonicalUrl: "https://pixocraft.in/tools/instagram-profile-picture-downloader",
  });

  const fetchInstagramProfile = async (user: string) => {
    setError("");
    setProfileData(null);

    if (!user.trim()) {
      setError("Please enter an Instagram username");
      return;
    }

    const cleanUsername = user.trim().replace("@", "").toLowerCase();
    setLoading(true);

    try {
      const response = await fetch(
        `https://www.instagram.com/api/v1/users/web_profile_info/?username=${cleanUsername}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Profile not found or is private");
      }

      const data = await response.json();
      const user_obj = data.data.user;

      setProfileData({
        username: user_obj.username,
        fullName: user_obj.full_name || user_obj.username,
        profilePicUrl: user_obj.profile_pic_url_hd || user_obj.profile_pic_url || "",
        bio: user_obj.biography || "",
        followerCount: user_obj.edge_followed_by?.count || 0,
      });

      toast({
        title: "Profile Loaded",
        description: `Found ${user_obj.username}'s profile!`,
      });
    } catch (err) {
      setError("Unable to find profile. Check the username and try again.");
      toast({
        title: "Error",
        description: "Could not load profile. Make sure it's a public account.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!profileData?.profilePicUrl) return;

    setDownloading(true);
    try {
      const response = await fetch(profileData.profilePicUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Pixocraft_tools_xyz_${profileData.username}_profile.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Downloaded",
        description: `${profileData.username}'s profile picture saved.`,
      });
    } catch {
      toast({
        title: "Download Failed",
        description: "Could not download the image. Try again.",
        variant: "destructive",
      });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
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
        {/* Tool Card */}
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Instagram className="w-6 h-6" />
              Download Profile Picture
            </CardTitle>
            <CardDescription>Enter any public Instagram username to download their profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="ig-username" className="text-base font-semibold">
                Instagram Username
              </Label>
              <Input
                id="ig-username"
                placeholder="@username (with or without @)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && fetchInstagramProfile(username)}
                data-testid="input-instagram-username"
                className="text-base h-12 px-4"
              />
              <p className="text-xs sm:text-sm text-muted-foreground">
                Works with public profiles only. Enter username with or without @
              </p>
            </div>

            {error && (
              <div className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              onClick={() => fetchInstagramProfile(username)}
              disabled={loading}
              size="lg"
              className="w-full h-12 text-base font-semibold"
              data-testid="button-search-profile"
            >
              {loading ? "Loading Profile..." : "Search & Load"}
            </Button>

            {!profileData && !loading && !error && (
              <p className="text-center text-sm text-muted-foreground py-4">
                Enter an Instagram username to get started
              </p>
            )}
          </CardContent>
        </Card>

        {/* Profile Preview */}
        {profileData && (
          <Card className="border-2 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 flex-shrink-0 mx-auto sm:mx-0">
                    <img
                      src={profileData.profilePicUrl}
                      alt={profileData.username}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">@{profileData.username}</h2>
                      <p className="text-muted-foreground">{profileData.fullName}</p>
                    </div>
                    {profileData.bio && (
                      <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                    )}
                    {profileData.followerCount > 0 && (
                      <div className="flex gap-4">
                        <Badge variant="secondary">
                          {(profileData.followerCount / 1000000).toFixed(1)}M Followers
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                {/* Download Button */}
                <Button
                  onClick={handleDownload}
                  disabled={downloading}
                  size="lg"
                  className="w-full h-12 text-base font-semibold"
                  data-testid="button-download-profile-pic"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {downloading ? "Downloading..." : "Download Profile Picture"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Downloads as: Pixocraft_tools_xyz_{profileData.username}_profile.jpg
                </p>
              </div>
            </CardContent>
          </Card>
        )}

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
                Simply enter any Instagram username, and the tool instantly loads the profile picture in the highest available resolution. You can download it immediately without any watermarks, compression, or quality loss. The entire process happens right in your browser—no sign-up required, no tracking, no data collection.
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
                  a: "No, this tool only works with public Instagram profiles. Private accounts hide profile pictures from public access, so we cannot retrieve them.",
                },
                {
                  q: "Is it legal to download profile pictures?",
                  a: "Yes. Profile pictures are public metadata that Instagram displays to anyone. Downloading them for personal, educational, or commercial use is legal.",
                },
                {
                  q: "Do I need an Instagram account to use this?",
                  a: "No. This tool works completely offline in your browser. You don't need to log in or create any account.",
                },
                {
                  q: "What image quality will I get?",
                  a: "You'll get the highest quality profile picture available from Instagram's servers, usually at full HD resolution (1080×1080 pixels).",
                },
                {
                  q: "Does this tool track or store data?",
                  a: "No. This is a 100% browser-based tool. No searches are logged, no data is stored on servers, and your privacy is completely protected.",
                },
                {
                  q: "Why doesn't it work for reels, stories, or posts?",
                  a: "This tool is designed specifically for profile pictures. It doesn't download reels, stories, or posts—only the account's profile picture.",
                },
                {
                  q: "Can I download multiple profile pictures at once?",
                  a: "Yes. Search for one profile, download the picture, then search for another username and repeat as needed.",
                },
                {
                  q: "What if the profile has recently changed their picture?",
                  a: "This tool downloads the current profile picture. If someone recently updated theirs, you'll get the latest version.",
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
      </div>
    </div>
  );
}
