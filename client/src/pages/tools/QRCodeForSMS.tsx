import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2,
  MessageSquare,
  Smartphone,
  Megaphone,
  UtensilsCrossed,
  HeadphonesIcon,
  Package,
  CalendarCheck,
  AlertCircle,
  ArrowRight,
  Zap,
  Star,
  BadgeCheck,
  Users,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for SMS?",
    answer:
      "Select the SMS type in the QR code generator above, enter the destination phone number (including country code), and optionally add a pre-written message. The tool generates an SMS QR code instantly. When scanned, it opens the user's default messaging app with the number and message already filled in — ready to send in one tap.",
  },
  {
    question: "Can QR codes open SMS drafts?",
    answer:
      "Yes. An SMS QR code encodes an sms: link — a standard mobile protocol recognized by all modern smartphones. When scanned, the phone opens its default messaging app and populates the recipient number and message body from the data encoded in the QR code. The user reviews the pre-filled message and sends it in one tap, with no manual entry required.",
  },
  {
    question: "Do users need apps to scan SMS QR codes?",
    answer:
      "No additional app is required for scanning. The built-in camera on any modern iPhone (iOS 11+) or Android (Android 10+) reads the QR code natively and opens the SMS draft automatically. Users do need a messaging app configured on their device — which applies to every active smartphone. No download, account, or setup is required on the recipient's side.",
  },
  {
    question: "Are SMS QR codes free?",
    answer:
      "Yes, completely free. Our SMS QR code generator requires no account, no subscription, and no payment of any kind. You can create and download as many SMS QR codes as you need, with no watermarks on the downloaded files. The QR code is yours to use immediately for any personal or commercial purpose.",
  },
  {
    question: "Can QR codes include pre-written messages?",
    answer:
      "Yes. An SMS QR code can encode both the recipient phone number and a pre-written message body. When the user scans the code, the messaging app opens with the number and message already populated. The user can edit the message before sending or tap Send immediately. Pre-written messages are especially useful for support requests, event registrations, and marketing campaigns where a standard opening message improves response quality and consistency.",
  },
];

