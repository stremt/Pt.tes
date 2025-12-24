import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Lightbulb, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { startupIdeas } from "@/lib/random-data";

export default function RandomStartupIdea() {
  const [idea, setIdea] = useState<string | null>(null);

  useSEO({
    title: "Startup Idea Generator | Random Business Ideas | Pixocraft Tools",
    description: "Get random startup ideas from offline static library. Perfect for entrepreneurs, brainstorming sessions, and innovation workshops.",
    keywords: "startup idea generator, business idea generator, random startup ideas",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-startup-idea",
  });

  const generateIdea = () => {
    const randomIndex = Math.floor(Math.random() * startupIdeas.length);
    setIdea(startupIdeas[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get instant startup idea" },
    { step: 2, title: "Read Concept", description: "Understand the business model" },
    { step: 3, title: "Brainstorm", description: "Expand on the idea" },
  ];

  const benefits = [
    { icon: <Lightbulb className="h-5 w-5" />, title: "Innovative", description: "Unique business concepts" },
    { icon: <Lightbulb className="h-5 w-5" />, title: "Inspiration", description: "Spark creativity" },
    { icon: <Lightbulb className="h-5 w-5" />, title: "Diverse", description: "Various industries covered" },
    { icon: <Lightbulb className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Can I use these ideas for my business?",
      answer: "Absolutely! These ideas are meant to inspire you. Feel free to develop, modify, and implement them for your entrepreneurial ventures."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Startup Idea Generator"
        description="Click → generate idea instantly"
        icon={<Lightbulb className="h-8 w-8" />}
        toolId="random-startup-idea"
        category="random"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-6 px-4 pt-4">
          <Breadcrumb
            items={[
              { label: "Home", url: "/" },
              { label: "Tools", url: "/tools" },
              { label: "Random Tools", url: "/tools/random" },
              { label: "Random Startup Idea" },
            ]}
          />
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateIdea}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Startup Idea
          </Button>

          {idea && (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold" data-testid="text-idea">{idea}</h3>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
