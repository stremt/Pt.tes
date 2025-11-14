import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { PartyPopper, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { truthQuestions, dareActions } from "@/lib/random-data";

export default function RandomTruthDare() {
  const [result, setResult] = useState<{ type: 'truth' | 'dare'; content: string } | null>(null);

  useSEO({
    title: "Truth or Dare Generator | Offline Party Tool | Pixocraft Tools",
    description: "Get static truth & dare prompts for fun. Perfect for parties, gatherings, and entertainment.",
    keywords: "truth dare generator, party game tool, truth or dare",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-truth-dare",
  });

  const generateTruth = () => {
    const randomIndex = Math.floor(Math.random() * truthQuestions.length);
    setResult({ type: 'truth', content: truthQuestions[randomIndex] });
  };

  const generateDare = () => {
    const randomIndex = Math.floor(Math.random() * dareActions.length);
    setResult({ type: 'dare', content: dareActions[randomIndex] });
  };

  const howItWorks = [
    { step: 1, title: "Choose Type", description: "Click Truth or Dare button" },
    { step: 2, title: "View Challenge", description: "See random question/dare" },
    { step: 3, title: "Have Fun", description: "Complete the challenge" },
  ];

  const benefits = [
    { icon: <PartyPopper className="h-5 w-5" />, title: "Party Ready", description: "Perfect for gatherings" },
    { icon: <PartyPopper className="h-5 w-5" />, title: "No Setup", description: "Instant entertainment" },
    { icon: <PartyPopper className="h-5 w-5" />, title: "Variety", description: "Multiple questions & dares" },
    { icon: <PartyPopper className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "How many prompts are available?",
      answer: "We have 10+ truth questions and 15+ dare actions, providing plenty of variety for your party or game night."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Truth or Dare Generator"
        description="Click Truth → get question. Click Dare → get challenge"
        icon={<PartyPopper className="h-8 w-8" />}
        toolId="random-truth-dare"
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
          <span className="text-foreground">Random Truth or Dare</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={generateTruth}
              size="lg"
              variant="default"
              data-testid="button-truth"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Truth
            </Button>
            <Button
              onClick={generateDare}
              size="lg"
              variant="secondary"
              data-testid="button-dare"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Dare
            </Button>
          </div>

          {result && (
            <Card className={result.type === 'truth' ? 'bg-primary/10' : 'bg-secondary/10'}>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground uppercase font-semibold">
                    {result.type}
                  </p>
                  <p className="text-2xl font-bold" data-testid="text-result">{result.content}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
