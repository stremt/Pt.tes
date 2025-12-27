import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Globe, Shield, Zap, CheckCircle2, Laptop } from "lucide-react";

export default function ConvertPdfToImageOnline() {
  useSEO({
    title: "Convert PDF to Image Online - Fast & Free Web Tool | Pixocraft",
    description: "Convert your PDF files to images online without installing any software. Enjoy a seamless, browser-based experience with high-speed processing and total privacy.",
    keywords: "convert pdf to image online, free online pdf converter, web based pdf to image, browser pdf conversion, no download pdf tool"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF to Image", url: "/tools/pdf-to-image" },
            { name: "Online PDF to Image Converter", url: "/tools/pdf-to-image/online" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert PDF to Image Online - Fast & Free Web Tool
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              In a world that moves at lightning speed, you shouldn't be slowed down by heavy software. Our online PDF to image converter provides a professional-grade solution directly in your browser. No registration, no downloads, just pure efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Access Anywhere</h3>
              <p className="text-sm text-muted-foreground">Work from any device with an internet connection.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">Total Privacy</h3>
              <p className="text-sm text-muted-foreground">Your files stay on your machine. We never see them.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Instant Results</h3>
              <p className="text-sm text-muted-foreground">Fast processing for even the largest PDF files.</p>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Search for Online Solutions?</h2>
            <p className="text-muted-foreground leading-relaxed">
              People specifically look for online PDF converters because they need a tool that "just works." Whether you're on a library computer, a mobile device, or a locked-down office laptop, an online tool bypasses the need for administrative privileges. It's the most democratic way to handle document management.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Online Advantage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft stands out by combining the power of a desktop application with the accessibility of a website. Our tool uses modern web technologies to perform the conversion on your local machine, giving you the security of offline software with the ease of a URL.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Online Conversion Pitfalls</h2>
            <p className="text-muted-foreground leading-relaxed">
              Not all online tools are created equal. Many free converters are "data harvesters" that collect your documents to sell insights or train AI. Others force you to watch dozens of ads before giving you your file. Pixocraft is built for users, not advertisers, providing a clean and safe environment.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Is My Data Safe Online?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Yes, when you use Pixocraft. While we are an "online" tool, the magic happens in your browser's memory. Your files are never transmitted to our servers. This client-side approach eliminates the risk of data breaches or accidental exposure of your sensitive documents.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Everything You Need to Know</h2>
            <div className="space-y-4">
              {[
                { q: "Do I need to create an account?", a: "No, we believe in frictionless tools. You can use our converter immediately without sharing any personal information." },
                { q: "What browser works best?", a: "Our tool is compatible with all modern browsers including Chrome, Firefox, Safari, and Edge." },
                { q: "Are there any hidden costs?", a: "None. Pixocraft is free to use for everyone, forever." },
                { q: "Can I convert protected PDFs?", a: "If the PDF is password-protected, you will be prompted to enter the password on your device before conversion can begin." },
                { q: "Does it support high resolution?", a: "Yes, we maintain the document's original quality to ensure professional-looking images." },
                { q: "How many files can I convert?", a: "There are no arbitrary limits on our side. You can convert as many files as you need." }
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
            <h2 className="text-3xl font-bold">Try the Best Online PDF Converter</h2>
            <p className="text-muted-foreground">Fast, free, and completely private. The way tools should be.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-to-image">
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
              <Link href="/tools/pdf-to-image" className="text-primary hover:underline">Main PDF to Image Tool</Link>
              <Link href="/tools/pdf-splitter" className="text-primary hover:underline">PDF Splitter</Link>
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline">PDF Compressor</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
