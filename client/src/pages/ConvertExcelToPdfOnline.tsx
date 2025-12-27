import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FileSpreadsheet, Shield, Zap } from "lucide-react";

export default function ConvertExcelToPdfOnline() {
  useSEO({
    title: "Convert Excel to PDF Online - Free & Secure Converter | Pixocraft",
    description: "Transform your Excel spreadsheets into professional PDF documents instantly. Our secure online tool works directly in your browser with no uploads.",
    keywords: "convert excel to pdf online, free excel to pdf, secure spreadsheet converter, online xlsx to pdf, excel to pdf conversion"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF Tools", url: "/tools/pdf" },
            { name: "Convert Excel to PDF", url: "/tools/excel-to-pdf/online" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Convert Excel to PDF Online - Free & Secure</h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Need to share a report without risking accidental edits? Our free online Excel to PDF converter provides a seamless way to transform your data into professional, read-only documents instantly within your browser.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Format Preservation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We maintain your spreadsheet's layout, fonts, and cell formatting to ensure your data looks exactly as intended in the final PDF.</p>
              </CardContent>
            </Card>
            <Card className="hover-elevate">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">100% Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Your financial data and business records never leave your computer. All conversion happens locally in your browser for total privacy.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Convert Your Excel Spreadsheets to PDF?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Excel is great for data manipulation, but PDF is the standard for professional distribution. Converting to PDF ensures that your tables, charts, and financial reports look the same on every device. It prevents recipients from accidentally altering formulas or data points, providing a "frozen" version of your work that is ideal for invoices, presentations, and formal reporting. It's about maintaining data integrity while improving readability.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Pixocraft Facilitates Professional Conversion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft offers a streamlined interface that removes the complexity of document management. Our tool is optimized to handle high-resolution spreadsheet data, ensuring that your output is crisp and professional. Unlike traditional software that requires heavy installation, Pixocraft works natively in your web browser, allowing you to convert your files from any location with an internet connection.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes in Excel Conversion</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Neglecting to set the print area, resulting in cut-off columns or rows in the PDF.</li>
              <li>Trusting sites that store your sensitive business spreadsheets on their servers.</li>
              <li>Failing to check page orientation, leading to messy, multi-page layouts.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Security at Scale</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your business data is your asset. That's why Pixocraft performs all conversion operations locally. This "zero-server" approach means your private spreadsheets are never uploaded, stored, or analyzed by us. It's the most secure way to prepare your professional reports for sharing.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Does it support .xlsx and .xls files?", a: "Yes, our converter supports all major Excel formats including the modern .xlsx and legacy .xls." },
                { q: "Will the formulas still work in the PDF?", a: "No, the PDF is a static document. Formulas are calculated during conversion, and the final values are displayed." },
                { q: "Is the tool really free for large files?", a: "Yes, all Pixocraft features are available for free with no hidden costs." },
                { q: "Can I use it on my Mac?", a: "Yes, our browser-based tool works perfectly on all operating systems including macOS, Windows, and Linux." },
                { q: "Do I need to install any plugins?", a: "No, everything works natively in your standard web browser without any extra software." }
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
            <h2 className="text-3xl font-bold">Convert Your Excel Now</h2>
            <p className="text-muted-foreground">Fast, free, and completely secure for all your reporting needs.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/excel-to-pdf">
                <Button size="lg" className="gap-2">
                  Use Excel to PDF Tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/excel-to-pdf" className="text-primary hover:underline">Main Excel to PDF Tool</Link>
              <Link href="/tools/pdf-compressor" className="text-primary hover:underline">PDF Compressor</Link>
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">PDF Merger</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
