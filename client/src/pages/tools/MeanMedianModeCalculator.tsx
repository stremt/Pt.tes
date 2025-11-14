import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart3 } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { calculateMean, calculateMedian, calculateMode } from "@/lib/math-utils";

export default function MeanMedianModeCalculator() {
  const [input, setInput] = useState("");
  const [stats, setStats] = useState<{ mean: number; median: number; mode: number[] } | null>(null);

  useSEO({
    title: "Mean Median Mode Calculator | Statistics Tool | Pixocraft Tools",
    description: "Calculate mean, median & mode of datasets offline. Free statistical calculator for students and data analysts.",
    keywords: "mean calculator, mode calculator, median calculator, statistics tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/mean-median-mode-calculator",
  });

  const calculate = () => {
    const numbers = input
      .split(/[\s,]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numbers.length === 0) {
      return;
    }

    const mean = calculateMean(numbers);
    const median = calculateMedian(numbers);
    const mode = calculateMode(numbers);

    setStats({ mean, median, mode });
  };

  const faqItems: FAQItem[] = [
    {
      question: "What's the difference between mean, median, and mode?",
      answer: "Mean is the average (sum divided by count). Median is the middle value when sorted. Mode is the most frequently occurring value."
    },
    {
      question: "Can there be multiple modes?",
      answer: "Yes! If multiple numbers appear with the same highest frequency, they are all modes. This is called a multimodal distribution."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            {" / "}
            <span className="text-foreground">Mean Median Mode Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Mean Median Mode Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Paste numbers → get stats instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Fast</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Statistics</CardTitle>
                <CardDescription>
                  Enter numbers separated by commas or spaces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Enter Numbers</Label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="e.g., 10, 20, 20, 30, 40"
                    className="min-h-[100px]"
                    data-testid="textarea-numbers"
                  />
                </div>

                <Button onClick={calculate} className="w-full" data-testid="button-calculate">
                  Calculate Statistics
                </Button>

                {stats && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Mean (Average)</p>
                        <p className="text-3xl font-bold" data-testid="text-mean">
                          {stats.mean.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Median (Middle)</p>
                        <p className="text-3xl font-bold" data-testid="text-median">
                          {stats.median.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Mode (Most Frequent)</p>
                        <p className="text-3xl font-bold" data-testid="text-mode">
                          {stats.mode.join(', ')}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
