import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES } from "@/lib/seo";
import { ShieldCheck, WifiOff, Lock, Zap, Check, X, Info, Shield, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function PasswordGenerator32Char() {
  useSEO({
    title: "32 Character Password Generator (Maximum Security) – Free & Offline",
    description: "Generate a maximum security 32 character password instantly. Ideal for master passwords, encryption keys, and server security.",
    keywords: "32 character password generator, strong 32 character password, 32 digit password generator, secure 32 character password, 32 character random password",
    canonicalUrl: "https://tools.pixocraft.in/32-character-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems = [
    {
      question: "When should I use a 32 character password?",
      answer: "Use 32 characters for master passwords of password managers, root access to servers, or whenever you need maximum possible security for a long-term credential."
    },
    {
      question: "Is it hard to remember a 32 character password?",
      answer: "Yes, 32 random characters are impossible to remember. You should always use a password manager to store and manage such long, secure strings."
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
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              32 Character Password Generator – Maximum Digital Defense
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Generate the ultimate 32 character passwords for your most critical systems. Cryptographically secure, private, and powerful.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Ultimate Security</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> Private API</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> Browser Only</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Zero Tracking</span>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={32} />
          </div>

          <section className="prose prose-slate dark:prose-invert max-w-4xl mx-auto space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-4">Ultimate Protection: 32 Characters</h2>
              <p className="text-lg text-muted-foreground">
                A 32-character password represents the pinnacle of password security. It provides over 200 bits of entropy, exceeding the security requirements of almost any current standard. It is ideal for encryption keys and master credentials.
              </p>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}
