import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { RefreshCw, Hash, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

function numberToRoman(num: number): string {
  if (num < 1 || num > 3999) {
    throw new Error("Number must be between 1 and 3999");
  }

  const romanNumerals: [number, string][] = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];

  let result = '';
  for (const [value, numeral] of romanNumerals) {
    while (num >= value) {
      result += numeral;
      num -= value;
    }
  }
  return result;
}

function romanToNumber(roman: string): number {
  const romanMap: { [key: string]: number } = {
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };

  roman = roman.toUpperCase();
  let result = 0;
  
  for (let i = 0; i < roman.length; i++) {
    const current = romanMap[roman[i]];
    const next = romanMap[roman[i + 1]];
    
    if (!current) {
      throw new Error(`Invalid Roman numeral: ${roman[i]}`);
    }
    
    if (next && current < next) {
      result -= current;
    } else {
      result += current;
    }
  }
  
  return result;
}

export default function RomanNumeralConverter() {
  const [numberInput, setNumberInput] = useState("2024");
  const [romanInput, setRomanInput] = useState("MMXXIV");
  const [numberToRomanResult, setNumberToRomanResult] = useState("");
  const [romanToNumberResult, setRomanToNumberResult] = useState("");
  const { toast } = useToast();

  useSEO({
    title: "Roman Numeral Converter | Roman ↔ Number Instantly | Pixocraft Tools",
    description: "Convert Roman numerals to numbers or numbers to Roman instantly. Offline, accurate & easy.",
    keywords: "roman numeral converter, number to roman, roman calculator, roman to number converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/roman-numeral-converter",
  });

  const relatedTools = getRelatedTools("roman-numeral-converter", 6);

  const handleNumberToRoman = () => {
    try {
      const num = parseInt(numberInput);
      if (isNaN(num)) {
        toast({
          title: "Invalid Input",
          description: "Please enter a valid number",
          variant: "destructive",
        });
        return;
      }
      if (num < 1 || num > 3999) {
        toast({
          title: "Out of Range",
          description: "Number must be between 1 and 3999",
          variant: "destructive",
        });
        return;
      }
      const roman = numberToRoman(num);
      setNumberToRomanResult(roman);
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Conversion failed",
        variant: "destructive",
      });
    }
  };

  const handleRomanToNumber = () => {
    try {
      if (!romanInput.trim()) {
        toast({
          title: "Invalid Input",
          description: "Please enter a Roman numeral",
          variant: "destructive",
        });
        return;
      }
      const number = romanToNumber(romanInput);
      setRomanToNumberResult(number.toString());
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Conversion failed",
        variant: "destructive",
      });
    }
  };

  const faqItems: FAQItem[] = [
    {
      question: "Does it support large numbers?",
      answer: "Yes, up to 3999 safely. This is the standard limit for Roman numerals as they don't have a symbol for numbers 4000 and above in classical notation."
    },
    {
      question: "Does it work offline?",
      answer: "Yes! The Roman numeral converter works completely offline in your browser with no internet connection required."
    },
    {
      question: "What numbers can be converted?",
      answer: "Any number from 1 to 3999 can be converted to Roman numerals and back. The tool validates input to ensure accurate conversions."
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
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <Link href="/tools/math" className="hover:text-foreground" data-testid="link-math">Math Tools</Link>
            {" / "}
            <span className="text-foreground">Roman Numeral Converter</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <RefreshCw className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Roman Numeral Converter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Convert Roman ↔ Number in one click
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Bidirectional</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Roman Numeral Conversion</CardTitle>
                <CardDescription>
                  Convert between numbers and Roman numerals instantly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="toRoman" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="toRoman" data-testid="tab-to-roman">Number → Roman</TabsTrigger>
                    <TabsTrigger value="toNumber" data-testid="tab-to-number">Roman → Number</TabsTrigger>
                  </TabsList>

                  <TabsContent value="toRoman" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="number-input">Enter Number (1-3999)</Label>
                        <Input
                          id="number-input"
                          type="number"
                          min="1"
                          max="3999"
                          value={numberInput}
                          onChange={(e) => setNumberInput(e.target.value)}
                          placeholder="e.g., 2024"
                          className="mt-2"
                          data-testid="input-number"
                        />
                      </div>
                      <Button onClick={handleNumberToRoman} className="w-full" data-testid="button-convert-to-roman">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Convert to Roman
                      </Button>
                      {numberToRomanResult && (
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground mb-2">Result:</p>
                            <p className="text-4xl font-bold text-center" data-testid="result-roman">
                              {numberToRomanResult}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="toNumber" className="space-y-6 mt-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="roman-input">Enter Roman Numeral</Label>
                        <Input
                          id="roman-input"
                          value={romanInput}
                          onChange={(e) => setRomanInput(e.target.value.toUpperCase())}
                          placeholder="e.g., MMXXIV"
                          className="mt-2"
                          data-testid="input-roman"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Use I, V, X, L, C, D, M
                        </p>
                      </div>
                      <Button onClick={handleRomanToNumber} className="w-full" data-testid="button-convert-to-number">
                        <Hash className="mr-2 h-4 w-4" />
                        Convert to Number
                      </Button>
                      {romanToNumberResult && (
                        <Card className="bg-muted/50">
                          <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground mb-2">Result:</p>
                            <p className="text-4xl font-bold text-center" data-testid="result-number">
                              {romanToNumberResult}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">Common Roman Numerals</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span className="font-bold">I</span> = 1</div>
                  <div><span className="font-bold">V</span> = 5</div>
                  <div><span className="font-bold">X</span> = 10</div>
                  <div><span className="font-bold">L</span> = 50</div>
                  <div><span className="font-bold">C</span> = 100</div>
                  <div><span className="font-bold">D</span> = 500</div>
                  <div><span className="font-bold">M</span> = 1000</div>
                  <div><span className="font-bold">MMXXV</span> = 2025</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About Roman Numeral Converter</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Convert Roman ↔ Number in one click. Perfect for students, historians, indexing & notes.
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
