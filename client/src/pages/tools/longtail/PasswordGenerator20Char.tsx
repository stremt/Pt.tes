import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, generateBreadcrumbSchema, OG_IMAGES } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, Shield, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PasswordGenerator20Char() {
  useSEO({
    title: "20 Character Password Generator (High Security & Uncrackable) – Free",
    description: "Generate a strong 20 character password instantly. High-security, cryptographically random, 100% private and offline. No signup required.",
    keywords: "20 character password generator, strong 20 character password, secure 20 character password, 20 digit password generator, random 20 character password, high security password generator",
    canonicalUrl: "https://tools.pixocraft.in/20-character-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems = [
    {
      question: "Is 20 characters overkill?",
      answer: "Not for financial or business accounts. In high-stakes environments, the extra entropy provides a critical safety margin against future computing advances."
    },
    {
      question: "Can hackers realistically crack a 20 character password?",
      answer: "Not if it is randomly generated and uses a full character set. The search space is so vast that it remains computationally infeasible for any modern or near-future technology."
    },
    {
      question: "Should I use 20 characters for crypto wallets?",
      answer: "Yes. Higher entropy reduces brute-force risk significantly, which is essential for protecting decentralized assets where recovery is impossible."
    },
    {
      question: "Is this generator safe for high-security accounts?",
      answer: "Yes. It runs locally in your browser using cryptographic standards (Web Crypto API), meaning your password never leaves your device."
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
            { label: "20 Character Password" },
          ]}
        />
      </div>

      <StructuredData data={generateSoftwareApplicationSchema({
        name: "20 Character Password Generator",
        description: "Generate secure 20 character passwords instantly using Web Crypto API.",
        url: "https://tools.pixocraft.in/20-character-password-generator",
        category: "SecurityApplication"
      })} />
      <StructuredData data={generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Tools", url: "/tools" },
        { name: "Password Generator", url: "/tools/password-generator" },
        { name: "20 Character Password", url: "/20-character-password-generator" }
      ])} />

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              20 Character Password Generator – High Security & Maximum Protection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Need maximum protection for banking, crypto or business accounts? Generate a secure 20 character random password instantly using cryptographic randomness. Fully private and works offline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API Powered</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> Zero Data Collection</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> No Signup Required</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Enterprise-Level Security</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={20} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-4">How Secure Is a 20 Character Password?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A 20 character password provides ~131 bits of entropy. This moves security into the "High Security" tier, which is effectively immune to brute-force attacks for the foreseeable future.
              </p>
              <div className="bg-muted p-4 rounded-lg my-4 font-mono text-xl text-center">
                95^20 combinations
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The massive search space ensures that even with the most powerful clusters, guessing a 20-character random string is computationally infeasible.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Estimated Crack Time for a 20 Character Password</h2>
              <div className="overflow-hidden rounded-xl border bg-card shadow-lg mb-4">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Attack Type</th>
                      <th className="px-6 py-4 font-bold">Estimated Crack Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4 font-medium">Massive GPU Cluster</td>
                      <td className="px-6 py-4">Longer than the age of the universe</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">State-Level Attack</td>
                      <td className="px-6 py-4">Computationally infeasible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Note: 20 characters is recommended for financial systems and recovery codes.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">When Should You Use a 20 Character Password?</h2>
              <p className="text-lg text-muted-foreground mb-4">A 20-character length is highly recommended for the following high-stakes use cases:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  "Online banking & Financial systems",
                  "Cryptocurrency exchanges & Wallets",
                  "Cloud infrastructure admin panels",
                  "Business & Enterprise dashboards",
                  "Master passwords for managers",
                  "API keys for production systems",
                  "Enterprise email & Communication"
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 font-medium">
                    <Check className="h-4 w-4 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">16 vs 20 vs 32 Character Password Comparison</h2>
              <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Length</th>
                      <th className="px-6 py-4 font-bold">Security Tier</th>
                      <th className="px-6 py-4 font-bold">Best Use Case</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4">16 Characters</td>
                      <td className="px-6 py-4 font-bold text-green-600">Strong</td>
                      <td className="px-6 py-4">Email & Social Media</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold">20 Characters</td>
                      <td className="px-6 py-4 font-bold text-blue-600">High Security</td>
                      <td className="px-6 py-4">Banking & Business</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">32 Characters</td>
                      <td className="px-6 py-4 font-bold text-purple-600">Enterprise</td>
                      <td className="px-6 py-4">Admin & API Systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mt-4">The exponential growth per character means that while 16 is strong, 20 characters offer a massive increase in the safety margin for professional environments. Use our <Link href="/tools/password-strength-checker" className="text-primary font-bold hover:underline">Strength Checker</Link> to validate your keys.</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Why Random Generation Is Critical</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Length alone isn't enough; randomness is the key. Pattern-based passwords, dictionary words, and predictable substitutions (like '0' for 'o') are easily cracked by modern algorithms. 
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pixocraft uses the Web Crypto API to ensure true cryptographic randomness. Since the generation happens entirely offline in your browser, there is zero transmission risk, no server storage, and no logging of your sensitive data.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">20 Character Password Best Practices</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Include Symbols</h4>
                  <p className="text-sm text-muted-foreground">Always use a mix of special characters to maximize the character pool.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Never Reuse</h4>
                  <p className="text-sm text-muted-foreground">Unique passwords for every account prevent credential stuffing attacks.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Use a Manager</h4>
                  <p className="text-sm text-muted-foreground">Store your 20-character passwords in a trusted encrypted vault.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Enable 2FA</h4>
                  <p className="text-sm text-muted-foreground">Always use Two-Factor Authentication as a second line of defense.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i} className="border-b pb-6">
                    <h3 className="text-xl font-bold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="text-center py-12 border-t mt-12">
              <h2 className="text-3xl font-bold mb-4">Generate a High-Security 20 Character Password Now</h2>
              <p className="text-muted-foreground mb-8">Secure your banking, crypto, and enterprise accounts with cryptographic randomness.</p>
              <div className="flex justify-center">
                <Button size="lg" className="h-14 px-8 text-xl font-bold rounded-full hover-elevate" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Generate 20 Character Password
                </Button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t">
              <Link href="/16-character-password-generator" className="group" data-testid="link-16-char">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      16 Character
                    </CardTitle>
                    <CardDescription>Strong security level</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/32-character-password-generator" className="group" data-testid="link-32-char">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      32 Character
                    </CardTitle>
                    <CardDescription>Enterprise security level</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/tools/password-generator" className="group" data-testid="link-main-gen">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      Main Generator
                    </CardTitle>
                    <CardDescription>Custom length tool</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/tools/password-strength-checker" className="group" data-testid="link-checker">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      Strength Checker
                    </CardTitle>
                    <CardDescription>Verify your security</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
