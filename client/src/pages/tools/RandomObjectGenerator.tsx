import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Box, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { objects } from "@/lib/random-data";

export default function RandomObjectGenerator() {
  const [object, setObject] = useState<string | null>(null);

  useSEO({
    title: "Random Object Generator | Offline Object Picker | Pixocraft Tools",
    description: "Generate random objects from dictionary list. Perfect for games, brainstorming, and creative exercises.",
    keywords: "random object generator, random item picker",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-object-generator",
  });

  const generateObject = () => {
    const randomIndex = Math.floor(Math.random() * objects.length);
    setObject(objects[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Press button to pick random object" },
    { step: 2, title: "View Result", description: "See random object name" },
    { step: 3, title: "Use It", description: "Perfect for games and creativity" },
  ];

  const benefits = [
    { icon: <Box className="h-5 w-5" />, title: "Instant", description: "Random object in milliseconds" },
    { icon: <Box className="h-5 w-5" />, title: "Variety", description: "30+ everyday objects" },
    { icon: <Box className="h-5 w-5" />, title: "Creative", description: "Great for brainstorming" },
    { icon: <Box className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "What can I use this for?",
      answer: "Perfect for creative writing prompts, drawing challenges, word association games, brainstorming sessions, and educational activities."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Object Generator"
        description="Click → get random object"
        icon={<Box className="h-8 w-8" />}
        toolId="random-object-generator"
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
          <span className="text-foreground">Random Object Generator</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateObject}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Random Object
          </Button>

          {object && (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-5xl font-bold" data-testid="text-object">{object}</h3>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
