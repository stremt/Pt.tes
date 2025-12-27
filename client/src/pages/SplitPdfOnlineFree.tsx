import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Scissors, Shield, Zap } from "lucide-react";

export default function SplitPdfOnlineFree() {
  useSEO({
    title: "Split PDF Online Free - Instant PDF Page Extractor | Pixocraft",
    description: "Separate your PDF documents into individual pages or specific ranges instantly. Our free online PDF splitter is secure, fast, and works directly in your browser.",
    keywords: "split pdf online free, pdf page extractor, separate pdf pages, online pdf splitter, free pdf divider"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Split PDF Online", url: "/tools/pdf-splitter/online" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Split PDF Online Free - Instant Page Extractor</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Need only one page from a massive PDF report? Or want to divide a single document into separate files? Our free online PDF splitter provides a clean, fast, and secure way to extract exactly what you need from your documents.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Scissors className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Precise Splitting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Extract specific page ranges or split every single page into its own file with absolute precision.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Zero Uploads</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your privacy is guaranteed. All splitting happens locally in your browser, so your files never leave your device.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Use an Online PDF Splitter?</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF documents are often sent as monolithic files containing various sections that might not all be relevant to everyone. An online splitter allows you to decouple these sections, making it easier to share specific information with different stakeholders. It's the perfect solution for extracting a single invoice from a monthly statement or separating a legal contract into individual signature pages.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Pixocraft Makes Splitting Easy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft offers a modern, streamlined interface that prioritizes your time. Our tool provides a visual way to select the pages you want to keep. Unlike complex desktop software, Pixocraft is accessible from any device with a browser, allowing you to split documents on the go without any specialized training or software installation.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes When Splitting PDFs</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using untrusted sites that may store sensitive business data during the process.</li>
              <li>Incorrectly selecting page ranges, leading to incomplete or mismatched documents.</li>
              <li>Trusting sites that add unwanted watermarks or branding to your extracted pages.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Secure Browser-Based Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We understand the sensitivity of your documents. That's why Pixocraft's PDF splitter performs all operations locally. Your files are processed inside your browser's memory, ensuring that no data is transmitted to an external server. It's the most secure way to manage your digital assets.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Splitting PDFs Online</h2>
            <div className="space-y-4">
              {[
                { q: "Can I split a password-protected PDF?", a: "Yes, as long as you have the password, our tool can process it locally in your browser." },
                { q: "Will the quality of my images be affected?", a: "No, our splitting process is lossless and maintains the original quality of your document." },
                { q: "Is there a limit on how many times I can split?", a: "No, you can use our tool as many times as you need for free." },
                { q: "Can I extract specific non-consecutive pages?", a: "Yes, our interface allows you to select exactly which pages you want to extract into a new file." },
                { q: "What happens to the original file?", a: "Your original file remains untouched on your device; we simply create new files based on your selection." }
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
            <h2 className="text-3xl font-bold">Split Your PDF Now</h2>
            <p className="text-muted-foreground">Fast, free, and completely secure. Get exactly the pages you need.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-splitter">
                <Button size="lg" className="gap-2">
                  Access PDF Splitter
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
              <Link href="/tools/pdf-to-image" className="text-primary hover:underline">PDF to Image</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
