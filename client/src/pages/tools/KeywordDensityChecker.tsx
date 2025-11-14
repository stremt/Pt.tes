import { useState, useMemo } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

interface KeywordData {
  word: string;
  count: number;
  percentage: string;
}

export default function KeywordDensityChecker() {
  const [text, setText] = useState("");
  const [results, setResults] = useState<KeywordData[]>([]);

  useSEO({
    title: "Keyword Density Checker | SEO Keyword Scanner | Pixocraft Tools",
    description: "Check keyword density of any text. Perfect for SEO, writers & blogs.",
    keywords: "keyword density, seo tool, keyword checker",
    canonicalUrl: "https://tools.pixocraft.in/tools/keyword-density-checker",
  });

  const analyzeKeywords = () => {
    if (!text.trim()) return;

    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(w => w.length > 2);

    const totalWords = words.length;
    const wordCount = new Map<string, number>();

    words.forEach(word => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    });

    const keywordData: KeywordData[] = Array.from(wordCount.entries())
      .map(([word, count]) => ({
        word,
        count,
        percentage: ((count / totalWords) * 100).toFixed(2),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    setResults(keywordData);
  };

  const howItWorks = [
    { step: 1, title: "Paste Content", description: "Enter your blog or article text" },
    { step: 2, title: "Analyze", description: "Click to scan keyword frequency" },
    { step: 3, title: "View Results", description: "Get keyword density with percentage" },
  ];

  const benefits = [
    { icon: <Search className="h-5 w-5" />, title: "Highlights Keywords", description: "Shows top keywords with percentage" },
    { icon: <Search className="h-5 w-5" />, title: "SEO Friendly", description: "Perfect for content optimization" },
    { icon: <Search className="h-5 w-5" />, title: "Writers Tool", description: "Great for blogs & articles" },
    { icon: <Search className="h-5 w-5" />, title: "Instant Results", description: "Analyze thousands of words quickly" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it highlight keywords?",
      answer: "Yes — with percentage. We show the top 20 most frequent keywords along with their exact count and density percentage for easy SEO analysis."
    },
    {
      question: "What is good keyword density for SEO?",
      answer: "For SEO, aim for 1-3% keyword density for your main keywords. Higher than 5% may be seen as keyword stuffing by search engines. Our tool helps you find the perfect balance."
    },
    {
      question: "Can I use this for blog posts?",
      answer: "Absolutely! This tool is perfect for analyzing blog posts, articles, web pages, and any written content to ensure optimal keyword usage for search engine optimization."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Keyword Density Checker"
        description="Paste text → find keyword frequency → optimize SEO content instantly."
        icon={<Search className="h-8 w-8" />}
        toolId="keyword-density-checker"
        category="seo"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Keyword Density Checker</span>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="space-y-4">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your article or blog content here..."
              rows={12}
              data-testid="input-text"
            />

            <Button
              onClick={analyzeKeywords}
              disabled={!text.trim()}
              size="lg"
              className="w-full"
              data-testid="button-analyze"
            >
              <Search className="mr-2 h-5 w-5" />
              Analyze Keyword Density
            </Button>
          </div>

          {results.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Top Keywords</h3>
                <div className="space-y-2">
                  {results.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      data-testid={`keyword-${index}`}
                    >
                      <span className="font-medium">{item.word}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {item.count} times
                        </span>
                        <span className="font-bold text-primary">
                          {item.percentage}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
