import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, AlertCircle, HelpCircle, Ticket, Users, Calendar, Smartphone } from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for event tickets?",
    answer: "Generate a QR code using the tool above by entering your ticketing page URL or event registration link. For individual ticket QR codes, you'll need to generate a unique QR code per ticket linking to each attendee's ticket confirmation URL. Download in high resolution and add to your digital or printed tickets."
  },
  {
    question: "Can I use QR codes for event check-in?",
    answer: "Yes! QR codes are ideal for event check-in. Generate unique QR codes for each ticket that link to the attendee's confirmation or check-in page. At the event, staff scan the QR codes using a smartphone or dedicated scanner to verify entry and mark attendees as checked in."
  },
  {
    question: "What information should the event QR code contain?",
    answer: "Event ticket QR codes typically link to a URL that contains the ticket details, attendee name, seat number (if applicable), and event information. The linked page should confirm the ticket is valid and show relevant event information like schedule and venue map."
  },
  {
    question: "Can I prevent QR code fraud at my event?",
    answer: "To prevent ticket fraud, use unique QR codes per ticket that link to a validation system. When scanned, the system marks the ticket as used so it can't be scanned again. This prevents duplicate ticket fraud and unauthorized access."
  },
  {
    question: "What size should QR codes be on event tickets?",
    answer: "For printed tickets, a QR code of 2.5cm x 2.5cm is sufficient. For digital tickets displayed on phone screens, larger is better for easy scanning. Always use high-resolution (2x or 4x) codes to ensure quality on both digital and print formats."
  },
  {
    question: "Can I use QR codes for event schedules and information?",
    answer: "Absolutely! QR codes are perfect for distributing event schedules, speaker bios, venue maps, and real-time updates. Place QR codes at event entrances, on signage, and in printed programs so attendees can access all information digitally."
  },
  {
    question: "Are event QR codes free to create?",
    answer: "Yes! Our QR code generator is completely free. You can create as many event QR codes as you need without any subscription or account required."
  }
];

