import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Code, Copy, RotateCcw, Check, X, Sparkles, Zap, Lock, Globe } from "lucide-react";

export default function JSONFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "JSON Formatter | Beautify & Validate JSON Online | Pixocraft Tools",
    description: "Free JSON formatter and validator. Beautify, minify, and validate JSON data instantly. Fix JSON syntax errors with our easy-to-use online tool.",
    keywords: "json formatter, json beautifier, json validator, json minifier, format json, validate json, json parser",
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
      setOutput("✓ Valid JSON");
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

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Beautify, validate, and minify JSON data instantly. Format messy JSON, fix syntax errors, and ensure your JSON is valid."
      icon={<Code className="h-10 w-10 text-primary" />}
      toolId="json-formatter"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Paste JSON", description: "Copy your JSON data into the input field." },
        { step: 2, title: "Choose Action", description: "Format, minify, or validate your JSON data." },
        { step: 3, title: "Get Result", description: "View the formatted output and copy it to your clipboard." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Formatting", description: "Beautify or minify JSON with a single click." },
        { icon: <Check className="h-6 w-6 text-primary" />, title: "Validation", description: "Instantly check if your JSON is valid and see error details." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Privacy Focused", description: "All processing happens in your browser. No data sent to servers." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Free Forever", description: "No limits on file size or number of operations." },
      ]}
      faqs={[
        { question: "What is JSON formatting?", answer: "JSON formatting (beautifying) adds proper indentation and line breaks to make JSON data human-readable. Minifying removes all unnecessary whitespace to make it compact." },
        { question: "Why is my JSON invalid?", answer: "Common JSON errors include missing commas, trailing commas, unquoted keys, single quotes instead of double quotes, or incorrect nesting of brackets." },
        { question: "What's the difference between 2-space and 4-space formatting?", answer: "Both create readable JSON, but 2-space indentation is more compact while 4-space is more spread out. Most developers prefer 2-space for JSON." },
        { question: "Can this tool fix JSON errors automatically?", answer: "No, this tool validates and identifies errors but doesn't auto-fix them. You'll need to manually correct syntax issues based on the error message." },
        { question: "Is there a size limit for JSON files?", answer: "No hard limit, but very large files (>10MB) may slow down your browser. The tool processes everything locally in your browser." },
      ]}
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
              <CardTitle className="flex items-center justify-between">
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

        {/* Info Box */}
        <Card className="bg-muted/50 border-2">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold">Common JSON Tips</h3>
                <ul className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                  <li>• Always use double quotes (") for keys and string values</li>
                  <li>• Remove trailing commas after the last item in objects and arrays</li>
                  <li>• Ensure all brackets and braces are properly closed</li>
                  <li>• Use "Format" to make minified JSON readable</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ToolLayout>
  );
}
