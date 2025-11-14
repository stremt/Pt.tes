import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function BMICalculator() {
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState<string>("");

  useSEO({
    title: "BMI Calculator Online | Body Mass Index Checker | Pixocraft Tools",
    description: "Calculate BMI instantly with height & weight. Shows category: underweight, normal, overweight, obese.",
    keywords: "bmi calculator, body mass index, health calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/bmi-calculator",
  });

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    
    if (!h || !w || h <= 0 || w <= 0) return;

    const bmiValue = w / ((h / 100) ** 2);
    setBmi(parseFloat(bmiValue.toFixed(1)));

    if (bmiValue < 18.5) setCategory("Underweight");
    else if (bmiValue < 25) setCategory("Normal Weight");
    else if (bmiValue < 30) setCategory("Overweight");
    else setCategory("Obese");
  };

  const getCategoryColor = () => {
    if (category === "Normal Weight") return "text-chart-3";
    if (category === "Underweight") return "text-chart-4";
    return "text-destructive";
  };

  const howItWorks = [
    { step: 1, title: "Enter Height", description: "Input your height in centimeters (cm)" },
    { step: 2, title: "Enter Weight", description: "Input your weight in kilograms (kg)" },
    { step: 3, title: "Calculate", description: "Get BMI instantly with health category" },
  ];

  const benefits = [
    { icon: <Activity className="h-5 w-5" />, title: "Instant Results", description: "Get BMI category & health range immediately" },
    { icon: <Activity className="h-5 w-5" />, title: "Health Tracking", description: "Perfect for fitness & diet planning" },
    { icon: <Activity className="h-5 w-5" />, title: "100% Free", description: "No signup, completely offline" },
    { icon: <Activity className="h-5 w-5" />, title: "Accurate", description: "WHO standard BMI calculation" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it show category?",
      answer: "Yes — shows BMI category & health range including underweight, normal weight, overweight, and obese categories based on WHO standards."
    },
    {
      question: "What is a healthy BMI range?",
      answer: "A healthy BMI range for adults is typically between 18.5 and 24.9. Below 18.5 is underweight, 25-29.9 is overweight, and 30+ is considered obese."
    },
    {
      question: "Is BMI accurate for everyone?",
      answer: "BMI is a useful screening tool but doesn't account for muscle mass, bone density, or body composition. Athletes or very muscular people may have high BMI despite being healthy."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="BMI Calculator"
        description="Enter height & weight → get BMI instantly. Perfect for fitness, health tracking & diet planning."
        icon={<Activity className="h-8 w-8" />}
        toolId="bmi-calculator"
        category="health"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">BMI Calculator</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="height" className="text-base font-semibold">
                  Height (cm)
                </Label>
                <Input
                  id="height"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Enter height in centimeters"
                  data-testid="input-height"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-base font-semibold">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Enter weight in kilograms"
                  data-testid="input-weight"
                />
              </div>

              <Button
                onClick={calculateBMI}
                size="lg"
                disabled={!height || !weight}
                className="w-full"
                data-testid="button-calculate-bmi"
              >
                <Activity className="mr-2 h-5 w-5" />
                Calculate BMI
              </Button>
            </CardContent>
          </Card>

          {bmi !== null && (
            <Card>
              <CardContent className="p-6 text-center space-y-4">
                <h3 className="text-lg font-semibold">Your BMI Result</h3>
                <div className="p-6 bg-muted rounded-lg">
                  <p className="text-5xl font-bold mb-2" data-testid="text-bmi-value">{bmi}</p>
                  <p className="text-sm text-muted-foreground">Body Mass Index</p>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium text-muted-foreground">Category</p>
                  <p className={`text-2xl font-bold ${getCategoryColor()}`} data-testid="text-bmi-category">
                    {category}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
