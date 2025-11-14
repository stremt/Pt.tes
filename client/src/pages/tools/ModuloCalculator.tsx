import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function ModuloCalculator() {
  const [dividend, setDividend] = useState("");
  const [divisor, setDivisor] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useSEO({
    title: "Modulo Calculator | Find Remainder Easily | Pixocraft Tools",
    description: "Compute modular arithmetic (a mod b) offline. Free modulo calculator for programmers and students.",
    keywords: "modulo calculator, mod calculator, remainder calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/modulo-calculator",
  });

  const calculate = () => {
    const a = parseFloat(dividend);
    const b = parseFloat(divisor);

    if (isNaN(a) || isNaN(b) || b === 0) {
      return;
    }

    setResult(a % b);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is modulo operation?",
      answer: "Modulo operation finds the remainder after division. For example, 17 mod 5 = 2, because 17 ÷ 5 = 3 remainder 2."
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
            <span className="text-foreground">Modulo Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Percent className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Modulo Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter numbers → get result
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
                <CardTitle>Calculate Modulo</CardTitle>
                <CardDescription>
                  Find the remainder (a mod b)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Dividend (a)</Label>
                    <Input
                      type="number"
                      value={dividend}
                      onChange={(e) => setDividend(e.target.value)}
                      placeholder="e.g., 17"
                      data-testid="input-dividend"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Divisor (b)</Label>
                    <Input
                      type="number"
                      value={divisor}
                      onChange={(e) => setDivisor(e.target.value)}
                      placeholder="e.g., 5"
                      data-testid="input-divisor"
                    />
                  </div>
                </div>

                <Button onClick={calculate} className="w-full" data-testid="button-calculate">
                  Calculate
                </Button>

                {result !== null && (
                  <Card className="bg-primary/10">
                    <CardContent className="p-6 text-center">
                      <p className="text-sm text-muted-foreground mb-2">Result</p>
                      <p className="text-5xl font-bold" data-testid="text-result">
                        {result}
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
