import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Copy, RefreshCw, Lock, Check, Info, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { calculatePasswordSecurity } from "@/lib/passwordSecurity";

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

  const security = useMemo(() => {
    return calculatePasswordSecurity(password);
  }, [password]);

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if (includeLowercase) chars += lowercase;
    if (includeUppercase) chars += uppercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

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

  return (
    <Card className="relative border-none shadow-2xl overflow-visible bg-background/60 backdrop-blur-md ring-1 ring-primary/10">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle className="text-3xl font-black tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">Password Generator</CardTitle>
            <CardDescription className="flex items-center gap-2 font-medium">
              <div className="flex -space-x-1">
                <div className="h-5 w-5 rounded-full bg-green-500/20 flex items-center justify-center ring-2 ring-background">
                  <ShieldCheck className="h-3 w-3 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <span className="text-xs uppercase tracking-wider font-bold text-muted-foreground/80">Secure • Private • Local</span>
            </CardDescription>
          </div>
          <div className="p-3.5 rounded-2xl bg-primary shadow-lg shadow-primary/20 text-primary-foreground transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <Lock className="h-6 w-6" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-500/30 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 h-20 px-6 font-mono text-xl md:text-2xl bg-muted/30 border-2 border-primary/10 rounded-2xl shadow-inner font-black flex items-center justify-center text-center tracking-wider overflow-hidden whitespace-nowrap">
                <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth">
                  {password}
                </div>
              </div>
              <Button
                onClick={copyPassword}
                size="lg"
                variant={copied ? "default" : "secondary"}
                disabled={!password}
                data-testid="button-copy-password"
                className="h-20 px-8 shadow-xl hover-elevate active-elevate-2 rounded-2xl font-black text-lg transition-all duration-300 min-w-[140px]"
              >
                {copied ? <Check className="h-6 w-6 mr-2" /> : <Copy className="h-6 w-6 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
          
          {password && showEntropy && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/10 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/70 mb-1.5 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Entropy Score
                </p>
                <p className="text-3xl font-mono font-black text-primary tracking-tighter">{security.entropy} <span className="text-xs font-bold opacity-60">BITS</span></p>
              </div>
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/10 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[10px] font-black uppercase tracking-widest text-blue-600/70 mb-1.5 flex items-center gap-1">
                  <RefreshCw className="h-3 w-3" /> Crack Time
                </p>
                <p className="text-xl font-black leading-tight tracking-tight text-blue-700 dark:text-blue-400">{security.crackTime}</p>
              </div>
              <div className="p-5 rounded-2xl bg-muted/40 border border-border flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/70 flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Security
                  </p>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-background border shadow-sm">{security.strengthPercent}%</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-black uppercase tracking-tighter ${security.strengthColor.replace('bg-', 'text-')}`}>{security.strengthLabel}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden ring-1 ring-black/5 dark:ring-white/5">
                    <div
                      className={`h-full ${security.strengthColor} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,0,0,0.1)] relative`}
                      style={{ width: `${security.strengthPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6 p-7 rounded-3xl bg-muted/20 border-2 border-primary/5 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-lg font-black tracking-tight">Password Length</Label>
                <p className="text-xs text-muted-foreground font-medium">Longer passwords = Higher entropy</p>
              </div>
              <div className="flex items-center gap-2 bg-background p-1.5 rounded-xl border-2 border-primary/10 shadow-sm ring-2 ring-primary/5">
                <Input 
                  type="number" 
                  value={length} 
                  data-testid="input-password-length"
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) setLength(Math.min(128, Math.max(4, val)));
                  }}
                  className="w-16 h-10 text-center font-black text-lg border-none focus-visible:ring-0 p-0 bg-transparent"
                />
                <span className="text-[10px] font-black text-muted-foreground uppercase pr-3 opacity-60">Chars</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={[length]}
                onValueChange={(value) => setLength(value[0])}
                min={4}
                max={64}
                step={1}
                data-testid="slider-password-length"
                className="py-6"
              />
            </div>
            <div className="flex justify-between text-[10px] font-black text-muted-foreground/40 uppercase tracking-widest px-1">
              <span>Weak</span>
              <span className="text-primary/60">Strong (16+)</span>
              <span>Ultra</span>
            </div>
          </div>

          <div className="space-y-5">
            <Label className="text-lg font-black tracking-tight block px-1">Character Types</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: "uppercase", label: "Uppercase", sub: "A-Z", state: includeUppercase, setter: setIncludeUppercase, color: "text-blue-500" },
                { id: "lowercase", label: "Lowercase", sub: "a-z", state: includeLowercase, setter: setIncludeLowercase, color: "text-purple-500" },
                { id: "numbers", label: "Numbers", sub: "0-9", state: includeNumbers, setter: setIncludeNumbers, color: "text-orange-500" },
                { id: "symbols", label: "Symbols", sub: "!@#$", state: includeSymbols, setter: setIncludeSymbols, color: "text-rose-500" },
              ].map((opt) => (
                <div key={opt.id} className="group flex items-center justify-between p-5 rounded-2xl border-2 border-transparent bg-background hover:bg-muted/40 hover:border-primary/10 transition-all shadow-sm active-elevate-2 cursor-pointer">
                  <div className="space-y-1">
                    <Label htmlFor={opt.id} className="font-black cursor-pointer text-base group-hover:text-primary transition-colors">{opt.label}</Label>
                    <p className={`text-[10px] ${opt.color} font-black uppercase tracking-[0.2em] opacity-80`}>{opt.sub}</p>
                  </div>
                  <Switch 
                    id={opt.id} 
                    checked={opt.state} 
                    onCheckedChange={opt.setter} 
                    data-testid={`switch-include-${opt.id}`}
                    className="data-[state=checked]:bg-primary scale-110" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={generatePassword}
            data-testid="button-generate-password"
            className="w-full h-20 text-2xl font-black bg-primary hover:opacity-90 shadow-2xl shadow-primary/30 rounded-3xl group relative overflow-hidden active-elevate-2 transition-all transform hover:-translate-y-1"
            size="lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <RefreshCw className="mr-4 h-7 w-7 group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
            Generate New Password
          </Button>
          <div className="flex items-center justify-center gap-4 mt-6">
             <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
             <p className="text-xs font-bold text-muted-foreground/60 flex items-center gap-2 uppercase tracking-tighter">
                <Info className="h-3.5 w-3.5" /> Client-Side Encryption Powered
             </p>
             <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
