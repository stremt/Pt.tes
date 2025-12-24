import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Divide } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { getPrimeFactors } from "@/lib/math-utils";

export default function PrimeFactorization() {
  const [number, setNumber] = useState("");
  const [factors, setFactors] = useState<number[]>([]);

  useSEO({
    title: "Prime Factorization Calculator | Factor Numbers | Pixocraft Tools",
    description: "Break any number into prime factors instantly. Fast, accurate prime factorization tool. Perfect for students and math enthusiasts.",
    keywords: "prime factorization, factor number tool, prime factors calculator, factorize number",
    canonicalUrl: "https://tools.pixocraft.in/tools/prime-factorization",
  });

  const factorize = () => {
    const num = parseInt(number);
    if (isNaN(num) || num < 2) {
      setFactors([]);
      return;
    }

    const primeFactors = getPrimeFactors(num);
    setFactors(primeFactors);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is prime factorization?",
      answer: "Prime factorization is the process of breaking down a number into its prime number factors. For example, 12 = 2 × 2 × 3."
    },
    {
      question: "Can I factor large numbers?",
      answer: "Yes, our tool can handle most numbers efficiently. Very large numbers may take a moment to compute."
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
            <span className="text-foreground">Prime Factorization</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Divide className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Prime Factorization Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter number → get prime factors
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Instant</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Find Prime Factors</CardTitle>
                <CardDescription>
                  Enter any number to get its prime factorization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Enter Number</Label>
                  <Input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="e.g., 60"
                    data-testid="input-number"
                  />
                </div>

                <Button onClick={factorize} className="w-full" data-testid="button-factorize">
                  Get Prime Factors
                </Button>

                {factors.length > 0 && (
                  <Card className="bg-muted">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <p className="font-semibold">Prime Factors:</p>
                        <div className="flex flex-wrap gap-2" data-testid="text-factors">
                          {factors.map((factor, index) => (
                            <Badge key={index} variant="secondary" className="text-lg px-4 py-2">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {number} = {factors.join(' × ')}
                        </p>
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
