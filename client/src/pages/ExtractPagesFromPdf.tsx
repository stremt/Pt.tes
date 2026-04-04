import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Scissors, Shield, Zap } from "lucide-react";

export default function ExtractPagesFromPdf() {
  useSEO({
    title: "Extract Pages from PDF - High Quality Page Selection | Pixocraft",
    description: "Easily extract specific pages or page ranges from any PDF document. Our professional page selection tool is fast, free, and preserves document integrity.",
    keywords: "extract pages from pdf, pdf page selection, select pdf pages, high quality pdf extraction, professional pdf extractor",
    canonical: "https://tools.pixocraft.in/tools/pdf-splitter/extract"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Extract PDF Pages", url: "/tools/pdf-splitter/extract" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Extract Pages from PDF - High Quality Selection</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Sometimes a whole document is too much. Our extraction tool allows you to isolate exactly the pages you need, ensuring your output is professional, focused, and high-quality every single time.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Fast Extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Identify and extract your target pages in seconds with our optimized processing engine.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Document Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We preserve all internal links, fonts, and high-resolution assets during the extraction process.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Benefit of Targeted Page Extraction</h2>
            <p className="text-muted-foreground leading-relaxed">
              When communicating with clients or partners, sending only the relevant pages shows respect for their time and focus. Page extraction allows you to create lean documents that are specifically tailored to your recipient's needs. It's an essential skill for legal professionals, researchers, and business executives who deal with large-scale documentation but need to highlight specific points.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Pixocraft is the Professional Choice</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft is designed for professionals who don't compromise. Our extraction engine is built to handle complex PDF structures, ensuring that your output remains perfectly searchable and clear. We prioritize the preservation of document fidelity, so your extracted pages look exactly as they were intended in the original file.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Page Selection</h2>
            <p className="text-muted-foreground leading-relaxed">
              The biggest error is using tools that re-render the PDF, which can lead to font issues or lost metadata. Another mistake is Trusting sites that store your extracted pages on their servers. Pixocraft's local-first approach ensures that your documents look perfect and stay private throughout the extraction process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your professional data is your asset. That's why Pixocraft performs all extraction operations locally in your browser. No data is transmitted to our servers, and we have no access to your documents. It's the most secure way to isolate and manage your professional assets.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Extracting PDF Pages</h2>
            <div className="space-y-4">
              {[
                { q: "Is the output PDF searchable?", a: "Yes, we preserve the text layer, ensuring your extracted pages remain fully searchable." },
                { q: "Can I extract pages from multiple PDFs at once?", a: "Our current tool focuses on one document at a time for maximum precision." },
                { q: "Will the internal links still work?", a: "Yes, we maintain the document's internal linking structure during extraction." },
                { q: "Is there a charge for high-quality extraction?", a: "No, all Pixocraft features are completely free for both personal and professional use." },
                { q: "What is the best way to select a large range?", a: "Our interface allows you to type in specific page ranges for quick and easy selection." }
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
            <h2 className="text-3xl font-bold">Extract Your Pages Now</h2>
            <p className="text-muted-foreground">The professional choice for precise and secure document management.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-splitter">
                <Button size="lg" className="gap-2">
                  Use Extraction Tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-splitter" className="text-primary hover:underline">Main PDF Splitter Tool</Link>
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">PDF Merger</Link>
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline">PDF Compressor</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
