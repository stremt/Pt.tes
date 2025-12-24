import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");

  useSEO({
    title: "Mortgage Calculator Online | Home Loan Monthly Payment | Pixocraft Tools",
    description: "Calculate mortgage payments with interest, principal breakdown & amortization table. Offline & global currency support.",
    keywords: "mortgage calculator, home loan calculator, mortgage interest, mortgage payment calculator, home loan emi",
    canonicalUrl: "https://tools.pixocraft.in/tools/mortgage-calculator",
  });

  const price = parseFloat(homePrice) || 0;
  const down = parseFloat(downPayment) || 0;
  const rate = parseFloat(interestRate) / 100 / 12 || 0;
  const months = parseInt(loanTerm) * 12 || 0;

  const loanAmount = price - down;
  const monthlyPayment = loanAmount * (rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - loanAmount;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does it show EMI breakup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, monthly principle + interest breakdown."
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
            <span className="text-foreground">Mortgage Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Mortgage Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate mortgage payments, interest & principal breakdown instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Mortgage</CardTitle>
                <CardDescription>
                  Enter home price and loan details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Home Price ($)</Label>
                    <Input
                      type="number"
                      value={homePrice}
                      onChange={(e) => setHomePrice(e.target.value)}
                      placeholder="300000"
                      data-testid="input-price"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Down Payment ($)</Label>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="60000"
                      data-testid="input-down"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Interest Rate (% per year)</Label>
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      placeholder="3.5"
                      step="0.1"
                      data-testid="input-rate"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Loan Term (years)</Label>
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(e.target.value)}
                      placeholder="30"
                      data-testid="input-term"
                    />
                  </div>
                </div>

                {loanAmount > 0 && !isNaN(monthlyPayment) && isFinite(monthlyPayment) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card className="bg-primary/10 border-primary/20">
                      <CardHeader className="pb-2">
                        <CardDescription>Monthly Payment</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-3xl font-bold" data-testid="result-monthly">
                          ${monthlyPayment.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Loan Amount</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold" data-testid="result-loan">
                          ${loanAmount.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Total Interest</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold" data-testid="result-interest">
                          ${totalInterest.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="bg-primary/5">
                      <CardHeader className="pb-2">
                        <CardDescription>Total Payment</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold" data-testid="result-total">
                          ${totalPayment.toFixed(2)}
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
                    <CardTitle className="text-lg">Does it show EMI breakup?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! The calculator shows monthly payment, total interest, total payment, and the loan amount. This helps you understand the full cost of your mortgage.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's a typical down payment?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Typical down payments range from 10-20% of the home price. A larger down payment reduces your loan amount and monthly payments.
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
