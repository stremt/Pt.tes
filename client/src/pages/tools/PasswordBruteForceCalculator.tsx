import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES, type FAQItem, generateBreadcrumbSchema } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { Check, X, ShieldCheck, Lock, Zap, Fingerprint, Shield, ShieldAlert, Key, Clock, Cpu, Gauge, AlertTriangle, MousePointerClick, ShieldX, Database, RefreshCw, Mail, Instagram, Facebook, Landmark, Apple } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function PasswordBruteForceCalculator() {
  const [length, setLength] = useState(12);
  const [charset, setCharset] = useState("all");
  const [speed, setSpeed] = useState("1b");

  const charsetInfo = {
    numeric: { size: 10, label: "Numbers only (0-9)" },
    alpha: { size: 26, label: "Lowercase only (a-z)" },
    alphanumeric: { size: 62, label: "Letters + Numbers (A-Z, a-z, 0-9)" },
    all: { size: 94, label: "Full set (Letters, Numbers, Symbols)" }
  };

  const speedInfo = {
    "1m": { val: 1000000, label: "1 Million guesses/sec (Standard PC)" },
    "1b": { val: 1000000000, label: "1 Billion guesses/sec (High-end GPU)" },
    "100b": { val: 100000000000, label: "100 Billion guesses/sec (Botnet/Cluster)" }
  };

  const stats = useMemo(() => {
    const size = charsetInfo[charset as keyof typeof charsetInfo].size;
    const entropy = length * Math.log2(size);
    const combinations = Math.pow(size, length);
    const speedVal = speedInfo[speed as keyof typeof speedInfo].val;
    const seconds = combinations / speedVal;

    const formatTime = (s: number) => {
      if (s < 1) return "Instantly";
      if (s < 60) return `${Math.floor(s)} seconds`;
      if (s < 3600) return `${Math.floor(s / 60)} minutes`;
      if (s < 86400) return `${Math.floor(s / 3600)} hours`;
      if (s < 31536000) return `${Math.floor(s / 86400)} days`;
      if (s < 31536000 * 1000) return `${Math.floor(s / 31536000)} years`;
      if (s < 31536000 * 1000000) return `${(s / (31536000 * 1000)).toFixed(1)} thousand years`;
      if (s < 31536000 * 1000000000) return `${(s / (31536000 * 1000000)).toFixed(1)} million years`;
      return "Longer than the age of the universe";
    };

    return {
      entropy: entropy.toFixed(1),
      combinations: combinations.toExponential(2),
      time: formatTime(seconds),
      isSecure: entropy >= 80
    };
  }, [length, charset, speed]);

  useSEO({
    title: "Password Brute Force Calculator (Cracking Time Estimator) – Pixocraft",
    description: "Estimate how long it would take hackers to crack a password using brute-force attacks. Calculate password strength and create stronger passwords with Pixocraft Password Generator.",
    keywords: "password brute force calculator, password cracking time calculator, how long to crack password, password brute force time calculator, password strength cracking time",
    canonicalUrl: "https://tools.pixocraft.in/password-brute-force-calculator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems: FAQItem[] = [
    {
      question: "What is a brute-force password attack?",
      answer: "A brute-force attack is a trial-and-error method used by application programs to decode encrypted data such as passwords through exhaustive effort rather than employing intellectual strategies. It attempts every possible combination of characters until the correct one is found."
    },
    {
      question: "How long does it take to crack a password?",
      answer: "The time varies wildly based on password length, complexity, and the attacker's hardware. A simple 8-character numeric password can be cracked in milliseconds, while a 16-character random password with mixed characters would take trillions of years."
    },
    {
      question: "Is a 16-character password secure?",
      answer: "Yes, provided it is randomly generated. A random 16-character password containing letters, numbers, and symbols has over 100 bits of entropy, making it practically impossible to crack using brute-force with current technology."
    },
    {
      question: "Can hackers crack random passwords?",
      answer: "Hackers can attempt to crack random passwords, but because there are no predictable patterns, they are forced to use pure brute-force. For long random passwords, the number of combinations is so high that even the world's most powerful computers cannot exhaust the search space in a reasonable timeframe."
    },
    {
      question: "What makes a password resistant to brute force attacks?",
      answer: "Length and Entropy. Increasing the length of a password increases the number of combinations exponentially. Using a diverse character set (uppercase, lowercase, numbers, symbols) further expands the search space per character."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Password Generator", url: "/tools/password-generator" },
    { name: "Password Brute Force Calculator", url: "/password-brute-force-calculator" }
  ]);

  const relatedTools = getRelatedTools("password-generator", 6);

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Password Generator", url: "/tools/password-generator" },
            { label: "Brute Force Calculator" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header */}
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black uppercase tracking-widest border border-primary/20">
              <Gauge className="h-4 w-4" /> Security Diagnostics
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Password Brute Force Calculator <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block mt-2">Estimate Cracking Time</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Estimate how long it would take hackers to crack your password using <span className="text-foreground font-bold">brute-force attacks</span>. Learn why entropy and length are your best defenses.
            </p>
          </div>

          {/* Calculator Tool */}
          <div className="max-w-4xl mx-auto mb-20 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-25"></div>
            <Card className="relative border-2 border-primary/10 shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
                
                {/* Inputs */}
                <div className="lg:col-span-3 p-8 space-y-8 bg-card border-r">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-bold">Password Length: {length}</Label>
                      <Badge variant="outline" className="font-mono">{length} Characters</Badge>
                    </div>
                    <Slider 
                      value={[length]} 
                      onValueChange={(v) => setLength(v[0])} 
                      max={64} 
                      min={4} 
                      step={1}
                      className="py-4"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-bold">Character Set</Label>
                    <RadioGroup value={charset} onValueChange={setCharset} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.entries(charsetInfo).map(([key, info]) => (
                        <div key={key} className="flex items-center space-x-2 p-3 rounded-lg border bg-muted/30 hover:bg-muted transition-colors cursor-pointer">
                          <RadioGroupItem value={key} id={key} />
                          <Label htmlFor={key} className="cursor-pointer text-sm font-medium">{info.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-bold">Guessing Speed (Hardware Capacity)</Label>
                    <RadioGroup value={speed} onValueChange={setSpeed} className="space-y-3">
                      {Object.entries(speedInfo).map(([key, info]) => (
                        <div key={key} className="flex items-center space-x-2 p-3 rounded-lg border bg-muted/30 hover:bg-muted transition-colors cursor-pointer">
                          <RadioGroupItem value={key} id={speed+key} />
                          <Label htmlFor={speed+key} className="cursor-pointer text-sm font-medium">{info.label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>

                {/* Results */}
                <div className="lg:col-span-2 p-8 bg-muted/10 flex flex-col justify-between">
                  <div className="space-y-8">
                    <div className="text-center p-6 rounded-2xl bg-background border shadow-inner">
                      <span className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">Estimated Time to Crack</span>
                      <div className={`text-3xl md:text-4xl font-black leading-tight ${stats.isSecure ? 'text-green-600' : 'text-destructive'}`}>
                        {stats.time}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm font-medium text-muted-foreground">Entropy Bits</span>
                        <span className="font-bold">{stats.entropy} bits</span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-sm font-medium text-muted-foreground">Combinations</span>
                        <span className="font-mono text-sm font-bold">{stats.combinations}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground">Security Rating</span>
                        <Badge variant={stats.isSecure ? "default" : "destructive"}>
                          {stats.isSecure ? "Highly Secure" : "Vulnerable"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link href="/password-generator">
                      <button className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-black hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
                        Create Strong Password <Zap className="h-4 w-4 group-hover:scale-125 transition-transform" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Educational Content */}
          <section className="max-w-4xl mx-auto mb-20 space-y-12">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold mb-6">What Is a Brute Force Attack?</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                A brute-force attack attempts every possible password combination until the correct one is found. Modern password cracking systems use high-performance GPUs and specialized hardware capable of testing billions of guesses per second. Without a sufficiently complex and long password, your accounts can be compromised in minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Brute Force Attack", desc: "Exhaustive trial-and-error method testing every possible character combination.", icon: ShieldAlert },
                { title: "Dictionary Attack", desc: "Uses lists of common words, phrases, and previously leaked passwords.", icon: Database },
                { title: "Credential Stuffing", desc: "Automated injection of stolen username/password pairs into website login forms.", icon: MousePointerClick },
                { title: "Rainbow Table Attack", desc: "Using pre-computed tables of password hashes to instantly reverse encrypted values.", icon: RefreshCw }
              ].map((tech, i) => (
                <Card key={i} className="bg-card border shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <tech.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{tech.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm leading-relaxed">{tech.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Entropy Table */}
          <section className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Password Security Scale</h2>
            <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-bold">Password Length</th>
                    <th className="px-6 py-4 font-bold">Approx Entropy</th>
                    <th className="px-6 py-4 font-bold">Estimated Crack Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-6 py-4">8 characters</td>
                    <td className="px-6 py-4">~52 bits</td>
                    <td className="px-6 py-4 font-bold text-destructive">Minutes to hours</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">12 characters</td>
                    <td className="px-6 py-4">~78 bits</td>
                    <td className="px-6 py-4 font-bold text-blue-600">Years</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="px-6 py-4 font-bold">16 characters</td>
                    <td className="px-6 py-4">~105 bits</td>
                    <td className="px-6 py-4 font-black text-primary">Universe Lifespan</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">20 characters</td>
                    <td className="px-6 py-4">~131 bits</td>
                    <td className="px-6 py-4 font-black text-purple-600">Practically Impossible</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Internal Links */}
          <section className="max-w-5xl mx-auto mb-20">
            <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 text-center">
              <h2 className="text-3xl font-bold mb-4">Create Stronger Passwords Instantly</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                The best defense against brute-force attacks is using random, high-entropy passwords. Pixocraft helps you generate secure passwords that are impossible for humans to guess and machines to crack.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { label: "Military Grade", href: "/military-grade-password-generator", icon: ShieldCheck },
                  { label: "Unhackable Pass", href: "/unhackable-password-generator", icon: Lock },
                  { label: "Private Generator", href: "/private-password-generator", icon: Key },
                  { label: "Offline Mode", href: "/offline-password-generator", icon: WifiOff },
                  { label: "Secure Random", href: "/secure-random-password-generator", icon: Zap },
                  { label: "Standard Tool", href: "/password-generator", icon: Fingerprint }
                ].map((item, i) => (
                  <Link key={i} href={item.href}>
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-background border hover:border-primary transition-all hover-elevate group cursor-pointer">
                      <item.icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-4 bg-card">
                  <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Related Tools */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Explore More Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((tool) => (
                <Link key={tool.path} href={tool.path}>
                  <Card className="hover-elevate cursor-pointer h-full border-primary/5">
                    <CardHeader className="p-5">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <tool.icon className="h-5 w-5 text-primary" />
                        {tool.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}

const WifiOff = (props: any) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="2" x2="22" y1="2" y2="22" />
    <path d="M8.5 8.5a5 5 0 0 1 7 7" />
    <path d="M16.5 16.5c-1.2.9-2.7 1.5-4.5 1.5-3.3 0-6-2.7-6-6 0-1.8.6-3.3 1.5-4.5" />
    <path d="M11 11a1 1 0 0 0 1 1" />
    <path d="M1.2 6.2a15 15 0 0 1 20.9 0" />
    <path d="M22.8 17.8c-.8-1-1.7-1.8-2.7-2.6" />
  </svg>
);
