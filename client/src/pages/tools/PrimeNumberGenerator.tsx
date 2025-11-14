import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Hash } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { generatePrimes } from "@/lib/math-utils";

export default function PrimeNumberGenerator() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [primes, setPrimes] = useState<number[]>([]);

  useSEO({
    title: "Prime Number Generator | Generate Prime Numbers | Pixocraft Tools",
    description: "Generate prime numbers in a range. Offline, accurate prime number list generator. Perfect for students and mathematicians.",
    keywords: "prime number generator, list of primes, generate primes, prime numbers in range",
    canonicalUrl: "https://tools.pixocraft.in/tools/prime-number-generator",
  });

  const generate = () => {
    const startNum = parseInt(start);
    const endNum = parseInt(end);

    if (isNaN(startNum) || isNaN(endNum)) {
      return;
    }

    if (startNum > endNum) {
      return;
    }

    const primeList = generatePrimes(startNum, endNum);
    setPrimes(primeList);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What range is supported?",
      answer: "You can generate primes in any range, though very large ranges may take a moment to compute. For optimal performance, we recommend ranges under 10,000 numbers."
    },
    {
      question: "How are primes generated?",
      answer: "We use an optimized algorithm that checks each number for primality by testing divisibility up to its square root, making it efficient for most ranges."
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
            <span className="text-foreground">Prime Number Generator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Hash className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Prime Number Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter range → generate prime list
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
                <CardTitle>Generate Prime Numbers</CardTitle>
                <CardDescription>
                  Enter a range to generate all prime numbers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start</Label>
                    <Input
                      type="number"
                      value={start}
                      onChange={(e) => setStart(e.target.value)}
                      placeholder="e.g., 1"
                      data-testid="input-start"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End</Label>
                    <Input
                      type="number"
                      value={end}
                      onChange={(e) => setEnd(e.target.value)}
                      placeholder="e.g., 100"
                      data-testid="input-end"
                    />
                  </div>
                </div>

                <Button onClick={generate} className="w-full" data-testid="button-generate">
                  Generate Primes
                </Button>

                {primes.length > 0 && (
                  <Card className="bg-muted">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <p className="font-semibold">Found {primes.length} prime numbers</p>
                        </div>
                        <div className="flex flex-wrap gap-2" data-testid="text-primes">
                          {primes.map((prime, index) => (
                            <Badge key={index} variant="secondary">
                              {prime}
                            </Badge>
                          ))}
                        </div>
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
