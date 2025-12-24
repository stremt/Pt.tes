import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { solveQuadratic } from "@/lib/math-utils";

export default function QuadraticSolver() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [result, setResult] = useState<{ roots: number[]; type: string; discriminant: number } | null>(null);

  useSEO({
    title: "Quadratic Calculator | Solve ax² + bx + c Equation | Pixocraft Tools",
    description: "Solve quadratic equations and show roots instantly. Free quadratic equation solver for students and mathematicians.",
    keywords: "quadratic equation solver, quadratic calculator, solve quadratic",
    canonicalUrl: "https://tools.pixocraft.in/tools/quadratic-solver",
  });

  const solve = () => {
    const aVal = parseFloat(a);
    const bVal = parseFloat(b);
    const cVal = parseFloat(c);

    if (isNaN(aVal) || isNaN(bVal) || isNaN(cVal) || aVal === 0) {
      return;
    }

    const solution = solveQuadratic(aVal, bVal, cVal);
    setResult(solution);
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is a quadratic equation?",
      answer: "A quadratic equation is of the form ax² + bx + c = 0, where a ≠ 0. It represents a parabola and can have 0, 1, or 2 real solutions."
    },
    {
      question: "What if discriminant is negative?",
      answer: "If the discriminant (b² - 4ac) is negative, the equation has no real roots (complex roots instead)."
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
            <span className="text-foreground">Quadratic Solver</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Quadratic Equation Solver</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter a, b, c → get equation roots
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
                <CardTitle>Solve ax² + bx + c = 0</CardTitle>
                <CardDescription>
                  Enter coefficients a, b, and c
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>a</Label>
                    <Input
                      type="number"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                      placeholder="e.g., 1"
                      data-testid="input-a"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>b</Label>
                    <Input
                      type="number"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                      placeholder="e.g., -5"
                      data-testid="input-b"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>c</Label>
                    <Input
                      type="number"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                      placeholder="e.g., 6"
                      data-testid="input-c"
                    />
                  </div>
                </div>

                <Button onClick={solve} className="w-full" data-testid="button-solve">
                  Solve Equation
                </Button>

                {result && (
                  <Card className="bg-muted">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Discriminant</p>
                          <p className="text-2xl font-bold">{result.discriminant.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p className="text-xl font-semibold capitalize">{result.type} roots</p>
                        </div>
                        {result.roots.length > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground">Roots</p>
                            <div className="flex gap-4 mt-2" data-testid="text-roots">
                              {result.roots.map((root, index) => (
                                <Badge key={index} variant="secondary" className="text-lg px-4 py-2">
                                  x{index + 1} = {root.toFixed(2)}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
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
