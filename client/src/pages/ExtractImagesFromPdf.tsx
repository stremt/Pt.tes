import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ExtractImagesFromPdf() {
  useSEO({
    title: "Extract Images from PDF – Save PDF Images | Pixocraft",
    description: "Extract images from PDF files instantly. Save and download all images from your PDF documents easily.",
    keywords: "extract images from pdf, extract images pdf, save images from pdf, get images from pdf, pdf image extractor"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "PDF to Image", url: "/tools/pdf-to-image" },
            { label: "Extract Images" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Extract Images from PDF – Save PDF Images Instantly
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PDFs often contain valuable images embedded within documents. Extracting images from PDFs enables reusing graphics, photos, and illustrations. Image extraction is tedious manually—dedicated tools extract all images automatically. Quick extraction saves time and preserves image quality.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why People Extract Images from PDF</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDFs contain images that may be valuable for reuse, sharing, or inclusion in other documents. Manual image extraction—screenshotting or tedious copying—is time-consuming and reduces quality. Dedicated extraction tools pull images automatically, maintaining original quality and speed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Image extraction is essential for content reuse. Marketing professionals extract images from competitor PDFs. Designers extract graphics for inspiration. Students extract images for research. Teachers extract images from educational PDFs. Extraction enables efficient content management.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How PDF Image Extraction Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF image extractors analyze PDF structure and identify embedded images. All images are extracted simultaneously and available for download. Extraction preserves original image quality and format. No image degradation occurs during extraction.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Quality extraction tools handle various image formats—JPG, PNG, GIF, and others. Extracted images are independent files ready for use anywhere. Batch extraction processes entire PDFs instantly. Modern extractors complete in seconds regardless of image count.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common PDF Image Extraction Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many users attempt image extraction through manual methods—screenshotting, copying and pasting—which loses quality. Screenshots reduce image clarity. Manual copying is tedious and error-prone. Dedicated extraction tools preserve quality and efficiency.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is extracting images from encrypted PDFs without permission. Always ensure you have rights to extract images from PDFs you don't own. Respect copyright and intellectual property rights. Own PDFs extraction is always permitted.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Secure Image Extraction</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF image extraction should never expose your documents to third parties. Pixocraft's extractor runs entirely offline in your browser—your PDFs are processed locally. No PDFs are transmitted, stored, or analyzed on external servers. Your documents remain completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline extraction ensures maximum security for confidential PDFs. PDFs never reach cloud services. You maintain complete control throughout extraction. This privacy protection is essential when working with proprietary or sensitive documents.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How long does PDF image extraction take?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Extraction is nearly instant for most PDFs. Small documents with few images extract in seconds. Large PDFs with many images take slightly longer. Offline extraction is fastest without network latency.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Does extraction preserve original image quality?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, extraction preserves original image quality exactly. Images are extracted as-is without degradation. You get identical quality as embedded in the PDF.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I extract images from password-protected PDFs?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Extraction from encrypted PDFs requires providing the password. Most extractors can handle password-protected PDFs if you provide the correct password. Unprotected PDFs extract without additional requirements.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens if PDF has no images?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  PDFs with no images produce no extracted files. Text-only PDFs contain no images to extract. Consider converting text to images if you need image versions of document content.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I select specific images to extract?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Most extractors extract all images automatically. Some advanced tools allow selecting specific images. For maximum efficiency, extract all and delete unwanted images afterward.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are extracted images copyright protected?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Extracted images retain their original copyright status. Extracting doesn't change usage rights. Always respect copyright—only extract images from PDFs you own or have permission to use.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Extract PDF Images Now</h2>
            <p className="text-muted-foreground leading-relaxed">
              Save all images from PDF documents instantly with efficient extraction. Preserve quality while extracting images for reuse. Try Pixocraft's PDF image extractor now—no signup required, completely offline, and entirely private.
            </p>
            <Link href="/tools/pdf-to-image">
              <Button className="gap-2">
                Extract Images Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold">Related Tools</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/tools/pdf-to-image" className="hover:text-foreground transition-colors underline">
                  PDF to Image
                </Link>
                {" "} – Extract images from PDF
              </li>
              <li>
                <Link href="/tools/image-to-pdf" className="hover:text-foreground transition-colors underline">
                  Image to PDF
                </Link>
                {" "} – Convert images to PDF
              </li>
              <li>
                <Link href="/tools/pdf-merger" className="hover:text-foreground transition-colors underline">
                  PDF Merger
                </Link>
                {" "} – Combine PDF files
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
