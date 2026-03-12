import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2,
  CreditCard,
  Smartphone,
  Shield,
  Store,
  UtensilsCrossed,
  Briefcase,
  Ticket,
  AlertCircle,
  ArrowRight,
  Zap,
  Wallet,
  Star,
  ShoppingBag,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for payments?",
    answer:
      "Paste your payment link or digital payment URL into the QR code generator above and click generate. The tool instantly creates a scannable QR code your customers can use to pay. Download the code in PNG format and print or share it wherever customers will see it — at a checkout counter, on an invoice, or in a digital message.",
  },
  {
    question: "Can customers pay by scanning QR codes?",
    answer:
      "Yes. Customers can scan a payment QR code using the built-in camera app on any modern iPhone or Android smartphone. Scanning opens the payment link directly in their browser or payment app, where they complete the transaction using their preferred method. No additional app is required on most devices, though some payment apps such as UPI apps may prompt the user to open them automatically.",
  },
  {
    question: "Are payment QR codes secure?",
    answer:
      "A payment QR code is as secure as the payment link it contains. The QR code simply encodes the URL — security is determined by the payment processor or platform you use (such as Stripe, PayPal, Razorpay, or your bank's UPI gateway). Always use HTTPS payment links and trusted payment providers. The QR code itself does not store financial data, card numbers, or account credentials.",
  },
  {
    question: "Do users need apps to scan payment QR codes?",
    answer:
      "For most payment QR codes that link to a web-based payment page, no additional app is required. The built-in camera on any modern iPhone or Android opens the payment link automatically. For UPI QR codes, users typically need a UPI-enabled payment app (such as Google Pay, PhonePe, or Paytm) installed on their device, which is standard on smartphones in UPI-supported regions.",
  },
  {
    question: "Are payment QR codes free to generate?",
    answer:
      "Yes, completely free. Our payment QR code generator requires no account, no subscription, and no payment. You can create and download as many payment QR codes as you need at no cost, with no watermarks on downloaded codes. The only cost involved is any processing fee charged by your payment provider when a transaction is completed.",
  },
];

