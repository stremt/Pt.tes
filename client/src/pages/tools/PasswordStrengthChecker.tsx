import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { zxcvbn, zxcvbnOptions } from "@zxcvbn-ts/core";
import * as zxcvbnCommonPackage from "@zxcvbn-ts/language-common";
import * as zxcvbnEnPackage from "@zxcvbn-ts/language-en";
import { ShieldCheck, Eye, EyeOff, Check, X, AlertTriangle, Sparkles, Zap, Lock, Globe } from "lucide-react";

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
    title: "Password Strength Checker | Test Password Security | Pixocraft Tools",
    description: "Check how strong your password is. Get instant feedback on password security with detailed analysis and recommendations. Free password strength tester.",
    keywords: "password strength, password checker, password security, test password, strong password, password analyzer",
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

  return (
    <ToolLayout
      title="Password Strength Checker"
      description="Test your password strength and get instant security recommendations. Understand what makes a password strong and secure."
      icon={<ShieldCheck className="h-10 w-10 text-primary" />}
      toolId="password-strength-checker"
      category="Security Tool"
      howItWorks={[
        { step: 1, title: "Enter Password", description: "Type your password into the secure input field." },
        { step: 2, title: "View Analysis", description: "See real-time strength score and detailed feedback." },
        { step: 3, title: "Improve Security", description: "Follow recommendations to create a stronger password." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Real-Time Analysis", description: "Password strength updates instantly as you type." },
        { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Advanced Algorithm", description: "Uses zxcvbn library for accurate strength estimation." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Completely Private", description: "All checking happens in your browser. No passwords are stored or sent." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Always Free", description: "Test unlimited passwords for free, no account needed." },
      ]}
      faqs={[
        { question: "How is password strength calculated?", answer: "We use the zxcvbn algorithm developed by Dropbox, which estimates how long it would take to crack your password using various attack methods. It considers length, character variety, common patterns, and dictionary words." },
        { question: "What makes a password strong?", answer: "A strong password is at least 12 characters long, contains a mix of uppercase and lowercase letters, numbers, and special characters, and avoids common words, patterns, or personal information." },
        { question: "Is it safe to enter my password here?", answer: "Yes! All password checking happens entirely in your browser using JavaScript. Your password is never sent to our servers, stored, or logged anywhere." },
        { question: "Should I use the same strong password everywhere?", answer: "No! Even strong passwords should be unique for each account. If one site is breached, attackers could access all your accounts. Use a password manager to handle multiple strong, unique passwords." },
        { question: "What if my password shows as weak?", answer: "Follow the recommendations shown below the strength meter. Make your password longer, add variety in characters, and avoid common words or predictable patterns." },
      ]}
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
                <CardTitle className="flex items-center justify-between">
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
          </>
        )}

        {/* Info Box */}
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
                  <li>• Consider using a password manager to generate and store strong passwords</li>
                  <li>• Enable two-factor authentication (2FA) wherever possible</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
