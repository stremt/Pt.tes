import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Superscript } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function ExponentCalculator() {
  const [base, setBase] = useState("");
  const [exponent, setExponent] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useSEO({
    title: "Exponent Calculator | Power Calculation Tool | Pixocraft Tools",
    description: "Calculate powers like 8², 5³, etc instantly. Free exponent calculator for students and professionals.",
    keywords: "exponent calculator, power calculator, calculate powers",
    canonicalUrl: "https://tools.pixocraft.in/tools/exponent-calculator",
  });

  const calculate = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);

    if (isNaN(b) || isNaN(e)) {
      return;
    }

    setResult(Math.pow(b, e));
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is an exponent?",
      answer: "An exponent indicates how many times to multiply the base by itself. For example, 5³ = 5 × 5 × 5 = 125."
    },
    {
      question: "Can I use negative exponents?",
      answer: "Yes! Negative exponents represent reciprocals. For example, 2⁻³ = 1/(2³) = 1/8 = 0.125."
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
            <span className="text-foreground">Exponent Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Superscript className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Exponent Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter base & exponent → get results
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
                <CardTitle>Calculate Power</CardTitle>
                <CardDescription>
                  Calculate base raised to exponent
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Base</Label>
                    <Input
                      type="number"
                      value={base}
                      onChange={(e) => setBase(e.target.value)}
                      placeholder="e.g., 2"
                      data-testid="input-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Exponent</Label>
                    <Input
                      type="number"
                      value={exponent}
                      onChange={(e) => setExponent(e.target.value)}
                      placeholder="e.g., 3"
                      data-testid="input-exponent"
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
                        {result.toExponential(2)}
                      </p>
                      <p className="text-lg mt-2">= {result.toLocaleString()}</p>
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
