import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, TrendingUp, TrendingDown } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function PercentageChangeCalculator() {
  const [oldValue, setOldValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [result, setResult] = useState<{ change: number; type: 'increase' | 'decrease' | 'none' } | null>(null);

  useSEO({
    title: "Percentage Change Calculator | Increase/Decrease | Pixocraft Tools",
    description: "Calculate percentage increase or decrease quickly. Free percentage change calculator for business, finance, and students.",
    keywords: "percentage change, percent increase decrease, calculate percentage difference",
    canonicalUrl: "https://tools.pixocraft.in/tools/percentage-change-calculator",
  });

  const calculate = () => {
    const old = parseFloat(oldValue);
    const newVal = parseFloat(newValue);

    if (isNaN(old) || isNaN(newVal) || old === 0) {
      return;
    }

    const change = ((newVal - old) / old) * 100;
    const type = change > 0 ? 'increase' : change < 0 ? 'decrease' : 'none';

    setResult({ change: Math.abs(change), type });
  };

  const faqItems: FAQItem[] = [
    {
      question: "How is percentage change calculated?",
      answer: "Percentage change = ((New Value - Old Value) / Old Value) × 100. A positive result indicates an increase, while negative indicates a decrease."
    },
    {
      question: "What if the old value is zero?",
      answer: "Percentage change cannot be calculated when the old value is zero, as it would require division by zero which is undefined in mathematics."
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
            <span className="text-foreground">Percentage Change Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Percent className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Percentage Change Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter values → see % change
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
                <CardTitle>Calculate Percentage Change</CardTitle>
                <CardDescription>
                  Enter old and new values to calculate the percentage change
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Old Value</Label>
                    <Input
                      type="number"
                      value={oldValue}
                      onChange={(e) => setOldValue(e.target.value)}
                      placeholder="e.g., 100"
                      data-testid="input-old-value"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>New Value</Label>
                    <Input
                      type="number"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="e.g., 150"
                      data-testid="input-new-value"
                    />
                  </div>
                </div>

                <Button onClick={calculate} className="w-full" data-testid="button-calculate">
                  Calculate Change
                </Button>

                {result && (
                  <Card className={result.type === 'increase' ? "bg-chart-3/10" : "bg-chart-1/10"}>
                    <CardContent className="p-6 text-center">
                      <div className="flex items-center justify-center gap-3 mb-2">
                        {result.type === 'increase' ? (
                          <TrendingUp className="h-8 w-8 text-chart-3" />
                        ) : (
                          <TrendingDown className="h-8 w-8 text-chart-1" />
                        )}
                      </div>
                      <p className="text-5xl font-bold mb-2" data-testid="text-result">
                        {result.change.toFixed(2)}%
                      </p>
                      <p className="text-lg font-semibold capitalize">
                        {result.type}
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
