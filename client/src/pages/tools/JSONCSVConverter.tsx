import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO, StructuredData } from "@/lib/seo";
import { ArrowRightLeft, Copy, RotateCcw, Zap, Lock, Globe } from "lucide-react";
import Papa from "papaparse";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "JSON CSV Converter", "item": "https://tools.pixocraft.in/tools/json-csv-converter" }
  ]
});

export default function JSONCSVConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"json-to-csv" | "csv-to-json">("json-to-csv");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "JSON to CSV Converter Online | Fast, Free & Offline",
    description: "Convert JSON to CSV or CSV to JSON instantly. 100% free, offline, secure and runs completely in your browser.",
    keywords: "json to csv, csv converter online, convert json csv, offline converter",
    canonicalUrl: "https://tools.pixocraft.in/tools/json-csv-converter",
  });

  const handleConvert = () => {
    setError("");
    try {
      if (mode === "json-to-csv") {
        const data = JSON.parse(input);
        const array = Array.isArray(data) ? data : [data];
        const csv = Papa.unparse(array);
        setOutput(csv);
      } else {
        const result = Papa.parse(input, { header: true, skipEmptyLines: true });
        const json = JSON.stringify(result.data, null, 2);
        setOutput(json);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed");
      setOutput("");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const toggleMode = () => {
    setMode(mode === "json-to-csv" ? "csv-to-json" : "json-to-csv");
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <ToolLayout
      title="JSON to CSV Converter"
      description="Convert JSON to CSV or CSV to JSON instantly without internet. Paste or upload your file and get clean, formatted data in one click."
      icon={<ArrowRightLeft className="h-10 w-10 text-primary" />}
      toolId="json-csv-converter"
      category="developer"
      howItWorks={[
        { step: 1, title: "Select Mode", description: "Choose between JSON to CSV or CSV to JSON conversion." },
        { step: 2, title: "Paste Data", description: "Copy your data into the input field." },
        { step: 3, title: "Convert", description: "Click convert and get your formatted output instantly." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Conversion", description: "Convert between JSON and CSV with a single click." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Offline", description: "All processing happens locally. No data uploaded to servers." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Free Forever", description: "No limits, no registration required." },
      ]}
      faqs={[
        { question: "Does it upload data?", answer: "No. Everything runs offline in your browser. Your data never leaves your device." },
        { question: "Can I convert large JSON files?", answer: "Yes, up to your browser memory limit. Very large files may slow down the conversion." },
        { question: "What JSON formats are supported?", answer: "Both single objects and arrays of objects. For CSV conversion, array format works best." },
      ]}
      footer={<p className="text-center text-sm text-muted-foreground"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Mode Toggle */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="secondary" className="text-sm px-4 py-2" data-testid="badge-mode">
                {mode === "json-to-csv" ? "JSON → CSV" : "CSV → JSON"}
              </Badge>
              <Button onClick={toggleMode} variant="outline" data-testid="button-toggle-mode">
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                Switch to {mode === "json-to-csv" ? "CSV → JSON" : "JSON → CSV"}
              </Button>
              <Button onClick={handleConvert} disabled={!input} data-testid="button-convert">
                Convert
              </Button>
              <Button onClick={handleClear} variant="outline" disabled={!input && !output} data-testid="button-clear">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Error Display */}
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg" data-testid="status-error-convert">
            <p className="text-sm font-semibold text-destructive">Error: {error}</p>
          </div>
        )}

        {/* Input/Output Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input */}
          {(!output || input) && (
            <Card className={cn(output && "opacity-50 hover:opacity-100 transition-opacity")}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Input {mode === "json-to-csv" ? "JSON" : "CSV"}</CardTitle>
                {output && (
                  <Button variant="ghost" size="sm" onClick={handleClear}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    New Conversion
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={
                    mode === "json-to-csv"
                      ? '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'
                      : 'name,age\nJohn,30\nJane,25'
                  }
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    setError("");
                  }}
                  className={cn("text-sm font-mono transition-all", output ? "min-h-[100px]" : "min-h-[400px]")}
                  data-testid="input-data"
                />
              </CardContent>
            </Card>
          )}

          {/* Output */}
          <Card className={cn(!input && output && "lg:col-span-2")}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Output {mode === "json-to-csv" ? "CSV" : "JSON"}</span>
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
              {output ? (
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
      </div>
    </ToolLayout>
    </>
  );
}
