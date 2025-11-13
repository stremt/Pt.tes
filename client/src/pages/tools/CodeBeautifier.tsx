import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Wand2, Copy, RotateCcw, Zap, Lock, Globe } from "lucide-react";
import beautify from "js-beautify";

export default function CodeBeautifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [codeType, setCodeType] = useState<"html" | "css" | "js">("html");
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "Code Beautifier Online | Format HTML, CSS & JS",
    description: "Beautify and format HTML, CSS or JavaScript instantly. Offline, safe and free tool for developers.",
    keywords: "code beautifier, html formatter, css beautify, js formatter",
    canonicalUrl: "https://tools.pixocraft.in/tools/code-beautifier",
  });

  const handleBeautify = () => {
    try {
      let result = "";
      if (codeType === "html") {
        result = beautify.html(input, { indent_size: 2 });
      } else if (codeType === "css") {
        result = beautify.css(input, { indent_size: 2 });
      } else {
        result = beautify.js(input, { indent_size: 2 });
      }
      setOutput(result);
    } catch (e) {
      setOutput(input);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <ToolLayout
      title="Code Beautifier"
      description="Beautify your code instantly. Perfect for developers who want clean, readable HTML, CSS & JavaScript."
      icon={<Wand2 className="h-10 w-10 text-primary" />}
      toolId="code-beautifier"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Select Code Type", description: "Choose between HTML, CSS, or JavaScript." },
        { step: 2, title: "Paste Code", description: "Enter your messy or minified code." },
        { step: 3, title: "Beautify", description: "Get clean, properly indented code instantly." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Formatting", description: "Beautify any code with one click." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Offline", description: "Your code never leaves your browser." },
        { icon: <Globe className="h-6 w-6 text-primary" />, title: "Multi-Language", description: "Supports HTML, CSS, and JavaScript." },
      ]}
      faqs={[
        { question: "What does beautify mean?", answer: "Beautifying adds proper indentation, spacing, and line breaks to make code readable and clean." },
        { question: "Can I beautify minified code?", answer: "Yes! This tool is perfect for making minified code readable again." },
        { question: "Is there a file size limit?", answer: "No hard limit, but very large files may slow down processing." },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Tabs value={codeType} onValueChange={(v) => setCodeType(v as "html" | "css" | "js")}>
                <TabsList>
                  <TabsTrigger value="html" data-testid="tab-html">HTML</TabsTrigger>
                  <TabsTrigger value="css" data-testid="tab-css">CSS</TabsTrigger>
                  <TabsTrigger value="js" data-testid="tab-js">JavaScript</TabsTrigger>
                </TabsList>
              </Tabs>
              <Button onClick={handleBeautify} disabled={!input} data-testid="button-beautify">
                <Wand2 className="h-4 w-4 mr-2" />
                Beautify {codeType.toUpperCase()}
              </Button>
              <Button onClick={handleClear} variant="outline" disabled={!input && !output} data-testid="button-clear">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input {codeType.toUpperCase()}</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder={`Paste your ${codeType.toUpperCase()} code here...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[500px] text-sm font-mono"
                data-testid="input-code"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Beautified {codeType.toUpperCase()}</span>
                {output && (
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
                <pre className="p-4 bg-muted rounded-lg overflow-auto min-h-[500px] text-sm font-mono" data-testid="text-output">
                  {output}
                </pre>
              ) : (
                <div className="flex items-center justify-center min-h-[500px] text-muted-foreground">
                  <p className="text-sm">Beautified code will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
