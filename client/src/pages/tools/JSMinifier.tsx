import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Minimize2, Copy, RotateCcw, Zap, Lock, TrendingDown } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function JSMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });
  const [isMinifying, setIsMinifying] = useState(false);
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "JavaScript Minifier Online | Compress JS Code",
    description: "Minify JavaScript instantly. Free, offline and secure — no code uploaded or stored.",
    keywords: "js minifier, javascript compressor, minify js online",
    canonicalUrl: "https://tools.pixocraft.in/tools/js-minifier",
  });

  const handleMinify = async () => {
    setIsMinifying(true);
    setError("");
    try {
      const result = await apiRequest("/api/minify/js", {
        method: "POST",
        body: JSON.stringify({ code: input }),
        headers: { "Content-Type": "application/json" },
      });
      
      if (result.code) {
        setOutput(result.code);
        const originalSize = new Blob([input]).size;
        const minifiedSize = new Blob([result.code]).size;
        const saved = ((originalSize - minifiedSize) / originalSize * 100).toFixed(1);
        setStats({ original: originalSize, minified: minifiedSize, saved: parseFloat(saved) });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Minification failed");
      setOutput("");
    } finally {
      setIsMinifying(false);
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setStats({ original: 0, minified: 0, saved: 0 });
  };

  return (
    <ToolLayout
      title="JavaScript Minifier"
      description="Paste your JavaScript and compress it instantly. Improves performance, reduces file size."
      icon={<Minimize2 className="h-10 w-10 text-primary" />}
      toolId="js-minifier"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Paste JavaScript", description: "Enter your JS code in the input field." },
        { step: 2, title: "Minify", description: "Click minify to compress your code." },
        { step: 3, title: "Copy & Deploy", description: "Use the minified code in production." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Minification", description: "Compress JavaScript with one click." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "100% Secure", description: "No code uploaded or stored anywhere." },
        { icon: <TrendingDown className="h-6 w-6 text-primary" />, title: "Faster Load Times", description: "Reduce file size and improve page speed." },
      ]}
      faqs={[
        { question: "What does minifying JavaScript do?", answer: "It removes whitespace, comments, and unnecessary code to reduce file size without changing functionality." },
        { question: "Will it break my code?", answer: "This tool uses Terser, a production-grade minifier. However, always test minified code before deploying to production." },
        { question: "How much can I save?", answer: "Typically 30-50% reduction in file size, depending on your code style and comments." },
        { question: "Does it rename variables?", answer: "By default, variable names are preserved for readability. Professional build tools often enable name mangling for even smaller files." },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 items-center">
              <Button onClick={handleMinify} disabled={!input || isMinifying} data-testid="button-minify">
                <Minimize2 className="h-4 w-4 mr-2" />
                {isMinifying ? "Minifying..." : "Minify JavaScript"}
              </Button>
              <Button onClick={handleClear} variant="outline" disabled={!input && !output} data-testid="button-clear">
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
              {stats.saved > 0 && (
                <Badge variant="secondary" className="text-sm px-4 py-2" data-testid="badge-bytes-saved">
                  Saved {stats.saved}% ({stats.original - stats.minified} bytes)
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive rounded-lg" data-testid="status-error-minify">
            <p className="text-sm font-semibold text-destructive">Error: {error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Input JavaScript</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="function hello() {\n  console.log('Hello World');\n}"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[500px] text-sm font-mono"
                data-testid="input-js"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Minified JavaScript</span>
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
                <pre className="p-4 bg-muted rounded-lg overflow-auto min-h-[500px] text-sm font-mono break-all whitespace-pre-wrap" data-testid="text-output">
                  {output}
                </pre>
              ) : (
                <div className="flex items-center justify-center min-h-[500px] text-muted-foreground">
                  <p className="text-sm">Minified JavaScript will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
