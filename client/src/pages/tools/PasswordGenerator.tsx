import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, OG_IMAGES, type FAQItem } from "@/lib/seo";
import { getRelatedTools, getToolIcon } from "@/lib/tools";
import { Copy, RefreshCw, Lock, Check, Shield, ArrowRight, ShieldCheck, Globe, Eye, Users, Briefcase, GraduationCap, User, ExternalLink, Info, Mail, CreditCard, Code } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { RelatedUseCases } from "@/components/RelatedUseCases";
import { Breadcrumb } from "@/components/Breadcrumb";
import { LongTailPagesSection } from "@/components/LongTailPagesSection";

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
    title: "Free Strong Password Generator - Secure Random Passwords Online | Pixocraft",
    description: "Generate strong, secure passwords instantly. Free online password generator with no signup required. Works offline, 100% private - passwords never stored or transmitted.",
    keywords: "password generator, strong password generator, secure password generator online, random password generator, free password generator, password maker, password creator, generate strong password",
    canonicalUrl: "https://tools.pixocraft.in/tools/password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
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
    const cryptoArray = new Uint32Array(length);
    crypto.getRandomValues(cryptoArray);
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(cryptoArray[i] % chars.length);
    }

    setPassword(generatedPassword);
  };

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
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;
    
    const entropy = Math.round(password.length * Math.log2(charsetSize || 1));
    
    let strength = 0;
    if (password.length >= 12) strength += 25;
    if (password.length >= 16) strength += 25;
    if (/[a-z]/.test(password)) strength += 12.5;
    if (/[A-Z]/.test(password)) strength += 12.5;
    if (/[0-9]/.test(password)) strength += 12.5;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;

    if (strength < 40) return { label: "Weak", color: "bg-destructive", percentage: strength, description: "Add more characters for better security", entropy };
    if (strength < 70) return { label: "Medium", color: "bg-chart-4", percentage: strength, description: "Good strength, consider adding more characters", entropy };
    return { label: "Strong", color: "bg-chart-3", percentage: strength, description: "Excellent - virtually uncrackable", entropy };
  };

  const strength = getStrength();
  const relatedTools = getRelatedTools("password-generator");

  // Reordered FAQs - Most common Google "People Also Ask" questions first
  const faqItems: FAQItem[] = [
    {
      question: "Is an online password generator safe to use?",
      answer: "Yes, when the generator runs entirely in your browser like ours. This password generator uses the Web Crypto API for cryptographically secure randomization and never transmits passwords to any server. Your passwords are never stored, logged, or tracked. Once you close the page, they're gone completely. This is the safest method to generate passwords online."
    },
    {
      question: "Can hackers crack randomly generated passwords?",
      answer: "Randomly generated passwords with sufficient length and complexity are virtually uncrackable. A 16-character password with mixed characters has over 10^28 possible combinations. At one trillion guesses per second, cracking it would take longer than the age of the universe. The key factors are true randomness (which our generator provides) and sufficient length (12+ characters minimum)."
    },
    {
      question: "What is the best password length for security?",
      answer: "For standard accounts, 12-16 characters is recommended by security experts including NIST. For high-security accounts like banking, email, and work systems, use 16-24 characters. Every additional character exponentially increases the difficulty of cracking. Our generator supports up to 32 characters for maximum protection."
    },
    {
      question: "Should I use different passwords for every account?",
      answer: "Absolutely. Password reuse is one of the biggest security risks. If one service is breached and you've used the same password elsewhere, attackers can access all your accounts (credential stuffing). Always generate a unique password for each account and store them securely in a password manager."
    },
    {
      question: "Are passwords generated by this tool stored anywhere?",
      answer: "No, never. All password generation happens locally in your browser using JavaScript. We have zero access to your passwords - there are no server requests, no logging, no tracking, and no database storage. Your passwords exist only on your screen until you copy them or refresh the page."
    },
    {
      question: "How should I store my generated passwords securely?",
      answer: "Use a reputable password manager like Bitwarden, 1Password, LastPass, or Dashlane. These tools encrypt your passwords and sync them securely across devices. Never store passwords in plain text files, emails, browser notes, or written on paper. Enable two-factor authentication on your password manager for extra security."
    },
    {
      question: "What makes a password strong and secure?",
      answer: "A strong password has three key characteristics: length (at least 12-16 characters), complexity (mix of uppercase, lowercase, numbers, and symbols), and uniqueness (different for each account). Our generator creates passwords with over 10^28 possible combinations for a 16-character password, making them virtually impossible to crack."
    },
    {
      question: "How often should I change my passwords?",
      answer: "Modern security guidance from NIST suggests changing passwords only when there's a specific reason (breach notification, suspected compromise, shared with someone). For critical accounts, periodic changes every 6-12 months are still recommended. Always change passwords immediately if you receive a breach notification from any service."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Free Strong Password Generator",
    description: "Generate secure, random passwords instantly. Free online tool with no signup required. Works offline in your browser with complete privacy.",
    url: "https://tools.pixocraft.in/tools/password-generator",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any",
    offers: { price: "0", priceCurrency: "USD" }
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareSchema} />
      <div className="mb-6 px-4 pt-4">
        <Breadcrumb
          items={[
            { label: "Home", url: "/" },
            { label: "Tools", url: "/tools" },
            { label: "Privacy Tools", url: "/tools/privacy" },
            { label: "Password Generator" },
          ]}
        />
      </div>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* Page Header */}
          <div className="text-center space-y-4 mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold">Free Strong Password Generator</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Create secure, random passwords instantly. No signup, no tracking, works offline.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Badge variant="secondary">100% Free</Badge>
              <Badge variant="secondary">No Signup</Badge>
              <Badge variant="secondary">Offline-Ready</Badge>
              <Badge variant="secondary">Cryptographically Secure</Badge>
            </div>
          </div>

          {/* Supporting H2 - Search Intent Signal */}
          <h2 className="text-center text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Generate secure passwords online with complete privacy. Your passwords are created in your browser and never leave your device.
          </h2>

          {/* Trust Signals - Above the Fold */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-chart-3" />
                <span>No signup required</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-chart-3" />
                <span>Works fully in your browser</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-chart-3" />
                <span>Never saved or transmitted</span>
              </div>
            </div>
          </div>

          {/* Main Tool Interface */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card>
              <CardHeader>
                <CardTitle>Generate Secure Password</CardTitle>
                <CardDescription>
                  Customize settings and create cryptographically secure passwords instantly
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
                      variant={copied ? "default" : "outline"}
                      disabled={!password}
                      data-testid="button-copy-password"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-sm text-chart-3 font-medium">Password copied to clipboard</p>
                  )}
                  {password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Password Strength:</span>
                        <div className="flex items-center gap-2">
                          <Badge variant={strength.label === "Strong" ? "default" : strength.label === "Medium" ? "secondary" : "destructive"}>
                            {strength.label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">({strength.entropy} bits entropy)</span>
                        </div>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${strength.color} transition-all duration-300`}
                          style={{ width: `${strength.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{strength.description}</p>
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
                  <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg">
                    <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      Security experts recommend <strong>12-16 characters minimum</strong> for standard accounts. For banking, email, or work accounts, use 16-24 characters for maximum protection.
                    </p>
                  </div>
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
                    Generate Secure Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Password Recommendations by Account Type */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-4 text-center">Password Recommendations by Account Type</h2>
            <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
              Different accounts require different levels of security. Here's what security experts recommend:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-center">Email & Social Media</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Minimum: 12-14 characters</li>
                    <li>Include: Letters, numbers, symbols</li>
                    <li>Always enable 2FA</li>
                    <li>Use unique passwords per account</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-center">Banking & Work Accounts</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Minimum: 16-20 characters</li>
                    <li>Maximum complexity required</li>
                    <li>Change every 6-12 months</li>
                    <li>Never reuse across services</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-center">Developer & API Credentials</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Minimum: 20-32 characters</li>
                    <li>Include all character types</li>
                    <li>Store in environment variables</li>
                    <li>Rotate periodically or on exposure</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              After generating your password, verify its security with our <Link href="/tools/password-strength-checker" className="text-primary hover:underline">Password Strength Checker</Link>.
            </p>
          </section>

          {/* Who Should Use This Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Who Uses This Password Generator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Everyday Users</h3>
                  <p className="text-sm text-muted-foreground">
                    Secure your personal email, social media, shopping sites, and streaming accounts with unique strong passwords.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Businesses</h3>
                  <p className="text-sm text-muted-foreground">
                    Protect company accounts, databases, and sensitive business information from unauthorized access.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Developers</h3>
                  <p className="text-sm text-muted-foreground">
                    Generate secure API keys, database passwords, and credentials for development and production environments.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Students</h3>
                  <p className="text-sm text-muted-foreground">
                    Protect your university accounts, cloud storage, and learning platforms from hackers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

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
                  Choose your password length (12-16 characters recommended) and select which character types to include.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-lg">Generate Instantly</h3>
                <p className="text-muted-foreground">
                  Click generate to create a cryptographically secure random password using the Web Crypto API.
                </p>
              </div>
              <div className="text-center space-y-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-lg">Copy & Store Safely</h3>
                <p className="text-muted-foreground">
                  Copy your password and save it in a trusted password manager. Never store passwords in plain text.
                </p>
              </div>
            </div>
          </section>

          {/* People Also Ask Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Common Questions About Password Security</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Is an online password generator safe?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, when the generator runs entirely in your browser (like ours). We use the Web Crypto API for true cryptographic randomness and never send your passwords to any server. Your passwords exist only on your device.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Can hackers crack generated passwords?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A properly generated 16-character password with mixed characters has over 10^28 possible combinations. At one trillion guesses per second, it would take longer than the age of the universe to crack.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What is the best password length?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Security organizations like NIST recommend a minimum of 12 characters, with 16+ characters being ideal for sensitive accounts. Each additional character exponentially increases security.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Should I use different passwords for every account?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Absolutely. Password reuse is a leading cause of account breaches. When one service is compromised, attackers try those credentials on other sites. Use a unique password for every account.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Why Use Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Pixocraft's Password Generator?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Cryptographically Secure</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Unlike basic random generators, we use the Web Crypto API for true cryptographic randomness. This meets enterprise security standards and ensures each password is genuinely unpredictable. A 16-character password with all character types has over 10^28 possible combinations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Lock className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Complete Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Everything runs locally in your browser. No passwords are ever transmitted over the network, logged on servers, or stored in databases. We have zero visibility into your passwords. This is the most private way to generate passwords online.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <RefreshCw className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Unique Passwords for Every Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Research shows 81% of data breaches involve weak or reused passwords. Generate unlimited unique passwords instantly to ensure each of your accounts has its own protection. If one service is breached, your other accounts remain secure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Check className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Free Forever, No Signup</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Generate as many passwords as you need without creating an account, providing an email, or paying anything. This tool works offline once loaded, so you can use it even without an internet connection.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            {/* Internal Links & Authority Signals */}
            <div className="prose prose-lg max-w-4xl mx-auto space-y-4">
              <p className="text-muted-foreground">
                Need a temporary email for signing up to a new service securely? Use our <Link href="/tools/temp-mail" className="text-primary hover:underline">Temporary Email Generator</Link> for added privacy. Verify your password's strength anytime with our <Link href="/tools/password-strength-checker" className="text-primary hover:underline">Password Strength Checker</Link>.
              </p>
              <p className="text-muted-foreground text-sm">
                Our password recommendations align with guidelines from{" "}
                <a href="https://pages.nist.gov/800-63-3/sp800-63b.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  NIST (National Institute of Standards and Technology) <ExternalLink className="h-3 w-3" />
                </a>{" "}
                and{" "}
                <a href="https://www.cisa.gov/news-events/news/choosing-and-protecting-passwords" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                  CISA (Cybersecurity and Infrastructure Security Agency) <ExternalLink className="h-3 w-3" />
                </a>.
              </p>
            </div>
          </section>

          {/* Best Practices Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Password Security Best Practices</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Use a Password Manager</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">
                    Store all your generated passwords in a trusted password manager like Bitwarden, 1Password, or Dashlane. This allows you to use complex, unique passwords for every account without memorizing them.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Enable 2FA Everywhere</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">
                    Two-factor authentication adds an extra layer of security beyond your password. Use authenticator apps like Google Authenticator or Authy instead of SMS when possible, as they're more secure.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Never Share Passwords</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-muted-foreground">
                    Legitimate services never ask for your password via email or phone. Don't share passwords through messaging apps, emails, or texts. Use secure sharing features in password managers if needed.
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
                {faqItems.map((faq, index) => (
                  <AccordionItem key={`faq-${index}`} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Long-Tail SEO Pages */}
          <LongTailPagesSection toolId="password-generator" />

          {/* Freshness & Authority Indicator */}
          <div className="text-center mb-12 space-y-2">
            <p className="text-sm text-muted-foreground">
              Last updated: December 2025
            </p>
            <p className="text-xs text-muted-foreground">
              Pixocraft Tools is a trusted platform with 175+ free online tools used by millions worldwide.
            </p>
          </div>

          {/* Related Use Cases */}
          <RelatedUseCases toolId="password-generator" toolName="Password Generator" />

          {/* Related Tools */}
          <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Related Security Tools</h2>
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

          {/* Category Footer */}
          <p className="text-center text-sm text-muted-foreground mt-12 pt-8 border-t">
            Category: <Link href="/tools/privacy" className="text-primary hover:text-primary/80 transition-colors">Privacy Tools</Link>
          </p>
        </div>
      </div>
    </>
  );
}
