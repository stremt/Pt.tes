import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Layers, FileImage, Zap, Shield, Target } from "lucide-react";

export default function BatchConvertPngToJpg() {
  useSEO({
    title: "Batch Convert PNG to JPG - Fast Multiple Image Conversion | Pixocraft",
    description: "Convert multiple PNG images to JPG format at once. Our batch processing tool is designed for speed and efficiency, helping you manage large galleries instantly.",
    keywords: "batch convert png to jpg, multiple png to jpg, bulk image converter, fast gallery conversion, offline batch tool"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PNG to JPG", url: "/tools/png-to-jpg" },
            { name: "Batch PNG to JPG Conversion", url: "/tools/png-to-jpg/batch" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
              Batch Convert PNG to JPG - Fast Multiple Image Conversion
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              In a world where time is our most precious asset, converting images one by one is no longer an option. Our batch PNG to JPG tool empowers you to transform entire galleries with a single action, streamlining your digital workflow like never before.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Layers className="h-8 w-8 text-primary" />
              <h3 className="font-bold">Massive Scale</h3>
              <p className="text-sm text-muted-foreground">Convert hundreds of files simultaneously without any slowdown.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Zap className="h-8 w-8 text-secondary" />
              <h3 className="font-bold">Parallel Speed</h3>
              <p className="text-sm text-muted-foreground">Leverage your system's multicore power for instant processing.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Total Security</h3>
              <p className="text-sm text-muted-foreground">Even large batches stay local, ensuring your data remains private.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Batch Conversion is a Game-Changer?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Efficiency isn't just about speed; it's about focus. By automating the repetitive task of image conversion, you free up your mental energy for more creative and impactful work. Whether you're a photographer preparing a delivery or a developer optimizing a website's assets, our batch tool provides the professional-level efficiency you need to succeed.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">A Seamless Bulk Experience</h2>
            <p className="text-muted-foreground leading-relaxed">
              We've designed our batch interface to be as frictionless as possible. There are no complicated menus or hidden settings. Just drag your group of PNGs into the drop zone, and our engine takes care of the rest. We handle the memory management and processing threads automatically, providing a smooth experience regardless of the size of your task.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Pitfalls in Bulk Workflows</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using batch tools that lose file metadata or naming conventions during conversion.</li>
              <li>Trusting cloud tools that throttle your upload speed or compromise your privacy.</li>
              <li>Neglecting to check the output quality of every file in the batch.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Security at the Speed of Light</h2>
            <p className="text-muted-foreground leading-relaxed">
              Handling large volumes of images shouldn't mean taking large risks. Pixocraft's batch converter works entirely offline in your browser's local sandbox. Your large galleries never leave your computer, ensuring that your commercial or personal assets remain strictly confidential. It's the ultimate combination of scale and security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Bulk PNG Conversion</h2>
            <div className="space-y-4">
              {[
                { q: "How many files can I convert at once?", a: "You can convert as many files as your device's memory can handle—often hundreds in a single session." },
                { q: "Is the batch feature also free?", a: "Yes, all bulk processing features are completely free on Pixocraft." },
                { q: "Will the output quality be consistent?", a: "Absolutely. Our engine applies the same high-quality parameters to every file in your batch." },
                { q: "Can I stop the process mid-way?", a: "Yes, you have full control and can stop or reset the tool at any time." },
                { q: "What happens if a file is corrupted?", a: "Our tool will clearly highlight any errors and allow you to proceed with the rest of the batch." }
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
            <h2 className="text-3xl font-bold">Optimize Your Bulk Workflow Now</h2>
            <p className="text-muted-foreground">The most efficient way to manage and convert large image galleries.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/png-to-jpg">
                <Button size="lg" className="gap-2">
                  Use the Batch Converter
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/png-to-jpg" className="text-primary hover:underline">Main PNG to JPG Tool</Link>
              <Link href="/tools/image-resizer" className="text-primary hover:underline">Bulk Image Resizer</Link>
              <Link href="/tools/image-compressor" className="text-primary hover:underline">Bulk Image Compressor</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
