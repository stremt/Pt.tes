import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { HelpCircle, RefreshCw, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { riddles } from "@/lib/random-data";

export default function RandomRiddle() {
  const [riddle, setRiddle] = useState<typeof riddles[0] | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useSEO({
    title: "Riddle Generator | Random Offline Riddles | Pixocraft Tools",
    description: "Generate random riddles from static list. Perfect for brain teasers, games, and entertainment.",
    keywords: "riddle generator, riddles offline, brain teasers",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-riddle",
  });

  const generateRiddle = () => {
    const randomIndex = Math.floor(Math.random() * riddles.length);
    setRiddle(riddles[randomIndex]);
    setShowAnswer(false);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get random riddle" },
    { step: 2, title: "Think", description: "Try to solve it" },
    { step: 3, title: "Show Answer", description: "Check if you're right" },
  ];

  const benefits = [
    { icon: <HelpCircle className="h-5 w-5" />, title: "Brain Training", description: "Improve problem-solving" },
    { icon: <HelpCircle className="h-5 w-5" />, title: "Fun", description: "Entertaining puzzles" },
    { icon: <HelpCircle className="h-5 w-5" />, title: "Variety", description: "Multiple riddles" },
    { icon: <HelpCircle className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "How many riddles are available?",
      answer: "We have 8+ classic riddles with varying difficulty levels, perfect for all ages."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Riddle Generator"
        description="Click → get a riddle"
        icon={<HelpCircle className="h-8 w-8" />}
        toolId="random-riddle"
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
          <span className="text-foreground">Random Riddle</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateRiddle}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Random Riddle
          </Button>

          {riddle && (
            <Card>
              <CardContent className="p-8 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Riddle:</p>
                  <p className="text-2xl font-semibold" data-testid="text-question">{riddle.question}</p>
                </div>
                
                {showAnswer ? (
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Answer:</p>
                    <p className="text-xl font-bold" data-testid="text-answer">{riddle.answer}</p>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowAnswer(true)}
                    variant="outline"
                    className="w-full"
                    data-testid="button-show-answer"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Show Answer
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
