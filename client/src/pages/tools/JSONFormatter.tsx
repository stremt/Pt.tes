import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO, StructuredData, generateFAQSchema, type FAQItem } from "@/lib/seo";
import { Link } from "wouter";
import { Code, Copy, RotateCcw, Check, X, Sparkles, Zap, Lock, Globe, Bug, Settings, FileJson, Minimize2, Shield, WifiOff, CheckCircle, Building2, CalendarDays } from "lucide-react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "Free Online JSON Formatter - Beautify, Validate & Minify JSON | Pixocraft",
    description: "Format, beautify, validate, and minify JSON instantly with our free online JSON formatter. 100% private—all processing happens in your browser. Fix JSON syntax errors easily. No signup required.",
    keywords: "json formatter, json beautifier, json validator, json minifier, format json online, beautify json, validate json, json parser, json pretty print, json syntax checker",
    canonicalUrl: "https://tools.pixocraft.in/tools/json-formatter",
  });

  const handleFormat = (spaces: number = 2) => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, spaces);
      setOutput(formatted);
      setError("");
      setIsValid(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
      setIsValid(false);
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError("");
      setIsValid(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setOutput("");
      setIsValid(false);
    }
  };

  const handleValidate = () => {
    try {
      JSON.parse(input);
      setError("");
      setIsValid(true);
      setOutput("Valid JSON");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invalid JSON");
      setIsValid(false);
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
    setIsValid(null);
  };

  const faqItems: FAQItem[] = [
    {
      question: "Is this JSON formatter accurate?",
      answer: "Yes, our JSON formatter uses the standard JSON parsing specification to ensure 100% accuracy. It correctly handles all valid JSON structures including nested objects, arrays, strings, numbers, booleans, and null values. The formatted output is syntactically identical to the original data."
    },
    {
      question: "Does this JSON formatter work offline?",
      answer: "Yes! Once the page loads, all JSON processing happens entirely in your browser. You can disconnect from the internet and continue formatting, validating, and minifying JSON. Perfect for developers working in secure environments or with limited connectivity."
    },
    {
      question: "Are JSON files uploaded to a server?",
      answer: "No, absolutely not. All JSON processing happens locally in your browser—nothing is sent to any server. Your API responses, configuration files, and sensitive data never leave your device. Once you close the page, all data is gone."
    },
    {
      question: "Can this tool handle large JSON files?",
      answer: "Yes, there's no hard limit on JSON size. Files up to several megabytes process instantly. Very large files (10MB+) may take a moment depending on your device's capabilities. For optimal performance with extremely large JSON, ensure you have sufficient browser memory available."
    },
    {
      question: "How can I fix invalid JSON errors?",
      answer: "Common JSON errors include: missing or extra commas, trailing commas after the last item, using single quotes instead of double quotes, unquoted property names, and mismatched brackets or braces. Our validator shows the exact error location to help you fix issues quickly."
    },
    {
      question: "What is JSON formatting (beautifying)?",
      answer: "JSON formatting adds proper indentation and line breaks to make JSON human-readable. Minified JSON is compact but hard to read—beautifying transforms it into a structured, easy-to-understand format. We offer both 2-space and 4-space indentation options."
    },
    {
      question: "What's the difference between 2-space and 4-space formatting?",
      answer: "Both produce valid, readable JSON. 2-space indentation is more compact and preferred in web development. 4-space indentation is more spread out and sometimes preferred in configuration files. Choose based on your project's coding standards or personal preference."
    },
    {
      question: "Can this tool fix JSON errors automatically?",
      answer: "No, the tool validates and identifies errors but doesn't auto-correct them—this is intentional to avoid unintended data modifications. The error messages clearly indicate what's wrong and where, helping you manually fix issues while maintaining data integrity."
    }
  ];

  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData data={faqSchema} />
      <ToolLayout
        title="Free Online JSON Formatter"
        description="Beautify, validate, and minify JSON data instantly. Format messy JSON, fix syntax errors, and ensure your JSON is valid—all in your browser."
        icon={<Code className="h-10 w-10 text-primary" />}
        toolId="json-formatter"
        category="Developer Tool"
        howItWorks={[
          { step: 1, title: "Paste JSON", description: "Copy your JSON data into the input field—API responses, config files, or any JSON." },
          { step: 2, title: "Choose Action", description: "Format (beautify), minify, or validate your JSON with one click." },
          { step: 3, title: "Get Result", description: "View the formatted output and copy it to your clipboard instantly." },
        ]}
        benefits={[
          { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Formatting", description: "Beautify or minify JSON with a single click—no delays." },
          { icon: <Check className="h-6 w-6 text-primary" />, title: "Accurate Validation", description: "Instantly check if your JSON is valid and see detailed error messages." },
          { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Private", description: "All processing happens in your browser. No data sent to servers." },
          { icon: <Globe className="h-6 w-6 text-primary" />, title: "Free Forever", description: "No limits on file size, operations, or usage. No signup required." },
        ]}
        faqs={faqItems}
      >
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Action Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => handleFormat(2)} disabled={!input} data-testid="button-format-2">
                  <Code className="h-4 w-4 mr-2" />
                  Format (2 spaces)
                </Button>
                <Button onClick={() => handleFormat(4)} variant="outline" disabled={!input} data-testid="button-format-4">
                  Format (4 spaces)
                </Button>
                <Button onClick={handleMinify} variant="outline" disabled={!input} data-testid="button-minify">
                  Minify
                </Button>
                <Button onClick={handleValidate} variant="outline" disabled={!input} data-testid="button-validate">
                  <Check className="h-4 w-4 mr-2" />
                  Validate
                </Button>
                <Button onClick={handleClear} variant="outline" disabled={!input && !output} data-testid="button-clear">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Badge */}
          {isValid !== null && (
            <div className="flex items-center gap-2">
              {isValid ? (
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <Check className="h-3 w-3 mr-1" />
                  Valid JSON
                </Badge>
              ) : (
                <Badge variant="destructive">
                  <X className="h-3 w-3 mr-1" />
                  Invalid JSON
                </Badge>
              )}
            </div>
          )}

          {/* Input/Output Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input */}
            <Card>
              <CardHeader>
                <CardTitle>Input JSON</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder='{"name": "value", "array": [1, 2, 3]}'
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setIsValid(null);
                    setError("");
                  }}
                  className="min-h-[400px] text-sm font-mono"
                  data-testid="input-json"
                />
              </CardContent>
            </Card>

            {/* Output */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between gap-2 flex-wrap">
                  <span>Output</span>
                  {output && !error && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(output)}
                      data-testid="button-copy-output"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
                    <p className="text-sm font-semibold text-destructive mb-1">Error:</p>
                    <p className="text-sm text-destructive/80 font-mono">{error}</p>
                  </div>
                ) : output ? (
                  <pre className="p-4 bg-muted rounded-lg overflow-auto min-h-[400px] text-sm font-mono" data-testid="text-output">
                    {output}
                  </pre>
                ) : (
                  <div className="flex items-center justify-center min-h-[400px] text-muted-foreground">
                    <p className="text-sm">Output will appear here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Privacy & Offline Processing Section */}
          <Card className="bg-primary/5 border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy & Offline Processing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Lock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Local Processing</h4>
                    <p className="text-sm text-muted-foreground">All JSON formatting happens entirely in your browser—nothing is sent to any server.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Safe for Sensitive Data</h4>
                    <p className="text-sm text-muted-foreground">Perfect for API responses, config files, and credentials—your data never leaves your device.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <WifiOff className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Works Offline</h4>
                    <p className="text-sm text-muted-foreground">Once loaded, the tool works without internet—ideal for secure development environments.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Developer Use Cases */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-center">Common Developer Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bug className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Debugging API Responses</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Format messy API responses to quickly identify data structures, spot missing fields, and debug integration issues. Essential for REST API development and testing.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileJson className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Formatting Backend/Frontend JSON</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Beautify JSON data from databases, logs, or code outputs. Make complex nested objects readable for code reviews and documentation. Need to track changes? Try our <Link href="/tools/word-counter" className="text-primary hover:underline" data-testid="link-word-counter">Word Counter</Link> for content analysis.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Settings className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Validating Configuration Files</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Validate package.json, tsconfig.json, app settings, and other configuration files before deployment. Catch syntax errors before they break your build or application.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Minimize2 className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Cleaning Minified JSON</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Transform compact, minified JSON into human-readable format. Analyze production data, understand third-party API responses, or prepare JSON for documentation. Secure your accounts with our <Link href="/tools/password-generator" className="text-primary hover:underline" data-testid="link-password-generator">Password Generator</Link>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* JSON Tips Info Box */}
          <Card className="bg-muted/50 border-2">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold">Common JSON Tips</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                    <li>Always use double quotes (") for keys and string values</li>
                    <li>Remove trailing commas after the last item in objects and arrays</li>
                    <li>Ensure all brackets and braces are properly closed</li>
                    <li>Use "Format" to make minified JSON readable instantly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brand Authority Section */}
          <Card className="bg-muted/30">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-6 flex-wrap justify-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Trusted by developers and teams worldwide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span>India's largest offline-first tool hub with 200+ browser-based tools</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Last updated: December 2025</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
