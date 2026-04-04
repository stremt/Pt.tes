import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ShieldAlert, User, Repeat, Type, Keyboard, CheckCircle, ShieldCheck, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CommonPasswordMistakes() {
  useSEO({
    title: "Common Password Mistakes (Security Guide) | Pixocraft",
    description: "Discover the most common password mistakes that lead to hacked accounts. Learn how to create stronger passwords using the Pixocraft Password Generator.",
    keywords: "common password mistakes, weak password examples, worst passwords, bad password habits, why passwords get hacked"
  });

  const faqs = [
    {
      question: "What are the most common password mistakes?",
      answer: "The most common mistakes include using short passwords (under 12 characters), using personal information (names, birthdays), reusing the same password across multiple sites, and choosing common words or simple keyboard patterns."
    },
    {
      question: "Why are weak passwords dangerous?",
      answer: "Weak passwords are easy for hackers to guess using automated tools. Since many people reuse passwords, a single weak password can give an attacker access to your email, banking, and social media accounts simultaneously."
    },
    {
      question: "How do hackers guess passwords?",
      answer: "Hackers use several methods: Brute-force (testing every combination), Dictionary attacks (testing common words and phrases), and Credential Stuffing (using passwords stolen from other data breaches)."
    },
    {
      question: "What is a secure password length?",
      answer: "For modern security, a minimum of 12 characters is recommended. However, 16 or more characters provide significantly higher protection against advanced cracking attempts."
    },
    {
      question: "Should I reuse passwords across sites?",
      answer: "No. Password reuse is one of the biggest security risks. You should use a unique, random password for every single account. A password manager can help you keep track of these unique passwords."
    }
  ];

  const mistakes = [
    {
      title: "Using Short Passwords",
      description: "Passwords shorter than 12 characters are significantly easier to crack using brute-force attacks. Longer passwords increase entropy and make cracking exponentially harder.",
      icon: <Type className="h-6 w-6 text-destructive" />
    },
    {
      title: "Using Personal Information",
      description: "Including names, birthdates, or pet names makes your password predictable. Hackers often gather this information from social media profiles to customize their attacks.",
      icon: <User className="h-6 w-6 text-destructive" />
    },
    {
      title: "Reusing Passwords",
      description: "Using the same password across multiple websites creates a major security risk. If one site suffers a data breach, attackers can access all your other accounts.",
      icon: <Repeat className="h-6 w-6 text-destructive" />
    },
    {
      title: "Using Common Words",
      description: "Passwords like 'password', '123456', and 'admin' appear in every hacker's dictionary. These are tested first and cracked instantly.",
      icon: <ShieldAlert className="h-6 w-6 text-destructive" />
    },
    {
      title: "Simple Pattern Passwords",
      description: "Keyboard patterns like 'qwerty123' or 'asdfgh' are extremely common and are among the first patterns automated tools guess.",
      icon: <Keyboard className="h-6 w-6 text-destructive" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <div className="container mx-auto px-4 max-w-5xl py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Password Generator", url: "/tools/password-generator" },
            { label: "Common Password Mistakes" },
          ]}
        />

        <article className="space-y-12 mt-8">
          {/* Hero Section */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Common Password Mistakes – Why Weak Passwords Get Hacked
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Many people believe their passwords are secure, but small mistakes can make accounts extremely vulnerable. Cybercriminals often exploit predictable habits rather than sophisticated hacking techniques.
            </p>
          </div>

          {/* Tool Section */}
          <section className="py-8">
            <div className="bg-primary/5 rounded-3xl p-4 md:p-8 border-2 border-primary/10 shadow-xl">
              <div className="mb-8 text-center space-y-2">
                <h2 className="text-2xl font-bold">Avoid Mistakes with Random Passwords</h2>
                <p className="text-muted-foreground">The Pixocraft Password Generator creates secure, random passwords that eliminate human predictability.</p>
              </div>
              <PasswordGeneratorTool initialLength={16} showEntropy={true} />
            </div>
          </section>

          {/* Main Section: Common Mistakes */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">The Most Common Password Mistakes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mistakes.map((mistake, index) => (
                <Card key={index} className="border-none bg-muted/30 shadow-sm hover-elevate transition-all">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-xl bg-destructive/10 flex items-center justify-center mb-2">
                      {mistake.icon}
                    </div>
                    <CardTitle className="text-xl">{mistake.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {mistake.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Examples Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Examples of Weak Passwords</h2>
              <div className="space-y-4">
                {[
                  { pass: "123456", reason: "Most common password worldwide" },
                  { pass: "password123", reason: "Extremely predictable pattern" },
                  { pass: "letmein", reason: "Common phrase in dictionaries" },
                  { pass: "admin123", reason: "Standard default tested by bots" },
                  { pass: "qwerty2024", reason: "Keyboard pattern + current year" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card shadow-sm">
                    <code className="font-mono font-bold text-destructive">{item.pass}</code>
                    <span className="text-xs text-muted-foreground">{item.reason}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground">
                These passwords are often cracked in less than a second using standard hacking tools.
              </p>
            </div>
            <Card className="bg-primary/5 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  Why Randomness Matters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A 16-character random password provides about <strong>105 bits of entropy</strong>, resulting in <strong>2¹⁰⁵ possible combinations</strong>.
                </p>
                <div className="p-4 bg-background rounded-lg border font-mono text-xs break-all">
                  Example: G7#kL9@p2!mN5*qR
                </div>
                <p className="text-sm text-muted-foreground">
                  Predictable patterns can be guessed by software; true randomness cannot.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Exploitation Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">How Hackers Exploit Weak Passwords</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Dictionary Attacks</h3>
                <p className="text-sm text-muted-foreground">Automated software tests hundreds of thousands of words, phrases, and common variations in seconds.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Credential Stuffing</h3>
                <p className="text-sm text-muted-foreground">Hackers use usernames and passwords stolen from one breach to try and log into thousands of other sites.</p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">Brute-Force Attacks</h3>
                <p className="text-sm text-muted-foreground">Powerful computers test every possible combination of characters until they find the right one.</p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl font-bold text-center">How to Avoid Common Password Mistakes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Use random passwords",
                  "Use at least 16 characters",
                  "Use full character sets",
                  "Avoid personal information",
                  "Use a unique password for every site",
                  "Enable two-factor authentication (2FA)"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    <span className="font-medium">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <HelpCircle className="h-8 w-8 text-primary" />
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-xl px-6 bg-card">
                  <AccordionTrigger className="hover:no-underline py-4 font-bold text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* CTA & Internal Links */}
          <section className="pt-12 border-t space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Create Strong Passwords Instantly</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Don't leave your security to chance. Use the Pixocraft Password Generator to create secure random passwords that avoid all common mistakes.
              </p>
              <Link href="/tools/password-generator">
                <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 mt-4">
                  Go to Password Generator
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              <Link href="/tools/password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Password Generator</Link>
              <Link href="/unhackable-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Unhackable Password Generator</Link>
              <Link href="/private-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Private Password Generator</Link>
              <Link href="/offline-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Offline Password Generator</Link>
              <Link href="/military-grade-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Military Grade Generator</Link>
              <Link href="/password-brute-force-calculator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Brute Force Calculator</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
