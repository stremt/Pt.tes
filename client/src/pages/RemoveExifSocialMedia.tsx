import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

export default function RemoveExifSocialMedia() {
  useSEO({
    title: "Remove EXIF Data for Social Media – Safe Photo Sharing | Pixocraft",
    description: "Remove EXIF metadata before uploading to social media. Protect your location and privacy on Instagram, Facebook, Twitter, and other platforms.",
    keywords: "remove exif social media, remove metadata instagram, remove location facebook, strip exif twitter, safe social media photos"
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Image EXIF Remover", url: "/tools/image-exif-remover" },
            { label: "Social Media" },
          ]}
        />

        <article className="space-y-8 mt-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Remove EXIF Data for Social Media – Safe Photo Sharing
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Social media platforms enable photo sharing that exposes your location through embedded EXIF data. Even platforms claiming to remove metadata sometimes preserve it for analytics, third-party apps, and user tracking. Removing EXIF data before uploading to social media ensures that no matter which platform you use or what privacy settings you choose, your location information remains completely protected.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Why EXIF Removal Is Critical for Social Media</h2>
            <p className="text-muted-foreground leading-relaxed">
              Social media platforms collect metadata for user profiling, targeted advertising, and platform analytics. EXIF location data contributes to this profiling system. Even if platforms don't expose location publicly, they use it internally for targeted content and monetization. Removing EXIF before uploading prevents this data collection entirely.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Beyond platform practices, EXIF data on social media remains accessible to other users, third-party apps, and anyone taking screenshots. Friends, followers, and strangers can extract location information from photos. EXIF removal ensures location privacy from all audiences, regardless of account privacy settings.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">How Social Platforms Handle Metadata</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most platforms claim to remove EXIF data from uploaded photos, but this is incomplete. Instagram, Facebook, and Twitter remove visible metadata but preserve it for internal use. Third-party apps integrated with platforms often access original EXIF data. API access allows developers to retrieve location information from public photos. Removing EXIF before uploading prevents all these pathways.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Privacy settings on social media cannot protect EXIF data. Even private accounts with restricted followers expose EXIF to platform algorithms and third-party tools. Your followers can screenshot photos and access EXIF. Account hackers can retrieve EXIF from compromised photos. The only protection is removing EXIF before upload.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Common Social Media Privacy Mistakes</h2>
            <p className="text-muted-foreground leading-relaxed">
              Many users assume social media privacy settings protect EXIF data. They don't—privacy settings control who sees photos, not what metadata exists. Users also assume "private account" means location privacy. EXIF data bypasses privacy settings entirely, accessible to followers and apps regardless of privacy level.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Another mistake is trusting platform privacy policies that claim EXIF removal. Policies change, and "removal" often means removal from user-visible interface while preserving data internally. Policy trust provides false security. Only removing EXIF yourself guarantees complete privacy across all platforms and time periods.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Privacy Best Practices for Social Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Best practice is removing EXIF as standard before uploading any photo to social media. Make this automatic: receive or take photo, remove EXIF, then upload. This consistent practice ensures privacy across all platforms without memorizing which ones preserve metadata.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Pixocraft's EXIF remover enables this practice by making removal instant and private. No uploads, no external servers, completely offline. One-click removal takes seconds before social media upload, protecting location without complicating your sharing workflow.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Do Instagram and Facebook really remove EXIF?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  They remove visible metadata but preserve it internally for analytics and profiling. EXIF location data feeds into platform tracking and targeted advertising systems. Removing EXIF yourself ensures complete privacy rather than trusting platform removal.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can I see EXIF data on social media?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Platforms don't display EXIF visibly, but metadata exists. Third-party apps can extract EXIF from public social media photos. Screenshots retain EXIF from the original photo. Removing EXIF before uploading prevents extraction through any method.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Does EXIF removal affect social media engagement?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, removed EXIF data doesn't affect photo quality, appearance, or engagement metrics. Removing EXIF removes only invisible metadata while preserving the visual image completely. Upload cleaned photos with confidence—they'll perform identically to originals.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Should I remove EXIF from all social posts?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, especially vacation photos, home photos, and routine-revealing content. Public profiles make EXIF location accessible to strangers. Even private accounts expose EXIF to followers and apps. Remove EXIF from all social media photos for consistent privacy protection.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can followers tell I removed EXIF?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  No, EXIF removal is completely invisible. Photos appear identical to originals. Only technical inspection reveals EXIF absence. Your followers will never notice EXIF removal.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is offline EXIF removal safer than platform tools?</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Yes, offline tools are safer. Photos never leave your device, never touch external servers, and platforms cannot access photos during removal. Offline EXIF removal provides maximum privacy compared to uploading to online removal services or trusting platform removal.
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Secure Your Social Media Photos Today</h2>
            <p className="text-muted-foreground leading-relaxed">
              Remove EXIF data before uploading any photos to social media. Protect location privacy from platform tracking, third-party apps, and other users. Try Pixocraft's EXIF remover now—no signup required, completely offline, and makes social media sharing safe and private.
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
                {" "} – Remove metadata for social media
              </li>
              <li>
                <Link href="/tools/image-compressor" className="hover:text-foreground transition-colors underline">
                  Image Compressor
                </Link>
                {" "} – Optimize for social sharing
              </li>
              <li>
                <Link href="/tools/image-resizer" className="hover:text-foreground transition-colors underline">
                  Image Resizer
                </Link>
                {" "} – Resize for social platforms
              </li>
            </ul>
          </div>
        </article>
      </div>
    </div>
  );
}
