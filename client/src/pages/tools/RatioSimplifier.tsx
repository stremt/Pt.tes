import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divide } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { simplifyRatio } from "@/lib/math-utils";

export default function RatioSimplifier() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [simplified, setSimplified] = useState<[number, number] | null>(null);

  useSEO({
    title: "Ratio Simplifier | Reduce Ratios Easily | Pixocraft Tools",
    description: "Simplify any ratio like 120:45 into simplest form instantly. Free offline ratio calculator for students and professionals.",
    keywords: "ratio simplifier, simplify ratio, reduce ratio, ratio calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/ratio-simplifier",
  });

  const simplify = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);

    if (isNaN(a) || isNaN(b) || b === 0) {
      return;
    }

    const result = simplifyRatio(a, b);
    setSimplified(result);
  };

  const faqItems: FAQItem[] = [
    {
      question: "How does ratio simplification work?",
      answer: "Ratio simplification divides both numbers by their greatest common divisor (GCD) to get the simplest form. For example, 120:45 simplifies to 8:3."
    },
    {
      question: "Can I simplify decimals?",
      answer: "This tool works best with whole numbers. For decimal ratios, multiply both sides by the same power of 10 to convert to whole numbers first."
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
            <span className="text-foreground">Ratio Simplifier</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Divide className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Ratio Simplifier</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter ratio → get simplified output
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Fast</Badge>
              <Badge variant="secondary">Simple</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Simplify Ratio</CardTitle>
                <CardDescription>
                  Enter two numbers to simplify the ratio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <Label>First Number</Label>
                    <Input
                      type="number"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      placeholder="e.g., 120"
                      data-testid="input-num1"
                    />
                  </div>
                  <div className="text-center pb-2">
                    <span className="text-2xl font-bold">:</span>
                  </div>
                  <div className="space-y-2">
                    <Label>Second Number</Label>
                    <Input
                      type="number"
                      value={num2}
                      onChange={(e) => setNum2(e.target.value)}
                      placeholder="e.g., 45"
                      data-testid="input-num2"
                    />
                  </div>
                </div>

                <Button onClick={simplify} className="w-full" data-testid="button-simplify">
                  Simplify Ratio
                </Button>

                {simplified && (
                  <Card className="bg-primary/10">
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Simplified Ratio</p>
                      <p className="text-5xl font-bold" data-testid="text-result">
                        {simplified[0]} : {simplified[1]}
                      </p>
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