export default function QRCodeForEventTickets() {
  useSEO({
    title: "QR Code for Event Tickets | Event Registration & Check-in QR Generator",
    description: "Create QR codes for event tickets, registration, and check-ins. Generate custom event QR codes for conferences, concerts, sports events, and more. Free online event QR code maker.",
    keywords: "qr code for event tickets, event ticket qr code, event registration qr code, event check-in qr code, qr code for events, event management qr code, conference qr code",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-event-tickets",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Event Tickets – Free Event Ticket QR Code Generator | Pixocraft","description":"Create a QR code for event tickets. Generate scannable event QR codes for concerts, conferences, workshops, and any ticketed event.","url":"https://tools.pixocraft.in/tools/qr-code-for-event-tickets","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for Event Tickets","description":"Follow these steps to generate a QR code for your event ticket or event registration page.","step":[{"@type":"HowToStep","name":"Copy Your Event Registration or Ticket URL","text":"Get the URL of your event page, ticket booking platform, or event registration form."},{"@type":"HowToStep","name":"Enter the URL into the QR Generator","text":"Open the Pixocraft QR Code Generator and paste the event URL into the input field."},{"@type":"HowToStep","name":"Customize Your Event QR Code","text":"Style the QR code with your event's brand colors and add an event logo or icon to the center."},{"@type":"HowToStep","name":"Add to Tickets and Promotional Materials","text":"Download the QR code and embed it on printed tickets, event posters, invitations, and email campaigns."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Event Tickets","item":"https://tools.pixocraft.in/tools/qr-code-for-event-tickets"}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(generateFAQSchema(faqItems))}
      </script>

      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground pt-4 pb-2 max-w-4xl mx-auto px-4 md:px-8 flex-wrap">
            <Link href="/"><span className="hover:text-foreground cursor-pointer">Home</span></Link>
            <span>›</span>
            <Link href="/tools/qr-maker"><span className="hover:text-foreground cursor-pointer">QR Code Generator</span></Link>
            <span>›</span>
            <span className="text-foreground">QR Code for Event Tickets</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">Event Management</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">QR Code for Event Tickets & Registration – Streamline Check-ins Instantly</h1>
            <p className="text-xl text-muted-foreground mb-8">Generate custom QR codes for event tickets, conference registration, and seamless check-ins. Track attendance, prevent fraud, and deliver a modern event experience attendees love.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Instant check-in via scan</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Works on all smartphones</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Prevent ticket fraud</span></div>
              <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" /><span className="text-muted-foreground">Track real-time attendance</span></div>
            </div>
            <span className="hidden"><Link href="/tools/qr-maker#qr-generator"><Button size="lg">Create Event QR Code</Button></Link></span>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* Embedded Tool */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Event Ticket QR Code</h2>
              <p className="text-lg text-muted-foreground">Enter your event registration URL, ticket confirmation page, or event information link to create a QR code for your event.</p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} defaultType="url" />
            <p className="mt-4 text-sm text-muted-foreground">
                Use our{" "}
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                to create custom QR codes for websites, social media, marketing campaigns, and business use cases.
              </p>
            </div>
          </section>

          {/* Why Events Use QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Why Event Organizers Use QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">QR codes have revolutionized event management by replacing paper-based processes with fast, reliable digital systems:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Faster Entry & Check-In</h3>
                <p className="text-muted-foreground">QR code scanning is 3-5x faster than manual ticket checking. Reduce queues dramatically by allowing staff to scan and admit attendees in seconds rather than minutes. Perfect for large-scale events with thousands of attendees.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Ticket Fraud Prevention</h3>
                <p className="text-muted-foreground">Unique QR codes per ticket that are marked as used upon scanning prevent counterfeit and duplicate ticket fraud. Real-time validation ensures each ticket can only be used once at your event.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Contactless & Paperless</h3>
                <p className="text-muted-foreground">Digital tickets with QR codes eliminate the need for printed tickets. Attendees present their phone for scanning — faster for them, cheaper for you, and better for the environment.</p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">Real-Time Attendance Data</h3>
                <p className="text-muted-foreground">Track check-in rates, peak entry times, and no-shows in real time as attendees scan in. This data helps with future event planning, capacity management, and sponsor reporting.</p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Benefits of QR Code Ticketing for Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><Ticket className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Easy Ticket Delivery</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Send QR code tickets via email instantly. Attendees store them in Apple Wallet, Google Wallet, or simply as a screenshot on their phone.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><Smartphone className="w-5 h-5 text-primary" /><CardTitle className="text-lg">No App Needed</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Attendees don't need to download any app to use their QR ticket. Their phone camera is all they need for entry — zero friction for attendees.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><Users className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Scalable to Any Size</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">QR code ticketing works equally well for a 50-person workshop or a 50,000-person festival. Scale check-in capacity by adding more scanning stations.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><Calendar className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Schedule Distribution</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Use QR codes on event signage to distribute schedules, speaker bios, and venue maps. Update content without reprinting signage.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><CheckCircle2 className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Reduced Staffing Costs</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Faster check-in means fewer staff needed at entry points. One person with a smartphone scanner can process many more attendees per hour.</p></CardContent>
              </Card>
              <Card>
                <CardHeader><div className="flex items-center gap-2 mb-1"><CheckCircle2 className="w-5 h-5 text-primary" /><CardTitle className="text-lg">Eco-Friendly</CardTitle></div></CardHeader>
                <CardContent><p className="text-sm text-muted-foreground">Eliminate printing costs for tickets, lanyards, and programs. Digital QR codes are more sustainable and reduce event paper waste significantly.</p></CardContent>
              </Card>
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">How Event QR Code Check-in Works</h2>
            <div className="space-y-6">
              {[
                { step: 1, title: "Set Up Your Event Registration", desc: "Use an event ticketing platform (Eventbrite, Ticket Tailor, etc.) or build a custom registration form. Ensure each registration generates a unique confirmation page URL for each attendee." },
                { step: 2, title: "Generate QR Codes for Each Ticket", desc: "Create unique QR codes linking to each attendee's ticket confirmation. Use the generator above for event information QR codes. For individual tickets, use your ticketing platform's built-in QR feature." },
                { step: 3, title: "Distribute Digital Tickets", desc: "Send QR code tickets via email confirmation. Attendees can add them to Apple Wallet or Google Wallet, screenshot them, or display the confirmation email at the event." },
                { step: 4, title: "Scan Tickets at Event Entry", desc: "At check-in, staff use smartphones or dedicated QR scanners to verify tickets. Valid tickets show a green confirmation; used or invalid tickets show a rejection. Attendees are admitted in seconds." }
              ].map(item => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">{item.step}</div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Placement at Events */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Where to Use QR Codes at Your Event</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Entry & Check-in Gates", desc: "The primary use. Staff scan attendee QR ticket codes at entry gates to verify and admit guests quickly. Multiple scanning stations reduce queues for large events." },
                { title: "Session & Workshop Access", desc: "Use separate QR codes for individual sessions in multi-track conferences. Attendees scan to access their registered sessions and prevent overcrowding." },
                { title: "Event Signage & Wayfinding", desc: "Place QR codes on signs throughout the venue linking to venue maps, session schedules, and real-time updates. Attendees scan to navigate the event." },
                { title: "Speaker & Exhibitor Profiles", desc: "Add QR codes to speaker badges, exhibitor stands, and display boards. Attendees scan to access detailed bios, social profiles, and downloadable presentations." },
                { title: "Networking & Contact Exchange", desc: "Enable attendees to add QR codes to their name badges. Other attendees scan to save contact information directly — paperless business card exchange." },
                { title: "Post-Event Feedback", desc: "Place QR codes on chairs or display them on screens at session ends linking to feedback surveys. Capture real-time feedback while the experience is fresh." }
              ].map(item => (
                <div key={item.title} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Event Types */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">QR Codes for Different Event Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader><CardTitle>Conferences & Trade Shows</CardTitle><CardDescription>Professional events</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Use QR codes for registration check-in, session access control, exhibitor booth tracking, networking, and distributing speaker presentations and handouts digitally.</p>
                  <Badge variant="secondary">B2B Events</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Concerts & Festivals</CardTitle><CardDescription>Entertainment events</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">QR code tickets on phone screens are scanned at entry gates for fast access. Use QR codes on wristbands for cashless payments and VIP area access control throughout the event.</p>
                  <Badge variant="secondary">High Volume</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Sports Events & Matches</CardTitle><CardDescription>Sporting competitions</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">QR code tickets linked to specific seats allow precise entry control. Scan tickets at stadium gates to validate entry and direct fans to correct seating sections efficiently.</p>
                  <Badge variant="secondary">Stadium Access</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Workshops & Classes</CardTitle><CardDescription>Educational events</CardDescription></CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">QR codes simplify check-in for recurring workshops. Link QR codes in confirmation emails to pre-event materials, reading lists, and Zoom links so attendees arrive fully prepared.</p>
                  <Badge variant="secondary">Education</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Best Practices for Event QR Codes</h2>
            <div className="space-y-4">
              {[
                { title: "Generate Unique QR Codes per Ticket", desc: "Each attendee should receive a unique QR code. Shared or identical codes create security vulnerabilities and make attendance tracking impossible." },
                { title: "Test Your Check-in Process Before the Event", desc: "Run a full dress rehearsal of your check-in process before event day. Test QR scanning on multiple devices and with different ticket formats (screenshot, email, Apple Wallet)." },
                { title: "Have a Manual Backup Process", desc: "Always have a manual attendee list as backup in case of technical issues. Technology can fail — having a paper or printed list prevents complete check-in failure." },
                { title: "Brief Your Check-in Staff", desc: "Ensure all check-in staff know how to use the scanning equipment and how to handle edge cases like used tickets, damaged codes, or technical errors." },
                { title: "Set Up Multiple Check-in Points", desc: "For events over 200 attendees, set up multiple scanning stations to prevent bottlenecks. Each station needs a smartphone or scanner and internet connectivity." },
                { title: "Use Large Enough QR Codes on Signage", desc: "QR codes used for wayfinding and schedule information should be at least 5cm x 5cm. Attendees should be able to scan comfortably without getting too close to the sign." }
              ].map(item => (
                <div key={item.title} className="flex gap-4 border rounded-lg p-4 bg-card">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div><h3 className="font-bold mb-1">{item.title}</h3><p className="text-muted-foreground text-sm">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Event QR Code Mistakes</h2>
            <div className="space-y-4">
              {[
                { title: "Not Testing Before Event Day", desc: "Discovering check-in problems on event day with hundreds of attendees waiting is a nightmare. Always test your QR scanning process thoroughly in advance." },
                { title: "Using a Single QR Code for All Tickets", desc: "One QR code for all attendees means you can't prevent re-entry or track individual attendance. Each ticket needs a unique QR code." },
                { title: "Relying Solely on Mobile Data", desc: "Events in large venues often have poor cellular connectivity. Have a local validation backup system in case internet connectivity fails during check-in." },
                { title: "Not Having a Fallback Plan", desc: "If your QR scanning system fails, you need a manual backup. Always have a printed attendee list that check-in staff can reference." }
              ].map(item => (
                <div key={item.title} className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20">
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">{item.title}</h3>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Event QR Code FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold mb-3 flex gap-2 items-start"><HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />{item.question}</h3>
                  <p className="text-muted-foreground text-sm ml-7">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Linking */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Explore More QR Code Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/tools/qr-code-for-restaurant-menu"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Restaurant Menu</h3><p className="text-sm text-muted-foreground">Create touchless digital menus for food businesses</p></div></Link>
              <Link href="/tools/qr-code-for-property-listings"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Real Estate</h3><p className="text-sm text-muted-foreground">Share property listings and virtual tours</p></div></Link>
              <Link href="/tools/qr-code-for-product-packaging"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">QR Code for Products</h3><p className="text-sm text-muted-foreground">Add QR codes to packaging for customer engagement</p></div></Link>
              <Link href="/tools/qr-maker"><div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer"><h3 className="font-bold mb-1">Main QR Code Generator</h3><p className="text-sm text-muted-foreground">Full QR code maker with all customization options</p></div></Link>
            </div>
          </section>


            {/* Same Bucket Cross-linking */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold mb-4">More Related QR Code Generators</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                <Link href="/tools/qr-code-for-restaurant-menu">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Restaurant Menu</span>
                </Link>{" "}
                — Create digital menu QR codes for restaurants
              </p>
              <p>
                <Link href="/tools/qr-code-for-property-listings">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Property Listings</span>
                </Link>{" "}
                — Share property listings with a scannable QR code
              </p>
              <p>
                <Link href="/tools/qr-code-for-product-packaging">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Product Packaging</span>
                </Link>{" "}
                — Add QR codes to product packaging
              </p>
              </div>
            </section>

          {/* Related QR Code Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-2xl font-bold mb-2">Related QR Code Use Cases</h2>
              <p className="text-muted-foreground mb-6">Explore more QR code guides for your specific needs.</p>
            </div>
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
            >
              {[
                { href: "/tools/qr-code-for-restaurant-menu", title: "QR Code for Restaurant Menu", desc: "Create touchless digital menus for food businesses." },
                { href: "/tools/qr-code-for-property-listings", title: "QR Code for Property Listings", desc: "Share property listings and virtual tours via QR code." },
                { href: "/tools/qr-code-for-product-packaging", title: "QR Code for Product Packaging", desc: "Add QR codes to packaging for customer engagement." },
                { href: "/tools/qr-code-for-instagram", title: "QR Code for Instagram", desc: "Grow event followers on Instagram." },
                { href: "/tools/qr-code-for-surveys", title: "QR Code for Surveys", desc: "Collect event attendee feedback via QR code." },
                { href: "/tools/qr-code-for-flyers", title: "QR Code for Flyers", desc: "Add event registration QR codes to flyers." },
              ].map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    className="flex flex-col gap-2 p-5 rounded-lg border bg-card hover-elevate cursor-pointer h-full"
                    data-testid={`card-related-${item.href.split("/").pop()}`}
                  >
                    <h3 className="font-semibold text-sm leading-snug">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
                    <span className="text-xs text-primary font-medium mt-1">Explore &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>


          {/* CTA */}
          <section className="border-t pt-12">
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-8 text-center space-y-4">
              <h2 className="text-3xl font-bold">Create Your Event QR Codes Now</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Generate professional event ticket and registration QR codes instantly. Free, unlimited, and ready for any event size.</p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">Generate Event QR Code</Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
