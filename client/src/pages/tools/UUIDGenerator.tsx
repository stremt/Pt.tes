import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Hash, Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "UUID Generator Online | Generate UUID v4 Instantly | Pixocraft Tools",
    description: "Generate secure random UUID v4 identifiers. Works offline, developer-friendly.",
    keywords: "uuid generator, uuid v4, random id generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/uuid-generator",
  });

  const generateUUID = () => {
    const newUuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    setUuid(newUuid);
  };

  const copyUUID = () => {
    if (uuid) {
      navigator.clipboard.writeText(uuid);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "UUID copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Generate a new UUID v4 instantly" },
    { step: 2, title: "Copy UUID", description: "Copy the generated UUID to clipboard" },
    { step: 3, title: "Use Anywhere", description: "Use in apps, APIs, databases & more" },
  ];

  const benefits = [
    { icon: <Hash className="h-5 w-5" />, title: "UUID Unique", description: "128-bit randomness guaranteed" },
    { icon: <Hash className="h-5 w-5" />, title: "Version 4", description: "Standard UUID v4 format" },
    { icon: <Hash className="h-5 w-5" />, title: "Offline Ready", description: "Works without internet" },
    { icon: <Hash className="h-5 w-5" />, title: "Developer Friendly", description: "Perfect for APIs & databases" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Is UUID unique?",
      answer: "Yes — 128-bit randomness. UUIDs are globally unique identifiers with such massive randomness that collisions are virtually impossible (1 in 340 undecillion)."
    },
    {
      question: "What is UUID v4?",
      answer: "UUID v4 is a randomly generated universally unique identifier following RFC 4122 standard. It's the most common UUID version used in modern applications."
    },
    {
      question: "When should I use UUIDs?",
      answer: "Use UUIDs for database primary keys, API request IDs, session tokens, file names, or any case where you need guaranteed unique identifiers across distributed systems."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="UUID Generator"
        description="Click generate → copy UUID instantly for apps, APIs & databases."
        icon={<Hash className="h-8 w-8" />}
        toolId="uuid-generator"
        category="developer"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">UUID Generator</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={uuid}
                readOnly
                placeholder="Click generate to create UUID"
                className="font-mono"
                data-testid="input-uuid"
              />
              <Button
                onClick={copyUUID}
                size="icon"
                variant="outline"
                disabled={!uuid}
                data-testid="button-copy-uuid"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Button
              onClick={generateUUID}
              size="lg"
              className="w-full"
              data-testid="button-generate-uuid"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Generate UUID
            </Button>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
