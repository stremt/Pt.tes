import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Circle } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function CircleCalculator() {
  const [radius, setRadius] = useState("");
  const [result, setResult] = useState<{ area: number; circumference: number } | null>(null);

  useSEO({
    title: "Circle Calculator | Area & Circumference | Pixocraft Tools",
    description: "Compute area and circumference with radius/diameter. Free circle calculator for students and professionals.",
    keywords: "circle calculator, area of circle, circumference calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/circle-calculator",
  });

  const calculate = () => {
    const r = parseFloat(radius);

    if (isNaN(r) || r <= 0) {
      return;
    }

    const area = Math.PI * r * r;
    const circumference = 2 * Math.PI * r;

    setResult({ area, circumference });
  };

  const faqItems: FAQItem[] = [
    {
      question: "What's the formula for circle area?",
      answer: "The area of a circle is calculated using the formula: A = πr², where r is the radius. The value of π (pi) is approximately 3.14159."
    },
    {
      question: "How do I calculate from diameter?",
      answer: "If you have the diameter, divide it by 2 to get the radius, then use our calculator. Radius = Diameter ÷ 2."
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
            <span className="text-foreground">Circle Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Circle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Circle Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter radius → get area + circumference
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
                <CardTitle>Calculate Circle Properties</CardTitle>
                <CardDescription>
                  Enter the radius to calculate area and circumference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Radius</Label>
                  <Input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="e.g., 5"
                    data-testid="input-radius"
                  />
                </div>

                <Button onClick={calculate} className="w-full" data-testid="button-calculate">
                  Calculate
                </Button>

                {result && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Area</p>
                        <p className="text-4xl font-bold" data-testid="text-area">
                          {result.area.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">square units</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/10">
                      <CardContent className="p-6 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Circumference</p>
                        <p className="text-4xl font-bold" data-testid="text-circumference">
                          {result.circumference.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">units</p>
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
