import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Search, Download, Scissors, ShieldCheck, HelpCircle } from "lucide-react";

export default function ExtractImagesFromPdf() {
  useSEO({
    title: "Extract Images from PDF - Save Graphics & Photos | Pixocraft",
    description: "Easily pull out every embedded image, photo, and graphic from your PDF files. High-quality extraction that saves time and preserves clarity.",
    keywords: "extract images from pdf, pull photos from pdf, save pdf graphics, pdf image extractor, export images from pdf"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF to Image", url: "/tools/pdf-to-image" },
            { name: "Extract Images from PDF", url: "/tools/pdf-to-image/extract" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Extract Images from PDF - Save Graphics & Photos
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PDF documents often act as "vaults" for valuable visual assets. Whether it's a high-res company logo, a product photo, or an intricate chart, getting those images out manually by taking screenshots is a recipe for low quality. Our PDF image extractor digs into the document's code to pull out the original image files exactly as they were embedded.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Search className="h-8 w-8 text-primary" />
              <h3 className="font-bold">Deep Scanning</h3>
              <p className="text-sm text-muted-foreground">We find every hidden graphic within your document structure.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Download className="h-8 w-8 text-secondary" />
              <h3 className="font-bold">Original Quality</h3>
              <p className="text-sm text-muted-foreground">No re-compression. Get the exact bits and bytes of the original file.</p>
            </div>
            <div className="p-6 border rounded-xl bg-background/50 space-y-3">
              <Scissors className="h-8 w-8 text-accent" />
              <h3 className="font-bold">Batch Export</h3>
              <p className="text-sm text-muted-foreground">Download all images at once instead of one by one.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Search for an Image Extractor?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most users search for this solution when they need to reuse content. Designers often get "final" PDFs from clients but need the original assets for a new campaign. Researchers may need to save figures for their own reports. An extractor saves hours of manual work and ensures that the assets you reuse are as clear as the originals.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Pixocraft Simplifies Extraction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft's tool is built for volume. Instead of making you click through every page, our algorithm identifies every image stream in the PDF and presents them for a single, easy download. It's built for professionals who don't have time to waste on "one-at-a-time" tools.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Extraction Mistakes</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Using "Copy Image" in a PDF reader, which often reduces resolution.</li>
              <li>Taking screenshots, which adds unwanted UI elements and lowers quality.</li>
              <li>Trusting untrustworthy sites that might bundle malware with your downloads.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Data Integrity</h2>
            <p className="text-muted-foreground leading-relaxed">
              Document extraction can involve sensitive internal communications or proprietary designs. Pixocraft's offline-first approach ensures that your PDF data is processed only in your browser's local sandbox. Your intellectual property never leaves your machine.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">FAQ: About PDF Extraction</h2>
            <div className="space-y-4">
              {[
                { q: "Does it extract icons and logos too?", a: "Yes, any embedded raster image will be identified and extracted." },
                { q: "Will the images be in the same format as the PDF?", a: "We extract them in their native format (usually JPG or PNG) to ensure zero quality loss." },
                { q: "Is there a limit on the number of images?", a: "No, whether there are 2 or 2,000 images, our tool will find them all." },
                { q: "Does it work with scanned PDFs?", a: "For scanned PDFs, each page is essentially an image. Our 'PDF to Image' mode is usually better for those." },
                { q: "Can I use these images commercially?", a: "Extraction doesn't change copyright. Please ensure you have the legal right to use any images you extract." },
                { q: "How fast is it?", a: "Extraction is extremely fast because it simply 'copies' the data streams rather than rendering them." }
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
            <h2 className="text-3xl font-bold">Get Your Images Out Now</h2>
            <p className="text-muted-foreground">The most efficient way to save graphics from any PDF document.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/pdf-to-image">
                <Button size="lg" className="gap-2">
                  Start Image Extraction
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/pdf-to-image" className="text-primary hover:underline">Main PDF to Image Tool</Link>
              <Link href="/tools/pdf-merger" className="text-primary hover:underline">PDF Merger</Link>
              <Link href="/tools/image-to-pdf" className="text-primary hover:underline">Image to PDF</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
