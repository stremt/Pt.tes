import { Breadcrumb } from "@/components/Breadcrumb";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { BarChart3, RotateCcw } from "lucide-react";

export default function WordFrequencyCounter() {
  const [input, setInput] = useState("");

  useSEO({
    title: "Word Frequency Counter | Count Word Occurrences | Pixocraft Tools",
    description: "Analyze text and count frequency of each word. Great for SEO & writing.",
    keywords: "word frequency tool, repeated words, text analyzer",
    canonicalUrl: "https://tools.pixocraft.in/tools/word-frequency-counter",
  });

  const getWordFrequency = (text: string): Array<{word: string; count: number}> => {
    if (!text.trim()) return [];
    
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 0);
    
    const frequency: Record<string, number> = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .map(([word, count]) => ({ word, count }))
      .sort((a, b) => b.count - a.count);
  };

  const wordFrequency = getWordFrequency(input);

  return (
    <>
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Text Tools", url: "/tools/text" },
            { label: "Word Frequency Counter" },
          ]}
        />
      </div>
      <ToolLayout
        title="Word Frequency Counter"
        description="Paste text → see frequency of each word immediately."
        icon={<BarChart3 className="h-10 w-10 text-primary" />}
        toolId="word-frequency-counter"
        category="text"
        howItWorks={[
        { step: 1, title: "Paste Text", description: "Enter any text or article." },
        { step: 2, title: "Auto Analyze", description: "Words are counted automatically." },
        { step: 3, title: "View Results", description: "See frequency sorted by most common." },
      ]}
      benefits={[
        { icon: <BarChart3 className="h-6 w-6 text-primary" />, title: "SEO Analysis", description: "Identify keyword density for SEO." },
      ]}
      faqs={[
        { question: "How does it count words?", answer: "It splits text by spaces and counts occurrences of each unique word, case-insensitive." },
        { question: "Is it good for SEO?", answer: "Yes! Perfect for analyzing keyword frequency and avoiding over-optimization." },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Enter Text to Analyze</span>
              {input && (
                <Button variant="ghost" size="sm" onClick={() => setInput("")} data-testid="button-clear">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste your text here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[200px] text-base"
              data-testid="input-text"
            />
          </CardContent>
        </Card>

        {wordFrequency.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Word Frequency Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {wordFrequency.map(({ word, count }, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded hover-elevate"
                    data-testid={`row-word-${index}`}
                  >
                    <span className="font-mono font-semibold">{word}</span>
                    <div className="flex items-center gap-3">
                      <div className="h-2 bg-primary rounded-full" style={{ width: `${Math.min(count * 20, 200)}px` }} />
                      <span className="font-bold text-primary min-w-[3ch] text-right">{count}</span>
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
