import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Image as ImageIcon, Zap, Shield, FileDown } from "lucide-react";

export default function ConvertPngToJpg() {
  useSEO({
    title: "Convert PNG to JPG - High Quality Image Conversion | Pixocraft",
    description: "Transform your PNG images into high-quality JPG format instantly. Perfect for reducing file size and ensuring universal compatibility for your photos and graphics.",
    keywords: "convert png to jpg, png to jpg converter, image format conversion, high quality jpg, offline image tool"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PNG to JPG", url: "/tools/png-to-jpg" },
            { name: "Convert PNG to JPG", url: "/tools/png-to-jpg/convert" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert PNG to JPG - High Quality Image Conversion
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              PNG files are perfect for detailed graphics, but they can be unnecessarily large for simple photos or web sharing. Converting your PNGs to JPG format is the most effective way to optimize your digital assets without sacrificing visual appeal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileDown className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Significant Size Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  JPG uses sophisticated lossy compression to dramatically reduce file sizes, making them perfect for websites, emails, and mobile sharing where bandwidth is a priority.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Universal Compatibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  JPG is the most widely supported image format in existence. By converting your PNGs, you ensure your images can be viewed on any device or software without issues.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why People Convert PNG to JPG?</h2>
            <p className="text-muted-foreground leading-relaxed">
              The primary reason for this conversion is storage and performance optimization. PNG files, especially those with high detail, can take up a lot of space. JPG provides a more efficient way to store these images, which is critical for web performance and reducing loading times. Furthermore, many online platforms and legacy systems have strict file size limits that only a JPG can satisfy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Pixocraft Facilitates Professional Conversion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft uses advanced rendering algorithms to ensure that the transition from PNG to JPG is as smooth as possible. We handle the technical complexities of mapping colors and applying compression levels that maintain the highest possible visual fidelity. Our goal is to give you a JPG that looks identical to your PNG original but occupies a fraction of the space.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Pitfalls in PNG Conversion</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Applying too much compression, which leads to visible artifacts and "noise" in the image.</li>
              <li>Ignoring the loss of transparency, as JPG does not support transparent backgrounds.</li>
              <li>Using untrusted sites that may store or log your personal photographs.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Total Privacy & Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Pixocraft, your privacy is our foundation. Our conversion tool runs entirely within your web browser. Your images are never transmitted to a central server, ensuring that your data stays private and secure on your own device. This local processing also means the tool works even with a weak internet connection.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: PNG to JPG Conversion</h2>
            <div className="space-y-4">
              {[
                { q: "Will the quality decrease?", a: "JPG uses lossy compression, so there is a minor technical loss, but our tool is optimized to keep this loss invisible to the human eye." },
                { q: "What happens to transparent backgrounds?", a: "JPG doesn't support transparency. Any transparent areas in your PNG will be converted to a solid color (usually white)." },
                { q: "How many PNGs can I convert at once?", a: "Our tool supports batch processing, allowing you to convert an entire collection in a single session." },
                { q: "Is this tool free for commercial use?", a: "Yes, Pixocraft tools are completely free for both personal and professional projects." },
                { q: "Does it work on Mac and Windows?", a: "Yes, our browser-based approach ensures full compatibility with all operating systems." }
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
            <h2 className="text-3xl font-bold">Convert Your PNGs Today</h2>
            <p className="text-muted-foreground">The most secure and efficient way to optimize your image library.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/png-to-jpg">
                <Button size="lg" className="gap-2">
                  Use the PNG to JPG Tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/png-to-jpg" className="text-primary hover:underline">Main PNG to JPG Tool</Link>
              <Link href="/tools/jpg-to-png" className="text-primary hover:underline">JPG to PNG</Link>
              <Link href="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
