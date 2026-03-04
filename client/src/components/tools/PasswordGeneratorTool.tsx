import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Lock, Check, Info, ShieldCheck } from "lucide-react";
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
    
    // Adjusted scaling based on requirements:
    // 0–40 bits → 20%
    // 40–70 bits → 40%
    // 70–100 bits → 60%
    // 100–150 bits → 80%
    // 150+ bits → 100%
    let percentage = 0;
    if (entropy < 40) {
      percentage = Math.max(5, (entropy / 40) * 20);
    } else if (entropy < 70) {
      percentage = 20 + ((entropy - 40) / 30) * 20;
    } else if (entropy < 100) {
      percentage = 40 + ((entropy - 70) / 30) * 20;
    } else if (entropy < 150) {
      percentage = 60 + ((entropy - 100) / 50) * 20;
    } else {
      percentage = 80 + Math.min(20, ((entropy - 150) / 100) * 20);
    }
    percentage = Math.round(percentage);

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
    <Card className="relative border-none shadow-2xl overflow-visible bg-background/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold tracking-tight">Password Generator</CardTitle>
            <CardDescription className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Secure • Private • Local
            </CardDescription>
          </div>
          <div className="p-3 rounded-xl bg-primary/10 text-primary">
            <Lock className="h-6 w-6" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="relative group">
            <Input
              value={password}
              readOnly
              className="h-20 px-6 font-mono text-3xl bg-muted/20 border-2 border-primary/10 focus-visible:ring-primary/20 transition-all text-center tracking-wider rounded-2xl"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <Button
                onClick={copyPassword}
                size="lg"
                variant={copied ? "default" : "secondary"}
                disabled={!password}
                className="h-14 px-8 shadow-md hover-elevate active-elevate-2 rounded-xl font-bold"
              >
                {copied ? <Check className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          
          {password && showEntropy && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">Entropy Score</p>
                <p className="text-2xl font-mono font-black text-primary">{strength.entropy} <span className="text-xs font-normal">bits</span></p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/20 border border-secondary-border flex flex-col justify-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 mb-1">Estimated Crack Time</p>
                <p className="text-lg font-bold leading-tight">{getEstimatedCrackTime(strength.entropy)}</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30 border border-border flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">Security Level</p>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-background border">{strength.percentage}%</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-black ${strength.color.replace('bg-', 'text-')}`}>{strength.label}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                      style={{ width: `${strength.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 p-6 rounded-2xl bg-muted/10 border">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base font-bold">Password Length</Label>
                <p className="text-xs text-muted-foreground">Adjust length for more entropy</p>
              </div>
              <div className="flex items-center gap-2 bg-background p-1 rounded-lg border shadow-sm">
                <Input 
                  type="number" 
                  value={length} 
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) setLength(Math.min(128, Math.max(4, val)));
                  }}
                  className="w-14 h-8 text-center font-bold border-none focus-visible:ring-0 p-0"
                />
                <span className="text-[10px] font-black text-muted-foreground uppercase pr-2">Chars</span>
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
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground/50 uppercase tracking-tighter">
              <span>Very Short</span>
              <span>Recommended (16)</span>
              <span>Maximum Security</span>
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-base font-bold block px-1">Security Options</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "uppercase", label: "Uppercase", sub: "A-Z", state: includeUppercase, setter: setIncludeUppercase },
                { id: "lowercase", label: "Lowercase", sub: "a-z", state: includeLowercase, setter: setIncludeLowercase },
                { id: "numbers", label: "Numbers", sub: "0-9", state: includeNumbers, setter: setIncludeNumbers },
                { id: "symbols", label: "Symbols", sub: "!@#$", state: includeSymbols, setter: setIncludeSymbols },
              ].map((opt) => (
                <div key={opt.id} className="flex items-center justify-between p-4 rounded-xl border bg-background hover:bg-muted/30 transition-colors shadow-sm">
                  <div className="space-y-0.5">
                    <Label htmlFor={opt.id} className="font-bold cursor-pointer text-sm">{opt.label}</Label>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{opt.sub}</p>
                  </div>
                  <Switch id={opt.id} checked={opt.state} onCheckedChange={opt.setter} className="data-[state=checked]:bg-primary" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <Button
            onClick={generatePassword}
            className="w-full h-16 text-xl font-black bg-primary hover:opacity-90 shadow-xl rounded-2xl group relative overflow-hidden active-elevate-2 transition-all"
            size="lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <RefreshCw className="mr-3 h-6 w-6 group-hover:rotate-180 transition-transform duration-500" />
            Regenerate Secure Password
          </Button>
          <p className="text-center mt-4 text-xs font-medium text-muted-foreground flex items-center justify-center gap-1.5">
            <Info className="h-3.5 w-3.5" /> High-entropy keys are generated instantly in your browser.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
