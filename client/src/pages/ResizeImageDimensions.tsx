import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ResizeImageDimensions() {
  useSEO({
    title: "Resize Image to Specific Dimensions – Custom Size Images | Pixocraft",
    description: "Resize images to exact dimensions. Set custom width and height for any purpose in seconds.",
    keywords: "resize image dimensions, resize to specific size, custom image dimensions, exact image size, set image dimensions"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Resizer", url: "/tools/image-resizer" },
            { label: "Custom Dimensions" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Resize Image to Specific Dimensions – Custom Sizing
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Many image uses require exact dimensions. Website headers need specific pixel widths. Profile pictures need specific aspect ratios. Document images need precise dimensions. Resizing images to exact specifications ensures perfect fit for your specific needs. Custom dimension resizing provides the control necessary for professional results.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Custom Dimensions Matter</h2>
            <p className="text-muted-foreground leading-relaxed">
              Different applications require different image dimensions. Website design depends on exact pixel dimensions for headers, thumbnails, and backgrounds. Document formatting requires specific image sizes. Profile pictures need specific aspect ratios. Custom resizing enables perfect fit for any application.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Images with incorrect dimensions cause layout problems. Too-large images break designs. Too-small images look unprofessional. Correct dimensions are essential for proper appearance. Custom resizing ensures your images match exact requirements.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Custom Dimension Resizing Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              Custom resizing lets you specify exact width and height values. The resizer adjusts your image to precisely match your specifications. Choose whether to maintain aspect ratio, allowing padding if needed. Download your image resized to exact dimensions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Flexibility is critical for custom resizing. Different images may need different aspect ratio handling. Some need padding for exact dimensions. Others need aspect ratio preservation even if dimensions don't match exactly. Quality tools offer both options.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Custom Resizing Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many users specify dimensions without understanding how aspect ratio affects results. Specifying dimensions different from image aspect ratio causes distortion or padding. Understanding your needs—whether exact dimensions or aspect ratio preservation matters more—determines correct approach.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is specifying dimensions larger than original images. Upsizing images to larger dimensions reduces quality. Always resize from larger originals to smaller dimensions for best results. If you must upsize, expect quality reduction.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Precise Control</h2>
            <p className="text-muted-foreground leading-relaxed">
              Custom dimension resizing should never expose your images to third parties. Pixocraft's resizer runs entirely offline in your browser—your images are resized locally. No images are transmitted, stored, or analyzed on external servers. Your images remain completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline resizing ensures maximum control over your images. You specify exact dimensions and control aspect ratio handling. Images never reach external services. You maintain complete control throughout resizing.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How do I know what dimensions I need?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Check requirements for your specific use case. Website guidelines specify header dimensions. Social platforms specify image sizes. Document templates specify image dimensions. Research your specific requirement before resizing.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What if my image aspect ratio doesn't match target dimensions?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Quality resizers offer options. Maintain aspect ratio with padding added to fit exact dimensions. Or allow distortion to fit exact dimensions without padding. Choose which approach best suits your needs.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I resize to portrait or landscape specific dimensions?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, specify any width and height combination. Portrait dimensions are taller than wide. Landscape dimensions are wider than tall. Specify exactly what you need for perfect results.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What unit of measurement should I use?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Use pixels for web images and digital display. Use inches or centimeters for print dimensions. Different applications require different measurements. Specify units appropriately for your use case.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Will custom resizing reduce image quality?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Downsizing maintains quality well. Upsizing reduces quality notably. Maintain aspect ratio without extreme upsizing for best results. Test custom sizing on samples before applying to important images.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I save custom dimensions for repeated use?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Some tools remember custom dimensions for future use. Document your frequently-used dimensions for easy reference. Create presets in tools supporting them for faster repeated resizing.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Resize to Exact Dimensions Now</h2>
            <p className="text-muted-foreground leading-relaxed">
              Resize images to precise custom dimensions for perfect fit. Specify exact requirements and get perfectly-sized results. Try Pixocraft's image resizer now—no signup required, completely offline, and ideal for custom sizing.
            </p>
            <Link href="/tools/image-resizer">
              <Button className="gap-2">
                Resize Now
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
                {" "} – Resize to custom dimensions
              </li>
              <li>
                <Link href="/tools/image-cropper" className="hover:text-foreground transition-colors underline">
                  Image Cropper
                </Link>
                {" "} – Crop to specific size
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Compress resized images
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
