import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { ArrowUpDown, ArrowUp, ArrowDown, Copy, Check, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function NumberSorter() {
  const [inputNumbers, setInputNumbers] = useState("");
  const [sortedNumbers, setSortedNumbers] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Number Sorter Online | Sort Numbers Ascending/Descending | Pixocraft Tools",
    description: "Sort large lists of numbers instantly. Offline, fast & suitable for math, data & business.",
    keywords: "number sorter, sort numbers online, number ordering tool, ascending descending sort",
    canonicalUrl: "https://tools.pixocraft.in/tools/number-sorter",
  });

  const relatedTools = getRelatedTools("number-sorter", 6);

  const sortNumbers = (ascending: boolean) => {
    const numbers = inputNumbers
      .split(/[\s,;]+/)
      .map(n => n.trim())
      .filter(n => n !== '')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));

    if (numbers.length === 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid numbers",
        variant: "destructive",
      });
      return;
    }

    const sorted = ascending
      ? numbers.sort((a, b) => a - b)
      : numbers.sort((a, b) => b - a);

    setSortedNumbers(sorted.join(', '));
    toast({
      title: "Numbers Sorted",
      description: `Sorted ${numbers.length} numbers ${ascending ? 'ascending' : 'descending'}`,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sortedNumbers);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Sorted numbers copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Can I paste large lists?",
      answer: "Yes — thousands of numbers supported. You can paste numbers separated by spaces, commas, semicolons, or line breaks."
    },
    {
      question: "Does it work with decimals?",
      answer: "Yes! The number sorter works with integers, decimals, and negative numbers. It properly sorts all numeric values."
    },
    {
      question: "Is the sorting accurate for large numbers?",
      answer: "Yes, JavaScript handles numbers up to very large values accurately. However, extremely large numbers (beyond Number.MAX_SAFE_INTEGER) may lose precision."
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
            <span className="text-foreground">Number Sorter</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <ArrowUpDown className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Number Sorter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sort numbers in ascending or descending order instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Fast</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Sort Numbers</CardTitle>
                <CardDescription>
                  Paste numbers separated by spaces, commas, or line breaks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="input-numbers">Input Numbers</Label>
                  <Textarea
                    id="input-numbers"
                    value={inputNumbers}
                    onChange={(e) => setInputNumbers(e.target.value)}
                    placeholder="Enter numbers separated by spaces, commas, or line breaks&#10;Example: 42, 15, 8, 23, 4, 16"
                    className="min-h-[150px]"
                    data-testid="input-numbers"
                  />
                  <p className="text-sm text-muted-foreground">
                    Separate numbers with spaces, commas, or line breaks
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => sortNumbers(true)}
                    className="flex-1"
                    data-testid="button-sort-ascending"
                  >
                    <ArrowUp className="mr-2 h-4 w-4" />
                    Sort Ascending
                  </Button>
                  <Button
                    onClick={() => sortNumbers(false)}
                    variant="secondary"
                    className="flex-1"
                    data-testid="button-sort-descending"
                  >
                    <ArrowDown className="mr-2 h-4 w-4" />
                    Sort Descending
                  </Button>
                </div>

                {sortedNumbers && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="output-numbers">Sorted Numbers</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={copyToClipboard}
                        data-testid="button-copy"
                      >
                        {copied ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      id="output-numbers"
                      value={sortedNumbers}
                      readOnly
                      className="min-h-[150px] bg-muted/50"
                      data-testid="output-numbers"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About Number Sorter</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Paste numbers → sort ascending or descending → get result instantly. Ideal for math, data work, business & analysis.
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
