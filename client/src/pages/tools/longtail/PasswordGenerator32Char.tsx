import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, Shield, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PasswordGenerator32Char() {
  useSEO({
    title: "32 Character Password Generator (Maximum Security) – Free & Offline",
    description: "Generate a secure 32 character password instantly. Maximum security, cryptographically random, fully offline and private. No signup required.",
    keywords: "32 character password generator, strong 32 character password, secure 32 character password, 32 digit password generator, random 32 character password, maximum security password generator",
    canonicalUrl: "https://tools.pixocraft.in/32-character-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems = [
    {
      question: "Is 32 characters too long?",
      answer: "Not for enterprise or admin-level security. While 12 or 16 characters are sufficient for most consumer accounts, 32 characters provide the necessary entropy for protecting critical infrastructure and high-value assets."
    },
    {
      question: "Can 32 character passwords be cracked?",
      answer: "Not realistically if they are randomly generated. The search space of 95^32 is so astronomical that it would take trillions of years for even a massive GPU cluster to crack it through brute force."
    },
    {
      question: "Is this suitable for API keys?",
      answer: "Yes, 32+ characters are ideal for API credentials, server-to-server authentication, and encryption master keys where maximum entropy is required."
    },
    {
      question: "Does this generator store passwords?",
      answer: "No. Everything runs locally in your browser using the Web Crypto API. Your generated password never touches our servers, ensuring 100% privacy and security."
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
            { label: "32 Character Password" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              32 Character Password Generator – Maximum Security & Enterprise Protection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Need enterprise-level security for admin, API or database access? Generate a secure 32 character random password instantly using cryptographic randomness. Fully private, offline and untraceable.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API Powered</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> No Data Logging</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> Enterprise-Grade Security</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Works 100% Offline</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={32} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-4">How Strong Is a 32 Character Password?</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A 32 character password provides ~210 bits of entropy. This is the "Enterprise Security" tier, used for API keys, server-to-server authentication, and administrative root access.
              </p>
              <div className="bg-muted p-4 rounded-lg my-4 font-mono text-xl text-center">
                95^32 combinations
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With over 10^63 possible combinations, this level of entropy is future-proofed against hardware advances for decades.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Estimated Crack Time for a 32 Character Password</h2>
              <div className="overflow-hidden rounded-xl border bg-card shadow-lg mb-4">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Attack Model</th>
                      <th className="px-6 py-4 font-bold">Estimated Crack Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4 font-medium">State-Level Attack</td>
                      <td className="px-6 py-4">Longer than the age of the universe</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Theoretical Quantum Attack</td>
                      <td className="px-6 py-4">Still computationally infeasible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Note: 32 characters is the standard for high-security automation and system administration.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">When Should You Use a 32 Character Password?</h2>
              <p className="text-lg text-muted-foreground mb-4">Recommended for securing high-value assets and infrastructure:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  "API keys & Webhooks",
                  "Cloud infrastructure (AWS, Azure, GCP)",
                  "Root & Administrative credentials",
                  "Database access & Encryption keys",
                  "Cryptocurrency cold storage wallets",
                  "Enterprise security systems",
                  "Master passwords for vault managers"
                ].map(item => (
                  <li key={item} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 font-medium">
                    <Check className="h-4 w-4 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">20 vs 32 Character Password – Security Comparison</h2>
              <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Length</th>
                      <th className="px-6 py-4 font-bold">Entropy Tier</th>
                      <th className="px-6 py-4 font-bold">Recommended For</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4">20 Characters</td>
                      <td className="px-6 py-4 font-bold text-blue-600">High Security</td>
                      <td className="px-6 py-4">Banking & Business</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-bold">32 Characters</td>
                      <td className="px-6 py-4 font-bold text-purple-600">Maximum Security</td>
                      <td className="px-6 py-4">Enterprise & API Systems</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mt-4">The exponential growth in complexity means that 32 characters offer a level of protection that is orders of magnitude stronger than even high-security 20-character passwords.</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Why Offline Random Generation Is Critical</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Server-based generators introduce significant risks, including network transmission interception and server-side logging. For enterprise security, local generation is the only truly safe option.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Pixocraft's generator runs locally in your browser using the Web Crypto API. There is no server involvement, no data transmission, and no logging of your sensitive credentials.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">32 Character Password Best Practices</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Use a Password Manager</h4>
                  <p className="text-sm text-muted-foreground">32-character strings are impossible to memorize; always use a secure encrypted vault.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Never Share via Chat</h4>
                  <p className="text-sm text-muted-foreground">Avoid sending passwords through email or unencrypted messaging platforms.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Environment Variables</h4>
                  <p className="text-sm text-muted-foreground">For development, use .env files and never hardcode 32-character API keys in source code.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Regular Rotation</h4>
                  <p className="text-sm text-muted-foreground">Rotate your most critical 32-character credentials periodically to minimize risk.</p>
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
              <h2 className="text-3xl font-bold mb-4">Generate a Maximum-Security 32 Character Password Now</h2>
              <p className="text-muted-foreground mb-8">Take your security to the next level with cryptographically random enterprise-grade passwords.</p>
              <div className="flex justify-center">
                <Button size="lg" className="h-14 px-8 text-xl font-bold rounded-full hover-elevate" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Generate 32 Character Password
                </Button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t">
              <Link href="/20-character-password-generator" className="group" data-testid="link-20-char">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      20 Character
                    </CardTitle>
                    <CardDescription>High security level</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/48-character-password-generator" className="group" data-testid="link-48-char">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" />
                      48 Character
                    </CardTitle>
                    <CardDescription>Ultra security level</CardDescription>
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
