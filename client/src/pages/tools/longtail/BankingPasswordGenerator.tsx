import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem, generateBreadcrumbSchema } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, Shield, ArrowRight, Landmark, ShieldAlert, Key, Smartphone, AlertCircle, Info, CreditCard, Wallet, Banknote, XCircle } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BankingPasswordGenerator() {
  const faqItems: FAQItem[] = [
    {
      question: "Why is 20 characters the recommended length for banking?",
      answer: "Banking accounts protect your life savings and financial identity. A 20-character password provides ~131 bits of entropy, offering a massive safety margin that remains secure even against future computing advances and larger GPU clusters."
    },
    {
      question: "Can quantum computing crack my banking password?",
      answer: "While practical quantum attacks are not yet a daily reality, security experts recommend higher entropy (like 20+ characters) today to ensure that data harvested now remains encrypted and secure against future quantum capabilities."
    },
    {
      question: "What is the impact of financial-grade randomness?",
      answer: "Financial-grade randomness ensures that there are no predictable patterns, dictionary words, or personal identifiers in your password. This forces attackers to try every possible combination, which would take trillions of years."
    },
    {
      question: "Is it safe to generate a banking password in a browser?",
      answer: "Yes, because our tool uses the Web Crypto API to generate passwords locally on your device. The password never leaves your browser, ensuring that neither we nor any third party ever sees your credentials."
    }
  ];

  useSEO({
    title: "Banking Password Generator (High-Security & Computationally Infeasible) – Free & Offline",
    description: "Generate a high-security banking password instantly. Protect your bank account with a cryptographically secure, random password. 100% private and offline.",
    keywords: "banking password generator, strong password for banking, secure bank account password, best password for online banking, secure banking password, bank account password security, secure password for net banking, banking login password generator",
    canonicalUrl: "https://tools.pixocraft.in/banking-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqSchema = generateFAQSchema(faqItems);
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Pixocraft Banking Password Generator",
    description: "Generate high-security random passwords for online banking instantly using Web Crypto API. 100% private and offline.",
    url: "https://tools.pixocraft.in/banking-password-generator",
    category: "SecurityApplication"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Password Generator", url: "/tools/password-generator" },
    { name: "Banking Password", url: "/banking-password-generator" }
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
            { label: "Password Generator", url: "/tools/password-generator" },
            { label: "Banking Password" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Banking Password Generator – <span className="text-primary block sm:inline">Maximum Security for Online Banking Accounts</span>
            </h1>
            <div className="max-w-3xl mx-auto space-y-4">
              <p className="text-xl text-muted-foreground leading-relaxed">
                Your online banking password protects your money, identity, and financial records. Weak passwords are the primary cause of unauthorized account access.
              </p>
              <p className="text-lg text-muted-foreground">
                Secure your financial future with a banking-grade random password. Our generator runs 100% locally to ensure your credentials never touch any server.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API Powered</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><Lock className="h-4 w-4" /> Zero Data Logging</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Landmark className="h-4 w-4" /> Banking-Grade Security</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><WifiOff className="h-4 w-4" /> Fully Offline Generation</span>
            </div>
          </div>

          {/* Tool Section */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-4">
              <p className="text-sm font-medium text-muted-foreground">
                Passwords are generated locally in your browser. No server communication occurs.
              </p>
            </div>
            <PasswordGeneratorTool initialLength={20} />
            <p className="text-center text-sm text-muted-foreground mt-4 italic">
              Exceeds standard financial password complexity recommendations.
            </p>
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-16">
            {/* Featured Snippet Section */}
            <section className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
              <h2 className="text-2xl font-bold mb-4">What Is the Best Password Length for Online Banking?</h2>
              <p className="text-lg leading-relaxed">
                The best password length for online banking is 20 characters or more. Given the high stakes of financial accounts, this length provides a critical safety margin against the evolving computing power used by modern attackers.
              </p>
            </section>

            {/* Unique Data Block: Financial Compromise Timeline */}
            <section className="bg-muted/30 p-8 rounded-2xl border">
              <h3 className="text-2xl font-bold mb-6">Financial Compromise Timeline After Breach</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">0h</div>
                  <p>Initial credential harvesting through phishing or data breach exposure.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">1h</div>
                  <p>Unauthorized login and rapid modification of account alert settings to hide activity.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">4h</div>
                  <p>Triggering of multiple outbound wire transfers or digital wallet drains.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 font-bold text-primary">12h</div>
                  <p>Full account lockout and potential multi-year legal hurdles for asset recovery.</p>
                </li>
              </ul>
            </section>

            {/* Section: Why Banking Security Must Be Future-Proof */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Why Banking Security Must Be Future-Proof</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Financial data is a permanent target. A password that is "safe enough" today may not be safe against tomorrow's computing capabilities, necessitating high long-term cryptographic safety.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border bg-card">
                  <h4 className="font-bold text-xl mb-2">Long-Term Entropy Safety Margin</h4>
                  <p className="text-muted-foreground">A 20-character password provides ~131 bits of entropy. This isn't just strong; it's designed to remain secure for years, even as consumer hardware becomes more powerful.</p>
                </div>
                <div className="p-6 rounded-xl border bg-card">
                  <h4 className="font-bold text-xl mb-2">Quantum Computing Resistance</h4>
                  <p className="text-muted-foreground">While practical quantum computing is still emerging, the cryptographic community recommends longer keys to ensure that even future quantum algorithms cannot easily reverse-engineer your password.</p>
                </div>
              </div>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Financial fraud impact often goes beyond just lost money—it can lead to years of credit repair and legal hurdles. Future-proofing your security with a high-entropy password is a foundational step in modern asset protection.
              </p>
            </section>

            {/* Section 1 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Why Online Banking Requires Higher Security Than Social Media</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                While a compromised social media account affects your reputation, a hacked bank account directly impacts your financial stability and identity.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Banknote, label: "Direct Financial Value", desc: "Attackers can drain your savings in minutes." },
                  { icon: Wallet, label: "Identity Theft", desc: "Access to tax records, addresses, and SSNs." },
                  { icon: CreditCard, label: "Linked Cards", desc: "Unauthorized purchases and credit score damage." },
                  { icon: ShieldAlert, label: "Recovery Exploitation", desc: "Using bank data to hijack other accounts." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl border bg-card">
                    <item.icon className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <h4 className="font-bold">{item.label}</h4>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Comparison Table */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Recommended Password Length for Banking</h2>
              <div className="overflow-hidden rounded-xl border bg-card shadow-lg mb-8">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Length</th>
                      <th className="px-6 py-4 font-bold">Banking Suitability</th>
                      <th className="px-6 py-4 font-bold">Security Tier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4">16 Characters</td>
                      <td className="px-6 py-4">Acceptable</td>
                      <td className="px-6 py-4 font-bold text-yellow-600">Strong</td>
                    </tr>
                    <tr className="bg-primary/5">
                      <td className="px-6 py-4 font-bold">20 Characters</td>
                      <td className="px-6 py-4 font-bold text-green-600 italic">Recommended</td>
                      <td className="px-6 py-4 font-bold text-green-600">High Security</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">32 Characters</td>
                      <td className="px-6 py-4">Enterprise</td>
                      <td className="px-6 py-4 font-bold text-purple-600">Maximum Security</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A 20-character random password provides ~131 bits of entropy. This level of randomness makes brute-force attacks computationally infeasible, even for state-level computing clusters. Explore our <Link href="/20-character-password-generator" className="text-primary font-bold hover:underline">20 Character</Link> and <Link href="/32-character-password-generator" className="text-primary font-bold hover:underline">32 Character</Link> generators for these tiers, and verify your password with our <Link href="/tools/password-strength-checker" className="text-primary font-bold hover:underline">Strength Checker</Link>.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">How Hackers Target Bank Accounts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl border bg-muted/20">
                  <h4 className="font-bold mb-2 flex items-center gap-2"><AlertCircle className="h-4 w-4 text-primary" /> Credential Stuffing</h4>
                  <p className="text-sm text-muted-foreground">Attackers reuse leaked passwords from other breached websites to try and enter your bank account.</p>
                </div>
                <div className="p-5 rounded-xl border bg-muted/20">
                  <h4 className="font-bold mb-2 flex items-center gap-2"><AlertCircle className="h-4 w-4 text-primary" /> Phishing Emails</h4>
                  <p className="text-sm text-muted-foreground">Fake bank login pages designed to look exactly like your bank to collect your credentials.</p>
                </div>
                <div className="p-5 rounded-xl border bg-muted/20">
                  <h4 className="font-bold mb-2 flex items-center gap-2"><AlertCircle className="h-4 w-4 text-primary" /> Keylogging Malware</h4>
                  <p className="text-sm text-muted-foreground">Malicious software that records every keystroke you type, capturing passwords as you enter them.</p>
                </div>
                <div className="p-5 rounded-xl border bg-muted/20">
                  <h4 className="font-bold mb-2 flex items-center gap-2"><AlertCircle className="h-4 w-4 text-primary" /> SIM Swap Attacks</h4>
                  <p className="text-sm text-muted-foreground">Bypassing SMS-based OTP systems by tricking your carrier into switching your number to their device.</p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Weak vs Strong Banking Password Example</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <XCircle className="h-5 w-5 text-destructive" />
                  <div>
                    <span className="font-mono text-lg line-through opacity-50">Bank@123</span>
                    <span className="ml-4 text-sm font-bold uppercase text-destructive">Weak: Common patterns</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                  <Info className="h-5 w-5 text-yellow-500" />
                  <div>
                    <span className="font-mono text-lg opacity-80">HDFC@2026</span>
                    <span className="ml-4 text-sm font-bold uppercase text-yellow-600">Predictable: Uses bank name</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 shadow-sm">
                  <Check className="h-5 w-5 text-green-500" />
                  <div>
                    <span className="font-mono text-lg font-bold">xL#8qP$4vT!9mZ@2rW</span>
                    <span className="ml-4 text-sm font-bold uppercase text-green-600">Strong: High-entropy random</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Banking Password Best Practices</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {[
                  "Use 20+ characters for maximum search space",
                  "Include uppercase, lowercase, numbers, and symbols",
                  "Enable 2FA (Prefer authenticator apps over SMS)",
                  "Never reuse your banking password anywhere else",
                  "Store your password in a trusted encrypted manager",
                  "Monitor your account for login and transaction alerts"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
                    <Check className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Why Offline Password Generation Is Safer for Banking</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Online password generators often introduce risks such as network interception or server-side logging. For financial credentials, these risks are unacceptable.
              </p>
              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/20">
                <p className="font-medium text-primary-foreground/90">
                  The Pixocraft Banking Password Generator runs entirely on your device. Since the code executes locally using the Web Crypto API, there is:
                </p>
                <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-bold uppercase tracking-tight">
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4" /> No Transmission</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4" /> No Server Storage</li>
                  <li className="flex items-center gap-2"><Zap className="h-4 w-4" /> No Third-Party Logs</li>
                </ul>
              </div>
            </section>

            {/* FAQ Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-8">
                {faqItems.map((item, i) => (
                  <div key={i} className="border-b pb-8">
                    <h3 className="text-xl font-bold mb-3">{item.question}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center py-16 border-t mt-16">
              <h2 className="text-4xl font-bold mb-6 font-display">Generate a Secure Banking Password Now</h2>
              <p className="text-xl text-muted-foreground mb-10">Take control of your net banking security with financial-grade randomness.</p>
              <div className="flex flex-col items-center gap-4">
                <Button 
                  size="lg" 
                  className="h-16 px-10 text-2xl font-bold rounded-full hover-elevate shadow-xl"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Generate Banking Password
                </Button>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                  <Lock className="h-4 w-4 text-primary" /> Passwords are generated locally in your browser. We never see or store them.
                </p>
              </div>
            </section>

            {/* Structured Data for SEO */}
            <StructuredData data={generateBreadcrumbSchema([
              { name: "Home", url: "/" },
              { name: "Tools", url: "/tools" },
              { name: "Password Generator", url: "/tools/password-generator" },
              { name: "Banking Password", url: "/banking-password-generator" }
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
              <Link href="/strong-password-for-gmail" className="group">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" /> Gmail Account
                    </CardTitle>
                    <CardDescription>Identity reset risk</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/apple-id-password-generator" className="group">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" /> Apple ID
                    </CardTitle>
                    <CardDescription>Ecosystem security</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
              <Link href="/tools/password-strength-checker" className="group">
                <Card className="hover-elevate transition-all">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg flex items-center gap-2 group-hover:text-primary transition-colors">
                      <ArrowRight className="h-4 w-4" /> Strength Checker
                    </CardTitle>
                    <CardDescription>Validate your keys</CardDescription>
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
