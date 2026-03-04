import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem, generateBreadcrumbSchema } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { Copy, RefreshCw, Lock, Check, X, Shield, ShieldCheck, Users, Briefcase, Info, Mail, CreditCard, Code, WifiOff, Zap, Instagram, Facebook, Apple, Landmark, User, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Strong Password Generator (Free, Secure, No Signup) – 2026",
    description: "Generate secure random passwords instantly using Web Crypto API. 100% private, works offline, no signup required. Create 12–32 character strong passwords safely.",
    keywords: "strong password generator, password generator free, random password generator, secure password generator, password generator no signup, offline password generator, 16 character password generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Pixocraft Strong Password Generator",
    description: "Generate secure random passwords instantly using Web Crypto API. 100% private and offline.",
    url: "https://tools.pixocraft.in/tools/password-generator",
    category: "SecurityApplication"
  });

  const comparisonData = [
    { feature: "Runs Fully Offline", pixocraft: true, others: false },
    { feature: "Stores Passwords", pixocraft: false, others: true },
    { feature: "Requires Signup", pixocraft: false, others: true },
    { feature: "Uses Web Crypto API", pixocraft: true, others: false },
    { feature: "Tracks Users", pixocraft: false, others: true },
  ];

  const getEstimatedCrackTime = (entropy: number) => {
    const combinations = Math.pow(2, entropy);
    const seconds = combinations / 1e12;
    
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    
    const years = seconds / 31536000;
    if (years < 1000) return `${Math.round(years)} years`;
    if (years < 1000000) return `${Math.round(years / 1000)} thousand years`;
    if (years < 1000000000) return `${Math.round(years / 1000000)} million years`;
    if (years < 1e12) return `~${(years / 1e9).toFixed(1)} billion years`;
    
    return "Longer than the age of the universe";
  };

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied Successfully",
        description: "Your secure password is ready to use",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedTools = getRelatedTools("password-generator");

  const faqItems: FAQItem[] = [
    {
      question: "Is an online password generator safe to use?",
      answer: "Yes, when the generator runs entirely in your browser like ours. This password generator uses the Web Crypto API for cryptographically secure randomization and never transmits passwords to any server. Your passwords are never stored, logged, or tracked. Once you close the page, they're gone completely. This is the safest method to generate passwords online."
    },
    {
      question: "Can hackers crack randomly generated passwords?",
      answer: "Randomly generated passwords with sufficient length and complexity are virtually uncrackable. A 16-character password with mixed characters has over 10^28 possible combinations. At one trillion guesses per second, cracking it would take longer than the age of the universe. The key factors are true randomness (which our generator provides) and sufficient length (12+ characters minimum)."
    },
    {
      question: "What is the best password length for security?",
      answer: "For standard accounts, 12-16 characters is recommended by security experts including NIST. For high-security accounts like banking, email, and work systems, use 16-24 characters. Every additional character exponentially increases the difficulty of cracking. Our generator supports up to 32 characters for maximum protection."
    },
    {
      question: "Should I use different passwords for every account?",
      answer: "Absolutely. Password reuse is one of the biggest security risks. If one service is breached and you've used the same password elsewhere, attackers can access all your accounts (credential stuffing). Always generate a unique password for each account and store them securely in a password manager."
    },
    {
      question: "Are passwords generated by this tool stored anywhere?",
      answer: "No, never. All password generation happens locally in your browser using JavaScript. We have zero access to your passwords - there are no server requests, no logging, no tracking, and no database storage. Your passwords exist only on your screen until you copy them or refresh the page."
    },
    {
      question: "How should I store my generated passwords securely?",
      answer: "Use a reputable password manager like Bitwarden, 1Password, LastPass, or Dashlane. These tools encrypt your passwords and sync them securely across devices. Never store passwords in plain text files, emails, browser notes, or written on paper. Enable two-factor authentication on your password manager for extra security."
    },
    {
      question: "What makes a password strong and secure?",
      answer: "A strong password has three key characteristics: length (at least 12-16 characters), complexity (mix of uppercase, lowercase, numbers, and symbols), and uniqueness (different for each account). Our generator creates passwords with over 10^28 possible combinations for a 16-character password, making them virtually impossible to crack."
    },
    {
      question: "How often should I change my passwords?",
      answer: "Modern security guidance from NIST suggests changing passwords only when there's a specific reason (breach notification, suspected compromise, shared with someone). For critical accounts, periodic changes every 6-12 months are still recommended. Always change passwords immediately if you receive a breach notification from any service."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Password Generator", url: "/tools/password-generator" }
  ]);
  
  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareSchema} />
      <StructuredData data={breadcrumbSchema} />
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Privacy Tools", url: "/tools/privacy" },
            { label: "Password Generator" },
          ]}
        />
      </div>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Page Header */}
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black uppercase tracking-widest animate-pulse border border-primary/20">
              <Zap className="h-4 w-4" /> 2026 Enhanced Security Edition
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Strong Password Generator <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block mt-2">100% Private & Secure</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Generate cryptographically secure random passwords instantly using <span className="text-foreground font-bold">Web Crypto API</span>. No signup, no tracking, works fully offline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-green-500/10 text-green-600 dark:text-green-400 font-bold border border-green-500/20">
                <ShieldCheck className="h-4 w-4" /> Web Crypto API
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                <WifiOff className="h-4 w-4" /> Works Offline
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-500/10 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/20">
                <Lock className="h-4 w-4" /> Zero Logging
              </div>
            </div>
          </div>

          {/* Trust Badge Section */}
          <div className="flex flex-col items-center justify-center space-y-2 mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trusted by developers, businesses & privacy-focused users</p>
            <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
              <Code className="h-6 w-6" />
              <Briefcase className="h-6 w-6" />
              <Shield className="h-6 w-6" />
              <Users className="h-6 w-6" />
            </div>
          </div>

          {/* Main Tool Interface */}
          <div className="max-w-3xl mx-auto mb-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <PasswordGeneratorTool initialLength={16} />
          </div>

          {/* New Optimized Links Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Specialized Password Generators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Gmail Password", desc: "Secure your Google ecosystem", url: "/strong-password-for-gmail", icon: Mail },
                  { title: "Instagram Password", desc: "Protect your creator brand", url: "/strong-password-for-instagram", icon: Instagram },
                  { title: "Facebook Password", desc: "Social profile defense", url: "/strong-password-for-facebook", icon: Facebook },
                  { title: "Banking Password", desc: "Financial-grade security", url: "/banking-password-generator", icon: Landmark },
                  { title: "Apple ID Password", desc: "Secure your iCloud data", url: "/apple-id-password-generator", icon: Apple }
                ].map((tool, i) => (
                  <Link key={i} href={tool.url} className="group">
                    <Card className="hover-elevate transition-all border-primary/5">
                      <CardHeader className="p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <tool.icon className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                        </div>
                        <CardDescription>{tool.desc}</CardDescription>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison Table Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Pixocraft Password Generator is More Private</h2>
            <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border bg-card shadow-lg">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-bold">Feature</th>
                    <th className="px-6 py-4 font-bold text-primary">Pixocraft</th>
                    <th className="px-6 py-4 font-bold text-muted-foreground">Most Online Generators</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{row.feature}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-green-600 font-bold">
                          {row.pixocraft ? <Check className="h-5 w-5" /> : <X className="h-5 w-5 text-destructive" />}
                          {row.pixocraft ? "Yes" : "Never"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {row.others ? <X className="h-5 w-5 text-destructive" /> : <Check className="h-5 w-5 text-green-600" />}
                          {row.others ? "Often / Sometimes" : "No"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Password Recommendations by Account Type */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Password Recommendations by Account Type</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Different accounts require different levels of security. Here's what security experts recommend:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-center">Email & Social Media</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Minimum: 12-14 characters</li>
                    <li>Include: Letters, numbers, symbols</li>
                    <li>Always enable 2FA</li>
                    <li>Use unique passwords per account</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-center">Banking & Work Accounts</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Minimum: 16-20 characters</li>
                    <li>Maximum complexity required</li>
                    <li>Change every 6-12 months</li>
                    <li>Never reuse across services</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-center">Developer & API Credentials</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Minimum: 20-32 characters</li>
                    <li>Include all character types</li>
                    <li>Store in environment variables</li>
                    <li>Rotate periodically or on exposure</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              After generating your password, verify its security with our <Link href="/tools/password-strength-checker" className="text-primary hover:underline">Password Strength Checker</Link>.
            </p>
          </section>

          {/* Who Should Use This Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Who Uses This Password Generator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Everyday Users</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure your personal email, social media, shopping sites, and streaming accounts with unique strong passwords.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Businesses</h3>
                  <p className="text-sm text-muted-foreground">
                    Protect company accounts, databases, and sensitive business information from unauthorized access.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Developers</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate secure API keys, database passwords, and credentials for development and production environments.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Students</h3>
                  <p className="text-sm text-muted-foreground">
                    Protect your university accounts, cloud storage, and learning platforms from hackers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Internal Linking Cluster */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Specific Password Length Generators</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { length: 12, label: "12 Characters", href: "/12-character-password-generator" },
                { length: 16, label: "16 Characters", href: "/16-character-password-generator" },
                { length: 20, label: "20 Characters", href: "/20-character-password-generator" },
                { length: 32, label: "32 Characters", href: "/32-character-password-generator" },
              ].map((item) => (
                <Link key={item.length} href={item.href} className="flex flex-col items-center justify-center p-4 rounded-xl border bg-card hover:border-primary transition-all hover-elevate group text-center">
                  <div className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-bold group-hover:text-primary transition-colors">{item.label}</span>
                </Link>
              ))}
            </div>
          </section>

          {/* SEO Content Section */}
          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-12">
            <div className="bg-card p-8 rounded-2xl border">
              <h2 className="text-3xl font-bold mb-4">How Our Secure Password Generator Works</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Unlike traditional generators that use <code>Math.random()</code>, which is predictable and not suitable for security, our tool uses the <strong>Web Crypto API</strong> (<code>window.crypto.getRandomValues</code>). This provides <strong>cryptographically secure pseudo-random numbers (CSPRNG)</strong>, ensuring that your passwords have maximum entropy and are computationally infeasible to crack with current technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Lock className="h-5 w-5 text-primary" /> 100% Private & Offline</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your privacy is our priority. This tool runs entirely in your browser. No data is sent to our servers, no passwords are logged, and no tracking is used. You can even use this tool while offline.
                </p>
              </section>
              <section>
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Uncrackable Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  A 16-character password generated here has more combinations than there are atoms in the observable universe. It would take current supercomputers trillions of years to crack.
                </p>
              </section>
            </div>

            <section className="bg-muted/30 p-8 rounded-2xl border border-primary/10">
              <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <AccordionItem key={i} value={`faq-${i}`} className="border-b-primary/10">
                    <AccordionTrigger className="text-left font-bold hover:text-primary transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </section>

          {/* Related Tools */}
          <section className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center">More Privacy & Security Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTools.map((tool) => (
                <Link key={tool.id} href={tool.url}>
                  <Card className="hover-elevate transition-all border-primary/5">
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          <tool.icon className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                      </div>
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
