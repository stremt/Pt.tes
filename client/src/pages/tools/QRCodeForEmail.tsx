import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2,
  Mail,
  Smartphone,
  Package,
  Megaphone,
  HeadphonesIcon,
  Building2,
  AlertCircle,
  ArrowRight,
  Zap,
  MessageSquare,
  Star,
  BadgeCheck,
  Users,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for email?",
    answer:
      "Select the Email type in the QR code generator above, then enter the recipient email address, an optional subject line, and an optional pre-filled message body. The tool generates a mailto QR code instantly. When scanned, it opens the user's default email app with all the fields you specified already filled in — ready to send in one tap.",
  },
  {
    question: "Can QR codes open an email draft?",
    answer:
      "Yes. An email QR code encodes a mailto link — a standard web protocol that tells any device to open its default email app and pre-populate the address, subject, and message fields with the values you provided. On iPhones it opens Mail or the default email app; on Android it opens Gmail or whichever email app the user has set as default. The email is pre-addressed and ready to send immediately after scanning.",
  },
  {
    question: "Do users need apps to scan email QR codes?",
    answer:
      "No additional app is required for scanning. The built-in camera on any modern iPhone (iOS 11+) or Android (Android 10+) reads the QR code natively. However, the user does need an email app installed and configured on their device for the mailto link to open correctly — which applies to virtually every smartphone in active use.",
  },
  {
    question: "Are email QR codes free?",
    answer:
      "Yes, completely free. Our email QR code generator requires no account, no subscription, and no payment. You can create and download as many email QR codes as you need at no cost, with no watermarks on the downloaded code. The QR code is ready to use immediately for any personal or commercial purpose.",
  },
  {
    question: "Can QR codes include subject and message?",
    answer:
      "Yes. An email QR code can encode the recipient address, a pre-filled subject line, and a pre-filled message body — all three fields together. When the user scans the code, their email app opens with the address, subject, and message already populated. The user can edit any field before sending or tap Send immediately. This is especially useful for customer support codes, inquiry forms, and event contact codes where a standard subject or opening message improves response quality.",
  },
];

