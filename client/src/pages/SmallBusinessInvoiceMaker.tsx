import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Briefcase, Shield, Zap } from "lucide-react";

export default function SmallBusinessInvoiceMaker() {
  useSEO({
    title: "Small Business Invoice Maker - Simple & Effective Billing | Pixocraft",
    description: "Empower your small business with our simple yet effective invoice maker. Create high-quality, professional invoices in seconds without the complexity of accounting software.",
    keywords: "small business invoice maker, professional billing tool, simple invoice creator, free business invoicing, business invoice generator"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "Invoice Generator", url: "/tools/invoice-generator" },
            { name: "Small Business Invoice Maker", url: "/tools/invoice-generator/small-business" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center">
              Small Business Invoice Maker - Simple & Effective
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Small business owners wear many hats. From marketing to operations, your time is split in a dozen directions. Our invoice maker is designed to take the stress out of billing, providing a simple and professional solution that lets you focus on growing your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Briefcase className="h-8 w-8 text-primary" />
              <h3 className="font-bold">Business Ready</h3>
              <p className="text-sm text-muted-foreground">Add your business logo and custom details in seconds.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Zap className="h-8 w-8 text-secondary" />
              <h3 className="font-bold">Fast Execution</h3>
              <p className="text-sm text-muted-foreground">Generate professional PDFs that are ready for delivery.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Shield className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Private & Secure</h3>
              <p className="text-sm text-muted-foreground">Your financial data stays local. Total privacy guaranteed.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Small Businesses Choose Simplified Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              Full-scale accounting software is often overkill for many small businesses. It requires training, monthly fees, and a lot of maintenance. A simplified maker provides the essential features without the noise. You get high-quality, professional invoices that satisfy your clients and your accountant, all while saving you time and money. It's the lean approach to business administration.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Small Business Experience</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Pixocraft, we've designed our tools to be as intuitive as possible. Our interface respects your intelligence and your time. We handle the formatting and technical details, so you can focus on the content of your invoice. From custom tax settings to clear itemized lists, we provide all the features your small business needs to thrive.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes Small Businesses Make in Billing</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using outdated, hand-written, or messy templates.</li>
              <li>Failing to include clear business details and contact information.</li>
              <li>Trusting untrusted cloud platforms with sensitive client lists and pricing.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Financial Security at the Core</h2>
            <p className="text-muted-foreground leading-relaxed">
              We understand that your business data is a competitive advantage. That's why Pixocraft's maker happens entirely in your browser's local sandbox. No data is transmitted to our servers, and we have no access to your pricing or client details. It's the most secure way to manage your small business billing.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Small Business Billing</h2>
            <div className="space-y-4">
              {[
                { q: "Can I use this for my GST/VAT invoices?", a: "Yes, you can customize the tax fields to match your local requirements." },
                { q: "Is the tool free for commercial use?", a: "Yes, all Pixocraft tools are free for both personal and professional projects." },
                { q: "Can I save my business details?", a: "Since we don't use accounts, you'll need to enter your details for each session, though many browsers will auto-fill them." },
                { q: "What is the best way to send the invoice?", a: "Download the PDF and attach it to an email for a professional and standard delivery." },
                { q: "Does it support multiple currencies?", a: "Yes, you can easily change the currency symbol to match your business needs." }
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
            <h2 className="text-3xl font-bold">Empower Your Small Business Today</h2>
            <p className="text-muted-foreground">The most efficient way to manage your business billing. Professional results, every time.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/invoice-generator">
                <Button size="lg" className="gap-2">
                  Use Invoice Maker
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/invoice-generator" className="text-primary hover:underline">Main Invoice Generator</Link>
              <Link href="/tools/commission-calculator" className="text-primary hover:underline">Commission Calculator</Link>
              <Link href="/tools/loan-calculator" className="text-primary hover:underline">Loan Calculator</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
