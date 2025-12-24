import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Calculator } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function CommissionCalculator() {
  const [dealPrice, setDealPrice] = useState<string>("");
  const [commissionRate, setCommissionRate] = useState<string>("2");
  
  useSEO({
    title: "Commission Calculator | Real Estate Brokerage Calculator | Pixocraft Tools",
    description: "Calculate real estate commission for deals instantly. Works offline and 100% accurate.",
    keywords: "commission calculator, brokerage calculator, real estate commission, property commission",
    canonicalUrl: "https://tools.pixocraft.in/tools/commission-calculator",
  });

  const calculateCommission = () => {
    const price = parseFloat(dealPrice) || 0;
    const rate = parseFloat(commissionRate) || 0;
    return (price * rate / 100).toFixed(2);
  };

  const howItWorks = [
    { step: 1, title: "Enter Deal Price", description: "Input the property or deal value" },
    { step: 2, title: "Set Commission %", description: "Enter your commission rate" },
    { step: 3, title: "Get Result", description: "See commission amount instantly" },
  ];

  const benefits = [
    { icon: <Calculator className="h-5 w-5" />, title: "Instant", description: "Real-time commission calculation" },
    { icon: <Calculator className="h-5 w-5" />, title: "Accurate", description: "100% precise calculations" },
    { icon: <Calculator className="h-5 w-5" />, title: "Property Ready", description: "Perfect for real estate agents" },
  ];

  const faqs = [
    { question: "What commission rate should I use?", answer: "Typical real estate commission is 1-3%, but it varies by agreement." },
    { question: "Can I use this for other commissions?", answer: "Yes! Works for any percentage-based commission calculation." },
    { question: "Is it accurate for large deals?", answer: "Absolutely! It handles any deal size with precision." },
  ];

  return (
    <ToolLayout
      title="Commission Calculator"
      description="Calculate real estate commission for deals instantly. Works offline and 100% accurate."
      icon={<Calculator className="h-8 w-8" />}
      toolId="commission-calculator"
      category="math"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <Label htmlFor="deal-price" className="text-base font-semibold">Deal Price</Label>
          <Input
            id="deal-price"
            type="number"
            value={dealPrice}
            onChange={(e) => setDealPrice(e.target.value)}
            placeholder="1000000"
            data-testid="input-deal-price"
          />
        </div>

        <div className="space-y-4">
          <Label htmlFor="commission-rate" className="text-base font-semibold">Commission Rate (%)</Label>
          <Input
            id="commission-rate"
            type="number"
            value={commissionRate}
            onChange={(e) => setCommissionRate(e.target.value)}
            placeholder="2"
            step="0.1"
            data-testid="input-commission-rate"
          />
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Deal Price</p>
              <p className="text-2xl font-bold">${parseFloat(dealPrice || "0").toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Commission Rate</p>
              <p className="text-2xl font-bold">{commissionRate}%</p>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">Your Commission</p>
              <p className="text-4xl font-bold text-primary" data-testid="text-commission-result">${parseFloat(calculateCommission()).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
