import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Scissors, Shield, Zap } from "lucide-react";

export default function SeparatePdfPagesOnline() {
  useSEO({
    title: "Separate PDF Pages Online - Fast Individual Page Divider | Pixocraft",
    description: "Divide your PDF document into separate pages instantly. Our online separator is fast, free, and secure, providing individual files for every page of your PDF.",
    keywords: "separate pdf pages online, pdf page divider, divide pdf into pages, separate ig dp downloader, online pdf separator",
    canonical: "https://tools.pixocraft.in/tools/pdf-splitter/separate"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Separate PDF Pages", url: "/tools/pdf-splitter/separate" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">Separate PDF Pages Online - Fast Divider</h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Handling a hundred-page PDF as a single file can be cumbersome. Our online separator allows you to divide any document into its individual pages instantly, giving you the flexibility to manage each page as a standalone asset.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Scissors className="h-8 w-8 text-primary" />
              <h3 className="font-bold">Total Separation</h3>
              <p className="text-sm text-muted-foreground">Every single page becomes its own professional-grade PDF file.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Zap className="h-8 w-8 text-secondary" />
              <h3 className="font-bold">Lightning Speed</h3>
              <p className="text-sm text-muted-foreground">Our engine processes even massive documents in seconds.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Secure Local Divide</h3>
              <p className="text-sm text-muted-foreground">Your privacy is guaranteed as all processing stays on your device.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Separate PDF Pages?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Separation is the key to granular document management. When you divide a PDF into individual pages, you gain the ability to reorder, share, or archive specific pieces of information with surgical precision. It's the perfect solution for digitizing multi-document scans, separating individual student submissions from a single file, or preparing specific pages for social media sharing.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Efficiency Edge</h2>
            <p className="text-muted-foreground leading-relaxed">
              We've designed our page separator to be as frictionless as possible. You don't need a technical background to use Pixocraft. Our simple interface allows you to upload your asset and begin the separation process with a single click. We handle the technical heavy lifting of renaming and organizing the output, so you can focus on your workflow.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes When Dividing Files</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Dividing files on tools that lose the text layer (OCR) during processing.</li>
              <li>Trusting cloud-based platforms that might have daily limits on file counts.</li>
              <li>Neglecting to check the security of the connection before uploading sensitive data.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy at Scale</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you separate a document into hundreds of pages, you're handling a large amount of data. Pixocraft's local processing ensures that even your largest documents are divided securely on your machine. We never have access to your files, giving you the peace of mind that your privacy is always protected.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Separating PDF Pages</h2>
            <div className="space-y-4">
              {[
                { q: "How many pages can I separate at once?", a: "You can process documents with hundreds of pages, limited only by your browser's memory." },
                { q: "Is the text still searchable after separation?", a: "Yes, we preserve the original text layer in every individual page file." },
                { q: "Will the page size remain the same?", a: "Yes, every output file will maintain the exact dimensions of the original page." },
                { q: "Is it really free for large documents?", a: "Yes, all our features are completely free for everyone, regardless of document size." },
                { q: "Do I have to download pages one by one?", a: "No, our tool allows you to download all separated pages in a single, organized action." }
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
            <h2 className="text-3xl font-bold">Divide Your PDF Pages Now</h2>
            <p className="text-muted-foreground">The most efficient way to turn a monolithic file into manageable assets.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-splitter">
                <Button size="lg" className="gap-2">
                  Use Page Separator Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-splitter" className="text-primary hover:underline">Main PDF Splitter Tool</Link>
              <Link href="/tools/pdf-to-image" className="text-primary hover:underline">PDF to Image</Link>
              <Link href="/tools/pdf-watermark-remover" className="text-primary hover:underline">PDF Watermark Remover</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
