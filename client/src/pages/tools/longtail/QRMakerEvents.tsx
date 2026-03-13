import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/lib/seo";
import { Link } from "wouter";
import { ArrowRight, Ticket, Users, Calendar } from "lucide-react";
import QRMaker from "../QRMaker";

export default function QRMakerEvents() {
  useSEO({
    title: "QR Code Generator for Events & Ticketing - Attendee Management | Pixocraft",
    description: "Generate QR codes for event tickets, registrations, and attendee tracking. Perfect for conferences, concerts, weddings, and business events.",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-maker/event-ticketing",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code Generator for Events & Ticketing - Professional Attendee Management</h1>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Generate professional QR codes for event tickets, registrations, and attendee access. Perfect for conferences, concerts, weddings, trade shows, and business meetings. Track attendance, verify authenticity, and streamline check-in processes instantly.
        </p>

          {/* Embedded QR Code Tool */}
          <section className="my-8 border rounded-lg bg-muted/30 p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Free Online QR Code Generator</h2>
            <QRMaker embedMode={true} />
          </section>
  

        <Card className="mb-8 bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <Ticket className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Instant Verification</h3>
                  <p className="text-sm text-muted-foreground">Verify tickets on the spot</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Attendance Tracking</h3>
                  <p className="text-sm text-muted-foreground">Monitor who checks in</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Event Management</h3>
                  <p className="text-sm text-muted-foreground">Scalable for any size event</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Events?</h2>
        <p className="text-muted-foreground mb-6">
          QR codes eliminate paper tickets, reduce fraud, and streamline check-in operations. Event organizers save time, reduce costs, and create a professional experience. Whether digital or printed, QR codes work seamlessly across all event types and attendance scales.
        </p>

        <div className="space-y-6 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Perfect for All Event Types</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Conferences & Seminars:</strong> Track attendee participation and send follow-up materials</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Concerts & Festivals:</strong> Prevent duplicate entries and counterfeit tickets</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Weddings & Private Events:</strong> Elegant digital invitations and RSVP tracking</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary">•</span>
                <span><strong>Sports & Trade Shows:</strong> Manage large-scale attendance efficiently</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Reduce Operational Costs</h3>
            <p className="text-muted-foreground">
              Eliminate printing and shipping costs with digital tickets. QR codes reduce check-in staff requirements and prevent fraud through ticket duplication. Save time and money while improving attendee experience—especially for high-volume events.
            </p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">How to Create Event QR Codes</h2>
        <div className="space-y-6 mb-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">1</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Create Unique Ticket Data</h4>
              <p className="text-muted-foreground">Include ticket ID, event details, attendee info, or access links</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">2</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customize for Branding</h4>
              <p className="text-muted-foreground">Match colors and add your event logo for professional appearance</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-bold text-primary">3</span>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Download & Distribute</h4>
              <p className="text-muted-foreground">Email to attendees or print on tickets, wristbands, or signage</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Common Event QR Code Mistakes</h2>
        <div className="space-y-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Ignoring Mobile-First Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Most event attendees will scan QR codes with mobile devices. Ensure your linked landing page is mobile-responsive and loads quickly at events with spotty WiFi.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Forgetting Backup Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Technical failures happen. Have printable PDF backups of QR codes and alternate verification methods ready for every event.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Poor QR Code Placement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Place QR codes prominently on tickets, wristbands, or signage. Make sure they're large enough to scan easily even in crowded venues with poor lighting.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Privacy & Security for Event QR Codes</h2>
        <p className="text-muted-foreground mb-6">
          Event QR codes don't store personal data—they simply link to event information or verification systems. Your attendees' information stays secure. We recommend using HTTPS links and secure ticketing platforms to protect sensitive attendee data.
        </p>

        <h2 className="text-3xl font-bold mb-4 mt-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I track how many times an event QR code is scanned?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Our QR codes themselves don't track scans, but you can link them to analytics-enabled pages to monitor engagement and attendance patterns.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What happens if someone shares their digital ticket?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Unique QR codes per attendee prevent duplicate entries. Implement ticket validation at entry points or use single-scan systems to prevent misuse.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can I update QR code content after printing?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Static QR codes can't be modified after printing. If changes are needed, regenerate new codes. For flexibility, consider linking to a updatable landing page.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">What's the best file format for event QR codes?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">PNG format works best for digital distribution and printing. It maintains quality at any size and supports transparent backgrounds for easy integration into designs.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Can QR codes work offline for event check-in?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">QR codes themselves are just data—you can use offline scanner apps that validate codes against downloaded attendee lists for seamless check-in without internet.</p>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-4 mt-12">Related QR Code Tools</h2>
        <p className="text-muted-foreground mb-6">
          Explore more QR code options for your specific needs:
        </p>
        <div className="space-y-3 text-muted-foreground">
          <p><Link href="/tools/qr-maker"><span className="text-primary hover:underline cursor-pointer">Free QR Code Maker</span></Link> - Create any type of QR code with full customization</p>
          <p><Link href="/tools/qr-code-maker/with-logo"><span className="text-primary hover:underline cursor-pointer">QR Codes with Logo</span></Link> - Add your brand logo to QR codes</p>
          <p><Link href="/tools/qr-code-maker/business-cards"><span className="text-primary hover:underline cursor-pointer">Business Card QR Codes</span></Link> - Perfect for networking and contact sharing</p>
          <p><Link href="/tools/qr-code-maker/wifi-network"><span className="text-primary hover:underline cursor-pointer">WiFi Network QR Codes</span></Link> - Share WiFi access instantly</p>
        </div>

        <div className="mt-12 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Ready to Streamline Your Event Check-In?</h3>
          <p className="text-muted-foreground mb-4">
            Start creating professional event QR codes today. No signup required, completely free.
          </p>
          <Link href="/tools/qr-maker">
            <Button className="w-full">
              Open QR Code Maker
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
