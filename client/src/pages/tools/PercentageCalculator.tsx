import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PercentageCalculator() {
  const [value1, setValue1] = useState<string>("");
  const [value2, setValue2] = useState<string>("");
  const [percentValue, setPercentValue] = useState<string>("");
  const [baseValue, setBaseValue] = useState<string>("");

  useSEO({
    title: "Percentage Calculator Online | Fast & Simple | Pixocraft Tools",
    description: "Calculate percentages easily — increase, decrease, % of number, difference & more.",
    keywords: "percentage calculator, calculate percent, % increase tool, percent change",
    canonicalUrl: "https://tools.pixocraft.in/tools/percentage-calculator",
  });

  const calculatePercentOf = () => {
    const percent = parseFloat(percentValue);
    const base = parseFloat(baseValue);
    if (isNaN(percent) || isNaN(base)) return "---";
    return ((percent / 100) * base).toFixed(2);
  };

  const calculatePercentage = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    if (isNaN(v1) || isNaN(v2) || v2 === 0) return "---";
    return ((v1 / v2) * 100).toFixed(2);
  };

  const calculateIncrease = () => {
    const v1 = parseFloat(value1);
    const v2 = parseFloat(value2);
    if (isNaN(v1) || isNaN(v2) || v1 === 0) return "---";
    return (((v2 - v1) / v1) * 100).toFixed(2);
  };

  const howItWorks = [
    { step: 1, title: "Choose Operation", description: "Select what you want to calculate" },
    { step: 2, title: "Enter Values", description: "Input your numbers" },
    { step: 3, title: "Get Result", description: "See instant calculations" },
  ];

  const benefits = [
    { icon: <Percent className="h-5 w-5" />, title: "Multi-Purpose", description: "Calculate percentage, increase, decrease, and more" },
    { icon: <Percent className="h-5 w-5" />, title: "Instant", description: "Real-time results as you type" },
    { icon: <Percent className="h-5 w-5" />, title: "Beginner-Friendly", description: "Simple interface for everyone" },
  ];

  const faqs = [
    { question: "How do I calculate percentage increase?", answer: "Enter the original value and new value. The calculator shows the percentage change." },
    { question: "Can I calculate percentage of a number?", answer: "Yes! Enter the percentage and the base number to get the result." },
    { question: "Is this calculator accurate?", answer: "Yes, all calculations are precise to 2 decimal places." },
  ];

  return (
    <ToolLayout
      title="Percentage Calculator"
      description="Calculate percentages easily — increase, decrease, % of number, difference & more."
      icon={<Percent className="h-8 w-8" />}
      toolId="percentage-calculator"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>What is X% of Y?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="percent">Percentage</Label>
                <Input
                  id="percent"
                  type="number"
                  value={percentValue}
                  onChange={(e) => setPercentValue(e.target.value)}
                  placeholder="15"
                  data-testid="input-percent"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base">of</Label>
                <Input
                  id="base"
                  type="number"
                  value={baseValue}
                  onChange={(e) => setBaseValue(e.target.value)}
                  placeholder="200"
                  data-testid="input-base"
                />
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-3xl font-bold" data-testid="text-percent-of-result">{calculatePercentOf()}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>X is what % of Y?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="val1">Value</Label>
                <Input
                  id="val1"
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder="50"
                  data-testid="input-value1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="val2">of</Label>
                <Input
                  id="val2"
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  placeholder="200"
                  data-testid="input-value2"
                />
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Result</p>
              <p className="text-3xl font-bold" data-testid="text-percentage-result">{calculatePercentage()}%</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Percentage Change</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orig">Original</Label>
                <Input
                  id="orig"
                  type="number"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                  placeholder="100"
                  data-testid="input-original"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Value</Label>
                <Input
                  id="new"
                  type="number"
                  value={value2}
                  onChange={(e) => setValue2(e.target.value)}
                  placeholder="150"
                  data-testid="input-new"
                />
              </div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Percentage Change</p>
              <p className="text-3xl font-bold" data-testid="text-change-result">{calculateIncrease()}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
