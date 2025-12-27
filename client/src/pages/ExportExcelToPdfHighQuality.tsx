import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FileDown, Shield, Zap } from "lucide-react";

export default function ExportExcelToPdfHighQuality() {
  useSEO({
    title: "Export Excel to PDF High Quality - Professional Output | Pixocraft",
    description: "Export your Excel spreadsheets to high-quality PDF format. Our professional conversion engine ensures sharpness, color accuracy, and document integrity.",
    keywords: "export excel to pdf high quality, professional spreadsheet conversion, crisp pdf output, best excel to pdf, high resolution pdf"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "High Quality Excel Export", url: "/tools/excel-to-pdf/high-quality" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Export Excel to PDF High Quality - Professional Output</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              In the professional world, the quality of your presentation matters as much as the data itself. Our high-quality export tool is engineered to deliver crisp, vibrant results that ensure your spreadsheets look their best.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileDown className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Crisp Rendering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We use high-fidelity rendering engines to ensure that even the smallest numbers and text in your spreadsheet remain sharp and readable.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Rapid High-Res Output</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Experience instant professional-grade export. Our optimized engine handles even the most complex sheets with lightning speed.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Benefit of High-Quality Document Export</h2>
            <p className="text-muted-foreground leading-relaxed">
              When sending financial statements or technical data, clarity is non-negotiable. A high-quality export ensures that your recipients can zoom in on charts and tables without losing resolution. It reflects your professional standards and attention to detail, making a lasting impression on clients and stakeholders. Pixocraft prioritizes document fidelity, so your exported PDF looks exactly as professional as the work you put into the original spreadsheet.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Pixocraft is the Professional's Choice</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft is built for those who don't compromise. Our export tool handles complex layouts and high-resolution assets with ease. We've removed all distractions to provide a focused workspace where you can manage your document export tasks with absolute confidence. Our engine is designed to meet the rigorous demands of modern corporate and creative workflows.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Quality Management</h2>
            <p className="text-muted-foreground leading-relaxed">
              One of the biggest errors is choosing a tool that downsamples your images or ignores your custom fonts, resulting in a blurry or unprofessional document. Another mistake is Trusting sites that don't value your data security. Pixocraft's local-first approach ensures that your professional reports look perfect and stay private throughout the export process.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Uncompromising Security & Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your professional data is your asset. That's why Pixocraft performs all export operations locally in your browser. No data is transmitted to our servers, and we have no access to your documents. It's the most secure way to manage your sensitive professional spreadsheet exports.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: High-Quality Excel Export</h2>
            <div className="space-y-4">
              {[
                { q: "Is the text still searchable after export?", a: "Yes, we maintain the full text layer, ensuring your professional reports remain fully searchable." },
                { q: "Can I export very large workbooks?", a: "Yes, our optimized engine is designed to handle high-resolution and high-page-count documents efficiently." },
                { q: "Will the colors remain accurate?", a: "Yes, we preserve the original colors and styling of your spreadsheet elements." },
                { q: "Is there a charge for professional-grade output?", a: "No, all Pixocraft features, including high-quality export, are completely free." },
                { q: "What is the best way to share the result?", a: "Once exported, your high-quality PDF is ready for email, professional printing, or web publishing." }
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
            <h2 className="text-3xl font-bold">Export Your Excel High-Quality Now</h2>
            <p className="text-muted-foreground">The most secure and efficient way to manage your critical professional spreadsheets.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/excel-to-pdf">
                <Button size="lg" className="gap-2">
                  Use High Quality Export
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/excel-to-pdf" className="text-primary hover:underline">Main Excel to PDF Tool</Link>
              <Link href="/tools/pdf-watermark-adder" className="text-primary hover:underline">PDF Watermark Adder</Link>
              <Link href="/tools/html-to-pdf" className="text-primary hover:underline">HTML to PDF</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
