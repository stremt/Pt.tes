import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Copy, RefreshCw, Lock, Check, Shield, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

export default function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useSEO({
    title: "Strong Password Generator | Pixocraft Tools",
    description: "Generate strong, secure passwords instantly with Pixocraft Tools. Customize length, symbols, numbers, and uppercase letters for maximum security. Free and easy to use.",
    keywords: "password generator, strong password, secure password, random password, password maker, free password generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/password-generator",
  });

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
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(generatedPassword);
  };

  const copyPassword = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Password copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrength = () => {
    if (!password) return { label: "", color: "", percentage: 0 };
    
    let strength = 0;
    if (password.length >= 12) strength += 25;
    if (password.length >= 16) strength += 25;
    if (/[a-z]/.test(password)) strength += 12.5;
    if (/[A-Z]/.test(password)) strength += 12.5;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;

    if (strength < 40) return { label: "Weak", color: "bg-destructive", percentage: strength };
    if (strength < 70) return { label: "Medium", color: "bg-chart-4", percentage: strength };
    return { label: "Strong", color: "bg-chart-3", percentage: strength };
  };

  const strength = getStrength();
  const relatedTools = getRelatedTools("password-generator");

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          {" / "}
          <span className="text-foreground">Password Generator</span>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Password Generator</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create strong, secure passwords with customizable options for maximum security
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge variant="secondary">Secure</Badge>
            <Badge variant="secondary">Customizable</Badge>
            <Badge variant="secondary">Instant</Badge>
          </div>
        </div>

        {/* Main Tool Interface */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Generate Password</CardTitle>
              <CardDescription>
                Customize your password settings and generate secure passwords
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password Display */}
              <div className="space-y-2">
                <Label>Generated Password</Label>
                <div className="flex gap-2">
                  <Input
                    value={password}
                    readOnly
                    placeholder="Click generate to create a password"
                    className="font-mono text-lg"
                    data-testid="input-generated-password"
                  />
                  <Button
                    onClick={copyPassword}
                    size="icon"
                    variant="outline"
                    disabled={!password}
                    data-testid="button-copy-password"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Strength:</span>
                      <Badge variant={strength.label === "Strong" ? "default" : "secondary"}>
                        {strength.label}
                      </Badge>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full ${strength.color} transition-all duration-300`}
                        style={{ width: `${strength.percentage}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Length Slider */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Password Length</Label>
                  <span className="text-sm font-medium">{length} characters</span>
                </div>
                <Slider
                  value={[length]}
                  onValueChange={(value) => setLength(value[0])}
                  min={8}
                  max={32}
                  step={1}
                  data-testid="slider-password-length"
                />
              </div>

              {/* Options */}
              <div className="space-y-4">
                <Label>Character Types</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="uppercase" className="font-normal cursor-pointer">
                      Uppercase Letters (A-Z)
                    </Label>
                    <Switch
                      id="uppercase"
                      checked={includeUppercase}
                      onCheckedChange={setIncludeUppercase}
                      data-testid="switch-uppercase"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lowercase" className="font-normal cursor-pointer">
                      Lowercase Letters (a-z)
                    </Label>
                    <Switch
                      id="lowercase"
                      checked={includeLowercase}
                      onCheckedChange={setIncludeLowercase}
                      data-testid="switch-lowercase"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="numbers" className="font-normal cursor-pointer">
                      Numbers (0-9)
                    </Label>
                    <Switch
                      id="numbers"
                      checked={includeNumbers}
                      onCheckedChange={setIncludeNumbers}
                      data-testid="switch-numbers"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="symbols" className="font-normal cursor-pointer">
                      Symbols (!@#$%^&*)
                    </Label>
                    <Switch
                      id="symbols"
                      checked={includeSymbols}
                      onCheckedChange={setIncludeSymbols}
                      data-testid="switch-symbols"
                    />
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex gap-2">
                <Button
                  onClick={generatePassword}
                  className="flex-1"
                  size="lg"
                  data-testid="button-generate-password"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold text-lg">Customize Settings</h3>
              <p className="text-muted-foreground">
                Choose password length and character types to include
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold text-lg">Generate</h3>
              <p className="text-muted-foreground">
                Click the button to instantly create a secure random password
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold text-lg">Copy & Use</h3>
              <p className="text-muted-foreground">
                Copy the password and use it for your accounts
              </p>
            </div>
          </div>
        </section>

        {/* Why Use Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Use Strong Passwords?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Enhanced Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Strong passwords with mixed characters are exponentially harder to crack
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Lock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Account Protection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Protect your personal information and sensitive data from unauthorized access
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <RefreshCw className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Unique Passwords</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Generate different passwords for each account to prevent widespread breaches
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Check className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Easy to Generate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Create complex passwords instantly without having to think of them yourself
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What makes a password strong?</AccordionTrigger>
                <AccordionContent>
                  A strong password is at least 12 characters long and includes a mix of uppercase letters, lowercase letters, numbers, and symbols. The more diverse and longer the password, the harder it is to crack.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Are generated passwords saved anywhere?</AccordionTrigger>
                <AccordionContent>
                  No, passwords are generated entirely in your browser and are never sent to our servers or stored anywhere. Once you leave the page, the password is gone unless you saved it yourself.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How should I store my passwords?</AccordionTrigger>
                <AccordionContent>
                  We recommend using a reputable password manager to securely store all your passwords. Never write passwords on paper or store them in plain text files.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How often should I change my passwords?</AccordionTrigger>
                <AccordionContent>
                  Change your passwords every 3-6 months, or immediately if you suspect a breach. Always use unique passwords for different accounts.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I use this for all my accounts?</AccordionTrigger>
                <AccordionContent>
                  Yes! Generate a unique password for each of your accounts. Never reuse passwords across different services to maintain maximum security.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Related Tools */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Related Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedTools.map((tool) => {
              const Icon = getToolIcon(tool.icon);
              return (
                <Card key={tool.id} className="hover-elevate">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{tool.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">{tool.description}</CardDescription>
                    <Link href={tool.path}>
                      <Button variant="outline" className="w-full" data-testid={`button-related-${tool.id}`}>
                        Use Tool
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
