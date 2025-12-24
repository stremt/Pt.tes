import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function CalorieCalculator() {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState<string>("");
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  useSEO({
    title: "Daily Calorie Calculator | BMR & TDEE Calculator | Pixocraft Tools",
    description: "Calculate daily calorie requirements using BMR & TDEE formula. Fitness-friendly & offline.",
    keywords: "calorie calculator, bmr calculator, tdee calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/calorie-calculator",
  });

  const calculateCalories = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    if (!w || !h || !a || !gender || !activityLevel) return;

    let bmrValue: number;
    if (gender === "male") {
      bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
    }

    setBmr(Math.round(bmrValue));

    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };

    const tdeeValue = bmrValue * activityMultipliers[activityLevel];
    setTdee(Math.round(tdeeValue));
  };

  const howItWorks = [
    { step: 1, title: "Enter Details", description: "Age, gender, height, weight & activity level" },
    { step: 2, title: "Calculate", description: "Get BMR & TDEE instantly" },
    { step: 3, title: "View Results", description: "See calories for maintenance, loss & gain" },
  ];

  const benefits = [
    { icon: <Flame className="h-5 w-5" />, title: "Activity Support", description: "Sedentary to highly active levels" },
    { icon: <Flame className="h-5 w-5" />, title: "Weight Goals", description: "Calories for gain, loss or maintenance" },
    { icon: <Flame className="h-5 w-5" />, title: "BMR & TDEE", description: "Both values calculated instantly" },
    { icon: <Flame className="h-5 w-5" />, title: "Fitness Ready", description: "Perfect for diet planning" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Does it support activity levels?",
      answer: "Yes — sedentary to highly active. Choose from sedentary (little/no exercise), lightly active (1-3 days/week), moderately active (3-5 days/week), very active (6-7 days/week), or extremely active (physical job + exercise)."
    },
    {
      question: "What is BMR vs TDEE?",
      answer: "BMR (Basal Metabolic Rate) is calories burned at rest. TDEE (Total Daily Energy Expenditure) includes activity level, showing total calories needed per day."
    },
    {
      question: "How do I lose weight with this?",
      answer: "To lose weight, eat 300-500 calories below your TDEE. To gain weight, eat 300-500 above TDEE. For maintenance, match your TDEE."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Calorie Calculator"
        description="Enter details → get calories needed for weight gain, loss or maintenance."
        icon={<Flame className="h-8 w-8" />}
        toolId="calorie-calculator"
        category="math"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Calorie Calculator</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter age"
                    data-testid="input-age"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={gender} onValueChange={setGender}>
                    <SelectTrigger id="gender" data-testid="select-gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight-cal">Weight (kg)</Label>
                  <Input
                    id="weight-cal"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Enter weight"
                    data-testid="input-weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height-cal">Height (cm)</Label>
                  <Input
                    id="height-cal"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="Enter height"
                    data-testid="input-height"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger id="activity" data-testid="select-activity">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                    <SelectItem value="light">Lightly Active (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderately Active (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Very Active (6-7 days/week)</SelectItem>
                    <SelectItem value="veryActive">Extremely Active (physical job + exercise)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculateCalories}
                size="lg"
                disabled={!age || !gender || !weight || !height || !activityLevel}
                className="w-full"
                data-testid="button-calculate-calories"
              >
                <Flame className="mr-2 h-5 w-5" />
                Calculate Calories
              </Button>
            </CardContent>
          </Card>

          {bmr !== null && tdee !== null && (
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Your Results</h3>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-3xl font-bold" data-testid="text-bmr">{bmr}</p>
                      <p className="text-sm text-muted-foreground">BMR (cal/day)</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-3xl font-bold" data-testid="text-tdee">{tdee}</p>
                      <p className="text-sm text-muted-foreground">TDEE (cal/day)</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-left">
                    <div className="p-3 bg-chart-3/10 rounded-lg">
                      <p className="font-medium">Weight Loss</p>
                      <p className="text-2xl font-bold text-chart-3">{tdee - 500} cal/day</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <p className="font-medium">Maintenance</p>
                      <p className="text-2xl font-bold text-primary">{tdee} cal/day</p>
                    </div>
                    <div className="p-3 bg-chart-4/10 rounded-lg">
                      <p className="font-medium">Weight Gain</p>
                      <p className="text-2xl font-bold text-chart-4">{tdee + 500} cal/day</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </ToolLayout>
    </>
  );
}
