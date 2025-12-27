import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function ConvertPdfToImage() {
  useSEO({
    title: "Convert PDF to Image – Easy PDF Conversion | Pixocraft",
    description: "Convert PDF to image instantly. Transform PDF files to image format for sharing, editing, and viewing.",
    keywords: "convert pdf to image, pdf to image converter, pdf to image online, pdf conversion to image, transform pdf to image"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "PDF to Image", url: "/tools/pdf-to-image" },
            { label: "Convert PDF" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert PDF to Image – Instant PDF Conversion
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              PDF documents are powerful for preserving formatting, but images are universal and shareable. Converting PDF to image format enables easy sharing across platforms, embedding in documents, and editing without PDF software. Image conversion unlocks PDF content for any use case where image format is preferred.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why People Convert PDF to Image</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDFs are document containers, but many situations require image format. Sharing PDFs via messaging apps results in viewing inconvenience. Images display instantly without requiring PDF readers. Embedding PDFs in documents is difficult, while images embed seamlessly. Image conversion solves all these use cases.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Image format enables editing, sharing, and display flexibility impossible with PDFs. You can edit converted images with standard image tools. Share converted images across social media, messaging, and document platforms. Quick preview of PDF content becomes possible with image format.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How PDF to Image Conversion Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF to image conversion reads PDF content and renders it as image files. Each PDF page becomes a separate image, preserving formatting, text, and graphics. The conversion maintains visual fidelity—converted images look identical to PDF originals. High-quality conversion ensures readable text and clear graphics.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Conversion output format matters. JPG format works well for photographs and mixed content. PNG format handles graphics and text with transparency support. Different conversion tools offer format options. Choose formats matching your intended use.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common PDF to Image Conversion Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many users assume all conversion tools produce equal quality. Different converters vary significantly in output quality and formatting preservation. Some produce blurry text or unclear graphics. Test converters on sample PDFs before converting important documents. Quality matters for readability.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is converting entire PDF books to single images. Multi-page PDFs should convert with each page as separate image. Otherwise, resulting images are too large and difficult to view. Proper conversion treats multi-page PDFs correctly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Secure Conversion</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF to image conversion should never expose your documents to third parties. Pixocraft's converter runs entirely offline in your browser—your PDFs are converted locally. No PDFs are transmitted, stored, or analyzed on external servers. Your documents remain completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline conversion ensures maximum security for confidential documents. PDFs never reach cloud services. You maintain complete control throughout conversion. This privacy protection is essential for sensitive PDF content.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How long does PDF to image conversion take?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Conversion is nearly instant for most PDFs. Small documents convert in seconds. Large multi-page documents take slightly longer depending on page count and image resolution. Offline conversion is fastest without network latency.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What happens to text in converted images?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Text in converted images remains readable if original PDF text was clear. Text is preserved as image content, not as selectable text. You can read converted text but cannot copy it without OCR tools.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I convert multi-page PDFs?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, convert entire multi-page PDFs with each page becoming separate image. Download all page images at once. Quality converters handle any PDF size properly.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What image quality settings should I use?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Higher quality settings produce clearer images but larger file sizes. Use high quality for documents requiring sharp text. Use standard quality for general sharing. Balance quality and file size for your needs.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are converted image files smaller than original PDFs?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Converted images may be larger or smaller than originals depending on PDF content and compression settings. PDFs with many fonts are often larger as images. Graphics-heavy PDFs may be smaller as compressed images.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I edit converted PDF images?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, converted images can be edited with any image editing software. Make annotations, crop, resize, or apply filters. Editing flexibility is a major advantage of image format over PDFs.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Convert Your PDF Now</h2>
            <p className="text-muted-foreground leading-relaxed">
              Transform PDF documents to shareable image format instantly. Enable sharing, editing, and viewing across all platforms. Try Pixocraft's PDF to image converter now—no signup required, completely offline, and entirely private.
            </p>
            <Link href="/tools/pdf-to-image">
              <Button className="gap-2">
                Convert PDF Now
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
                {" "} – Convert PDF to image format
              </li>
              <li>
                <Link href="/tools/image-to-pdf" className="hover:text-foreground transition-colors underline">
                  Image to PDF
                </Link>
                {" "} – Convert images to PDF
              </li>
              <li>
                <Link href="/tools/pdf-compressor" className="hover:text-foreground transition-colors underline">
                  PDF Compressor
                </Link>
                {" "} – Reduce PDF file sizes
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
