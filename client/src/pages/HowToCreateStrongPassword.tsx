import { useSEO } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ShieldCheck, Zap, Lock, HelpCircle, CheckCircle2, XCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HowToCreateStrongPassword() {
  useSEO({
    title: "How to Create Strong Password (Security Guide) | Pixocraft",
    description: "Learn how to create strong passwords that protect your accounts from hackers. Discover best practices and generate secure passwords with Pixocraft Password Generator.",
    keywords: "how to create strong password, how to make strong password, strong password tips, password creation guide, secure password ideas"
  });

  const faqs = [
    {
      question: "How long should a strong password be?",
      answer: "A strong password should be at least 12 characters long, but 16 or more characters is highly recommended for critical accounts like email, banking, and social media."
    },
    {
      question: "What is the strongest type of password?",
      answer: "A completely random string of uppercase letters, lowercase letters, numbers, and symbols is the strongest type of password because it has the highest entropy and no predictable patterns."
    },
    {
      question: "Are random passwords safer than human passwords?",
      answer: "Yes. Humans are predictable and often use words, names, or keyboard patterns that hackers specifically target. Random passwords eliminate these vulnerabilities."
    },
    {
      question: "Can hackers crack strong passwords?",
      answer: "While theoretically possible, a high-entropy 16-character random password would take trillions of years to crack with current technology, making it effectively uncrackable."
    },
    {
      question: "Should I reuse passwords?",
      answer: "Never. If one website is breached, hackers will try that same password on all your other accounts. Use a unique, strong password for every service."
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
            { label: "How to Create Strong Password" },
          ]}
        />

        <article className="space-y-12 mt-8">
          {/* Hero Section */}
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              How to Create Strong Passwords – Complete Security Guide
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Many people use weak passwords without realizing how easily they can be hacked. Creating strong passwords significantly reduces the risk of account compromise.
            </p>
          </div>

          {/* Embedded Tool */}
          <section className="py-8">
            <div className="bg-primary/5 rounded-3xl p-4 md:p-8 border-2 border-primary/10 shadow-xl">
              <div className="mb-8 text-center space-y-2">
                <h2 className="text-2xl font-bold text-primary">Generate Strong Passwords Instantly</h2>
                <p className="text-muted-foreground">The Pixocraft Password Generator automatically creates high-entropy secure passwords that are extremely difficult to crack.</p>
              </div>
              <PasswordGeneratorTool initialLength={16} showEntropy={true} />
            </div>
          </section>

          {/* Characteristics Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-primary" />
                What Makes a Password Strong?
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  A strong password is your first line of defense against cyberattacks. To be truly secure, a password must possess specific characteristics that make it unpredictable for both humans and machines.
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span><strong>Long Length:</strong> Aim for 16+ characters to maximize complexity.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span><strong>Mixed Types:</strong> Use uppercase, lowercase, numbers, and symbols.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span><strong>Random Structure:</strong> Avoid any patterns, words, or sequences.</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-1" />
                    <span><strong>No Personal Info:</strong> Never include names, dates, or pets.</span>
                  </li>
                </ul>
              </div>
            </div>
            <Card className="bg-muted/50 border-none shadow-inner">
              <CardContent className="p-8 space-y-6 text-center">
                <h3 className="text-xl font-bold">Randomness is Key</h3>
                <div className="p-6 bg-background rounded-2xl border-2 border-primary/10 shadow-sm font-mono text-primary text-xl font-black break-all">
                  G7!mR#4pK9@Zx2
                </div>
                <p className="text-sm text-muted-foreground italic">
                  Random passwords contain no predictable patterns, making them significantly harder to crack than human-created ones.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Comparison Section */}
          <section className="space-y-8">
            <h2 className="text-3xl font-bold text-center">Weak vs Strong Passwords</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-destructive/20 bg-destructive/5">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <XCircle className="h-5 w-5" /> Weak Passwords
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                    <code className="font-mono">password123</code>
                    <span className="text-xs text-muted-foreground">Common Word</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                    <code className="font-mono">john1985</code>
                    <span className="text-xs text-muted-foreground">Personal Info</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                    <code className="font-mono">qwerty123</code>
                    <span className="text-xs text-muted-foreground">Pattern</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-background rounded-lg border">
                    <code className="font-mono">letmein</code>
                    <span className="text-xs text-muted-foreground">Dictionary</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-green-500/20 bg-green-500/5">
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" /> Strong Passwords
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-background rounded-lg border font-mono text-center">
                    G7!mR#4pK9@Zx2
                  </div>
                  <div className="p-3 bg-background rounded-lg border font-mono text-center">
                    #9v$K2pL!qA7zW
                  </div>
                  <div className="p-3 bg-background rounded-lg border font-mono text-center">
                    8*N2m$P!L9qR#x
                  </div>
                  <p className="text-xs text-muted-foreground text-center italic pt-2">
                    Generated random passwords are computationally infeasible to crack.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Length Importance Section */}
          <section className="bg-primary/5 rounded-3xl p-8 md:p-12 border">
            <div className="max-w-3xl mx-auto space-y-6 text-center">
              <h2 className="text-3xl font-bold">Why Password Length Matters</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every extra character you add to your password increases the number of possible combinations exponentially. This measurement of randomness is called <strong>Entropy</strong>.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-left">
                <div className="p-6 bg-background rounded-2xl border shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">16-Character Random</p>
                  <p className="text-3xl font-black">~105 BITS</p>
                  <p className="text-xs text-muted-foreground mt-2">Provides 2¹⁰⁵ possible combinations. Cracking this is mathematically unrealistic.</p>
                </div>
                <div className="p-6 bg-background rounded-2xl border shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-widest text-destructive mb-2">8-Character Random</p>
                  <p className="text-3xl font-black">~52 BITS</p>
                  <p className="text-xs text-muted-foreground mt-2">Significantly easier to brute-force with modern high-speed hardware.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Mistakes & Best Practices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Mistakes to Avoid</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Lock className="h-5 w-5 text-destructive shrink-0 mt-1" />
                  <div>
                    <p className="font-bold">Using short passwords</p>
                    <p className="text-sm text-muted-foreground">Anything under 12 characters is increasingly vulnerable.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Lock className="h-5 w-5 text-destructive shrink-0 mt-1" />
                  <div>
                    <p className="font-bold">Using personal information</p>
                    <p className="text-sm text-muted-foreground">Names and birthdates are the first things hackers test.</p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Lock className="h-5 w-5 text-destructive shrink-0 mt-1" />
                  <div>
                    <p className="font-bold">Reusing passwords</p>
                    <p className="text-sm text-muted-foreground">One breach could compromise all your accounts.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Security Best Practices</h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <p className="font-medium text-foreground">Use 16 or more characters for all accounts</p>
                </li>
                <li className="flex gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <p className="font-medium text-foreground">Enable two-factor authentication (2FA)</p>
                </li>
                <li className="flex gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <p className="font-medium text-foreground">Use a trusted password manager</p>
                </li>
                <li className="flex gap-3">
                  <Zap className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <p className="font-medium text-foreground">Avoid reusing passwords across websites</p>
                </li>
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

          {/* Footer Navigation */}
          <section className="pt-12 border-t space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold">Start Creating Secure Passwords Now</h2>
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
              <Link href="/password-brute-force-calculator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Brute Force Calculator</Link>
              <Link href="/military-grade-password-generator" className="p-4 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors text-sm font-bold text-center">Military Grade Generator</Link>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
