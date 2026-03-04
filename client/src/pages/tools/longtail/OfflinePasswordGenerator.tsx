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
    description: "Generate strong passwords offline using cryptographic randomness. Pixocraft Password Generator works entirely inside your browser with no server communication.",
    keywords: "offline password generator, password generator offline, browser password generator, client side password generator, local password generator, secure offline password generator",
    canonicalUrl: "https://tools.pixocraft.in/offline-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems = [
    {
      question: "Can a password generator work offline?",
      answer: "Yes, modern browsers have built-in cryptographic APIs (Web Crypto API) that allow for secure random number generation without any internet connection."
    },
    {
      question: "Is an offline password generator safer?",
      answer: "Generally, yes. By working offline, the tool eliminates the risk of passwords being intercepted during transmission or logged on a remote server."
    },
    {
      question: "Does Pixocraft store generated passwords?",
      answer: "No. Pixocraft is a client-side tool. All generation happens on your device and is never sent to our servers or stored in any database."
    },
    {
      question: "How secure are offline password generators?",
      answer: "They are extremely secure when they use cryptographically strong randomness. Pixocraft uses CSPRNG values which are the gold standard for security."
    },
    {
      question: "What makes a password generator private?",
      answer: "Local execution, zero data transmission, and no tracking scripts are what make a password generator truly private."
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
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Offline Password Generator – <span className="text-primary">Create Secure Passwords Without Internet</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Generate cryptographically secure passwords locally on your device. No internet required, no data transmission, 100% private.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-bold">
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> 100% Offline Capable</span>
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> Local Generation</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Zero Server Logs</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={20} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-16">
            {/* Introduction */}
            <section className="bg-primary/5 p-8 rounded-3xl border border-primary/10 shadow-sm">
              <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                <WifiOff className="h-8 w-8 text-primary" /> 
                Secure Generation Without Connectivity
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Most online password generators rely on servers to create passwords. This introduces potential privacy risks because generated passwords may pass through external systems or be logged in backend databases.
                </p>
                <p>
                  The <strong>Pixocraft Offline Password Generator</strong> solves this problem. The generator runs entirely inside your browser, using the <strong>Web Crypto API</strong> to produce cryptographically secure random passwords. This means your password is created locally on your device with no internet connection required, no transmission, and no external servers involved.
                </p>
              </div>
            </section>

            {/* Why Works Offline */}
            <section>
              <h2 className="text-3xl font-black mb-8 text-center">Why Pixocraft Password Generator Works Offline</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "In-Browser Execution", desc: "The entire generation code is downloaded once and runs locally in your browser memory.", icon: Cpu },
                  { title: "No Network Dependency", desc: "Once the page is loaded, you can disconnect from the internet and it will work perfectly.", icon: WifiOff },
                  { title: "Web Crypto API Randomness", desc: "Uses standard browser security features for generating unpredictable strings.", icon: Lock },
                  { title: "Zero Data Transmission", desc: "Passwords are never sent to a server, ensuring they never leave your machine.", icon: Globe },
                  { title: "Privacy-First Architecture", desc: "Designed from the ground up to prioritize user confidentiality above all else.", icon: ShieldCheck }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 rounded-2xl bg-card border shadow-sm hover-elevate transition-all">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-black text-lg">{item.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section className="bg-muted/30 p-8 rounded-3xl border">
              <h2 className="text-3xl font-black mb-6">How Offline Password Generation Works</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  The core technology behind our generator is <code>window.crypto.getRandomValues()</code>. This browser API is designed to generate <strong>cryptographically secure random numbers (CSPRNG)</strong>.
                </p>
                <p>
                  These numbers are used to build passwords with maximum entropy. Because the API is built directly into modern browsers (Chrome, Firefox, Safari, Edge), the generator can function entirely without internet access. This ensures that the 'seed' of your password is truly random and technically unpredictable.
                </p>
              </div>
            </section>

            {/* Why Offline is Safer */}
            <section>
              <h2 className="text-3xl font-black mb-8 text-center">Why Offline Password Generators Are More Secure</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-destructive"><AlertTriangle className="h-5 w-5" /> Risks of Online-Only Tools</h3>
                  <ul className="space-y-2 list-none p-0">
                    {["Centralized server compromise", "Traffic interception (Man-in-the-Middle)", "Hidden backend password logging", "Vulnerabilities in API endpoints"].map((risk, i) => (
                      <li key={i} className="flex items-center gap-2 text-muted-foreground font-medium">
                        <div className="h-1.5 w-1.5 rounded-full bg-destructive" /> {risk}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 text-primary"><ShieldCheck className="h-5 w-5" /> The Offline Advantage</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Offline generation removes these risks because the password never exists outside your device's memory. Even if our servers were compromised, your passwords would remain safe because they were never there to begin with.
                  </p>
                </div>
              </div>
            </section>

            {/* Entropy Explanation */}
            <section className="bg-card border-2 border-primary/10 rounded-3xl p-8 space-y-6 shadow-xl">
              <h2 className="text-3xl font-black text-center">Strong Offline Passwords Still Require High Entropy</h2>
              <p className="text-muted-foreground text-lg text-center max-w-2xl mx-auto">
                Entropy measures the unpredictability of a password. A 16-character password using a full character set (A-Z, a-z, 0-9, symbols) produces:
              </p>
              <div className="bg-muted p-6 rounded-2xl text-center space-y-4">
                <div className="text-4xl font-black text-primary font-mono tracking-tighter">~105 Bits (2^105 Combinations)</div>
                <p className="text-sm text-muted-foreground">This massive search space makes brute-force attacks computationally unrealistic for even the world's fastest supercomputers.</p>
              </div>
            </section>

            {/* Password Length Table */}
            <section>
              <h2 className="text-3xl font-black mb-8 text-center">Security Levels by Password Length</h2>
              <div className="overflow-hidden rounded-3xl border shadow-lg bg-card">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="px-6 py-4 font-black text-foreground">Password Length</TableHead>
                      <TableHead className="px-6 py-4 font-black text-foreground">Entropy Estimate</TableHead>
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
                        <TableCell className="px-6 py-4 font-mono">{row.entropy}</TableCell>
                        <TableCell className={`px-6 py-4 font-black ${row.color}`}>{row.level}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            {/* Internal Links */}
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

            {/* FAQ Section */}
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
