import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem, generateBreadcrumbSchema } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { Check, ShieldCheck, Lock, Zap, Shield, Key, Globe, Mail, Instagram, Facebook, Landmark, Apple } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function StrongestPasswordGenerator() {
  useSEO({
    title: "Strongest Password Generator (Maximum Security) | Pixocraft",
    description: "Generate the strongest possible passwords using ultra-high entropy and cryptographic randomness. Perfect for high-value accounts and enterprise security.",
    keywords: "strongest password generator, maximum security password generator, most secure password creator, ultra strong password generator, uncrackable password generator",
    canonicalUrl: "https://tools.pixocraft.in/strongest-password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Pixocraft Strongest Password Generator",
    description: "Maximum security password generator with ultra-high entropy settings.",
    url: "https://tools.pixocraft.in/strongest-password-generator",
    category: "SecurityApplication"
  });

  const faqItems: FAQItem[] = [
    {
      question: "What defines the 'strongest' password?",
      answer: "A password's strength is defined by its entropy. The strongest passwords are long (20+ characters), completely random (no words or patterns), and use a full set of characters (uppercase, lowercase, numbers, and symbols)."
    },
    {
      question: "Why use this instead of a standard generator?",
      answer: "This tool is optimized for maximum security scenarios, defaulting to 24 characters and highlighting the importance of high-entropy generation for accounts that are frequent targets of sophisticated attacks."
    },
    {
      question: "Can these passwords be remembered?",
      answer: "No, and that's the point. Truly strong passwords should not be human-memorable as that implies patterns. We strongly recommend using a reputable password manager to store these credentials."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Password Generator", url: "/tools/password-generator" },
    { name: "Strongest Password Generator", url: "/strongest-password-generator" }
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
            { label: "Strongest Password Generator" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Strongest Password Generator <span className="text-primary block">Maximum Digital Protection</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              When standard security isn't enough. Generate ultra-high entropy passwords designed to withstand even the most advanced brute-force attacks.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={24} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Why Strength Matters</h2>
              <p className="text-muted-foreground leading-relaxed">
                As computing power increases, old standards for password length are becoming obsolete. A "strong" password from five years ago might now be crackable in hours. The strongest passwords utilize maximum character space and length to stay ahead of evolving threats.
              </p>
            </div>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <h3 className="font-bold flex items-center gap-2 mb-2"><Zap className="h-5 w-5 text-primary" /> Ultra-High Entropy</h3>
                <p className="text-sm text-muted-foreground">Generates over 150 bits of entropy for mission-critical security.</p>
              </div>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <h3 className="font-bold flex items-center gap-2 mb-2"><ShieldCheck className="h-5 w-5 text-primary" /> Enterprise Standards</h3>
                <p className="text-sm text-muted-foreground">Meets or exceeds NIST and military-grade security requirements.</p>
              </div>
            </div>
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