export default function QRCodeForPayments() {
  useSEO({
    title: "Payment QR Code Generator – Create Scan-to-Pay QR Codes Instantly | Pixocraft",
    description:
      "Generate payment QR codes that allow customers to pay instantly by scanning. Free payment QR code generator for businesses, shops, restaurants, and freelancers. No sign-up required.",
    keywords:
      "payment qr code generator, qr code for payments, upi qr code generator, scan to pay qr code, create payment qr code",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-payments",
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
              Payment QR Code Generator – Create Scan-to-Pay QR Codes Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate QR codes that allow customers to pay instantly using digital payment apps. Perfect for businesses, shops, restaurants, and freelancers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Accept payments instantly</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for businesses and freelancers</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Easy to print and share</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works with mobile payment apps</span>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto" onClick={scrollToTool}>
              Create Payment QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Payment QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Paste your payment link or digital payment URL into the tool below to generate a QR code customers can scan to pay instantly. Works with any payment platform — PayPal, Stripe, Razorpay, UPI payment links, and more.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use QR Codes for Payments */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Payments?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Cashless transactions are no longer limited to card machines or POS terminals. A scan-to-pay QR code gives any business or individual the ability to accept digital payments instantly — no hardware, no card reader, and no minimum transaction volume required. Customers point their phone camera at the code, the payment page opens automatically, and the transaction is completed in seconds. The entire checkout process is faster, simpler, and more convenient for both the seller and the buyer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Fast Digital Payments</h3>
                </div>
                <p className="text-muted-foreground">
                  A payment QR code removes every friction point in the payment process. Customers do not need to handle cash, locate a card reader, wait for a terminal to process, or type in a payment URL. A single scan opens the payment page instantly. For high-volume environments like market stalls, event counters, or food trucks, the speed difference between QR code payments and traditional methods adds up to significantly faster service and shorter queues.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">No Need for Card Machines</h3>
                </div>
                <p className="text-muted-foreground">
                  Card terminals require hardware purchases or rentals, merchant accounts, and ongoing processing infrastructure. A payment QR code requires none of these — just a payment link from your preferred payment provider and a printed or displayed QR code. For small businesses, pop-up sellers, and freelancers, this dramatically lowers the barrier to accepting digital payments and eliminates the ongoing cost of terminal maintenance and rental fees.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Wallet className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Simplified Customer Checkout</h3>
                </div>
                <p className="text-muted-foreground">
                  Customers using a scan-to-pay QR code complete their payment using whatever digital method they already prefer — their bank app, UPI app, digital wallet, or online payment platform. There is no need to hand over a card, wait for chip processing, or enter a PIN on a shared terminal. The payment experience is contactless, personal, and completed on the customer's own device — exactly how modern consumers prefer to pay.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Reduce Cash Handling</h3>
                </div>
                <p className="text-muted-foreground">
                  Accepting cash involves counting, storing, depositing, and accounting for physical notes — a process that introduces human error, theft risk, and significant administrative overhead. A payment QR code eliminates cash handling entirely. Every payment is digital, tracked automatically, and deposited directly to your payment account. For small businesses managing their finances without dedicated accounting staff, this simplification has real daily value.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Payment QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A payment QR code simplifies the payment experience for sellers and buyers alike:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Instant Payments</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Customers complete payment within seconds of scanning. No waiting for card authorization, no fumbling for cash, and no queuing for a shared terminal. A payment QR code makes the checkout moment as fast as the purchase decision.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Easy Checkout Experience</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Customers pay using apps they already have installed — no new accounts, no card readers, no shared keypads. The payment happens on their own device, in their preferred app, with their preferred payment method. Fewer steps means fewer abandoned transactions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Reduce Cash Handling</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Every QR payment is digital, automatically recorded, and deposited without manual reconciliation. Businesses that move away from cash reduce end-of-day counting time, cash discrepancies, and the security risks associated with keeping cash on premises.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Secure Transactions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Payment QR codes link to secure, HTTPS payment pages managed by trusted payment providers. Customers never share card details on a shared device — transactions are authenticated on the customer's own smartphone, with the security of their chosen payment app and bank.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Store className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Perfect for Small Businesses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Small businesses and sole traders can accept digital payments without investing in terminal hardware or opening expensive merchant accounts. A payment link from any major payment provider plus a printed QR code is all that is needed to start accepting scan-to-pay transactions the same day.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Professional Appearance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Displaying a clean, printed payment QR code at a checkout counter, on an invoice, or at an event booth signals a modern, organized operation — the kind of detail that builds customer confidence and positions the business as digitally capable and customer-focused.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Payment QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Payment QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Payment QR codes are useful anywhere a business or individual needs to accept digital payments quickly and without specialized hardware:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Retail Shops</h3>
                </div>
                <p className="text-muted-foreground">
                  Retail stores display a payment QR code at the checkout counter, allowing customers to scan and pay without handing over a card or counting cash. For small retailers that do not have a POS system, a printed payment QR code is a cost-effective way to offer digital payment from day one — eliminating the terminal rental and merchant account setup that would otherwise delay accepting cashless payments.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <UtensilsCrossed className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Restaurants and Cafes</h3>
                </div>
                <p className="text-muted-foreground">
                  Restaurants use payment QR codes on table stands, with the bill, or at the counter to let customers pay digitally without waiting for a card terminal to be brought to the table. A scan-to-pay setup at the counter speeds up peak-hour service significantly — customers complete payment on their own phone while the next order is being prepared, eliminating the bottleneck of a single terminal serving a busy counter queue.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Freelancer Invoices</h3>
                </div>
                <p className="text-muted-foreground">
                  Freelancers embed a payment QR code on invoices — either digital (PDF) or printed — allowing clients to scan and pay instantly without logging in to a banking portal or searching for the right payment details. A QR code on the invoice removes every friction point between receiving the invoice and completing the payment, which directly improves the speed of settlement for freelancers managing their own cash flow.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <ShoppingBag className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Online Store Payments</h3>
                </div>
                <p className="text-muted-foreground">
                  Online stores and social commerce sellers — operating through Instagram, WhatsApp, or messaging-based channels — can share a payment QR code with customers to complete transactions without a full e-commerce checkout flow. For businesses selling via social media or chat, a payment QR code shared in the conversation closes the sale without requiring the customer to navigate to an external website or create an account.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Ticket className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Event Ticket Payments</h3>
                </div>
                <p className="text-muted-foreground">
                  Event organizers display payment QR codes at entry points or ticket booths, allowing attendees to pay digitally without cash or a card machine. At small events, community gatherings, or workshops where organizers do not have point-of-sale infrastructure, a payment QR code printed on a sign or displayed on a tablet is all that is needed to collect digital payments from every attendee who arrives at the door.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <CreditCard className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Market Stalls and Pop-Ups</h3>
                </div>
                <p className="text-muted-foreground">
                  Market vendors and pop-up sellers operate in environments where carrying and counting cash is the norm — but an increasing share of customers no longer carry cash at all. A laminated payment QR code stand on a market stall table lets any customer pay digitally in seconds, without the seller needing to invest in any hardware or commit to a monthly terminal rental while their market trading schedule remains variable.
                </p>
              </div>
            </div>
          </section>

          {/* How Payment QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Payment QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Creating and deploying a scan-to-pay QR code takes four simple steps:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Create a Payment Link or Digital Payment Page</h3>
                  <p className="text-muted-foreground">
                    Generate a payment link from your preferred payment platform — PayPal, Stripe, Razorpay, Instamojo, a UPI payment link from your bank, or any other provider that gives you a shareable payment URL. This link should go directly to your payment page where customers can complete the transaction. Make sure the link is active, uses HTTPS, and opens correctly on mobile devices before creating your QR code.
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
                    Paste your payment link into the payment QR code generator above. The tool instantly encodes your link into a scannable QR code. Download the code in PNG format for printing or digital sharing. No account is required, and the generated QR code has no watermarks or usage restrictions — it is ready to use immediately.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Share the QR Code with Customers</h3>
                  <p className="text-muted-foreground">
                    Print the QR code and display it at your checkout counter, on your invoice, at your market stall, or on your event signage. Alternatively, share it digitally in a message, email, or social media post. Place it wherever your customers will naturally see it at the moment of payment — the closer the code is to the point of decision, the more likely customers are to scan and complete the transaction immediately.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Customers Scan and Complete the Payment</h3>
                  <p className="text-muted-foreground">
                    Customers point their phone camera at the QR code. The payment link opens automatically in their browser or payment app. They complete the transaction using their preferred payment method — UPI, card, digital wallet, or net banking — and receive confirmation instantly. You receive notification of the payment from your payment provider, and the sale is complete.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Business Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Business Use Cases for Payment QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Payment QR codes improve payment efficiency across a wide range of business types and transaction scenarios:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Retail Stores Accepting Digital Payments</CardTitle>
                  <CardDescription>Retail and point of sale</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A small boutique or grocery store displays a payment QR code at the till alongside a "Scan to Pay" label. Customers with a digital wallet or UPI app complete payment in under ten seconds — faster than any card terminal process. The store eliminates end-of-day cash counting, reduces the risk of counterfeit notes, and provides a modern checkout experience that reduces customer hesitation at the payment stage.
                  </p>
                  <Badge variant="secondary">Retail</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Restaurants Enabling Table Payments</CardTitle>
                  <CardDescription>Hospitality and food service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A restaurant places a payment QR code on a table stand alongside the menu QR code. At the end of the meal, the customer scans the payment code, enters the amount displayed on the bill, and completes payment without waiting for a server to bring a card terminal. During peak service, this removes a bottleneck from the payment step — tables turn faster, and staff spend less time processing payments and more time serving new customers.
                  </p>
                  <Badge variant="secondary">Food Service</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Freelancers Receiving Invoice Payments</CardTitle>
                  <CardDescription>Freelance and professional services</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A freelance designer embeds a payment QR code on every PDF invoice, linking to their Stripe or PayPal payment page. Clients scan the code on their phone or desktop camera and complete the payment in under a minute — without logging into their banking portal or copying account details into a payment form. The reduction in payment friction has a measurable effect on settlement time: invoices with QR codes get paid faster than invoices with bank transfer details alone.
                  </p>
                  <Badge variant="secondary">Freelance</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Organizers Selling Tickets</CardTitle>
                  <CardDescription>Events and entertainment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A community event organizer places a payment QR code on entry signs and promotional flyers, linking to a ticket payment page. Attendees pay at the door by scanning rather than queuing for a cash box or waiting for a card terminal. For organizers who run small events without dedicated staff or POS equipment, a payment QR code sign is a practical and immediate solution that requires no hardware investment and works from the first event.
                  </p>
                  <Badge variant="secondary">Events</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Design Best Practices for Payment QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to ensure your payment QR code is scanned reliably and drives completed transactions:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Place QR Codes Near Checkout Counters</h3>
                  <p className="text-muted-foreground text-sm">
                    Position your payment QR code at the natural point of transaction — on the counter at eye level, on the table stand next to the bill, or on the wall directly above the checkout area. A QR code placed where customers are already focused on completing the payment is far more likely to be scanned than one placed in a general location where its payment purpose is not immediately apparent. Physical placement is one of the most important factors in QR code payment adoption.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Add Call-to-Action Text Like "Scan to Pay"</h3>
                  <p className="text-muted-foreground text-sm">
                    Always accompany your payment QR code with a clear, visible instruction — "Scan to Pay", "Pay Here", or "Scan with your phone camera to pay". Many customers recognize QR codes but will not scan them without a clear prompt that tells them exactly what will happen when they do. A short, direct call to action removes the hesitation and makes the expected behavior immediately clear to every customer, regardless of their prior experience with QR code payments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast QR Code Design</h3>
                  <p className="text-muted-foreground text-sm">
                    Maintain strong contrast between the dark modules of the QR code and its background — typically dark modules on a white background. Avoid printing on colored backgrounds, patterned surfaces, or glossy materials that create glare. In retail and hospitality environments with variable lighting, high contrast is essential for reliable scanning across all distances and angles. Test the code in the actual lighting conditions of your payment location before committing to a large print run.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test QR Codes Before Sharing</h3>
                  <p className="text-muted-foreground text-sm">
                    Always scan the payment QR code on both an iPhone and an Android device before printing or sharing it widely. Verify that the link opens correctly, that the payment page loads on mobile, and that the payment can be completed end to end. A broken payment QR code creates a negative impression and a lost transaction — testing takes under five minutes and prevents the much more costly experience of distributing a non-functional code.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Payment QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These are the most frequent causes of payment QR codes that fail to convert:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Broken Payment Links</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A payment QR code that links to an expired, deleted, or incorrectly copied URL is the single most damaging mistake. Customers who scan and find a broken link do not complete the payment, lose confidence in the business, and are unlikely to try again. Always verify the payment link is active before generating the QR code, and retest the code after any changes to your payment platform or account settings. Set a reminder to verify the link periodically, particularly for printed QR codes that will be in use for an extended period.
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
                    A payment QR code that is too small to scan reliably from a natural viewing distance is effectively non-functional. On a counter card, the code should be at least 3–5 cm square. On a wall sign or poster, scale proportionally for the expected viewing distance. A customer who cannot scan the code after one or two attempts will give up and pay with cash if available — or not complete the purchase at all if cash is not an option. Always print at sufficient size and test scan from the actual distance customers will be at.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Unclear Payment Instructions</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A payment QR code displayed without any accompanying text or context leaves customers uncertain about what it does. Always add a clear call to action — "Scan to Pay" or "Pay Here" — directly on or next to the QR code display. For businesses where customers may need to enter a specific amount (rather than the QR linking directly to a fixed-price payment), include a brief instruction: "Scan to Pay — Enter the amount shown on your receipt." Ambiguity in the payment process leads to abandoned transactions.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Slow Payment Pages</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A payment link that takes more than three seconds to load on a mobile connection will cause many customers to close the browser and abandon the payment. Customers expect speed — if the payment page is slow, unresponsive, or not mobile-optimized, the scan-to-pay experience fails at the critical moment of conversion. Use payment platforms with fast, mobile-optimized checkout pages. Test the payment page load speed on a mobile data connection — not just on the fast Wi-Fi connection typically available in-store.
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
                <Link href="/tools/qr-code-for-contact-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for vCard Contacts</span>
                </Link>{" "}
                — Share your contact details digitally with a single scan
              </p>
              <p>
                <Link href="/tools/qr-code-for-feedback-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Email</span>
                </Link>{" "}
                — Create QR codes that open a pre-filled email instantly
              </p>
              <p>
                <Link href="/tools/qr-code-for-google-reviews">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for SMS</span>
                </Link>{" "}
                — Generate QR codes that open a pre-filled SMS message when scanned
              </p>
            </div>
          </section>

          {/* Final CTA */}
          <section className="border-t pt-12">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Create Your Payment QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that allows customers to pay instantly by scanning. Free to use, no account required, and ready to print in seconds.
              </p>
              <Button size="lg" onClick={scrollToTool}>
                Create Payment QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
