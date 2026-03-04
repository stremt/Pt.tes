import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Zap, Lock, HelpCircle, Activity, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PasswordStrengthCheckerGuide() {
  useSEO({
    title: "Password Strength Checker Guide (Test Password Security) | Pixocraft",
    description: "Learn how password strength checkers work and how to test password security. Understand entropy, cracking time, and generate stronger passwords with Pixocraft Password Generator.",
    keywords: "password strength checker, how to check password strength, test password security, password strength test, password security checker"
  });

  const faqs = [
    {
      question: "How accurate are password strength checkers?",
      answer: "Most modern checkers are highly accurate at estimating entropy and identifying common patterns. However, they provide estimates based on current computing power. Real-world security also depends on whether the service itself is compromised."
    },
    {
      question: "What is a good password strength score?",
      answer: "A score of 'Strong' or 'Very Strong' (typically 70+ bits of entropy) is recommended for most accounts. For critical accounts like banking or primary email, aim for 'Excellent' or 100+ bits."
    },
    {
      question: "Is a 16-character password secure?",
      answer: "Yes, provided it is random. A random 16-character password with mixed character types offers roughly 105 bits of entropy, which is exceptionally difficult to crack."
    },
    {
      question: "How do password strength calculators work?",
      answer: "They use mathematical formulas to calculate entropy (randomness) and check the password against databases of common words, patterns (like 'qwerty'), and previously leaked passwords."
    },
    {
      question: "Should I test my passwords online?",
      answer: "You should only use trusted tools that process your password locally in your browser. Pixocraft tools are 100% static and process everything on your device—your password is never sent to a server."
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
            { label: "Password Strength Checker Guide" },
          ]}
        />

        <article className="space-y-12 mt-8">
          {/* Hero Section */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Password Strength Checker – How to Test Password Security
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Many people believe their passwords are strong simply because they contain numbers or symbols. Real strength depends on entropy, length, and randomness.
            </p>
          </div>

          {/* Tool Section */}
          <section className="py-8">
            <div className="bg-primary/5 rounded-3xl p-4 md:p-8 border-2 border-primary/10 shadow-xl">
              <div className="mb-8 text-center space-y-2">
                <h2 className="text-2xl font-bold">Generate & Test Strong Passwords</h2>
                <p className="text-muted-foreground">The Pixocraft Password Generator creates passwords designed to score highly on modern strength checkers.</p>
              </div>
              <PasswordGeneratorTool initialLength={16} showEntropy={true} />
            </div>
          </section>

          {/* How it Works Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <Activity className="h-8 w-8 text-primary" />
                How Strength Checkers Work
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Modern password strength checkers don't just look for special characters. They perform a deep analysis of several critical factors:
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span><strong>Entropy Calculation:</strong> Measuring the mathematical randomness.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span><strong>Pattern Recognition:</strong> Identifying keyboard paths (qwerty) or sequences (123).</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span><strong>Dictionary Checks:</strong> Comparing against common words and names.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span><strong>Crack Time Estimation:</strong> Calculating time needed for a brute-force attack.</span>
                  </li>
                </ul>
              </div>
            </div>
            <Card className="bg-muted/50 border-none shadow-inner">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Lock className="h-6 w-6 text-primary" />
                  Entropy Example
                </h3>
                <div className="bg-background rounded-xl p-6 font-mono text-center border shadow-sm">
                  <p className="text-2xl font-black text-primary">2¹⁰⁵ Combinations</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A random 16-character password produces about <strong>105 bits of entropy</strong>. This makes brute-force attacks mathematically unrealistic for even the most powerful computers.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Strength Table */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Password Strength Levels</h2>
            <div className="overflow-x-auto rounded-2xl border bg-card">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-bold">Password Strength</th>
                    <th className="px-6 py-4 font-bold">Entropy Estimate</th>
                    <th className="px-6 py-4 font-bold">Security Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  <tr>
                    <td className="px-6 py-4 font-medium text-destructive">Below 40 bits</td>
                    <td className="px-6 py-4 font-mono">Weak</td>
                    <td className="px-6 py-4 text-muted-foreground">Easily cracked</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-orange-500">40–70 bits</td>
                    <td className="px-6 py-4 font-mono">Moderate</td>
                    <td className="px-6 py-4 text-muted-foreground">Vulnerable</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-green-600">70–100 bits</td>
                    <td className="px-6 py-4 font-mono">Strong</td>
                    <td className="px-6 py-4 text-muted-foreground">Difficult to crack</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-emerald-600">100+ bits</td>
                    <td className="px-6 py-4 font-mono">Very Strong</td>
                    <td className="px-6 py-4 text-muted-foreground">Extremely secure</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Test Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">How to Check Password Strength</h2>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">1</div>
                  <p className="text-muted-foreground">Enter your password into a trusted password strength checker.</p>
                </li>
                <li className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">2</div>
                  <p className="text-muted-foreground">Review entropy and cracking time estimates provided by the tool.</p>
                </li>
                <li className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">3</div>
                  <p className="text-muted-foreground">Identify structural weaknesses (like repeated characters or dictionary words).</p>
                </li>
                <li className="flex gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">4</div>
                  <p className="text-muted-foreground">Replace weak passwords with strong, random alternatives immediately.</p>
                </li>
              </ol>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Mistakes That Make Passwords Weak</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-muted-foreground"><ShieldAlert className="h-4 w-4 text-destructive" /> Using short passwords (under 12 chars)</li>
                <li className="flex items-center gap-2 text-muted-foreground"><ShieldAlert className="h-4 w-4 text-destructive" /> Including dictionary words or common names</li>
                <li className="flex items-center gap-2 text-muted-foreground"><ShieldAlert className="h-4 w-4 text-destructive" /> Using keyboard patterns (qwerty, asdf)</li>
                <li className="flex items-center gap-2 text-muted-foreground"><ShieldAlert className="h-4 w-4 text-destructive" /> Including personal info like birthdays or pets</li>
              </ul>
            </div>
          </div>

          {/* Improve Strength Section */}
          <section className="bg-muted/30 rounded-3xl p-8 md:p-12 border">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h2 className="text-3xl font-bold">How to Improve Password Strength</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <p className="font-medium">Use long passwords (16+ characters)</p>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <p className="font-medium">Use random character combinations</p>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <p className="font-medium">Avoid personal information entirely</p>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <p className="font-medium">Enable two-factor authentication (2FA)</p>
                </div>
              </div>
              <p className="text-muted-foreground pt-4">
                Random password generators are the easiest and most effective way to ensure your passwords always pass strength tests with flying colors.
              </p>
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
          <section className="pt-12 border-t space-y-8 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Create and Test Strong Passwords</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Pixocraft provides professional-grade tools for generating and testing secure passwords. 100% private and offline.
              </p>
              <Link href="/tools/password-generator">
                <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 mt-4">
                  Go to Password Generator
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              <Link href="/tools/password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold">Password Generator</Link>
              <Link href="/tools/PasswordBruteForceCalculator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold">Brute Force Calculator</Link>
              <Link href="/tools/longtail/unhackable-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold">Unhackable Password Generator</Link>
              <Link href="/tools/longtail/private-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold">Private Password Generator</Link>
              <Link href="/tools/longtail/offline-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold">Offline Password Generator</Link>
              <Link href="/tools/longtail/military-grade-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold">Military Grade Generator</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
