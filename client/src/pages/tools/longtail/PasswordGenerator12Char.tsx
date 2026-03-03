import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, X, Shield, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PasswordGenerator12Char() {
  useSEO({
    title: "12 Character Password Generator (Free & Secure) – No Signup",
    description: "Generate a secure 12 character password instantly. 100% private, offline and cryptographically secure. Create strong random passwords now.",
    keywords: "12 character password generator, strong 12 character password, 12 digit password generator, 12 character random password, secure 12 character password",
    canonicalUrl: "https://tools.pixocraft.in/12-character-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems = [
    {
      question: "Is 12 characters enough for Gmail?",
      answer: "Yes for most users, but 16+ is safer for critical accounts like your primary email which often serves as a recovery method for other services."
    },
    {
      question: "Should I include symbols in a 12 character password?",
      answer: "Yes. Symbols significantly increase complexity and entropy, making it much harder for automated tools to guess the combination."
    },
    {
      question: "Is this 12 character password generator safe?",
      answer: "Yes. It runs entirely in your browser using the Web Crypto API. No passwords are ever stored or transmitted to any server."
    },
    {
      question: "Can I use the same 12 character password everywhere?",
      answer: "No. Always use unique passwords for every account to prevent a single breach from compromising all your digital identities."
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
            { label: "12 Character Password" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              12 Character Password Generator – Fast, Strong & Secure
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Need a secure 12 character password that meets modern security standards? Instantly generate a strong, random 12 character password using cryptographic randomness. 100% private and works fully offline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API Powered</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> No Signup Required</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> Zero Data Collection</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Instant Generation</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={12} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-4">Is a 12 Character Password Secure in 2026?</h2>
              <p className="text-lg text-muted-foreground">
                A properly generated 12 character password using uppercase letters, lowercase letters, numbers and symbols creates:
              </p>
              <div className="bg-muted p-4 rounded-lg my-4 font-mono text-xl text-center">
                95^12 possible combinations
              </div>
              <p className="text-lg text-muted-foreground">
                That equals:
              </p>
              <div className="bg-muted p-4 rounded-lg my-4 font-mono text-xl text-center">
                Over 540 trillion trillion possible passwords.
              </div>
              <p className="text-lg text-muted-foreground">
                This provides strong protection against brute-force and dictionary attacks when randomly generated. However, security depends on randomness. A human-made 12 character password is much weaker than a randomly generated one.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">How Long Would It Take to Crack a 12 Character Password?</h2>
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
                      <td className="px-6 py-4 font-medium">Basic Consumer GPU</td>
                      <td className="px-6 py-4">Thousands of Years</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">Advanced GPU Cluster</td>
                      <td className="px-6 py-4">Hundreds of Years</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium">State-Level Attack</td>
                      <td className="px-6 py-4">Still Extremely Difficult</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground italic">
                Crack time depends on attack method and randomness quality. Our tool ensures maximum entropy for every generation.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">When Should You Use a 12 Character Password?</h2>
              <p className="text-lg text-muted-foreground mb-4">Recommended for accounts with standard sensitivity levels:</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                {["Social media accounts", "Online shopping sites", "Streaming services", "School or student portals", "Low-to-medium sensitivity accounts"].map(item => (
                  <li key={item} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 font-medium">
                    <Check className="h-4 w-4 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground mt-4">For banking, crypto, or business admin accounts, <Link href="/16-character-password-generator" className="text-primary font-bold hover:underline">16+ characters</Link> are recommended.</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">12 vs 16 Character Password – Which Is Better?</h2>
              <div className="overflow-hidden rounded-xl border bg-card shadow-lg">
                <table className="w-full text-left">
                  <thead className="bg-muted/50 border-b">
                    <tr>
                      <th className="px-6 py-4 font-bold">Length</th>
                      <th className="px-6 py-4 font-bold">Entropy</th>
                      <th className="px-6 py-4 font-bold">Security Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-6 py-4">12 Characters</td>
                      <td className="px-6 py-4">~78 bits</td>
                      <td className="px-6 py-4 font-bold text-yellow-600">Strong (Standard)</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">16 Characters</td>
                      <td className="px-6 py-4">~105 bits</td>
                      <td className="px-6 py-4 font-bold text-green-600">Very Strong (High)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground mt-4">Each additional character exponentially increases protection. Adding just 4 extra characters increases combinations by billions of times. Visit our <Link href="/16-character-password-generator" className="text-primary hover:underline">16 Character Password Generator</Link> for higher security.</p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">Why Random 12 Character Passwords Are Safer Than Memorable Ones</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most people create passwords like <strong>Password2026!</strong>. Hackers' cracking tools test these patterns instantly using specialized dictionaries and rule sets. Random passwords generated using cryptographic APIs eliminate predictable patterns, dictionary words, and common substitutions, making automated attacks completely ineffective.
              </p>
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
              <h2 className="text-3xl font-bold mb-4">Generate a Strong 12 Character Password Now</h2>
              <p className="text-muted-foreground mb-8">Take control of your digital security in seconds with our privacy-first tool.</p>
              <div className="flex justify-center">
                <Button size="lg" className="h-14 px-8 text-xl font-bold rounded-full hover-elevate" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Generate 12 Character Password
                </Button>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 border-t">
              <Link href="/tools/password-generator" className="group p-6 rounded-2xl border hover:border-primary transition-all hover-elevate">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="h-6 w-6 text-primary" />
                  <span className="font-bold">Strong Password Generator</span>
                </div>
                <p className="text-sm text-muted-foreground">Main generator for fully custom security needs.</p>
              </Link>
              <Link href="/16-character-password-generator" className="group p-6 rounded-2xl border hover:border-primary transition-all hover-elevate">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="font-bold">16 Character Generator</span>
                </div>
                <p className="text-sm text-muted-foreground">Step up to strong security for email and banking.</p>
              </Link>
              <Link href="/tools/password-strength-checker" className="group p-6 rounded-2xl border hover:border-primary transition-all hover-elevate">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <span className="font-bold">Password Strength Checker</span>
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
