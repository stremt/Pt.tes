import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Calculator, Plus, Minus, X as MultiplyIcon, Divide, Equal, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

function gcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : gcd(b, a % b);
}

function simplifyFraction(numerator: number, denominator: number): { num: number; den: number } {
  if (denominator === 0) return { num: 0, den: 1 };
  const divisor = gcd(numerator, denominator);
  let num = numerator / divisor;
  let den = denominator / divisor;
  
  if (den < 0) {
    num = -num;
    den = -den;
  }
  
  return { num, den };
}

export default function FractionCalculator() {
  const [num1, setNum1] = useState("1");
  const [den1, setDen1] = useState("2");
  const [num2, setNum2] = useState("1");
  const [den2, setDen2] = useState("3");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<{ num: number; den: number } | null>(null);
  const { toast } = useToast();

  useSEO({
    title: "Fraction Calculator Online | Add, Subtract, Multiply & Divide Fractions | Pixocraft Tools",
    description: "Solve fractions instantly with addition, subtraction, multiplication, division & simplification. Offline & accurate.",
    keywords: "fraction calculator, add fractions, simplify fractions, fraction solver, multiply fractions, divide fractions",
    canonicalUrl: "https://tools.pixocraft.in/tools/fraction-calculator",
  });

  const relatedTools = getRelatedTools("fraction-calculator", 6);

  const calculate = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    if (d1 === 0 || d2 === 0) {
      toast({
        title: "Invalid Input",
        description: "Denominator cannot be zero",
        variant: "destructive",
      });
      return;
    }

    let resultNum: number;
    let resultDen: number;

    switch (operation) {
      case "add":
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case "subtract":
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case "multiply":
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case "divide":
        if (n2 === 0) {
          toast({
            title: "Invalid Operation",
            description: "Cannot divide by zero",
            variant: "destructive",
          });
          return;
        }
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
      default:
        return;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    setResult(simplified);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Can it simplify fractions?",
      answer: "Yes, fully automatic. The calculator automatically simplifies all fraction results to their lowest terms using the greatest common divisor (GCD) method."
    },
    {
      question: "Does it work offline?",
      answer: "Yes! The fraction calculator works completely offline in your browser with no internet connection required."
    },
    {
      question: "Can I use negative fractions?",
      answer: "Yes, you can enter negative numerators. The calculator properly handles negative fractions and maintains the correct sign in results."
    }
  ];

  return (
    <>
      <StructuredData data={generateFAQSchema(faqItems)} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools/math" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Fraction Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Fraction Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Add, subtract, multiply & divide fractions with automatic simplification
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Auto Simplify</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Fractions</CardTitle>
                <CardDescription>
                  Enter fractions and choose an operation to get instant results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 flex-wrap justify-center">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-2 items-center">
                      <Input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        className="w-24 text-center"
                        placeholder="1"
                        data-testid="input-numerator-1"
                      />
                      <div className="h-px w-20 bg-border" />
                      <Input
                        type="number"
                        value={den1}
                        onChange={(e) => setDen1(e.target.value)}
                        className="w-24 text-center"
                        placeholder="2"
                        data-testid="input-denominator-1"
                      />
                    </div>
                  </div>

                  <Select value={operation} onValueChange={setOperation}>
                    <SelectTrigger className="w-24" data-testid="select-operation">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add" data-testid="option-add">
                        <div className="flex items-center gap-2">
                          <Plus className="h-4 w-4" />+
                        </div>
                      </SelectItem>
                      <SelectItem value="subtract" data-testid="option-subtract">
                        <div className="flex items-center gap-2">
                          <Minus className="h-4 w-4" />-
                        </div>
                      </SelectItem>
                      <SelectItem value="multiply" data-testid="option-multiply">
                        <div className="flex items-center gap-2">
                          <MultiplyIcon className="h-4 w-4" />×
                        </div>
                      </SelectItem>
                      <SelectItem value="divide" data-testid="option-divide">
                        <div className="flex items-center gap-2">
                          <Divide className="h-4 w-4" />÷
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-2 items-center">
                      <Input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        className="w-24 text-center"
                        placeholder="1"
                        data-testid="input-numerator-2"
                      />
                      <div className="h-px w-20 bg-border" />
                      <Input
                        type="number"
                        value={den2}
                        onChange={(e) => setDen2(e.target.value)}
                        className="w-24 text-center"
                        placeholder="3"
                        data-testid="input-denominator-2"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button onClick={calculate} size="lg" data-testid="button-calculate">
                    <Equal className="mr-2 h-5 w-5" />
                    Calculate
                  </Button>
                </div>

                {result && (
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="text-center text-lg">Result (Simplified)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center gap-2" data-testid="result-fraction">
                        <div className="text-5xl font-bold">{result.num}</div>
                        <div className="h-1 w-32 bg-primary rounded" />
                        <div className="text-5xl font-bold">{result.den}</div>
                      </div>
                      {result.den === 1 && (
                        <p className="text-center mt-4 text-muted-foreground">
                          = {result.num} (whole number)
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About Fraction Calculator</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Enter fractions → get instant answers with steps. Perfect for students, teachers & math work.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6 mb-12">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-semibold mb-4">Features</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>✓ Add, subtract, multiply, and divide fractions</li>
                      <li>✓ Automatic simplification to lowest terms</li>
                      <li>✓ Works with negative fractions</li>
                      <li>✓ 100% offline and private</li>
                      <li>✓ Instant calculation results</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
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

          {relatedTools.length > 0 && (
            <section className="py-16">
              <div className="container mx-auto px-4 max-w-7xl">
                <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedTools.map((tool) => {
                    const Icon = getToolIcon(tool.icon);
                    return (
                      <Link key={tool.id} href={tool.path}>
                        <Card className="hover-elevate active-elevate-2 h-full cursor-pointer">
                          <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                            </div>
                            <CardTitle className="text-lg">{tool.name}</CardTitle>
                            <CardDescription>{tool.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center text-primary font-medium">
                              Try it now
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
