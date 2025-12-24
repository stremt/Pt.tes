import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Play, Pause, RotateCcw, Plus } from "lucide-react";
import { useSEO, StructuredData } from "@/lib/seo";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useSEO({
    title: "Online Stopwatch with Lap Timer | Clean, Fast & Offline | Pixocraft Tools",
    description: "Track time accurately with laps and splits. Works offline, clean design & perfect for study sessions or workouts.",
    keywords: "stopwatch online, lap timer, time tracker tool, online stopwatch, lap counter",
    canonicalUrl: "https://tools.pixocraft.in/tools/stopwatch",
  });

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const addLap = () => {
    if (isRunning) {
      setLaps([...laps, time]);
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Does it save laps?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, until browser tab is open."
        }
      }
    ]
  };

  return (
    <>
      <StructuredData data={faqSchema} />
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8">
            <Breadcrumb
              items={[
                { label: "Home", url: "/" },
                { label: "Tools", url: "/tools" },
                { label: "Productivity Tools", url: "/tools/productivity" },
                { label: "Stopwatch" },
              ]}
            />
          </div>

          <div className="text-center space-y-4 mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Stopwatch + Lap Timer</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Track time accurately with laps. Perfect for workouts, study sessions & productivity
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">Free</Badge>
              <Badge variant="secondary">Lap Timer</Badge>
              <Badge variant="secondary">Offline</Badge>
            </div>
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Stopwatch</CardTitle>
                <CardDescription>
                  Track time and record laps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="text-center">
                  <div className="text-7xl md:text-8xl font-mono font-bold mb-8" data-testid="display-time">
                    {formatTime(time)}
                  </div>

                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={toggleTimer}
                      size="lg"
                      className="w-32"
                      data-testid={isRunning ? "button-pause" : "button-start"}
                    >
                      {isRunning ? (
                        <>
                          <Pause className="mr-2 h-5 w-5" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-5 w-5" />
                          Start
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={reset}
                      variant="outline"
                      size="lg"
                      className="w-32"
                      data-testid="button-reset"
                    >
                      <RotateCcw className="mr-2 h-5 w-5" />
                      Reset
                    </Button>

                    <Button
                      onClick={addLap}
                      variant="secondary"
                      size="lg"
                      className="w-32"
                      disabled={!isRunning}
                      data-testid="button-lap"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Lap
                    </Button>
                  </div>
                </div>

                {laps.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Laps</h3>
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {laps.map((lap, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardContent className="flex justify-between items-center py-3">
                            <span className="font-medium">Lap {laps.length - index}</span>
                            <span className="font-mono text-lg" data-testid={`lap-time-${index}`}>
                              {formatTime(lap)}
                            </span>
                          </CardContent>
                        </Card>
                      )).reverse()}
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
                    <CardTitle className="text-lg">Does it save laps?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes, laps are saved until you close or refresh the browser tab. They are not permanently stored.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Does it work offline?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Yes! The stopwatch runs entirely in your browser and doesn't require an internet connection.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          <div className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground max-w-7xl mx-auto">
            <p>
              <Link href="/tools/productivity" className="text-primary hover:text-primary/80 transition-colors">
                Category: Productivity Tools
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
