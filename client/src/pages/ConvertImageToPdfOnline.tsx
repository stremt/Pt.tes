import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";

export default function ConvertImageToPdfOnline() {
  useSEO({
    title: "Convert Image to PDF Online - Free & No Download | Pixocraft",
    description: "Transform your photos into PDF documents instantly with our free online converter. No software installation required. Secure, fast, and works in any browser.",
    keywords: "convert image to pdf online, free image to pdf converter, online pdf creator, browser based image converter, no install pdf tool"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "Image to PDF", url: "/tools/image-to-pdf" },
            { name: "Online Image to PDF Converter", url: "/tools/image-to-pdf/online" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert Image to PDF Online - Free & No Download
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Why clutter your computer with single-use software when you can do it all in your browser? Our online image to PDF converter is designed for the modern user who values speed, accessibility, and high-quality results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Universal Access</h3>
              <p className="text-sm text-muted-foreground">Works on Windows, Mac, Linux, and all mobile browsers.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">Privacy Built-in</h3>
              <p className="text-sm text-muted-foreground">We never upload your images. They stay on your device.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">High Speed</h3>
              <p className="text-sm text-muted-foreground">Experience instant conversion with our optimized engine.</p>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Convenience of Online Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              Online tools have revolutionized how we handle file management. By using a browser-based converter, you eliminate the risks associated with downloading untrusted executable files. It's the perfect solution for quick tasks where you need a professional result without the overhead of complex software.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Choose Pixocraft for Your Online Conversion?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft provides a seamless experience that prioritizes your time. Our tool is optimized for performance, ensuring that even large batches of high-resolution images are converted efficiently. We also provide a range of customization options, allowing you to adjust page size, orientation, and margins to fit your exact needs.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Is It Safe to Use Online Converters?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Safety is a major concern when using web tools. Many sites store your files or track your usage. Pixocraft is different. We use modern web APIs to perform the conversion directly in your browser's memory. This "zero-server" approach means your data never leaves your computer, providing a level of security that traditional cloud tools can't match.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes with Web-Based Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              A common error is using tools that apply heavy watermarks or significantly degrade image quality to save on bandwidth. Others might have hidden file size limits that stop you halfway through a task. Pixocraft avoids these pitfalls, providing a clean, high-quality, and truly free service.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Online Conversion Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is it compatible with my phone?", a: "Yes, our tool is fully responsive and works perfectly on both iOS and Android browsers." },
                { q: "Do I need to install any plugins?", a: "No, our converter works natively in all modern web browsers without any extra software." },
                { q: "What is the maximum file size?", a: "We don't impose a specific limit, though performance will depend on your device's available memory." },
                { q: "Can I convert multiple images at once?", a: "Yes, you can upload and convert an entire folder of images into a single PDF document." },
                { q: "How long are my files kept?", a: "Since we don't upload them, they are never stored on our end. They only exist in your browser while you're using the tool." }
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
            <h2 className="text-3xl font-bold">Access the Best Online Converter</h2>
            <p className="text-muted-foreground">Fast, free, and completely secure. Start converting your images now.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/image-to-pdf">
                <Button size="lg" className="gap-2">
                  Use Online Converter Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/image-to-pdf" className="text-primary hover:underline">Main Image to PDF Tool</Link>
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">PDF Merger</Link>
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline">PDF Compressor</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
