import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Image as ImageIcon, Zap, Shield, Target } from "lucide-react";

export default function ConvertJpgToPng() {
  useSEO({
    title: "Convert JPG to PNG - High Quality Transparent Conversion | Pixocraft",
    description: "Transform your JPG photos into high-quality PNG images instantly. Our tool preserves visual fidelity while enabling transparency support for your graphics.",
    keywords: "convert jpg to png, jpg to png converter, transparent png conversion, high quality image converter, offline image tool",
    canonical: "https://tools.pixocraft.in/tools/jpg-to-png/convert"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "JPG to PNG", url: "/tools/jpg-to-png" },
            { name: "Convert JPG to PNG", url: "/tools/jpg-to-png/convert" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert JPG to PNG - High Quality Transparent Conversion
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              While JPG is excellent for photographs, PNG is the gold standard for web graphics and design work. Converting your JPG files to PNG format is the first step in creating professional layouts, as PNG supports transparency and lossless compression. Our converter ensures that every detail of your original photo is captured in the new format without any degradation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Lossless Fidelity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Unlike JPG, PNG uses lossless compression. When you convert with Pixocraft, we ensure that no further data is lost during the transition, keeping your images sharp and professional.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Zero Upload Wait</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our tool processes your images locally in your browser. This means conversion happens at the speed of your hardware, bypassing slow upload and download times.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Convert JPG to PNG?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Designers and web developers often need PNGs for their ability to handle transparency. While a JPG will always have a solid background, a PNG can be saved with no background at all, allowing it to sit perfectly on top of other elements. Additionally, PNG handles text and sharp edges much better than JPG, making it the preferred choice for logos and icons.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Difference</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft offers a streamlined, ad-free environment for your conversion needs. We focus on one thing: providing the highest quality image transformation without the friction of accounts, subscriptions, or hidden fees. Just drag, drop, and you're done.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Conversion Errors to Avoid</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using low-quality online tools that introduce noise into the PNG file.</li>
              <li>Forgetting that converting a JPG to PNG doesn't automatically remove the background (you'll need an additional step for that).</li>
              <li>Repeatedly converting between formats, which can lead to cumulative quality loss.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Security You Can Count On</h2>
            <p className="text-muted-foreground leading-relaxed">
              In an era of data privacy concerns, Pixocraft keeps your files where they belong: on your computer. Our conversion engine runs entirely client-side, meaning your personal photos never reach our servers. It's the most secure way to handle your digital assets.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Will converting JPG to PNG make the background transparent?", a: "No, converting the format alone won't remove the background. However, it prepares the file so that you can add transparency in an editor." },
                { q: "Why is the PNG file larger than my JPG?", a: "PNG uses lossless compression to preserve quality, whereas JPG uses lossy compression to reduce file size. This often results in PNGs being larger." },
                { q: "Can I convert multiple files at once?", a: "Yes, our tool supports batch processing so you can convert an entire gallery in one go." },
                { q: "Does it work on mobile browsers?", a: "Absolutely. Pixocraft is optimized for both desktop and mobile devices." },
                { q: "Are there any watermarks?", a: "Never. All Pixocraft tools provide clean, watermark-free results." }
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
            <h2 className="text-3xl font-bold">Start Your Conversion Now</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experience the fastest and most secure way to transform your JPGs into professional-grade PNGs.
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/jpg-to-png">
                <Button size="lg" className="gap-2">
                  Use the JPG to PNG Tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/jpg-to-png" className="text-primary hover:underline">Main JPG to PNG Tool</Link>
              <Link href="/tools/png-to-jpg" className="text-primary hover:underline">PNG to JPG</Link>
              <Link href="/tools/image-compressor" className="text-primary hover:underline">Image Compressor</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
