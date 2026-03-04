import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Lock, Check, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PasswordGeneratorToolProps {
  initialLength?: number;
  onPasswordChange?: (password: string) => void;
  showEntropy?: boolean;
}

export function PasswordGeneratorTool({ 
  initialLength = 16, 
  onPasswordChange,
  showEntropy = true 
}: PasswordGeneratorToolProps) {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(initialLength);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const getEstimatedCrackTime = (entropy: number) => {
    const combinations = Math.pow(2, entropy);
    const seconds = combinations / 1e12; // Assuming 10^12 guesses per second
    
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    
    const years = seconds / 31536000;
    if (years < 1000) return `${Math.round(years)} years`;
    if (years < 1000000) return `${Math.round(years / 1000)} thousand years`;
    if (years < 1000000000) return `${Math.round(years / 1000000)} million years`;
    if (years < 1e12) return `~${(years / 1e9).toFixed(1)} billion years`;
    
    if (years > 13.8e9) return "Longer than the age of the universe";

    // Clean scientific notation for extremely large values
    const exponent = Math.floor(Math.log10(years));
    const mantissa = (years / Math.pow(10, exponent)).toFixed(1);
    return `~${mantissa} × 10^${exponent} years`;
  };

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    let charsetSize = 0;
    if (includeLowercase) { chars += lowercase; charsetSize += 26; }
    if (includeUppercase) { chars += uppercase; charsetSize += 26; }
    if (includeNumbers) { chars += numbers; charsetSize += 10; }
    if (includeSymbols) { chars += symbols; charsetSize += 32; }

    if (chars === "") {
      toast({
        title: "Error",
        description: "Please select at least one character type",
        variant: "destructive",
      });
      return;
    }

    let generatedPassword = "";
    const cryptoArray = new Uint32Array(length);
    crypto.getRandomValues(cryptoArray);
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(cryptoArray[i] % chars.length);
    }

    setPassword(generatedPassword);
    if (onPasswordChange) onPasswordChange(generatedPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied Successfully",
        description: "Your secure password is ready to use",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrength = () => {
    if (!password) return { label: "", color: "", percentage: 0, description: "", entropy: 0 };
    
    let charsetSize = 0;
    if (includeLowercase) charsetSize += 26;
    if (includeUppercase) charsetSize += 26;
    if (includeNumbers) charsetSize += 10;
    if (includeSymbols) charsetSize += 32;
    
    const entropy = Math.round(length * Math.log2(charsetSize || 1));
    
    // Strength thresholds based on entropy
    // 0–40 bits → Weak
    // 40–70 bits → Moderate
    // 70–100 bits → Strong
    // 100–150 bits → Very Strong
    // 150+ bits → Uncrackable
    
    let label = "Weak";
    let color = "bg-destructive";
    let description = "Add more characters";
    let percentage = Math.min(100, (entropy / 150) * 100);

    if (entropy >= 150) {
      label = "Uncrackable";
      color = "bg-emerald-500";
      description = "Maximum security";
    } else if (entropy >= 100) {
      label = "Very Strong";
      color = "bg-green-600";
      description = "Highly secure";
    } else if (entropy >= 70) {
      label = "Strong";
      color = "bg-chart-3";
      description = "Excellent security";
    } else if (entropy >= 40) {
      label = "Moderate";
      color = "bg-yellow-500";
      description = "Good strength";
    }

    return { label, color, percentage, description, entropy };
  };

  const strength = getStrength();

  return (
    <Card className="relative border-none shadow-2xl overflow-visible">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Generate Secure Password Now</CardTitle>
            <CardDescription>Takes less than 1 second • Completely private</CardDescription>
          </div>
          <Lock className="h-6 w-6 text-primary/40" />
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="relative group">
            <Input
              value={password}
              readOnly
              className="h-16 px-6 font-mono text-2xl bg-muted/30 border-2 focus-visible:ring-primary/20 transition-all"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                onClick={copyPassword}
                size="lg"
                variant={copied ? "default" : "outline"}
                disabled={!password}
                className="h-12 px-6 shadow-sm hover-elevate active-elevate-2"
              >
                {copied ? <Check className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          
          {password && showEntropy && (
            <div className="space-y-4 p-4 rounded-xl bg-muted/20 border border-primary/5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Entropy</p>
                  <p className="text-xl font-mono font-bold text-primary">{strength.entropy} bits</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Est. Crack Time</p>
                  <p className="text-xl font-bold">{getEstimatedCrackTime(strength.entropy)}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">Strength: <span className={strength.color.replace('bg-', 'text-')}>{strength.label}</span></span>
                  <span className="text-muted-foreground">{strength.percentage}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden p-0.5 border border-primary/5">
                  <div
                    className={`h-full ${strength.color} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${strength.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Label className="text-base font-bold">Password Length</Label>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                value={length} 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) setLength(Math.min(128, Math.max(4, val)));
                }}
                className="w-16 h-8 text-center font-bold"
              />
              <span className="text-xs font-bold text-muted-foreground uppercase">Chars</span>
            </div>
          </div>
          <Slider
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={4}
            max={64}
            step={1}
            className="py-4"
          />
        </div>

        <div className="space-y-6">
          <Label className="text-base font-bold">Character Types</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
              <Label htmlFor="uppercase" className="font-medium cursor-pointer">Uppercase (A-Z)</Label>
              <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
              <Label htmlFor="lowercase" className="font-medium cursor-pointer">Lowercase (a-z)</Label>
              <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
              <Label htmlFor="numbers" className="font-medium cursor-pointer">Numbers (0-9)</Label>
              <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10">
              <Label htmlFor="symbols" className="font-medium cursor-pointer">Symbols (!@#$)</Label>
              <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
            </div>
          </div>
        </div>

        <Button
          onClick={generatePassword}
          className="w-full h-14 text-xl font-bold bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 shadow-lg"
          size="lg"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Generate Secure Password
        </Button>
      </CardContent>
    </Card>
  );
}
