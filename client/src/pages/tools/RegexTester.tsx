import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { Search, RotateCcw, Zap, Lock, Check, Sparkles, ArrowRight } from "lucide-react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<string[]>([]);
  const [error, setError] = useState("");

  useSEO({
    title: "Free Regex Tester Tool - Test Regular Expressions Online",
    description: "Test and debug regular expressions with live real-time results. 100% free, offline, and completely private. No signup needed. Works in your browser.",
    keywords: "regex tester, regular expression tester, test regex online, pattern matching, regex debugger, regex validator, free regex tool, regex pattern tester, test regular expressions",
    canonicalUrl: "https://tools.pixocraft.in/tools/regex-tester",
  });

  useEffect(() => {
    if (!pattern || !testString) {
      setMatches([]);
      setError("");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const foundMatches = Array.from(testString.matchAll(regex)).map(m => m[0]);
      setMatches(foundMatches);
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid regex");
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const handleClear = () => {
    setPattern("");
    setTestString("");
    setMatches([]);
    setError("");
  };


  return (
    <ToolLayout
      title="Free Regex Tester - Test & Debug Regular Expressions Online"
      description="Test and debug regular expressions with instant live results and real-time pattern matching. 100% free, completely private, and works offline. Perfect for developers and students."
      icon={<Search className="h-10 w-10 text-primary" />}
      toolId="regex-tester"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Enter Pattern", description: "Type your regex pattern in the pattern field." },
        { step: 2, title: "Add Test String", description: "Enter the text you want to test against." },
        { step: 3, title: "See Matches", description: "View all matches highlighted in real-time." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Live Testing", description: "See matches update as you type." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Privacy First", description: "Everything runs in your browser." },
        { icon: <Check className="h-6 w-6 text-primary" />, title: "Flag Support", description: "Test with g, i, m, s, u, y flags." },
      ]}
      faqs={[
        { question: "What are regular expressions and how do they work?", answer: "Regular expressions (regex) are patterns used to match text strings. They use special characters like . (any character), * (zero or more), + (one or more), and ? (optional) to define flexible search patterns. This tool helps you test patterns against text instantly." },
        { question: "What are regex flags and when do I use them?", answer: "Flags modify pattern behavior: g (global - find all matches), i (case-insensitive - ignore uppercase/lowercase), m (multiline - ^ and $ match line breaks), s (dotall - . matches newlines), u (unicode - handle special characters), y (sticky - match at last index)." },
        { question: "How do I test email validation with regex?", answer: "Try this pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$ This matches email format with letters, numbers, dots, and domain extensions. Use the i flag to allow any case." },
        { question: "How do I validate phone numbers with regex?", answer: "For US format: ^\\\\d{3}-\\\\d{3}-\\\\d{4}$ matches 123-456-7890. Or ^\\\\(?\\\\d{3}\\\\)?[-.\\\\s]?\\\\d{3}[-.\\\\s]?\\\\d{4}$ for flexible formatting with parentheses, dashes, or spaces." },
        { question: "Can I test multiline patterns and match line starts/ends?", answer: "Yes! Use the 'm' flag and patterns like ^ (line start) and $ (line end) will match at the beginning and end of each line, not just the entire string. Very useful for processing text with multiple lines." },
        { question: "Is my regex pattern data safe and private?", answer: "Absolutely. All pattern testing happens 100% in your browser using JavaScript. Your regex patterns and test strings are never sent to servers, logged, or stored anywhere. Complete privacy guaranteed." },
        { question: "What are common regex patterns I should know?", answer: "Common patterns include: \\\\d for digits, \\\\w for word characters, \\\\s for whitespace, [a-z] for character ranges, . for any character, * for zero or more, + for one or more, ? for optional. Combine them to build complex patterns." },
        { question: "Can I use this regex tester on mobile devices?", answer: "Yes, this tool works perfectly on all devices—iPhone, Android, tablets, and computers. It's fully responsive and works in any modern browser. Once loaded, it also works completely offline without internet connection." },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <label className="text-sm font-medium mb-2 block">Regex Pattern</label>
                <Input
                  placeholder="e.g., \d{3}-\d{3}-\d{4}"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="font-mono"
                  data-testid="input-pattern"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Flags</label>
                <Input
                  placeholder="e.g., gi"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="font-mono"
                  data-testid="input-flags"
                />
              </div>
            </div>
            <Button onClick={handleClear} variant="outline" disabled={!pattern && !testString} data-testid="button-clear">
              <RotateCcw className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </CardContent>
        </Card>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg" data-testid="status-error-regex">
            <p className="text-sm font-semibold text-destructive">Error: {error}</p>
          </div>
        )}

        {!error && matches.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm px-4 py-2" data-testid="badge-match-count">
              {matches.length} match{matches.length !== 1 ? "es" : ""} found
            </Badge>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Test String</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter text to test your regex pattern..."
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[200px] text-sm font-mono"
              data-testid="input-test-string"
            />
          </CardContent>
        </Card>

        {matches.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {matches.map((match, idx) => (
                  <div key={idx} className="p-2 bg-muted rounded font-mono text-sm" data-testid={`match-${idx}`}>
                    Match {idx + 1}: <span className="font-bold text-primary">{match}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
