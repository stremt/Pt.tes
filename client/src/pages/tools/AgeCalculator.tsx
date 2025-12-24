import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [age, setAge] = useState<{years: number, months: number, days: number} | null>(null);
  const [nextBirthday, setNextBirthday] = useState<string>("");

  useSEO({
    title: "Age Calculator | Calculate Exact Age in Years, Months, Days | Pixocraft Tools",
    description: "Calculate your exact age in years, months, days and next birthday. 100% free & offline.",
    keywords: "age calculator, calculate age online, birthday calculator, age in days",
    canonicalUrl: "https://tools.pixocraft.in/tools/age-calculator",
  });

  const calculateAge = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });

    // Calculate next birthday
    const nextBday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntil = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    setNextBirthday(`${daysUntil} days`);
  };

  const howItWorks = [
    { step: 1, title: "Enter Birthday", description: "Select your date of birth" },
    { step: 2, title: "Calculate", description: "Click to get your exact age" },
    { step: 3, title: "View Results", description: "See age in years, months, days + next birthday" },
  ];

  const benefits = [
    { icon: <Calendar className="h-5 w-5" />, title: "Precise", description: "Exact age down to the day" },
    { icon: <Calendar className="h-5 w-5" />, title: "Next Birthday", description: "Shows countdown to your next birthday" },
    { icon: <Calendar className="h-5 w-5" />, title: "Instant", description: "Get results in milliseconds" },
  ];

  const faqs = [
    { question: "How accurate is this calculator?", answer: "100% accurate. It calculates the exact difference between your birth date and today." },
    { question: "Can I calculate someone else's age?", answer: "Yes! Just enter any birth date to calculate age." },
    { question: "Does it show next birthday?", answer: "Yes, it shows how many days until your next birthday." },
  ];

  return (
    <ToolLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, days and next birthday. 100% free & offline."
      icon={<Calendar className="h-8 w-8" />}
      toolId="age-calculator"
      category="math"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <Label htmlFor="birth-date" className="text-base font-semibold">
            Enter Your Birth Date
          </Label>
          <Input
            id="birth-date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            data-testid="input-birth-date"
          />
          <Button
            onClick={calculateAge}
            size="lg"
            disabled={!birthDate}
            className="w-full"
            data-testid="button-calculate-age"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Calculate Age
          </Button>
        </div>

        {age && (
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Your Age</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-4xl font-bold" data-testid="text-age-years">{age.years}</p>
                    <p className="text-sm text-muted-foreground">Years</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-4xl font-bold" data-testid="text-age-months">{age.months}</p>
                    <p className="text-sm text-muted-foreground">Months</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-4xl font-bold" data-testid="text-age-days">{age.days}</p>
                    <p className="text-sm text-muted-foreground">Days</p>
                  </div>
                </div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground">Next Birthday In</p>
                <p className="text-2xl font-bold text-primary" data-testid="text-next-birthday">{nextBirthday}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
