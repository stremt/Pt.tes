import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FilePlus, Shield, Zap } from "lucide-react";

export default function JoinMultiplePdfFiles() {
  useSEO({
    title: "Join Multiple PDF Files - Fast & Easy PDF Binder | Pixocraft",
    description: "Combine multiple PDF documents into one easily. Our fast and intuitive PDF binder helps you organize your files into a single cohesive document instantly.",
    keywords: "join multiple pdf files, pdf binder online, combine multiple pdfs, join pdf documents fast, easy pdf merger"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Join Multiple PDFs", url: "/tools/pdf-merger/join" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">Join Multiple PDF Files - Fast & Easy</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Scattered files are a hurdle to productivity. Whether you're archiving old records or preparing a presentation, joining multiple PDF files into a single document is the ultimate way to stay organized and efficient.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <FilePlus className="h-8 w-8 text-primary" />
              <h3 className="font-bold">Batch Processing</h3>
              <p className="text-sm text-muted-foreground">Select dozens of files at once and join them in a single click.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Zap className="h-8 w-8 text-secondary" />
              <h3 className="font-bold">Lightning Speed</h3>
              <p className="text-sm text-muted-foreground">Our engine processes your request instantly without any wait times.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Secure Local Join</h3>
              <p className="text-sm text-muted-foreground">Your privacy is guaranteed as all processing stays on your device.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Join Multiple PDF Files?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Managing ten different PDF files is ten times harder than managing one. By joining them together, you create a cohesive document that is easier to navigate, search, and share. It's the perfect solution for compile-heavy tasks like legal discovery, academic submissions, and corporate archival. A single "binder" file ensures that the order of information is preserved exactly as you intended.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Ease of Use</h2>
            <p className="text-muted-foreground leading-relaxed">
              We've designed our PDF binder to be as intuitive as possible. You don't need a technical background to use Pixocraft. Our simple interface allows you to upload and organize your assets quickly. We handle the technical heavy lifting of merging metadata and aligning pages, so you can focus on the content of your document.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes When Joining Files</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Joining files with conflicting page orientations without checking.</li>
              <li>Merging high-resolution files without considering the final file size.</li>
              <li>Trusting untrusted web tools that might corrupt your important documents.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy at Scale</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you join multiple files, you often handle a large amount of sensitive data. Pixocraft's local processing ensures that even your largest binders are created securely on your machine. We never have access to your documents, giving you the peace of mind that your privacy is always protected.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Joining Multiple PDFs</h2>
            <div className="space-y-4">
              {[
                { q: "Is there a maximum number of files I can join?", a: "No, you can join as many as you need, limited only by your browser's resources." },
                { q: "Will my images in the PDF be blurry?", a: "No, our joiner maintains the original resolution and quality of all images." },
                { q: "Can I join PDFs with different page sizes?", a: "Yes, our tool handles documents of varying dimensions seamlessly." },
                { q: "Is it really as fast as you say?", a: "Since it happens locally, it's significantly faster than tools that require uploads." },
                { q: "Do I have to pay for batch joining?", a: "No, all our features are completely free for everyone." }
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
            <h2 className="text-3xl font-bold">Create Your PDF Binder Now</h2>
            <p className="text-muted-foreground">The most efficient way to turn scattered files into a professional document.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-merger">
                <Button size="lg" className="gap-2">
                  Use PDF Joiner Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">Main PDF Merger Tool</Link>
              <Link href="/tools/pdf-watermark-adder" className="text-primary hover:underline">PDF Watermark Adder</Link>
              <Link href="/tools/pdf-rotator" className="text-primary hover:underline">PDF Rotator</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
