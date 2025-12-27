import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ConvertPdfToJpg() {
  useSEO({
    title: "Convert PDF to JPG – Instant JPG Conversion | Pixocraft",
    description: "Convert PDF to JPG images instantly. Transform PDF documents to JPEG format for sharing and viewing.",
    keywords: "convert pdf to jpg, pdf to jpg converter, pdf to jpeg, convert pdf to jpeg, pdf to jpg online"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { name: "Home", url: "/" },
            { name: "Tools", url: "/tools" },
            { name: "PDF to Image", url: "/tools/pdf-to-image" },
            { name: "Convert PDF to JPG", url: "/tools/pdf-to-image/convert-to-jpg" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Convert PDF to JPG – Fast Format Conversion
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              JPG format is universally supported and ideal for PDF document conversion. JPG images are smaller than PDFs, easier to share, and display instantly on any device. Converting PDF to JPG provides the compatibility and simplicity of image format while preserving document content clearly.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Convert PDF to JPG</h2>
            <p className="text-muted-foreground leading-relaxed">
              JPG is the most universal image format, supported everywhere without special software. Converting PDFs to JPG enables sharing across any platform—email, messaging, social media, documents. JPG images are compact, loading fast even on slow connections. JPG conversion removes PDF software requirements.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              JPG format provides excellent compression while maintaining visual quality. Converted JPG images are typically smaller than original PDFs. This size advantage speeds up uploads, downloads, and sharing. JPG conversion is ideal when file size matters.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How PDF to JPG Conversion Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF to JPG conversion reads PDF content and renders it as JPG image files. Each PDF page becomes a high-quality JPG image preserving text, graphics, and formatting. The conversion maintains visual fidelity—converted JPGs look identical to PDF originals. Quality conversion ensures readable text and clear graphics.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Conversion quality settings balance clarity and file size. Higher quality produces sharper images but larger files. Standard quality works well for most purposes. Choose settings matching your needs and bandwidth constraints.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common PDF to JPG Conversion Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many users convert with insufficient quality, resulting in blurry or unreadable text. Test quality settings on sample PDFs before converting important documents. Different quality levels produce dramatically different results. Find optimal balance between quality and file size.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is converting entire multi-page documents to single JPG files. Large multi-page PDFs become huge unreadable images. Proper conversion handles each page as separate JPG. This approach maintains readability and manageable file sizes.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Secure JPG Conversion</h2>
            <p className="text-muted-foreground leading-relaxed">
              PDF to JPG conversion should never expose your documents to third parties. Pixocraft's converter runs entirely offline in your browser—your PDFs are converted locally. No PDFs are transmitted, stored, or analyzed on external servers. Your documents remain completely private.
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
                  <CardTitle className="text-lg">How much smaller are converted JPGs than PDFs?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Converted JPGs are typically 30-50% smaller than original PDFs depending on content. Text-heavy PDFs reduce significantly. Graphics-heavy PDFs compress less. Exact reduction depends on conversion quality settings.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Does JPG conversion preserve PDF formatting?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, converted JPG images preserve PDF formatting visually. Text layout, graphics, and spacing appear identical to originals. Text becomes image content rather than selectable text, but formatting is maintained.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I convert scanned PDF documents?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, convert scanned PDFs to JPG images. Scanned PDFs are already image-based, converting to JPG maintains quality. Resulting JPGs display scanned content identically.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What quality should I use for JPG conversion?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Use high quality for documents requiring sharp text. Standard quality works well for most purposes. Low quality reduces files sizes but may show compression artifacts. Test different settings to find optimal balance.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I convert colored PDFs to JPG?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, convert colored PDFs to JPG preserving all colors and formatting. JPG handles color excellently. Converted images display colors identically to originals.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Are converted JPGs editable?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, converted JPG images can be edited with any image editing software. Make annotations, crop, resize, or apply filters. Image editing flexibility is a major advantage over PDFs.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Convert PDF to JPG Now</h2>
            <p className="text-muted-foreground leading-relaxed">
              Transform PDF documents to JPG format instantly. Enable universal sharing across any platform. Try Pixocraft's PDF to JPG converter now—no signup required, completely offline, and entirely private.
            </p>
            <Link href="/tools/pdf-to-image">
              <Button className="gap-2">
                Convert to JPG Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold text-xl">Related Tools</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/tools/pdf-to-image" className="hover:text-foreground transition-colors underline">
                  PDF to Image
                </Link>
                {" "} – Convert PDF to JPG
              </li>
              <li>
                <Link href="/tools/image-to-pdf" className="hover:text-foreground transition-colors underline">
                  Image to PDF
                </Link>
                {" "} – Convert JPG to PDF
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Compress JPG images
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
