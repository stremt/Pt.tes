import { useSEO, OG_IMAGES, generateFAQSchema } from "@/lib/seo";
import QRMaker from "./QRMaker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Users,
  Smartphone,
  Briefcase,
  Network,
  BadgeCheck,
  FileText,
} from "lucide-react";

const faqItems = [
  {
    question: "How do I create a QR code for my LinkedIn profile?",
    answer:
      "Go to your LinkedIn profile and copy the URL from your browser address bar — it will look like linkedin.com/in/yourname. Paste it into the QR code generator above, customize the design with LinkedIn's blue or your personal brand colors, then download in 4K Ultra resolution for print or digital use.",
  },
  {
    question: "Can I add a QR code to my resume?",
    answer:
      "Absolutely. A LinkedIn QR code on your resume is one of the most effective ways to give recruiters instant access to your full profile, portfolio, recommendations, and experience. Place it near your contact details in the header or footer. Download in 4K resolution for crisp print quality.",
  },
  {
    question: "Are LinkedIn QR codes free to create?",
    answer:
      "Yes, completely free. Our QR code generator requires no account, no subscription, and has no usage limits. Create, customize, and download as many LinkedIn QR codes as you need at no cost, including 4K Ultra resolution downloads for professional printing.",
  },
  {
    question: "Can people connect with me instantly by scanning the QR code?",
    answer:
      "When someone scans your LinkedIn QR code, they are taken directly to your LinkedIn profile page. From there they can connect with you, send a message, or follow you with a single tap. It eliminates the need to search for your name, handle spelling variations, or sift through multiple profiles.",
  },
  {
    question: "How do QR codes help with professional networking?",
    answer:
      "At conferences, events, and meetings, QR codes replace the awkward fumbling of exchanging contact details. Instead of spelling out your name or waiting for someone to find your profile, you simply show your QR code — they scan, they're on your profile, they connect. The entire process takes under ten seconds.",
  },
  {
    question: "Can I use a LinkedIn QR code on my conference badge?",
    answer:
      "Yes, and it's one of the best uses. Print your LinkedIn QR code on your event badge or on a small card attached to it. Other attendees can scan you during breaks and networking sessions, making every casual conversation a potential professional connection without any friction.",
  },
  {
    question: "What happens if I change my LinkedIn profile URL?",
    answer:
      "If you change your LinkedIn custom URL, the QR code that links to the old URL will break. Generate a new QR code with the updated URL before reprinting materials. To avoid this, claim and lock in your ideal LinkedIn custom URL (linkedin.com/in/firstname-lastname) before creating your QR code.",
  },
];

