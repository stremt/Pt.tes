import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ConvertJpgToPdf() {
  useSEO({
    title: "Convert JPG to PDF - Transform Photos to PDF Fast | Pixocraft",
    description: "Instantly turn your JPG photos into professional PDF documents. High-quality conversion that preserves clarity and color, perfect for sharing and archiving.",
    keywords: "convert jpg to pdf, jpeg to pdf converter, transform photos to pdf, high quality jpg conversion, offline jpeg converter"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "Image to PDF", url: "/tools/image-to-pdf" },
            { name: "Convert JPG to PDF", url: "/tools/image-to-pdf/jpg-to-pdf" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert JPG to PDF - Transform Photos to PDF Fast
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              JPG is the universal format for images, but when it comes to formal documents, PDF is king. Our JPG to PDF converter allows you to take your high-quality photos and wrap them in a professional PDF container instantly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Perfect Color Preservation</h4>
                <p className="text-sm text-muted-foreground">Our engine ensures your photos look exactly like the originals.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
              <div className="mt-1 h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <CheckCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h4 className="font-bold">Fast & Efficient</h4>
                <p className="text-sm text-muted-foreground">Convert hundreds of JPGs into a single PDF in seconds.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Convert Your JPGs to PDF?</h2>
            <p className="text-muted-foreground leading-relaxed">
              JPG files are great for viewing, but they are difficult to manage in large quantities. Converting them to PDF allows you to organize your photos into a single, scrollable document. This is ideal for sending expense receipts, sharing a digital portfolio, or archiving physical documents that you've photographed.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">High-Quality Conversion with Pixocraft</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Pixocraft, we don't believe in sacrificing quality for speed. Our converter uses advanced rendering technology to ensure that your JPGs remain crisp and vibrant. We also offer options to adjust the PDF page size to match common standards like A4 or Letter, ensuring that your document is ready for any professional environment.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Pitfalls in JPG Conversion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many free tools apply heavy compression that makes images look blocky and unprofessional. Others might not handle the orientation correctly, resulting in sideways pages. Pixocraft handles these technical details automatically, providing a polished and professional result every time.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Security You Can Trust</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your photos are personal. That's why Pixocraft never uploads them to a server. The entire conversion process happens locally on your computer, providing a level of privacy that traditional cloud-based tools simply can't match. Your data stays under your control, always.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: JPG to PDF Specifics</h2>
            <div className="space-y-4">
              {[
                { q: "Will my images be compressed?", a: "We apply subtle, intelligent compression to keep file sizes manageable while preserving high visual quality." },
                { q: "Can I combine multiple JPGs into one PDF?", a: "Yes, our tool is designed to take multiple files and merge them into a single PDF document." },
                { q: "Does it work with JPEG and JPG?", a: "Yes, they are the same format and both are fully supported." },
                { q: "Is there a limit on the number of photos?", a: "No, you can add as many photos as your browser's memory can handle." },
                { q: "What page sizes are supported?", a: "We support standard sizes like A4 and US Letter, as well as auto-sized pages that match your images." },
                { q: "Can I use this for my business?", a: "Absolutely. Our tools are free for both personal and commercial use." }
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
            <h2 className="text-3xl font-bold">Convert Your JPGs Now</h2>
            <p className="text-muted-foreground">The fastest and most secure way to transform your photos into professional PDFs.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/image-to-pdf">
                <Button size="lg" className="gap-2">
                  Start JPG to PDF Conversion
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/image-to-pdf" className="text-primary hover:underline">Main Image to PDF Tool</Link>
              <Link href="/tools/jpg-to-png" className="text-primary hover:underline">JPG to PNG</Link>
              <Link href="/tools/image-resizer" className="text-primary hover:underline">Image Resizer</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
