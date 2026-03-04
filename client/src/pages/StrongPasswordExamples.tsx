import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, OG_IMAGES, type FAQItem, generateBreadcrumbSchema } from "@/lib/seo";
import { Shield, ShieldCheck, Lock, Check, X, Zap, ArrowRight, Info, Fingerprint, WifiOff, Users } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function StrongPasswordExamples() {
  const seoData = {
    title: "Strong Password Examples – What Secure Passwords Look Like",
    description: "See real examples of strong passwords and learn why they are secure. Generate stronger passwords instantly using the Pixocraft Password Generator.",
    keywords: "strong password examples, secure password examples, strong password ideas, good password examples, best password examples",
    canonicalUrl: "https://tools.pixocraft.in/strong-password-examples",
    ogImage: OG_IMAGES.passwordGenerator,
  };

  useSEO(seoData);

  const strongExamples = [
    "F8!qR7@xL#3mZ9",
    "kT4!wP8$Rz1@Q9",
    "7L!xP4@qZ#9sW2"
  ];

  const weakExamples = [
    "123456",
    "password123",
    "qwerty123",
    "john1990",
    "letmein"
  ];

  const entropyData = [
    { length: "8 characters", entropy: "~52 bits", level: "Weak", color: "text-destructive" },
    { length: "12 characters", entropy: "~78 bits", level: "Strong", color: "text-blue-500" },
    { length: "16 characters", entropy: "~105 bits", level: "Very Strong", color: "text-green-500" },
    { length: "20 characters", entropy: "~131 bits", level: "High Security", color: "text-primary" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "What is an example of a strong password?",
      answer: "A strong password example is something like 'F8!qR7@xL#3mZ9'. It is long (14+ characters), uses a mix of uppercase, lowercase, numbers, and symbols, and has no predictable words or patterns."
    },
    {
      question: "How long should a strong password be?",
      answer: "A strong password should be at least 12 characters long, but 16 or more characters is highly recommended for sensitive accounts like banking or primary email."
    },
    {
      question: "Are random passwords stronger than human passwords?",
      answer: "Yes. Humans tend to use predictable patterns, names, and dictionary words which are easily guessed by dictionary attacks. Randomly generated passwords remove these patterns entirely."
    },
    {
      question: "Is a 16-character password secure?",
      answer: "Yes, a 16-character random password typically provides around 105 bits of entropy, making it computationally infeasible to crack with current technology."
    },
    {
      question: "Should I reuse passwords?",
      answer: "No. Password reuse is a major security risk. If one service is compromised, attackers can use that password to access your other accounts. Use a unique password for every service."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Password Generator", url: "/tools/password-generator" },
    { name: "Strong Password Examples", url: "/strong-password-examples" }
  ]);

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbSchema} />
      
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Password Generator", url: "/tools/password-generator" },
            { label: "Strong Password Examples" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-16">
            <Badge variant="secondary" className="px-4 py-1.5 text-sm">
              <Shield className="h-4 w-4 mr-2" /> Pixocraft Security Ecosystem
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Strong Password Examples – <span className="text-primary">What Secure Passwords Look Like</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Many users struggle to understand what a truly strong password looks like. Weak passwords contain predictable patterns, while strong passwords use random characters and high entropy to prevent attacks.
            </p>
          </div>

          {/* Generator Section */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Generate Your Own Secure Password</h2>
              <p className="text-muted-foreground">The Pixocraft Password Generator helps users generate random high-entropy passwords instantly.</p>
            </div>
            <PasswordGeneratorTool initialLength={16} />
          </div>

          {/* Examples Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card className="border-green-500/20 bg-green-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <ShieldCheck className="h-5 w-5" /> Examples of Strong Passwords
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {strongExamples.map((pw, i) => (
                  <div key={i} className="p-3 bg-background border rounded-md font-mono text-center select-all">
                    {pw}
                  </div>
                ))}
                <div className="pt-4 text-sm space-y-2">
                  <p className="font-bold">Why these are strong:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Contain mixed character types</li>
                    <li>Are 14+ characters long</li>
                    <li>Have no predictable words</li>
                    <li>Are randomly generated</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <X className="h-5 w-5" /> Examples of Weak Passwords
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {weakExamples.map((pw, i) => (
                  <div key={i} className="p-3 bg-background border rounded-md font-mono text-center line-through opacity-60">
                    {pw}
                  </div>
                ))}
                <div className="pt-4 text-sm space-y-2">
                  <p className="font-bold">Why these are weak:</p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Easily guessed by dictionary attacks</li>
                    <li>Contain common names or dates</li>
                    <li>Short and predictable patterns</li>
                    <li>No special characters or case mixing</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Randomness & Entropy */}
          <section className="mb-20 space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Why Random Passwords Are Stronger</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Random passwords remove predictable patterns. A 16-character random password typically contains about 105 bits of entropy.
              </p>
            </div>
            
            <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10 text-center">
              <h3 className="text-xl font-bold mb-4">Possible Combinations: 2^105</h3>
              <p className="text-muted-foreground leading-relaxed">
                This enormous number of possibilities makes brute-force attacks extremely difficult. Even with trillions of guesses per second, it would take longer than the age of the universe to crack.
              </p>
            </div>
          </section>

          {/* Length Importance */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Password Length Matters</h2>
            <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
              <table className="w-full text-left">
                <thead className="bg-muted border-b">
                  <tr>
                    <th className="px-6 py-4 font-bold">Password Length</th>
                    <th className="px-6 py-4 font-bold">Entropy Estimate</th>
                    <th className="px-6 py-4 font-bold">Security Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {entropyData.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{row.length}</td>
                      <td className="px-6 py-4">{row.entropy}</td>
                      <td className={`px-6 py-4 font-bold ${row.color}`}>{row.level}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-center text-muted-foreground">Increasing password length significantly improves security exponentially.</p>
          </section>

          {/* Tips Section */}
          <section className="mb-20 bg-muted/30 p-8 rounded-2xl border">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Fingerprint className="h-6 w-6 text-primary" /> Tips for Creating Strong Passwords
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Use 16 or more characters",
                "Use mixed character sets (A-Z, a-z, 0-9, !@#)",
                "Avoid dictionary words and phrases",
                "Avoid personal information (birthdays, names)",
                "Use secure password generators"
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-lg">
                  <Check className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-muted-foreground">Password generators remove human predictability, ensuring truly secure credentials.</p>
          </section>

          {/* CTA Section */}
          <section className="mb-20 text-center space-y-6 p-12 bg-primary rounded-3xl text-primary-foreground relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Lock className="w-32 h-32" />
            </div>
            <h2 className="text-3xl font-bold">Generate Strong Passwords Instantly</h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto text-lg">
              The Pixocraft Password Generator automatically creates secure random passwords in your browser.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/tools/password-generator">
                <Button size="lg" variant="secondary" className="font-bold h-12 px-8">
                  Go to Password Generator <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm font-medium pt-4 opacity-70">
              <Link href="/tools/password-generator/security" className="hover:underline">Security Page</Link>
              <Link href="/unhackable-password-generator" className="hover:underline">Unhackable Generator</Link>
              <Link href="/private-password-generator" className="hover:underline">Private Generator</Link>
              <Link href="/offline-password-generator" className="hover:underline">Offline Generator</Link>
              <Link href="/tools/password-brute-force-calculator" className="hover:underline">Brute Force Calculator</Link>
              <Link href="/password-entropy-explained" className="hover:underline">Entropy Explained</Link>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-4 bg-card">
                  <AccordionTrigger className="text-left font-bold py-4 hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </div>
      </div>
    </>
  );
}
