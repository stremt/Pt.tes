import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2,
  QrCode,
  Smartphone,
  TrendingUp,
  ClipboardList,
  MessageSquare,
  Store,
  Package,
  Building2,
  GraduationCap,
  AlertCircle,
  ArrowRight,
  BarChart3,
  Users,
  Zap,
  MousePointerClick,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for surveys?",
    answer: "Build your survey using Google Forms, Typeform, SurveyMonkey, or any survey platform, then copy the shareable link. Paste that link into the QR code generator above, customize the design if needed, and download the QR code at high resolution. Place it on posters, flyers, receipts, event materials, or anywhere your target respondents will see it alongside a prompt like 'Scan to take our survey.'"
  },
  {
    question: "Can QR codes increase survey response rates?",
    answer: "Yes, significantly. The biggest barrier to survey participation is friction — finding the survey link, typing in a URL, or remembering to complete it later. A survey QR code eliminates every step except the survey itself. Respondents scan once and are taken directly to the form, at the moment and location where participation is most natural. Businesses and researchers consistently report higher response rates from QR-delivered surveys than from email or verbal survey invitations."
  },
  {
    question: "Are survey QR codes free to create?",
    answer: "Yes, completely free. Our survey QR code generator requires no account, no subscription, and no payment. You can create and download as many survey QR codes as you need at no cost, with no watermarks on the downloaded codes."
  },
  {
    question: "Do users need apps to scan QR codes?",
    answer: "No. All modern iPhones and Android smartphones can scan QR codes natively using the built-in camera app. Respondents simply point their phone camera at the QR code and are taken directly to your survey — no additional download, app installation, or account setup required."
  },
  {
    question: "Can QR codes link to Google Forms surveys?",
    answer: "Yes. QR codes can link to any URL, including Google Forms. Open your Google Form, click 'Send', select the link icon, and copy the shareable URL. Paste it into the generator above and your QR code will take anyone who scans it directly to your Google Form survey, ready to complete on their smartphone."
  },
  {
    question: "How many questions should a QR code survey have?",
    answer: "For QR code surveys displayed in physical locations — shops, restaurants, events, or on packaging — keep the survey to 5–8 questions maximum. Respondents scanning a QR code in a public setting have limited time and patience. For research studies or academic surveys where respondents are actively recruited and motivated to participate, longer surveys of 10–20 questions are acceptable, but always ensure the form is fully optimized for mobile completion."
  },
  {
    question: "Can I track how many people scan my survey QR code?",
    answer: "Yes. Add UTM parameters to your survey URL before generating the QR code — for example, ?utm_source=poster&utm_medium=qr&utm_campaign=q4-survey. This allows you to see in Google Analytics exactly how many visits originated from each QR code placement. You can compare response rates across different locations, materials, and time periods to identify which placements perform best."
  },
  {
    question: "What survey platforms work with QR codes?",
    answer: "Any survey platform that generates a shareable URL works with a QR code — including Google Forms, Typeform, SurveyMonkey, Microsoft Forms, Tally, JotForm, and custom survey pages on your own website. Simply copy the shareable link from any platform and paste it into the generator above."
  }
];

