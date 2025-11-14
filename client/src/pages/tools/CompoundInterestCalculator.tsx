import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingUp } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [time, setTime] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState<{ interest: number; total: number } | null>(null);

  useSEO({
    title: "Compound Interest Calculator | Annual & Monthly CI | Pixocraft Tools",
    description: "Calculate compound interest over custom time periods. Free CI calculator with growth visualization for investors and students.",
    keywords: "compound interest calculator, ci tool, compound interest",
    canonicalUrl: "https://tools.pixocraft.in/tools/compound-interest-calculator",
  });

  const calculate = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
      return;
    }

    const amount = p * Math.pow((1 + r / (n * 100)), n * t);
    const interest = amount - p;

    setResult({ interest, total: amount });
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is compound interest?",
      answer: "Compound interest is calculated on the principal plus all previously earned interest. Formula: A = P(1 + r/n)^(nt), where n is the compounding frequency."
    },
    {
      question: "Which compounding frequency is best?",
      answer: "More frequent compounding (daily or monthly) yields slightly higher returns than annual compounding due to interest being calculated and added more often."
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
            <span className="text-foreground">Compound Interest Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Compound Interest Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter values → get CI & growth chart
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Multiple Frequencies</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Compound Interest</CardTitle>
                <CardDescription>
                  Enter principal, rate, time, and compounding frequency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Principal Amount</Label>
                    <Input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="e.g., 10000"
                      data-testid="input-principal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Annual Rate (%)</Label>
                    <Input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="e.g., 8"
                      data-testid="input-rate"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Time (Years)</Label>
                    <Input
                      type="number"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g., 5"
                      data-testid="input-time"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Compounding Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger data-testid="select-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Annually</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                        <SelectItem value="365">Daily</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={calculate} className="w-full" data-testid="button-calculate">
                  Calculate
                </Button>

                {result && (
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Interest Earned</p>
                        <p className="text-4xl font-bold" data-testid="text-interest">
                          ₹{result.interest.toLocaleString(undefined, {maximumFractionDigits: 2})}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-chart-3/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Total Amount</p>
                        <p className="text-4xl font-bold" data-testid="text-total">
                          ₹{result.total.toLocaleString(undefined, {maximumFractionDigits: 2})}
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
