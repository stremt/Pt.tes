import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem, generateBreadcrumbSchema } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { Check, ShieldCheck, Lock, Zap, Shield, Key, Globe, Mail, Instagram, Facebook, Landmark, Apple } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function SecureRandomPasswordGenerator() {
  useSEO({
    title: "Secure Random Password Generator (CSPRNG) | Pixocraft",
    description: "Generate cryptographically secure random passwords using the Web Crypto API. Pixocraft ensures your passwords are generated locally and never stored.",
    keywords: "secure random password generator, csprng password generator, random password maker, secure password creator, browser based password generator",
    canonicalUrl: "https://tools.pixocraft.in/secure-random-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Pixocraft Secure Random Password Generator",
    description: "Cryptographically secure random password generator using Web Crypto API.",
    url: "https://tools.pixocraft.in/secure-random-password-generator",
    category: "SecurityApplication"
  });

  const faqItems: FAQItem[] = [
    {
      question: "What makes this generator 'secure'?",
      answer: "We use the browser's built-in Web Crypto API (window.crypto.getRandomValues), which is a Cryptographically Secure Pseudo-Random Number Generator (CSPRNG). This ensures the passwords have high entropy and are unpredictable."
    },
    {
      question: "Are my passwords sent to your server?",
      answer: "No. All generation happens entirely within your web browser. No password data ever leaves your device or is stored on our servers."
    },
    {
      question: "How long should a secure password be?",
      answer: "For most accounts, we recommend at least 12 to 16 characters. For highly sensitive accounts like banking or primary email, 20+ characters is ideal."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Password Generator", url: "/tools/password-generator" },
    { name: "Secure Random Password Generator", url: "/secure-random-password-generator" }
  ]);

  const relatedTools = getRelatedTools("password-generator", 6);

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
            { label: "Secure Random Password Generator" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Secure Random Password Generator
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Generate unpredictable, high-entropy passwords using industry-standard cryptographic randomness.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={16} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="bg-muted/30 border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Lock className="h-5 w-5 text-primary" /> Client-Side</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Generated in your browser, never sent to any server.</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30 border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><Zap className="h-5 w-5 text-primary" /> CSPRNG</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Uses Web Crypto API for true cryptographic randomness.</p>
              </CardContent>
            </Card>
            <Card className="bg-muted/30 border-none shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl"><ShieldCheck className="h-5 w-5 text-primary" /> High Entropy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Maximum unpredictability to resist brute-force attacks.</p>
              </CardContent>
            </Card>
          </div>

          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border rounded-xl px-4 bg-card">
                  <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Explore More Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedTools.map((tool) => (
                <Link key={tool.path} href={tool.path}>
                  <Card className="hover-elevate cursor-pointer h-full border-primary/5">
                    <CardHeader className="p-5">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <tool.icon className="h-5 w-5 text-primary" />
                        {tool.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground line-clamp-2">{tool.description}</p>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
