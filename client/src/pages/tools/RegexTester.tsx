import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useSEO } from "@/lib/seo";
import { Search, RotateCcw, Zap, Lock, Check, Copy, CheckCircle2 } from "lucide-react";

const PRESET_PATTERNS = [
  { name: "Email Address", pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", flags: "g" },
  { name: "US Phone Number", pattern: "^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$", flags: "g" },
  { name: "URL", pattern: "https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)", flags: "gi" },
  { name: "IPv4 Address", pattern: "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b", flags: "g" },
  { name: "Hex Color Code", pattern: "#(?:[0-9a-fA-F]{3}){1,2}\\b", flags: "g" },
  { name: "Credit Card Number", pattern: "\\b(?:\\d{4}[\\s-]?){3}\\d{4}\\b", flags: "g" },
  { name: "HTML Tags", pattern: "<([a-z][a-z0-9]*)\\b[^>]*>(.*?)<\\/\\1>", flags: "gi" },
  { name: "Date (YYYY-MM-DD)", pattern: "\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])", flags: "g" },
  { name: "Time (HH:MM:SS)", pattern: "(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?", flags: "g" },
  { name: "Username (Alphanumeric)", pattern: "^[a-zA-Z0-9_]{3,16}$", flags: "g" },
];

interface MatchDetail {
  full: string;
  index: number;
  length: number;
  groups?: string[];
}

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matchDetails, setMatchDetails] = useState<MatchDetail[]>([]);
  const [error, setError] = useState("");
  const [replaceString, setReplaceString] = useState("");
  const [replacedResult, setReplacedResult] = useState("");
  const [showReplace, setShowReplace] = useState(false);
  const [copied, setCopied] = useState(false);

  useSEO({
    title: "Free Regex Tester Tool - Test Regular Expressions Online",
    description: "Test and debug regular expressions with live real-time results, replace functionality, and capture groups. 100% free, offline, and completely private. No signup needed. Works in your browser.",
    keywords: "regex tester, regular expression tester, test regex online, pattern matching, regex debugger, regex validator, free regex tool, regex pattern tester, test regular expressions, capture groups",
    canonicalUrl: "https://tools.pixocraft.in/tools/regex-tester",
  });

  useEffect(() => {
    if (!pattern || !testString) {
      setMatchDetails([]);
      setReplacedResult("");
      setError("");
      return;
    }

    try {
      const regex = new RegExp(pattern, flags);
      const matches = Array.from(testString.matchAll(regex));
      
      const details: MatchDetail[] = matches.map((match) => ({
        full: match[0],
        index: match.index || 0,
        length: match[0].length,
        groups: match.slice(1).filter((g) => g !== undefined),
      }));

      setMatchDetails(details);
      setError("");

      // Handle replace
      if (showReplace) {
        const replaced = testString.replace(regex, replaceString);
        setReplacedResult(replaced);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid regex");
      setMatchDetails([]);
      setReplacedResult("");
    }
  }, [pattern, flags, testString, replaceString, showReplace]);

  const handlePresetSelect = (preset: (typeof PRESET_PATTERNS)[0]) => {
    setPattern(preset.pattern);
    setFlags(preset.flags);
  };

  const handleClear = () => {
    setPattern("");
    setTestString("");
    setReplaceString("");
    setMatchDetails([]);
    setReplacedResult("");
    setError("");
  };

  const handleCopyResult = () => {
    navigator.clipboard.writeText(replacedResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightMatches = () => {
    if (matchDetails.length === 0) return testString;

    let result = "";
    let lastIndex = 0;

    matchDetails.forEach((match) => {
      result += testString.slice(lastIndex, match.index);
      result += `[${match.full}]`;
      lastIndex = match.index + match.length;
    });

    result += testString.slice(lastIndex);
    return result;
  };

  return (
    <ToolLayout
      title="Free Regex Tester - Test & Debug Regular Expressions Online"
      description="Test and debug regular expressions with instant live results, replace functionality, and capture groups. 100% free, completely private, and works offline. Perfect for developers and students."
      icon={<Search className="h-10 w-10 text-primary" />}
      toolId="regex-tester"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Enter Pattern", description: "Type your regex pattern or select a preset from the dropdown." },
        { step: 2, title: "Add Test String", description: "Enter the text you want to test against." },
        { step: 3, title: "See Matches", description: "View all matches with details including capture groups." },
        { step: 4, title: "Replace (Optional)", description: "Test replacements with your pattern in real-time." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Live Testing", description: "See matches update as you type." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Privacy First", description: "Everything runs in your browser." },
        { icon: <Check className="h-6 w-6 text-primary" />, title: "Advanced Features", description: "Capture groups, replace, and 10+ presets." },
      ]}
      faqs={[
        { question: "What are regular expressions and how do they work?", answer: "Regular expressions (regex) are patterns used to match text strings. They use special characters like . (any character), * (zero or more), + (one or more), and ? (optional) to define flexible search patterns. This tool helps you test patterns against text instantly." },
        { question: "What are regex flags and when do I use them?", answer: "Flags modify pattern behavior: g (global - find all matches), i (case-insensitive - ignore uppercase/lowercase), m (multiline - ^ and $ match line breaks), s (dotall - . matches newlines), u (unicode - handle special characters), y (sticky - match at last index)." },
        { question: "How do I test email validation with regex?", answer: "Try this pattern: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,}$ This matches email format with letters, numbers, dots, and domain extensions. Use the i flag to allow any case." },
        { question: "How do I validate phone numbers with regex?", answer: "For US format: ^\\\\d{3}-\\\\d{3}-\\\\d{4}$ matches 123-456-7890. Or ^\\\\(?\\\\d{3}\\\\)?[-.\\\\s]?\\\\d{3}[-.\\\\s]?\\\\d{4}$ for flexible formatting with parentheses, dashes, or spaces." },
        { question: "Can I test multiline patterns and match line starts/ends?", answer: "Yes! Use the 'm' flag and patterns like ^ (line start) and $ (line end) will match at the beginning and end of each line, not just the entire string. Very useful for processing text with multiple lines." },
        { question: "What are capture groups and how do I use them?", answer: "Capture groups are created with parentheses () and let you extract parts of a match. For example, (\\\\w+)@([\\\\w.]+) captures the username and domain separately from an email. They appear in the match details under 'Groups'." },
        { question: "How do I use the replace feature?", answer: "Enable 'Replace' to test replacements. The replace string supports $1, $2, etc. to reference capture groups. For example, pattern (\\\\d+) with replace string 'NUM:$1' replaces numbers with 'NUM:' prefix." },
        { question: "Can I use this regex tester on mobile devices?", answer: "Yes, this tool works perfectly on all devices—iPhone, Android, tablets, and computers. It's fully responsive and works in any modern browser. Once loaded, it also works completely offline without internet connection." },
      ]}
    >
      <div className="max-w-7xl mx-auto space-y-6 px-2 sm:px-4">
        {/* Pattern Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Regex Pattern</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium block">Quick Presets</label>
              <Select onValueChange={(value) => {
                const preset = PRESET_PATTERNS.find(p => p.name === value);
                if (preset) handlePresetSelect(preset);
              }}>
                <SelectTrigger className="w-full" data-testid="select-presets">
                  <SelectValue placeholder="Select a preset pattern..." />
                </SelectTrigger>
                <SelectContent>
                  {PRESET_PATTERNS.map((preset) => (
                    <SelectItem key={preset.name} value={preset.name}>
                      {preset.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-3">
                <label className="text-sm font-medium mb-2 block">Pattern</label>
                <Input
                  placeholder="e.g., \\d{3}-\\d{3}-\\d{4}"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  className="font-mono text-xs sm:text-sm"
                  data-testid="input-pattern"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Flags</label>
                <Input
                  placeholder="e.g., gi"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  className="font-mono text-xs sm:text-sm"
                  data-testid="input-flags"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button 
                onClick={handleClear} 
                variant="outline" 
                disabled={!pattern && !testString}
                className="w-full sm:w-auto"
                data-testid="button-clear"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              <Button
                onClick={() => setShowReplace(!showReplace)}
                variant="secondary"
                className="w-full sm:w-auto"
                data-testid="button-toggle-replace"
              >
                {showReplace ? "Hide Replace" : "Show Replace"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg" data-testid="status-error-regex">
            <p className="text-xs sm:text-sm font-semibold text-destructive break-words">{error}</p>
          </div>
        )}

        {/* Test String Input */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Test String</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter text to test your regex pattern..."
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="min-h-[150px] sm:min-h-[200px] text-xs sm:text-sm font-mono"
              data-testid="input-test-string"
            />
          </CardContent>
        </Card>

        {/* Replace Section */}
        {showReplace && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Replace</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Replacement String</label>
                <Input
                  placeholder="e.g., $1@$2 (use $1, $2, etc. for capture groups)"
                  value={replaceString}
                  onChange={(e) => setReplaceString(e.target.value)}
                  className="font-mono text-xs sm:text-sm"
                  data-testid="input-replace-string"
                />
              </div>
              
              {replacedResult && (
                <div className="space-y-2">
                  <label className="text-sm font-medium block">Result</label>
                  <div className="relative">
                    <Textarea
                      value={replacedResult}
                      readOnly
                      className="min-h-[100px] text-xs sm:text-sm font-mono bg-muted"
                      data-testid="output-replaced-string"
                    />
                    <Button
                      onClick={handleCopyResult}
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                      data-testid="button-copy-result"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Match Summary */}
        {!error && matchDetails.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <Badge variant="secondary" className="text-xs sm:text-sm px-3 py-1.5" data-testid="badge-match-count">
              {matchDetails.length} match{matchDetails.length !== 1 ? "es" : ""} found
            </Badge>
          </div>
        )}

        {/* Highlighted Matches */}
        {!error && matchDetails.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Highlighted Text</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 sm:p-4 bg-muted rounded font-mono text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-words" data-testid="text-highlighted">
                {highlightMatches()}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Match Details */}
        {matchDetails.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Match Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {matchDetails.map((match, idx) => (
                  <div key={idx} className="p-3 sm:p-4 border rounded-lg" data-testid={`match-${idx}`}>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="font-semibold text-xs sm:text-sm">Match {idx + 1}</span>
                        <Badge variant="outline" className="w-fit text-xs">
                          Index: {match.index} | Length: {match.length}
                        </Badge>
                      </div>
                      <div className="p-2 bg-muted rounded font-mono text-xs sm:text-sm overflow-x-auto">
                        {match.full}
                      </div>
                      {match.groups && match.groups.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <span className="text-xs font-medium">Capture Groups:</span>
                          <div className="space-y-1">
                            {match.groups.map((group, gIdx) => (
                              <div key={gIdx} className="p-2 bg-primary/5 rounded font-mono text-xs overflow-x-auto">
                                ${gIdx + 1}: {group}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {!error && matchDetails.length === 0 && testString && (
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground text-sm">No matches found. Try adjusting your pattern.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </ToolLayout>
  );
}
