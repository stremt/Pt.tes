import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSEO } from "@/lib/seo";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy | Pixocraft Tools",
    description: "Read our privacy policy to understand how Pixocraft Tools protects your data. We don't collect, track, or sell your information.",
    keywords: "privacy policy, data protection, privacy, security",
    canonicalUrl: "https://tools.pixocraft.in/privacy",
  });

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Page Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="mb-4">Privacy Policy</Badge>
          <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: January 12, 2025
          </p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-lg text-muted-foreground">
                At Pixocraft Tools, we take your privacy seriously. This Privacy Policy explains how we handle your data when you use our online tools and services.
              </p>
              <p className="text-lg font-medium text-primary">
                TL;DR: We don't collect, store, track, or sell your personal data.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Main Content */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Information We Don't Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Unlike many online services, we deliberately chose not to collect or store any of the following:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal identification information (name, email, address)</li>
                <li>Usage data or analytics</li>
                <li>Cookies or tracking pixels</li>
                <li>IP addresses or location data</li>
                <li>Browser fingerprints or device identifiers</li>
                <li>Any data you process through our tools</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How Our Tools Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                All our tools operate entirely in your browser:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Password Generator:</strong> Passwords are generated locally in your browser and never sent to our servers</li>
                <li><strong>QR Code Maker:</strong> QR codes are created in your browser using JavaScript</li>
                <li><strong>Image Compressor:</strong> Images are processed entirely on your device and never uploaded to our servers</li>
                <li><strong>Temp Mail:</strong> Email sessions are stored locally in your browser using localStorage</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                For the Temp Mail tool, we use the Mail.tm API to provide temporary email services. When you use this tool:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email data is handled by Mail.tm according to their privacy policy</li>
                <li>We don't have access to the content of emails you receive</li>
                <li>Your email session is stored only in your browser's local storage</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Storage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Some tools use your browser's localStorage to enhance your experience:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Temp Mail stores your email session so you can return to check messages</li>
                <li>This data is stored only on your device, not on our servers</li>
                <li>You can clear this data anytime by clearing your browser's local storage</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                When you contact us through our contact form:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We collect only the information you voluntarily provide (name, email, message)</li>
                <li>This information is used solely to respond to your inquiry</li>
                <li>We don't share this information with third parties</li>
                <li>We don't add you to any mailing lists without your explicit consent</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                We implement appropriate security measures to protect our website and services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>HTTPS encryption for all connections</li>
                <li>Regular security updates and monitoring</li>
                <li>No storage of sensitive user data on our servers</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Our services are available to users of all ages. Since we don't collect personal information, we don't knowingly collect data from children under 13.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We may update this Privacy Policy from time to time. We will notify users of any material changes by updating the "Last updated" date at the top of this policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <p className="mt-4">
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:support@pixocraft.in"
                  className="text-primary hover:underline"
                >
                  support@pixocraft.in
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
