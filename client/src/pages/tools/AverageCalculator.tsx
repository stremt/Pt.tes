import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Divide, Calculator, Zap } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function AverageCalculator() {
  const [input, setInput] = useState("");
  const [average, setAverage] = useState<number | null>(null);
  const [sum, setSum] = useState<number | null>(null);
  const [count, setCount] = useState<number | null>(null);

  useSEO({
    title: "Average Calculator Online | Mean, Sum & Count Tool | Pixocraft Tools",
    description: "Calculate average, mean, sum and count of numbers instantly. Perfect for students & data work.",
    keywords: "average calculator, mean calculator, number average tool, calculate mean, sum calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/average-calculator",
  });

  const calculate = () => {
    const numbers = input
      .split(/[\s,]+/)
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n));

    if (numbers.length === 0) {
      setAverage(null);
      setSum(null);
      setCount(null);
      return;
    }

    const total = numbers.reduce((acc, num) => acc + num, 0);
    const avg = total / numbers.length;

    setSum(total);
    setAverage(avg);
    setCount(numbers.length);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I enter multiple numbers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, comma or space separated."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools/math" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Average Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Divide className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Average Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter numbers → get average, sum, count instantly. Perfect for students & data work
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Instant</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Average</CardTitle>
                <CardDescription>
                  Enter numbers separated by commas or spaces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Enter Numbers</Label>
                  <Textarea
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      calculate();
                    }}
                    placeholder="Enter numbers (e.g., 10, 20, 30, 40, 50)"
                    className="min-h-[100px]"
                    data-testid="textarea-numbers"
                  />
                </div>

                {average !== null && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Average (Mean)</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold" data-testid="result-average">
                          {average.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Sum</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold" data-testid="result-sum">
                          {sum?.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Count</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold" data-testid="result-count">
                          {count}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Perfect For</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <Calculator className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Calculate grades, test scores, and GPA quickly
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Data Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Find mean values in datasets and statistical work
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Divide className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Business</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Calculate average sales, expenses, and performance metrics
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
