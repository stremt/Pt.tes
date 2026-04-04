import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, FilePlus, Zap, Shield, Target } from "lucide-react";

export default function ConvertImageToPdf() {
  useSEO({
    title: "Convert Image to PDF - Fast & High Quality | Pixocraft",
    description: "Transform your images into professional PDF documents instantly. Our high-quality conversion preserves clarity and formatting, making it easy to share and print.",
    keywords: "convert image to pdf, image to pdf converter, transform images to pdf, high quality pdf conversion, offline image converter",
    canonical: "https://tools.pixocraft.in/tools/image-to-pdf/convert"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "Image to PDF", url: "/tools/image-to-pdf" },
            { name: "Convert Image to PDF", url: "/tools/image-to-pdf/convert" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert Image to PDF - Fast & High Quality
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Images are great for capturing moments, but PDFs are the standard for professional documentation. Converting your photos, scans, and graphics into PDF format ensures that they look the same on every device and are ready for professional printing or formal submission.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Precision Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Our tool doesn't just wrap your image in a PDF shell. It optimizes the data to ensure that the document remains compact while preserving every detail of your original graphic.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-secondary/20 bg-secondary/5">
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle className="text-xl">Instant Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Stop waiting for server-side uploads. Our advanced browser technology processes your conversion locally, delivering results in a fraction of a second.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Convert Your Images to PDF?</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDFs provide a layer of professionalism and consistency that raw image files lack. When you send a PDF, you know exactly how it will appear to the recipient. It also allows you to combine multiple images into a single, cohesive document, which is essential for resumes, portfolios, and expense reports.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">The Pixocraft Advantage</h2>
            <p className="text-muted-foreground leading-relaxed">
              We've built Pixocraft to be the most user-centric tool on the web. Our interface is clean, fast, and completely free of annoying distractions. We focus on delivering high-quality results without the need for technical expertise or expensive software subscriptions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Conversion Mistakes</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Converting at low resolution, which leads to blurry text and graphics.</li>
              <li>Ignoring page margins, causing content to be cut off when printed.</li>
              <li>Trusting untrusted websites with sensitive personal photos or documents.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Safe & Secure Conversion</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your security is non-negotiable. Pixocraft performs all conversions directly on your device. This means your private photos and documents never travel across the internet to reach our servers. It's the ultimate way to maintain control over your digital footprint.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Is there a limit to how many images I can convert?", a: "No, you can convert as many images as you need without any arbitrary restrictions." },
                { q: "Will the PDF be too large to email?", a: "We apply smart compression to ensure that your PDFs are as small as possible while maintaining high quality." },
                { q: "Does it support multiple formats?", a: "Yes, we support all major image formats including JPG, PNG, and WebP." },
                { q: "Can I rearrange the images after uploading?", a: "Our tool allows you to easily drag and drop your images to get the perfect order for your document." },
                { q: "Is it really free?", a: "Yes, all features are available for free with no watermarks or hidden costs." }
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
            <h2 className="text-3xl font-bold">Convert Your Images Today</h2>
            <p className="text-muted-foreground">The simplest, fastest, and most secure way to create PDFs from your images.</p>
            <div className="flex justify-center pt-4">
              <Link href="/tools/image-to-pdf">
                <Button size="lg" className="gap-2">
                  Use the Image to PDF Tool
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Internal Links</h3>
            <div className="flex flex-wrap gap-4">
              <Link href="/tools/image-to-pdf" className="text-primary hover:underline">Main Image to PDF Tool</Link>
              <Link href="/tools/pdf-to-image" className="text-primary hover:underline">PDF to Image</Link>
              <Link href="/tools/image-compressor" className="text-primary hover:underline">Image Compressor</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
