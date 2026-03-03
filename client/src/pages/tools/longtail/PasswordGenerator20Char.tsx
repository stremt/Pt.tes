import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, Shield } from "lucide-react";
import { Link } from "wouter";
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
                A 20 character password represents the gold standard for high-security personal and professional accounts. Mathematically, if you use the full set of 95 printable characters (uppercase, lowercase, numbers, and symbols):
              </p>
              <div className="bg-muted p-4 rounded-lg my-4 font-mono text-xl text-center">
                95^20 combinations
              </div>
              <p className="text-lg text-muted-foreground">
                This equals over:
              </p>
              <div className="bg-muted p-4 rounded-lg my-4 font-mono text-xl text-center">
                3.5 × 10^39 possible combinations.
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                This level of entropy makes brute-force attacks computationally unrealistic even when using massive GPU clusters or state-sponsored hardware. Entropy increases exponentially with each additional character, making 20 characters significantly more secure than 12 or 16.
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
                      <td className="px-6 py-4 font-medium">Single High-End GPU</td>
                      <td className="px-6 py-4">Longer than the age of the universe</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Large GPU Cluster</td>
                      <td className="px-6 py-4">Practically impossible</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Nation-State Attack</td>
                      <td className="px-6 py-4">Computationally infeasible</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Assumptions: Truly random generation, full character set usage, and an offline brute-force attack model. Human-created passwords, even long ones, are significantly weaker due to patterns.
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
              <p className="text-muted-foreground mt-4">The exponential growth per character means that while 16 is strong, 20 characters offer a massive increase in the safety margin for professional environments.</p>
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t">
              <Link href="/password-generator" className="group p-6 rounded-2xl border hover:border-primary transition-all hover-elevate">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="font-bold">Strong Password Generator</span>
                </div>
                <p className="text-sm text-muted-foreground">Main generator for custom lengths and options.</p>
              </Link>
              <Link href="/16-character-password-generator" className="group p-6 rounded-2xl border hover:border-primary transition-all hover-elevate">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="font-bold">16 Character Generator</span>
                </div>
                <p className="text-sm text-muted-foreground">Standard security for social and email accounts.</p>
              </Link>
              <Link href="/password-strength-checker" className="group p-6 rounded-2xl border hover:border-primary transition-all hover-elevate">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="font-bold">Strength Checker</span>
                </div>
                <p className="text-sm text-muted-foreground">Verify the security level of your existing passwords.</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
