import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { generateFibonacci } from "@/lib/math-utils";

export default function FibonacciGenerator() {
  const [count, setCount] = useState("");
  const [sequence, setSequence] = useState<number[]>([]);

  useSEO({
    title: "Fibonacci Generator | Generate Sequence Numbers | Pixocraft Tools",
    description: "Generate Fibonacci sequence up to any length. Free Fibonacci calculator for students and mathematicians.",
    keywords: "fibonacci generator, fibonacci numbers, fibonacci sequence",
    canonicalUrl: "https://tools.pixocraft.in/tools/fibonacci-generator",
  });

  const generate = () => {
    const num = parseInt(count);

    if (isNaN(num) || num <= 0) {
      return;
    }

    const fib = generateFibonacci(Math.min(num, 50));
    setSequence(fib);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is the Fibonacci sequence?",
      answer: "The Fibonacci sequence is a series where each number is the sum of the two preceding ones. It starts: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34..."
    },
    {
      question: "How many numbers can I generate?",
      answer: "You can generate up to 50 Fibonacci numbers. Beyond this, the numbers become extremely large."
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
            <span className="text-foreground">Fibonacci Generator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Hash className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Fibonacci Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter count → generate Fibonacci sequence
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Fast</Badge>
              <Badge variant="secondary">Educational</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Generate Fibonacci Sequence</CardTitle>
                <CardDescription>
                  Enter how many Fibonacci numbers you want to generate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Number of Terms</Label>
                  <Input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder="e.g., 10"
                    max="50"
                    data-testid="input-count"
                  />
                </div>

                <Button onClick={generate} className="w-full" data-testid="button-generate">
                  Generate Sequence
                </Button>

                {sequence.length > 0 && (
                  <Card className="bg-muted">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <p className="font-semibold">
                          Generated {sequence.length} Fibonacci numbers:
                        </p>
                        <div className="flex flex-wrap gap-2" data-testid="text-sequence">
                          {sequence.map((num, index) => (
                            <Badge key={index} variant="secondary" className="text-base px-3 py-1">
                              {num}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
