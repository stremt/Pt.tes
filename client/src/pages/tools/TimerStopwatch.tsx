import { useState, useEffect, useRef } from "react";
import { useSEO } from "@/lib/seo";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Clock, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export default function TimerStopwatch() {
  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [stopwatchRunning, setStopwatchRunning] = useState<boolean>(false);
  const stopwatchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Timer state
  const [timerMinutes, setTimerMinutes] = useState<number>(5);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRemaining, setTimerRemaining] = useState<number>(0);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useSEO({
    title: "Online Timer & Stopwatch | Simple, Fast & Offline | Pixocraft Tools",
    description: "Use a simple timer or stopwatch offline. Perfect for study, workouts, cooking and productivity.",
    keywords: "online timer, stopwatch tool, countdown timer, timer online, stopwatch online",
    canonicalUrl: "https://tools.pixocraft.in/tools/timer-stopwatch",
  });

  // Stopwatch functions
  const startStopwatch = () => {
    setStopwatchRunning(true);
    stopwatchIntervalRef.current = setInterval(() => {
      setStopwatchTime((prev) => prev + 10);
    }, 10);
  };

  const pauseStopwatch = () => {
    setStopwatchRunning(false);
    if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
    }
  };

  const resetStopwatch = () => {
    setStopwatchRunning(false);
    setStopwatchTime(0);
    if (stopwatchIntervalRef.current) {
      clearInterval(stopwatchIntervalRef.current);
    }
  };

  // Timer functions
  const startTimer = () => {
    if (timerRemaining === 0) {
      const totalSeconds = timerMinutes * 60 + timerSeconds;
      setTimerRemaining(totalSeconds);
    }
    setTimerRunning(true);
  };

  const pauseTimer = () => {
    setTimerRunning(false);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerRemaining(0);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  // Timer effect
  useEffect(() => {
    if (timerRunning && timerRemaining > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            pauseTimer();
            // Timer finished - could add sound/notification here
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [timerRunning, timerRemaining]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stopwatchIntervalRef.current) clearInterval(stopwatchIntervalRef.current);
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  const formatTimerTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const howItWorks = [
    { step: 1, title: "Choose Mode", description: "Select Timer for countdown or Stopwatch for counting up" },
    { step: 2, title: "Set Time", description: "For timer, set your desired duration" },
    { step: 3, title: "Start/Stop", description: "Control with play, pause, and reset buttons" },
  ];

  const benefits = [
    { icon: <Clock className="h-5 w-5" />, title: "Dual Mode", description: "Both timer and stopwatch in one tool" },
    { icon: <Play className="h-5 w-5" />, title: "Simple Controls", description: "Easy-to-use play, pause, and reset" },
    { icon: <Clock className="h-5 w-5" />, title: "100% Offline", description: "Works without internet connection" },
  ];

  const faqs = [
    {
      question: "Does this work offline?",
      answer: "Yes! Once loaded, the timer and stopwatch work completely offline.",
    },
    {
      question: "What's the maximum timer duration?",
      answer: "You can set the timer for any duration up to 99 minutes and 59 seconds.",
    },
    {
      question: "Can I use it for workouts?",
      answer: "Absolutely! Perfect for HIIT workouts, study sessions, cooking, or any timed activity.",
    },
  ];

  return (
    <ToolLayout
      title="Timer & Stopwatch"
      description="Use a simple timer or stopwatch offline. Perfect for study, workouts, cooking and productivity."
      icon={<Clock className="h-8 w-8" />}
      toolId="timer-stopwatch"
      category="math"
      howItWorks={howItWorks}
      benefits={benefits}
      faqs={faqs}
    >
      <Tabs defaultValue="stopwatch" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="stopwatch" data-testid="tab-stopwatch">Stopwatch</TabsTrigger>
          <TabsTrigger value="timer" data-testid="tab-timer">Timer</TabsTrigger>
        </TabsList>

        <TabsContent value="stopwatch">
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold font-mono mb-6" data-testid="text-stopwatch-time">
                  {formatTime(stopwatchTime)}
                </div>
              </div>
              <div className="flex justify-center gap-4">
                {!stopwatchRunning ? (
                  <Button
                    onClick={startStopwatch}
                    size="lg"
                    data-testid="button-stopwatch-start"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={pauseStopwatch}
                    size="lg"
                    variant="outline"
                    data-testid="button-stopwatch-pause"
                  >
                    <Pause className="mr-2 h-5 w-5" />
                    Pause
                  </Button>
                )}
                <Button
                  onClick={resetStopwatch}
                  size="lg"
                  variant="outline"
                  data-testid="button-stopwatch-reset"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timer">
          <Card>
            <CardContent className="p-8 space-y-6">
              {timerRemaining === 0 && !timerRunning && (
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="timer-minutes">Minutes</Label>
                    <Input
                      id="timer-minutes"
                      type="number"
                      min="0"
                      max="99"
                      value={timerMinutes}
                      onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                      data-testid="input-timer-minutes"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timer-seconds">Seconds</Label>
                    <Input
                      id="timer-seconds"
                      type="number"
                      min="0"
                      max="59"
                      value={timerSeconds}
                      onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                      data-testid="input-timer-seconds"
                    />
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="text-6xl md:text-7xl font-bold font-mono mb-6" data-testid="text-timer-time">
                  {timerRemaining > 0 ? formatTimerTime(timerRemaining) : `${timerMinutes.toString().padStart(2, '0')}:${timerSeconds.toString().padStart(2, '0')}`}
                </div>
              </div>
              <div className="flex justify-center gap-4">
                {!timerRunning ? (
                  <Button
                    onClick={startTimer}
                    size="lg"
                    disabled={timerMinutes === 0 && timerSeconds === 0}
                    data-testid="button-timer-start"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Start
                  </Button>
                ) : (
                  <Button
                    onClick={pauseTimer}
                    size="lg"
                    variant="outline"
                    data-testid="button-timer-pause"
                  >
                    <Pause className="mr-2 h-5 w-5" />
                    Pause
                  </Button>
                )}
                <Button
                  onClick={resetTimer}
                  size="lg"
                  variant="outline"
                  data-testid="button-timer-reset"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </ToolLayout>
  );
}
