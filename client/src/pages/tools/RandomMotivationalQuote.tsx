import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Heart, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motivationalQuotes } from "@/lib/random-data";

export default function RandomMotivationalQuote() {
  const [quote, setQuote] = useState<string | null>(null);

  useSEO({
    title: "Motivational Quote Generator | Offline Static Quotes | Pixocraft Tools",
    description: "Generate offline motivational lines instantly. Perfect for daily inspiration, social media, and positivity.",
    keywords: "motivational quote generator, inspirational quotes, random quotes",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-motivational-quote",
  });

  const generateQuote = () => {
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    setQuote(motivationalQuotes[randomIndex]);
  };

  const howItWorks = [
    { step: 1, title: "Click Generate", description: "Get instant motivation" },
    { step: 2, title: "Read Quote", description: "Absorb the wisdom" },
    { step: 3, title: "Share & Apply", description: "Spread positivity" },
  ];

  const benefits = [
    { icon: <Heart className="h-5 w-5" />, title: "Daily Inspiration", description: "Start your day right" },
    { icon: <Heart className="h-5 w-5" />, title: "Famous Quotes", description: "From great minds" },
    { icon: <Heart className="h-5 w-5" />, title: "Variety", description: "15+ motivational quotes" },
    { icon: <Heart className="h-5 w-5" />, title: "Offline", description: "Works without internet" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Who are the quotes from?",
      answer: "Our collection includes quotes from famous leaders, thinkers, and motivational speakers like Steve Jobs, Theodore Roosevelt, Winston Churchill, Nelson Mandela, and many more."
    },
    {
      question: "Can I share these quotes?",
      answer: "Yes! These quotes are perfect for sharing on social media, using in presentations, or sending to friends for daily motivation."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Motivational Quote Generator"
        description="Click → get new motivational line"
        icon={<Heart className="h-8 w-8" />}
        toolId="random-motivational-quote"
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
          <span className="text-foreground">Random Motivational Quote</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Button
            onClick={generateQuote}
            size="lg"
            className="w-full"
            data-testid="button-generate"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Generate Quote
          </Button>

          {quote && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-2xl font-semibold italic" data-testid="text-quote">
                  "{quote}"
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
