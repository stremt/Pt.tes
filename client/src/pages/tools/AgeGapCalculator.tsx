import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function AgeGapCalculator() {
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [gap, setGap] = useState<{ years: number; months: number; days: number } | null>(null);

  useSEO({
    title: "Age Gap Calculator | Difference Between Ages | Pixocraft Tools",
    description: "Calculate age gap between two birthdates. Free age difference calculator showing years, months, and days.",
    keywords: "age gap calculator, age difference tool, calculate age gap",
    canonicalUrl: "https://tools.pixocraft.in/tools/age-gap-calculator",
  });

  const calculate = () => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return;
    }

    const diff = Math.abs(d2.getTime() - d1.getTime());
    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));

    setGap({ years, months, days });
  };

  const faqItems: FAQItem[] = [
    {
      question: "How is age gap calculated?",
      answer: "Age gap is calculated by finding the difference between two dates and converting it into years, months, and days for easy understanding."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            {" / "}
            <span className="text-foreground">Age Gap Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Age Gap Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enter two dates → get age gap
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Fast</Badge>
              <Badge variant="secondary">Free</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Age Gap</CardTitle>
                <CardDescription>
                  Enter two birthdates to find the age difference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Date</Label>
                    <Input
                      type="date"
                      value={date1}
                      onChange={(e) => setDate1(e.target.value)}
                      data-testid="input-date1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Second Date</Label>
                    <Input
                      type="date"
                      value={date2}
                      onChange={(e) => setDate2(e.target.value)}
                      data-testid="input-date2"
                    />
                  </div>
                </div>

                <Button onClick={calculate} className="w-full" data-testid="button-calculate">
                  Calculate Gap
                </Button>

                {gap && (
                  <Card className="bg-primary/10">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <p className="text-4xl font-bold" data-testid="text-years">{gap.years}</p>
                          <p className="text-sm text-muted-foreground">Years</p>
                        </div>
                        <div>
                          <p className="text-4xl font-bold" data-testid="text-months">{gap.months}</p>
                          <p className="text-sm text-muted-foreground">Months</p>
                        </div>
                        <div>
                          <p className="text-4xl font-bold" data-testid="text-days">{gap.days}</p>
                          <p className="text-sm text-muted-foreground">Days</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>

          <section className="py-16 border-t">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqItems.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
