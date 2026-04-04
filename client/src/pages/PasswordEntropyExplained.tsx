import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Zap, Calculator, Table, Lock, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function PasswordEntropyExplained() {
  useSEO({
    title: "Password Entropy Explained (Security Guide) | Pixocraft",
    description: "Learn what password entropy means and how it determines password strength. Discover how high-entropy passwords protect accounts from brute-force attacks.",
    keywords: "password entropy explained, what is password entropy, password entropy calculator, how password entropy works, password entropy formula"
  });

  const faqs = [
    {
      question: "What does password entropy mean?",
      answer: "Password entropy is a measurement of how unpredictable a password is. It's based on the size of the character pool and the length of the password. Higher entropy means the password is more random and significantly harder for attackers to crack using brute-force methods."
    },
    {
      question: "How many bits of entropy is secure?",
      answer: "Generally, 80 bits of entropy is considered strong for most online accounts. For high-security or long-term protection, 100+ bits is recommended. Passwords with over 128 bits of entropy are currently considered computationally infeasible to crack."
    },
    {
      question: "Is a 16-character password secure?",
      answer: "A random 16-character password using uppercase, lowercase, numbers, and symbols typically provides around 105 bits of entropy, which is exceptionally secure and highly resistant to all known brute-force attacks."
    },
    {
      question: "How is password entropy calculated?",
      answer: "Entropy is calculated using the formula: E = L × log2(R), where L is the password length and R is the size of the character pool (e.g., 26 for lowercase letters, 95 for the full standard keyboard set)."
    },
    {
      question: "Why are random passwords stronger?",
      answer: "Random passwords maximize entropy by eliminating human patterns, dictionary words, and predictable sequences. This forces attackers to test every possible combination, which becomes mathematically impossible with high-entropy random passwords."
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
            { label: "Password Entropy Explained" },
          ]}
        />

        <article className="space-y-12 mt-8">
          {/* Hero Section */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Password Entropy Explained – How Password Strength Really Works
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Many people believe that password strength depends only on password length. However, true password strength is determined by <strong>entropy</strong>, which measures how unpredictable a password is.
            </p>
          </div>

          {/* Embedded Tool */}
          <section className="py-8">
            <div className="bg-primary/5 rounded-3xl p-4 md:p-8 border-2 border-primary/10 shadow-xl">
              <div className="mb-8 text-center space-y-2">
                <h2 className="text-2xl font-bold">Generate High-Entropy Passwords</h2>
                <p className="text-muted-foreground">The Pixocraft Password Generator calculates entropy automatically as you customize your settings.</p>
              </div>
              <PasswordGeneratorTool initialLength={16} showEntropy={true} />
            </div>
          </section>

          {/* Introduction Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                What Is Password Entropy?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Password entropy measures the randomness and unpredictability of a password. In the world of cybersecurity, it is the most accurate way to determine if a password can withstand a "brute-force" attack.
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span><strong>Higher combinations:</strong> More possible variants to guess.</span>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span><strong>Greater resistance:</strong> Harder for automated tools to crack.</span>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                    <span><strong>Bits of Entropy:</strong> Measured in bits, where each bit doubles the difficulty.</span>
                  </li>
                </ul>
              </div>
            </div>
            <Card className="bg-muted/50 border-none shadow-inner">
              <CardContent className="p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calculator className="h-6 w-6 text-primary" />
                  The Entropy Formula
                </h3>
                <div className="bg-background rounded-xl p-6 font-mono text-center border shadow-sm">
                  <p className="text-2xl font-black text-primary">E = L × log₂(R)</p>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p><strong>L (Password Length):</strong> Total characters in the password.</p>
                  <p><strong>R (Pool Size):</strong> Number of possible characters used.</p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2 rounded bg-background border text-xs">Lowercase (26)</div>
                    <div className="p-2 rounded bg-background border text-xs">Uppercase (26)</div>
                    <div className="p-2 rounded bg-background border text-xs">Numbers (10)</div>
                    <div className="p-2 rounded bg-background border text-xs">Symbols (~33)</div>
                  </div>
                  <p className="text-xs pt-2 italic">A full character set includes approximately 95 characters.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Entropy Example */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold">Example of Password Entropy</h2>
            <p className="text-lg text-muted-foreground">
              A random <strong>16-character password</strong> using the full character set (uppercase, lowercase, numbers, and symbols) produces approximately <strong>105 bits of entropy</strong>.
            </p>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed">
                This means there are <strong>2¹⁰⁵ possible combinations</strong>. To put that in perspective, even if an attacker could test 100 trillion passwords per second, it would still take trillions of years to guess the correct one. This makes high-entropy passwords astronomically large and effectively uncrackable.
              </p>
            </div>
          </section>

          {/* Entropy Table */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Table className="h-8 w-8 text-primary" />
              Entropy and Security Levels
            </h2>
            <div className="overflow-x-auto rounded-2xl border bg-card">
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
                    <td className="px-6 py-4">8 characters</td>
                    <td className="px-6 py-4">~52 bits</td>
                    <td className="px-6 py-4 text-destructive font-bold">Weak</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">12 characters</td>
                    <td className="px-6 py-4">~78 bits</td>
                    <td className="px-6 py-4 text-orange-500 font-bold">Strong</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">16 characters</td>
                    <td className="px-6 py-4">~105 bits</td>
                    <td className="px-6 py-4 text-green-600 font-bold">Very Strong</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">20 characters</td>
                    <td className="px-6 py-4">~131 bits</td>
                    <td className="px-6 py-4 text-emerald-600 font-bold">High Security</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">32 characters</td>
                    <td className="px-6 py-4">~210 bits</td>
                    <td className="px-6 py-4 text-primary font-bold">Extreme</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground italic text-sm">Estimates assume a full character pool of 95 characters.</p>
          </section>

          {/* How it stops hackers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Why High Entropy Stops Hackers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Modern attackers don't sit and type guesses. They use massive botnets and specialized hardware that can test billions of combinations every second. High entropy works by making the math work in your favor. By increasing the complexity beyond what automation can handle in a reasonable timeframe, you make brute-force attacks mathematically impractical.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">How to Create High-Entropy Passwords</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2 font-medium text-foreground"><CheckCircle className="h-4 w-4 text-green-500" /> Use random password generators</li>
                <li className="flex items-center gap-2 font-medium text-foreground"><CheckCircle className="h-4 w-4 text-green-500" /> Aim for at least 16 characters</li>
                <li className="flex items-center gap-2 font-medium text-foreground"><CheckCircle className="h-4 w-4 text-green-500" /> Enable all character sets (A-Z, a-z, 0-9, !@#$)</li>
                <li className="flex items-center gap-2 font-medium text-foreground"><CheckCircle className="h-4 w-4 text-green-500" /> Avoid dictionary words and personal info</li>
                <li className="flex items-center gap-2 font-medium text-foreground"><CheckCircle className="h-4 w-4 text-green-500" /> Avoid predictable patterns (e.g., Qwerty123!)</li>
              </ul>
            </div>
          </div>

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
              <h2 className="text-3xl font-bold">Generate High-Entropy Passwords Instantly</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Ready to secure your accounts? Use the Pixocraft Password Generator to create random passwords with maximum entropy and zero human predictability.
              </p>
              <Link href="/tools/password-generator">
                <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 mt-4">
                  Go to Password Generator
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-8">
              <Link href="/unhackable-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Unhackable Password Generator</Link>
              <Link href="/private-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Private Password Generator</Link>
              <Link href="/offline-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Offline Password Generator</Link>
              <Link href="/military-grade-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Military Grade Password Generator</Link>
              <Link href="/tools/password-strength-checker" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Password Strength Checker</Link>
              <Link href="/16-character-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">16-Character Generator</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}

function CheckCircle({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
