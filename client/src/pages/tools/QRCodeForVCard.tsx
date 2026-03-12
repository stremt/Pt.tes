import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2,
  UserRound,
  Smartphone,
  Globe,
  Mail,
  Phone,
  Building2,
  Briefcase,
  AlertCircle,
  ArrowRight,
  Zap,
  Star,
  BadgeCheck,
  Users,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for contact details?",
    answer:
      "Select the vCard or Contact type in the QR code generator above, then fill in your name, phone number, email address, company, and website. The tool instantly generates a QR code that encodes all of your contact information. Download it in PNG format and add it to your business card, email signature, or any printed or digital material where you want people to save your details.",
  },
  {
    question: "Can people save contacts using QR codes?",
    answer:
      "Yes. When someone scans a vCard QR code with their smartphone camera, the phone displays a prompt to save the contact directly to their address book — with all fields (name, phone, email, company, website) pre-filled. The contact is saved in one tap, with no manual typing required. This works natively on iPhone (iOS 11+) and Android (Android 10+) without any additional app.",
  },
  {
    question: "Are vCard QR codes free?",
    answer:
      "Yes, completely free. Our vCard QR code generator requires no account, no subscription, and no payment. You can create and download as many contact QR codes as you need at no cost, with no watermarks on the downloaded code. The QR code is yours to use immediately, for any purpose, without restriction.",
  },
  {
    question: "Do users need apps to scan contact QR codes?",
    answer:
      "No, on most modern devices. iPhones running iOS 11 or later and Android phones running Android 10 or later can scan vCard QR codes using the built-in camera app. The phone recognizes the contact data automatically and prompts the user to save it — no additional app download required. On older devices, a free QR code scanner app can be used to achieve the same result.",
  },
  {
    question: "Can QR codes replace business cards?",
    answer:
      "A vCard QR code can complement or partially replace a traditional business card by removing the need for the recipient to manually type your details. Many professionals now print a large, prominent QR code on one side of the business card so recipients can scan and save all details instantly — making the card itself a backup reference rather than the primary means of contact exchange. For fully digital networking (conferences, virtual events, email signatures), a QR code can replace the physical card entirely.",
  },
];

