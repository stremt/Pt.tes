import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ResizeImagesSocialMedia() {
  useSEO({
    title: "Resize Images for Social Media – Perfect Dimensions | Pixocraft",
    description: "Resize images for social media instantly. Get perfect dimensions for Instagram, Facebook, Twitter, and LinkedIn.",
    keywords: "resize images social media, instagram image size, facebook image dimensions, twitter image size, resize photos for social"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Resizer", url: "/tools/image-resizer" },
            { label: "Social Media" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Resize Images for Social Media – Perfect Dimensions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Each social media platform requires specific image dimensions for optimal display. Instagram, Facebook, Twitter, and LinkedIn all have different requirements. Incorrectly sized images display poorly, with stretching, cropping, or excessive white space. Resizing images to platform-specific dimensions ensures perfect display across all social platforms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Social Media Image Sizing Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Social media algorithms favor properly formatted content. Well-sized images display better in feeds, increasing visibility and engagement. Poorly sized images appear unprofessional, discouraging interaction. Getting dimensions right is critical for social media success.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Different platforms display images at different aspect ratios. Instagram favors square and vertical images. Facebook uses wider dimensions. Twitter works best with specific widths. LinkedIn has unique requirements. Resizing to each platform's specifications ensures optimal appearance everywhere.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Image Resizing Optimizes Social Media</h2>
            <p className="text-muted-foreground leading-relaxed">
              Image resizing tools adjust dimensions to exact platform specifications. Specify your platform, and the tool automatically applies correct dimensions. The resized image displays perfectly on that platform without stretching or cropping. No guessing dimensions or manual calculation needed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Resizing preserves image quality while adjusting dimensions. Your photo maintains visual clarity in new dimensions. This precise resizing is superior to manual editing or platform auto-cropping, which can result in unintended cropping or distortion.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Social Media Image Sizing Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many content creators assume one image size works across platforms. Different platforms require different dimensions. Uploading the same image everywhere results in poor display on most platforms. Professional content creators resize for each platform.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is relying on platform auto-cropping, which can cut off important content. Manual resizing before upload gives you control over what gets displayed. Proper resizing ensures your content appears exactly as intended.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Local Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Resizing social media images should never expose your photos to third parties. Pixocraft's resizer runs entirely offline in your browser—your images are resized locally. No images are transmitted, stored, or analyzed on external servers. Your social content remains completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline resizing ensures maximum control over your social media strategy. Images never reach external services. You maintain complete control throughout resizing. This privacy-first approach is essential for proprietary content.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What are ideal image sizes for each platform?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Instagram: 1080x1080 for posts, 1200x628 for stories. Facebook: 1200x628. Twitter: 1024x512. LinkedIn: 1200x627. Different platforms favor different aspects. Resize accordingly for each platform.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Does resizing affect image quality?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Upsizing small images to larger dimensions reduces quality. Downsizing maintains quality well. Resize from larger originals to smaller platform dimensions for best quality.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Should I resize before uploading to social media?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, resize before uploading ensures perfect display. Platform auto-cropping can cut important content. Pre-resizing gives you control over final appearance.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I resize images for multiple platforms at once?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, resize the same image to multiple platform dimensions. Create versions for Instagram, Facebook, and Twitter from one original. Batch resizing saves time.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What aspect ratio is best for social media?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Square (1:1) works well on all platforms. Vertical (4:5) performs well on Instagram. Horizontal (16:9) suits Facebook and Twitter. Test different ratios for your audience.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I maintain image aspect ratio while resizing?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Quality resizers maintain aspect ratio by default, adding padding if needed. This prevents distortion. Always verify aspect ratio preservation before finalizing resizing.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Optimize Your Social Media Images Today</h2>
            <p className="text-muted-foreground leading-relaxed">
              Resize images to perfect dimensions for every social platform. Maximize engagement with properly sized content. Try Pixocraft's image resizer now—no signup required, completely offline, and ideal for social media optimization.
            </p>
            <Link href="/tools/image-resizer">
              <Button className="gap-2">
                Resize Images Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold">Related Tools</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/tools/image-resizer" className="hover:text-foreground transition-colors underline">
                  Image Resizer
                </Link>
                {" "} – Resize for social media
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Compress for sharing
              </li>
              <li>
                <Link href="/tools/image-cropper" className="hover:text-foreground transition-colors underline">
                  Image Cropper
                </Link>
                {" "} – Crop images perfectly
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
