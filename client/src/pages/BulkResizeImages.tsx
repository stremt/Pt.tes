import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function BulkResizeImages() {
  useSEO({
    title: "Bulk Resize Images – Resize Multiple Images at Once | Pixocraft",
    description: "Bulk resize multiple images instantly. Apply same dimensions to photo collections in seconds, no manual processing.",
    keywords: "bulk resize images, resize multiple images, batch resize images, resize image batch, bulk image resizer"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Resizer", url: "/tools/image-resizer" },
            { label: "Bulk Resize" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Bulk Resize Images – Resize Multiple Photos Instantly
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Photographers and content creators often work with hundreds of images requiring resizing. Resizing individual images one-by-one is tedious and time-consuming. Bulk resizing tools process entire photo collections with single commands, applying identical dimensions to all images instantly. Bulk resizing saves hours of manual work while maintaining quality.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Bulk Resizing Saves Time</h2>
            <p className="text-muted-foreground leading-relaxed">
              Professional photographers shoot hundreds of images per session. Gallery websites need consistent dimensions across all photos. Social media calendars require uniform sizing. Manual resizing each image wastes enormous time. Bulk resizing processes entire galleries in seconds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Bulk resizing also ensures consistency. Every image receives identical treatment, avoiding slight variations from individual resizing. This consistency is critical for professional image galleries, portfolio websites, and content platforms requiring uniform dimensions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Bulk Resizing Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              Bulk resizing tools accept multiple image uploads simultaneously. Specify target dimensions once, and the tool applies them to all images. Each image is resized individually, maintaining aspect ratio or padding as specified. Download all resized images in seconds.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Quality bulk resizers maintain image integrity across all images. Resizing algorithms preserve clarity regardless of original dimensions. Batch processing completes efficiently even for large image collections. Modern tools handle hundreds of images without performance degradation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Bulk Resizing Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many users assume bulk resizing compromises quality. Quality bulk resizers maintain image clarity across all images. Test with a few images before processing entire collections. Verify output quality before committing all images to bulk resizing.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is losing original files during bulk resizing. Always maintain backup copies of originals. Use bulk resizing on copies, not originals. This provides flexibility to redo resizing with different dimensions if needed.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Secure Bulk Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Bulk resizing sensitive image collections should never expose your photos to third parties. Pixocraft's resizer runs entirely offline in your browser—images are resized locally. No images are transmitted, stored, or analyzed on external servers. Your photo collections remain completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline bulk resizing ensures maximum security for professional photography. Images never reach cloud services. You maintain complete control over your image library. This privacy protection is essential for professional and proprietary content.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How many images can I bulk resize?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Quality bulk resizers handle hundreds of images simultaneously. Processing speed depends on image sizes and device performance. Most collections resize within minutes. Offline tools process without server limits.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Does bulk resizing maintain aspect ratio?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, quality bulk resizers maintain aspect ratio by default for all images. This prevents distortion across your image collection. Some tools offer padding options for exact dimensions. Consistent treatment across all images is maintained.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I resize images to different dimensions in one batch?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Most bulk resizers apply identical dimensions to all images in a batch. For different dimensions per image, process multiple batches with different dimension sets. Some advanced tools allow per-image dimension specification.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How long does bulk resizing take?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Bulk resizing large collections takes minutes rather than hours of manual work. Processing speed depends on image count and device performance. Offline resizing occurs faster without network latency.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I undo bulk resizing?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, resizing is permanent. Always maintain backup copies of originals before bulk resizing. Store originals separately, and work on copies. This provides flexibility to redo resizing if needed.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens to image quality during bulk resizing?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Quality bulk resizers maintain image clarity across all images. Upsizing reduces quality more than downsizing. Resize from larger originals to smaller dimensions for best results. Test quality on sample images first.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Bulk Resize Your Image Collection Now</h2>
            <p className="text-muted-foreground leading-relaxed">
              Process hundreds of images instantly with bulk resizing. Save hours of manual work while maintaining consistent quality. Try Pixocraft's image resizer now—no signup required, completely offline, and ideal for bulk processing.
            </p>
            <Link href="/tools/image-resizer">
              <Button className="gap-2">
                Bulk Resize Now
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
                {" "} – Bulk resize image collections
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Compress bulk images
              </li>
              <li>
                <Link href="/tools/image-cropper" className="hover:text-foreground transition-colors underline">
                  Image Cropper
                </Link>
                {" "} – Bulk crop images
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
