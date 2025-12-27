import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ResizeImagesOnline() {
  useSEO({
    title: "Resize Images Online – Instant Image Resizing Tool | Pixocraft",
    description: "Resize images online instantly. No downloads needed, adjust image dimensions easily and free.",
    keywords: "resize images online, online image resizer, resize photo online, free image resize tool, instant image resizing"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Resizer", url: "/tools/image-resizer" },
            { label: "Online Tool" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Resize Images Online – Instant Image Resizing
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Resize images instantly without downloads, installations, or complex software. An online image resizer lets you adjust dimensions from any device—computer, tablet, or phone. Simply upload your image, specify desired dimensions, and download the resized result. Online resizing provides convenient access to professional image resizing without barriers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Online Image Resizing Is Convenient</h2>
            <p className="text-muted-foreground leading-relaxed">
              Online resizers eliminate setup barriers. No software installation, no compatibility issues, no updates to manage. Access from any device whenever needed. This convenience means you can resize images immediately, without interrupting your workflow.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Convenience drives actual usage. If resizing required technical setup, most people would skip it. Online tools make resizing as simple as uploading and downloading. This accessibility ensures everyone can resize images regardless of technical expertise.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Online Resizers Work</h2>
            <p className="text-muted-foreground leading-relaxed">
              Online image resizers work through simple interfaces. Upload your image, enter desired dimensions, and download the resized version. No special knowledge required—the tool handles all technical complexity. Quality online tools preserve image clarity while adjusting dimensions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Advanced online resizers offer additional options. Aspect ratio locking prevents unwanted distortion. Batch resizing handles multiple images efficiently. Some tools offer preset dimensions for common use cases. These features combine convenience with powerful functionality.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Online Resizing Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many users assume all online resizers preserve quality equally. Different tools vary in quality. Some upsize small images, resulting in poor quality. Others don't maintain aspect ratio, causing distortion. Always resize from larger originals to smaller dimensions for best results.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is trusting online tools without verifying privacy practices. Some tools store uploads or use them for analytics. Always use tools that explicitly guarantee no storage or analysis. Offline tools like Pixocraft's resizer ensure complete privacy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Trust of Online Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              Online image resizing should never expose your images to third parties. Pixocraft's resizer runs entirely offline in your browser—your images are resized locally. No images are transmitted, stored, or analyzed on external servers. Your images remain completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline resizing is the highest privacy standard for online tools. Everything happens on your device under your control. You can trust your images are never accessed externally because no intermediary could access them even if they wanted to.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is using an online image resizer safe?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, if the tool is offline and doesn't transmit images to servers. Pixocraft's resizer runs entirely in your browser—images never leave your device. Online tools that send images to servers add privacy risks. Verify privacy practices before using online resizers.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How long does online resizing take?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Online resizing is nearly instant—seconds from upload to download. Offline tools complete resizing immediately on your device. Processing speed depends on image size and device performance. Most resizing completes in seconds.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can online tools resize any image size?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, quality online resizers handle images of any size. Resize high-resolution photos or small thumbnails. Processing speed depends on image size and device. Offline tools handle any size limited only by device memory.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do online resizers work on mobile devices?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, responsive online resizers work on phones and tablets. Upload images from your device, specify dimensions, and download resized versions. Mobile-friendly resizers make image editing convenient everywhere.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I resize multiple images at once?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, many online tools support batch resizing. Upload multiple images and apply the same dimensions to all. Batch processing saves time when resizing image collections.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What file formats do online resizers support?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Quality tools support common formats including JPG, PNG, GIF, and WEBP. Most images use JPG or PNG, which all resizers handle. Check format compatibility before resizing unusual formats.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Start Resizing Images Now</h2>
            <p className="text-muted-foreground leading-relaxed">
              Resize images instantly with online tools. No downloads needed, completely offline, and available from any device. Adjust dimensions for any purpose. Try Pixocraft's online image resizer now—completely free and entirely private.
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
                {" "} – Resize images online
              </li>
              <li>
                <Link href="/tools/image-cropper" className="hover:text-foreground transition-colors underline">
                  Image Cropper
                </Link>
                {" "} – Crop images online
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Compress images online
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
