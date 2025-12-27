import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FileCheck, Shield, Zap } from "lucide-react";

export default function SimpleBillingGeneratorNonTechnicalUsers() {
  useSEO({
    title: "Simple Billing Generator for Non-Technical Users | Pixocraft",
    description: "The easiest way to create professional invoices. Designed for non-technical users who need a simple, intuitive billing solution. Fast, free, and completely secure.",
    keywords: "simple billing generator, easy invoice creator, billing tool for beginners, non technical invoicing, free simple billing"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "Invoice Generator", url: "/tools/invoice-generator" },
            { name: "Simple Billing Generator", url: "/tools/invoice-generator/simple-billing" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
              Simple Billing Generator for Non-Technical Users
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Technology should empower you, not frustrate you. If you're tired of fighting with complex software just to send a simple bill, you're in the right place. Our billing generator is built for real people who need a straightforward and reliable way to get their work done.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <FileCheck className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">No Learning Curve</h4>
                <p className="text-sm text-muted-foreground">If you can type, you can create a professional invoice.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <Zap className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Lightning Fast</h4>
                <p className="text-sm text-muted-foreground">Go from blank page to finished PDF in less than a minute.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Simplicity Wins in Billing</h2>
            <p className="text-muted-foreground leading-relaxed">
              In a world full of features you'll never use, simplicity is a superpower. A simple billing generator removes the friction from your administrative tasks, allowing you to focus on your actual work. It ensures that your invoices are clear, accurate, and easy for your clients to understand. When things are simple, mistakes are fewer, and payments happen faster. It's that easy.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Pixocraft Makes Billing Easy</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Pixocraft, we've stripped away the jargon and the complex menus. Our generator uses a "what you see is what you get" approach. You fill in the fields, and the professional document takes shape right before your eyes. We handle the alignment, the math, and the formatting, so you can just hit download and be done with it.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes to Avoid with Simple Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              The biggest mistake is assuming that "simple" means "low quality." Many free tools produce amateur-looking documents that can hurt your professional reputation. Pixocraft ensures that while the process is simple for you, the result is high-quality and professional for your clients. Another error is trusting sites that don't value your privacy. Always choose tools that keep your data local.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy You Can Understand</h2>
            <p className="text-muted-foreground leading-relaxed">
              You shouldn't need a law degree to understand a privacy policy. Pixocraft's approach is simple: we don't store your data because we don't want it. Your financial details never leave your computer. This local processing ensures your total privacy and security, giving you peace of mind while you work.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Simple Billing Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is it really as easy as it looks?", a: "Yes, our tool is designed to be intuitive for everyone, regardless of technical skill." },
                { q: "Can I save my work and come back?", a: "No, since we don't use accounts, your progress will be lost if you close the tab. We recommend finishing and downloading your invoice in one go." },
                { q: "Will the PDF work on any computer?", a: "Yes, our generator produces standard PDF files that can be viewed and printed anywhere." },
                { q: "Can I use it for my household bills?", a: "Absolutely. It's a great way to stay organized with any kind of personal billing." },
                { q: "What if I make a mistake?", a: "You can easily edit any field on the fly before you hit the download button." }
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
            <h2 className="text-3xl font-bold">Start Your Simple Billing Now</h2>
            <p className="text-muted-foreground">The easiest way to professional invoices. No stress, just results.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/invoice-generator">
                <Button size="lg" className="gap-2">
                  Access Simple Generator
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/invoice-generator" className="text-primary hover:underline">Main Invoice Generator</Link>
              <Link href="/tools/receipt-generator" className="text-primary hover:underline">Receipt Generator</Link>
              <Link href="/tools/text-case-converter" className="text-primary hover:underline">Text Case Converter</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
