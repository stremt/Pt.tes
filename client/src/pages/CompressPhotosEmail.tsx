import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function CompressPhotosEmail() {
  useSEO({
    title: "Compress Photos for Email – Send Large Images Easily | Pixocraft",
    description: "Compress photos for email instantly. Reduce photo sizes for easier sharing without attachment limits or quality loss.",
    keywords: "compress photos for email, compress images for email, email photo size, resize photos for email, compress photo attachment"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image Compressor", url: "/tools/image-compressor" },
            { label: "Email Photos" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Compress Photos for Email – Share Images Easily
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Email attachment limits make sharing large photos difficult. A single high-resolution photo often exceeds attachment size limits, preventing sending. Compressing photos for email solves this problem instantly. Reduced photos attach easily while looking identical to originals, enabling effortless photo sharing via email.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why Email Photo Compression Matters</h2>
            <p className="text-muted-foreground leading-relaxed">
              Email servers enforce attachment size limits, typically 25MB maximum. A few high-resolution photos quickly exceed this limit. Recipients with slower connections struggle downloading large attachments. Compressing photos for email enables effortless sharing regardless of original resolution or connection speed.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Compressed photos load much faster for recipients, improving user experience. Faster downloads enable recipients to view photos immediately instead of waiting. Reduced attachment sizes also reduce server load and improve email reliability. Everyone benefits from photo compression for email.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Email Photo Compression Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              Email photo compression reduces file sizes while maintaining visual quality. A high-resolution photo might compress from 5MB to under 500KB, easily fitting email attachment limits. Compressed photos appear identical on screen despite dramatic size reduction. Recipients see your photos without size limitations.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Compression balances email requirements with visual quality. Photos need to display well on various devices and connections. Email compression algorithms optimize for these requirements, creating photos perfect for email sharing. This specialized optimization is ideal for email use cases.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Email Photo Sharing Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many people send uncompressed high-resolution photos, causing attachment rejections or slow downloads. Others send multiple photos without compression, exceeding size limits. Best practice is compressing all photos before emailing. This ensures recipients receive photos quickly without size issues.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is assuming recipients have fast internet connections. Many users have slow mobile connections where even moderate-size attachments load slowly. Compressed photos enable smooth sharing regardless of recipient connection speed. Compression is considerate to recipients.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Secure Email Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Email photo compression should never expose your photos to third parties. Pixocraft's compressor runs entirely offline in your browser—your photos are compressed locally. No photos are transmitted, stored, or analyzed on external servers. Your personal photos remain completely private.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline compression ensures maximum security for personal and family photos. Photos never reach external services. You maintain complete control over compression throughout the process. This privacy-first approach is essential for personal and sensitive photos.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">How small can email photos be compressed?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Email photos typically compress to 200-500KB each while remaining email-friendly and fast-loading. Most email servers easily accept these sizes. Compression depends on original resolution and compression settings. Test your photos to find appropriate compression levels.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Will compressed email photos look bad?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Quality email compression is invisible—photos appear identical to originals on email displays. Email photos only need enough resolution for screen viewing, not printing. Moderate compression produces no visible quality loss for email use.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I send multiple compressed photos in one email?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, compress multiple photos and attach them to one email. Multiple compressed photos stay well within attachment limits. Batch compression saves time when sharing photo collections via email.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What compression level works best for email?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Moderate compression balancing file size and email display quality works best. Compress to under 1MB per photo for ideal email performance. Too aggressive compression may show visible artifacts. Find the balance through testing.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do I need special email software for compressed photos?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, compressed photos work with any email client. Compress before attaching, and email handles compressed photos identically to originals. No special software needed for recipients either.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Should I keep original uncompressed versions?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, always keep original uncompressed copies for archival and future use. Store originals safely, and use compressed versions for email sharing. This provides maximum flexibility for future needs.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Compress Your Photos for Email Now</h2>
            <p className="text-muted-foreground leading-relaxed">
              Share photos effortlessly by compressing before emailing. Skip attachment limits and slow uploads. Try Pixocraft's image compressor now—no signup required, completely offline, and entirely private.
            </p>
            <Link href="/tools/image-compressor">
              <Button className="gap-2">
                Compress Photos Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold">Related Tools</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Compress photos for email
              </li>
              <li>
                <Link href="/tools/image-resizer" className="hover:text-foreground transition-colors underline">
                  Image Resizer
                </Link>
                {" "} – Resize for email sharing
              </li>
              <li>
                <Link href="/tools/heic-to-jpg" className="hover:text-foreground transition-colors underline">
                  Image Converter
                </Link>
                {" "} – Convert photo formats
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
