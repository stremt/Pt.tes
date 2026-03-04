import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem, generateBreadcrumbSchema } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { Check, X, ShieldCheck, Lock, WifiOff, Zap, Fingerprint, Banknote, Shield, ShieldAlert, Key, Globe, Layout, Mail, Instagram, Facebook, Landmark, Apple } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function MilitaryGradePasswordGenerator() {
  useSEO({
    title: "Military Grade Password Generator (High Security) – Pixocraft",
    description: "Generate extremely secure high-entropy passwords using cryptographic randomness. Pixocraft Password Generator creates passwords suitable for high-security accounts.",
    keywords: "military grade password generator, ultra secure password generator, maximum security password generator, strongest password generator, high security password generator",
    canonicalUrl: "https://tools.pixocraft.in/military-grade-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Pixocraft Military Grade Password Generator",
    description: "Generate extremely secure high-entropy passwords using cryptographic randomness suitable for high-security environments.",
    url: "https://tools.pixocraft.in/military-grade-password-generator",
    category: "SecurityApplication"
  });

  const faqItems: FAQItem[] = [
    {
      question: "What is a military grade password?",
      answer: "A 'military-grade' password refers to a password that meets or exceeds the cryptographic standards used by government and military organizations. This typically means a password with very high entropy (100+ bits), generated using a cryptographically secure random number generator, and consisting of a long string of mixed characters that is computationally infeasible to crack."
    },
    {
      question: "How long should a high security password be?",
      answer: "For high-security environments like banking or server administration, we recommend a minimum of 20 characters. While 12-16 characters are strong for standard accounts, 20+ characters provide exponential resistance against future computing advances and sophisticated brute-force attacks."
    },
    {
      question: "Are random passwords safer than human passwords?",
      answer: "Yes, significantly. Human-created passwords almost always contain patterns, even when users try to be 'random'. Attackers use dictionary and rule-based attacks to exploit these patterns. Cryptographically random passwords have no predictable structure, forcing attackers to use pure brute-force, which is astronomically slower."
    },
    {
      question: "Can a 20-character password be cracked?",
      answer: "With current technology, a truly random 20-character password with a full character set (approx. 131 bits of entropy) is considered uncrackable. It would take trillions of years for modern supercomputers to exhaust the possible combinations."
    },
    {
      question: "Does Pixocraft store generated passwords?",
      answer: "No. All generation happens locally in your browser using the Web Crypto API. No data is ever sent to our servers, and your passwords are wiped from memory as soon as you close the tab."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Password Generator", url: "/tools/password-generator" },
    { name: "Military Grade Password Generator", url: "/military-grade-password-generator" }
  ]);

  const relatedTools = getRelatedTools("password-generator", 6);

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
            { label: "Password Generator", url: "/tools/password-generator" },
            { label: "Military Grade Password Generator" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Hero Section */}
          <div className="text-center space-y-8 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-black uppercase tracking-widest border border-primary/20">
              <ShieldCheck className="h-4 w-4" /> Enterprise-Grade Security
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
              Military Grade Password Generator <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent block mt-2">Ultra Secure Passwords</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Generate extremely secure high-entropy passwords using <span className="text-foreground font-bold">cryptographic randomness</span>. Designed for high-security accounts and sensitive credentials.
            </p>
          </div>

          {/* Main Tool */}
          <div className="max-w-3xl mx-auto mb-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-25"></div>
            <PasswordGeneratorTool initialLength={20} />
          </div>

          {/* Concept Explanation */}
          <section className="max-w-4xl mx-auto mb-20 space-y-8">
            <div className="bg-card p-8 rounded-2xl border shadow-sm">
              <h2 className="text-3xl font-bold mb-6">What Does “Military Grade Password” Actually Mean?</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  The phrase “military-grade security” is commonly used to describe extremely strong cryptographic systems that meet standards required for protecting sensitive government data.
                </p>
                <p>
                  While no password generator can guarantee absolute security, generating long, random passwords with high entropy dramatically increases resistance to brute-force attacks. A password is considered extremely secure when it possesses:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 text-foreground font-bold">
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> High Entropy</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Long Length (20+ chars)</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> Full Character Set</li>
                  <li className="flex items-center gap-2"><Check className="h-5 w-5 text-primary" /> True Randomness</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Technical Implementation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            <Card className="bg-muted/30 border-primary/10 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl"><Lock className="h-6 w-6 text-primary" /> Cryptographic Randomness</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Pixocraft uses <code>window.crypto.getRandomValues()</code>. This browser API generates cryptographically secure random numbers (CSPRNG), ensuring true unpredictability.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="outline">Uppercase</Badge>
                  <Badge variant="outline">Lowercase</Badge>
                  <Badge variant="outline">Numbers</Badge>
                  <Badge variant="outline">Symbols</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30 border-primary/10 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl"><Zap className="h-6 w-6 text-primary" /> High-Entropy Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  A 20-character password contains approximately <strong>131 bits of entropy</strong>. This represents 2<sup>131</sup> possible combinations—a number so large it is computationally infeasible to brute-force.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Entropy Table */}
          <section className="max-w-4xl mx-auto mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Password Length & Security Level</h2>
            <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-bold">Password Length</th>
                    <th className="px-6 py-4 font-bold">Entropy Estimate</th>
                    <th className="px-6 py-4 font-bold">Security Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-6 py-4">12 characters</td>
                    <td className="px-6 py-4">~78 bits</td>
                    <td className="px-6 py-4 font-bold text-blue-600">Strong</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">16 characters</td>
                    <td className="px-6 py-4">~105 bits</td>
                    <td className="px-6 py-4 font-bold text-blue-700">Very Strong</td>
                  </tr>
                  <tr className="bg-primary/5">
                    <td className="px-6 py-4 font-bold">20 characters</td>
                    <td className="px-6 py-4">~131 bits</td>
                    <td className="px-6 py-4 font-black text-primary">High Security</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">32 characters</td>
                    <td className="px-6 py-4">~210 bits</td>
                    <td className="px-6 py-4 font-black text-purple-600">Extreme</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-muted-foreground italic text-sm">
              *Estimates based on random selection from a 94-character set (A-Z, a-z, 0-9, symbols).
            </p>
          </section>

          {/* Use Cases & Attack Resistance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">When to Use Ultra Secure Passwords?</h2>
              <div className="space-y-4">
                {[
                  { title: "Bank accounts", icon: Landmark },
                  { title: "Corporate systems", icon: Banknote },
                  { title: "API credentials", icon: Shield },
                  { title: "Cloud infrastructure", icon: Globe },
                  { title: "Cryptocurrency wallets", icon: Key }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-card border shadow-sm">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <item.icon className="h-6 w-6" />
                    </div>
                    <span className="font-bold">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Attack Resistance</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Random high-entropy passwords are the primary defense against sophisticated automated attacks:
                </p>
                <ul className="space-y-4">
                  <li className="bg-card p-4 rounded-xl border">
                    <strong className="text-foreground block mb-1">Brute-force attacks</strong>
                    Trying every possible combination. With 131 bits of entropy, this is mathematically impossible in a human lifetime.
                  </li>
                  <li className="bg-card p-4 rounded-xl border">
                    <strong className="text-foreground block mb-1">Dictionary attacks</strong>
                    Using lists of common words and phrases. Purely random passwords contain no words, rendering these attacks useless.
                  </li>
                  <li className="bg-card p-4 rounded-xl border">
                    <strong className="text-foreground block mb-1">Credential stuffing</strong>
                    Using leaked passwords from other sites. Unique random passwords ensure one breach doesn't affect other accounts.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Best Practices */}
          <section className="max-w-4xl mx-auto mb-20">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2"><ShieldCheck className="h-8 w-8 text-primary" /> Best Practices for Maximum Security</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Use at least 20 characters for sensitive accounts",
                  "Enable all character sets (letters, numbers, symbols)",
                  "Always enable Two-Factor Authentication (2FA)",
                  "Store passwords in a reputable password manager",
                  "Never reuse passwords across different services",
                  "Generate new passwords for every single account"
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3 text-lg font-medium">
                    <Check className="h-6 w-6 text-green-600 mt-0.5 shrink-0" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Specialized Links */}
          <section className="mb-20">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Generate Secure Passwords for Different Accounts</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Gmail Password", url: "/strong-password-for-gmail", icon: Mail },
                  { title: "Instagram Password", url: "/strong-password-for-instagram", icon: Instagram },
                  { title: "Facebook Password", url: "/strong-password-for-facebook", icon: Facebook },
                  { title: "Banking Password", url: "/banking-password-generator", icon: Landmark },
                  { title: "Apple ID Password", url: "/apple-id-password-generator", icon: Apple },
                  { title: "Standard Generator", url: "/password-generator", icon: ShieldCheck }
                ].map((tool, i) => (
                  <Link key={i} href={tool.url} className="group">
                    <Card className="hover-elevate transition-all border-primary/5 h-full">
                      <CardHeader className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <tool.icon className="h-5 w-5" />
                          </div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">{tool.title}</CardTitle>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                {[
                  { label: "Unhackable", href: "/unhackable-password-generator" },
                  { label: "Private", href: "/private-password-generator" },
                  { label: "Offline", href: "/offline-password-generator" },
                  { label: "Secure Random", href: "/secure-random-password-generator" },
                  { label: "20 Characters", href: "/20-character-password-generator" }
                ].map((item) => (
                  <Link key={item.href} href={item.href} className="text-center p-3 rounded-lg border hover:border-primary text-sm font-bold transition-all hover-elevate bg-card">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
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
