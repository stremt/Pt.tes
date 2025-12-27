import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Image as ImageIcon, Shield, Zap } from "lucide-react";

export default function CustomPdfWatermarkCreator() {
  useSEO({
    title: "Custom PDF Watermark Creator - Personalized Document Marks | Pixocraft",
    description: "Create personalized watermarks for your PDF documents. Add custom text or logos with precision control. Fast, free, and completely secure browser-based creator.",
    keywords: "custom pdf watermark creator, personalized pdf marks, create pdf watermark, custom logo watermark, professional watermark tool"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Custom Watermark", url: "/tools/pdf-watermark-adder/custom" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Custom PDF Watermark Creator - Personalized Marks</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Generic watermarks don't cut it. Our custom creator allows you to design unique identifiers that reflect your brand and specific document status with professional precision.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Logo Support</h3>
              <p className="text-sm text-muted-foreground">Upload and position your own brand graphics with ease.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">Total Control</h3>
              <p className="text-sm text-muted-foreground">Adjust transparency, angle, and layout for the perfect mark.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">Everything stays local on your machine. No data harvesting.</p>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Customize Your PDF Watermarks?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Standard "Confidential" or "Draft" marks are often ignored. By customizing your watermark with your own branding, specific project names, or unique tracking numbers, you create a more effective deterrent and a more professional document. Personalization allows you to tailor the protection to the exact context of the document, ensuring that everyone who sees it knows exactly who it belongs to and what its purpose is.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Creative Edge</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Pixocraft, we believe that security tools should also be powerful creative tools. Our custom watermark creator gives you the freedom to design protection that looks good. We handle the complex rendering needed to ensure your custom marks don't obscure important information while still providing a robust layer of security. It's the ultimate balance of form and function.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Custom Designs</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using high-contrast colors that interfere with reading the document.</li>
              <li>Neglecting to check how the watermark looks on different backgrounds within the file.</li>
              <li>Trusting cloud-based sites that might keep a library of your custom branding assets.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy at Scale</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you use your own brand assets, you need to know they're safe. Pixocraft's local processing ensures that even your proprietary logos and custom text stay securely on your machine. We never have access to your assets, giving you the peace of mind that your brand's integrity is always protected.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Customizing Watermarks</h2>
            <div className="space-y-4">
              {[
                { q: "Can I use any font for text watermarks?", a: "We provide a selection of professional web-safe fonts optimized for PDF rendering." },
                { q: "Is there a limit on the number of custom marks?", a: "No, you can create and apply as many as you need for free." },
                { q: "Can I preview the watermark on every page?", a: "Yes, our interface provides a visual check to ensure consistency across the entire document." },
                { q: "Do I have to sign up to save my designs?", a: "No, we don't use accounts. You can recreate your designs quickly each time you visit." },
                { q: "Will the image watermark maintain its colors?", a: "Yes, we preserve the original colors while allowing you to adjust transparency." }
              ].map((faq, i) => (
                <Card key={i} className="hover-elevate">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.q}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{faq.a}</CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-center py-8">
            <h2 className="text-3xl font-bold">Create Your Custom Watermark Now</h2>
            <p className="text-muted-foreground">The most efficient way to turn your protection into a professional brand statement.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-watermark-adder">
                <Button size="lg" className="gap-2">
                  Access Custom Creator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-watermark-adder" className="text-primary hover:underline">Main Watermark Tool</Link>
              <Link href="/tools/image-cropper" className="text-primary hover:underline">Image Cropper</Link>
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">PDF Merger</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
