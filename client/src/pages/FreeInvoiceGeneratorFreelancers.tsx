import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FileText, Zap, Shield, Target } from "lucide-react";

export default function FreeInvoiceGeneratorFreelancers() {
  useSEO({
    title: "Free Invoice Generator for Freelancers - Professional Billing | Pixocraft",
    description: "Create professional invoices for your freelance business instantly. No signup required, completely free, and secure. Perfect for independent contractors and consultants.",
    keywords: "free invoice generator for freelancers, freelance billing tool, professional invoice creator, independent contractor invoice, free billing software",
    canonical: "https://tools.pixocraft.in/tools/invoice-generator/freelancers"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "Invoice Generator", url: "/tools/invoice-generator" },
            { name: "Freelance Invoice Generator", url: "/tools/invoice-generator/freelancers" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Free Invoice Generator for Freelancers
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              As a freelancer, your time is your most valuable asset. Spending hours on administrative tasks like billing can take away from your billable hours. Our professional invoice generator is designed specifically for independent workers who need to get paid fast without the complexity of traditional accounting software.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Professional Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Impress your clients with clean, professional invoice layouts that emphasize your brand and attention to detail.
                </p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Instant Creation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Generate and download your invoice in seconds. No account, no signup, just high-quality results when you need them.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Freelancers Need Specialized Billing Tools</h2>
            <p className="text-muted-foreground leading-relaxed">
              Freelancing requires a level of agility that big-box accounting software often lacks. You need to be able to jump from project to project and send invoices as soon as the work is approved. A specialized generator allows you to maintain professional standards without the overhead of a monthly subscription or a steep learning curve. It's about getting paid for your expertise, not your ability to navigate complex software.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Advantage for Independents</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft is built for the modern worker. Our interface is clean, intuitive, and focused entirely on the task at hand. We don't believe in forcing you into a "freemium" trap where the best features are locked behind a paywall. Everything you need to create a professional freelance invoice is right here, available for free, always.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Billing Mistakes Freelancers Make</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Sending unformatted or messy documents that look unprofessional.</li>
              <li>Forgetting to include clear payment terms or late fee policies.</li>
              <li>Using platforms that store your sensitive financial data without your permission.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Secure & Private Financial Documents</h2>
            <p className="text-muted-foreground leading-relaxed">
              Financial data is extremely sensitive. That's why Pixocraft doesn't upload your invoice data to a server. Everything you type into our generator stays right in your browser. This "zero-knowledge" approach ensures that your client details and payment information are never stored or tracked by us. Your business remains your business.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: Freelance Invoicing</h2>
            <div className="space-y-4">
              {[
                { q: "Do I need to sign up to use this?", a: "No, you can create and download invoices completely without an account." },
                { q: "Are there any hidden fees?", a: "Never. All Pixocraft tools are 100% free with no hidden charges." },
                { q: "Can I add my logo?", a: "Yes, our generator allows you to upload and position your own brand logo." },
                { q: "What formats can I download?", a: "Our generator produces high-quality PDF files that are perfect for emailing and printing." },
                { q: "Is this suitable for international clients?", a: "Yes, you can customize the currency and tax settings to fit any country's requirements." }
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
            <h2 className="text-3xl font-bold">Create Your Freelance Invoice Now</h2>
            <p className="text-muted-foreground">Fast, free, and completely professional. Get paid what you're worth.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/invoice-generator">
                <Button size="lg" className="gap-2">
                  Use Invoice Generator
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
              <Link href="/tools/quotation-generator" className="text-primary hover:underline">Quotation Generator</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
