import { useState } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function TimeDifferenceCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endDate, setEndDate] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("00:00");
  const [difference, setDifference] = useState<{days: number, hours: number, minutes: number} | null>(null);

  useSEO({
    title: "Time Difference Calculator | Hours, Minutes Between Dates | Pixocraft Tools",
    description: "Calculate time difference between two dates/times instantly. Offline and fast.",
    keywords: "time difference calculator, hours between dates, date difference tool, time calculator",
    canonicalUrl: "https://tools.pixocraft.in/tools/time-difference-calculator",
  });

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);

    const diffMs = Math.abs(end.getTime() - start.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setDifference({ days, hours, minutes });
  };

  const howItWorks = [
    { step: 1, title: "Enter Start Date & Time", description: "Select the starting date and time" },
    { step: 2, title: "Enter End Date & Time", description: "Select the ending date and time" },
    { step: 3, title: "Calculate", description: "See the difference in days, hours, and minutes" },
  ];

  const benefits = [
    { icon: <CalendarClock className="h-5 w-5" />, title: "Precise", description: "Accurate to the minute" },
    { icon: <CalendarClock className="h-5 w-5" />, title: "Multiple Uses", description: "Perfect for billing, planning, and tracking" },
    { icon: <CalendarClock className="h-5 w-5" />, title: "Instant", description: "Real-time calculation" },
  ];

  const faqs = [
    { question: "Can I calculate time across multiple days?", answer: "Yes! The calculator works for any time range, from minutes to years." },
    { question: "Does it account for time zones?", answer: "It calculates based on the dates and times you enter. Make sure to convert to the same timezone if needed." },
    { question: "What can I use this for?", answer: "Perfect for billing hours, study planning, project tracking, or any time-based calculation." },
  ];

  return (
    <ToolLayout
      title="Time Difference Calculator"
      description="Calculate time difference between two dates/times instantly. Offline and fast."
      icon={<CalendarClock className="h-8 w-8" />}
      toolId="time-difference-calculator"
      category="utility"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="space-y-6 max-w-2xl mx-auto">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Start Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                data-testid="input-start-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="start-time">Time</Label>
              <Input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                data-testid="input-start-time"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-lg">End Date & Time</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="end-date">Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                data-testid="input-end-date"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-time">Time</Label>
              <Input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                data-testid="input-end-time"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={calculateDifference}
          size="lg"
          disabled={!startDate || !endDate}
          className="w-full"
          data-testid="button-calculate"
        >
          <CalendarClock className="mr-2 h-5 w-5" />
          Calculate Difference
        </Button>

        {difference && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-center">Time Difference</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-4xl font-bold" data-testid="text-diff-days">{difference.days}</p>
                  <p className="text-sm text-muted-foreground">Days</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-4xl font-bold" data-testid="text-diff-hours">{difference.hours}</p>
                  <p className="text-sm text-muted-foreground">Hours</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-4xl font-bold" data-testid="text-diff-minutes">{difference.minutes}</p>
                  <p className="text-sm text-muted-foreground">Minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