export default function QRCodeForSurveys() {
  useSEO({
    title: "QR Code for Surveys – Free Survey QR Code Generator | Pixocraft",
    description: "Generate QR codes for surveys and research forms. Collect survey responses instantly from posters, flyers, events, and packaging. Free survey QR code generator, no sign-up required.",
    keywords: "qr code for surveys, survey qr code generator, qr code for survey form, create qr code for survey, qr code market research survey",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-surveys",
    ogImage: OG_IMAGES.qrMaker,
  });

  const scrollToTool = () => {
    document.getElementById("qr-tool-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for Surveys – Free Survey QR Code Generator | Pixocraft","description":"Create a QR code for your survey. Generate scannable survey QR codes to drive more responses from customers, event attendees, and users.","url":"https://tools.pixocraft.in/tools/qr-code-for-surveys","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for a Survey","description":"Follow these steps to generate a QR code that links directly to your online survey.","step":[{"@type":"HowToStep","name":"Copy Your Survey URL","text":"Copy the direct link to your survey from Google Forms, Typeform, SurveyMonkey, Microsoft Forms, or another platform."},{"@type":"HowToStep","name":"Paste the URL into the QR Generator","text":"Open the Pixocraft QR Code Generator and paste the survey URL into the input field."},{"@type":"HowToStep","name":"Customize the QR Code","text":"Adjust the QR code colors to match your event or brand, and add a logo if desired."},{"@type":"HowToStep","name":"Distribute the QR Code","text":"Download the QR code and share it via print materials, event signage, product packaging, or email campaigns."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for Surveys","item":"https://tools.pixocraft.in/tools/qr-code-for-surveys"}]})}
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
            <span className="text-foreground">QR Code for Surveys</span>
          </nav>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for Surveys – Collect Responses with QR Code Surveys
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate QR codes that link directly to survey forms. Perfect for collecting customer feedback, market research data, and event responses with higher participation rates.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Increase survey response rates</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Perfect for research and feedback</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Easy to add to posters and flyers</span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                <span className="text-muted-foreground">Works on all smartphones</span>
              </div>
            </div>

            <Button size="lg" className="w-full md:w-auto" onClick={scrollToTool}>
              Create Survey QR Code
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* QR Tool Section */}
          <section id="qr-tool-section">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Generate Your Survey QR Code</h2>
              <p className="text-lg text-muted-foreground">
                Paste the link to your survey form or questionnaire page to generate a QR code people can scan to participate instantly.
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            </div>
          </section>

          {/* Why Use QR Codes for Surveys */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Use QR Codes for Surveys?</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Getting people to complete a survey is a persistent challenge for businesses and researchers alike. Even highly motivated participants drop off when the process requires too many steps. A survey QR code removes every barrier between a willing respondent and the survey form — making participation as simple as pointing a phone camera at a code. The result is measurably higher response rates from the same audience, across every research and feedback context.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Instant Survey Access</h3>
                </div>
                <p className="text-muted-foreground">
                  A qr code for survey form delivers respondents directly to your questionnaire in under three seconds. No URL to type, no search required, and no need to remember to complete the survey later. The QR code captures participation at the precise moment of engagement — in a store, at an event, on a product, or in a waiting area — when the respondent is present, attentive, and most likely to follow through.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Higher Response Rates</h3>
                </div>
                <p className="text-muted-foreground">
                  Survey response rates are directly correlated with how easy participation is. Every additional step between a potential respondent and the survey form reduces the proportion who actually complete it. A survey QR code collapses the entire participation process into a single action, consistently producing higher response rates than URL-based, email, or verbally directed survey invitations.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Offline-to-Online Data Collection</h3>
                </div>
                <p className="text-muted-foreground">
                  Physical locations — shops, restaurants, event venues, university campuses — contain large populations of potential survey respondents that are entirely unreachable through digital channels alone. A QR code market research survey placed strategically in these spaces brings offline audiences into your digital data collection, without requiring any technology infrastructure beyond a printed code.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MousePointerClick className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Easy Participation</h3>
                </div>
                <p className="text-muted-foreground">
                  QR code scanning is familiar and takes under five seconds for any smartphone user. Unlike paper surveys (which require collection and manual data entry) or email surveys (which require opening, clicking, and navigating), a survey QR code produces digital responses directly in your survey platform — automatically organized, instantly analyzable, and requiring no manual processing.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Benefits of Survey QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A QR code for your survey or research form delivers advantages across every stage of the data collection process:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Increase Survey Responses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    By removing the effort required to find and access the survey, a survey QR code dramatically increases the proportion of potential respondents who actually participate. More responses mean more reliable data, more statistical significance, and more confidence in your findings.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <ClipboardList className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Simplify Data Collection</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Survey responses collected via QR code flow directly into your survey platform in structured digital format — no paper to collect, no handwriting to decipher, and no manual data entry. The result is cleaner data, faster analysis, and significantly lower administrative overhead compared to traditional survey methods.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Capture Real-Time Feedback</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A QR code for feedback survey captures responses at the moment of experience — immediately after a meal, at the end of an event, or upon receiving a product. Real-time responses are more accurate and more emotionally authentic than surveys completed hours or days later, producing higher-quality data for any research or improvement initiative.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Improve Research Results</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Higher response rates and real-time data collection directly improve the quality of research results. A create qr code for survey approach reaches respondents at contextually relevant moments, reducing recall bias and producing a more representative sample than recruitment-dependent research methods.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Engage Customers Easily</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Survey participation is a form of customer engagement. Asking for an opinion demonstrates that you value the customer's perspective. A visible survey QR code communicates openness, invites dialogue, and builds the kind of relationship that turns one-time buyers into loyal, repeat customers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <QrCode className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">No App Required</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Universal smartphone camera scanning means any potential respondent can participate — regardless of technical ability or which phone they use. No app download, no account creation, and no barrier between the QR code and the first survey question.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Survey QR Codes Are Used */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Where Survey QR Codes Are Used</h2>
              <p className="text-lg text-muted-foreground mb-6">
                A survey QR code can be deployed anywhere your target respondents are present — and strategic placement is the single biggest factor in response rate:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Store className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Retail Stores</h3>
                </div>
                <p className="text-muted-foreground">
                  Retailers place survey QR codes on receipts, counter displays, fitting room mirrors, and store exit signage. Customers who have just completed a purchase are in a natural moment of reflection about their experience — a prompt to scan and share their opinion at this moment produces significantly higher response rates than any post-visit survey method. Store survey data helps identify which product categories, staff interactions, and store areas drive the highest and lowest satisfaction.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <MessageSquare className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Restaurants</h3>
                </div>
                <p className="text-muted-foreground">
                  Table cards, receipts, and takeaway packaging are the three primary survey QR code placements for restaurants. The dining experience creates a natural moment for reflection — customers finishing a meal or reviewing their bill have both the time and the context to provide meaningful feedback. Survey data from QR codes placed at tables or on receipts helps restaurants identify food quality trends, service speed issues, and specific menu items that consistently disappoint or delight.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Building2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Events and Conferences</h3>
                </div>
                <p className="text-muted-foreground">
                  Events are ideal environments for survey QR codes because attendees are actively engaged, present in a defined space, and often have natural moments of pause — between sessions, during breaks, or at the exit. Conference lanyards, session slide decks, exit signage, and post-session screens with a survey QR code capture real-time attendee feedback that is far more detailed and actionable than post-event email surveys completed days later.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Package className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Product Packaging</h3>
                </div>
                <p className="text-muted-foreground">
                  A qr code market research survey on product packaging or a packaging insert reaches customers after they have used the product — capturing their genuine reaction to the full product experience. This post-use data is extremely valuable for product development teams, as it reveals how the product performs in real-world conditions beyond the controlled environment of focus groups or pre-launch research.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <GraduationCap className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Universities and Research Studies</h3>
                </div>
                <p className="text-muted-foreground">
                  Academic researchers and university departments use survey QR codes to recruit participants efficiently in campus environments — on posters in common areas, lecture theatres, and libraries, or on handouts distributed during relevant classes. A QR code for survey form is particularly effective in academic settings because the student population is highly smartphone-literate and familiar with QR scanning, producing higher response rates than any other recruitment method available in a campus setting.
                </p>
              </div>

              <div className="border rounded-lg p-6 bg-card">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-5 h-5 text-primary flex-shrink-0" />
                  <h3 className="font-bold text-lg">Waiting Areas and Service Points</h3>
                </div>
                <p className="text-muted-foreground">
                  Healthcare waiting rooms, bank queues, service center lobbies, and transport hubs are high-value survey QR code placements because customers have time to fill — and a short survey is a productive use of that time. A well-placed survey QR code in a waiting area can achieve response rates far above typical survey benchmarks simply by turning idle waiting time into productive data collection.
                </p>
              </div>
            </div>
          </section>

          {/* How Survey QR Codes Work */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold">How Survey QR Codes Work</h2>
            <p className="text-lg text-muted-foreground">
              Getting your survey QR code live and collecting responses takes four simple steps:
            </p>

            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">1</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Create a Survey Using Google Forms or a Survey Platform</h3>
                  <p className="text-muted-foreground">
                    Build your survey using Google Forms, Typeform, SurveyMonkey, Microsoft Forms, Tally, JotForm, or a custom survey on your website. Keep the survey short and mobile-optimized — 5–8 questions is ideal for most QR code survey contexts. Use clear, concise question wording, avoid open text fields for all but one question, and ensure the submit button is clearly visible without scrolling on a smartphone screen. Preview the survey on a mobile device before generating the QR code.
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
                    Copy the shareable URL of your survey and paste it into the QR code generator above. Customize the design to match your brand or research context — adjust colors, add a logo, or choose a pattern style. Download the finished survey QR code at high resolution for printing on posters, receipts, packaging, or any other survey distribution material.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">3</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Add the QR Code to Posters, Receipts, or Marketing Materials</h3>
                  <p className="text-muted-foreground">
                    Place the survey QR code on posters, flyers, receipts, table cards, event programs, packaging inserts, or any physical material where your target respondents will see it. Position it alongside a clear, brief CTA — "Scan to take our survey", "Scan to share your opinion", or "Scan and complete our 2-minute survey." Test scan the printed code on both iPhone and Android before distributing any materials.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">4</div>
                </div>
                <div className="pt-1">
                  <h3 className="text-xl font-bold mb-2">Users Scan the QR Code and Complete the Survey Instantly</h3>
                  <p className="text-muted-foreground">
                    When a respondent scans the survey QR code with their phone camera, they are taken directly to your survey form — ready to answer from the first question. Responses are automatically recorded in your survey platform in real time, with no manual data entry required. You can monitor response rates and early results as they come in, even before the survey period has ended.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Business Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Business Use Cases for Survey QR Codes</h2>
              <p className="text-lg text-muted-foreground mb-6">
                See how businesses and researchers use survey QR codes to collect actionable insights:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction Surveys</CardTitle>
                  <CardDescription>Retail & service businesses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A national gym chain places a survey QR code on the exit turnstile screen and in changing rooms. Members scan after their workout and rate cleanliness, equipment availability, and staff helpfulness. The chain receives thousands of satisfaction data points per month across all locations — enabling branch-level performance tracking, targeted staff training, and equipment investment decisions based on real member feedback rather than assumption.
                  </p>
                  <Badge variant="secondary">Performance Tracking</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Attendee Surveys</CardTitle>
                  <CardDescription>Events & conferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A music festival includes a survey QR code on wristbands and at venue exit points. Attendees scan as they leave and rate their experience across sound quality, food vendors, toilets, queuing, and overall event satisfaction. The organizer collects more feedback in one festival weekend than from three years of post-event email surveys — and uses the data to prioritize improvements for the next event.
                  </p>
                  <Badge variant="secondary">Event Improvement</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Research Surveys</CardTitle>
                  <CardDescription>Manufacturing & e-commerce</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A consumer electronics brand includes a QR code for survey form inside every product box, linking to a 5-question product satisfaction survey. Customers who set up and use the product scan the code in their first week of ownership and share their honest impressions. The product team receives real-world performance data — particularly around setup experience, perceived value, and feature satisfaction — that shapes the next product iteration.
                  </p>
                  <Badge variant="secondary">Product Development</Badge>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Research Campaigns</CardTitle>
                  <CardDescription>Research & insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    A market research agency uses survey QR codes on posters in shopping centres, coffee shops, and transport hubs to recruit participants for a consumer attitudes study. The QR code links to a screening survey that qualifies respondents before routing them to the main study. The poster campaign collects more qualified respondents in two weeks than six months of online panel recruitment — at a fraction of the cost.
                  </p>
                  <Badge variant="secondary">Participant Recruitment</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Design Best Practices for Survey QR Codes</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Follow these guidelines to maximize the response rate your survey QR code achieves:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Add Clear Call-to-Action Text</h3>
                  <p className="text-muted-foreground text-sm">
                    Always include a specific, action-oriented prompt next to your survey QR code — "Scan to take our 2-minute survey", "Scan to share your opinion", or "Scan and help us improve." Include the survey duration if it is short — "2 minutes" or "5 quick questions" — as stating the time commitment increases participation by reducing the uncertainty about how much effort is required.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Use High Contrast Colors</h3>
                  <p className="text-muted-foreground text-sm">
                    A survey QR code must maintain strong contrast between its dark modules and the background for reliable scanning — especially in variable lighting conditions like outdoor event spaces, dimly lit restaurants, or bright retail environments. A dark code on white or a very light background is always the most reliable combination. Test scan the code in the actual lighting conditions where it will be used, not just at a desk.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Ensure QR Code Size Is Large Enough</h3>
                  <p className="text-muted-foreground text-sm">
                    Size the QR code proportionally to the viewing distance and material: minimum 2 cm x 2 cm on receipts, 3–5 cm on table cards and counter displays, 6–10 cm on A4 posters, and significantly larger on outdoor signage or event banners where respondents may be scanning from 1–2 metres away. Download the QR code at high resolution (PNG) to maintain sharpness at every print size.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border rounded-lg p-4 bg-card">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-1">Test QR Codes Before Printing</h3>
                  <p className="text-muted-foreground text-sm">
                    Always scan the survey QR code on both an iPhone and an Android device before printing any materials. Verify that the survey URL opens correctly, the form loads quickly on mobile data, all questions display and function properly, and the submission process completes without errors. Testing before printing is the single most important quality check — discovering a broken link after printing 500 posters is an expensive and time-consuming mistake.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">Common Survey QR Code Mistakes to Avoid</h2>
            <p className="text-lg text-muted-foreground mb-6">
              These mistakes are the most common causes of poor survey QR code response rates:
            </p>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Long or Complicated Surveys</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A survey with 20 questions, complex matrix grids, or multiple required open text fields will cause the majority of respondents who scan the QR code to abandon the form before submitting. People scanning a QR code in a physical setting have limited time and patience. Limit the survey to 5–8 focused questions, make as many fields optional as your research allows, and design for completion in under three minutes.
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
                    A survey QR code printed at an insufficient size is unreliable to scan and will generate frustration rather than responses. One failed scan attempt is often enough to cause a potential respondent to give up entirely. Size the code appropriately for the material — larger than you think you need, scaled to the expected scanning distance, and printed at high enough resolution to remain sharp.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Unclear Call-to-Action Text</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A QR code placed without any accompanying text or context generates very few scans. Most people will not scan an unidentified QR code on a poster or receipt without knowing what it links to or why they should bother. Always include a specific, benefit-focused CTA that explains what the survey is for, how long it takes, and why the respondent's input matters.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                    <CardTitle className="text-base">Forms That Are Not Mobile-Friendly</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Every person who scans a survey QR code is on a smartphone. A survey form with desktop-scale layout, tiny tap targets, slow load times on mobile data, or a submit button that is below the fold on a phone screen will result in poor completion rates regardless of how many scans the QR code achieves. Always design, preview, and test your survey on a mobile device before deploying the QR code.
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
              Explore more QR code generators for customer engagement and data collection:
            </p>
            <div className="space-y-3 text-muted-foreground">
              <p>
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                — Create any type of QR code with full customization options
              </p>
              <p>
                <Link href="/tools/qr-code-for-google-reviews">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Google Reviews</span>
                </Link>{" "}
                — Generate QR codes that take customers directly to your Google review page
              </p>
              <p>
                <Link href="/tools/qr-code-for-contact-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Contact Forms</span>
                </Link>{" "}
                — Create QR codes linking to contact and inquiry forms
              </p>
              <p>
                <Link href="/tools/qr-code-for-feedback-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Feedback Forms</span>
                </Link>{" "}
                — Generate QR codes for customer feedback and satisfaction forms
              </p>
              <p>
                <Link href="/tools/qr-code-for-business-promotion">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Business Promotion</span>
                </Link>{" "}
                — Create QR codes for business marketing and brand awareness
              </p>
            </div>
          </section>


            {/* Same Bucket Cross-linking */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold mb-4">More Lead Generation QR Code Generators</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                <Link href="/tools/qr-code-for-google-reviews">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Google Reviews</span>
                </Link>{" "}
                — Collect more Google reviews with a single scan
              </p>
              <p>
                <Link href="/tools/qr-code-for-contact-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Contact Forms</span>
                </Link>{" "}
                — Link directly to your contact form via QR code
              </p>
              <p>
                <Link href="/tools/qr-code-for-feedback-forms">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Feedback Forms</span>
                </Link>{" "}
                — Collect customer feedback with a scannable QR code
              </p>
              <p>
                <Link href="/tools/qr-code-for-lead-capture">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Lead Capture</span>
                </Link>{" "}
                — Capture leads instantly with a QR code
              </p>
              </div>
            </section>

          {/* Final CTA */}
          <section className="border-t pt-12">
            <div className="p-8 bg-primary/5 border border-primary/20 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Create Your Survey QR Code Now</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Generate a QR code that allows users to participate in surveys instantly. Free, no sign-up required.
              </p>
              <Button size="lg" onClick={scrollToTool}>
                Create Survey QR Code
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
