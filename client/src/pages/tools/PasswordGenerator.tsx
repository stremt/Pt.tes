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
import { Copy, RefreshCw, Lock, Check, Shield, ArrowRight, ShieldCheck, Globe, Eye, Users, Briefcase, GraduationCap, User, ExternalLink, Info, Mail, CreditCard, Code, WifiOff, Zap, Image as ImageIcon, QrCode, FileText, FileCode } from "lucide-react";
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
    title: "Strong Password Generator (Free, Secure, No Signup) – 2026",
    description: "Generate secure random passwords instantly using Web Crypto API. 100% private, works offline, no signup required. Create 12–32 character strong passwords safely.",
    keywords: "strong password generator, password generator free, random password generator, secure password generator, password generator no signup, offline password generator, 16 character password generator",
    canonicalUrl: "https://tools.pixocraft.in/tools/password-generator",
    ogImage: OG_IMAGES.passwordGenerator,
  });

  const comparisonData = [
    { feature: "Runs Fully Offline", pixocraft: true, others: false },
    { feature: "Stores Passwords", pixocraft: false, others: true },
    { feature: "Requires Signup", pixocraft: false, others: true },
    { feature: "Uses Web Crypto API", pixocraft: true, others: false },
    { feature: "Tracks Users", pixocraft: false, others: true },
  ];

  const getEstimatedCrackTime = (entropy: number) => {
    // Basic estimation: 2^entropy combinations
    // Assuming 10^12 guesses per second (offline attack)
    const combinations = Math.pow(2, entropy);
    const seconds = combinations / 1e12;
    
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
    
    const years = seconds / 31536000;
    if (years < 1000) return `${Math.round(years)} years`;
    if (years < 1000000) return `${Math.round(years / 1000)} thousand years`;
    if (years < 1000000000) return `${Math.round(years / 1000000)} million years`;
    return `${Math.round(years / 1000000000)} billion years`;
  };

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
    if (strength < 70) return { label: "Moderate", color: "bg-yellow-500", percentage: strength, description: "Good strength, consider adding more characters", entropy };
    if (strength < 90) return { label: "Strong", color: "bg-chart-3", percentage: strength, description: "Excellent security for most accounts", entropy };
    if (strength < 100) return { label: "Very Strong", color: "bg-green-600", percentage: strength, description: "Highly secure, recommended for critical accounts", entropy };
    return { label: "Uncrackable", color: "bg-emerald-500", percentage: strength, description: "Maximum security - virtually uncrackable", entropy };
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
  
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Pixocraft Strong Password Generator",
    "applicationCategory": "SecurityApplication",
    "operatingSystem": "Web Browser",
    "url": "https://tools.pixocraft.in/tools/password-generator",
    "description": "Generate secure random passwords instantly using Web Crypto API. 100% private, works offline, no signup required.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Pixocraft Tools"
    }
  };

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
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Strong Password Generator <span className="text-primary block sm:inline">(Free, Secure & 100% Offline)</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Generate cryptographically secure random passwords instantly. No signup. No tracking. Works fully in your browser.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400"><ShieldCheck className="h-4 w-4" /> Web Crypto API Powered</span>
              <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400"><WifiOff className="h-4 w-4" /> Works Offline</span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400"><Lock className="h-4 w-4" /> Zero Data Collection</span>
              <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400"><Zap className="h-4 w-4" /> Unlimited Passwords</span>
            </div>
          </div>

          {/* Trust Badge Section */}
          <div className="flex flex-col items-center justify-center space-y-2 mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trusted by developers, businesses & privacy-focused users</p>
            <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
              <Code className="h-6 w-6" />
              <Briefcase className="h-6 w-6" />
              <Shield className="h-6 w-6" />
              <Users className="h-6 w-6" />
            </div>
          </div>

          {/* Main Tool Interface */}
          <div className="max-w-3xl mx-auto mb-16 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
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
                {/* Password Display */}
                <div className="space-y-4">
                  <div className="relative group">
                    <Input
                      value={password}
                      readOnly
                      placeholder="Click generate to create a password"
                      className="h-16 px-6 font-mono text-2xl bg-muted/30 border-2 focus-visible:ring-primary/20 transition-all"
                      data-testid="input-generated-password"
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
                      <Button
                        onClick={copyPassword}
                        size="lg"
                        variant={copied ? "default" : "outline"}
                        disabled={!password}
                        className="h-12 px-6 shadow-sm hover-elevate active-elevate-2"
                        data-testid="button-copy-password"
                      >
                        {copied ? <Check className="h-5 w-5 mr-2" /> : <Copy className="h-5 w-5 mr-2" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                  </div>
                  
                  {password && (
                    <div className="space-y-4 p-4 rounded-xl bg-muted/20 border border-primary/5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Entropy</p>
                          <p className="text-xl font-mono font-bold text-primary">{strength.entropy} bits</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Est. Crack Time (Offline)</p>
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
                            className={`h-full ${strength.color} rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--primary),0.3)]`}
                            style={{ width: `${strength.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-muted-foreground/50">
                          <span>Weak</span>
                          <span>Moderate</span>
                          <span>Strong</span>
                          <span>Very Strong</span>
                          <span>Uncrackable</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-center py-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Lock className="h-3 w-3" />
                      Passwords are generated locally in your browser. We never see or store them.
                    </p>
                  </div>
                </div>

                {/* Length Slider */}
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
                <div className="space-y-6">
                  <Label className="text-base font-bold">Character Types</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 hover:bg-muted/30 transition-colors">
                      <Label htmlFor="uppercase" className="font-medium cursor-pointer">Uppercase (A-Z)</Label>
                      <Switch id="uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} data-testid="switch-uppercase" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 hover:bg-muted/30 transition-colors">
                      <Label htmlFor="lowercase" className="font-medium cursor-pointer">Lowercase (a-z)</Label>
                      <Switch id="lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} data-testid="switch-lowercase" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 hover:bg-muted/30 transition-colors">
                      <Label htmlFor="numbers" className="font-medium cursor-pointer">Numbers (0-9)</Label>
                      <Switch id="numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} data-testid="switch-numbers" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/10 hover:bg-muted/30 transition-colors">
                      <Label htmlFor="symbols" className="font-medium cursor-pointer">Symbols (!@#$)</Label>
                      <Switch id="symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} data-testid="switch-symbols" />
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="flex gap-2">
                  <Button
                    onClick={generatePassword}
                    className="flex-1 h-14 text-xl font-bold bg-gradient-to-r from-primary to-blue-600 hover:opacity-90 shadow-lg"
                    size="lg"
                    data-testid="button-generate-password"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Generate Secure Password Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Comparison Table Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Why Pixocraft Password Generator is More Private</h2>
            <div className="max-w-4xl mx-auto overflow-hidden rounded-xl border bg-card shadow-lg">
              <table className="w-full text-left">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-6 py-4 font-bold">Feature</th>
                    <th className="px-6 py-4 font-bold text-primary">Pixocraft</th>
                    <th className="px-6 py-4 font-bold text-muted-foreground">Most Online Generators</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-medium">{row.feature}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-green-600 font-bold">
                          {row.pixocraft ? <Check className="h-5 w-5" /> : <X className="h-5 w-5 text-red-500" />}
                          {row.pixocraft ? "Yes" : "Never"}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          {row.others ? <X className="h-5 w-5 text-red-500" /> : <Check className="h-5 w-5 text-green-600" />}
                          {row.others ? "Often / Sometimes" : "No"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

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

          {/* Internal Linking Cluster */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 text-center">Specific Password Length Generators</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { length: 12, label: "12 Characters", href: "/12-character-password-generator" },
                { length: 16, label: "16 Characters", href: "/16-character-password-generator" },
                { length: 20, label: "20 Characters", href: "/20-character-password-generator" },
                { length: 32, label: "32 Characters", href: "/32-character-password-generator" },
              ].map((item) => (
                <Link key={item.length} href={item.href} className="flex flex-col items-center justify-center p-4 rounded-xl border bg-card hover:border-primary transition-all hover-elevate group text-center">
                  <span className="text-2xl font-bold text-primary mb-1">{item.length}</span>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{item.label}</span>
                </Link>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6 max-w-2xl mx-auto">
              Our length-specific generators are optimized for different security needs, from standard social media accounts (12 chars) to high-security banking and enterprise systems (20-32 chars).
            </p>
          </section>

          {/* SEO Content Section */}
          <section className="mb-16 prose prose-slate dark:prose-invert max-w-4xl mx-auto border-t pt-16">
            <h2 className="text-4xl font-extrabold tracking-tight mb-8">The Ultimate Guide to Strong Passwords & Online Security</h2>
            
            <div className="space-y-12">
              <section>
                <h3 className="text-2xl font-bold mb-4">What Makes a Strong Password?</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  A strong password is your first line of defense against cyberattacks. Security experts and agencies like NIST (National Institute of Standards and Technology) emphasize that <strong>length and randomness</strong> are the two most critical factors. A truly secure password should be at least 12-16 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols. Crucially, it must avoid predictable patterns, dictionary words, and personal information like birthdays or names, which are easily targeted in social engineering and brute-force attacks.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4">How Our Random Password Generator Works</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Our tool leverages the <strong>Web Crypto API</strong>, a modern browser standard designed specifically for cryptographic operations. Unlike standard random functions that can be predictable, the Web Crypto API uses cryptographically strong pseudo-random number generators (CSPRNG) seeded by system-level entropy. This ensures that every password generated on Pixocraft is genuinely unpredictable and meets the highest security standards for military-grade protection.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4">Why Offline Password Generation is Safer</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Most online password generators send your data to a remote server for processing. This creates a vulnerability—if the server is compromised or the transmission is intercepted, your new password could be stolen before you even use it. Pixocraft is built as a <strong>100% client-side application</strong>. All generation happens locally in your browser's memory. Your passwords are never transmitted, stored, or logged on our servers. This "zero-knowledge" architecture ensures that you are the only one who ever sees your credentials.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4">Best Password Length for Security (NIST Reference)</h3>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  According to the latest NIST SP 800-63B guidelines, longer passwords (often called passphrases) are significantly harder to crack than shorter, more complex ones. While 8 characters used to be the standard, modern computing power has made them vulnerable. We recommend a <strong>minimum of 12-16 characters</strong> for personal accounts and 20+ characters for critical systems. Every additional character increases the "entropy" (randomness) exponentially, making it trillions of times harder for hackers to guess.
                </p>
              </section>

              <section>
                <h3 className="text-2xl font-bold mb-4">Common Password Mistakes to Avoid</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex gap-3 p-4 rounded-lg bg-muted/50">
                    <X className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                    <span><strong>Reusing Passwords:</strong> Using the same password for your email and bank is a recipe for disaster if one site is breached.</span>
                  </li>
                  <li className="flex gap-3 p-4 rounded-lg bg-muted/50">
                    <X className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                    <span><strong>Predictable Substitutions:</strong> Replacing "E" with "3" or "A" with "@" is easily detected by modern cracking tools.</span>
                  </li>
                  <li className="flex gap-3 p-4 rounded-lg bg-muted/50">
                    <X className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                    <span><strong>Personal Details:</strong> Avoid using pet names, children's names, or your phone number in any part of the password.</span>
                  </li>
                  <li className="flex gap-3 p-4 rounded-lg bg-muted/50">
                    <X className="h-5 w-5 text-red-500 shrink-0 mt-1" />
                    <span><strong>Sequential Patterns:</strong> "12345" or "qwerty" are among the most common and first-to-be-tested combinations.</span>
                  </li>
                </ul>
              </section>
            </div>
          </section>

          <div className="space-y-4 pt-12 border-t text-center">
            <h3 className="text-2xl font-bold">Boost Your Security Further</h3>
            <p className="text-muted-foreground mb-8">Don't stop at just generating a password. Use our suite of security tools to stay fully protected.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/tools/password-strength-checker" className="group flex flex-col items-center gap-2 p-6 rounded-2xl bg-card border hover:border-primary transition-all hover-elevate">
                <ShieldCheck className="h-10 w-10 text-primary" />
                <span className="font-bold">Test your password strength instantly</span>
                <p className="text-xs text-muted-foreground">Verify any password security level</p>
              </Link>
              <Link href="/tools/username-generator" className="group flex flex-col items-center gap-2 p-6 rounded-2xl bg-card border hover:border-primary transition-all hover-elevate">
                <User className="h-10 w-10 text-primary" />
                <span className="font-bold">Generate secure usernames</span>
                <p className="text-xs text-muted-foreground">Create anonymous digital IDs</p>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto">
            {[
              { label: "Word Counter", href: "/tools/word-counter", icon: FileText },
              { label: "Text to PDF", href: "/tools/text-to-pdf", icon: FileCode },
              { label: "Image Compressor", href: "/tools/image-compressor", icon: ImageIcon },
              { label: "QR Maker", href: "/tools/qr-maker", icon: QrCode },
            ].map((tool) => (
              <Link key={tool.label} href={tool.href} className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                <tool.icon className="h-4 w-4 text-primary" />
                {tool.label}
              </Link>
            ))}
          </div>

          {/* How It Works */}
          <section className="mb-16 mt-20">
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