export default function QRCodeForVCard() {
  useSEO({
    title: "vCard QR Code Generator – Create QR Codes for Contact Details | Pixocraft",
    description:
      "Generate vCard QR codes that let people save your contact details instantly by scanning. Free contact QR code generator for business cards, networking events, and email signatures. No sign-up required.",
    keywords:
      "vcard qr code generator, qr code for contact details, contact qr code generator, qr code for business card contact, create qr code for contact",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-vcard-contacts",
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
              vCard QR Code Generator – Create QR Codes for Contact Details
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate QR codes that allow people to save your contact information instantly. Perfect for business cards, networking events, and professional profiles.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Share contact details instantly</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for business cards</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Save contacts with one scan</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto" onClick={scrollToTool}>
              Create Contact QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Contact QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Select the <strong>vCard</strong> type in the tool below, then enter your name, phone number, email address, company, and website. The QR code is generated instantly — download it and add it to your business card, email signature, or anywhere you want people to save your contact in one scan.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use Contact QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Contact Sharing?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Exchanging contact information has traditionally meant handing over a business card and hoping the recipient types your details correctly into their phone before the card is lost. A vCard QR code eliminates every step of that process. The person you meet points their camera at the code, a contact card appears on their screen with all your details pre-filled, and they save it in a single tap. No typing, no transcription errors, and no dependence on whether they still have the physical card weeks later.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Instant Contact Sharing</h3>
                </div>
                <p className="text-muted-foreground">
                  A contact QR code compresses your complete professional profile — name, phone, email, company, website, and address — into a single scannable image. When someone scans it, their phone displays a fully populated contact card ready to save. What would otherwise take two minutes of manual entry is completed in under five seconds. For professionals who meet many people at events, this speed difference adds up to a meaningfully more efficient networking experience.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <UserRound className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">No Manual Typing</h3>
                </div>
                <p className="text-muted-foreground">
                  Manual contact entry is one of the most error-prone tasks on a smartphone. A mistyped phone number or email address means your contact is effectively unreachable — with no way to identify the error until a follow-up attempt fails. A vCard QR code removes manual entry entirely. Every field is encoded precisely in the QR code and transferred directly to the contact form — exactly as you entered it when generating the code, with no room for human transcription errors.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Perfect for Networking</h3>
                </div>
                <p className="text-muted-foreground">
                  Conferences, trade shows, and professional meetups involve meeting dozens of people in a short time. A contact QR code makes each exchange faster and more reliable — two phones out, one scan, contact saved. There is no need to wait for the other person to type or for you to spell out your email address letter by letter in a noisy venue. For high-volume networking environments, the quality and speed of each contact exchange is significantly improved.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Digital Business Cards</h3>
                </div>
                <p className="text-muted-foreground">
                  A vCard QR code printed on a business card, badge, or profile page functions as a digital business card — the physical object becomes the carrier for a digital contact exchange. Unlike a traditional business card, the information encoded in the QR code goes directly into the recipient's contacts app. The card may be lost or discarded, but the contact saved from scanning it persists in the recipient's phone indefinitely.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of vCard QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A contact QR code improves every aspect of professional contact sharing:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Instant Contact Saving</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A single scan populates all contact fields on the recipient's phone and saves the entry in one tap. What previously required two minutes of careful manual entry now takes under five seconds — with zero risk of transcription errors in any of the saved fields.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Modern Networking Solution</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A vCard QR code signals a modern, digitally fluent professional — the kind of detail that makes a subtle but lasting impression at a conference or meeting. It positions the exchange as efficient and contemporary rather than relying entirely on a paper card that may be lost before the follow-up.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Perfect for Business Cards</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Adding a contact QR code to a business card makes the card functionally superior to a standard card — recipients get both a physical reference and a one-tap option to save your details digitally. The card works as a traditional card for those who prefer it, and as a digital exchange tool for those who scan.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Simplified Contact Sharing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Email signatures, websites, and LinkedIn profiles can include a contact QR code image that visitors scan to save your details immediately — without copy-pasting an email address or navigating to a contact form. Any digital surface becomes a point of instant contact exchange.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Globe className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Professional Digital Identity</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A vCard QR code consolidates your complete professional identity — name, role, company, phone, email, and web presence — into one scannable point. It ensures that everyone who scans receives exactly the same, complete, up-to-date contact information, regardless of which version of a card they received.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">No App Required</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    iPhones (iOS 11+) and Android phones (Android 10+) scan vCard QR codes natively with the built-in camera. No download, no account, and no additional step is required from the recipient. The contact appears on screen ready to save — the process is as simple as taking a photo.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Contact QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Contact QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A vCard QR code belongs anywhere you want people to save your contact details quickly and accurately:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <BadgeCheck className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Business Cards</h3>
                </div>
                <p className="text-muted-foreground">
                  The most common application for a contact QR code is on a business card. Printed on the back of the card alongside a "Scan to save contact" prompt, the QR code gives recipients the option to save all details instantly rather than manually entering them later. Many professionals now dedicate the reverse side of the card entirely to the QR code — making the digital exchange the primary function and the printed details the secondary reference.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Email Signatures</h3>
                </div>
                <p className="text-muted-foreground">
                  A small contact QR code image in an email signature lets every email recipient save your contact in one scan — without leaving the email, navigating to a contact form, or manually copying your details. For professionals who send high volumes of email, embedding a QR code in the signature turns every email into a contact exchange opportunity. Recipients on mobile who tap the image are prompted to save the contact immediately.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Conference Badges</h3>
                </div>
                <p className="text-muted-foreground">
                  Event organizers and conference attendees increasingly use vCard QR codes on lanyards and name badges. Instead of collecting dozens of paper business cards during a conference — most of which will be lost or never entered into a contacts app — attendees can scan each other's badges and save contacts immediately during the conversation. The contact is in the phone before they have moved on to the next person.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Portfolio Websites</h3>
                </div>
                <p className="text-muted-foreground">
                  Freelancers and creative professionals embed a contact QR code on their portfolio website or digital resume — allowing potential clients or employers who visit the site on a mobile device to save their contact details immediately, without needing to copy an email address or phone number. A prominent "Scan to save my contact" QR code on the contact page removes every friction point between a visitor's interest and a saved contact.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Event Networking Cards</h3>
                </div>
                <p className="text-muted-foreground">
                  Networking events, startup meetups, and professional mixers are environments where contact exchange happens at high speed across many conversations. A small card with just a name and a large contact QR code — printed specifically for the event — makes each exchange fast and reliable. The card can be handed out or displayed on a table, and every person who scans it has the contact saved accurately without any effort from either party.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Printed Marketing Materials</h3>
                </div>
                <p className="text-muted-foreground">
                  Brochures, leaflets, and flyers distributed at events or placed in waiting areas can include a contact QR code that converts a reader's interest directly into a saved contact. Rather than asking the reader to visit a website or call a number they may not remember, a QR code on the material lets them save all contact details immediately — while the leaflet and the interest are still in hand.
                </p>
              </div>
            </div>
          </section>

          {/* How Contact QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Contact QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Creating and deploying a vCard QR code takes four straightforward steps:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Enter Your Contact Details</h3>
                  <p className="text-muted-foreground">
                    Select the vCard or Contact type in the generator above and fill in your details — name, phone number, email address, company, job title, website, and any other fields you want to share. Enter the information exactly as you want it to appear in the recipient's contacts app. Double-check every field before generating the code, particularly phone numbers and email addresses, as errors here mean the saved contact will be incorrect for every person who scans.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">2</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Generate a QR Code Using This Tool</h3>
                  <p className="text-muted-foreground">
                    The vCard QR code generator encodes all of your contact information into a single QR code instantly. Download the code in PNG format — at high resolution for printing, or at standard resolution for digital use. No account is required, and the generated code has no watermarks or usage restrictions. It is ready to embed or print immediately.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add the QR Code to Your Business Card or Profile</h3>
                  <p className="text-muted-foreground">
                    Place the QR code on your business card, email signature, conference badge, portfolio website, or any other surface where you want people to save your contact. Add a short call-to-action label — "Scan to save contact" — directly next to the code so recipients know what to do. Before printing, scan the code yourself on both an iPhone and an Android device to confirm all fields are correct and the save prompt appears as expected.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Users Scan the Code and Save Your Contact Instantly</h3>
                  <p className="text-muted-foreground">
                    The recipient points their phone camera at the QR code. A notification or banner appears with your name and a prompt to save the contact. Tapping the prompt opens their contacts app with all your details pre-filled — name, phone, email, company, and website already populated. They confirm the save and your contact is stored permanently in their phone, correctly and completely, in under five seconds from the moment of scanning.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Real World Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Real-World Use Cases for Contact QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Contact QR codes are used by professionals across every industry to make networking faster, more reliable, and more modern:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Digital Business Cards</CardTitle>
                  <CardDescription>Modern professional networking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A consultant redesigns their business card with a full-back vCard QR code and "Scan to save my contact" text on one side, with their name and title on the other. Every card handed out at a client meeting results in an immediately saved, accurately stored contact. Follow-up emails sent the next day reach recipients whose inboxes recognize the sender from the saved contact — the email name matches the card name, the relationship is established from the first exchange.
                  </p>
                  <Badge variant="secondary">Professional Services</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Startup Founder Networking</CardTitle>
                  <CardDescription>Investor and partner meetings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A startup founder attending an investor conference uses a vCard QR code on their badge and pitch deck materials. Investors who express interest scan the code immediately during the conversation — the founder's contact, including their LinkedIn and company website, is saved before they have finished speaking. No business card is exchanged, no contact is lost, and the follow-up happens from a position where the investor has the founder's details already in their phone.
                  </p>
                  <Badge variant="secondary">Startups</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conference Attendee Badges</CardTitle>
                  <CardDescription>Events and trade shows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A technology conference includes a vCard QR code on every attendee badge, generated from registration data. Attendees can scan each other's badges throughout the day and save contacts immediately — without exchanging cards or typing names. At the end of a two-day conference, an attendee who met forty people has forty correctly saved contacts, all scanned in real time rather than entered manually from a stack of cards the following week.
                  </p>
                  <Badge variant="secondary">Events</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Freelancer Portfolio Cards</CardTitle>
                  <CardDescription>Creative and independent professionals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A freelance photographer includes a contact QR code on the back of every printed portfolio card handed out at exhibitions or client meetings. Potential clients scan the code and save the photographer's full contact details — name, phone, email, and portfolio website — in one action. The photographer's website is visited from the saved contact later that day, rather than being forgotten along with a card that was put in a pocket and never retrieved.
                  </p>
                  <Badge variant="secondary">Freelance</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Design Best Practices for Contact QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to ensure your vCard QR code works reliably and makes the right impression:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Place QR Codes Clearly on Business Cards</h3>
                  <p className="text-muted-foreground text-sm">
                    Give the contact QR code sufficient space and prominence on your card — at least 2.5 cm x 2.5 cm on a standard business card. Placing it on the back of the card with nothing else competing for attention ensures it is easy to find, easy to scan, and clearly understood as the primary digital exchange point. A code crowded into a corner alongside several other design elements is harder to scan and easier to overlook.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast Colors</h3>
                  <p className="text-muted-foreground text-sm">
                    Maintain strong contrast between the QR code modules and the background — dark modules on a white or light background is the most reliable combination across all lighting conditions and scanning distances. Avoid printing the code on colored or textured card stock that reduces contrast. If branding requires a colored card, place the QR code on a white inset or white panel to preserve scanning reliability in all environments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test QR Codes Before Printing</h3>
                  <p className="text-muted-foreground text-sm">
                    Always scan the contact QR code on both an iPhone and an Android device — confirming that the contact save prompt appears, that all fields are pre-filled correctly, and that the saved contact entry contains accurate details across every field. This test takes under three minutes and prevents the far more costly experience of distributing hundreds of cards that save incorrect or incomplete contact information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Include "Scan to Save Contact" Text</h3>
                  <p className="text-muted-foreground text-sm">
                    Not everyone immediately recognizes what a QR code will do when scanned. A short label — "Scan to save my contact" or "Scan to add to contacts" — placed directly below or next to the QR code removes any hesitation and makes the expected behavior immediately clear. This single line of text can meaningfully increase the number of people who actually scan the code rather than simply noting its existence and moving on.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Contact QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These are the most frequent causes of vCard QR codes that fail to deliver accurate contact information:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Missing Contact Details</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Generating a QR code with incomplete contact information — missing a phone number, omitting the email address, or leaving the company field blank — means every person who scans the code saves an incomplete contact. They cannot follow up by phone if there is no number, and cannot email if the address is absent. Fill in every relevant field before generating the code. The more complete the contact, the more useful it is to everyone who saves it.
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
                    A contact QR code printed at insufficient size — particularly on a small business card where space is tight — may scan unreliably or not at all. On a standard business card, the code needs at least 2.5 cm x 2.5 cm of clear print area, with no overlapping design elements. If the card format forces the code smaller than this, dedicate the full back of the card to the QR code and allow it the space it needs to be scanned reliably from a normal handheld distance.
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
                    A vCard QR code saved at low resolution and scaled up for printing will appear blurry or pixelated — leading to unreliable scanning or scan failure. Always download the QR code at the highest available resolution from the generator above (PNG format). If you are printing on materials larger than a business card — posters, banners, or large-format signs — test the sharpness of a printed proof at the intended size before committing to a full print run.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Incorrect Phone Numbers or Email Addresses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A single digit error in a phone number or a typo in an email address means every saved contact is effectively broken. The person cannot call or email you, and they have no way of knowing the contact they saved contains an error. Always copy and paste phone numbers and email addresses from a verified source rather than typing them into the form manually. After generating the QR code, scan it and tap through to verify the saved contact shows correct, reachable information across every field.
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
                <Link href="/tools/qr-code-for-feedback-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Email</span>
                </Link>{" "}
                — Create QR codes that open a pre-filled email instantly
              </p>
              <p>
                <Link href="/tools/qr-code-for-surveys">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for SMS</span>
                </Link>{" "}
                — Generate QR codes that open a pre-filled SMS message when scanned
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="border-t pt-12">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Create Your Contact QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that allows people to save your contact details instantly by scanning. Free to use, no account required, and ready to print in seconds.
              </p>
              <Button size="lg" onClick={scrollToTool}>
                Create Contact QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
