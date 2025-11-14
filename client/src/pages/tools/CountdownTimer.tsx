import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Play, Pause, RotateCcw } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function CountdownTimer() {
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("0");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useSEO({
    title: "Countdown Timer Online | Set Timer for Study, Work & Cooking | Pixocraft Tools",
    description: "Set countdown timers for productivity, Pomodoro, cooking or workouts. Clean, simple & offline.",
    keywords: "countdown timer, online timer, study timer, cooking timer, pomodoro timer, work timer",
    canonicalUrl: "https://tools.pixocraft.in/tools/countdown-timer",
  });

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const playAlert = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRhIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRh');
    audio.play().catch(() => {});
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (timeLeft === 0) {
      const totalSeconds = parseInt(minutes || "0") * 60 + parseInt(seconds || "0");
      if (totalSeconds > 0) {
        setTimeLeft(totalSeconds);
        setIsRunning(true);
      }
    } else {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does timer work in background?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, until the tab is open."
        }
      }
    ]
  };

  const quickTimers = [
    { label: "5 min", minutes: 5 },
    { label: "10 min", minutes: 10 },
    { label: "15 min", minutes: 15 },
    { label: "25 min", minutes: 25 },
    { label: "30 min", minutes: 30 },
  ];

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground" data-testid="link-home">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground" data-testid="link-tools">Tools</Link>
            {" / "}
            <span className="text-foreground">Countdown Timer</span>
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Countdown Timer</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Set countdown for productivity, Pomodoro, cooking or workouts
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Offline</Badge>
              <Badge variant="secondary">Pomodoro Ready</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Set Timer</CardTitle>
                <CardDescription>
                  Enter time or select a preset
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {timeLeft === 0 && !isRunning && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Minutes</Label>
                        <Input
                          type="number"
                          value={minutes}
                          onChange={(e) => setMinutes(e.target.value)}
                          min="0"
                          max="60"
                          data-testid="input-minutes"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Seconds</Label>
                        <Input
                          type="number"
                          value={seconds}
                          onChange={(e) => setSeconds(e.target.value)}
                          min="0"
                          max="59"
                          data-testid="input-seconds"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Quick Presets</Label>
                      <div className="flex flex-wrap gap-2">
                        {quickTimers.map((preset) => (
                          <Button
                            key={preset.label}
                            onClick={() => {
                              setMinutes(preset.minutes.toString());
                              setSeconds("0");
                            }}
                            variant="outline"
                            size="sm"
                            data-testid={`preset-${preset.minutes}`}
                          >
                            {preset.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <div className="text-center">
                  {timeLeft > 0 && (
                    <div className="text-7xl md:text-8xl font-mono font-bold mb-8" data-testid="display-time">
                      {formatTime(timeLeft)}
                    </div>
                  )}

                  <div className="flex justify-center gap-4">
                    {!isRunning ? (
                      <Button
                        onClick={startTimer}
                        size="lg"
                        className="w-32"
                        data-testid="button-start"
                      >
                        <Play className="mr-2 h-5 w-5" />
                        Start
                      </Button>
                    ) : (
                      <Button
                        onClick={pauseTimer}
                        size="lg"
                        className="w-32"
                        data-testid="button-pause"
                      >
                        <Pause className="mr-2 h-5 w-5" />
                        Pause
                      </Button>
                    )}

                    <Button
                      onClick={resetTimer}
                      variant="outline"
                      size="lg"
                      className="w-32"
                      data-testid="button-reset"
                    >
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Reset
                    </Button>
                  </div>
                </div>
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
                    <CardTitle className="text-lg">Does timer work in background?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, the timer continues running as long as the browser tab is open, even if you switch to another tab.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">What's the Pomodoro Technique?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The Pomodoro Technique is a time management method that uses 25-minute work intervals followed by short breaks. Our 25-minute preset is perfect for this!
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
