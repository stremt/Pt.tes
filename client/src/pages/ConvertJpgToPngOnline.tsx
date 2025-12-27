import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";

export default function ConvertJpgToPngOnline() {
  useSEO({
    title: "Convert JPG to PNG Online - Free & No Install | Pixocraft",
    description: "Convert your JPG images to PNG format online instantly. No software installation required. Secure, fast, and works in any browser with high-quality output.",
    keywords: "convert jpg to png online, free online image converter, web based jpg to png, browser image tool, no download converter"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "JPG to PNG", url: "/tools/jpg-to-png" },
            { name: "Online JPG to PNG Converter", url: "/tools/jpg-to-png/online" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert JPG to PNG Online - Free & No Install
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Stop cluttering your system with specialized software. Our online JPG to PNG converter provides a powerful, professional solution directly in your web browser. Accessibility meets performance in our clean, user-first interface.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Web-Based Ease</h3>
              <p className="text-sm text-muted-foreground">Access the tool from any device, anywhere in the world.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">Encrypted Workflow</h3>
              <p className="text-sm text-muted-foreground">Your privacy is guaranteed as processing is kept local.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">High Efficiency</h3>
              <p className="text-sm text-muted-foreground">Get your files converted in milliseconds, not minutes.</p>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Power of Online Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              Online tools have transformed the way we work. By moving the conversion process to the cloud—or in our case, the browser's local sandbox—we remove the barriers of entry. You don't need a high-end computer or expensive software to get professional results. All you need is a browser and an internet connection.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Use Pixocraft Online?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft stands out by offering a truly free, high-performance experience. Our online JPG to PNG tool is optimized for the latest web standards, ensuring that your images are processed with absolute precision. We don't believe in forcing users through endless loops of ads or signups; we just provide the tools you need to get the job done.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Online Conversion Pitfalls</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many free online converters are notorious for significantly reducing the resolution of your images or adding unwanted watermarks. Others may have hidden limitations on file size or the number of conversions. Pixocraft is built on transparency, providing a full-featured, high-quality tool for everyone.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Is My Data Safe with an Online Tool?</h2>
            <p className="text-muted-foreground leading-relaxed">
              With Pixocraft, the answer is a resounding yes. While we are an "online" website, our tools use client-side technology. This means the actual conversion happens inside your browser's memory on your own device. Your images are never uploaded to our servers, giving you the security of desktop software with the convenience of a web link.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Frequently Asked Online Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is there a daily limit?", a: "No, you can convert as many images as you need without any daily restrictions." },
                { q: "Do I need to sign up?", a: "No account or registration is required to use any of our tools." },
                { q: "Will the quality be reduced?", a: "No, we maintain the original quality of your JPG during the conversion to PNG." },
                { q: "Can I use it on my iPhone or Android?", a: "Yes, our responsive design ensures it works perfectly on all mobile devices." },
                { q: "What happens to my images after conversion?", a: "Since they were never uploaded, they are gone the moment you close the tab." }
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
            <h2 className="text-3xl font-bold">Try the Best Online JPG to PNG Converter</h2>
            <p className="text-muted-foreground">Fast, secure, and always free. Start your conversion now.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/jpg-to-png">
                <Button size="lg" className="gap-2">
                  Access Online Converter
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/jpg-to-png" className="text-primary hover:underline">Main JPG to PNG Tool</Link>
              <Link href="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link>
              <Link href="/tools/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