export default function QRCodeForEmail() {
  useSEO({
    title: "Email QR Code Generator – Create QR Codes to Send Emails Instantly | Pixocraft",
    description:
      "Generate email QR codes that open an email draft instantly when scanned. Free mailto QR code generator for business inquiries, customer support, and contact pages. No sign-up required.",
    keywords:
      "email qr code generator, qr code for email address, create qr code for email, mailto qr code generator, qr code to send email",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-email",
    ogImage: OG_IMAGES.qrMaker,
  });


  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Email – Free Email QR Code Generator | Pixocraft","description":"Create a QR code for email that opens a pre-filled draft. Generate email QR codes for contact pages, business cards, and marketing materials.","url":"https://tools.pixocraft.in/tools/qr-code-for-email","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for Email","description":"Follow these steps to generate a QR code that opens a pre-filled email draft when scanned.","step":[{"@type":"HowToStep","name":"Enter the Recipient Email Address","text":"Type the email address that should receive the message when a user scans the QR code."},{"@type":"HowToStep","name":"Add a Subject Line and Message Body","text":"Optionally pre-fill the subject line and message body so the user's email client opens with the draft ready to send."},{"@type":"HowToStep","name":"Generate the Email QR Code","text":"Click Generate in the Pixocraft QR Code Generator to create the mailto QR code."},{"@type":"HowToStep","name":"Download and Share","text":"Download the QR code and add it to your contact page, business cards, brochures, or printed materials."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Email","item":"https://tools.pixocraft.in/tools/qr-code-for-email"}]})}
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
            <span className="text-foreground">QR Code for Email</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Email QR Code Generator – Create QR Codes to Send Emails Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate QR codes that open an email draft instantly when scanned. Perfect for business inquiries, customer support, and contact pages.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Send emails instantly with one scan</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for customer inquiries</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Great for business contact pages</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <span className="hidden"><Link href="/tools/qr-maker#qr-generator"><Button size="lg" className="w-full md:w-auto">
              Create Email QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button></Link></span>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Email QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Select the <strong>Email</strong> type in the tool below, then enter the recipient address, an optional subject, and an optional pre-filled message. The mailto QR code is generated instantly — download it and place it anywhere you want users to contact you with a single scan.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} defaultType="email" />
            </div>
          </section>

          {/* Why Use Email QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Email?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Getting someone to contact you by email requires them to notice your address, remember it, open their email app, type it in correctly, add a subject, and write a message — a process that involves enough friction to lose a meaningful share of potential enquirers before they ever hit send. An email QR code collapses the entire sequence into a single scan. The user's email app opens automatically with the address, subject, and message already filled in — they simply review and send. For businesses that rely on email inquiries, this reduction in friction translates directly into a higher volume of messages received.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Instant Email Drafting</h3>
                </div>
                <p className="text-muted-foreground">
                  A create QR code for email approach eliminates every manual step between a user's intent to contact you and an email ready to send. The QR code encodes a mailto link — a standard web protocol that tells any smartphone to open its email app and populate the recipient address, subject line, and message body from the data in the code. Scanning takes one second. The email opens ready to send in another. The entire contact initiation process is reduced to the time it takes to point a camera.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Simplified Business Contact</h3>
                </div>
                <p className="text-muted-foreground">
                  For businesses that receive inquiries through multiple channels, an email QR code placed on printed materials, signage, or product packaging gives customers a direct, immediate path to email contact — without requiring them to visit a website, navigate to a contact page, or fill in a web form. The QR code is the contact form. Customers scan, review the pre-populated email, and send — from wherever they are, on any device, without any additional steps.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Faster Customer Inquiries</h3>
                </div>
                <p className="text-muted-foreground">
                  A qr code to send email reduces the time between a customer's question and your inbox receiving it. Pre-filling the subject line with a category — "Product Inquiry", "Support Request", or "Event Registration" — also improves the quality of incoming messages by guiding customers toward structured, useful subject lines. This makes inbox management easier on your end and ensures responses go to the right team faster.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">No Manual Email Typing</h3>
                </div>
                <p className="text-muted-foreground">
                  Email addresses are easy to mistype, especially on a small smartphone keyboard — a single transposed character means the message never arrives. An email QR code encodes the address with absolute precision and passes it directly to the email app without any manual entry. Every email opened from a scanned QR code goes to exactly the address you specified when creating the code — no typos, no bounced messages, no lost inquiries.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Email QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                An email QR code improves communication for businesses and individuals across every channel:
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
                    A scan opens a fully pre-addressed email in seconds. No app navigation, no address typing, no subject line thinking required. The path from "I want to contact them" to "email ready to send" is as short as it can possibly be.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <HeadphonesIcon className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Simplified Support Requests</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A qr code for email address on a product, manual, or packaging lets customers open a support request email instantly — with the support address pre-filled and the subject pre-set to "Product Support". Customers who encounter a problem get help faster; your support team receives structured, correctly routed messages.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Perfect for Business Contact</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Business cards, brochures, and signage with an email QR code remove the barrier between a potential client's interest and a message in your inbox. The contact moment is captured immediately — while the interest is present — rather than being deferred to a later device session that may never happen.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Faster Customer Engagement</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every additional step between a customer's interest and a sent message reduces the likelihood of that message being sent. An email QR code removes every unnecessary step — the customer's interest converts to a message without any navigation, form-filling, or address-hunting required.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Professional Contact Sharing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    An email QR code on a business card or email signature positions the contact exchange as modern and efficient. Recipients who scan save time on contact initiation and form a positive first impression of an organization that values their time enough to remove friction from the very first interaction.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Works Across All Devices</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    The mailto protocol is supported across all major mobile email clients — Gmail, Outlook, Apple Mail, and others. An email QR code works on every modern smartphone regardless of operating system or email provider. No compatibility issues, no platform restrictions.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Email QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Email QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                An email QR code belongs anywhere you want to make it as easy as possible for someone to contact you:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Business Cards</h3>
                </div>
                <p className="text-muted-foreground">
                  A mailto QR code generator creates a code that, when placed on a business card, gives recipients an immediate path to your inbox without typing your address. The code can pre-fill a subject line like "Meeting Follow-Up" or "Inquiry from [Event Name]" to provide context for every incoming message from that card. Combined with a vCard QR code on the reverse, both the contact and the email channel are captured in a single card exchange.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Packaging</h3>
                </div>
                <p className="text-muted-foreground">
                  A support email QR code printed on product packaging gives customers an immediate path to assistance the moment they encounter a problem — without searching for a website, navigating to a support page, or hunting for a contact form. The QR code on the box is the support channel. Scanning it opens a support email pre-addressed to your customer service team, with a subject like "Product Support Request" already populated.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <HeadphonesIcon className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Support Pages</h3>
                </div>
                <p className="text-muted-foreground">
                  Help centers and support pages that offer an email contact option can replace a plain mailto link with a QR code for users viewing the page on desktop who want to send from their phone. Scanning from the desktop screen opens the email app on the mobile device — a more natural composition environment than typing on a laptop for many users. The QR code bridges the desktop-to-mobile gap at the exact moment of contact initiation.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Print Advertisements</h3>
                </div>
                <p className="text-muted-foreground">
                  Print ads — in magazines, newspapers, event programs, and direct mail — have limited space and no clickable links. An email QR code gives print readers a direct, scannable path to your inbox from a static page. A reader who sees an advertisement for a service they need can scan the email QR code immediately and send an inquiry before they have put the publication down — capturing the contact moment while interest is at its peak.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Event Booths</h3>
                </div>
                <p className="text-muted-foreground">
                  Trade show and exhibition booths display email QR codes on banners or table signs — giving visitors a zero-effort path to follow up after a conversation. A visitor who was impressed by a presentation scans the email QR code on the way out and sends a message before they have reached the next booth. The email arrives with context — a pre-filled subject like "Inquiry from [Event Name]" — making it easy to prioritize and respond to event-generated leads efficiently.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Email Signatures</h3>
                </div>
                <p className="text-muted-foreground">
                  An email QR code in an email signature lets recipients on mobile devices who want to forward your contact to a colleague open a pre-addressed email with your details in a single scan of the screen — bypassing the need to type or copy your address. For high-volume email senders, the signature QR code turns every outgoing message into a secondary contact opportunity for anyone reviewing the thread on a different device.
                </p>
              </div>
            </div>
          </section>

          {/* How Email QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Email QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Creating and deploying an email QR code takes four simple steps:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Enter the Email Address</h3>
                  <p className="text-muted-foreground">
                    Select the Email type in the generator above and enter the recipient email address exactly — the address where you want messages to arrive. Copy and paste from a verified source rather than typing manually to eliminate any risk of a transcription error. A single character error in the address means every email sent from your QR code goes to the wrong inbox — or bounces entirely — with no way for the sender to know.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">2</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add an Optional Subject or Message</h3>
                  <p className="text-muted-foreground">
                    Optionally add a pre-filled subject line and message body to the QR code. A subject like "Customer Support Request" or "Product Inquiry" helps your team categorize and route incoming messages correctly. A pre-filled opening message — "Hi, I scanned your QR code and would like to ask about..." — guides customers who may not know how to start the email, reducing the volume of blank or context-free messages that require follow-up clarification before they can be addressed.
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
                    The email QR code generator encodes your mailto link — including the address, subject, and message — into a downloadable QR code instantly. Download in PNG format at high resolution for print use, or at standard resolution for digital embedding. No account is required, there are no watermarks, and there is no usage limit. The code is ready to use the moment it is downloaded.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Users Scan the Code and Their Email App Opens Automatically</h3>
                  <p className="text-muted-foreground">
                    When a user points their camera at the QR code, their smartphone opens the default email app automatically — with the recipient address, subject line, and message body already populated from the data encoded in the code. The user reviews the pre-filled email, adds any additional information they want to include, and sends. The message arrives in your inbox correctly addressed, contextualized, and routed — with zero friction on either side of the exchange.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real World Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Real-World Use Cases for Email QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Email QR codes are used across industries to simplify contact, support, and inquiry workflows:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Support Contact Codes</CardTitle>
                  <CardDescription>Retail and product businesses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A consumer electronics brand prints a support email QR code on the inside of every product box. Customers who encounter a setup issue or fault scan the code immediately — a support email opens pre-addressed to the customer service team, with "Product Support Request" already in the subject. The customer describes their issue and sends. The support team receives a structured, correctly addressed request with no need for the customer to navigate a website or sit on hold.
                  </p>
                  <Badge variant="secondary">Customer Support</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Inquiry Codes</CardTitle>
                  <CardDescription>Events and conference organizers</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    An events company places an email QR code on exhibition signage and event programs — pre-filled with the subject "Event Inquiry" and an opening line inviting the reader to describe their event requirements. Venue visitors who are impressed by a live event scan the code during or immediately after the experience, when their enthusiasm is highest. The inquiry arrives in the sales inbox while the impression is fresh — a significant advantage over a website contact form that requires the visitor to remember to look it up later.
                  </p>
                  <Badge variant="secondary">Events</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Support QR Codes</CardTitle>
                  <CardDescription>Manufacturing and retail</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A furniture manufacturer includes an email QR code on assembly instruction cards — pre-addressed to the support team with "Assembly Support" in the subject. Customers who encounter a missing part or unclear instruction scan the code from the instruction sheet and email a description of the problem immediately. The support team receives specific, actionable queries rather than generic "I have a problem" messages — improving first-response quality and reducing the back-and-forth needed to diagnose and resolve the issue.
                  </p>
                  <Badge variant="secondary">Product Support</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Business Inquiry QR Codes</CardTitle>
                  <CardDescription>Professional services and B2B</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A professional services firm includes an email QR code on every brochure distributed at industry events — pre-filled with "Business Inquiry" in the subject and a brief opening line. Decision-makers who pick up the brochure during a conference scan the code on the spot and send an inquiry before they have left the building. The firm's business development team receives a warm lead with full sender details from the recipient's email account — context and contact information arrived together, with no form submission required.
                  </p>
                  <Badge variant="secondary">B2B</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Design Best Practices for Email QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to ensure your email QR code is scanned reliably and generates the right messages:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Include Call-to-Action Text Like "Scan to Email Us"</h3>
                  <p className="text-muted-foreground text-sm">
                    Always place a short, direct instruction next to your email QR code — "Scan to Email Us", "Scan to Get in Touch", or "Scan to Send a Support Request". Users recognize QR codes but often do not scan without a clear prompt that tells them what will happen. A well-worded call to action increases scan rates meaningfully, particularly on printed materials where the audience may not be expecting to encounter a QR code.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast QR Codes</h3>
                  <p className="text-muted-foreground text-sm">
                    Print the QR code in dark modules on a white or very light background. Avoid placing the code on colored, textured, or glossy surfaces that reduce contrast. In the variable lighting conditions of trade show floors, retail environments, and outdoor advertising, high contrast is the most important factor in reliable scanning. A code that fails to scan in dim light or at an angle loses every potential contact that would have come from that scan.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test QR Codes Before Printing</h3>
                  <p className="text-muted-foreground text-sm">
                    Before committing to any print run — whether business cards, packaging, or signage — scan the email QR code on both an iPhone and an Android device. Confirm the email app opens, the correct address appears in the To field, and the subject and message body are pre-filled exactly as intended. A code that routes to the wrong address, or that opens with a blank subject when a pre-filled subject was expected, is a printing mistake that cannot be fixed after the cards or materials have been distributed.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Place QR Codes Where Users Can Easily Scan</h3>
                  <p className="text-muted-foreground text-sm">
                    Position the email QR code at a natural focal point — on the back of a business card, at the bottom of a brochure page, at eye level on event signage, or on the first page of an instruction manual. A code buried in the middle of a dense layout, placed too close to the edge of a page, or positioned at an awkward angle on a display surface generates fewer scans regardless of how well it is designed. Physical placement is one of the most controllable factors in QR code scan rate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Email QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These mistakes are the most frequent causes of email QR codes that fail to generate correct, deliverable messages:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Incorrect Email Address</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    An incorrect email address in a QR code means every email sent from it goes to the wrong inbox or bounces. The sender has no way of knowing their message was never delivered, and the business loses every inquiry without knowing it. Always copy and paste the email address from a verified, working source — never type it into the form manually. After generating the code, scan it and check the To field in the email that opens before approving any print materials.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">QR Code Printed Too Small</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    An email QR code that is too small to scan reliably from a natural viewing distance fails at the point of use. On a business card, allow at least 2 cm x 2 cm. On signage or packaging, scale proportionally for the expected viewing distance. A code that requires the user to hold their phone unusually close generates frustration and abandoned scan attempts — the opposite of the frictionless experience the QR code was intended to create.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Low Resolution QR Code</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Saving the QR code at low resolution and scaling it up for printing produces a blurry, pixelated code that scans unreliably or not at all. Always download the QR code in PNG format at the highest available resolution from the generator above. For large-format printing — posters, banners, or packaging — test a printed proof at the intended size for sharpness before finalizing the print run.
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
                    A QR code displayed without any accompanying instruction is ambiguous — users may recognize it as a QR code without knowing whether scanning it will open a website, a payment page, or an email. A short label — "Scan to email us" or "Scan to send a support request" — immediately communicates what the scan will do and what the user will be able to accomplish. This clarity is a significant factor in whether someone chooses to scan or simply moves on.
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
                <Link href="/tools/qr-code-for-sms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for SMS</span>
                </Link>{" "}
                — Generate QR codes that open a pre-filled SMS message when scanned
              </p>
            </div>
          </section>


            {/* Same Bucket Cross-linking */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold mb-4">More Utility QR Code Generators</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                <Link href="/tools/qr-code-for-wifi">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for WiFi</span>
                </Link>{" "}
                — Let guests connect to WiFi with a single scan
              </p>
              <p>
                <Link href="/tools/qr-code-for-payments">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Payments</span>
                </Link>{" "}
                — Accept digital payments with a scan-to-pay QR code
              </p>
              <p>
                <Link href="/tools/qr-code-for-vcard-contacts">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for vCard Contacts</span>
                </Link>{" "}
                — Share your contact details with a single scan
              </p>
              <p>
                <Link href="/tools/qr-code-for-sms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for SMS</span>
                </Link>{" "}
                — Send a pre-filled text message with a single scan
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
                { href: "/tools/qr-code-for-wifi", title: "QR Code for WiFi", desc: "Let guests connect to WiFi without typing passwords." },
                { href: "/tools/qr-code-for-payments", title: "QR Code for Payments", desc: "Accept payments via QR code links seamlessly." },
                { href: "/tools/qr-code-for-vcard-contacts", title: "QR Code for vCard Contacts", desc: "Share your full contact details digitally." },
                { href: "/tools/qr-code-for-sms", title: "QR Code for SMS", desc: "Pre-fill an SMS message for instant contact." },
                { href: "/tools/qr-code-for-contact-forms", title: "QR Code for Contact Forms", desc: "Direct customers to your contact form instantly." },
                { href: "/tools/qr-code-for-feedback-forms", title: "QR Code for Feedback Forms", desc: "Collect customer feedback via QR code." },
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


          {/* Final CTA */}
          <section className="border-t pt-12">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Create Your Email QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that lets users send emails instantly by scanning. Free to use, no account required, and ready to print or share in seconds.
              </p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">
                Create Email QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
