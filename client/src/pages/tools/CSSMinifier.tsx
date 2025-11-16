import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { useClipboard } from "@/hooks/use-clipboard";
import { useSEO } from "@/lib/seo";
import { Minimize2, Copy, RotateCcw, Zap, Lock, TrendingDown } from "lucide-react";

export default function CSSMinifier() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });
  const [isMinifying, setIsMinifying] = useState(false);
  const { copyToClipboard, copied } = useClipboard();

  useSEO({
    title: "CSS Minifier Online | Reduce CSS Size Instantly",
    description: "Compress and minify CSS code instantly with a fast offline tool. Free and fully private.",
    keywords: "css minifier, compress css, minimize css online",
    canonicalUrl: "https://tools.pixocraft.in/tools/css-minifier",
  });

  const minifyCSS = (css: string): string => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
      .replace(/;}/g, '}')
      .replace(/^\s+|\s+$/g, '')
      .trim();
  };

  const handleMinify = async () => {
    setIsMinifying(true);
    setError("");
    try {
      if (!input.trim()) {
        throw new Error("Please enter CSS code to minify");
      }
      
      const minified = minifyCSS(input);
      setOutput(minified);
      
      const originalSize = new Blob([input]).size;
      const minifiedSize = new Blob([minified]).size;
      const saved = originalSize > 0 ? ((originalSize - minifiedSize) / originalSize * 100).toFixed(1) : "0";
      setStats({ original: originalSize, minified: minifiedSize, saved: parseFloat(saved) });
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
      title="CSS Minifier"
      description="Paste CSS and minify it instantly. Offline, fast and perfect for web developers."
      icon={<Minimize2 className="h-10 w-10 text-primary" />}
      toolId="css-minifier"
      category="Developer Tool"
      howItWorks={[
        { step: 1, title: "Paste CSS", description: "Enter your CSS code in the input field." },
        { step: 2, title: "Minify", description: "Click the minify button to compress your CSS." },
        { step: 3, title: "Copy & Use", description: "Copy the minified CSS and use it in your project." },
      ]}
      benefits={[
        { icon: <Zap className="h-6 w-6 text-primary" />, title: "Instant Minification", description: "Compress CSS with a single click." },
        { icon: <Lock className="h-6 w-6 text-primary" />, title: "Privacy First", description: "All processing happens in your browser." },
        { icon: <TrendingDown className="h-6 w-6 text-primary" />, title: "Reduce File Size", description: "Decrease load times and improve performance." },
      ]}
      faqs={[
        { question: "What does minifying CSS do?", answer: "This basic minifier removes whitespace, comments, and unnecessary spaces around CSS syntax to reduce file size. It works 100% offline in your browser." },
        { question: "How much can I save?", answer: "Typically 15-35% reduction in file size, depending on your coding style and comments." },
        { question: "Is minified CSS reversible?", answer: "Not automatically, but you can use a CSS beautifier to add formatting back." },
        { question: "Is this safe for production?", answer: "This is a basic minifier that performs safe, simple compression. Always test minified CSS in your application before deploying to production." },
      ]}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3 items-center">
              <Button onClick={handleMinify} disabled={!input} data-testid="button-minify">
                <Minimize2 className="h-4 w-4 mr-2" />
                Minify CSS
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
              <CardTitle>Input CSS</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="body {\n  margin: 0;\n  padding: 0;\n}"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-[500px] text-sm font-mono"
                data-testid="input-css"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Minified CSS</span>
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
                  <p className="text-sm">Minified CSS will appear here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
