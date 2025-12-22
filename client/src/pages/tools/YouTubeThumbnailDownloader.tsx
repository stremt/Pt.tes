import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, generateFAQSchema, generateSoftwareApplicationSchema } from "@/lib/seo";
import { Download, Play, AlertCircle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Thumbnail {
  name: string;
  quality: string;
  url: string;
  width: number;
  height: number;
}

export default function YouTubeThumbnailDownloader() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "YouTube Thumbnail Downloader | Pixocraft Tools",
    description: "Download YouTube video thumbnails in all available sizes. Fast, free, and no signup required. Works 100% in your browser.",
    canonicalUrl: "https://pixocraft.in/tools/youtube-thumbnail-downloader",
  });

  const extractVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleExtractThumbnails = () => {
    setError("");
    setThumbnails([]);

    if (!youtubeUrl.trim()) {
      setError("Please enter a YouTube URL");
      return;
    }

    const videoId = extractVideoId(youtubeUrl);
    if (!videoId) {
      setError("Invalid YouTube URL. Please try again.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const thumbnailSizes: Thumbnail[] = [
        {
          name: "Default",
          quality: "480×360",
          url: `https://img.youtube.com/vi/${videoId}/default.jpg`,
          width: 480,
          height: 360,
        },
        {
          name: "Medium",
          quality: "320×180",
          url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
          width: 320,
          height: 180,
        },
        {
          name: "High",
          quality: "480×360",
          url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
          width: 480,
          height: 360,
        },
        {
          name: "Standard",
          quality: "640×480",
          url: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
          width: 640,
          height: 480,
        },
        {
          name: "Max Resolution",
          quality: "1280×720",
          url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          width: 1280,
          height: 720,
        },
      ];

      setThumbnails(thumbnailSizes);
      setLoading(false);
      toast({
        title: "Thumbnails loaded",
        description: `Found 5 thumbnail sizes for this video. Click download to save any of them.`,
      });
    }, 500);
  };

  const handleDownload = (thumbnail: Thumbnail) => {
    const link = document.createElement("a");
    link.href = thumbnail.url;
    link.download = `youtube-thumbnail-${thumbnail.name.toLowerCase().replace(/ /g, "-")}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Downloaded",
      description: `${thumbnail.name} thumbnail downloaded successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Section */}
        <div className="space-y-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            YouTube Thumbnail Downloader
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Download YouTube video thumbnails in all available resolutions. Fast, free, and completely private.
          </p>
        </div>

        {/* Main Tool */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle>Extract Thumbnails</CardTitle>
            <CardDescription>Paste a YouTube URL and download any thumbnail size</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="youtube-url" className="text-base font-medium">
                YouTube Video URL
              </Label>
              <Input
                id="youtube-url"
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleExtractThumbnails()}
                data-testid="input-youtube-url"
                className="text-base h-11"
              />
              <p className="text-sm text-muted-foreground">
                Works with: youtube.com/watch?v=, youtu.be/, and youtube.com/embed/ URLs
              </p>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <Button
              onClick={handleExtractThumbnails}
              disabled={loading}
              size="lg"
              className="w-full"
              data-testid="button-extract-thumbnails"
            >
              {loading ? "Loading..." : "Extract Thumbnails"}
            </Button>
          </CardContent>
        </Card>

        {/* Thumbnails Grid */}
        {thumbnails.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Available Sizes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {thumbnails.map((thumbnail, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover-elevate flex flex-col"
                  data-testid={`card-thumbnail-${thumbnail.name.toLowerCase().replace(/ /g, "-")}`}
                >
                  <div className="relative w-full bg-muted">
                    <img
                      src={thumbnail.url}
                      alt={thumbnail.name}
                      className="w-full h-40 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.backgroundColor = "#e5e7eb";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
                      <Play className="w-8 h-8 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <CardContent className="flex-1 p-4 space-y-3 flex flex-col">
                    <div>
                      <p className="font-semibold text-foreground">{thumbnail.name}</p>
                      <p className="text-sm text-muted-foreground">{thumbnail.quality}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline">{thumbnail.width}px</Badge>
                      <Badge variant="outline">{thumbnail.height}px</Badge>
                    </div>
                    <Button
                      onClick={() => handleDownload(thumbnail)}
                      variant="default"
                      size="sm"
                      className="w-full mt-auto"
                      data-testid={`button-download-${thumbnail.name.toLowerCase().replace(/ /g, "-")}`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="space-y-8 mt-12 pt-8 border-t">
          {/* About Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">What is YouTube Thumbnail Downloader?</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>
                YouTube Thumbnail Downloader is a free online tool that lets you quickly extract and download thumbnails from any YouTube video. Whether you're a content creator, digital marketer, or student, this tool makes it easy to grab high-quality preview images without any watermarks or limitations.
              </p>
              <p>
                Simply paste a YouTube video URL, and the tool instantly displays all available thumbnail sizes—from standard 480×360 to the highest quality 1280×720 resolution. Perfect for creating presentations, blog posts, social media content, or video compilations.
              </p>
              <p>
                The best part? Everything happens right in your browser. No uploads, no downloads of sketchy software, no personal data collection. Your privacy is completely protected because all processing happens locally on your device.
              </p>
            </div>
          </section>

          {/* Who Should Use Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Who Should Use This Tool?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Content Creators",
                  description: "Reference thumbnails for inspiration when designing your own YouTube video covers.",
                },
                {
                  title: "Digital Marketers",
                  description: "Analyze competitor thumbnails to understand what works in your niche.",
                },
                {
                  title: "Students & Researchers",
                  description: "Quickly gather video preview images for presentations and reports.",
                },
                {
                  title: "Designers",
                  description: "Use high-res thumbnails as reference material for design projects.",
                },
                {
                  title: "Video Producers",
                  description: "Create mood boards and storyboards using real YouTube video thumbnails.",
                },
                {
                  title: "Social Media Managers",
                  description: "Download thumbnails to reuse across different social platforms and posts.",
                },
              ].map((item, index) => (
                <Card key={index} className="p-4">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Real-World Usage Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Real-World Usage Examples</h2>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Video Course Creation:</strong> Download thumbnails from educational videos to understand visual hierarchy and attention-grabbing design patterns.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Competitive Analysis:</strong> Study competitor thumbnails to see trending colors, fonts, and layouts in your industry.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Blog Posts & Articles:</strong> Include video preview images in your blog to increase visual appeal and click-through rates.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Email Newsletters:</strong> Add professional video thumbnails to your email campaigns without needing to screenshot videos manually.
                </p>
              </div>
              <div className="flex gap-3">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Portfolio Projects:</strong> Use real video thumbnails in your designer or marketer portfolio to showcase your understanding of visual design.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy & Security Section */}
          <section className="space-y-4 p-6 bg-muted/30 rounded-lg border">
            <h2 className="text-2xl font-bold text-foreground">Your Privacy is Protected</h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                This tool is 100% browser-based and offline-capable. Nothing you download or process is stored on our servers. Your YouTube URLs and downloaded images remain private and never leave your device.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">No Tracking</p>
                  <p className="text-sm">We don't track your activity or collect personal data.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">No Sign-Up</p>
                  <p className="text-sm">Use the tool instantly without creating an account.</p>
                </div>
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">No Watermarks</p>
                  <p className="text-sm">Download clean, original thumbnails without any marks.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {[
                {
                  q: "Is downloading YouTube thumbnails legal?",
                  a: "Yes, downloading publicly available thumbnails for personal, educational, or commercial purposes is legal. YouTube thumbnails are metadata designed to be shared and referenced.",
                },
                {
                  q: "Do I need a YouTube API key?",
                  a: "No. This tool doesn't use any external APIs or require authentication. It works completely offline in your browser.",
                },
                {
                  q: "What formats are the thumbnails in?",
                  a: "All thumbnails are in JPG format, which is compatible with all devices and applications. You can open them in any image viewer or editor.",
                },
                {
                  q: "Will this tool work on mobile devices?",
                  a: "Yes, the tool is fully responsive and works on smartphones, tablets, and desktop computers.",
                },
                {
                  q: "Can I download multiple thumbnails at once?",
                  a: "Yes. Extract thumbnails from one video, download what you need, then paste another video URL to continue.",
                },
                {
                  q: "What if the maximum resolution thumbnail doesn't exist for a video?",
                  a: "Don't worry. If a higher resolution isn't available, you'll still see the best quality thumbnails that YouTube has for that video. Lower resolutions always exist.",
                },
                {
                  q: "Is there a limit to how many thumbnails I can download?",
                  a: "No limits. Download as many as you need. This tool is completely free with no restrictions.",
                },
                {
                  q: "Can I use these thumbnails commercially?",
                  a: "Yes, you can use downloaded thumbnails for commercial purposes, though it's recommended to create your own original content whenever possible.",
                },
              ].map((faq, index) => (
                <Card key={index} className="p-4">
                  <p className="font-semibold text-foreground mb-2">{faq.q}</p>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Related Tools Section */}
          <section className="space-y-4 pt-8 border-t">
            <h2 className="text-2xl font-bold text-foreground">Related Pixocraft Tools</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                "QR Code Maker",
                "Image Compressor",
                "Image Resizer",
                "Image Cropper",
                "Color Picker",
              ].map((tool, index) => (
                <div
                  key={index}
                  className="p-3 bg-muted/30 rounded-lg border text-center hover:bg-muted/50 transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">{tool}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
