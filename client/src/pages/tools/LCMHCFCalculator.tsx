import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { gcd, lcm } from "@/lib/math-utils";

export default function LCMHCFCalculator() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState<{ lcm: number; hcf: number } | null>(null);

  useSEO({
    title: "LCM HCF Calculator | Find LCM & GCD Instantly | Pixocraft Tools",
    description: "Calculate LCM and HCF/GCD of numbers instantly. Free offline tool for students and mathematicians. Fast and accurate.",
    keywords: "lcm calculator, hcf calculator, gcd calculator, lowest common multiple, highest common factor",
    canonicalUrl: "https://tools.pixocraft.in/tools/lcm-hcf-calculator",
  });

  const calculate = () => {
    const a = parseInt(num1);
    const b = parseInt(num2);

    if (isNaN(a) || isNaN(b)) {
      return;
    }

    const hcfValue = gcd(a, b);
    const lcmValue = lcm(a, b);

    setResult({ lcm: lcmValue, hcf: hcfValue });
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is LCM?",
      answer: "LCM (Least Common Multiple) is the smallest positive number that is divisible by both numbers. For example, LCM of 4 and 6 is 12."
    },
    {
      question: "What is HCF/GCD?",
      answer: "HCF (Highest Common Factor) or GCD (Greatest Common Divisor) is the largest number that divides both numbers. For example, HCF of 12 and 18 is 6."
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
            <span className="text-foreground">LCM HCF Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">LCM HCF Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter numbers → find LCM & HCF
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Instant</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate LCM & HCF</CardTitle>
                <CardDescription>
                  Enter two numbers to find their LCM and HCF/GCD
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Number</Label>
                    <Input
                      type="number"
                      value={num1}
                      onChange={(e) => setNum1(e.target.value)}
                      placeholder="e.g., 12"
                      data-testid="input-num1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Second Number</Label>
                    <Input
                      type="number"
                      value={num2}
                      onChange={(e) => setNum2(e.target.value)}
                      placeholder="e.g., 18"
                      data-testid="input-num2"
                    />
                  </div>
                </div>

                <Button onClick={calculate} className="w-full" data-testid="button-calculate">
                  Calculate
                </Button>

                {result && (
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">LCM</p>
                        <p className="text-4xl font-bold" data-testid="text-lcm">{result.lcm}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">HCF / GCD</p>
                        <p className="text-4xl font-bold" data-testid="text-hcf">{result.hcf}</p>
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
