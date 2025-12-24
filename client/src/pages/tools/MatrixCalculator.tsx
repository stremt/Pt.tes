import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Calculator, Plus, Minus, X as MultiplyIcon, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

type Matrix = number[][];

export default function MatrixCalculator() {
  const [size, setSize] = useState<'2x2' | '3x3'>('2x2');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply'>('add');
  const [matrixA, setMatrixA] = useState<Matrix>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[5, 6], [7, 8]]);
  const [result, setResult] = useState<Matrix | null>(null);
  const { toast } = useToast();

  useSEO({
    title: "Matrix Calculator Online | Add, Subtract & Multiply Matrices | Pixocraft Tools",
    description: "Solve matrix addition, subtraction & multiplication offline. Fast, accurate & great for students.",
    keywords: "matrix calculator, matrix multiplication, add matrices online, matrix operations",
    canonicalUrl: "https://tools.pixocraft.in/tools/matrix-calculator",
  });

  const relatedTools = getRelatedTools("matrix-calculator", 6);

  const updateSize = (newSize: '2x2' | '3x3') => {
    setSize(newSize);
    if (newSize === '2x2') {
      setMatrixA([[1, 2], [3, 4]]);
      setMatrixB([[5, 6], [7, 8]]);
    } else {
      setMatrixA([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      setMatrixB([[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
    }
    setResult(null);
  };

  const updateCell = (matrix: 'A' | 'B', row: number, col: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    const setter = matrix === 'A' ? setMatrixA : setMatrixB;
    const current = matrix === 'A' ? matrixA : matrixB;
    
    const newMatrix = current.map((r, i) =>
      r.map((c, j) => (i === row && j === col ? numValue : c))
    );
    setter(newMatrix);
  };

  const calculate = () => {
    let resultMatrix: Matrix;

    try {
      switch (operation) {
        case 'add':
          resultMatrix = matrixA.map((row, i) =>
            row.map((val, j) => val + matrixB[i][j])
          );
          break;
        case 'subtract':
          resultMatrix = matrixA.map((row, i) =>
            row.map((val, j) => val - matrixB[i][j])
          );
          break;
        case 'multiply':
          const n = matrixA.length;
          resultMatrix = Array(n).fill(0).map(() => Array(n).fill(0));
          for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
              for (let k = 0; k < n; k++) {
                resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
              }
            }
          }
          break;
        default:
          return;
      }

      setResult(resultMatrix);
      toast({
        title: "Calculated Successfully",
        description: `Matrix ${operation} completed`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate matrix operation",
        variant: "destructive",
      });
    }
  };

  const renderMatrix = (matrix: Matrix, label: string, editable: boolean = false, matrixId: 'A' | 'B' | 'Result' = 'A') => (
    <div className="space-y-2">
      <Label className="text-center block">{label}</Label>
      <div className="flex flex-col gap-2">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-2 justify-center">
            {row.map((cell, j) => (
              <Input
                key={j}
                type="number"
                value={cell}
                onChange={(e) => editable && updateCell(matrixId as 'A' | 'B', i, j, e.target.value)}
                readOnly={!editable}
                className={`w-16 text-center ${!editable ? 'bg-muted/50' : ''}`}
                data-testid={`matrix-${matrixId}-${i}-${j}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  const faqItems: FAQItem[] = [
    {
      question: "Does it support 3×3 and 4×4?",
      answer: "Yes. The calculator supports 2×2 and 3×3 matrices with addition, subtraction, and multiplication operations."
    },
    {
      question: "Does it work offline?",
      answer: "Yes! The matrix calculator works completely offline in your browser with no internet connection required."
    },
    {
      question: "Can I use decimal numbers?",
      answer: "Yes, the calculator supports decimal numbers (floating point) in all matrix operations."
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
            <Link href="/tools/math" className="hover:text-foreground" data-testid="link-tools">Math Tools</Link>
            {" / "}
            <span className="text-foreground">Matrix Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Matrix Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Add, subtract & multiply matrices instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">2×2</Badge>
              <Badge variant="secondary">3×3</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Matrices</CardTitle>
                <CardDescription>
                  Choose matrix size, fill values, and calculate operations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-4 flex-wrap">
                  <div className="flex-1 min-w-[150px]">
                    <Label>Matrix Size</Label>
                    <Select value={size} onValueChange={(v) => updateSize(v as '2x2' | '3x3')}>
                      <SelectTrigger className="mt-2" data-testid="select-size">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2x2">2×2</SelectItem>
                        <SelectItem value="3x3">3×3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex-1 min-w-[150px]">
                    <Label>Operation</Label>
                    <Select value={operation} onValueChange={(v) => setOperation(v as any)}>
                      <SelectTrigger className="mt-2" data-testid="select-operation">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add">
                          <div className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add
                          </div>
                        </SelectItem>
                        <SelectItem value="subtract">
                          <div className="flex items-center gap-2">
                            <Minus className="h-4 w-4" />
                            Subtract
                          </div>
                        </SelectItem>
                        <SelectItem value="multiply">
                          <div className="flex items-center gap-2">
                            <MultiplyIcon className="h-4 w-4" />
                            Multiply
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {renderMatrix(matrixA, 'Matrix A', true, 'A')}
                  {renderMatrix(matrixB, 'Matrix B', true, 'B')}
                </div>

                <Button onClick={calculate} className="w-full" size="lg" data-testid="button-calculate">
                  <Calculator className="mr-2 h-5 w-5" />
                  Calculate
                </Button>

                {result && (
                  <div className="mt-8">
                    <Card className="bg-muted/50">
                      <CardHeader>
                        <CardTitle className="text-center">Result</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {renderMatrix(result, '', false, 'Result')}
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
                <h2 className="text-3xl md:text-4xl font-bold">About Matrix Calculator</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Choose matrix size → fill values → calculate instantly. Perfect for engineering, math & programming.
                </p>
              </div>

              <div className="text-center space-y-4 mb-12 mt-16">
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
