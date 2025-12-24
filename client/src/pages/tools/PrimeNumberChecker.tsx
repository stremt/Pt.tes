import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash, CheckCircle, XCircle } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { isPrime } from "@/lib/math-utils";

export default function PrimeNumberChecker() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState<{ isPrime: boolean; message: string } | null>(null);

  useSEO({
    title: "Prime Number Checker | Check If Number Is Prime | Pixocraft Tools",
    description: "Instantly check whether a number is prime or composite. Fully offline prime number verification tool. Fast, accurate, and supports large numbers.",
    keywords: "prime number checker, is prime tool, check prime number, prime or composite",
    canonicalUrl: "https://tools.pixocraft.in/tools/prime-number-checker",
  });

  const checkPrime = () => {
    const num = parseInt(number);
    if (isNaN(num)) {
      setResult({ isPrime: false, message: "Please enter a valid number" });
      return;
    }

    const prime = isPrime(num);
    setResult({
      isPrime: prime,
      message: prime 
        ? `${num} is a prime number` 
        : `${num} is not a prime number (composite)`
    });
  };

  const faqItems: FAQItem[] = [
    {
      question: "Large numbers supported?",
      answer: "Yes. Our prime number checker can efficiently verify numbers up to millions. The algorithm uses optimized mathematical techniques to check primality quickly."
    },
    {
      question: "What is a prime number?",
      answer: "A prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself. For example, 2, 3, 5, 7, 11 are prime numbers."
    },
    {
      question: "Is 1 a prime number?",
      answer: "No, 1 is not considered a prime number. By definition, a prime number must have exactly two distinct positive divisors: 1 and itself. Since 1 only has one divisor, it's not prime."
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
            <span className="text-foreground">Prime Number Checker</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Hash className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Prime Number Checker</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter number → check prime instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Fast</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Check Prime Number</CardTitle>
                <CardDescription>
                  Enter any number to check if it's prime
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Enter Number</Label>
                  <Input
                    type="number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="e.g., 17"
                    data-testid="input-number"
                  />
                </div>

                <Button onClick={checkPrime} className="w-full" data-testid="button-check">
                  Check Prime
                </Button>

                {result && (
                  <Card className={result.isPrime ? "bg-chart-3/10" : "bg-destructive/10"}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        {result.isPrime ? (
                          <CheckCircle className="h-8 w-8 text-chart-3" />
                        ) : (
                          <XCircle className="h-8 w-8 text-destructive" />
                        )}
                        <p className="text-lg font-semibold" data-testid="text-result">
                          {result.message}
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