export default function QRCodeForLinkedIn() {
  useSEO({
    title: "QR Code for LinkedIn Profile | LinkedIn QR Code Generator – Free",
    description:
      "Create a QR code for your LinkedIn profile instantly. Generate a LinkedIn networking QR code for business cards, resumes, conference badges, and presentations. Free LinkedIn QR code maker.",
    keywords:
      "linkedin qr code generator, qr code for linkedin profile, linkedin profile qr code, create qr code for linkedin, linkedin networking qr code",
    canonicalUrl: "https://tools.pixocraft.in/tools/qr-code-for-linkedin",
    ogImage: OG_IMAGES.qrMaker,
  });

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"WebPage","name":"QR Code for LinkedIn – Free LinkedIn Profile QR Code Generator | Pixocraft","description":"Create a QR code for your LinkedIn profile instantly. Share your professional profile at networking events with a scannable LinkedIn QR code.","url":"https://tools.pixocraft.in/tools/qr-code-for-linkedin","publisher":{"@type":"Organization","name":"Pixocraft Tools","url":"https://tools.pixocraft.in","logo":{"@type":"ImageObject","url":"https://tools.pixocraft.in/favicon.png"}},"inLanguage":"en-IN","isPartOf":{"@type":"WebSite","@id":"https://tools.pixocraft.in"}})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"HowTo","name":"How to Create a QR Code for LinkedIn","description":"Follow these steps to generate a QR code that links to your LinkedIn profile.","step":[{"@type":"HowToStep","name":"Copy Your LinkedIn Profile URL","text":"Go to your LinkedIn profile and copy the profile URL from the browser address bar or your LinkedIn settings."},{"@type":"HowToStep","name":"Paste the URL into the QR Generator","text":"Open the Pixocraft QR Code Generator and paste your LinkedIn profile URL into the input field."},{"@type":"HowToStep","name":"Customize Your QR Code","text":"Style the QR code with LinkedIn's brand colors or your own palette, and optionally add the LinkedIn logo to the center."},{"@type":"HowToStep","name":"Download and Use at Networking Events","text":"Download the QR code and add it to your business cards, conference badges, email signatures, or presentations."}]})}
      </script>
      <script type="application/ld+json">
        {JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://tools.pixocraft.in/"},{"@type":"ListItem","position":2,"name":"QR Code Generator","item":"https://tools.pixocraft.in/tools/qr-maker"},{"@type":"ListItem","position":3,"name":"QR Code for LinkedIn","item":"https://tools.pixocraft.in/tools/qr-code-for-linkedin"}]})}
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
            <span className="text-foreground">QR Code for LinkedIn</span>
          </nav>
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/10 via-primary/5 to-transparent py-16 md:py-20 -mx-4 px-4 md:-mx-8 md:px-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-4">
              Professional Networking QR Codes
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              QR Code for LinkedIn – Create LinkedIn Profile QR Codes Instantly
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Generate a QR code that links directly to your LinkedIn profile.
              Perfect for professionals, job seekers, entrepreneurs, and
              businesses who want to grow their professional network instantly
              at events, conferences, and beyond.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Share your LinkedIn profile instantly
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Perfect for networking events and conferences
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Ideal for business cards and resumes
                </span>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Works on all smartphones — no app required to scan
                </span>
              </div>
            </div>
            <Link href="/tools/qr-maker#qr-generator"><Button size="lg">Create LinkedIn QR Code</Button></Link>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 md:px-8 space-y-20 pb-20">
          {/* Embedded Tool */}
          <section>
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">
                Generate Your LinkedIn Profile QR Code
              </h2>
              <p className="text-lg text-muted-foreground">
                Paste your LinkedIn profile link below to generate a scannable
                QR code that lets people connect with you instantly — no manual
                search, no typing your name.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Example:{" "}
                <code className="bg-muted px-2 py-0.5 rounded text-xs">
                  https://linkedin.com/in/yourprofile
                </code>
              </p>
            </div>
            <div className="bg-muted/30 border rounded-lg p-6">
              <QRMaker embedMode={true} />
            <p className="mt-4 text-sm text-muted-foreground">
                Use our{" "}
                <Link href="/tools/qr-maker">
                  <span className="text-primary hover:underline cursor-pointer">Free QR Code Generator</span>
                </Link>{" "}
                to create custom QR codes for websites, social media, marketing campaigns, and business use cases.
              </p>
            </div>
          </section>

          {/* Why Use LinkedIn QR Codes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Use QR Codes for LinkedIn Networking
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Professional networking has always depended on making connections
              quickly before the moment passes. QR codes turn your LinkedIn
              profile into something you can share in under five seconds — at
              conferences, meetings, events, and anywhere professional
              relationships are built.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Instant Profile Access
                </h3>
                <p className="text-muted-foreground">
                  When someone scans your LinkedIn QR code, they land directly
                  on your profile — no search required. They see your headline,
                  experience, photo, and recommendations immediately, and can
                  send a connection request with a single tap. This is
                  dramatically faster than exchanging business cards and hoping
                  people search for you later.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Easy Networking at Events
                </h3>
                <p className="text-muted-foreground">
                  Conferences, trade shows, and networking events create brief
                  windows to make an impression. A QR code lets you exchange
                  LinkedIn connections in seconds during a conversation rather
                  than after it ends. The connection is made while you're both
                  still standing together — when motivation is highest.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Simplified Contact Sharing
                </h3>
                <p className="text-muted-foreground">
                  LinkedIn names with common surnames, multiple middle names, or
                  unusual spellings are difficult to find in search. QR codes
                  solve this completely — they link directly to your specific
                  profile URL. No ambiguity, no wrong profiles, no failed
                  connections due to search errors.
                </p>
              </div>
              <div className="border rounded-lg p-6 bg-card">
                <h3 className="font-bold text-lg mb-3">
                  Professional Branding
                </h3>
                <p className="text-muted-foreground">
                  A well-designed LinkedIn QR code on your business card or
                  resume signals that you are tech-savvy and detail-oriented —
                  qualities valued in virtually every professional field. It
                  elevates your personal brand before the other person even
                  scans the code.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits Grid */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Benefits of LinkedIn Profile QR Codes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Network className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Faster Networking</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Exchange LinkedIn connections in under ten seconds at any
                    event. No fumbling with business cards, no manual searching,
                    no following up later hoping they find you.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Professional Branding
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A LinkedIn QR code on your business card or resume projects
                    confidence and professionalism. It shows you take your
                    personal brand seriously and makes a memorable first
                    impression.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Easy Contact Sharing</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    One QR code replaces the entire contact exchange process.
                    Your LinkedIn profile contains your email, phone, website,
                    and work history — all accessible in one scan.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Perfect for Conferences
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Conference networking moves fast. A QR code on your badge
                    or presentation slide lets every attendee connect with you
                    instantly during breaks and sessions — maximizing the value
                    of every event you attend.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">
                      Modern Business Cards
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Replace multiple lines of contact information with a single
                    QR code. Scanners get your complete LinkedIn profile with
                    far more information than any business card could contain.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <CardTitle className="text-lg">Works Everywhere</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Any smartphone camera scans LinkedIn QR codes instantly —
                    no additional app required. Maximum accessibility for your
                    professional network across all devices and platforms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Where Used */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Where LinkedIn QR Codes Are Used
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Business Cards",
                  desc: "A LinkedIn QR code on your business card gives recipients instant access to your full professional profile — work history, skills, recommendations, and contact details — with a single scan. Far more powerful than printing your LinkedIn URL as text.",
                },
                {
                  title: "Conference Badges",
                  desc: "Print your LinkedIn QR code on your conference lanyard badge or attach a small card to it. Other attendees can scan during networking breaks and immediately connect with you on LinkedIn while the conversation is still fresh.",
                },
                {
                  title: "Event Presentations",
                  desc: "Speakers add LinkedIn QR codes to their opening and closing presentation slides. Audience members who want to follow your work can connect while you're speaking — capturing interest at its highest point rather than hoping they remember to search for you afterward.",
                },
                {
                  title: "Email Signatures",
                  desc: "Add your LinkedIn QR code image to your email signature. Recipients who want to connect can scan directly from their phone screen when reading your email on mobile — turning every email into a networking touchpoint.",
                },
                {
                  title: "Resume & Portfolio",
                  desc: "A LinkedIn QR code near your contact details on a resume gives recruiters one-scan access to your full profile, portfolio, and recommendations. In competitive job markets, this attention to detail distinguishes your application from the stack.",
                },
                {
                  title: "Office Reception Areas",
                  desc: "Companies display QR codes linking to team member LinkedIn profiles in reception areas and meeting rooms. Visitors and clients can easily find and connect with key contacts while waiting — building relationships before the meeting even starts.",
                },
              ].map((item) => (
                <div key={item.title} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              How to Create a LinkedIn Profile QR Code
            </h2>
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  title: "Copy Your LinkedIn Profile URL",
                  desc: "Open your LinkedIn profile and copy the URL from your browser address bar. It will look like linkedin.com/in/yourname. If you haven't claimed a custom URL, go to your profile, click 'Edit public profile & URL,' and set a clean, professional URL with your name before creating your QR code.",
                },
                {
                  step: 2,
                  title: "Paste the Link into the QR Code Generator",
                  desc: "Paste your LinkedIn profile URL into the generator above. Select URL as the QR type. Customize the QR code color scheme to match your personal brand or LinkedIn's recognizable blue palette. Optionally embed the LinkedIn logo in the QR code center for instant visual recognition.",
                },
                {
                  step: 3,
                  title: "Generate and Download Your QR Code",
                  desc: "Download the QR code in 4K Ultra resolution for professional printing or standard resolution for digital use. The file downloads as a PNG with a clean background, ready to place into any design, business card template, resume, or presentation immediately.",
                },
                {
                  step: 4,
                  title: "Share or Print the QR Code Anywhere",
                  desc: "Add the QR code to your business cards, resume header, conference badge, presentation slides, email signature, or office display. When someone scans it, they arrive directly on your LinkedIn profile — ready to connect, follow, and message with one tap.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                      {item.step}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              LinkedIn QR Code Use Cases
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Seekers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    A job seeker places their LinkedIn QR code in the top corner
                    of their resume. When a recruiter receives the application,
                    they scan to instantly view the full profile — recommendations,
                    portfolio links, certifications, and endorsements that can't
                    fit on a one-page resume. This thoroughness stands out in a
                    competitive applicant pool.
                  </p>
                  <Badge variant="secondary">Career Growth</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Entrepreneurs & Founders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Entrepreneurs add LinkedIn QR codes to pitch decks and
                    business cards. Investors, partners, and potential clients
                    who meet them at startup events can scan and access the
                    founder's full professional background, company updates, and
                    thought leadership content in one tap.
                  </p>
                  <Badge variant="secondary">Business Development</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Business Consultants</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Consultants include LinkedIn QR codes in proposals and
                    client-facing presentations. Prospects who want to verify
                    credentials, read recommendations, or see past client work
                    can scan and find everything — reducing the trust barrier
                    and accelerating the sales process.
                  </p>
                  <Badge variant="secondary">Professional Services</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Event Speakers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Keynote speakers and workshop facilitators add LinkedIn QR
                    codes to their final slides. Audience members who found the
                    talk valuable scan to connect immediately — capturing that
                    moment of peak engagement before it fades when they move to
                    the next session.
                  </p>
                  <Badge variant="secondary">Public Speaking</Badge>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* LinkedIn Networking Strategies */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              LinkedIn Networking Strategies Using QR Codes
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              QR codes make LinkedIn networking faster, more professional, and
              more effective in both in-person and digital environments. Here
              are proven strategies to grow your professional network using
              LinkedIn QR codes:
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "QR Codes on Business Cards",
                  desc: "Replace your printed LinkedIn URL with a scannable QR code. When you hand someone a business card, they can scan it right there and connect while you're both still in conversation. No more hoping they search for you later — the connection is made in the moment.",
                },
                {
                  title: "QR Codes on Conference Presentations",
                  desc: "Display your LinkedIn QR code on your opening slide (so attendees can find you early) and closing slide (when interest peaks). For large conferences where you speak to hundreds of people, this can generate dozens of quality professional connections from a single talk.",
                },
                {
                  title: "QR Codes in Email Signatures",
                  desc: "Add a small LinkedIn QR code image to your email signature with text like 'Connect on LinkedIn.' Mobile email readers can scan directly from their screen, turning routine email correspondence into a steady stream of new professional connections over time.",
                },
                {
                  title: "QR Codes on Professional Portfolios",
                  desc: "Physical portfolio books, printed case studies, and proposal documents benefit from LinkedIn QR codes. Decision-makers who review your work can instantly access your profile for more context, social proof, and a way to reach out — all while your portfolio is in their hands.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 border rounded-lg p-5 bg-card"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Design Best Practices */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              LinkedIn QR Code Design Best Practices
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Use High Contrast Colors",
                  desc: "QR codes scan most reliably when modules are dark and the background is light. If you customize with LinkedIn's blue, ensure the contrast ratio between the module color and the background remains strong. Always test scanning after customizing colors.",
                },
                {
                  title: "Add the LinkedIn Logo Inside the QR Code",
                  desc: "Embedding LinkedIn's logo in the QR code center signals the destination before scanning. Professionals who recognize the LinkedIn logo know exactly what they'll get — a profile, not a random link. This boosts scan confidence and conversion.",
                },
                {
                  title: "Print QR Codes Clearly and at Sufficient Size",
                  desc: "For business cards: minimum 2cm x 2cm. For conference slides displayed on a projector: 10–15% of the slide area. For printed portfolios: 3cm x 3cm. Always use 4K Ultra resolution to ensure the code is sharp and scannable at every size.",
                },
                {
                  title: "Test Scanning Before Printing",
                  desc: "Before finalizing any printed materials, scan your QR code on both iPhone and Android from the expected viewing distance. Confirm it opens the correct LinkedIn profile and loads cleanly. Never discover a broken QR code after printing 500 business cards.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 border rounded-lg p-4 bg-card"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Common LinkedIn QR Code Mistakes to Avoid
            </h2>
            <div className="space-y-4">
              {[
                {
                  title: "Using an Incorrect Profile Link",
                  desc: "Always verify your LinkedIn URL by opening it in an incognito browser window before generating the QR code. Confirm it shows your correct, public-facing profile. A wrong URL sends scanners to someone else's profile or a broken page.",
                },
                {
                  title: "Using Low-Resolution QR Codes for Print",
                  desc: "Standard resolution QR codes pixelate when enlarged for business cards and printed materials, causing scanning failures. Always download the 4K Ultra resolution version for any print application — it's included free and ensures professional quality.",
                },
                {
                  title: "Placing QR Codes Too Small",
                  desc: "QR codes under 2cm on printed materials are difficult and sometimes impossible to scan reliably. If a code is too small for your phone camera to lock onto, most people will give up rather than struggle. Size is critical for scan rate.",
                },
                {
                  title: "Linking to an Incomplete LinkedIn Profile",
                  desc: "A QR code sends people to your profile — make sure the profile is worth visiting. Before promoting your LinkedIn QR code, complete your profile: add a professional photo, write a compelling headline, fill out your experience section, and gather at least a few recommendations.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-4 border border-amber-200 rounded-lg p-4 bg-amber-50 dark:bg-amber-950/20"
                >
                  <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-1 text-amber-900 dark:text-amber-100">
                      {item.title}
                    </h3>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Real Examples */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              Real Examples of LinkedIn QR Codes in Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">QR Code on a Resume</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A marketing professional adds their LinkedIn QR code to the
                    top right of their resume next to their contact details. When
                    a recruiter scans it during an initial review, they
                    immediately see 47 recommendations, a portfolio of campaigns,
                    and shared mutual connections — giving context that
                    transforms the application from a page of text into a living
                    professional profile.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    QR Code on a Conference Badge
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A software engineer attaches a small card with their LinkedIn
                    QR code to their conference lanyard. During a networking
                    lunch, five people from interesting companies scan the badge
                    and connect on LinkedIn within minutes. By the end of the
                    day, all five connections are accepted — relationships that
                    would have taken weeks of email follow-up without the QR code.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    QR Code on a Portfolio Website
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A freelance designer includes a printed portfolio in client
                    proposals with a LinkedIn QR code on the back page. Decision
                    makers reviewing the portfolio scan and find 30+ endorsements
                    from previous clients and detailed case studies of past
                    projects — social proof that accelerates the contracting
                    decision significantly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">LinkedIn QR Code FAQs</h2>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-6 bg-card">
                  <h3 className="font-bold mb-3 flex gap-2 items-start">
                    <HelpCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {item.question}
                  </h3>
                  <p className="text-muted-foreground text-sm ml-7">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Internal Linking */}
          <section className="space-y-6 border-t pt-12">
            <h2 className="text-3xl font-bold mb-4">
              More Social Media QR Code Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/tools/qr-code-for-instagram">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">QR Code for Instagram</h3>
                  <p className="text-sm text-muted-foreground">
                    Grow Instagram followers with a profile QR code
                  </p>
                </div>
              </Link>
              <Link href="/tools/qr-code-for-facebook">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">QR Code for Facebook</h3>
                  <p className="text-sm text-muted-foreground">
                    Create a QR code for your Facebook page or profile
                  </p>
                </div>
              </Link>
              <Link href="/tools/qr-code-for-youtube">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">QR Code for YouTube</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate QR codes for your YouTube channel or videos
                  </p>
                </div>
              </Link>
              <Link href="/tools/qr-maker">
                <div className="border rounded-lg p-4 bg-card hover:border-primary transition-all cursor-pointer">
                  <h3 className="font-bold mb-1">Main QR Code Generator</h3>
                  <p className="text-sm text-muted-foreground">
                    Full QR code maker with all customization options
                  </p>
                </div>
              </Link>
            </div>
          </section>


            {/* Same Bucket Cross-linking */}
            <section className="space-y-6 border-t pt-12">
              <h2 className="text-2xl font-bold mb-4">More Social Media QR Code Generators</h2>
              <div className="space-y-3 text-muted-foreground">
                <p>
                <Link href="/tools/qr-code-for-instagram">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Instagram</span>
                </Link>{" "}
                — Grow your Instagram following with a scannable QR code
              </p>
              <p>
                <Link href="/tools/qr-code-for-facebook">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for Facebook</span>
                </Link>{" "}
                — Drive traffic to your Facebook page or profile
              </p>
              <p>
                <Link href="/tools/qr-code-for-youtube">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for YouTube</span>
                </Link>{" "}
                — Grow your YouTube channel with a scannable QR code
              </p>
              <p>
                <Link href="/tools/qr-code-for-whatsapp">
                  <span className="text-primary hover:underline cursor-pointer">QR Code for WhatsApp</span>
                </Link>{" "}
                — Let customers contact you on WhatsApp instantly
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
                { href: "/tools/qr-code-for-instagram", title: "QR Code for Instagram", desc: "Drive followers to your Instagram profile." },
                { href: "/tools/qr-code-for-facebook", title: "QR Code for Facebook", desc: "Share your Facebook page with a single scan." },
                { href: "/tools/qr-code-for-youtube", title: "QR Code for YouTube", desc: "Link to your YouTube channel instantly." },
                { href: "/tools/qr-code-for-whatsapp", title: "QR Code for WhatsApp", desc: "Let contacts reach you on WhatsApp instantly." },
                { href: "/tools/qr-code-for-vcard-contacts", title: "QR Code for vCard Contacts", desc: "Share your full contact details digitally." },
                { href: "/tools/qr-code-for-contact-forms", title: "QR Code for Contact Forms", desc: "Direct people to your contact form instantly." },
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
              <h2 className="text-3xl font-bold">
                Create Your LinkedIn QR Code Now
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Generate a QR code that connects people instantly to your
                LinkedIn profile. Free, unlimited, and print-ready at 4K
                resolution.
              </p>
              <Link href="/tools/qr-maker#qr-generator"><Button size="lg">Create LinkedIn QR Code</Button></Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
