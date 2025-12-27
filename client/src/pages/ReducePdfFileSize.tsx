import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FileDown, Shield, Zap } from "lucide-react";

export default function ReducePdfFileSize() {
  useSEO({
    title: "Reduce PDF File Size - Professional Document Optimization | Pixocraft",
    description: "Easily reduce the file size of your PDF documents for easier sharing and storage. High-quality, fast, and completely secure browser-based optimization tool.",
    keywords: "reduce pdf file size, shrink pdf document, optimize pdf size, professional pdf reducer, fast pdf optimization"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Reduce PDF Size", url: "/tools/pdf-compressor/reduce-size" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Reduce PDF File Size - Professional Optimization</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Massive PDF files can be a logistical nightmare. Our reduction tool allows you to optimize your documents for the web, ensuring they load faster, take up less storage, and are easier to share with your clients and colleagues.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileDown className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Efficient Reduction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We focus on optimizing the heaviest parts of your PDF—images and embedded assets—to provide the most significant size reduction possible.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Rapid Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Experience instant document optimization. Our engine is built for speed, delivering professional results in a fraction of the time.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Importance of Document Optimization</h2>
            <p className="text-muted-foreground leading-relaxed">
              Large documents aren't just hard to email; they slow down your digital ecosystem. Webpages with heavy PDFs take longer to load, impacting user experience and SEO. In a professional setting, a small, optimized file shows attention to detail and consideration for your recipient's bandwidth. Reducing your file size is a critical step in professional digital management.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Pixocraft is the Professional Choice</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft provides a clean, focused workspace for your document needs. We've removed the clutter and the complex menus found in traditional desktop software. Our reduction tool provides intelligent defaults that work for 99% of professional use cases, ensuring your output is always high-quality and ready for delivery.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Pitfalls in Size Reduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              The biggest error is choosing a tool that compromises the text layer, potentially breaking searchability or accessibility. Another is trusting sites that don't value your data security. Pixocraft's local-first approach ensures that your documents look perfect and stay private throughout the optimization process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Uncompromising Security & Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your data is your asset. That's why Pixocraft performs all optimization operations locally in your browser. No data is transmitted to our servers, and we have no access to your documents. It's the most secure way to manage your sensitive professional document reduction.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Reducing PDF Sizes</h2>
            <div className="space-y-4">
              {[
                { q: "Is there a charge for high-quality reduction?", a: "No, all Pixocraft features, including professional-level optimization, are completely free." },
                { q: "Can I optimize very large files?", a: "Yes, our optimized engine is designed to handle high-resolution and high-page-count documents efficiently." },
                { q: "Will the text still be searchable?", a: "Yes, we maintain the underlying text layer of all documents during reduction." },
                { q: "How much size can I save?", a: "Reduction levels vary by document, but many users see savings of 50-80% on graphics-heavy PDFs." },
                { q: "What is the best way to share the result?", a: "Once optimized, your PDF is ready for email, cloud storage, or web publishing." }
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
            <h2 className="text-3xl font-bold">Optimize Your PDF Now</h2>
            <p className="text-muted-foreground">The most secure and efficient way to manage your document file sizes.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-compressor">
                <Button size="lg" className="gap-2">
                  Use Reduction Tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline">Main PDF Compressor Tool</Link>
              <Link href="/tools/image-compressor" className="text-primary hover:underline">Image Compressor</Link>
              <Link href="/tools/pdf-password-remover" className="text-primary hover:underline">PDF Password Remover</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
