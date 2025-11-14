import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Zap, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { superheroNames } from "@/lib/random-data";

export default function RandomSuperheroName() {
  const [name, setName] = useState<string | null>(null);

  useSEO({
    title: "Superhero Name Generator | Offline Static Superhero Names | Pixocraft Tools",
    description: "Generate random superhero names offline. Perfect for games, stories, and creative projects.",
    keywords: "superhero name generator, random superhero names, hero name generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-superhero-name",
  });

  const generateName = () => {
    const randomIndex = Math.floor(Math.random() * superheroNames.length);
    setName(superheroNames[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get instant superhero name" },
    { step: 2, title: "View Name", description: "See your hero identity" },
    { step: 3, title: "Use It", description: "Perfect for games & stories" },
  ];

  const benefits = [
    { icon: <Zap className="h-5 w-5" />, title: "Cool Names", description: "Heroic & powerful" },
    { icon: <Zap className="h-5 w-5" />, title: "Creative", description: "Unique combinations" },
    { icon: <Zap className="h-5 w-5" />, title: "Fun", description: "Great for entertainment" },
    { icon: <Zap className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Can I use these names for my projects?",
      answer: "Yes! These names are perfect for games, stories, role-playing, and any creative project where you need superhero character names."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Superhero Name Generator"
        description="Click → get hero name"
        icon={<Zap className="h-8 w-8" />}
        toolId="random-superhero-name"
        category="generator"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Random Superhero Name</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateName}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Superhero Name
          </Button>

          {name && (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-5xl font-bold" data-testid="text-name">{name}</h3>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
