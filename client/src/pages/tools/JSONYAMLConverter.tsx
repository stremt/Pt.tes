import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO, StructuredData } from "@/lib/seo";
import { FileCode, Copy, RotateCcw, Zap, Lock, Globe } from "lucide-react";
import yaml from "js-yaml";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Link } from "wouter";

const generateBreadcrumbSchema = () => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://tools.pixocraft.in" },
    { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://tools.pixocraft.in/tools" },
    { "@type": "ListItem", "position": 3, "name": "Developer Tools", "item": "https://tools.pixocraft.in/tools/developer" },
    { "@type": "ListItem", "position": 4, "name": "JSON YAML Converter", "item": "https://tools.pixocraft.in/tools/json-yaml-converter" }
  ]
});

export default function JSONYAMLConverter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"json-to-yaml" | "yaml-to-json">("json-to-yaml");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "JSON to YAML Converter | Convert Instantly (Offline)",
    description: "Convert JSON to YAML or YAML to JSON instantly. Fast, free and 100% offline-secure.",
    keywords: "json to yaml, yaml converter, yaml to json",
    canonicalUrl: "https://tools.pixocraft.in/tools/json-yaml-converter",
  });

  const handleConvert = () => {
    setError("");
    try {
      if (mode === "json-to-yaml") {
        const data = JSON.parse(input);
        const yamlStr = yaml.dump(data, { indent: 2 });
        setOutput(yamlStr);
      } else {
        const data = yaml.load(input);
        const jsonStr = JSON.stringify(data, null, 2);
        setOutput(jsonStr);
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
    setMode(mode === "json-to-yaml" ? "yaml-to-json" : "json-to-yaml");
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <>
      <StructuredData data={generateBreadcrumbSchema()} />
      <div className="container mx-auto px-4 max-w-7xl pt-8">
        <Breadcrumb items={[{ label: "Home", url: "/" }, { label: "Tools", url: "/tools" }, { label: "Developer Tools", url: "/tools/developer" }, { label: "JSON YAML Converter" }]} />
      </div>
      <ToolLayout
      title="JSON to YAML Converter"
      description="Convert JSON and YAML with one click. Secure, offline and perfect for developers & DevOps."
      icon={<FileCode className="h-10 w-10 text-primary" />}
      toolId="json-yaml-converter"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Select Mode", description: "Choose between JSON to YAML or YAML to JSON." },
        { step: 2, title: "Paste Data", description: "Enter your JSON or YAML data." },
        { step: 3, title: "Convert", description: "Get instant conversion with proper formatting." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Conversion", description: "Convert between JSON and YAML instantly." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Privacy First", description: "All processing happens offline in your browser." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "DevOps Ready", description: "Perfect for config files and CI/CD pipelines." },
      ]}
      faqs={[
        { question: "Is my data secure?", answer: "Yes. Everything runs offline. No data is uploaded to any server." },
        { question: "What's the difference between JSON and YAML?", answer: "YAML is more human-readable with less syntax, while JSON is more strict and widely supported in APIs." },
        { question: "Can it handle large files?", answer: "Yes, it can handle files up to your browser's memory limit." },
      ]}
      footer={<p className="text-center text-sm text-muted-foreground"><Link href="/tools/developer" className="text-primary hover:text-primary/80 transition-colors">← Back to Developer Tools</Link></p>}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 items-center">
              <Badge variant="secondary" className="text-sm px-4 py-2" data-testid="badge-mode">
                {mode === "json-to-yaml" ? "JSON → YAML" : "YAML → JSON"}
              </Badge>
              <Button onClick={toggleMode} variant="outline" data-testid="button-toggle-mode">
                <FileCode className="h-4 w-4 mr-2" />
                Switch to {mode === "json-to-yaml" ? "YAML → JSON" : "JSON → YAML"}
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

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg" data-testid="status-error-convert">
            <p className="text-sm font-semibold text-destructive">Error: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input {mode === "json-to-yaml" ? "JSON" : "YAML"}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={
                  mode === "json-to-yaml"
                    ? '{"name": "John", "age": 30}'
                    : 'name: John\nage: 30'
                }
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  setError("");
                }}
                className="min-h-[400px] text-sm font-mono"
                data-testid="input-data"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Output {mode === "json-to-yaml" ? "YAML" : "JSON"}</span>
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
