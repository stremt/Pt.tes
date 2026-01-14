import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { CalendarClock, Copy, Check, Clock, Calendar, ArrowRight, Timer, Briefcase, Globe, BarChart3, HardHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DiffResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: string;
  totalMinutes: string;
  totalSeconds: string;
  isNegative: boolean;
}

export default function TimeDifferenceCalculator() {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState<string>("09:00");
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endTime, setEndTime] = useState<string>("17:00");
  const [difference, setDifference] = useState<DiffResult | null>(null);
  const [copied, setCopied] = useState(false);

  useSEO({
    title: "Time Difference Calculator | Precise Hours & Minutes Between Dates",
    description: "Calculate time difference between two dates and times instantly. Get precise results in days, hours, minutes, and seconds. Perfect for payroll, billing, and project tracking.",
    keywords: "time difference calculator, duration calculator, calculate time between dates, hours between times, elapsed time calculator, work hours calculator, payroll time calculator, project duration tool",
    canonicalUrl: "https://tools.pixocraft.in/tools/time-difference-calculator",
  });

  const calculateDifference = () => {
    if (!startDate || !endDate) return;

    const start = new Date(`${startDate}T${startTime || "00:00"}`);
    const end = new Date(`${endDate}T${endTime || "00:00"}`);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

    const diffMs = end.getTime() - start.getTime();
    const absDiffMs = Math.abs(diffMs);
    const isNegative = diffMs < 0;

    const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((absDiffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((absDiffMs % (1000 * 60)) / 1000);

    setDifference({
      days,
      hours,
      minutes,
      seconds,
      totalHours: (absDiffMs / (1000 * 60 * 60)).toFixed(2),
      totalMinutes: (absDiffMs / (1000 * 60)).toFixed(0),
      totalSeconds: (absDiffMs / 1000).toFixed(0),
      isNegative
    });
  };

  useEffect(() => {
    calculateDifference();
  }, [startDate, startTime, endDate, endTime]);

  const copyToClipboard = () => {
    if (!difference) return;
    const text = `Time Difference: ${difference.isNegative ? '-' : ''}${difference.days}d ${difference.hours}h ${difference.minutes}m ${difference.seconds}s (${difference.totalHours} total hours)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Calculation results copied successfully.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const setToNow = (type: 'start' | 'end') => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    if (type === 'start') {
      setStartDate(date);
      setStartTime(time);
    } else {
      setEndDate(date);
      setEndTime(time);
    }
  };

  const howItWorks = [
    { step: 1, title: "Select Start Point", description: "Choose the starting date and time. Use 'Set to Now' for current moment." },
    { step: 2, title: "Select End Point", description: "Choose the ending date and time to compare against." },
    { step: 3, title: "Instant Analysis", description: "The result updates in real-time showing precise breakdown and totals." },
  ];

  const benefits = [
    { icon: <Timer className="h-5 w-5" />, title: "Precise Accuracy", description: "Calculates down to the exact second for critical timing." },
    { icon: <Clock className="h-5 w-5" />, title: "Total Conversions", description: "View total duration in decimal hours, minutes, or seconds." },
    { icon: <Calendar className="h-5 w-5" />, title: "Multi-Day Support", description: "Handles complex date spans across months or years easily." },
  ];

  const faqs = [
    { question: "Does it work for past dates?", answer: "Yes, you can calculate the difference between any two dates in the past or future." },
    { question: "What are 'Total Hours'?", answer: "Total hours represents the entire duration converted into a single decimal number, useful for payroll or billing." },
    { question: "Is this tool private?", answer: "Completely. All calculations happen locally in your browser. No data is sent to our servers." },
  ];

  const longTailVariants = [
    { title: "Payroll & Billing", path: "/tools/time-difference-calculator/payroll-billing", icon: Briefcase },
    { title: "Online Duration", path: "/tools/time-difference-calculator/online-duration", icon: Globe },
    { title: "Project Tracking", path: "/tools/time-difference-calculator/project-tracking", icon: BarChart3 },
    { title: "Work Hours", path: "/tools/time-difference-calculator/work-hours", icon: HardHat },
  ];

  return (
    <ToolLayout
      title="Time Difference Calculator"
      description="Advanced tool to calculate precise time duration between two timestamps. Perfect for billing, project tracking, and planning."
      icon={<CalendarClock className="h-8 w-8 text-primary" />}
      toolId="time-difference-calculator"
      category="math"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-primary/10 shadow-sm">
            <CardContent className="p-6 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full w-6 h-6 p-0 flex items-center justify-center">1</Badge>
                    <h3 className="font-semibold text-lg">Start Date & Time</h3>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setToNow('start')} className="text-xs h-7">
                    Set to Now
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date" className="text-xs uppercase tracking-wider text-muted-foreground">Date</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="focus-visible:ring-primary"
                      data-testid="input-start-date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="start-time" className="text-xs uppercase tracking-wider text-muted-foreground">Time</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="focus-visible:ring-primary"
                      data-testid="input-start-time"
                    />
                  </div>
                </div>
              </div>

              <div className="relative py-2 flex justify-center">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative bg-background px-4">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-full w-6 h-6 p-0 flex items-center justify-center">2</Badge>
                    <h3 className="font-semibold text-lg">End Date & Time</h3>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setToNow('end')} className="text-xs h-7">
                    Set to Now
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="end-date" className="text-xs uppercase tracking-wider text-muted-foreground">Date</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="focus-visible:ring-primary"
                      data-testid="input-end-date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-time" className="text-xs uppercase tracking-wider text-muted-foreground">Time</Label>
                    <Input
                      id="end-time"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="focus-visible:ring-primary"
                      data-testid="input-end-time"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 pt-4">
            <h3 className="text-lg font-bold">Specialized Versions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {longTailVariants.map((variant) => (
                <Link key={variant.path} href={variant.path}>
                  <Card className="hover-elevate cursor-pointer border-dashed hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/5 flex items-center justify-center">
                        <variant.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{variant.title}</h4>
                        <p className="text-[10px] text-muted-foreground line-clamp-1">Optimized for {variant.title.toLowerCase()}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          {difference && (
            <div className="sticky top-24 space-y-6">
              <Card className="bg-primary/5 border-primary/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Timer className="h-5 w-5 text-primary" />
                      Duration Result
                    </h3>
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={copyToClipboard}
                      className="h-8 w-8 hover:bg-primary/10"
                      data-testid="button-copy-results"
                    >
                      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>

                  {difference.isNegative && (
                    <Badge variant="destructive" className="mb-4 w-full justify-center">
                      End date is earlier than start date
                    </Badge>
                  )}

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="p-4 bg-background/50 backdrop-blur-sm border rounded-xl text-center hover-elevate">
                      <p className="text-3xl font-black text-primary" data-testid="text-diff-days">{difference.days}</p>
                      <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">Days</p>
                    </div>
                    <div className="p-4 bg-background/50 backdrop-blur-sm border rounded-xl text-center hover-elevate">
                      <p className="text-3xl font-black text-primary" data-testid="text-diff-hours">{difference.hours}</p>
                      <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">Hours</p>
                    </div>
                    <div className="p-4 bg-background/50 backdrop-blur-sm border rounded-xl text-center hover-elevate">
                      <p className="text-3xl font-black text-primary" data-testid="text-diff-minutes">{difference.minutes}</p>
                      <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">Minutes</p>
                    </div>
                    <div className="p-4 bg-background/50 backdrop-blur-sm border rounded-xl text-center hover-elevate">
                      <p className="text-3xl font-black text-primary" data-testid="text-diff-seconds">{difference.seconds}</p>
                      <p className="text-[10px] uppercase tracking-tighter text-muted-foreground font-bold">Seconds</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-primary/10">
                    <div className="flex justify-between items-center group">
                      <span className="text-sm text-muted-foreground">Total Hours</span>
                      <span className="font-mono font-bold text-primary group-hover:scale-110 transition-transform">{difference.totalHours} h</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-sm text-muted-foreground">Total Minutes</span>
                      <span className="font-mono font-bold text-primary group-hover:scale-110 transition-transform">{difference.totalMinutes} m</span>
                    </div>
                    <div className="flex justify-between items-center group">
                      <span className="text-sm text-muted-foreground">Total Seconds</span>
                      <span className="font-mono font-bold text-primary group-hover:scale-110 transition-transform">{Number(difference.totalSeconds).toLocaleString()} s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 bg-muted/30 rounded-lg border border-dashed text-xs text-muted-foreground italic text-center">
                Pro tip: Use this tool for timesheet calculation by entering your clock-in and clock-out times.
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
