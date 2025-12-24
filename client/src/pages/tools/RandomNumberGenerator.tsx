import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shuffle, Copy, Check } from "lucide-react";
import { useSEO } from "@/lib/seo";
import { useToast } from "@/hooks/use-toast";

import { Link } from "wouter";

export default function RandomNumberGenerator() {
  useSEO({
    title: "Random Number Generator | Fast, Secure & Offline",
    description: "Generate random numbers instantly in any range. Offline, free and secure.",
    keywords: "random number generator, number picker online, rng tool, random number",
    canonicalUrl: "https://tools.pixocraft.in/tools/random-number-generator",
  });

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [result, setResult] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateNumber = () => {
    if (min >= max) {
      toast({
        title: "Invalid Range",
        description: "Minimum must be less than maximum",
        variant: "destructive",
      });
      return;
    }
    
    const randomArray = new Uint32Array(1);
    crypto.getRandomValues(randomArray);
    const range = max - min + 1;
    const randomNumber = min + (randomArray[0] % range);
    setResult(randomNumber);
  };

  const copyResult = () => {
    if (result !== null) {
      navigator.clipboard.writeText(result.toString());
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Number copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
          <div className="mb-8 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            {" / "}
            <Link href="/tools" className="hover:text-foreground">Tools</Link>
            {" / "}
            <Link href="/tools/math" className="hover:text-foreground">Math Tools</Link>
            {" / "}
            <span className="text-foreground"> Random Number Generator</span>
          </div>
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">Random Number Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Generate random numbers instantly between any range. Works offline — ideal for games, math & decision making.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Configure Range</CardTitle>
              <CardDescription>Set your minimum and maximum values</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="min">Minimum Value</Label>
                <Input
                  id="min"
                  type="number"
                  value={min}
                  onChange={(e) => setMin(parseInt(e.target.value) || 0)}
                  data-testid="input-min"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">Maximum Value</Label>
                <Input
                  id="max"
                  type="number"
                  value={max}
                  onChange={(e) => setMax(parseInt(e.target.value) || 100)}
                  data-testid="input-max"
                />
              </div>
              <Button
                onClick={generateNumber}
                className="w-full"
                size="lg"
                data-testid="button-generate"
              >
                <Shuffle className="mr-2 h-5 w-5" />
                Generate Random Number
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>Your randomly generated number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {result !== null ? (
                <>
                  <div className="flex items-center justify-center p-12 bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg">
                    <span
                      className="text-6xl font-bold text-primary"
                      data-testid="text-result"
                    >
                      {result}
                    </span>
                  </div>
                  <Button
                    onClick={copyResult}
                    variant="outline"
                    className="w-full"
                    data-testid="button-copy"
                  >
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? "Copied!" : "Copy Number"}
                  </Button>
                </>
              ) : (
                <div className="flex items-center justify-center p-12 bg-muted rounded-lg">
                  <p className="text-muted-foreground text-center">
                    Click generate to create a random number
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Cryptographically Secure</h3>
              <p className="text-muted-foreground">
                Uses the Web Crypto API to generate truly random numbers, not pseudo-random.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">100% Offline & Private</h3>
              <p className="text-muted-foreground">
                All generation happens in your browser. No data is sent to any server.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Use Cases</h3>
              <p className="text-muted-foreground">
                Perfect for games, lotteries, random selection, dice rolls, password generation, and mathematical simulations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
