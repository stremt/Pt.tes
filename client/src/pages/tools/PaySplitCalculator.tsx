import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { DollarSign, Users, Plus, Trash2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

interface Person {
  id: string;
  name: string;
  share: number;
}

export default function PaySplitCalculator() {
  const [totalAmount, setTotalAmount] = useState("100");
  const [people, setPeople] = useState<Person[]>([
    { id: '1', name: 'Person 1', share: 1 },
    { id: '2', name: 'Person 2', share: 1 },
  ]);
  const [splitMode, setSplitMode] = useState<'even' | 'custom'>('even');
  const { toast } = useToast();

  useSEO({
    title: "Bill Split Calculator | Split Payments Evenly or Custom | Pixocraft Tools",
    description: "Split bills evenly or assign custom percentages. Perfect for friends, families & groups.",
    keywords: "bill split calculator, split payment, group bill tool, payment splitter",
    canonicalUrl: "https://tools.pixocraft.in/tools/pay-split-calculator",
  });

  const relatedTools = getRelatedTools("pay-split-calculator", 6);

  const addPerson = () => {
    const newId = (Math.max(...people.map(p => parseInt(p.id))) + 1).toString();
    setPeople([...people, { id: newId, name: `Person ${newId}`, share: 1 }]);
  };

  const removePerson = (id: string) => {
    if (people.length > 1) {
      setPeople(people.filter(p => p.id !== id));
    } else {
      toast({
        title: "Cannot Remove",
        description: "You need at least one person",
        variant: "destructive",
      });
    }
  };

  const updatePerson = (id: string, field: 'name' | 'share', value: string | number) => {
    setPeople(people.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const calculateSplit = () => {
    const amount = parseFloat(totalAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive amount",
        variant: "destructive",
      });
      return null;
    }

    if (splitMode === 'even') {
      const perPerson = amount / people.length;
      return people.map(p => ({ ...p, amount: perPerson }));
    } else {
      const totalShares = people.reduce((sum, p) => sum + (p.share || 0), 0);
      if (totalShares <= 0) {
        return null;
      }
      return people.map(p => ({ ...p, amount: (amount * (p.share || 0)) / totalShares }));
    }
  };

  const results = calculateSplit();

  const faqItems: FAQItem[] = [
    {
      question: "Can I add custom shares?",
      answer: "Yes — custom split supported. You can assign different share ratios to each person, and the calculator will split the amount proportionally."
    },
    {
      question: "What's the difference between even and custom split?",
      answer: "Even split divides the total equally among all people. Custom split lets you assign different share ratios to each person based on their contribution or agreement."
    },
    {
      question: "Does it work offline?",
      answer: "Yes! The bill split calculator works completely offline in your browser with no internet connection required."
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
            <span className="text-foreground">Pay Split Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Pay Split Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Split bills evenly or with custom shares among any number of people
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Custom Split</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Split Payment</CardTitle>
                <CardDescription>
                  Enter total amount and split evenly or assign custom shares
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="total-amount">Total Amount ($)</Label>
                  <Input
                    id="total-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    placeholder="100.00"
                    data-testid="input-total-amount"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={splitMode === 'even' ? 'default' : 'outline'}
                    onClick={() => setSplitMode('even')}
                    className="flex-1"
                    data-testid="button-even-split"
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Even Split
                  </Button>
                  <Button
                    variant={splitMode === 'custom' ? 'default' : 'outline'}
                    onClick={() => setSplitMode('custom')}
                    className="flex-1"
                    data-testid="button-custom-split"
                  >
                    Custom Split
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>People</Label>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addPerson}
                      data-testid="button-add-person"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Person
                    </Button>
                  </div>

                  {people.map((person, index) => (
                    <Card key={person.id} className="bg-muted/50">
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Input
                              value={person.name}
                              onChange={(e) => updatePerson(person.id, 'name', e.target.value)}
                              placeholder="Name"
                              data-testid={`input-person-name-${index}`}
                            />
                          </div>
                          {splitMode === 'custom' && (
                            <div className="w-24">
                              <Input
                                type="number"
                                min="0"
                                step="1"
                                value={person.share}
                                onChange={(e) => updatePerson(person.id, 'share', parseFloat(e.target.value) || 0)}
                                placeholder="Share"
                                data-testid={`input-person-share-${index}`}
                              />
                            </div>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removePerson(person.id)}
                            disabled={people.length === 1}
                            data-testid={`button-remove-person-${index}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {results && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Split Results</h3>
                    {results.map((result, index) => (
                      <Card key={result.id} className="bg-primary/5">
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{result.name}</span>
                            <div className="text-right">
                              <div className="text-2xl font-bold" data-testid={`result-amount-${index}`}>
                                ${result.amount.toFixed(2)}
                              </div>
                              {splitMode === 'custom' && (
                                <div className="text-sm text-muted-foreground">
                                  {result.share} {result.share === 1 ? 'share' : 'shares'}
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t bg-muted/30">
            <div className="container mx-auto px-4 max-w-7xl">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold">About Pay Split Calculator</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Enter bill amount → number of people → optional custom shares → split instantly. Perfect for restaurants, travel & groups.
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
