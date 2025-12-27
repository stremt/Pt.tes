import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, FileType, Layers } from "lucide-react";

export default function ConvertJpgToPngTransparent() {
  useSEO({
    title: "Convert JPG to PNG Transparent - Prepare Images for Transparency | Pixocraft",
    description: "Transform your JPGs into PNG format to enable transparency support. Perfect for logos, graphics, and web design. High-quality, fast, and secure conversion.",
    keywords: "convert jpg to png transparent, jpg to png background, transparent image conversion, prepare jpg for transparency, web graphic tool"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "JPG to PNG", url: "/tools/jpg-to-png" },
            { name: "Transparent PNG Conversion", url: "/tools/jpg-to-png/transparent" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert JPG to PNG Transparent - Prepare Images for Transparency
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              JPG files are essentially "flat" images that cannot hold alpha channel data. To create a graphic with a transparent background, you must first convert your JPG to PNG. This transformation unlocks the ability to remove unwanted backgrounds and integrate your visuals seamlessly into any design project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Alpha Channel Support</h4>
                <p className="text-sm text-muted-foreground">Unlock the layer needed for true background transparency.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Design Ready</h4>
                <p className="text-sm text-muted-foreground">Perfect for logos, product shots, and UI elements.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Transparency Advantage</h2>
            <p className="text-muted-foreground leading-relaxed">
              In modern web design and digital marketing, the ability to layer images is crucial. A transparent PNG allows you to place a logo over any background color without a restrictive white or black box around it. By converting your JPG to PNG, you're preparing your asset for professional-level integration across websites, video overlays, and social media graphics.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Preparation Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many people try to remove backgrounds from JPGs, but the resulting files are still trapped in a lossy format. Converting to PNG first ensures that once the background is removed, the remaining graphic is stored using lossless compression. This preserves the sharpness of the edges, which is vital for a clean, professional look.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Transparent Conversion Pitfalls</h2>
            <p className="text-muted-foreground leading-relaxed">
              A common mistake is assuming that the conversion itself will magically remove the background. Conversion only changes the format to one that *supports* transparency. Another error is using tools that introduce artifacts around the edges of your subject during the format change. Pixocraft ensures a clean, bit-perfect transformation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Your Privacy is Protected</h2>
            <p className="text-muted-foreground leading-relaxed">
              Preparing your company logos or personal photos for design work shouldn't involve privacy risks. Pixocraft's offline-first architecture ensures that your data remains on your local machine throughout the entire process. No data harvesting, no tracking—just professional tools for your workflow.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: About Transparent PNGs</h2>
            <div className="space-y-4">
              {[
                { q: "Does this remove the background automatically?", a: "No, this tool converts the file format to PNG, which is the necessary first step before background removal can happen." },
                { q: "Why use PNG instead of JPG for logos?", a: "PNG supports transparency and keeps text sharp, making it superior for any graphic containing text or solid colors." },
                { q: "Will the image quality improve?", a: "Conversion won't magically fix a blurry JPG, but it will prevent any *further* loss of quality." },
                { q: "Can I use the output in Photoshop?", a: "Yes, the resulting PNG is fully compatible with all professional design software." },
                { q: "Is the tool free for commercial use?", a: "Yes, all Pixocraft tools are free for both personal and professional projects." }
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
            <h2 className="text-3xl font-bold">Prepare Your Transparent Images</h2>
            <p className="text-muted-foreground">The first step to professional, background-free graphics.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/jpg-to-png">
                <Button size="lg" className="gap-2">
                  Access PNG Converter
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/jpg-to-png" className="text-primary hover:underline">Main JPG to PNG Tool</Link>
              <Link href="/tools/background-remover" className="text-primary hover:underline">Background Remover</Link>
              <Link href="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
