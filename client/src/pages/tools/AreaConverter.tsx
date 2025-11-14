import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Ruler } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

export default function AreaConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("sqft");
  const [toUnit, setToUnit] = useState<string>("sqyard");

  useSEO({
    title: "Area Unit Converter | Sqft, Sq Yard, Acre, Bigha Converter | Pixocraft Tools",
    description: "Convert land and plot measurement units instantly. Perfect for property dealers & buyers.",
    keywords: "area converter, sqft to yard, acre to bigha, land unit converter, property measurement",
    canonicalUrl: "https://tools.pixocraft.in/tools/area-converter",
  });

  const units: Record<string, number> = {
    sqft: 1,
    sqyard: 9,
    sqmeter: 10.764,
    acre: 43560,
    hectare: 107639,
    bigha: 27225,
    marla: 272.25,
    kanal: 5445,
  };

  const convertArea = () => {
    const val = parseFloat(value) || 0;
    const inSqft = val * units[fromUnit];
    const result = inSqft / units[toUnit];
    return result.toFixed(6);
  };

  const howItWorks = [
    { step: 1, title: "Enter Value", description: "Input the area you want to convert" },
    { step: 2, title: "Select Units", description: "Choose from and to units" },
    { step: 3, title: "Get Result", description: "See instant conversion" },
  ];

  const benefits = [
    { icon: <Ruler className="h-5 w-5" />, title: "Multiple Units", description: "Convert between 8+ land measurement units" },
    { icon: <Ruler className="h-5 w-5" />, title: "Real Estate Ready", description: "Perfect for property deals and planning" },
    { icon: <Ruler className="h-5 w-5" />, title: "Accurate", description: "Precise conversions for professional use" },
  ];

  const faqs = [
    { question: "Which units are supported?", answer: "Sqft, Sq Yard, Sq Meter, Acre, Hectare, Bigha, Marla, and Kanal." },
    { question: "Is it accurate for property deals?", answer: "Yes, all conversions are mathematically precise for professional use." },
    { question: "Can I convert Bigha to Acre?", answer: "Absolutely! Convert between any two supported units instantly." },
  ];

  return (
    <ToolLayout
      title="Area Unit Converter"
      description="Convert land and plot measurement units instantly. Perfect for property dealers & buyers."
      icon={<Ruler className="h-8 w-8" />}
      toolId="area-converter"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="value" className="text-base font-semibold">Value</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value"
              data-testid="input-value"
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="from-unit" className="text-base font-semibold">From</Label>
            <Select value={fromUnit} onValueChange={setFromUnit}>
              <SelectTrigger id="from-unit" data-testid="select-from-unit">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sqft">Square Feet (sqft)</SelectItem>
                <SelectItem value="sqyard">Square Yard</SelectItem>
                <SelectItem value="sqmeter">Square Meter</SelectItem>
                <SelectItem value="acre">Acre</SelectItem>
                <SelectItem value="hectare">Hectare</SelectItem>
                <SelectItem value="bigha">Bigha</SelectItem>
                <SelectItem value="marla">Marla</SelectItem>
                <SelectItem value="kanal">Kanal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="to-unit" className="text-base font-semibold">To</Label>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger id="to-unit" data-testid="select-to-unit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sqft">Square Feet (sqft)</SelectItem>
              <SelectItem value="sqyard">Square Yard</SelectItem>
              <SelectItem value="sqmeter">Square Meter</SelectItem>
              <SelectItem value="acre">Acre</SelectItem>
              <SelectItem value="hectare">Hectare</SelectItem>
              <SelectItem value="bigha">Bigha</SelectItem>
              <SelectItem value="marla">Marla</SelectItem>
              <SelectItem value="kanal">Kanal</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Result</p>
            <p className="text-4xl font-bold" data-testid="text-result">{convertArea()}</p>
            <p className="text-sm text-muted-foreground mt-2">{toUnit}</p>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
