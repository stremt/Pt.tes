import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function DaysCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useSEO({
    title: "Days Calculator | Count Days Between Dates Instantly | Pixocraft Tools",
    description: "Calculate the number of days between two dates, including weekends & weekdays. Accurate & offline-ready.",
    keywords: "days calculator, days between dates, date duration calculator, date difference, calculate days",
    canonicalUrl: "https://tools.pixocraft.in/tools/days-calculator",
  });

  const calculateDifference = () => {
    if (!startDate || !endDate) return null;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const weeks = Math.floor(diffDays / 7);
    const months = Math.floor(diffDays / 30.44);
    const years = Math.floor(diffDays / 365.25);

    // Count weekdays and weekends
    let weekdays = 0;
    let weekends = 0;
    const current = new Date(start);

    while (current <= end) {
      const day = current.getDay();
      if (day === 0 || day === 6) {
        weekends++;
      } else {
        weekdays++;
      }
      current.setDate(current.getDate() + 1);
    }

    return { diffDays, weeks, months, years, weekdays, weekends };
  };

  const result = calculateDifference();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I calculate weeks & months also?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, it shows days, weeks & months."
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
            <Link href="/tools/math" className="hover:text-foreground" data-testid="link-tools">Math Tools</Link>
            {" / "}
            <span className="text-foreground">Days Calculator</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <CalendarIcon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Days Calculator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Calculate days, weeks, and months between two dates instantly
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Accurate</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Calculate Date Difference</CardTitle>
                <CardDescription>
                  Select two dates to calculate the difference
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      data-testid="input-start-date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      data-testid="input-end-date"
                    />
                  </div>
                </div>

                {result && (
                  <div className="space-y-4">
                    <Card className="bg-primary/10 border-primary/20">
                      <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground mb-2">Total Days</p>
                        <p className="text-5xl font-bold text-center" data-testid="result-days">
                          {result.diffDays}
                        </p>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-center">
                          <p className="text-2xl font-bold" data-testid="result-weeks">{result.weeks}</p>
                          <p className="text-sm text-muted-foreground">Weeks</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-center">
                          <p className="text-2xl font-bold" data-testid="result-months">{result.months}</p>
                          <p className="text-sm text-muted-foreground">Months</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-center">
                          <p className="text-2xl font-bold" data-testid="result-weekdays">{result.weekdays}</p>
                          <p className="text-sm text-muted-foreground">Weekdays</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-muted/50">
                        <CardContent className="pt-4 text-center">
                          <p className="text-2xl font-bold" data-testid="result-weekends">{result.weekends}</p>
                          <p className="text-sm text-muted-foreground">Weekends</p>
                        </CardContent>
                      </Card>
                    </div>
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
                    <CardTitle className="text-lg">Can I calculate weeks & months also?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! The calculator shows the difference in days, weeks, months, and even separates weekdays from weekends.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How accurate is this calculator?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Very accurate! It uses JavaScript's built-in Date object which accounts for leap years, different month lengths, and time zones.
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
