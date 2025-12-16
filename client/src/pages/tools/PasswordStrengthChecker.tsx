import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO, StructuredData, generateFAQSchema, generateSoftwareApplicationSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { ShieldCheck, Eye, EyeOff, Check, X, AlertTriangle, Sparkles, Zap, Lock, Globe, Info, ArrowRight, Shield, WifiOff } from "lucide-react";

const options = {
  translations: zxcvbnEnPackage.translations,
  graphs: zxcvbnCommonPackage.adjacencyGraphs,
  dictionary: {
    ...zxcvbnCommonPackage.dictionary,
    ...zxcvbnEnPackage.dictionary,
  },
};

zxcvbnOptions.setOptions(options);

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useSEO({
    title: "Free Password Strength Checker Online - Test If Your Password Is Strong | Pixocraft",
    description: "Check password strength instantly and privately. Free online tool runs 100% in your browser—no data stored or sent. Get real-time results with time-to-crack estimates. Works offline.",
    keywords: "password strength checker online, check password strength, is my password strong, password strength test free, password strength checker offline, test password security",
    canonicalUrl: "https://tools.pixocraft.in/tools/password-strength-checker",
  });

  const analysis = useMemo(() => {
    if (!password) return null;
    return zxcvbn(password);
  }, [password]);

  const strengthInfo = useMemo(() => {
    if (!analysis) return null;

    const score = analysis.score;
    const strengthLevels = [
      { label: "Very Weak", color: "text-red-600", bgColor: "bg-red-600", percent: 20 },
      { label: "Weak", color: "text-orange-600", bgColor: "bg-orange-600", percent: 40 },
      { label: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-600", percent: 60 },
      { label: "Strong", color: "text-blue-600", bgColor: "bg-blue-600", percent: 80 },
      { label: "Very Strong", color: "text-green-600", bgColor: "bg-green-600", percent: 100 },
    ];

    return strengthLevels[score];
  }, [analysis]);

  const timeToCrack = useMemo(() => {
    if (!analysis) return null;

    const seconds = analysis.crackTimesSeconds.onlineNoThrottling10PerSecond;
    
    if (seconds < 1) return "Instantly";
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;
    
    const years = seconds / 31536000;
    if (years < 1000000) return `${Math.round(years)} years`;
    if (years < 1000000000) return `${Math.round(years / 1000000)} million years`;
    return "Centuries";
  }, [analysis]);

  const passwordEntropy = useMemo(() => {
    if (!password) return 0;
    
    let charsetSize = 0;
    if (/[a-z]/.test(password)) charsetSize += 26;
    if (/[A-Z]/.test(password)) charsetSize += 26;
    if (/[0-9]/.test(password)) charsetSize += 10;
    if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;
    
    const entropy = password.length * Math.log2(charsetSize);
    return Math.round(entropy);
  }, [password]);

  const checks = useMemo(() => {
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const isLongEnough = password.length >= 12;

    return [
      { label: "At least 12 characters", passed: isLongEnough },
      { label: "Contains lowercase letters", passed: hasLowercase },
      { label: "Contains uppercase letters", passed: hasUppercase },
      { label: "Contains numbers", passed: hasNumber },
      { label: "Contains special characters", passed: hasSpecial },
    ];
  }, [password]);

  const faqItems: FAQItem[] = [
    {
      question: "Is it safe to check my password here?",
      answer: "Yes. All password analysis happens locally in your browser. Your password is never sent to any server, stored, or logged. The tool works completely offline once loaded."
    },
    {
      question: "How is password strength calculated?",
      answer: "The tool analyzes your password against common patterns, dictionary words, and known weak passwords. It estimates how long an attacker would need to crack it using realistic attack methods, giving you a practical strength score."
    },
    {
      question: "What makes a password strong enough?",
      answer: "A strong password is at least 12 characters long, mixes uppercase, lowercase, numbers, and symbols, and avoids dictionary words or personal information. For banking and admin accounts, aim for 16+ characters."
    },
    {
      question: "What should I do if my password is weak?",
      answer: "Use a password generator to create a strong, random password. Store it in a password manager so you don't need to memorize it. Never reuse passwords across accounts."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);
  
  const softwareSchema = generateSoftwareApplicationSchema({
    name: "Password Strength Checker",
    description: "Free online tool to check if your password is strong. Runs entirely in your browser with no data storage. Get instant strength score and time-to-crack estimates.",
    url: "https://tools.pixocraft.in/tools/password-strength-checker",
    applicationCategory: "SecurityApplication",
    operatingSystem: "Any (Browser-based)",
    offers: { price: "0", priceCurrency: "INR" }
  });

  return (
    <>
      <StructuredData data={faqSchema} />
      <StructuredData data={softwareSchema} />
      <ToolLayout
        title="Free Password Strength Checker"
        description="Test if your password is strong enough. Get instant results with time-to-crack estimates—100% private, runs in your browser."
        icon={<ShieldCheck className="h-10 w-10 text-primary" />}
        toolId="password-strength-checker"
        category="Security Tool"
        howItWorks={[
          { step: 1, title: "Enter Password", description: "Type your password into the secure input field." },
          { step: 2, title: "View Analysis", description: "See real-time strength score and detailed feedback." },
          { step: 3, title: "Improve Security", description: "Follow recommendations to create a stronger password." },
        ]}
        benefits={[
          { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Results", description: "Password strength updates in real-time as you type." },
          { icon: <Shield className="h-6 w-6 text-primary" />, title: "Accurate Analysis", description: "Uses proven methods to estimate real-world cracking time." },
          { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Private", description: "All checking happens in your browser. Nothing is sent or stored." },
          { icon: <WifiOff className="h-6 w-6 text-primary" />, title: "Works Offline", description: "Once loaded, the tool works without internet connection." },
        ]}
        faqs={faqItems}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Password Input */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Password to Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a password to check its strength..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10 text-lg"
                  data-testid="input-password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-toggle-visibility"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Strength Meter */}
          {password && strengthInfo && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                    <span>Password Strength</span>
                    <Badge className={strengthInfo.color} variant="secondary" data-testid="badge-strength">
                      {strengthInfo.label}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Strength Score</span>
                      <span className={`font-semibold ${strengthInfo.color}`}>{strengthInfo.percent}%</span>
                    </div>
                    <Progress value={strengthInfo.percent} className="h-3" />
                  </div>

                  {timeToCrack && passwordEntropy > 0 && (
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Time to Crack</p>
                        <p className="text-lg font-semibold" data-testid="text-time-to-crack">{timeToCrack}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Password Entropy</p>
                        <p className="text-lg font-semibold" data-testid="text-entropy">{passwordEntropy} bits</p>
                      </div>
                    </div>
                  )}

                  {/* Metric Explanations */}
                  <div className="pt-2 border-t space-y-3">
                    <div className="flex items-start gap-2">
                      <Info className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-muted-foreground space-y-1">
                        <p><span className="font-medium text-foreground">Strength Score:</span> A percentage rating based on length, character variety, and resistance to common attack patterns.</p>
                        <p><span className="font-medium text-foreground">Time to Crack:</span> How long it would take an attacker to guess your password using automated methods.</p>
                        <p><span className="font-medium text-foreground">Entropy:</span> A measure of randomness in bits—higher entropy means a more unpredictable password.</p>
                      </div>
                    </div>
                  </div>

                  {analysis && analysis.feedback.warning && (
                    <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold text-yellow-900 dark:text-yellow-200">Warning</p>
                        <p className="text-sm text-yellow-800 dark:text-yellow-300">{analysis.feedback.warning}</p>
                      </div>
                    </div>
                  )}

                  {analysis && analysis.feedback.suggestions && analysis.feedback.suggestions.length > 0 && (
                    <div className="space-y-2">
                      <p className="font-semibold text-sm">Suggestions:</p>
                      <ul className="space-y-1">
                        {analysis.feedback.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Security Checklist */}
              <Card>
                <CardHeader>
                  <CardTitle>Security Checklist</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {checks.map((check, index) => (
                      <div key={index} className="flex items-center gap-3" data-testid={`check-${index}`}>
                        {check.passed ? (
                          <div className="h-5 w-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center flex-shrink-0">
                            <X className="h-3 w-3 text-red-600 dark:text-red-400" />
                          </div>
                        )}
                        <span className={check.passed ? "text-foreground" : "text-muted-foreground"}>
                          {check.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Weak Password CTA */}
              {analysis && analysis.score < 3 && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <h3 className="font-semibold">Password too weak?</h3>
                        <p className="text-sm text-muted-foreground">Generate a strong, random password instantly.</p>
                      </div>
                      <Link href="/tools/password-generator" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity" data-testid="link-password-generator">
                        Generate Strong Password
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Result Interpretation Section */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Is This Password Strong Enough for Real Use?</h2>
            <p className="text-muted-foreground mb-6">
              Different accounts require different levels of security. Use this guide to determine if your password meets the recommended strength for each type of account:
            </p>
            <Card>
              <CardContent className="pt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Account Type</th>
                        <th className="text-left py-3 px-4 font-semibold">Minimum Strength</th>
                        <th className="text-left py-3 px-4 font-semibold">Recommendation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Social Media</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Fair (60%+)</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">12+ characters, enable two-factor authentication</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Email Accounts</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Strong (80%+)</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">14+ characters, unique password, recovery options set</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Banking & Financial</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Very Strong (100%)</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">16+ characters, hardware key or app-based 2FA</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4">Work / Admin Accounts</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Very Strong (100%)</Badge>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">16+ characters, never reused, stored in password manager</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Privacy & Trust Section */}
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Your Privacy is Protected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Local Processing Only</h4>
                    <p className="text-sm text-muted-foreground">All password analysis happens entirely in your browser. Your password never leaves your device.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <WifiOff className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Works Offline</h4>
                    <p className="text-sm text-muted-foreground">Once loaded, this tool works without internet—ideal for checking passwords in secure environments.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="bg-muted/50 border-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Best Practices</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                    <li>• Use a unique password for every account</li>
                    <li>• Make passwords at least 12 characters long</li>
                    <li>• Avoid personal information (names, birthdays, etc.)</li>
                    <li>• Use a password manager to generate and store strong passwords</li>
                    <li>• Enable two-factor authentication (2FA) wherever possible</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Internal Linking Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/tools/password-generator" className="block" data-testid="link-password-generator-card">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Need a Strong Password?</h3>
                      <p className="text-sm text-muted-foreground">Generate random, secure passwords instantly.</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/tools/temp-mail" className="block" data-testid="link-temp-mail-card">
              <Card className="h-full hover-elevate cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">Need Privacy for Signups?</h3>
                      <p className="text-sm text-muted-foreground">Use a temporary email to protect your inbox.</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
