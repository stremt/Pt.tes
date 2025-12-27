import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";

export default function ConvertPngToJpgOnline() {
  useSEO({
    title: "Convert PNG to JPG Online - Free & Secure | Pixocraft",
    description: "Convert your PNG images to JPG format online instantly. No software needed, no watermarks, and completely secure browser-based processing.",
    keywords: "convert png to jpg online, free online png converter, web based image converter, browser png tool, no install converter"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PNG to JPG", url: "/tools/png-to-jpg" },
            { name: "Online PNG to JPG Converter", url: "/tools/png-to-jpg/online" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert PNG to JPG Online - Free & Secure
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Modern workflows demand speed and accessibility. Our online PNG to JPG converter provides a professional-grade experience directly in your browser, eliminating the need for heavy desktop software or expensive subscriptions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Always Available</h3>
              <p className="text-sm text-muted-foreground">Access your tools from any device with a web browser.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">Zero Tracking</h3>
              <p className="text-sm text-muted-foreground">We never log your images or store your private data.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Rapid Results</h3>
              <p className="text-sm text-muted-foreground">Experience the fastest conversion engine on the web.</p>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Advantage of Online Conversion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Why install software that you only use once? Online tools offer the ultimate flexibility for modern users. Our PNG to JPG converter is built using advanced web technologies that bring the power of desktop applications to a simple URL. It's the perfect solution for students, professionals, and home users who need quick, reliable results without the overhead.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Pixocraft is the Best Choice Online</h2>
            <p className="text-muted-foreground leading-relaxed">
              Unlike other "free" sites that bombard you with ads or force you to sign up, Pixocraft is built for the user. We provide a clean, focused workspace where you can get your work done efficiently. Our online PNG to JPG tool is optimized for performance, ensuring that even high-resolution images are converted smoothly and accurately.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes with Online Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              A major pitfall of many online converters is the use of server-side processing, which exposes your files to potential breaches. Others might add intrusive watermarks or significantly downscale your images to save on their own bandwidth costs. Pixocraft avoids all of these issues by putting the user first.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">A New Standard for Web Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Pixocraft, we've redefined what "online" means. Our tools use client-side execution, meaning the actual image processing happens in your browser's memory. Your sensitive files never touch our servers, providing a level of security that traditional cloud tools simply cannot match. It's the convenience of the web with the safety of a local machine.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Online Image Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Do I need to download anything?", a: "No, everything works natively in your web browser." },
                { q: "Is there a file size limit?", a: "We don't impose a strict limit, though very large files may depend on your device's memory." },
                { q: "Can I use this on my mobile phone?", a: "Yes, our tool is fully optimized for iOS and Android browsers." },
                { q: "Are my images stored?", a: "No, since we don't upload them, they are never stored on our servers." },
                { q: "Is there a watermark?", a: "No, all conversions are clean and professional." }
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
            <h2 className="text-3xl font-bold">Access the Online Converter Now</h2>
            <p className="text-muted-foreground">Fast, free, and completely secure for all your conversion needs.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/png-to-jpg">
                <Button size="lg" className="gap-2">
                  Start Online Conversion
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/png-to-jpg" className="text-primary hover:underline">Main PNG to JPG Tool</Link>
              <Link href="/tools/image-compressor" className="text-primary hover:underline">Image Compressor</Link>
              <Link href="/tools/pdf-to-image" className="text-primary hover:underline">PDF to Image</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
