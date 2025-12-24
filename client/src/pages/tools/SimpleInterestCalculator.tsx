import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);

  useSEO({
    title: "Simple Interest Calculator | Calculate SI Instantly | Pixocraft Tools",
    description: "Calculate simple interest & total amount quickly. Free SI calculator for students, finance professionals, and investors.",
    keywords: "simple interest tool, si calculator, interest calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/simple-interest-calculator",
  });

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      return;
    }

    const interest = (p * r * t) / 100;
    const total = p + interest;

    setResult({ interest, total });
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is simple interest?",
      answer: "Simple Interest (SI) is calculated using the formula: SI = (P × R × T) / 100, where P is principal, R is rate of interest per year, and T is time in years."
    },
    {
      question: "How is it different from compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on principal plus previously earned interest."
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
            <Link href="/tools/math" className="hover:text-foreground">Math Tools</Link>
            {" / "}
            <span className="text-foreground">Simple Interest Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Simple Interest Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter P, R, T → get interest
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
                <CardTitle>Calculate Simple Interest</CardTitle>
                <CardDescription>
                  Enter principal, rate, and time period
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Principal (P)</Label>
                    <Input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="e.g., 10000"
                      data-testid="input-principal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Rate (R %)</Label>
                    <Input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="e.g., 5"
                      data-testid="input-rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time (Years)</Label>
                    <Input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g., 2"
                      data-testid="input-time"
                    />
                  </div>
                </div>

                <Button onClick={calculate} className="w-full" data-testid="button-calculate">
                  Calculate Interest
                </Button>

                {result && (
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Simple Interest</p>
                        <p className="text-4xl font-bold" data-testid="text-interest">
                          ₹{result.interest.toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                        <p className="text-4xl font-bold" data-testid="text-total">
                          ₹{result.total.toLocaleString()}
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
