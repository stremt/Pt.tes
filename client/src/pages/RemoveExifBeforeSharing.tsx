import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function RemoveExifBeforeSharing() {
  useSEO({
    title: "Remove EXIF Before Sharing Photos – Secure Your Privacy | Pixocraft",
    description: "Remove EXIF data before sharing photos on social media, messaging, or email. Protect location and metadata privacy instantly.",
    keywords: "remove exif before sharing, remove metadata before sharing, clean photo metadata, strip exif before uploading, remove location before sharing"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image EXIF Remover", url: "/tools/image-exif-remover" },
            { label: "Before Sharing" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Remove EXIF Before Sharing Photos – Protect Your Privacy
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sharing photos online without removing EXIF data exposes sensitive location information to everyone who sees your photos. Before uploading to social media, messaging apps, or email, remove EXIF to eliminate location tracking risks. A simple step before sharing provides permanent privacy protection for your physical location and personal security.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why People Clean EXIF Before Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sharing photos reveals more than you realize. Even private social media accounts expose EXIF data to third-party apps, platform analytics, and people with technical knowledge. Messaging apps preserve EXIF when forwarding photos. Email attachments maintain full metadata. Removing EXIF before sharing is the only reliable way to prevent location exposure.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Location privacy protects against multiple threats. Burglars use EXIF data to identify empty homes during vacations. Stalkers use location history to track daily routines. Abusers track partners through photo metadata. EXIF removal eliminates these risks entirely, protecting physical safety through simple metadata cleaning.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How EXIF Removal Protects Before Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              EXIF removal as a pre-sharing step ensures location privacy across all platforms. Whether sharing on social media, messaging, email, or file sharing, cleaned photos contain no location information. This consistent protection works regardless of platform privacy policies or recipient intentions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pre-sharing EXIF removal prevents unintended information exposure. Even with careful platform settings, EXIF data bypasses many privacy controls. Third-party apps access EXIF from photos in your posts. Removing EXIF proactively ensures privacy regardless of subsequent handling by platforms or recipients.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Mistakes When Sharing Photos</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many people assume platform privacy settings protect EXIF data. They don't. Instagram, Facebook, and other services may remove EXIF for display but preserve it for analytics and third-party apps. Relying on platform privacy settings leaves location information accessible to determined users. Only removing EXIF yourself guarantees privacy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is sharing vacation photos showing you're away from home without removing EXIF. Location metadata combined with "away" caption creates irresistible burglary targets. The same applies to expensive item photos—EXIF reveals home location alongside valuable property. Removing EXIF before any risky sharing categories prevents targeting.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy & Recommended Practices</h2>
            <p className="text-muted-foreground leading-relaxed">
              EXIF removal before sharing should be automatic practice for all online photos. Best practice: receive photo, remove EXIF immediately, then share through any channel. This ensures you control what information is shared regardless of where photos go afterward.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft's EXIF remover enables this practice by making removal instant and private. Process photos locally with no uploads, no external servers, no data collection. One-click removal takes seconds, protecting privacy without disrupting your sharing workflow.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Should I remove EXIF from all shared photos?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, remove EXIF from all photos before sharing online, especially publicly. Private shares still expose EXIF to recipients and platform analytics. Making EXIF removal routine practice ensures comprehensive privacy protection.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do I remove EXIF before or after editing?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Either order works. Remove EXIF from the original before editing, or after editing before sharing. Editing software may regenerate EXIF, so removing after final edits is safest. Use whichever approach fits your workflow.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can receivers re-add EXIF data?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, removed EXIF cannot be recovered. Recipients cannot add location data to cleaned photos. This ensures permanent privacy once EXIF is removed, regardless of what happens to the photo afterward.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Does EXIF removal work for screenshots?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Screenshots include EXIF data added by your device when captured. EXIF removal works on screenshots like any other photo. Removing EXIF from screenshots protects against location exposure from screen captures of messaging conversations or other sensitive content.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What about old photos I've already shared?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Once shared, EXIF data in old photos cannot be remotely removed. However, going forward, remove EXIF from all new shares. Some platforms allow editing photo metadata—check if you can remove EXIF from old posts directly.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is it obvious I removed EXIF from photos?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, cleaned photos appear identical to the original. Removing EXIF is invisible—only the absence of metadata indicates removal. No one can tell you removed EXIF unless they specifically check for metadata absence.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Remove EXIF Before Your Next Share</h2>
            <p className="text-muted-foreground leading-relaxed">
              Make EXIF removal automatic practice before sharing any photos. Protect location privacy and personal security with instant metadata cleaning. Try Pixocraft's EXIF remover now—no signup required, completely offline, and makes pre-sharing protection simple.
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
                {" "} – Remove metadata before sharing
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Compress before sharing
              </li>
              <li>
                <Link href="/tools/image-resizer" className="hover:text-foreground transition-colors underline">
                  Image Resizer
                </Link>
                {" "} – Resize photos for sharing
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