export default function QRCodeForSMS() {
  useSEO({
    title: "SMS QR Code Generator – Create QR Codes to Send Text Messages | Pixocraft",
    description:
      "Generate SMS QR codes that open a text message draft instantly when scanned. Free SMS QR code generator for customer support, marketing campaigns, and service requests. No sign-up required.",
    keywords:
      "sms qr code generator, qr code for sms, text message qr code, create qr code for sms, qr code to send text message",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-sms",
    ogImage: OG_IMAGES.qrMaker,
  });

  const scrollToTool = () => {
    document.getElementById("qr-tool-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(generateFAQSchema(faqItems))}
      </script>

      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              SMS QR Code Generator – Create QR Codes to Send Text Messages
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate QR codes that allow users to send SMS messages instantly. Perfect for customer support, service requests, marketing campaigns, and quick communication.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Send SMS instantly with one scan</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for support and service requests</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Great for marketing campaigns</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto" onClick={scrollToTool}>
              Create SMS QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your SMS QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Select the <strong>SMS</strong> type in the tool below, enter the phone number (including country code) and an optional pre-written message. The text message QR code is generated instantly — download it and place it wherever you want users to reach you with a single scan.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use SMS QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for SMS?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Asking a customer or user to text you involves several steps that introduce friction at every turn — they need to notice your number, save it or remember it, open their messaging app, start a new message, type the number correctly, and compose a message from scratch. An SMS QR code eliminates all of it. One scan opens the messaging app with the number and message already filled in, ready to send. The contact moment is captured instantly — before attention moves elsewhere and the intent to reach out fades.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Instant SMS Drafting</h3>
                </div>
                <p className="text-muted-foreground">
                  A create QR code for SMS approach encodes an sms: link — the same protocol that tel: links use for phone calls, but for text messages. When scanned, any modern smartphone opens its default messaging app with the recipient number and optional message body pre-populated. The process takes under two seconds from scan to a draft ready to send. For high-traffic environments like retail counters, event booths, or support posters, this speed removes every barrier between a user's intent and a delivered message.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <HeadphonesIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Simplified Customer Communication</h3>
                </div>
                <p className="text-muted-foreground">
                  Businesses that offer SMS as a support or contact channel benefit significantly from a QR code that removes the friction of number entry. Customers who scan a support SMS QR code on a product, poster, or webpage go directly to a pre-addressed message — no website navigation, no contact form, no hold music. The message is drafted and ready to send before the customer has had time to abandon the contact attempt out of inconvenience.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Faster Support Requests</h3>
                </div>
                <p className="text-muted-foreground">
                  A qr code for SMS on a support poster, product card, or service page pre-fills the subject of the message — "Support Request", "Booking Inquiry", or "Order Issue" — so every incoming message arrives with context. This structured approach reduces the back-and-forth needed to understand what the customer needs, speeds up first response time, and allows support teams to triage and route messages without an additional clarification step.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">No Manual Phone Number Typing</h3>
                </div>
                <p className="text-muted-foreground">
                  A mistyped phone number means the message never arrives — and the sender may not realize it until a follow-up attempt reveals the issue. An SMS QR code encodes the number with absolute precision and passes it directly to the messaging app. Every message sent from a scanned code reaches exactly the number specified — no digit transpositions, no country code errors, no lost customer contacts.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of SMS QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A text message QR code improves communication speed and reliability across every use case:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Instant Communication</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    One scan opens a fully addressed SMS draft in the user's messaging app within seconds. No number searching, no app navigation, no typing. The message is ready to send before the user has had time to reconsider — capturing intent at the moment it is strongest.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <HeadphonesIcon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Simplified Support Contact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    An SMS QR code on a product, manual, or support page removes every step between a customer's problem and your support team's inbox. Pre-filling the message with "Support Request" ensures incoming messages are immediately recognizable — reducing triage time and improving response speed.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Perfect for Marketing Campaigns</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Marketing flyers and posters with an SMS QR code give audiences an immediate response mechanism — scanning sends a pre-written message like "Send me more info" or "I'm interested" directly to your number. Campaign response rates improve when the action requires a single scan rather than a website visit and form submission.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Fast Customer Interaction</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    SMS is the highest-open-rate communication channel available — messages are typically read within three minutes of receipt. An SMS QR code that connects a customer to your number instantly combines the accessibility of QR scanning with the immediacy of text messaging, creating a communication channel that is both easy to initiate and fast to respond to.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Easy Message Sending</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A pre-written message removes the blank-screen hesitation that stops many users from completing a contact attempt. When the message body is already drafted — even just an opening line — users are far more likely to review, personalize if needed, and send rather than close the app and decide to come back later.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">No App Download Required</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Modern iPhones and Android phones scan SMS QR codes natively using the built-in camera — no third-party scanner app needed. The messaging app opens automatically. For audiences who may be reluctant to download apps, the native scanning capability removes the last remaining barrier to the contact action.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where SMS QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where SMS QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                An SMS QR code belongs anywhere you want to make it immediately easy for someone to send you a text message:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <HeadphonesIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Customer Support Posters</h3>
                </div>
                <p className="text-muted-foreground">
                  Retail stores, service centers, and hospitality businesses display an SMS QR code on support posters in customer-facing areas — pre-filled with "I need help" or a relevant service request. Customers who have a question or issue scan the code from the poster and send a message without approaching a counter or waiting in a queue. Support staff receive the message on a shared number and respond directly — a faster, less disruptive resolution path than a face-to-face queue for minor issues.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Service Request Forms</h3>
                </div>
                <p className="text-muted-foreground">
                  Property managers, maintenance services, and facilities teams use SMS QR codes on notice boards and door signs — pre-filled with "Maintenance Request" as the message opening. Residents or tenants who have a repair need scan the code immediately and submit a request in under ten seconds. The request arrives as a text message with the sender's number attached, making follow-up straightforward without the overhead of a ticketing system or web form.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Marketing Flyers</h3>
                </div>
                <p className="text-muted-foreground">
                  Printed marketing materials — leaflets, direct mail, posters — traditionally ask readers to visit a website or call a number, both of which require significant effort. An SMS QR code on a flyer gives readers an instant response option. A pre-filled message like "Yes, send me details about [offer]" makes the response action so frictionless that conversion rates from print campaigns with SMS QR codes are typically higher than those asking for website visits.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CalendarCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Event Registrations</h3>
                </div>
                <p className="text-muted-foreground">
                  Event organizers use SMS QR codes on promotional materials — posters, social posts, printed programs — pre-filled with "Register me for [event name]" as the message body. Interested attendees scan and send immediately, without navigating to a registration page or filling in a form. The organizer receives a confirmation SMS from each registrant's own number — with built-in contact details — and can reply directly to confirm attendance.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Support Pages</h3>
                </div>
                <p className="text-muted-foreground">
                  Product instruction booklets and warranty cards include SMS QR codes that give customers a direct text channel to the support team — pre-filled with "Product Support" as the opening. Customers who encounter a problem during setup or use scan the code immediately and receive text-based assistance without navigating a website or being placed on hold. The text channel also allows support agents to send photo instructions or links when the issue requires a visual explanation.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <UtensilsCrossed className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Restaurant Booking Requests</h3>
                </div>
                <p className="text-muted-foreground">
                  Restaurants and cafes use SMS QR codes on window signs, table cards, and social media profiles — pre-filled with "I'd like to make a reservation" — to give potential diners a frictionless booking channel that does not require a reservation system, third-party platform, or phone call during busy service hours. The restaurant owner or manager receives a text message with the customer's number attached and calls or texts back to confirm details at a convenient moment.
                </p>
              </div>
            </div>
          </section>

          {/* How SMS QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How SMS QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Creating and deploying an SMS QR code takes four simple steps:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Enter the Phone Number</h3>
                  <p className="text-muted-foreground">
                    Select the SMS type in the generator above and enter the destination phone number — including the country code (for example, +1 for the United States, +44 for the UK, +91 for India). Copy and paste from a verified source rather than typing manually to eliminate any risk of digit errors. A single incorrect digit means every message sent from the QR code goes to a wrong number — or fails to send entirely — with no indication to the user that anything went wrong.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">2</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add an Optional Message</h3>
                  <p className="text-muted-foreground">
                    Optionally add a pre-written message body to the QR code. A pre-filled opening — "Support Request", "Booking Inquiry", "I'd like more information about..." — gives users a starting point and ensures incoming messages arrive with useful context. For campaigns and support applications, a pre-filled message increases the likelihood that the user will complete and send the message rather than facing a blank composition screen and closing the app without sending.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Generate the QR Code Using This Tool</h3>
                  <p className="text-muted-foreground">
                    The SMS QR code generator encodes your sms: link — including the phone number and optional message — into a downloadable QR code instantly. Download in PNG format at high resolution for print use, or at standard resolution for digital sharing. No account is required, there are no watermarks, and there is no usage limit. The code is ready to use the moment it is downloaded.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Users Scan the Code and Their SMS App Opens Automatically</h3>
                  <p className="text-muted-foreground">
                    When a user points their phone camera at the QR code, the messaging app opens automatically — with the recipient number and any pre-written message body already populated. The user reviews the message, adds any additional details they want to include, and sends. The message arrives at your number with the sender's contact details attached — making follow-up straightforward, without any additional steps on either side of the exchange.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real World Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Real-World Use Cases for SMS QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              SMS QR codes are used across industries to simplify messaging, support, and outreach:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Support SMS Codes</CardTitle>
                  <CardDescription>Retail and service businesses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A home appliance retailer places an SMS QR code on a customer service poster near the exit — pre-filled with "I need support with my recent purchase." Customers who encountered a problem during or after their visit scan the code before leaving and send a message in seconds. The support team receives the inquiry via text, with the customer's number ready for a follow-up call or text reply — capturing the contact moment before the customer drives home and decides it is not worth the effort.
                  </p>
                  <Badge variant="secondary">Customer Support</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Registration SMS Codes</CardTitle>
                  <CardDescription>Events and community organizing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A community fitness studio advertises a new class series on flyers distributed in the neighborhood — each flyer includes an SMS QR code pre-filled with "Register me for the new class." Residents who are interested scan the code from the flyer and send the message immediately. The studio receives registration confirmations as text messages, responds to confirm the spot, and builds a contact list from the sender numbers — all without a website, booking platform, or manual sign-up sheet.
                  </p>
                  <Badge variant="secondary">Events</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Booking Requests</CardTitle>
                  <CardDescription>Hospitality and food service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A small independent restaurant without an online reservation system places an SMS QR code on its window — pre-filled with "I'd like to book a table." Passers-by who spot the restaurant and want to make a reservation scan the code immediately and send a message from the street, before they have moved on and forgotten the name. The owner receives the inquiry during a quiet moment and texts back to confirm the booking — a simple, personal reservation system with no software overhead.
                  </p>
                  <Badge variant="secondary">Hospitality</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Support Requests</CardTitle>
                  <CardDescription>Manufacturing and retail</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A consumer goods brand includes an SMS QR code on the back of product packaging — pre-addressed to the support team's SMS number with "Product Help" in the message body. Customers who encounter a fault or question during use scan the code immediately and describe their issue in the text. The support agent receives the message with the customer's number attached and responds directly — a faster, more personal support experience than navigating a website help center or waiting on hold.
                  </p>
                  <Badge variant="secondary">Product Support</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Design Best Practices for SMS QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to ensure your SMS QR code is scanned reliably and generates useful, actionable messages:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Include Text Like "Scan to Send Message"</h3>
                  <p className="text-muted-foreground text-sm">
                    Always accompany your SMS QR code with a direct instruction — "Scan to Text Us", "Scan to Send a Message", or "Scan to Request Support." Users recognize QR codes but frequently do not scan without a clear prompt that tells them exactly what will happen. A well-worded call to action placed immediately next to the code removes hesitation and communicates the value of scanning — particularly important on printed materials where the context is not always immediately obvious.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast QR Codes</h3>
                  <p className="text-muted-foreground text-sm">
                    Print the QR code in dark modules on a white or very light background. Avoid placing the code on colored, textured, or glossy surfaces that reduce contrast and scanning reliability. In the variable lighting conditions of retail floors, event venues, and outdoor advertising, high contrast is the single most important design factor for consistent scanning across all distances and angles. Test the code in the actual environment before finalizing any print run.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test QR Codes Before Printing</h3>
                  <p className="text-muted-foreground text-sm">
                    Before printing any materials, scan the SMS QR code on both an iPhone and an Android device. Confirm the messaging app opens, the correct phone number appears in the To field, and the pre-written message body is populated exactly as intended. A code that dials the wrong number, or that opens with a blank message when a pre-filled message was expected, is a printing error that cannot be corrected after distribution — and one that costs every potential contact it was intended to capture.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Place QR Codes Where Users Can Easily Scan</h3>
                  <p className="text-muted-foreground text-sm">
                    Position the SMS QR code at eye level and in a location where the user's phone can be held comfortably to scan — on a counter card, a poster at standing height, or the front page of a leaflet. Codes placed too high on a wall, too low on a floor display, or in a position that requires an awkward scanning angle will generate far fewer scans than codes placed at the natural focal point for the environment. Physical placement directly controls scan rate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common SMS QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These are the most frequent causes of SMS QR codes that fail to deliver messages to the right destination:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Incorrect Phone Number</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    An incorrect phone number in the QR code means every message sent from it goes to the wrong recipient — or fails to send entirely. The sender has no indication that anything went wrong, and your business loses every contact attempt without knowing it. Always copy and paste the number from a verified, active source, and include the correct country code. After generating the code, scan it and confirm the number shown in the To field of the opened message is exactly correct before approving any print or display materials.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">QR Codes Printed Too Small</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    An SMS QR code that is too small to scan reliably fails at the point of use — the moment the user decides to act. On a poster or counter card, allow at least 3 cm x 3 cm for reliable scanning. On packaging or business cards where space is tighter, allow at least 2 cm x 2 cm and ensure the code has a clear white border around it. Test the scan at the intended size before printing and specifically test from the distance users will naturally be standing when they encounter the code.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Low Resolution QR Codes</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A QR code saved at low resolution and scaled up for printing appears blurry or pixelated — causing scan failure or inconsistent results in low-light environments. Always download the code in PNG format at the highest available resolution from the generator above. For large-format applications — signage, banners, or event posters — test a printed proof for sharpness before committing to the final print run.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Missing Call-to-Action Text</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    An SMS QR code displayed without any label or instruction is ambiguous — users may not know whether scanning will open a website, a payment page, or a text message. A clear label — "Scan to Text Us" or "Scan to Send a Support Message" — immediately communicates the purpose of the scan and the value the user will receive from completing it. This single line of text is one of the most impactful improvements you can make to the scan rate of any QR code in a public-facing environment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{item.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Internal Linking */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Related QR Code Tools</h2>
            <p className="text-muted-foreground mb-6">
              Explore more QR code generators for every use case:
            </p>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                — Create any type of QR code with full customization options
              </p>
              <p>
                <Link href="/tools/qr-code-for-wifi">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for WiFi</span>
                </Link>{" "}
                — Let guests connect to your WiFi network instantly by scanning
              </p>
              <p>
                <Link href="/tools/qr-code-for-payments">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Payments</span>
                </Link>{" "}
                — Generate scan-to-pay QR codes for businesses and freelancers
              </p>
              <p>
                <Link href="/tools/qr-code-for-vcard-contacts">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for vCard Contacts</span>
                </Link>{" "}
                — Share your contact details digitally with a single scan
              </p>
              <p>
                <Link href="/tools/qr-code-for-email">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Email</span>
                </Link>{" "}
                — Create QR codes that open a pre-filled email draft instantly
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="border-t pt-12">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Create Your SMS QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that lets users send text messages instantly by scanning. Free to use, no account required, and ready to print or share in seconds.
              </p>
              <Button size="lg" onClick={scrollToTool}>
                Create SMS QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
