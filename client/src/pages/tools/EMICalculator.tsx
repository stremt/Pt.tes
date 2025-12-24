import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { TrendingDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [tenure, setTenure] = useState<string>("");
  const [prepayment, setPrepayment] = useState<string>("");

  useSEO({
    title: "EMI Prepayment Calculator | Interest Savings Tool | Pixocraft Tools",
    description: "Calculate how much interest you save by prepaying your loan EMIs. Offline, free and accurate.",
    keywords: "emi prepayment calculator, loan prepayment savings, emi interest save, loan calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/emi-calculator",
  });

  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    return emi;
  };

  const calculateSavings = () => {
    const P = parseFloat(loanAmount) || 0;
    const R = parseFloat(interestRate) || 0;
    const T = parseFloat(tenure) || 0;
    const prepay = parseFloat(prepayment) || 0;

    if (P === 0 || R === 0 || T === 0) return { savings: 0, newTenure: 0, originalInterest: 0, newInterest: 0 };

    const originalEMI = calculateEMI(P, R, T);
    const originalInterest = (originalEMI * T) - P;

    const newPrincipal = P - prepay;
    if (newPrincipal <= 0) return { savings: originalInterest, newTenure: 0, originalInterest, newInterest: 0 };

    const newTenure = Math.ceil(Math.log(originalEMI / (originalEMI - (newPrincipal * (R / 12 / 100)))) / Math.log(1 + (R / 12 / 100)));
    const newInterest = (originalEMI * newTenure) - newPrincipal;
    const savings = originalInterest - newInterest;

    return { savings, newTenure, originalInterest, newInterest };
  };

  const result = calculateSavings();

  const howItWorks = [
    { step: 1, title: "Enter Loan Details", description: "Input loan amount, interest rate, and tenure" },
    { step: 2, title: "Add Prepayment", description: "Enter the amount you want to prepay" },
    { step: 3, title: "See Savings", description: "View how much interest you'll save" },
  ];

  const benefits = [
    { icon: <TrendingDown className="h-5 w-5" />, title: "Interest Savings", description: "See exact savings from prepayment" },
    { icon: <TrendingDown className="h-5 w-5" />, title: "Tenure Reduction", description: "See how much your loan tenure reduces" },
    { icon: <TrendingDown className="h-5 w-5" />, title: "Smart Planning", description: "Make informed prepayment decisions" },
  ];

  const faqs = [
    { question: "Should I prepay my loan?", answer: "Prepayment can save significant interest, especially early in the loan tenure. This calculator helps you see the exact savings." },
    { question: "Does prepayment reduce EMI or tenure?", answer: "This calculator shows tenure reduction. Many banks offer both options - check with your lender." },
    { question: "When is the best time to prepay?", answer: "Earlier is better! Most interest is paid in the initial years, so early prepayment saves more." },
  ];

  return (
    <ToolLayout
      title="EMI Prepayment Calculator"
      description="Calculate how much interest you save by prepaying your loan EMIs. Offline, free and accurate."
      icon={<TrendingDown className="h-8 w-8" />}
      toolId="emi-calculator"
      category="math"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="loan-amount">Loan Amount</Label>
            <Input id="loan-amount" type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} placeholder="1000000" data-testid="input-loan-amount" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="interest-rate">Interest Rate (% per annum)</Label>
            <Input id="interest-rate" type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="9.5" step="0.1" data-testid="input-interest-rate" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenure">Tenure (months)</Label>
            <Input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="240" data-testid="input-tenure" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="prepayment">Prepayment Amount</Label>
            <Input id="prepayment" type="number" value={prepayment} onChange={(e) => setPrepayment(e.target.value)} placeholder="100000" data-testid="input-prepayment" />
          </div>
        </div>

        {loanAmount && interestRate && tenure && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Original Interest</p>
                <p className="text-2xl font-bold">${result.originalInterest.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Interest After Prepayment</p>
                <p className="text-2xl font-bold">${result.newInterest.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Interest Saved</p>
                <p className="text-3xl font-bold text-green-600" data-testid="text-savings">${result.savings.toFixed(2)}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-2">New Tenure</p>
                <p className="text-3xl font-bold text-primary" data-testid="text-new-tenure">{result.newTenure} months</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
