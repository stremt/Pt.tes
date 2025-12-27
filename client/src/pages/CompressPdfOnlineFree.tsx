import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Minimize2, Shield, Zap } from "lucide-react";

export default function CompressPdfOnlineFree() {
  useSEO({
    title: "Compress PDF Online Free - Instant File Size Reducer | Pixocraft",
    description: "Shrink your PDF documents instantly without losing quality. Our free online PDF compressor is secure, fast, and works directly in your browser with no uploads.",
    keywords: "compress pdf online free, free pdf compressor, shrink pdf size online, online pdf reducer, secure pdf compression"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Compress PDF Online", url: "/tools/pdf-compressor/online" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Compress PDF Online Free - Instant Reducer</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Struggling with large PDF files that are too big to email or upload? Our free online PDF compressor provides a powerful, secure solution to shrink your documents instantly while maintaining professional visual quality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Minimize2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Smart Compression</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our intelligent algorithms target redundant data and optimize images within your PDF, ensuring maximum size reduction with minimum quality loss.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Local Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your files never leave your device. We use modern browser technology to compress your PDFs locally, providing the ultimate level of data privacy.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why People Choose Online PDF Compression</h2>
            <p className="text-muted-foreground leading-relaxed">
              In a world of digital communication, file size limits are everywhere. Emails often reject attachments over 25MB, and government portals frequently have even stricter restrictions. Online compression allows you to bypass these hurdles without needing to install expensive professional software. It's the perfect solution for individuals and businesses who need to optimize their documentation for speed and efficiency.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How the Pixocraft Compressor Helps</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft offers a streamlined, user-focused experience. Our tool is designed to be accessible to everyone, regardless of technical expertise. Simply drag and drop your file, select your preferred compression level, and get your smaller PDF in seconds. We handle the technical complexities of image resampling and font subsetting, providing you with a clean, high-quality output.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in PDF Compression</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using aggressive compression that makes text blurry or images pixelated.</li>
              <li>Trusting sites that keep a copy of your sensitive documents on their servers.</li>
              <li>Failing to test the compressed file before sending it to an important recipient.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Safety Guaranteed</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your security is non-negotiable. Pixocraft performs all compression operations entirely within your browser's local environment. No data is transmitted to our servers, and we have no access to your documents. This "zero-server" approach ensures that your private information remains strictly confidential throughout the entire process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is it really free?", a: "Yes, all our tools are 100% free with no hidden charges or watermarks." },
                { q: "Will the quality decrease?", a: "We use smart compression to keep the visual loss invisible to the human eye for most standard documents." },
                { q: "Can I compress multiple PDFs at once?", a: "Our tool currently focuses on one document at a time to ensure maximum precision and quality." },
                { q: "Do I need to sign up?", a: "No account or registration is required to use any of our tools." },
                { q: "What is the maximum file size?", a: "There is no strict limit, though performance depends on your computer's RAM." }
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
            <h2 className="text-3xl font-bold">Compress Your PDF Now</h2>
            <p className="text-muted-foreground">Fast, free, and completely secure. Shrink your files in seconds.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-compressor">
                <Button size="lg" className="gap-2">
                  Use PDF Compressor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline">Main PDF Compressor Tool</Link>
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">PDF Merger</Link>
              <Link href="/tools/pdf-splitter" className="text-primary hover:underline">PDF Splitter</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
