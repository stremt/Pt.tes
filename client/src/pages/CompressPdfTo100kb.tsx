import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Target, Shield, Zap } from "lucide-react";

export default function CompressPdfTo100kb() {
  useSEO({
    title: "Compress PDF to 100KB - High Precision Size Reduction | Pixocraft",
    description: "Precisely shrink your PDF documents down to 100KB or less. Perfect for government portal uploads and strict email limits. Fast, free, and completely secure.",
    keywords: "compress pdf to 100kb, shrink pdf to specific size, pdf compressor 100kb, exact size pdf reduction, small pdf creator",
    canonical: "https://tools.pixocraft.in/tools/pdf-compressor/100kb"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Compress to 100KB", url: "/tools/pdf-compressor/100kb" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Compress PDF to 100KB - High Precision</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Need to hit a very specific file size limit? Our high-precision compressor is designed to help you reach that elusive 100KB mark, making your documents compatible with even the most restrictive online portals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Targeted Compression</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our engine provides fine-tuned control over compression parameters, allowing you to reach your target size with professional accuracy.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Intelligent Scaling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We automatically adjust image resolutions and metadata to ensure your document fits within the 100KB threshold without becoming unreadable.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why the 100KB Limit Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many government and educational portals have legacy systems with extremely low file size limits—often as low as 100KB. Reaching this size manually is nearly impossible without specialized tools. Our precision compressor takes the guesswork out of the process, providing you with a file that is small enough to upload but clear enough to be processed. It's the ultimate tool for official applications and archival work.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Pixocraft Achieves Precision</h2>
            <p className="text-muted-foreground leading-relaxed">
              Reaching 100KB requires a multi-layered approach. Our tool identifies non-essential metadata, subsets fonts to only include used characters, and applies advanced resampling to images. By combining these techniques, we can often shrink documents that other tools struggle with. All of this happens in a single click, providing you with a professional-grade result instantly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Precision Work</h2>
            <p className="text-muted-foreground leading-relaxed">
              The biggest error is assuming a "standard" compression will always work. For 100KB targets, you often need multiple passes or specific settings. Another mistake is using tools that re-render the PDF as an image, which breaks text searchability. Pixocraft's intelligent approach ensures your document remains a professional PDF throughout the process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Safe & Private Precision</h2>
            <p className="text-muted-foreground leading-relaxed">
              Official documents often contain sensitive personal data. That's why Pixocraft's precision tools happen entirely in your browser. No data is transmitted to our servers, and we have no access to your documents. It's the most secure way to manage your high-precision document needs.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: 100KB PDF Compression</h2>
            <div className="space-y-4">
              {[
                { q: "Is it guaranteed to hit 100KB?", a: "While we can't defy physics, our tool is optimized to get as close as possible without destroying the document." },
                { q: "Will the text still be readable?", a: "Yes, we prioritize text clarity even at high compression levels." },
                { q: "Can I use this for my resume?", a: "Absolutely. It's perfect for ensuring your resume is small enough for any HR portal." },
                { q: "Is the tool free for all users?", a: "Yes, all our high-precision features are completely free." },
                { q: "What if the file is still too big?", a: "Try removing non-essential images or pages before running the compression again." }
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
            <h2 className="text-3xl font-bold">Hit Your 100KB Target Now</h2>
            <p className="text-muted-foreground">The most precise way to shrink your documents for official uploads.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-compressor">
                <Button size="lg" className="gap-2">
                  Use Precision Tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline">Main PDF Compressor Tool</Link>
              <Link href="/tools/pdf-to-image" className="text-primary hover:underline">PDF to Image</Link>
              <Link href="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
