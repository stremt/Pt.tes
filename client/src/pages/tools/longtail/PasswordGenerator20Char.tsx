import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, X, Info, Shield, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PasswordGenerator20Char() {
  useSEO({
    title: "20 Character Password Generator (Ultra Secure) – Free & Offline",
    description: "Generate an ultra-secure 20 character password instantly. 100% private and uncrackable. Recommended for banking, work, and sensitive data.",
    keywords: "20 character password generator, strong 20 character password, 20 digit password generator, secure 20 character password, 20 character random password",
    canonicalUrl: "https://tools.pixocraft.in/20-character-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems = [
    {
      question: "Is 20 characters overkill for a password?",
      answer: "Not anymore. With the rise of AI-powered cracking and increased computing power, a 20-character password provides the long-term security needed for critical accounts."
    },
    {
      question: "How secure is a 20 character password?",
      answer: "It is extremely secure. A random 20-character password has over 130 bits of entropy, making it virtually immune to all current and foreseeable brute-force methods."
    },
    {
      question: "Will all websites accept 20 character passwords?",
      answer: "Most modern websites accept passwords up to 64 or 128 characters. 20 characters is widely supported across almost all platforms."
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
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              20 Character Password Generator – Ultra Secure Protection
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Generate military-grade 20 character passwords for your most sensitive accounts. 100% private, browser-based, and cryptographically secure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Military Grade</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> Uncrackable</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> No Logs</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Web Crypto</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={20} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-4">Why Choose 20 Characters?</h2>
              <p className="text-lg text-muted-foreground">
                For accounts that hold your life's work, financial data, or primary identity, 20 characters provide an "uncrackable" barrier. The entropy of a 20-character random string is so high that even the world's most powerful supercomputers would take trillions of years to guess it.
              </p>
            </section>

            <section>
              <h2 className="text-3xl font-bold mb-4">The Mathematics of 20 Characters</h2>
              <p className="text-muted-foreground">
                95^20 possible combinations = <strong>1.35 x 10^39</strong>. This number is larger than the number of grains of sand on Earth. It is the ultimate digital shield.
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
          </section>
        </div>
      </div>
    </>
  );
}
