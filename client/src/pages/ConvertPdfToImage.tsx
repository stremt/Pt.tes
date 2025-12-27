import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Shield, Zap, Target, Lightbulb, Users } from "lucide-react";

export default function ConvertPdfToImage() {
  useSEO({
    title: "Convert PDF to Image - High Quality PDF Conversion | Pixocraft",
    description: "Transform your PDF documents into high-quality images effortlessly. Our tool preserves layout and clarity while providing fast, secure, and offline conversion.",
    keywords: "convert pdf to image, pdf to image converter, high quality pdf conversion, offline pdf converter, secure document conversion"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "PDF to Image", url: "/tools/pdf-to-image" },
            { label: "Convert PDF to Image" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert PDF to Image - High Quality PDF Conversion
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Managing digital documents often requires flexibility that static PDF files can't provide. Whether you're a designer needing to incorporate a document page into a layout or a professional sharing data on social media, converting PDF to image format is the ultimate solution. Our tool ensures that every pixel is preserved, giving you crystal-clear images from your complex PDF files.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Precise Extraction</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  We don't just "take a picture" of your PDF. Our engine renders the internal vector data into raster images with incredible precision. This means your text stays sharp and your colors stay true to the original document.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Speed matters in a professional environment. Our client-side processing technology ensures that conversion happens almost instantly, without the lag of uploading and downloading from a remote server.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Convert PDF to Image?</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDFs are great for printing, but images are the language of the web. By converting your documents into image files, you unlock them for use in PowerPoint presentations, WordPress blogs, and Instagram stories. It removes the need for specialized PDF viewers and makes your content accessible on any device, anywhere.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Pixocraft Helps Your Workflow</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft provides a streamlined experience tailored for modern users. Simply drag and drop your file, and our tool handles the rest. We support batch processing, meaning you can convert hundreds of pages into individual image files in a single click, perfectly organized and ready for use.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes to Avoid</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using low-resolution screenshots instead of a proper conversion tool.</li>
              <li>Neglecting the aspect ratio, leading to stretched or distorted images.</li>
              <li>Uploading sensitive documents to cloud-based converters that store your data.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Security First</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your privacy is our top priority. Unlike other converters, Pixocraft works entirely in your browser. This means your files never leave your computer. We don't see your data, we don't store it, and we certainly don't share it. It's the most secure way to convert confidential documents.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is the conversion quality good enough for printing?", a: "Yes! Our tool renders images at high resolution, making them suitable for both digital display and physical printing." },
                { q: "Can I convert a 100-page PDF?", a: "Absolutely. Our engine is optimized for large documents, though processing time may vary based on your device's power." },
                { q: "Does it work on mobile?", a: "Yes, our web-based tool is fully responsive and works seamlessly on smartphones and tablets." },
                { q: "What formats can I export to?", a: "Currently, we support the most popular image formats like JPG and PNG to ensure maximum compatibility." },
                { q: "Is there a file size limit?", a: "Since the conversion happens on your device, the only limit is your browser's memory capacity." }
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
            <h2 className="text-3xl font-bold">Start Converting Your Documents</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experience the fastest and most secure PDF to image conversion available online today.
            </p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-to-image">
                <Button size="lg" className="gap-2">
                  Use the PDF to Image Tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-to-image" className="text-primary hover:underline">Main PDF to Image Tool</Link>
              <Link href="/tools/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link>
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">PDF Merger</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
