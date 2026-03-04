import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, generateBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, Shield, ArrowRight, Info, EyeOff, Globe, Database, Cpu, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PrivatePasswordGenerator() {
  useSEO({
    title: "Private Password Generator (No Logging, Works Offline)",
    description: "Generate secure passwords privately using your browser. No logging, no tracking, and no password storage. Fully offline and cryptographically secure.",
    keywords: "private password generator, password generator no logging, password generator without tracking, browser password generator, client side password generator",
    canonicalUrl: "https://tools.pixocraft.in/private-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems = [
    {
      question: "Is an online password generator private?",
      answer: "Yes, if it generates passwords client-side. Our tool uses the Web Crypto API to generate passwords directly in your browser, ensuring total privacy."
    },
    {
      question: "Do password generators store passwords?",
      answer: "Many server-based ones might, but Pixocraft does not. All generation happens on your device and is never sent to any server."
    },
    {
      question: "Is it safe to generate passwords in a browser?",
      answer: "Yes, because modern browsers provide secure cryptographic APIs (window.crypto) that are designed for high-security tasks like this."
    },
    {
      question: "Can hackers intercept generated passwords?",
      answer: "Since our generator works offline and doesn't transmit data, there is no network traffic for a hacker to intercept."
    },
    {
      question: "What makes a password generator secure?",
      answer: "Secure randomness (CSPRNG), client-side execution, and zero data persistence are the hallmarks of a secure generator."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Password Generator", url: "/tools/password-generator" },
            { label: "Private Password Generator" },
          ]}
        />
      </div>

      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Private Password Generator",
        description: "Generate secure passwords privately using your browser. No logging, no tracking, and no password storage.",
        url: "https://tools.pixocraft.in/private-password-generator",
        category: "SecurityApplication"
      })} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "Password Generator", url: "/tools/password-generator" },
        { name: "Private Password Generator", url: "/private-password-generator" }
      ])} />

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Private Password Generator – <span className="text-primary">Create Secure Passwords Without Logging</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Generate secure random passwords privately in your browser. No tracking, no server logs, 100% confidential.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><EyeOff className="h-4 w-4" /> Zero Tracking</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> Works Offline</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> No Server Logs</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={16} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-16">
            {/* Introduction */}
            <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10 shadow-sm">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" /> 
                True Privacy in Password Generation
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Many password generators operate through servers, which means generated passwords may pass through backend systems. This creates a potential point of failure where credentials could be logged or intercepted.
                </p>
                <p>
                  The <strong>Pixocraft Private Password Generator</strong> eliminates this risk by generating passwords entirely inside your browser using the <strong>Web Crypto API</strong>. No passwords are transmitted across the network, no passwords are stored, and no passwords are logged. This ensures that your generated credentials remain fully private and under your control.
                </p>
              </div>
            </section>

            {/* Privacy Assurance */}
            <section>
              <h2 className="text-3xl font-black mb-8 text-center">Why This Password Generator Is Private</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Local Browser Generation", desc: "Passwords are created on your hardware, not our servers.", icon: Cpu },
                  { title: "No Server-Side Logic", desc: "We don't use backend scripts to create your passwords.", icon: Globe },
                  { title: "No Password Storage", desc: "We have zero knowledge of what you generate.", icon: Database },
                  { title: "No Tracking Scripts", desc: "No analytics or third-party trackers are active here.", icon: EyeOff },
                  { title: "Works Fully Offline", desc: "Functions perfectly even without an internet connection.", icon: WifiOff }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-card border shadow-sm group hover-elevate transition-all">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-lg">{item.title}</h3>
                      <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Client-Side Explanation */}
            <section className="bg-muted/30 p-8 rounded-3xl border">
              <h2 className="text-3xl font-black mb-6">Client-Side Password Generation Explained</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  When you click 'Generate', our tool uses <code>window.crypto.getRandomValues()</code>. This is a built-in browser API that provides <strong>cryptographically secure random numbers</strong> suitable for high-security tasks.
                </p>
                <p>
                  Because this process happens entirely inside your browser environment, the resulting password never exists on our server. It is essentially born on your screen and dies when you close the tab, unless you copy and save it yourself.
                </p>
              </div>
            </section>

            {/* Why Privacy Matters */}
            <section>
              <h2 className="text-3xl font-black mb-8 text-center">Why Privacy Matters When Generating Passwords</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-destructive"><AlertTriangle className="h-5 w-5" /> Risks of Server-Based Tools</h3>
                  <ul className="space-y-2 list-none p-0">
                    {["Password logging on servers", "Potential data breaches", "Network traffic interception", "Server admin compromise"].map((risk, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive" /> {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-green-600"><ShieldCheck className="h-5 w-5" /> The Client-Side Advantage</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    By keeping the generation logic local, we eliminate the entire 'transmission' phase of security. There is no 'middle man' to compromise. Your security is restricted to your own device, which is significantly easier to control than a remote server.
                  </p>
                </div>
              </div>
            </section>

            {/* Entropy Section */}
            <section className="bg-card border-2 border-primary/10 rounded-3xl p-8 space-y-6 shadow-xl">
              <h2 className="text-3xl font-black text-center">Private Passwords Still Need Strong Entropy</h2>
              <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto">
                Privacy alone is not enough. Passwords must also have strong randomness (entropy) to resist brute-force attacks.
              </p>
              <div className="bg-muted p-6 rounded-2xl text-center space-y-4">
                <p className="text-sm font-black uppercase tracking-widest text-primary/70">Security Benchmark</p>
                <p className="text-lg font-medium">A 16-character random password typically contains:</p>
                <div className="text-4xl font-black text-primary font-mono tracking-tighter">2^105 combinations</div>
                <p className="text-sm text-muted-foreground">This astronomical number makes automated guessing attempts computationally impossible.</p>
              </div>
            </section>

            {/* Advantages */}
            <section>
              <h2 className="text-3xl font-black mb-8">Advantages of Browser-Based Generators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "No password transmission over the internet",
                  "No dependency on server infrastructure",
                  "Faster password generation",
                  "Increased privacy protection",
                  "Reduced attack surface"
                ].map((advantage, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 border">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="font-bold text-sm text-muted-foreground">{advantage}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Best Practices */}
            <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
              <h2 className="text-3xl font-black mb-8 text-center">Best Practices for Private Password Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Use unique passwords for every account",
                  "Aim for at least 16 characters",
                  "Always enable two-factor authentication",
                  "Store passwords in a secure password manager",
                  "Avoid reusing credentials across services"
                ].map((tip, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0">
                      <span className="text-xs font-black">{i+1}</span>
                    </div>
                    <span className="font-bold text-muted-foreground">{tip}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Internal Links */}
            <section className="space-y-8">
              <h2 className="text-3xl font-black mb-8 text-center">Generate Private Passwords for Specific Accounts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Gmail Password", url: "/strong-password-for-gmail" },
                  { title: "Instagram Password", url: "/strong-password-for-instagram" },
                  { title: "Facebook Password", url: "/strong-password-for-facebook" },
                  { title: "Banking Password", url: "/banking-password-generator" },
                  { title: "Apple ID Password", url: "/apple-id-password-generator" },
                  { title: "Unhackable Password", url: "/unhackable-password-generator" },
                  { title: "Main Generator", url: "/tools/password-generator" }
                ].map((link, i) => (
                  <Link key={i} href={link.url} className="group">
                    <Card className="hover-elevate transition-all border-primary/5">
                      <CardHeader className="p-5">
                        <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                          <ArrowRight className="h-4 w-4" />
                          {link.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-3xl font-black mb-8">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {faqItems.map((item, i) => (
                  <div key={i} className="border-b pb-8">
                    <h3 className="text-xl font-black mb-3">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
