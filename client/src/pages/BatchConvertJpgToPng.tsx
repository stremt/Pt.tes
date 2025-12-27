import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Layers, FileImage, Zap, Shield, Target } from "lucide-react";

export default function BatchConvertJpgToPng() {
  useSEO({
    title: "Batch Convert JPG to PNG - Fast Multiple Image Conversion | Pixocraft",
    description: "Convert multiple JPG images to PNG format at once. Our batch processing tool is designed for speed and efficiency, helping you manage large galleries instantly.",
    keywords: "batch convert jpg to png, multiple jpg to png, bulk image converter, fast gallery conversion, offline batch tool"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "JPG to PNG", url: "/tools/jpg-to-png" },
            { name: "Batch JPG to PNG Conversion", url: "/tools/jpg-to-png/batch" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
              Batch Convert JPG to PNG - Fast Multiple Image Conversion
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Handling images one by one is a thing of the past. Whether you're managing a product catalog or an entire photo shoot gallery, our batch JPG to PNG tool allows you to transform your assets in bulk with zero effort.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Layers className="h-8 w-8 text-primary" />
              <h3 className="font-bold">Parallel Processing</h3>
              <p className="text-sm text-muted-foreground">Convert dozens of files simultaneously using your system's power.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Zap className="h-8 w-8 text-secondary" />
              <h3 className="font-bold">Instant Download</h3>
              <p className="text-sm text-muted-foreground">Get all your converted PNGs in a single, organized workflow.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Private & Bulk</h3>
              <p className="text-sm text-muted-foreground">Even large batches stay on your device for total data security.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Batch Conversion Matters?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Efficiency is the key to productivity. Manually converting fifty images would take an hour of your time; with Pixocraft's batch tool, it takes seconds. Our engine is designed to handle multiple image streams at once, leveraging modern browser technology to give you the performance of a high-end desktop application without the heavy installation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Streamlining Your Workflow</h2>
            <p className="text-muted-foreground leading-relaxed">
              We've built our interface to be as frictionless as possible. Simply select an entire folder or drag a group of files into the drop zone. Our tool automatically identifies the format, prepares the conversion parameters, and processes everything in the background while you focus on more important tasks.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Bulk Processing</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using batch tools that crash when handling more than ten files.</li>
              <li>Neglecting the organization of the output, leading to a mess of files.</li>
              <li>Trusting cloud tools that throttle your speed during large batch uploads.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy at Scale</h2>
            <p className="text-muted-foreground leading-relaxed">
              Just because you're converting a large volume of images doesn't mean your privacy should be compromised. Pixocraft's batch converter works entirely in your browser's local environment. Your large galleries never leave your computer, ensuring that your commercial or personal assets remain strictly confidential.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Batch Image Conversion</h2>
            <div className="space-y-4">
              {[
                { q: "How many files can I convert at once?", a: "You can upload dozens or even hundreds of files, limited only by your browser's memory." },
                { q: "Will my computer slow down?", a: "We optimize resource usage to ensure a smooth conversion process without freezing your system." },
                { q: "Can I cancel a batch halfway?", a: "Yes, you have full control over the process and can stop or reset at any time." },
                { q: "Is the batch feature also free?", a: "Absolutely. All bulk processing features are completely free on Pixocraft." },
                { q: "What happens if a file fails to convert?", a: "Our tool will provide a clear report and allow you to retry individual files without restarting the whole batch." }
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
            <h2 className="text-3xl font-bold">Start Batch Conversion Now</h2>
            <p className="text-muted-foreground">The most efficient way to manage large image galleries.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/jpg-to-png">
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
              <Link href="/tools/jpg-to-png" className="text-primary hover:underline">Main JPG to PNG Tool</Link>
              <Link href="/tools/image-resizer" className="text-primary hover:underline">Bulk Image Resizer</Link>
              <Link href="/tools/image-compressor" className="text-primary hover:underline">Bulk Image Compressor</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
