import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, generateBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, Shield, ArrowRight, Info, Globe, Database, Cpu, AlertTriangle } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function OfflinePasswordGenerator() {
  useSEO({
    title: "Offline Password Generator – Create Secure Passwords Without Internet",
    description: "Generate strong passwords offline using cryptographic randomness. Pixocraft Password Generator works entirely inside your browser with no server communication or logging.",
    keywords: "offline password generator, password generator offline, browser password generator, client side password generator, local password generator, secure offline password generator, private password generator tool",
    canonicalUrl: "https://tools.pixocraft.in/offline-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems = [
    {
      question: "Can a password generator work offline?",
      answer: "Yes, the Pixocraft Password Generator uses the Web Crypto API which is built into your browser. This allows it to generate secure random passwords without any internet connection."
    },
    {
      question: "Is an offline password generator safer?",
      answer: "Yes, because the password never leaves your device. Online generators may transmit your password to a server where it could be logged or intercepted."
    },
    {
      question: "Does Pixocraft store generated passwords?",
      answer: "No. All generation happens locally in your browser. We have no access to the passwords you create."
    },
    {
      question: "How secure are offline password generators?",
      answer: "When using cryptographically secure APIs like Web Crypto, they are as secure as any professional security tool, providing high entropy and true randomness."
    },
    {
      question: "What makes a password generator private?",
      answer: "A private generator works entirely on the client-side (your browser), meaning no data is ever sent to a server for processing or storage."
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
            { label: "Offline Password Generator" },
          ]}
        />
      </div>

      <StructuredData data={generateSoftwareApplicationSchema({
        name: "Offline Password Generator",
        description: "Generate strong passwords offline using cryptographic randomness. Works entirely inside your browser with no server communication.",
        url: "https://tools.pixocraft.in/offline-password-generator",
        category: "SecurityApplication"
      })} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "Password Generator", url: "/tools/password-generator" },
        { name: "Offline Password Generator", url: "/offline-password-generator" }
      ])} />

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Offline Password Generator – <span className="text-primary">Create Secure Passwords Without Internet</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Generate cryptographically secure random passwords entirely inside your browser. No server communication, no logging, 100% private.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> No Internet Required</span>
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> Local Generation</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Zero Logging</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={16} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-16">
            <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10 shadow-sm">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <Info className="h-8 w-8 text-primary" /> 
                Why Offline Generation Matters
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Most online password generators rely on servers to create passwords. This introduces potential privacy risks because generated passwords may pass through external systems.
                </p>
                <p>
                  The Pixocraft Offline Password Generator solves this problem. The generator runs entirely inside your browser, using the <strong>Web Crypto API</strong> to produce cryptographically secure random passwords.
                </p>
                <ul className="list-none p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <li className="flex items-center gap-2 font-bold text-foreground"><Check className="h-5 w-5 text-primary" /> No internet connection required</li>
                  <li className="flex items-center gap-2 font-bold text-foreground"><Check className="h-5 w-5 text-primary" /> No password transmission</li>
                  <li className="flex items-center gap-2 font-bold text-foreground"><Check className="h-5 w-5 text-primary" /> No password logging</li>
                  <li className="flex items-center gap-2 font-bold text-foreground"><Check className="h-5 w-5 text-primary" /> No external servers involved</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black mb-8 text-center">Why Pixocraft Password Generator Works Offline</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Runs in Browser", desc: "The code executes entirely on your device's hardware.", icon: Cpu },
                  { title: "Web Crypto API", desc: "Uses standard browser security APIs for true randomness.", icon: ShieldCheck },
                  { title: "No Network Needed", desc: "Functions perfectly even when your device is offline.", icon: WifiOff },
                  { title: "No Logging", desc: "We have no way to see or store what you generate.", icon: Database },
                  { title: "Secure Logic", desc: "Uses industry-standard algorithms for local generation.", icon: Lock }
                ].map((item, i) => (
                  <Card key={i} className="hover-elevate border-primary/5">
                    <CardHeader className="p-6">
                      <item.icon className="h-8 w-8 text-primary mb-4" />
                      <CardTitle className="text-xl font-black">{item.title}</CardTitle>
                      <CardDescription className="text-muted-foreground font-medium">{item.desc}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            <section className="bg-muted/30 p-8 rounded-3xl border border-border shadow-inner">
              <h2 className="text-3xl font-black mb-6">How Offline Password Generation Works</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                The core of our technology is <code>window.crypto.getRandomValues()</code>. This browser API generates cryptographically secure random numbers directly on your processor.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                These numbers are used to build passwords with maximum entropy. Because the API is built into all modern browsers, the generator functions without any internet access or external server calls.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black mb-8 text-center">Why Offline Password Generators Are More Secure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4 p-6 rounded-2xl bg-destructive/5 border border-destructive/10">
                  <h3 className="text-xl font-black text-destructive flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Online Risks</h3>
                  <ul className="space-y-2 list-none p-0 text-sm font-medium">
                    <li>• Server compromise leaks all data</li>
                    <li>• Network interception (Man-in-the-middle)</li>
                    <li>• Backend logging of user activity</li>
                    <li>• Reliance on external API security</li>
                  </ul>
                </div>
                <div className="space-y-4 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h3 className="text-xl font-black text-primary flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Offline Benefits</h3>
                  <p className="text-sm font-medium leading-relaxed">
                    Offline generation removes these risks because the password never exists outside your device's memory. This provides a "zero-knowledge" environment where only you ever see the result.
                  </p>
                </div>
              </div>
            </section>

            <section className="bg-card border-2 border-primary/10 rounded-3xl p-8 space-y-6 shadow-xl">
              <h2 className="text-3xl font-black text-center">Strong Offline Passwords Still Require High Entropy</h2>
              <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
                Entropy measures the unpredictability of a password. A 16-character password using a full character set produces:
              </p>
              <div className="bg-muted p-6 rounded-2xl text-center space-y-4 border shadow-inner">
                <p className="text-4xl font-black text-primary font-mono tracking-tighter">~105 Bits</p>
                <p className="text-xl font-bold">2^105 Possible Combinations</p>
              </div>
              <p className="text-center text-muted-foreground font-medium italic">
                This makes brute-force attacks computationally unrealistic, even for powerful GPU clusters.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-black mb-8 text-center">Entropy Growth and Security Levels</h2>
              <div className="overflow-hidden rounded-3xl border shadow-lg bg-card">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="px-6 py-4 font-black text-foreground">Password Length</TableHead>
                      <TableHead className="px-6 py-4 font-black text-foreground">Approximate Entropy</TableHead>
                      <TableHead className="px-6 py-4 font-black text-foreground">Security Level</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { length: "12 characters", entropy: "~78 bits", level: "Strong", color: "text-blue-500" },
                      { length: "16 characters", entropy: "~105 bits", level: "Very Strong", color: "text-green-500" },
                      { length: "20 characters", entropy: "~131 bits", level: "High Security", color: "text-emerald-600" },
                      { length: "32 characters", entropy: "~210 bits", level: "Extreme Security", color: "text-primary" }
                    ].map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="px-6 py-4 font-bold">{row.length}</TableCell>
                        <TableCell className="px-6 py-4 font-mono font-medium">{row.entropy}</TableCell>
                        <TableCell className={`px-6 py-4 font-black ${row.color}`}>{row.level}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-black mb-8">Best Practices for Secure Passwords</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Use 16 or more characters",
                  "Enable two-factor authentication",
                  "Avoid password reuse across sites",
                  "Store passwords in a secure manager",
                  "Avoid common dictionary words"
                ].map((tip, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-muted/20 border">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-bold text-muted-foreground">{tip}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <h2 className="text-3xl font-black mb-8 text-center">Generate Secure Passwords for Specific Platforms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Gmail Password", url: "/strong-password-for-gmail" },
                  { title: "Instagram Password", url: "/strong-password-for-instagram" },
                  { title: "Facebook Password", url: "/strong-password-for-facebook" },
                  { title: "Banking Password", url: "/banking-password-generator" },
                  { title: "Apple ID Password", url: "/apple-id-password-generator" },
                  { title: "Unhackable Password", url: "/unhackable-password-generator" },
                  { title: "Private Password", url: "/private-password-generator" },
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
