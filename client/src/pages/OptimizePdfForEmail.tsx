import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Mail, Shield, Zap } from "lucide-react";

export default function OptimizePdfForEmail() {
  useSEO({
    title: "Optimize PDF for Email - Seamless Document Sharing | Pixocraft",
    description: "Shrink your PDF documents to the perfect size for email attachments. Ensure your files are delivered instantly without bounce-backs or delays.",
    keywords: "optimize pdf for email, shrink pdf for attachment, small pdf for email, fast email pdf tool, secure email optimization"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Optimize for Email", url: "/tools/pdf-compressor/email" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Optimize PDF for Email - Seamless Sharing</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Nothing stops a workflow faster than an email bounce-back. Our email optimization tool ensures your PDF documents are the perfect size for any inbox, guaranteeing your information gets delivered exactly when it's needed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Email Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We apply optimization profiles specifically designed to hit standard email attachment limits while maintaining crisp visual quality.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Instant Delivery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Get your optimized file in milliseconds. Our streamlined engine is built for the high-speed demands of modern communication.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Science of Email Optimization</h2>
            <p className="text-muted-foreground leading-relaxed">
              Email servers use a system called Base64 encoding for attachments, which actually increases the file size by about 33%. This means a 20MB PDF will actually take up 27MB of space in an email, often triggering a bounce-back. Optimization reduces the raw file size so that even after encoding, it remains safely within common 25MB or 10MB limits. It's the technical secret to ensuring your professional communications are never delayed.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Pixocraft is the Better Way to Share</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft provides a clean, professional interface that respects your time. We've removed all the friction from the optimization process. No signups, no complex settings—just a reliable tool that gives you the perfect file for your email needs. Our engine is optimized for the latest web standards, ensuring your documents look great on any recipient's screen.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Email Attachments</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Sending unoptimized files that clog up your recipient's inbox.</li>
              <li>Trusting cloud-based platforms that might keep a copy of your private emails.</li>
              <li>Using tools that strip out essential document metadata during optimization.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Secure Local Optimization</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sensitive business communication requires the highest level of security. Pixocraft's email optimization happens entirely in your browser's local memory. Your documents never touch our servers, providing a level of privacy that traditional cloud tools simply can't match. It's the most secure way to prepare your files for sharing.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Optimizing PDFs for Email</h2>
            <div className="space-y-4">
              {[
                { q: "Is the tool free for professional use?", a: "Yes, all Pixocraft features are completely free for everyone." },
                { q: "Will the PDF look blurry on a phone?", a: "No, we use smart resampling to ensure text and graphics remain clear on all devices." },
                { q: "Can I optimize password-protected files?", a: "Yes, our tool can process them locally if you have the password." },
                { q: "How fast is the optimization?", a: "Since it happens locally, it's significantly faster than tools that require uploads." },
                { q: "What is the best format for email?", a: "PDF is the universal standard for professional sharing, and our tool ensures yours is perfect." }
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
            <h2 className="text-3xl font-bold">Optimize Your PDF for Email Now</h2>
            <p className="text-muted-foreground">Ensure your documents reach their destination every time.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-compressor">
                <Button size="lg" className="gap-2">
                  Use Email Optimizer
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
