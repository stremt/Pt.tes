import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function RemoveExifPhotoPrivacy() {
  useSEO({
    title: "Remove EXIF Data from Photos – Protect Your Privacy | Pixocraft",
    description: "Remove EXIF metadata from photos instantly. Protect your privacy by stripping location data and camera info from images.",
    keywords: "remove exif from photos, remove photo metadata, strip exif data, photo privacy, remove location from photos"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image EXIF Remover", url: "/tools/image-exif-remover" },
            { label: "Photo Privacy" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Remove EXIF Data from Photos – Protect Your Privacy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every photo taken with a camera or smartphone contains hidden metadata called EXIF data that records far more than just the image. EXIF includes your camera model, exact GPS location where the photo was taken, date and time, and other sensitive information that reveals details about your life. Removing EXIF data before sharing photos protects your privacy by eliminating location tracking and personal information exposure.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why People Remove EXIF Data from Photos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most people are unaware that their photos contain location data visible to anyone viewing the image. Sharing photos on social media, messaging apps, or online forums exposes your exact location, daily routines, and home address to potential stalkers, burglars, or people with harmful intent. EXIF removal strips this sensitive information before sharing, protecting your physical location and personal security.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond location privacy, EXIF data reveals camera equipment and software, providing information malicious actors use to identify devices for targeted attacks. Removing EXIF protects your privacy comprehensively—location, device information, and personal details all disappear with one action.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How EXIF Removal Protects Your Location Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              EXIF data contains precise GPS coordinates recorded when your photo was taken. This information reveals where you were at specific times, patterns of movement, and frequented locations. Someone with EXIF data can track your home address, work location, and regular hangouts. Removing EXIF eliminates this tracking risk entirely.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Location privacy is especially important for women, journalists, activists, and people in vulnerable situations who need to protect their whereabouts. EXIF removal enables safe sharing without exposing location to dangerous individuals. Even for casual users, removing EXIF protects against burglary risks when sharing vacation photos that reveal you're away from home.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Privacy Mistakes with Photo Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many people assume platforms like social media automatically remove EXIF data. Some do, but many preserve or display EXIF information to third-party apps and users. Sharing photos directly through messaging apps, email, or file sharing preserves full EXIF data for recipients. Only removing EXIF yourself guarantees location privacy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is sharing photos in private accounts assuming privacy provides protection. Even private photos contain EXIF data accessible to anyone viewing the image. Removing EXIF ensures privacy regardless of where photos are shared or who views them. It's the most reliable way to protect location information.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Safety of EXIF Removal</h2>
            <p className="text-muted-foreground leading-relaxed">
              Removing EXIF data should never expose your photos to third parties. Pixocraft's EXIF remover runs entirely offline in your browser—your photos are processed locally on your device. No photos are transmitted, stored, or analyzed on external servers. Your images remain completely private throughout the removal process.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Offline processing ensures maximum privacy and control. You process photos locally, receive clean images without metadata, and store them wherever you choose. No company has access to your images, and no data about your photos is collected. Complete privacy protection during EXIF removal.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Does removing EXIF affect photo quality?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, removing EXIF data does not affect image quality, resolution, or appearance. EXIF is metadata—invisible information alongside the image. Removing it preserves the photo exactly while eliminating location and device information.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can someone recover deleted EXIF data?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, properly removed EXIF data cannot be recovered. Once stripped, it's permanently deleted. The image contains only visual data without metadata. This ensures permanent privacy protection.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Should I remove EXIF from all photos?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Remove EXIF from photos before sharing online, especially sensitive locations or routine movements. Photos stored locally need not have EXIF removed unless privacy is a concern. Professional photographers sometimes preserve EXIF for copyright information.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What other information does EXIF contain?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  EXIF includes camera model, lens information, exposure settings, date/time, orientation, and GPS location. Some devices add copyright information or photographer names. Removing EXIF strips all this metadata.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do social media sites preserve EXIF data?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Some platforms remove EXIF automatically, but not all. Messaging apps and file sharing typically preserve EXIF. The safest approach is removing EXIF yourself before sharing anywhere, ensuring complete privacy regardless of platform.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I view EXIF data in my photos?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, most image viewers display EXIF information. However, typical users don't notice it. EXIF removal tools show what data exists and remove it comprehensively, ensuring nothing sensitive remains.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Protect Your Photo Privacy Today</h2>
            <p className="text-muted-foreground leading-relaxed">
              Remove EXIF data from photos before sharing to protect your location privacy and personal security. Strip location information, camera details, and sensitive metadata with instant processing. Try Pixocraft's EXIF remover now—no signup required, completely offline, and entirely private.
            </p>
            <Link href="/tools/image-exif-remover">
              <Button className="gap-2">
                Remove EXIF Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4 pt-8 border-t">
            <h3 className="font-semibold">Related Tools</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="/tools/image-exif-remover" className="hover:text-foreground transition-colors underline">
                  Image EXIF Remover
                </Link>
                {" "} – Remove metadata from photos
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Compress images for sharing
              </li>
              <li>
                <Link href="/tools/image-resizer" className="hover:text-foreground transition-colors underline">
                  Image Resizer
                </Link>
                {" "} – Resize images for privacy
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
