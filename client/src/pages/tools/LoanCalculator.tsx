import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PiggyBank } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [method, setMethod] = useState("flat");

  useSEO({
    title: "Loan Interest Calculator | Flat & Reducing Balance EMI Interest | Pixocraft Tools",
    description: "Calculate total interest using flat-rate or reducing balance methods. Accurate, easy & offline.",
    keywords: "loan interest calculator, emi interest, flat rate interest, loan total interest, reducing balance",
    canonicalUrl: "https://tools.pixocraft.in/tools/loan-calculator",
  });

  const p = parseFloat(principal) || 0;
  const r = parseFloat(rate) / 100 || 0;
  const t = parseFloat(tenure) || 0;

  const calculateFlat = () => {
    const interest = p * r * t;
    const total = p + interest;
    const emi = total / (t * 12);
    return { interest, total, emi };
  };

  const calculateReducing = () => {
    const monthlyRate = r / 12;
    const months = t * 12;
    const emi = p * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const total = emi * months;
    const interest = total - p;
    return { interest, total, emi };
  };

  const flatResult = calculateFlat();
  const reducingResult = calculateReducing();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does it support reducing balance method?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, both flat and reducing."
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
            <Link href="/tools/math" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Loan Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <PiggyBank className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Loan Interest Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate EMI, total interest using flat-rate or reducing balance methods
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Both Methods</Badge>
            </div>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Loan Interest</CardTitle>
                <CardDescription>
                  Enter loan details to calculate interest and EMI
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Loan Amount</Label>
                    <Input
                      type="number"
                      value={principal}
                      onChange={(e) => setPrincipal(e.target.value)}
                      placeholder="100000"
                      data-testid="input-principal"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Interest Rate (% per year)</Label>
                    <Input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      placeholder="10"
                      step="0.1"
                      data-testid="input-rate"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tenure (years)</Label>
                    <Input
                      type="number"
                      value={tenure}
                      onChange={(e) => setTenure(e.target.value)}
                      placeholder="5"
                      data-testid="input-tenure"
                    />
                  </div>
                </div>

                {p > 0 && r > 0 && t > 0 && (
                  <Tabs defaultValue="flat" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="flat" data-testid="tab-flat">Flat Rate</TabsTrigger>
                      <TabsTrigger value="reducing" data-testid="tab-reducing">Reducing Balance</TabsTrigger>
                    </TabsList>

                    <TabsContent value="flat" className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-primary/5">
                          <CardHeader className="pb-2">
                            <CardDescription>Total Interest</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold" data-testid="flat-interest">
                              ${flatResult.interest.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-primary/5">
                          <CardHeader className="pb-2">
                            <CardDescription>Total Amount</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold" data-testid="flat-total">
                              ${flatResult.total.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-primary/5">
                          <CardHeader className="pb-2">
                            <CardDescription>Monthly EMI</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold" data-testid="flat-emi">
                              ${flatResult.emi.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="reducing" className="space-y-4 mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-primary/5">
                          <CardHeader className="pb-2">
                            <CardDescription>Total Interest</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold" data-testid="reducing-interest">
                              ${reducingResult.interest.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-primary/5">
                          <CardHeader className="pb-2">
                            <CardDescription>Total Amount</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold" data-testid="reducing-total">
                              ${reducingResult.total.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-primary/5">
                          <CardHeader className="pb-2">
                            <CardDescription>Monthly EMI</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-2xl font-bold" data-testid="reducing-emi">
                              ${reducingResult.emi.toFixed(2)}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
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
                    <CardTitle className="text-lg">Does it support reducing balance method?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! We support both flat rate and reducing balance methods. Reducing balance is more common for home loans and car loans, while flat rate is simpler but often costs more in interest.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's the difference between flat and reducing?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      In flat rate, interest is calculated on the original loan amount for the entire tenure. In reducing balance, interest is calculated only on the outstanding principal, which decreases with each payment.
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
