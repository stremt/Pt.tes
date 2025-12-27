import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FilePlus, Shield, Globe } from "lucide-react";

export default function MergePdfDocumentsFree() {
  useSEO({
    title: "Merge PDF Documents Free - High Quality PDF Joiner | Pixocraft",
    description: "Easily merge multiple PDF documents into one for free. No watermarks, no signups, and completely secure processing for all your professional needs.",
    keywords: "merge pdf documents free, free pdf joiner, join pdf without watermark, professional pdf merger, high quality pdf merger"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Merge PDF Free", url: "/tools/pdf-merger/free" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Merge PDF Documents Free</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Professional document handling shouldn't come with a price tag. Our free PDF merger allows you to combine your documents with professional-grade quality without any hidden costs or watermarks.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Truly Free</h3>
              <p className="text-sm text-muted-foreground">All features are unlocked with no daily limits or subscriptions.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-bold mb-2">No Watermarks</h3>
              <p className="text-sm text-muted-foreground">Get clean, professional documents ready for any corporate setting.</p>
            </Card>
            <Card className="text-center p-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <FilePlus className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-bold mb-2">High Quality</h3>
              <p className="text-sm text-muted-foreground">We preserve every pixel and font to ensure document integrity.</p>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Search for a Free PDF Merger?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many online services claim to be free but then add ugly watermarks or restrict the number of files you can process. Professionals need a reliable tool that respects their budget and their work. A free merger is essential for startups, small businesses, and students who handle large volumes of paperwork but want to maintain a professional appearance without expensive software licenses.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Professional Edge</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft bridges the gap between free tools and professional software. Our interface is clean and efficient, focusing on providing high-quality output without any distractions. We believe that access to basic document tools is a fundamental need in the modern digital age, and we're committed to keeping our merger free and accessible to everyone.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Free PDF Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              The biggest mistake is choosing a tool that compromises your document's quality to save on their server costs. Another error is trusting sites that don't clearly state their privacy policies. Pixocraft avoids these pitfalls by performing all merges locally, ensuring that your documents look perfect and stay private.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Secure Local Merging</h2>
            <p className="text-muted-foreground leading-relaxed">
              Security is often overlooked in free tools. At Pixocraft, we use the latest browser technologies to process your files on your own device. Your documents never touch our servers, making it impossible for them to be intercepted or misused. It's the ultimate combination of free access and high-end security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Free PDF Merging</h2>
            <div className="space-y-4">
              {[
                { q: "Is there really no watermark?", a: "Correct. We believe your documents should remain your own, with no branding added by us." },
                { q: "Can I merge password-protected PDFs?", a: "Yes, as long as you have the password, our tool can process them in your browser." },
                { q: "What is the maximum file size?", a: "We don't set a limit, though performance depends on your computer's RAM." },
                { q: "Can I rearrange pages after merging?", a: "Our tool allows you to set the order of the files before the final merge process." },
                { q: "Is it safe for legal documents?", a: "Yes, since processing is local, it's the most secure way to handle sensitive paperwork." }
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
            <h2 className="text-3xl font-bold">Access the Free Merger Now</h2>
            <p className="text-muted-foreground">High quality, no costs, and total security. Start merging now.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-merger">
                <Button size="lg" className="gap-2">
                  Merge Your PDFs Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">Main PDF Merger Tool</Link>
              <Link href="/tools/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link>
              <Link href="/tools/pdf-password-remover" className="text-primary hover:underline">PDF Password Remover</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
