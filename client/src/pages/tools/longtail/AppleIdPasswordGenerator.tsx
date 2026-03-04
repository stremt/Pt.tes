import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, Shield, ArrowRight, Apple, ShieldAlert, Key, Smartphone, AlertCircle, Info, Laptop, Tablet, CreditCard } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AppleIdPasswordGenerator() {
  const faqItems: FAQItem[] = [
    {
      question: "Is 12 characters enough for Apple ID?",
      answer: "While Apple's minimum is lower, 12 characters is the modern baseline for security. However, for an account that controls your entire device ecosystem and backups, 16+ characters is strongly recommended to provide a much higher entropy level."
    },
    {
      question: "Can Apple accounts be hacked even with strong passwords?",
      answer: "A randomly generated 16+ character password makes brute-force attacks effectively impossible. However, 'social engineering' and phishing (fake Apple security alerts) remain risks. Always combine a strong password with Apple's built-in Two-Factor Authentication."
    },
    {
      question: "Should developers use longer passwords?",
      answer: "Yes. Apple Developer accounts and those with administrative access to organizational resources should use 20+ characters to protect sensitive codebases and certificates."
    },
    {
      question: "Does this Apple ID password generator store passwords?",
      answer: "No. Everything runs locally in your web browser using the Web Crypto API. Your generated password is never transmitted to our servers, stored, or logged. It is 100% private and offline."
    },
    {
      question: "How do I update my Apple ID password safely?",
      answer: "Always update your password through official Apple settings on your device (Settings > [Your Name] > Password & Security) or by visiting appleid.apple.com directly. Never click on links in emails to change your password."
    }
  ];

  useSEO({
    title: "Apple ID Password Generator (Secure & Unhackable) – Free & Offline",
    description: "Generate a strong Apple ID password instantly. Protect your iCloud, devices, and payments with a secure random password. 100% private and offline.",
    keywords: "apple id password generator, strong password for apple id, secure apple id password, best password for icloud, unhackable apple id password, apple account security password, secure icloud login password",
    canonicalUrl: "https://tools.pixocraft.in/apple-id-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqSchema = generateFAQSchema(faqItems);
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Pixocraft Apple ID Password Generator",
    description: "Generate secure random passwords for Apple ID and iCloud instantly using Web Crypto API. 100% private and offline.",
    url: "https://tools.pixocraft.in/apple-id-password-generator",
    category: "SecurityApplication"
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareSchema} />
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Password Generator", url: "/tools/password-generator" },
            { label: "Apple ID Password" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Apple ID Password Generator – <span className="text-primary block sm:inline">Maximum Security for iCloud & Apple Accounts</span>
            </h1>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your Apple ID controls access to iCloud, iMessage, App Store purchases, device backups, and payment information. A weak password can expose personal data, photos, and even enable unauthorized device access.
              </p>
              <p className="text-lg text-muted-foreground">
                Generate a secure Apple ID password instantly using our cryptographically secure Password Generator. Fully private. No signup required. Works offline.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API Powered</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><Lock className="h-4 w-4" /> Zero Data Logging</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Apple className="h-4 w-4" /> Apple Account Optimized</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Instant Copy</span>
            </div>
          </div>

          {/* Tool Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={16} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-16">
            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Why Apple ID Security Is Critical</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                For Apple users, the Apple ID is the single most important credential. It is the master key to your entire digital ecosystem.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Laptop, label: "Device Access", desc: "Unlock and control your iPhone, Mac, and iPad." },
                  { icon: ShieldCheck, label: "iCloud Backups", desc: "Your photos, messages, and app data." },
                  { icon: CreditCard, label: "Apple Pay", desc: "Your saved cards and transaction history." },
                  { icon: ShieldAlert, label: "Find My Device", desc: "Prevents unauthorized tracking or wipes." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card shadow-sm">
                    <item.icon className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed italic border-l-4 pl-4 border-primary/20">
                A compromise doesn't just mean data loss—it can mean complete account lockout and the loss of thousands of dollars in digital purchases. Use our <Link href="/tools/password-strength-checker" className="text-primary hover:underline">Strength Checker</Link> to ensure your Apple ID is unhackable.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">What Is the Best Password Length for Apple ID?</h2>
              <p className="text-lg text-muted-foreground mb-8">While Apple enforces a minimum of 8 characters, modern security standards require significantly more entropy.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-yellow-200/50 dark:border-yellow-900/20">
                  <CardHeader className="pb-2 text-center">
                    <CardTitle className="text-lg">Standard</CardTitle>
                    <CardDescription>12 Characters</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground">
                    Acceptable for basic iCloud use.
                  </CardContent>
                </Card>
                <Card className="border-green-200/50 dark:border-green-900/20 bg-green-50/30 dark:bg-green-900/5 shadow-sm">
                  <CardHeader className="pb-2 text-center">
                    <CardTitle className="text-lg">Strong</CardTitle>
                    <CardDescription>16 Characters</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center text-sm font-medium text-green-700 dark:text-green-400">
                    Recommended for most Apple users.
                  </CardContent>
                </Card>
                <Card className="border-purple-200/50 dark:border-purple-900/20">
                  <CardHeader className="pb-2 text-center">
                    <CardTitle className="text-lg">Developer</CardTitle>
                    <CardDescription>20+ Characters</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center text-sm text-muted-foreground">
                    Required for high-value admin accounts.
                  </CardContent>
                </Card>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A 16-character random password provides ~105 bits of entropy. This level of randomness makes brute-force attacks computationally infeasible with current technology. Learn more about <Link href="/16-character-password-generator" className="text-primary font-bold hover:underline">16 Character</Link> and <Link href="/20-character-password-generator" className="text-primary font-bold hover:underline">20 Character</Link> security tiers.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Apple ID Password Requirements Explained</h2>
              <div className="p-6 rounded-2xl border bg-muted/20 space-y-4">
                <h4 className="font-bold flex items-center gap-2"><Info className="h-5 w-5 text-primary" /> Official Requirements:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-medium text-muted-foreground list-none p-0">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> At least 8 chars</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Case sensitive</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-600" /> Include numbers</li>
                </ul>
                <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                  <strong>The Reality:</strong> 8 characters is no longer secure against modern high-speed GPU cracking clusters. For the best protection of your photos and device access, always aim for <strong>16 characters or more</strong>.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Weak vs Strong Apple ID Password Example</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertCircle className="h-5 w-5 text-destructive" />
                  <div>
                    <span className="font-mono text-lg line-through opacity-50">Apple123</span>
                    <span className="ml-4 text-sm font-bold uppercase text-destructive">Weak: Predictable</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Info className="h-5 w-5 text-yellow-500" />
                  <div>
                    <span className="font-mono text-lg opacity-80">iPhone@2026</span>
                    <span className="ml-4 text-sm font-bold uppercase text-yellow-600">Moderate: Patterned</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 shadow-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <div>
                    <span className="font-mono text-lg font-bold">pL#8xT@4vQ!9mZ$2</span>
                    <span className="ml-4 text-sm font-bold uppercase text-green-600">Strong: Fully random</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">How Apple ID Accounts Get Compromised</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold">Phishing Emails</h4>
                  <p className="text-sm text-muted-foreground">Fake "Security Alerts" or "Invoice" emails that trick you into logging into a fake iCloud page.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold">Credential Harvesting</h4>
                  <p className="text-sm text-muted-foreground">Using malicious websites or fake public Wi-Fi to intercept your login credentials.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold">Password Reuse</h4>
                  <p className="text-sm text-muted-foreground">If you use your Apple ID password on other sites that get breached, hackers will try it on Apple.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold">Session Hijacking</h4>
                  <p className="text-sm text-muted-foreground">Intercepting active login sessions on unsecured public networks.</p>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Strengthen Apple ID Beyond Password</h2>
              <p className="text-lg text-muted-foreground mb-8">A strong password is your primary shield, but Apple provides extra layers for complete defense.</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  "Enable Two-Factor Authentication (Built-in)",
                  "Generate an Account Recovery Key",
                  "Regularly review your Trusted Devices",
                  "Remove unknown or old devices immediately",
                  "Use a secure, unique recovery email address"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
                    <Check className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i} className="border-b pb-6">
                    <h3 className="text-xl font-bold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-16 border-t mt-16">
              <h2 className="text-4xl font-bold mb-6">Generate a Secure Apple ID Password Now</h2>
              <p className="text-xl text-muted-foreground mb-10">Protect your iCloud data and Apple devices with cryptographic randomness.</p>
              <div className="flex flex-col items-center gap-4">
                <Button 
                  size="lg" 
                  className="h-16 px-10 text-2xl font-bold rounded-full hover-elevate shadow-xl"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Generate Apple ID Password
                </Button>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Lock className="h-4 w-4 text-primary" /> Passwords are generated locally. We never store or transmit them.
                </p>
              </div>
            </section>

            {/* Structured Data for SEO */}
            <StructuredData data={generateBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
              { name: "Password Generator", url: "/tools/password-generator" },
              { name: "Apple ID Password", url: "/apple-id-password-generator" }
            ])} />

            {/* Internal Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 border-t">
              <Link href="/password-generator" className="group">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" /> Main Generator
                    </CardTitle>
                    <CardDescription>Custom lengths</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/16-character-password-generator" className="group">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" /> 16 Character
                    </CardTitle>
                    <CardDescription>Strong tier</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/20-character-password-generator" className="group">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" /> 20 Character
                    </CardTitle>
                    <CardDescription>High security</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/tools/password-strength-checker" className="group">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" /> Strength Checker
                    </CardTitle>
                    <CardDescription>Validate keys</CardDescription>
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
