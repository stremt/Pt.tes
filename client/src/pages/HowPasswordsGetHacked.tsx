import { PasswordGeneratorTool } from "@/components/tools/PasswordGeneratorTool";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem, generateBreadcrumbSchema } from "@/lib/seo";
import { getRelatedTools } from "@/lib/tools";
import { Check, ShieldCheck, Lock, Zap, ShieldAlert, Key, Globe, Layout, Search, AlertTriangle, Terminal } from "lucide-react";
import { Link } from "wouter";
import { Breadcrumb } from "@/components/Breadcrumb";

export default function HowPasswordsGetHacked() {
  useSEO({
    title: "How Passwords Get Hacked (Common Attack Methods) | Pixocraft",
    description: "Learn how hackers crack passwords using brute-force, dictionary attacks, and phishing. Discover how to protect your accounts with high-entropy passwords.",
    keywords: "how passwords get hacked, password cracking methods, brute force attack explained, dictionary attack, phishing, credential stuffing, password security",
    canonicalUrl: "https://tools.pixocraft.in/how-passwords-get-hacked",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const faqItems: FAQItem[] = [
    {
      question: "What is a brute-force attack?",
      answer: "A brute-force attack is a trial-and-error method used by application programs to decode encrypted data such as passwords through exhaustive effort rather than employing intellectual strategies. It involves systematically checking all possible passwords and passphrases until the correct one is found."
    },
    {
      question: "How do hackers use dictionary attacks?",
      answer: "A dictionary attack is a technique for defeating a cipher or authentication mechanism by trying to determine its decryption key or password by trying hundreds or sometimes millions of likely possibilities, such as words in a dictionary or previously leaked passwords."
    },
    {
      question: "What is credential stuffing?",
      answer: "Credential stuffing is a type of cyberattack where stolen account credentials (typically lists of usernames or email addresses and their corresponding passwords) are used to gain unauthorized access to user accounts through large-scale automated login requests directed against a web application."
    },
    {
      question: "How can I protect myself from these attacks?",
      answer: "The best defense is using long, random, and unique passwords for every account. Combining this with multi-factor authentication (MFA) and using a password manager significantly reduces the risk of being hacked."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Password Generator", url: "/tools/password-generator" },
    { name: "How Passwords Get Hacked", url: "/how-passwords-get-hacked" }
  ]);

  const relatedTools = getRelatedTools("password-generator", 6);

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
            { label: "How Passwords GetHacked" },
          ]}
        />
      </div>

      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              How Passwords Get Hacked <span className="text-primary block">Common Attack Methods Explained</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Understanding how hackers operate is the first step in defending your digital life. Learn the most common techniques used to compromise passwords.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <PasswordGeneratorTool initialLength={16} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Card className="hover-elevate transition-all border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><Terminal className="h-6 w-6 text-primary" /> Brute-Force Attacks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Hackers use powerful computers to try every possible combination of characters until they find the right one. The shorter and simpler your password, the faster it can be cracked.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><Search className="h-6 w-6 text-primary" /> Dictionary Attacks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Instead of trying every combination, hackers use lists of common words, phrases, and previously leaked passwords. Using "password123" or "iloveyou" makes you an easy target.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><ShieldAlert className="h-6 w-6 text-primary" /> Phishing & Social Engineering</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Attackers trick you into giving away your password through fake emails or websites that look legitimate. Always verify the URL before entering your credentials.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all border-primary/10 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3"><Layout className="h-6 w-6 text-primary" /> Credential Stuffing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  When one site is breached, hackers try those same email/password combinations on other popular services. This is why you should never reuse passwords.
                </p>
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
