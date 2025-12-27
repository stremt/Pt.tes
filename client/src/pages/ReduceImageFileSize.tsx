import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ReduceImageFileSize() {
  useSEO({
    title: "Reduce Image File Size – Compress Images Instantly | Pixocraft",
    description: "Reduce image file size easily. Compress photos without quality loss for storage, sharing, and web optimization.",
    keywords: "reduce image file size, compress image, reduce photo size, shrink image size, image file size reducer"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Compressor", url: "/tools/image-compressor" },
            { label: "Reduce File Size" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Reduce Image File Size – Compress Without Quality Loss
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Image file sizes often consume excessive storage and slow down sharing. Reducing image file size is essential for efficient storage, faster uploads, and smoother workflow. Modern image compression reduces file sizes by 50-80% while maintaining visual quality indistinguishable from originals. Reducing file size is simple with the right compression tool.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why File Size Reduction Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Large image files consume storage quickly, requiring expensive storage upgrades or frequent deletions. Cloud storage services charge for exceeded quotas. Large files are slow to upload and download, especially on mobile connections. Reducing file size addresses all these problems simultaneously.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              File size reduction also improves user experience. Faster uploads and downloads mean quicker workflow and happier users. Cloud backup services back up compressed images faster, protecting data more efficiently. Content creators, photographers, and everyday users all benefit from smaller files.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How File Size Reduction Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              Image compression algorithms analyze files and remove unnecessary data while preserving visual appearance. Compression varies by image type—photographs compress well with JPG format, graphics compress well with PNG. Smart compression chooses optimal settings for your specific image to achieve maximum file size reduction.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              File size reduction doesn't require sacrificing quality. Modern compression is so efficient that reduced files appear identical to originals. Even aggressive compression often shows no visible differences. This incredible efficiency means you can reduce storage needs dramatically while maintaining image quality.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common File Size Reduction Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many people attempt file size reduction using overly aggressive methods, resulting in visible quality loss. Others resize images instead of compressing, losing resolution unnecessarily. Proper compression maintains resolution while reducing file size through intelligent algorithms.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is storing only compressed versions without backups of originals. If you later need higher quality, you cannot recover it from compressed files. Always maintain backup copies of original uncompressed files for archival and future editing needs.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Local Compression</h2>
            <p className="text-muted-foreground leading-relaxed">
              File size reduction should never expose your images to third parties. Pixocraft's compressor runs entirely offline in your browser—images are compressed locally. No images are transmitted, stored, or analyzed on external servers. Your images remain completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline compression ensures maximum control and privacy. Images never reach cloud services. You maintain complete control over compression settings and results. This privacy-first approach is essential for sensitive or proprietary images.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How much can image file size be reduced?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Modern compression typically reduces file sizes by 50-80% while maintaining visual quality. A 10MB image might reduce to 2-4MB. Compression amount depends on image type, resolution, and compression settings. Test your images to see typical reduction rates.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Does file size reduction affect image resolution?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Quality compression maintains resolution—your image dimensions remain unchanged. Compression removes unnecessary data while preserving pixel count. Resolution and file size are independent. You can reduce file size dramatically while maintaining full resolution.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What's the best way to reduce image files?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Use moderate compression balancing file size reduction and quality. Test different compression levels to find your ideal balance. For most images, compression removes 50%+ of file size with zero visible quality loss. Start conservative and increase compression gradually.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I undo file size reduction?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, compression is permanent—you cannot recover uncompressed data. Always keep backup copies of original uncompressed images. Store originals safely for future needs while using compressed versions for sharing and storage.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Which image formats reduce file size best?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  JPG is excellent for photographs and detailed images. PNG works well for graphics and images requiring transparency. Modern formats like WebP provide even better compression. Choose formats optimized for your specific image type.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How often should I reduce image files?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Reduce file size before uploading to cloud storage, sharing online, or storing on devices with limited capacity. Make compression part of your standard image workflow. Regular compression helps maintain efficient storage and fast sharing.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Reduce Your Image File Sizes Today</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cut image file sizes dramatically with intelligent compression. Save storage space and speed up uploads. Try Pixocraft's image compressor now—no signup required, completely offline, and entirely private.
            </p>
            <Link href="/tools/image-compressor">
              <Button className="gap-2">
                Reduce File Size Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold">Related Tools</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Reduce image file sizes
              </li>
              <li>
                <Link href="/tools/image-resizer" className="hover:text-foreground transition-colors underline">
                  Image Resizer
                </Link>
                {" "} – Resize images efficiently
              </li>
              <li>
                <Link href="/tools/image-optimizer" className="hover:text-foreground transition-colors underline">
                  Image Optimizer
                </Link>
                {" "} – Optimize image quality
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
