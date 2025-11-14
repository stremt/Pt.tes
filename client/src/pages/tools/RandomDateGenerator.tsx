import { useState } from "react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function RandomDateGenerator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [randomDate, setRandomDate] = useState<string | null>(null);

  useSEO({
    title: "Random Date Generator | Generate Dates in Range | Pixocraft Tools",
    description: "Generate random dates between any two dates. Perfect for testing & coding.",
    keywords: "random date, date generator, pick random day",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-date-generator",
  });

  const generateRandomDate = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      setRandomDate("Start date must be before end date");
      return;
    }

    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const random = new Date(randomTime);
    setRandomDate(random.toISOString().split("T")[0]);
  };

  const howItWorks = [
    { step: 1, title: "Set Range", description: "Select start and end dates" },
    { step: 2, title: "Generate", description: "Click to generate random date" },
    { step: 3, title: "Use Result", description: "Get random date within your range" },
  ];

  const benefits = [
    { icon: <Calendar className="h-5 w-5" />, title: "Full Control", description: "Set custom start & end dates" },
    { icon: <Calendar className="h-5 w-5" />, title: "Testing Ready", description: "Perfect for test data generation" },
    { icon: <Calendar className="h-5 w-5" />, title: "Coding Helper", description: "Great for development & QA" },
    { icon: <Calendar className="h-5 w-5" />, title: "Unlimited", description: "Generate as many dates as needed" },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "Can I control start & end?",
      answer: "Yes — full range support. Select any start and end date, and we'll generate a random date that falls within that exact range."
    },
    {
      question: "What format is the output?",
      answer: "The generated date is in YYYY-MM-DD format (ISO 8601), which is universally recognized and perfect for databases, APIs, and coding."
    },
    {
      question: "Can I generate multiple dates?",
      answer: "Yes! Just click the generate button again to get another random date. Each generation is completely random within your specified range."
    },
  ];

  const faqSchema = generateFAQSchema(faqItems);
  const faqs = faqItems.map(item => ({ question: item.question, answer: item.answer }));

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Random Date Generator"
        description="Select date range → generate random dates instantly."
        icon={<Calendar className="h-8 w-8" />}
        toolId="random-date-generator"
        category="generator"
        howItWorks={howItWorks}
        benefits={benefits}
        faqs={faqs}
      >
        <div className="mb-8 text-sm text-muted-foreground max-w-4xl mx-auto">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Random Date Generator</span>
        </div>

        <div className="space-y-6 max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    data-testid="input-start-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    data-testid="input-end-date"
                  />
                </div>
              </div>

              <Button
                onClick={generateRandomDate}
                disabled={!startDate || !endDate}
                size="lg"
                className="w-full"
                data-testid="button-generate-date"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Generate Random Date
              </Button>
            </CardContent>
          </Card>

          {randomDate && (
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-4">Random Date</h3>
                <div className="p-6 bg-primary/10 rounded-lg">
                  <p className="text-4xl font-bold text-primary" data-testid="text-random-date">
                    {randomDate}
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
