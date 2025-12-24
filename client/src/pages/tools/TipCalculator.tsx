import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign, Users } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState("15");
  const [people, setPeople] = useState("1");

  useSEO({
    title: "Tip Calculator Online | Split Bills & Tips Instantly | Pixocraft Tools",
    description: "Calculate tip percentage and split bills between people in seconds. Offline & instant.",
    keywords: "tip calculator, bill split calculator, restaurant tip tool, split bill, gratuity calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/tip-calculator",
  });

  const bill = parseFloat(billAmount) || 0;
  const tip = parseFloat(tipPercent) || 0;
  const numPeople = parseInt(people) || 1;

  const tipAmount = bill * (tip / 100);
  const totalAmount = bill + tipAmount;
  const perPerson = totalAmount / numPeople;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I split bill among friends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — any number of people."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <Link href="/tools/math" className="hover:text-foreground" data-testid="link-math">Math Tools</Link>
            {" / "}
            <span className="text-foreground">Tip Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Tip Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate tip & split bills among friends instantly. Perfect for restaurants & travel
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Instant</Badge>
              <Badge variant="secondary">Bill Splitter</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Tip</CardTitle>
                <CardDescription>
                  Enter bill amount, tip percentage, and number of people
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Bill Amount ($)</Label>
                    <Input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      data-testid="input-bill"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tip (%)</Label>
                    <Input
                      type="number"
                      value={tipPercent}
                      onChange={(e) => setTipPercent(e.target.value)}
                      placeholder="15"
                      data-testid="input-tip-percent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Number of People</Label>
                    <Input
                      type="number"
                      value={people}
                      onChange={(e) => setPeople(e.target.value)}
                      placeholder="1"
                      min="1"
                      data-testid="input-people"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[10, 15, 18, 20, 25].map((percent) => (
                    <Button
                      key={percent}
                      onClick={() => setTipPercent(percent.toString())}
                      variant={tipPercent === percent.toString() ? "default" : "outline"}
                      size="sm"
                      data-testid={`button-tip-${percent}`}
                    >
                      {percent}%
                    </Button>
                  ))}
                </div>

                {bill > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Tip Amount</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold" data-testid="result-tip">
                          ${tipAmount.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Total Amount</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold" data-testid="result-total">
                          ${totalAmount.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Per Person</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold" data-testid="result-per-person">
                          ${perPerson.toFixed(2)}
                        </p>
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
                <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
              </div>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can I split bill among friends?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! Enter the number of people and the calculator will automatically divide the total amount (including tip) equally among everyone.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's a standard tip percentage?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Standard tip percentages vary by country, but common amounts are 15-20% for good service, 10% for basic service, and 25% or more for exceptional service.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
